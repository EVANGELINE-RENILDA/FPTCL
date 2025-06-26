import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { entADMBranchSearch } from '../../../../../common/api-services/admin-api/admin-api.classes';
import { entPurchaseReport } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../../../../app.service';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { FormsModule } from '@angular/forms';
import {
  InnerScroll,
  Row,
  ViewLabel,
} from '../../../../../app-core/core-component/core-component.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AppCurrencyPipe } from '../../../../../common/pipes/app-currency/app-currency.pipe';
import { DatePipe } from '@angular/common';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';

@Component({
  selector: 'app-vat-paid-summary-detail',
  standalone: true,
  imports: [
    AppTableComponent,
    FormsModule,
    SearchComponent,
    IconButtonComponent,
    InnerScroll,
    Row,
    ViewLabel,
    InputControlComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    AppCurrencyPipe,
    DatePipe,
    AppDatePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './vat-paid-summary-detail.component.html',
  styleUrl: './vat-paid-summary-detail.component.scss',
})
export class VatPaidSummaryDetailComponent implements OnInit {
  searchParams = new entPurchaseReport();
  currentDate = '';
  dateFormat: any = '';
  options = {
    type: 'accountsPath',
  };

  tableData: any = [];

  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  initialLoad: any;

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  constructor(
    public appService: AppService,
    public data: DataService,
    public initialData: InitialDataService,
    public accountService: AccountsApiService,
    public router: Router,
    public urlService: UrlService,
    public route: ActivatedRoute,
    public appSetting: AppSettingsService
  ) {}

  ngOnInit(): void {
    this.init();
  }
  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.urlService.decode(id);
    this.searchParams.fiscalYearId = params.fiscalYearId;
    this.searchParams.companyBranchId = params.companyId;
    this.searchParams.fromDate = params.fromDate;
    this.searchParams.toDate = params.toDate;

    await this.data.checkToken();
    await this.initialData.getAcccountsDDL(
      'getInitializeDataForVatPaidSummary',
      this.options
    );
    this.generateVatPaidDetailReport();
    this.currentDate = this.appService.getCurrentDate();
    this.dateFormat = this.appSetting.environment.serverDateFormat;
  }

  generateVatPaidDetailReport() {
    this.accountService
      .generateVatPaidDetailReport(this.searchParams, this.options)
      .subscribe((success) => {
        let tabledata = JSON.parse(success.reportResult);
        if (success.reportResult !== '') {
          console.log(success.reportResult);
          this.tableData = tabledata;
          this.searchParams = success;
        } else {
          this.data.errorMessage(success.errorMessage);
        }
      });
  }

  clearReport() {
    this.searchParams = JSON.parse(this.tableData);
    this.generateVatPaidDetailReport();
  }

  clearDate() {
    this.searchParams.fromDate = '';
    this.searchParams.toDate = '';
  }

  navigateTosummary() {
    this.router.navigateByUrl('home/purchase/report/vat-paid-summary/search');
  }
}
