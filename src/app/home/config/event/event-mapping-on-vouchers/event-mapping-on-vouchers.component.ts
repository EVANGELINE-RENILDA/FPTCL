import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  InnerScroll,
  Row,
  AppToolTipComponent,
} from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { entActFundTransferNoteSearch, entActVoucherConfig } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { entCashCounterSearch } from '../../../../common/api-services/application-api/application-api.classes';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { FooterToggleDirective } from '../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SearchDebitComponent } from '../../../search/search-debit/search-debit.component';
import { SearchGroupComponent } from "../../../search/search-group/search-group.component";
import { LeadgerAutoSearchComponent } from "../../../search/leadger-auto-search/leadger-auto-search.component";

@Component({
  selector: 'app-event-mapping-on-vouchers',
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
    FormsModule,
    AppAccessDirective,
    ButtonAccessDirective,
    AppToolTipComponent,
    MatTooltipModule,
    TableStatusSortComponent,
    AppDatePipe,
    AccoutsStatusTableComponent,
    FooterToggleDirective,
    NgClass,
    MatCheckboxModule,
    SearchDebitComponent,
    SearchGroupComponent,
    LeadgerAutoSearchComponent,
    NgIf
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './event-mapping-on-vouchers.component.html',
  styleUrl: './event-mapping-on-vouchers.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class EventMappingOnVouchersComponent implements OnInit, AfterViewInit {
  pageId = 'FUDTN';
  voucherId = 0;
  voucherConfigId = 0;
  regionValue = '';
  tabIndex = 0;

  searchParams = new entCashCounterSearch();
  searchParamsRAW = new entCashCounterSearch();
  voucherConfig = new entActVoucherConfig();

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('e') e!: NgForm;

  columns: any = [
    // 'actFundTransferNoteRefNo',
    'branchName',
    'counterNo',
    'counterName',
    'effectiveDate',
    'status',
    'action',
  ];
  columnsName: any = [
    // 'Document No',
    'Branch Name',
    'Counter No',
    'Counter Name',
    'Effective Date',
    'Status',
    '',
  ];
  tableData: any = [
    {
      type: 'Type-1',
      vtypeDD: 'Payments',
      rangeDD: 'On%',
      postingMatrixtext: '2% on Primary value Exclusive VAT',
      percentageValue: '2%',
      lessThan: '1.50%',
      greaterThan: '1.00%',
      value: '50,000',
      valueP: '$200.00',
      vat: 'Exc-VAT',
    },
    {
      type: 'Type-1',
      vtypeDD: 'Payments',
      rangeDD: 'On%',
      postingMatrixtext: '2% on Primary value Exclusive VAT',
      percentageValue: '2%',
      lessThan: '1.50%',
      greaterThan: '1.00%',
      value: '50,000',
      valueP: '$200.00',
      vat: 'Exc-VAT',
    },
    {
      type: 'Type-2',
      vtypeDD: 'Receipts',
      rangeDD: 'Between%',
      postingMatrixtext: '1.5%=<50k then 1% on Primary value',
      percentageValue: '5%',
      lessThan: '1.50%',
      greaterThan: '4.00%',
      value: '47,000',
      valueP: '$150.00',
      vat: 'Inc-VAT',
    },
    {
      type: 'Type-3',
      vtypeDD: 'Value',
      rangeDD: 'On%',
      postingMatrixtext: '2% on Primary value Exclusive VAT',
      percentageValue: '5%',
      lessThan: '1.50%',
      greaterThan: '2.00%',
      value: '57,000',
      valueP: '$200.00',
      vat: 'Exc-VAT',
    },
    {
      type: 'Type-4',
      vtypeDD: 'Between% & Value',
      rangeDD: 'On%',
      postingMatrixtext: '2% on Primary value Exclusive VAT',
      percentageValue: '7%',
      lessThan: '1.50%',
      greaterThan: '3.00%',
      value: '55,000',
      valueP: '$270.00',
      vat: 'Exc-Inc',
    }
  ];

  totalInprogressCount: any = '';
  totalApprovedCount: any = '';
  regionValueDDL = [];
  options = {
    type: 'applicationPath'
  }

  idList: any = [];
  currentDate = '';
  isSelectedAll = false;
  @Input() public type: any = '';

  __selectedItems: any = {
    currentIndex: 0,
    array: [],
  };

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
  };
  errorTrue = false;
  lessThanOrEqual = '=<';
  greaterThan = '>';
  ledgers = [];
  legderDisabled = false;
  ledgerName = '';
  group = {
    name: ''
  };
  ledger = {
    description: ''
  };
  loading = true;
  constructor(
    public router: Router,
    public apiService: ApplicationApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public urlService: UrlService,
    public accountsService: AccountsApiService,
    public appSettings: AppSettingsService,
    public cdf: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  isChecked(val: any) {
    this.errorTrue = false;
    if (val.checked) {
      // this.cashCounterTiming.isHoliday = 'Y';
      // this.clearCashCounterTiming();
    } else {
      // this.cashCounterTiming.isHoliday = 'N';
    }
  }
  async init() {
    await this.data.checkToken();
    // await this.initialData.getDDL(
    //   'getCashCounterInitialData', this.options
    // );
    console.log(this.initialData.DDLValues.DDLStatus, 'initialData.DDLValues.DDLStatus');


    // this.totalInprogressandApprovedCounts();
    // this.createCashCounterSearch();
  }
  getLedgerBasedOnGroupId(event: any) {
    debugger
    console.log(event, 'got from event mapper');
    this.group = event;
    this.loading = false;
    const obj = {
      data: event.id
    }
    this.apiService.getLedgerBasedOnGroup(obj).subscribe((success: any) => {
      this.ledgers = success.data[0].value;
      this.cdf.detectChanges();
      // this.ledger.description = '';
      console.log(this.ledgers, 'ledgers');
      this.loading = true;
      this.ledger.description = '';
    });

  }
  getLedgerData(event: any) {
    console.log(event, 'ledgers');
    this.ledger = event;

  }
  // totalInprogressandApprovedCounts() {
  //   if (this.initialData.DDLValues.DDLInprogressList.length !== 0) {
  //     for (let i = 0; i < this.initialData.DDLValues.DDLInprogressList.length; i++) {
  //       this.totalInprogressCount = this.initialData.DDLValues.DDLInprogressList[i].constant;
  //     }
  //   }
  //   if (this.initialData.DDLValues.DDLApprovedList.length !== 0) {
  //     for (let i = 0; i < this.initialData.DDLValues.DDLApprovedList.length; i++) {
  //       this.totalApprovedCount = this.initialData.DDLValues.DDLApprovedList[i].constant;
  //     }
  //   }
  // }
  isCheckedLedger(val: any, selecetedElement: any) {
    this.errorTrue = false;
    debugger
    if (val.checked) {
      this.ledger.description = '';
      this.ledgers = [];
      selecetedElement.vtypeDD = '';
      this.legderDisabled = true;
    } else {

      this.getLedgerBasedOnGroupId(this.group);
      console.log(this.tableData, 'tableData');

      // this.tableData = JSON.parse(JSON.stringify(this.tableData));
      this.legderDisabled = false;
    }
  }
  onEdit() {

  }
  trustAndEstateGlIsValid() {
    debugger
    this.errorTrue = false;
    if (this.e.valid) {


    }
    else {
      this.errorTrue = true;
    }
  }
  createCashCounterSearch() {
    this.apiService
      .createCashCounterSearch()
      .subscribe((success: any) => {
        this.searchParams = success;
        this.searchParams.pageNumber = this.pagination.pageNumber;
        this.searchParams.pageSize = this.pagination.pageSize;
        this.searchCashCounter();
      });
  }

  searchCashCounter() {
    // this.searchParams.regionValue = ''

    this.apiService
      .searchCashCounter(this.searchParams)
      .subscribe((success: any) => {
        this.pagination.pageNumber = success.pageNumber;
        this.pagination.pageSize = success.pageSize;
        this.pagination.totalCount = success.totalCount;
        // this.tableData = success.ilstentCashCounterSearchSet;
        // this.totalCount = success.totalCount;
        // this.pageSize = success.pageSize;
        // this.pageIndex = success.pageNumber - 1;
        // this.overlayService.detachSearchboxAll();

      });
  }
  onSearch() {
    this.searchParams.pageNumber = 1;
    this.searchCashCounter();
    this.appSearch?.close()
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchCashCounter();
  }
  tabClick(tab: any) {
    this.errorTrue = false;
    this.tabIndex = tab;
    if (this.tabIndex === 1) {
      // this.createCashCounterNotes();
    }
  }
  async navigateToDetail(cashCounterId: any) {

    const obj = {
      data: cashCounterId,
    };
    let urlJson = await this.urlService.encode(obj);
    if (Number(cashCounterId) > 0) {
      this.router.navigateByUrl(
        '/home/finance/cash-counter/detail/' + urlJson
      );
    }
    else {
      const obj = {
        data: 0,
        clicked: true,
      };
      let urlJson = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/finance/cash-counter/info/' + urlJson
      );
    }

  }

  clear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW))
    this.createCashCounterSearch();
    this.data.successMessage('Data Cleared Successfully');
  }
  clearLedger() {
    this.ledgers = [];
    this.getLedgerBasedOnGroupId(this.group);
  }

  statusSortSearch(val: any) {
    this.searchParams.statusValue = val;
    this.searchCashCounter()
  }

}
