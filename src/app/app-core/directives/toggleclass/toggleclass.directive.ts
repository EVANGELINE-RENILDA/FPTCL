import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appToggleclass]',
  standalone:true
})
export class ToggleclassDirective {
  @Input() public appToggleclass: any = '';

  constructor(public el: ElementRef, public renderer: Renderer2) {
  }

  @HostListener('click') onClick() {
    
    const elemetId = document.getElementById(this.appToggleclass);
    elemetId?.classList.contains('opened')
      ? this.renderer.removeClass(elemetId, 'opened')
      : this.renderer.addClass(elemetId, 'opened');
  }
}
