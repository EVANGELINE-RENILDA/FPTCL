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
import { Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { entPurchaseReport } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { CoreService } from '../../../../app-core/service/core.service';

@Component({
  selector: 'app-statement-account-vendor-summary',
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
    InputControlComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './statement-account-vendor-summary.component.html',
  styleUrl: './statement-account-vendor-summary.component.scss',
})
export class StatementAccountVendorSummaryComponent {
  searchParams = new entPurchaseReport();
  tableData: any = [];
  creditorsAmountSummary: any = [];
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
    public router: Router
  ) {}

  ngOnInit(): void {
    this.init();
  }
  async init() {
    await this.data.checkToken();
    this.getInitializePurchaseDetailStaementAccountVendorReport();
    this.generateCreditorsSummaryReport();
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

  generateCreditorsSummaryReport() {
    this.apiAccountService
      .generateCreditorsSummaryReport(this.searchParams, this.options)
      .subscribe((success: any) => {
        this.searchParams = success;
        this.tableData = JSON.parse(success.reportResult);
        this.creditorsAmountSummary = this.tableData.Table1;
      });
  }

  generateSummaryStatementAccountVendorReportExcel() {
    this.data
      .postPDFData(
        'Report/GenerateSummaryStatementAccountVendorReportExcel',
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
          'Statement Of Account Vendor Summary Report.xlsx';
        downloadLink.click();
      });
  }

  clearFilters() {
    this.searchParams.toDate = '';
    this.searchParams.currencyValue = '';
  }

  clearReport() {
    this.clearFilters();
  }

  async soaVendorDetail(tableData: any) {
    const obj = {
      data: tableData,
      data1: this.searchParams.currencyValue,
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl(
      '/home/purchase/report/statement-account-vendor-detail/' + urlJson
    );
  }

  async soaDetail(tableData: any) {
    const obj = {
      data: tableData,
      toDate: this.searchParams.toDate,
      currencyValue: this.searchParams.currencyValue,
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/purchase/report/soa-vender/' + urlJson);
  }
}
