import { DatePipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { entActLedgerSearch } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { InnerScroll, Row } from '../../../../app-core/core-component/core-component.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { CoreService } from '../../../../app-core/service/core.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SearchCreditComponent } from '../../../search/search-credit/search-credit.component';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { DataService } from '../../../../common/services/data/data.service';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
@Component({
  selector: 'app-ledger-search',
  standalone: true,
  imports: [FormsModule, NgClass, InputControlComponent,
    AppTableComponent,
    AppAccessDirective,
    CellDefDirective,
    CellHeaderDefDirective,
    IconButtonComponent,
    InnerScroll,
    SearchComponent,
    Row,
    AccoutsStatusTableComponent,
    AppDatePipe
  ],
  templateUrl: './ledger-search.component.html',
  styleUrl: './ledger-search.component.scss'
})

export class LedgerSearchComponent implements OnInit {

  pageId = "ALGSC"
  ledger:any

  pageIndex = 0;
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  isCheckedValue = "";
  searchText = '';
  _getTypeValue = '';
  _getLedgerValue = '';
  initialLoad = true;
  @Input() items: any[] = [];
  @Input() isItemSearch = '';
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @Input() public panelClass: any = '';
  @Input() public isModeType = false;
  @Input() public modeTypeValue = '';
  @Input() public closeOverLay = true;
  @Input() public isBankorCash = '';
  @Input() public modeType = '';
  @Input() public isItemSearchDebit = '';
  // @Input() public getTypeValue = '';
  @Input() public selectedGroupId = 0;
  @Input() public debtitName = '';
  @Input() public isNoCashorBank = false;
  @Input() public regionValue = '';
  @Input() set isChecked(isChecked: string) {
    this.isCheckedValue = isChecked || "";
  }
  @Input()
  set getTypeValue1(_getTypeValue: any) {
    this._getTypeValue = _getTypeValue || '';
  }
  get getTypeValue1() {
    return this._getTypeValue;
  }

  @Input()
  set getLedgerValue(_getLedgerValue: any) {
    this._getLedgerValue = _getLedgerValue || '';
  }
  get getLedgerValue() {
    return this._getLedgerValue;
  }

  get isChecked() {
    return this.isCheckedValue;
  }
  @Input()
  set displayText(displayText: any) {
    this.searchText = displayText || "";
  }
  get displayText() {
    return this.searchText;
  }

  @Input()
  set getTypeValue(_getTypeValue: any) {
    this._getTypeValue = _getTypeValue || '';
  }
  get getTypeValue() {
    return this._getTypeValue;
  }

  @Output('dataSelected') dataSelectded: EventEmitter<any> = new EventEmitter();
  searchParams = new entActLedgerSearch();
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  };
  searchParamsRAW = new entActLedgerSearch();
  tableData: any = [
    // {
    //   'refNo': 'OA240500002', 'name': 'MMF Tech', 'type': 'Medical', 'date': '21 Jul 2024', 'status': 'Approved',
    // }, {
    //   'refNo': 'OA240400006', 'name': 'BMW Vehicle Insurance', 'type': '	Motor', 'date': '	04 Apr 2024', 'status': 'Cancel',
    // },
  ];
  columns: any = ['refNo', 'name', 'date', 'type', 'status', 'action', 'type'];
  columnsName: any = ["Ledger Name", "Alias Name", "Effective Date", "Nature of Group", "Parent Group Name", "Code Name", "Ledger Type"];
  options = {
    type: 'accountsPath',
  };
  constructor(
    public dialog: CoreService,
    public initialData: InitialDataService,
    public data: DataService,
    public accountsApi: AccountsApiService,
    public dialogRef: MatDialogRef<SearchCreditComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
  }

  ngOnInit() {
    this.init();
  }
  async init() {
    // console.log(this.items, 'itemsSearch');
    console.log(this._getTypeValue);
    
    this.tableData = this.items;
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getLedgerInitialData');
    this.createNewAccountLedgerSearch();
  }
  createNewAccountLedgerSearch() {
    debugger
    this.accountsApi
      .createNewAccountLedgerSearch(this.options)
      .subscribe((success: any) => {
        this.initialLoad = false;
    
        this.searchParams = success;
        this.searchParams.pageNumber = this.pagination.pageNumber;
        this.searchParams.pageSize = this.pagination.pageSize;
        this.searchParamsRAW = JSON.parse(JSON.stringify(this.searchParams));
        // if (this.isModeType) {
        //   this.cashPaymentMode();
        // }
        this.setIncomeExpenseMode();
        if (this.isBankorCash !== 'Y' && this.isNoCashorBank) {
          this.searchParams.notBankType = 'BANK';
          this.searchParams.notCashType = 'CASH';
        }
        this.ledgerSearch();
      });
  }

  ledgerSearch() {
    console.log(this.modeType, 'modeTypeValuemodeTypeValue');
    this.searchParams.regionValue = this.regionValue;
    this.searchParams.istrLedgerTypeValue=this.getTypeValue;
    this.accountsApi.ledgerSearch(this.searchParams, this.options)
      .subscribe((success: any) => {
        
        this.tableData = success.pActLedgerSearchSet;
        this.pagination.pageNumber = success.pageNumber;
        this.pagination.pageSize = success.pageSize;
        this.pagination.totalCount = success.totalCount;
      });
  }
  cashPaymentMode() {
    this.searchParams.istrLedgerTypeValue = this.modeType;
    this.searchParams.groupId = this.selectedGroupId
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

  clearAllSearch() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    if (this.isModeType) {
      this.cashPaymentMode();
    }
    this.setIncomeExpenseMode();
    if (this.isBankorCash !== 'Y' && this.isNoCashorBank) {
      this.searchParams.notBankType = 'BANK';
      this.searchParams.notCashType = 'CASH';
    }
    this.ledgerSearch();
  }
  pageChanged(event: any) {
    this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.orderByColumnName = event.sortColumnName;
    this.searchParams.ascending = event.sortOrder;
    this.ledgerSearch();
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.ledgerSearch();
    this.appSearch.close();
  }

  implementSearch() {
    this.pageIndex = 0;
    this.searchParams.pageNumber = 1;
    this.ledgerSearch();
  }
  dataSelectedFn(val: any) {
    this.dataSelectded.emit(val);
  }
  onSelect(element: any) {
    this.__selectedItems = element;
    this.dialogRef.close(this.__selectedItems);
  }
}
