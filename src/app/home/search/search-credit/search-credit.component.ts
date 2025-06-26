import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Optional, Self, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { FormInputControl } from '../../../app-core/form-input/form-input-control';
import { NgControl } from '@angular/forms';
import { AccountsApiService } from '../../../common/api-services/accounts-api/accounts-api.service';
import { AutoCompleteComponent } from '../../../app-core/form-input/auto-complete/auto-complete.component';
import { MatDialog } from '@angular/material/dialog';
import { LedgerSearchComponent } from "../../finance/ledger/ledger-search/ledger-search.component";
import { AppTableComponent } from '../../../app-core/template/app-table/app-table.component';
import { entActFundTransferNote } from '../../../common/api-services/accounts-api/accounts-api.classes';

@Component({
  selector: 'app-search-credit',
  standalone: true,
  imports: [AutoCompleteComponent, LedgerSearchComponent, AppTableComponent],
  templateUrl: './search-credit.component.html',
  styleUrl: './search-credit.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class SearchCreditComponent extends FormInputControl implements OnInit {
  _getTypeValue = ''
  isCheckedValue = "";
  typeCheckedValue = "";
  _getRegionValue = "";
  @Input() __fundTrnsferNote = new entActFundTransferNote();
  __modeTypeValue: any;
  disableTextNow = false;
  searchText = "";
  noCashorBankValue = "";
  ledgerSearchList: any = [];
  _isNoCashorBankVal: any = false;
  @Input() __debitName: any;
  @ViewChild('LedgerSearchPopupDialog') LedgerSearchPopupDialog!: TemplateRef<any>;
  @Input('displayText') displayText = "";

  // @Input()
  // set fundTransferNote(__fundTrnsferNote: any) {
  //   this.__fundTrnsferNote = __fundTrnsferNote || "";
  // }
  // get fundTransferNote() {
  //   return this.__fundTrnsferNote;
  // }
  @Input()
  set getRegionValue(_getRegionValue: any) {
    this._isNoCashorBankVal = _getRegionValue || "";
  }
  get getRegionValue() {
    return this._isNoCashorBankVal;
  }
  @Input()
  set getTypeValue(_getTypeValue: any) {
    this._getTypeValue = _getTypeValue || "";
  }
  get getTypeValue() {
    return this._getTypeValue;
  }
  @Input()
  set regionValue(regionValue: string) {
    this._getRegionValue = regionValue || "";
  }
  get regionValue() {
    return this._getRegionValue;
  }

  @Input()
  set modeTypeValue(modeTypeValue: any) {
    this.__modeTypeValue = modeTypeValue || "";
  }
  get modeTypeValue() {
    return this.__modeTypeValue;
  }
  @Input()
  set typeChecked(typeCheckedValue: any) {
    this.typeCheckedValue = typeCheckedValue || "";
  }
  get typeChecked() {
    return this.typeCheckedValue;
  }

  @Input() set isChecked(isChecked: string) {
    this.isCheckedValue = isChecked || "";
  }

  get isChecked() {
    return this.isCheckedValue;
  }

  @Input()
  set noCashorBank(noCashorBankValue: any) {
    this.noCashorBankValue = noCashorBankValue || "";
  }
  get noCashorBank() {
    return this.noCashorBankValue;
  }

  constructor(@Self() @Optional() public control: NgControl,
    private api: AccountsApiService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  ngOnInit() {
    this.setValidate(this.control);
    // console.log(this.__fundTrnsferNote, '__fundTrnsferNote');

  }

  getSearchData(event: any) {

    if (event.length > 0) {
      const options = {
        hideErrorMethod: true,
        hideFullSpinner: true,
        type: 'accountsPath'
      }

      const obj = {
        strData1: event,
        strData2: this._getTypeValue,
        strData3: 'REGI1',
        strData4: this.typeCheckedValue,
      }
      this.api.loadAllLedgerListByLedgerCodeandType(obj, options).pipe(
      ).subscribe((result: any) => {
        this.items = result.lstActLedger;
        console.log(this.items, 'creditItems');
        // this.cd.detectChanges();


      })
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
    this.value = event.vendorId;
    this.onSelect.emit(event);
  }

  async openSearch(event: any) {
    this.getSearchDataNew(event);

  }
  getSearchDataNew(event: any) {
    // if (event.length > 0) {
    const options = {
      hideErrorMethod: true,
      hideFullSpinner: true,
      type: 'accountsPath'
    }

    const obj = {
      strData1: event,
      strData2: this._getTypeValue,
      strData3: 'REGI1',
      strData4: this.typeCheckedValue,
    }
    this.api.loadAllLedgerListByLedgerCodeandType(obj, options).pipe(
    ).subscribe((result: any) => {
      console.log(this.__fundTrnsferNote, 'fundTransferNote2');

      this.items = result.lstActLedger;
      console.log(this.items, 'creditItems');
      this.cd.detectChanges();
      this.ledgerSearchList = this.items;
      const dialogRef = this.dialog.open(this.LedgerSearchPopupDialog, {
        width: '1200px',
        height: '80%',
        data: {
          regionSearch: this.regionValue
        }
      });
      dialogRef.afterClosed().subscribe((result) => {

        if (result) {
          // this.doSelect(result);
          this.valueSelected(result);
        }
      });

    })
    // }

  }

}
