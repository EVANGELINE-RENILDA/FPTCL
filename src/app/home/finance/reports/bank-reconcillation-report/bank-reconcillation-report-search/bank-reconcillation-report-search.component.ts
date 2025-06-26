import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, InnerScroll, AppToolTipComponent, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AppService } from '../../../../../app.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { entActBankReconciliationSummary } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppCurrencyPipe } from "../../../../../common/pipes/app-currency/app-currency.pipe";

@Component({
  selector: 'app-bank-reconcillation-report-search',
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, TableStatusSortComponent, ViewLabel, AppCurrencyPipe],
  standalone: true,
  templateUrl: './bank-reconcillation-report-search.component.html',
  styleUrl: './bank-reconcillation-report-search.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class BankReconcillationReportSearchComponent {

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  bankReconciliationReport = new entActBankReconciliationSummary();
  bankReconciliationReportRaw = new entActBankReconciliationSummary();
  @ViewChild('l') lform!: NgForm;
  bankReconciliationReportResult: any = [];
  errorTrue = false

  dateFormat = ''

  constructor(public router: Router,
    public api: AccountsApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public urlService: UrlService,
    public appSettings : AppSettingsService,
  ) {

  }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  async init(){
    await this.data.checkToken();
    this.initialData.getAcccountsDDL('getInitializeDataOfBankReconciliationSummaryReport');
    if(this.initialData.DDLValues.DDLRegion.length > 0){
      this.bankReconciliationReport.regionValue = this.initialData.DDLValues.DDLRegion[0].constant;
    }
    this.dateFormat = this.appSettings.environment.serverDateFormat;
  }

  getBankReconciliationReport() {
    debugger
    if (this.lform.valid) {
      this.api.getBankReconciliationReport(this.bankReconciliationReport).subscribe((success) => {
          this.bankReconciliationReportResult = JSON.parse(success.data);
          console.log(this.bankReconciliationReportResult);
        });
    } else{
      this.errorTrue = true;
    }
  }
  clearReport() {
    window.location.reload();
  }
}
