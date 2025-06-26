
import { DatePipe, JsonPipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { entTrialBalanceReport, entTrialBalanceReportList } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, InnerScroll, AppToolTipComponent, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { ExpandAllDirective } from '../../../../app-core/directives/exapandAll/expand-all.directive';
import { TrialBalanceLoopComponent } from '../trial-balance-loop/trial-balance-loop.component';

@Component({
  selector: 'app-trial-balance-report',
  standalone: true,
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, TableStatusSortComponent, ViewLabel, CheckboxComponent, TrialBalanceLoopComponent, JsonPipe, ExpandAllDirective],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trial-balance-report.component.html',
  styleUrl: './trial-balance-report.component.scss'
})
export class TrialBalanceReportComponent {
  columns: any = ["parentgrpname", "closingbalance", "action"];
  columnsName: any = ["Particular", "Closing Balance", "Action"];
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  groupViewList: any = [];
  allDataList: any = [];
  testList: any = [];
  isToggle = false;
  errorTrue = false;
  @ViewChild('l') lform!: NgForm;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  trialBalanceReportRAW = new entTrialBalanceReport();
  trialBalanceReport = new entTrialBalanceReport();
  trialBalanceReportList = new entTrialBalanceReportList();
  ytd_TrialBalance: any = new entTrialBalanceReport();

  options = {
    type: 'accountsPath',
  };
  exportbtn: any = true;

  tableData: any = [
    // {
    //   parentgrpname: ' Sales Account ',
    //   ledgercode: '5001',
    //   ledgername: ' Income on Service ',
    //   openingbalance: ' 0.00 ',
    //   toatdramount: ' 0.00 ',
    //   totalcramount: ' 0.00 ',
    //   nettransaction: ' 0.00 ',
    //   closingbalance: ' 0.00 '


    // }
  ];
  ytdChecked: any = true;

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }

  @ViewChild('trialBalanceLoopComponent', { static: false })
  trialBalance!: TrialBalanceLoopComponent;
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

  isExpandDatas = false;
  showTable = false
  ngOnInit(): void {
    this.init();
  }
  async init() {
    await this.data.checkToken();
    this.initialData.getAcccountsDDL('getTrialBalanceReportInitialdata');

    await this.appStorage.get('Region').then((val: any) => {
      console.log(val);
      this.regionValue = val;
    });
    this.trialBalanceReport.regionValue = this.regionValue;

    this.createNewTrialBalanceReport();
    this.generateTrialBalanceReport();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems, 'hello');
  }
  ytdValueChanged(event: any) {

    if (event.target.checked === true) {
      this.trialBalanceReport.ytdEnable = true;
      this.ytdChecked = true;
    } else {
      this.trialBalanceReport.ytdEnable = false;
      this.ytdChecked = false;
    }
  }
  excludeZero(event: any) {
    if (event.target.checked === true) {
      this.trialBalanceReport.isExcludeZero = 'Y';
    } else {
      this.trialBalanceReport.isExcludeZero = 'N';
    }
    this.generateTrialBalanceReport();
  }
  generateTrialBalanceReport() {
    let obj = {
      fiscalYearId: this.trialBalanceReport.fiscalYearId,
      isExcludeZero: this.trialBalanceReport.isExcludeZero,
      fromDate: this.trialBalanceReport.fromDate,
      toDate: this.trialBalanceReport.toDate,
      expandAll: this.trialBalanceReport.expandAll,
      regionValue: this.trialBalanceReport.regionValue,
      ytdEnable: this.trialBalanceReport.ytdEnable
    };

    this.api
      .generateTrialBalanceReport(obj, this.options)
      .subscribe((success) => {
        // this.initialLoad = false;
        this.exportbtn = false;
        this.showTable = true
        this.trialBalanceReportList.plstentTrialBalanceReport =
          success.plstentTrialBalanceReport;
        this.getalltrialBalance(success.plstentTrialBalanceReport);
      });
    this.dialog.closeDialog();
  }
  getalltrialBalance(val: any) {
    this.allDataList = [];
    this.groupViewList = [];
    // this.ytdChecked = true;
    if (val.length !== 0) {
      if (val[0].msg.errorMessage.length === 0) {
        this.trialBalanceReport = val[0];
        this.ytd_TrialBalance = val[1];
        if (val[0].pentActGroup.ilistOfGroup.length !== 0) {
          this.groupViewList = val[0].pentActGroup.ilistOfGroup;
          const ytdGroupList = val[1].pentActGroup.ilistOfGroup;
          if (this.groupViewList.length !== 0) {
            for (let i = 0; i < this.groupViewList.length; i++) {
              if (this.groupViewList[i].groupNatureValue !== '') {
                const dataList = {
                  closingAllData: this.groupViewList[i],
                  ytdData: ytdGroupList[i],
                };
                this.allDataList.push(dataList);

                this.testList = dataList.closingAllData.ilistentLedger;
              }
            }
          }
        } else {
          this.groupViewList = [];
          this.allDataList = [];
        }
      } else {
        this.trialBalanceReport = val[0];
        this.ytd_TrialBalance = val[1];
      }
    }
  }
  toggleExpand() {
    this.isToggle = !this.isToggle;
    if (this.isToggle) {
      this.trialBalanceReport.expandAll = 'N';
    } else {
      this.trialBalanceReport.expandAll = 'Y';
    }

    // this.trialBalanceReport.expandAll = !this.trialBalanceReport.expandAll;
  }
  generateTrialBalanceReportWithForm() {
    if (this.lform.valid) {
      this.generateTrialBalanceReport();
    } else {
      this.errorTrue = true;
    }
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.generateTrialBalanceReportWithForm();
    this.appSearch?.close();
  }
  clear() {
    this.createNewTrialBalanceReport();
    this.groupViewList = [];
    this.allDataList = [];
    this.ytd_TrialBalance = [];
    this.trialBalanceReport = JSON.parse(
      JSON.stringify(this.trialBalanceReportRAW)
    );
    // this.overlayService.detachSearchboxAll();
  }
  createNewTrialBalanceReport() {
    this.errorTrue = false;
    this.api
      .createNewTrialBalanceReport(this.options)
      .subscribe((success) => {
        this.trialBalanceReport = success;
        this.trialBalanceReport.expandAll = 'N';
        this.trialBalanceReport.ytdEnable = true;
        // this.isToggle = true;
      });
  }
  loadAndGenerateExcelFileForTrialBalanceReport() {
    // this.searchCriterias.totalCount = this.totalCount;
    // this.searchCriterias.timezone = new Date().toTimeString().slice(9);
    let obj = {
      fiscalYearId: this.trialBalanceReport.fiscalYearId,
      isExcludeZero: this.trialBalanceReport.isExcludeZero,
      fromDate: this.trialBalanceReport.fromDate,
      toDate: this.trialBalanceReport.toDate,
      expandAll: this.trialBalanceReport.expandAll,
      ytdEnable: this.trialBalanceReport.ytdEnable,
      regionValue: this.trialBalanceReport.regionValue,
    };
    this.api
      .loadAndGenerateExcelFileForTrialBalanceReport(
        obj,
        this.options
      )
      .subscribe((success: any) => {
        const downloadLink = document.createElement('a');
        downloadLink.href =
          'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' +
          success.strResultExcel;
        let CDates = new Date().toLocaleDateString();
        let FileName = 'Trial Balance Report.xlsx';
        downloadLink.download = FileName;
        downloadLink.click();
      });
  }
  navigateToAccount() {
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }

  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus')
  }
}

