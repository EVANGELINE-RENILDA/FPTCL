import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  TemplateRef,
  viewChild,
  ViewChild,
} from '@angular/core';
import {
  InnerScroll,
  Row,
  ViewLabel,
} from '../../../../app-core/core-component/core-component.component';
import { FormsModule, NgForm } from '@angular/forms';
import {
  TabComponent,
  TabGroupComponent,
} from '../../../../app-core/template/tab/tab';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { StatusHistoryComponent } from '../../../../app-core/template/status-history/status-history.component';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import {
  TabSubComponent,
  TabSubGroupComponent,
} from '../../../../app-core/template/tab/tab1';
import {
  entTrustApplication,
  entTrustApplicationAssignedOfficer,
  entTrustWithdrawalApplication,
  entTrustWithdrawalApplicationDocument,
  entTrustWithdrawalApplicationNotes,
  entTrustWithdrawalApplicationOrganization,
  entWithdrawalPayment,
} from '../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { DropZoneComponent } from '../../../../app-core/template/drop-zone/drop-zone.component';
import { FileSizePipe } from '../../../../app-core/template/drop-zone/file-size.pipe';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { CoreService } from '../../../../app-core/service/core.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { DataService } from '../../../../common/services/data/data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { ErrorInfoComponent } from '../../../../app-core/error-info/error-info.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { ViewPdfComponent } from '../../../../app-core/template/view-pdf/view-pdf.component';
import { AboveThresholdComponent } from './trust-withdrawal-process/above-threshold/above-threshold.component';
import { BelowThresholdComponent } from './trust-withdrawal-process/below-threshold/below-threshold.component';
import { CourtOrderComponent } from './trust-withdrawal-process/court-order/court-order.component';
import { DetermineThresholdComponent } from './trust-withdrawal-process/determine-threshold/determine-threshold.component';
import { InspectionComponent } from './trust-withdrawal-process/inspection/inspection.component';
import { SupportDocumentComponent } from './trust-withdrawal-process/support-document/support-document.component';
import { VerifyDocumentComponent } from './trust-withdrawal-process/verify-document/verify-document.component';
import { MultiPageUrlComponent } from '../../../../app-core/template/multi-page-url/multi-page-url.component';
import { StatusHistory1Component } from '../../../../app-core/template/status-history1/status-history1.component';
import { EmailHistoryFormComponent } from '../../../crm/email-history-form/email-history-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { MakePaymentComponent } from './trust-withdrawal-process/make-payment/make-payment.component';
import { PaymentVerificationComponent } from './trust-withdrawal-process/payment-verification/payment-verification.component';
import { PaymentApprovalComponent } from './trust-withdrawal-process/payment-approval/payment-approval.component';
import { PaymentInitiationComponent } from './trust-withdrawal-process/payment-initiation/payment-initiation.component';
import { ApplicationCompletionComponent } from './trust-withdrawal-process/application-completion/application-completion.component';

@Component({
  selector: 'app-trust-withdrawal-detail',
  standalone: true,
  imports: [
    ViewLabel,
    Row,
    FormsModule,
    TabGroupComponent,
    TabComponent,
    AccordionModule,
    IconButtonComponent,
    InputControlComponent,
    AppDatePipe,
    StatusHistory1Component,
    CheckboxComponent,
    TabSubComponent,
    TabSubGroupComponent,
    AppTableComponent,
    DropZoneComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    FileSizePipe,
    ErrorInfoComponent,
    ErrorMessageComponent,
    AboveThresholdComponent,
    BelowThresholdComponent,
    CourtOrderComponent,
    DetermineThresholdComponent,
    InspectionComponent,
    SupportDocumentComponent,
    VerifyDocumentComponent,
    MultiPageUrlComponent,
    InnerScroll,MatRadioModule,
    MakePaymentComponent,PaymentVerificationComponent,PaymentApprovalComponent,PaymentInitiationComponent,ApplicationCompletionComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trust-withdrawal-detail.component.html',
  styleUrl: './trust-withdrawal-detail.component.scss',
})
export class TrustWithdrawalDetailComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  documentDDL: any = [];
  notesList: any;
  errorTrue = false;
  showSubtabData = false
  trustWithdrawalAssignedOfficer = new entTrustApplicationAssignedOfficer();
  trustWithdrawal = new entTrustWithdrawalApplication();
  trustWithdrawalNotes = new entTrustWithdrawalApplicationNotes();
  paymentDetailEdit = false;
  accept: any;
  docNameType: any;
  documentArray: any = [];
  @ViewChild('o') oForm!: NgForm;
  assignOfficerData: any = [];
  @Input() type = {
    trustApplicationId: 0,
    trustApplicationIdenityNo: 0,
    trustApplicationRejectHistoryId: 0,
    trustApplicationStageValue: '',
    isEditable: '',
    trustApplicationStepNo: 0,
  };
  __selectedItems: any = {
    currentIndex: 0,
    array: [],
  };
  application: any = {
    ientTrustApplicationAssignedOfficer: {
      assignedToFullname: 'Estate Officer ',
      assignedDate: '16-07-2024',
      tatDays: 5,
    },
  };
  clientDocumentColumns: any = [
    'documentTypeDescription',
    'fileName',
    'fileExtension',
    'fileSize',
    'action',
  ];
  clientDocumentColumnsName: any = [
    'Document Name',
    'File Name',
    'Format',
    'Size',
    'Action',
  ];
  fileExtension = 'jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv';
  assignedOfficerDDL: any = [];
  //history
  assignOfficerColumns: any = [
    'assignedToFullname',
    'assignedDate',
    'assignedByFullname',
    'statusDescription',
  ];
  assignOfficerColumnsName: any = [
    'Assigned Officer',
    'Assigned Date',
    'Assigned By',
    'Status',
  ];
  tableAssignOffice = [];
  statusHistoryDataSource: any = [];
  emailColumns: any = [
    'toEmailId',
    'sentDate',
    'sentStatusDescription',
    'action',
  ];
  emailColumnsName: any = ['To', ' Date | Time', 'Status', 'Action'];
  emailHistoryTableData: any = [];
  tablePaymentUpdateData: any = [
    {
      sno: 1,
      mode: 'Cheque',
      givenbranch: 'BRB',
      collectbranch: 'BNB',
      paymentstatus: 'Pending',
      changedby: 'Trust Officer',
      changeddate: '23 Jul 2024',
    },
  ];
  completeTrustCreationColumns: any = [];
  completeTrustCreationColumnsName: any = ['Sl.No', 'CheckList Description'];
  completeTrustCreationTableData: any = [];
  linkedColumns: any = ['description', 'action'];
  linkedColumnsName: any = ['Document Name', ' Action'];
  receiptFundColumns: any = ['1', '2', '3', '4', '5'];
  receiptFundColumnsName: any = [
    'Date',
    'Check No / Tr. No',
    'Organization',
    'Receipt No',
    'Amount',
  ];
  receiptFundTableData: any = [];
  paymentUpdateColumns: any = [
    'sno',
    'mode',
    'givenbranch',
    'collectbranch',
    'paymentstatus',
    'changedby',
    'changeddate',
  ];
  paymentUpdateColumnsName: any = [
    'S.No',
    'Payment Mode',
    'Given by Branch',
    'Collect by Branch',
    'Payment Status',
    'Changed By',
    'Changed Date',
  ];
  courtOrderColumns = [
    'designation',
    'assignedToFullname',
    'verificationDate',
    'action',
  ];
  courtOrderColumnsName = [
    'Designation',
    'User Name',
    'Verified Date',
    'Action',
  ];

  organizationColumns = [
    'organizationName',
    'bankName',
    'accountNo',
    'requestedAmount',
    'approvedAmount',
    'action'
  ];

  organizationColumnsName = [
    'Organization',
    'Bank',
    'A/c No',
    'Requested Amount',
    'Approved Amount',
    'Action'
  ];
  tableOrgData :any = [];

  bankColumns = [
    'bankName',
    'accountNo',
    'bankCode',
    'requestedAmount',
    'approvedAmount',
    'action'
  ];

  bankColumnsName = [
    'Bank',
    'A/c No',
    'Bank code',
    'Requested Amount',
    'Approved Amount',
    'Action'
  ];
tableBankData= []
  chequeColumns = [
    'organizationName',
    'chequeAmount',
    'chequeDate',
    'requestedAmount',
    'approvedAmount',
    'action'
  ];

  chequeColumnsName = [
    'Organization/ Bank',
    'Cheque No',
    'Cheque Date',
    'Requested Amount',
    'Approved Amount',
    'Action'
  ];
tableChequeData = []
  courtOrderTableData: any = [];
  trustWithdrawlId: any = 0;
  id = {
    currentIndex: 0,
    array: [],
  };
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
  };
  tableLinkedData: any = [];
  tabledocumentData: any = [];

  @ViewChild('organizationInfo', { static: false })
  organizationInfo!: TemplateRef<any>;

  @ViewChild('bankInfo', { static: false })
  bankInfo!: TemplateRef<any>;

  @ViewChild('chequeInfo', { static: false })
  chequeInfo!: TemplateRef<any>;
  constructor(
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public router: Router,
    public route: ActivatedRoute,
    public data: DataService,
    public url: UrlService,
    public appService: AppService
  ) {
    this.appService.helpFile = 'Trust%20Withdrawal%20Detail.pdf';
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }
  async init() {
    this.appService.setBreadCrumb(this.breadCrumb);
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    console.log(params);
    this.id = params;
    this.trustWithdrawlId = this.id.array[this.id.currentIndex];
    await this.data.checkToken();
    await this.initialData.getDDL('getInitialDataForTrustWithDrawal');
    this.openTrustWithdrawal();
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  notesLength = 0;
  openTrustWithdrawal() {
    const obj = {
      data: this.trustWithdrawlId,
    };
    this.apiService
      .openTrustWithdrawalApplication(obj)
      .subscribe(async (success) => {
        this.trustWithdrawal = success;
        console.log(this.trustWithdrawal.applicationStageValue === 'APPWD' || this.trustWithdrawal.applicationStageValue === 'APWDA ');
        
        await this.getSubTypeByType(success.withdrawalTypeValue);
        // await this.getOrgDetailsSub(success.organizationId);
        this.getSubTypeByType(success.withdrawalTypeValue)
        this.getOrganizationList();
        this.showSubtabData = true
        
        //  await this.getAccountNoFromBank(success.organizationBankId);
        this.tabledocumentData =
          success.lstentTrustWithdrawalApplicationDocument;
        this.notesList = success.lstentTrustWithdrawalApplicationNotes;
        this.notesLength = success.lstentTrustWithdrawalApplicationNotes.length;
        this.assignOfficerData =
          success.lstentTrustWithdrawalApplicationAssignedOfficerHistory;
        this.statusHistoryDataSource =
          success.lstentTrustWithdrawalApplicationStatusHistory;
        this.emailHistoryTableData =
          success.lstentTrustWithdrawalApplicationEmailHistory;
        // this.getDocumentDDLList();
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      });
  }
  //application
  editTrust = false;
  editTrustWithdrawal() {
    this.editTrust = true;
  }
  @ViewChild('a') aForm!: NgForm;
  saveTrustWithDrawal() {
    if (this.aForm.valid) {
      // this.trustWithdrawal.requestedAmount = this.totalRequestedAmount.toFixed(2)
      this.apiService
        .saveTrustWithdrawalApplication(this.trustWithdrawal)
        .subscribe((success) => {
          this.trustWithdrawal = success;
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
          this.editTrust = false;
        });
    } else {
      this.errorTrue = true;
    }
  }
  refreshTrustWithdrawal() {
    const obj = {
      data: this.trustWithdrawlId,
    };
    this.apiService.openTrustWithdrawalApplication(obj).subscribe((success) => {
      this.trustWithdrawal = success;
      this.errorTrue = false;
      this.data.successMessage('Data Refreshed Successfully');
    });
  }

  withdrawalByOrg(event: any) {
    if (event.target.checked === true) {
      // this.trustWithdrawal.withdrawlForOrganization = 'Y';
    } else {
      // this.trustWithdrawal.withdrawlForOrganization = 'N';
      // this.trustWithdrawal.organizationId = 0;
      // this.trustWithdrawal.organizationBankId = 0;
      this.trustWithdrawal.trustAccountNo = 0;
    }
  }

  //Organization
  trustWithdrawalOrganization = new entTrustWithdrawalApplicationOrganization();

  createOrganization() {
    const obj = {
      data: this.trustWithdrawal.trustWithdrawalApplicationId
    }
    this.apiService.createTrustWithdrawalApplicationOrganization(obj).subscribe((success)=>{
      this.trustWithdrawalOrganization =success
    })
    this.orgDialog()
  }
  openOrganization(val:any){
    const obj ={
      data:val
    }
    this.apiService.openTrustWithdrawalApplicationOrganization(obj).subscribe(async (success)=>{
      await this.getOrgDetailsSub(success.organizationId);
     await this.getAccountNoDDl(success.organizationId,success.bankId);
     setTimeout(() => {
      this.trustWithdrawalOrganization  = success;
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      this.orgDialog()
     }, 700);
    })
  }
  orgDialog(){
    this.dialog.openDialog(this.organizationInfo, {
      height: '320px',
      width: '600px',
      maxWidth: '700px',
    });
  }

  //Bank
  bankDialog(){
    this.getAllBankDDL()
    this.dialog.openDialog(this.bankInfo, {
      height: '320px',
      width: '600px',
      maxWidth: '700px',
    });
  }
  createbank() {
    
    const obj = {
      data: this.trustWithdrawal.trustWithdrawalApplicationId
    }
    this.apiService.createTrustWithdrawalApplicationOrganization(obj).subscribe((success)=>{
      this.trustWithdrawalOrganization =success;
      this.bankDialog();
    })
  }
  openBank(val:any){
    const obj = {
      data: val
    }
    this.apiService.openTrustWithdrawalApplicationOrganization(obj).subscribe((success)=>{
      this.getAccountsDDLforBankTab(success.bankId)
      this.trustWithdrawalOrganization =success;
      this.bankDialog();
    })
  }

  //cheque
  checkDialog(){
    this.dialog.openDialog(this.chequeInfo, {
      height: '320px',
      width: '600px',
      maxWidth: '700px',
    });
  }
  createcheque() {
        
    const obj = {
      data: this.trustWithdrawal.trustWithdrawalApplicationId
    }
    this.apiService.createTrustWithdrawalApplicationOrganization(obj).subscribe((success)=>{
      this.trustWithdrawalOrganization =success;
      this.checkDialog();
    })
  }
  openCheque(val:any){
    const obj = {
      data: val
    }
    this.apiService.openTrustWithdrawalApplicationOrganization(obj).subscribe((success)=>{
      this.getAccountsDDLforBankTab(success.bankId)
      this.trustWithdrawalOrganization =success;
      this.checkDialog();
    })
  }

  //notes
  actionStatusDDL = [];
  stageDDL = [];
  notesddl = [];
  async createTrustWithdrawalNotes(type?: any) {
    const obj = {
      data1: this.trustWithdrawal.applicationStatusValue,
      data2: this.trustWithdrawal.actionStatusValue,
      data3: this.trustWithdrawal.applicationStageValue,
    };
    this.apiService
      .createTrustWithdrawalApplicationNotes(obj)
      .subscribe((success) => {
        this.trustWithdrawalNotes = success;
        this.notesddl = success.iStatusDDL.value;
        this.actionStatusDDL = success.iActionStatusDDL.value;
        this.stageDDL = success.ientDDL.value;
      });
    if (type === 'clear') {
      this.data.successMessage('Data Cleared Successfully');
    } else {
      let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
        height: 'auto',
        width: '1200px',
        maxWidth: '1170px',
      });
    }
  }
  saveTrustWithdrawalNotes() {
    this.trustWithdrawalNotes.trustWithdrawalApplicationId =
      this.trustWithdrawal.trustWithdrawalApplicationId;
    this.trustWithdrawal.ientTrustWithdrawalApplicationNotes =
      this.trustWithdrawalNotes;
    this.apiService
      .saveTrustWithdrawalApplicationNotes(this.trustWithdrawal)
      .subscribe((success) => {
        this.notesList = success.lstentTrustWithdrawalApplicationNotes;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        this.dialog.closeDialog();
      });
  }

  onTabChange(event: any) {
    switch (event.tabTitle) {
      case 'Process':
        this.getProcessTab();
        break;
      case 'History':
        this.getHistoryTab();
        break;
        case 'Payment':
          this.getPaymentList();
          break
    }
  }
  onSubTabChange(event:any){
    switch (event.tabTitle) {
      case 'Bank':
        this. getBankList();
      break;
      case 'Cheque':
      this.getChequeList()
      break
    }
  }
  processDatas = false;
  getProcessTab() {
    const obj = {
      data: this.trustWithdrawal.trustWithdrawalApplicationId,
    };
    this.apiService
      .openTrustWithdrawalApplicationForProcessTab(obj)
      .subscribe((success) => {
        this.trustWithdrawal.lstentTrustWithdrawalApplicationDocument =
          success.lstentTrustWithdrawalApplicationDocument;
        this.trustWithdrawal.lstentTrustWithdrawalApplicationNotes =
          success.lstentTrustWithdrawalApplicationNotes;
        this.trustWithdrawal.lstentTrustWithdrawalApplicationChecklist =
          success.lstentTrustWithdrawalApplicationChecklist;
        this.trustWithdrawal.lstentTrustWithdrawalApplicationAssignedOfficerHistory =
          success.lstentTrustWithdrawalApplicationAssignedOfficerHistory;
        this.processDatas = true;
      });
  }
  getHistoryTab() {
    const obj = {
      data: this.trustWithdrawal.trustWithdrawalApplicationId,
    };
    this.apiService
      .openTrustWithdrawalApplicationForStatusTab(obj)
      .subscribe((success) => {
        // this.trustWithdrawal = success;
        this.trustWithdrawal.lstentTrustWithdrawalApplicationAssignedOfficerHistory =
          success.lstentTrustWithdrawalApplicationAssignedOfficerHistory;
        this.notesList = success.lstentTrustWithdrawalApplicationNotes;
        this.notesList = success.lstentTrustWithdrawalApplicationNotes;
        this.notesLength = success.lstentTrustWithdrawalApplicationNotes.length;
        this.assignOfficerData =
          success.lstentTrustWithdrawalApplicationAssignedOfficerHistory;
        this.statusHistoryDataSource =
          success.lstentTrustWithdrawalApplicationStatusHistory;
        this.emailHistoryTableData =
          success.lstentTrustWithdrawalApplicationEmailHistory;
      });
  }

  editPayemntDetailsData() {
    this.paymentDetailEdit = true;
  }
  savePaymentDetails() {
    this.paymentDetailEdit = false;
  }
  reAssignTrust() {}
  selfAssignTrust() {}

  //document
  trustWithdrawalDocument = new entTrustWithdrawalApplicationDocument();
  uploadClientDocumentAttachment(event: any) {
    if (this.trustWithdrawalDocument.documentTypeValue !== '') {
      this.trustWithdrawalDocument.trustWithdrawalApplicationId =
        this.trustWithdrawal.trustWithdrawalApplicationId;
      this.trustWithdrawalDocument.ientFile.fileName = event[0].fileName;
      this.trustWithdrawalDocument.ientFile.fileSize = event[0].fileSize;
      this.trustWithdrawalDocument.ientFile.content = event[0].content;
      this.trustWithdrawalDocument.ientFile.fileType = event[0].fileType;
      this.trustWithdrawalDocument.ientFile.content = event[0].content;
      // this.trustWithdrawalDocument.type = this.application.trustTypeValue;
      this.trustWithdrawalDocument.applicationStageValue =
        this.application.applicationStageValue;
      // this.trustWithdrawalDocument.identityNo = this.application.identifierCount;
      this.apiService
        .saveTrustWithdrawalApplicationDocument(this.trustWithdrawalDocument)
        .subscribe((success) => {
          this.tabledocumentData =
            success.lstentTrustWithdrawalApplicationDocument;
          this.trustWithdrawalDocument.documentTypeValue = '';
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        });
    } else {
      this.data.errorInfoMessage('Select any Document Type');
    }
  }

  async checkDocumentDelete(docId: any) {
    let msg = `Are you sure, You want to delete : ${docId.documentTypeDescription} ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      const obj = {
        data: docId.trustApplicationDocumentId,
      };
      this.apiService
        .deleteTrustWithdrawalApplicationDocument(obj)
        .subscribe((success) => {
          this.tabledocumentData = success;
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        });
    }
  }
  viewFile(element: any) {
    let base64Data = element.ientFile.content.split(';base64,').pop();
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: element.ientFile.fileType });

    const url = URL.createObjectURL(blob);
    if (element.ientFile.fileType === 'application/pdf') {
      this.openPDFViewer(url);
    } else if (element.ientFile.fileType.includes('image')) {
      this.imageView(url, element.ientFile.fileName, element);
    }
  }
  openPDFViewer(xurl: any) {
    const dialogRef = this.dialog.openDialog(ViewPdfComponent, {
      width: '100%',
      height: '85%',
      data: {
        url: xurl,
      },
    });
  }
  completeApplicationStage() {}
  downloadLinkedFile(val: any) {}
  documentTypeDatas(event: any) {
    const obj = {
      data: event,
    };
    this.apiService
      .createTrustApplicationDocument(obj)
      .subscribe((success: any) => {
        // this.estateApplicationDocument = success
      });
  }
  onChange(event: any) {}

  imageId: any = '';
  downloadImageFile() {
    this.downloadFile(this.imageId);
    this.dialog.closeAll();
    if (this.application.applicationStageValue === 'OBDOC') {
    }
  }
  downloadFile(element: any) {
    let base64Data: any = element.ientFile.content.split(';base64,').pop();
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: element.ientFile.fileType });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = element.ientFile.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  filePath = '';
  fileName = '';
  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;
  imageView(path: any, filename: any, val: any) {
    this.filePath = path;
    this.fileName = filename;
    this.imageId = val;
    this.dialog.openDialog(this.Templates, {
      width: '600px',
      height: 'auto',
    });
  }
  navigateToList() {
    this.router.navigateByUrl('/home/trust/trust-withdrawal');
  }

  // getDocumentDDLList() {
  //   const obj = {
  //     data1: this.trustWithdrawal.withdrawalTypeValue,
  //     data2: this.trustWithdrawal.actionStatusValue,
  //     data3: this.trustWithdrawal.applicationStageValue
  //   }
  //   this.apiService.getInitialDataForTrustWithDrawalDocument(obj).subscribe((success) => {
  //     this.documentArray = success.data[0]
  //   })
  // }
  //process
  withdrawalNotes = new entTrustWithdrawalApplicationNotes();
  createWithdrawalNotes() {
    const obj = {
      data1: '',
      data2: '',
      data3: '',
    };
    this.apiService
      .createTrustWithdrawalApplicationNotes(obj)
      .subscribe((success) => {
        this.withdrawalNotes = success;
      });
  }
  @ViewChild('n') nForm!: NgForm;
  saveWithdrawalNotes() {
    this.apiService
      .saveTrustWithdrawalApplicationNotes(this.trustWithdrawal)
      .subscribe((success) => {
        this.trustWithdrawal = success;
        this.notesList = success.lstentTrustWithdrawalApplicationNotes;
        this.notesLength = success.lstentTrustWithdrawalApplicationNotes.length;
        this.assignOfficerData =
          success.lstentTrustWithdrawalApplicationAssignedOfficerHistory;
        this.statusHistoryDataSource =
          success.lstentTrustWithdrawalApplicationStatusHistory;
        this.emailHistoryTableData =
          success.lstentTrustWithdrawalApplicationEmailHistory;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      });
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
          title: 'Trust Withdrawal',
          icon: 'assets/icons/accordian/trust.svg',
        },
      }
    );
  }

  //payment
  withdrawalPayment = new entWithdrawalPayment();
  createWithdrawalPayment() {
    this.apiService.createWithdrawalPayment().subscribe((success) => {
      this.withdrawalPayment = success;
    });
  }
  saveWithdrawalPayment() {
    this.apiService
      .saveWithdrawalPayment(this.withdrawalPayment)
      .subscribe((success) => {
        this.withdrawalPayment = success;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      });
  }
  openWithdrawalPayment() {
    const obj = {
      data: this.trustWithdrawlId,
    };
    this.apiService.openWithdrawalPayment(obj).subscribe(async (success) => {
      this.withdrawalPayment = success;
      await this.getOrgDetailsSub(success.organizationId);
      this.getAccountNoDDl(success.organizationId,success.bankId);
    });
  }

  organizationDDl = [];
  getOrgByType(val: any) {
    // const obj = {
    //   data: val
    // }
    // this.apiService.getOrganizationBasedOnWithDrawType(obj).subscribe((success) => {
    //   this.organizationDDl = success.data[0].value
    // })
  }
  subTypeValue = [];
  getSubTypeByType(val: any) {
    const obj = {
      data: val,
    };
    this.apiService
      .getSubtypeBasedOnWithdrawalType(obj)
      .subscribe((success) => {
        this.subTypeValue = success.data[0].value;
        this.organizationDDl = success.data[1].value;
      });
  }

  orgBankDDL: any;
  getOrgDetailsSub(val: any) {
    const obj = {
      data:  val
   
    };
    this.apiService
      .getOrganizationDeatilsByOrganization(obj)
      .subscribe((success) => {
        this.orgBankDDL = success.data[0].value;
      });
  }
  // getOrgDetails(val: any) {
  //   const obj = {
  //     data: val,
  //   };
  //   this.apiService
  //     .getOrganizationDeatilsByOrganization(obj)
  //     .subscribe((success) => {
  //       this.orgBankDDL = success.data[0].value;
  //       // this.trustWithdrawal.organizationAccountNo = '';
  //     });
  // }
  accountNoDDL:any
  getAccountNoDDl(val1:any,val2:any){
    const obj = {
      data1: val1,
      data2: val2
    };
    this.apiService
      .getAccountNoBasedOnOrganization(obj)
      .subscribe((success) => {
        this.accountNoDDL = success.data[0].value;
        // this.trustWithdrawal.organizationAccountNo = '';
      });
  }
  // accountNo = '';
  // getAccountNoFromBank(event: any) {
  //   this.orgBankDDL.forEach((element: any) => {
  //     if (element.id === event) {
  //       console.log(element);

  //       // this.trustWithdrawal.organizationAccountNo = element.constant;
  //     }
  //   });
  // }
  paymentColumns: any = ['reference','status',  'narrative','transaction','documemtDate', 'source'];
  paymentColumnName: any = [
   'Reference','Organisation/ Customer Name', 
    'Narration','Transaction Amount','Transaction Date','Status'
  ];
  tablePaymentData: any = [];

  //applicationPayment
  totalRequestedAmount = 0;
  getOrganizationList(){
    const obj = {
      data:this.trustWithdrawal.trustWithdrawalApplicationId
    }
    this.apiService.getListofTrustWithdrawalApplicationOrganization(obj).subscribe((success)=>{
  this.tableOrgData = success.lstentTrustWithdrawalApplicationOrganization;
// console.log(success.lstentTrustWithdrawalApplicationOrganization.length);

// for (const entry of success.lstentTrustWithdrawalApplicationOrganization) {
//   this.totalRequestedAmount += parseFloat(entry.requestedAmount);
// }
// this.trustWithdrawal.requestedAmount = this.totalRequestedAmount.toFixed(2)
    })
  }
  saveOrganization(){
    if(this.oForm.valid){
      this.trustWithdrawalOrganization.trustWithdrawalApplicationId = this.trustWithdrawal.trustWithdrawalApplicationId
      this.apiService.saveTrustWithdrawalApplicationOrganization(this.trustWithdrawalOrganization).subscribe((success)=>{
        this.tableOrgData = success.lstentTrustWithdrawalApplicationOrganization;
        // this.totalRequestedAmount = 0 
        // for (const entry of success.lstentTrustWithdrawalApplicationOrganization) {
        //   this.totalRequestedAmount += parseFloat(entry.requestedAmount);
        // }
        // this.trustWithdrawal.requestedAmount = this.totalRequestedAmount.toFixed(2)
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        this.data.showErrorMessage = false;
        this.dialog.closeAll()
      })
    }
    else{
      this.errorTrue = true
    }
  }
  clearOrganization(){
    const obj = {
      data: this.trustWithdrawal.trustWithdrawalApplicationId
    }
    this.apiService.createTrustWithdrawalApplicationOrganization(obj).subscribe((success)=>{
      this.trustWithdrawalOrganization = success;
      this.data.successMessage('Data Cleared Successfully');
      this.errorTrue = false;
      this.data.showErrorMessage = false
    })
  }
  refreshOrganization(val:any){
    const obj = {
      data:val
    }
    this.apiService.openTrustWithdrawalApplicationOrganization(obj).subscribe( async (success)=>{
      await this.getOrgDetailsSub(success.organizationId);
    await  this.getAccountNoDDl(success.organizationId,success.bankId);
      this.trustWithdrawalOrganization = success;
      this.data.successMessage('Data Refreshed Successfully');
        this.errorTrue = false;
        this.data.showErrorMessage = false
  
    })
  }
  getBankList(){
    const obj = {
      data: this.trustWithdrawal.trustWithdrawalApplicationId
    }
    this.apiService.getListofTrustWithdrawalApplicationOrganizationForBank(obj).subscribe((success)=>{
      this.tableBankData = success.lstentTrustWithdrawalApplicationOrganization
    })
  }
  bankDDLforBank:any ;
  accountsDDLForBank:any 
  getAccountsDDLforBankTab(val:any){
    const obj={data1: this.trustWithdrawal.appliedCustomerId,data2:val}
    this.apiService.getAccountNoBasedOnBankAndCustomer(obj).subscribe((success)=>{
      this.accountsDDLForBank = success.data[0].value
      console.log(this.accountsDDLForBank);
      
    })
  }
  getAllBankDDL(){
    const obj = {
      data: this.trustWithdrawal.appliedCustomerId
    }
    this.apiService.getListofBankByCustomer(obj).subscribe((success)=>{
      this.bankDDLforBank = success.data[0].value
      console.log(this.accountsDDLForBank);

    })
  }

  // //bank
  @ViewChild('b') bForm!: NgForm;
  saveBankDetails(){
    if(this.bForm.valid){
      this.trustWithdrawalOrganization.trustWithdrawalApplicationId = this.trustWithdrawal.trustWithdrawalApplicationId
      this.apiService.saveTrustWithdrawalApplicationOrganization(this.trustWithdrawalOrganization).subscribe((success)=>{
        this.tableBankData = success.lstentTrustWithdrawalApplicationOrganization;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        this.data.showErrorMessage = false;
        this.dialog.closeAll()
      })
    }
    else{
      this.errorTrue = true
    }
  }
  refreshBank(){
    const obj = {
      data: this.trustWithdrawalOrganization.trustWithdrawalApplicationOrganizationId
    }
    this.apiService.openTrustWithdrawalApplicationOrganization(obj).subscribe((success)=>{
      this.trustWithdrawalOrganization = success;
      this.data.showErrorMessage = false;
      this.data.successMessage('Data Refreshed Successfully')
    })
  }


  @ViewChild('c') cForm!: NgForm;
  saveCheckDetails(){
    if(this.cForm.valid){
      this.trustWithdrawalOrganization.trustWithdrawalApplicationId = this.trustWithdrawal.trustWithdrawalApplicationId
      this.apiService.saveTrustWithdrawalApplicationOrganization(this.trustWithdrawalOrganization).subscribe((success)=>{
        this.tableChequeData = success.lstentTrustWithdrawalApplicationOrganization;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        this.data.showErrorMessage = false;
        this.dialog.closeAll()
      })
    }
    else{
      this.errorTrue = true
    }
  }
  getChequeList(){
    const obj = {
      data: this.trustWithdrawal.trustWithdrawalApplicationId
    }
    this.apiService.getListofTrustWithdrawalApplicationOrganizationForCheck(obj).subscribe((success)=>{
      this.tableChequeData = success.lstentTrustWithdrawalApplicationOrganization;
    })
  }
  closeDialog(){
    this.data.showErrorMessage = false;
    this.errorTrue = false
    this.dialog.closeDialog()
  }
  //payment List 
  getPaymentList(){
    const obj = {
      data: this.trustWithdrawal.trustWithdrawalApplicationId,
      data1:'withdrawal'
    }
    this.apiService.getTransactionDetailsByWithdrawalId(obj).subscribe((success)=>{
      this.tablePaymentData = success.lstentTrasactionDetail
    })
  }
}
