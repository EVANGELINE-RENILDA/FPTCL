import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AppService } from '../../../../../app.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { entPurchaseReport } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppDatePipe } from "../../../../../common/pipes/app-date/app-date.pipe";
import { AppCurrencyPipe } from "../../../../../common/pipes/app-currency/app-currency.pipe";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-summary-of-account-soa',
  standalone: true,
  imports: [IconButtonComponent, AppTableComponent, SearchComponent, TableStatusSortComponent,DatePipe,
     InputControlComponent, InnerScroll, Row, CellDefDirective, CellHeaderDefDirective, ViewLabel, AppDatePipe, AppCurrencyPipe],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './summary-of-account-soa.component.html',
  styleUrl: './summary-of-account-soa.component.scss'
})
export class SummaryOfAccountSoaComponent {
  __selectedItems: any;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  id = 0;
  purchaseReport = new entPurchaseReport();
  vendorData: any = [];
  currentDate = '';
  dateFormat = '';
  reportResult: any =[];
  vendorDetails:any = [];
  exportbtn = false;
  errorTrue = false;

  constructor(public dialog: CoreService,
    public router: Router,
    public appService: AppService,
    public data: DataService,
    public initialData: InitialDataService,
    public api: AccountsApiService,
    public route: ActivatedRoute,
    public url: UrlService,
    public appSetting: AppSettingsService) { }



  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params.data.ACT_VENDOR_ID;
    this.purchaseReport.toDate = params.toDate;
    this.purchaseReport.currencyValue = params.currencyValue;
    this.purchaseReport.regionValue = params.regionValue;
    this.vendorData = params.data;
    await this.data.checkToken();
    this.generateDetailStaementAccountVendorReport();
    this.currentDate = this.appService.getCurrentDate();
    this.dateFormat = this.appSetting.environment.serverDateFormat;
  }

  generateDetailStaementAccountVendorReport() {
    this.purchaseReport.vendorId = this.id;
    this.api.generateDetailStaementAccountVendorReport(this.purchaseReport)
      .subscribe((success: any) => {
        this.purchaseReport = success;
        this.reportResult = JSON.parse(success.reportResult);
        this.vendorDetails = this.reportResult.Table1
        if (this.reportResult.Table?.length > 0) {
          this.exportbtn = true;
        }
      });
  }
}
