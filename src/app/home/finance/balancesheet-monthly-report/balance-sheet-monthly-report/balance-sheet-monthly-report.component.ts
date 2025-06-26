import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { FormsModule, NgForm } from '@angular/forms';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { entBalanceSheetReport } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { InnerScroll, Row } from '../../../../app-core/core-component/core-component.component';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { DatePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { DataService } from '../../../../common/services/data/data.service';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { ToggleclassDirective } from '../../../../app-core/directives/toggleclass/toggleclass.directive';
import { BalancesheetmonthlyPipe } from '../../../../common/pipes/balancesheetmonthly/balancesheetmonthly.pipe';
import { AppCurrencyPipe } from '../../../../common/pipes/app-currency/app-currency.pipe';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balance-sheet-monthly-report',
  standalone: true,
  imports: [InputControlComponent,IconButtonComponent,SearchComponent,FormsModule,Row,InnerScroll,CheckboxComponent,NgTemplateOutlet,ToggleclassDirective, BalancesheetmonthlyPipe,AppCurrencyPipe,NgClass],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  templateUrl: './balance-sheet-monthly-report.component.html',
  styleUrl: './balance-sheet-monthly-report.component.scss'
})
export class BalanceSheetMonthlyReportComponent {
  balanceSheetMonthlyReport = new entBalanceSheetReport();
  @ViewChild('l') lform!:NgForm;
  fiscalYearId = 0;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  companyName='';

  isExcludeZero = '';
errorTrue=false;
isToggle = false;

exportbtn: any = true;
options = {
  type: 'accountsPath',
};

constructor(
  public initialData: InitialDataService,
  public api: AccountsApiService,
  public dialog: CoreService,
  public appService: AppService,
  public data: DataService,
  public storage: AppStorageService,
  public router: Router,
){

}
ngOnInit(): void {
  this.init();
}
async init() {
  await this.data.checkToken();
  await this.initialData.getAcccountsDDL('getBalanceSheetReportInitialdata');
  await this.storage.get('companyName').then((val) => {
    
      this.companyName = val;
  });
  const obj = {
    fiscalYearId: this.fiscalYearId,
    isExcludeZero: this.isExcludeZero,
  };
  // await this.generateBalanceSheetMonthlyReport(obj);
  if(this.initialData.DDLValues.DDLRegion.length > 0){
    this.balanceSheetMonthlyReport.regionValue = this.initialData.DDLValues.DDLRegion[0].constant;
    this.generateBalanceSheetMonthlyReport();
  }
}
generateBalanceSheetMonthlyReportWithForm(val:any){
  if(this.lform.valid){
    this.generateBalanceSheetMonthlyReport(val);
  }else{
    this.errorTrue = true;
  }
}
generateBalanceSheetMonthlyReport(data?: any) {
  if (!!data) {
    this.fiscalYearId = data.fiscalYearId;
    this.isExcludeZero = data.isExcludeZero;
  } else {
    this.fiscalYearId = this.fiscalYearId;
    this.isExcludeZero = this.isExcludeZero;
  }
  const obj = {
    FiscalYearId: this.fiscalYearId,
    ExcludeZero: this.isExcludeZero,
    regionValue : this.balanceSheetMonthlyReport.regionValue,
  };
  this.api
    .generateBalanceSheetMonthlyReport(obj, this.options)
    .subscribe((success) => {
      this.balanceSheetMonthlyReport = success;
      this.exportbtn = false;
    });
  // this.overlayService.detachSearchboxAll();
  this.dialog.closeDialog();
}
clearDate() {
  this.balanceSheetMonthlyReport.fromDate = '';
  this.balanceSheetMonthlyReport.toDate = '';
}
clear() {
  this.balanceSheetMonthlyReport.fiscalYearId = 0;
  // this.overlayService.detachSearchboxAll();
}
ngAfterViewInit(): void {

  this.appService.setBreadCrumb(this.breadCrumb);
}
  excludeZero(event: any) {
  if (event.target.checked === true) {
    this.balanceSheetMonthlyReport.isExcludeZero = 'Y';
  } else {
    this.balanceSheetMonthlyReport.isExcludeZero = 'N';
  }
  const obj = {
    fiscalYearId: this.balanceSheetMonthlyReport.fiscalYearId,
    isExcludeZero: this.balanceSheetMonthlyReport.isExcludeZero,
  };
  this.generateBalanceSheetMonthlyReport(obj);
}
toggleExpand() {
  this.isToggle = !this.isToggle;
if (this.isToggle) {
  this.balanceSheetMonthlyReport.expandAll = 'N';
} else {
  this.balanceSheetMonthlyReport.expandAll = 'Y';
}
}
generateBalanceSheetMonthlyReportExcel() {
  this.api;
  this.data
    .postPDFData(
      'Report/generateBalanceSheetMonthlyReportExcel',
      this.balanceSheetMonthlyReport,
      this.options
    )
    .subscribe((success) => {
      const resp = new Blob([success], { type: 'application/text' });
      const fileURL = URL.createObjectURL(resp);
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = 'Balance Sheet Monthly Report.xlsx';
      downloadLink.click();
      // downloadLink.href = success.data;
    });
}
navigateToAccount(){
  this.router.navigateByUrl('/home/corporate/finance-menus')
}
}
