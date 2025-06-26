import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Row, InnerScroll, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { CoreService } from '../../../../../app-core/service/core.service';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppService } from '../../../../../app.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { entSalesReport, entSalSalesQuotation } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { entCustomer } from '../../../../../common/api-services/application-api/application-api.classes';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { AppCurrencyPipe } from '../../../../../common/pipes/app-currency/app-currency.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statement-of-account-detail',
  standalone: true,
  imports: [IconButtonComponent, AppTableComponent, SearchComponent, TableStatusSortComponent, InputControlComponent, Row, InnerScroll, AppCurrencyPipe, AppDatePipe, ViewLabel, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './statement-of-account-detail.component.html',
  styleUrl: './statement-of-account-detail.component.scss'
})
export class StatementOfAccountDetailComponent {
  __selectedItems: any;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  // columns: any = ["slno", "docNo", "docDate", "VoucName", "custName", "custRefNo", "shippingAddress", "invoiceVal", "balDue", "0-30DaysDue", "31-60DaysDue", "61-90DaysDue", "90DaysDue"];
  // columnsName: any = ["#", "Doc Number", "Doc Date", "Voucher Name", "Customer Name", "Customer Ref Number", "Shipping Address", "Invoice Value", "Balance Due", "0 - 30 Days Due", "31 - 60 Days Due", "61 - 90 Days Due", "90 Days Due"];

  searchParams = new entSalesReport();
  salesQuotation = new entSalSalesQuotation();
  customer = new entCustomer();
  reportResultAmount: any = [];
  reportResult: any = [];
  tableData: any = [];
  tableDataAmount: any = [];
  regionValueBtn = false;
  customerId = 0;
  dateFormat: any = '';
  currentDate: any;
  id = 0;
  options = {
    type: 'accountsPath',
  };

  constructor(
    public appService: AppService,
    public data: DataService,
    public initialData: InitialDataService,
    public apiAccountService: AccountsApiService,
    public urlService: UrlService,
    public dialog: CoreService,
    public router: Router,
    public route: ActivatedRoute,
    public appSetting: AppSettingsService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.urlService.decode(id);
    this.id = params.data.ACT_CUSTOMER_ID;
    this.searchParams.customerName = params.data.CUSTOMER_NAME;
    this.searchParams.currencyValue = params.data1;
    this.searchParams.regionValue = params.regionValue;
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getInitializeSalesDebtorsSummaryReport');
    if (!!params.regionValue) {
      this.regionValueBtn = true;
    } else {
      if (this.initialData.DDLValues.DDLRegion.length > 0) {
        this.searchParams.regionValue = this.initialData.DDLValues.DDLRegion[0].constant;
      }
    }
    this.generateDebtorsDetailReport();
    this.dateFormat = this.appSetting.environment.serverDateFormatWithTime;
    this.currentDate = this.appService.getCurrentDate();
  }

  generateDebtorsDetailReport() {
    if (this.customerId !== 0) {
      this.searchParams.customerId = this.customerId;
    } else {
      this.searchParams.customerId = this.id;
    }
    this.generateDebtorsDetailReports();
  }

  generateDebtorsDetailReports() {
    if (this.searchParams.customerId !== 0) {
      this.apiAccountService.generateDebtorsDetailReport(this.searchParams).subscribe((success: any) => {
        this.searchParams = success;
        this.reportResult = JSON.parse(success.reportResult);
        console.log(this.reportResult);

        this.reportResultAmount = this.reportResult.Table1;
        this.dialog.closeDialog()
        if (this.reportResult.Table?.length > 0) {
          // this.exportbtn = true;
        }
      });
    }
  }

  onSearch() { }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  navigateToSales() {
    this.router.navigateByUrl('/home/corporate/sales-menus')
  }
  navigateToList() {
    this.router.navigateByUrl('/home/sales/statement-of-account/search')
  }
}

