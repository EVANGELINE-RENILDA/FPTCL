import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  InnerScroll,
  ViewLabel,
} from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AppCurrencyPipe } from '../../../../../common/pipes/app-currency/app-currency.pipe';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { entActBankReconciliationSummary } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { Router } from '@angular/router';
import { AppService } from '../../../../../app.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { FormsModule } from '@angular/forms';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';

@Component({
  selector: 'app-bank-reconciliation-summary-search',
  standalone: true,
  imports: [
    FormsModule,
    SearchComponent,
    IconButtonComponent,
    InnerScroll,
    ViewLabel,
    AppCurrencyPipe,
    AppDatePipe,
    InputControlComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './bank-reconciliation-summary-search.component.html',
  styleUrl: './bank-reconciliation-summary-search.component.scss',
})
export class BankReconciliationSummarySearchComponent implements OnInit {
  searchParams = new entActBankReconciliationSummary();
  index: number = 1;
  initialLoad = true;
  options = {
    type: 'accountsPath',
  };

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  constructor(
    public appService: AppService,
    public data: DataService,
    public initialData: InitialDataService,
    public apiAccountService: AccountsApiService,
    public urlService: UrlService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.data.checkToken();
    this.generateBankReconciliationSummaryReport();
    await this.initialData.getAcccountsDDL('getInitializeDataOfBankReconciliationSummaryReport');
  }

  generateBankReconciliationSummaryReport() {
    this.apiAccountService
      .generateBankReconciliationSummaryReport(this.searchParams, this.options)
      .subscribe((success) => {
        this.searchParams = success;
        console.log(this.searchParams);

        this.initialLoad = false;
        this.searchParams.plstentActBankReconciliationSummary =
          success.plstentActBankReconciliationSummary;
      });
  }

  async openDetail(item: any) {
    this.searchParams = item;
    let urlJson = await this.urlService.encode(this.searchParams.bankLedgerId);
    this.router.navigateByUrl(
      '/home/finace/bank-reconciliation-detail/' + urlJson
    );
  }

  generateBankReconcilationSummaryReportExcel() {
    this.apiAccountService;
    this.data
      .postPDFData(
        'Report/GenerateBankReconcilationSummaryReportExcel',
        this.searchParams,
        this.options
      )
      .subscribe((success) => {
        const resp = new Blob([success], { type: 'application/text' });
        const fileURL = URL.createObjectURL(resp);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = 'Bank Reconciliation Summary Report.xlsx';
        downloadLink.click();
      });
  }
  navigateToAccount(){
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
}
