import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import {
  InnerScroll,
  Row,
  ViewLabel,
} from '../../../../app-core/core-component/core-component.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass, JsonPipe, DecimalPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import {
  entCrmCustomerBank,
  entCustomer,
  entTransactionPosting,
  entTransactionPostingAssignedOfficierHistory,
  entTransactionPostingNotes,
  entTransactionPostingPaymentList,
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
import { elementAt } from 'rxjs';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { AddBankComponent } from '../../../../app-core/template/add-bank/add-bank';
import { SplicePipe } from '../../../../common/pipes/app-splice/splice.pipe';
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
    DecimalPipe,
    ErrorMessageComponent,
    AddressEditComponent,
    TabGroupComponent,
    TabComponent,
    TabSubComponent,
    TabSubGroupComponent,
    StatusHistory1Component,
    AppSafePipe,
    ErrorMessageComponent,
    AddBankComponent,
    MatTooltipModule,
    AppCurrencyPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [SplicePipe],

  templateUrl: './payment-trust-estate-detail.component.html',
  styleUrl: './payment-trust-estate-detail.component.scss',
})
export class PaymentTrustEstateDetailComponent {
  [x: string]: any;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  __selectedItems: any;
  editAccess = false;
  currency: any;
  transactionPaymentList = new entTransactionPostingPaymentList();
  paymentTrustEstate = new entTransactionPosting();
  paymentParams = new entTransactionPostingPaymentList();
  accno = 0;
  transaction: any;
  paymentEstateNotes = new entTransactionPostingNotes();
  assignedOfficer = new entTransactionPostingAssignedOfficierHistory();
  columns: any = [
    'accno',
    'withdrawalApplicationNo',
    'amount',
   
    'transactionNumber',
    'belongsto',
    'action',
  ];
  columnsName: any = [
    '',
    'Withdrawal Application No',
    'Requested amount',
    'Transaction No',
    'Belongs To',
    'action',
    '',
  ];
  previewcolumns: any = [
    'groupName',
    'ledgerName',
    'postingType',
    'postingValue',
    'postingType2',
    'postingBooks',
  ];
  previewcolumnsName: any = [
    'Group Name',
    'Ledger Name',
    'Posting Nature',
    'Posting Value',
    'Posting Type',
    'Posting Books',
  ];

  customerBank = new entCrmCustomerBank();
  customerBankRAW = new entCrmCustomerBank();
  headOffice: any = '';
  customer = new entCustomer();
  islandDDL: any = [];
  villageDDL: any = [];
  assignedOfficerName = '';
  errormsgData: any = [];
  branchName = '';
  branchId = 0;
  showPosting = true;
  @ViewChild('q') qForm!: NgForm;
  @ViewChild('x') xForm!: NgForm;
  @ViewChild('notesForm') notesForm!: NgForm;
  @ViewChild('transactionForm') transactionForm!: NgForm;
  initialDDL: any = {
    resIslandDDL: [],
    resVillageDDL: [],
    perIslandDDL: [],
    perVillageDDL: [],
    bankIslandDDL: [],
    bankVillageDDL: [],
  };
  options = {
    hideFullSpinner: true,
  };
  id: any = 0;
  objType = '';
  customerId = 0;
  bankCodeValue = '';
  createNewBankInfoValues = false;

  notesLength = 0;
  fileUrl = '';
  notesList: any;
  accordianOpen: any = true;
  assignOfficerData: any = [];
  casAccountType: any = [];
  tableBankData: any = [];
  bankCodeDDl: any = [];
  @ViewChild('bankDialog', { static: false })
  bankDialog!: TemplateRef<any>;
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
  statusHistoryDataSource: any = [];
  emailColumns: any = [
    'toEmailId',
    'sentDate',
    'sentStatusDescription',
    'action',
  ];
  emailColumnsName: any = ['To', ' Date  Time', 'Status', 'Action'];
  errormsgColumns: any = [
    'assignedDate',
    'assignedByFullName',
    'statusDescription',
  ];
  errormsgColumnsName: any = [
    'Error Message Description',
    'Inserted By',
    'Inserted Date',
  ];
  emailHistoryTableData: any = [];
  subeventddl: any;
  eventddl: any;
  autoPostingValue: any;
  postingMatrixddl: any;
  filetype = [];
  viewBank = false;
  editBank = false;
  createBank = false;
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
  editTrust = false;
  bankddl = [];
  transacationAccountNumber: any[] = [];
  plistentPurPurchaseInvoiceItemQuantity: any = [];
  organizationddl = [];
  showErrorMessage = false;
  assignedOfficerddl = [];
  creditTotal = 0;
  getCreditValue = 0;
  getDebitValue = 0;
  debitTotal = 0;
  accountdescription = '';
  alerPop = false;
  @ViewChild('financeInformation') financeInformationform!: NgForm;
  editTransaction() {
    this.editTrust = true;
  }
  constructor(
    public router: Router,
    public apiService: ApplicationApiService,
    public appService: AppService,
    public initialData: InitialDataService,
    public route: ActivatedRoute,
    public data: DataService,
    public url: UrlService,
    public storage: AppStorageService,
    public dialog: CoreService,
    public appSetting: AppSettingsService,
    public splicePipe: SplicePipe
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }
  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    this.appService.setBreadCrumb(this.breadCrumb);
    let params: any = await this.url.decode(id);
    this.id = params.data;
    this.objType = params.type;
    await this.data.checkToken();
    await this.initialData.getDDL(
      'getInitialDataForTranscationPostingforPayment'
    );
    await this.loadProvinceDDL();
    await this.initialData.getDDL('getInitialDataForCustomerUpdate');
    this.getListOfEventByEventId();
    this.getListOfOrganization();
    await this.storage.get('branchFinance').then((val) => {
      console.log(val);

      this.branchName = val;
    });

    await this.storage.get('branchId').then((val) => {
      console.log(val);

      this.branchId = val;
    });

    await this.storage.get('companyCurrencyValue').then((val) => {
      this.currency = val;
    });

    if (this.id !== 0 && this.objType === 'new') {
      this.createTransactionPosting(this.id);
    } else {
      this.openTransactionPosting(this.id);
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
  getEventMappingIdPostingMatrixByEventandSubEventId(val: any) {
    const obj = {
      fileTypeValue: this.paymentTrustEstate.fileTypeValue,
      accountTypeValue: this.paymentTrustEstate.accountTypeValue,
      eventId: this.paymentTrustEstate.eventId,
      subEventId: val,
      voucherTypeValue: this.paymentTrustEstate.voucherTypeValue
    };
    this.apiService
      .getEventMappingIdPostingMatrixByFileAccountEventSubEvent(obj)
      .subscribe((success) => {
        this.postingMatrixddl = success.data[0].value;
      });
  }
  calculatePostingValue() {
    setTimeout(() => {
      this.paymentTrustEstate.appEventMappingId =
        this.paymentTrustEstate.appEventMappingId;
      this.apiService
        .calculatePostingValue(this.paymentTrustEstate)
        .subscribe((success) => {
          this.paymentTrustEstate.postingValue = success.postingValue;
          this.paymentTrustEstate.totalCredit = success.totalCredit;
          this.paymentTrustEstate.totalDebit = success.totalDebit;
          this.tableData = success.plstentTransactionPostingList;
          this.paymentTrustEstate.plstentTransactionPostingList =
            success.plstentTransactionPostingList;
          this.tableData.forEach((element: any) => {
            if (element.postingNatureValue === 'CREDT') {
              this.getCreditValue = 0;
              this.getCreditValue = Number(element.postingValue);
              this.creditTotal = this.creditTotal + this.getCreditValue;
            }
          });
          this.tableData.forEach((element: any) => {
            if (element.postingNatureValue === 'DEBIT') {
              this.getDebitValue = 0;

              let getDebitValue = Number(element.postingValue);
              this.debitTotal = this.debitTotal + getDebitValue;
            }
          });

          if (
            this.paymentTrustEstate.totalCredit !==
            this.paymentTrustEstate.totalDebit
          ) {
            this.data.errorInfoMessage(
              'total credit value should be equal to total debit value'
            );
          }
        });
    }, 1000);
  }

  saveTransactionPosting() {
    if (this.financeInformationform.valid) {
      this.paymentTrustEstate.voucherConfigId = this.id;
      this.paymentTrustEstate.branchId = this.branchId;
      this.paymentTrustEstate.referenceId = this.paymentCustomerId;
      this.paymentTrustEstate.plstentTransactionPostingList = this.tableData;
      this.apiService
        .saveTransactionPosting(this.paymentTrustEstate)
        .subscribe((success) => {
          this.paymentTrustEstate = success;
          this.tableData =
            success.ientTransactionPostingPaymentList.ientTransactionPostingList.lstentTransactionPostingPaymentList;
          // this.calculate()
          this.showAccess();
          // this.paymentTrustEstate.totalCredit = String(
          //   Number(this.paymentTrustEstate.inputValue) +
          //   Number(this.paymentTrustEstate.postingValue)
          // );

          this.reDirectTo(success.transactionPostingId);
          this.editTrust = false;
          this.assignOfficerData =
            success.plstentTransactionPostingAssignedOfficierHistory;
          this.statusHistoryDataSource =
            success.plstentTransactionPostingStatusHistory;
          this.emailHistoryTableData =
            success.plstentTransactionPostingEmailHistory;
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        });
    } else {
      this.errorTrue = true;
    }
  }
  updateTransactionPosting() {
    if (this.financeInformationform.valid) {
      this.paymentTrustEstate.voucherConfigId = this.id;
      this.paymentTrustEstate.referenceId = this.paymentCustomerId;
      this.apiService
        .saveTransactionPosting(this.paymentTrustEstate)
        .subscribe((success) => {
          this.paymentTrustEstate = success;
          // this.calculate()
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

  getBankDetails() {
    // this.paymentTrustEstate.bankId = 0;
    this.paymentTrustEstate.chequeTransactionDate = '';
    this.paymentTrustEstate.bankAccountNumber = '';
    this.paymentTrustEstate.chequeTransactionNumber = '';
    // this.paymentTrustEstate.bankId = 0;
    this.paymentTrustEstate.chequeTransactionNumber = '';
    this.paymentTrustEstate.chequeTransactionDate = '';
    this.paymentTrustEstate.bankAccountNumber = '';
    this.errorTrue = false;
  }
  async reDirectTo(id: any) {
    const obj = {
      data: id,
    };
    const encode = await this.url.encode(obj);
    this.router.navigateByUrl(
      '/home/finance/payments-trust-and-estate/detail/' + encode
    );
  }
  branchData(event: any) {
    this.initialData.DDLValues.DDLBranch.forEach((element: any) => {
      if (event === element.id) {
        this.paymentTrustEstate.branchDesription = element.description;
      }
    });
  }
  async bankDialogBox() {
    await this.initialData.getAllInitialHeadofficeBankValueDetails(
      this.options
    );
    this.data.showErrorMessage = false;

    let dialogResponse: any = await this.dialog.openDialog(this.bankDialog, {
      disableClose: true,
      height: '550px',
      width: '100%',
      maxWidth: '1170px',
    });
    if (dialogResponse) {
      // this.getBankList()
    }
  }
  getDDL() {
    this.checkcodeDDl = this.bankCodeDDl;
  }
  createBankDetail() {
    this.bankCodeValue = '';
    this.errorTrue = false;
    this.createNewBankInfoValues = false;
    this.apiService.createNewCustomerBank().subscribe((success) => {
      this.createBank = true;
      this.viewBank = false;
      this.editBank = false;
      this.bankDialogBox();
      this.customerBank = success;
      this.getIslandFromProvince(success.iEmployerAddress.provinceId);
      this.getVillageDDLFromIsland(success.iEmployerAddress.islandId);
    });
  }
  getVillageDDLFromIsland(val: any) {
    const obj = {
      data: val,
    };
    this.apiService.getIslandBasedOnVillageDDL(obj).subscribe((success) => {
      this.villageDDL = success.value;
    });
  }
  getBankCode() {
    // this.checkcodeDDl = []
    // this.bankCodeDDl = []
    // this.bankddl.forEach((code: any) => {
    //   this.bankCodeDDl.push(code.ientBank)
    // })
    // console.log(this.bankCodeDDl);
  }

  transactionData(event: any) {
    console.log(event);
    this.postingMatrixddl.forEach((element: any) => {
      if (
        element.id === event ||
        this.paymentTrustEstate.appEventMappingId === 0
      ) {
        this.paymentTrustEstate.transactionCode = element.name;
      }
      if (Number(this.paymentTrustEstate.inputValue) !== 0 && event !== 0) {
        this.calculatePostingValue();
      }
    });
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
        this.paymentTrustEstate.fileTypeDescription = ele.description;
      }
    });
  }
  accountNum(val?: any) {
    this.initialData.DDLValues.DDLAccountType.forEach((ele: any) => {
      if (val === ele.constant) {
        this.paymentTrustEstate.accountTypeDescription = ele.description;
      }
    });

    const obj = {
      data: this.paymentTrustEstate.fileTypeValue,
      data1: this.paymentTrustEstate.accountTypeValue,
    };
    this.apiService
      .getTrustAccountDetailsByFileandAccountTypeValues(obj)
      .subscribe((success) => {
        this.accountNumber = success.value;
        if (val === true) {
          this.bankCode(this.paymentTrustEstate.referenceId);
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
      data: this.paymentTrustEstate.voucherConfigId,
      data1: this.paymentTrustEstate.statusValue,
    };
    this.apiService
      .createNewTransactionPostingNotes1(obj)
      .subscribe((success) => {
        this.paymentEstateNotes = success;
        this.statusddl = success.ientDDL.value;
      });
  }
  saveTransactionPostingNotes(val: any) {
    if (val === 'APPRD') {
      this.paymentEstateNotes.statusValue = 'APPRD';
      this.paymentEstateNotes.transactionPostingId =
        this.paymentTrustEstate.transactionPostingId;
      this.paymentTrustEstate.plstentTransactionPostingNotes =
        this.paymentEstateNotes;
      this.apiService
        .saveTransactionPostingNotes(this.paymentEstateNotes)
        .subscribe((success) => {
          this.paymentTrustEstate = success;
          this.showAccess();
          this.assignOfficerData =
            success.plstentTransactionPostingAssignedOfficierHistory;
          this.notesList = success.plstentTransactionPostingNotes;
          this.dialog.closeDialog();
        });
    }
    if (val === 'CNCLD') {
      this.paymentEstateNotes.statusValue = 'CNCLD';
      this.paymentEstateNotes.transactionPostingId =
        this.paymentTrustEstate.transactionPostingId;
      this.paymentTrustEstate.plstentTransactionPostingNotes =
        this.paymentEstateNotes;
      this.apiService
        .saveTransactionPostingNotes(this.paymentEstateNotes)
        .subscribe((success) => {
          this.paymentTrustEstate = success;
          this.showAccess();
          this.assignOfficerData =
            success.plstentTransactionPostingAssignedOfficierHistory;
          this.notesList = success.plstentTransactionPostingNotes;
          this.dialog.closeDialog();
        });
    } else {
      if (this.paymentTrustEstate.statusValue !== 'CNCLD') {
        if (
          this.paymentTrustEstate.lstentTransactionPostingPaymentList.length ===
          0
        ) {
          debugger;
          this.data.errorInfoMessage('Invalid');
          return;
        }
      }
      if (this.notesForm.valid) {
        console.log('save');

        this.paymentEstateNotes.transactionPostingId =
          this.paymentTrustEstate.transactionPostingId;
        this.paymentTrustEstate.plstentTransactionPostingNotes =
          this.paymentEstateNotes;
        this.apiService
          .saveTransactionPostingNotes(this.paymentEstateNotes)
          .subscribe((success) => {
            this.paymentTrustEstate = success;
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

  pageChanged(event: any) { }
  Clear() {
    this.tableData = [];
    this.createTransactionPosting(this.id);
    this.data.successMessage('Data Cleared Successfully');
  }
  clearNotes() {
    this.createTransactionPostingNotes();
    this.data.successMessage('Data Cleared Successfully');
  }
  clearTransactionPaymentList() {
    this.createTransactionList('clear');
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
  viewBankDetailsBasedOnBankCode(x: any) {
    if (x.valid) {
      const obj = {
        data: this.bankCodeValue,
      };
      this.apiService
        .getBankDetailsBasedOnBranchCode(obj)
        .subscribe((success) => {
          this.customerBank = success;
          this.createNewBankInfoValues = true;
          this.errorTrue = false;
          this.headOfficeBankId(success.bankId);
          if (this.customerBank.ientBank.ientAddress.provinceId !== 0) {
            this.getIslandFromProvince(
              this.customerBank.ientBank.ientAddress.provinceId,
              'bankIslandDDL'
            );
            this.getVillageFromIsland(
              this.customerBank.ientBank.ientAddress.islandId,
              'bankVillageDDL'
            );
          }
        });
    } else {
      this.errorTrue = true;
    }
  }
  viewBankDetail(val: any) {
    const obj = {
      data: val,
    };
    this.apiService
      .openCustomerBankByCustomerBankId(obj)
      .subscribe(async (success) => {
        this.viewBank = true;
        this.createBank = false;
        this.editBank = false;
        this.bankDialogBox();
        this.customerBank = success;
        this.customerBankRAW = JSON.parse(JSON.stringify(this.customerBank));
        this.headOfficeBankId(success.bankId);
        // this.bankProvinceVal = this.customerBank.ientBank.ientAddress.provinceId
        if (this.customerBank.ientBank.ientAddress.provinceId !== 0) {
          this.getIslandFromProvince(
            this.customerBank.ientBank.ientAddress.provinceId,
            'bankIslandDDL'
          );
          this.getVillageFromIsland(
            this.customerBank.ientBank.ientAddress.islandId,
            'bankVillageDDL'
          );
        }
      });
  }
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
    this.paymentTrustEstate.voucherConfigId = this.id;
    this.errorTrue = false;
    this.apiService
      .createTransactionPosting(this.paymentTrustEstate)
      .subscribe((success) => {
        this.paymentTrustEstate = success;
        this.getWithDrawalbyOrganizationandPaymentMode();

        this.showAccess();
        this.autoPostingValue = success.plstentTransactionPostingList;
        this.filetype = this.initialData.DDLValues.DDLFileType;
        this.branchData(this.paymentTrustEstate.branchId);
        this.tableData = success.plstentTransactionPostingList;
      });
  }
  tableDataList: any = [];
  async openTransactionPosting(val: any, type?: any) {
    const obj = {
      data: this.id,
    };
    this.apiService.openTransactionPosting(obj).subscribe(async (success) => {
      this.paymentTrustEstate = success;
    
      // this.tableData = success.plstentTransactionPostingList;
      //
      this.paymentTrustEstate.lstentTransactionPostingPaymentList =
        success.lstentTransactionPostingPaymentList;
      this.tableDataList =
        this.paymentTrustEstate.lstentTransactionPostingPaymentList.flatMap(
          (obj: any) => obj.lstentTransactionPostingList
        );
      console.log(this.tableDataList ,'list');
      this.alerPop = true;

      this.getWithDrawalbyOrganizationandPaymentMode();
      this.transactionPaymentList.description = this.accountdescription


      if (this.paymentTrustEstate.accountTypeValue !== '') {
        this.entertableData = false;
      } else {
        this.entertableData = true;
      }

      this.showAccess();
      this.paymentTrustEstate.totalCredit = String(
        Number(this.paymentTrustEstate.inputValue) +
        Number(this.paymentTrustEstate.postingValue)
      );
      // this.initialData.DDLValues.DDLPaymentFor=this.paymentTrustEstate.paymentModeDescription;

      console.log(
        this.paymentTrustEstate.pentCustomer.entCrmCustomerBankList.ientBank
      );
      this.checkcodeDDl = [];
      this.paymentTrustEstate.pentCustomer.entCrmCustomerBankList.forEach(
        (val: any) => {
          this.checkcodeDDl.push(val.ientBank);
        }
      );
      console.log(this.checkcodeDDl);

      // this.fileData( this.receiptTrustEstate.fileTypeValue)

      // this.accountNum();
      this.casAccountType = success.pentCustomer.entCrmCustomerBankList;
      //  this.getListOfSubEventByEventId(this.receiptTrustEstate.eventId);
      //  this.getEventMappingIdPostingMatrixByEventandSubEventId(this.receiptTrustEstate.subEventId);

      if (
        this.paymentTrustEstate.plstentTransactionPostingAssignedOfficierHistory
          .length !== 0
      ) {
        this.assignedOfficerName =
          this.paymentTrustEstate.plstentTransactionPostingAssignedOfficierHistory[0].assignedOfficerFullName;
      }
      this.getListOfOfficerForTransactionPosting();
      this.branchData(this.paymentTrustEstate.branchId);

      this.data.successMessage(success.msg.infoMessage.msgDescription);
      if (this.paymentTrustEstate.fileTypeValue !== '') {
        await this.fileData(this.paymentTrustEstate.fileTypeValue);
      }

      //  if(this.paymentTrustEstate.accountTypeValue !==''){
      this.accountNum(true);

      //  }

      //  if(this.paymentTrustEstate.eventId!==0){
      this.getListOfSubEventByEventId(this.paymentTrustEstate.eventId);
      //  }
      //  if(this.paymentTrustEstate.subEventId!==0){
      this.getEventMappingIdPostingMatrixByEventandSubEventId(
        this.paymentTrustEstate.subEventId
      );
      this.tableData.forEach((element: any) => {
        if (element.postingNatureValue === 'CREDT') {
          this.getCreditValue = 0;
          this.getCreditValue = Number(element.postingValue);
          this.creditTotal = this.creditTotal + this.getCreditValue;
        }
      });
      this.tableData.forEach((element: any) => {
        if (element.postingNatureValue === 'DEBIT') {
          this.getDebitValue = 0;

          let getDebitValue = Number(element.postingValue);
          this.debitTotal = this.debitTotal + getDebitValue;
        }
      });

      //  }

      this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.assignOfficerData =
        success.plstentTransactionPostingAssignedOfficierHistory;
      this.notesList = success.plstentTransactionPostingNotes;
      this.statusHistoryDataSource =
        success.plstentTransactionPostingStatusHistory;
      this.emailHistoryTableData =
        success.plstentTransactionPostingEmailHistory;
      this.tableData = success.lstentTransactionPostingPaymentList;
    });
  }
  getListOfOfficerForTransactionPosting() {
    const obj = {
      data1: this.id,
      data2: '',
      data3: this.paymentTrustEstate.statusValue,
    };
    this.apiService
      .getListOfOfficerForTransactionPosting(obj)
      .subscribe((success) => {
        this.assignedOfficerddl = success.value;
      });
  }
  selfAssignTransactionPostingAssignedHistory() {
    this.assignedOfficer.transactionPostingId =
      this.paymentTrustEstate.transactionPostingId;
    this.assignedOfficer.statusValue = this.paymentTrustEstate.statusValue;
    this.assignedOfficer.statusId = this.paymentTrustEstate.statusId;
    this.apiService
      .selfAssignTransactionPostingAssignedHistory(this.assignedOfficer)
      .subscribe((success) => {
        this.paymentTrustEstate = success;
        this.showAccess();
        this.assignOfficerData =
          success.plstentTransactionPostingAssignedOfficierHistory;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      });
  }
  reAssignTransactionPostingAssignedOfficer(val: any) {
    this.assignedOfficer.assingedOfficier = val;
    this.assignedOfficer.transactionPostingId =
      this.paymentTrustEstate.transactionPostingId;
    this.assignedOfficer.statusValue = this.paymentTrustEstate.statusValue;
    this.apiService
      .reAssignTransactionPostingAssignedOfficer(this.assignedOfficer)
      .subscribe((success) => {
        this.paymentTrustEstate = success;
        this.showAccess();
        this.assignOfficerData =
          success.plstentTransactionPostingAssignedOfficierHistory;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      });
  }

  paymentCustomerId: any;

  bankCode(val: any, flag?: any) {
    if (flag === true) {
      this.paymentTrustEstate.bankId = 0;
      this.paymentTrustEstate.bankAccountNumber = '';
    }

    let filterItem: any = this.accountNumber.find(
      (obj: any) => obj.ledgerId === val
    );
    this.paymentCustomerId = filterItem ? filterItem.id : 0;
    const obj = {
      data: this.paymentCustomerId,
    };
    console.log(this.paymentCustomerId, 'customerid');

    this.paymentTrustEstate.referenceId = this.paymentCustomerId;
    // console.log(obj);
    this.apiService.openCustomerBankDetail(obj).subscribe(async (success) => {
      this.paymentTrustEstate.pentCustomer = success.pentCustomer;
      this.paymentTrustEstate.pentCustomer.entCrmCustomerBankList.accountNo =
        success.pentCustomer.entCrmCustomerBankList.accountNo;
      this.bankddl = success.pentCustomer.entCrmCustomerBankList;
      console.log(this.bankddl);

      // await this.getBankCode()
      // this.checkcodeDDl = this.bankCodeDDl
    });
  }
  editBankDetails() {
    this.editBank = true;
    this.createBank = false;
    this.viewBank = false;
    if (this.customerBank.ientBank.ientAddress.provinceId !== 0) {
      this.getIslandFromProvince(
        this.customerBank.ientBank.ientAddress.provinceId,
        'bankIslandDDL'
      );
    }
    if (this.customerBank.ientBank.ientAddress.islandId !== 0) {
      this.getVillageFromIsland(
        this.customerBank.ientBank.ientAddress.islandId,
        'bankVillageDDL'
      );
    }
  }
  getIslandFromProvince(val: any, type?: any) {
    const obj = {
      data: val,
    };
    this.apiService
      .getProvinceBasedOnInslandDDL(obj, this.options)
      .subscribe((success) => {
        this.initialDDL[type] = success.value;
        this.islandDDL = success.value;
      });
  }

  getVillageFromIsland(val: any, type: any) {
    const obj = {
      data: val,
    };
    this.apiService.getIslandBasedOnVillageDDL(obj).subscribe((success) => {
      this.initialDDL[type] = success.value;
    });
  }
  saveBankDetails() {
    if (this.qForm.valid && this.xForm.valid) {
      this.customerBank.customerId = this.paymentTrustEstate.referenceId;
      this.apiService
        .saveCustomerBank(this.customerBank)
        .subscribe((success) => {
          this.customerBank = success;
          this.bankCode(this.paymentTrustEstate.customerAccountNumber);
          this.tableBankData = success.entCrmCustomerBankList;
          this.dialog.closeDialog();

          this.data.successMessage(success.msg.infoMessage.msgDescription);
        });
    } else {
      this.errorTrue = true;
    }
  }
  clearBankDetails() {
    this.errorTrue = false;
    this.customerBank = JSON.parse(JSON.stringify(this.customerBankRAW));
    this.bankCodeValue = '';
    this.apiService.createNewCustomerBank().subscribe((success) => {
      this.customerBank = success;
    });
  }
  clearHeadOffice() {
    this.customerBank.ientBank.headOfficeBankId = 0;
  }
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
  if (this.paymentTrustEstate.transactionPostingId !== 0) {
    const obj = {
      data: this.paymentTrustEstate.transactionPostingId,
      data1: '',
    };
    const options = {
      responseType: 'blob'
    }
    this.apiService.generatePrintPdfForPayment(obj, options).subscribe((success: any) => {
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
  saveEditBankDetails() {
    if (this.qForm.valid) {
      this.customerBank.customerId = this.customerId;
      this.apiService
        .saveCustomerBank(this.customerBank)
        .subscribe((success) => {
          this.customerBank = success;
          this.tableBankData = success.entCrmCustomerBankList;
          this.dialog.closeDialog();
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        });
    } else {
      this.errorTrue = true;
    }
  }
  openBankDetails() {
    const obj = {
      data: this.customerBank.customerBankId,
    };
    this.apiService
      .openCustomerBankByCustomerBankId(obj)
      .subscribe((success) => {
        this.headOfficeBankId(success.bankId);
        this.customerBank = success;
        this.customerBankRAW = JSON.parse(JSON.stringify(this.customerBank));
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.getIslandFromProvince(
          this.customerBank.ientBank.ientAddress.provinceId,
          'bankIslandDDL'
        );
        this.getVillageFromIsland(
          this.customerBank.ientBank.ientAddress.islandId,
          'bankVillageDDL'
        );
      });
  }
  navigateToList() {
    this.router.navigateByUrl('/home/finance/payments-trust-and-estate/search');
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
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

  tableData: any = [];

  formatCurrency(
    value: number,
    decimalPlaces: number,
    currency: string
  ): string {
    return `${currency} ${value.toFixed(decimalPlaces)}`;
  }

  getAccountNo(val: any) {
    this.paymentTrustEstate.pentCustomer.entCrmCustomerBankList.forEach(
      (ele: any) => {
        if (val === ele.bankId) {
          this.paymentTrustEstate.bankAccountNumber = ele.accountNo;
          console.log(ele.accountNo);
        }
      }
    );
  }
  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus');
  }
  showAccess() {
    if (
      this.paymentTrustEstate.transactionPostingId === 0 ||
      (this.paymentTrustEstate.assignedOfficerFlag &&
        this.paymentTrustEstate.reAssignFlag)
    ) {
      this.editAccess = true;
    } else {
      this.editAccess = false;
    }
  }

  showChangeAlert() {
    debugger;
    console.log('hi');

    this.alerPop = true;
  }
  async showAlertMsg(val: any) {
    let msg = `Are you sure, You want to change the ${val} ?`;
    let response = await this.dialog.alertPopup(msg);
    if (response) {
      this.paymentTrustEstate.lstentTransactionPostingPaymentList = [];
      this.paymentTrustEstate.inputValue = '';
      this.paymentTrustEstate.postingValue = '';
      // this.createTransactionPosting(this.id);
      this.alerPop = false;
    }
  }
  changePaymentMode() {
    if (
      this.alerPop === true &&
      this.paymentTrustEstate.lstentTransactionPostingPaymentList.length === 0
    ) {
      this.showAlertMsg('Payment Mode');
    }
    this.paymentTrustEstate.paymentForValue = '';

    this.paymentTrustEstate.fileTypeValue = '';
    this.paymentTrustEstate.accountTypeValue = '';
  }
  changePayment() {
    if (
      this.alerPop === true &&
      this.paymentTrustEstate.lstentTransactionPostingPaymentList.length === 0
    ) {
      this.showAlertMsg('Payment ');
    }
    this.paymentTrustEstate.fileTypeValue = '';

    this.paymentTrustEstate.accountTypeValue = '';
  }
  changeOrganization() {
    if (
      this.alerPop === true &&
      this.paymentTrustEstate.lstentTransactionPostingPaymentList.length === 0
    ) {
      this.showAlertMsg('Organization  ');
    }
    this.paymentTrustEstate.fileTypeValue = '';

    this.paymentTrustEstate.accountTypeValue = '';
  }
  changeFileMode() {
    if (
      this.alerPop === true &&
      this.paymentTrustEstate.lstentTransactionPostingPaymentList.length === 0
    ) {
      this.showAlertMsg('File Type');
    }

    this.paymentTrustEstate.accountTypeValue = '';
  }
  entertableData = true;
  changeAccount() {
    this.entertableData = false;
  }

  getListOfOrganization() {
    this.apiService.getListOfOrganization().subscribe((success) => {
      this.organizationddl = success.data[0].value;
    });
  }
  getWithDrawalbyOrganizationandPaymentMode() {
    const obj = {
      data: this.paymentTrustEstate.appOrganizationId,
      data1: 'BKTRN',
      // data1:this.paymentTrustEstate.paymentModeValue
    };
    this.apiService
      .getWithDrawalbyOrganizationandPaymentMode(obj)
      .subscribe((success) => {
        this.transacationAccountNumber = success.data[0].value;
        this.transacationAccountNumber.forEach((ele: any) => {
          this.paymentTrustEstate.ientTransactionPostingPaymentList.withdrawalApplicationNo =
            ele.constant;
          this.paymentTrustEstate.ientTransactionPostingPaymentList.accountName =
            ele.name;
        });
      });
  }
  getWithDrawalDeatilsbyIdAndOrganization() {
    let constant = this.transactionPaymentList.trustAccountNumer;
    let index = this.transacationAccountNumber
      .map((e: any) => e.constant)
      .indexOf(constant);
    if (index === -1) return;
    this.transactionPaymentList.accountName =
      this.transacationAccountNumber[index].name;
    this.transactionPaymentList.withdrawalApplicationNo =
      this.transacationAccountNumber[index].code;
    this.transactionPaymentList.withdrawalApplicationId =
      this.transacationAccountNumber[index].id;
    this.accountdescription = this.transacationAccountNumber[index].description;
    this.transactionPaymentList.description = this.accountdescription

    const obj = {
      data1: this.transactionPaymentList.withdrawalApplicationId,
      data2: this.paymentTrustEstate.appOrganizationId,
      data3: this.accountdescription,
    };

    console.log(obj);

    this.apiService
      .getWithDrawalDeatilsbyIdAndOrganization(obj)
      .subscribe((success) => {
        // this.transaction=success;
        this.transactionPaymentList.amount = success.requestedAmount;
        this.transactionPaymentList.bankName = success.bankName;
        this.transactionPaymentList.bankAccountNumber = success.accountNo;
        this.transactionPaymentList.bankId = success.bankId;
      });
  }

  async createTransactionList(flag?: any, val?: any) {
    if(this.paymentTrustEstate.statusValue === 'APPRD'){
      this.noTransactionEdit = true
    }
    if (val === 0) {
      if(this.paymentTrustEstate.statusValue === 'APPRD'){
 
      }
      this.createTransactionPostingPaymentList();
    } else {

      this.openTransactionPostingPaymentList(val);
    }
    if (flag) {
      let dialogResponse: any = await this.dialog.openDialog(
        this.transactionDialog,
        {
          height: 'auto',
          width: '1000px',
          maxWidth: '1170px',
        }
      );
    }
  }
  createTransactionPostingPaymentList() {
    debugger;
    this.errorTrue = false;
    this.apiService
      .createTransactionPostingPaymentList()
      .subscribe(async (success) => {
        this.transactionPaymentList = success;
      });
  }
  saveTransactionPostingPaymentList() {
    debugger;
    if (this.transactionForm.valid) {
      this.transactionPaymentList.eventMappingId =
        this.paymentTrustEstate.appEventMappingId;
      this.transactionPaymentList.eventId = this.paymentTrustEstate.eventId;
      this.transactionPaymentList.subEventId =
        this.paymentTrustEstate.subEventId;
      this.transactionPaymentList.accountTypeValue =
        this.paymentTrustEstate.accountTypeValue;
      this.transactionPaymentList.fileTypeValue =
        this.paymentTrustEstate.fileTypeValue;
      this.transactionPaymentList.transactionPostingId =
        this.paymentTrustEstate.transactionPostingId;

      this.paymentTrustEstate.ientTransactionPostingPaymentList =
        this.transactionPaymentList;
      this.apiService
        .saveTransactionPostingPaymentList(this.paymentTrustEstate)
        .subscribe((success) => {
          this.paymentTrustEstate = success;
          // this.calculate();
          this.paymentTrustEstate.lstentTransactionPostingPaymentList =
            success.lstentTransactionPostingPaymentList;
          this.tableDataList =
            this.paymentTrustEstate.lstentTransactionPostingPaymentList.flatMap(
              (obj: any) => obj.lstentTransactionPostingList
            );
          this.dialog.closeDialog();
        });
    } else {
      this.errorTrue = true;
    }
  }
  deleteTransactionPostingPaymentList(val: any) {
    this.paymentTrustEstate.ientTransactionPostingPaymentList.transactionPostingPaymentListId =
      val;
    // const obj ={
    //   data:val
    // }
    this.apiService
      .deleteTransactionPostingPaymentList(this.paymentTrustEstate)
      .subscribe((success) => {
        this.paymentTrustEstate = success;
        this.paymentTrustEstate.lstentTransactionPostingPaymentList =
          success.lstentTransactionPostingPaymentList;
        this.tableDataList =
          this.paymentTrustEstate.lstentTransactionPostingPaymentList.flatMap(
            (obj: any) => obj.lstentTransactionPostingList
          );
      });
  }
  noTransactionEdit = false
  temptrustAccountNumer: any;
  openTransactionPostingPaymentList(val: any, type?: any) {
 
    const obj = {
      data: val,
    };
    this.apiService
      .openTransactionPostingPaymentList(obj)
      .subscribe((success) => {
        this.temptrustAccountNumer = success.trustAccountNumer;
  
        this.transactionPaymentList = success;
        if (type === 'refresh') {
          this.data.successMessage('Data Refreshed Successfully');
        }
      });
  }
  async deleteItemType(val: any) {
    let response = await this.dialog.checkDelete('Do you want to delete');
    if (response) {
      this.deleteTransactionPostingPaymentList(val);
    }
  }
  showAuotPosting(flag: any) {
    if (flag === true) {
      this.showPosting = false;
    } else {
      this.showPosting = true;
    }
  }
  // getTransactionList(){
  //   if(){

  //   }
  // }
  subTypeDDL: any;
  onSubTypeSelect(event: any) {
    const obj = {
      data: this.paymentTrustEstate.eventId,
    };
    this.apiService.getListOfSubEventByEventId(obj).subscribe((success) => {
      this.subTypeDDL = success.value;
      this.subTypeDDL.forEach((element: any) => {
        console.log(element);
        if (element.id === event) {
          this.paymentTrustEstate.narrative = element.name;
        }
      });
    });
  }
  calculate() {

    this.tableDataList.forEach((element: any) => {
      if (element.postingNatureValue === 'CREDT') {
      this.creditTotal = this.creditTotal + Number(element.postingValue);
      }
      if (element.postingNatureValue === 'DEBIT') {
        this.debitTotal = this.debitTotal + Number(element.postingValue);
      }
    });
  }
}
