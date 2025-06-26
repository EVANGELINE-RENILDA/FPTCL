import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { AppToolTipComponent, InnerScroll, Row, ViewLabel } from "../../../app-core/core-component/core-component.component";
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from "../../../app-core/template/app-table/app-table.component";
import { IconButtonComponent } from "../../../app-core/template/icon-button/icon-button.component";
import { FormsModule, NgForm } from "@angular/forms";
import { InputControlComponent } from "../../../app-core/form-input/input-control/input-control.component";
import { AppDatePipe } from "../../../common/pipes/app-date/app-date.pipe";
import { AppAccessDirective } from "../../../common/permission/app-access.directive";
import { ButtonAccessDirective } from "../../../common/permission/button-access.directive";
import { CashCounterInfoComponent } from "../../finance/cash-counter/cash-counter-info/cash-counter-info.component";
import { entEvent, entEventSearch, entEventSearchResult } from "../../../common/api-services/application-api/application-api.classes";
import { CoreService } from "../../../app-core/service/core.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../../app.service";
import { SearchComponent } from "../../../app-core/template/search/search.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TableStatusSortComponent } from "../../../app-core/table-status-sort/table-status-sort.component";
import { AccoutsStatusTableComponent } from "../../../app-core/template/accouts-status-table/accouts-status-table.component";
import { entActVoucherConfig } from "../../../common/api-services/accounts-api/accounts-api.classes";
import { InitialDataService } from "../../../common/services/initial-data/initial-data.service";
import { AppStorageService } from "../../../common/services/app-storage/app-storage.service";
import { DataService } from "../../../common/services/data/data.service";
import { ApplicationApiService } from "../../../common/api-services/application-api/application-api.service";
import { UrlService } from "../../../common/services/url/url.service";
import { AccountsApiService } from "../../../common/api-services/accounts-api/accounts-api.service";
import { AppSettingsService } from "../../../common/services/app-settings/app-settings.service";
import { ErrorInfoComponent } from "../../../app-core/error-info/error-info.component";
import { ErrorMessageComponent } from "../../../app-core/message/error-message/error-message.component";
@Component({
  selector: 'app-event-sub-event-creation',
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
    FormsModule, CommonModule,
    AppAccessDirective,
    ButtonAccessDirective,
    AppToolTipComponent,
    MatTooltipModule,
    TableStatusSortComponent,
    AppDatePipe,
    AccoutsStatusTableComponent,
    CashCounterInfoComponent,
    ViewLabel, ErrorInfoComponent, ErrorMessageComponent,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './event-sub-event-creation.component.html',
  styleUrl: './event-sub-event-creation.component.scss'
})
export class EventSubEventCreationComponent implements OnInit, AfterViewInit {
  pageId = 'FUDTN';
  voucherId = 0;
  voucherConfigId = 0;
  regionValue = '';
  eventFlag = ''
  parentEventDescription = ''
  parentID = 0;
  subEventFlag = ''
  tab = 0;
  viewEventCreationDetails: boolean = false;
  searchParams = new entEventSearch();
  searchParamsRAW = new entEventSearch();
  searchResult = new entEventSearchResult();
  event = new entEvent();
  voucherConfig = new entActVoucherConfig();

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  columns: any = [
    'eventName',
    'effectiveDate',
    'status',
    'action',
  ];
  columnsName: any = [
    'Event Name',
    'Created Date',
    'Status',
    'Action',
  ];
  subColumns: any = [
    'eventName',
    'status',
    'actionsub',
  ];
  subColumnsName: any = [
    'Event Name',
    'Status',
    'Action',
  ];

  eventHistoryColumns: any = [
    'event',
    'changedDate',
    'status',
    'actionHis',
  ]

  eventHistoryColumnsName: any = [
    'Event',
    'Changed Date',
    'Status',
    'Action',
  ]

  tableData: any = [];
  subEventTable = [];
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
  @ViewChild('eventCreation') eventCreation!: TemplateRef<any>;
  @ViewChild('subEventCreation') subEventCreation!: TemplateRef<any>;
  @ViewChild('x') xform!: NgForm;
  @ViewChild('y') yform!: NgForm;
  JSON: any;
  dateFormat: any
  eventHistory: any;
  isSearchButtonClicked = false;

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
    this.currentDate = this.appService.getCurrentDate();
    this.dateFormat = this.appSetting.environment.dateViewFormat;
    await this.initialData.getDDL(
      'getInitialDataForEvent', this.options
    );
    this.createNewEventSearch();
  }

  createNewEventSearch() {
    this.apiService
      .createNewEventSearch()
      .subscribe((success: any) => {
        this.searchParams = success;
        this.searchParams.pageNumber = this.pagination.pageNumber;
        this.searchParams.pageSize = this.pagination.pageSize;
        this.searchEvent();
      });
  }

  searchEvent() {
    this.subEventTable = [];
    this.apiService
      .searchEvent(this.searchParams)
      .subscribe((success: any) => {
        this.tableData = success.result;
        this.pagination.pageNumber = success.pageNumber;
        this.pagination.pageSize = success.pageSize;
        this.pagination.totalCount = success.totalCount;

      });
  }

  onSearch() {
    this.searchParams.pageNumber = 1;
    this.searchEvent();
    this.parentEventDescription = '';
    this.appSearch?.close()

    if (this.isSearchButtonClicked) {
      this.data.successMessage('Search Executed Successfully');
      this.isSearchButtonClicked = false;
    }
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
    this.searchEvent();
  }


  createNewEvent() {
    this.apiService.createNewEvent().subscribe((success) => {
      this.event = success;
    })
  }

  openEvent(id: any, type?: any) {
    const obj = {
      data: id
    }
    this.event.eventName = this.parentEventDescription;
    this.apiService.openEvent(obj).subscribe((success) => {
      this.event = success;
      if (type === 'refresh') {
        this.data.successMessage('Data Refreshed Successfully')
      } else {
        this.data.successMessage(success.msg.infoMessage.msgDescription)
      }
    })
  }

  clear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW))
    this.createNewEventSearch();
    this.parentEventDescription = '';
    this.data.successMessage('Data Cleared Successfully');
  }

  openSubEvent(eventID: any, eventName = '') {
    if (eventID > 0) {
      this.parentID = eventID;
      this.parentEventDescription = eventName;
      const subEventSearchParams = { ...this.searchParams, parentEventId: eventID };
      this.apiService.searchEvent(subEventSearchParams).subscribe((success) => {
        this.subEventTable = success.result;
        this.event.eventName = this.parentEventDescription;
      });
    }
  }

  eventPopUP(id: any) {
    if (id > 0) {
      this.eventFlag = 'Edit'
      this.openEvent(id);
    } else if (id === 0) {
      this.eventFlag = 'New'
      this.data.showErrorMessage = false;
      this.createNewEvent();
      // this.clearAll();
    }
    this.openDialog(id);
  }


  async openDialog(val: any) {
    this.data.showErrorMessage = false;
    this.tab = 0;

    let dialogResponse: any = await this.dialog.openDialog(this.eventCreation, {
      disableClose: true,
      width: '950px',
      height: '480px',
      maxWidth: '1170px',
      data: {
        data: val,
        clicked: true,
      }
    });
  }

  openSubEventPopUp(subEventID: any) {
    if (!this.parentEventDescription || this.parentEventDescription.trim() === '') {
      this.data.errorInfoMessage('Please Select any Event');
      return;
    }

    if (this.parentID !== 0) {
      if (subEventID > 0) {
        this.subEventFlag = 'Edit';
        this.openEvent(subEventID);
      } else if (subEventID === 0) {
        this.subEventFlag = 'New';
        this.data.showErrorMessage = false;
        this.createNewEvent();

        // this.clearAll();
      }
      this.openSubEventDialog(subEventID);
    } else {
      this.data.errorInfoMessage('Please Select any Event');
    }
  }


  async openSubEventDialog(val: any) {
    this.tab = 0;
    this.data.showErrorMessage = false;

    let dialogResponse: any = await this.dialog.openDialog(this.subEventCreation, {
      disableClose: true,
      width: '950px',
      height: '480px',
      maxWidth: '1170px',
      data: {
        data: val,
        clicked: true,
      }
    });
  }
  saveEventCreation() {
    this.errorTrue = false;
    if (this.xform.valid) {
      this.apiService.saveEvent(this.event).subscribe((success) => {
        this.data.showErrorMessage = false;
        this.event = success;
        this.dialog.closeDialog();
        this.searchEvent();
        this.parentEventDescription = '';
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true;
    }


  }

  saveSubEventCreation() {
    this.errorTrue = false;
    if (this.yform.valid) {
      this.event.parentEventId = this.parentID
      this.apiService.saveEvent(this.event).subscribe((success) => {
        this.data.showErrorMessage = false;
        this.subEventTable = success.plstentEvent;
        this.dialog.closeDialog();
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true;
    }
  }




  // clearAll() {
  //   this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
  // }

  openEventCreationBox() {
    this.viewEventCreationDetails = true
  }

  openStatusValue(val: any) {
    this.tab = val;
    if (this.event.lstentEventUpdatetHistory.length > 0) {
      let value = this.event.lstentEventUpdatetHistory[0];

      this.eventOldData = value;
      if (value.oldValue !== null && value.oldValue !== '') {
        let ExistingData1: any = JSON.parse(value.oldValue);
        this.eventInitalOldData = ExistingData1;
        console.log(this.eventInitalOldData);
      }
    }
  }

  eventInitalOldData: any;
  eventOldData: any;

  getOldValues(val: any) {
    this.eventOldData = val;

    if (val.oldValue !== null && val.oldValue !== '') {
      let ExistingData1: any = JSON.parse(val.oldValue);
      this.eventInitalOldData = ExistingData1;
      console.log(this.eventOldData);
    }
  }
  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus')
  }
}
