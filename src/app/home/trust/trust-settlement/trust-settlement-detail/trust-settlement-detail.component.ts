import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, TemplateRef, ViewChild } from '@angular/core';
import { CoreService } from '../../../../app-core/service/core.service';
import { entTrustApplicationAssignedOfficer, entTrustApplication, entTrustSettlementApplication, entTrustSettlementApplicationBankDetail, entTrustSettlementApplicationApplicantList, entTrustSettlementApplicationApplicant, entAddress, entCustomerSearch } from '../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ViewLabel, Row, InnerScroll } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { DropZoneComponent } from '../../../../app-core/template/drop-zone/drop-zone.component';
import { FileSizePipe } from '../../../../app-core/template/drop-zone/file-size.pipe';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { StatusHistoryComponent } from '../../../../app-core/template/status-history/status-history.component';
import { TabGroupComponent, TabComponent } from '../../../../app-core/template/tab/tab';
import { TabSubComponent, TabSubGroupComponent } from '../../../../app-core/template/tab/tab1';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { AppService } from '../../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportDocumentComponent } from './trust-settlement-process/support-document/support-document.component';
import { RequireSoaComponent } from './trust-settlement-process/require-soa/require-soa.component';
import { PrepareSoaComponent } from './trust-settlement-process/prepare-soa/prepare-soa.component';
import { ExecuteDischargeComponent } from './trust-settlement-process/execute-discharge/execute-discharge.component';
import { TaxClearanceComponent } from './trust-settlement-process/tax-clearance/tax-clearance.component';
import { ApprovalOfStatementComponent } from './trust-settlement-process/approval-of-statement/approval-of-statement.component';
import { DataService } from '../../../../common/services/data/data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { MatTooltip } from '@angular/material/tooltip';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { EmailHistoryFormComponent } from '../../../crm/email-history-form/email-history-form.component';
import { ApplicationCompletionComponent } from './trust-settlement-process/application-completion/application-completion.component';
import { MakePaymentComponent } from './trust-settlement-process/make-payment/make-payment.component';

@Component({
  selector: 'app-trust-settlement-detail',
  standalone: true,
  imports: [ViewLabel, Row, FormsModule, TabGroupComponent, TabComponent, AccordionModule,
     IconButtonComponent, InputControlComponent, AppDatePipe, StatusHistoryComponent, CheckboxComponent,
      TabSubComponent, TabSubGroupComponent, AppTableComponent, DropZoneComponent, CellDefDirective,
       CellHeaderDefDirective, FileSizePipe, SupportDocumentComponent, RequireSoaComponent, PrepareSoaComponent,
        ExecuteDischargeComponent, TaxClearanceComponent, ApprovalOfStatementComponent, AddressEditComponent,
         InnerScroll, MatTooltip,SearchComponent,
        ApplicationCompletionComponent, MakePaymentComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trust-settlement-detail.component.html',
  styleUrl: './trust-settlement-detail.component.scss'
})

export class TrustSettlementDetailComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('applicant') applicant!: TemplateRef<any>;
  errorTrue = false;
  trustSettlementAssignedOfficer = new entTrustApplicationAssignedOfficer()
  paymentDetailEdit = false;
  settlementApplicant = new entTrustSettlementApplicationApplicant();
  settlementApplicantRAW = new entTrustSettlementApplicationApplicant();
  accept: any;
  docNameType: any;
  documentArray: any = [];
  editOverseasAddress = false
  @ViewChild('b') bForm!: NgForm;
  @ViewChild('a') aForm!: NgForm;
  @ViewChild('x') xForm!: NgForm;
  @Input() type = {
    trustApplicationId: 0,
    trustApplicationIdenityNo: 0,
    trustApplicationRejectHistoryId: 0,
    trustApplicationStageValue: '',
    isEditable: '',
    trustApplicationStepNo: 0
  };
  __selectedItems: any = {
    currentIndex: 0,
    array: [],
  };
  application = new entTrustSettlementApplication();
  editData = false;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  clientDocumentColumns: any = ['documentTypeDescription', 'fileName', 'fileExtension', 'fileSize', 'action']
  clientDocumentColumnsName: any = ['Document Name', 'File Name', 'Format', 'Size', 'Action']
  fileExtension = "jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv";
  assignedOfficerDDL: any = []
  //history
  assignOfficerColumns: any = ["assignedToFullname", "assignedDate", "assignedByFullname", "statusDescription"];
  assignOfficerColumnsName: any = ["Assigned Officer", "Assigned Date", "Assigned By", "Status",];
  tableAssignOffice = [];
  statusHistoryDataSource: any = [
    {
      "statusValue": "REPET",
      "statusDescription": "Repeat",
      "changedBy": "CCO",
      "changedByFullname": "Customer Creation Officer",
      "changedDate": "24-05-2024 10:23",
      "idoObjState": "Selected",
      "updateSeq": 0,
      "msg": {
        "infoMessage": null,
        "errorMessage": [],
        "hasError": false
      }
    },
    {

      "statusValue": "CUSTR",
      "statusDescription": "Customer",
      "changedBy": "TO2",
      "changedByFullname": "Trust Officer 2",
      "changedDate": "24-05-2024 10:20",
      "idoObjState": "Selected",
      "updateSeq": 0,
      "msg": {
        "infoMessage": null,
        "errorMessage": [],
        "hasError": false
      }
    },

  ];
  trustApplication = new entTrustApplication();
  emailColumns: any = ["toEmailId", "sentDate", "sentStatusDescription", "action"];
  emailColumnsName: any = ["To", " Date | Time", "Status", "Action"];
  emailHistoryTableData: any = [];
  tablePaymentUpdateData: any = [
    {
      "sno": 1, "mode": 'Cheque', "givenbranch": 'BRB', "collectbranch": 'BNB', "paymentstatus": "Pending", "changedby": 'Trust Officer', "changeddate": '23 Jul 2024'
    }
  ];
  completeTrustCreationColumns: any = [];
  completeTrustCreationColumnsName: any = ["Sl.No", "CheckList Description"];
  completeTrustCreationTableData: any = [];
  linkedColumns: any = ['description', 'action'];
  linkedColumnsName: any = ['Document Name', ' Action'];
  receiptFundColumns: any = ['1', '2', '3', '4', '5'];
  receiptFundColumnsName: any = ["Date", "Check No / Tr. No", "Organization", "Receipt No", "Amount"];
  receiptFundTableData: any = [];
  paymentUpdateColumns: any = ["sno", "mode", "givenbranch", "collectbranch", "paymentstatus", "changedby", "changeddate"];
  paymentUpdateColumnsName: any = ["S.No", "Payment Mode", "Given by Branch", "Collect by Branch", "Payment Status", "Changed By", "Changed Date"];
  courtOrderColumns = ['designation', 'assignedToFullname', 'verificationDate', 'action'];
  courtOrderColumnsName = ['Designation', 'User Name', 'Verified Date', 'Action'];
  courtOrderTableData: any;
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  id = {
    currentIndex: 0,
    array: []
  };
  trustSettlementId: any
  currentDate: any
  tableLinkedData: any = [];
  editOverseas = false
  trustSettlement = new entTrustSettlementApplication()
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
      this.appService.helpFile ='Trust%20Settlement%20Detail.pdf'

      this.init();
    });
  }
  async init() {
    this.appService.setBreadCrumb(this.breadCrumb);
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    console.log(params);
    this.id = params;
    this.trustSettlementId = this.id.array[this.id.currentIndex];
    await this.data.checkToken();
    await this.initialData.getDDL('getInitialDataForTrustSettlement');
    this.initialData.getDDL('loadAllMProvince');
    this.currentDate = this.appService.getCurrentDate();
    this.openTrustSettlement();
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  isOverseasBankCheck(event: any) {
    if (event.target.checked === true) {
      this.overseasBank.isOverseasBank = 'Y'
    }
    else {
      this.overseasBank.isOverseasBank = 'N'
    }
  }
  openTrustSettlement() {
    const obj = {
      data: this.trustSettlementId
    }
    this.apiService.openTrustSettlementApplication(obj).subscribe((success) => {
      this.trustSettlement = success;
      if (success.ientTrustSettlementApplicationBankDetail.trustSettlementApplicationBankDetailId === 0) {
        this.createOverseasData()
      }
      if (success.ientTrustSettlementApplicationBankDetail.trustSettlementApplicationBankDetailId !== 0) {
        this.openOverseasBank()
      }
      this.openApplicant(success.ientTrustSettlementApplicationApplicant.trustSettlementApplicationApplicantId);

      this.notesList = success.lstentTrustSettlementApplicationNotes
      // this.tabledocumentData = success.lstentTrustSettlementApplicationDocument;
    })
  }
  overseasBank = new entTrustSettlementApplicationBankDetail();
  overseasBankRAW = new entTrustSettlementApplicationBankDetail();
  openOverseasBank() {
    const obj = {
      data: this.trustSettlement.ientTrustSettlementApplicationBankDetail.trustSettlementApplicationBankDetailId
    }
    this.apiService.openTrustSettlementApplicationBankDetail(obj).subscribe((success) => {
      this.overseasBank = success
    })
  }

  clearApplicantData() {
    this.settlementApplicantRAW = JSON.parse(JSON.stringify(this.settlementApplicant));
    this.apiService.createTrustApplicationApplicant().subscribe((success: any) => {
      this.settlementApplicant = success;
      this.errorTrue = false

      this.editApplicantData = true
      this.data.successMessage("Data Cleared Successfully");
    })
  }

  editOverseasData() {
    this.editOverseas = true
    if (this.overseasBank.trustSettlementApplicationBankDetailId === 0) {
      this.createOverseasData()
    }
  }
  saveOverseasData() {
    if (this.bForm.valid) {
      this.overseasBank.trustSettlementApplicationId = this.trustSettlement.trustSettlementApplicationId
      this.apiService.saveTrustSettlementApplicationBankDeatil(this.overseasBank).subscribe((success) => {
        this.overseasBank = success;
        this.editOverseas = false
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  clearOverseasData() {
    this.overseasBank = JSON.parse(JSON.stringify(this.overseasBankRAW));
    this.createOverseasData();
    this.data.successMessage('Data Cleared Successfully')
  }
  createOverseasData() {
    this.apiService.createTrustSettlementBank().subscribe((success) => {
      this.overseasBank = success
    })
  }
  refreshOverseasData() {
    const obj = {
      data: this.trustSettlement.ientTrustSettlementApplicationBankDetail.trustSettlementApplicationBankDetailId
    }
    this.apiService.openTrustSettlementApplicationBankDetail(obj).subscribe((success) => {
      this.overseasBank = success;
      this.errorTrue = false
      this.data.successMessage('Data Refreshed Successfully')
    })
  }

  //applicant
  //customer
  customer = new entCustomerSearch()
  customertableData: any = []
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

  editApplicant() {
    this.applicantDialogBox();
    this.editApplicantData = false;
    this.editApplicantBtn = true;
    if (this.trustSettlement.ientTrustSettlementApplicationApplicant.trustSettlementApplicationApplicantId === 0) {
      this.createTrustApplicationApplicant()
    }
    if (this.trustSettlement.ientTrustSettlementApplicationApplicant.trustSettlementApplicationApplicantId !== 0) {
      this.openApplicant(this.trustSettlement.ientTrustSettlementApplicationApplicant.trustSettlementApplicationApplicantId);

    }
  }
  async applicantDialogBox() {
    await this.createCustomerSearch()
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.applicant, {
      height: '600px',
      width: '1200px',
      maxWidth: '1170px',
    });
  }
  editApplicantBtn = false;
  editApplicantData = true;
  applicantSearch = false;
  addNewApplicant = true

  editTrustApplicant() {
    debugger
    this.editApplicantBtn = false;
    this.editApplicantData = true;
    // this.applicantDialogBox()
  }
  openCustomerForApplicant(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openCustomer(obj).subscribe((success: any) => {
      this.settlementApplicant.ientCustomer = success;
      this.settlementApplicant.customerId = success.customerId
      this.editApplicantData = false;
      this.applicantSearch = true;

      console.log(this.settlementApplicant.ientCustomer.customerId);

    })
  }
  createTrustApplicationApplicant() {

    this.applicantSearch = true

    this.errorTrue = false
    this.apiService.createTrustSettlementApplicationApplicant().subscribe((success: any) => {
      this.settlementApplicant = success;
      this.addNewApplicant = true;
      this.editApplicantData = true;
      this.editApplicantBtn = false;
      // this.editClientBtn = false
      this.applicantDialogBox();
    });
  }
  openApplicant(val: any) {
    const obj = {
      data: this.trustSettlement.ientTrustSettlementApplicationApplicant.trustSettlementApplicationApplicantId
    }
    this.apiService.openTrustSettlementApplicationApplicant(obj).subscribe((success) => {
      this.settlementApplicant = success
    })
  }
  dialogClose(val?:any) {
    this.dialog.closeDialog(val);
    this.errorTrue = false
    this.data.showErrorMessage = false
  }
  //customer
  customerColumns: any = ["customerRefNo", "customerName", "genderDescription", "dateOfBrith", "emailId", "contactNo", "statusdescription", "action"];
  customerColumnsName: any = ["Customer No", "Customer Name", "Gender", "Date Of Birth", "Email ID", "Contact Number", "Status", ""];
  pageChanged(event: any) {
    this.customer.pageNumber = event.pageNumber;
    this.customer.pageSize = event.pageSize;
    this.searchCustomer();
  }
  @ViewChild('customerSearchDialog', { static: false })
  customerSearchDialog!: TemplateRef<any>;
  async customerSearch(type: any) {

    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.customerSearchDialog, {
      height: '500px',
      width: '1050px',
      maxWidth: '1170px',

    },'customerList');
    // this.createClientCustomer = true
    if (dialogResponse) {

    }
  }
  @ViewChild('applicantForm') applicantForm!: NgForm;
  updateApplicant() {
    if (this.applicantForm.valid) {
      this.settlementApplicant.trustSettlementApplicationId = this.trustSettlement.trustSettlementApplicationId;

      this.apiService.saveTrustSettlementApplicationApplicant(this.settlementApplicant).subscribe((success: any) => {
        // this.tableApplicantData = success.lstentTrustSettlementApplicationApplicant;4
        this.settlementApplicant = success.ientTrustSettlementApplicationApplicant;
        this.dialog.closeAll()
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  openTrustApplicationApplicant(val: any, type?: any) {

    const obj = {
      data: val
    }
    this.apiService.openTrustSettlementApplicationApplicant(obj).subscribe((success: any) => {
      this.settlementApplicant = success;
      if (type === 'refresh') {
        this.editApplicantData = true;
        this.editApplicantBtn = false;
        this.data.successMessage('Data Refreshed Successfully')
      }
      else {

        this.editApplicantBtn = true;
        this.editApplicantData = false;
      }
      this.addNewApplicant = false;
      this.applicantSearch = false;


    })
  }
  saveApplicant() {
    if (this.applicantForm.valid) {
      this.settlementApplicant.trustSettlementApplicationId = this.trustSettlement.trustSettlementApplicationId;

      this.apiService.saveTrustSettlementApplicationApplicant(this.settlementApplicant).subscribe((success: any) => {
        this.settlementApplicant = success.ientTrustSettlementApplicationApplicant;

        this.dialog.closeAll()
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);



      })
    }
    else {
      this.errorTrue = true
    }
  }
  dialogCloseAll() {
    this.dialog.closeAll();
    this.errorTrue = false
    this.data.showErrorMessage = false
  }


  //notes
  notesList: any







  processDatas = false
  onTabChange(event: any) {
    switch (event.tabTitle) {
      case 'Process': this.getProcessTab();
        break;
      case 'History': this.getHistoryTab();
        break;
        case 'Payment':
          this.getPaymentList();
          break
    }
  }
  editPayemntDetailsData() {
    this.paymentDetailEdit = true
  }
  savePaymentDetails() {
    this.paymentDetailEdit = false
  }
  reAssignTrust() { }
  selfAssignTrust() { }
  uploadClientDocumentAttachment(event: any) {

  }
  getProcessTab() {
    const obj = {
      data: this.trustSettlementId
    }
    this.apiService.openTrustSettlementApplicationForProcessTab(obj).subscribe((success) => {
      this.trustSettlement.lstentTrustSettlementApplicationDocument = success.lstentTrustSettlementApplicationDocument;
      this.trustSettlement.lstentTrustSettlementApplicationNotes = success.lstentTrustSettlementApplicationNotes;
      this.trustSettlement.lstentTrustSettlementApplicationChecklist = success.lstentTrustSettlementApplicationChecklist;
      this.trustSettlement.lstentTrustSettlementAssignedOfficerHistory = success.lstentTrustSettlementAssignedOfficerHistory
      this.processDatas = true;
    })
  }
  getHistoryTab() {
    const obj = {
      data: this.trustSettlementId
    }
    this.apiService.openTrustSettlementApplicationForStatusTab(obj).subscribe((success) => {
      // this.trustSettlement = success;
      this.trustSettlement.lstentTrustSettlementAssignedOfficerHistory = success.lstentTrustSettlementAssignedOfficerHistory;
      this.notesList = success.lstentTrustSettlementApplicationNotes
      this.trustSettlement.lstentTrustSettlementApplicationStatusHistory = success.lstentTrustSettlementApplicationStatusHistory
      this.trustSettlement.lstentTrustSettlementApplicationEmailHistory = success.lstentTrustSettlementApplicationEmailHistory
    })

  }
  navigateToList() {
    this.router.navigateByUrl('/home/trust/trust-settlement')
  }
  async checkDocumentDelete(docId: any) {

  }
  viewFile(element: any) {

  }
  completeApplicationStage() {

  }
  downloadLinkedFile(val: any) {

  }
  documentTypeDatas(event: any) {
    const obj = {
      data: event
    }
    this.apiService.createTrustApplicationDocument(obj).subscribe((success: any) => {
      // this.estateApplicationDocument = success
    })
  }
  onChange(event: any) {

  }
  createNotesDialog() {

  }
  imageId: any = ''
  downloadImageFile() {
    this.downloadFile(this.imageId)
    this.dialog.closeAll()
    if (this.trustSettlement.applicationStageValue === 'OBDOC') {
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
  imageView(path: any, filename: any, val: any) {
    // debugger
    // this.filePath = path;
    // this.fileName = filename;
    // this.imageId = val
    // this.dialog.openDialog(this.Templates, {
    //   width: '600px',
    //   height: 'auto'
    // })
  }
  editOverseasAddressDetails() {
    this.editOverseasAddress = true
  }
  saveOverseasAddress() {
    if (this.xForm.valid) {
      this.apiService.saveTrustSettlementApplication(this.trustSettlement).subscribe((success) => {
        this.trustSettlement = success;
        this.editOverseasAddress = false
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  clearOverseasAddress() {
    this.trustSettlement.iOverseasAddress = new entAddress();
    this.data.successMessage('Data Cleared Successfully')
  }
  refreshOverseasAddress() {
    const obj = {
      data: this.trustSettlementId
    }
    this.apiService.openTrustSettlementApplication(obj).subscribe((success) => {
      this.trustSettlement.iOverseasAddress = success.iOverseasAddress
    })
  }
  islandDDL: any = [];
  villageDDL: any = [];

  getIslandDDL(event: any) {
    const obj = {
      data: event
    }
    this.apiService.getProvinceBasedOnInslandDDL(obj).subscribe((success) => {
      this.islandDDL = success;
      // this.trustSettlement.iOverseasAddress.village = ''
    })
  }
  getVillageDDL(event: any) {
    const obj = {
      data: event
    }
    this.apiService.getIslandBasedOnVillageDDL(obj).subscribe((success) => {
      this.villageDDL = success;
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
  getRefNo(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openCustomer(obj).subscribe((success: any) => {
      this.settlementApplicant.ientCustomer = success;
      this.settlementApplicant.customerId = success.customerId
      this.editApplicantData = false;
      this.applicantSearch = true;
      this.dialog.closeDialog('customerList');
      this.data.showErrorMessage = false
      // this.clientView = 'show';
      // this.clientToggleActive = true;
      // this.editClientBtn = false
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
        title: 'Trust Settlement',
        icon: 'assets/icons/accordian/trust.svg'
      }
    });
  }
  paymentColumns: any = ['reference','status',  'narrative','transaction','documemtDate', 'source'];
  paymentColumnName: any = [
   'Reference','Organisation/ Customer Name', 
    'Narration','Transaction Amount','Transaction Date','Status'
  ];
  tablePaymentData: any = [];

    //payment List 
    getPaymentList(){
      const obj = {
        data: this.trustSettlement.trustSettlementApplicationId,
        data1:'Settlement'
      }
      this.apiService.getTransactionDetailsByWithdrawalId(obj).subscribe((success)=>{
        this.tablePaymentData = success.lstentTrasactionDetail
      })
    }
}
