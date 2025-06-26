import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass, JsonPipe, DecimalPipe } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TabContainerModule } from '../../../../app-core/app-template/tab-container/tab-container.module';
import { TabItemModule } from '../../../../app-core/app-template/tab-item/tab-item.module';
import {
  Row,
  ViewLabel,
  InnerScroll,
  AppToolTipComponent,
} from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { DocumentsComponent } from '../../../../app-core/template/documents/documents.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { MultiPageUrlComponent } from '../../../../app-core/template/multi-page-url/multi-page-url.component';
import { StatusHistoryComponent } from '../../../../app-core/template/status-history/status-history.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { CustomerServiceListComponent } from '../../../crm/customer-service/customer-service-list/customer-service-list.component';
import { CustomerUpdateListComponent } from '../../../crm/customer-update/customer-update-list/customer-update-list.component';
import { LeadListComponent } from '../../../crm/lead/lead-list/lead-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import {
  entActLedgerEntrySearch,
  entLedger,
  entLedgerBranchAccess,
  entLedgerLockHistory,
} from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { LedgerRouteService } from './ledger-route.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
// import { LedgerRouteService } from './ledger-route.service';

@Component({
  selector: 'app-ledger-detail',
  standalone: true,
  imports: [
    CdkAccordionModule,
    NgClass,
    AccordionModule,
    JsonPipe,
    Row,
    ViewLabel,
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    IconButtonComponent,
    CustomerServiceListComponent,
    LeadListComponent,
    MatProgressSpinnerModule,
    CustomerUpdateListComponent,
    InnerScroll,
    FormsModule,
    InputControlComponent,
    StatusHistoryComponent,
    AppDatePipe,
    MatSlideToggleModule,
    MultiPageUrlComponent,
    DocumentsComponent,
    ErrorMessageComponent,
    AppAccessDirective,
    ButtonAccessDirective,
    AppToolTipComponent,
    MatSlideToggleModule,
    TabContainerModule,
    TabItemModule,
    Row,
    MatMenuModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTooltipModule,
    DecimalPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './ledger-detail.component.html',
  styleUrl: './ledger-detail.component.scss',
})
export class LedgerDetailComponent {
  pageId = 'ALGSC';
  type = '';
  errorTrue = false;
  hideBranchBtn = false;
  branchAccessId = 0;
  ledgerLockId = 0;
  selectedTab = 0;
  totalCount = 0;
  pageIndex = 0;
  decimal = 2;
  indexHideShow: any = 0;
  DDLParentGroupName = [];
  groupledger = false;
  branchAccessStatus: any = [];
  ledgerLockStatus: any = [];

  ledgerData: any = {};
  groupData: any = {};
  breadCrumbTrust: any;

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
  };

  tempOpeningBalance: any = 0;
  tempClosingBalance: any = 0;
  tempRunningBalance: any = 0;
  ledgerddl = [];
  ledger = new entLedger();
  ledgerBranchAccess = new entLedgerBranchAccess();
  lockLedger = new entLedgerLockHistory();
  ledgerEntrySearch = new entActLedgerEntrySearch();

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('branchDialog') branchDialog!: TemplateRef<any>;
  @ViewChild('ledgerDialog') ledgerDialog!: TemplateRef<any>;

  entries: any = [
    'docNo',
    'docDate',
    'postedDate',
    'voucherName',
    'debitAmt',
    'creditAmt',
    'runningBal',
    'narration',
  ];
  entriesName: any = [
    'Document Number',
    'Document Date',
    'Posted Date',
    'Document Name',
    'Debit Amount (INR)',
    'Credit Amount (INR)',
    'Running Balance (INR)',
    'Narration',
  ];

  entriesTableData = [];

  branch: any = [
    // 'sno',
    'branchName',
    'effDate',
    'createdDate',
    'apprvDate',
    'statusDescription',
    'action',
  ];
  branchName: any = [
    // '#',
    'Brach Name',
    'Effective Date',
    'Created Date',
    'Approved Date',
    'Status',
    '',
  ];

  branchTableData = [];

  ledgerheader: any = [
    // 'sno',
    'lockTypeValue',
    'effDate',
    'endDate',
    'reqBy',
    'statusDescription',
    'action',
  ];
  ledgerName: any = [
    // '#',
    'Lock Type',
    'Effective Date',
    'End Date',
    'Requested By',
    'Status',
    '',
  ];

  ledgerTableData = [];
  currencyValue=''
  options = {
    type: 'accountsPath',
  };

  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public apiService: ApplicationApiService,
    public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public url: UrlService,
    public router: Router,
    public appService: AppService,
    private navLedgerService: LedgerRouteService,
    public storage: AppStorageService,

  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    await this.data.checkToken();
    console.log('added');
   
    let ledgerJson = this.route.snapshot.url[3].path;
    this.ledgerData = await this.url.decode(ledgerJson);
    let groupJson = this.route.snapshot.url[4].path;
    this.groupData = await this.url.decode(groupJson);
    console.log(this.groupData, this.ledgerData);

    await this.storage.get('currencyValue').then((val) => {
      console.log(val, 'currencyvalue');

      this.currencyValue = val;
    });
    this.storage.get('Region').then((val: any) => {
      console.log(val);
      if (val !== null || val !== undefined || val !== '') {
        this.breadCrumbTrust = val;
      }
    })
    if (this.ledgerData.actLedgerId === 0) {
      this.createNewLedger(this.ledgerData.regionValue);
    } else {
      this.type = 'edit';
      this.openLedger(this.ledgerData.actLedgerId);
    }

    await this.initialData.getAcccountsDDL('getLedgerInitialData');
  }

  async changeFiscalYear(fiscalYearId: any) {
    await this.openLedger(this.ledger.actLedgerId, fiscalYearId);
    this.showIndex(fiscalYearId);
  }

  createNewLedger(val: any) {
    this.errorTrue = false;
    const obj = {
      data: val,
    };
    this.accountsService.createNewLedger(obj).subscribe((success) => {
      this.ledger = success;
      if (this.groupData.actCompanyId !== 0) {
        this.groupledger = true;
      }
     
      if (this.ledgerData.groupNatureValue !== '') {
        this.ledger.natureOfGroup = this.ledgerData.groupNatureValue;
      }
      if (this.groupData.groupNatureValue !== '') {
        this.ledger.natureOfGroup = this.groupData.groupNatureValue;
      }

      this.getLedgerTypeBasedOnNtureofGroup();
      console.log(this.ledgerData);
      console.log(this.ledger.natureOfGroup + 'check1');

      this.ledger.regionValue = this.ledgerData.regionValue;
      if (this.groupData.actGroupId !== 0) {
        this.ledger.groupId = this.groupData.actGroupId;
        this.ledger.natureOfGroup = this.groupData.groupNatureValue;
      }
      this.getAllGroupByNature(this.ledger.natureOfGroup);
    });
  }

  getAllGroupByNature(val: any) {
    const obj = {
      data1: val,
      data2: this.ledger.regionValue,
    };
    this.accountsService.getAllGroupsByNature(obj).subscribe((success) => {
      this.DDLParentGroupName = success.data[0].value;
      console.log(this.DDLParentGroupName);
    });
  }

  async openLedger(val: any, fiscalYearId?: any) {
    this.ledger.natureOfGroup = this.ledgerData.groupNatureValue;
    const obj = {
      data1: val,
      data2: fiscalYearId,
    };
    this.accountsService.openLedger(obj).subscribe((success) => {
      this.ledger = success;
      this.getLedgerTypeBasedOnNtureofGroup();

      this.countryBasedOnProvince(
        this.ledger.lentActCompanyBranchBankDetail.iAddress.countryValue
      );
      this.entriesTableData =
        success.ientActLedgerEntrySearchResult.pActLedgerEntrySearchSet;
      this.pagination.pageNumber =
        success.ientActLedgerEntrySearchResult.pageNumber;
      this.pagination.pageSize =
        success.ientActLedgerEntrySearchResult.pageSize;
      this.pagination.totalCount =
        success.ientActLedgerEntrySearchResult.totalCount;
      this.branchTableData = success.ilistentLedgerBranchAccess;
      this.ledgerTableData = success.ilistentLedgerLockHistory;
      this.tempOpeningBalance = this.ledger.openingBalance;
      this.tempClosingBalance = this.ledger.closingBalance;
      this.tempRunningBalance = this.ledger.runningBalance;
      this.totalCount = success.ientActLedgerEntrySearchResult.totalCount;
      this.pageIndex = success.ientActLedgerEntrySearchResult.pageNumber - 1;
      this.getAllGroupByNature(this.ledger.natureOfGroup);
      this.showIndex(this.ledger.companyFiscalyearId);
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    });
  }

  saveAccountsGroup(l: any, type?: any) {
    if (l.valid) {
      this.errorTrue = false;
      this.ledger.currencyUsedValue=this.currencyValue;
      this.accountsService
        .saveActLedger(this.ledger)
        .subscribe(async (success) => {
          this.ledger = success;
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
          if (type === 'save') {
            let ledgerJson = await this.url.encode(success);
            let groupJson = await this.url.encode(this.groupData);
            this.router.navigateByUrl(
              '/home/finance/ledger/detail/' + ledgerJson + '/' + groupJson
            );
          }
          this.countryBasedOnProvince(
            this.ledger.lentActCompanyBranchBankDetail.iAddress.countryValue
          );
          this.lockLedger.actLedgerId = success.actLedgerId;

          if (success.actLedgerId > 0) {
            this.ledgerData.actLedgerId = success.actLedgerId;
            this.ledgerData.tabIndex = 1;
            // let ledgerJson = await this.url.encode(this.ledgerData);
            // let groupJson = await this.url.encode(this.groupData);
            // this.router.navigateByUrl(
            //   '/home/finance/ledger/detail/' +
            //   ledgerJson +
            //   '/' +
            //   groupJson
            // );

            // console.log('navigated');
            this.openLedger(this.ledgerData.actLedgerId);
          }
        });
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }

  navigateLedgerDetail(ledger: any) {
   
    const obj = {
      voucherId: ledger.voucherId,
      voucherTypeValue: ledger.voucherTypeValue,
    };
    this.navLedgerService.navigatePageBasedonLedgerEntries(obj);
  }

  searchLedgerEntry(val?: any) {
    this.ledgerEntrySearch.ilngActFiscalYearId =
      this.ledger.companyFiscalyearId;
    this.ledgerEntrySearch.ilngledgerId = this.ledgerData.actLedgerId;
    if (val !== '') {
      this.ledgerEntrySearch.openingBalance = val;
    }
    this.accountsService
      .searchLedgerEntry(this.ledgerEntrySearch)
      .subscribe((success) => {
        this.ledger.ientActLedgerEntrySearchResult.pActLedgerEntrySearchSet =
          success.pActLedgerEntrySearchSet;
        this.calculateAmount();
      });
  }

  async calculateAmount() {
    let finalClosingBalance: any = this.ledger.closingBalance;
    let differenceOpeningBalance: any = await this.returnOpeningBalance();
    finalClosingBalance =
      parseFloat(differenceOpeningBalance) +
      parseFloat(this.tempClosingBalance);
    this.ledger.closingBalance = Number(finalClosingBalance).toFixed(2);
    let finalRunningBalance: any =
      parseFloat(differenceOpeningBalance) +
      parseFloat(this.tempRunningBalance);
    this.ledger.runningBalance = Number(finalRunningBalance).toFixed(2);
  }

  returnOpeningBalance() {
    return new Promise((resolve) => {
      let tempOpeningBalance: any = this.assingnDecimal(
        this.tempOpeningBalance
      );
      let currentOpeningBalance: any = this.assingnDecimal(
        this.ledger.openingBalance
      );
      resolve(
        parseFloat(currentOpeningBalance) - parseFloat(tempOpeningBalance)
      );
    });
  }

  assingnDecimal(value: any) {
    if (value) {
      let xvalue = parseFloat(value).toFixed(this.decimal);
      return xvalue;
    } else {
      return 0.0;
    }
  }

  pageChanged(event: any) {
    this.ledgerEntrySearch.pageNumber = event.pageIndex + 1;
    this.ledgerEntrySearch.pageSize = event.pageSize;
    this.searchLedgerEntry(this.ledger.openingBalance);
  }

  showIndex(val: any) {
    const index = this.initialData.DDLValues.ConfigFiscalyearlist.map(
      (e: any) => e.id
    ).indexOf(val);
    this.indexHideShow = index;
  }

  createNewLedgerBranchAccess() {
    this.errorTrue = false;
    this.accountsService
      .createNewLedgerBranchAccess(this.options)
      .subscribe((success) => {
        this.ledgerBranchAccess = success;
        this.initialData.DDLValues.DDLBranchStatus = success.lddlData;
      });
  }

  saveLedgerBranchAccess(b: any) {
    this.ledgerBranchAccess.actLedgerId = this.ledger.actLedgerId;
    if (b.valid) {
      if (this.checkBoxValidation()) {
        this.errorTrue = false;
        this.accountsService
          .saveLedgerBranchAccess(this.ledgerBranchAccess)
          .subscribe((success) => {
            // this.ledgerBranchAccess = success;
            this.branchTableData = success.ilistentLedgerBranchAccess;
            this.data.successMessage(success.msg?.infoMessage?.msgDescription);
            this.dialog.closeDialog();
          });
      } else {
        this.data.errorInfoMessage('Please Select Any One Access Type');
      }
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }

  clearBranch() {
    this.errorTrue = false;
    this.createNewLedgerBranchAccess();
  }

  async openDialogBranch(id: any) {
    if (id === 0) {
      this.createNewLedgerBranchAccess();
    } else {
      this.openLedgerBranchAccess(id);
    }
    let dialogResponse: any = await this.dialog.openDialog(this.branchDialog, {
      disableClose: true,
      height: 'auto',
      width: '600px',
      maxWidth: '1170px',
    });
  }

  openLedgerBranchAccess(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService.openLedgerBranchAccess(obj).subscribe((success) => {
      this.ledgerBranchAccess = success;
      this.branchAccessStatus = success.ilistentLedgerBranchAccessStatusHistory;
      // this.statusSource = new MatTableDataSource(
      //   success.ilistentLedgerBranchAccessStatusHistory
      // );
      this.initialData.DDLValues.DDLBranchStatus = success.lddlData;
      if (
        this.ledgerBranchAccess.statusValue === 'APROV' ||
        this.ledgerBranchAccess.statusValue === 'REJCT'
      ) {
        this.hideBranchBtn = true;
      } else {
        this.hideBranchBtn = false;
      }
    });
  }

  isAllowed(event: any) {
    if (event.checked === true) {
      this.ledgerBranchAccess.isAllowed = 'Y';
      this.ledgerBranchAccess.isRestricted = 'N';
    } else {
      this.ledgerBranchAccess.isAllowed = 'N';
    }
  }

  isRestricted(event: any) {
    if (event.checked === true) {
      this.ledgerBranchAccess.isRestricted = 'Y';
      this.ledgerBranchAccess.isAllowed = 'N';
    } else {
      this.ledgerBranchAccess.isRestricted = 'N';
    }
  }

  async openDialogLedger(id: any) {
    if (id === 0) {
      this.createNewLedgerLock();
    } else {
      this.openLockLedger(id);
    }
    let dialogResponse: any = await this.dialog.openDialog(this.ledgerDialog, {
      disableClose: true,
      height: '300px',
      width: '600px',
      maxWidth: '1170px',
    });
  }

  createNewLedgerLock() {
    this.errorTrue = false;
    this.hideBranchBtn = false;
    this.accountsService
      .createNewLedgerLock(this.options)
      .subscribe((success) => {
        this.lockLedger = success;
        this.lockLedger.actLedgerId = this.ledger.actLedgerId;
        this.initialData.DDLValues.DDLBranchLockStatus = success.lddlData;
      });
  }

  saveLedgerLock(l: any) {
    if (l.valid) {
      this.accountsService
        .saveLedgerLock(this.lockLedger)
        .subscribe((success) => {
          this.ledgerTableData = success.lstentLedgerLockHistory;
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
          if (
            this.lockLedger.statusValue === 'APROV' ||
            this.lockLedger.statusValue === 'REJCT'
          ) {
            this.hideBranchBtn = true;
          } else {
            this.hideBranchBtn = false;
          }
          this.dialog.closeDialog();
        });
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }

  openLockLedger(val: any) {
    let obj = {
      data: val,
    };
    this.accountsService.openLedgerLock(obj).subscribe((success) => {
      this.lockLedger = success;
      this.initialData.DDLValues.DDLBranchLockStatus = success.lddlData;
      this.ledgerLockStatus = success.ilistentLedgerLockStatusHistory;
    });
  }

  // viewBranchStatus() {
  //   this.openLedgerBranchAccess(this.actLedgerBranchAccessId);
  // }

  // viewBranchLockStatus() {
  //   this.openLockLedger(this.actLedgerLockHistoryId);
  // }

  checkBoxValidation() {
    let checkedValue = false;
    if (
      this.ledgerBranchAccess.isAllowed === '' ||
      this.ledgerBranchAccess.isRestricted === '' ||
      (this.ledgerBranchAccess.isAllowed === 'N' &&
        this.ledgerBranchAccess.isRestricted === 'N')
    ) {
      checkedValue = false;
    } else {
      checkedValue = true;
    }

    return checkedValue;
  }

  onSelectTab(val: any) {
    this.selectedTab = val;
  }

  navigatePage() {
    this.router.navigateByUrl('/home/finance/ledger/list');
  }

  clearLedger() {
    this.createNewLedgerLock();
  }

  openLedgerForExportExcel() {
    this.accountsService;
    this.data
      .postPDFData(
        'Finance/OpenLedgerForExportExcel',
        this.ledger,
        this.options
      )
      .subscribe((success) => {
        const resp = new Blob([success], { type: 'application/text' });
        const fileURL = URL.createObjectURL(resp);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = 'Ledger Detail Report.xlsx';
        downloadLink.click();
        // downloadLink.href = success.data;
      });
  }

  getBranchSelected(event: any) {
    this.branchAccessId = event.actLedgerBranchAccessId;
  }

  async viewBranchAccessStatus(id: any) {
   
    if (id === 0) {
      let msg = `Please Select any Branch`;
      let response = await this.dialog.notificationDialog(msg);
    } 
    else {
      this.openLedgerBranchAccess(id);
    }
  }

  async branchAccessDelete(val: any) {
    let msg = `Are you sure, You want to delete ${val.ientCompanyBranch.branchName} ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      this.deleteLedgerBranchAccess(val);
    }
  }

  deleteLedgerBranchAccess(val: any) {
    this.accountsService.deleteLedgerBranchAccess(val).subscribe((success) => {
      this.branchTableData = success.ilistentLedgerBranchAccess;
    });
  }

  async deleteLedgerLock(val: any) {
    let msg = `Are you sure, You want to delete ${val.lockTypeValue} ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      this.ledgerLockDelete(val);
    }
  }

  ledgerLockDelete(val: any) {
    const obj = {
      data: val.actLedgerLockHistoryId,
    };
    this.accountsService.deleteLedgerLock(obj).subscribe((success) => {
      this.ledgerTableData = success.lstentLedgerLockHistory;
    });
  }

  getLedgerLockSelected(event: any) {
    this.ledgerLockId = event.actLedgerLockHistoryId;
  }

  async viewLedgerLockStatus(id: any) {
    if (id === 0) {
      let msg = `Please Select any Ledger`;
      let response = await this.dialog.notificationDialog(msg);
    } else {
      this.openLockLedger(id);
    }
  }

  isIncludeVatReport(val: any) {
    if (val.value === 'Y') {
      this.ledger.isIncludeVatReport = 'Y';
    } else if (val.value === 'N') {
      this.ledger.isIncludeVatReport = 'N';
      this.ledger.reportTypeValue = '';
    }
  }

  changeLedgerType(val: any) {
    if (val === 'BANK') {
      this.onSelectTab(0);
    }
  }

  countryBasedOnProvince(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .countryBasedOnProvince(obj)
      .subscribe((success: any) => {
        this.initialData.DDLValues.ddlCBBState = success.lstDDLClass;
        this.appService.setBreadCrumb(this.breadCrumb);
      });
  }

  getLedgerTypeBasedOnNtureofGroup() {
    const obj = {
      data: this.ledger.natureOfGroup,
    };
    this.accountsService
      .getLedgerTypeBasedOnNtureofGroup(obj)
      .subscribe((success) => {
        this.ledgerddl = success.value;
      });
  }
  navigateToAccount() {
    this.router.navigateByUrl('/home/corporate/finance-menus');
  }
  navBack() {
    this.router.navigateByUrl('/home/finance/ledger/list');
  }
  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus')
  }
}
