import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  InnerScroll,
  Row,
  ViewLabel,
} from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { CoreService } from '../../../../app-core/service/core.service';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppService } from '../../../../app.service';
import {
  entActVendor,
  entPurchaseReport,
  entPurQuotation,
} from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { AppCurrencyPipe } from '../../../../common/pipes/app-currency/app-currency.pipe';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-statement-account-vendor-detail',
  standalone: true,
  imports: [
    FormsModule,
    SearchComponent,
    IconButtonComponent,
    InnerScroll,
    Row,
    DatePipe,
    ViewLabel,
    AppCurrencyPipe,
    AppDatePipe,
    InputControlComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './statement-account-vendor-detail.component.html',
  styleUrl: './statement-account-vendor-detail.component.scss',
})
export class StatementAccountVendorDetailComponent {
  searchParams = new entPurchaseReport();
  purchaseQuotation = new entPurQuotation();
  vendor = new entActVendor();
  creditorsAmountSummary: any = [];
  tableData: any = [];
  tableDataAmount: any = [];
  vendorId = 0;
  dateFormat = '';
  id = 0;
  options = {
    type: 'accountsPath',
  };

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  currentDate: any;

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
    public router: Router,
    public route: ActivatedRoute,
    public appSetting: AppSettingsService
  ) {}

  ngOnInit(): void {
    this.init();
  }
  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.urlService.decode(id);
    this.id = params.data.ACT_VENDOR_ID;
    this.searchParams.vendarName = params.data.VENDOR_NAME;
    this.searchParams.currencyValue = params.data1;
    await this.data.checkToken();
    this.getInitializePurchaseDetailStaementAccountVendorReport();
    this.generateCreditorsDetailReport();
    this.dateFormat = this.appSetting.environment.serverDateFormat;
    this.currentDate = this.appService.getCurrentDate();
  }

  getInitializePurchaseDetailStaementAccountVendorReport() {
    this.apiAccountService
      .getInitializePurchaseDetailStaementAccountVendorReport(this.options)
      .subscribe((success: any) => {
        success.data.forEach((element: any) => {
          this.initialData.DDLValues[element.key] = element.value;
        });
      });
  }

  generateCreditorsDetailReport() {
    if (this.vendorId !== 0) {
      this.searchParams.vendorId = this.vendorId;
    } else {
      this.searchParams.vendorId = this.id;
    }
    this.generateCreditorsDetailReports();
  }

  generateCreditorsDetailReports() {
    if (this.searchParams.vendorId !== 0) {
      this.apiAccountService
        .generateCreditorsDetailReport(this.searchParams, this.options)
        .subscribe((success: any) => {
          this.searchParams = success;
          this.tableData = JSON.parse(success.reportResult);
          this.tableDataAmount = this.tableData.Table1;
        });
    }
  }

  getDetailStatementAccountVendorReportAsExcel() {
    if (this.vendorId !== 0) {
      this.searchParams.vendorId = this.vendorId;
    } else {
      this.searchParams.vendorId = this.id;
    }
    this.data
      .postPDFData(
        'Report/GetCreditorsDetailsReportAsExcel',
        this.searchParams,
        this.options
      )
      .subscribe((success: any) => {
        console.info(success);
        const resp = new Blob([success], { type: 'application/text' });
        const fileURL = URL.createObjectURL(resp);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download =
          'Statement Of Account Vendor Report Detail.xlsx';
        downloadLink.click();
      });
  }

  doVendorSelect(event: any) {
    this.vendorId = event.actVendorId;
    this.searchParams.vendarName = event.vendorName;
    this.getVendorAllDetails(event);
  }

  getVendorAllDetails(val: any) {
    this.vendor.actVendorId = val.actVendorId;
    this.vendor.vendorName = val.vendorName;
    let obj = {
      data: val.actVendorId,
    };
    this.apiAccountService
      .getVendorForSearch(obj, this.options)
      .subscribe((success) => {
        this.purchaseQuotation.ientActVendor = success;
        this.purchaseQuotation.actVendorId = success.actVendorId;
      });
  }

  screenDisabled() {
    let screenDisabled = false;
    return screenDisabled;
  }

  generateReportwithoutVendorId() {
    this.apiAccountService
      .generateCreditorsDetailReport(this.searchParams, this.options)
      .subscribe((success: any) => {
        this.searchParams = success;
        this.searchParams.vendarName = 'All';
        this.searchParams = JSON.parse(success.reportResult);
        this.tableDataAmount = this.tableData.Table1;
      });
  }

  clearFilters() {
    this.searchParams.toDate = '';
    this.searchParams.currencyValue = '';
    this.searchParams.fromDate = '';
    this.searchParams.vendarName = '';
  }

  clearReport() {
    this.clearFilters();
    this.generateReportwithoutVendorId();
  }
}
