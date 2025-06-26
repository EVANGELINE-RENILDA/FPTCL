import { DatePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, InnerScroll, AppToolTipComponent, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { TrialBalanceLoopComponent } from '../../trial-balance-report/trial-balance-loop/trial-balance-loop.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { entBalanceSheetReport } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { BalanceSheetLoopComponent } from '../balance-sheet-loop/balance-sheet-loop.component';

@Component({
  selector: 'app-balance-sheet-report',
  standalone: true,
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, TableStatusSortComponent, ViewLabel, CheckboxComponent, BalanceSheetLoopComponent],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './balance-sheet-report.component.html',
  styleUrl: './balance-sheet-report.component.scss'
})
export class BalanceSheetReportComponent {
  balanceSheet = new entBalanceSheetReport();
  errorTrue = false;
  exportbtn: any = true;
  openAlltrue = false;
  groupViewList: any = [];
  totalDebit = 0;
  totalCredit = 0;
  netLoss = 0;
  netProfit = 0;
  liablity: any = [];
  asset: any = [];
  assetLedgerOpeningBalance = false;
  liablityLedgerOpeningBalance = false;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  isToggle = false;
  @ViewChild('l') lform!: NgForm;
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
  options = {
    type: 'accountsPath',
  };

  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getBalanceSheetReportInitialdata');
    this.createNewBalanceSheetReport();

    await this.appStorage.get('Region').then((val: any) => {
      console.log(val);
      this.regionValue = val;
    });
    this.balanceSheet.regionValue = this.regionValue;

    this.generateBalanceSheetReport();
  }
  createNewBalanceSheetReport() {
    this.api
      .createNewBalanceSheetReport(this.options)
      .subscribe((success) => {
        this.balanceSheet = success;
        this.balanceSheet.expandAll = 'N';
        this.openAlltrue = true;
      });
  }
  generateBalanceSheetReport() {
    let obj = {
      fiscalYearId: this.balanceSheet.fiscalYearId,
      isExcludeZero: this.balanceSheet.isExcludeZero,
      fromDate: this.balanceSheet.fromDate,
      toDate: this.balanceSheet.toDate,
      expandAll: this.balanceSheet.expandAll,
      regionValue: this.balanceSheet.regionValue,
    };
    this.api
      .generateBalanceSheetReport(obj, this.options)
      .subscribe((success) => {
        // this.initialLoad = false;
        this.exportbtn = false;
        this.balanceSheet = success;
        this.generateListAllData(success);
      });
    // this.overlayService.detachSearchboxAll();
    this.dialog.closeDialog();
  }
  generateListAllData(val: any) {
    this.groupViewList = [];
    this.totalDebit = 0;
    this.totalCredit = 0;
    this.netLoss = 0;
    this.netProfit = 0;
    this.asset = [];
    this.liablity = [];
    if (val.pentActGroup.ilistOfGroup.length !== 0) {
      this.groupViewList = val.pentActGroup.ilistOfGroup;
      this.totalDebit = val.pentActGroup.groupDebitValue;
      this.totalCredit = val.pentActGroup.groupCreditValue;
      let difference = Math.abs(this.totalDebit - this.totalCredit);
      if (this.totalDebit > this.totalCredit) {
        this.netLoss = difference;
        this.netProfit = 0;
        this.totalCredit += difference;
      } else if (this.totalDebit < this.totalCredit) {
        this.netLoss = difference;
        this.netProfit = 0;
        this.totalDebit += difference;
      }
      if (this.groupViewList.length !== 0) {
        for (let i = 0; i < this.groupViewList.length; i++) {
          if (
            this.groupViewList[i].groupNatureValue !== '' &&
            this.groupViewList[i].groupNatureValue === 'ASSET'
          ) {
            this.asset.push(this.groupViewList[i]);
          } else if (
            this.groupViewList[i].groupNatureValue !== '' &&
            this.groupViewList[i].groupNatureValue === 'LIABT'
          ) {
            this.liablity.push(this.groupViewList[i]);
          } else {
          }
        }
      }
    }
    this.differenceOpeningBalance();
  }
  differenceOpeningBalance() {
    if (
      this.balanceSheet.differenceInLiabilityLedgerOpeningBalance >
      this.balanceSheet.differenceInAssetLedgerOpeningBalance
    ) {
      this.assetLedgerOpeningBalance = true;
    } else if (
      this.balanceSheet.differenceInLiabilityLedgerOpeningBalance <
      this.balanceSheet.differenceInAssetLedgerOpeningBalance
    ) {
      this.liablityLedgerOpeningBalance = true;
    } else if (
      this.balanceSheet.differenceInLiabilityLedgerOpeningBalance === '0' &&
      this.balanceSheet.differenceInAssetLedgerOpeningBalance === '0'
    ) {
      this.assetLedgerOpeningBalance = false;
      this.liablityLedgerOpeningBalance = false;
    }
  }

  excludeZero(event: any) {
    if (event.target.checked === true) {
      this.balanceSheet.isExcludeZero = 'Y';
    } else {
      this.balanceSheet.isExcludeZero = 'N';
    }
    this.generateBalanceSheetReport();
  }

  loadAndGenerateExcelFileForBalanceSheetReport() {
    // this.searchCriterias.totalCount = this.totalCount;
    // this.searchCriterias.timezone = new Date().toTimeString().slice(9);
    let obj = {
      fiscalYearId: this.balanceSheet.fiscalYearId,
      isExcludeZero: this.balanceSheet.isExcludeZero,
      fromDate: this.balanceSheet.fromDate,
      toDate: this.balanceSheet.toDate,
      expandAll: this.balanceSheet.expandAll,
      regionValue: this.balanceSheet.regionValue,
    };
    this.api
      .loadAndGenerateExcelFileForBalanceSheetReport(
        obj,
        this.options
      )
      .subscribe((success: any) => {
        const downloadLink = document.createElement('a');
        downloadLink.href =
          'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
          success.strResultExcel;
        let CDates = new Date().toLocaleDateString();
        let FileName = 'Balance Sheet Report.xlsx';
        downloadLink.download = FileName;
        downloadLink.click();
      });
  }
  toggleExpand() {

    this.isToggle = !this.isToggle;
    if (this.isToggle) {
      this.balanceSheet.expandAll = 'N';
    } else {
      this.balanceSheet.expandAll = 'Y';
    }

    // this.trialBalanceReport.expandAll = !this.trialBalanceReport.expandAll;
  }
  clearDate() {
    this.balanceSheet.fromDate = '';
    this.balanceSheet.toDate = '';
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  generateBalanceSheetReportWithForm() {
    if (this.lform.valid) {
      this.generateBalanceSheetReport();
    } else {
      this.errorTrue = true;
    }
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.generateBalanceSheetReportWithForm();
    this.appSearch?.close();
  }
  clear() {
    this.createNewBalanceSheetReport();
    this.asset = [];
    this.liablity = [];
    // this.overlayService.detachSearchboxAll();
  }
  navigateToAccount() {
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }

  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus')
  }
}
