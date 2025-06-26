import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { TabSubComponent, TabSubGroupComponent } from '../../../../app-core/template/tab/tab1';
import { TabComponent, TabGroupComponent } from '../../../../app-core/template/tab/tab';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { CoreService } from '../../../../app-core/service/core.service';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { DropZoneComponent } from '../../../../app-core/template/drop-zone/drop-zone.component';
import { NgClass } from '@angular/common';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { StatusHistoryComponent } from '../../../../app-core/template/status-history/status-history.component';
import { AppService } from '../../../../app.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { entOrganizationApplication, entOrganizationApplicationAssignedOfficerHistory, entOrganizationApplicationBankDetail, entOrganizationApplicationContactPerson, entOrganizationApplicationDocument, entOrganizationApplicationNotes, entOrganizationDocument } from '../../../../common/api-services/application-api/application-api.classes';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../../common/services/url/url.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { DataService } from '../../../../common/services/data/data.service';
import { MultiPageUrlComponent } from '../../../../app-core/template/multi-page-url/multi-page-url.component';
import { ErrorInfoComponent } from '../../../../app-core/error-info/error-info.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { ViewPdfComponent } from '../../../../app-core/template/view-pdf/view-pdf.component';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { EmailHistoryFormComponent } from '../../../crm/email-history-form/email-history-form.component';
import { FileSizePipe } from '../../../../app-core/template/drop-zone/file-size.pipe';

@Component({
  selector: 'app-organization-application-detail',
  standalone: true,
  imports: [Row, ViewLabel, FormsModule, InputControlComponent, AccordionModule, TabSubComponent, TabSubGroupComponent, TabGroupComponent, TabComponent, AppTableComponent, CellDefDirective, IconButtonComponent, InnerScroll, AddressEditComponent, DropZoneComponent, NgClass, AppDatePipe, StatusHistoryComponent, MultiPageUrlComponent, ErrorInfoComponent, ErrorMessageComponent, AccoutsStatusTableComponent, FileSizePipe, CellHeaderDefDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './organization-application-detail.component.html',
  styleUrl: './organization-application-detail.component.scss'
})
export class OrganizationApplicationDetailComponent {
  @ViewChild('contactF') contactFform!: NgForm;
  @ViewChild('bankDetail') bankDetailform !: NgForm;
  organizationDocument = new entOrganizationApplicationDocument()
  organizationApplication = new entOrganizationApplication();
  organizationContact = new entOrganizationApplicationContactPerson();
  organizationBank = new entOrganizationApplicationBankDetail();
  notes = new entOrganizationApplicationNotes()
  errorTrue = false
  id = {
    currentIndex: 0,
    array: []
  };
  currentDate: any = '';
  organizationApplicationId: any = 0;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('bank', { static: false })
  bank!: ElementRef;
  @ViewChild('bankDialogs', { static: false })
  bankDialogs!: ElementRef;
  @ViewChild('contact', { static: false })
  contact!: ElementRef;
  @ViewChild('organizationApplicationInfo', { static: false })
  organizationApplicationInfo!: ElementRef;
  @ViewChild('notesDialog', { static: false })
  notesDialog!: ElementRef;

  @ViewChild('organization') organizationform!: NgForm
  @ViewChild('notesForm') notesForm!: NgForm
  @ViewChild('x') xForm!: NgForm
  @ViewChild('q') qForm!: NgForm
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  };
  loading = false
  bankColumns: any = ['bname', 'bCode', 'status', 'action'];
  bankColumnsName: any = ['Bank Name', 'Bank Code',  'Status', 'Action'];
  tableBankData: any = [
    //   {
    //   'bname': 'kvb', 'bCode': 7221, 'brName': 'kvbn', 'status': 'Active'
    // }
  ];
  contactColumns: any = ['bname', 'bCode', 'brName', 'status', 'action'];
  contactColumnsName: any = ['Name', 'Designation', 'Email ID', 'Status', 'Action'];
  tableContactData: any = [
    //   {
    //   'bname': 'sameena', 'bCode': 'head', 'brName': 'sameena@gmail.com', 'status': 'Active'
    // }
  ];
  assignOfficerColumns: any = ["assingnedToFullName", "assignedDate", "assingnedByFullName", "statusDescription"];
  assignOfficerColumnsName: any = ["Assigned Officer", "Assigned Date", "Assigned By", "Status",];
  tableAssignOffice = [];
  statusHistoryDataSource: any = [
    // {
    //   "statusValue": "REPET",
    //   "statusDescription": "Repeat",
    //   "changedBy": "CCO",
    //   "changedByFullname": "Customer Creation Officer",
    //   "changedDate": "24-05-2024 10:23",
    //   "idoObjState": "Selected",
    //   "updateSeq": 0,
    //   "msg": {
    //     "infoMessage": null,
    //     "errorMessage": [],
    //     "hasError": false
    //   }
    // },
    // {

    //   "statusValue": "CUSTR",
    //   "statusDescription": "Customer",
    //   "changedBy": "TO2",
    //   "changedByFullname": "Trust Officer 2",
    //   "changedDate": "24-05-2024 10:20",
    //   "idoObjState": "Selected",
    //   "updateSeq": 0,
    //   "msg": {
    //     "infoMessage": null,
    //     "errorMessage": [],
    //     "hasError": false
    //   }
    // },

  ];

  emailColumns: any = ["toEmailId", "sentDate", "sentStatusDescription", "action"];
  emailColumnsName: any = ["To", " Date | Time", "Status", "Action"];
  emailHistoryTableData: any = [];

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);

  }
  //clientDoc
  documentColumns: any = ['documentTypeDescription', 'fileName', 'fileSize', 'action']
  documentColumnsName: any = ['Document Name', 'File Name', 'Size', 'Action']
  // organizationApplication.lstentOrganizationApplicationDocument: any = []
  constructor(
    public dialog: CoreService,
    public appService: AppService,
    public apiService: ApplicationApiService,
    public url: UrlService,
    public initialData: InitialDataService,
    public router: Router,
    public route: ActivatedRoute,
    public data: DataService,) {
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
    this.organizationApplicationId = this.id.array[this.id.currentIndex];
    await this.data.checkToken();
    this.appService.helpFile ='Organization%20Application%20Details.pdf'
this.loadProvinceDDL()
    this.initialData.getDDL('getOrganizationApplicationInitialData');
    await this.openOrganization();
    this.getOrgBankList(this.organizationApplicationId)
    this.currentDate = this.appService.getCurrentDate();
    await this.initialData.getDDL('getOrganizationApplicationContactPersonInitialData')
    await this.initialData.getDDL('getOrganizationApplicationBankDetailInitialData')
    await this.initialData.getDDL('getOrganizationDocumentInitialData')

  }

  ProvinceDDL:any
  loadProvinceDDL(){
    this.apiService.loadAllMProvince().subscribe((success)=>{
      this.initialData.DDLValues.DDLProvince = success.value
    })
  }
  async bankDialog() {
    // this.dialogName = type
    let dialogResponse: any = await this.dialog.openDialog(this.bankDialogs, {
      height: '550px',
      width: '1000px',
      maxWidth: '1170px',
    });

  }
  async contactDialog(data?: any) {
    // this.dialogName = type
    let dialogResponse: any = await this.dialog.openDialog(this.contact, {
      height: '550px',
      width: '1000px',
      maxWidth: '1170px',
      data: {
        data: data
      }

    });
  }
  async openContactDialog(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openOrganizationApplicationContactPerson(obj).subscribe(async (success) => {
      this.organizationContact = success;
      this.contactView = true
      let dialogResponse: any = await this.dialog.openDialog(this.contact, {
        height: '550px',
        width: '1000px',
        maxWidth: '1170px',
      })
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);

    });
  }

  openOrgContact(val: any, type?: any) {
    const obj = {
      data: val
    }
    this.apiService.openOrganizationApplicationContactPerson(obj).subscribe((success) => {
      this.organizationContact = success;
      if (type === 'refresh') {
        this.data.successMessage('Data Refreshed Succeessfully')
      }
      else {
        this.contactDialog()
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      }
    })
  }

  async orgAppInfo() {
    let dialogResponse: any = await this.dialog.openDialog(this.organizationApplicationInfo, {
      height: '550px',
      width: '1000px',
      maxWidth: '1170px',

    });

  }
  showStatusHistory = true
  showEmailHistory = false
  accordianOpen = true
  openAccordianProcess(dujuk: any) {
    console.log(dujuk);
    if (dujuk === false) {
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

    // if (this.accordianOpen === false) {
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
  openOrganization() {
    const obj = {
      data: this.organizationApplicationId

    }
    this.apiService.openOrganizationApplication(obj).subscribe((success) => {
      this.organizationApplication = success;
      this.tableContactData = success.lstentOrganizationApplicationContactPerson
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }

  createOrganizationContact(type?: any) {
    this.errorTrue = false;
    this.contactView = false;
    this.apiService.createOrganizationApplicationContactPerson().subscribe((success) => {
      this.organizationContact = success;

      if (type === 'clear') {
        this.data.successMessage('Data Cleared Successfully')
      }
      else {
        this.contactDialog(success);
      }

    })
  }
  createOrganizationBank(type?: any) {
    this.errorTrue = false;
    this.createNewBankInfoValues = false
    this.errorTrue = false
    this.createBank = true;
    this.viewBank = false;
    this.editBank = false
    this.apiService.createOrganizationApplicationBankDetail().subscribe((success) => {
      this.organizationBank = success;
      if (type === 'clear') {
        this.data.successMessage('Data Cleared Successfully');
      }
      else {
        this.bankDialog()
      }
    })
  }
  saveOrganizationContact() {
    this.organizationContact.organizationApplicationId = this.organizationApplicationId
    if (this.contactFform.valid) {
      this.apiService.saveOrganizationApplicationContactPerson(this.organizationContact).subscribe((success) => {
        this.tableContactData = success.lstentOrganizationApplicationContactPerson;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        this.dialog.closeDialog();
        this.data.showErrorMessage = false
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  saveOrganizationBank() {
    this.organizationBank.organizationApplicationId = this.organizationApplicationId

    if (this.xForm.valid && this.qForm.valid) {
      this.apiService.saveOrganizationApplicationBankDetail(this.organizationBank).subscribe((success) => {
        this.tableBankData = success.lstentOrganizationApplicationBankDetail;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        this.data.showErrorMessage = false
        this.dialog.closeDialog()
      })
    }
    else {
      this.errorTrue = true;
    }

  }
  updateOrganizationBank() {
    this.organizationBank.organizationApplicationId = this.organizationApplicationId

    if (this.xForm.valid) {
      this.apiService.saveOrganizationApplicationBankDetail(this.organizationBank).subscribe((success) => {
        this.tableBankData = success.lstentOrganizationApplicationBankDetail;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        this.data.showErrorMessage = false
        this.dialog.closeDialog()
      })
    }
    else {
      this.errorTrue = true;
    }

  }
  getOrgBankList(val: any) {
    const obj = {
      data: val
    }
    this.apiService.getListOrganizationApplicationBankDetails(obj).subscribe((success) => {
      this.tableBankData = success.lstentOrganizationApplicationBankDetail
    })
  }
  saveOrganization() {
    if (this.organizationform.valid) {
      this.organizationApplication.branchId = this.appService.userData.branchId;
      this.apiService.saveOrganizationApplication(this.organizationApplication).subscribe((success) => {
        this.organizationApplication = success;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        this.data.showErrorMessage = false
        this.dialog.closeAll();

      })
    }
    else {
      this.errorTrue = true;
    }
  }
  openOrganizationContact(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openOrganizationApplicationContactPerson(obj).subscribe((success) => {
      this.organizationContact = success;
    })
  }
  openOrganizationBank(val: any, type?: any) {
    const obj = {
      data: val
    }
    this.apiService.openOrganizationApplicationBankDetail(obj).subscribe((success) => {
      this.organizationBank = success;

      this.viewBank = true;
      this.createBank = false;
      this.editBank = false
      if (type === 'refresh') {
        this.data.successMessage('Data Refreshed Successfully')
      }
      else {
        this.bankDialog()
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);

      }
    })
  }
  // clearContactPerson(){
  //   this.createOrganizationContact();
  //   this.data.successMessage('Data Cleared Successfully');
  // }

  refreshBankData(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openOrganizationApplicationBankDetail(obj).subscribe((success) => {
      this.organizationBank = success;
      this.data.successMessage('Data Refreshed Successfully')
    })
  }

  getDocumentList() {
    const obj = {
      data: this.organizationApplicationId
    }
    this.apiService.getListOrganizationApplicationDocument(obj).subscribe((success) => {
      this.organizationApplication.lstentOrganizationApplicationDocument = success.lstentOrganizationApplicationDocument;
      this.loading = true
    })
  }
  documentValue: any = ''
  onTabChange(event: any) {
    switch (event.tabTitle) {
      case 'Upload Document': this.getDocumentList();
        break;
      case 'History':
      this.getAssiDDLList()
      this.getNotesList();
        this.getAssignedOfficerHistory();
        this.geStatusHistory();
        this.getEmailHistory();
        break;

    }
  }
  accept: any
  fileExtension = "jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv";
  uploadClientDocumentAttachment(event: any) {
    console.log(event[0]);
    this.organizationDocument.organizationApplicationId = this.organizationApplication.organizationApplicationId;
    this.organizationDocument.documentTypeId = 1088;
    this.organizationDocument.ientFile.fileName = event[0].fileName
    this.organizationDocument.ientFile.fileSize = event[0].fileSize
    this.organizationDocument.ientFile.content = event[0].content;
    this.organizationDocument.ientFile.fileType = event[0].fileType
    this.organizationDocument.ientFile.content = event[0].content;
    this.organizationDocument.documentTypeValue = this.documentValue;


    if (this.organizationDocument.documentTypeValue !== '') {

      // this.application.lstentorganizationDocument = []
      this.apiService.saveOrganizationApplicationDocument(this.organizationDocument).subscribe((success: any) => {
        this.organizationApplication.lstentOrganizationApplicationDocument = success.lstentOrganizationApplicationDocument;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        this.documentValue = '';
        this.data.showErrorMessage = false
        this.loading = true
      })
    }
    else {
      this.data.errorInfoMessage('Select Document Type')
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
      width: "100%",
      height: "85%",
      data: {
        url: xurl,
      },
    });
  }

  filePath: any;
  fileName = "";
  imageId: any
  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;

  imageView(path: any, filename: any, val: any) {

    this.filePath = path;
    this.fileName = filename;
    this.imageId = val
    this.dialog.openDialog(this.Templates, {
      width: '600px',
      height: 'auto'
    })
  }
  downloadImageFile() {
    this.downloadFile(this.imageId)
    this.dialog.closeAll()

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
  async checkDocumentDelete(docId: any) {

    let msg = `Are you sure, You want to delete : ${docId.documentTypeDescription} ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      const obj = {
        data: docId.organizationApplicationDocumentId
      }
      this.apiService.deleteOrganizationApplicationDocument(obj).subscribe((success: any) => {
        this.organizationApplication.lstentOrganizationApplicationDocument = success.lstentOrganizationApplicationDocument;
        this.loading = true
      })
    }
  }


  //process

  getNotesList() {
    const obj = {
      data: this.organizationApplicationId
    }
    this.apiService.getListOrganizationApplicationNotes(obj).subscribe(async (success) => {
      this.organizationApplication.lstentOrganizationApplicationNotes = success.lstentOrganizationApplicationNotes
    })
  }
  async createOrganizationNotes(type?: any) {
    const obj = {
      data: this.organizationApplication.statusValue
    }
    this.apiService.createOrganizationApplicationNotes(obj).subscribe((success) => {
      this.notes = success;
      this.notesDDl = success.ientDDL.value
    })
    if (type === 'clear') {
      this.data.successMessage('Data Cleared Successfully')
    }
    else {
      let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
        height: '400px',
        width: '900px',
        maxWidth: '1170px',
      });
    }

  }
  notesDDl: any
  saveNotes() {
    if (this.notesForm.valid) {
      this.organizationApplication.ientOrganizationApplicationNotes = this.notes
      this.apiService.saveOrganizationApplicationNotes(this.organizationApplication).subscribe((success) => {
        this.organizationApplication = success;
        this.assignOfficerData = success.lstentOrganizationApplicationAssignedOfficerHistory;
        this.emailHistoryTableData = success.lstentOrganizationApplicationEmailHistory;
         this.statusHistoryDataSource = success.lstentOrganizationApplicationStatusHistory;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        this.data.showErrorMessage = false
        this.dialog.closeAll()
      })
    }
    else {
      this.errorTrue = true
    }
  }

  assignOfficerData: any = []
  getAssignedOfficerHistory() {
    const obj = {
      data: this.organizationApplicationId
    }
    this.apiService.getListOrganizationApplicationAssignedOfficerHistory(obj).subscribe((success) => {
      this.assignOfficerData = success.lstentOrganizationApplicationAssignedOfficerHistory;
    })
  }


  clear() {

  }

  editBank = false;
  createBank = false;
  viewBank = true;
  islandDDL: any

  editBankDetails() {
    this.editBank = true;
    this.createBank = false;
    this.viewBank = false;
    this.errorTrue = false;
    if (this.organizationBank.ientBank.ientAddress.provinceId !== 0) {
      this.getIslandFromProvince(this.organizationBank.ientBank.ientAddress.provinceId, 'bankIslandDDL')
    }
    if (this.organizationBank.ientBank.ientAddress.islandId !== 0) {
      this.getVillageFromIsland(this.organizationBank.ientBank.ientAddress.islandId, 'bankVillageDDL')
    }
  }
  bankCodeValue: any
  initialDDL: any = {
    resIslandDDL: [],
    resVillageDDL: [],
    perIslandDDL: [],
    perVillageDDL: [],
    bankIslandDDL: [],
    bankVillageDDL: []
  }
  customerBankRAW = new entOrganizationApplicationBankDetail()
  getIslandFromProvince(val: any, type?: any) {
    const obj = {
      data: val
    }
    this.apiService.getProvinceBasedOnInslandDDL(obj).subscribe((success) => {
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
  clearBankDetails() {
    this.errorTrue = false
    this.createNewBankInfoValues = false
    this.errorTrue = false
    this.createBank = true;
    this.viewBank = false;
    this.editBank = false
    this.organizationBank = JSON.parse(JSON.stringify(this.customerBankRAW));
    this.bankCodeValue = ''
    this.apiService.createNewCustomerBank().subscribe((success) => {
      this.organizationBank = success;
    })
  }
  createNewBankInfoValues = false
  viewBankDetailsBasedOnBankCode(x: any) {
    if (x.valid) {
      const obj = {
        data: this.bankCodeValue
      }
      this.apiService.getBankDetailsBasedOnBranchCode(obj).subscribe((success) => {
        this.organizationBank = success;
        this.createNewBankInfoValues = true
        this.errorTrue = false;
        // this.headOfficeBankId(success.bankId)
        // if (success.ientBank.ientAddress.provinceId !== '') {
        //   this.getBankIslandFromProvince(this.organizationBank.ientBank.ientAddress.provinceId)
        // }
        // if (success.ientBank.ientAddress.islandId !== '') {
        //   this.getBankVillageFromIsland(this.organizationBank.ientBank.ientAddress.islandId)
        // }
      })
    }
    else {
      this.errorTrue = true
    }
  }

  geStatusHistory() {
    const obj = {
      data: this.organizationApplicationId
    }
    this.apiService.getListOrganizationApplicationStatusHistory(obj).subscribe((success) => {
      this.statusHistoryDataSource = success.lstentOrganizationApplicationStatusHistory;
    })
  }
  getEmailHistory() {
    const obj = {
      data: this.organizationApplicationId
    }
    this.apiService.getListOrganizationApplicationEmailHistory(obj).subscribe((success) => {
      this.emailHistoryTableData = success.lstentOrganizationApplicationEmailHistory;
    })
  }

  openOrgBankDetails(val: any, type?: any) {
    const obj = {
      data: val
    }
    this.apiService.openOrganizationApplicationBankDetail(obj).subscribe((success) => {
      this.organizationBank = success;
      if (type === 'refresh') {
        this.data.successMessage('Data Refreshed Successfully')
      }
      else {
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);

      }

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
        title: 'Organization Change',
        icon: 'assets/icons/accordian/customer-service.svg'
      }
    });
  }
  orgAssignOfficer = new entOrganizationApplicationAssignedOfficerHistory()
  reassignOrg() {
    this.orgAssignOfficer.organizationApplicationId = this.organizationApplicationId;
    this.orgAssignOfficer.statusValue = this.organizationApplication.statusValue
    this.organizationApplication.ientOrganizationApplicationAssignedOfficerHistory = this.orgAssignOfficer
    this.apiService.reAssignOrganizationApplicationAssignedHistory(this.organizationApplication).subscribe((success) => {
      this.organizationApplication = success;
      this.assignOfficerData = success.lstentOrganizationApplicationAssignedOfficerHistory;
        this.emailHistoryTableData = success.lstentOrganizationApplicationEmailHistory;
         this.statusHistoryDataSource = success.lstentOrganizationApplicationStatusHistory;
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }
  selfAssignOrg() {
    this.orgAssignOfficer.organizationApplicationId = this.organizationApplicationId;
    this.orgAssignOfficer.statusValue = this.organizationApplication.statusValue
    this.organizationApplication.ientOrganizationApplicationAssignedOfficerHistory = this.orgAssignOfficer
    this.apiService.selfAssignOrganizationApplicationAssignedHistory(this.organizationApplication).subscribe((success) => {
      this.organizationApplication = success;
      this.assignOfficerData = success.lstentOrganizationApplicationAssignedOfficerHistory;
      this.emailHistoryTableData = success.lstentOrganizationApplicationEmailHistory;
       this.statusHistoryDataSource = success.lstentOrganizationApplicationStatusHistory;
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }
  contactView = true

  editContact() {
    this.contactView = false
  }
  navigateToList() {
    this.router.navigateByUrl('home/organization/organization-application/search')
  }
  assignOfficerDDL: any = []
  getAssiDDLList() {
    const obj = {
      data1: this.organizationApplicationId,
      data3: this.organizationApplication.statusValue,

    }
    this.apiService.getListOfOfficerForOrganaizationApplication(obj).subscribe((success) => {
      this.assignOfficerDDL = success.value
    })
  }

}
