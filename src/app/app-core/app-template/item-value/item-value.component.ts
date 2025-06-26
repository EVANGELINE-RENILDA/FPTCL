import { Component, EventEmitter, Input, Output, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'item-value',
  standalone: true,
  imports: [],
  template: '<ng-content></ng-content>'
})
export class ItemValueComponent {
  @Input() decimal = "2";
  @Input() item: any;
  @Output() itemChange = new EventEmitter();

  @Input() updateSequence = 0;
  @Output() updateSequenceChange = new EventEmitter();

  @Input() totalBeforeDiscount = "";
  @Input() discountValue = "";
  @Input() totalAfterDiscount = "";
  @Input() totalAfterDiscountReportingCurrency = "";
  @Input() taxAmount = "";
  @Input() total = "";
  @Input() totalReportingCurrency = "";

  __quantity = signal(0);
  @Input() set quantity(quantity: string) {
    quantity = quantity ? quantity : '0';

    this.__quantity.set(parseFloat(quantity));
  }

  __unitPrice = signal(0);
  @Input() set unitPrice(unitPrice: string) {
    unitPrice = unitPrice ? unitPrice : '0';
    this.__unitPrice.set(parseFloat(unitPrice));
  }

  __discountPercentage = signal(0);
  @Input() set discountPercentage(discountPercentage: string) {
    discountPercentage = discountPercentage ? discountPercentage : '0';
    this.__discountPercentage.set(parseFloat(discountPercentage));
  }

  __currencyRate = signal(0);
  @Input() set currencyRate(currencyRate: string) {
    currencyRate = currencyRate ? currencyRate : '0';
    this.__currencyRate.set(parseFloat(currencyRate));
  }
  __taxPercentage = signal(0);
  @Input() set taxPercentage(taxPercentage: string) {
    taxPercentage = taxPercentage ? taxPercentage : '0';
    this.__taxPercentage.set(parseFloat(taxPercentage));
  }

  __totalBeforeDiscount = computed(() => this.roundOff(this.__quantity() * this.__unitPrice()))

  __discountValue = computed(() => this.roundOff(this.__totalBeforeDiscount() * (this.__discountPercentage() / 100)))

  __totalAfterDiscount = computed(() => this.__totalBeforeDiscount() - this.__discountValue());

  __totalAfterDiscountReportingCurrency = computed(() => this.roundOff(this.__totalAfterDiscount() * this.__currencyRate()));

  __taxAmount = computed(() => this.roundOff((this.__totalAfterDiscount() * this.__taxPercentage()) / 100));

  __total = computed(() => this.__totalAfterDiscount() + this.__taxAmount());

  __totalReportingCurrency = computed(() => this.roundOff(this.__total() * this.__currencyRate()));


  constructor() {
    effect(() => {
      const __total = this.__total();
      this.updateValues();
    });
  }

  roundOff(number: any) {
    let precision = parseFloat(this.decimal);
    let shift = (number: any, exponent: any) => {
      var numArray = ('' + number).split('e');
      return +(
        numArray[0] +
        'e' +
        (numArray[1] ? +numArray[1] + exponent : exponent)
      );
    };
    let value = shift(Math.round(shift(number, +precision)), -precision);
    return value;
  }

  updateValues() {

    this.totalBeforeDiscount !== '' ? this.item[this.totalBeforeDiscount] = this.convertToString(this.__totalBeforeDiscount()) : '';
    this.discountValue !== '' ? this.item[this.discountValue] = this.convertToString(this.__discountValue()) : '';
    this.totalAfterDiscount !== '' ? this.item[this.totalAfterDiscount] = this.convertToString(this.__totalAfterDiscount()) : '';
    this.totalAfterDiscountReportingCurrency !== '' ? this.item[this.totalAfterDiscountReportingCurrency] = this.convertToString(this.__totalAfterDiscountReportingCurrency()) : '';
    this.taxAmount !== '' ? this.item[this.taxAmount] = this.convertToString(this.__taxAmount()) : '';
    this.total !== '' ? this.item[this.total] = this.convertToString(this.__total()) : '';
    this.totalReportingCurrency !== '' ? this.item[this.totalReportingCurrency] = this.convertToString(this.__totalReportingCurrency()) : '';
    this.itemChange.emit(this.item);
    this.updateSequenceChange.emit(this.updateSequence + 1);
  }

  convertToString(value: any) {
    let decimal = parseFloat(this.decimal);
    let [integerPart, decimalPart] = value.toString().split(".");
    if (!decimalPart) {
      decimalPart = "";
    }
    while (decimalPart.length < this.decimal) {
      decimalPart += "0";
    }
    decimalPart = decimalPart.slice(0, decimal);
    return `${integerPart}.${decimalPart}`;
  }
}
