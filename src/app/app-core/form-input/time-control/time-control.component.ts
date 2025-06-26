import {
  Component,
  ElementRef,
  OnInit,
  Optional,
  Self,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
// import { FromInputControl } from '../form-input-control';
import { OverlayRef, OverlayConfig, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { FormInputControl } from '../form-input-control';
import { FormsModule, NgControl, NgForm } from '@angular/forms';
import { NoEmojiDirective } from '../form-directive/no-emoji/no-emoji.directive';
import { UpperCaseDirective } from '../form-directive/upper-case/upper-case.directive';
import { LowerCaseDirective } from '../form-directive/lower-case/lower-case.directive';
import { LimitDirective } from '../form-directive/limit/limit.directive';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { FilterAndSortPipe } from '../pipes/filter-and-sort/filter-and-sort.pipe';
import { MatSelectModule } from '@angular/material/select';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { format, isMatch, isValid, parse, subYears } from 'date-fns';
import { AppSettingsService } from '../../../common/services/app-settings/app-settings.service';
import { NumberOnlyDirective } from '../form-directive/number-only/number-only.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { CharacterOnlyDirective } from '../form-directive/character-only/character-only.directive';
import { InputControlComponent } from '../input-control/input-control.component';
@Component({
  selector: 'app-time-control',
  templateUrl: './time-control.component.html',
  styleUrls: ['./time-control.component.scss'],
  standalone: true,
  imports: [NgClass, NgTemplateOutlet, FormsModule, NoEmojiDirective,
    UpperCaseDirective, LowerCaseDirective, LimitDirective, FilterAndSortPipe,
    MatSelectModule, MatDatepickerModule, NumberOnlyDirective,
    MatTooltipModule, AppDatePipe, CharacterOnlyDirective]
})
export class TimeControlComponent extends InputControlComponent implements OnInit {
  // @ViewChild('formInput') formInput!: ElementRef;
  // overlayRef!: OverlayRef;

  // @ViewChild('dropdownTemplate') dropdownTemplate!: any;

  // hour = '00';
  // minutes = '00';
  // meridiem = '';

  // constructor(
  //   @Self() @Optional() public control: NgControl,
  //   private overlay: Overlay,
  //   public viewContainerRef: ViewContainerRef
  // ) {
  //   super();
  //   this.control && (this.control.valueAccessor = this);
  //   this.xControl = this.control;
  // }


  // openOverlay() {
  //   const positionStrategy = this.overlay
  //     .position()
  //     .flexibleConnectedTo(this.formInput)
  //     .withPositions([
  //       {
  //         originX: 'start',
  //         originY: 'bottom',
  //         overlayX: 'start',
  //         overlayY: 'top',
  //       },
  //     ]);

  //   const overlayConfig = new OverlayConfig({
  //     positionStrategy,
  //     hasBackdrop: true,
  //     backdropClass: 'cdk-overlay-transparent-backdrop',
  //     scrollStrategy: this.overlay.scrollStrategies.close(),
  //     panelClass: 'custom-overlay-panel',
  //   });

  //   this.overlayRef = this.overlay.create(overlayConfig);
  //   const templatePortal = new TemplatePortal(
  //     this.dropdownTemplate,
  //     this.viewContainerRef
  //   );
  //   this.overlayRef.attach(templatePortal);
  //   this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());
  // }

  // closeOverlay() {
  //   if (this.overlayRef) {
  //     this.overlayRef.dispose();
  //     // this.overlayRef = null;
  //   }
  // }

  // clearAll() {
  //   this.value = '';
  //   this.closeOverlay();
  // }

  // submitDate() {
  //   let hour = parseFloat(this.hour);
  //   let hourString = this.hour;
  //   // 24hrs format hided
  //   // if (this.meridiem === 'PM') {
  //   //   hour = hour + 12;
  //   //   if (hour === 24 && this.meridiem === 'PM') {
  //   //     // hour = 0;
  //   //     hour = hour - 12;
  //   //     hourString = hour < 10 ? '0' + hour : hour.toString();
  //   //   }
  //   //   hourString = hour < 10 ? '0' + hour : hour.toString();
  //   // }

  //   // old condition
  //   // if (this.meridiem === 'AM') {
  //   if (this.meridiem === 'AM' || this.meridiem === 'PM') {
  //     hour = hour + 12;
  //     if (hour === 24) {
  //       hour = 0;
  //       hourString = hour < 10 ? '0' + hour : hour.toString();
  //     }
  //   }
  //   let minutes: any = this.minutes.split(' ');
  //   if (minutes.length > 1) {
  //     this.minutes = minutes[0];
  //   }
  //   this.value = hourString + ':' + this.minutes.toString() + ' ' + this.meridiem;
  //   this.closeOverlay();
  // }

  // setupClick(type: any, val: any) {
  //   switch (type) {
  //     case 'hour':
  //       let hour = parseFloat(this.hour);
  //       let newHour = hour + val;
  //       newHour < 1 ? (newHour = 12) : '';
  //       newHour > 12 ? (newHour = 1) : '';
  //       this.hour = newHour < 10 ? '0' + newHour : newHour.toString();
  //       break;
  //     case 'minutes':
  //       let minutes = parseFloat(this.minutes);
  //       let newMinutes = minutes + val;
  //       newMinutes < 0 ? (newMinutes = 59) : '';
  //       newMinutes > 59 ? (newMinutes = 0) : '';
  //       this.minutes =
  //         newMinutes < 10 ? '0' + newMinutes : newMinutes.toString();
  //       break;

  //     default:
  //       break;
  //   }
  // }
}
