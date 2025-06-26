import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, signal } from '@angular/core';
import { AutoGetItemComponent } from '../../../../search/auto-get-item/auto-get-item.component';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { FormsModule } from '@angular/forms';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { entSalReceiptNote } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { autoSearchItems } from '../../../../purchase/voucher/purchase-invoice/purchase-invoice-detail/purchase-invoice-detail.component';
import { DataService } from '../../../../../common/services/data/data.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { CoreService } from '../../../../../app-core/service/core.service';

@Component({
  selector: 'app-receipt-note-items',
  standalone: true,
  imports: [AutoGetItemComponent,Row,InnerScroll,FormsModule, InputControlComponent, IconButtonComponent, ViewLabel,],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './receipt-note-items.component.html',
  styleUrl: './receipt-note-items.component.scss'
})
export class ReceiptNoteItemsComponent {
@Input() receiptNote = new entSalReceiptNote();
@Input() regionDetailValue = '';
@Output() receiptNoteChange = new EventEmitter();
__isDisabled = signal(true);
autoSearchItems = new autoSearchItems();
saleOrderId = 0
errorTrue = false

constructor(public data: DataService, public accountsService: AccountsApiService,public dialog : CoreService){

}
doGetItemSelect(event: any) {
  this.saleOrderId = event.id;
  this.autoSearchItems.autoSearchItemId = event.id;
  this.autoSearchItems.autoSearchText = event.name;
}

updateStatus() {
  this.__isDisabled.set(this.receiptNote.statusValue !== 'APROV' && this.receiptNote.statusValue !== 'CANCL' && this.receiptNote.statusValue !== 'PENAP');
}
lstentSalReceiptNoteDetailRaw: any = [];
createNewReceiptNoteDetailForSo() {
  if (this.saleOrderId !== 0) {
    if (this.checkAlreadyExists(this.saleOrderId)) {
      const obj = {
        data: this.saleOrderId,
        data1: this.receiptNote.iActVoucherConfig.voucherTypeValue,
      };
      this.accountsService
        .createNewReceiptNoteDetailForSI(obj)
        .subscribe((success) => {
          this.clearDisplayText();
          success.plstentSalReceiptNoteDetail.forEach((e: any) => {
            this.receiptNote.lstentSalReceiptNoteDetail.push(JSON.parse(JSON.stringify(e)));
            this.lstentSalReceiptNoteDetailRaw.push(JSON.parse(JSON.stringify(e)));
          });
          // this.initialLoad = false;
          this.receiptNoteChange.emit(this.receiptNote)
        });
    }
  } else {
    this.data.errorInfoMessage(
      'Please select sales order reference number'
    );
  }
}
tableItemData:any =[]
clearDisplayText() {
  this.autoSearchItems = new autoSearchItems();
  
}
checkAlreadyExists(val: any) {
  if (this.receiptNote.lstentSalReceiptNoteDetail.length !== 0) {
    for (
      let i = 0;
      i < this.receiptNote.lstentSalReceiptNoteDetail.length;
      i++
    ) {
      if (
        this.receiptNote.lstentSalReceiptNoteDetail[i].salSalesInvoiceId !== 0
      ) {
        if (
          this.receiptNote.lstentSalReceiptNoteDetail[i].salSalesInvoiceId ===
          val
        ) {
          let refNumber =
            this.receiptNote.lstentSalReceiptNoteDetail[i].ibusSalesInvoice
              .saleInvoiceReferenceNo;
          this.data.errorInfoMessage(
            'The selected document no (' +
            refNumber +
            ') has been already added in list'
          );
          return false;
        }
      }
    }
    this.receiptNoteChange.emit(this.receiptNote)
  }
  return true;
}
hideBtnBasedonStatus() {
  debugger
  let hideButton;
  if (
    this.receiptNote.statusValue === 'APROV' ||
    this.receiptNote.statusValue === 'CANCL'
  ) {
    hideButton = true;
  } else {
    hideButton = false;
  }
  return hideButton;
}
async itemsDelete(val: any, index: any) {
  let msg = `you want to delete this Item ?`;
  let response = await this.dialog.checkDelete(msg);
  if (response) {
    if (val.actCreditNoteItemId !== 0) {
      this.deleteReceiptNoteDetail(val, index);
    } else {

      this.receiptNote.lstentSalReceiptNoteDetail.splice(index, 1);
      this.tableItemData = this.receiptNote.lstentSalReceiptNoteDetail
      this.data.successMessage('Item removed successfully');
    }
  }
}

deleteReceiptNoteDetail(val: any, i: any) {
  this.receiptNote.lstentSalReceiptNoteDetail[i].sreDeletedFlag = 'Y';
  this.accountsService.deleteReceiptNoteDetail(this.receiptNote)
    .subscribe((success) => {
      this.receiptNote = success;
      this.receiptNoteChange.emit(this.receiptNote)
    });
}
}
