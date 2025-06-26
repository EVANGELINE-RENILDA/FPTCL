import { NgClass, NgTemplateOutlet } from '@angular/common';
import { AfterContentInit, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-auto-complete',
  standalone: true,
  imports: [FormsModule, MatAutocompleteModule, NgTemplateOutlet, NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss'
})
export class AutoCompleteComponent implements OnInit, AfterContentInit {
  name = "";
  @Input('displayText') displayText = "";
  @Input('keyName') keyName = "";
  @Input('placeholder') placeholder = "";
  @Input('isShowSearch') isShowSearch = true;
  lastSelectedItem: any;

  @Output('onInput') onInput: EventEmitter<any> = new EventEmitter();
  @Output('onSearch') onSearch: EventEmitter<any> = new EventEmitter();
  @Output('onClear') onClear: EventEmitter<any> = new EventEmitter();
  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter();
  // val: any = this.displayText;
  __items: any = [];
  @Input()
  set items(items: any) { this.__items = items || []; }
  get items() { return this.__items; }

  __disabled = false;
  @Input()
  set disabled(disabled: boolean) { this.__disabled = disabled }
  get disabled() { return this.__disabled; }

  __errorTrue = false;
  @Input() set errorTrue(errorTrue: any) { this.__errorTrue = errorTrue || false; }
  get errorTrue() {
    return this.__errorTrue;
  }

  __errorText = "";
  @Input() set errorText(errorText: string) { this.__errorText = errorText || ""; }
  get errorText() { return this.__errorText; }

  __label = "";
  @Input() set label(label: string) { this.__label = label || ""; }
  get label() { return this.__label; }

  __required = false;
  @Input() set required(required: boolean) { this.__required = required || false; }
  get required() { return this.__required; }
  timeOut: any;

  @ContentChild('option') option!: any;
  optionTemplate!: TemplateRef<any>;
  myControl = new FormControl<string>('');
  constructor() {
    this.name = "autoComplete" + this.generatePNR();
  }

  ngOnInit(): void {
    // debuge
    // this.items = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => {
    //     const name = typeof value === 'string' ? value : '';
    //     return name ? this._filter(name as string) : this.options.slice();
    //   }),
    // );
  }

  ngAfterContentInit() {

    if (this.option) {
      this.optionTemplate = this.option;
    }
  }

  generatePNR() {
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let addOnID = '';
    const timestamp = Date.now().toString();
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumeric.length);
      addOnID += alphanumeric.charAt(randomIndex);
    }
    return addOnID;
  }

  onAction(type: any) {
    switch (type) {
      case 'input':
        if (this.timeOut) {
          clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(() => {
          this.onInput.emit(this.displayText);
        }, 500);
        break;
      case 'clear':
        this.displayText = '';
        this.onClear.emit();
        break;
      case 'search':
        this.onSearch.emit(this.displayText);
        break;
      default:
        break;
    }
  }

  // doInput) {
  //   if (this.timeOut) {
  //     clearTimeout(this.timeOut);
  //   }
  //   this.timeOut = setTimeout(() => {
  //     this.onSearch.emit(this.selectedText);
  //   }, 500);
  // }

  displayFn(item: any): string {
    if (typeof item === 'string') {
      return item && item ? item : '';
    }
    else {
      return item && item.codeName ? item.codeName : '';
    }

  }

  optionSelected(event: any,) {
    const selectedValue = event.option.value;
    this.displayText = selectedValue[this.keyName];
    this.onSelect.emit(selectedValue);
  }

}
