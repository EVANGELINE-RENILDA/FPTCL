import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoreService } from '../../../../app-core/service/core.service';
import {
  InnerScroll,
  Row,
} from '../../../../app-core/core-component/core-component.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import {
  entTrialBalanceReport,
  entTrialBalanceReportList,
} from '../../../../common/api-services/accounts-api/accounts-api.classes';

@Component({
  selector: 'app-trial-balance-report',
  standalone: true,
  imports: [Row, InnerScroll],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trial-balance-report.component.html',
  styleUrl: './trial-balance-report.component.scss',
})
export class TrialBalanceReportComponent implements OnInit {
  plstentTrialBalanceReport: any = [];
  ytdChecked: any = true;

  options = {
    type: 'accountsPath',
  };
  @Output() groupDataChange = new EventEmitter<any>();
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  ytd_TrialBalance: any = new entTrialBalanceReport();
  searchParams = new entTrialBalanceReport();
  searchParamsRAW = new entTrialBalanceReport();
  trialBalanceReportList = new entTrialBalanceReportList();

  constructor(
    public dialog: CoreService,
    public appService: AppService,
    public router: Router,
    public data: DataService,
    public initialData: InitialDataService,
    public accountsService: AccountsApiService,
    public urlService: UrlService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    await this.data.checkToken();
    this.initialData.getAcccountsDDL('getTrialBalanceReportInitialdata');
    this.createNewTrialBalanceReport();
  }

  createNewTrialBalanceReport() {
    this.accountsService
      .createNewTrialBalanceReport(this.options)
      .subscribe((success) => {
        this.searchParams = success;
        this.searchParams.expandAll = 'N';
      });
  }

  clearDate() {
    this.searchParams.fromDate = '';
    this.searchParams.toDate = '';
  }
}
