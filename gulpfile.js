/**
 * Created by tate on 09/10/2017.
 */
var gulp 			= require('gulp'), //基础库
    RevAll 		= require('gulp-rev-all'),
    zip 			= require('gulp-zip'),
    fs        = require('fs'),
    del 			= require('del'),
    imagemin  = require('gulp-imagemin'),
    buffer 		= require('vinyl-buffer'),
    merge 		= require('merge-stream'),
    less 			= require('gulp-less'), //less解析
    cssnano		= require('gulp-cssnano'), //css压缩
    rename 		= require('gulp-rename'), //文件重命名
    plumber 	= require('gulp-plumber'), //处理所有错误的通用方
    notify 		= require('gulp-notify'),
    sourcemaps= require("gulp-sourcemaps"),
    gutil 		= require('gulp-util'),
    spritesmith 	= require('gulp.spritesmith'),
    runSequence 	= require('run-sequence');

var config = {
  src: 'dist/**/*.*',
  dist: 'dist',
  nightLess: 'src/libs/night.less',
  assets: 'src/assets',
  destImg: 'src/assets/images',
  sprite : 'src/libs/sprite',
  release: 'release',
  srcImages		: 'src/libs/images/*.{png,jpg,jpeg,ico}',
  srcCommonImages : 'src/libs/images/common/*.{png,jpg,jpeg,ico}',
  srcDayImages 	: 'src/libs/images/day/*.{png,jpg,jpeg,ico}',
  srcNightImages 	: 'src/libs/images/night/*.{png,jpg,jpeg,ico}',
  spriteDayConfig	: {
    retinaSrcFilter		: ['src/libs/images/**/*@2x.{png,jpg,jpeg,ico}'],
    retinaImgName		: 'sprite-day@2x.png',
    // retinaImgPath: '../images/sprite@2x.png',
    imgName				: 'sprite-day.png',
    cssName				: 'sprite-day.less',
    padding				: 10
  },
  spriteNightConfig	: {
    retinaSrcFilter		: ['src/libs/images/**/*@2x.{png,jpg,jpeg,ico}'],
    retinaImgName		: 'sprite-night@2x.png',
    // retinaImgPath: '../images/sprite@2x.png',
    imgName				: 'sprite-night.png',
    cssName				: 'sprite-night.less',
    padding				: 10
  }
};

gulp.task('less', function() {
  // 1. 找到 less 文件
  gulp.src(config.nightLess)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    // 2. 编译为css
    .pipe(less())
    // 3. 另存文件
    // .pipe(gulp.dest(config.assets))
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(config.assets));

  gulp.src('src/libs/sprite/icon-day.less')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    // 2. 编译为css
    .pipe(less())
    // 3. 另存文件
    // .pipe(gulp.dest(config.assets))
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(rename({
      basename: 'day',
      suffix: '.min'
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(config.assets));
});

gulp.task('watch', function () {
  gulp.watch(config.nightLess, ['less']);
});

/*
 *压缩发布版本
 */

gulp.task('release', ['img'], function() {
  fs.exists('dist', function (exists) {
    gutil.log(exists ? "build success" : "no dist!");
    if (!exists) {
      process.exit(); // 退出任务
    }
  });

  runSequence(
    'release:rev',
    'release:zip',
    function () {
      gutil.log('恭喜打包完成,路径为release------------------');
    }
  )
});

gulp.task('release:zip',function(){
  return gulp.src(config.src)
    .pipe(zip('qar.zip'))
    .pipe(gulp.dest(config.release));
});


gulp.task('release:rev',function(){
  return gulp.src(config.src)
    .pipe(RevAll.revision())
    .pipe(RevAll.versionFile()) // 生成rev-version.json
    .pipe(gulp.dest(config.dist));
});

// sprite
gulp.task('sprite', function(done) {
  runSequence(
    'sprite:del',
    ['sprite:build-day', 'sprite:build-night'],
    'img',
    done
  )
});

gulp.task('sprite:del', function () {
  del(config.destImg);
});

gulp.task('sprite:build-day', function () {
  var spriteData = gulp.src([config.srcCommonImages, config.srcDayImages,'!src/libs/images/loading.png']).pipe(spritesmith(
    config.spriteDayConfig
  ));
  var imgStream = spriteData.img
    .pipe(buffer())
    .pipe(gulp.dest(config.destImg));

  var cssStream = spriteData.css
    .pipe(gulp.dest(config.sprite));

  return merge(imgStream, cssStream);
});

gulp.task('sprite:build-night', function () {
  var spriteData = gulp.src([config.srcCommonImages, config.srcNightImages,'!src/libs/images/loading.png']).pipe(spritesmith(
    config.spriteNightConfig
  ));
  var imgStream = spriteData.img
    .pipe(buffer())
    .pipe(gulp.dest(config.destImg));

  var cssStream = spriteData.css
    .pipe(gulp.dest(config.sprite));

  return merge(imgStream, cssStream);
});

// Images
gulp.task('img', function() {
  return gulp.src(['src/libs/images/loading.png'])
  //.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
  /*optimizationLevel: 5, //类型：Number 默认：3 取值范围：0-7（优化等级）
   progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
   interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
   multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化*/
    .pipe(imagemin({
      optimizationLevel: 5,
      progressive: false,
      interlaced: true
    }))
    .pipe(gulp.dest(config.destImg));
  //.pipe(notify({ message: 'Images task complete' }));
});
