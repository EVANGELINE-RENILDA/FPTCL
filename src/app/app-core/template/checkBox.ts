import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Row } from '../../app-core/core-component/core-component.component';
import { AppSafePipe } from '../../common/pipes/app-safe/app-safe.pipe';
import { FormInputControl } from '../form-input/form-input-control';

@Component({
  selector: 'check-box',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule, Row, AppSafePipe, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    @switch (__type) { @default {
    <div class="app-check-box">
      <div class="check-box-label">{{ label }}</div>
      <div class="appCus-checkbox d-flex align-items-center gap16">
        @for (obj of __objArray; track $index) {
        <div
          class="checkbox-bg"
          [ngClass]="{
            errorChecked:
              value === '' && control?.control?.invalid && __errorTrue
          }"
        >
          <mat-checkbox
            (change)="checkBoxChange($event, obj)"
            [checked]="value === obj.trueValue"
            [disabled]="__btnClicked"
          >
            @if(obj.label !== ''){
            <div [innerHTML]="obj.label | appSafe : 'html'">
              {{ obj.label }}
            </div>
            }
          </mat-checkbox>
        </div>
        }
      </div>
    </div>
    } @case ('horCheck') {
    <div class="hor-check-box">
      <row>
        <div class="col-md-5 end">
          <div class="check-box-label">
            {{ label }}
            @if(__required) {
            <span class="text-danger pl2 fs16">*</span>
            }
          </div>
        </div>
        <div class="col-md-4">
          <div class="appCus-checkbox d-flex align-items-center gap8">
            @for (obj of __objArray; track $index) {
            <div
              class="checkbox-bg"
              [ngClass]="{
                errorChecked:
                  value === '' && control?.control?.invalid && __errorTrue
              }"
            >
              <mat-checkbox
                [name]="name + addOnID + $index"
                (change)="checkBoxChange($event, obj)"
                [checked]="value === obj.trueValue"
                [disabled]="__btnClicked"
              >
                @if(obj.label !== ''){{{obj.label}}}
              </mat-checkbox>
            </div>
            }
          </div>
        </div>
        <div class="col-md-3">
          <div class="horizontal-error pt8">
            <div class="label-container-right">
              @if((value === '' || value === 0) && control?.control?.invalid &&
              __errorTrue){
              <div class="error-text">This field is required</div>
              }
            </div>
          </div>
        </div>
      </row>
    </div>
    } @case ('dualHorCheck') {
    <div class="dual-check-box">
      <div class="appCus-checkbox flex align-items-center">
        @for (obj of __objArray; track $index) {
        <div
          class="dual-checkbox-bg"
          [ngClass]="{
            errorChecked:
              value === '' && control?.control?.invalid && __errorTrue
          }"
        >
          <!-- @if(value){ -->
          <mat-checkbox
            [name]="name + addOnID + $index"
            (change)="checkBoxChange($event, obj)"
            [checked]="value === obj.trueValue"
            [disabled]="__btnClicked"
          >
            @if(obj.label !== ''){
            {{ obj.label }}
            }
          </mat-checkbox>
          <!-- } -->
        </div>
        }
      </div>
    </div>
    } @case ('horCheckWithoutError') {
    <div class="hor-check-box">
      <row>
        <div class="col-md-8 ">
          <div class="check-box-label text-left d-block" >
            {{ label }}
            @if(__required) {
            <span class="text-danger pl2 fs16">*</span>
            }
          </div>
        </div>
        <div class="col-md-4">
          <div class="appCus-checkbox d-flex align-items-center gap16">
            @if(isLoaded){ @for (obj of __objArray; track $index) {
            <div
              class="checkbox-bg"
              [ngClass]="{
                errorChecked:
                  value === '' && control?.control?.invalid && __errorTrue
              }"
            >
              <!-- @if(value){ -->
              <mat-checkbox
                [name]="name + addOnID + $index"
                (change)="checkBoxChange($event, obj)"
                [checked]="value === obj.trueValue"
                [disabled]="__btnClicked"
              >
                @if(obj.label !== ''){
                <div [innerHTML]="obj.label | appSafe : 'html'">
                  {{ obj.label }}
                </div>
                }
              </mat-checkbox>
              <!-- } -->
            </div>
            } }
          </div>
        </div>
      </row>
    </div>
    } @case ('horCheckCus') {
    <div class="hor-check-box">
      <row>
        <div class="col-md-4 flex align-items-center justify-content-start">
          <div class="check-box-label">
            {{ label }}
            @if(__required) {
            <span class="text-danger pl2 fs16">*</span>
            }
          </div>
        </div>
        <div class="col-md-5">
          <div class="appCus-checkbox d-flex align-items-center gap16">
            @for (obj of __objArray; track $index) {
            <div
              class="checkbox-bg"
              [ngClass]="{
                errorChecked:
                  value === '' && control?.control?.invalid && __errorTrue
              }"
            >
              <mat-checkbox
                [name]="name + addOnID + $index"
                (change)="checkBoxChange($event, obj)"
                [checked]="value === obj.trueValue"
                [disabled]="__btnClicked"
                color="primary"
              >
                @if(obj.label !== ''){
                {{ obj.label }}
                }
              </mat-checkbox>
            </div>
            }
          </div>
        </div>
        <div class="col-md-3">
          <div class="horizontal-error pt8">
            <div class="label-container-right">
              @if(value === '' &&control?.control?.invalid && __errorTrue){
              <div class="error-text">This field is required</div>
              }
            </div>
          </div>
        </div>
      </row>
    </div>
    } @case ('horDisabledValue') {
    <div class="hor-check-box">
      <row>
        <div class="col-md-6 end">
          <div class="check-box-label1">{{ label }}</div>
        </div>
        <div class="col-md-6">
          <div class="appCus-checkbox d-flex align-items-center gap16">
            @for (obj of __objArray; track $index) {
            <div
              class="checkbox-bg"
              [ngClass]="{
                errorChecked:
                  value === '' && control?.control?.invalid && __errorTrue
              }"
            >
              <mat-checkbox
                (change)="checkBoxChange($event, obj)"
                [checked]="value === obj.trueValue"
                [disabled]="true"
              >
                @if(obj.label !== ''){
                {{ obj.label }}
                }
              </mat-checkbox>
            </div>
            }
          </div>
        </div>
      </row>
    </div>
    } }
  `,
})
export class AppCheckBoxComponent
  extends FormInputControl
  implements OnInit, OnDestroy
{
  __xvalue: any = '';
  __objArray: any = [];
  @Input() set objArray(objArray: any) {
    this.__objArray = objArray || [];
  }
  get objArray() {
    return this.__objArray;
  }
  isLoaded = true;
  changesubscribe: any;
  constructor(@Self() @Optional() public control: NgControl) {
    super();
    this.generatePNR();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;

    this.setValidate(this.control);
    
  }

  ngOnDestroy(): void {
    if (this.changesubscribe) {
      this.changesubscribe.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.changesubscribe = this.viewValueChange().subscribe(
      async (xValue: any) => {
        this.isLoaded = false;
        setTimeout(() => {
          this.isLoaded = true;
        }, 300);
      }
    );
  }

  checkBoxChange(event: any, obj: any) {
    if (this.__objArray.length > 1) {
      this.value = event.checked ? obj.trueValue : '';
    } else {
      this.value = event.checked ? obj.trueValue : obj.falseValue;
    }

    // if (!event.checked) {
    //   const otherCheckbox = this.__objArray.find(
    //     (item: any) => item.trueValue !== obj.trueValue
    //   );
    //   if (otherCheckbox) {
    //     this.value = otherCheckbox.trueValue;
    //   }
    // }

    this.onAction('change');
  }
}
