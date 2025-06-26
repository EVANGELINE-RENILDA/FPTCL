import { AfterContentInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteModule, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { AutoInputControl } from './auto-input';
import { NgClass } from '@angular/common';

@Component({
  selector: 'auto-complete',
  standalone: true,
  imports: [MatAutocompleteModule, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './auto-complete-latest.component.html',
  styleUrl: './auto-complete-latest.component.scss'
})
export class AutoCompleteLatestComponent extends AutoInputControl {
  @ViewChild('inputField') inputField!: ElementRef;
  @ViewChild('autoTrigger') autoTrigger!: MatAutocompleteTrigger;
  @ViewChild('autoComplete') autoComplete!: MatAutocomplete;
  inputTimeOut: any;

  displayFn = (item: any) => {
    console.log('check value length',item)
    if (typeof item === 'string') { return item && item ? item : ''; }
    else { return item && item[this.__keyName] ? item[this.__keyName] : ''; }
  }

  optionSelected(event: any) {
    this.onSelect.emit(event.option?.value);
  }

  setValue(value: any) {
    let index = this.__items.map((e: any) => e[this.key]).indexOf(value[this.key]);
    if (index === -1) { this.__items.push(value) };
    setTimeout(() => {
      this.autoTrigger.writeValue(value);
      this.autoComplete.options.forEach((option: MatOption) => {
        option.deselect();
        if (option.viewValue === value[this.__keyName]) {
          option.select();
        }
      });
    }, 200);
  }

  doInput() {
    if (this.inputTimeOut) {
      clearTimeout(this.inputTimeOut);
    }
    this.inputTimeOut = setTimeout(() => {
      this.onChange.emit(this.inputField.nativeElement.value);
    }, 500);
  }

  onAction(type: any) {
    switch (type) {
      case 'clear':
        // this.autoComplete.
        this.inputField.nativeElement.value = "";
        this.autoComplete.options.forEach((option: MatOption) => {
          option.deselect();
        });
        this.onClear.emit();
        break;
      case 'search':
        this.onSearch.emit(this.inputField.nativeElement.value);
        break;
      default:
        break;
    }
  }

}
