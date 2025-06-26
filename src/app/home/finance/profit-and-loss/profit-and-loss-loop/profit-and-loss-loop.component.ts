import { NgClass } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-profit-and-loss-loop',
  standalone: true,
  imports: [NgClass],
  templateUrl: './profit-and-loss-loop.component.html',
  styleUrl: './profit-and-loss-loop.component.scss'
})
export class ProfitAndLossLoopComponent {
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

  ngOnInit(): void { }

  openFn() {
    this.openedTrue = !this.openedTrue;
  }
}
