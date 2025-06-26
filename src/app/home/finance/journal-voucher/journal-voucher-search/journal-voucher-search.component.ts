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
import { CustomerFormComponent } from '../../../crm/customer/customer-form/customer-form.component';
import { entActJournalVoucherSearch, entActVoucherConfig } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';


@Component({
  selector: 'app-journal-voucher-search',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, CellHeaderDefDirective,
    IconButtonComponent, InnerScroll, InputControlComponent, AccoutsStatusTableComponent,
    SearchComponent, Row, FormsModule, AppAccessDirective, TableStatusSortComponent,
    ButtonAccessDirective, AppToolTipComponent, MatTooltipModule, AppDatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './journal-voucher-search.component.html',
  styleUrl: './journal-voucher-search.component.scss'
})
export class JournalVoucherSearchComponent {
  pageId = 'AJVSC'
  accountsOptions = {
    type: 'accountsPath',
  };

  voucherId = 0;
  voucherConfigId = 0;
  regionValue = 'REGI1';
  totalInprogressCount: any = '';
  totalApprovedCount: any = '';
  allRecordsEnable = false;

  regionValueDDL: any = [];

  searchParams = new entActJournalVoucherSearch();
  voucherConfig = new entActVoucherConfig();

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  columns: any = ["actJournalvoucharNo", "enteredDate", "approvedDate", "docDate", "debitAmt", "creditAmt", "status", "action"];

  columnsName: any = ["Journal Document No", "Created Date", "Approved Date", "Document Date", "Currency Name", "Credit Amount", "Status", "Action"];

  sortColumnName: any[] = ["actJournalvoucharNo", "enteredDate", "approvedDate", "docDate", "debitAmt", "creditAmt", "status"];

  tableData: any = [];

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
  ) { }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getJournalVoucherInitialData', this.accountsOptions);

    await this.appStorage.get('companyCurrencyValue').then((val) => {
      this.currency = val
    });

    this.totalInprogressandApprovedCounts();
    this.createJournalVoucherSearch();
  }

  createJournalVoucherSearch() {
    this.accountsService
      .getJournalVoucherSearch(this.accountsOptions)
      .subscribe((success: any) => {
        this.searchParams = success;
        this.searchParams.regionValue = '';
        console.log(this.searchParams);
        this.searchParams.pageNumber = this.pagination.pageNumber;
        this.searchParams.pageSize = this.pagination.pageSize;
        this.searchJournalVoucher();
      });
  }

  searchJournalVoucher() {
    this.accountsService
      .searchJournalVoucher(this.searchParams, this.accountsOptions)
      .subscribe((success: any) => {
        this.pagination.pageNumber = success.pageNumber;
        this.pagination.pageSize = success.pageSize;
        this.pagination.totalCount = success.totalCount;
        this.tableData = success.ilstentActJournalVoucherSearchResultset;
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

  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.searchParams.pageNumber = 1;
    this.searchJournalVoucher();
    this.appSearch?.close()
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
  }

  pageChanged(event: any) {
    this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchJournalVoucher();
  }


  clearAllSearch() {
    this.createJournalVoucherSearch();
    this.data.successMessage("Data Cleared Successfully");
  }

  async openDetail(element: any) {
    const obj = {
      data: element.actJournalvoucharId,
      data1: 0,
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl(
      '/home/finance/journal-voucher/detail/' + urlJson
    );
  }

  async navigateDetail(l: any) {
    ;
    if (l.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: this.regionValue
        };
        let urlJson = await this.urlService.encode(obj);
        this.router.navigateByUrl(
          '/home/finance/journal-voucher/detail/' + urlJson
        );
      }
    }
    else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please Select Document Name');
    }
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
    this.searchParams = new entActJournalVoucherSearch();
    this.searchParams.statusValue = 'INPRO';
    this.searchParams.pageNumber = 0;
    this.allRecordsEnable = true;
    this.searchJournalVoucher();
  }

  totalApprovedList() {
    this.searchParams = new entActJournalVoucherSearch();
    this.searchParams.statusValue = 'APROV';
    this.searchParams.pageNumber = 0;
    this.allRecordsEnable = true;
    this.searchJournalVoucher();
  }

  allRecords() {
    this.searchParams = new entActJournalVoucherSearch();
    this.searchParams.statusValue = '';
    // this.searchParams.pageSize = this.searchParamsRAW.pageSize;
    this.searchParams.pageNumber = 0;
    setTimeout(() => {
      this.allRecordsEnable = false;
    }, 300);
    this.searchJournalVoucher();
  }

  statusSortSearch(val: any) {
    this.searchParams.statusValue = val;
    this.searchJournalVoucher()
  }

  navigateToAccount() {
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
}
