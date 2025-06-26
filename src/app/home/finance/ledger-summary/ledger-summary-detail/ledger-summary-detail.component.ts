import { DatePipe } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  Row,
  InnerScroll,
  AppToolTipComponent,
  ViewLabel,
} from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { entAccountsReport } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { AppCurrencyPipe } from '../../../../common/pipes/app-currency/app-currency.pipe';

@Component({
  selector: 'app-ledger-summary-detail',
  standalone: true,
  imports: [
    Row,
    InnerScroll,
    AppTableComponent,
    IconButtonComponent,
    AppDatePipe,
    CellDefDirective,
    CellHeaderDefDirective,
    SearchComponent,
    FormsModule,
    AppToolTipComponent,
    InputControlComponent,
    TableStatusSortComponent,
    ViewLabel,
    AppCurrencyPipe, Row
  ],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './ledger-summary-detail.component.html',
  styleUrl: './ledger-summary-detail.component.scss',
})
export class LedgerSummaryDetailComponent {
  ledgerDetailReport = new entAccountsReport();
  ledgerDetailReportRAW = new entAccountsReport();
  regionValueBtn = false;
  exportbtn: any = false;
  @ViewChild('ledgerDetail') ledgerDetailform!: NgForm;
  columns: any = [
    '',
    'parentgrpname',
    'ledgername',
    'ledgercode',
    'aliasname',
    'nature',
    'ledgertype',
    '',
  ];
  columnsName: any = [
    '',
    'Parent Group Name',
    'Ledger Name',
    'Ledger Code',
    'Alias Name',
    'Nature Of Group',
    'Ledger Type ',
    '',
  ];
maxDate = '';
  minDate = ''
  ledgerNames: any = [];

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  __selectedItems: any = {
    currentIndex: 0,
    array: [],
  };
  errorTrue = false;
  reportResult: any;
  tableData: any = [
    // {
    //   parentgrpname:'Sales Account',
    //   ledgername:'Income on Service',
    //   ledgercode:'Ledger Name',
    //   aliasname:'Service Income',
    //   nature:'Income',
    //   ledgertype:'Sales'
    // }
  ];
  options = {
    type: 'accountsPath',
  };
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
  };
  currency: any;
  regionValue: any;
  constructor(
    public router: Router,
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
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }
  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.urlService.decode(id);
    this.ledgerDetailReport.groupId = params.groupId;
    this.ledgerDetailReport.ledgerId = params.ledgerId;
    this.ledgerDetailReport.fiscalYearId = params.fiscalYearId;
    this.ledgerDetailReport.fromDate = params.fromDate;
    this.ledgerDetailReport.toDate = params.toDate;
    this.ledgerDetailReport.regionValue = params.regionValue;
    await this.data.checkToken();
    this.appService.setBreadCrumb(this.breadCrumb);
    await this.appStorage.get('Region').then((val) => {
      this.regionValue = val;
    });
    await this.appStorage.get('companyCurrencyValue').then((val) => {
      this.currency = val;
    });
    await this.initialData.getAcccountsDDL('getInitializeLedgerDetailReport');
    if (!!params.regionValue) {
      this.regionValueBtn = true;
    } else {
      if (this.initialData.DDLValues.DDLRegion.length > 0) {
        this.ledgerDetailReport.regionValue =
          this.initialData.DDLValues.DDLRegion[0].constant;
      }
    }
    await this.generateLedgerDetailReport();
  }
  async generateLedgerDetailReport() {
    this.ledgerDetailReport.regionValue = this.regionValue;
    this.api
      .generateLedgerDetailReport(this.ledgerDetailReport, this.options)
      .subscribe((success) => {
        this.ledgerDetailReport = success;
        this.loadAllLedgerListByLedgerCodeandType(
          this.ledgerDetailReport.groupId
        );
        this.dialog.closeDialog();
        // this.initialLoad = false;
        this.exportbtn = true;
      });
  }
  // this.overlayService.detachSearchboxAll();

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems, 'hello');
  }
  navigateToList() {
    this.router.navigateByUrl(
      '/home/finance/ledger-summary/ledger-summary-report'
    );
  }
  generateLedgerDetailReportWithForm() {
    if (this.ledgerDetailform.valid) {
      this.generateLedgerDetailReport();
    } else {
      this.errorTrue = true;
    }
  }
  getLedgerDetailsReportAsExcel() {
    this.api;
    this.data
      .postPDFData(
        'Report/GetLedgerDetailsReportAsExcel',
        this.ledgerDetailReport,
        this.options
      )
      .subscribe((success) => {
        const resp = new Blob([success], { type: 'application/text' });
        const fileURL = URL.createObjectURL(resp);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = 'Ledger Details Report.xlsx';
        downloadLink.click();
        // downloadLink.href = success.data;
      });
  }
  clear() {
    this.ledgerDetailReport.fiscalYearId = 0;
    this.ledgerDetailReport.fromDate = '';
    this.ledgerDetailReport.toDate = '';
    this.ledgerDetailReport.groupId = 0;
    this.ledgerDetailReport.ledgerId = 0;
    this.data.successMessage('Data Cleared Successfully');
    // this.appSearch.close();
  }

  loadAllLedgerListByLedgerCodeandType(id: number) {
    const obj = {
      data: id,
      intData1: 0,
      intData2: 0,
      intData3: 0,
      longData1: id,
      longData2: 0,
      longData3: 0,
      strData1: '',
      strData2: '',
      strData3: this.regionValue,
      strData4: '',
      strData5: 'string',
    };

    this.api.loadAllLedgerListByLedgerCodeandType(obj).subscribe((success) => {
      console.log(success);
      console.log(success.lstActLedger);
      console.log(success.lstActLedger.ledgerName);
      this.ledgerNames = success.lstActLedger;
    });
  }

  onGroupSelect(groupId: number) {
    if (groupId === 0) {
      this.ledgerNames = [];
    } else {
      this.loadAllLedgerListByLedgerCodeandType(groupId);
    }
  }

  navigateToDetail() {
    this.router.navigateByUrl(
      '/home/finance/ledger-summary/ledger-summary-report'
    );
  }
  navigateToAccount() {
    this.router.navigateByUrl('/home/corporate/finance-menus');
  }

  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus');
  }
  getMinAndMaxDate(val:any){
    this.initialData.DDLValues.DDLFiscalYear.forEach((element :any) => {
      if(val === element.id){

        this.maxDate = element.constant
        this.minDate = element.name
      }
      console.log(this.maxDate);
      console.log(this.minDate);
      
    });
  }
  changDate(){
    this.ledgerDetailReport.fromDate='';
    this.ledgerDetailReport.toDate='';

  }
}
