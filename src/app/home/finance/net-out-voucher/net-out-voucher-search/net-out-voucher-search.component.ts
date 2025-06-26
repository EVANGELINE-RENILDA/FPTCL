import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InnerScroll, Row, AppToolTipComponent } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
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
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { entActNetoutVoucher, entActNetoutVoucherSearch, entActVoucherConfig } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';


@Component({
  selector: 'app-net-out-voucher-search',
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
    AppDatePipe,
    AccoutsStatusTableComponent,
    TableStatusSortComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './net-out-voucher-search.component.html',
  styleUrl: './net-out-voucher-search.component.scss'
})
export class NetOutVoucherSearchComponent {

  errorTrue = false;
  voucherConfigId: any = 0;
  totalInprogressCount = 0;
  totalApprovedCount = 0;
  regionValue = 'REGI1';
  regionValueDDL = [];
  allRecordsEnable = false;
  voucherId = 0;


  accountsOptions = {
    type: 'accountsPath',
  };

  searchParams = new entActNetoutVoucherSearch();
  searchParamsRAW = new entActNetoutVoucherSearch();
  voucher = new entActNetoutVoucher();
  voucherConfig = new entActVoucherConfig();

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  columns: any = [
    'voucherNo',
    'voucherType',
    'custName',
    'branchName',
    'docDate',
    'createdDate',
    'apprvDate',
    'amount',
    'status',
    'action'
  ];

  columnsName: any = [
    'Voucher No',
    'Voucher Type',
    'Customer / Vendor Name',
    'Branch Name',
    'Document Date',
    'Created Date',
    'Approved Date',
    'Amount',
    'Status',
    ''
  ];

  tableData = [];

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
    public url: UrlService,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    await this.data.checkToken();
    this.initialData.getAcccountsDDL('getNetoutVoucherInitialData', this.accountsOptions);
    await this.getAccountsNetoutVoucher();
    this.totalInprogressandApprovedCounts();
  }

  getAccountsNetoutVoucher() {
    this.accountsService.getNetoutVoucherSearch().subscribe((succes) => {
      this.searchParams = succes;
      this.searchParams.regionValue = '';
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchAccountsNetoutVoucher();
    })
  }

  searchAccountsNetoutVoucher(type?: any) {
    this.searchParams.regionValue = 'REGIO';
    this.accountsService.searchNetoutVoucher(this.searchParams).subscribe((success) => {
      this.tableData = success.ilstentActNetoutVoucherSearchResultSet;
      this.pagination = success;
      if (type !== 'clear') {
        this.appSearch?.close()
      }
    })
  }
  statusSortSearch(val: any) {
    this.searchParams.statusValue = val;
    this.searchAccountsNetoutVoucher()
  }
  totalInprogressandApprovedCounts() {
    if (this.initialData.DDLValues.DDLInprogressList.length !== 0) {
      for (let i = 0; i < this.initialData.DDLValues.DDLInprogressList.length; i++) {
        this.totalInprogressCount = this.initialData.DDLValues.DDLInprogressList[0].constant;
      }
    }
    if (this.initialData.DDLValues.DDLApprovedList.length !== 0) {
      for (let i = 0; i < this.initialData.DDLValues.DDLApprovedList.length; i++) {
        this.totalApprovedCount = this.initialData.DDLValues.DDLApprovedList[0].constant;
      }
    }
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.searchAccountsNetoutVoucher();
  }

  pageChanged(event: any) {
    this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchAccountsNetoutVoucher();
  }

  async navigateDetail(l: any) {
    if (l.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: this.regionValue
        };
        let urlJson = await this.urlService.encode(obj);
        this.router.navigateByUrl(
          '/home/finance/net-out-voucher/detail/' + urlJson
        );
      } else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    } else {
      this.errorTrue = true
    }

  }

  async openDetail(id: any) {

    const obj = {
      data: id,
      // data1: 0,
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl(
      '/home/finance/net-out-voucher/detail/' + urlJson
    );
  }

  getVoucherDetail(element: any) {
    const obj = {
      data: element,
    };
    this.accountsService
      .getVoucherAccess(obj, this.accountsOptions)
      .subscribe((success) => {
        this.voucherConfigId = success.actVoucherConfigId;
        this.voucherConfig = success;
        this.regionValueDDL = success.plstentDDLClass
      });
  }

  totalInprogressList() {
    this.searchParams = new entActNetoutVoucherSearch();
    this.searchParams.statusValue = 'INPRO';
    this.searchParams.pageSize = 0;
    this.searchParams.pageNumber = 0;
    this.allRecordsEnable = true;
    this.searchAccountsNetoutVoucher();
  }

  totalApprovedList() {
    this.searchParams = new entActNetoutVoucherSearch();
    this.searchParams.statusValue = 'APROV';
    this.searchParams.pageSize = 0;
    this.searchParams.pageNumber = 0;
    this.allRecordsEnable = true;
    this.searchAccountsNetoutVoucher();
  }

  allRecords() {
    this.searchParams = new entActNetoutVoucherSearch();
    this.searchParams.statusValue = '';
    this.searchParams.pageSize = 0;
    this.searchParams.pageNumber = 0;
    setTimeout(() => {
      this.allRecordsEnable = false;
    }, 300);
    this.searchAccountsNetoutVoucher();
  }

  clear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.searchAccountsNetoutVoucher('clear')
    this.data.successMessage('Data Cleared Successfully');
  }
  navigateToAccount(){
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
}
