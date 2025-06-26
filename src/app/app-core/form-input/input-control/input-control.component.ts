import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormInputControl } from '../form-input-control';
import { FormsModule, NgControl, NgForm } from '@angular/forms';
import { NoEmojiDirective } from '../form-directive/no-emoji/no-emoji.directive';
import { UpperCaseDirective } from '../form-directive/upper-case/upper-case.directive';
import { LowerCaseDirective } from '../form-directive/lower-case/lower-case.directive';
import { LimitDirective } from '../form-directive/limit/limit.directive';
import { JsonPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { FilterAndSortPipe } from '../pipes/filter-and-sort/filter-and-sort.pipe';
import { MatSelectModule } from '@angular/material/select';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { CustomDateAdapter } from './custom-date-adapter';
import { Platform } from '@angular/cdk/platform';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { addDays, format, isMatch, isValid, parse, subYears } from 'date-fns';
import { AppSettingsService } from '../../../common/services/app-settings/app-settings.service';
import { NumberOnlyDirective } from '../form-directive/number-only/number-only.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { CharacterOnlyDirective } from '../form-directive/character-only/character-only.directive';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

export const MY_FORMATS = {
  parse: {
    dateInput: 'dd-MM-yyyy HH:mm',
  },
  display: {
    dateInput: 'dd MMM yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd MMM yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NgClass,
    NgTemplateOutlet,
    FormsModule,
    NoEmojiDirective,
    UpperCaseDirective,
    LowerCaseDirective,
    LimitDirective,
    FilterAndSortPipe,
    MatSelectModule,
    MatDatepickerModule,
    NumberOnlyDirective,
    MatTooltipModule,
    AppDatePipe,
    CharacterOnlyDirective,
    JsonPipe,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class InputControlComponent
  extends FormInputControl
  implements OnInit, OnDestroy
{
  __xvalue: any = '';
  __minDate: any = '';
  __maxDate: any = '';
  __isAdult = false;
  __isMinor = false;
  __hideFuture = false;
  __subYears = 18;
  @Input() isFuture = false;
  @ViewChild('picker') picker: any;
  // @Output('extraButtonClicked') extraButtonClicked: EventEmitter<any> = new EventEmitter();
  @Input() showExtraSpace = false;

  // @ContentChild('oldHtml') oldHtml!: TemplateRef<any>;

  // @Input()
  // set minDate(minDate: string) {
  //   this.getParsedDate(minDate).then((result: any) => {
  //     if (result) this.__minDate = result;
  //   })
  // }
  // get minDate() {
  //   return this.__minDate;
  // }

  // @Input()
  // set maxDate(maxDate: string) {
  //   this.getParsedDate(maxDate).then((result: any) => {
  //     if (result) this.__maxDate = result;
  //   })
  // }
  // get maxDate() {
  //   return this.__maxDate;
  // }

  @Input()
  set minDate(minDate: string) {
    if (minDate !== '') {
      this.getParsedDate(minDate).then((result: any) => {
        if (result) {
          if (!this.isFuture) {
            this.__minDate = result;
          } else {
            this.__minDate = addDays(result, 1);
          }
        }
      });
    } else {
      this.__minDate = '';
    }
  }
  get minDate() {
    return this.__minDate;
  }

  @Input()
  set maxDate(maxDate: string) {
    if (maxDate !== '') {
      this.getParsedDate(maxDate).then((result: any) => {
        if (result) this.__maxDate = result;
      });
    } else {
      this.__maxDate = '';
    }
  }
  get maxDate() {
    return this.__maxDate;
  }

  @Input()
  set isAdult(isAdult: boolean) {
    this.__isAdult = isAdult || false;
    this.__isAdult
      ? (this.__maxDate = subYears(new Date(), this.__subYears))
      : '';
  }
  get isAdult() {
    return this.__isAdult;
  }
  __isContactNo = false;

  @Input()
  set isContactNo(isContactNo: boolean) {
    this.__isContactNo = isContactNo || false;
  }
  get isContactNo() {
    return this.__isContactNo;
  }

  @Input()
  set isMinor(isMinor: boolean) {
    this.__isMinor = isMinor || false;
    this.__isMinor
      ? (this.__minDate = subYears(new Date(), this.__subYears))
      : '';
  }
  get isMinor() {
    return this.__isMinor;
  }

  @Input()
  set hideFuture(hideFuture: boolean) {
    this.__hideFuture = hideFuture || false;
    this.__hideFuture ? (this.__maxDate = new Date()) : '';
  }
  get hideFuture() {
    return this.__hideFuture;
  }

  dateChangeSubscribe: any;

  constructor(
    @Self() @Optional() public control: NgControl,
    public appSetting: AppSettingsService,
    private overlay: Overlay,
    public viewContainerRef: ViewContainerRef
  ) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
    // this.closeOverlay();
  }

  // isExtraButtonClicked(){
  //   this.extraButtonClicked.emit();
  // }

  ngOnInit(): void {
    if (this.__type === 'date') {
      this.dateChangeSubscribe = this.viewValueChange().subscribe(
        async (xValue: any) => {
          if (xValue) {
            if (
              this.value &&
              this.value !== '' &&
              typeof this.value === 'string'
            ) {
              this.__xvalue = await this.getParsedDate(this.value.toString());
            } else {
              this.__xvalue = '';
            }
          }
        }
      );
    }
    if (this.__type === 'time') {
      this.dateChangeSubscribe = this.viewValueChange().subscribe(
        async (xValue: any) => {
          if (xValue) {
            if (
              this.value &&
              this.value !== '' &&
              typeof this.value === 'string'
            ) {
              console.log(this.value);
              const timeParts = this.value.split(':');
              let hours = parseInt(timeParts[0]);
              this.minutes = timeParts[1];
              this.meridiem = 'AM';
              if (hours > 12) {
                this.meridiem = 'PM';
                hours -= 12;
              }
              if (hours < 10) {
                this.hour = '0' + hours;
                // this.hour = hours.toString();
              } else {
                this.hour = hours.toString();
              }
              this.__xvalue = `${this.hour}:${this.minutes} ${this.meridiem}`;
            } else {
              this.__xvalue = '';
              this.hour = format(new Date(), 'hh');
              this.minutes = format(new Date(), 'mm');
              this.meridiem = format(new Date(), 'a');
            }
          }
        }
      );
    }
    this.setValidate(this.control);
    this.generatePNR();
  }

  ngOnDestroy(): void {
    if (this.dateChangeSubscribe) {
      this.dateChangeSubscribe.unsubscribe();
    }
  }

  isSelectOpened(event: any) {
    if (event) {
      this.__selectSearchInput = '';
      // setTimeout(() => {
      //   this.formInput?.nativeElement.focus();
      // }, 200);
    }
  }

  getParsedDate(date: string) {
    return new Promise((resolve) => {
      if (!date) resolve(null);
      let parseFormat = '';
      if (isMatch(date, this.appSetting.environment.serverDateFormat))
        parseFormat = this.appSetting.environment.serverDateFormat;
      if (isMatch(date, this.appSetting.environment.serverDateFormatWithTime))
        parseFormat = this.appSetting.environment.serverDateFormatWithTime;
      if (parseFormat === '') resolve(null);
      let parsedDate = parse(date, parseFormat, new Date());

      resolve(parsedDate);
    });
  }

  onDateChange() {
    if (!isValid(this.__xvalue)) return;
    this.value = format(
      this.__xvalue,
      this.appSetting.environment.serverDateFormat
    );
    this.onChange.next(this.value);
    this.onAction('change');
  }

  onLocalClear() {
    if (this.__type === 'date') {
      this.value = '';
      this.__xvalue = '';
    }
    if (this.__type === 'time') {
      this.clearAll();
    }
    this.onAction('clear');
  }

  // time control
  setupClick(type: any, val: any) {
    switch (type) {
      case 'hour':
        let hour = parseFloat(this.hour);
        let newHour = hour + val;
        newHour < 1 ? (newHour = 12) : '';
        newHour > 12 ? (newHour = 1) : '';
        this.hour = newHour < 10 ? '0' + newHour : newHour.toString();
        break;
      case 'minutes':
        let minutes = parseFloat(this.minutes);
        let newMinutes = minutes + val;
        newMinutes < 0 ? (newMinutes = 59) : '';
        newMinutes > 59 ? (newMinutes = 0) : '';
        this.minutes =
          newMinutes < 10 ? '0' + newMinutes : newMinutes.toString();
        break;

      default:
        break;
    }
  }
  async openOverlay() {
    this.timeTemplateOpen = true;
    setTimeout(() => {
      if (!this.formInput || !this.formInput.nativeElement) {
        console.error('formInput element is not available.');
        return;
      }
      const positionStrategy = this.overlay
        .position()
        .flexibleConnectedTo(this.formInput.nativeElement)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
        ]);

      const overlayConfig = new OverlayConfig({
        positionStrategy,
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop',
        scrollStrategy: this.overlay.scrollStrategies.close(),
        panelClass: 'custom-overlay-panel',
      });

      this.overlayRef = this.overlay.create(overlayConfig);
      const templatePortal = new TemplatePortal(
        this.dropdownTemplate,
        this.viewContainerRef
      );
      this.overlayRef.attach(templatePortal);
      this.overlayRef.backdropClick().subscribe(() => this.closeOverlay());
    }, 100);
  }

  closeOverlay() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      // this.overlayRef = null;
    }
  }

  clearAll() {
    this.value = '';
    this.__xvalue = '';
    this.timeTemplateOpen = false;
    this.closeOverlay();
  }

  submitDate() {
    let hour = parseFloat(this.hour);
    if (this.meridiem === 'PM') {
      hour = hour + 12;
    }
    if (hour === 24) {
      hour = 0;
    }
    let hourString = hour < 10 ? '0' + hour : hour.toString();
    this.value = hourString + ':' + this.minutes.toString();
    this.__xvalue = `${this.hour}:${this.minutes} ${this.meridiem}`;
    this.closeOverlay();
  }
}
