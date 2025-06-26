import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  InnerScroll,
  Row,
  ViewLabel,
} from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { Router } from '@angular/router';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AppService } from '../../../../../app.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { entPurchaseReport } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { parse } from 'date-fns';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { DatePipe } from '@angular/common';
import { UrlService } from '../../../../../common/services/url/url.service';

@Component({
  selector: 'app-vat-paid-summary',
  standalone: true,
  imports: [
    AppTableComponent,
    FormsModule,
    SearchComponent,
    IconButtonComponent,
    InnerScroll,
    Row,
    ViewLabel,
    InputControlComponent,
    CellDefDirective,
    CellHeaderDefDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './vat-paid-summary-search.component.html',
  styleUrl: './vat-paid-summary-search.component.scss',
  providers: [DatePipe],
})
export class VatPaidSummaryComponent implements OnInit {
  searchParams = new entPurchaseReport();
  currentDate = '';
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
  };
  options = {
    type: 'accountsPath',
  };

  columns: any = ['month', 'vatPaidAmount', 'open'];
  columnsName: any = ['Month', 'Vat Paid Amount', 'Open'];
  tableData: any = [];
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  constructor(
    public dialog: CoreService,
    public data: DataService,
    public datepipe: DatePipe,
    public router: Router,
    public urlService: UrlService,
    public appService: AppService,
    public initialData: InitialDataService,
    public accountsService: AccountsApiService,
    public appSettings: AppSettingsService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.data.checkToken();

    this.initialData.getAcccountsDDL(
      'getInitializeDataForVatPaidSummary',
      this.options
    );
    this.generateVatPaidSummaryReport();
    this.currentDate = this.appService.getCurrentDate();
  }

  async generateVatPaidSummaryReport() {
    this.accountsService
      .generateVatPaidSummaryReport(this.searchParams, this.options)
      .subscribe((success) => {
        let enerate = success.reportResult;
        // this.tableData = enerate;
        let tableData = JSON.parse(enerate);
        console.log('length not found');
        if (tableData.Table1.length > 0) {
          console.log('length found in table 2');
          this.tableData = tableData.Table1;
          this.searchParams = success;
        }
      });
  }

  async vatPaidDetail(element: any) {
    console.log(element, 'element');

    // this.dateTransfer(element);
    const obj = {
      fiscalYearId: this.searchParams.currentFiscalYearId,
      companyId: this.searchParams.companyBranchId,
      fromDate: this.searchParams.fromDate,
      toDate: this.searchParams.toDate,
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl(
      '/home/purchase/report/vat-paid-summary/detail/' + urlJson
    );
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  dateTransfer(item: any) {
    let monthDate = new Date(item.Start_Date).getMonth() + 1;
    let monthParentfrom = parse(
      this.searchParams.fromDate,
      this.appSettings.environment.serverDateFromat,
      new Date()
    );
    let monthParent: any = monthParentfrom.getMonth() + 1;
    let monthEndDate = new Date(item.End_Date).getMonth() + 1;
    let monthEndParentTo = parse(
      this.searchParams.toDate,
      this.appSettings.environment.serverDateFromat,
      new Date()
    );
    let monthEndParent: any = monthEndParentTo.getMonth() + 1;
    if (monthDate !== monthParent) {
      let dateFrom: any = this.datepipe.transform(
        item.Start_Date,
        this.appSettings.environment.serverDateFromat
      );
      this.searchParams.fromDate = dateFrom;
    }
    if (monthEndDate !== monthEndParent) {
      let dateTo: any = this.datepipe.transform(
        item.End_Date,
        this.appSettings.environment.serverDateFromat
      );
      this.searchParams.toDate = dateTo;
    }
  }

  clearDate() {
    this.searchParams.fromDate = '';
    this.searchParams.toDate = '';
  }

  clearReport() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParams));
    this.init();
  }
}
