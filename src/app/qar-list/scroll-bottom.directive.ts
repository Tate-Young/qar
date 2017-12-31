import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { QarListComponent } from './qar-list.component'; // 除了引用组件，还有其他方法访问其属性吗？


@Directive({
  selector: '[appScrollBottom]'
})
export class ScrollBottomDirective {
  private startX: number;
  private startY: number;
  private X: number;
  private Y: number;
  private moveEndX: any;
  private	moveEndY: any;
  private elem = this.el.nativeElement;
  constructor(private el: ElementRef, private qar: QarListComponent) {}

  @HostListener('touchstart', ['$event']) onTouchStart(event: any){
    this.startX = event.changedTouches[0].pageX;
    this.startY = event.changedTouches[0].pageY;
  }

  @HostListener('touchend', ['$event']) onTouchEnd(event: any){
    this.moveEndX = event.changedTouches[0].pageX;
    this.moveEndY = event.changedTouches[0].pageY;
    this.X = (this.moveEndX - this.startX);
    this.Y = (this.moveEndY - this.startY);

    if(Math.abs(this.Y) > Math.abs(this.X) && this.Y < 0) {
      if(this.elem.scrollHeight <= this.elem.scrollTop + this.elem.clientHeight + 100) {
        this.qar.loadNextPage();
      }
    }
  }

}
