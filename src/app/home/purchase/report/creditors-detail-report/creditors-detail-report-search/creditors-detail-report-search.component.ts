import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AppService } from '../../../../../app.service';
import { entPurchaseReport } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppCurrencyPipe } from '../../../../../common/pipes/app-currency/app-currency.pipe';

@Component({
  selector: 'app-creditors-detail-report-search',
  standalone: true,
  imports: [
    IconButtonComponent,
    AppTableComponent,
    SearchComponent,
    TableStatusSortComponent,
    InputControlComponent,
    InnerScroll,
    Row,
    CellDefDirective,
    CellHeaderDefDirective,
    ViewLabel,
    AppCurrencyPipe,
    FormsModule
],
schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './creditors-detail-report-search.component.html',
  styleUrl: './creditors-detail-report-search.component.scss'
})
export class CreditorsDetailReportSearchComponent {

  __selectedItems: any;
  currentDate = '';
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  reportResult: any = [];
  amountSummary: any = [];
  purchaseReport = new entPurchaseReport();
  @ViewChild('l') lform!: NgForm;
  errorTrue = false;

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  constructor(
    public dialog: CoreService,
    public router: Router,
    public appService: AppService,
    public url : UrlService,
    public data : DataService,
    public api : AccountsApiService,
    public initialData : InitialDataService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.data.checkToken();
    this.initialData.getAcccountsDDL('getInitializePurchaseCreditorsSummaryReport');
    if (
      this.initialData.DDLValues.DDLRegion.length > 0
    ) {
      this.purchaseReport.regionValue =
        this.initialData.DDLValues.DDLRegion[0].constant;
      this.generateCreditorsSummaryReportlist(false);
    }
    this.currentDate = this.appService.getCurrentDate();
  }

  generateCreditorsSummaryReportlist(val: any) {
    if (val ? this.lform.valid : true) {
      this.api.generateCreditorsSummaryReport(this.purchaseReport)
        .subscribe((success: any) => {
          if (success.reportResult.length > 0) {
            this.reportResult = JSON.parse(success.reportResult).Table;
            this.amountSummary = JSON.parse(success.reportResult).Table1;
            this.purchaseReport = success;
            this.dialog.closeDialog()
          }
        });
    } else {
      this.errorTrue = true;
    }
  }

  generateCreditorsSummaryReportAsExcel() {
    debugger
    const options = {
      responseType: 'blob'
    }

    this.api.generateDebtorsSummaryReportExcel(this.purchaseReport, options).subscribe((success) => {

      const resp = new Blob([success.body], { type: success.body.type });
      const fileURL = URL.createObjectURL(resp);
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = 'Creditors Summary Report.xlsx';
      downloadLink.click();
    })
  }



  async creditorDetail(vendorId: any) {
    const obj = {
      data: vendorId,
      data1: this.purchaseReport.toDate,
      data2: this.purchaseReport.currencyValue,
      regionValue: this.purchaseReport.regionValue,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl(
      '/home/purchase/report/creditors-detail-report/detail/' + urlJson
    );
  }

  clear(){
    this.errorTrue = false;
    this.purchaseReport.toDate = '';
    this.purchaseReport.currencyValue = '';
  }

  navigateToPurchase(){
    this.router.navigateByUrl('/home/corporate/purchase-menus')
  }


}
