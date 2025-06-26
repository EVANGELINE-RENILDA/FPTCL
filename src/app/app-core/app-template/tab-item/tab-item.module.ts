import { Component, ElementRef, Input, NgModule, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

// kii

@Component({
  selector: 'app-tab-item',
  template: `
    <div [hidden]="!active" style="height: 100%;width:100%;overflow: hidden;">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    div {
      /* border: 1px solid gray; */
      /* padding: 10px; */
    }
  `]
})
export class TabItemComponent {
  @Input() title: any;
  @Input() icon: any = '';
  @Input() src: any = '';
  active = false;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef) {
    this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
  }
}

@NgModule({
  declarations: [TabItemComponent],
  imports: [
    CommonModule
  ],
  exports: [TabItemComponent]
})
export class TabItemModule { }
