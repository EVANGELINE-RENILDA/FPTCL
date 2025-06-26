import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AppCurrencyPipe } from '../../../../../common/pipes/app-currency/app-currency.pipe';

@Component({
  selector: 'app-budget-ceiling-loop',
  standalone: true,
  imports: [NgClass,AppCurrencyPipe],
  templateUrl: './budget-ceiling-loop.component.html',
  styleUrl: './budget-ceiling-loop.component.scss'
})
export class BudgetCeilingLoopComponent {
  keyName: any = '';
  index: any = '';
  listLength: any = 0;
  openedTrue = false;
  _listofData: any = [];

  @Input()
  set listofData(listofData: any) {
    this._listofData = listofData || [];
  }
  get listofData() {
    return this._listofData;
   }

  _closingData: any = [];

  @Input()
  set closingData(closingData: any) {
    this._closingData = closingData || [];
  }
  get closingData() {
    return this._closingData;
  }
  @Input() public closeData: any = [];
  @Input() public closeAllData: any = [];
  @Input() public testList: any = [];
  @Input() public checked: boolean = false;
  @Input() public reportBudgetCeiling: any = [];



  openFn() {
    this.openedTrue = !this.openedTrue;
  }
}
