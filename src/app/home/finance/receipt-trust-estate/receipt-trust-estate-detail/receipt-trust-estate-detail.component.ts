import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import {
  InnerScroll,
  Row,
  ViewLabel,
} from '../../../../app-core/core-component/core-component.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import {
  entCustomer,
  entTransactionPosting,
  entTransactionPostingAssignedOfficierHistory,
  entTransactionPostingNotes,
} from '../../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { DataService } from '../../../../common/services/data/data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import {
  TabComponent,
  TabGroupComponent,
} from '../../../../app-core/template/tab/tab';
import {
  TabSubComponent,
  TabSubGroupComponent,
} from '../../../../app-core/template/tab/tab1';
import { StatusHistory1Component } from '../../../../app-core/template/status-history1/status-history1.component';
import { AppSafePipe } from '../../../../common/pipes/app-safe/app-safe.pipe';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { CoreService } from '../../../../app-core/service/core.service';
import { EmailHistoryFormComponent } from '../../../crm/email-history-form/email-history-form.component';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { AddBankComponent } from '../../../../app-core/template/add-bank/add-bank';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppCurrencyPipe } from '../../../../common/pipes/app-currency/app-currency.pipe';
@Component({
  selector: 'app-payments-trust-and-estate-detail',
  standalone: true,
  imports: [
    CdkAccordionModule,
    NgClass,
    AccordionModule,
    Row,
    ViewLabel,
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    FormsModule,
    InputControlComponent,
    IconButtonComponent,
    AppDatePipe,
    InnerScroll,
    ErrorMessageComponent,
    TabGroupComponent,
    TabComponent,
    TabSubComponent,
    TabSubGroupComponent,
    StatusHistory1Component,
    AppSafePipe,
    AddBankComponent,
    MatTooltipModule,
    AppCurrencyPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './receipt-trust-estate-detail.component.html',
  styleUrl: './receipt-trust-estate-detail.component.scss',
})
export class ReceiptTrustEstateDetailComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  __selectedItems: any;
  receiptTrustEstate = new entTransactionPosting();
  receiptTrustEstateRAW = new entTransactionPosting();
  receiptTrustEstateNotes = new entTransactionPostingNotes();
  assignedOfficer = new entTransactionPostingAssignedOfficierHistory();
  columns: any = [
    'groupName',
    'ledgerName',
    'postingType',
    'postingValue',
    'postingType2',
    'postingBooks',
  ];
  columnsName: any = [
    'Group Name',
    'Ledger Name',
    'Posting Nature',
    'Posting Value',
    'Posting Type',
    'Posting Books',
  ];

  headOffice: any = '';
  customer = new entCustomer();
  // islandDDL: any = [];
  // villageDDL: any = [];
  assignedOfficerName = '';
  assignedOfficerddl = [];
  // @ViewChild('q') qForm!: NgForm;
  // @ViewChild('x') xForm!: NgForm;
  @ViewChild('notesForm') notesForm!: NgForm;
  // initialDDL: any = {
  //   resIslandDDL: [],
  //   resVillageDDL: [],
  //   perIslandDDL: [],
  //   perVillageDDL: [],
  //   bankIslandDDL: [],
  //   bankVillageDDL: []
  // }
  options = {
    hideFullSpinner: true,
  };
  id: any = 0;
  documentNo: any = 0;
  objType = '';
  customerId = 0;
  // bankCodeValue = '';
  createNewBankInfoValues = false;
  // documentddl: any;
  branchName = '';
  receiptAmount = 0;

  notesLength = 0;
  fileUrl = '';
  notesList: any;
  accordianOpen: any = true;
  assignOfficerData: any = [];
  errormsgData: any = [];
  casAccountType: any = [];
  // tableBankData: any = [];
  bankCodeDDl: any = [];
  // @ViewChild('bankDialog', { static: false })
  // bankDialog!: TemplateRef<any>;
  assignOfficerColumns: any = [
    'assignedOfficerFullName',
    'assignedDate',
    'assignedByFullName',
    'statusDescription',
  ];
  assignOfficerColumnsName: any = [
    'Assigned Officer',
    'Assigned Date',
    'Assigned By',
    'Status',
  ];
  errormsgColumns: any = [
    // 'assignedOfficerFullName',
    'assignedDate',
    'assignedByFullName',
    'statusDescription',
  ];
  errormsgColumnsName: any = [
    // 'S No',
    'Error Message Description',
    'Inserted By',
    'Inserted Date',
  ];
  statusHistoryDataSource: any = [];
  emailColumns: any = [
    'toEmailId',
    'sentDate',
    'sentStatusDescription',
    'action',
  ];
  emailColumnsName: any = ['To Email', ' Date | Time', 'Status', 'Action'];
  emailHistoryTableData: any = [];
  subeventddl: any;
  eventddl: any;
  autoPostingValue: any;
  postingMatrixddl: any;
  filetype = [];
  // viewBank = false;
  // editBank = false;
  // createBank = false;
  primaryValue: any;
  statusddl: any;
  DDLBranch: any = [];
  accountNumber = [];
  checkcodeDDl: any = [];
  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  @ViewChild('transactionDialog', { static: false })
  transactionDialog!: TemplateRef<any>;
  errorTrue = false;
  errorTrue1 = false;
  editTrust = false;
  bankddl = [];
  branchId = 0;
  creditTotal: any = 0;
  getCreditValue = 0;
  getDebitValue = 0;
  debitTotal: any = 0;
  showErrorMessage = false;
  editAccess = false;
  @ViewChild('financeInformation') financeInformationform!: NgForm;
  currency: any;

  constructor(
    public router: Router,
    public location: Location,
    public apiService: ApplicationApiService,
    public appService: AppService,
    public initialData: InitialDataService,
    public route: ActivatedRoute,
    public data: DataService,
    public url: UrlService,
    public storage: AppStorageService,
    public dialog: CoreService,
    public appSetting: AppSettingsService
  ) {
    this.route.paramMap.subscribe(async (params: any) => {
      await this.init();
    });
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  async init() {
    debugger;
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params.data;
    this.objType = params.type;
    this.documentNo = params?.data1;
    await this.data.checkToken();
    this.appService.setBreadCrumb(this.breadCrumb);
    await this.initialData.getDDL('getInitialDataForTranscationPosting');
    // await this.getPaymentTrustAndEstateVouchersCommonDDL();

    await this.loadProvinceDDL();
    await this.initialData.getDDL('getInitialDataForCustomerUpdate');
    await this.storage.get('branchFinance').then((val) => {
      this.branchName = val;
    });
    await this.storage.get('branchId').then((val) => {
      console.log(val);

      this.branchId = val;
    });

    await this.storage.get('companyCurrencyValue').then((val) => {
      this.currency = val;
    });

    this.getListOfEventByEventId();

    // await this.storage.get('fiscalYearList').then((val) => {
    //   this.DDLBranch = val
    //   console.log(this.DDLBranch);
    // const xItem = JSON.parse(JSON.stringify(this.DDLBranch));

    // });

    if (this.id !== 0 && this.objType === 'new') {
      this.createTransactionPosting(this.id);
    }
    if (this.id !== 0 && this.objType === 'detail') {
      this.openTransactionPosting(this.id);
    }
    if (
      this.id !== 0 &&
      (this.objType === 'change' || this.objType === 'reversal')
    ) {
      this.createChangeDetailTransactionPosting(this.id);
    }
  }
  ProvinceDDL: any;

  loadProvinceDDL() {
    this.apiService.loadAllMProvince().subscribe((success) => {
      this.initialData.DDLValues.DDLProvince = success.value;
    });
  }
  getListOfEventByEventId() {
    this.apiService.getListOfEventByEventId().subscribe((success) => {
      this.eventddl = success.value;
    });
  }
  getListOfSubEventByEventId(val: any) {
    const obj = {
      data: val,
    };
    this.apiService.getListOfSubEventByEventId(obj).subscribe((success) => {
      this.subeventddl = success.value;
    });
  }
  // getPaymentTrustAndEstateVouchersCommonDDL() {
  //   this.apiService.getPaymentTrustAndEstateVouchersCommonDDL().subscribe((success) => {
  //     this.documentddl = success.data[0].value;
  //   })
  // }
  getEventMappingIdPostingMatrixByEventandSubEventId(val: any) {
    const obj = {
      fileTypeValue: this.receiptTrustEstate.fileTypeValue,
      accountTypeValue: this.receiptTrustEstate.accountTypeValue,
      eventId: this.receiptTrustEstate.eventId,
      subEventId: val,
      voucherTypeValue:this.receiptTrustEstate.voucherTypeValue
    };
    this.apiService
      .getEventMappingIdPostingMatrixByFileAccountEventSubEvent(obj)
      .subscribe((success) => {
        this.postingMatrixddl = success.data[0].value;
        // this.receiptTrustEstate.postingValue = '';
      });
  }
  calculatePostingValue() {
    setTimeout(() => {
      this.receiptTrustEstate.appEventMappingId =
        this.receiptTrustEstate.appEventMappingId;
      this.apiService
        .calculatePostingValue(this.receiptTrustEstate)
        .subscribe((success) => {
          this.receiptTrustEstate.postingValue = success.postingValue;
          this.receiptTrustEstate.totalCredit = success.totalCredit;
          this.receiptTrustEstate.totalDebit = success.totalDebit;
          this.tableData = success.plstentTransactionPostingList;
          this.getTotalReceiptValue();
          this.receiptTrustEstate.plstentTransactionPostingList =
            success.plstentTransactionPostingList;
          this.calculate();

          if (
            this.receiptTrustEstate.totalCredit !==
            this.receiptTrustEstate.totalDebit
          ) {
            this.data.errorInfoMessage(
              'total credit value should be equal to total debit value'
            );
          }
        });
    }, 1000);
    // this.tableData=[];
  }

  calculate() {
    this.tableData.forEach((element: any) => {
      if (element.postingNatureValue === 'CREDT') {
        this.creditTotal = this.creditTotal + Number(element.postingValue);
      }
      if (element.postingNatureValue === 'DEBIT') {
        this.debitTotal = this.debitTotal + Number(element.postingValue);
      }
    });
  }

  saveTransactionPosting() {
    debugger
    if (this.financeInformationform.valid) {
      this.receiptTrustEstate.voucherConfigId = this.id;
      this.receiptTrustEstate.branchId = this.branchId;
      this.receiptTrustEstate.referenceId = this.paymentCustomerId;
      this.receiptTrustEstate.plstentTransactionPostingList = this.tableData;
      this.apiService
        .saveTransactionPosting(this.receiptTrustEstate)
        .subscribe((success) => {
          this.receiptTrustEstate = success;
          // this.receiptTrustEstate.totalCredit = String(
          //   Number(this.receiptTrustEstate.inputValue) +
          //     Number(this.receiptTrustEstate.postingValue)
          // );
          this.showAccess();

          this.tableData = success.plstentTransactionPostingList;
          if (this.objType === 'new') {
            this.reDirectTo(success.transactionPostingId);
          }
          this.editTrust = false;
          this.assignOfficerData =
            success.plstentTransactionPostingAssignedOfficierHistory;
          this.statusHistoryDataSource =
            success.plstentTransactionPostingStatusHistory;
          this.emailHistoryTableData =
            success.plstentTransactionPostingEmailHistory;
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        });
    } else {
      this.errorTrue = true;
    }
  }
  async editTransaction() {
    this.editTrust = true;
    // this.getListOfEventByEventId();
  }
  updateTransactionPosting() {
    if (this.financeInformationform.valid) {
      this.receiptTrustEstate.voucherConfigId = this.id;
      this.receiptTrustEstate.referenceId = this.paymentCustomerId;
      this.apiService
        .saveTransactionPosting(this.receiptTrustEstate)
        .subscribe((success) => {
          this.receiptTrustEstate = success;
          this.showAccess();
          this.editTrust = false;
          this.assignOfficerData =
            success.plstentTransactionPostingAssignedOfficierHistory;
          this.statusHistoryDataSource =
            success.plstentTransactionPostingStatusHistory;
          this.emailHistoryTableData =
            success.plstentTransactionPostingEmailHistory;
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        });
    } else {
      this.errorTrue = true;
    }
  }
  getListOfOfficerForTransactionPosting() {
    const obj = {
      data1: this.id,
      data2: '',
      data3: this.receiptTrustEstate.statusValue,
    };
    this.apiService
      .getListOfOfficerForTransactionPosting(obj)
      .subscribe((success) => {
        this.assignedOfficerddl = success.value;
      });
  }
  getBankDetails() {
    this.receiptTrustEstate.bankId = 0;
    this.receiptTrustEstate.chequeTransactionDate = '';
    this.receiptTrustEstate.bankAccountNumber = '';
    this.receiptTrustEstate.chequeTransactionNumber = '';
    this.receiptTrustEstate.bankId = 0;
    this.receiptTrustEstate.chequeTransactionNumber = '';
    this.receiptTrustEstate.chequeTransactionDate = '';
    this.receiptTrustEstate.bankAccountNumber = '';
    this.errorTrue = false;
  }
  async reDirectTo(id: any) {
    const obj = {
      data: id,
      type:'detail'
    };
    const encode = await this.url.encode(obj);
    this.router.navigateByUrl(
      '/home/finance/receipt-trust-and-estate/detail/' + encode
    );
  }
  branchData(val: any) {
    console.log(val);

    this.initialData.DDLValues.DDLBranch.forEach((element: any) => {
      if (val === element.constant) {
        this.receiptTrustEstate.branchDesription = element.description;
      }
    });
  }
  // async bankDialogBox() {
  //   await this.initialData.getAllInitialHeadofficeBankValueDetails(this.options);
  //   this.data.showErrorMessage = false

  //   let dialogResponse: any = await this.dialog.openDialog(this.bankDialog, {
  //     disableClose: true,
  //     height: '550px',
  //     width: '100%',
  //     maxWidth: '1170px',

  //   });
  //   if (dialogResponse) {
  //     // this.getBankList()
  //   }
  // }

  // createBankDetail() {
  //   this.bankCodeValue = '';
  //   this.errorTrue = false;

  //   this.createNewBankInfoValues = false
  //   this.apiService.createNewCustomerBank().subscribe((success) => {
  //     this.createBank = true;
  //     this.viewBank = false;
  //     this.editBank = false
  //     this.bankDialogBox();
  //     this.customerBank = success;
  //     this.getIslandFromProvince(success.iEmployerAddress.provinceId)
  //     this.getVillageDDLFromIsland(success.iEmployerAddress.islandId)
  //   })
  // }
  // getVillageDDLFromIsland(val: any) {
  //   const obj = {
  //     data: val
  //   }
  //   this.apiService.getIslandBasedOnVillageDDL(obj).subscribe((success) => {
  //     this.villageDDL = success.value
  //   })
  // }
  getBankCode() {
    this.checkcodeDDl = [];
    this.bankCodeDDl = [];
    this.bankddl.forEach((code: any) => {
      this.bankCodeDDl.push(code.ientBank);
    });
    console.log(this.bankCodeDDl);
  }

  transactionData(event: any) {
    console.log(event);
    this.postingMatrixddl.forEach((element: any) => {
      if (
        element.id === event ||
        this.receiptTrustEstate.appEventMappingId === 0
      ) {
        this.receiptTrustEstate.transactionCode = element.name;
      }
    });
    if (Number(this.receiptTrustEstate.inputValue) !== 0 && event !== 0) {
      this.calculatePostingValue();
    }
    // this.postingMatrixddlx
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
      } else if (
        event === 'ESTAT' &&
        (element.constant === 'CASH' ||
          element.constant === 'NONCS' ||
          element.constant === 'COMON')
      ) {
        this.casAccountType.push(element);
      }
    });

    this.initialData.DDLValues.DDLFileType.forEach((ele: any) => {
      if (event === ele.constant) {
        this.receiptTrustEstate.fileTypeDescription = ele.description;
      }
    });
  }
  accountNum(val?: any) {
    this.initialData.DDLValues.DDLAccountType.forEach((ele: any) => {
      if (val === ele.constant) {
        this.receiptTrustEstate.accountTypeDescription = ele.description;
      }
    });

    const obj = {
      data: this.receiptTrustEstate.fileTypeValue,
      data1: this.receiptTrustEstate.accountTypeValue,
    };
    this.apiService
      .getTrustAccountDetailsByFileandAccountTypeValues(obj)
      .subscribe((success) => {
        this.accountNumber = success.value;
        if (val === true) {
          this.bankCode(this.receiptTrustEstate.customerAccountNumber);
        }
      });
  }
  async createNotes() {
    this.createTransactionPostingNotes();
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      height: 'auto',
      width: '1200px',
      maxWidth: '1170px',
    });
  }
  createTransactionPostingNotes() {
    this.errorTrue = false;
    const obj = {
      data: this.receiptTrustEstate.voucherConfigId,
      data1: this.receiptTrustEstate.statusValue,
    };
    this.apiService
      .createNewTransactionPostingNotes1(obj)
      .subscribe((success) => {
        this.receiptTrustEstateNotes = success;
        this.statusddl = success.ientDDL.value;
      });
  }
  saveTransactionPostingNotes(val: any) {
    if (val === 'APPRD') {
      this.receiptTrustEstateNotes.statusValue = 'APPRD';
      this.receiptTrustEstateNotes.transactionPostingId =
        this.receiptTrustEstate.transactionPostingId;
      this.receiptTrustEstate.plstentTransactionPostingNotes =
        this.receiptTrustEstateNotes;
      this.apiService
        .saveTransactionPostingNotes(this.receiptTrustEstateNotes)
        .subscribe((success) => {
          this.receiptTrustEstate = success;
          this.showAccess();
          this.assignOfficerData =
            success.plstentTransactionPostingAssignedOfficierHistory;
          this.notesList = success.plstentTransactionPostingNotes;
          this.dialog.closeDialog();
        });
    }
    if (val === 'CNCLD') {
      this.receiptTrustEstateNotes.statusValue = 'CNCLD';
      this.receiptTrustEstateNotes.transactionPostingId =
        this.receiptTrustEstate.transactionPostingId;
      this.receiptTrustEstate.plstentTransactionPostingNotes =
        this.receiptTrustEstateNotes;
      this.apiService
        .saveTransactionPostingNotes(this.receiptTrustEstateNotes)
        .subscribe((success) => {
          this.receiptTrustEstate = success;
          this.showAccess();
          this.assignOfficerData =
            success.plstentTransactionPostingAssignedOfficierHistory;
          this.notesList = success.plstentTransactionPostingNotes;
          this.dialog.closeDialog();
        });
    } else {
      if (this.notesForm.valid) {
        this.receiptTrustEstateNotes.transactionPostingId =
          this.receiptTrustEstate.transactionPostingId;
        this.receiptTrustEstate.plstentTransactionPostingNotes =
          this.receiptTrustEstateNotes;
        this.apiService
          .saveTransactionPostingNotes(this.receiptTrustEstateNotes)
          .subscribe((success) => {
            this.receiptTrustEstate = success;
            this.showAccess();
            this.assignOfficerData =
              success.plstentTransactionPostingAssignedOfficierHistory;
            this.notesList = success.plstentTransactionPostingNotes;
            this.dialog.closeDialog();
          });
      } else {
        this.errorTrue = true;
      }
    }
  }

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
  };
  handleAction(element: any) {
    console.log('Action on:', element);
  }

  pageChanged(event: any) {}
  Clear() {
    this.receiptTrustEstate = JSON.parse(
      JSON.stringify(this.receiptTrustEstateRAW)
    );
    console.log(this.receiptTrustEstate);

    this.tableData = [];
    this.createTransactionPosting(this.id);
    this.data.successMessage('Data Cleared Successfully');
  }
  clearNotes() {
    this.createTransactionPostingNotes();
    this.data.successMessage('Data Cleared Successfully');
  }
  async viewEmailDetail(val: any) {
    this.data.showErrorMessage = false;
    let dialogResponse: any = await this.dialog.openDialog(
      EmailHistoryFormComponent,
      {
        height: '550px',
        width: '100%',
        maxWidth: '1170px',
        data: {
          email: val,
          title: 'Customer Update',
          icon: 'assets/icons/accordian/customer-update.svg',
        },
      }
    );
  }
  // viewBankDetailsBasedOnBankCode(x: any) {
  //   if (x.valid) {
  //     const obj = {
  //       data: this.bankCodeValue
  //     }
  //     this.apiService.getBankDetailsBasedOnBranchCode(obj).subscribe((success) => {
  //       this.customerBank = success;
  //       this.createNewBankInfoValues = true
  //       this.errorTrue = false;
  //       this.headOfficeBankId(success.bankId)
  //       if (this.customerBank.ientBank.ientAddress.provinceId !== 0) {
  //         this.getIslandFromProvince(this.customerBank.ientBank.ientAddress.provinceId, 'bankIslandDDL');
  //         this.getVillageFromIsland(this.customerBank.ientBank.ientAddress.islandId, 'bankVillageDDL');

  //       }

  //     })
  //   }
  //   else {
  //     this.errorTrue = true
  //   }
  // }
  // viewBankDetail(val: any) {
  //   const obj = {
  //     data: val
  //   }
  //   this.apiService.openCustomerBankByCustomerBankId(obj).subscribe(async (success) => {
  //     this.viewBank = true;
  //     this.createBank = false;
  //     this.editBank = false
  //     this.bankDialogBox();
  //     this.customerBank = success
  //     this.customerBankRAW = JSON.parse(JSON.stringify(this.customerBank))
  //     this.headOfficeBankId(success.bankId)
  //     // this.bankProvinceVal = this.customerBank.ientBank.ientAddress.provinceId
  //     if (this.customerBank.ientBank.ientAddress.provinceId !== 0) {
  //       this.getIslandFromProvince(this.customerBank.ientBank.ientAddress.provinceId, 'bankIslandDDL');
  //       this.getVillageFromIsland(this.customerBank.ientBank.ientAddress.islandId, 'bankVillageDDL');

  //     }

  //   })
  // }
  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }
  async createTransactionPosting(val: any) {
    //  await this.initialData.DDLValues.DDLVoucher.forEach((element:any) => {
    //   this.receiptTrustEstate.voucherTypeValue=element.constant;

    // });
    // await this.documentddl.forEach((value:any) => {
    //   this.receiptTrustEstate.voucherConfigId=value.id
    // });
    this.receiptTrustEstate.voucherConfigId = this.id;
    this.errorTrue = false;
    this.apiService
      .createTransactionPosting(this.receiptTrustEstate)
      .subscribe((success) => {
        this.receiptTrustEstate = success;
        this.showAccess();

        this.autoPostingValue = success.plstentTransactionPostingList;
        this.filetype = this.initialData.DDLValues.DDLFileType;
        this.branchData(this.receiptTrustEstate.branchId);
        this.tableData = success.plstentTransactionPostingList;
      });
  }

  async createChangeDetailTransactionPosting(val: any) {
    this.receiptTrustEstate.voucherConfigId = this.id;
    this.receiptTrustEstate.changeInDocumentId = this.documentNo;
    this.receiptTrustEstate.voucherTypeValue = 'RCHDT';
    this.apiService
      .createTransactionPostingForChangeInDetails(this.receiptTrustEstate)
      .subscribe(async (success) => {
        this.creditTotal = 0;
        this.receiptTrustEstate = success;
        this.editTrust = false;
        // this.receiptTrustEstate.totalCredit = String(
        //   Number(this.receiptTrustEstate.inputValue) +
        //     Number(this.receiptTrustEstate.postingValue)
        // );
        this.showAccess();
        this.getTotalReceiptValue();
        this.casAccountType = success.pentCustomer.entCrmCustomerBankList;

        // this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.assignOfficerData =
          success.plstentTransactionPostingAssignedOfficierHistory;
        this.notesList = success.plstentTransactionPostingNotes;
        this.statusHistoryDataSource =
          success.plstentTransactionPostingStatusHistory;
        this.emailHistoryTableData =
          success.plstentTransactionPostingEmailHistory;
        this.tableData = success.plstentTransactionPostingList;
        if (
          this.receiptTrustEstate
            .plstentTransactionPostingAssignedOfficierHistory.length !== 0
        ) {
          this.assignedOfficerName =
            this.receiptTrustEstate.plstentTransactionPostingAssignedOfficierHistory[0].assignedOfficerFullName;
        }
        this.getListOfOfficerForTransactionPosting();
        this.branchData(this.receiptTrustEstate.branchId);
        if (this.receiptTrustEstate.fileTypeValue !== '') {
          await this.fileData(this.receiptTrustEstate.fileTypeValue);
        }
        if (this.receiptTrustEstate.accountTypeValue !== '') {
          this.accountNum(true);
        }

        if (this.receiptTrustEstate.eventId !== 0) {
          this.getListOfSubEventByEventId(this.receiptTrustEstate.eventId);
        }
        if (this.receiptTrustEstate.subEventId !== 0) {
          this.getEventMappingIdPostingMatrixByEventandSubEventId(
            this.receiptTrustEstate.subEventId
          );
        }

        this.calculate();
      });
  }

  async openTransactionPosting(val: any, type?: any) {
    const obj = {
      data: this.id,
    };
    this.apiService.openTransactionPosting(obj).subscribe(async (success) => {
      this.creditTotal = 0;
      this.receiptTrustEstate = success;
      // this.receiptTrustEstate.totalCredit = String(
      //   Number(this.receiptTrustEstate.inputValue) +
      //     Number(this.receiptTrustEstate.postingValue)
      // );
      this.getTotalReceiptValue();
      this.showAccess();

      // this.fileData( this.receiptTrustEstate.fileTypeValue)

      // this.accountNum();
      // this.genderCount(this.receiptTrustEstate.plstentTransactionPostingList)
      this.casAccountType = success.pentCustomer.entCrmCustomerBankList;
      //  this.getListOfSubEventByEventId(this.receiptTrustEstate.eventId);
      //  this.getEventMappingIdPostingMatrixByEventandSubEventId(this.receiptTrustEstate.subEventId);
      this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.assignOfficerData =
        success.plstentTransactionPostingAssignedOfficierHistory;
      this.notesList = success.plstentTransactionPostingNotes;
      this.statusHistoryDataSource =
        success.plstentTransactionPostingStatusHistory;
      this.emailHistoryTableData =
        success.plstentTransactionPostingEmailHistory;
      this.tableData = success.plstentTransactionPostingList;
      if (
        this.receiptTrustEstate.plstentTransactionPostingAssignedOfficierHistory
          .length !== 0
      ) {
        this.assignedOfficerName =
          this.receiptTrustEstate.plstentTransactionPostingAssignedOfficierHistory[0].assignedOfficerFullName;
      }
      this.getListOfOfficerForTransactionPosting();
      this.branchData(this.receiptTrustEstate.branchId);

      this.data.successMessage(success.msg.infoMessage.msgDescription);
      if (this.receiptTrustEstate.fileTypeValue !== '') {
        await this.fileData(this.receiptTrustEstate.fileTypeValue);
      }
      // if(this.receiptTrustEstate.customerAccountNumber!==''){
      //   this.bankCode(this.receiptTrustEstate.referenceId , true)
      // }
      if (this.receiptTrustEstate.accountTypeValue !== '') {
        this.accountNum(true);
      }

      if (this.receiptTrustEstate.eventId !== 0) {
        this.getListOfSubEventByEventId(this.receiptTrustEstate.eventId);
      }
      if (this.receiptTrustEstate.subEventId !== 0) {
        this.getEventMappingIdPostingMatrixByEventandSubEventId(
          this.receiptTrustEstate.subEventId
        );
      }
      this.tableData.forEach((element: any) => {
        if (element.postingNatureValue === 'CREDT') {
          this.creditTotal = this.creditTotal + Number(element.postingValue);
        }
        if (element.postingNatureValue === 'DEBIT') {
          this.debitTotal = this.debitTotal + Number(element.postingValue);
        }
      });
    });
  }
  selfAssignTransactionPostingAssignedHistory() {
    this.assignedOfficer.transactionPostingId =
      this.receiptTrustEstate.transactionPostingId;
    this.assignedOfficer.statusValue = this.receiptTrustEstate.statusValue;
    this.assignedOfficer.statusId = this.receiptTrustEstate.statusId;
    this.apiService
      .selfAssignTransactionPostingAssignedHistory(this.assignedOfficer)
      .subscribe((success) => {
        this.receiptTrustEstate = success;
        this.showAccess();

        this.assignOfficerData =
          success.plstentTransactionPostingAssignedOfficierHistory;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      });
  }
  reAssignTransactionPostingAssignedOfficer(val: any) {
    this.assignedOfficer.assingedOfficier = val;
    this.assignedOfficer.transactionPostingId =
      this.receiptTrustEstate.transactionPostingId;
    this.assignedOfficer.statusValue = this.receiptTrustEstate.statusValue;
    this.apiService
      .reAssignTransactionPostingAssignedOfficer(this.assignedOfficer)
      .subscribe((success) => {
        this.receiptTrustEstate = success;
        this.showAccess();

        this.assignOfficerData =
          success.plstentTransactionPostingAssignedOfficierHistory;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      });
  }

  paymentCustomerId: any;

  bankCode(val: any, flag?: any) {
    if (flag === true) {
      this.receiptTrustEstate.bankId = 0;
      this.receiptTrustEstate.bankAccountNumber = '';
    }

    let filterItem: any = this.accountNumber.find(
      (obj: any) => obj.ledgerId === val
    );
    this.paymentCustomerId = filterItem ? filterItem.id : 0;
    const obj = {
      data: this.paymentCustomerId,
    };
    console.log(this.paymentCustomerId, 'customerid');

    this.receiptTrustEstate.referenceId = this.paymentCustomerId;
    // console.log(obj);
    this.apiService.openCustomerBankDetail(obj).subscribe(async (success) => {
      this.receiptTrustEstate.pentCustomer = success.pentCustomer;
      this.receiptTrustEstate.pentCustomer.entCrmCustomerBankList.accountNo =
        success.pentCustomer.entCrmCustomerBankList.accountNo;
      this.bankddl = success.pentCustomer.entCrmCustomerBankList;

      if (
        this.receiptTrustEstate.eventId !== 0 &&
        this.receiptTrustEstate.subEventId !== 0
      ) {
        this.getEventMappingIdPostingMatrixByEventandSubEventId(
          this.receiptTrustEstate.subEventId
        );
        this.getTotalReceiptValue();
      }

      await this.getBankCode();
      this.checkcodeDDl = this.bankCodeDDl;
    });
  }

  getDDL() {
    this.checkcodeDDl = this.bankCodeDDl;
  }
  // editBankDetails() {
  //   this.editBank = true;
  //   this.createBank = false;
  //   this.viewBank = false;
  //   if (this.customerBank.ientBank.ientAddress.provinceId !== 0) {
  //     this.getIslandFromProvince(this.customerBank.ientBank.ientAddress.provinceId, 'bankIslandDDL')
  //   }
  //   if (this.customerBank.ientBank.ientAddress.islandId !== 0) {
  //     this.getVillageFromIsland(this.customerBank.ientBank.ientAddress.islandId, 'bankVillageDDL')
  //   }
  // }
  // getIslandFromProvince(val: any, type?: any) {
  // const obj = {
  //   data: val
  // }
  // this.apiService.getProvinceBasedOnInslandDDL(obj, this.options).subscribe((success) => {
  //   this.initialDDL[type] = success.value;
  //   this.islandDDL = success.value
  // })
  // }

  // getVillageFromIsland(val: any, type: any) {
  //   const obj = {
  //     data: val
  //   }
  //   this.apiService.getIslandBasedOnVillageDDL(obj).subscribe((success) => {
  //     this.initialDDL[type] = success.value
  //   })
  // }
  // saveBankDetails() {
  //   if (this.qForm.valid && this.xForm.valid) {
  //     this.customerBank.customerId = this.receiptTrustEstate.referenceId;
  //     this.apiService.saveCustomerBank(this.customerBank).subscribe((success) => {
  //       this.customerBank = success;
  //       this.bankCode(this.receiptTrustEstate.customerAccountNumber);
  //       this.tableBankData = success.entCrmCustomerBankList;
  //       this.dialog.closeDialog();

  //       this.data.successMessage(success.msg.infoMessage.msgDescription);

  //     })
  //   }
  //   else {
  //     this.errorTrue = true
  //   }
  // }
  // clearBankDetails() {
  //   this.errorTrue = false
  //   this.customerBank = JSON.parse(JSON.stringify(this.customerBankRAW));
  //   this.bankCodeValue = ''
  //   this.apiService.createNewCustomerBank().subscribe((success) => {
  //     this.customerBank = success;
  //   })
  // }
  // clearHeadOffice() {
  //   this.customerBank.ientBank.headOfficeBankId = 0
  // }
  onTabChange(event: any) {
    switch (event.tabTitle) { 
      case 'Print':this.printPreview();
      break;
    }
  }
  blob = {};
  urlFileName = '';
  comments:'';
printPreview(){
  if (this.receiptTrustEstate.transactionPostingId !== 0) {
    const obj = {
      data: this.receiptTrustEstate.transactionPostingId,
      data1: this.comments,
    };
    const options = {
      responseType: 'blob'
    }
    this.apiService.generatePrintPdfForReceipt(obj, options).subscribe((success: any) => {
      let contentDisposition = success.headers.get('content-disposition');
      let filename = contentDisposition
        .split(';')[1]
        .split('filename')[1]
        .split('=')[1]
        .trim();
      // this.blob = success.body;
      const resp = new Blob([success.body], { type: 'application/pdf' });
      this.blob = resp;
      const fileURL = URL.createObjectURL(resp);

      this.urlFileName = filename;
      this.fileUrl = fileURL;
    })
  }
}
  headOfficeBankId(val: any) {
    this.initialData.DDLValues.DDLBank.forEach((element: any) => {
      if (val === element.id) {
        this.headOffice = element.code;
      }
    });
  }
  // saveEditBankDetails() {
  //   if (this.qForm.valid) {
  //     this.customerBank.customerId = this.customerId
  //     this.apiService.saveCustomerBank(this.customerBank).subscribe((success) => {
  //       this.customerBank = success
  //       this.tableBankData = success.entCrmCustomerBankList;

  //       this.dialog.closeDialog()
  //       this.data.successMessage(success.msg.infoMessage.msgDescription);
  //     })
  //   }
  //   else {
  //     this.errorTrue = true
  //   }
  // }
  // openBankDetails() {
  //   const obj = {
  //     data: this.customerBank.customerBankId
  //   }
  //   this.apiService.openCustomerBankByCustomerBankId(obj).subscribe((success) => {
  //     this.headOfficeBankId(success.bankId)
  //     this.customerBank = success;
  //     this.customerBankRAW = JSON.parse(JSON.stringify(this.customerBank))
  //     this.data.successMessage(success.msg.infoMessage.msgDescription);
  //     this.getIslandFromProvince(this.customerBank.ientBank.ientAddress.provinceId, 'bankIslandDDL');
  //     this.getVillageFromIsland(this.customerBank.ientBank.ientAddress.islandId, 'bankVillageDDL');
  //   })
  // }
  navigateToList() {
    this.location.back();
  }

  //tabs
  activeValue1 = true;
  activeValue2 = false;
  activeValue3 = false;
  selectedTabValue = '1';
  selectedTabChange(val: any) {
    if (val === 1) {
      this.selectedTabValue = '1';
      this.activeValue1 = true;
      this.activeValue2 = false;
      this.activeValue3 = false;
    }

    if (val === 2) {
      this.selectedTabValue = '2';
      this.activeValue2 = true;
      this.activeValue1 = false;
      this.activeValue3 = false;
    }

    if (val === 3) {
      this.selectedTabValue = '3';
      this.activeValue2 = false;
      this.activeValue1 = false;
      this.activeValue3 = true;
    }
  }

  noOfDecimalPlaces = 2;
  companyCurrencyValue = 'INR';

  tableData: any = [
    // {
    //   'groupName': 'Current Assets',
    //   'ledgerName': 'Cash Account',
    //   'postingType': 'Credit',
    //   'postingValue': 'INR 50.00',
    //   'postingBooks': 'Primary',
    //   'postingType2': 'Trust & Estate'
    // }, {
    //   'groupName': 'Customer Account',
    //   'ledgerName': 'Fixed Assets',
    //   'postingType': 'Credit',
    //   'postingValue': 'INR 50.00',
    //   'postingBooks': 'Primary',
    //   'postingType2': 'Trust & Estate'
    // }, {
    //   'groupName': 'Test Group',
    //   'ledgerName': 'Motor Vehicle',
    //   'postingType': 'Debit',
    //   'postingValue': 'INR 25.00',
    //   'postingBooks': 'Auto-Post',
    //   'postingType2': 'Trust & Estate'
    // }, {
    //   'groupName': 'Investments',
    //   'ledgerName': 'Cash Account',
    //   'postingType': 'Debit',
    //   'postingValue': 'INR 25.00',
    //   'postingBooks': 'Auto-Post',
    //   'postingType2': 'Trust & Estate'
    // }, {
    //   'groupName': 'Corpt Sub Group',
    //   'ledgerName': 'Corpt',
    //   'postingType': 'Debit',
    //   'postingValue': 'INR 25.00',
    //   'postingBooks': 'Auto-Post',
    //   'postingType2': 'Corporate'
    // }, {
    //   'groupName': 'Test Corp Account',
    //   'ledgerName': 'Test Corp 11',
    //   'postingType': 'Debit',
    //   'postingValue': 'INR 25.00',
    //   'postingBooks': 'Auto-Post',
    //   'postingType2': 'Corporate'
    // }
  ];

  formatCurrency(
    value: number,
    decimalPlaces: number,
    currency: string
  ): string {
    return `${currency} ${value.toFixed(decimalPlaces)}`;
  }

  getAccountNo(val: any) {
    this.receiptTrustEstate.pentCustomer.entCrmCustomerBankList.forEach(
      (ele: any) => {
        if (val === ele.bankId) {
          this.receiptTrustEstate.bankAccountNumber = ele.accountNo;

          console.log(ele.accountNo);
        }
      }
    );
  }
  fileType() {}
  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus');
  }
  showAccess() {
    if (
      this.receiptTrustEstate.transactionPostingId === 0 ||
      (this.receiptTrustEstate.assignedOfficerFlag &&
        this.receiptTrustEstate.reAssignFlag)
    ) {
      this.editAccess = true;
    } else {
      this.editAccess = false;
    }
  }

  async openReceiptDetail(id: any) {
    const obj = {
      data: id,
    };
    const encode = await this.url.encode(obj);
    this.router.navigateByUrl(
      '/home/finance/receipt-trust-and-estate/detail/' + encode
    );
  }

  getTotalReceiptValue() {
    this.receiptAmount =
      Number(this.receiptTrustEstate.inputValue) +
      Number(this.receiptTrustEstate.postingValue);
  }
}
