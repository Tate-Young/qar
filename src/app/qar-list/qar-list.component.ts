import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ServerService } from '../server.service';

@Component({
  selector: 'app-qar-list',
  templateUrl: './qar-list.component.html',
  styleUrls: ['./qar-list.component.less'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None, // 修改视图封装模式，便于夜间模式样式添加
  changeDetection: ChangeDetectionStrategy.OnPush // 修改监听模式，防止viewWillAppear修改数据后无法更新
})
export class QarListComponent implements OnInit {
  public selectedDate: any;
  public lastSelectedDate: any;
  public showDateList = false;
  public qarLists = [];
  public loading = false;
  public isLoadMore = false; // 是否下拉加载
  public isMobile = false; // 是否是手机端
  public isAndroid = false; // 是否是Android
  public noMoreData = false; // 数据是否加载完成
  private isZn: any;
  private totalCount: number;
  private pageIndex = 1;
  private pageSize = 15; // 初始设置分页
  constructor(private server: ServerService, private datePipe: DatePipe, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    // this.isZn = navigator.language.indexOf('zh') !== -1;
    this.isZn = navigator.language.includes('zh');
    this.loading = false;
    this.isMobile = this.server.isMobile;
    this.isAndroid = this.server.isAndroid;
    this.selectedDate = this.datePipe.transform(Date.now(), 'yyyy-MM');
    this.lastSelectedDate = this.selectedDate;
    this.getQarLists();
    (<any>window).refreshQarLists = this.refreshQarLists.bind(this);
  }
  hideDateList(target: any): void {
    if (target.className.includes('date')) {
      this.showDateList = false;
    }
  }
  getQarLists(): void {
    const param = {
      'month': new Date(this.selectedDate).getTime(),
      'pageIndex': this.pageIndex,
      'pageSize': this.pageSize
    };
    if (this.loading) { return; }

    if (!this.isLoadMore) { this.loading = true; }

    if (param.pageIndex === 1 || !this.qarLists) {
      this.qarLists = [];
    }

    if (!this.noMoreData) {
      this.server.getQar(param).subscribe(qar => {
        this.loading = false;
        this.isLoadMore = false;
        // this.qarLists = this.qarLists.concat(qar.list);
        this.qarLists = [...this.qarLists, ...qar.list];
        this.totalCount = qar.total;
        this.noMoreData = (this.pageSize > qar.list.length);
        this.detectChanges();
      }, err => {
        console.log(err);
        if (this.isLoadMore) { this.pageIndex--; }
        this.loading = false;
        this.isLoadMore = false;
        this.noMoreData = true;
        this.detectChanges();
      });
    } else {
      this.isLoadMore = false;
      this.loading = false;
      this.pageIndex--;
    }
    this.detectChanges();
  }
  resetSearchDate(): void {
    if (!this.selectedDate) {
      this.selectedDate = this.datePipe.transform(Date.now(), 'yyyy-MM');
    }
    if (this.lastSelectedDate === this.selectedDate) { return; }
    this.lastSelectedDate = this.selectedDate;
    this.pageIndex = 1;
    this.noMoreData = false;
    this.getQarLists();
  }
  loadNextPage(): void { // 上拉加载
    if ((!this.loading || !this.isLoadMore) && navigator.onLine) {
      this.pageIndex++;
      this.isLoadMore = true;
      this.getQarLists();
    }
  }
  goBack(): void {
    NativeAppAPI.navigationGoback();
  }
  refreshQarLists(): void {
    this.noMoreData = false;
    this.pageIndex = 1;
    this.getQarLists();
  }
  detectChanges(): void { // 手动检测数据变化
    // this.cdRef.markForCheck();
    this.cdRef.detectChanges();
  }
}
