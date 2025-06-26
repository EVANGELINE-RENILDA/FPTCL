import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InnerScroll, Row, AppToolTipComponent, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { CashCounterInfoComponent } from '../../cash-counter/cash-counter-info/cash-counter-info.component';
import { Router } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { PaginatorComponent } from '../../../../app-core/template/app-table/paginator/paginator.component';
import { entTrustAndEstateReport, entTrustAndEstateReportGrid, entTrustAndEstateReportList } from '../../../../common/api-services/application-api/application-api.classes';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { AppCurrencyPipe } from "../../../../common/pipes/app-currency/app-currency.pipe";
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { CommonModule } from '@angular/common';
import { AccordionModule } from "../../../../app-core/template/accordion/accordion.module";

@Component({
  selector: 'app-soa-trust-and-estate-report',
  standalone: true,
  imports: [
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    IconButtonComponent,
    InnerScroll,
    InputControlComponent,
    SearchComponent,
    Row,
    FormsModule, PaginatorComponent,
    AppAccessDirective,
    ButtonAccessDirective,
    AppToolTipComponent,
    MatTooltipModule,
    TableStatusSortComponent,
    AppDatePipe,
    AccoutsStatusTableComponent,
    CashCounterInfoComponent,
    AppCurrencyPipe, CommonModule,
    AccordionModule,
    ViewLabel
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './soa-trust-and-estate-report.component.html',
  styleUrl: './soa-trust-and-estate-report.component.scss'
})
export class SoaTrustAndEstateReportComponent implements OnInit {
  indexHideShow: any = 0;
  accountNumber = ''
  currentDate = '';
  dateFormat: any;
  errorTrue = false;
  searchParams = new entTrustAndEstateReport();
  searchParamsRAW = new entTrustAndEstateReport();
  soaTrustAndEstateSearchResult: any;
  soaTrustAndEstateResult: any = [];
  soaTrustAndEstateList = new entTrustAndEstateReportList()
  search = false;
  tableData: any = [];
  casAccountType: any = [];

  columns: any = ["document", "account", "narrative", "fileAccType", "debit", "credit", "runningBalance"];

  columnsName: any = ["document", "account", "Narrative", "fileAccType ", "debit", "credit", "runningBalance"];

  @ViewChild('l') lform!: NgForm;

  options = {
    type: 'applicationPath'
  }

  fiscalyear: any;
  currencyVal: any;

  constructor(
    public router: Router,
    public appService: AppService,
    public dialog: CoreService,
    public data: DataService,
    public initialData: InitialDataService,
    public apiService: ApplicationApiService,
    public appSetting: AppSettingsService,
    public storage: AppStorageService
  ) { }

  ngOnInit() {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  fiscal: any

  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  pageId = 'FUDTN';

  async init() {
    await this.data.checkToken();
    this.initialData.getDDL('getInitialDataForTranscationPosting');
    this.initialData.getAcccountsDDL('getIntLedgerInitialData');
    this.currentDate = this.appService.getCurrentDate();

    await this.storage.get('companyCurrencyValue').then((val) => {
      this.currencyVal = val;
      console.log(this.currencyVal);
    });

    const fisca = await this.storage.get('fisca')
    const fiscalParse = JSON.parse(fisca);
    this.fiscalyear = fiscalParse?.idoBase?.act_company_fiscal_year_id;
    console.log("fiscal", this.fiscalyear);

    this.dateFormat = this.appSetting.environment.dateViewFormat;
    this.getTrustAndEstateReport();
  }

  getTrustAndEstateReport() {
    this.searchParams.fiscalYearId = this.fiscalyear;
    this.apiService.getTrustAndEstateReport(this.searchParams).subscribe((success) => {
      this.soaTrustAndEstateList = success;
      // this.soaTrustAndEstateResult = success.plstentTrustAndEstateReportGrid;
      this.soaTrustAndEstateSearchResult = success.ientTrustAndEstateReport;
     
      
    })
  }
lastEle:any
closingBal=false;
  onSearch() {
    this.errorTrue = false;
    if (this.canSearch()) {
      if (this.lform.valid) {

        this.apiService.getTrustAndEstateReport(this.searchParams).subscribe((success) => {
          this.soaTrustAndEstateList = success;
          this.closingBal=true

          this.soaTrustAndEstateResult = success.plstentTrustAndEstateReportGrid;
          this.soaTrustAndEstateSearchResult = success.ientTrustAndEstateReport;
          const lastElement = success.plstentTrustAndEstateReportGrid[success.plstentTrustAndEstateReportGrid?.length - 1];
          this.lastEle = lastElement.runningBalance

        })

        this.appSearch?.close();
      }
    } else {
      this.errorTrue = true;
      this.data.successMessage('Please enter either File Number or Account Number to search.');
    }
  }

  canSearch(): boolean {
    return !!this.searchParams.fileNo || !!this.searchParams.customerAccountNumber;
  }

  clear() {
    this.casAccountType = [];
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.getTrustAndEstateReport();
    this.data.successMessage('Data Cleared Successfully');
  }

  // async changeFiscalYear(fiscalYearId: any) {
  //   await this.openLedger(this.ledger.actLedgerId, fiscalYearId);
  //   this.showIndex(fiscalYearId);
  // }

  showIndex(val: any) {
    const index = this.initialData.DDLValues.ConfigFiscalyearlist.map(
      (e: any) => e.id
    ).indexOf(val);
    this.indexHideShow = index;
  }

  accountNum(val: any) {
    const obj = {
      data: this.searchParams.fileType,
      data2: this.searchParams.accountType
    }
    this.apiService.getTrustAccountDetailsByFileandAccountTypeValues(obj).subscribe((success) => {
      this.accountNumber = success.value;
    })
  }

  async fileData(event: any) {
    this.casAccountType = [];
    console.log(event);
    await this.initialData.DDLValues.DDLAccountType.forEach((element: any) => {
      if (event === 'TRUST' && element.constant === 'CASH') {
        this.casAccountType.push(element);
      }
      if (event === 'COMON' && element.constant === 'CASH') {
        this.casAccountType.push(element);
      }
      else if (event === 'ESTAT' && (element.constant === 'CASH' || element.constant === 'NONCS' || element.constant === 'COMON')) {
        this.casAccountType.push(element);
      }
    });

    // this.initialData.DDLValues.DDLFileType.forEach((ele: any) => {
    //   if (event === ele.constant) {
    //     this.receiptTrustEstate.fileTypeDescription = ele.description;
    //   }
    // });
  }

  // soaTrustAndEstateReportAsExcel() {
  //   this.data
  //     .postPDFData(
  //       'Report/trustAndEstateReportAsExcel',
  //       this.soaTrustAndEstateList,
  //       this.options
  //     )
  //     .subscribe((success) => {
  //       const resp = new Blob([success], { type: 'application/text' });
  //       const fileURL = URL.createObjectURL(resp);
  //       const downloadLink = document.createElement('a');
  //       downloadLink.href = fileURL;
  //       downloadLink.download = 'SOA Trust and Estate Report.xlsx';
  //       downloadLink.click();
  //     });
  // }

  formatDate(dateString: string): string {
    if (!dateString) {
      return '-';
    }

    const dateOnly = dateString.split(' ')[0];
    const [day, month, year] = dateOnly.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${monthNames[parseInt(month, 10) - 1]} ${year}`;
  }

  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus')
  }
}