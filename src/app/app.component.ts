import {Component, OnInit, Renderer2} from '@angular/core';
// import { TranslateService } from 'ng2-translate';
// import { Translate } from './translate';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  // public translate: any;
  constructor(private server: ServerService, private renderer: Renderer2) {
    (<any>window).switchNightMode = isNightMode => {
      this.switchNightMode(isNightMode);
    };
  }
  // constructor(public translate: TranslateService) {}
  // constructor(private translateConfig: Translate) {}
  ngOnInit() {
    this.switchNightMode(this.server.isNightMode);
    // this.translate.addLangs(['zh', 'en']);
    // this.translate.setDefaultLang('zh');
    // // const browserLang = this.translate.getBrowserLang();
    // const browserLang = navigator.language.indexOf('zh') === -1 ? 'en' : 'zh';
    // console.log('检测到的浏览器语言>' + browserLang);
    // this.translate.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
    // this.translate = this.translateConfig.lanConfig;
    // if (this.server.isNightMode) {
    //   console.log('nightmode: ' + this.server.isNightMode);
    // }
  }
  switchNightMode(isNightMode): void { // 切换夜间模式
    const node = document.querySelector('#qarSwitch');
    this.renderer.setAttribute(node, 'href', isNightMode ? 'assets/night.min.css' : 'assets/day.min.css');
  }
}
