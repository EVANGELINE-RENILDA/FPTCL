import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { entActVoucherConfig } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { entCashCounterSearch } from '../../../../common/api-services/application-api/application-api.classes';
import { CashCounterInfoComponent } from '../cash-counter-info/cash-counter-info.component';

@Component({
  selector: 'app-cash-counter-search',
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
    AccoutsStatusTableComponent,
    CashCounterInfoComponent,
    ViewLabel,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './cash-counter-search.component.html',
  styleUrl: './cash-counter-search.component.scss',
})
export class CashCounterSearchComponent implements OnInit, AfterViewInit {
  pageId = 'FUDTN';
  cashCounterDDL: any = [];

  searchParams = new entCashCounterSearch();
  searchParamsRAW = new entCashCounterSearch();
  voucherConfig = new entActVoucherConfig();

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  columns: any = [
    'cashCounterNo',
    'cashcounterName',
    'effectiveDate',
    'status',
    'action',
  ];
  columnsName: any = [
    'Counter No',
    'Counter Name',
    'Effective Date',
    'Status',
    'Action',
  ];

  sortColumnName: any[] = ['cashCounterNo', 'cashcounterName', 'effectiveDate'];
  tableData: any = [];

  @Input() public type: any = '';

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
  };
  errorTrue = false;
  @ViewChild('cashCounterEditDialog') cashCounterEditDialog!: TemplateRef<any>;
  branchDDL: any = [];
  branchName = '';
  branchValue: any;
  __selectedItems: any = {
    currentIndex: 0,
    array: [],
  };

  constructor(
    public router: Router,
    public apiService: ApplicationApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public urlService: UrlService,
    public accountsService: AccountsApiService,
    public storage: AppStorageService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getDDL('getCashCounterInitialData');
    this.branchValue = await this.storage.get('branchvalue');
    await this.storage.get('branchFinance').then((val) => {
      this.branchName = val;
    });
    this.getAssignedCashierList();
    this.createCashCounterSearch();
  }

  getAssignedCashierList() {
    const obj = {
      data: this.branchValue,
    };
    this.apiService.getDDlAssignedCashier(obj).subscribe((success) => {
      console.log(success.value);
      this.cashCounterDDL = success.value;
    });
  }

  createCashCounterSearch() {
    this.apiService.createCashCounterSearch().subscribe((success: any) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchCashCounter();
    });
  }

  searchCashCounter() {
    this.searchParams.branchValue = this.branchValue;

    this.apiService
      .searchCashCounter(this.searchParams)
      .subscribe((success: any) => {
        this.pagination.pageNumber = success.pageNumber;
        this.pagination.pageSize = success.pageSize;
        this.pagination.totalCount = success.totalCount;
        this.tableData = success.ilstentCashCounterSearchSet;

        if (success.assignedCashierCode) {
          this.searchParams.assignedUserId = success.assignedCashierCode;
        }
      });
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.searchParams.pageNumber = 1;
    this.searchCashCounter();
    this.appSearch?.close();
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
  }

  pageChanged(event: any) {
    this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchCashCounter();
  }

  async navigateToDetail(cashCounterId: any) {
    const obj = {
      data: cashCounterId,
    };
    let urlJson = await this.urlService.encode(obj);
    if (Number(cashCounterId) > 0) {
      this.router.navigateByUrl('/home/finance/cash-counter/detail/' + urlJson);
    } else {
      const obj = {
        data: 0,
        clicked: true,
      };
      let urlJson = await this.urlService.encode(obj);
      this.router.navigateByUrl('/home/finance/cash-counter/info/' + urlJson);
    }
  }

  clear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.createCashCounterSearch();
    this.data.successMessage('Data Cleared Successfully');
  }

  statusSortSearch(val: any) {
    this.searchParams.statusValue = val;
    this.searchCashCounter();
  }

  async openDialog(val: any) {
    await this.dialog.openDialog(CashCounterInfoComponent, {
      disableClose: true,
      height: '300px',
      width: '500px',
      maxWidth: '1170px',
      data: {
        data: val,
        clicked: true,
      },
    });
  }

  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus');
  }
}
