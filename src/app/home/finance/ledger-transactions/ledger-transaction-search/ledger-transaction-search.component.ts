import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import {
  InnerScroll,
  Row,
} from '../../../../app-core/core-component/core-component.component';
import { CoreService } from '../../../../app-core/service/core.service';
import { Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import {
  entActLedgerTransactionsSearch,
  entLedgerTransaction,
} from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { UrlService } from '../../../../common/services/url/url.service';
import { FormsModule } from '@angular/forms';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { SearchDebitComponent } from '../../../search/search-debit/search-debit.component';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-ledger-transaction-search',
  standalone: true,
  imports: [
    IconButtonComponent,
    AppTableComponent,
    SearchComponent,
    TableStatusSortComponent,
    InputControlComponent,
    InnerScroll,
    Row,
    CellDefDirective,
    CellHeaderDefDirective,
    FormsModule,
    AppDatePipe,
    SearchDebitComponent,
    AccoutsStatusTableComponent,
    AppAccessDirective,
    MatTooltipModule,
    ButtonAccessDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './ledger-transaction-search.component.html',
  styleUrl: './ledger-transaction-search.component.scss',
})
export class LedgerTransactionSearchComponent {
  pageId = 'LDTRS';
  __selectedItems: any;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  columns: any = [
    'documentNumber',
    'voucherName',
    'ledgerName',
    'ledgerTypeValue',
    'effectiveDate',
    'postedDate',
    'debitAmount',
    'creditAmount',
    'regionDescription',
    'narration',
  ];
  columnsName: any = [
    'Document Number',
    'Document Name',
    'Ledger Name',
    'Ledger Type',
    'Document Date',
    'Posted Date',
    'Debit',
    'Credit',
    'Region',
    'Narration',
  ];
  sortColumnsName: any = [
    'documentNumber',
    'voucherName',
    'ledgerName',
    'ledgerTypeValue',
    'effectiveDate',
    'postedDate',
    'debitAmount',
    'creditAmount',
    'regionDescription',
    'narration',
  ];
  options = {
    hideFullSpinner: true,
  };
  searchParams = new entActLedgerTransactionsSearch();
  searchParamsRAW = new entActLedgerTransactionsSearch();
  currencyValue: any;
  regionValue: any;
  branchValue: any;
  branchId: any;

  constructor(
    public dialog: CoreService,
    public router: Router,
    public appService: AppService,
    public accountsService: AccountsApiService,
    public data: DataService,
    public urlService: UrlService,
    public initialData: InitialDataService,
    public storage: AppStorageService
  ) {}
  tableData: any = [];

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
    sortColumnName: '',
    sortOrder: false,
  };

  async ngOnInit(): Promise<void> {
    this.init();
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL(
      'getLedgerTransactionInitialData',
      this.options
    );
    this.createLedgerTransactionSearch();

    await this.storage.get('companyCurrencyValue').then((val) => {
      this.currencyValue = val;
    });

    this.storage.get('Region').then((val: any) => {
      console.log(val);
      if (val !== null || val !== undefined || val !== '') {
        this.regionValue = val;
      }
    });

    await this.storage.get('branchId').then((val) => {
      console.log(val);
      this.branchId = val;
    });

    await this.storage.get('branchvalue').then((val) => {
      this.branchValue = val;
    });
  }

  createLedgerTransactionSearch() {
    this.accountsService
      .createNewLedgerTransactionSearch()
      .subscribe((success) => {
        this.searchParams = success;
        this.searchParams.pageNumber = this.pagination.pageNumber;
        this.searchParams.pageSize = this.pagination.pageSize;
        this.searchLedgerTransaction();
      });
  }

  searchLedgerTransaction() {
    // this.searchParams.regionValue = this.regionValue;
    this.searchParams.branchId = this.branchId;
    this.accountsService
      .searchLedgerTransaction(this.searchParams)
      .subscribe((success) => {
        this.tableData = success.aActLedgerTransactionsSearchSet;
        this.pagination.pageNumber = success.pageNumber;
        this.pagination.pageSize = success.pageSize;
        this.pagination.totalCount = success.totalCount;
      });
  }

  clear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.createLedgerTransactionSearch();
    this.data.successMessage('Data Cleared Successfully');
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.searchParams.pageNumber = 1;
    this.searchLedgerTransaction();
    this.dialog.closeDialog();
  }

  pageChanged(event: any) {
    this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
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
      data: id,
    };
    console.log(obj);


    if (val === 'FTNTE') {
      let encodeId = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/finance/fund-transfer-note/detail/' + encodeId
      );
    }
    if (val === 'JNLVC') {
      let encodeId = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/finance/journal-voucher/detail/' + encodeId
      );
    }
    if (val === 'REVJN') {
      let encodeId = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/finance/reversing-journal/detail/' + encodeId
      );
    }
    if (val === 'NTOUT') {
      let encodeId = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/finance/net-out-voucher/detail/' + encodeId
      );
    }
    if (val === 'SAICE') {
      let encodeId = await this.urlService.encode(obj);
      this.router.navigateByUrl('/home/sales/sales-invoice/detail/' + encodeId);
    }
    if (val === 'RTNTE') {
      let encodeId = await this.urlService.encode(obj);
      this.router.navigateByUrl('/home/sales/receipt-note/detail/' + encodeId);
    }
    if (val === 'CRNTE') {
      
      let encodeId = await this.urlService.encode(obj);
      this.router.navigateByUrl('/home/sales/credit-note/detail/' + encodeId);
    }
    if (val === 'ADVRN') {
      let encodeId = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/sales/advance-receipt-note/detail/' + encodeId
      );
    }
    if (val === 'PRODR') {
      let encodeId = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/purchase/purchase-order/detail/' + encodeId
      );
    }
    if (val === 'PRINV') {    let encodeId = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/purchase/purchase-invoice/detail/' + encodeId
      );
    }
    if (val === 'APYNT') {    let encodeId = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/finance/advance-payment-note/detail/' + encodeId
      );
    }
    if (val === 'PYNTE') {    let encodeId = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/purchase/payment-note/detail/' + encodeId
      );
    }
    if (val === 'DBNTE') {    let encodeId = await this.urlService.encode(obj);
      this.router.navigateByUrl('/home/purchase/debit-note/detail/' + encodeId);
    }
    if (val === 'JURNL') {    let encodeId = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/finance/journal-trust-and-estate/detail/' + encodeId
      );
    }
    if (val === 'PYMNT') {    let encodeId = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/finance/payments-trust-and-estate/detail/' + encodeId
      );
    }
    if (val === 'RECPT') {
      let obj = {
        data: id,
        type: 'detail',
      };
      console.log(obj);

      let trustId = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/finance/receipt-trust-and-estate/detail/' + trustId
      );
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
    this.router.navigateByUrl('/home/corporate/finance-menus');
  }
}
