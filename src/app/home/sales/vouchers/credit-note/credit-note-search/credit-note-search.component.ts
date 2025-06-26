import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, InnerScroll, AppToolTipComponent } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AppService } from '../../../../../app.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entActCreditNoteSearch, entActVoucherConfig } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccoutsStatusTableComponent } from '../../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { SearchCustomerComponent } from "../../../../search/search-customer/search-customer.component";

@Component({
  selector: 'app-credit-note-search',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, TableStatusSortComponent, AccoutsStatusTableComponent, SearchCustomerComponent, SearchCustomerComponent],
  templateUrl: './credit-note-search.component.html',
  styleUrl: './credit-note-search.component.scss'
})
export class CreditNoteSearchComponent {


  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  totalInprogressCount: any = 0;
  totalApprovedCount: any = 0;
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };

  options = {
    hideFullSpinner: true,
  };

  @ViewChild('l') lform!: NgForm;
  errorTrue = false

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  idList: any = [];
  tableData: any = [];
  voucherConfigId: any = 0;
  voucherId = 0
  voucherConfig = new entActVoucherConfig();
  regionValueDDL: any = [];

  columns: any = ["docNo", "customerName", "documentDate", "createdDate", "appDate", "docAmount", "repotingAmount", "statusDescription", "action"];
  columnsName: any = ["Document No", "Customer Name", "Document Date", "Created Date", "Approved Date", "Document Amount", "Reporting Amount", "Status", "Action"];

  searchParams = new entActCreditNoteSearch();
  searchParamsRAW = new entActCreditNoteSearch();

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
  ) {

  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  ngOnInit(): void {
    this.init()
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getCreditNoteInitialData', this.options);
    this.getNewCreaditSet();
    this.totalInprogressandApprovedCounts();
  }

  getNewCreaditSet() {
    this.accountsService.getNewSalesOrderSearch().subscribe((succes) => {
      this.searchParams = succes;
      this.searchParams.regionValue = 'REGI1'
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchCreditNote();
    })
  }

  searchCreditNote() {
    this.accountsService.searchCreditNote(this.searchParams, this.options).subscribe((success: any) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.plstentActCreditNoteSearchResultSet;
    });
  }

  getVoucherDetail(element: any) {
    const obj = {
      data: element,
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

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchCreditNote()
    this.dialog.closeDialog();
  }
  clear() {
    this.getNewCreaditSet();
    this.data.successMessage("Data Cleared Successfully");
  }

  async createNewPurchaseQuotation() {
    if (this.voucherConfigId !== 0 && this.lform.valid) {
      const obj = {
        data: 0,
        data1: this.voucherConfigId,
        data2: 'REGI1'
      };
      let urlJson = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/sales/credit-note/detail/' + urlJson
      );
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please Select Document Name');
    }
  }

  async openDetail(id: any) {
    if (id > 0) {
      const obj = {
        data: id,
        data1: 0,
        data2: ''
      };
      const encode = await this.urlService.encode(obj);
      this.router.navigateByUrl('/home/sales/credit-note/detail/' + encode);
    }
    else {
      this.data.errorInfoMessage('Please select any one record to open');
    }
  }


  pageChanged(event: any) {

  }
  customerName = ''
  doSearchCustomer(event: any) {
    this.customerName = event.customerName;
    this.searchParams.lngActCustomerId = event.actCustomerId;
  }

  statusSortSearch(val: any) {
    this.searchParams.strStatusValue = val;
    this.searchCreditNote()
  }
  async totalInprogressandApprovedCounts() {

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
    console.log(this.totalInprogressCount, this.totalApprovedCount, 'hi');
  }
  navigateToSales(){
    this.router.navigateByUrl('/home/corporate/sales-menus')
  }
}
