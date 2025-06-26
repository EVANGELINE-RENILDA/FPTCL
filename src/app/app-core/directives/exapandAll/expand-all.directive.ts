import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appExpandAll]',
  standalone:true
})
export class ExpandAllDirective {
  constructor(public renderer: Renderer2, public ele: ElementRef) {}

  @HostListener('click') onClick() {
    const parentName = document.getElementsByClassName('report-body');
    const childName = document.getElementsByClassName('child-1');
    const attr = this.ele.nativeElement.getAttribute('aria-action');
    if (attr === 'closed') {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < parentName.length; i++) {
        this.renderer.addClass(parentName[i], 'opened');
      }
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < childName.length; i++) {
        this.renderer.addClass(childName[i], 'opened');
      }
      this.renderer.setAttribute(
        this.ele.nativeElement,
        'aria-action',
        'opened'
      );
      this.renderer.addClass(this.ele.nativeElement, 'opened');
    } else if (attr === 'opened') {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < parentName.length; i++) {
        this.renderer.removeClass(parentName[i], 'opened');
      }
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < childName.length; i++) {
        this.renderer.removeClass(childName[i], 'opened');
      }
      this.renderer.setAttribute(
        this.ele.nativeElement,
        'aria-action',
        'closed'
      );
      this.renderer.removeClass(this.ele.nativeElement, 'opened');
      // this.appExpandAll = 'closed';
    }
  }
}
