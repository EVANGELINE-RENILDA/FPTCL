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
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { entActReversingJournalsearch } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { DatePipe } from '@angular/common';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';

@Component({
  selector: 'app-reversing-journal-search',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, CellHeaderDefDirective,
    IconButtonComponent, InnerScroll, InputControlComponent,
    SearchComponent, Row, FormsModule, AppAccessDirective, AccoutsStatusTableComponent,
    ButtonAccessDirective, AppToolTipComponent, MatTooltipModule, TableStatusSortComponent, AppDatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './reversing-journal-search.component.html',
  styleUrl: './reversing-journal-search.component.scss'
})
export class ReversingJournalSearchComponent {
  pageId = 'ARJSC';
  accountsOptions = {
    type: 'accountsPath',
  };

  totalInprogressCount: any = '';
  totalApprovedCount: any = '';

  searchParams = new entActReversingJournalsearch();


  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  columns: any = ["revjournalDocNo", "journalDocNo", "docDate", "createdDate", "changedDate", "debitAmt", "creditAmt", "status", "action"];

  columnsName: any = ["Reversing Journal Document No", "Journal Document No", "Document Date", "Created Date", "Changed Date", "Debit Amount", "Credit Amount", "Status", "Action"];

  sortColumnName: any[] = ["revjournalDocNo", "journalDocNo", "docDate", "createdDate", "changedDate", "debitAmt", "creditAmt", "status"];

  tableData: any = [];
  idList: any = [];
  currentDate = '';
  isSelectedAll = false;
  @Input() public type: any = '';

  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
    sortColumnName: '',
    sortOrder: false
  }
  errorTrue = false;
  currency: any;

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

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getReverseJournalInitialData', this.accountsOptions)
    this.totalInprogressandApprovedCounts();

    await this.appStorage.get('companyCurrencyValue').then((val) => {
      this.currency = val
    });

    this.createJournalVoucherSearch();
  }

  createJournalVoucherSearch() {
    this.accountsService
      .getReversingJournalVoucherSearch(this.accountsOptions)
      .subscribe((success: any) => {
        this.searchParams = success;
        this.searchParams.regionValue = 'REGI1'
        this.searchParams.pageNumber = this.pagination.pageNumber;
        this.searchParams.pageSize = this.pagination.pageSize;
        this.searchReversingJournalVouchers();
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

  searchReversingJournalVouchers() {
    this.accountsService
      .searchReversingJournalVouchers(this.searchParams, this.accountsOptions)
      .subscribe((success: any) => {
        this.tableData = success.ilstentActReversingJournalsearchResultset
        this.pagination = success;
      });
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.searchReversingJournalVouchers();
    this.data.successMessage("Data Searched Successfully");
    this.appSearch?.close()
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.iblnSortOrder = event.sortOrder;
  }

  pageChanged(event: any) {
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.iblnSortOrder = event.sortOrder;
    this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchReversingJournalVouchers();
  }

  async navigateToDetail(elem: any) {
    const obj = {
      data: elem.actReversejournalId,
      data1: 0,
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl(
      '/home/finance/reversing-journal/detail/' + urlJson
    );
  }

  clear() {
    this.createJournalVoucherSearch();
    this.data.successMessage('Data Cleared Successfully');
  }

  totalInprogressList() {
    this.searchParams = new entActReversingJournalsearch();
    this.searchParams.statusValue = 'INPRO';
    // this.searchParams.pageSize = this.searchParamsRAW.pageSize;
    this.searchParams.pageNumber = 0;
    // this.allRecordsEnable = true;
    this.searchReversingJournalVouchers();
  }

  totalApprovedList() {
    this.searchParams = new entActReversingJournalsearch();
    this.searchParams.statusValue = 'APROV';
    // this.searchParams.pageSize = this.searchParamsRAW.pageSize;
    this.searchParams.pageNumber = 0;
    // this.allRecordsEnable = true;
    this.searchReversingJournalVouchers();
  }

  allRecords() {
    this.searchParams = new entActReversingJournalsearch();
    this.searchParams.statusValue = '';
    // this.searchParams.pageSize = this.searchParamsRAW.pageSize;
    this.searchParams.pageNumber = 0;
    setTimeout(() => {
      // this.allRecordsEnable = false;
    }, 300);
    this.searchReversingJournalVouchers();
  }
  statusSortSearch(val: any) {
    this.searchParams.statusValue = val;
    this.searchReversingJournalVouchers()
  }

  async navigateJournalVocNo(id: any) {
    let obj = {
      data: id,
    };
    console.log(obj);

    let encodeId = await this.urlService.encode(obj);
    this.router.navigateByUrl(
      '/home/finance/journal-voucher/detail/' + encodeId
    );
  }

  navigateToAccount() {
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
  navigateToList() {
    this.router.navigateByUrl('/home/finance/reversing-journal/search')

  }

}
