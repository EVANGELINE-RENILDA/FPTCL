import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { TabComponent, TabGroupComponent } from '../../../../app-core/template/tab/tab';
import { TabSubComponent, TabSubGroupComponent } from '../../../../app-core/template/tab/tab1';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { CoreService } from '../../../../app-core/service/core.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { DropZoneComponent } from '../../../../app-core/template/drop-zone/drop-zone.component';
import { FileSizePipe } from '../../../../app-core/template/drop-zone/file-size.pipe';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { AppService } from '../../../../app.service';
import { entCustomerSearch, entLegalApplication, entLegalApplicationApplicant, entLegalApplicationClient, entTrustApplicationApplicant } from '../../../../common/api-services/application-api/application-api.classes';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { KycEditComponent } from '../../../../app-core/template/kyc-edit/kyc-edit.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { StatusHistoryComponent } from '../../../../app-core/template/status-history/status-history.component';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../../common/services/url/url.service';
import { DataService } from '../../../../common/services/data/data.service';
import { CreationApplicationComponent } from './creation-application/creation-application.component';
import { DocumentCollectionComponent } from './document-collection/document-collection.component';
import { OpenFileComponent } from '../../../trust/trust-application/trust-application-dummy/open-file/open-file.component';
import { ServiceInProcessComponent } from './service-in-process/service-in-process.component';
import { ServiceInProcess1Component } from './service-in-process1/service-in-process1.component';
import { PrepareDocumentationComponent } from './prepare-documentation/prepare-documentation.component';
import { PrepareSoaComponent } from './prepare-soa/prepare-soa.component';
import { ScanDocComponent } from './scan-doc/scan-doc.component';
import { VerificationOfFeeComponent } from './verification-of-fee/verification-of-fee.component';
import { HandoverDocComponent } from './handover-doc/handover-doc.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmailHistoryFormComponent } from '../../../crm/email-history-form/email-history-form.component';
import { FeesCollectionComponent } from './fees-collection/fees-collection.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { MenuAccessDirective } from '../../../../common/permission/menu-access.directive';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-legal-other-service-detail',
  standalone: true,
  imports: [FormsModule, InputControlComponent, ViewLabel, IconButtonComponent, TabGroupComponent, TabComponent, TabSubGroupComponent, AccordionModule, Row, InnerScroll, DropZoneComponent, FileSizePipe, AppTableComponent, CheckboxComponent, AddressEditComponent, KycEditComponent, AppDatePipe, TabSubGroupComponent, TabSubComponent, StatusHistoryComponent, CreationApplicationComponent, DocumentCollectionComponent, OpenFileComponent, ServiceInProcessComponent, ServiceInProcess1Component, PrepareDocumentationComponent, PrepareSoaComponent, ScanDocComponent, VerificationOfFeeComponent, PrepareSoaComponent, HandoverDocComponent, MatTooltipModule, CellDefDirective, CellHeaderDefDirective, FeesCollectionComponent, AppAccessDirective,MenuAccessDirective,MatSlideToggleModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './legal-other-service-detail.component.html',
  styleUrl: './legal-other-service-detail.component.scss'
})
export class LegalOtherServiceDetailComponent {
  pageId = 'LEGAL'
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  legalApplication = new entLegalApplication()
  //clientDoc
  clientDocumentColumns: any = ['documentTypeDescription', 'fileName', 'fileSize', 'action']
  clientDocumentColumnsName: any = ['Document Name', 'File Name', 'Size', 'Action']
  docNameType: any
  errorTrue = false;
  legalServiceAppliant = new entLegalApplicationApplicant();
  legalServiceAppliantRAW = new entLegalApplicationApplicant();
  //receipt
  receiptFundColumns: any = ['1', '2', '3', '4', '5'];
  receiptFundColumnsName: any = ["Date", "Check No / Tr. No", "Organization", "Receipt No", "Amount"];
  receiptFundTableData: any = [];
  constructor(
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public router: Router,
    public route: ActivatedRoute,
    public data: DataService,
    public url: UrlService,
    public appService: AppService) {
    this.route.paramMap.subscribe((params: any) => {
      this.appService.helpFile ='Legal%20&%20Other%20Service%20Detail.pdf'
      this.init();
    });
  }
  editData = false;
  currentDate = '';
  //history
  assignOfficerColumns: any = ["assignedToFullname", "assignedDate", "assignedByFullname", "statusDescription"];
  assignOfficerColumnsName: any = ["Assigned Officer", "Assigned Date", "Assigned By", "Status",];
  tableAssignOffice = [];
  statusHistoryDataSource: any = [];
  accept: any
  emailColumns: any = ["toEmailId", "sentDate", "sentStatusDescription", "action"];
  emailColumnsName: any = ["To", " Date | Time", "Status", "Action"];
  emailHistoryTableData: any = [];
  linkedColumns: any = ['description', 'action'];
  linkedColumnsName: any = ['Document Name', ' Action'];
  tableLinkedData: any = []
  @ViewChild('applicant', { static: false })
  applicant!: TemplateRef<any>;
  @ViewChild('memberDialogBox', { static: false })
  memberDialogBox!: TemplateRef<any>;
  @ViewChild ('x') xForm!: NgForm;


  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  id = {
    currentIndex: 0,
    array: []
  };
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  legalServiceId = 0;
  @ViewChild('p') pForm!: NgForm;
  async init() {
    await this.data.checkToken();
    this.appService.setBreadCrumb(this.breadCrumb);
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    console.log(params);
    this.id = params;
    this.legalServiceId = this.id.array[this.id.currentIndex];
    this.initialData.getDDL('loadAllMProvince');
    this.initialData.getDDL('getInitialDataForCustomer');
    this.currentDate = this.appService.getCurrentDate();
    await this.initialData.getDDL('getInitialDataForLegalApplication');
    this.openLegalService();

  }
  memberColumns = ['crm', 'bankName', 'bankCode', 'contatc', 'isPrimaryClient', 'effectiveDate', '', 'action'];
  memberColumnsName = ['Client CRM No', 'Gender', 'Date Of Birth', 'Contact No', "Is FPTCL", 'Type', "", ""];
  memberTableData = []
  openLegalService() {
    const obj = {
      data: this.legalServiceId
    }
    this.apiService.openLegalApplication(obj).subscribe((success) => {
      this.legalApplication = success;
      // this.legalServiceAppliant = success.ientLegalApplicationApplicant
      if(success.ientLegalApplicationApplicant.legalApplicationApplicantId === 0){
        this.createLegalApplicant();
        this.editData = true
      }
      if(success.ientLegalApplicationApplicant.legalApplicationApplicantId !== 0){
        this.openLegalApplicant();
        this.editData = false
      }
      this.getMemberList();
      this.data.successMessage(success.msg?.infoMessage?.msgDescription)
    })
  }

  onTabChange(event: any) {
    switch (event.tabTitle) {
      case 'History':
        this.getNotesList();
        this.getAssignedOfficerList();
        this.getStatusHistoryList();
        this.getEmailHistoryList();
        break;
        case 'Application':
          // this.openLegalService()
    }
  }

  createLegalApplicant(){
    this.apiService.createLegalApplicationApplicant().subscribe((success)=>{
      this.legalServiceAppliant = success
    })
  }
  openLegalApplicant(){
    const obj = {
      data: this.legalApplication.ientLegalApplicationApplicant.legalApplicationApplicantId
    }
    this.apiService.openLegalApplicationApplicant(obj).subscribe((success)=>{
      this.legalServiceAppliant = success
    })
  }

  customerType:any
  async editLegal(val: any) {
    this.customerType = 'applicant'
    let response: any = await this.dialog.openDialog(this.applicant, {
      height: '600px',
      width: '100%',
      maxWidth: '1100px',
      data: {
        type: val,
      }
    });
  }
  //customer
  customerColumns: any = ["customerRefNo", "customerName", "genderDescription", "dateOfBrith", "emailId", "contactNo", "statusdescription", "action"];
  customerColumnsName: any = ["Customer No", "Customer Name", "Gender", "Date Of Birth", "Email ID", "Contact Number", "Status", ""];
  customertableData: any = [];
  customer = new entCustomerSearch();
  // searchParams = new entWillApplicationSearch();
  // searchParamsRAW = new entWillApplicationSearch();

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

    })
  }

  pageChanged(event: any) {
    this.customer.pageNumber = event.pageNumber;
    this.customer.pageSize = event.pageSize;
    this.searchCustomer();
  }
  dialogClose(){
    this.data.showErrorMessage = false
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.customer.pageNumber = 1;
    this.searchCustomer();
    this.appSearch?.close()
  }
  clear() {
    this.createCustomerSearch();
    this.data.successMessage('Data Cleared Successfully')
  }
  dialogName:any
  @ViewChild('customerSearchDialog', { static: false })
  customerSearchDialog!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  openCustomer(val: any) {
    const obj = {
      data: val,
    };
    this.apiService.openCustomer(obj).subscribe((success) => {

        this.legalServiceAppliant.ientCustomer = success;
    })
  }
  openCustomerInSearch(val: any,type:any) {
    const obj = {
      data: val,
    };
    this.apiService.openCustomer(obj).subscribe((success) => {
      if(type==='applicant'){
        this.legalServiceAppliant.ientCustomer = success;
        this.legalServiceAppliant.customerId = success.customerId
      }
      if(type==='member'){
        this.memberClient.ientCustomer = success;
        this.memberClient.customerId = success.customerId
      }


    })
    this.dialog.closeDialog();
    this.data.showErrorMessage = false
  }

  async customerSearch() {
   this.createCustomerSearch()
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.customerSearchDialog, {
      height: '500px',
      width: '1050px',
      maxWidth: '1170px',

    });
    // this.createClientCustomer = true
    if (dialogResponse) {

    }
  }
  downloadLinkedFile(val: any) {

  }
  completeApplicationStage() { }
  downloadFile(val: any) { }
  checkDocumentDelete(val: any) { }
  viewFile(val: any) { }
  saveApplicant() {
    if (this.pForm.valid) {
      this.legalServiceAppliant.legalApplicationId = this.legalApplication.legalApplicationId;
      this.legalServiceAppliant.customerDdlFlage = 'N'
      this.apiService.saveLegalApplicationApplicant(this.legalServiceAppliant).subscribe((success) => {
        this.legalServiceAppliant = success;
        this.editData = false
        this.dialog.closeAll();
        this.errorTrue = false
      })
    }
    else {
      this.errorTrue = true
    }
  }
  editApplicant() {
    this.editData = true
  }
  editMember() {
    this.editData = true
  }
  createNotes() {

  }
  reAssignTrust() { }
  selfAssignTrust() { }
  uploadClientDocumentAttachment(event: any) {

  }
  onChange(event: any) {

  }
  openCustomerForApplicant(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openCustomer(obj).subscribe((success) => {
      this.legalServiceAppliant.ientCustomer = success;
      this.editData = true

    })
  }
  openCustomerForMember(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openCustomer(obj).subscribe((success) => {
      this.memberClient.ientCustomer = success;
      this.editData = true

    })
  }
  refreshCustomerForApplicant(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openCustomer(obj).subscribe((success) => {
      this.legalServiceAppliant.ientCustomer = success;
      this.editData = false

    })
  }
  refreshCustomerForMember(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openCustomer(obj).subscribe((success) => {
      this.memberClient.ientCustomer = success;
      this.editData = false

    })
  }
  clearApplicant() {
    this.errorTrue = false
    this.legalServiceAppliant = JSON.parse(JSON.stringify(this.legalServiceAppliantRAW))
  }
  clearMember() {
    this.errorTrue = false

    this.memberClient = JSON.parse(JSON.stringify(this.memberClientRAW))
  }
  notesList: any
  getNotesList() {
    const obj = {
      data: this.legalServiceId,
      data1: this.legalApplication.applicationStageValue
    }
    this.apiService.getListOfNotesByLegalApplicationId(obj).subscribe((success) => {
      this.notesList = success.lstentLegalApplicationNotes;
    })
  }
  getAssignedOfficerList() {
    const obj = {
      data: this.legalServiceId,
      data1: this.legalApplication.applicationStageValue
    }
    this.apiService.getListOfAssignedOfficerHistoryByLegalApplicationId(obj).subscribe((success) => {
      this.tableAssignOffice = success.lstentLegalApplicationAssignedOfficerHistory
    })
  }
  getStatusHistoryList() {
    const obj = {
      data: this.legalServiceId,
      data1: this.legalApplication.applicationStageValue
    }
    this.apiService.getListOfStatusHistoryByLegalApplicationId(obj).subscribe((success) => {
      this.statusHistoryDataSource = success.lstentLegalApplicationStatusHistory
    })
  }
  getEmailHistoryList() {
    const obj = {
      data: this.legalServiceId,
      data1: this.legalApplication.applicationStageValue
    }
    this.apiService.getListOfCommunicationHistoryByLegalApplicationId(obj).subscribe((success) => {
      this.emailHistoryTableData = success.lstentLegalApplicationEmailHistory
    })
  }
  async viewEmailDetail(val: any) {
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(EmailHistoryFormComponent, {
      height: '550px',
      width: '100%',
      maxWidth: '1170px',
      data: {
        email: val,
        title: 'Customer Service',
        icon: 'assets/icons/accordian/customer-service.svg'
      }
    });
  }
memberClient = new entLegalApplicationClient()
memberClientRAW = new entLegalApplicationClient()

memberIsFptcl(event: any) {
  if (event.checked === true) {
    this.memberClient.isFptcl = 'Y'
  }
  else {
    this.memberClient.isFptcl = 'N'
  }
}
  createMember(){
    this.apiService.createLegalApplicationClient().subscribe((success)=>{
      this.memberClient = success;
      this.editData = true;
      this.errorTrue = false
      this.memberDialog()
    })
  }
  openMember(val:any){
    this.editData = false
    const obj = {
      data:val
    }
    this.apiService.openLegalApplicationClient(obj).subscribe((success)=>{
      this.memberClient = success;
      this.memberDialog()
      this.data.successMessage(success.msg?.infoMessage?.msgDescription)
    })
  }

  saveMember(){
 if(this.xForm.valid){
  this.memberClient.legalApplicationId = this.legalApplication.legalApplicationId;
  this.apiService.saveLegalApplicationClient(this.memberClient).subscribe((success)=>{
    this.memberTableData = success.lstentLegalApplicationClient;
    this.data.successMessage(success.msg?.infoMessage?.msgDescription)
    this.dialog.closeAll();
  })
 }
 else{
  this.errorTrue = true
 }
  }
  getMemberList(){
    const obj = {
      data: this.legalApplication.legalApplicationId
    }
    this.apiService.getListofClientByLegalApplicationID(obj).subscribe((success)=>{
      this.memberTableData = success.lstentLegalApplicationClient;
    })
  }


  async memberDialog() {
    this.customerType = 'member'
    let response: any = await this.dialog.openDialog(this.memberDialogBox, {
      height: '600px',
      width: '100%',
      maxWidth: '1100px',

    });
  }

  async checkDeleteMember(val:any){
    let msg = `Are you sure, You want to delete : ${val.ientCustomer.customerName} ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      const obj = {
        data: val.legalApplicationClientId
      }
      this.apiService.deleteLegalApplicationClient(obj).subscribe((success: any) => {
        this.memberTableData = success.lstentLegalApplicationClient;
        this.getMemberList()
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
  }
  checkApplicant(){
    if(this.legalServiceAppliant.legalApplicationApplicantId === 0){
      this.createLegalApplicant()
    }
  }
  navigateToList(){
    this.router.navigateByUrl('/home/legal/legal-other-service-search')
  }
}
