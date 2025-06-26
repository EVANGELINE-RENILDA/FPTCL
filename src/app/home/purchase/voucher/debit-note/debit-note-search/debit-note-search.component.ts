import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entActDebitNoteSearch, entActVoucherConfig } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { SearchVendorComponent } from '../../../../search/search-vendor/search-vendor.component';
import { AccoutsStatusTableComponent } from '../../../../../app-core/template/accouts-status-table/accouts-status-table.component';

@Component({
  selector: 'app-debit-note-search',
  standalone: true,
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, TableStatusSortComponent, SearchVendorComponent,AccoutsStatusTableComponent],
  templateUrl: './debit-note-search.component.html',
  styleUrl: './debit-note-search.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebitNoteSearchComponent {

  totalApprovedCount = 0;
  totalInprogressCount = 0;
  errorTrue = false;
  voucherConfigId = 0;
  allRecordsEnable = false;

  searchParams = new entActDebitNoteSearch();
  searchParamsRAW = new entActDebitNoteSearch();
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

  columns: any = ["docNo", "vendorname", "docDate", "enteredDate", "appDate", "docAmount", "repotingAmount", "status", "action"];
  columnsName: any = ["Document No", "Vender Name", "Document Date", "Created Date", "Approved Date", "Document Amount", "Reporting Amount", "Status", "Action"];

  constructor(public router: Router,
    public accountsService: AccountsApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public urlService: UrlService,
    public appSetting: AppSettingsService
  ) {

  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  ngOnInit(): void {
    this.init();
  }


  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getDebitNoteInitialData');
    this.totalInprogressandApprovedCounts();
    this.getDebitNoteSearch();
  }

  getDebitNoteSearch() {
    this.accountsService
      .getDebitNoteSearch()
      .subscribe((success: any) => {
        this.searchParams = success;
        this.searchParams.regionValue = "REGI1";
        this.searchParams.pageNumber = this.pagination.pageNumber;
        this.searchParams.pageSize = this.pagination.pageSize;
        this.searchDebitNote();
      });
  }

  searchDebitNote() {
    this.accountsService
      .searchDebitNote(this.searchParams)
      .subscribe((success: any) => {
        this.tableData = success.lstActDebitNoteSearchresultSet;
        this.pagination.pageNumber = success.pageNumber;
        this.pagination.pageSize = success.pageSize;
        this.pagination.totalCount = success.totalCount;
        this.dialog.closeDialog();
      });
  }
  clearAllSearch() {
    this.getDebitNoteSearch();
    this.data.successMessage('Data Cleared Successfully');
  }

  async navigateToDetail(l: any) {
    if (l.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: 'REGI1'
        };
        let urlJson = await this.urlService.encode(obj);
        this.router.navigateByUrl('/home/purchase/debit-note/detail/' + urlJson);
      } else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    } else {
      this.errorTrue = true;
    }
  }

  async openDetail(element: any) {
    const obj = {
      data: element.actdebitnoteid,
      data1: 0,
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/purchase/debit-note/detail/' + urlJson);
  }

  getVoucherDetail(element: any) {
    const obj = {
      data: element,
    }
    this.accountsService
      .getVoucherAccess(obj)
      .subscribe((success) => {
        this.voucherConfigId = success.actVoucherConfigId;
        this.voucherConfig = success;
      });
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.searchDebitNote();
    this.appSearch.close();
  }

  onVendorSelect(event: any) {
    this.searchParams.vendorname = event.vendorName;
  }

  totalInprogressList() {
    this.searchParams = new entActDebitNoteSearch();
    this.searchParams.statusValue = 'INPRO';
    this.searchParams.pageNumber = 0;
    this.allRecordsEnable = true;
    this.searchDebitNote();
  }

  totalApprovedList() {
    this.searchParams = new entActDebitNoteSearch();
    this.searchParams.statusValue = 'APROV';
    this.searchParams.pageNumber = 0;
    this.allRecordsEnable = true;
    this.searchDebitNote();
  }

  allRecords() {
    this.searchParams = new entActDebitNoteSearch();
    this.searchParams.statusValue = '';
    this.searchParams.pageNumber = 0;
    this.allRecordsEnable = false;
    this.searchDebitNote();
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  pageChanged(event: any) {
    this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchDebitNote();
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
  navigateToPurchase(){
    this.router.navigateByUrl('/home/corporate/purchase-menus')
  }
}
