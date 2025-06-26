import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from '../../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { entCustomer, entCustomerSearch, entTrustApplication, entTrustApplicationApplicant, entTrustApplicationAssignedOfficer, entTrustApplicationBenificiary, entTrustApplicationClient, entTrustApplicationClientOrg, entTrustApplicationDocument, entTrustApplicationNotes, entTrustApplicationParentAddtionalInfo, entTrustApplicationSettlor, entTrustApplicationTrustee, entTrustBenificiary } from '../../../../common/api-services/application-api/application-api.classes';
import { FormsModule, NgForm } from '@angular/forms';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { MultiPageUrlComponent } from '../../../../app-core/template/multi-page-url/multi-page-url.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { TrustApplicationDialogComponent } from './trust-application-dialog/trust-application-dialog.component';
import { TabComponent, TabGroupComponent } from '../../../../app-core/template/tab/tab';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { AttachmentViewComponent } from '../../../../app-core/template/attachment-view/attachment-view.component';
import { FileSizePipe } from "../../../../app-core/template/drop-zone/file-size.pipe";
import { MultiTabAccordionComponent } from '../../../../app-core/app-template/multi-tab-accordion/multi-tab-accordion.component';
import { TabSubComponent, TabSubGroupComponent } from '../../../../app-core/template/tab/tab1';
import { CourtOrderComponent } from './court-order/court-order.component';
import { OpenFileComponent } from './open-file/open-file.component';
import { InitialDocumentComponent } from './initial-document/initial-document.component';
import { TrustAccountComponent } from './trust-account/trust-account.component';
import { RegisterTrustComponent } from './register-trust/register-trust.component';
import { ReceiptFundComponent } from './receipt-fund/receipt-fund.component';
import { ConductInterviewComponent } from './conduct-interview/conduct-interview.component';
import { FinalizeTrustDeedComponent } from './finalize-trust-deed/finalize-trust-deed.component';
import { CompleteTrustCreationComponent } from './complete-trust-creation/complete-trust-creation.component';
import { SummaryComponent } from './summary/summary.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { CommonModule, NgClass } from '@angular/common';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { KycEditComponent } from '../../../../app-core/template/kyc-edit/kyc-edit.component';
import { SocialPlatformEditComponent } from '../../../../app-core/template/social-platform-edit/social-platform-edit.component';
import { ErrorInfoComponent } from '../../../../app-core/error-info/error-info.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { EmailHistoryFormComponent } from '../../../crm/email-history-form/email-history-form.component';
import { StatusHistoryComponent } from '../../../../app-core/template/status-history/status-history.component';
import { ClientDocumentComponent } from './client-document/client-document.component';
import { MatTooltip } from '@angular/material/tooltip';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { differenceInYears } from 'date-fns/differenceInYears';
import { parse } from 'date-fns';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { ReviewOpenFileComponent } from './review-open-file/review-open-file.component';
import { ApprovalOpenFileComponent } from './approval-open-file/approval-open-file.component';
import { ReviewTheDocumentComponent } from './review-the-document/review-the-document.component';
import { ApprovalOfDocumentComponent } from './approval-of-document/approval-of-document.component';
import { ApprovalByMlComponent } from './approval-by-ml/approval-by-ml.component';
import { ReviewByMetComponent } from './review-by-met/review-by-met.component';
import { PreparationOfLegalDocComponent } from './preparation-of-legal-doc/preparation-of-legal-doc.component';
import { FillingDocComponent } from './filling-doc/filling-doc.component';



@Component({
  selector: 'app-trust-application-dummy',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trust-application-dummy.component.html',
  styleUrl: './trust-application-dummy.component.scss',
  imports: [FormsModule, ViewLabel, Row, InnerScroll, InputControlComponent, MultiPageUrlComponent,
     AppDatePipe, AppTableComponent, IconButtonComponent, CellDefDirective, CellHeaderDefDirective, 
     TabGroupComponent, NgClass, TabComponent, AccordionModule, FileSizePipe, MultiTabAccordionComponent, 
     TabSubComponent, TabSubGroupComponent, CourtOrderComponent, ClientDocumentComponent, OpenFileComponent,
      InitialDocumentComponent, ErrorInfoComponent, ErrorMessageComponent, TrustAccountComponent,
       RegisterTrustComponent, ReceiptFundComponent, AppTableComponent, CellDefDirective,
        CellHeaderDefDirective, ConductInterviewComponent, FinalizeTrustDeedComponent, 
        CompleteTrustCreationComponent, SummaryComponent, MatSlideToggle, AddressEditComponent,
         KycEditComponent, SocialPlatformEditComponent, StatusHistoryComponent, CommonModule, MatTooltip, 
         SearchComponent, AppAccessDirective, ButtonAccessDirective,
         ReviewOpenFileComponent,ApprovalOpenFileComponent,ReviewTheDocumentComponent,
         ApprovalOfDocumentComponent, ApprovalByMlComponent,ReviewByMetComponent,PreparationOfLegalDocComponent, FillingDocComponent]
})
export class TrustApplicationDummyComponent {
  id = {
    currentIndex: 0,
    array: []
  };
  trustApplicationId = 0
  currentDate = '';
  pageId = 'TAPSR'
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  options = {
    hideFullSpinner: true
  }
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  trustApplication = new entTrustApplication();
  trustApplicationDocument = new entTrustApplicationDocument();
  trustApplicationAssignedOfficer = new entTrustApplicationAssignedOfficer();
  trustApplicationClient = new entTrustApplicationClient();
  trustApplicationClientRAW = new entTrustApplicationClient();
  clientOrganization = new entTrustApplicationClientOrg();
  clientOrganizationRAW = new entTrustApplicationClientOrg();
  trustApplicantParentInfo = new entTrustApplicationParentAddtionalInfo();
  trustApplicantParentInfoRAW = new entTrustApplicationParentAddtionalInfo();
  trustApplicationApplicant = new entTrustApplicationApplicant();
  trustApplicationApplicantRAW = new entTrustApplicationApplicant();
  trustApplicationBenificiary = new entTrustApplicationBenificiary();
  trustApplicationBenificiaryRAW = new entTrustApplicationBenificiary();
  trustApplicationTrustee = new entTrustApplicationTrustee();
  trustApplicationTrusteeRAW = new entTrustApplicationTrustee();
  trustApplicationSettlor = new entTrustApplicationSettlor();
  trustApplicationSettlorRAW = new entTrustApplicationSettlor();

  customer = new entCustomerSearch()

  notesList: any;
  documentArray = [];
  clientOrganizationTableData: any;
  errorTrue = false;

  //document
  fileExtension = "jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv";
  fileTypePattern = /(\.xlx|\.xlsx|\.DOC|\.pdf|\.PDF)$/i;
  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword';
  uploadError = "File size exceeds the limit of 10mb and will not be uploaded";
  uploadLimit = 10;
  attachmentList: any = [];
  @ViewChild(AttachmentViewComponent) imageViewer: any;
  @ViewChild('courtOrderAttachments') courtOrderAttachments!: any;
  @ViewChild('initialDocumentAttachments') initialDocumentAttachments!: any;
  @ViewChild('registerTrustAttachments') registerTrustAttachments!: any;
  dialogName: any = ''

  //dialogBox
  @ViewChild('clientInfo', { static: false })
  clientInfo!: TemplateRef<any>;
  @ViewChild('clientOrg', { static: false })
  clientOrg!: TemplateRef<any>;
  @ViewChild('applicantInfo', { static: false })
  applicantInfo!: TemplateRef<any>;
  @ViewChild('applicantAddnInfo', { static: false })
  applicantAddnInfo!: TemplateRef<any>;
  @ViewChild('beniDialog', { static: false })
  beniDialog!: TemplateRef<any>;
  @ViewChild('settlorDialog', { static: false })
  settlorDialog!: TemplateRef<any>;
  @ViewChild('trusteeDialog', { static: false })
  trusteeDialog!: TemplateRef<any>;
  @ViewChild('customerSearchDialog', { static: false })
  customerSearchDialog!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;

  //table Data
  //customer
  customerColumns: any = ["customerRefNo", "customerName", "genderDescription", "dateOfBrith", "emailId", "contactNo", "statusdescription", "action"];
  customerColumnsName: any = ["Customer No", "Customer Name", "Gender", "Date Of Birth", "Email ID", "Contact Number", "Status", ""];
  customertableData: any = [];

  //client
  clientColumns: string[] = ['crm', 'bankName', 'bankCode', 'effectiveDate', 'contatc', 'dateOfBrith', 'isPrimaryClient', '', 'action']
  ClientColumnsName: string[] = ['Client CRM No', 'Gender', 'Date of Birth', 'Email ID', 'Contact No', '', "Is Primary Client", "", ""]
  tableClientData = []

  //applicant
  applicantColumns: string[] = ['crm', 'bankName', 'bankCode', 'effectiveDate', 'contactNo', 'dateOfBrith', 'isPrimaryApplicant', '', 'action']
  applicantColumnsName: string[] = ['Client CRM No', 'Gender', 'Date of Birth', 'Email ID', 'Contact No', '', "Is Primary Applicant", "", "Action"]
  tableApplicantData = [];

  //Applicant Addn
  applicantAddnColumns: any = ['childrenName', 'dateOfBirth', 'genderDescription', 'action']
  applicantAddnColumnsName: any = ['Children Name', 'Date Of Birth', 'Gender', ""]
  applicantAddnTableData: any = []

  //beneficiary
  beneficiaryColumns: string[] = ['crm', 'bankName', 'bankCode', 'effectiveDate', 'contatc', 'dateOfBrith', 'minor', 'action']
  beneficiaryColumnsName: string[] = ['Client CRM No', 'Gender', 'Date of Birth', 'Guardian Name', 'Contact No', 'father', 'Is Minor', "Action"]
  tableBenificiaryData = []

  //settlor
  settlorColumns: string[] = ['crm', 'bankName', 'bankCode', 'effectiveDate', 'contatc', 'isPrimaryClient', '', 'action'];
  settlorColumnsName: string[] = ['Client CRM No', 'Gender', 'Date Of Birth', 'Email ID', 'Contact No', "Is FPTCL", "", ""]
  tableSettlorData: any = []

  //trustee
  trusteeColumns: string[] = ['crm', 'bankName', 'bankCode', 'effectiveDate', 'contatc', 'isPrimaryClient', '', 'action']
  trusteeColumnsName: string[] = ['Client CRM No', 'Gender', 'Date Of Birth', 'Email ID', 'Contact No', "Is FPTCL", "", ""]
  tableTrusteeData: any = []

  //clientDoc
  clientDocumentColumns: any = ['documentTypeDescription', 'fileName', 'fileExtension', 'fileSize', 'action']
  clientDocumentColumnsName: any = ['Document Name', 'File Name', 'Format', 'Size', 'Action']
  clientDocumentTableData: any = []
  //clientSubDoc
  clientSubDocumentColumns: any = ['documentTypeDescription', 'fileName', 'action']
  clientSubDocumentColumnsName: any = ['Document Name', 'File Name', 'Action']
  clientSubDocumentTableData: any = [];

  //clientOrgCol
  clientOrganizationColumns: any = ['organizationName', 'settlementAmount', 'nomineeName', 'nomineeDob', 'action']
  clientOrganizationColumnsName: any = ['Organization Name', 'Settlement Amount', 'Nominee Name', "Nominee DOB", '']

  //assigned Officer
  assignOfficerColumns: any = ["assignedToFullname", "assignedDate", "assignedByFullname", "statusDescription"];
  assignOfficerColumnsName: any = ["Assigned Officer", "Assigned Date", "Assigned By", "Status",];
  completeTrustCreationColumns: any = [];

  //history
  showStatusHistory = true
  showEmailHistory = false

  //card-accordian
  accordianOpen = true
  //forms
  @ViewChild('applicantForm') applicantForm!: NgForm;
  @ViewChild('benificiaryForm') benificiaryForm!: NgForm;
  @ViewChild('trusteeForm') trusteeForm!: NgForm;
  @ViewChild('settlorForm') settlorForm!: NgForm;
  @ViewChild('clientForm') clientForm!: NgForm;
  @ViewChild('notesForm') notesForm!: NgForm;
  @ViewChild('notiForm') notiForm!: NgForm;
  @ViewChild('clientDocNotes') clientDocNotes!: NgForm;
  @ViewChild('clientOrgForm') clientOrgForm!: NgForm;
  @ViewChild('legalApproveForm') legalApproveForm!: NgForm;

  loading = false;
  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public url: UrlService,
    public router: Router,
    public searchDialog: CoreService,
    private appService: AppService,
    public appSetting: AppSettingsService
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
      this.appService.helpFile ='Trust%20Application%20Detail.pdf'
    });
  }


  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);

  }

  async init() {

    this.appService.setBreadCrumb(this.breadCrumb);
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    console.log(params);
    this.id = params;
    this.trustApplicationId = this.id.array[this.id.currentIndex];
    await this.data.checkToken();
    this.initialData.getDDL('getInitialDataForTrustApplication', this.options);
    this.initialData.getDDL('getInitialDataForCustomer', this.options);
    this.openTrustApplicationDetails()
    this.currentDate = this.appService.getCurrentDate();
    await this.loadProvinceDDL();
  }
  ProvinceDDL:any
  loadProvinceDDL(){
    this.apiService.loadAllMProvince().subscribe((success)=>{
      this.initialData.DDLValues.DDLProvince = success.value
    })
  }
  dialogCloseAll() {
    this.data.showErrorMessage = false;
    this.dialog.closeAll()
  }
  dialogClose(val?:any) {
    this.data.showErrorMessage = false;
    this.dialog.closeDialog(val);
  }
  @ViewChild('w') wForm!: NgForm;

  getRefNo(val: any,id:any) {
    if (this.dialogName === 'client') {
      this.openCustomerForClient(val);

      this.dialogClose('customerList')
    }
    if (this.dialogName === 'beni') {
      this.openCustomerForBenificiary(val);
      // this.clientView = 'hide';
      this.dialogClose('customerList')
    }
    if (this.dialogName === 'applicant') {
      this.openCustomerForApplicant(val);
      this.clientView = 'hide';
      this.dialogClose('customerList')
    }
    if (this.dialogName === 'trustee') {
      this.openCustomerForTrustee(val);
      this.clientView = 'hide';
      this.dialogClose('customerList')
    }
    if (this.dialogName === 'settlor') {
      this.openCustomerForSettlor(val);
      this.clientView = 'hide';
      this.dialogClose('customerList')
    }

  }
  openCustomerForClient(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openCustomer(obj).subscribe((success: any) => {
      this.trustApplicationClient.ientCustomer = success
      this.clientView = 'show';
      this.clientToggleActive = true;
      this.editClientBtn = false;
      // this. getAssignedOfficerList()
    })
  }
  showAge:any
  // ageCalculator(age:any){
  //   debugger
  //   if(age){
  //     const convertAge = new Date(age);
  //     const timeDiff = Math.abs(Date.now() - convertAge.getTime());
  //     this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
  //     console.log(this.showAge);
  //     if(this.showAge >=18){
  //       this.trustApplicationBenificiary.isMinor = 'N'
  //      }

  //      else{
  //     this.trustApplicationBenificiary.isMinor = 'Y'
  //      }

  //   }
  // }
  openCustomerForBenificiary(val: any) {

    const obj = {
      data: val
    }
    this.apiService.openCustomer(obj).subscribe(async (success: any) => {
      await this.ageCalculator(success.dateOfBirth)
      this.trustApplicationBenificiary.ientBeneficaryCustomer = success;
      this.createClientCustomer = true
      this.clientToggleActive = true
      this.clientView = 'show';


    })
  }

  openCustomerForGuardian(val: any) {

    const obj = {
      data: val
    }
    this.apiService.openCustomer(obj).subscribe((success: any) => {
      this.trustApplicationBenificiary.gaurdianDateOfbirth = success.dateOfBirth
    })
  }
  openCustomerForTrustee(val: any) {

    const obj = {
      data: val
    }
    this.apiService.openCustomer(obj).subscribe((success: any) => {
      this.trustApplicationTrustee.ientCustomer = success;
      this.trustApplicationTrustee.customerId = success.customerId
      this.createClientCustomer = true;
      this.clientToggleActive = true;
      this.editClientBtn = false;
      this.clientView = 'show';
    })
  }
  openCustomerForSettlor(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openCustomer(obj).subscribe((success: any) => {
      this.trustApplicationSettlor.ientCustomer = success;
      this.trustApplicationSettlor.customerId = success.customerId
      this.createClientCustomer = true
      this.clientToggleActive = true
      this.editClientBtn = false
      this.clientView = 'show';
    })
  }
  editApplicantData = true;
  applicantSearch = false;
  applicantAddnData = false
  openCustomerForApplicant(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openCustomer(obj).subscribe((success: any) => {
      this.trustApplicationApplicant.ientCustomer = success;
      this.trustApplicationApplicant.customerId = success.customerId
      this.editApplicantData = false;
      this.applicantSearch = true;
      this.applicantAddnData = true
      console.log(this.trustApplicationApplicant.ientCustomer.customerId);
      this.clientToggleActive = true

    })
  }
  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.customer.pageNumber = 1;
    this.searchCustomer();
   
  }
  clear() {
    this.createCustomerSearch();
    this.data.successMessage('Data Cleared Successfully')
  }
  async customerSearch(type: any) {
    this.dialogName = type
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.customerSearchDialog, {
      height: '500px',
      width: '1050px',
      maxWidth: '1170px',

    }, 'customerList');
    this.createClientCustomer = true
    if (dialogResponse) {

    }
  }
  //tabs
  onTabChange(event: any) {
    switch (event.tabTitle) {
      case 'History':
        this.getListOfNotes();
        this.getAssignedOfficerList();
        this.getStatusHistoryList();
        this.getlistOfCommunicationHistory();
        break
    }
  }
  onSubChange(event: any) {
    console.log(event.tabTitle);
    switch (event.tabTitle) {
      case 'Client': this.getTrustClientList()
        break;
      case 'Applicant': this.getTrustApplicantList()
        break;
      case 'Beneficiary': this.getTrustBenificiaryList()
        break;
      case 'Source Of Income': this.getSettlorList()
        break;
      case 'Trustee': this.getTrusteeList()
        break
    }
  }

  openTrustApplicationDetails() {
    const obj = {
      data: this.trustApplicationId
    }
    this.apiService.openTrustApplicationWithChilds(obj).subscribe(async (success: any) => {
      this.trustApplication = success;
      this.getClientList()
      this.notesList = success.lstentTrustApplicationNotes;
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      this.documentType();
      if (success.applicationStageValue === 'OBCRO') {
        this.documentTypeDatas(this.trustApplicationDocument.trustApplicationDocumentId = 241)

      }
    })
  }

  documentType() {
    const obj = {
      data: this.trustApplicationId,
      data1: this.trustApplication.applicationStageValue
    }
    this.apiService.getListOfDocumentByTrustApplicationId(obj).subscribe((success: any) => {
      this.documentArray = success.lstentTrustApplicationDocument;
      // this.clientDocumentTableData = success.lstentTrustApplicationDocument;
      success.lstentTrustApplicationDocument.forEach((element: any) => {
        if (element.ientFile.fileName !== '') {
          this.clientDocumentTableData.push(element)
        }
        else {

        }
        //   console.log(this.clientDocumentTableData, 'check');

      });
    })
  }

  documentTypeDatas(event: any) {
    // const obj = {
    //   data: event
    // }
    // this.apiService.openTrustApplicationDocument(obj).subscribe((success: any) => {
    //   this.trustApplicationDocument = success
    // })
  }

  navigateToList() {
    this.router.navigateByUrl('/home/trust/trust-application')
  }

  //client
  getClientList() {
    const obj = {
      data: this.trustApplicationId
    }
    this.apiService.getListofTrustApplicationClient(obj).subscribe((success) => {
      this.tableClientData = success.lstentTrustApplicationClient;
    })
  }


  async navigateToDialog(val: any, type: any, method?: any) {
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(TrustApplicationDialogComponent, {
      height: '600px',
      width: '1200px',
      maxWidth: '1170px',
      data: {
        type: type,
        val: val,
        method: method
      }
    });
    if (dialogResponse) {

    }
  }


  //assignedOfficer
  assignedOfficerDDL: any = []
  getAssignOfficerDDL() {
    const obj = {
      data1: this.trustApplicationId,
      data2: this.trustApplication.actionStatusValue,
      data3: this.trustApplication.applicationStageValue
    }
    this.apiService.getListOfOfficerTrustApplication(obj).subscribe((success: any) => {
      this.assignedOfficerDDL = success.value
    })
  }
  reAssignTrust() {
    this.trustApplicationAssignedOfficer.trustApplicationId = this.trustApplication.trustApplicationId;
    this.trustApplication.ientTrustApplicationAssignedOfficer = this.trustApplicationAssignedOfficer
    this.apiService.reAssignTrustApplicationAssignedHistory(this.trustApplication).subscribe((success: any) => {
      this.trustApplication = success
    })
  }
  selfAssignTrust() {
    this.trustApplicationAssignedOfficer.trustApplicationId = this.trustApplication.trustApplicationId
    this.apiService.selfAssignTrustApplicationAssignedHistory(this.trustApplicationAssignedOfficer).subscribe((success: any) => {
      this.trustApplication = success
    })
  }
  //getList

  getTrustClientList() {
    const obj = {
      data: this.trustApplicationId
    }
    this.apiService.getListofTrustApplicationClient(obj).subscribe((success: any) => {
      this.tableClientData = success.lstentTrustApplicationClient
    })
  }
  getTrustApplicantList() {
    const obj = {
      data: this.trustApplicationId
    }
    this.apiService.getListOfApplicantByTrustApplicationId(obj).subscribe((success: any) => {
      this.tableApplicantData = success.lstentTrustApplicationApplicant
    })
  }
  getTrustBenificiaryList() {
    const obj = {
      data: this.trustApplicationId
    }
    this.apiService.getListOfBenificiaryByTrustApplicationId(obj).subscribe((success: any) => {
      this.tableBenificiaryData = success.lstentTrustApplicationBenificiary
    })
  }
  getSettlorList() {
    const obj = {
      data: this.trustApplicationId
    }
    this.apiService.getListofTrustApplicationSettlor(obj).subscribe((success: any) => {
      this.tableSettlorData = success.lstentTrustApplicationSettlor
    })
  }
  getTrusteeList() {
    const obj = {
      data: this.trustApplicationId
    }
    this.apiService.getListofTrustApplicationTrustee(obj).subscribe((success: any) => {
      this.tableTrusteeData = success.lstentTrustApplicationTrustee
    })
  }

  //customer
  createCustomerSearch() {
    this.apiService.createNewCustomerSearch().subscribe((success: any) => {
      this.customer = success;
      this.customer.pageNumber = this.pagination.pageNumber;
      this.customer.pageSize = this.pagination.pageSize;
      this.searchCustomer();
    })
  }
  searchCustomer() {
    this.apiService.searchCustomer(this.customer).subscribe((success: any) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.customertableData = success.result;
      this.appSearch?.close()
    })
  }

  //client
  async clientDialogBox() {

    await this.createCustomerSearch()
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.clientInfo, {
      height: '600px',
      width: '1200px',
      maxWidth: '1170px',
    });
    if (dialogResponse) {
    }
  }
  //
  addNewClient = false
  clientView = ''
  createClientCustomer = false
  clientActive1 = true
  clientActive2 = false
  updateClientBtn = false
  editClientBtn = false
  createTrustClientApplicant() {
    this.errorTrue = false
    this.clientOrganizationTableData = []
    this.apiService.createTrustApplicationClient().subscribe((success: any) => {
      this.trustApplicationClient = success;
      this.addNewClient = true;

      this.clientDialogBox();
      this.clientView = 'hide'
      this.createClientCustomer = true
      this.createClientOrg();
      this.clientActive1 = true;
      this.clientActive2 = false
      this.updateClientBtn = false;

      this.editClientBtn = false
    })
  }
  //
  clientToggleActive = false
  clientIsprimary = false
  openTrustApplicationClient(val: any, type?: any) {
    const obj = {
      data: val
    }
    this.clientActive1 = true;
    this.clientActive2 = false;
    this.editClientBtn = true;
    this.clientToggleActive = false;
    this.updateClientBtn = false;

    this.apiService.openTrustApplicationClient(obj).subscribe((success: any) => {
      this.trustApplicationClient = success;
      this.getClientOrgList(success.trustApplicationClientId)
      this.data.successMessage('Data Refreshed Successfully')
      this.addNewClient = false;
      this.clientView = 'show'
      this.createClientCustomer = false
      if (type === '' || type === undefined) {
        this.clientDialogBox();
      }
      if (this.trustApplicationClient.isPrimaryClient === 'Y') {

        this.clientIsprimary = true
      }
      if (this.trustApplicationClient.isPrimaryClient === 'N') {
        this.clientIsprimary = false
      }

    })
  }
  refreshTrustApplicationClient(val: any, type?: any) {
    const obj = {
      data: val
    }
    this.clientActive1 = true
    this.clientActive2 = false
    this.apiService.openTrustApplicationClient(obj).subscribe((success: any) => {
      this.trustApplicationClient = success;
      this.getClientOrgList(success.trustApplicationClientId)

      if (type === '' || type === undefined) {
        this.clientDialogBox();
      }
      if (this.trustApplicationClient.isPrimaryClient === 'Y') {

        this.clientIsprimary = true
      }
      if (this.trustApplicationClient.isPrimaryClient === 'N') {
        this.clientIsprimary = false
      }

    })
    this.data.successMessage('Data Refreshed Successfully');
  }
  clientIsMinor(event: any) {
    console.log(event.checked);
    if (event.checked === true) {
      this.trustApplicationClient.isPrimaryClient = 'Y';
      this.clientIsprimary = true
    }
    else {
      this.trustApplicationClient.isPrimaryClient = 'N';
      this.clientIsprimary = false
    }

  }
  editClientDetails() {

    this.clientToggleActive = true;
    this.clientView = 'show'
    this.updateClientBtn = true;
    this.editClientBtn = false;
  }
  saveClient() {
    if (this.trustApplicationClient.customerId === 0) {
      if (this.clientForm.valid) {
        this.trustApplicationClient.trustApplicationId = this.trustApplication.trustApplicationId;
        this.apiService.saveTrustApplicationClient(this.trustApplicationClient).subscribe((success: any) => {
          this.tableClientData = success.lstentTrustApplicationClient;
          this.data.showErrorMessage = false;
          console.log(this.tableClientData);
          for (let i = 0; i < this.clientOrganizationTableData.length; i++) {
            this.clientOrganization.nomineeDob = this.clientOrganizationTableData[i].nomineeDob
            this.clientOrganization.nomineeName = this.clientOrganizationTableData[i].nomineeName
            this.clientOrganization.organizationName = this.clientOrganizationTableData[i].organizationName
            this.clientOrganization.settlementAmount = this.clientOrganizationTableData[i].settlementAmount
            this.clientOrganization.trustApplictionClientId = success.ientTrustApplicationClient.trustApplicationClientId
            this.apiService.saveTrustApplicationClientOrg(this.clientOrganization).subscribe((orgSuccess) => {
              this.clientOrganizationTableData = orgSuccess.lstentTrustApplicationClientOrg
            })
          }
          this.dialog.closeAll()
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);

        })
      }
      else {
        this.errorTrue = true
      }
    }
    else {
      this.trustApplicationClient.trustApplicationId = this.trustApplication.trustApplicationId;
      this.apiService.saveTrustApplicationClient(this.trustApplicationClient).subscribe((success: any) => {
        this.tableClientData = success.lstentTrustApplicationClient
        console.log(this.tableClientData);
        for (let i = 0; i < this.clientOrganizationTableData.length; i++) {
          this.clientOrganization.nomineeDob = this.clientOrganizationTableData[i].nomineeDob
          this.clientOrganization.nomineeName = this.clientOrganizationTableData[i].nomineeName
          this.clientOrganization.organizationName = this.clientOrganizationTableData[i].organizationName
          this.clientOrganization.settlementAmount = this.clientOrganizationTableData[i].settlementAmount
          this.clientOrganization.trustApplictionClientId = success.ientTrustApplicationClient.trustApplicationClientId
          this.apiService.saveTrustApplicationClientOrg(this.clientOrganization).subscribe((orgSuccess) => {
            this.clientOrganizationTableData = orgSuccess.lstentTrustApplicationClientOrg;
            this.data.showErrorMessage = false;
          })
        }
        this.dialog.closeAll()
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);

      })
    }
  }
  updateClient() {
    this.trustApplicationClient.trustApplicationId = this.trustApplication.trustApplicationId;
    this.apiService.saveTrustApplicationClient(this.trustApplicationClient).subscribe((success: any) => {
      this.tableClientData = success.lstentTrustApplicationClient;
      this.data.showErrorMessage = false;
      console.log(this.tableClientData);
      this.dialog.closeAll()
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }
  clearClientData() {
    this.trustApplicationClientRAW = JSON.parse(JSON.stringify(this.trustApplicationClient));
    this.apiService.createTrustApplicationClient().subscribe((success: any) => {
      this.trustApplicationClient = success;
      this.errorTrue = false;
      this.clientOrganizationTableData = []
      this.clientView = 'hide'
      this.data.successMessage("Data Cleared Successfully");
    })
  }
  addNewItemLst() {
    this.clientOrganizationTableData.push(JSON.parse(JSON.stringify(this.clientOrganizationRAW)))
    console.log(this.clientOrganizationTableData);
  }
  addNewApplicantItemLst() {
    this.applicantAddnTableData.push(JSON.parse(JSON.stringify(this.trustApplicantParentInfoRAW)));
    console.log(this.applicantAddnTableData);

  }
  //clientOrg
  async clientOrgDialogBox() {
    this.createClientOrg()
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.clientOrg, {
      height: '500px',
      width: '600px',
      maxWidth: '1170px',

    });
    if (dialogResponse) {

    }
  }
  async openClientOrg(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openTrustApplicationClientOrg(obj).subscribe(async (success: any) => {
      this.clientOrganization = success;
      this.data.showErrorMessage = false
      let dialogResponse: any = await this.dialog.openDialog(this.clientOrg, {
        height: '500px',
        width: '600px',
        maxWidth: '1170px',
      });
    })

  }
  getClientOrgList(val: any) {
    const obj = {
      data: val
    }
    this.apiService.getListofTrustApplicationClientOrg(obj).subscribe((success: any) => {
      this.clientOrganizationTableData = success.lstentTrustApplicationClientOrg;
    })
  }
  createClientOrg() {
    this.apiService.createTrustApplicationClientOrg().subscribe((success: any) => {
      this.clientOrganization = success;
      this.clientOrganizationRAW = JSON.parse(JSON.stringify(this.clientOrganization))
    })
  }
  refreshClientOrg(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openTrustApplicationClientOrg(obj).subscribe(async (success: any) => {
      this.clientOrganization.trustApplicationClientOrgId = success;
    this.data.successMessage('Data Refreshed Successfully');

    })
  }
  saveClientOrg() {
    this.clientOrganization.trustApplicationId = this.trustApplication.trustApplicationId;
    this.clientOrganization.trustApplictionClientId = this.trustApplicationClient.trustApplicationClientId;
    if (this.clientOrgForm.valid) {

      this.apiService.saveTrustApplicationClientOrg(this.clientOrganization).subscribe((success: any) => {
        this.clientOrganizationTableData = success.lstentTrustApplicationClientOrg;
        this.dialog.closeDialog();
        this.data.showErrorMessage = false;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  saveApplicantOrg() {
    if(this.wForm.valid){

      this.trustApplicantParentInfo.trustApplicationApplicantId = this.trustApplicationApplicant.trustApplicationApplicantId;
      this.apiService.saveTrustApplicationParentAddtionalInfo(this.trustApplicantParentInfo).subscribe((success: any) => {
        this.applicantAddnTableData = success.lstentTrustApplicationParentAddtionalInfo;
        this.dialog.closeDialog();
        this.data.showErrorMessage = false;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      })
    }
    else{
      this.errorTrue = true
    }
  }
  clearClientOrg() {
    this.trustApplicationClientRAW = JSON.parse(JSON.stringify(this.trustApplicationClient));
    this.data.successMessage('Data Cleared Successfully');
    this.createClientOrg();
    this.clientOrganizationTableData = []
  }
  clearApplicantOrg(){
    this.trustApplicantParentInfo = JSON.parse(JSON.stringify(this.trustApplicantParentInfoRAW));
    this.createApplicantAddn();
    this.data.successMessage('Data Cleared Successfully');
  }
  spliceClientOrg(val: any) {
    let index = this.clientOrganizationTableData.indexOf(val);
    this.clientOrganizationTableData.splice(index, 1);
  }
  spliceApplicantAddn(val: any) {
    let index = this.applicantAddnTableData.indexOf(val);
    this.applicantAddnTableData.splice(index, 1);
  }
  async checkClientOrgDelete(val: any) {
    let msg = `Are you sure, You want to delete : ${val.organizationName} ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {

      const obj = {
        data1: val.trustApplicationClientOrgId,
        data2: this.trustApplicationId
      }
      this.apiService.deleteTrustApplicationClientOrg(obj).subscribe((success: any) => {
        this.clientOrganizationTableData = success.lstentTrustApplicationClientOrg;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      })
    }
  }
  async applicantDialogBox() {
    await this.createCustomerSearch()
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.applicantInfo, {
      height: '600px',
      width: '1200px',
      maxWidth: '1170px',
    });
  }
  editApplicantBtn = false;
  applicantAddntab = false;
  editTrustApplicant() {
    this.editApplicantBtn = false;
    this.editApplicantData = false;
    this.clientToggleActive = true;
    this.applicantAddnData = false
  }
  addNewApplicant = true
  createTrustApplicationApplicant() {

    this.applicantSearch = true
    this.applicantAddntab = true
    this.errorTrue = false
    this.apiService.createTrustApplicationApplicant().subscribe((success: any) => {
      this.trustApplicationApplicant = success;
      this.addNewApplicant = true;
      this.editApplicantData = true;
      this.editApplicantBtn = false;
      this.applicantAddnData = true
      this.editClientBtn = false
      this.applicantAddnTableData = []
      this.applicantDialogBox();
      this.apiService.createTrustApplicationParentAddtionalInfo().subscribe((success: any) => {
        this.trustApplicantParentInfo = success;
      });
    });
  }
  refreshApplicantAddn(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openTrustApplicationParentAddtionalInfo(obj).subscribe((success) => {
      this.trustApplicantParentInfo = success;
      this.data.successMessage('Data Refreshed Successfully')
    })
  }
  applicantIsprimary = false;

  clearSubClientOrg(){
    this.clientOrganization = JSON.parse(JSON.stringify(this.clientOrganizationRAW));
    this.createClientOrg();
    this.data.successMessage('Data Cleared Successfully');
  }

  openTrustApplicationApplicant(val: any, type?: any) {

    const obj = {
      data: val
    }
    this.apiService.openTrustApplicationApplicant(obj).subscribe((success: any) => {
      this.trustApplicationApplicant = success;
      if (type !== 'refresh') {
        this.editApplicantBtn = true;
        this.editApplicantData = false;
        
      }
      else{
        this.data.successMessage('Data Refreshed Successfully');
        this.editApplicantData = true;
        this.editApplicantBtn = false;
      }
      this.addNewApplicant = false;
      this.applicantSearch = false;
      this.clientToggleActive = false
      this.applicantAddnData = false
      this.applicantAddnTableData = success.lstentTrustApplicationParentAddtionalInfo
      if (type === '' || type === undefined) {
        this.applicantDialogBox();
      }
      if (success.isPrimaryApplicant === 'Y') {

        this.applicantIsprimary = true
      }
      else if (success.isPrimaryApplicant === 'N') {
        this.applicantIsprimary = false
      }

    })
  }
  applicantIsPrimary(event: any) {
    console.log(event.checked);
    if (event.checked === true) {
      this.trustApplicationApplicant.isPrimaryApplicant = 'Y';
      this.applicantIsprimary = true
    }
    else {
      this.trustApplicationApplicant.isPrimaryApplicant = 'N';
      this.applicantIsprimary = false
    }
  }
  saveApplicant() {
    if (this.applicantForm.valid) {
      this.trustApplicationApplicant.trustApplicationId = this.trustApplication.trustApplicationId;

      this.apiService.saveTrustApplicationApplicant(this.trustApplicationApplicant).subscribe((success: any) => {
        this.tableApplicantData = success.lstentTrustApplicationApplicant;
        this.data.showErrorMessage = false;

        this.dialog.closeAll()
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);



      })
    }
    else {
      this.errorTrue = true
    }
  }
  updateApplicant() {
    if (this.applicantForm.valid) {
      this.trustApplicationApplicant.trustApplicationId = this.trustApplication.trustApplicationId;
      if (this.trustApplicationApplicant.isPrimaryApplicant === 'Y') {
        this.trustApplicationApplicant.contactNo = this.trustApplicationApplicant.ientCustomer.contactNo
        this.trustApplicationApplicant.emailId = this.trustApplicationApplicant.ientCustomer.emailId
      }
      if (this.trustApplicationApplicant.isPrimaryApplicant === 'N') {
        this.trustApplicationApplicant.contactNo = ''
        this.trustApplicationApplicant.emailId = ''
      }
      this.apiService.saveTrustApplicationApplicant(this.trustApplicationApplicant).subscribe((success: any) => {
        this.tableApplicantData = success.lstentTrustApplicationApplicant;
        this.data.showErrorMessage = false;
        this.dialog.closeAll()
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }


  clearApplicantData() {
    this.trustApplicationApplicantRAW = JSON.parse(JSON.stringify(this.trustApplicationApplicant));
    this.apiService.createTrustApplicationApplicant().subscribe((success: any) => {
      this.trustApplicationApplicant = success;
      this.errorTrue = false
      this.applicantAddnTableData = []
      this.editApplicantData = true
      this.data.successMessage("Data Cleared Successfully");
    })
  }

  //addn
  createApplicantAddn() {
    this.apiService.createTrustApplicationParentAddtionalInfo().subscribe((success: any) => {
      this.trustApplicantParentInfo = success;
      // this.trustApplicantParentInfo = JSON.parse(JSON.stringify(this.trustApplicantParentInfoRAW))
      this.applicantAddnDialogBox();
      this.clientOrganization.trustApplicationClientOrgId
    })
  }
  async applicantAddnDialogBox() {
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.applicantAddnInfo, {
      height: '500px',
      width: '600px',
      maxWidth: '1170px',

    });
  }
  openApplicantAddn(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openTrustApplicationParentAddtionalInfo(obj).subscribe((success: any) => {
      this.trustApplicantParentInfo = success;
      this.applicantAddnDialogBox();
    })
  }
  //dummy
  bankPageChanged(event: any) {

  }

  //beneficiary
  async benificiaryDialogBox() {

    await this.createCustomerSearch()
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.beniDialog, {
      height: '600px',
      width: '1200px',
      maxWidth: '1170px',

    });
    if (dialogResponse) {

    }
  }
  addNewBenificiary = false
  createTrustBenificiaryApplicant() {
    this.errorTrue = false
    this.apiService.createTrustApplicationBenificiary().subscribe((success: any) => {
      this.trustApplicationBenificiary = success;
      this.addNewBenificiary = true;
      this.editClientBtn = false
      this.clientView = 'hide'
      this.createClientCustomer = true
      this.benificiaryDialogBox()
    })
  }
  openTrustApplicationBenificiary(val: any, type?: any) {
    const obj = {
      data: val
    }
    this.apiService.openTrustApplicationBenificiary(obj).subscribe((success: any) => {
      this.trustApplicationBenificiary = success;
      this.addNewBenificiary = false;
      this.benificiaryDialogBox();
      this.clientView = 'show'
      this.createClientCustomer = false
      this.editClientBtn = true

      if (this.trustApplicationBenificiary.isMinor === 'Y') {

        this.benificiaryIsprimary = true
      }
      else if (this.trustApplicationBenificiary.isMinor === 'N') {
        this.benificiaryIsprimary = false
      }

    })
  }
  benificiaryIsprimary = false
  refreshTrustApplicationBenificiary(val: any, type?: any) {
    const obj = {
      data: val
    }
    this.apiService.openTrustApplicationBenificiary(obj).subscribe((success: any) => {
      this.trustApplicationBenificiary = success;
      this.addNewBenificiary = false;
      if (this.trustApplicationBenificiary.isMinor === 'Y') {
        
        this.benificiaryIsprimary = true
      }
      else if (this.trustApplicationBenificiary.isMinor === 'N') {
        this.benificiaryIsprimary = false
        
      }
      this.data.successMessage('Data Refreshed Successfully');

    })
  }
  benificiaryIsMinor(event: any) {
    console.log(event.checked);
    if (event.checked === true) {
      this.trustApplicationBenificiary.isMinor = 'Y';
      this.benificiaryIsprimary = true
    }
    else {
      this.trustApplicationBenificiary.isMinor = 'N';
      this.benificiaryIsprimary = false
      this.trustApplicationBenificiary.gaurdianCustomerId = 0
    }
  }
  closeAllDialog(){
    this.dialog.closeAll();
    this.data.showErrorMessage = false
  }
  saveBenificiary() {
    debugger
    if (this.benificiaryForm.valid) {
      this.trustApplicationBenificiary.trustApplicationId = this.trustApplication.trustApplicationId;
      this.trustApplicationBenificiary.benificiaryDateOfbirth = this.trustApplicationBenificiary.ientBeneficaryCustomer.dateOfBirth;
      this.apiService.saveTrustApplicationBenificiary(this.trustApplicationBenificiary).subscribe((success: any) => {
        this.tableBenificiaryData = success.lstentTrustApplicationBenificiary;
        this.data.showErrorMessage = false;
        console.log(this.tableBenificiaryData);
        this.dialog.closeAll();
        this.data.showErrorMessage = false
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  clearBenificiaryData() {
    this.trustApplicationBenificiaryRAW = JSON.parse(JSON.stringify(this.trustApplicationBenificiary));
    this.apiService.createTrustApplicationBenificiary().subscribe((success: any) => {
      this.trustApplicationBenificiary = success;
      this.errorTrue = false;
      this.editClientBtn = false
      this.clientView = 'hide'
      this.data.successMessage("Data Cleared Successfully");
    })
  }
  //Settlor
  async settlorDialogBox() {
    if (this.createClientCustomer === true) {

      await this.createCustomerSearch()
    }
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.settlorDialog, {
      height: '600px',
      width: '1200px',
      maxWidth: '1170px',

    });
    if (dialogResponse) {

    }
  }
  addNewSettlor = false
  createNewSettlor() {
    this.errorTrue = false;
    this.apiService.createTrustApplicationSettlor().subscribe((success: any) => {
      this.trustApplicationSettlor = success
      this.addNewSettlor = true;
      this.clientView = 'hide';
      this.editClientBtn = false
      this.createClientCustomer = true
      this.settlorDialogBox()
    })
  }
  openTrustApplicationSettlor(val: any, type?: any) {

    this.settlorDialogBox()
    const obj = {
      data: val
    }
    this.apiService.openTrustApplicationSettlor(obj).subscribe((success: any) => {
      this.trustApplicationSettlor = success;
      this.addNewSettlor = false;
      this.clientView = 'show';
      this.createClientCustomer = false;
      this.clientToggleActive = false;
      this.editClientBtn = true;
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }
  refreshTrustApplicationSettlor(val: any, type?: any) {

    const obj = {
      data: val
    }
    this.apiService.openTrustApplicationSettlor(obj).subscribe((success: any) => {
      this.trustApplicationSettlor = success;
      this.addNewSettlor = false;
      this.data.successMessage('Data Refreshed Successfully');
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }
  settlorIsFptcl(event: any) {
    if (event.checked === true) {
      this.trustApplicationSettlor.isFptcl = 'Y'
    }
    else {
      this.trustApplicationSettlor.isFptcl = 'N'
    }
  }
  saveSettlor() {
    if (this.settlorForm.valid) {
      this.trustApplicationSettlor.trustApplicationId = this.trustApplication.trustApplicationId;
      this.apiService.saveTrustApplicationSettlor(this.trustApplicationSettlor).subscribe((success: any) => {
        this.tableSettlorData = success.lstentTrustApplicationSettlor;
        this.data.showErrorMessage = false;
        console.log(this.tableBenificiaryData);
        this.dialog.closeAll()
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);

      })
    }
    else {
      this.errorTrue = true
    }
  }
  clearSettlorData() {
    this.trustApplicationSettlorRAW = JSON.parse(JSON.stringify(this.trustApplicationSettlor));
    this.apiService.createTrustApplicationSettlor().subscribe((success: any) => {
      this.trustApplicationSettlor = success;
      this.clientView = 'hide'
      this.errorTrue = false
      this.data.successMessage("Data Cleared Successfully");
    })
  }
  //Trustee
  async trusteeDialogBox() {
    await this.createCustomerSearch()
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.trusteeDialog, {
      height: '600px',
      width: '1200px',
      maxWidth: '1170px',

    });
    if (dialogResponse) {

    }
  }
  addNewTrustee = false
  createNewTrustee() {
    this.errorTrue = false;
    this.apiService.createTrustApplicationTrustee().subscribe((success: any) => {
      this.trustApplicationTrustee = success
      this.addNewTrustee = true;
      this.clientView = 'hide';
      this.editClientBtn = false
      this.createClientCustomer = true
      this.trusteeDialogBox()
    })
  }
  openTrustApplicationTrustee(val: any, type?: any) {
    if (type === 'refresh') {
    this.data.successMessage('Data Refreshed Successfully');
  }
    else {

      this.trusteeDialogBox()
    }
    const obj = {
      data: val
    }
    this.apiService.openTrustApplicationTrustee(obj).subscribe((success: any) => {
      this.trustApplicationTrustee = success;
      this.addNewTrustee = false;
      this.addNewSettlor = false;
      this.clientView = 'show';
      this.createClientCustomer = false;
      this.clientToggleActive = false;
      this.editClientBtn = true;
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }
  trusteeIsFptcl(event: any) {
    if (event.checked === true) {
      this.trustApplicationTrustee.isFptcl = 'Y'
    }
    else {
      this.trustApplicationTrustee.isFptcl = 'N'
    }
  }
  saveTrustee() {
    if (this.trusteeForm.valid) {
      this.trustApplicationTrustee.trustApplicationId = this.trustApplication.trustApplicationId;
      this.apiService.saveTrustApplicationTrustee(this.trustApplicationTrustee).subscribe((success: any) => {
        this.tableTrusteeData = success.lstentTrustApplicationTrustee;
        this.data.showErrorMessage = false;
        console.log(this.tableBenificiaryData);
        this.dialog.closeAll()
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  clearTrusteeData() {
    this.trustApplicationTrusteeRAW = JSON.parse(JSON.stringify(this.trustApplicationTrustee));
    this.apiService.createTrustApplicationTrustee().subscribe((success: any) => {
      this.trustApplicationTrustee = success;
      this.errorTrue = false;
      this.clientView = 'hide'
      this.data.successMessage("Data Cleared Successfully");
    })
  }


  //notes
  async createNotesDialog() {
    this.createNotes()
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      height: 'auto',
      width: '1200px',
      maxWidth: '1170px',

    });
  }
  saveNotes() {
    this.trustApplicationNotes.trustApplicationId = this.trustApplication.trustApplicationId;
    this.trustApplication.ientTrustApplicationNotes = this.trustApplicationNotes
    if (this.notesForm.valid) {

      this.apiService.saveTrustApplicationNotes(this.trustApplication).subscribe((success: any) => {
        this.notesList = success.lstentTrustApplicationNotes;
        this.data.showErrorMessage = false;
        this.trustApplication = success;
        console.log(this.notesList);
        this.dialog.closeDialog();
      })
    }
    else {
      this.errorTrue = true
    }
  }
  clearNotes() {
    this.createNotes();
    this.data.successMessage('Data Cleared Successfully')
  }
  trustApplicationNotes = new entTrustApplicationNotes();
  notesDDL: any
  createNotes() {
    this.errorTrue = false
    const obj = {
      data1: this.trustApplication.statusValue,
      data2: this.trustApplication.actionStatusValue,
      data3: this.trustApplication.applicationStageValue,
    }
    this.apiService.createTrustApplicationNotes(obj).subscribe((success: any) => {
      this.trustApplicationNotes = success
      this.notesDDL = success.iStatusDDL.value
    })
  }


  getListOfNotes() {
    const obj = {
      data: this.trustApplicationId
    }
    this.apiService.getListOfNotesByTrustApplicationId(obj).subscribe((success: any) => {
      this.notesList = success.lstentTrustApplicationNotes;
    })
  }
  emailColumns: any = ["toEmailId", "sentDate", "sentStatusDescription", "action"];
  emailColumnsName: any = ["To", " Date | Time", "Status", "Action"];
  emailHistoryTableData: any = [];

  //assignedOfficer
  assignedOfficerColumn: any = ['assignedToFullname', 'assignedDate', 'assignedByFullname', 'applicationStageDescription', 'statusDescription',]
  assignedOfficerColumnName: any = ['Assigned Officer', 'Assigned Date', ' Assigned By', 'Action Status', 'Application Status']
  assignedOfficerTableData: any = []

  getAssignedOfficerList() {
    const obj = {
      data: this.trustApplicationId
    }
    this.apiService.getListOfAssignedOfficerHistoryByTrustApplicationId(obj).subscribe((success: any) => {
      this.assignedOfficerTableData = success.entTrustApplicationAssignedOfficerList

    })
  }
  statusHistoryDataSource: any = []

  getStatusHistoryList() {
    const obj = {
      data: this.trustApplicationId
    }
    this.apiService.getListOfStatusHistoryByTrustApplicationId(obj).subscribe((success) => {
      this.statusHistoryDataSource = success.listentTrustApplicationStatusHistory
    })
  }

  getlistOfCommunicationHistory() {
    const obj = {
      data: this.trustApplicationId
    }
    this.apiService.getListOfCommunicationHistoryByTrustApplicationId(obj).subscribe((success) => {
      this.emailHistoryTableData = success.entTrustApplicationEmailHistoryList
    })
  }

  selectedClientTabChange(val: any) {
    if (val === 1) {
      this.clientActive1 = true
      this.clientActive2 = false
    }
    if (val === 2) {
      this.clientActive2 = true
      this.clientActive1 = false
      // this.createClientOrg()
    }
  }
  async viewEmailDetail(val: any) {
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(EmailHistoryFormComponent, {
      height: '550px',
      width: '100%',
      maxWidth: '1170px',
      data: {
        email: val,
        title: 'Trust Application',
        icon: 'assets/icons/trust.svg'
      }
    });
  }

  openAccordianProcess(val: any) {
    console.log(val);
    if (val === false) {
      this.accordianOpen = true
      this.showStatusHistory = true;
      this.showEmailHistory = false
    }
    else {
      this.accordianOpen = false;
      this.showStatusHistory = false;
      this.showEmailHistory = false

    }
  }
  openStatusValueProcess(val: any) {
    console.log(val);
    if (val === 1) {
      this.showStatusHistory = true;
      this.showEmailHistory = false;
      this.accordianOpen = true;
    }
    else if (val === 2) {
      this.showEmailHistory = true;
      this.showStatusHistory = false;
      this.accordianOpen = true
    }
  }
  pageChanged(event: any) {
    this.customer.pageNumber = event.pageNumber;
    this.customer.pageSize = event.pageSize;
    this.searchCustomer();
  }


  ageCalculator(age:any){
    if(age){
      const date = parse(age, this.appSetting.environment.serverDateFormat, new Date());
      const showAge = differenceInYears(new Date(), date);
      console.log(showAge);

      if(showAge >=18){
        this.trustApplicationBenificiary.isMinor = 'N'
       }

       else{
      this.trustApplicationBenificiary.isMinor = 'Y'
       }

    }
  }

}
