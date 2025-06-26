import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Optional, Output, Self, TemplateRef, ViewChild } from '@angular/core';
import { AutoCompleteComponent } from '../../../app-core/form-input/auto-complete/auto-complete.component';
import { FormInputControl } from '../../../app-core/form-input/form-input-control';
import { FormsModule, NgControl } from '@angular/forms';
import { AccountsApiService } from '../../../common/api-services/accounts-api/accounts-api.service';
import { LedgerSearchComponent } from '../../finance/ledger/ledger-search/ledger-search.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../app-core/template/app-table/app-table.component';
import { entActFundTransferNote, entActLedgerSearch } from '../../../common/api-services/accounts-api/accounts-api.classes';
import { MatDialog } from '@angular/material/dialog';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { NgClass } from '@angular/common';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { InnerScroll, Row } from '../../../app-core/core-component/core-component.component';
import { SearchComponent } from '../../../app-core/template/search/search.component';
import { AccoutsStatusTableComponent } from '../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
@Component({
  selector: 'app-leadger-auto-search',
  standalone: true,
  imports: [AutoCompleteComponent, LedgerSearchComponent, AppTableComponent,
    NgClass, InputControlComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    IconButtonComponent,
    InnerScroll,
    SearchComponent,
    Row,
    AccoutsStatusTableComponent,
    AppDatePipe,
    FormsModule
  ],
  templateUrl: './leadger-auto-search.component.html',
  styleUrl: './leadger-auto-search.component.scss',

})
export class LeadgerAutoSearchComponent extends FormInputControl implements OnInit {
  isCheckedValue = "";
  typeCheckedValue = "";
  _getRegionValue = "";
  _getTypeValue = '';
  disableTextNow = false;
  searchText = "";
  noCashorBankValue = "";
  _ledgerRegionSearch = "";
  ledgerSearchList: any = [];

  @Input() set ledgerItems(value: any[]) {
    this._ledgerItems = value;
    this.processLedgerItems();
  }
  get ledgerItems(): any[] {
    return this._ledgerItems;
  }
  private _ledgerItems: any[] = [];
  @ViewChild('LedgerSearchPopupDialog') LedgerSearchPopupDialog!: TemplateRef<any>;
  @Input() __fundTrnsferNote = new entActFundTransferNote();

  @Input() displayText: any;

  @Input()
  set noCashorBank(noCashorBankValue: any) {
    this.noCashorBankValue = noCashorBankValue || "";
  }
  get noCashorBank() {
    return this.noCashorBankValue;
  }

  _isNoCashorBankVal: any = false;


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
    return this._getRegionValue;
  }
  @Input()
  set regionValue(regionValue: string) {
    this._getRegionValue = regionValue || "";
  }
  get regionValue() {
    return this._getRegionValue;
  }
  @Input()
  set isNoCashorBank(_isNoCashorBankVal: any) {
    this._isNoCashorBankVal = _isNoCashorBankVal || "";
  }
  get isNoCashorBank() {
    return this._isNoCashorBankVal;
  }

  @Input() set isChecked(isChecked: string) {
    this.isCheckedValue = isChecked || "";
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
    this.__modeTypeValue = modeTypeValue || "";
  }
  get modeType() {
    return this.__modeTypeValue;
  }

  isItemSearchValue: any = '';
  @Input()
  set isItemSearch(isItemSearchValue: any) {
    this.isItemSearchValue = isItemSearchValue || "";
  }
  get isItemSearch() {
    return this.isItemSearchValue;
  }

  isItemSearchDebitValue: any = '';
  @Input()
  set isItemSearchDebit(isItemSearchDebitValue: any) {
    this.isItemSearchDebitValue = isItemSearchDebitValue || "";
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
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  };
  searchParams = new entActLedgerSearch();
  searchParamsRaw = new entActLedgerSearch();
  tableData: any = [];
  columns: any = ['refNo', 'name', 'date', 'type', 'status', 'action', 'type'];
  columnsName: any = ["Ledger Name", "Alias Name", "Effective Date", "Nature of Group", "Parent Group Name", "Code Name", "Ledger Type"];
  searchItems = [];
  @ViewChild('appSearch') appSearch!: SearchComponent;
  constructor(@Self() @Optional() public control: NgControl,
    private api: AccountsApiService, public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    public initialData: InitialDataService
  ) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  ngOnInit() {
    this.setValidate(this.control);
  }

  getSearchData(event: any) {
    if (this.ledgerItems.length > 0) {
      this.ledgerSearchList = this.ledgerItems;
    }
    if (this.ledgerSearchList.length > 0) {
      this.ledgerSearchList = this.ledgerItems.filter((x: any) =>
        x.description.toLowerCase().includes(event.toLowerCase()));
    }
  }
  processLedgerItems() {
    this.ledgerSearchList = this.ledgerItems;
  }
  valueSelected(event: any) {
    this.onSelect.emit(event);
    this.dialog.closeAll();
  }
  searchData(event: any) {
    console.log(event);
  }

  async openSearch(event: any) {
    this.getSearchDataNew(event);

  }

  options = {
    type: 'accountsPath',
  };

  getSearchDataNew(event: any) {
    // if (event.length > 0) {
    this.tableData = this.ledgerItems;
    this.pagination.pageNumber = 1,
      this.pagination.pageSize = 25,
      this.pagination.totalCount = this.ledgerItems.length;
    this.api.createNewAccountLedgerSearch(this.options).subscribe((success: any) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchParamsRaw = JSON.parse(JSON.stringify(this.searchParams));
      if (this.isModeType) {
        this.cashPaymentMode();
      }
      this.setIncomeExpenseMode();
      this.ledgerSearch();
    });

    const dialogRef = this.dialog.open(this.LedgerSearchPopupDialog, {
      width: '1200px',
      height: '80%',
      data: {
        regionSearch: this.regionValue
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {

        this.valueSelected(result);
      }
    });
  }

  cashPaymentMode() {
    this.searchParams.istrLedgerTypeValue = this.modeType;
  }

  setIncomeExpenseMode() {
    if (this.isItemSearch === 'Y') {
      this.searchParams.istrLedgerTypeValue = '';
      this.searchParams.isItemSearch = this.isItemSearch;
      if (this.isItemSearchDebit === 'Y') {
        this.searchParams.expnseIncmeLedgerTypeValue = 'EXPSE';
        this.searchParams.salesPurLedgerTypeValue = 'PURCE';
      } else {
        this.searchParams.expnseIncmeLedgerTypeValue = 'SALES';
        this.searchParams.salesPurLedgerTypeValue = 'INCME';
      }
    }
  }

  onSearchData() {
    this.searchParams.pageNumber = 1;
    this.ledgerSearch();
    this.appSearch.close();
  }
  clearAllSearch() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRaw));
  }
  ledgerSearch() {
    this.searchParams.regionValue = this.regionValue;
    this.api.ledgerSearch(this.searchParams, this.options)
      .subscribe((success: any) => {
        this.tableData = success.pActLedgerSearchSet;
        this.pagination.pageNumber = success.pageNumber;
        this.pagination.pageSize = success.pageSize;
        this.pagination.totalCount = success.totalCount;
      });
  }
  onSelectedValue(element: any) {
    this.valueSelected(element);
  }
  pageChanged(event: any) {
    this.pagination.pageNumber = event.pageNumber;
    this.pagination.pageSize = event.pageSize;
    this.pagination.totalCount = this.items.length;
    this.ledgerSearch();
  }

}
