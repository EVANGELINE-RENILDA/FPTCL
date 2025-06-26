import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { entSalesReport } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';

@Component({
  selector: 'app-debtors-summary-search',
  standalone: true,
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, TableStatusSortComponent, ViewLabel],
  templateUrl: './debtors-summary-search.component.html',
  styleUrl: './debtors-summary-search.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebtorsSummarySearchComponent {

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

  columns: any = ["CUSTOMER_REF_NO", "CUSTOMER_NAME", "CURRENCY_NAME", "Total_Bal_Amt", "DaysDue0to30", "DaysDue31to60", "DaysDue61to90", "DaysDue90", "action"];
  columnsName: any = ["Customer Code", "Customer Name", "Customer Currency", "Total Balance Due", "0 - 30 Days Due", "31 - 60 Days Due", "61 - 90 Days Due", "90 Days Due", "Action"];

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }


  debtorsSummary = new entSalesReport();
  debtorsSummaryRaw = new entSalesReport();
  currentDate = '';
  reportResult: any = [];
  amountSummary: any = [];

  constructor(public router: Router,
    public api: AccountsApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public urlService: UrlService
  ) {

  }


  ngOnInit(): void {
    this.init();
  }
  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getInitializeSalesDebtorsSummaryReport');
    if (this.initialData.DDLValues.DDLRegion.length > 0) {
      this.debtorsSummary.regionValue = this.initialData.DDLValues.DDLRegion[0].constant;
      this.generateDebtorsSummaryReport();
    }
    this.currentDate = this.appService.getCurrentDate();
  }

  generateDebtorsSummaryReport() {
    this.api.generateDebtorsSummaryReport(this.debtorsSummary).subscribe((success) => {
      debugger
      this.reportResult = JSON.parse(success.reportResult).Table;
      console.log(this.reportResult, 'test')
      this.amountSummary = JSON.parse(success.reportResult).Table1;
      if (this.reportResult !== '') {
        this.debtorsSummary = success;
      }
    });
  }


  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.data.successMessage('Search Executed Successfully');

    this.generateDebtorsSummaryReport();
    this.dialog.closeDialog();
  }

  clear() {
    this.debtorsSummary = JSON.parse(JSON.stringify(this.debtorsSummaryRaw));
    this.data.successMessage('Data Cleared Successfully');
    this.generateDebtorsSummaryReport();
  }

  async openDetail(customerId: any) {
    const obj = {
      data: customerId,
      data1: this.debtorsSummary.toDate,
      data2: this.debtorsSummary.currencyValue,
      regionValue: this.debtorsSummary.regionValue,
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/sales/Debtors-summary/detail/' + urlJson);
  }

  generateDebtorsSummaryReportExcel() {
    debugger
    const options = {
      responseType: 'blob'
    }

    this.api.generateDebtorsSummaryReportExcel(this.debtorsSummary, options).subscribe((success) => {

      const resp = new Blob([success.body], { type: success.body.type });
      const fileURL = URL.createObjectURL(resp);
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = 'Debtors Summary Report';
      downloadLink.click();
    })
  }
  navigateToSales(){
    this.router.navigateByUrl('/home/corporate/sales-menus')
  }

}
