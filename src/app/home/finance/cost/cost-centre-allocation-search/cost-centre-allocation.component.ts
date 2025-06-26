import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-cost-centre-allocation',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, CellHeaderDefDirective,
    IconButtonComponent, InnerScroll, InputControlComponent,
    SearchComponent, Row, FormsModule, AppAccessDirective,
    ButtonAccessDirective, AppToolTipComponent, MatTooltipModule, TableStatusSortComponent, AppDatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './cost-centre-allocation.component.html',
  styleUrl: './cost-centre-allocation.component.scss'
})
export class CostCentreAllocationComponent implements OnInit, AfterViewInit {
  pageId = 'RJVUH';
  accountsOptions = {
    type: 'accountsPath',
  };

  totalActiveCount: any = '';
  totalInActiveCount: any = '';

  searchParams = new entActReversingJournalsearch();
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  columns: any = ["slNo", "ledgerName", "status", "action"];


  columnsName: any = ["Sl.No", "Ledger Name", "Status", ""];

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
    totalCount: 0
  }
  errorTrue = false;

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
  async createNewTax(id: any) {
    const encode = await this.urlService.encode(id);
    this.router.navigateByUrl('/home/finance/cost-centre-allocation/detail/' + encode);
  }
  async openTaxDetail(id: any) {

    if (id > 0) {
      const encode = await this.urlService.encode(id);
      this.router.navigateByUrl('/home/finance/tax/detail/' + encode);
    }
    else {
      this.data.errorInfoMessage('Please select any one record to open');
    }
  }
  clear() {
    this.createJournalVoucherSearch();
    this.data.successMessage('Data Cleared Successfully');
  }
  statusSortSearch(val: any) {
    this.searchParams.statusValue = val;
    this.searchReversingJournalVouchers()
  }
  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.searchParams.pageNumber = 1;
    this.searchReversingJournalVouchers();
    this.appSearch?.close()
  }
  searchReversingJournalVouchers() {
    this.accountsService
      .searchReversingJournalVouchers(this.searchParams, this.accountsOptions)
      .subscribe((success: any) => {
        this.tableData = success.ilstentActReversingJournalsearchResultset
        this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      });
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
  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.iblnSortOrder = event.sortOrder;
    this.searchReversingJournalVouchers();
  }
}
