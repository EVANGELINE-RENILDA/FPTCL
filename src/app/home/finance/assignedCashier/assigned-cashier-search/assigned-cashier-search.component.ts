import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
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
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { entCashCounterSearch } from '../../../../common/api-services/application-api/application-api.classes';

@Component({
  selector: 'app-assigned-cashier-search',
  standalone: true,
  imports: [
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    IconButtonComponent,
    ViewLabel,
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './assigned-cashier-search.component.html',
  styleUrl: './assigned-cashier-search.component.scss',
})
export class AssignedCashierSearchComponent implements OnInit {
  pageId = 'POSMX';
  pageIndex = 0;
  totalCount = '';
  pageSize = 10;
  initialLoad = true;
  assignedCashSearch = new entCashCounterSearch();
  assignedCashSearchRAW = new entCashCounterSearch();
  branchName = '';
  @ViewChild('appSearch') appSearch!: SearchComponent;

  displayedColumns: string[] = [
    'branch',
    'counterNo',
    'counterName',
    'effectiveDate',
  ];
  columns: any = [
    'cashCounterNo',
    'cashcounterName',
    'effectiveDate',
    'action',
  ];

  columnsName: any = ['Counter No', 'Counter Name', 'Effective Date', 'Action'];

  sortColumnName: any[] = ['cashCounterNo', 'cashcounterName', 'effectiveDate'];

  branchDDL: any = [];
  tableData = [];
  cashCounterDDL: any = [];
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
  };
  __selectedItems: any = {
    currentIndex: 0,
    array: [],
  };
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  branchValue: any;
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
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  async init() {
    await this.data.checkToken();
    await this.storage.get('branchFinance').then((val) => {
      this.branchName = val;
    });
    await this.storage.get('branchvalue').then((val) => {
      this.branchValue = val;
    });
    this.getAssignedCashierList();
    this.createAssignedCashierSearch();
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

  createAssignedCashierSearch() {
    this.apiDataService.createCashCounterSearch().subscribe((success) => {
      this.assignedCashSearch = success;
      this.assignedCashSearchRAW = JSON.parse(
        JSON.stringify(this.assignedCashSearchRAW)
      );

      this.assignedCashSearch.pageNumber = this.pagination.pageNumber;
      this.assignedCashSearch.pageSize = this.pagination.pageSize;
      this.searchAssignedCashier();
    });
  }
  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  searchAssignedCashier(type?:any) {
    this.assignedCashSearch.branchValue = this.branchValue;

    this.assignedCashSearch.statusValue = 'APRVD';
    this.apiDataService
      .searchCashCounter(this.assignedCashSearch)
      .subscribe((success) => {
        this.pagination.pageNumber = success.pageNumber;
        this.pagination.pageSize = success.pageSize;
        this.pagination.totalCount = success.totalCount;
        this.tableData = success.ilstentCashCounterSearchSet;
        this.initialLoad = false;
        if (type !== 'clear') {
          this.dialog.closeDialog();
        }
      });
  }

  onSort(event: any) {
    this.assignedCashSearch.istrSortOrder =
      event.direction === 'asc' ? true : false;
    this.assignedCashSearch.istrSortColumn = event.active;
    this.assignedCashSearch.pageNumber = 1;
    this.searchAssignedCashier();
  }
  pageChanged(event: any) {
    this.assignedCashSearch.pageNumber = event.pageIndex;
    this.assignedCashSearch.pageSize = event.pageSize;
    this.assignedCashSearch.istrSortColumn = event.sortColumnName;
    this.assignedCashSearch.istrSortOrder = event.sortOrder;
    this.searchAssignedCashier();
  }

  clear() {
    this.assignedCashSearch = JSON.parse(
      JSON.stringify(this.assignedCashSearchRAW)
    );
    this.searchAssignedCashier('clear')
    this.data.successMessage('Data Cleared Successfully');
  }

  async assignedCashierDetail(id: any) {
    const obj = {
      id: id,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl(
      '/home/finance/assigned-cashier/detail/' + urlJson
    );
  }

  getDDlAssignedCashier(event: any) {
    if (event) {
      const obj = {
        data: this.assignedCashSearch.branchValue,
      };
      this.apiDataService
        .getCashCounterBasedOnBranch(obj)
        .subscribe((success: any) => {
          this.cashCounterDDL = success.data[0]?.value;
        });
    }
  }

  async navigateToDetail(cashCounterId: any) {
    const obj = {
      data: cashCounterId,
    };
    let urlJson = await this.url.encode(obj);
    if (Number(cashCounterId) > 0) {
      this.router.navigateByUrl(
        '/home/finance/assigned-cashier/detail/' + urlJson
      );
    } else {
      const obj = {
        data: 0,
        clicked: false,
      };
      let urlJson = await this.url.encode(obj);
      this.router.navigateByUrl('/home/finance/cash-counter/info/' + urlJson);
    }
  }
  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus');
  }
}
