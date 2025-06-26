import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  InnerScroll,
  Row,
  AppToolTipComponent,
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
import { entActFundTransferNoteSearch, entActVoucherConfig } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';

@Component({
  selector: 'app-fund-transfer-note-search',
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './fund-transfer-note-search.component.html',
  styleUrl: './fund-transfer-note-search.component.scss',
})
export class FundTransferNoteSearchComponent {
  pageId = 'FTNSC';
  voucherId = 0;
  voucherConfigId = 0;
  regionValue = '';


  searchParams = new entActFundTransferNoteSearch();
  searchParamsRAW = new entActFundTransferNoteSearch();
  voucherConfig = new entActVoucherConfig();

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  columns: any = [
    'actFundTransferNoteRefNo',
    // 'branchName',
    'documentDate',
    'enteredDate',
    'approvedDate',
    // 'regionDescription',
    'creditAmount',
    'status',
    'action',
  ];
  columnsName: any = [
    'Document No',
    // 'Branch Name',
    'Document Date',
    'Created Date',
    'Approved Date',
    // 'Region',
    'Amount',
    'Status',
    'Action',
  ];

  sortColumnName: any[] = [
    'actFundTransferNoteRefNo',
    'documentDate',
    'enteredDate',
    'approvedDate',
    'creditAmount',
    'status'
  ];

  tableData: any = [];

  totalInprogressCount: any = '';
  totalApprovedCount: any = '';
  regionValueDDL = [];


  idList: any = [];
  currentDate = '';
  isSelectedAll = false;
  @Input() public type: any = '';

  __selectedItems: any = {
    currentIndex: 0,
    array: [],
  };

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
    sortColumnName: '',
    sortOrder: false
  };

  errorTrue = false;
  maxDebitAmountFrom: any;
  minDebitAmountTo: any;
  currency: any;

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
    public accountsService: AccountsApiService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL(
      'getFundTransferNoteInitialData'
    );

    await this.appStorage.get('companyCurrencyValue').then((val) => {
      this.currency = val;
    });

    this.totalInprogressandApprovedCounts();
    this.createFundTransferSearch();
  }

  createFundTransferSearch() {
    this.accountsService
      .getFundTransferNoteSearch()
      .subscribe((success: any) => {
        this.searchParams = success;
        this.searchParams.pageNumber = this.pagination.pageNumber;
        this.searchParams.pageSize = this.pagination.pageSize;
        this.searchFundTransferNote();
      });
  }

  searchFundTransferNote() {
    this.searchParams.regionValue = ''
    this.maxDebitAmountFrom = Number(this.searchParams.dcdebitAmountFrom);
    this.minDebitAmountTo = Number(this.searchParams.dcdebitAmountTo);

    this.accountsService
      .searchFundTransferNote(this.searchParams)
      .subscribe((success: any) => {
        this.pagination.pageNumber = success.pageNumber;
        this.pagination.pageSize = success.pageSize;
        this.pagination.totalCount = success.totalCount;
        this.tableData = success.ilstentActFundTransferNoteSearchResultSet;
        // this.totalCount = success.totalCount;
        // this.pageSize = success.pageSize;
        // this.pageIndex = success.pageNumber - 1;
        // this.overlayService.detachSearchboxAll();

      });
  }
  getVoucherDetail(element: any) {
    const obj = {
      data: element,
    };
    this.accountsService
      .getVoucherAccess(obj)
      .subscribe((success) => {
        this.voucherConfigId = success.actVoucherConfigId;
        this.voucherConfig = success;
        this.regionValueDDL = success.plstentDDLClass
      });
  }

  totalInprogressandApprovedCounts() {
    if (this.initialData.DDLValues.DDLInprogressList.length !== 0) {
      for (let i = 0; i < this.initialData.DDLValues.DDLInprogressList.length; i++) {
        this.totalInprogressCount = this.initialData.DDLValues.DDLInprogressList[i].constant;
      }
    }
    if (this.initialData.DDLValues.DDLApprovedList.length !== 0) {
      for (let i = 0; i < this.initialData.DDLValues.DDLApprovedList.length; i++) {
        this.totalApprovedCount = this.initialData.DDLValues.DDLApprovedList[i].constant;
      }
    }
  }
  statusSortSearch(val: any) {
    this.searchParams.statusValue = val;
    this.searchFundTransferNote()
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.searchFundTransferNote();
    this.appSearch?.close()
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.iblnSortOrder = event.sortOrder;
  }

  pageChanged(event: any) {
    this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.iblnSortOrder = event.sortOrder;
    this.searchFundTransferNote();
  }

  async navigateToDetail(l: any) {
    if (l.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: this.regionValue
        };
        let urlJson = await this.urlService.encode(obj);
        this.router.navigateByUrl(
          '/home/finance/fund-transfer-note/detail/' + urlJson
        );
      } else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    }
    else {
      this.errorTrue = true
    }
  }

  clear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW))
    this.createFundTransferSearch();
    this.data.successMessage('Data Cleared Successfully');
  }

  async openDetail(element: any) {
    const obj = {
      data: element.actFundTransferNoteId,
      data1: this.voucherConfigId,
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl(
      '/home/finance/fund-transfer-note/detail/' + urlJson
    );
  }
  navigateToAccount() {
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }

}
