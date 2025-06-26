import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
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
import { Row, InnerScroll, AppToolTipComponent, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { entSaleReport } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { parse } from 'date-fns';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sales-register-search',
  standalone: true,
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, TableStatusSortComponent, ViewLabel],
  templateUrl: './sales-register-search.component.html',
  styleUrl: './sales-register-search.component.scss',
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesRegisterSearchComponent {


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

  reportResult: any;
  tableData: any = [];
  idList: any = [];

  columns: any = ["TransactionMonth", "Debit", "Credit", "ClosingBalance", "action"];
  columnsName: any = ["Month", "Debit Amount", "Credit Amount", "Closing Balance", "Action"];

  searchParams: any = new entSaleReport();
  searchParamsRAW = new entSaleReport();

  @ViewChild('l') lform!: NgForm;


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
    this.initialData.getAcccountsDDL('getInitializeSalesRegisterSummaryReport');
    this.generateSalesRegisterSummaryReportlist()
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  generateSalesRegisterSummaryReportlist() {
    this.api.generateSalesRegisterSummaryReport(this.searchParams)
      .subscribe((success: any) => {
        this.searchParams = success;
        this.reportResult = success.reportResult;
        if (this.reportResult !== '') {
          const reportResult = JSON.parse(success.reportResult);
          this.tableData = reportResult.Table
          this.searchParams.generatedDateTime = reportResult.Table[0].Start_Date;
        }

        this.dialog.closeDialog();
      });
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.data.successMessage('Search Executed Successfully');

    if (this.lform.valid) {
      this.generateSalesRegisterSummaryReportlist()
    } else {

    }
  }

  clear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.generateSalesRegisterSummaryReportlist();
  }

  // pageChanged(event: any) {
  //   this.searchParams.pageNumber = event.pageNumber;
  //   this.searchParams.pageSize = event.pageSize;
  //   this.generateSalesRegisterSummaryReportlist();
  // }

  async salesRegisterSummaryDetail(item: any) {
    this.dateTransfer(item);
    const obj = {
      data: this.searchParams,
      regionValue: this.searchParams.regionValue
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/sales/sales-register/detail/' + urlJson);
  }

  dateTransfer(item: any) {
    let monthDate = new Date(item.Start_Date).getMonth() + 1;
    let monthParentfrom = parse(this.searchParams.fromDate, this.appSettings.environment.serverDateFormat, new Date())
    let monthParent: any = monthParentfrom.getMonth() + 1;
    let monthEndDate = new Date(item.End_date).getMonth() + 1;
    let monthEndParenTo = parse(this.searchParams.toDate, this.appSettings.environment.serverDateFormat, new Date());
    let monthEndParent: any = monthEndParenTo.getMonth() + 1;
    if (monthDate !== monthParent) {
      let dateFrom: any = this.datepipe.transform(item.Start_Date, this.appSettings.environment.serverDateFormat);
      this.searchParams.fromDate = dateFrom;
    }
    if (monthEndDate !== monthEndParent) {
      let dateTo: any = this.datepipe.transform(item.End_date, this.appSettings.environment.serverDateFormat);
      this.searchParams.toDate = dateTo;
    }
  }
}
