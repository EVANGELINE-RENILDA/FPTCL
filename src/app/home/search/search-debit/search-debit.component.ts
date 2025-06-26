import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AutoCompleteComponent } from '../../../app-core/form-input/auto-complete/auto-complete.component';
import { FormInputControl } from '../../../app-core/form-input/form-input-control';
import { NgControl } from '@angular/forms';
import { AccountsApiService } from '../../../common/api-services/accounts-api/accounts-api.service';
import { AppTableComponent } from '../../../app-core/template/app-table/app-table.component';
import { entActFundTransferNote } from '../../../common/api-services/accounts-api/accounts-api.classes';
import { MatDialog } from '@angular/material/dialog';
import { LedgerSearchComponent } from '../../finance/ledger/ledger-search/ledger-search.component';

@Component({
  selector: 'app-search-debit',
  standalone: true,
  imports: [AutoCompleteComponent, LedgerSearchComponent, AppTableComponent],
  templateUrl: './search-debit.component.html',
  styleUrl: './search-debit.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SearchDebitComponent extends FormInputControl implements OnInit {
  isCheckedValue = '';
  typeCheckedValue = '';
  _getRegionValue = '';
  _getTypeValue = '';
  disableTextNow = false;
  searchText = '';
  noCashorBankValue = '';
  _ledgerRegionSearch = '';
  ledgerSearchList: any = [];
  @ViewChild('LedgerSearchPopupDialog')
  LedgerSearchPopupDialog!: TemplateRef<any>;
  @Input() __fundTrnsferNote = new entActFundTransferNote();
  @Input() __debitName: any;

  @Input() displayText: any;
  // @Input() SelectedGroupId: any;

  @Input()
  set noCashorBank(noCashorBankValue: any) {
    this.noCashorBankValue = noCashorBankValue || '';
  }
  get noCashorBank() {
    return this.noCashorBankValue;
  }
  __SelectedGroupId: any
  @Input()
  set SelectedGroupId(SelectedGroupId: boolean) {
    this.__SelectedGroupId = SelectedGroupId || 0;
  }
  get SelectedGroupId() {
    return this.__SelectedGroupId;
  }

  _isNoCashorBankVal: any = false;

  @Input()
  set getRegionValue(_getRegionValue: any) {
    this._isNoCashorBankVal = _getRegionValue || '';
  }
  get getRegionValue() {
    return this._isNoCashorBankVal;
  }
// item belongs to
  @Input()
  set getTypeValue(_getTypeValue: any) {
    this._getTypeValue = _getTypeValue || '';
  }
  get getTypeValue() {
    return this._getTypeValue;
  }



  @Input()
  set regionValue(regionValue: string) {
    this._getRegionValue = regionValue || '';
  }
  get regionValue() {
    return this._getRegionValue;
  }
  @Input()
  set isNoCashorBank(_isNoCashorBankVal: any) {
    this._isNoCashorBankVal = _isNoCashorBankVal || '';
  }
  get isNoCashorBank() {
    return this._isNoCashorBankVal;
  }

  @Input() set isChecked(isChecked: string) {
    this.isCheckedValue = isChecked || '';
  }

  get isChecked() {
    return this.isCheckedValue;
  }

  @Input()
  set disabled(disabled: boolean) {
    this.disableTextNow = disabled || false;
  }
  get disabled() {
    return this.disableTextNow;
  }

  __modeTypeValue: any;

  @Input()
  set modeType(modeTypeValue: any) {
    this.__modeTypeValue = modeTypeValue || '';
  }
  get modeType() {
    return this.__modeTypeValue;
  }


  isItemSearchValue: any = '';
  @Input()
  set isItemSearch(isItemSearchValue: any) {
    this.isItemSearchValue = isItemSearchValue || '';
  }
  get isItemSearch() {
    return this.isItemSearchValue;
  }

  isItemSearchDebitValue: any = '';
  @Input()
  set isItemSearchDebit(isItemSearchDebitValue: any) {
    this.isItemSearchDebitValue = isItemSearchDebitValue || '';
  }
  get isItemSearchDebit() {
    return this.isItemSearchDebitValue;
  }

  isModeTypeValue: any = false;

  @Input()
  set isModeType(isModeTypeValue: any) {
    this.isModeTypeValue = isModeTypeValue || false;
  }
  get isModeType() {
    return this.isModeTypeValue;
  }

  constructor(
    @Self() @Optional() public control: NgControl,
    private api: AccountsApiService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
    super();
    console.log(this.displayText, '1');

    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
    console.log(this.items);
    // this.displayText = this.__fundTrnsferNote.ibusCompanyDebitActLedger?.ledgerName;
  }

  ngOnInit() {
    this.setValidate(this.control);
  }

  getSearchData(event: any) {

    console.log(event, 'Ledger')
    if (event.length > 0) {
      const options = {
        hideErrorMethod: true,
        hideFullSpinner: true,
        type: 'accountsPath',
      };

      const obj = {
        intData1: 0,
        intData2: 0,
        intData3: 0,
        strData1: event,
        strData2: this._getTypeValue,
        strData3: this.regionValue,
        strData4: this.typeCheckedValue,
        strData5: 'string',
        longData1: this.__SelectedGroupId,
        longData2: 0,
        longData3: 0,
      };
      // console.log('dsgvf');

      this.api
        .loadAllLedgerListByLedgerCodeandType(obj, options)
        .pipe()
        .subscribe((result: any) => {
          this.items = result.lstActLedger;
        });
    }
  }

  // getSearchData(event: any) {
  //   // return;
  //   if (event.length > 3) {
  //     const options = {
  //       hideErrorMethod: true,
  //       hideFullSpinner: true,
  //       type: 'accountsPath'
  //     }
  //     this.searchParams.vendorName = event;
  //     this.api.autoSearchForVendors(this.searchParams, options).subscribe((result: any) => {
  //       this.items = result.lstentActVendor;
  //     })
  //   }
  // }

  valueSelected(event: any) {
    // debugger
    // this.displayText = event.codeName;
    this.value = event.vendorId;
    // let items: any = [];
    // items.push(event);
    // this.items = items; //new change
    this.onSelect.emit(event);
  }
  searchData(event: any) {
    console.log(event);
  }

  async openSearch(event: any) {
    this.getSearchDataNew(event);
  }

  getSearchDataNew(event: any) {

    const options = {
      hideErrorMethod: true,
      hideFullSpinner: true,
      type: 'accountsPath',
    };


    const obj = {
      intData1: 0,
      intData2: 0,
      intData3: 0,
      strData1: this.displayText,
      strData2: this._getTypeValue,
      strData3: 'REG1',
      strData4: this.typeCheckedValue,
      strData5: 'string',
      longData1: this.__SelectedGroupId,
      longData2: 0,
      longData3: 0,
    };
    this.api
      .loadAllLedgerListByLedgerCodeandType(obj, options)
      .pipe()
      .subscribe((result: any) => {
        this.cd.detectChanges();
        // console.log(this.fundTransferNote, 'fundTransferNote');
        console.log(this.__fundTrnsferNote, 'fundTransferNote2debit');

        this.items = result.lstActLedger;
        console.log(this.items, 'creditItems');
        this.cd.detectChanges();
        this.ledgerSearchList = this.items;
        const dialogRef = this.dialog.open(this.LedgerSearchPopupDialog, {
          width: '1200px',
          height: '80%',
          data: {
            regionSearch: this.regionValue,
          },
        });
        dialogRef.afterClosed().subscribe((result: any) => {

          if (result) {
            // this.doSelect(result);
            this.valueSelected(result);
          }
        });
      });
    // }
  }
}
