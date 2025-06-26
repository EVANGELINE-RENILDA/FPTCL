import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-balance-sheet-loop',
  standalone: true,
  imports: [NgClass],
  templateUrl: './balance-sheet-loop.component.html',
  styleUrl: './balance-sheet-loop.component.scss'
})
export class BalanceSheetLoopComponent {
  @Input() public listAllData: any = [];
  @Input() public closeAllData: any = [];
  @Input() public closingData: any;
  openedTrue = false;
  data: any;
  closing: any;
  ytdChecked = true;

  constructor() { }

  __expandAll = false;
  @Input()
  set expandAll(expandAll: boolean) {
    console.log(this.__expandAll, '0');
    this.__expandAll = expandAll || false;
    this.openedTrue = expandAll;
  }
  get expandAll() {
    console.log(this.__expandAll, '1');
    return this.__expandAll;
  }

  ngOnInit(): void {
  }
  openFn() {
    this.openedTrue = !this.openedTrue;
  }
}
