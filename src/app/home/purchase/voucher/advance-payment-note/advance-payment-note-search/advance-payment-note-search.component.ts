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
import { entActVoucherConfig, entPurAdvancePaymentNoteSearch } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { SearchVendorComponent } from '../../../../search/search-vendor/search-vendor.component';
import { AccoutsStatusTableComponent } from '../../../../../app-core/template/accouts-status-table/accouts-status-table.component';

@Component({
  selector: 'app-advance-payment-note-search',
  standalone: true,
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, TableStatusSortComponent, SearchVendorComponent, AccoutsStatusTableComponent],
  templateUrl: './advance-payment-note-search.component.html',
  styleUrl: './advance-payment-note-search.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvancePaymentNoteSearchComponent {

  searchParams = new entPurAdvancePaymentNoteSearch();
  searchParamsRAW = new entPurAdvancePaymentNoteSearch();

  totalActiveCount: any = '';
  totalInActiveCount: any = '';
  voucherConfigId = 0;
  totalInprogressCount = 0;
  totalApprovedCount = 0;
  errorTrue = false;

  regionValueDDL: any = [];
  tableData: any = [];

  voucherConfig = new entActVoucherConfig();

  @ViewChild('l') lform!: NgForm
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

  idList: any = [];

  columns: any = ["docNo", "vendName", "date", "createdDate", "appDate", "docAmount", "repotingAmount", "status", "action"];
  columnsName: any = ["Document No", "Vender Name", "Document Date", "Created Date", "Approved Date", "Document Amount", "Reporting Amount", "Status", "Action"];

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

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getAdvancePaymentNotesInitialData');
    this.totalInprogressandApprovedCounts()
    this.getNewAdvancePaymentNoteSearch();
  }

  getNewAdvancePaymentNoteSearch() {
    this.accountsService
      .getNewAdvancePaymentNoteSearch()
      .subscribe((success: any) => {
        this.searchParams = success;
        this.searchParams.pageNumber = this.pagination.pageNumber;
        this.searchParams.pageSize = this.pagination.pageSize;
        this.searchParamsRAW = JSON.parse(JSON.stringify(this.searchParams));
        this.searchAdvancePaymentNotes();
      });
  }

  searchAdvancePaymentNotes() {
    this.searchParams.pageNumber = this.pagination.pageNumber;
    this.searchParams.pageSize = this.pagination.pageSize;
    this.accountsService.searchAdvancePaymentNotes(this.searchParams).subscribe((success: any) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.ilstentPurAdvancePaymentNoteResultSet
    });
  }

  statusSortSearch(val: any) {
    this.searchParams.strstatusValue = val;
    this.searchAdvancePaymentNotes()
  }


  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchAdvancePaymentNotes();
  }

  navigateToDetail() {
    debugger
    this.router.navigateByUrl('/home/purchase/advance-payment-note/detail')
  }
  async openDetail(element: any) {
    debugger
    const obj = {
      data: element.purAdvancePaymentnoteId,
      data1: this.voucherConfigId,
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl(
      '/home/purchase/advance-payment-note/detail/' + urlJson
    );
  }
  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.searchAdvancePaymentNotes();
    this.appSearch.close();
  }

  clear() {
    this.getNewAdvancePaymentNoteSearch();
    this.data.successMessage("Data Cleared Successfully");
  }

  async navigateDetail(l: any) {
    if (l.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: 'REGI1'
        };
        let urlJson = await this.urlService.encode(obj);
        this.router.navigateByUrl(
          '/home/purchase/advance-payment-note/detail/' + urlJson
        );
      }
      else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    } else {
      this.errorTrue = true;
    }
  }

  getVoucherDetail(element: any) {
    const obj = {
      data: element,
    };
    this.accountsService
      .getVoucherAccess(obj,)
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
  navigateToList() {
    this.router.navigateByUrl('/home/purchase/advance-payment-note/search');
  }
  navigateToPurchase(){
    this.router.navigateByUrl('/home/corporate/purchase-menus')
  }
}
