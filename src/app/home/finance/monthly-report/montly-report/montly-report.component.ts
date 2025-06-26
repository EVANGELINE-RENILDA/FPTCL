import { MatCheckboxModule } from '@angular/material/checkbox';
import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { AppCurrencyPipe } from "../../../../common/pipes/app-currency/app-currency.pipe";
import { entProfitAndLoss } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { NgTemplateOutlet } from '@angular/common';
import { ToggleclassDirective } from '../../../../app-core/directives/toggleclass/toggleclass.directive';
import { FormsModule, NgForm } from '@angular/forms';
import { ProfitandlossPipe } from '../../../../common/pipes/profitandloss/profitandloss.pipe';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { InnerScroll, Row } from '../../../../app-core/core-component/core-component.component';
import { CoreService } from '../../../../app-core/service/core.service';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';

@Component({
  selector: 'app-montly-report',
  standalone: true,
  imports: [AppCurrencyPipe,NgTemplateOutlet,ProfitandlossPipe,ToggleclassDirective,FormsModule,SearchComponent,CheckboxComponent,IconButtonComponent,InnerScroll,Row,InputControlComponent,],
  templateUrl: './montly-report.component.html',
  styleUrl: './montly-report.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[ProfitandlossPipe]
})
export class MontlyReportComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  exportbtn: any = true;
  isToggle = false;
  isExcludeZero = '';
  fiscalYearId = 0;
  errorTrue = false;
  @ViewChild('l') lform!:NgForm;
  profitandLossMonthlyReport = new entProfitAndLoss();
  constructor(
    public appService: AppService,
    public data: DataService,
    public initialData: InitialDataService,
    public apiAccountService: AccountsApiService,
    public urlService: UrlService,
    public router: Router,
    public dialog: CoreService,
  ) {}

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getInitializeProfitAndLoss');
    const obj = {
      fiscalYearId: this.fiscalYearId,
      isExcludeZero: this.isExcludeZero,
    };
    if(this.initialData.DDLValues.DDLRegion.length > 0){
      this.profitandLossMonthlyReport.regionValue = this.initialData.DDLValues.DDLRegion[0].constant;
      this.generateProfitAndLossMonthlyReport();
    }
  }

  generateProfitAndLossMonthlyReportExcel() {
    this.apiAccountService;
    this.data.postPDFData('Report/generateProfitAndLossMonthlyReportExcel',this.profitandLossMonthlyReport,).subscribe((success) => {
        const resp = new Blob([success], { type: 'application/text' });
        const fileURL = URL.createObjectURL(resp);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = 'Profit And Loss Monthly Report.xlsx';
        downloadLink.click();
        // downloadLink.href = success.data;
      });
  }

  toggleExpand() {
    this.isToggle = !this.isToggle;
    if (this.isToggle) {
      this.profitandLossMonthlyReport.expandAll = 'N';
    } else {
      this.profitandLossMonthlyReport.expandAll = 'Y';
    }
  }

  excludeZero(event: any) {
    if (event.target.checked === true) {
      this.profitandLossMonthlyReport.isExcludeZero = 'Y';
    } else {
      this.profitandLossMonthlyReport.isExcludeZero = 'N';
    }
    const obj = {
      fiscalYearId: this.profitandLossMonthlyReport.fiscalYearId,
      isExcludeZero: this.profitandLossMonthlyReport.isExcludeZero,
    };
    this.generateProfitAndLossMonthlyReport(obj);
  }

  generateProfitAndLossMonthlyReport(data?: any) {
    if (!!data) {
      this.fiscalYearId = data.fiscalYearId;
      this.isExcludeZero = data.isExcludeZero;
    } else {
      this.fiscalYearId = this.fiscalYearId;
      this.isExcludeZero = this.isExcludeZero;
    }
    const obj = {
      FiscalYearId: this.fiscalYearId,
      isExcludeZero: this.isExcludeZero,
      regionValue : this.profitandLossMonthlyReport.regionValue,
    };
    this.apiAccountService
      .generateProfitAndLossMonthlyReport(obj)
      .subscribe((success) => {
        this.profitandLossMonthlyReport = success;
        this.exportbtn= false;
      });
  }

  generateProfitAndLossMonthlyReportWithForm(val:any){
    if(this.lform.valid){
      this.generateProfitAndLossMonthlyReport(val);
    }else{
      this.errorTrue = true;
    }
  }

  clearInput() {
    this.profitandLossMonthlyReport.fiscalYearId = 0;
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  navigateToAccount(){
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
}
