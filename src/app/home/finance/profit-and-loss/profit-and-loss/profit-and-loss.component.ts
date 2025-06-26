import { DatePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { entProfitAndLoss } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, InnerScroll, AppToolTipComponent, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { ProfitAndLossLoopComponent } from '../profit-and-loss-loop/profit-and-loss-loop.component';


@Component({
  selector: 'app-profit-and-loss',
  standalone: true,
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, TableStatusSortComponent, ViewLabel, CheckboxComponent, ProfitAndLossLoopComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe],
  templateUrl: './profit-and-loss.component.html',
  styleUrl: './profit-and-loss.component.scss'
})
export class ProfitAndLossComponent {
  profitandLoss = new entProfitAndLoss();
  @ViewChild('l') lform!: NgForm;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  options = {
    type: 'accountsPath',
  };
  exportbtn: any = true;
  groupviewList: any = [];
  TotalDebit: any = 0;
  TotalCredit: any = 0;
  NetLoss: any = 0;
  NetProfit: any = 0;
  Expense: any = [];
  Income: any = [];
  Expense1: any = [];
  Income1: any = [];
  listofAllData: any = [];
  openAlltrue = false;
  errorTrue = false;
  liablity: any = [];
  asset: any = [];
  regionValue: any;

  constructor(public router: Router,
    public api: AccountsApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public urlService: UrlService,
    public appSettings: AppSettingsService,
    public datepipe: DatePipe
  ) {

  }
  ngOnInit(): void {
    this.init();
  }
  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getInitializeProfitAndLoss');
    this.appService.setBreadCrumb(this.breadCrumb);
    this.createNewProfitAndLossReport();

    await this.appStorage.get('Region').then((val: any) => {
      console.log(val);
      this.regionValue = val;
    });
    this.profitandLoss.regionValue = this.regionValue;

    this.generateProfitandLoss();
  }

  createNewProfitAndLossReport() {
    this.api
      .createNewProfitAndLossReport(this.options)
      .subscribe((success) => {
        this.profitandLoss = success;
        this.profitandLoss.expandAll = 'N';
        // this.openAlltrue = true;
      });
  }
  loadAndGenerateExcelFileForProfitAndLossReport() {
    // this.searchCriterias.totalCount = this.totalCount;
    // this.searchCriterias.timezone = new Date().toTimeString().slice(9);
    let obj = {
      fiscalYearId: this.profitandLoss.fiscalYearId,
      isExcludeZero: this.profitandLoss.isExcludeZero,
      fromDate: this.profitandLoss.fromDate,
      toDate: this.profitandLoss.toDate,
      expandAll: this.profitandLoss.expandAll,
      regionValue: this.profitandLoss.regionValue,
    };
    this.api
      .loadAndGenerateExcelFileForProfitAndLossReport(
        obj,
        this.options
      )
      .subscribe((success: any) => {
        const downloadLink = document.createElement('a');
        downloadLink.href =
          'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
          success.strResultExcel;
        let CDates = new Date().toLocaleDateString();
        let FileName = 'Profit & Loss Statement Report.xlsx';
        downloadLink.download = FileName;
        downloadLink.click();
      });
  }
  excludeZero(event: any) {
    if (event.target.checked === true) {
      this.profitandLoss.isExcludeZero = 'Y';
    } else {
      this.profitandLoss.isExcludeZero = 'N';
    }
    this.generateProfitandLoss();
  }
  generateProfitandLoss() {
    let obj = {
      fiscalYearId: this.profitandLoss.fiscalYearId,
      isExcludeZero: this.profitandLoss.isExcludeZero,
      fromDate: this.profitandLoss.fromDate,
      toDate: this.profitandLoss.toDate,
      expandAll: this.profitandLoss.expandAll,
      regionValue: this.profitandLoss.regionValue,
    };
    this.api
      .generateProfitAndLossReport(obj, this.options)
      .subscribe((success) => {
        this.profitandLoss = success;
        this.exportbtn = false;
        // this.initialLoad= false;
        this.generateListAllData(success);
      });
    this.dialog.closeDialog();
  }
  generateListAllData(val: any) {
    this.groupviewList = [];
    this.TotalDebit = 0;
    this.TotalCredit = 0;
    this.NetLoss = 0;
    this.NetProfit = 0;
    this.Expense = [];
    this.Income = [];
    this.Expense1 = [];
    this.Income1 = [];
    this.listofAllData = val;
    if (val.pentActGroup.ilistOfGroup.length !== 0) {
      this.groupviewList = val.pentActGroup.ilistOfGroup;
      this.TotalDebit = val.pentActGroup.groupDebitValue;
      this.TotalCredit = val.pentActGroup.groupCreditValue;
      let difference = Math.abs(this.TotalDebit - this.TotalCredit);
      if (this.TotalDebit > this.TotalCredit) {
        this.NetLoss = difference;
        this.NetProfit = 0;
        this.TotalCredit += difference;
      } else if (this.TotalDebit < this.TotalCredit) {
        this.NetLoss = difference;
        this.NetProfit = 0;
        this.TotalDebit += difference;
      }
      if (this.groupviewList.length !== 0) {
        for (let i = 0; i < this.groupviewList.length; i++) {
          if (
            this.groupviewList[i].groupNatureValue !== '' &&
            this.groupviewList[i].groupNatureValue === 'EXPNS'
          ) {
            if (
              this.groupviewList[i].groupName !== '' &&
              this.groupviewList[i].impactProfitLoss === 'N'
            ) {
              this.Expense1.push(this.groupviewList[i]);
            } else {
              this.Expense.push(this.groupviewList[i]);
            }
          } else if (
            this.groupviewList[i].groupNatureValue !== '' &&
            this.groupviewList[i].groupNatureValue === 'INCME'
          ) {
            if (
              this.groupviewList[i].groupName !== '' &&
              this.groupviewList[i].impactProfitLoss === 'N'
            ) {
              this.Income1.push(this.groupviewList[i]);
            } else {
              this.Income.push(this.groupviewList[i]);
            }
          } else {
          }
        }
      }
    }
  }
  toggleExpand() {
    this.openAlltrue = !this.openAlltrue;
    if (this.openAlltrue) {
      this.profitandLoss.expandAll = 'N';
    } else {
      this.profitandLoss.expandAll = 'Y';
    }
  }
  clearDate() {
    this.profitandLoss.fromDate = '';
    this.profitandLoss.toDate = '';
  }
  generateProfitandLossWithForm() {
    if (this.lform.valid) {
      this.generateProfitandLoss();
    } else {
      this.errorTrue = true;
    }
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.generateProfitandLossWithForm();
    this.appSearch?.close();
  }
  clear() {
    this.createNewProfitAndLossReport();
    this.asset = [];
    this.liablity = [];
    // this.overlayService.detachSearchboxAll();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  navigateToAccount() {
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }

  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus')
  }
}


