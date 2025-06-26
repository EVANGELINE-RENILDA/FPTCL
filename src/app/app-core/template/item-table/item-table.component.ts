import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { entActNetoutVoucher, entActNetoutVoucherDetail } from '../../../common/api-services/accounts-api/accounts-api.classes';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
import { DataService } from '../../../common/services/data/data.service';
import { AccountsApiService } from '../../../common/api-services/accounts-api/accounts-api.service';
import { AppService } from '../../../app.service';
import { CoreService } from '../../service/core.service';
import { NgForm } from '@angular/forms';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { InnerScroll } from '../../core-component/core-component.component';
import { ItemTbodyComponent } from './item-tbody/item-tbody.component';

@Component({
  selector: 'app-item-table',
  standalone: true,
  imports: [IconButtonComponent, InnerScroll, ItemTbodyComponent],
  templateUrl: './item-table.component.html',
  styleUrl: './item-table.component.scss'
})
export class ItemTableComponent {

  pageId = 'NOVSC';
  totalCredit = 0;
  totalDebit = 0;
  totalRepCredit: any = 0;
  totalRepDebit: any = 0;
  totalDifference = 0;
  voucherType = '';
  parentDataStatus = '';
  _items: any = [];

  errorTrue = false;


  @Input() set items(items: any) {
    this._items = items;
  }


  get items(): any {
    return this._items;
  }

  _voucher: string = '';


  @Input() set voucher(voucher: any) {
    this._voucher = voucher;

  }

  get voucher(): any {
    return this._voucher;
  }

  _netoutvoucher: any = {};


  @Input() set voucherData(voucherData: any) {
    this._netoutvoucher = voucherData;
  }

  get voucherData(): any {
    return this._netoutvoucher;
  }

  _totalAmount: any = 0;

  get totalAmount(): any {
    return this._totalAmount;
  }

  @Input() set totalAmount(totalAmount: any) {
    this._totalAmount = totalAmount;
  }

  _documentDateNow: any = '';

  get documentDate(): any {
    return this._documentDateNow;
  }

  @Input() set documentDate(documentDate: any) {
    this._documentDateNow = documentDate;
  }

  @Output('getitems') getitems: EventEmitter<any> = new EventEmitter();
  @ViewChild('l') lform!: NgForm;

  options = {
    type: 'accountsPath',
  };

  @Output() datasetChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() set dataset(value: any) {
    this._netoutvoucher = value;
  }

  netoutVoucher = new entActNetoutVoucher();
  netVoucherDetail = new entActNetoutVoucherDetail();
  netVoucherDetailRAW = new entActNetoutVoucherDetail();

  constructor(
    public appService: AppService,
    public data: DataService,
    public initialData: InitialDataService,
    public apiAccountService: AccountsApiService,
    public dialog: CoreService
  ) { }

  ngAfterViewInit(): void {
    if (this._items.length > 0) {
      this.calculateAmount();
    }


  }

  roundOff = (number: any) => {
    let precision = 2;
    let shift = (number: any, exponent: any) => {
      var numArray = ('' + number).split('e');
      return +(
        numArray[0] +
        'e' +
        (numArray[1] ? +numArray[1] + exponent : exponent)
      );
    };
    return shift(Math.round(shift(number, +precision)), -precision);
  };

  doSelectLedger(event: any) {
  }

  loadVoucherDetailForSales(val: any, index: any) {
    this.netVoucherDetail = val;
    this.netVoucherDetail.documentDate = this._documentDateNow;
    this.apiAccountService
      .loadVoucherDetailForSales(this.netVoucherDetail, this.options)
      .subscribe((success) => {
        this._items[index] = success;
        this.onUpdateItems(this._items);
      });
  }

  getVoucherType(val: any, index: any) {
    this._items[index] = new entActNetoutVoucherDetail();
    this._items[index].actVoucherConfigId = val;
    if (val) {
      if (this.initialData.DDLValues.DDLVouchers.length !== 0) {
        const index = this.initialData.DDLValues.DDLVouchers.map(
          (e: any) => e.id
        ).indexOf(val);
        if (index !== -1) {
          this.voucherType =
            this.initialData.DDLValues.DDLVouchers[
              index
            ].constant;
        }
      }
    }
  }

  onUpdateItems(val: any) {
    this.getitems.emit(val);
  }

  saveTable() {
    return new Promise(async (resolve) => {
      let formValidation = false;
      if (this.lform.valid) {
        if (await this.calculateError()) {
          formValidation = this.lform.valid;
        }
      } else {
        this.errorTrue = true;
      }

      resolve(formValidation);
    });
  }

  async createNewNetoutVoucherDetail() {
    if (parseFloat(this._netoutvoucher.totalNetoutValue) === 0) {
      let alert = await this.dialog.notificationDialog(
        'Enter Total Net Value to Add Items'
      );
      if (alert) {
        return;
      }
    }

    if (this._netoutvoucher.partyId === 0) {
      let alert = await this.dialog.notificationDialog('Select Customer to Add Items');
      if (alert) {
        return;
      }
    }

    this.apiAccountService
      .createNewNetoutVoucherDetail(this.options)
      .subscribe((success) => {
        this._items.push(JSON.parse(JSON.stringify(success)));
        this.calculateAmount();
      });
  }

  async changeDetected(obj: any) {
    this._items[obj.index] = obj.item;
    setTimeout(() => {
      this.calculateAmount();
    }, 200);
    this.getitems.emit();
  }

  dataSetEmited(event: any) {
    // this._netoutvoucher = event;
    this.datasetChange.emit(event);
    // this.dataset(event);
  }

  deleteItemsDetached(items: any) {
    this._items = items;
    this.calculateAmount();
    this.getitems.emit();
  }

  async calculateAmount() {
    this.totalCredit = 0;
    this.totalDebit = 0;
    this.totalRepDebit = 0;
    this.totalRepCredit = 0;
    this.totalDifference = 0;
    for (let i = 0; i < this._items.length; i++) {
      this.totalDebit =
        parseFloat(this._items[i].debitAmountDocCurrency) + this.totalDebit;
      this.totalCredit =
        parseFloat(this._items[i].creditAmountDocCurrency) + this.totalCredit;

      // reporting currency value calculate
      this._items[i].creditAmountRepCurrency = await this.reportCreditCurrency(
        this._items[i]
      );
      this._items[i].debitAmountRepCurrency = await this.reportDebitCurrency(
        this._items[i]
      );

      this.totalRepCredit = parseFloat(this._items[i].creditAmountRepCurrency) + this.totalRepCredit;
      this.totalRepDebit = parseFloat(this._items[i].debitAmountRepCurrency) + this.totalRepDebit;
    }
    this.totalDifference = this.totalDebit - this.totalCredit;
  }

  async reportCreditCurrency(item: any) {
    return new Promise((resolve) => {
      resolve(
        this.roundOff((parseFloat(item.creditAmountDocCurrency) * parseFloat(item.exchangeRate)))
        // parseFloat(item.creditAmountDocCurrency) * parseFloat(item.exchangeRate)
      );
    });
  }

  async reportDebitCurrency(item: any) {
    return new Promise((resolve) => {
      resolve(
        this.roundOff((parseFloat(item.debitAmountDocCurrency) * parseFloat(item.exchangeRate)))
        // parseFloat(item.debitAmountDocCurrency) * parseFloat(item.exchangeRate)
      );
    });
  }

  calculateError() {
    let isError = false;
    return new Promise((resolve) => {
      if (this.totalDifference === 0) {
        isError = true;
        this._totalAmount = parseFloat(this._totalAmount);
        if (this.totalDebit === this._totalAmount) {
          isError = true;
        } else {
          isError = false;
          this.data.errorInfoMessage(
            'Total Netout Value not equal to sum of debit and credit'
          );
        }
      } else {
        isError = false;
        this.data.errorInfoMessage('Total sum of debit and credit not equal');
      }

      resolve(isError);
    });
  }
  hideBtnBasedonStatus() {
    let hideButton = false;
    if (
      this.parentDataStatus === 'APROV' ||
      this.parentDataStatus === 'CANCL' ||
      this.parentDataStatus === 'PENAP'
    ) {
      hideButton = true;
    } else {
      hideButton = false;
    }

    return hideButton;
  }

  parentData(val: any) {
    this.parentDataStatus = val;
  }


  // setDDLVoucherNo() {
  //   this.DDLVoucherNo = [];
  //   this.actVoucherConfigId = this._items.actVoucherConfigId;
  //   let val = this._items.actVoucherConfigId;
  //   this._netoutVoucher.pVoucherentDDLClass.forEach((element: any) => {
  //     if (element.ledgerId === val) {
  //       this.DDLVoucherNo.push(JSON.parse(JSON.stringify(element)));
  //     }
  //   });
  //   if (this.DDLVoucherNo.length === 1 && this._items.actVoucherId === 0) {
  //     this._items.actVoucherId = this.DDLVoucherNo[0].id;
  //     this.loadVoucherDetail();
  //   }
  //   this.changeDetected();
  // }


}
