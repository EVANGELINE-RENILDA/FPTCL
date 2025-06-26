
import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from '../../../../../app.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { entActVendor, entPurchaseReport, entPurQuotation } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { FormsModule, NgForm } from '@angular/forms';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { InnerScroll, Row } from '../../../../../app-core/core-component/core-component.component';
import { DatePipe } from '@angular/common';
import { AppCurrencyPipe } from "../../../../../common/pipes/app-currency/app-currency.pipe";
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { VendorSearchComponent } from '../../../voucher/vendor/vendor-search/vendor-search.component';
import { SearchVendorComponent } from '../../../../search/search-vendor/search-vendor.component';

@Component({
  selector: 'app-creditors-detail-report-detail',
  standalone: true,
  imports: [
    SearchComponent,
    FormsModule,
    InnerScroll,
    Row,
    DatePipe,
    AppCurrencyPipe,
    InputControlComponent,
    IconButtonComponent,
    SearchVendorComponent,
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './creditors-detail-report-detail.component.html',
  styleUrl: './creditors-detail-report-detail.component.scss'
})
export class CreditorsDetailReportDetailComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  vendorId = 0;
  purchaseReport:any = new entPurchaseReport();
  purchaseReportRaw:any = new entPurchaseReport();
  purchaseQuotation = new entPurQuotation();
  vendor = new entActVendor();
  currentDate ='';
  dateFormat = '';
  id = 0;
  reportResultAmount: any = [];
  reportResult: any = [];
  vendorDetails: any = [];
  clearReports = false;
  vendorFlag = false;
  @ViewChild('l') lform!: NgForm;
  errorTrue = false

  constructor(
    public appService: AppService,
    public dialog: CoreService,
    public url : UrlService,
    public data : DataService,
    public api : AccountsApiService,
    public initialData : InitialDataService,
    public route : ActivatedRoute,
    public appSetting : AppSettingsService,
    public router : Router
  ){

  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.vendorId = params.data;
    this.purchaseReport.toDate = params.data1;
    this.purchaseReport.currencyValue = params.data2;
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getInitializePurchaseCreditorsSummaryReport');
    if (!!params.regionValue) {
      this.purchaseReport.regionValue = params.regionValue;
    }
    this.currentDate = this.appService.getCurrentDate();
    this.dateFormat = this.appSetting.environment.serverDateFormat;
    this.generateCreditorsDetailReport()
  }

  generateCreditorsDetailReport() {
    if (this.vendorId !== 0) {
      this.purchaseReport.vendorId = this.vendorId;
      this.purchaseReport.vendarName = '';
      this.api
        .generateCreditorsDetailReport(this.purchaseReport)
        .subscribe((success: any) => {
          if (success.reportResult.length > 0) {
            this.purchaseReport = success;
            this.reportResult = JSON.parse(success.reportResult).Table;
            this.reportResultAmount = JSON.parse(success.reportResult).Table1;
            this.vendorDetails = JSON.parse(success.reportResult).Table2;
            this.purchaseReport.vendarName = this.vendorDetails[0].VENDOR_NAME;
            this.purchaseReport.vendorId = this.vendorDetails[0].ACT_VENDOR_ID;
          }
          this.clearReports = false;
        });
    } else {
      this.purchaseReport.vendorId = 0;
      this.generateReportwithoutVendorId();
    }
  }

  generateReportwithoutVendorId() {
    if (this.purchaseReport.vendorId !== 0 ?this.lform.valid: true) {
      this.purchaseReport.vendorId = 0;
      this.api
        .generateCreditorsDetailReport(this.purchaseReport)
        .subscribe((success: any) => {
          this.purchaseReport = success;
          this.purchaseReport.vendarName = 'All';
          this.reportResult = JSON.parse(success.reportResult).Table;
          this.reportResultAmount = JSON.parse(success.reportResult).Table1;
          this.dialog.closeDialog()
        });
    } else {
      this.errorTrue = true;
    }
  }

  clearReport() {
    this.purchaseReport = JSON.parse(JSON.stringify(this.purchaseReportRaw));
    this.generateReportwithoutVendorId();
    this.purchaseReport.vendorId = 0;
    this.errorTrue = false;
    this.clearReports = true;
  }

  doVenorSelect(event: any) {
    this.vendorId = event.actVendorId;
    this.purchaseReport.vendarName = event.vendorName;
    // this.vendorFlag = true;
    this.getVendorAllDetails(event);
    this.clearReports = false;
  }

  screenDisabled() {
    let screenDisabled = false;
    //   if (this.purchaseQuotation.statusValue === 'APROV' || this.purchaseQuotation.statusValue === 'CANCL' || this.purchaseQuotation.statusValue === 'PENAP') {
    //     screenDisabled = true;
    //   }
    //   else {
    //     screenDisabled = false;
    //   }
    return screenDisabled;
    // }
  }

  getVendorAllDetails(val: any) {
    this.vendor.actVendorId = val.actVendorId;
    this.vendor.vendorName = val.vendorName;
    let obj = {
      data: val.actVendorId,
    };
    this.api
      .getVendorForSearch(obj)
      .subscribe((success) => {
        this.purchaseQuotation.ientActVendor = success;
        this.purchaseQuotation.actVendorId = success.actVendorId;
        this.initialData.DDLValues.DDLAddress =
          success.lstAddress;
      });
    this.vendorFlag = false;
  }

  generateCreditorsDetailReportWithForm() {
    if (this.lform.valid) {
      this.generateCreditorsDetailReport();
    } else {
      this.errorTrue = true;
    }
  }

  async purchaseInvoiceDetail(tableData: any) {
    const obj = {
      data: tableData.PUR_PURCHASE_INVOICE_ID,
      data1: 0,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl('/home/purchase/invoice-list/detail/' + urlJson);
  }

  generateCreditorsDetailReportAsExcel() {
    if (this.vendorId !== 0) {
      this.purchaseReport.vendorId = this.vendorId;
      this.purchaseReport.vendorId = this.vendorId;
    } else {
      this.purchaseReport.vendorId = this.id;
    }
    debugger
    const options = {
      responseType: 'blob'
    }

    this.api.getCreditorsDetailsReportAsExcel(this.purchaseReport, options).subscribe((success) => {
      const resp = new Blob([success.body], { type: success.body.type });
      const fileURL = URL.createObjectURL(resp);
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = 'Creditors Detail Report.xlsx';
      downloadLink.click();
    })
  }

  generateCreditorsDetailReportAsExcelWithoutVendorId() {
    this.purchaseReport.vendorId = 0;
    debugger
    const options = {
      responseType: 'blob'
    }

    this.api.getCreditorsDetailsReportAsExcel(this.purchaseReport, options).subscribe((success) => {

      const resp = new Blob([success.body], { type: success.body.type });
      const fileURL = URL.createObjectURL(resp);
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = 'Creditors Detail Report.xlsx';
      downloadLink.click();
    })

  }
  navigateToPurchase(){
    this.router.navigateByUrl('/home/corporate/purchase-menus')
  }
  navigateToList(){
    this.router.navigateByUrl('/home/purchase/report/creditors-detail-report/search')
  }
  }


