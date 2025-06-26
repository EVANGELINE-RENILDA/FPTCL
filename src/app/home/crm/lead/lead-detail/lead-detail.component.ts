import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { entLead, entLeadAssignedOfficer, entLeadNotes, entLeadNotesList } from '../../../../common/api-services/application-api/application-api.classes';
import { NotesDialogComponent } from '../../notes-dialog/notes-dialog.component';
import { LeadFormComponent } from '../lead-form/lead-form.component';
import { StatusHistoryComponent } from '../../../../app-core/template/status-history/status-history.component';
import { MultiPageUrlComponent } from '../../../../app-core/template/multi-page-url/multi-page-url.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { EmailHistoryFormComponent } from '../../email-history-form/email-history-form.component';
import { AppService } from '../../../../app.service';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { DocumentsComponent } from '../../../../app-core/template/documents/documents.component';

@Component({
  selector: 'app-lead-detail',
  standalone: true,
  imports: [CdkAccordionModule, NgClass, AccordionModule, Row, ViewLabel, AppTableComponent, CellDefDirective, CellHeaderDefDirective, FormsModule, InputControlComponent, IconButtonComponent, StatusHistoryComponent, MultiPageUrlComponent, AppDatePipe, ErrorMessageComponent, AppAccessDirective, ButtonAccessDirective, DocumentsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lead-detail.component.html',
  styleUrl: './lead-detail.component.scss'
})
export class LeadDetailComponent {
  pageId = 'CULED'
  id = {
    currentIndex: 0,
    array: []
  };
  options = {
    hideFullSpinner: true
  }
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  leadId = 0;
  leadDetails = new entLead();
  errorTrue = false
  notesList = new entLeadNotesList();
  notesData = new entLeadNotes();
  statusHistoryDataSource: any = [];
  @ViewChild('descriptionDialog', { static: false })
  descriptionDialog!: TemplateRef<any>;
  leadAssignOfficer = new entLeadAssignedOfficer();
  assignedOfficerDDL: any = []
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  customerLeadDocumentList: any = [];
  leadEdit = false
  leadEditBtn = true;
  descriptionEdit = false;
  btnConditions = false
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  @ViewChild('x') xForm!: NgForm;
  @ViewChild('p') pform!: NgForm;
  //card-accordian
  showNotesDatas = false
  showStatusHistory = false
  showCommunicationHistory = false
  accordianOpen = false
  showAppAssigned = false

  //Email history
  emailColumns: any = ["toEmailId", "sentDate", "sentStatusDescription", "action"];
  emailColumnsName: any = ["To", " Date | Time", "Status", "Action"];
  emailHistoryTableData: any = []

  //Assigned Officer
  assignOfficerColumns: any = ["assignedToFullname", "assignedDate", "assignedByFullname", "statusDescription"];
  assignOfficerColumnsName: any = ["Assigned Officer", "Assigned Date", "Assigned By", "Status",];
  assignOfficerTableData: any = [];

  //serice history
  serviceHistoryColumns: any = ["leadRefNo", "leadTypeDescription", "productTypeDescription", "leadDatetime", "statusDescription", "action"]
  serviceHistoryColumnsName: any = ["Lead No", "Lead Type", "Product Type", "Lead Date", "Status", ""];
  tableBankData: any = []
  leadHistoryTableData: any = []

  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public appService: AppService,
    public url: UrlService,
    public router: Router
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
      this.appService.helpFile = 'Lead%20Detail.pdf'
      // this.bankDialogBox()
    });
  }

  ngOnInit(): void {
    // this.init()
  }

  async init() {

    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params;
    this.leadId = this.id.array[this.id.currentIndex];
    console.log(this.id);
    await this.data.checkToken();
    this.appService.setBreadCrumb(this.breadCrumb);

    this.openLeadDetails();

  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  openLeadDetails() {
    this.errorTrue = false;
    this.leadEdit = false
    this.leadEditBtn = true
    const obj = {
      data: this.leadId
    }
    this.apiService.openLead(obj).subscribe((success) => {
      this.leadDetails = success;
      if (this.leadDetails.assignedOfficerFlag === "True" && this.leadDetails.statusValue !== "CANCD" &&
        this.leadDetails.statusValue !== 'CLDWN') {
        this.btnConditions = true;
      }
      this.getNotesList();
      this.getLeadOfficerList();
      this.getAssignOfficerList()
      this.initialData.getDDL('getInitialDataForLead', this.options);
      this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.getStatusHistoryList();
      this.getLeadHistoryList()
      this.getEmailList();
      this.getDocumentList();
      this.getApplicationAssignedOfficer();

    })
  }

  refreshLead() {
    const obj = {
      data: this.leadId
    }
    this.apiService.openLead(obj).subscribe((success) => {
      this.leadDetails = success;
      this.getNotesList();
      this.getLeadOfficerList();
      this.getAssignOfficerList()
      this.initialData.getDDL('getInitialDataForLead', this.options);
      this.data.successMessage('Data Refreshed Successfully');
      this.getStatusHistoryList();
      this.getEmailList()
    })
  }

  async editDescription() {
    this.descriptionEdit = true
  }

  editLead() {
    this.leadEdit = true
    this.leadEditBtn = false
    // const obj = {
    //   data: this.leadId
    // }
    // this.apiService.openLead(obj).subscribe(async (success) => {

    //   if (this.leadId) {
    //     success.leadId = this.leadId
    //   }
    //   this.data.showErrorMessage = false

    //   let dialogResponse: any = await this.dialog.openDialog(LeadFormComponent, {
    //     height: '550px',
    //     width: '100%',
    //     maxWidth: '1170px',
    //     data: {
    //       customer: success,
    //       leadId: this.leadId

    //     }
    //   });
    //   // console.log(dialogResponse);
    //   if (dialogResponse) {
    //     this.openLeadDetails()
    //   }
    // })
  }
  saveLead() {
    this.apiService.saveLead(this.leadDetails).subscribe((success) => {
      this.leadDetails = success;
      this.dialog.closeDialog();
      this.leadEdit = false
      this.leadEditBtn = true
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
  clearLeadDescription() {
    this.errorTrue = false
    this.leadDetails.description = '';

  }
  async saveLeadDescription() {
    if (this.xForm.valid) {
      this.apiService.saveLead(this.leadDetails).subscribe(async (success) => {
        this.leadDetails.description = success.description;
        this.leadDetails = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        await this.dialog.closeDialog();
        this.descriptionEdit = false
      })
    }
    else {
      this.errorTrue = true
    }
  }

  servicePageChanged(event: any) { }

  getLeadOfficerList() {

    const obj = {
      longData1: this.leadDetails.customerServiceId,
      strData1: this.leadDetails.productTypeValue,
      strData2: this.leadDetails.assignedDepartmentValue,
    }
    this.apiService.getListOfOfficerLead(obj).subscribe((success) => {
      this.assignedOfficerDDL = success.value
    })
  }
  getAssignOfficerList() {
    const obj = {
      data: this.leadId
    }
    this.apiService.getListOfAssignedOfficerByLeadId(obj).subscribe((success) => {
      this.assignOfficerTableData = success.entLeadAssignedOfficerList;
    })
  }

  reAssigned() {
    // 
    if (this.pform.valid) {
      this.leadAssignOfficer.leadId = this.leadId;
      this.leadAssignOfficer.statusValue = this.leadDetails.statusValue;

      this.apiService.reAssignLeadAssignedHistory(this.leadAssignOfficer).subscribe((success: any) => {
        this.leadDetails = success;
        this.assignOfficerTableData = success.lstentLeadAssignedOfficer;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.getDocumentList()
      })
    }
    else {
      this.errorTrue = true

    }
  }

  selfAssigned() {
    this.leadAssignOfficer.leadId = this.leadId;
    this.leadAssignOfficer.statusValue = this.leadDetails.statusValue;
    this.apiService.selfAssignLeadAssignedHistory(this.leadAssignOfficer).subscribe((success: any) => {
      this.leadDetails = success;
      this.assignOfficerTableData = success.lstentLeadAssignedOfficer;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.getDocumentList()
    })
  }

  getEmailList() {
    const obj = {
      data: this.leadId
    }
    this.apiService.getListOfCommunicationHistoryByLeadId(obj).subscribe((success) => {
      this.emailHistoryTableData = success.entLeadCommunicationHistoryList
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
        title: 'Lead',
        icon: 'assets/icons/accordian/lead.svg'
      }
    });
  }




  getNotesList() {
    const obj = {
      data: this.leadId
    }
    this.apiService.getListOfNotesByLeadId(obj).subscribe((success) => {
      this.notesList = success
    })
  }



  createNotes() {

    const obj = {
      data1: this.leadId,
      data2: this.leadDetails.statusValue,
      data3: ''
    }
    this.apiService.createLeadNotes(obj).subscribe(async (success) => {
      this.data.showErrorMessage = false

      let dialogResponse: any = await this.dialog.openDialog(NotesDialogComponent, {
        height: '550px',
        width: '100%',
        maxWidth: '1170px',
        data: {
          customer: success,
          notesPage: 'Lead',
          status: success.statusValue,
          statusId: success.statusId,
        }
      });
      if (dialogResponse) {

        console.log(dialogResponse);
        this.notesData.statusValue = dialogResponse.statusValue
        this.notesData.statusId = dialogResponse.statusId
        this.notesData.notes = dialogResponse.notes;
        this.leadDetails.ientLeadNotes = this.notesData;
        this.leadDetails.ientLeadNotes.leadId = this.leadId;
        this.apiService.saveLeadNotes(this.leadDetails).subscribe((success) => {
          this.leadDetails = success;
          this.notesList.entLeadNotesList = success.lstentLeadNotes;
          this.data.successMessage(success.msg.infoMessage.msgDescription);
          this.getStatusHistoryList()
        })
        // this.openLeadDetails();

      }
    })
  }

  //status history
  getStatusHistoryList() {
    const obj = {
      data: this.leadId
    }
    this.apiService.getListOfStatusHistoryByLeadId(obj).subscribe((success) => {
      this.statusHistoryDataSource = success.lstentLeadStatusHistory
    })
  }
  navigateToList() {
    this.router.navigateByUrl('/home/crm/lead')
  }
  async navigateToServiceDetail() {
    const obj = {
      currentIndex: 0,
      array: [this.leadDetails.customerServiceId]
    }
    let encodeId = await this.url.encode(obj);
    this.router.navigateByUrl('/home/crm/customer-service/detail/' + encodeId)
  }
  async navigateToCustomerList() {
    const obj = {
      currentIndex: 0,
      array: [this.leadDetails.customerId]
    }
    let encodeId = await this.url.encode(obj);
    this.router.navigateByUrl('/home/crm/customer/detail/' + encodeId)
  }

  //document
  getDocumentList() {
    const obj = {
      data: this.leadId
    }
    this.apiService.getListOfDocumentByLeadId(obj).subscribe((success) => {
      this.customerLeadDocumentList = success.lstentLeadDocument

    })
  }
  onUpload(file: any, document: any) {
    document.ientFile = file;
    this.apiService.saveLeadDocument(document).subscribe((success: any) => {
      this.customerLeadDocumentList = success.lstentLeadDocument;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }


  async checkDocumentDelete(docId: any) {

    console.log(docId);

    let msg = `Are you sure, You want to delete this Attachments: ${docId.docTypeDescription} ?`;
    let response = await this.dialog.checkDelete(msg);
    console.log(response);
    if (response) {

      const obj = {
        data: docId.leadDocumentId
      }
      this.apiService.deleteLeadDocument(obj).subscribe((success) => {
        this.customerLeadDocumentList = success.lstentLeadDocument;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
  }


  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }
  bankPageChanged(event: any) {

    // this.customerBank.pageNumber = event.pageNumber;
    // this.customerBank.lstentBank.length = event.pageSize;
  }

  //card-accordian
  openStatusValue(val: any) {
    console.log(val);

    // if (this.accordianOpen === false) {
    if (val === 1) {
      this.showNotesDatas = true;
      this.showStatusHistory = false;
      this.showCommunicationHistory = false;
      this.accordianOpen = true;
      this.showAppAssigned = false
    }
    else if (val === 2) {
      this.showStatusHistory = true;
      this.showNotesDatas = false;
      this.showAppAssigned = false
      this.accordianOpen = true;
      this.showCommunicationHistory = false;
    }
    else if (val === 3) {
      this.showStatusHistory = false;
      this.showNotesDatas = false;
      this.accordianOpen = true;
      this.showAppAssigned = false
      this.showCommunicationHistory = true;
    }
    else if (val === 4) {
      this.showStatusHistory = false;
      this.showNotesDatas = false;
      this.showAppAssigned = true;
      this.accordianOpen = true;
      this.showCommunicationHistory = false;
    }
    // }
    // else {
    //   this.accordianOpen = false;
    //   this.showStatusHistory = false;
    //   this.showNotesDatas = false;


    // }

  }
  openAccordian(dujuk: any) {
    console.log(dujuk);
    if (dujuk === false) {
      this.accordianOpen = true
      this.showNotesDatas = false;
      this.showStatusHistory = true;
      this.showCommunicationHistory = false;
    }
    else {
      this.accordianOpen = false;
      this.showNotesDatas = false;
      this.showStatusHistory = false;
      this.showCommunicationHistory = false;

    }
  }


  getLeadHistoryList() {
    const obj = {
      data1: this.leadDetails.customerServiceId,
      data2: this.leadId,

    }
    this.apiService.getLeadHistory(obj).subscribe((success) => {
      this.leadHistoryTableData = success.entLeadList
    })
  }
  async getChildLeadHistory(id: any) {
    let obj = {
      currentIndex: 0,
      array: [id]
    }
    let encodeId = await this.url.encode(obj);
    this.router.navigateByUrl('/home/crm/lead/detail/' + encodeId);
  }
  appAssDataSource: any = []
  getApplicationAssignedOfficer() {
    const obj = {
      data: this.leadId
    }
    this.apiService.getListOfApplicationAssignedOfficerByLeadId(obj).subscribe((success) => {
      this.appAssDataSource = success.lstentLeadApplicationAssignedOfficer
    })
  }
}
