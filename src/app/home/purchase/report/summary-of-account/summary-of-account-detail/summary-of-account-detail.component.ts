import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AppService } from '../../../../../app.service';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppDatePipe } from "../../../../../common/pipes/app-date/app-date.pipe";
import { FormsModule, NgForm } from '@angular/forms';
import { UrlService } from '../../../../../common/services/url/url.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entActVendor, entPurchaseReport, entPurQuotation } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { AppCurrencyPipe } from "../../../../../common/pipes/app-currency/app-currency.pipe";
import { DatePipe } from '@angular/common';
import { EmptyStateComponent } from '../../../../../app-core/template/empty-state';
import { SearchVendorComponent } from '../../../../search/search-vendor/search-vendor.component';

@Component({
  selector: 'app-summary-of-account-detail',
  standalone: true,
  imports: [IconButtonComponent, SearchComponent, InputControlComponent, Row, ViewLabel, AppDatePipe, AppCurrencyPipe,
    DatePipe,EmptyStateComponent,SearchVendorComponent,FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './summary-of-account-detail.component.html',
  styleUrl: './summary-of-account-detail.component.scss'
})
export class SummaryOfAccountDetailComponent {
  __selectedItems: any;
  currentDate= '';

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  reportResult: any = [];
  reportResultAmount: any = [];
  @ViewChild('l') lform!:NgForm;
  id = 0;
  purchaseQuotation = new entPurQuotation();
  purchaseReport = new entPurchaseReport();
  vendor = new entActVendor();
  regionValueBtn = false;
  dateFormat = '';
  vendorId = 0;
  exportbtn = false;
  errorTrue = false;
  vendorFlag = false;
  clearReports = false;


  constructor(public dialog: CoreService,
    public router: Router,
    public appService: AppService,
    public api: AccountsApiService,
    public route: ActivatedRoute,
    public urlService: UrlService,
    public data : DataService,
    public initialData : InitialDataService,
    public appSetting: AppSettingsService
  ){ }

    ngAfterViewInit(): void {
      this.appService.setBreadCrumb(this.breadCrumb);
    }

    ngOnInit(): void {
      this.init();
    }

    async init() {
      let id = this.route.snapshot.paramMap.get('id');
      let params: any = await this.urlService.decode(id);
      this.id = params.data.ACT_VENDOR_ID;
      this.purchaseReport.vendarName = params.data.VENDOR_NAME;
      this.purchaseReport.currencyValue = params.data1;
      this.purchaseReport.regionValue = params.regionValue;
      await this.data.checkToken();
      await this.initialData.getAcccountsDDL('getInitializePurchaseDetailStaementAccountVendorReport');
     if(!!params.regionValue){
      this.regionValueBtn = true;
    }else{
      if(this.initialData.DDLValues.DDLRegion.length > 0){
        this.purchaseReport.regionValue = this.initialData.DDLValues.DDLRegion[0].constant;
      }
    }
      this.generateCreditorsDetailReport();
      this.dateFormat = this.appSetting.environment.serverDateFormat;
      this.currentDate = this.appService.getCurrentDate();
    }

    generateCreditorsDetailReport() {
      if (this.vendorId !== 0) {
        this.purchaseReport.vendorId = this.vendorId;
      } else {
        this.purchaseReport.vendorId = this.id;
      }
      this.generateCreditorsDetailReports();
    }

    generateCreditorsDetailReports() {
      if (this.purchaseReport.vendorId !== 0) {
        this.api.generateCreditorsDetailReport(this.purchaseReport).subscribe((success: any) => {
            this.purchaseReport = success;
            this.reportResult = JSON.parse(success.reportResult);
            this.reportResultAmount = this.reportResult.Table1;
            this.dialog.closeDialog()
            if (this.reportResult.Table?.length > 0) {
              this.exportbtn = true;
            }
          });
      }
    }

    clearFilters() {
      this.purchaseReport.currencyValue = '';
      this.purchaseReport.fromDate = '';
      this.purchaseReport.toDate = '';
      this.errorTrue = false;
      this.purchaseReport.vendarName = '';
      // this.exportbtn = false;
    }

    clearReport() {
      this.clearFilters();
      this.generateReportwithoutVendorId();
    }

    generateReportwithoutVendorId() {
      if(this.lform.valid){
        this.api.generateCreditorsDetailReport(this.purchaseReport)
          .subscribe((success: any) => {
            this.purchaseReport = success;
            this.purchaseReport.vendarName = 'All';
            this.reportResult = JSON.parse(success.reportResult);
            this.reportResultAmount = this.reportResult.Table1;
            this.exportbtn = true;
          });
      }else{
        this.errorTrue = true;
      }
    }

    generateCreditorsDetailReportWithForm(){
      if(this.lform.valid){
        this.generateCreditorsDetailReport();
      }else{
        this.errorTrue = true;
      }
    }

    doVenorSelect(event: any) {
      this.vendorId = event.actVendorId;
      this.purchaseReport.vendarName = event.vendorName;
      this.getVendorAllDetails(event);
    }

    getVendorAllDetails(val: any) {
      this.vendor.actVendorId = val.actVendorId;
      this.vendor.vendorName = val.vendorName;
      let obj = {
        data: val.actVendorId,

      }
      this.api.getVendorForSearch(obj)
        .subscribe((success) => {
          this.purchaseQuotation.ientActVendor = success;
          this.purchaseQuotation.actVendorId = success.actVendorId;
        });
      this.vendorFlag = false;
    }

    screenDisabled() {
      let screenDisabled = false;
      return screenDisabled;
    }
    navigateToPurchase(){
      this.router.navigateByUrl('/home/corporate/purchase-menus')
    }
    navigateToList(){
      this.router.navigateByUrl('/home/purchase/report/summary-of-account/search')
    }
}
