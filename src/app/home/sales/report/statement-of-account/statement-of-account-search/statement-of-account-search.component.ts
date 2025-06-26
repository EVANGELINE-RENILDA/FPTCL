import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { CoreService } from '../../../../../app-core/service/core.service';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppService } from '../../../../../app.service';
import { entSalesReport } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { DataService } from '../../../../../common/services/data/data.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { FormsModule } from '@angular/forms';
import { AppCurrencyPipe } from '../../../../../common/pipes/app-currency/app-currency.pipe';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';

@Component({
  selector: 'app-statement-of-account-search',
  standalone: true,
  imports: [IconButtonComponent, AppTableComponent, SearchComponent, TableStatusSortComponent, InputControlComponent, InnerScroll, Row, ViewLabel, FormsModule, AppCurrencyPipe,
    AppDatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './statement-of-account-search.component.html',
  styleUrl: './statement-of-account-search.component.scss'
})
export class StatementOfAccountSearchComponent {
  searchParams = new entSalesReport();
  __selectedItems: any;
  currentDate: any; tableData = [];
  customerTableData: any = [];
  reportResult: any = [];
  debtorsSummary: any;
  reportResultAmount: any = [];
  options = {
    type: 'accountsPath',
  };

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  // columns: any = ["CUSTOMER_REF_NO", "CUSTOMER_NAME", "Total_Bal_Amt", "DaysDue0to30", "DaysDue31to60", "DaysDue61to90", "DaysDue90", "detail", "detail2"];
  // columnsName: any = ["Customer Code", "Customer Name", "Total Balance Due", "0 - 30 Days Due	", "31 - 60 Days Due	", "61 - 90 Days Due", "90 Days Due", "Open", "SOA"];



  constructor(
    public appService: AppService,
    public data: DataService,
    public initialData: InitialDataService,
    public apiAccountService: AccountsApiService,
    public urlService: UrlService,
    public dialog: CoreService,
    public router: Router
  ) { }

  // ngOnInit(): void {
  //   this.init();
  // }
  // async init() {
  //   let id = this.route.snapshot.paramMap.get('id');
  //   let params: any = await this.urlService.decode(id);
  //   this.customerId = params.data;
  //   this.searchParams.toDate = params.data1;
  //   this.searchParams.toDate = params.toDate;
  //   this.searchParams.currencyValue = params.currencyValue;
  //   this.customerData = params.data;
  //   await this.data.checkToken();
  //   this.generateDetailStatementAccountCustomerReport();
  //   this.currentDate = this.appService.getCurrentDate();
  //   this.dateFormat = this.appSetting.environment.serverDateFormat;
  // }
  // generateDetailStatementAccountCustomerReport() {
  //   this.searchParams.customerId = this.customerId;
  //   this.apiAccountService
  //     .generateDetailsStatementAccountCustomerReport(
  //       this.searchParams,
  //       this.options
  //     )
  //     .subscribe((success: any) => {
  //       this.searchParams = success;
  //       this.initialLoad = false;
  //       this.tableData = JSON.parse(success.reportResult);
  //       this.customerDetails = this.tableData.Table1;
  //       if (this.tableData.Table?.length > 0) {
  //         this.exportbtn = true;
  //       }
  //     });
  // }
  // generateSOAVendorReportExcel() {
  //   this.searchParams.customerId = this.id;
  //   this.searchParams.customerName = this.customerData.CURRENCY_NAME;
  //   this.searchParams.customerCode = this.customerData.VENDOR_CODE;
  //   this.searchParams.pentCreditorsAmountSummary.balanceDue =
  //     this.customerData.Total_Bal_Amt.toFixed(2);
  //   this.searchParams.pentCreditorsAmountSummary.totalDueOn30Days =
  //     this.customerData.DaysDue0to30.toFixed(2);
  //   this.searchParams.pentCreditorsAmountSummary.totalDueOn60Days =
  //     this.customerData.DaysDue31to60.toFixed(2);
  //   this.searchParams.pentCreditorsAmountSummary.totalDueOn90Days =
  //     this.customerData.DaysDue61to90.toFixed(2);
  //   this.searchParams.pentCreditorsAmountSummary.totalDueAbove90Days =
  //     this.customerData.DaysDue90.toFixed(2);
  //   this.loadingTrue = true;
  //   this.data
  //     .postPDFData(
  //       'Report/GenerateSOAVendorReportExcel',
  //       this.searchParams,
  //       this.options
  //     )
  //     .subscribe((success: any) => {
  //       // console.info(success);
  //       const resp = new Blob([success], { type: 'application/text' });
  //       const fileURL = URL.createObjectURL(resp);
  //       const downloadLink = document.createElement('a');
  //       downloadLink.href = fileURL;
  //       downloadLink.download = 'Statement Of Accounts - Sales.xlsx';
  //       downloadLink.click();
  //     });
  // }



  // tableData: any = [
  //   {
  //     'slno': '1',
  //     'customerCode': 'CUST2400002',
  //     'customerName': 'Rajesh DR',
  //     'totalBalanceDue': '12.00',
  //     'createdDate': '0.00',
  //     'appDate': '0.00',
  //     'postDate': '12.00',
  //     'debit': '0.00',

  //   }];

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.data.checkToken();
    this.getInitializeSalesDebtorsSummaryReport();
    this.generateDebtorsSummaryReport();
    this.currentDate = this.appService.getCurrentDate();
  }

  getInitializeSalesDebtorsSummaryReport() {
    this.apiAccountService
      .getInitializeSalesDebtorsSummaryReport(this.options)
      .subscribe((success: any) => {
        success.data.forEach((element: any) => {
          this.initialData.DDLValues[element.key] = element.value;
        });
      });
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.getInitializeSalesDebtorsSummaryReport();
    this.dialog.closeDialog();
  }

  generateDebtorsSummaryReport() {
    this.apiAccountService.generateDebtorsSummaryReport(this.searchParams).subscribe((success: any) => {
      // debugger
      this.customerTableData = JSON.parse(success.reportResult).Table;
      console.log(this.customerTableData, 'test')
      this.reportResultAmount = JSON.parse(success.reportResult).Table1;
      console.log(this.reportResultAmount, 'test')
      if (this.customerTableData !== '') {
        this.debtorsSummary = success;
      }
    });
  }

  generateDebtorsSummaryReportExcel() {
    if (!this.debtorsSummary) {
      this.data.errorMessage("No data available to export.");
      return;
    }

    const options = {
      responseType: 'blob'
    };

    this.apiAccountService.generateDebtorsSummaryReportExcel(this.debtorsSummary, options).subscribe((success) => {
      const resp = new Blob([success.body], { type: success.body.type });
      const fileURL = URL.createObjectURL(resp);
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = 'Statement of Account';
      downloadLink.click();
    });
  }

  async soaDetail(tableData: any) {
    console.log(tableData);
    const obj = {
      data: tableData,
      toDate: this.customerTableData.toDate,
      currencyValue: this.customerTableData.currencyValue
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/sales/statement-of-account/detail/' + urlJson);
  }

  async soaSOA(tableData: any) {
    const obj = {
      data: tableData,
      toDate: this.customerTableData.toDate,
      currencyValue: this.customerTableData.currencyValue,
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/sales/statement-of-account/soa/' + urlJson);
  }

  clearFilters() {
    this.searchParams.toDate = '';
    this.searchParams.currencyValue = '';
  }

  clearReport() {
    this.clearFilters();
    this.data.successMessage("Data Cleared Successfully");
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  navigateToDetail() {
    this.router.navigateByUrl('/home/sales/statement-of-account/detail/')
  }

  navigateToDetail2() {
    this.router.navigateByUrl('/home/sales/statement-of-account/soa')
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  navigateToSales() {
    this.router.navigateByUrl('/home/corporate/sales-menus')
  }
}
