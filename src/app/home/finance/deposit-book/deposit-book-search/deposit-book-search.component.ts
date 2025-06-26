import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  InnerScroll,
  Row,
  AppToolTipComponent,
  ViewLabel,
} from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import {
  entCashCounterDepositBook,
  entDepositBookSearch,
} from '../../../../common/api-services/application-api/application-api.classes';
import { AppCurrencyPipe } from '../../../../common/pipes/app-currency/app-currency.pipe';

@Component({
  selector: 'app-deposit-book-search',
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
    MatTooltipModule,
    TableStatusSortComponent,
    AppDatePipe,
    AppCurrencyPipe,
    AccoutsStatusTableComponent,
    ViewLabel,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './deposit-book-search.component.html',
  styleUrl: './deposit-book-search.component.scss',
})
export class DepositBookSearchComponent implements OnInit, AfterViewInit {
  pageId = 'DBSCN';
  columns: any = [
    'depositBookNo',
    'cashCounterNo',
    'effectiveDate',
    'totalReceiptAmount',
    'status',
    'action',
  ];
  columnsName: any = [
    'Deposit Book No',
    'Cash Counter No',
    'Effective Date',
    'Total Transaction Amount',
    'Status',
    'Action',
  ];

  sortColumnName: any[] = [
    'depositBookNo',
    'cashCounterNo',
    'effectiveDate',
    'totalReceiptAmount',
  ];

  tableData: any = [];
  currentDate = '';
  isSelectedAll = false;
  @Input() public type: any = '';
  __selectedItems: any = {
    currentIndex: 0,
    array: [],
  };
  branchName = '';

  currency = '';
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
  };
  errorTrue = false;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  cashCounterDDL: any = [];
  initialLoad = true;
  // dataSource:any = new MatTableDataSource();
  searchParams = new entDepositBookSearch();
  searchParamsRaw = new entDepositBookSearch();
  createDepositBook = new entCashCounterDepositBook();
  @ViewChild('a') aform!: NgForm;
  DDLCashCounter: any = [];
  branchValue: any;

  constructor(
    public appService: AppService,
    public appSettings: AppSettingsService,
    public data: DataService,
    public initialData: InitialDataService,
    public apiDataService: ApplicationApiService,
    public url: UrlService,
    public dialog: CoreService,
    // public overlayService: OverlayService,
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
    this.getAssignedCashierList();
    this.createDepositBookSearch();
  }

  getAssignedCashierList() {
    const obj = {
      data: this.branchValue,
    };
    this.apiDataService.getDDlAssignedCashier(obj).subscribe((success) => {
      console.log(success.value);
      this.cashCounterDDL = success.value;
    });
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
        this.dialog.closeDialog();
        // this.overlayService.detachSearchBox();
      });
  }
  onSort(event: any) {
    this.searchParams.istrSortOrder = event.direction === 'asc' ? true : false;
    this.searchParams.istrSortColumn = event.active;
    this.searchParams.pageNumber = 1;
    this.searchDepositBook();
  }
  clearDepositSearch() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRaw));
    this.searchParams.pageNumber = this.pagination.pageNumber;
    this.searchParams.pageSize = this.pagination.pageSize;
    this.data.successMessage('Data Cleared Successfully');
  }

  implementSearch() {
    this.searchParams.pageNumber = this.pagination.pageNumber;
    this.searchParams.pageSize = this.pagination.pageSize;
    this.searchDepositBook();
  }

  pageChanged(event: any) {
    this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchDepositBook();
  }
  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
  }
  async depositDetail(id: any) {
    const obj = {
      id: id,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl('/home/finance/deposit-book/detail/' + urlJson);
  }

  async addNewDepositBook() {
    const obj = {
      id: 0,
      clicked: true,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl('/home/finance/deposit-book/info/' + urlJson);
  }
  getCashCounter() {
    const obj = {
      data: this.createDepositBook.branchName,
    };
    // this.apiDataService
    //   .getCashCounterByBranchInDepostiBook(obj)
    //   .subscribe((success:any) => {
    //     success.data.forEach((element: any) => {
    //       this.DDLCashCounter[element.key] = element.value;
    //     });
    //   });
  }

  saveDepositBook() {
    this.apiDataService
      .saveCashCounterDepositBook(this.createDepositBook)
      .subscribe((success: any) => {
        this.depositDetail(success.cashCounterDepositBookId);
      });
  }

  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus');
  }
}
