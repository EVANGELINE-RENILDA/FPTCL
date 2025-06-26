
import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { InnerScroll, Row, ViewLabel } from "../../../../app-core/core-component/core-component.component";
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass, JsonPipe, DecimalPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { entCrmCustomerBank, entCustomer, entTransactionPosting, entTransactionPostingAssignedOfficierHistory, entTransactionPostingNotes } from '../../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { DataService } from '../../../../common/services/data/data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { TabComponent, TabGroupComponent } from '../../../../app-core/template/tab/tab';
import { TabSubComponent, TabSubGroupComponent } from '../../../../app-core/template/tab/tab1';
import { StatusHistory1Component } from '../../../../app-core/template/status-history1/status-history1.component';
import { AppSafePipe } from '../../../../common/pipes/app-safe/app-safe.pipe';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { CoreService } from '../../../../app-core/service/core.service';
import { EmailHistoryFormComponent } from '../../../crm/email-history-form/email-history-form.component';
import { elementAt } from 'rxjs';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { AddBankComponent } from '../../../../app-core/template/add-bank/add-bank';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppCurrencyPipe } from '../../../../common/pipes/app-currency/app-currency.pipe';
@Component({
  selector: 'app-payments-trust-and-estate-detail',
  standalone: true,
  imports: [CdkAccordionModule,
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
    MatTooltipModule,
    InnerScroll,
    AddBankComponent,
    ErrorMessageComponent, AddressEditComponent, TabGroupComponent, TabComponent, TabSubComponent, TabSubGroupComponent, StatusHistory1Component, AppSafePipe, ErrorMessageComponent,DecimalPipe,
    AppCurrencyPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './journal-trust-estate-detail.component.html',
  styleUrl: './journal-trust-estate-detail.component.scss'

})
export class JournalTrustEstateDetailComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  __selectedItems: any;
  journalTrustEstate = new entTransactionPosting();
  journalTrustEstateNotes = new entTransactionPostingNotes();
  assignedOfficer = new entTransactionPostingAssignedOfficierHistory()
  columns: any = ["groupName", "ledgerName", "postingType", "postingValue", "postingType2", "postingBooks"];
  columnsName: any = ["Group Name", "Ledger Name", "Posting Nature", "Posting Value", "Posting Type", "Posting Books"];
  customerBank = new entCrmCustomerBank();
  customerBankRAW = new entCrmCustomerBank();
  headOffice: any = ''
  customer = new entCustomer()
  islandDDL: any = [];
  villageDDL: any = [];
  assignedOfficerName = '';
  branchName = ''
  editAccess = false;
  receiptAmount = 0;
  assignedOfficerddl = [];
  errorTrue1 = false;

  @ViewChild('q') qForm!: NgForm;
  @ViewChild('x') xForm!: NgForm;
  @ViewChild('notesForm') notesForm!: NgForm;
  initialDDL: any = {
    resIslandDDL: [],
    resVillageDDL: [],
    perIslandDDL: [],
    perVillageDDL: [],
    bankIslandDDL: [],
    bankVillageDDL: []
  }
  currency: any;

  options = {
    hideFullSpinner: true
  }
  id: any = 0;
  objType = '';
  customerId = 0;
  bankCodeValue = '';
  createNewBankInfoValues = false

  notesLength = 0
  fileUrl = '';
  notesList: any;
  accordianOpen: any = true;
  assignOfficerData: any = [];
  casAccountType: any = [];
  tableBankData: any = [];
  bankCodeDDl: any = [];
  @ViewChild('bankDialog', { static: false })
  bankDialog!: TemplateRef<any>;
  assignOfficerColumns: any = ["assignedOfficerFullName", "assignedDate", "assignedByFullName", "statusDescription"];
  assignOfficerColumnsName: any = ["Assigned Officer", "Assigned Date", "Assigned By", "Status",];
  statusHistoryDataSource: any = [];
  emailColumns: any = ["toEmailId", "sentDate", "sentStatusDescription", "action"];
  emailColumnsName: any = ["To", " Date | Time", "Status", "Action"];
  emailHistoryTableData: any = [];
  subeventddl: any;
  errormsgData: any = [];
  errormsgColumns: any = ["assignedOfficerFullName", "assignedDate", "assignedByFullName", "statusDescription"];
  errormsgColumnsName: any = ["S No", "Error Message Description", "Inserted By", "Inserted Date",];
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
  errorTrue = false;
  editTrust = false
  bankddl = [];
  showErrorMessage = false;
  branchId = 0
  creditTotal = 0;
  getCreditValue = 0
  getDebitValue = 0
  debitTotal = 0

  @ViewChild('financeInformation') financeInformationform!: NgForm
  currencyVal: any;
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
    public appSetting: AppSettingsService


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
    this.objType = params.type
    await this.data.checkToken();
    await this.initialData.getDDL('getInitialDataForTranscationPosting');
    await this.loadProvinceDDL()
    await this.initialData.getDDL('getInitialDataForCustomerUpdate');
    this.getListOfEventByEventId();
    await this.storage.get('branchFinance').then((val) => {
      this.branchName = val;
    });
    await this.storage.get('branchId').then((val) => {
      console.log(val);

      this.branchId = val;
    });

    await this.storage.get('companyCurrencyValue').then((val) => {
      this.currencyVal = val
    });


    if (this.id !== 0 && this.objType === 'new') {
      this.createTransactionPosting(this.id);
    } else {
      this.openTransactionPosting(this.id);
    }

  }
  ProvinceDDL: any
  loadProvinceDDL() {
    this.apiService.loadAllMProvince().subscribe((success) => {
      this.initialData.DDLValues.DDLProvince = success.value
    })
  }
  getListOfEventByEventId() {
    this.apiService.getListOfEventByEventId().subscribe((success) => {
      this.eventddl = success.value;
    })
  }
  getListOfSubEventByEventId(val: any) {
if(val){

  const obj = {
    data: val
  }
  this.apiService.getListOfSubEventByEventId(obj).subscribe((success) => {
    this.subeventddl = success.value;
  })
}
  }
  getEventMappingIdPostingMatrixByEventandSubEventId(val: any) {
    if(val){
      const obj = {
        fileTypeValue: this.journalTrustEstate.fileTypeValue,
        accountTypeValue: this.journalTrustEstate.accountTypeValue,
        eventId: this.journalTrustEstate.eventId,
        subEventId: val,
        voucherTypeValue:this.journalTrustEstate.voucherTypeValue
      }
      this.apiService.getEventMappingIdPostingMatrixByFileAccountEventSubEvent(obj).subscribe((success) => {
        this.postingMatrixddl = success.data[0].value;
      })
    }
  }
  calculatePostingValue() {
    setTimeout(() => {
      this.journalTrustEstate.appEventMappingId = this.journalTrustEstate.appEventMappingId;
      this.apiService.calculatePostingValue(this.journalTrustEstate).subscribe((success) => {
        this.journalTrustEstate.postingValue = success.postingValue;
        this.journalTrustEstate.totalCredit = success.totalCredit;
        this.journalTrustEstate.totalDebit = success.totalDebit;
        this.tableData = success.plstentTransactionPostingList;
        this.tableData.forEach((element: any) => {
          if (element.postingNatureValue === 'CREDT') {
            this.getCreditValue = 0
            this.getCreditValue = Number(element.postingValue)
            this.creditTotal = this.creditTotal + this.getCreditValue
          }
        });
        this.tableData.forEach((element: any) => {
          if (element.postingNatureValue === 'DEBIT') {
            this.getDebitValue = 0

            let getDebitValue = Number(element.postingValue)
            this.debitTotal = this.debitTotal + getDebitValue
          }
        });

        if (this.journalTrustEstate.totalCredit !== this.journalTrustEstate.totalDebit) {
          this.data.errorInfoMessage('total credit value should be equal to total debit value')
        }

      })
    }, 1000);

  }
  saveTransactionPosting() {

    if (this.financeInformationform.valid) {
      this.journalTrustEstate.voucherConfigId = this.id;
      this.journalTrustEstate.branchId = this.branchId
      this.journalTrustEstate.referenceId = this.paymentCustomerId
      this.journalTrustEstate.plstentTransactionPostingList = this.tableData;
      this.apiService.saveTransactionPosting(this.journalTrustEstate).subscribe((success) => {
        this.journalTrustEstate = success;
        // this.journalTrustEstate.totalCredit = String(Number(this.journalTrustEstate.inputValue) + Number(this.journalTrustEstate.postingValue))

        this.reDirectTo(success.transactionPostingId)
        this.editTrust = false;
        this.assignOfficerData = success.plstentTransactionPostingAssignedOfficierHistory;
        this.statusHistoryDataSource = success.plstentTransactionPostingStatusHistory;
        this.emailHistoryTableData = success.plstentTransactionPostingEmailHistory;
        this.data.successMessage(success.msg.infoMessage.msgDescription);

      })
    }
    else {
      this.errorTrue = true
    }
  }
  updateTransactionPosting() {

    if (this.financeInformationform.valid) {
      this.journalTrustEstate.voucherConfigId = this.id;
      this.journalTrustEstate.referenceId = this.paymentCustomerId
      this.apiService.saveTransactionPosting(this.journalTrustEstate).subscribe((success) => {
        this.journalTrustEstate = success;
        this.editTrust = false;
        this.assignOfficerData = success.plstentTransactionPostingAssignedOfficierHistory
        this.statusHistoryDataSource = success.plstentTransactionPostingStatusHistory;
        this.emailHistoryTableData = success.plstentTransactionPostingEmailHistory;
        this.data.successMessage(success.msg.infoMessage.msgDescription);

      })
    }
    else {
      this.errorTrue = true
    }
  }

  getBankDetails() {
    this.journalTrustEstate.bankId = 0;
    this.journalTrustEstate.chequeTransactionDate = '';
    this.journalTrustEstate.bankAccountNumber = '';
    this.journalTrustEstate.chequeTransactionNumber = '';
    this.journalTrustEstate.bankId = 0;
    this.journalTrustEstate.chequeTransactionNumber = '';
    this.journalTrustEstate.chequeTransactionDate = '';
    this.journalTrustEstate.bankAccountNumber = '';
    this.errorTrue = false;


  }
  async reDirectTo(id: any) {
    debugger
    const obj = {
      data: id,

    };
    const encode = await this.url.encode(obj);
    this.router.navigateByUrl('/home/finance/journal-trust-and-estate/detail/' + encode);
  }
  branchData(event: any) {

    this.initialData.DDLValues.DDLBranch.forEach((element: any) => {
      if (event === element.id) {
        this.journalTrustEstate.branchDesription = element.description


      }

    });
  }
  async bankDialogBox() {
    await this.initialData.getAllInitialHeadofficeBankValueDetails(this.options);
    this.data.showErrorMessage = false

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

  createBankDetail() {
    this.bankCodeValue = '';
    this.errorTrue = false
    this.createNewBankInfoValues = false
    this.apiService.createNewCustomerBank().subscribe((success) => {
      this.createBank = true;
      this.viewBank = false;
      this.editBank = false
      this.bankDialogBox();
      this.customerBank = success;
      this.getIslandFromProvince(success.iEmployerAddress.provinceId)
      this.getVillageDDLFromIsland(success.iEmployerAddress.islandId)
    })
  }
  getVillageDDLFromIsland(val: any) {
    const obj = {
      data: val
    }
    this.apiService.getIslandBasedOnVillageDDL(obj).subscribe((success) => {
      this.villageDDL = success.value
    })
  }
  getBankCode() {
    this.checkcodeDDl = []
    this.bankCodeDDl = []
    this.bankddl.forEach((code: any) => {
      this.bankCodeDDl.push(code.ientBank)
    })
    console.log(this.bankCodeDDl);
  }


  transactionData(event: any) {
    console.log(event);
    this.postingMatrixddl.forEach((element: any) => {
      if (element.id === event || this.journalTrustEstate.appEventMappingId === 0) {
        this.journalTrustEstate.transactionCode = element.name;
      }
      if (Number(this.journalTrustEstate.inputValue) !== 0 && event !== 0) {
        this.calculatePostingValue()
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

      }
      else if (event === 'ESTAT' && (element.constant === 'CASH' || element.constant === 'NONCS' || element.constant === 'COMON')) {
        this.casAccountType.push(element);

      }
    });

    this.initialData.DDLValues.DDLFileType.forEach((ele: any) => {
      if (event === ele.constant) {
        this.journalTrustEstate.fileTypeDescription = ele.description;
      }
    });
  }
  accountNum(val?: any) {
    this.initialData.DDLValues.DDLAccountType.forEach((ele: any) => {
      if (val === ele.constant) {
        this.journalTrustEstate.accountTypeDescription = ele.description
      }
    });

    const obj = {
      data: this.journalTrustEstate.fileTypeValue,
      data1: this.journalTrustEstate.accountTypeValue
    }
    this.apiService.getTrustAccountDetailsByFileandAccountTypeValues(obj).subscribe((success) => {
      this.accountNumber = success.value;
      if (val === true) {
        this.bankCode(this.journalTrustEstate.customerAccountNumber);
      }
    })
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
      data: this.journalTrustEstate.voucherConfigId,
      data1: this.journalTrustEstate.statusValue
    }
    this.apiService.createNewTransactionPostingNotes1(obj).subscribe((success) => {
      this.journalTrustEstateNotes = success;
      this.statusddl = success.ientDDL.value;
    })
  }
  saveTransactionPostingNotes(val: any) {
    if (val === 'APPRD') {
      debugger
      this.journalTrustEstateNotes.statusValue=this.journalTrustEstate.statusValue

      this.journalTrustEstateNotes.transactionPostingId = this.journalTrustEstate.transactionPostingId;
      this.journalTrustEstate.plstentTransactionPostingNotes = this.journalTrustEstateNotes;
      this.apiService.saveTransactionPostingNotes(this.journalTrustEstateNotes).subscribe((success) => {
        this.journalTrustEstate = success;
        this.showAccess()
        this.assignOfficerData = success.plstentTransactionPostingAssignedOfficierHistory
        this.notesList = success.plstentTransactionPostingNotes;
        this.dialog.closeDialog();


      })
    } else {

      if (this.notesForm.valid) {

        this.journalTrustEstateNotes.transactionPostingId = this.journalTrustEstate.transactionPostingId;
        this.journalTrustEstate.plstentTransactionPostingNotes = this.journalTrustEstateNotes;
        this.apiService.saveTransactionPostingNotes(this.journalTrustEstateNotes).subscribe((success) => {
          this.journalTrustEstate = success;
          this.showAccess()
          this.assignOfficerData = success.plstentTransactionPostingAssignedOfficierHistory
          this.notesList = success.plstentTransactionPostingNotes;
          this.dialog.closeDialog();


        })
      }

      else {
        this.errorTrue = true;
      }
    }
  }

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  handleAction(element: any) {
    console.log('Action on:', element);
  }

  pageChanged(event: any) {

  }
  Clear() {
    this.tableData = [];
    this.createTransactionPosting(this.id);
    this.data.successMessage('Data Cleared Successfully')
  }
  clearNotes() {
    this.createTransactionPostingNotes();
    this.data.successMessage('Data Cleared Successfully');
  }
  async viewEmailDetail(val: any) {
    this.data.showErrorMessage = false;
    let dialogResponse: any = await this.dialog.openDialog(EmailHistoryFormComponent, {
      height: '550px',
      width: '100%',
      maxWidth: '1170px',
      data: {
        email: val,
        title: 'Customer Update',
        icon: 'assets/icons/accordian/customer-update.svg'
      }
    });
  }
  viewBankDetailsBasedOnBankCode(x: any) {
    if (x.valid) {
      const obj = {
        data: this.bankCodeValue
      }
      this.apiService.getBankDetailsBasedOnBranchCode(obj).subscribe((success) => {
        this.customerBank = success;
        this.createNewBankInfoValues = true
        this.errorTrue = false;
        this.headOfficeBankId(success.bankId)
        if (this.customerBank.ientBank.ientAddress.provinceId !== 0) {
          this.getIslandFromProvince(this.customerBank.ientBank.ientAddress.provinceId, 'bankIslandDDL');
          this.getVillageFromIsland(this.customerBank.ientBank.ientAddress.islandId, 'bankVillageDDL');

        }

      })
    }
    else {
      this.errorTrue = true
    }
  }
  viewBankDetail(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openCustomerBankByCustomerBankId(obj).subscribe(async (success) => {
      this.viewBank = true;
      this.createBank = false;
      this.editBank = false
      this.bankDialogBox();
      this.customerBank = success
      this.customerBankRAW = JSON.parse(JSON.stringify(this.customerBank))
      this.headOfficeBankId(success.bankId)
      // this.bankProvinceVal = this.customerBank.ientBank.ientAddress.provinceId
      if (this.customerBank.ientBank.ientAddress.provinceId !== 0) {
        this.getIslandFromProvince(this.customerBank.ientBank.ientAddress.provinceId, 'bankIslandDDL');
        this.getVillageFromIsland(this.customerBank.ientBank.ientAddress.islandId, 'bankVillageDDL');

      }

    })
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
    this.journalTrustEstate.voucherConfigId = this.id
    this.errorTrue = false;
    this.apiService.createTransactionPosting(this.journalTrustEstate).subscribe((success) => {
      this.journalTrustEstate = success;
      this.showAccess()
      this.getListOfOfficerForTransactionPosting()

      this.autoPostingValue = success.plstentTransactionPostingList;
      this.filetype = this.initialData.DDLValues.DDLFileType;
      this.branchData(this.journalTrustEstate.branchId);
      this.tableData = success.plstentTransactionPostingList;


    })
  }
  async openTransactionPosting(val: any, type?: any) {

    const obj = {
      data: this.id
    }
    this.apiService
      .openTransactionPosting(obj)
      .subscribe(async (success) => {
        this.journalTrustEstate = success;
        this.getListOfOfficerForTransactionPosting()
        this.showAccess()

        console.log(this.journalTrustEstate.pentCustomer);
        
        this.assignOfficerData = success.plstentTransactionPostingAssignedOfficierHistory;
        this.notesList = success.plstentTransactionPostingNotes;
        this.statusHistoryDataSource = success.plstentTransactionPostingStatusHistory;
        this.emailHistoryTableData = success.plstentTransactionPostingEmailHistory;
        this.tableData = success.plstentTransactionPostingList;
        if (this.journalTrustEstate.plstentTransactionPostingAssignedOfficierHistory.length !== 0) {
          this.assignedOfficerName = this.journalTrustEstate.plstentTransactionPostingAssignedOfficierHistory[0].assignedOfficerFullName;
        }
        this.branchData(this.journalTrustEstate.branchId)

        

        //  if(this.journalTrustEstate.fileTypeValue!==''){
        await this.fileData(this.journalTrustEstate.fileTypeValue)
        // }

        // if(this.journalTrustEstate.accountTypeValue !==''){
        this.accountNum(true);

        // }

        // if(this.journalTrustEstate.eventId!==0){
        this.getListOfSubEventByEventId(this.journalTrustEstate.eventId)
        // }
        if(this.journalTrustEstate.subEventId!==0){
          if (this.journalTrustEstate.subEventId !== 0) {
            this.getEventMappingIdPostingMatrixByEventandSubEventId(
              this.journalTrustEstate.subEventId
            );
          }
        }
        this.tableData.forEach((element: any) => {
          if (element.postingNatureValue === 'CREDT') {
            this.getCreditValue = 0
            this.getCreditValue = Number(element.postingValue)
            this.creditTotal = this.creditTotal + this.getCreditValue
          }
        });
        this.tableData.forEach((element: any) => {
          if (element.postingNatureValue === 'DEBIT') {
            this.getDebitValue = 0

            let getDebitValue = Number(element.postingValue)
            this.debitTotal = this.debitTotal + getDebitValue
          }
        });
        // }
        // 
        // if(this.journalTrustEstate.referenceId !== 0 && this.accountNumber.length !==0){


        // }
        this.data.successMessage(success.msg.infoMessage.msgDescription);

      });

  }
  selfAssignTransactionPostingAssignedHistory() {
    this.assignedOfficer.transactionPostingId = this.journalTrustEstate.transactionPostingId;
    this.assignedOfficer.statusValue = this.journalTrustEstate.statusValue;
    this.assignedOfficer.statusId = this.journalTrustEstate.statusId;
    this.apiService.selfAssignTransactionPostingAssignedHistory(this.assignedOfficer).subscribe((success) => {
      this.journalTrustEstate = success;
      this.assignOfficerData = success.plstentTransactionPostingAssignedOfficierHistory;
      this.data.successMessage(success.msg.infoMessage.msgDescription);

    })
  }
  reAssignTransactionPostingAssignedOfficer(val: any) {
    this.assignedOfficer.assingedOfficier = val;
    this.assignedOfficer.transactionPostingId = this.journalTrustEstate.transactionPostingId;
    this.assignedOfficer.statusValue = this.journalTrustEstate.statusValue;
    this.apiService.reAssignTransactionPostingAssignedOfficer(this.assignedOfficer).subscribe((success) => {
      this.journalTrustEstate = success;
      this.assignOfficerData = success.plstentTransactionPostingAssignedOfficierHistory;
      this.data.successMessage(success.msg.infoMessage.msgDescription);

    })
  }

  paymentCustomerId: any;

  bankCode(val: any, flag?: any) {
    
    if (flag === true) {
      this.journalTrustEstate.bankId = 0;
      this.journalTrustEstate.bankAccountNumber = '';
    }

    let filterItem: any = this.accountNumber.find(
      (obj: any) => obj.ledgerId === val
    );
    this.paymentCustomerId = filterItem ? filterItem.id : 0;
    const obj = {
      data: this.paymentCustomerId,
    };
    console.log(this.paymentCustomerId ,'tedt');

    this.journalTrustEstate.referenceId = this.paymentCustomerId;
    // console.log(obj);
    this.apiService.openCustomerBankDetail(obj).subscribe(async (success) => {
      this.journalTrustEstate.pentCustomer.entCrmCustomerBankList =
        success.pentCustomer.entCrmCustomerBankList;
      this.bankddl = success.pentCustomer.entCrmCustomerBankList;
      this.journalTrustEstate.pentCustomer = success.pentCustomer

      if (
        this.journalTrustEstate.eventId !== 0 &&
        this.journalTrustEstate.subEventId !== 0
      ) {
        this.getEventMappingIdPostingMatrixByEventandSubEventId(
          this.journalTrustEstate.subEventId
        );
        this.getTotalReceiptValue();
      }

      await this.getBankCode();
      this.checkcodeDDl = this.bankCodeDDl;
    });
  }
  getTotalReceiptValue() {
    this.receiptAmount =
      Number(this.journalTrustEstate.inputValue) +
      Number(this.journalTrustEstate.postingValue);
  }
  editBankDetails() {
    this.editBank = true;
    this.createBank = false;
    this.viewBank = false;
    if (this.customerBank.ientBank.ientAddress.provinceId !== 0) {
      this.getIslandFromProvince(this.customerBank.ientBank.ientAddress.provinceId, 'bankIslandDDL')
    }
    if (this.customerBank.ientBank.ientAddress.islandId !== 0) {
      this.getVillageFromIsland(this.customerBank.ientBank.ientAddress.islandId, 'bankVillageDDL')
    }
  }
  getIslandFromProvince(val: any, type?: any) {
    const obj = {
      data: val
    }
    this.apiService.getProvinceBasedOnInslandDDL(obj, this.options).subscribe((success) => {
      this.initialDDL[type] = success.value;
      this.islandDDL = success.value
    })
  }

  getVillageFromIsland(val: any, type: any) {
    const obj = {
      data: val
    }
    this.apiService.getIslandBasedOnVillageDDL(obj).subscribe((success) => {
      this.initialDDL[type] = success.value
    })
  }
  saveBankDetails() {
    if (this.qForm.valid && this.xForm.valid) {
      this.customerBank.customerId = this.customerId
      this.apiService.saveCustomerBank(this.customerBank).subscribe((success) => {
        this.customerBank = success;
        this.bankCode(this.paymentCustomerId);
        this.tableBankData = success.entCrmCustomerBankList;
        this.dialog.closeDialog()
        this.data.successMessage(success.msg.infoMessage.msgDescription);

      })
    }
    else {
      this.errorTrue = true
    }
  }
  clearBankDetails() {
    this.errorTrue = false
    this.customerBank = JSON.parse(JSON.stringify(this.customerBankRAW));
    this.bankCodeValue = ''
    this.apiService.createNewCustomerBank().subscribe((success) => {
      this.customerBank = success;
    })
  }
  clearHeadOffice() {
    this.customerBank.ientBank.headOfficeBankId = 0
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
  if (this.journalTrustEstate.transactionPostingId !== 0) {
    const obj = {
      data: this.journalTrustEstate.transactionPostingId,
      data1: this.comments,
    };
    const options = {
      responseType: 'blob'
    }
    this.apiService.generatePrintPdfForJournal(obj, options).subscribe((success: any) => {
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
      this.customerBank.customerId = this.customerId
      this.apiService.saveCustomerBank(this.customerBank).subscribe((success) => {
        this.customerBank = success
        this.tableBankData = success.entCrmCustomerBankList;
        this.dialog.closeDialog()
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  openBankDetails() {
    const obj = {
      data: this.customerBank.customerBankId
    }
    this.apiService.openCustomerBankByCustomerBankId(obj).subscribe((success) => {
      this.headOfficeBankId(success.bankId)
      this.customerBank = success;
      this.customerBankRAW = JSON.parse(JSON.stringify(this.customerBank))
      this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.getIslandFromProvince(this.customerBank.ientBank.ientAddress.provinceId, 'bankIslandDDL');
      this.getVillageFromIsland(this.customerBank.ientBank.ientAddress.islandId, 'bankVillageDDL');
    })
  }
  navigateToList() {
    this.router.navigateByUrl('/home/finance/journal-trust-and-estate/search')
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  //tabs
  activeValue1 = true
  activeValue2 = false
  activeValue3 = false
  selectedTabValue = '1'
  selectedTabChange(val: any) {
    if (val === 1) {
      this.selectedTabValue = '1'
      this.activeValue1 = true
      this.activeValue2 = false
      this.activeValue3 = false

    }

    if (val === 2) {
      this.selectedTabValue = '2';
      this.activeValue2 = true
      this.activeValue1 = false
      this.activeValue3 = false
    }

    if (val === 3) {
      this.selectedTabValue = '3';
      this.activeValue2 = false
      this.activeValue1 = false
      this.activeValue3 = true
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

  formatCurrency(value: number, decimalPlaces: number, currency: string): string {
    return `${currency} ${value.toFixed(decimalPlaces)}`;
  }

  getAccountNo(val: any) {
    
    this.journalTrustEstate.pentCustomer.entCrmCustomerBankList.forEach(
      (ele: any) => {
        if (val === ele.bankId) {
          this.journalTrustEstate.bankAccountNumber = ele.accountNo;
          
        }
      }
    );

    this.checkcodeDDl.forEach((element:any) => {
      if(val === element.id){  
        this.journalTrustEstate.bankCode=element.bankCode
        console.log(element.bankCode + 'testid')
      }
    });
  }
  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus')
  }
  showAccess() {
    if (this.journalTrustEstate.transactionPostingId === 0 || (this.journalTrustEstate.assignedOfficerFlag && this.journalTrustEstate.reAssignFlag)) {
      this.editAccess = true
    }
    else {
      this.editAccess = false;
    }
  }
  getDDL() {
    this.checkcodeDDl = this.bankCodeDDl
  }
  getListOfOfficerForTransactionPosting() {
    const obj = {
      data1: this.id,
      data2: '',
      data3: this.journalTrustEstate.statusValue,
    };
    this.apiService
      .getListOfOfficerForTransactionPosting(obj)
      .subscribe((success) => {
        this.assignedOfficerddl = success.value;
      });
  }
}
