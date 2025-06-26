import {
  CUSTOM_ELEMENTS_SCHEMA,
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
  ViewLabel,
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
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { entEvent, entPostingMatrixConfiguration, entPostingMatrixConfigurationList, entPostingMatrixConfigurationSearch, entPostingMatrixConfigurationSearchResult, entPostingMatrixConfigurationUpdateHistory } from '../../../../common/api-services/application-api/application-api.classes';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { PaginatorComponent } from '../../../../app-core/template/app-table/paginator/paginator.component';
import { CommonModule, DecimalPipe, NgClass } from '@angular/common';
import { StatusHistoryComponent } from "../../../../app-core/template/status-history/status-history.component";
import { ErrorInfoComponent } from '../../../../app-core/error-info/error-info.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';


@Component({
  selector: 'app-posting-matrix-search',
  standalone: true,
  imports: [
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    IconButtonComponent,
    InnerScroll,
    InputControlComponent,
    SearchComponent,
    Row, CommonModule,
    FormsModule,
    AppAccessDirective,
    ButtonAccessDirective,
    AppToolTipComponent,
    MatTooltipModule,
    TableStatusSortComponent,
    AppDatePipe,
    DecimalPipe,
    AccoutsStatusTableComponent,
    PaginatorComponent,
    StatusHistoryComponent,
    ViewLabel,
    ErrorInfoComponent, ErrorMessageComponent,
    NgClass
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './posting-matrix-search.component.html',
  styleUrl: './posting-matrix-search.component.scss'
})
export class PostingMatrixSearchComponent implements OnInit {

  pageId = 'FUDTN';
  voucherId = 0;
  voucherConfigId = 0;
  regionValue = '';
  totalCount = 0;
  tab = 0;
  openFlag = '';
  mandatoryMessage: string = '';
  searchParams = new entPostingMatrixConfigurationSearch();
  searchParamsRAW = new entPostingMatrixConfigurationSearch();
  searchResult = new entPostingMatrixConfigurationSearchResult();
  event = new entEvent();
  viewPostMatrixDetails: boolean = false;
  postMatrixConfig = new entPostingMatrixConfiguration();
  postMatrixConfigList = new entPostingMatrixConfigurationList();
  PostingMatrixConfigurationId = 0;

  subColumns: any = [
    'voucherTypeDescription',
    'configurationDescription',
    'changedDate',
    'statusDescription',
    'action'
  ];

  subColumnsName: any = [
    'Voucher Type',
    'Description',
    'Changed Date',
    'Status',
    'Action'
  ];

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('postingMatrix') postingMatrix!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('p') pform!: NgForm;
  @ViewChild('i') iForm!: NgForm;

  dateFormat: any

  percentageValue = '';
  // percentageDDL = [
  //   {
  //     constant: 'on',
  //     description: 'ON'
  //   },
  //   {
  //     constant: 'between',
  //     description: 'Between Percentage'
  //   },
  //   {
  //     constant: 'bwv',
  //     description: 'Between Percentage And Value'
  //   },
  //   {
  //     constant: 'value',
  //     description: 'Value'
  //   },
  //   {
  //     constant: 'na',
  //     description: 'Not Applicable'
  //   }
  // ]

  columns: any = [
    'branchName',
    'counterNo',
    'counterName',
    'effectiveDate',
    'status',
    'action',
  ];
  columnsName: any = [
    'Branch Name',
    'Counter No',
    'Counter Name',
    'Effective Date',
    'Status',
    '',
  ];
  tableData1: any = [];
  tableData: any = [];

  totalInprogressCount: any = '';
  totalApprovedCount: any = '';
  regionValueDDL = [];
  options = {
    type: 'applicationPath'
  }

  idList: any = [];
  currentDate = '';
  isSelectedAll = false;
  isSearchButtonClicked = false;
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
    public appSetting: AppSettingsService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {

    await this.data.checkToken();
    await this.initialData.getDDL(
      'getInitialDataForPostingMatrixConfiguration', this.options
    )
    this.dateFormat = this.appSetting.environment.dateViewFormat;
    this.createNewPostingMatrixConfigurationSearch();
  }

  createNewPostingMatrixConfigurationSearch() {
    this.apiService
      .createNewPostingMatrixConfigurationSearch()
      .subscribe((success: any) => {
        this.searchParams = success;
        this.searchParams.pageNumber = this.pagination.pageNumber;
        this.searchParams.pageSize = this.pagination.pageSize;
        this.searchPostingMatrixConfiguration();
      });
  }

  createPostingMatrixConfiguration() {
    this.apiService.createPostingMatrixConfiguration().subscribe((success: any) => {
      this.postMatrixConfig = success;

      this.postMatrixConfig.percentageTypeValue = '';
      this.percentageValue = '';
    });
  }

  searchPostingMatrixConfiguration() {
    this.apiService
      .searchPostingMatrixConfiguration(this.searchParams)
      .subscribe((success: any) => {
        this.tableData = this.formatData(success.searchResult);
        this.pagination.pageNumber = success.pageNumber;
        this.pagination.pageSize = success.pageSize;
        this.pagination.totalCount = success.totalCount;
      });
  }

  openPostingMatrixConfiguration(id: any, type?: any) {
    const obj = {
      data: id
    }
    this.apiService
      .openPostingMatrixConfiguration(obj)
      .subscribe((success: any) => {
        this.postMatrixConfig = success;
        this.checkType(this.postMatrixConfig.percentageTypeValue);
        if (type === 'refresh') {
          this.data.successMessage('Data Refreshed Successfully')
        } else {
          this.data.successMessage(success.msg.infoMessage.msgDescription)
        }
      });
  }

  percentageError: boolean = false;

  // validatePercentage() {
  //   const primaryPercentage = Number(this.postMatrixConfig.primaryPercentageValue);
  //   const secondaryPercentage = Number(this.postMatrixConfig.secondaryPercentageValue);

  //   if (primaryPercentage >= secondaryPercentage) {
  //     this.percentageError = true;
  //   } else {
  //     this.percentageError = false;
  //   }
  // }

  savePostingMatrixConfiguration() {
    if (!this.pform.valid) {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill in all the mandatory fields');
      return;
    }

    // this.validatePercentage();
    // if (this.percentageValue === 'BETPG') {
    //   this.validatePercentage();
    //   if (this.percentageError) {
    //     this.data.errorInfoMessage('Primary Percentage must be less than Secondary Percentage');
    //     return;
    //   }
    // }

    // if (this.percentageValue === 'BTWPV') {
    //   this.validatePercentage();
    //   if (this.percentageError) {
    //     this.data.errorInfoMessage('Primary Percentage must be less than Secondary Percentage');
    //     return;
    //   }
    // }

    this.errorTrue = false;
    this.apiService.savePostingMatrixConfiguration(this.postMatrixConfig).subscribe((success: any) => {
      this.tableData = success.ilstentPostingMatrixConfiguration;
      this.onSearch();
      this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.dialog.closeDialog();
    });
  }

  onPercentageValueChange(value: string) {
    this.percentageValue = value;
    this.resetPercentageValues();

    if (value === 'NA') {
      this.postMatrixConfig.vatValue = 'NA';
    }
  }

  resetPercentageValues() {
    this.postMatrixConfig.primaryPercentageValue = '0';
    this.postMatrixConfig.secondaryPercentageValue = '0';
    this.postMatrixConfig.rangeValue = '0';
    this.postMatrixConfig.addedValue = '0';
  }


  onSearch() {
    this.searchParams.pageNumber = 1;
    this.searchPostingMatrixConfiguration();
    this.appSearch?.close()

    if (this.isSearchButtonClicked) {
      this.data.successMessage('Search Executed Successfully');
      this.isSearchButtonClicked = false;
    }
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    // console.log(this.__selectedItems);
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.isortcolumn = event.sortColumnName;
    this.searchParams.isortorder = event.sortOrder;

    this.searchPostingMatrixConfiguration();
  }

  openPostingMatrixBox() {
    this.viewPostMatrixDetails = true
  }

  async navigateToDetail(id: any) {

    const obj = {
      data: id,
    };
    let urlJson = await this.urlService.encode(obj);
    if (Number(id) > 0) {
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

  // primaryValCount = 0
  // maxPrimary(val: any) {
  //   this.primaryValCount = Number(val)
  // }

  // secondaryValCount = 0
  // minSecondary(val: any) {
  //   this.secondaryValCount = Number(val)
  // }

  matrixPopUp(id: any) {
    if (id > 0) {
      this.openFlag = "Edit"
      this.openPostingMatrixConfiguration(id);
    } else if (id === 0) {
      this.openFlag = "New"
      this.createPostingMatrixConfiguration();
    }
    this.openMatrixDialog();
  }

  openMatrixDialog() {
    this.tab = 0;

    this.dialog.openDialog(this.postingMatrix, {
      width: '1100px',
      height: '500px',
      // position: 'static'
    })
  }

  clearAdd() {
    this.errorTrue = false;

    if (this.openFlag === 'New') {
      this.createPostingMatrixConfiguration();
      this.data.successMessage('Data Cleared Successfully');
    }
  }
  clearSearch() {
    this.percentageValue = '';
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.searchPostingMatrixConfiguration();
    this.data.successMessage('Data Cleared Successfully');
  }

  statusSortSearch(val: any) {
    this.searchParams.statusValue = val;
    this.searchPostingMatrixConfiguration();
  }

  openStatusValue(val: any) {
    // debugger
    this.tab = val;
    if (this.postMatrixConfig.plstentPostingMatrixConfigurationUpdateHistory.length > 0) {
      let value = this.postMatrixConfig.plstentPostingMatrixConfigurationUpdateHistory[0];

      this.voucherOldData = value;
      if (value.oldValue !== null && value.oldValue !== '') {
        let ExistingData1: any = JSON.parse(value.oldValue);
        this.voucherInitalOldData = ExistingData1;
        console.log(this.voucherInitalOldData);
      }
    }
  }

  checkType(val: any) {
    this.errorTrue = false;
    this.percentageValue = val;
  }

  voucherInitalOldData: any;
  voucherOldData: any;

  getOldValues(val: any) {
    this.voucherOldData = val;

    if (val.oldValue !== null && val.oldValue !== '') {
      let ExistingData1: any = JSON.parse(val.oldValue);
      this.voucherInitalOldData = ExistingData1;
      console.log(this.voucherOldData);
    }
  }

  formatData(data: any[]): any[] {
    return data.map(item => {
      return {
        ...item,
        primaryPercentageValue: item.primaryPercentageValue === 0 ? '-' : item.primaryPercentageValue,
        secondaryPercentageValue: item.secondaryPercentageValue === 0 ? '-' : item.secondaryPercentageValue,
        rangeValue: item.rangeValue === 0 ? '-' : item.rangeValue,
        addedValue: item.addedValue === 0 ? '-' : item.addedValue
      };
    });
  }
  dialogClose() {
    this.data.showErrorMessage = false;
    this.dialog.closeDialog()
  }
  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus')
  }
}
