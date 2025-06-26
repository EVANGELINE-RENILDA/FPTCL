import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { AppDatePipe } from "../../../../common/pipes/app-date/app-date.pipe";
import { CoreService } from '../../../../app-core/service/core.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../../app.service';

import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { MultiPageUrlComponent } from '../../../../app-core/template/multi-page-url/multi-page-url.component';
import { TabComponent, TabGroupComponent } from '../../../../app-core/template/tab/tab';
import { TabSubComponent, TabSubGroupComponent } from '../../../../app-core/template/tab/tab1';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { DropZoneComponent } from '../../../../app-core/template/drop-zone/drop-zone.component';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { FileSizePipe } from '../../../../app-core/template/drop-zone/file-size.pipe';
import { ViewPdfComponent } from '../../../../app-core/template/view-pdf/view-pdf.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { entCustomerSearch, entDeathNotice, entProbateRegistryStatus } from '../../../../common/api-services/application-api/application-api.classes';
import { EmailHistoryFormComponent } from '../../../crm/email-history-form/email-history-form.component';
import { StatusHistoryComponent } from '../../../../app-core/template/status-history/status-history.component';

@Component({
  selector: 'app-death-notice-detail',
  standalone: true,
  templateUrl: './death-notice-detail.component.html',
  styleUrl: './death-notice-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [Row, ViewLabel, IconButtonComponent, FormsModule, InputControlComponent,
     AccordionModule, AppDatePipe, MultiPageUrlComponent, InnerScroll, TabComponent, 
     TabGroupComponent,TabSubComponent, TabSubGroupComponent, DropZoneComponent, AddressEditComponent,
     TabGroupComponent,TabComponent, FileSizePipe, AppTableComponent, CellDefDirective, CellHeaderDefDirective,
      DropZoneComponent,TabSubComponent,TabSubGroupComponent,StatusHistoryComponent]
})
export class DeathNoticeDetailComponent {
  accept:any;
  @ViewChild('cancelAlert', { static: false })
  cancelAlert!: TemplateRef<any>;
  applicationEdit = false;
  deathNoticeData = new entDeathNotice();
  deathNoticeDataRAW = new entDeathNotice();
  commentEdit = false;
  currentDate: any = ''
  @ViewChild('addDialog', { static: false })
  addDialog!: TemplateRef<any>;
  @ViewChild('x') xform!: NgForm;
  @ViewChild('b') bform!: NgForm;
  fileExtension = 'jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv';
  options = {
    hideFullSpinner: true
  }
  id = {
    currentIndex: 0,
    array: []
  };
  deathNoticeId = 0
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  editData = false
  errorTrue = false
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;
  supportDocumentColumns = [ 'fileName','fileSize','action',];
  supportDocumentColumnsName = [ 'File Name', 'Size', 'Action'];
  constructor(public route: ActivatedRoute,
    public data: DataService,
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public url: UrlService,
    public router: Router,
    public appService: AppService) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }
  loading = true
  ngOnInit(): void {
    // this.init()
  }

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params;
    this.deathNoticeId = this.id.array[this.id.currentIndex];
    await this.data.checkToken();
    this.appService.setBreadCrumb(this.breadCrumb);
    this.currentDate = this.appService.getCurrentDate();
    this.initialData.getDDL('getInitialDataForDeathNotice', this.options);
    this.openDeathNoticeDetail(this.deathNoticeId);
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  openDeathNoticeDetail(val: any, type?: any) {
    const obj = {
      data: val
    }
    this.apiService.openDeathNotice(obj).subscribe((success:any) => {
      this.deathNoticeData = success;
      // this.tableAssignOffice = success.ilstentDeathNoticeAssignedOfficerHistory;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.getProbateDocument() 
    })
    if (type === 'refresh') {
      this.data.successMessage('Data Refreshed Successfully')
    }
  }

  clearDeathNotice(){
this.deathNoticeData = JSON.parse(JSON.stringify(this.deathNoticeDataRAW));
this.createDeathNotice()
this.data.successMessage('Data Cleared Successfully');

  }
  createDeathNotice(){
    this.apiService.createDeathNotice().subscribe((success:any)=>{
      this.deathNoticeData = success
    })
  }
  @ViewChild('deathDialog') deathDialog!: TemplateRef<any>;
  async editApplication() {
    this.editData = false
    // this.applicationEdit = true;
    let response: any = await this.dialog.openDialog(this.deathDialog, {
      height: '600px',
      width: '100%',
      maxWidth: '1100px',
    });
  }
  saveApplication() {
    if (this.bform.valid) {
      this.apiService.saveDeathNotice(this.deathNoticeData).subscribe((success:any) => {
        this.deathNoticeData = success;
        this.data.showErrorMessage = false;
        this.applicationEdit = false;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.dialog.closeAll()
      })
    }
    else {
      this.errorTrue = true
    }
  }
  createNotes() { }

  navigateToList() {
    this.router.navigateByUrl('/home/estate/death-notice-search')
  }
  editValues() {
    this.editData = true;
    this.data.showErrorMessage = false
  }
  assignOfficerColumns: any = ["assignedToFullname", "assignedDate", "assignedByFullname", "statusDescription"];
  assignOfficerColumnsName: any = ["Assigned Officer", "Assigned Date", "Assigned By", "Status",];
  tableAssignOffice = [];

  //customer
  customerColumns: any = ["customerRefNo", "customerName", "genderDescription", "dateOfBrith", "emailId", "contactNo", "statusdescription", "action"];
  customerColumnsName: any = ["Customer No", "Customer Name", "Gender", "Date Of Birth", "Email ID", "Contact Number", "Status", ""];
  customertableData: any = [];
  customer = new entCustomerSearch();
  // searchParams = new entWillApplicationSearch();
  // searchParamsRAW = new entWillApplicationSearch();
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
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
  openCustomer(val: any) {
    const obj = {
      data: val,
    };
    this.apiService.openCustomer(obj).subscribe((success:any) => {
this.deathNoticeData.ientCustomer = success
    })
  }
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('customerSearchDialog', { static: false })
  customerSearchDialog!: TemplateRef<any>;
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
  closeAllDialogs(){
    this.dialog.closeAll();
    this.data.showErrorMessage = false
  }

  saveNoticeSeen(val:any){
    this.deathNoticeData.statusValue = val;
    this.dialog.closeAll()
    this.apiService.saveDeathNotice(this.deathNoticeData).subscribe((success:any) => {
      this.deathNoticeData = success;
      this.data.showErrorMessage = false;
      this.applicationEdit = false;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
  })
  }

  probateData = new entProbateRegistryStatus();
  docsTableData = []
  uploadClientDocumentAttachment(event:any){
this.probateData.probateRegistryId = this.deathNoticeData.ientProbateRegistry.probateRegistryId
    this.probateData.deathNoticeId = this.deathNoticeData.deathNoticeId;
    this.probateData.ientFile.fileName = event[0].fileName
    this.probateData.ientFile.fileSize = event[0].fileSize
    this.probateData.ientFile.content = event[0].content;
    this.probateData.ientFile.fileType = event[0].fileType;
    this.probateData.ientFile.fileExtension = event[0].fileType;
    this.probateData.ientFile.content = event[0].content;
    // this.probateData.d
    // this.probateData.trustTypeValue = this.deathNoticeData.trustTypeValue;
    this.probateData.statusValue = this.deathNoticeData.statusValue;

this.loading = true
    // if (this.probateData.documentTypeValue !== '') {

      // this.deathNoticeData.lstentprobateData = []
      this.apiService.uploadProbateRegistryStatus(this.probateData).subscribe((success: any) => {
       this.docsTableData = success.ilstentProbateRegistryStatus;
       this.loading = true
        // this.docNameType = ''
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
  // }
}
  viewFile(element: any) {
    ;
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

  filePath: any;
  fileName = '';
  imageId: any;

  imageView(path: any, filename: any, val: any) {
    ;
    this.filePath = path;
    this.fileName = filename;
    this.imageId = val;
    this.dialog.openDialog(this.Templates, {
      width: '600px',
      height: 'auto',
    });
  }
  downloadImageFile() {
    this.downloadFile(this.imageId);
    this.dialog.closeAll();
    
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
    let msg = `Are you sure, You want to delete this document`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      const obj = {
        data: docId.probateRegistryStatusId,
      };
      this.apiService
        .deleteProbateRegistryStatus(obj)
        .subscribe((success: any) => {
          this.docsTableData = success.ilstentProbateRegistryStatus;
          this.loading = true

          this.data.successMessage(success.msg.infoMessage.msgDescription);
        });
    }
  }
  linkedColumns: any = ['description', 'action'];
  linkedColumnsName: any = ['Document Name', ' Action'];
  tableLinkedData=[];

  downloadLinkedFile(val: any) {
    const obj = {
      data: this.deathNoticeData.deathNoticeId,
      data1: val.constant
    }
    const options = {
      responseType: 'blob'
    }

    this.apiService.generatedLinkedDocumentsForEstate(obj, options).subscribe((success:any) => {
      let contentDisposition = success.headers.get('content-disposition');
      console.log(contentDisposition);

      let filename = contentDisposition
        .split(';')[1]
        .split('filename')[1]
        .split('=')[1]
        .trim();
      const resp = new Blob([success.body], { type: success.body.type });
      const fileURL = URL.createObjectURL(resp);
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = filename;
      downloadLink.click();
    })
  }
  getListOfLinkedDocument() {
    const obj = {
      data: this.deathNoticeData.statusValue,
    };
    this.apiService.getLinkedDocumentsBasedonStage(obj).subscribe((success) => {
      this.tableLinkedData = success.lstDDLClass;
    });
  }
  onChange(event: any) {
    console.log(event.tabTitle);
    switch (event.tabTitle) {
      case 'Linked Document': this.getListOfLinkedDocument()
        break;
}}
getProbateDocument(){
  const obj = {
    data: this.deathNoticeData.ientProbateRegistry.probateRegistryId
  }
  this.apiService.getListOfProbateRegistryDocument(obj).subscribe((success)=>{
    
    this.docsTableData = success.ilstentProbateRegistryStatus
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
      title: 'Death Notice',
      icon: 'assets/icons/estate.svg'
    }
  });
}
emailColumns: any = ["toEmailId", "sentDate", "sentStatusDescription", "action"];
emailColumnsName: any = ["To", " Date | Time", "Status", "Action"];
emailHistoryTableData: any = [];
async cancelProcess() {
  let dialogResponse: any = await this.dialog.openDialog(this.cancelAlert, {
    height: '170px',
    width: '350px',
    maxWidth: '1170px',
  });
}
}
