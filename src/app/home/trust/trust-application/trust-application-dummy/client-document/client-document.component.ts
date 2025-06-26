import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { FileSizePipe } from '../../../../../app-core/template/drop-zone/file-size.pipe';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { TrustApplicationPipePipe } from '../../trust-application-pipe.pipe';
import { entTrustApplication, entTrustApplicationAssignedOfficer, entTrustApplicationDocument, entTrustApplicationNotes } from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { ViewPdfComponent } from '../../../../../app-core/template/view-pdf/view-pdf.component';

import { TabSubComponent, TabSubGroupComponent } from '../../../../../app-core/template/tab/tab1';

@Component({
  selector: 'app-client-document',
  standalone: true,
  imports: [AccordionModule, FormsModule, Row, ViewLabel, InputControlComponent, AppDatePipe, FileSizePipe, DropZoneComponent, AppTableComponent, CellDefDirective, CellHeaderDefDirective, IconButtonComponent, TrustApplicationPipePipe, TabSubGroupComponent, TabSubComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './client-document.component.html',
  styleUrl: './client-document.component.scss'
})
export class ClientDocumentComponent {
  @Input() application = new entTrustApplication();
  @Output() applicationChange = new EventEmitter<any>();
  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;
  trustApplicationAssignedOfficer = new entTrustApplicationAssignedOfficer();
  trustApplicationDocument = new entTrustApplicationDocument();
  accept: any
  fileExtension = "jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv";
  documentArray: any = [];
  loading = false;
  @Input() type = {
    trustApplicationId: 0,
    trustApplicationIdenityNo: 0,
    trustApplicationRejectHistoryId: 0,
    trustApplicationStageValue: '',
    isEditable: '',
    trustApplicationStepNo: 0
  };
  //clientDoc
  clientDocumentColumns: any = ['documentTypeDescription', 'fileName', 'fileSize', 'action']
  clientDocumentColumnsName: any = ['Document Name', 'File Name', 'Size', 'Action']
  docNameType: any

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }

  //linked Doc
  linkedColumns: any = ['description', 'action']
  linkedColumnsName: any = ['Document Name', ' Action']
  tableLinkedData: any = []
  trustApplicationNotes = new entTrustApplicationNotes();
  errorTrue = false
  constructor(
    public initialData: InitialDataService,
    public apiService: ApplicationApiService,
    public dialog: CoreService,
    public data: DataService) {

  }
  ngOnInit(): void {
    this.init()
  }
  notesMessage = ''
  async init() {
    debugger
    this.getAssignOfficerDDL()
    this.documentTypeDDLdata()
    // this.getListOfLinkedDocument()
    this.application.lstentTrustApplicationNotes.forEach((element: any) => {
      if (element.applicationStageValue === 'OBDOC' && element.identityNo === this.type.trustApplicationIdenityNo) {
        this.notesMessage = element.notes
      }
    });
  }
  documentTypeDDLdata() {
    const obj = {
      data: this.application.trustTypeValue,
      data1: this.application.applicationStageValue
    }
    this.apiService.getListofDocumentsByTrustType(obj).subscribe((success: any) => {
      this.documentArray = success.value;
    })
  }
  getListOfLinkedDocument() {
    const obj = {
      data: this.application.trustTypeValue,
      data1: this.application.applicationStageValue
    }
    this.apiService.getLinkedDocuments(obj).subscribe((success) => {
      this.tableLinkedData = success.lstDDLClass
    })
  }
  onChange(event: any) {
    switch (event.tabTitle) {
      case 'Linked Document':
        this.getListOfLinkedDocument()
        break;
    }
  }
  documentTypeDatas(event: any) {
    const obj = {
      data: event
    }
    this.apiService.createTrustApplicationDocument(obj).subscribe((success: any) => {
      this.trustApplicationDocument = success
    })
  }
  uploadClientDocumentAttachment(event: any) {
    console.log(event[0]);
    this.trustApplicationDocument.trustApplicationRefNo = this.application.trustApplRefNo;
    this.trustApplicationDocument.trustApplicationId = this.application.trustApplicationId;
    this.trustApplicationDocument.ientFile.fileName = event[0].fileName
    this.trustApplicationDocument.ientFile.fileSize = event[0].fileSize
    this.trustApplicationDocument.ientFile.content = event[0].content;
    this.trustApplicationDocument.ientFile.fileType = event[0].fileType
    this.trustApplicationDocument.ientFile.content = event[0].content;
    this.trustApplicationDocument.trustTypeValue = this.application.trustTypeValue;
    this.trustApplicationDocument.applicationStageValue = this.application.applicationStageValue;
    this.trustApplicationDocument.identityNo = this.application.identifierCount

    if (this.trustApplicationDocument.documentTypeValue !== '') {

      // this.application.lstentTrustApplicationDocument = []
      this.apiService.saveTrustApplicationDocument(this.trustApplicationDocument).subscribe((success: any) => {
        this.application.lstentTrustApplicationDocument = success.lstentTrustApplicationDocument;
        this.docNameType = ''
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.data.errorInfoMessage('Select Document Type')
    }
  }
  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeTrustApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      // this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }

  assignedOfficerDDL: any = []
  getAssignOfficerDDL() {
    const obj = {
      data1: this.application.trustApplicationId,
      data2: this.application.actionStatusValue,
      data3: this.application.applicationStageValue
    }
    this.apiService.getListOfOfficerTrustApplication(obj).subscribe((success: any) => {
      this.assignedOfficerDDL = success.value
    })
  }
  reAssignTrust() {
    this.trustApplicationAssignedOfficer.trustApplicationId = this.application.trustApplicationId;
    this.application.ientTrustApplicationAssignedOfficer = this.trustApplicationAssignedOfficer
    this.apiService.reAssignTrustApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success
    })
  }
  selfAssignTrust() {
    this.trustApplicationAssignedOfficer.trustApplicationId = this.application.trustApplicationId
    this.application.ientTrustApplicationAssignedOfficer = this.trustApplicationAssignedOfficer
    this.apiService.selfAssignTrustApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success
    })
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
  async checkDocumentDelete(docId: any) {
    let msg = `Are you sure, You want to delete : ${docId.documentTypeDescription} ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      const obj = {
        data: docId.trustApplicationDocumentId
      }
      this.apiService.deleteTrustApplicationDocument(obj).subscribe((success: any) => {
        this.application.lstentTrustApplicationDocument = [];
        // this.application.lstentTrustApplicationDocument = success.lstentTrustApplicationDocument
        success.lstentTrustApplicationDocument.forEach((element: any) => {
          if (element.ientFile.fileName !== '') {
            this.application.lstentTrustApplicationDocument.push(element)
          }
        });
        // this.documentType()
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
  }
  downloadLinkedFile(val: any) {
    const obj = {
      data: this.application.trustApplicationId,
      data1: val.constant
    }
    const options = {
      responseType: 'blob'
    }

    this.apiService.downLoadGeneratedDocuments(obj, options).subscribe((success) => {
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
  @ViewChild('notiForm') notiForm!: NgForm;
  saveTrustApplication() {
    this.trustApplicationNotes.notes = this.notesMessage
    this.application.ientTrustApplicationNotes = this.trustApplicationNotes;
    this.application.ientTrustApplicationNotes.actionStatusValue = this.application.actionStatusValue
    this.application.ientTrustApplicationNotes.applicationStageValue = this.application.applicationStageValue
    this.application.ientTrustApplicationNotes.statusValue = this.application.statusValue
    if (this.notiForm.valid) {
      this.apiService.saveTrustApplicationNoteWithOutParent(this.application).subscribe((success) => {
        this.trustApplicationNotes = success
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  @ViewChild('g') gForm!: NgForm;
  cancelApplicationStage() {
    this.application.statusValue = 'CNCLD'
    if (this.gForm.valid) {
      this.apiService.saveTrustApplicationNotes(this.application).subscribe((success) => {
        this.application = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  @ViewChild('notesCancelDialog', { static: false })
  notesCancelDialog!: TemplateRef<any>;
  @ViewChild('cancelAlert', { static: false })
  cancelAlert!: TemplateRef<any>;
  cancelNotesDescription = ''

  createNotes() {
    this.errorTrue = false
    const obj = {
      data1: this.application.statusValue,
      data2: this.application.actionStatusValue,
      data3: this.application.applicationStageValue,
    }
    this.apiService.createTrustApplicationNotes(obj).subscribe((success: any) => {
      this.trustApplicationNotes = success
      // this.actionStatusDDL = success.iActionStatusDDL.value
      // this.appStatusDDL = success.iStatusDDL.value
    })
  }
  async cancelNotesDialog() {
    this.createNotes()
    // this.application.applicationStatusValue = 'CANCD';
    let dialogResponse: any = await this.dialog.openDialog(this.notesCancelDialog, {
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',

    });
  }
  async cancelProcess() {
    let dialogResponse: any = await this.dialog.openDialog(this.cancelAlert, {
      height: '170px',
      width: '350px',
      maxWidth: '1170px',

    });
  }
  clearCancelNotes() {
    this.cancelNotesDescription = '';
    this.errorTrue = false
    this.data.successMessage('Data Cleared Successfully');
  }
}
