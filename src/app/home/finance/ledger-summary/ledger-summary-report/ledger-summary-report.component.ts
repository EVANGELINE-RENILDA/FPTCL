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
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { entAccountsReport } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';

@Component({
  selector: 'app-ledger-summary-report',
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
    CheckboxComponent,
  ],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './ledger-summary-report.component.html',
  styleUrl: './ledger-summary-report.component.scss',
})
export class LedgerSummaryReportComponent {
  ledgerSummaryReport = new entAccountsReport();
  ledgerSummaryReportRAW = new entAccountsReport();
  repDate = '';

  columns: any = [
    'SI_NO',
    'PARENT_GROUP_NAME',
    'CODE_NAME',
    'LEDGER_NAME',
    'openingbalance',
    'toatdramount',
    'totalcramount',
    'nettransaction',
    'closingbalance',
    'action',
  ];
  columnsName: any = [
    '#',
    'Parent Group Name',
    'Ledger Code',
    'Ledger Name',
    'Opening Balance',
    'Total Dr Amount INR(₹) ',
    'Total Cr Amount INR(₹) ',
    'Net Transaction',
    'Closing Balance',
    'Action',
  ];
    @ViewChild('search') searchForm!: NgForm;
  
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  __selectedItems: any = {
    currentIndex: 0,
    array: [],
  };
  reportResult: any;
  tableData: any = [
    {
      parentgrpname: ' Sales Account ',
      ledgercode: '5001',
      ledgername: ' Income on Service ',
      openingbalance: ' 0.00 ',
      toatdramount: ' 0.00 ',
      totalcramount: ' 0.00 ',
      nettransaction: ' 0.00 ',
      closingbalance: ' 0.00 ',
    },
  ];
  options = {
    type: 'accountsPath',
  };
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
  };
  errorTrue = false;

  regionValue: any;
  currency: any;
  maxDate = '';
  minDate = ''
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
  ) { }
  ngOnInit(): void {
    this.init();
  }
  async init() {
    await this.data.checkToken();
    await this.appStorage.get('Region').then((val) => {
      this.regionValue = val;
    });
    await this.appStorage.get('companyCurrencyValue').then((val) => {
      this.currency = val;
    });
    this.initialData.getAcccountsDDL('getInitializeLedgerSummaryReport');
    this.generateLedgerSummaryReport();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  generateLedgerSummaryReport(type?: any) {
    this.ledgerSummaryReport.regionValue = this.regionValue;

    this.api
      .generateLedgerSummaryReport(this.ledgerSummaryReport)
      .subscribe((success: any) => {
        this.ledgerSummaryReport = success;
        this.reportResult = success.reportResult;
        if (this.reportResult !== '') {
          const reportResult = JSON.parse(success.reportResult);
          this.repDate = this.ledgerSummaryReport.generatedDateTime;
          this.tableData = reportResult.Table;
          this.ledgerSummaryReport.generatedDateTime =
            reportResult.Table[0]?.Start_Date;
        }
        if (type !== 'clear') {
          this.dialog.closeDialog();
        }
      });
  }
  onSelect(event: any) {
    this.__selectedItems = event;
  }
  onSearch() {
    if(this.searchForm.valid){
      this.data.successMessage('Search Executed Successfully');
      this.generateLedgerSummaryReport();
      this.appSearch?.close();
    }
    else{
      this.errorTrue=true;
    }
  }
  changDate(){
    this.ledgerSummaryReport.fromDate='';
    this.ledgerSummaryReport.toDate='';

  }
  excludeZero(event: any) {
    if (event.target.checked === true) {
      this.ledgerSummaryReport.isExcludeZero = 'Y';
    } else {
      this.ledgerSummaryReport.isExcludeZero = 'N';
    }
    this.generateLedgerSummaryReport();
  }
  generateLedgerSummaryReportAsExcel() {
    this.api;
    this.data
      .postPDFData(
        'Report/GenerateLedgerSummaryReportAsExcel',
        this.ledgerSummaryReport,
        this.options
      )
      .subscribe((success) => {
        const resp = new Blob([success], { type: 'application/text' });
        const fileURL = URL.createObjectURL(resp);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = 'Ledger Summary Report.xlsx';
        downloadLink.click();
      });
  }
  async openDetail(item: any) {
    const obj = {
      groupId: item.PARENT_GROUP_ID,
      ledgerId: item.LEDGER_ID,
      fiscalYearId: this.ledgerSummaryReport.fiscalYearId,
      fromDate: this.ledgerSummaryReport.fromDate,
      toDate: this.ledgerSummaryReport.toDate,
      regionValue: this.ledgerSummaryReport.regionValue,
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl(
      '/home/finance/ledger-summary/ledger-summary-detail/' + urlJson
    );
  }
  clear() {
    this.ledgerSummaryReport = JSON.parse(
      JSON.stringify(this.ledgerSummaryReportRAW)
    );
    this.data.successMessage('Data Cleared Successfully');
    // this.generateLedgerSummaryReport('clear');
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
}
