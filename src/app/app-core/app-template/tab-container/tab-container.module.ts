import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  QueryList,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabItemComponent } from '../tab-item/tab-item.module';

// kii

@Component({
  selector: 'app-tab-container',
  template: `<ul class="tab-contain" [ngClass]="{'tab-specific': specific, 'tab-primary': primary}">
      <li
        *ngFor="let tab of tabs; let i = index"
        (click)="selectTab(tab, i)"
        [class.active]="tab.active"
      >
      @if(tab.src==='' && tab.icon ==='')
        {
         
        }
      @if(tab.src!==''){
       <ion-icon class="pr5" src="{{tab.src}}"></ion-icon>
      }
      @if(tab.icon!==''){

        <ion-icon class="pr5" name="{{tab.icon}}"></ion-icon>
      }
        {{ tab.title }}
      </li>
    </ul>
    <ng-content></ng-content>`,
  styles: [
    `.pr5{
      padding-right:5px;
    }
      .tab-contain {
        list-style-type: none;
        display: flex;
        align-items: center;
        padding: 10px;
        /* height: 38px; */
        // height: 45px;
        border-radius: 6px;
        /* background: #eaeaea; */
        font-size: 14px;
        font-weight: 600;
        line-height: normal;
      }
      .tab-contain li {
        cursor: pointer;
        padding: 10px;
       
        min-width: 100px;
        width:auto;
        display: flex;
        align-items: center;
        justify-content: center;
         border-right: 1px solid #E0E0E0;
         &:last-child{
border-right:none !important;
         }
      }
      .tab-contain li.active {
        border-radius: 6px;
        background-color: #0b4d7a;
        color: white;
        cursor: pointer;
      }
      .tab-specific{
        list-style-type: none;
        display: flex;
        align-items: center;
        padding: 7px 7px;
        /* min-width:190px; */
        /* height: 38px; */
        overflow-y: hidden;
        /* overflow-x: scroll; */
        height: 40px;
        max-width:fit-content;
        border-radius: 6px;
        background: #eaeaea;
        font-size: 14px;
        font-weight: 600;
        line-height: normal;
      }
      
      .tab-specific li {
        cursor: pointer;
        // height: 45px;
        /* padding: 10px 15px; */
        background: transparent;
        /* min-width: 150px; */
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 400;
        /* margin- */
        /* padding: */
        
      }
      .tab-specific li.active {
        /* margin:5px; */
        padding: 10px;
        border-radius: 6px;
        height: 32px;
        background-color: #fff;
        color: white;
        cursor: pointer;
        font-size: 12px;
        font-weight: 400;
        color: black;
      }

      //primary
      .tab-primary{
       
        overflow-y: hidden;
        height: 20px;
        max-width:fit-content;
      }
      
      .tab-primary li {
        cursor: pointer;
        height: 45px;
        
        display: flex;
        width: auto;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 600;
        /* margin- */
        /* padding: */
        
      }
      .tab-primary li.active {
       color: #0079c4;
       background: #fff
      }
    `,
  ],

})
export class TabContainerComponent {
  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter();
  @Input() type: any = '';
  @Input() specific: any = false;
  @Input() primary: any = false;



  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
    this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
    // this.renderer.setStyle(this.el.nativeElement, 'display', 'inline-table');
  }
  @ContentChildren(TabItemComponent) tabs: any = QueryList<TabItemComponent>;

  ngAfterContentInit() {
    const activeTab = this.tabs.find((tab: { active: any }) => tab.active);
    if (!activeTab && this.tabs.length) {
      this.tabs.first.active = true;
    }
  }

  selectTab(tab: TabItemComponent, index: any) {
    this.tabs.forEach((t: { active: boolean }) => (t.active = false));
    tab.active = true;
    this.onSelect.next(index);
  }
}

@NgModule({
  declarations: [TabContainerComponent],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [TabContainerComponent],
})
export class TabContainerModule { }
