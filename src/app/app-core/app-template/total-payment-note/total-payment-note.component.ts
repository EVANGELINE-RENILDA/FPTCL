import { Component, effect, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'total-payment-note',
  standalone: true,
  imports: [],
  template: ''
})
export class TotalPaymentNoteComponent {
  @Input() decimal = "2";
  @Input() totalKeyName = "";

  @Input() exchangeRateArray: any = [];
  @Output() exchangeRateArrayChange = new EventEmitter();

  __items: any;

  @Input() set items(items: any) {
    this.__items = items;
  }

  __updateSequence = signal(0);
  @Input() set updateSequence(updateSequence: any) {
    this.__updateSequence.set(updateSequence);
  }

  constructor() {
    effect(() => {
      const __updateSequence = this.__updateSequence();
      this.doCalculate();
    });
  }

  doCalculate() {
    if (!this.__items) return;
    let totalToAmount = 0;
    let totalExchangeGain = 0;
    let totalExchangeLoss = 0;

    let localExchangeGain = 0;
    let localExchangeLoss = 0;


    for (const element of this.__items) {
      totalToAmount = totalToAmount + parseFloat(element[this.totalKeyName]);

    }

    this.exchangeRateArray.forEach((element: any) => {
      switch (element.descriptionConst) {
        case "TLDIS":
          // element.documentCurrencyAmount = obj.totalAfterDiscount;
          // element.reportingCurrencyAmount = obj.totalAfterDiscountReportingCurrency;
          break;
        default:
          break;
      }
    });

    setTimeout(() => {
      this.exchangeRateArrayChange.emit(this.exchangeRateArray);
      // this.onCalculated.emit(obj);
    }, 100);


  }
}
