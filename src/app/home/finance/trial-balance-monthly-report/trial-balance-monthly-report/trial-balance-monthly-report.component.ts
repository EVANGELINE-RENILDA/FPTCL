import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from '../../../../app.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { CommonModule, DatePipe, JsonPipe, NgTemplateOutlet } from '@angular/common';
import { entTrialBalanceReport } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { InnerScroll, Row } from '../../../../app-core/core-component/core-component.component';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { CoreService } from '../../../../app-core/service/core.service';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { TrailbalancePipe } from '../../../../common/pipes/trailbalance/trailbalance.pipe';
import { ToggleclassDirective } from '../../../../app-core/directives/toggleclass/toggleclass.directive';
import { AppCurrencyPipe } from '../../../../common/pipes/app-currency/app-currency.pipe';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trial-balance-monthly-report',
  standalone: true,
  imports: [SearchComponent,Row, FormsModule, InnerScroll, InputControlComponent, IconButtonComponent,CheckboxComponent,NgTemplateOutlet,TrailbalancePipe,ToggleclassDirective, AppCurrencyPipe, JsonPipe, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe],
  templateUrl: './trial-balance-monthly-report.component.html',
  styleUrl: './trial-balance-monthly-report.component.scss'
})
export class TrialBalanceMonthlyReportComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  trialBalanceMonthlyReport = new entTrialBalanceReport();
  @ViewChild('l') lform!:NgForm;
  options = {
    type: 'accountsPath',
  };
  exportbtn: any = true;
  isToggle = false;

companyName='';
  errorTrue=false;
  fiscalYearId = 0;
  isExcludeZero = '';

    constructor( public appService: AppService,
      public data: DataService,
      public initialData: InitialDataService,
      public dialog: CoreService,
      public api: AccountsApiService,
      public storage: AppStorageService,
      public router: Router,
    ){

}
ngOnInit(): void {
  this.init();
}
async init() {
  await this.data.checkToken();
  await this.storage.get('companyName').then((val) => {
    debugger
      this.companyName = val;
  });
  await this.initialData.getAcccountsDDL('getTrialBalanceReportInitialdata');
  const obj = {
    fiscalYearId: this.fiscalYearId,
    isExcludeZero: this.isExcludeZero,
  };
  if(this.initialData.DDLValues.DDLRegion.length > 0){
    this.trialBalanceMonthlyReport.regionValue = this.initialData.DDLValues.DDLRegion[0].constant;
    this.generateTrialBalanceMonthlyReport();
  }
}
  clearDate() {
    this.trialBalanceMonthlyReport.fromDate = '';
    this.trialBalanceMonthlyReport.toDate = '';
  }
  generateTrialBalanceMonthlyReportWithForm(val:any){
    if(this.lform.valid){
      this.generateTrialBalanceMonthlyReport(val);
    }else{
      this.errorTrue = true;
    }
  }
  generateTrialBalanceMonthlyReport(data?: any) {
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
      regionValue : this.trialBalanceMonthlyReport.regionValue,
    };
    this.api
      .generateTrialBalanceMonthlyReport(obj, this.options)
      .subscribe((success) => {
        console.log(success);

        this.trialBalanceMonthlyReport = success;
        this.exportbtn = false;
        console.log(this.appService);

      });
    // this.overlayService.detachSearchboxAll();

    this.dialog.closeDialog();
  }
  excludeZero(event: any) {
    if (event.target.checked === true) {
      this.trialBalanceMonthlyReport.isExcludeZero = 'Y';
    } else {
      this.trialBalanceMonthlyReport.isExcludeZero = 'N';
    }
    const obj = {
      fiscalYearId: this.trialBalanceMonthlyReport.fiscalYearId,
      isExcludeZero: this.trialBalanceMonthlyReport.isExcludeZero,
    };
    this.generateTrialBalanceMonthlyReport(obj);
  }
  toggleExpand() {
    this.isToggle = !this.isToggle;
  if (this.isToggle) {
    this.trialBalanceMonthlyReport.expandAll = 'N';
  } else {
    this.trialBalanceMonthlyReport.expandAll = 'Y';
  }
}
generateTrialBalanceMonthlyReportExcel() {
  this.api;
  this.data
    .postPDFData(
      'Report/generateTrialBalanceMonthlyReportExcel',
      this.trialBalanceMonthlyReport,
      this.options
    )
    .subscribe((success) => {
      const resp = new Blob([success], { type: 'application/text' });
      const fileURL = URL.createObjectURL(resp);
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = 'Trial Balance Monthly Report.xlsx';
      downloadLink.click();
      // downloadLink.href = success.data;
    });
}
  clear() {
    this.generateTrialBalanceMonthlyReport(0);
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  navigateToAccount(){
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
}
