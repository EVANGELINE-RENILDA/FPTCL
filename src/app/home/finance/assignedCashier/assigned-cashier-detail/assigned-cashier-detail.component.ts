import { NgClass, CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
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
} from '../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AppTableComponent } from '../../../../app-core/template/app-table/app-table.component';
import { DocumentsComponent } from '../../../../app-core/template/documents/documents.component';
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
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import {
  entActAttachments,
  entActFundTransferNote,
  entActNotes,
  entActVoucherConfig,
} from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { ViewPdfComponent } from '../../../../app-core/template/view-pdf/view-pdf.component';
import { SearchDebitComponent } from '../../../search/search-debit/search-debit.component';
import { SearchCreditComponent } from '../../../search/search-credit/search-credit.component';
import { FilterAndSortPipe } from '../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { AppSafePipe } from '../../../../common/pipes/app-safe/app-safe.pipe';
import { TimeControlComponent } from '../../../../app-core/form-input/time-control/time-control.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import {
  entCashCounter,
  entCashCounterAssignedCashier,
} from '../../../../common/api-services/application-api/application-api.classes';
import { AssignedCashierInfoComponent } from '../assigned-cashier-info/assigned-cashier-info.component';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';

@Component({
  selector: 'app-assigned-cashier-detail',
  standalone: true,
  imports: [
    NgClass,
    Row,
    ViewLabel,
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
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './assigned-cashier-detail.component.html',
  styleUrl: './assigned-cashier-detail.component.scss',
})
export class AssignedCashierDetailComponent {
  errorTrue = false;
  selectedTab = 0;
  selectedSubTab = 0;
  pageId = 'ASCAS';
  initialLoad = true;
  id = 0;
  branchName = '';

  assignedCashier = 0;
  secondTabIndex = 0;
  cashCounter = new entCashCounter();
  assignCashCounterdetail = new entCashCounterAssignedCashier();
  assignedCashierEdit = false;
  assignedCashierAdd = false;
  asssignedCashierDDL: any = [];
  assignedCashierHistory: any = [];
  assignedCashierHistoryColumns: string[] = [
    'status',
    'changedBy',
    'changedDate',
  ];
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('assignedCashierEditDialog')
  assignedCashierEditDialog!: TemplateRef<any>;
  @ViewChild('notesDialog') notesDialog!: TemplateRef<any>;
  edit = true;
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
    public storage: AppStorageService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.init();
    });
  }

  ngOnInit(): void {}
  @ViewChild('l') lform!: NgForm;
  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    await this.data.checkToken();
    this.id = params.id;
    await this.initialData.getDDL('getDDLStatus');
    await this.initialData.getDDL('getCashCounterInitialData');
    await this.storage.get('branchFinance').then((val) => {
      this.branchName = val;
    });
    this.openAssignedofficer(this.id);
  }
  openAssignedofficer(val: number) {
    ;
    const obj = {
      data: val,
    };
    this.apiDataService
      .openCashCounterForAssignedCashier(obj)
      .subscribe((success) => {
        if (success.ilstCashCounterAssignedCashier.length === 0) {
          this.edit = false;
        }
        this.cashCounter = success;
        if (this.cashCounter.ilstCashCounterAssignedCashier.length !== 0) {
          this.openAssignedCashierDetail(
            this.cashCounter.ilstCashCounterAssignedCashier[0]
              .cashCounterAssignedCashierId
          );
          if (!!success.msg?.infoMessage) {
            this.data.successMessage(success.msg.infoMessage.msgDescription);
          }
        } else {
          this.initialLoad = false;
        }
        this.getDDlAssignedCashier();
      });
  }
  getDDlAssignedCashier() {
    const obj = {
      data: this.cashCounter.branchValue,
    };
    this.apiDataService.getDDlAssignedCashier(obj).subscribe((success) => {
      this.asssignedCashierDDL = success.value;
      if (!!success.msg?.infoMessage) {
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      }
    });
  }
  openAssignedCashierDetail(val: any) {
    this.assignedCashier = val;
    const obj = {
      data: val,
    };
    this.apiDataService
      .openCashCounterAssignedCashier(obj)
      .subscribe((success) => {
        this.assignCashCounterdetail = success;
        this.initialLoad = false;
        this.assignedCashierHistory =
          success.lstentCashCounterAssignedCashierHistory;
        if (!!success.msg?.infoMessage) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        }
      });
  }
  refereseAssignedCasier() {
    this.openAssignedCashierDetail(this.assignedCashier);
  }

  async addAssignedCashier() {
    this.selectedSubTab = 0;
    this.apiDataService
      .createCashCounterAssignedCashier()
      .subscribe((success) => {
        this.edit = false;
        this.assignCashCounterdetail = success;
        this.errorTrue = false;
        this.assignedCashierAdd = true;
        this.assignedCashierEdit = true;
        if (!!success.msg?.infoMessage) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        }
      });
  }
  doEdit() {
    this.assignedCashierAdd = true;
    this.assignedCashierEdit = true;

    this.edit = false;
  }
  saveAssignedCasier() {
    ;
    if (this.lform.valid) {
      this.assignCashCounterdetail.cashCounterId =
        this.cashCounter.cashCounterId;
      this.apiDataService
        .saveCashCounterAssignedCashier(this.assignCashCounterdetail)
        .subscribe((success) => {
          this.edit = true;
          this.cashCounter = success;
          if (this.assignCashCounterdetail.cashCounterAssignedCashierId !== 0) {
            this.openAssignedCashierDetail(
              this.assignCashCounterdetail.cashCounterAssignedCashierId
            );
          } else {
            if (this.cashCounter.ilstCashCounterAssignedCashier.length > 0) {
              this.openAssignedCashierDetail(
                this.cashCounter.ilstCashCounterAssignedCashier[
                  this.cashCounter.ilstCashCounterAssignedCashier.length - 1
                ].cashCounterAssignedCashierId
              );
            }
          }

          this.assignedCashierEdit = true;
          if (!!success.msg?.infoMessage) {
            this.data.successMessage(success.msg.infoMessage.msgDescription);
          }
        });
    } else {
      this.errorTrue = true;
    }
  }
  async viewCashier() {
    this.openDialog(this.id);
  }

  cashierNameSet(val: any) {
    if (val) {
      this.asssignedCashierDDL.forEach((element: any) => {
        if (val === element.id) {
          this.assignCashCounterdetail.cashierName = element.fullName;
        }
      });
    }
  }
  doClear() {
    this.addAssignedCashier();
    this.data.successMessage('Data cleared Successfully');
  }

  hideBtnBasedonStatus() {
    let hideButton = false;
    if (this.cashCounter.statusValue === 'APRVD') {
      hideButton = false;
    } else {
      hideButton = true;
    }
    return hideButton;
  }
  secondTabClick(tab: any) {
    this.errorTrue = false;
    this.secondTabIndex = tab.index;
    if (tab.index === 1) {
      this.errorTrue = false;
    }
  }
  tabClick(tab: any) {
    this.errorTrue = false;
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async onSelectTab(val: any) {
    this.selectedTab = val;
    if (val === 3) {
      // await this.viewfundTransferNoteReceipt();
    }
  }
  async onSelectSubTab(val: any) {
    this.selectedSubTab = val;
    // if (val === 3) {
    //   await this.viewfundTransferNoteReceipt();
    // }
  }

  navigateToList() {
    ;
    this.router.navigateByUrl('/home/finance/assigned-cashier/search');
  }

  async openDialog(id: any) {
    await this.dialog.openDialog(AssignedCashierInfoComponent, {
      disableClose: true,
      height: '350px',
      width: '500px',
      maxWidth: '1170px',
      data: {
        id: id,
      },
    });
  }
  async openNotesDialog() {
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: '380px',
      width: '650px',
      maxWidth: '1170px',
    });
  }
  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus');
  }
}
