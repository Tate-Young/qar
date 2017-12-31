import { Directive, Input, HostListener } from '@angular/core';
import { QarListComponent } from './qar-list.component'; // 除了引用组件，还有其他方法访问其属性吗？

@Directive({
  selector: '[dateChoose]'
})
export class DateChooseDirective {
  @Input('dateChoose') selectedDate: Date;

  constructor(private qarList: QarListComponent) { }
  @HostListener('click') onClick() {
    const qarList: any = this.qarList;
    if (qarList.selectedDate === this.selectedDate || !navigator.onLine) {
      qarList.showDateList = false;
      return;
    }

    qarList.selectedDate = this.selectedDate;
    qarList.showDateList = false;
    // 按月查询
    console.log(this.selectedDate);
  }
}
