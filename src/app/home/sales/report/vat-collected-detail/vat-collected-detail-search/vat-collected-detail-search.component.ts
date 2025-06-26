import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppToolTipComponent, InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AppService } from '../../../../../app.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { entSaleReport } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';

@Component({
  selector: 'app-vat-collected-detail-search',
  standalone: true,
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, TableStatusSortComponent, ViewLabel],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './vat-collected-detail-search.component.html',
  styleUrl: './vat-collected-detail-search.component.scss'
})
export class VatCollectedDetailSearchComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  reportResult: any;
  tableData: any = [];

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  columns: any = ["index", "TransactionMonth", "Debit", "Credit", "ClosingBalance", "tinno", "gross", "taxamt", "action"];
  columnsName: any = ["#", "Doc Date", "Doc No", "Customer Ref No", "Customer Name", "Customer TIN No", "Gross Amt", "Tax Amt", "Action"];
  searchParams: any = new entSaleReport();
  searchParamsRAW = new entSaleReport();
  constructor(public router: Router,
    public api: AccountsApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public urlService: UrlService,
    public appSettings: AppSettingsService,
    public datepipe: DatePipe
  ) {

  }
  ngOnInit(): void {
    this.init();
  }
  async init() {
    await this.data.checkToken();
    this.initialData.getAcccountsDDL('getInitializeDataForVatCollectedSummary');
    this.generateSalesVatCollectedReportlist();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.generateSalesVatCollectedReportlist();
  }
  generateSalesVatCollectedReportlist() {
    this.api.generateVatCollectedDetailReport(this.searchParams)
      .subscribe((success: any) => {
        this.searchParams = success;
        this.reportResult = success.reportResult;
        if (this.reportResult !== '') {
          const reportResult = JSON.parse(success.reportResult);
          console.log(reportResult, 'helo hi');

          this.tableData = reportResult.Table
          this.searchParams.generatedDateTime = reportResult.Table[0]?.Start_Date;
        }

        this.dialog.closeDialog();
      });
  }
  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems, 'hello');
  }
  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.data.successMessage('Search Executed Successfully');

    this.generateSalesVatCollectedReportlist();
  }
  clear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.generateSalesVatCollectedReportlist();
  }
}
