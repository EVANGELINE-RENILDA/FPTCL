import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { FormsModule, NgForm } from '@angular/forms';
import {
  InnerScroll,
  Row,
  AppToolTipComponent,
  ViewLabel,
} from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { AppCurrencyPipe } from '../../../../common/pipes/app-currency/app-currency.pipe';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import {
  entCashCounterDepositBook,
  entDepositBookSearch,
} from '../../../../common/api-services/application-api/application-api.classes';

@Component({
  selector: 'app-reconciliation-search',
  standalone: true,
  imports: [
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    IconButtonComponent,
    InnerScroll,
    InputControlComponent,
    SearchComponent,
    Row,
    FormsModule,
    AppAccessDirective,
    ButtonAccessDirective,
    AppToolTipComponent,
    TableStatusSortComponent,
    AppDatePipe,
    AppCurrencyPipe,
    AccoutsStatusTableComponent,
    ViewLabel,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './reconciliation-search.component.html',
  styleUrl: './reconciliation-search.component.scss',
})
export class ReconciliationSearchComponent implements OnInit, AfterViewInit {
  columns: any = [
    // 'branch',
    'cashCounterNo',
    'depositBookNo',
    'totalReceiptAmount',
    'openingAmount',
    'closingAmount',
    'computedAmount',
    'mismatchAmount',
    'status',
    'action',
  ];
  columnsName: any = [
    // 'Branch',
    'Cash Counter No',
    'Deposit Book No',
    'Total Receipt Amount',
    'Opening Amount',
    'Closing Amount',
    'Computed Amount',
    'Mismatch Amount',
    'Status',
    'Action',
  ];

  sortColumnName: any[] = [
    'cashCounterNo',
    'depositBookNo',
    'totalReceiptAmount',
    'openingAmount',
    'closingAmount',
    'computedAmount',
    'mismatchAmount',
  ];

  tableData: any = [];
  isSelectedAll = false;
  @Input() public type: any = '';
  branchName = '';

  currency = '';
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
    sortColumnName: '',
    sortOrder: false,
  };
  errorTrue = false;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  cashCounterDDL: any = [];
  initialLoad = true;
  searchParams = new entDepositBookSearch();
  searchParamsRaw = new entDepositBookSearch();
  createDepositBook = new entCashCounterDepositBook();
  @ViewChild('a') aform!: NgForm;
  DDLCashCounter: any = [];
  branchValue: any;
  private __selectedItems: any;

  constructor(
    public appService: AppService,
    public appSettings: AppSettingsService,
    public data: DataService,
    public initialData: InitialDataService,
    public apiDataService: ApplicationApiService,
    public url: UrlService,
    public dialog: CoreService,
    public router: Router,
    public storage: AppStorageService
  ) {}

  ngOnInit() {
    this.init();
  }
  ngAfterViewInit() {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getDDL('getDepositBookInitialData');
    await this.storage.get('companyCurrencyValue').then((val) => {
      this.currency = val;
    });
    await this.storage.get('branchFinance').then((val) => {
      this.branchName = val;
    });
    await this.storage.get('branchvalue').then((val) => {
      this.branchValue = val;
    });

    this.createDepositBookSearch();
  }

  createDepositBookSearch() {
    this.apiDataService.getDepositBookSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchDepositBook();
    });
  }

  searchDepositBook() {
    this.searchParams.branchValue = this.branchValue;
    this.apiDataService
      .searchDepositBook(this.searchParams)
      .subscribe((success) => {
        this.tableData = success.pentDepositBookSearchSet;
        this.pagination.pageNumber = success.pageNumber;
        this.pagination.pageSize = success.pageSize;
        this.pagination.totalCount = success.totalCount;
      });
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.searchParams.pageNumber = 1;
    this.searchDepositBook();
    this.appSearch?.close();
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
  }

  // onSort(event: any) {
  //   this.searchParams.istrSortOrder = event.direction === 'asc' ? true : false;
  //   this.searchParams.istrSortColumn = event.active;
  //   this.searchParams.pageNumber = 1;
  //   this.searchDepositBook();
  // }

  clearDepositSearch() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRaw));
    this.createDepositBookSearch();
    this.data.successMessage('Data Cleared Successfully');
  }

  pageChanged(event: any) {
    this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchDepositBook();
  }

  async reconciliationDetail(id: any) {
    const obj = {
      id: id,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl('/home/finance/reconciliation/detail/' + urlJson);
  }
}
