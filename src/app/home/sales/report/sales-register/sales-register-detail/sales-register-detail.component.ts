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
import { FormsModule } from '@angular/forms';
import { Row, InnerScroll, AppToolTipComponent, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { entSaleReport } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';

@Component({
  selector: 'app-sales-register-detail',
  standalone: true,
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, TableStatusSortComponent, ViewLabel],
  templateUrl: './sales-register-detail.component.html',
  styleUrl: './sales-register-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalesRegisterDetailComponent {


  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };

  id: any;
  regionDetailValue: any
  salesSummaryData: any = [];
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }

  tableData: any = [];
  reportResult: any = [];
  idList: any = [];
  currentDate: any = '';
  dateFormat: any = '';

  columns: any = ['', "date", "voucher", "customer", "Branch", "CUSTOMER_TIN_NUMBER", "GROSS_AMOUNT", "TAX_AMOUNT", "ROUND_OFF", "NET_AMOUNT"];
  columnsName: any = ['', "Date", "Voucher Type", "Customer Name", "Branch", "Customer TIN No", 'Gross Amt', 'Tax Amt', 'Round off', 'Net Amt'];

  saleReport = new entSaleReport();

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  constructor(public router: Router,
    public api: AccountsApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public url: UrlService,
    public appSetting: AppSettingsService
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.salesSummaryData = params;
    this.saleReport.regionValue = params.regionValue;
    if (this.salesSummaryData.id.companyBranchId !== 0) {
      this.saleReport.branchname = this.salesSummaryData.id.companyBranchId;
    }
    this.saleReport.fiscalYearId = this.salesSummaryData.id.fiscalYearId;
    this.saleReport.fromDate = this.salesSummaryData.id.fromDate;
    this.saleReport.toDate = this.salesSummaryData.id.toDate;
    await this.data.checkToken();
    this.initialData.getAcccountsDDL('getInitializeSalesRegisterDetailReport')
    this.generateSalesRegisterDetailReport();
    this.currentDate = this.appService.getCurrentDate();
    this.dateFormat = this.appSetting.environment.serverDateFormat
  }


  generateSalesRegisterDetailReport() {
    // if (l.valid) {

    this.api.generateSalesRegisterDetailReport(this.saleReport)
      .subscribe((success: any) => {
        this.saleReport = success;
        this.reportResult = success.reportResult;
        if (this.reportResult !== '') {
          const reportResult = JSON.parse(success.reportResult);
          console.log(reportResult, 'test')
          this.tableData = reportResult.Table
          this.saleReport.generatedDateTime = reportResult.Table[0]?.Start_Date;
        }

        this.dialog.closeDialog();
      });
  }



  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  pageChanged(event: any) {

  }
}
