import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  InnerScroll,
  Row,
  ViewLabel,
} from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppCurrencyPipe } from '../../../../common/pipes/app-currency/app-currency.pipe';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { entPurchaseReport } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-soa-vendor',
  standalone: true,
  imports: [
    FormsModule,
    SearchComponent,
    IconButtonComponent,
    InnerScroll,
    Row,
    ViewLabel,
    AppCurrencyPipe,
    AppDatePipe,
    DatePipe,
    InputControlComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './soa-vendor.component.html',
  styleUrl: './soa-vendor.component.scss',
})
export class SoaVendorComponent {
  searchParams = new entPurchaseReport();
  id = 0;
  loadingTrue = false;
  exportbtn = false;
  vendorDetails: any = [];
  tableData: any = [];
  vendorData: any = [];
  initialLoad = true;
  currentDate = '';
  dateFormat = '';
  creditorsAmountSummary: any = [];
  options = {
    type: 'accountsPath',
  };

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  constructor(
    public appService: AppService,
    public data: DataService,
    public initialData: InitialDataService,
    public apiAccountService: AccountsApiService,
    public urlService: UrlService,
    public dialog: CoreService,
    public appSetting: AppSettingsService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.init();
  }
  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.urlService.decode(id);
    this.id = params.data.ACT_VENDOR_ID;
    this.searchParams.toDate = params.toDate;
    this.searchParams.currencyValue = params.currencyValue;
    this.vendorData = params.data;
    await this.data.checkToken();
    this.generateDetailStaementAccountVendorReport();
    this.currentDate = this.appService.getCurrentDate();
    this.dateFormat = this.appSetting.environment.serverDateFormat;
  }

  generateDetailStaementAccountVendorReport() {
    this.searchParams.vendorId = this.id;
    this.apiAccountService
      .generateDetailStaementAccountVendorReport(
        this.searchParams,
        this.options
      )
      .subscribe((success: any) => {
        this.searchParams = success;
        this.initialLoad = false;
        this.tableData = JSON.parse(success.reportResult);
        this.vendorDetails = this.tableData.Table1;
        if (this.tableData.Table?.length > 0) {
          this.exportbtn = true;
        }
      });
  }

  generateSOAVendorReportExcel() {
    this.searchParams.vendorId = this.id;
    this.searchParams.vendarName = this.vendorData.VENDOR_NAME;
    this.searchParams.vendorCurrency = this.vendorData.CURRENCY_NAME;
    this.searchParams.vendorCode = this.vendorData.VENDOR_CODE;
    this.searchParams.pentCreditorsAmountSummary.balanceDue =
      this.vendorData.Total_Bal_Amt.toFixed(2);
    this.searchParams.pentCreditorsAmountSummary.totalDueOn30Days =
      this.vendorData.DaysDue0to30.toFixed(2);
    this.searchParams.pentCreditorsAmountSummary.totalDueOn60Days =
      this.vendorData.DaysDue31to60.toFixed(2);
    this.searchParams.pentCreditorsAmountSummary.totalDueOn90Days =
      this.vendorData.DaysDue61to90.toFixed(2);
    this.searchParams.pentCreditorsAmountSummary.totalDueAbove90Days =
      this.vendorData.DaysDue90.toFixed(2);
    this.loadingTrue = true;
    this.data
      .postPDFData(
        'Report/GenerateSOAVendorReportExcel',
        this.searchParams,
        this.options
      )
      .subscribe((success: any) => {
        // console.info(success);
        const resp = new Blob([success], { type: 'application/text' });
        const fileURL = URL.createObjectURL(resp);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = 'Statement Of Accounts - Vendor .xlsx';
        downloadLink.click();
      });
  }
}
