import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AppService } from '../../../../../app.service';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { action } from '@circlon/angular-tree-component/lib/mobx-angular/mobx-proxy';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entPurchaseReport } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppCurrencyPipe } from "../../../../../common/pipes/app-currency/app-currency.pipe";
import { AppDatePipe } from "../../../../../common/pipes/app-date/app-date.pipe";
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-summary-of-account-search',
  standalone: true,
  imports: [IconButtonComponent, FormsModule, AppTableComponent, SearchComponent, TableStatusSortComponent, InputControlComponent, InnerScroll, Row, ViewLabel, AppCurrencyPipe, AppDatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './summary-of-account-search.component.html',
  styleUrl: './summary-of-account-search.component.scss'
})
export class SummaryOfAccountSearchComponent {
  __selectedItems: any;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  columns: any = ["slno", "vendCode", "vendName", "totalBalanceDue", "createdDate", "appDate", "postDate", "debit", "detail", "detail2"];
  columnsName: any = ["#", "Vendor Code", "Vendor Name", "Total Balance Due", "0 - 30 Days Due	", "31 - 60 Days Due	", "61 - 90 Days Due", "90 Days Due", "Open", "SOA"];

  tableData = [];
  currentDate ='';
  reportResult: any=[];
  creditorsAmountSummary: any = [];
  purchaseReport = new entPurchaseReport();
  exportbtn = false;
  errorTrue = false;
  @ViewChild('l') lform!:NgForm;

  constructor(public dialog: CoreService,
    public router: Router,
    public appService: AppService,
    public data: DataService,
    public initialData: InitialDataService,
    public api: AccountsApiService,
    public urlService: UrlService,) { }


  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }

  ngOnInit(): void {
    this.init();
  }
  async init() {
    await this.data.checkToken();
    this.initialData.getAcccountsDDL('getInitializePurchaseDetailStaementAccountVendorReport');
    this.currentDate = this.appService.getCurrentDate();
  }

  generateCreditorsSummaryReport() {
    this.api.generateCreditorsSummaryReport(this.purchaseReport).subscribe((success: any) => {
        this.purchaseReport = success;
        this.reportResult = JSON.parse(success.reportResult);
        this.creditorsAmountSummary = this.reportResult.Table1;
        this.dialog.closeDialog();
        if (this.reportResult.Table?.length > 0) {
          this.exportbtn = true;
        }
      });
  }

  async soaVendorDetail(tableData: any) {
    const obj = {
      data: tableData,
      data1: this.purchaseReport.currencyValue,
      regionValue: this.purchaseReport.regionValue
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl(
      '/home/purchase/report/summary-of-account/detail/' + urlJson
    );
  }

  async soaDetail(tableData: any) {
    const obj = {
      data: tableData,
      toDate: this.purchaseReport.toDate,
      currencyValue: this.purchaseReport.currencyValue,
      regionValue: this.purchaseReport.regionValue
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/purchase/report/summary-of-account/soa/' + urlJson);
  }

  generateCreditorsSummaryReportWithForm(){
    if(this.lform.valid){
      this.generateCreditorsSummaryReport();
    }else{
      this.errorTrue = true;
    }
  }

  clearFilters() {
    this.purchaseReport.toDate = '';
    this.purchaseReport.currencyValue = '';
    this.purchaseReport.regionValue = ''
    this.errorTrue = false;
  }

 navigateToPurchase(){
    this.router.navigateByUrl('/home/corporate/purchase-menus')
  }
  // navigateToDetail(){
  //   this.router.navigateByUrl('/home/purchase/report/summary-of-account/detail')
  // }

  // navigateToDetail2(){
  //   this.router.navigateByUrl('/home/purchase/report/summary-of-account/soa')
  // }

}
