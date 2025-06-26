import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../../app-core/service/core.service';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppService } from '../../../../../app.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { FormsModule } from '@angular/forms';
import { Row, InnerScroll, AppToolTipComponent } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entActCustomerSearch } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccoutsStatusTableComponent } from '../../../../../app-core/template/accouts-status-table/accouts-status-table.component';

@Component({
  selector: 'app-customer-search',
  standalone: true,
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, TableStatusSortComponent, AccoutsStatusTableComponent],
  templateUrl: './customer-search.component.html',
  styleUrl: './customer-search.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerSearchComponent {

  searchParams = new entActCustomerSearch();
  searchParamsRAW = new entActCustomerSearch();
  @Output('dataSelected') dataSelected: EventEmitter<any> = new EventEmitter();

  @Input() public openStatus = true;
  @Input() public showBreadCrumb = true;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  totalActiveCount: any = '';
  totalInActiveCount: any = '';
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }

  tableData: any = [

  ];
  idList: any = [];

  columns: any = ["customerID", "cusName", "refNo", "createdDate", "customerType", "emailId", "contNo", "statusDescription", "action"];
  columnsName: any = ["Customer ID", "Customer Name", "Customer Ref No", "Created Date", "Customer Type", "Email ID", "Contact No", "Status", "Action"];

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
  ) {
    if(!this.openStatus){
      this.columns = ["customerID", "cusName", "refNo", "createdDate", "customerType", "emailId", "contNo", "statusDescription"];
  this.columnsName = ["Customer ID", "Customer Name", "Customer Ref No", "Created Date", "Customer Type", "Email ID", "Contact No", "Status"];
    }
  }
  ngOnInit(): void {
    this.init();
  }
  async init() {
    await this.data.checkToken();
    if(this.showBreadCrumb === true){

      this.appService.setBreadCrumb(this.breadCrumb);
    }
    await this.initialData.getAcccountsDDL('getCustomerInitialData');
    this.createcustomerSearch();
    this.totalInprogressandApprovedCounts();

  }
  createcustomerSearch() {
    this.accountsService.getcustomerSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchSalesCustomer();
    })
  }
  searchSalesCustomer() {
    this.accountsService.searchCustomer(this.searchParams).subscribe((success) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.ilstCustomerSearchResultset;
    })
  }

  statusSortSearch(val: any) {
    this.searchParams.status = val;
    this.searchSalesCustomer()
  }
  async totalInprogressandApprovedCounts() {

    if (this.initialData.DDLValues.InActiveCount.length !== 0) {
      for (let i = 0; i < this.initialData.DDLValues.InActiveCount.length; i++) {
        this.totalInActiveCount = this.initialData.DDLValues.InActiveCount[0].constant;
      }
    }
    if (this.initialData.DDLValues.ActiveCount.length !== 0) {
      for (let i = 0; i < this.initialData.DDLValues.ActiveCount.length; i++) {
        this.totalActiveCount = this.initialData.DDLValues.ActiveCount[0].constant;
      }
    }
    console.log(this.totalInActiveCount, this.totalActiveCount, 'hi');
  }

  async createNewSalesCustomer(id: any) {
    const encode = await this.url.encode(id);
    this.router.navigateByUrl('/home/sales/customer/detail/' + encode);
  }
  async openSalesCustomer(id: any) {

    if (id > 0) {
      const encode = await this.url.encode(id);
      this.router.navigateByUrl('/home/sales/customer/detail/' + encode);
    }
    else {
      this.data.errorInfoMessage('Please select any one record to open');
    }
  }
  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.data.successMessage('Search Executed Successfully');

    this.searchSalesCustomer();
    this.dialog.closeDialog();
  }
  clear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.searchSalesCustomer();
  }
  ngAfterViewInit(): void {
    if(this.showBreadCrumb === true){
      this.appService.setBreadCrumb(this.breadCrumb);
    }
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  pageChanged(event: any) {

  }

  navigateDetail() {
    this.router.navigateByUrl('/home/sales/customer/detail')
  }
  navigateToSales(){
    this.router.navigateByUrl('/home/corporate/sales-menus')
  }

  dataSelectedFn(val:any) {
    debugger
    this.dataSelected.emit(val);

  }
}
