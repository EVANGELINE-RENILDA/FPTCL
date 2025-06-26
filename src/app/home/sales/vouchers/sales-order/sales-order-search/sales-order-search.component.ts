import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../../app-core/service/core.service';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppService } from '../../../../../app.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, InnerScroll, AppToolTipComponent } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entActVoucherConfig, entSalSalesOrderSearch, entSalSalesQuotationSearch } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccoutsStatusTableComponent } from '../../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { SearchCustomerComponent } from '../../../../search/search-customer/search-customer.component';

@Component({
  selector: 'app-sales-order-search',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, AccoutsStatusTableComponent, TableStatusSortComponent, SearchCustomerComponent],
  templateUrl: './sales-order-search.component.html',
  styleUrl: './sales-order-search.component.scss'
})
export class SalesOrderSearchComponent {

  searchParams = new entSalSalesOrderSearch();
  searchParamsRAW = new entSalSalesOrderSearch();
  voucherConfig = new entActVoucherConfig();
  customerName: any;
  totalInprogressCount: any = 0;
  totalApprovedCount: any = 0;
  voucherConfigId: any = 0;
  regionValueDDL: any = []
  errorTrue = false;
  options = {
    hideFullSpinner: true,
  };

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('l') lform!: NgForm

  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }

  tableData: any = [];
  idList: any = [];

  columns: any = ["docNo", "customerName", "date", "createdDate", "appDate", "docAmount", "repotingAmount", "status", "action"];
  columnsName: any = ["Document No", "Customer Name", "Document Date", "Created Date", "Approved Date", "Document Amount", "Reporting Amount", "Status", "Action"];

  constructor(public router: Router,
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
  }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getSalesOrderInitialData', this.options);
    this.getNewSalesOrderSearch();
    this.totalInprogressandApprovedCounts();
  }

  getNewSalesOrderSearch(type?: any) {
    this.accountsService.getNewSalesOrderSearch().subscribe((succes) => {
      this.searchParams = succes;
      this.searchParams.regionValue = 'REGI1'
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchSalesOrder();
    })
  }

  searchSalesOrder() {
    this.searchParams.pageNumber = this.pagination.pageNumber;
    this.searchParams.pageSize = this.pagination.pageSize;
    this.accountsService.searchSalesOrder(this.searchParams).subscribe((success) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.ilistentSalesOrderSearchSet;
    })
  }
  doSearchCustomer(event: any) {
    this.customerName = event.customerName;
    this.searchParams.lngActcustomerId = event.actCustomerId;
  }
  async createNewPurchaseQuotation() {
    if (this.lform.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: 'REGI1'
        };
        let urlJson = await this.urlService.encode(obj);
        this.router.navigateByUrl(
          '/home/sales/sales-order/detail/' + urlJson
        );
      } else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    } else {
      this.errorTrue = true;
    }
  }

  async openPurchaseQuotation(id: any) {
    if (id > 0) {
      const obj = {
        data: id,
        data1: 0,
        data2: ''
      };
      const encode = await this.url.encode(obj);
      this.router.navigateByUrl('/home/sales/sales-order/detail/' + encode);
    }
    else {
      this.data.errorInfoMessage('Please select any one record to open');
    }
  }

  statusSortSearch(val: any) {
    this.searchParams.statusValue = val;
    this.searchSalesOrder()
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchSalesOrder()
    this.dialog.closeDialog();
  }
  clear() {
    this.getNewSalesOrderSearch();
    this.data.successMessage("Data Cleared Successfully");
  }
  getVoucherDetail(element: any) {
    const obj = {
      data: element
    };
    this.accountsService
      .getVoucherAccess(obj, this.options)
      .subscribe((success) => {
        this.voucherConfigId = success.actVoucherConfigId;
        this.voucherConfig = success;
        this.regionValueDDL = success.plstentDDLClass
      });
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.ascending = event.sortOrder;
    this.searchSalesOrder();
  }

  totalInprogressandApprovedCounts() {
    if (this.initialData.DDLValues.DDLInprogressList.length !== 0) {
      for (let i = 0; i < this.initialData.DDLValues.DDLInprogressList.length; i++) {
        this.totalInprogressCount = this.initialData.DDLValues.DDLInprogressList[i].constant;
        console.log(this.totalInprogressCount);

      }
    }
    if (this.initialData.DDLValues.DDLApprovedList.length !== 0) {
      for (let i = 0; i < this.initialData.DDLValues.DDLApprovedList.length; i++) {
        this.totalApprovedCount = this.initialData.DDLValues.DDLApprovedList[i].constant;
      }
    }
  }
}
