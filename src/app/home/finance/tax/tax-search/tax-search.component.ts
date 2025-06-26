import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef, ViewChild, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InnerScroll, Row, AppToolTipComponent, } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective, } from '../../../../app-core/template/app-table/app-table.component';
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
import { entActCompanyTaxSearch, entCompanyTax } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';

@Component({
  selector: 'app-tax-search',
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
    AppDatePipe,
    FormsModule,
    TableStatusSortComponent,
    AppAccessDirective,
    ButtonAccessDirective,
    AppToolTipComponent,
    MatTooltipModule, AccoutsStatusTableComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tax-search.component.html',
  styleUrl: './tax-search.component.scss',
})
export class TaxSearchComponent {
  pageId = 'ATXSC';
  options = {
    type: 'accountsPath',
  };

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  searchParams = new entActCompanyTaxSearch();
  searchParamsRAW = new entActCompanyTaxSearch();
  companyTax = new entCompanyTax();

  columns: any = [
    'sNo',
    'srtTaxName',
    'strTaxCode',
    'effectiveDate',
    'currentPercentage',
    'statusDescription',
    'taxStatusDescription',
    'action'
  ];

  columnsName: any = [
    '',
    'Tax Name',
    'Tax Code',
    'Effective Date',
    'Percentage',
    'Status',
    'Tax Status',
    ''
  ];
  totalActiveCount: any = '';
  totalInActiveCount: any = '';

  tableData: any = [];
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
  errorTrue = false;

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
    this.currentDate = this.appService.getCurrentDate();
    await this.initialData.getAcccountsDDL('getTaxInitialData', this.options);
    await this.totalInprogressandApprovedCounts();
    await this.createNewTaxSearch();

    this.tableData = [];
    // hello

    // await this.initialData.getDDL('getInitialDataForCustomer', this.options);
    // this.createTaxSearch();
  }

  createNewTaxSearch(type?: any) {

    this.accountsService.createNewTaxSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
    })
    if (type === 'clear') {
      this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW))
      this.createNewTaxSearch();
      this.data.successMessage('Data Cleared Successfully');
    } else {
      this.searchTax();
      this.totalInprogressandApprovedCounts();
    }
  }

  async searchTax() {
    this.searchParams.pageNumber = this.pagination.pageNumber;
    this.searchParams.pageSize = this.pagination.pageSize;
    this.accountsService.searchTax(this.searchParams).subscribe((success) => {
      this.tableData = success.ilstActCompanyTaxSearchSet;
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
    })
  }

  async createNewTax(id: any) {
    const encode = await this.url.encode(id);
    this.router.navigateByUrl('/home/finance/tax/detail/' + encode);
  }
  async openTaxDetail(id: any) {

    if (id > 0) {
      const encode = await this.url.encode(id);
      this.router.navigateByUrl('/home/finance/tax/detail/' + encode);
    }
    else {
      this.data.errorInfoMessage('Please select any one record to open');
    }
  }
  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchTax()
    this.appSearch?.close();
  }
  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  pageChanged(event: any) {
    this.createNewTaxSearch();
  }

  async selectAllNavigate() {
    if (this.__selectedItems.array.length === 0) {
      return;
    }
    let encodeId = await this.urlService.encode(this.__selectedItems);
    // this.router.navigateByUrl('/home/crm/customer/detail/' + encodeId);
  }

  async navigateToDetail() {
    // let obj = {
    //   currentIndex: 0,
    //   array: [id]
    // }
    // let encodeId = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/finance/tax/detail');
  }

  clear() {

  }
  statusSortSearch(val: any) {
    this.searchParams.taxStatus = val;
    this.searchTax()
  }
  async totalInprogressandApprovedCounts() {
    if (this.initialData.DDLValues.DDLActivesList.length !== 0) {
      for (let i = 0; i < this.initialData.DDLValues.DDLActivesList.length; i++) {
        this.totalActiveCount = this.initialData.DDLValues.DDLActivesList[i].constant;
      }
    }
    if (this.initialData.DDLValues.DDLInActiveList.length !== 0) {
      for (let i = 0; i < this.initialData.DDLValues.DDLInActiveList.length; i++) {
        this.totalInActiveCount = this.initialData.DDLValues.DDLInActiveList[i].constant;
      }
    }
    console.log(this.totalActiveCount, this.totalInActiveCount);
  }
  navigateToAccount(){
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
}
