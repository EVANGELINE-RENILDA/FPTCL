import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[footerpanel]',
  standalone: true
})
export class FooterToggleDirective {

  @Input() footerpanel = "";
  @Input() trigger = "";
  elementId: any = "";
  elementHeight = 0;
  el: any;
  _changeInterval: any = null;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.el = this.elementRef.nativeElement as HTMLElement;
  }

  // ngAfterViewInit() {
  //   this.renderer.setStyle(this.elementRef.nativeElement, "height", "33px");
  //   this.renderer.setAttribute(this.el, 'data-height', '33px');
  //   let trigger = document.getElementById(this.trigger);
  //   if (this.trigger !== '') {
  //     if (trigger) {

  //       trigger.addEventListener('click', () => {
  //         if (this.elementId) {
  //           if (this.elementId.classList.contains('panel-footer-expand')) {
  //             this.elementId.classList.remove('panel-footer-expand');
  //             trigger?.classList.remove('expanded');
  //             this.renderer.setStyle(this.elementRef.nativeElement, "height", "33px");
  //           } else {
  //             this.elementId.classList.add('panel-footer-expand');
  //             trigger?.classList.add('expanded');
  //             let height = (this.elementHeight + 215) + 'px';
  //             this.renderer.setStyle(this.elementRef.nativeElement, "height", height);
  //           }
  //         }
  //       })
  //       trigger.click();
  //     }
  //   }
  //   if (this.footerpanel !== '') {
  //     this.elementId = document.getElementById(this.footerpanel);
  //     if (this.elementId) {
  //       this.elementHeight = this.elementId.clientHeight;
  //       let trigger = document.getElementById(this.trigger);
  //       this.elementId.classList.add('panel-footer-expand');
  //       trigger?.classList.add('expanded');
  //       let height = this.elementHeight + 215 + 'px';
  //       this.renderer.setStyle(this.elementRef.nativeElement, 'height', height);
  //     }
  //   }
  // }

  ngAfterViewInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, "height", "24px");
    this.renderer.setAttribute(this.el, 'data-height', '24px');
    let trigger = document.getElementById(this.trigger);
    if (this.trigger !== '') {
      if (trigger) {

        trigger.addEventListener('click', () => {

          if (this.elementId) {
            if (this.elementId.classList.contains('panel-footer-expand')) {
              this.elementId.classList.remove('panel-footer-expand');
              trigger?.classList.remove('expanded');
              this.renderer.setStyle(this.elementRef.nativeElement, "height", "24px");
              this.renderer.setStyle(this.elementRef.nativeElement, "overflow", "hidden");
            } else {
              this.elementId.classList.add('panel-footer-expand');
              trigger?.classList.add('expanded');
              let height = (this.elementHeight + 24) + 'px';
              this.renderer.setStyle(this.elementRef.nativeElement, "height", height);
              this.renderer.setStyle(this.elementRef.nativeElement, "overflow", "auto");
            }
          }
        })
        trigger.click();
      }
    }
    if (this.footerpanel !== '') {
      this.elementId = document.getElementById(this.footerpanel);
      if (this.elementId) {
        this.elementHeight = this.elementId.clientHeight;
        let trigger = document.getElementById(this.trigger);
        this.elementId.classList.add('panel-footer-expand');
        trigger?.classList.add('expanded');
        let height = (this.elementHeight + 24) + 'px';
        this.renderer.setStyle(this.elementRef.nativeElement, 'height', height);
      }
    }

  }

}
