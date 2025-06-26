import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InnerScroll, Row } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { SearchDebitComponent } from '../../../search/search-debit/search-debit.component';
import { Router } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { entActLedgerTransactionsSearch } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';

@Component({
  selector: 'app-ledger-transactions-for-trust-search',
  standalone: true,
  imports: [IconButtonComponent, AppTableComponent, SearchComponent, TableStatusSortComponent, InputControlComponent, InnerScroll, Row, CellDefDirective, CellHeaderDefDirective, FormsModule, AppDatePipe, SearchDebitComponent, AccoutsStatusTableComponent, AppAccessDirective,
    ButtonAccessDirective,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './ledger-transactions-for-trust-search.component.html',
  styleUrl: './ledger-transactions-for-trust-search.component.scss'
})
export class LedgerTransactionsForTrustSearchComponent {
  pageId = 'LDTRS';
  __selectedItems: any;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: TemplateRef<any>;
  columns: any = ["documentNumber", "voucherName", "ledgerName", "ledgerTypeValue", "effectiveDate", "postedDate", "debitAmount", "creditAmount", "statusValue", "narration", "action"];
  sortColumnsName: any = ["documentNumber", "voucherName", "ledgerName", "ledgerTypeValue", "effectiveDate", "postedDate", "debitAmount", "creditAmount", "statusValue", "narration"];
  columnsName: any = ["Document Number", "Document Name", "Ledger Name", "Ledger Type", "Document Date", "Posted Date", "Debit(INR)", "Credit(INR)", "Status", "Narration", ""];
  options = {
    hideFullSpinner: true
  }
  searchParams = new entActLedgerTransactionsSearch()
  searchParamsRAW = new entActLedgerTransactionsSearch()
  currencyValue: any;
  regionValue: any;
  branchValue: any;
  branchId: any;

  constructor(public dialog: CoreService,
    public router: Router,
    public appService: AppService,
    public accountsService: AccountsApiService,
    public data: DataService,
    public urlService: UrlService,
    public initialData: InitialDataService,
    public storage: AppStorageService
  ) { }
  tableData: any = [];

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
    sortColumnName: '',
    sortOrder: false
  }

  async ngOnInit(): Promise<void> {
    this.init();
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getLedgerTransactionInitialData', this.options);
    this.createLedgerTransactionSearch();

    await this.storage.get('companyCurrencyValue').then((val) => {
      this.currencyValue = val
    });

    this.storage.get('Region').then((val: any) => {
      console.log(val);
      if (val !== null || val !== undefined || val !== '') {
        this.regionValue = val;
      }
    })

    await this.storage.get('branchId').then((val) => {
      console.log(val);
      this.branchId = val;
    });

    await this.storage.get('branchvalue').then((val) => {
      this.branchValue = val
    });
  }

  createLedgerTransactionSearch() {
    this.accountsService.createNewLedgerTransactionSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchLedgerTransaction();
    })
  }

  searchLedgerTransaction() {
    this.searchParams.regionValue = this.regionValue;
    this.searchParams.branchId = this.branchId;
    this.accountsService.searchLedgerTransaction(this.searchParams).subscribe((success) => {
      this.tableData = success.aActLedgerTransactionsSearchSet;
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
    })
  }

  clear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.createLedgerTransactionSearch();
    this.data.successMessage("Data Cleared Successfully");
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.searchParams.pageNumber = 1;
    this.searchLedgerTransaction();
    this.dialog.closeDialog();
  }


  pageChanged(event: any) {
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchLedgerTransaction();
  }
  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
  }
  async navigateToDetail(val: any, id: any) {
    console.log(val, id);

    let obj = {
      data: id
    }
    console.log(obj);

    let encodeId = await this.urlService.encode(obj);
    if (val === 'JURNL') {
      this.router.navigateByUrl('/home/finance/journal-trust-and-estate/detail/' + encodeId)
    }
    if (val === 'PYMNT') {
      this.router.navigateByUrl('/home/finance/payments-trust-and-estate/detail/' + encodeId)
    }
    if (val === 'RECPT') {
      this.router.navigateByUrl('/home/finance/receipt-trust-and-estate/detail/' + encodeId)
    }
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  onLedgerSelect(event: any) {
    console.log(event);
    this.searchParams.ledgerName = event.ledgerName;
  }

  navigateToAccount() {
    this.router.navigateByUrl('/home/trustee/finance-menus')
  }
}
