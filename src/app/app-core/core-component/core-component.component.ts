import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, ViewChild, viewChild } from '@angular/core';
import { AppDatePipe } from "../../common/pipes/app-date/app-date.pipe";
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppSettingsService } from '../../common/services/app-settings/app-settings.service';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [MatTooltipModule],
  template: `@if(value!==''){
    <div #content class="text-ellipse" [matTooltip]="value" [matTooltipDisabled]="toolTipDisabled" matTooltipPosition="below">{{value}}</div>
  }
  @else {
    -
  }`
})
export class AppToolTipComponent {
  __value = "";
  toolTipDisabled = false;
  @Input() set value(value: string) { this.__value = value || ""; this.init(); }
  get value() { return this.__value; }

  @ViewChild('content') content: any;
  constructor(private el: ElementRef) {
    window.addEventListener("resize", () => {
      this.init();
    });
  }

  init() {
    if (this.__value !== '' && this.content) {
      let content = this.content.nativeElement;
      const textLength = content.textContent.length;
      const font = window.getComputedStyle(content).getPropertyValue("font");
      let textWidth = this.getTextWidth(this.__value, font);
      this.toolTipDisabled = textWidth < this.el.nativeElement.offsetWidth;

    }
  }
  getTextWidth(text: any, font: any) {
    const element = document.createElement("span");
    element.textContent = text;
    element.style.cssText = font;
    document.body.appendChild(element);
    const width = element.offsetWidth;
    document.body.removeChild(element);
    return width;
  }

}

@Component({
  selector: 'scroll',
  standalone: true,
  imports: [],
  template: '<div class="ab"><div class="rel"><ng-content></ng-content></div></div>',
})
export class InnerScroll {

}

@Component({
  selector: 'label-dash',
  standalone: true,
  imports: [],
  template: `{{__value ? __value : '-'}}`,
})
export class LabelDash {
  __value = "-";
  @Input() set value(value: string) { this.__value = value || "-"; }
  get value() { return this.__value; }

}

@Component({
  selector: 'row',
  standalone: true,
  imports: [],
  template: '<div class="row-container {{className}}"><div class="row" ><ng-content></ng-content></div></div>',
})
export class Row {
  @Input('className') className = "";
}

@Component({
  selector: 'view-label',
  standalone: true,
  imports: [AppToolTipComponent, AppDatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<div class="view-label" [class.label-flex]="flex">
   @if(type === ''){
     @if (src !== '') {
                <ion-icon [src]="src"></ion-icon>
    }
    @if (name !== '') {
                <ion-icon [name]="name"></ion-icon>
   }
    <div class="d-flex gap-10">
@if (label !== '') {
                <div class="view-label-text">{{label}}</div>
   }


   @if(oldValue !=='' && value!==oldValue && oldDate=== false ){
   <div class="old-value ">
    <app-tooltip [value]=" oldValue"></app-tooltip>
   </div>
   }
   @else if(oldValue !=='' && value !== oldValue && oldDate=== true ){
   <div class="old-value ">{{oldValue | appDate}}</div>
   }
</div>

                @if (value !== '' && ellipse === false) {
                  <div class="view-label-value">
                    @if(isContactNo === true){
                      {{appSetting.environment.countryCode}}
                    }
                  {{value?value:'-'}}
                </div>
                }
                @else if(value !== '' && ellipse === true){
                  <div class="view-label-value">
                  <div class="text-ellipse "><app-tooltip [value]="value"></app-tooltip> </div>
                  </div>

                }
                @else if(status !== '' && value === ''){
                  <div class="fow600 pt5 status-{{status}}"> {{statusValue}}
                </div>
                }
                @else if(value === '' && status ==='') {
                -
                }
   }
               @if(type==='sub'){
              <div class=" align-items-base gap-5">
                <div class="view-label-text">{{label}}:</div>
                <div class="view-label-value">{{value ? value : '-'}}</div> 
              </div>
               }
               @if(type==='number'){
             
                <div class="view-label-text">{{label}}</div>
                <div class="view-label-value">
                  @if( value === '0'){
                    -
                  }
                  @else{
                    {{value}}
                  }
                </div> 
           
               }
               @if(type==='sub-number'){
              <div class=" align-items-base gap-5">
                <div class="view-label-text">{{label}}:</div>
                <div class="view-label-value">
                  @if(value === '0'){
                    -
                  }
                  @else{
                    {{value ? value : '-'}}
                  }
                </div> 
              </div>
               }
              </div>`,

})
export class ViewLabel {
  @Input('flex') flex = false;
  @Input('src') src = "";
  @Input('name') name = "";
  @Input('label') label = "";
  @Input('oldValue') oldValue = "";
  @Input('value') value = "";
  @Input('ellipse') ellipse = false;
  @Input('status') status = '';
  @Input('statusValue') statusValue = '';
  @Input('type') type = '';
  @Input('oldDate') oldDate = false;
  @Input('isContactNo') isContactNo = false;
  constructor(public appSetting: AppSettingsService) { }
}



