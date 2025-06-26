import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { entActNetoutVoucherDetail, entActNetoutVoucher } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppCurrencyPipe } from "../../../../common/pipes/app-currency/app-currency.pipe";
import { FloatPipe } from "../../../../common/pipes/float/float.pipe";
import { AppFilterPipe } from "../../../../common/pipes/app-filter/app-filter.pipe";
import { CoreService } from '../../../../app-core/service/core.service';

@Component({
  selector: 'tr[app-netot-item-table-tr]',
  standalone: true,
  imports: [
    InputControlComponent,
    FormsModule,
    MatTooltipModule,
    AppCurrencyPipe,
    FloatPipe,
    AppFilterPipe,
    
],
  templateUrl: './netot-item-table-tr.component.html',
  styleUrl: './netot-item-table-tr.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[AppFilterPipe]
})
export class NetotItemTableTrComponent {
  pageId = 'NOVSC';
  voucherType = '';
  actVoucherConfigId: any = 0;
  actVoucherId: any = 0;
  DDLVoucherNo: any = [];
  DDLVouchers: any = [];
  // netVoucherDetail = new entActNetoutVoucherDetail();
  // netVoucherDetailRAW = new entActNetoutVoucherDetail();
  _items: any = new entActNetoutVoucherDetail();
  _itemsRAW: any = new entActNetoutVoucherDetail();
  netoutVoucher = new entActNetoutVoucher();
  netoutrRaw = new entActNetoutVoucher();
  // errorTrue = false;
  @Input() errorTrue = false;
  
  get items(): any {
    return this._items;
  }

  @Input() set items(items: any) {
    this._items = items;
  }

  _voucher: string = '';

  get voucher(): any {
    return this._voucher;
  }

  @Input() set voucher(voucher: any) {
    this._voucher = voucher;
  }

  _netoutVoucher: any = {};

  get fullVoucherData(): any {
    return this._netoutVoucher;
  }

  @Input() set fullVoucherData(fullVoucherData: any) {
    this._netoutVoucher = fullVoucherData;
  }

  _documentDateNow: any = '';

  get documentDate(): any {
    return this._documentDateNow;
  }

  @Input() set documentDate(documentDate: any) {
    this._documentDateNow = documentDate;
  }

  _index: any = 0;

  get index(): any {
    return this._index;
  }

  @Input() set index(index: any) {
    this._index = index;
  }

  @Output('getitems') getitems: EventEmitter<any> = new EventEmitter();
  @Output('getdeleteitems') getdeleteitems: EventEmitter<any> =
    new EventEmitter();
  @Output('parentData') parentData: EventEmitter<any> = new EventEmitter();
  // @Output('') _netOutVoucher: EventEmitter<any> = new EventEmitter();

  options = {
    type: 'accountsPath',
  };

  @Output() datasetChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() set dataset(value: any) {
    this._netoutVoucher = value;
  }
  @Output('dataSetEmit') dataSetEmit: EventEmitter<any> = new EventEmitter();

  constructor(
    public initialData: InitialDataService,
    public apiAccountService: AccountsApiService,
    public dialog: CoreService,
    public data: DataService,
    public cdf: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.ddlSetup();
    this.changeDetected();
  }

  

  ddlSetup() {
    this.setDDLVouchers();
    this.setDDLVoucherNo();
  }

  setDDLVouchers() {
    this.DDLVouchers = [];
    let ddl = this._netoutVoucher.pVoucherConfigentDDLClass;
    this.parentData.emit(this._netoutVoucher.statusValue);
    for (let i = 0; i < ddl.length; i++) {
      let isAvbIndex = this._netoutVoucher.ilstentActNetoutVoucherDetail
        .map((e: any) => e.actVoucherConfigId)
        .indexOf(ddl[i].id);
      // if (isAvbIndex === -1) {
      this.DDLVouchers.push(JSON.parse(JSON.stringify(ddl[i])));
      // } else if (isAvbIndex !== this._index) {
      //   this.DDLVouchers.push(JSON.parse(JSON.stringify(ddl[i])));
      // }
    }
    this.changeDetected();
  }

  setDDLVoucherNo() {
   
    this.DDLVoucherNo = [];
    this.actVoucherConfigId = this._items.actVoucherConfigId;
    let val = this._items.actVoucherConfigId;
    this._netoutVoucher.pVoucherentDDLClass.forEach((element: any) => {
      if (element.ledgerId === val) {
        this.DDLVoucherNo.push(JSON.parse(JSON.stringify(element)));
      }
    });
    console.log(this.DDLVoucherNo)  
    if (this.DDLVoucherNo.length === 1 && this._items.actVoucherId === 0) {
      this._items.actVoucherId = this.DDLVoucherNo[0].id;
      this.loadVoucherDetail();
    }
    this.changeDetected();
  }

  checkitemsOld(id: any, conficid: any) {
    return new Promise((resolve) => {
      let items: any = [];
      items.push(JSON.parse(JSON.stringify(this._itemsRAW)));
      if (this._netoutVoucher.ilstentActNetoutVoucherDetail.length !== 0) {
        for (
          let i = 0;
          i < this._netoutVoucher.ilstentActNetoutVoucherDetail.length;
          i++
        ) {
          let avaIndex = items.map((e: any) => e.actVoucherId).indexOf(id);
          let avaIndex1 = items.map((e: any) => e.actVoucherConfigId).indexOf(conficid);
          if (avaIndex !== -1 && avaIndex1 !== -1) {
            this.data.errorInfoMessage(
              'The selected document name & document no has been already added in list'
            );
            setTimeout(() => {
              this._items.actVoucherId = 0;
            this._items.actLedgerId = 0;
            }, 400);
            this._items.ientLedger.ledgerName = '';
            this._items.debitAmountDocCurrency = '';
            this._items.creditAmountDocCurrency = '';
            this._items.exchangeRate = '';
            this._items.debitAmountRepCurrency = '';
            this._items.creditAmountRepCurrency = '';
            resolve(false);
          }
          items.push(this._netoutVoucher.ilstentActNetoutVoucherDetail[i]);
        }
        resolve(true);
      }
    });
  }
  checkitems(id: any, conficid: any) {
    if (this._netoutVoucher.ilstentActNetoutVoucherDetail.length !== 0) {
      for (
        let i = 0;
        i < this._netoutVoucher.ilstentActNetoutVoucherDetail.length;
        i++
      ) {
        if (i === this._index) { continue; }
        if((this._netoutVoucher.ilstentActNetoutVoucherDetail[i].actVoucherId === id) && (this._netoutVoucher.ilstentActNetoutVoucherDetail[i].actVoucherConfigId === conficid)){
          setTimeout(() => {
            this.data.errorInfoMessage(
              'The selected document name & document no has been already added in list'
            );
            this._items.actVoucherId = 0;
          this._items.actLedgerId = 0;
          this._items.ientLedger.ledgerName = '';
          this._items.debitAmountDocCurrency = '';
          this._items.creditAmountDocCurrency = '';
          this._items.exchangeRate = '';
          this._items.debitAmountRepCurrency = '';
          this._items.creditAmountRepCurrency = '';
          }, 400);
          this.checkList = false;
        }
      }
    }
    this.checkList = true
}
checkList = false;
  doSelectLedger(event: any) {

  }

  async loadVoucherDetail() {
    this.checkitems(
      this._items.actVoucherId,
      this._items.actVoucherConfigId
    );
    if (this.checkList) {
      if (this.fullVoucherData.netoutVoucherTypeValue === 'SALES') {
        this._items.actCustomerId = this.fullVoucherData.partyId;
      }
      if (this.fullVoucherData.netoutVoucherTypeValue === 'PUR') {
        this._items.actVendorId = this.fullVoucherData.partyId;
      }
      this._items.documentDate = this._documentDateNow;
      this._items.actVoucherConfigId = this.actVoucherConfigId;
      this.apiAccountService
        .loadVoucherDetailForSalesAndPurchase(this._items, this.options)
        .subscribe(
        (success) => {
            this._items = success;
            this.changeDetected();
          },
          (e: any) => {
            setTimeout(() => {
              this._items.actVoucherId = 0;
            this._items.actLedgerId = 0;
            }, 400);
            this._items.ientLedger.ledgerName = '';
            this._items.debitAmountDocCurrency = '';
            this._items.creditAmountDocCurrency = '';
            this._items.exchangeRate = '';
            this._items.debitAmountRepCurrency = '';
            this._items.creditAmountRepCurrency = '';
          }
        );
    }
  }
  getVoucherType() {
    const xItem = JSON.parse(JSON.stringify(this._items));
    this._items = new entActNetoutVoucherDetail();
    this.DDLVoucherNo = [];
    this._items.actVoucherConfigId = xItem.actVoucherConfigId;
    if (this._items.actVoucherConfigId) {
      if (this.initialData.DDLValues.DDLVouchers.length !== 0) {
        const index = this.initialData.DDLValues.DDLVouchers.map(
          (e: any) => e.id
        ).indexOf(this._items.actVoucherConfigId);
        if (index !== -1) {
          this.voucherType =
            this.initialData.DDLValues.DDLVouchers[
              index
            ].constant;
        }
      }
    }
    this.changeDetected();
  }

  // itemDelete(index: any) {
  //   const dialogRef = this.dialog.openDialog(deleteC, {
  //     width: '400px',
  //     data: {
  //       msg: 'Are you sure want to delete this item',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       if (this._items.actNetoutVoucherDetailId !== 0) {
  //         this.deleteNetvoucherDetails(index);
  //       } else {
  //         this._netoutVoucher.ilstentActNetoutVoucherDetail.splice(
  //           this._index,
  //           1
  //         );
  //         this.deleteItemsDetached();
  //       }
  //     }
  //   });
  // }


  deleteNetvoucherDetails(i: any) {
    this._netoutVoucher.ilstentActNetoutVoucherDetail[
      i
    ].strDeleteFlag = 'Y';
    this.apiAccountService
      .deleteNetoutVoucherDetails(this._netoutVoucher, this.options)
      .subscribe((success) => {
        this._netoutVoucher = success;
        // this.dataset = success;
        this.cdf.detectChanges();
        this.deleteItemsDetached();
        this.dataSetEmit.next(this._netoutVoucher);
      });
  }

  async deleteItemsDetached() {
  this.getdeleteitems.emit(
      this._netoutVoucher.ilstentActNetoutVoucherDetail
    );
  }

  async changeDetected() {
    let obj = {
      index: this._index,
      item: this._items,
    };
    await this.getitems.emit(obj);
  }

  hideBtnBasedonStatus() {
    
    let hideButton = false;
    if (
      this._netoutVoucher.statusValue === 'APROV' ||
      this._netoutVoucher.statusValue === 'CANCL' ||
      this._netoutVoucher.statusValue === 'PENAP'
    ) {
      hideButton = true;
    } else {
      hideButton = false;
    }

    return hideButton;
  }
  async gainLossForPointZeroOneDifference(val: any, index: any) {
    if (
      (this._netoutVoucher.docCurrencyValue ===
      (this._netoutVoucher.pentActCustomerDetails.currencyCodeValue? this._netoutVoucher.pentActCustomerDetails.currencyCodeValue : this._netoutVoucher.pentActVendor.currencyValue)) && this._index !== 0
    ) {
      const obj = {
        longData1: this._items.actVoucherId,
        longData2: this._netoutVoucher.actVoucherConfigId,
        stringData1: this._items.exchangeRate,
        stringData2: val,
        stringData3: this._netoutVoucher.netoutVoucherTypeValue,
      };
      this.apiAccountService
        .getGainLossForPointZeroOneDifference(obj, this.options)
        .subscribe((success) => {
          this._items.gain = success.data;
          this._items.loss = success.data1;
          this.changeDetected();
        });
    }
  }
}

