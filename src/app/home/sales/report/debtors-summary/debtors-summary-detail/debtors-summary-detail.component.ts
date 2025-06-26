import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, InnerScroll, AppToolTipComponent, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
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
import { entSalesReport, entSalSalesQuotation } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { SearchCustomerComponent } from '../../../../search/search-customer/search-customer.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-debtors-summary-detail',
  standalone: true,
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, DatePipe, AppDatePipe, CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, TableStatusSortComponent, ViewLabel, SearchCustomerComponent],
  templateUrl: './debtors-summary-detail.component.html',
  styleUrl: './debtors-summary-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebtorsSummaryDetailComponent {

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

  columns: any = ["", "Doc", "VOUCHER_NAME", "name", "Actual_Amount", "BalanceAmount", "DaysDue0to30", "DaysDue31to60", "DaysDue61to90", "DaysDue90", "action"];
  columnsName: any = ["", "Customer Code", "Voucher Name", "Customer Name", "Invoice Value", "Balance Due", "0 - 30 Days Due", "31 - 60 Days Due", "61 - 90 Days Due", "90 Days Due", "Action"];

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  customerId: any = 0;
  currentDate: any = 0;
  debtorsDetails = new entSalesReport();
  debtorsDetailsRaw = new entSalesReport();
  salesQuotation = new entSalSalesQuotation();
  dateFormat = '';
  reportResult: any = [];
  totalAmount: any = [];
  customerdata: any = [];
  @ViewChild('l') lform!: NgForm;
  clearReports: boolean = false;
  errorTrue = false

  constructor(public router: Router,
    public api: AccountsApiService,
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
  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.urlService.decode(id);
    this.customerId = params.data;
    this.debtorsDetails.toDate = params.data1;
    this.debtorsDetails.currencyValue = params.data2;
    this.debtorsDetails.regionValue = params.regionValue;
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getInitializeSalesDebtorsSummaryReport');
    if (!!params.regionValue) {
    } else {
      if (this.initialData.DDLValues.DDLRegion.length > 0) {
        this.debtorsDetails.regionValue = this.initialData.DDLValues.DDLRegion[0].constant;
      }
    }
    await this.generateDebtorsDetailReport();
    this.currentDate = this.appService.getCurrentDate();
    this.dateFormat = this.appSetting.environment.serverDateFormat;
  }

  async generateDebtorsDetailReport() {
    debugger
    if (this.customerId !== 0) {
      this.debtorsDetails.customerId = this.customerId;
      this.api
        .generateDebtorsDetailReport(this.debtorsDetails)
        .subscribe((success) => {
          if (success.reportResult.length > 0) {
            this.tableData = JSON.parse(success.reportResult).Table;
            console.log(this.tableData, 'tabelData')
            this.totalAmount = JSON.parse(success.reportResult).Table1;
            this.customerdata = JSON.parse(success.reportResult).Table2;
            this.customerId = this.customerdata[0].ACT_CUSTOMER_ID;
            this.debtorsDetails.customerName = this.customerdata[0].CUSTOMER_NAME;
          } else {
            this.clearReports = false;
          }
        });
    } else {
      this.generateReportwithoutcustomerId();
    }
  }

  generateReportwithoutcustomerId() {
    debugger
    if (this.debtorsDetails.customerId !== 0 ? this.lform.valid : true) {
      this.api
        .generateDebtorsDetailReport(this.debtorsDetails)
        .subscribe((success: any) => {
          this.debtorsDetails = success;
          this.debtorsDetails.customerName = 'All';
          this.tableData = JSON.parse(success.reportResult).Table;
          console.log(this.tableData, 'CheckTable')
          this.totalAmount = JSON.parse(success.reportResult).Table1;
        });
    } else {
      this.errorTrue = true;
    }
  }

  doCustomerSelect(event: any) {
    this.debtorsDetails.customerId = event.actCustomerId;
    this.debtorsDetails.customerName = event.customerName;
    this.salesQuotation.ientActCustomerDetails.customerName =
      event.customerName;
    this.openCustomer(this.debtorsDetails.customerId);
    this.clearReports = false;
  }

  openCustomer(val: any) {
    const obj = {
      data: val,
      // data1: this.regionDetailValue
    };
    this.api
      .getCustomerDetailsForSearch(obj).subscribe((success: any) => {
        this.salesQuotation.ientActCustomerDetails = success;
        this.salesQuotation.actCustomerId = success.actCustomerId;
      });
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.data.successMessage('Search Executed Successfully');

    this.generateDebtorsDetailReport();
    this.dialog.closeDialog();
  }

  clear() {
    this.debtorsDetails = JSON.parse(JSON.stringify(this.debtorsDetailsRaw));
    this.data.successMessage('Data Cleared Successfully');
    this.generateDebtorsDetailReport();
    this.clearReports = true;
  }

  getDebtorsDetailsReportAsExcel() {
    const options = {
      responseType: 'blob'
    }

    this.api.getDebtorsDetailsReportAsExcel(this.debtorsDetails, options).subscribe((success) => {

      const resp = new Blob([success.body], { type: success.body.type });
      const fileURL = URL.createObjectURL(resp);
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = 'Debtors Detail Report.xlsx';
      downloadLink.click();
    })
  }

  getDebtorsDetailsReportAsExcelWithoutcustomerId() {
    this.debtorsDetails.customerId = 0;
    debugger

    const options = {
      responseType: 'blob'
    }

    this.api.getDebtorsDetailsReportAsExcel(this.debtorsDetails, options).subscribe((success) => {

      const resp = new Blob([success.body], { type: success.body.type });
      const fileURL = URL.createObjectURL(resp);
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = 'Debtors Detail Report.xlsx';
      downloadLink.click();
    })
  }
  navigateToSales(){
    this.router.navigateByUrl('/home/corporate/sales-menus')
  }
  navigateToList(){
    this.router.navigateByUrl('/home/sales/Debtors-summary/search')
  }
}
