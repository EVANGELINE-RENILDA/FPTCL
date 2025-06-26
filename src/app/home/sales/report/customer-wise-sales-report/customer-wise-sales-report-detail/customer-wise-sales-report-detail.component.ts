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
import { entSalesReport, entSalSalesQuotation } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';

@Component({
  selector: 'app-customer-wise-sales-report-detail',
  standalone: true,
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, TableStatusSortComponent, ViewLabel],
  templateUrl: './customer-wise-sales-report-detail.component.html',
  styleUrl: './customer-wise-sales-report-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerWiseSalesReportDetailComponent {


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


  columns: any = ["DOCUMENT_DATE", "VOUCHER_REF_NO", "VOUCHER_NAME", "QUANTITY", "TOTAL_VALUE", "SHIPPING_ADDRESS"];
  columnsName: any = ["Doc Date", "Doc #", "Voucher Name", "QTY", "Value", 'Shipping Address'];

  customerWiseSummaryData: any = [];
  salesReport = new entSalesReport();
  salesReportRAW = new entSalesReport();
  salesQuotation = new entSalSalesQuotation();
  customerId = 0;
  salesSummaryData: any = [];
  currentDate = '';
  format: any = '';
  reportResult: any = [];
  reportResultAmount: any = [];

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
    public urlService: UrlService,
    public appSettings: AppSettingsService
  ) {

  }

  ngOnInit(): void {
    this.init();
  }
  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.urlService.decode(id);
    this.customerWiseSummaryData = params;
    this.salesReport.customerName = this.customerWiseSummaryData.salesSummaryData.customerName;
    this.salesReport.itemname = this.customerWiseSummaryData.data.ITEM_NAME;
    this.salesReport.itemId = this.customerWiseSummaryData.data.INV_ITEM_ID;
    this.salesReport.customerId = this.customerWiseSummaryData.customerId;
    this.salesReport.unittype = this.customerWiseSummaryData.data.PURCHASE_UNIT_VALUE;
    this.customerId = this.customerWiseSummaryData.customerId;
    this.salesSummaryData = this.customerWiseSummaryData.salesSummaryData;
    this.salesReport.regionValue = params.regionValue;
    await this.data.checkToken();
    await this.initialData.DDLValues('getInitializeCustomerWisedSalesReport');
    this.salesReport.fromDate =
      this.customerWiseSummaryData.salesSummaryData.fromDate;
    this.salesReport.toDate =
      this.customerWiseSummaryData.salesSummaryData.toDate;
    this.salesReport.companyBranchId =
      this.customerWiseSummaryData.salesSummaryData.companyBranchId;
    this.salesReport.fiscalYearId =
      this.customerWiseSummaryData.salesSummaryData.fiscalYearId;
    await this.generateCustomerWisedSalesDetailsReport();
    this.currentDate = this.appService.getCurrentDate();
    this.format = this.appSettings.environment.serverDateFormat
  }



  generateCustomerWisedSalesDetailsReport() {
    this.api.generateCustomerWisedSalesDetailsReport(this.salesReport).subscribe((success: any) => {
      this.salesReport = success;
      this.salesReport.customerName = success.customerName;
      this.reportResult = JSON.parse(success.reportResult)
      this.reportResultAmount = this.reportResult.Table1;
    });
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }


  clear() {
    this.salesReport = JSON.parse(JSON.stringify(this.salesReportRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.generateCustomerWisedSalesDetailsReport();
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.data.successMessage('Search Executed Successfully');

    this.generateCustomerWisedSalesDetailsReport();
    this.dialog.closeDialog()
  }

  clearDate() {
    this.salesReport.fromDate = '';
    this.salesReport.toDate = '';
  }


}
