import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import { InnerScroll } from '../../../../../../app-core/core-component/core-component.component';
import { FormsModule, NgForm } from '@angular/forms';
import { entSalSalesInvoice } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { AppAccessDirective } from '../../../../../../common/permission/app-access.directive';
import { AutoSearchItemsComponent } from '../../../../../search/auto-search-items/auto-search-items.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { NgTemplateOutlet } from '@angular/common';
import { ItemValueComponent } from '../../../../../../app-core/app-template/item-value/item-value.component';
import { SearchDebitComponent } from '../../../../../search/search-debit/search-debit.component';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { TotalValueComponent } from '../../../../../../app-core/app-template/total-value/total-value.component';

@Component({
  selector: 'app-sales-item',
  standalone: true,
  imports: [InnerScroll, InputControlComponent, FormsModule, IconButtonComponent, AppAccessDirective, AutoSearchItemsComponent, NgTemplateOutlet, ItemValueComponent, SearchDebitComponent, TotalValueComponent],
  templateUrl: './sales-item.component.html',
  styleUrl: './sales-item.component.scss'
})
export class SalesItemComponent {
  pageId = ""
  @Input() salesInvoice = new entSalSalesInvoice();
  @Output() salesInvoiceChange = new EventEmitter();
  errorTrue = false;

  itemUpdated = 0;
  isNarrationOpened = false;
  constructor(public accountsService: AccountsApiService) { }



  createNewSalesInvoiceItem() {
    this.accountsService.createNewSalesInvoiceItem().subscribe((success) => {
      console.log(success);
      if (this.salesInvoice.isExport === 'Y') {
        success.taxPercentage = 0;
        success.taxCodeValue = 'VAT-B';
      }
      this.salesInvoice.plistentSalSalesInvoiceItem.push(success);
      this.salesInvoiceChange.emit(this.salesInvoice);
    })
  }

  // Page Design

  canAddItem() {
    return this.salesInvoice.crmCustomerId !== 0 && this.salesInvoice.documentDate !== '';
  };
  isEditDisabled() {
    return ["APROV", "CANCL"].includes(this.salesInvoice.statusValue);
  };

  toggleNarration() {
    this.isNarrationOpened = !this.isNarrationOpened;
  }


  itemsDelete(element: any, index: any) {

  }

  doSelectLedgerName(event: any, element: any, index: any) {
    element[index].itemLedgerId = event.invItemId;
    element[index].strItemLedgerCode = event.itemCode;
    this.getItemSelect(event,index);
  }
  doSelectLedgerName1(event: any, element: any, index: any) {
    debugger
    element[index].itemLedgerCode = event.codeName;
    element[index].itemLedgerName = event.ledgerName;
    element[index].itemLedgerId = event.actLedgerId;
  }
  getItemSelect(event: any, index: any) {
    let salesInvoiceRAWData = new entSalSalesInvoice();
    this.salesInvoice.plistentSalSalesInvoiceItem[index].pentInvItem.itemCode = event.itemCode;
    salesInvoiceRAWData.pentInvItem = this.salesInvoice.plistentSalSalesInvoiceItem[index].pentInvItem;
    salesInvoiceRAWData.appActVoucherConfigId = this.salesInvoice.appActVoucherConfigId;
    let selectedItem = JSON.parse(
      JSON.stringify(this.salesInvoice.plistentSalSalesInvoiceItem[index])
    );
    this.accountsService.setItemDetailsForSalesInvoice(salesInvoiceRAWData)
      .subscribe((success) => {
        console.log(success);
        this.salesInvoice.plistentSalSalesInvoiceItem[index] = success;
        this.salesInvoice.plistentSalSalesInvoiceItem[
          index
        ].salSalesInvoiceItemId = selectedItem.salSalesInvoiceItemId;
        this.salesInvoice.plistentSalSalesInvoiceItem[index].updateSeq =
          selectedItem.updateSeq;
        this.salesInvoice.plistentSalSalesInvoiceItem[index].idoObjState =
          selectedItem.idoObjState;
        this.salesInvoice.plistentSalSalesInvoiceItem[
          index
        ].saleSalesInvoiceId = selectedItem.saleSalesInvoiceId;
        if (this.salesInvoice.isExport === 'Y') {
          this.salesInvoice.plistentSalSalesInvoiceItem[
            index
          ].taxPercentage = 0;
          this.salesInvoice.plistentSalSalesInvoiceItem[index].taxCodeValue =
            'VAT-B';
        } else {
          this.getTaxPercentageByItemIdAndEffectiveDate(
            this.salesInvoice.plistentSalSalesInvoiceItem[index].itemId,
            index
          );
        }
        this.salesInvoiceChange.emit(this.salesInvoice);
      });
  }
  getTaxPercentageByItemIdAndEffectiveDate(itemId: any, index: any) {
    if (itemId !== 0) {
      const obj = {
        data: itemId,
        data1: this.salesInvoice.documentDate,
      };
      this.accountsService
        .getTaxPercentageByItemIdAndEffectiveDate(obj)
        .subscribe((success) => {
          if (success.data === 'VAT-A') {
            this.salesInvoice.plistentSalSalesInvoiceItem[index].taxPercentage =
              success.data1;
          }
          else {
            this.salesInvoice.plistentSalSalesInvoiceItem[index].taxPercentage = '0';
          }
          this.salesInvoiceChange.emit(this.salesInvoice);
        });
    }
  }

  onTotalValue(event: any) {
    debugger
    this.salesInvoice.totalAfterDiscount = event.totalAfterDiscount;
    this.salesInvoice.totalTaxAmount = event.taxAmount;
    this.salesInvoice.totalNetAmount = event.netAmount;
    this.salesInvoice.netAmount = event.netAmount;
    this.salesInvoiceChange.emit(this.salesInvoice);
  }

  getExchangeRateLst(event: any) {
    console.log(event);
    this.salesInvoiceChange.emit(this.salesInvoice);
  }
}
