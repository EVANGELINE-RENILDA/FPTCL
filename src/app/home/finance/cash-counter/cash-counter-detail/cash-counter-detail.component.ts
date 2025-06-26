import { NgClass, CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import {
  Row,
  ViewLabel,
  InnerScroll,
  AppToolTipComponent,
  LabelDash,
} from '../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AppTableComponent } from '../../../../app-core/template/app-table/app-table.component';
import { DropZoneComponent } from '../../../../app-core/template/drop-zone/drop-zone.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { ViewPdfComponent } from '../../../../app-core/template/view-pdf/view-pdf.component';
import { SearchDebitComponent } from '../../../search/search-debit/search-debit.component';
import { SearchCreditComponent } from '../../../search/search-credit/search-credit.component';
import { FilterAndSortPipe } from '../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { AppSafePipe } from '../../../../common/pipes/app-safe/app-safe.pipe';
import { TimeControlComponent } from '../../../../app-core/form-input/time-control/time-control.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  entCashCounter,
  entCashCounterAssignedOfficerHistory,
  entCashCounterNotes,
  entCashCounterTiming,
  entDepositSearchSet,
} from '../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { entCommunicationTracking } from '../../../../common/api-services/admin-api/admin-api.classes';
import { CashCounterInfoComponent } from '../cash-counter-info/cash-counter-info.component';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';

@Component({
  selector: 'app-cash-counter-detail',
  standalone: true,
  imports: [
    NgClass,
    Row,
    ViewLabel,
    LabelDash,
    TimeControlComponent,
    AppTableComponent,
    IconButtonComponent,
    InnerScroll,
    FormsModule,
    InputControlComponent,
    AppDatePipe,
    ErrorMessageComponent,
    AppAccessDirective,
    ButtonAccessDirective,
    AppToolTipComponent,
    FooterToggleDirective,
    MatMenuModule,
    DropZoneComponent,
    ViewPdfComponent,
    SearchDebitComponent,
    SearchCreditComponent,
    FilterAndSortPipe,
    ViewPdfComponent,
    AppSafePipe,
    CommonModule,
    MatCheckboxModule,
    CashCounterInfoComponent,AccoutsStatusTableComponent
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './cash-counter-detail.component.html',
  styleUrl: './cash-counter-detail.component.scss',
})
export class CashCounterDetailComponent {
  pageId = 'CCDSC';
  time = false;
  dayDescription = '';
  tabIndex = 0;
  editBtn = false;
  days: any = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  displayedColumns: any = ['note', 'enteredBy', 'enteredDate', 'status'];
  displayedColumns1: any = [
    'assignedOfficer',
    'assignedDate',
    'assignedBy',
    'status',
  ];
  displayedColumns2: any = ['name', 'startDate', 'endDate', 'status'];
  displayedColumns3: any = ['bookNo', 'effectiveDate', 'totalAmount', 'status'];
  displayedColumns4: any = ['status', 'changedDate', 'changedBy'];
  displayedColumns5: any = ['toEmailId', 'sendDate', 'statusDescription'];
  id = 0;
  cashCounterTimingSet: any;
  assignDDL: any = [];
  // cashCounterDetails = new entCashCounter();
  assignedOfficerHistory: any = [];
  assignedCashierHistory: any = [];
  depositBook: any = [];
  selfAssign = new entCashCounterAssignedOfficerHistory();
  statusHistory: any = [];
  emailHistory: any = [];
  notesList: any = {};
  cashCounterNotes = new entCashCounterNotes();
  assignedOfficer: any = [];
  DDLValues = [];
  errorTrue1 = false;
  cashCounter = new entCashCounter();
  cashCounterRAW = new entCashCounter();
  searchParams = new entDepositSearchSet();
  searchParamsRaw = new entDepositSearchSet();
  cashCounterTiming = new entCashCounterTiming();
  email = new entCommunicationTracking();
  errorTrue = false;
  branchName = '';
  branchId = 0;

  showReassign = false;
  initialLoad = true;
  initialLoadOne = true;
  initialLoadTwo = true;
  initialLoadThree = true;
  initialLoadFour = true;
  initialLoadFive = true;
  @ViewChild('l') l!: NgForm;
  options = {
    type: 'applicationPath',
  };
  branchvalue = '';
  filePath = '';
  selectedTab = 0;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('input', { static: false }) input!: InputControlComponent;
  @ViewChild('cashCounterEditDialog') cashCounterEditDialog!: TemplateRef<any>;
  @ViewChild('notesDialog') notesDialog!: TemplateRef<any>;
  btnEditable = false;
  branchDDL: any;
  constructor(
    public appService: AppService,
    public appSettings: AppSettingsService,
    public data: DataService,
    public initialData: InitialDataService,
    public apiDataService: ApplicationApiService,
    public url: UrlService,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: CoreService,
    public cdf: ChangeDetectorRef,
    public storage: AppStorageService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.init();
    });
  }

  ngOnInit(): void {}
  cashCounterEdit() {
    this.editBtn = true;
  }
  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    await this.data.checkToken();
    this.id = params.data;
    this.openCashCounter(this.id);
    // this.editBtn = this.dialogData.clicked;
    await this.initialData.getDDL('getCashCounterInitialData', this.options);
    await this.storage.get('branchFinance').then((val) => {
      this.branchName = val;
    });
    await this.storage.get('branchId').then((val) => {
      this.branchId = val;
    });
    await this.storage.get('branchDDL').then((val) => {
      this.branchDDL = val;
    });
    await this.storage.get('branchvalue').then((val) => {
      this.branchvalue = val;
    });
  }
  doClear() {
    this.cashCounter = JSON.parse(JSON.stringify(this.cashCounterRAW));
    this.createCashCounter();
  }
  createCashCounter() {
    this.apiDataService.createCashCounter().subscribe((success) => {
      this.cashCounter = success;
      if (!!success.msg?.infoMessage) {
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      }
    });
  }
  openCashCounter(val: any) {
    const obj = {
      data: val,
    };
    this.apiDataService.openCashCounter(obj).subscribe((success) => {
      this.cashCounter = success;
      this.initialLoad = false;
      this.initialLoadOne = false;
      this.initialLoadTwo = false;
      this.initialLoadThree = false;
      this.initialLoadFour = false;
      this.initialLoadFive = false;
      this.editBtn = true
      this.timePicker(success.plstCashCounterTiming[0]);
      if (success.plstCashCounterEmailHistory.length > 0) {
        this.email =
          success.plstCashCounterEmailHistory[0].ientCommunicationTracking;
      }
      this.assignedOfficerHistory =
        success.ilstCashCounterAssignedOfficerHistory;
      this.assignedCashierHistory = success.ilstCashCounterAssignedCashier;
      this.depositBook = success.plstCashCounterDepositBook;
      this.statusHistory = success.plstCashCounterStatusHistory;
      this.emailHistory = success.plstCashCounterEmailHistory;
      this.getCashCounterAssignedOfficerDDL();
      if (!!success.msg?.infoMessage) {
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      }
    });
  }
  clearTimer(val: any) {
    console.log('clearTimer');
    this.cashCounterTiming.startTime = '';
    this.cdf.detectChanges();
  }
  openCashCounterTiming() {
    this.errorTrue = false;
    this.cashCounterTiming = JSON.parse(
      JSON.stringify(this.cashCounterTimingSet)
    );
  }
  tabClick(tab: any) {
    this.errorTrue = false;
    this.tabIndex = tab;
    if (this.tabIndex === 1) {
      this.createCashCounterNotes();
    }
  }
  async editCashCounter() {
    this.openDialog(true);
  }

  async navigateToAssignedCashier(id: number) {
    const obj = {
      id: id,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl(
      '/home/finance/assigned-cashier/detail/' + urlJson
    );
  }

  async navigateToDepositBook(id: number) {
    const obj = {
      id: id,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl('/home/finance/deposit-book/detail/' + urlJson);
  }

  async showCashCounter() {
    this.editExistCashCounter();
  }
  createCashCounterNotes() {
    this.errorTrue = false;
    const obj = {
      data: this.cashCounter.statusValue,
    };
    this.apiDataService
      .createCashCounterNotes(obj)
      .subscribe((success: any) => {
        this.cashCounterNotes = success;
        this.DDLValues = success.ientDDL?.value;
        console.log(this.initialData.DDLValues, ' this.initialData.DDLValues');
        this.data.successMessage('Data Cleared Successfully');
      });
  }
  saveCashCounterNotes(l: any) {
    this.cashCounterNotes.cashCounterId = this.cashCounter.cashCounterId;
    if (l.valid) {
      this.apiDataService
        .saveCashCounterNotes(this.cashCounterNotes)
        .subscribe((success) => {
          this.cashCounter = success;
          this.cashCounterNotes.notes = '';
          this.assignedOfficerHistory =
            success.ilstCashCounterAssignedOfficerHistory;
          this.assignedCashierHistory = success.ilstCashCounterAssignedCashier;
          this.depositBook = success.plstCashCounterDepositBook;
          this.statusHistory = success.plstCashCounterStatusHistory;
          this.emailHistory = success.plstCashCounterEmailHistory;
          this.errorTrue = false;
          if (!!success.msg?.infoMessage) {
            this.data.successMessage(success.msg.infoMessage.msgDescription);
          }
        });
    } else {
      this.errorTrue = true;
    }
  }
  navigateToSearch() {
    this.router.navigateByUrl('/home/finance/cash-counter/search');
  }
  async getCashCounterAssignedOfficerDDL() {
    const obj = {
      data1: this.cashCounter.cashCounterId,
      data2: this.cashCounter.branchValue,
      data3: this.cashCounter.statusValue,
    };
    this.apiDataService
      .getListOfOfficerForCashCounter(obj)
      .subscribe((success: any) => {
        this.assignDDL = success.value;
        if (!!success.msg?.infoMessage) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        }
      });
  }
  async timePicker(day: any) {
    debugger
    this.errorTrue1 = false;
    this.dayDescription = day.dayDescription;
    this.cashCounterTiming = day;
    this.cashCounterTimingSet = JSON.parse(JSON.stringify(day));
    this.time = true;
  }

  clearNotes() {
    this.createCashCounterNotes();
  }

  saveCashCounterTiming() {
    if (this.validateTimes()) {
      this.cashCounterTiming.cashCounterId = this.cashCounter.cashCounterId;
      this.apiDataService
        .saveCashCounterTiming(this.cashCounterTiming)
        .subscribe(async (success) => {
          this.cashCounter.plstCashCounterTiming =
            success.lstentCashCounterTiming;
          this.cashCounterTiming = success.lentCashCounterTiming;
          this.cashCounterTimingSet = JSON.parse(
            JSON.stringify(this.cashCounterTiming)
          );
          if (!!success.msg?.infoMessage) {
            this.data.successMessage(success.msg.infoMessage.msgDescription);
            this.btnEditable = true;
          }
        });
    } else {
      this.errorTrue1 = true;
    }
  }

  validateTimes(): boolean {
    const startTime = this.convertToTime(this.cashCounterTiming.startTime);
    const endTime = this.convertToTime(this.cashCounterTiming.endTime);
    const breakStartTime = this.convertToTime(
      this.cashCounterTiming.breakStarttime
    );
    const breakEndTime = this.convertToTime(
      this.cashCounterTiming.breakEndtime
    );

    if (this.cashCounterTiming.isHoliday === 'Y') {
      return true;
    }

    if (!startTime || !endTime || !breakStartTime || !breakEndTime) {
      this.data.errorInfoMessage('Please provide all required time fields.');
      return false;
    }

    if (startTime >= endTime) {
      this.data.errorInfoMessage(
        'Work End Time must be after Work Start Time.'
      );
      return false;
    }

    if (breakStartTime <= startTime || breakEndTime >= endTime) {
      this.data.errorInfoMessage('Break time must be within working hours.');
      return false;
    }

    if (breakStartTime >= breakEndTime) {
      this.data.errorInfoMessage(
        'Break End Time must be after Break Start Time.'
      );
      return false;
    }

    return true;
  }

  convertToTime(time: string): Date | null {
    if (!time) return null;
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  initTimeControl(plstCashCounterTiming: any) {
    plstCashCounterTiming.forEach((element1: any) => {
      let startTime: any = element1.startTime.split(' ');
      let endTime: any = element1.endTime.split(' ');
      let breakStarttime: any = element1.breakStarttime.split(' ');
      let breakEndtime: any = element1.breakEndtime.split(' ');
      if (
        !!element1.startTime &&
        !!element1.endTime &&
        !!element1.breakStarttime &&
        !!element1.breakEndtime
      ) {
        element1.startTime = startTime[1];
        let startTimeMeridian: any = element1.startTime?.split(':');
        if (12 > parseFloat(startTimeMeridian[0])) {
          element1.startTime = element1.startTime.concat(' AM');
        } else {
          element1.startTime =
            '0' +
            (parseFloat(startTimeMeridian[0]) - 12).toFixed() +
            ':' +
            startTimeMeridian[1].concat(' PM');
        }
        element1.endTime = endTime[1];
        let endTimeMeridian: any = element1.endTime?.split(':');
        if (12 > parseFloat(endTimeMeridian[0])) {
          element1.endTime = element1.endTime.concat(' AM');
        } else {
          element1.endTime =
            '0' +
            (parseFloat(endTimeMeridian[0]) - 12).toFixed() +
            ':' +
            endTimeMeridian[1].concat(' PM');
        }
        element1.breakStarttime = breakStarttime[1];
        let breakStarttimeMeridian: any = element1.breakStarttime?.split(':');
        if (12 > parseFloat(breakStarttimeMeridian[0])) {
          element1.breakStarttime = element1.breakStarttime.concat(' AM');
        } else {
          element1.breakStarttime =
            '0' +
            (parseFloat(breakStarttimeMeridian[0]) - 12).toFixed() +
            ':' +
            breakStarttimeMeridian[1].concat(' PM');
        }
        element1.breakEndtime = breakEndtime[1];
        let breakEndtimeMeridian: any = element1.breakEndtime?.split(':');
        if (12 > parseFloat(breakEndtimeMeridian[0])) {
          element1.breakEndtime = element1.breakEndtime.concat(' AM');
        } else {
          element1.breakEndtime =
            '0' +
            (parseFloat(breakEndtimeMeridian[0]) - 12).toFixed() +
            ':' +
            breakEndtimeMeridian[1].concat(' PM');
        }
      }
    });
  }

  reAssigned() {
    if (this.cashCounter.reAssignFlag === true) {
      return true;
    } else {
      return false;
    }
  }

  selfAssigned() {
    if (this.cashCounter.selfAssignFlag === true) {
      return true;
    } else {
      return false;
    }
  }
  selfAssignApplicationAssignedHistory() {
    this.selfAssign.cashCounterId = this.id;
    this.selfAssign.statusValue = this.cashCounter.statusValue;
    this.apiDataService
      .selfAssignCashCounterAssignedHistory(this.selfAssign)
      .subscribe((success: any) => {
        this.cashCounter = success;
        this.assignedOfficerHistory =
          success.ilstCashCounterAssignedOfficerHistory;
        this.assignedCashierHistory = success.ilstCashCounterAssignedCashier;
        this.depositBook = success.plstCashCounterDepositBook;
        this.statusHistory = success.plstCashCounterStatusHistory;
        this.emailHistory = success.plstCashCounterEmailHistory;
        if (!!success.msg?.infoMessage) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        }
      });
  }

  reAssignApplicationAssignedHistory() {
    this.selfAssign.cashCounterId = this.id;
    this.selfAssign.statusValue = this.cashCounter.statusValue;
    this.apiDataService
      .reAssignCashCounterAssignedOfficer(this.selfAssign)
      .subscribe((success) => {
        this.cashCounter = success;
        this.assignedOfficerHistory =
          success.ilstCashCounterAssignedOfficerHistory;
        this.assignedCashierHistory = success.ilstCashCounterAssignedCashier;
        this.depositBook = success.plstCashCounterDepositBook;
        this.statusHistory = success.plstCashCounterStatusHistory;
        this.emailHistory = success.plstCashCounterEmailHistory;
        if (!!success.msg?.infoMessage) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        }
      });
  }
  showReassignButton(val: any) {
    if (val) {
      this.showReassign = true;
    }
  }
  viewMail(val: any) {
    this.email = val.ientCommunicationTracking;
  }
  hideBtnBasedonStatusTime() {
    let hideButton = false;
    if (
      (this.cashCounter.statusValue === 'PNDSU' ||
        this.cashCounter.statusValue === 'PEVRI') &&
      this.cashCounter.assignedOfficerFlag === true
    ) {
      hideButton = false;
    } else {
      hideButton = true;
    }
    return hideButton;
  }

  hideBtnBasedonPNDAPandAPRVD() {
    let hideButton = false;
    if (
      this.cashCounter.statusValue === 'PNDAP' ||
      this.cashCounter.statusValue === 'APRVD'
    ) {
      hideButton = true;
    } else {
      hideButton = false;
    }
    return hideButton;
  }

  hideBtnBasedonAPRVD() {
    let hideButton = false;
    if (this.cashCounter.statusValue === 'APRVD') {
      hideButton = true;
    } else {
      hideButton = false;
    }
    return hideButton;
  }

  hideBtnBasedonStatus() {
    let hideButton = false;
    if (
      (this.cashCounter.statusValue === 'PNDSU' ||
        this.cashCounter.statusValue === 'PEVRI' ||
        this.cashCounter.statusValue === 'PNDAP') &&
      this.cashCounter.assignedOfficerFlag === true
    ) {
      hideButton = false;
    } else {
      hideButton = true;
    }
    return hideButton;
  }

  isChecked(val: any) {
    this.errorTrue = false;
    if (val.checked) {
      this.cashCounterTiming.isHoliday = 'Y';
      this.clearCashCounterTiming();
    } else {
      this.cashCounterTiming.isHoliday = 'N';
    }
  }
  clearCashCounterTiming() {
    this.cashCounterTiming.startTime = '';
    this.cashCounterTiming.endTime = '';
    this.cashCounterTiming.breakStarttime = '';
    this.cashCounterTiming.breakEndtime = '';
    this.errorTrue1 = false;

    this.data.successMessage('Data Cleared Successfully');
  }
  async assignedCashierDetail(id: any) {
    const obj = {
      id: id,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl(
      '/home/finance/assigned-cashier/detail/' + urlJson
    );
  }
  async depositDetail(id: any) {
    const obj = {
      id: id,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl('/home/cashier/deposit-book/detail/' + urlJson);
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async onSelectTab(val: any) {
    this.selectedTab = val;
  }

  navigateToList() {
    this.router.navigateByUrl('/home/finance/cash-counter/search');
  }

  async openDialog(isClicked: any) {
    await this.dialog.openDialog(this.cashCounterEditDialog, {
      disableClose: true,
      height: '300px',
      width: '500px',
      maxWidth: '1170px',
      data: {
        data: this.id,
        clicked: true,
      },
    });
  }
  async editExistCashCounter() {
    await this.dialog.openDialog(this.cashCounterEditDialog, {
      disableClose: true,
      height: '300px',
      width: '500px',
      maxWidth: '1170px',
      data: {
        data: this.id,
        clicked: true,
      },
    });
  }
  async openNotesDialog() {
    await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: '380px',
      width: '650px',
      maxWidth: '1170px',
    });
  }

  //cashCounter
  @ViewChild('e') eform!: NgForm;
  async saveCashCounter() {
    debugger
    if (this.eform.valid) {
      this.cashCounter.branchId = this.branchId;
      this.cashCounter.branchValue = this.branchvalue;
      this.apiDataService
        .saveCashCounter(this.cashCounter)
        .subscribe(async (success) => {
          this.cashCounter = success;
          await this.dialog.closeAll();
          // if (!!success.msg?.infoMessage) {
          // await this.openCashCounter(success.cashCounterId);
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
          // }
        });
    } else {
      this.errorTrue = true;
    }
  }
  refreshCashCounter() {
    this.openCashCounter(this.cashCounter.cashCounterId);
  }

  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus');
  }
}
