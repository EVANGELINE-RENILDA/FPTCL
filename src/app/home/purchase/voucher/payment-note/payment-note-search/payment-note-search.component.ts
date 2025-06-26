import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../../app-core/service/core.service';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppService } from '../../../../../app.service';
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
import { entActVoucherConfig, entPurPaymentNoteSearch } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccoutsStatusTableComponent } from '../../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { SearchVendorComponent } from '../../../../search/search-vendor/search-vendor.component';

@Component({
  selector: 'app-payment-note-search',
  standalone: true,
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective, TableStatusSortComponent, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, AccoutsStatusTableComponent, SearchVendorComponent],
  templateUrl: './payment-note-search.component.html',
  styleUrl: './payment-note-search.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaymentNoteSearchComponent {

  voucherConfigId = 0;
  errorTrue = false;

  searchParams = new entPurPaymentNoteSearch();
  voucherConfig = new entActVoucherConfig();

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

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
  vendorName: any = '';

  columns: any = ["docNo", "vendorName", "documentDate", "enteredDate", "appDate", "docAmount", "repotingAmount", "status", "action"];
  columnsName: any = ["Document No", "Vender Name", "Document Date", "Created Date", "Approved Date", "Document Amount", "Reporting Amount", "Status", "Action"];

  totalInprogressCount = [];
  totalApprovedCount = [];

  constructor(
    public router: Router,
    public accountsService: AccountsApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public urlService: UrlService
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
    await this.initialData.getAcccountsDDL('getPaymentNoteInitialData');
    this.getNewPaymentNoteSearch();
    this.totalInprogressandApprovedCounts();
  }

  getNewPaymentNoteSearch() {
    this.accountsService
      .getNewPaymentNoteSearch()
      .subscribe((success: any) => {
        this.searchParams = success;
        this.searchParams.regionValue = "REGI1";
        this.searchParams.pageNumber = this.pagination.pageNumber;
        this.searchParams.pageSize = this.pagination.pageSize;
        this.searchPaymentNote();
      });
  }

  searchPaymentNote(val?:any) {
    this.accountsService
      .searchPaymentNote(this.searchParams)
      .subscribe((success: any) => {
        this.tableData = success.ilstentPurPaymentNoteSearchResultSet;
        this.pagination.pageNumber = success.pageNumber;
        this.pagination.pageSize = success.pageSize;
        this.pagination.totalCount = success.totalCount;
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
    this.searchParams.strstatusvalue = val;
    this.searchPaymentNote()
  }

  onSearch() {
    this.dialog.closeAll();
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.searchPaymentNote(true);
  }

  onSelect(event: any) {
    this.__selectedItems = event;
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchPaymentNote();
  }

  async navigateToDetail(l: any) {
    if (l.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: false,
          data3: 'REGI1'
        };
        let urlJson = await this.urlService.encode(obj);
        this.router.navigateByUrl(
          '/home/purchase/payment-note/detail/' + urlJson
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
    this.vendorName=''

    this.getNewPaymentNoteSearch();
    this.data.successMessage('Data Cleared Successfully');
  }

  async openDetail(element: any) {
    debugger
    const obj = {
      data: element.purPaymentnoteId,
      data1: this.voucherConfigId,
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl(
      '/home/purchase/payment-note/detail/' + urlJson
    );
  }
  navigateToPurchase(){
    this.router.navigateByUrl('/home/corporate/purchase-menus')
  }
  doVendorSelect(event: any) {

    this.vendorName = event.vendorName;
    this.searchParams.strActVendorId = event.actVendorId;
  }
  vendorSearchBreadcrumb = [
    {
      name: 'Purchase',
      link: '',
      backlink: '',
    },
    {
      name: 'Vendor Search',
      link: '',
      backlink: '',
    },
  ];
}
