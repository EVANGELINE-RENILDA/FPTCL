import { CommonModule } from '@angular/common';
import { Component, ElementRef, NgModule, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-content',
    template: '<ng-content></ng-content>',
}) 
export class ContentComponent {
    constructor(private renderer: Renderer2, private el: ElementRef) {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
        this.renderer.setStyle(this.el.nativeElement, 'flex-direction', 'column');
        this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
    }
}

@Component({
    selector: 'app-content-body',
    template: `<div style="position:absolute; top: 0; bottom: 0; left: 0; right: 0; overflow: hidden; z-index: 1;">
  <div style=" position: relative;width: 100%;height: 100%;overflow: auto;z-index: 2;">
      <ng-content></ng-content>
  </div>
</div>
`,
})
export class ContentBodyComponent {
    constructor(private renderer: Renderer2, private el: ElementRef) {
        this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
        this.renderer.setStyle(this.el.nativeElement, 'flex', '1');
    }
}

@NgModule({
    declarations: [ContentComponent, ContentBodyComponent],
    imports: [CommonModule],
    exports: [ContentComponent, ContentBodyComponent]

})
export class ContentModule { }
