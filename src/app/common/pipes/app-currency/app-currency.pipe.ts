import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'appCurrency',
  standalone: true,
})

export class AppCurrencyPipe implements PipeTransform {

  constructor(
    // public currencyPipe: CurrencyPipe
  ) { }

  transform(value: any): any {
    // let currencyCode = "USD";





    // if (!value || value === 0) {
      let zvalue = parseFloat(value).toFixed(2);
      return zvalue;
    // }
    // else{
    //   const xValue = this.currencyPipe.transform(value, currencyCode, '');
    //   return xValue;
    // }
  }
}
