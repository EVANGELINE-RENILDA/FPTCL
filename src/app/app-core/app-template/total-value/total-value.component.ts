import { Component, EventEmitter, Input, Output, effect, signal } from '@angular/core';

@Component({
  selector: 'total-value',
  standalone: true,
  imports: [],
  template: '<ng-content></ng-content>'
})
export class TotalValueComponent {
  @Input() decimal = "2";
  @Input() items: any;
  // @Output() itemChange = new EventEmitter();
  @Input() exchangeRateArray: any = [];
  @Output() exchangeRateArrayChange = new EventEmitter();

  @Output() onCalculated = new EventEmitter();
  @Output() onExchangeRateCal = new EventEmitter();


  @Input() totalBeforeDiscount = "";
  @Input() discountValue = "";
  @Input() totalAfterDiscount = "";
  @Input() totalAfterDiscountReportingCurrency = "";
  @Input() taxAmount = "";
  @Input() total = "";
  @Input() totalReportingCurrency = "";

  __sameCurrency = false;

  @Input() set sameCurrency(sameCurrency: any) {
    this.__sameCurrency = sameCurrency || false;

  }

  __updateSequence = signal(0);
  @Input() set updateSequence(updateSequence: any) {
    this.__updateSequence.set(updateSequence);
  }

  __currencyRate = signal(0);
  @Input() set currencyRate(currencyRate: string) {
    currencyRate = currencyRate ? currencyRate : '0';
    this.__currencyRate.set(parseFloat(currencyRate));
  }

  constructor() {
    effect(() => {
      const __updateSequence = this.__updateSequence();
      this.doCalculate();
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

  async doCalculate() {
    // 
    const getRoundOff = this.exchangeRateArray.find((e: any) => e.descriptionConst === "RDOFF")?.documentCurrencyAmount;
    const roundOffValue = Number(getRoundOff) || 0;

    if (!this.items || this.items.length === 0) return;
    let finalTaxAmount = 0;
    let totalAfterDiscount = 0;
    let totalAfterDiscountReportingCurrency = 0;
    let netAmount = 0;
    for (const element of this.items) {
      const taxAmount = parseFloat(element[this.taxAmount]);

      const totalDiscount = parseFloat(element[this.totalAfterDiscount]);
      const totalDiscountRepCurrency = this.roundOff(totalDiscount * this.__currencyRate());
      finalTaxAmount += taxAmount;
      totalAfterDiscount += totalDiscount;
      totalAfterDiscountReportingCurrency += totalDiscountRepCurrency;
    }
    netAmount = finalTaxAmount + totalAfterDiscount;
    if (this.__sameCurrency) {
      netAmount = netAmount + roundOffValue;
    }
    let taxAmountReportingCurrency = this.roundOff(finalTaxAmount * this.__currencyRate());

    let obj = {
      taxAmount: finalTaxAmount.toFixed(parseFloat(this.decimal)),
      taxAmountReportingCurrency: taxAmountReportingCurrency.toFixed(parseFloat(this.decimal)),
      totalAfterDiscount: totalAfterDiscount.toFixed(parseFloat(this.decimal)),
      totalAfterDiscountReportingCurrency: totalAfterDiscountReportingCurrency.toFixed(parseFloat(this.decimal)),
      netAmount: netAmount.toFixed(parseFloat(this.decimal)),
      netAmountReportingCurrency: this.roundOff(totalAfterDiscountReportingCurrency + taxAmountReportingCurrency).toFixed(parseFloat(this.decimal))
    }

    this.exchangeRateArray.forEach((element: any) => {
      switch (element.descriptionConst) {
        case "TLDIS":
          element.documentCurrencyAmount = obj.totalAfterDiscount;
          element.reportingCurrencyAmount = obj.totalAfterDiscountReportingCurrency;
          break;
        case "TAX":
          element.documentCurrencyAmount = obj.taxAmount;
          element.reportingCurrencyAmount = obj.taxAmountReportingCurrency;
          break;
        case "NETAM":
          element.documentCurrencyAmount = obj.netAmount;
          element.reportingCurrencyAmount = obj.netAmountReportingCurrency;
          break;
        default:
          break;
      }
    });

    setTimeout(() => {
      this.exchangeRateArrayChange.emit(this.exchangeRateArray);
      this.onCalculated.emit(obj);
    }, 100);
  }

}
