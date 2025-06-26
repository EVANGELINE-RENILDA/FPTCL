import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ViewLabel, Row } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { entLegalApplication, entLegalApplicationAssignedOfficerHistory, entLegalApplicationDocument, entLegalApplicationNotes } from '../../../../../common/api-services/application-api/application-api.classes';
import { DataService } from '../../../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { ActivatedRoute } from '@angular/router';
import { FileSizePipe } from "../../../../../app-core/template/drop-zone/file-size.pipe";
import { CoreService } from '../../../../../app-core/service/core.service';
import { ViewPdfComponent } from '../../../../../app-core/template/view-pdf/view-pdf.component';
import { AppDatePipe } from "../../../../../common/pipes/app-date/app-date.pipe";
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { LegalServicePipe } from "../legal-service.pipe";
import { TabSubComponent, TabSubGroupComponent } from '../../../../../app-core/template/tab/tab1';


@Component({
  selector: 'app-scan-doc',
  standalone: true,
  imports: [AccordionModule, ViewLabel, InputControlComponent, FormsModule, IconButtonComponent, Row, FileSizePipe, AppDatePipe, DropZoneComponent, AppTableComponent, LegalServicePipe, TabSubGroupComponent, TabSubComponent, CellDefDirective, CellHeaderDefDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './scan-doc.component.html',
  styleUrl: './scan-doc.component.scss'
})
export class ScanDocComponent {
  @Input() application = new entLegalApplication();
  legalAssignedOfficer = new entLegalApplicationAssignedOfficerHistory();
  legalDocument = new entLegalApplicationDocument()
  assignedOfficerDDL = [];
  @Output() applicationChange = new EventEmitter<any>();
  @ViewChild('notiForm') notiForm!: NgForm;
  @ViewChild('p') pForm!: NgForm;
  @Input() type = {
    isEditable: "",
    legalApplicationIdenityNo: 0,
    legalApplicationRejectHistoryId: 0,
    legalApplicationStageValue: "",
    legalApplicationId: 0
  };
  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;
  clientDocumentColumns: any = ['documentTypeDescription', 'fileName', 'fileSize', 'action'];
  clientDocumentColumnsName: any = ['Document Name', 'File Name', 'Size', 'Action'];
  linkedColumns: any = ['description', 'action'];
  linkedColumnsName: any = ['Document Name', ' Action'];
  errorTrue = false;
  accept: any
  fileExtension = "jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv";
  constructor(public data: DataService, public apiService: ApplicationApiService, public router: ActivatedRoute, public dialog: CoreService) {

  }
  ngOnInit(): void {
    this.init()
  }
  notesMessage = ''
  async init() {
    this.loading = true
    this.getAssignedOfficerList();
    this.documentTypeDDLdata();
    this.application.lstentLegalApplicationNotes.forEach((element: any) => {
      if (element.applicationStageValue === 'SNDOC' && element.identificationNo === this.type.legalApplicationIdenityNo) {
        this.notesMessage = element.notes
      }
    });
  }
  documentArray: any
  docNameType = ''
  documentTypeDDLdata() {
    const obj = {
      data: this.application.serviceTypeValue,
      data1: this.application.applicationStageValue
    }
    this.apiService.getListofDocumentsByServiceType(obj).subscribe((success: any) => {
      this.documentArray = success.value;
    })
  }
  onChange(event: any) {
    switch (event.tabTitle) {
      case 'Linked Document':
        this.getListOfLinkedDocument()
        break;
    }
  }

  //assigned officer
  getAssignedOfficerList() {
    const obj = {
      data: this.application.legalApplicationId,
      data1: this.application.applicationStageValue
    }
    this.apiService.getListOfAssignedOfficerHistoryByLegalApplicationId(obj).subscribe((success) => {
      this.assignedOfficerDDL = success.lstentLegalApplicationAssignedOfficerHistory
    })
  }
  reAssignTrust() {
    this.legalAssignedOfficer.legalApplicationId = this.application.legalApplicationId;
    this.application.ientLegalApplicationAssignedOfficerHistory = this.legalAssignedOfficer
    if (this.pForm.valid) {

      this.apiService.reAssignLegalApplicationAssignedHistory(this.application).subscribe((success: any) => {
        this.application = success;
        this.applicationChange.emit(this.application);
      })
    }
    else {
      this.errorTrue = false
    }
  }
  selfAssignTrust() {
    this.legalAssignedOfficer.legalApplicationId = this.application.legalApplicationId
    this.application.ientLegalApplicationAssignedOfficerHistory = this.legalAssignedOfficer
    this.apiService.selfAssignLegalApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success;
      this.applicationChange.emit(this.application);
    })
  }

  //document
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
        data: docId.legalApplicationDocumentId
      }
      this.apiService.deleteLegalApplicationDocument(obj).subscribe((success: any) => {
        this.application.lstentLegalApplicationDocument = success.lstentLegalApplicationDocument;
        this.loading = true;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
  }
  loading = false
  uploadClientDocumentAttachment(event: any) {
    console.log(event[0]);
    this.loading = true
    this.legalDocument.legalApplicationId = this.application.legalApplicationId;
    this.legalDocument.ientFile.fileName = event[0].fileName
    this.legalDocument.ientFile.fileSize = event[0].fileSize
    this.legalDocument.ientFile.content = event[0].content;
    this.legalDocument.ientFile.fileType = event[0].fileType;
    this.legalDocument.ientFile.fileExtension  = event[0].fileType;
    this.legalDocument.ientFile.content = event[0].content;
    // this.legalDocument.type = this.application.trustTypeValue;
    this.legalDocument.applicationStageValue = this.application.applicationStageValue;
    this.legalDocument.applicationStatusValue = this.application.statusValue;
    this.legalDocument.actionStatusValue = this.application.actionStatusValue;
    this.legalDocument.identificationNo = this.type.legalApplicationIdenityNo;

    if (this.legalDocument.documentTypeValue !== '') {

      // this.application.lstentTrustApplicationDocument = []
      this.apiService.saveLegalApplicationDocument(this.legalDocument).subscribe((success: any) => {
        
        this.application.lstentLegalApplicationDocument = success.lstentLegalApplicationDocument;
        this.loading = true;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.data.errorInfoMessage('Select Document Type')
    }
  }



  //linked doc
  tableLinkedData: any = []
  getListOfLinkedDocument() {
    const obj = {
      data: this.application.serviceTypeValue,
      data1: this.application.applicationStageValue
    }
    this.apiService.getLinkedDocumentsofLegal(obj).subscribe((success) => {
      this.tableLinkedData = success.lstDDLClass
    })
  }
  downloadLinkedFile(val: any) {
    const obj = {
      data: this.application.legalApplicationId,
      data1: val.constant
    }
    const options = {
      responseType: 'blob'
    }

    this.apiService.downLoadGeneratedDocumentsofLegal(obj, options).subscribe((success) => {
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
  documentTypeDatas(event: any) {
    const obj = {
      data: event
    }
    this.apiService.createLegalApplicationDocument(obj).subscribe((success: any) => {
      this.legalDocument = success
    })
  }
  legalApplicationNotes = new entLegalApplicationNotes()
  saveLegalNotes() {
    this.legalApplicationNotes.notes = this.notesMessage
    this.application.ientLegalApplicationNotes = this.legalApplicationNotes;
    this.application.ientLegalApplicationNotes.actionStatusValue = this.application.actionStatusValue
    this.application.ientLegalApplicationNotes.applicationStageValue = this.application.applicationStageValue
    this.application.ientLegalApplicationNotes.applicationStatusValue = this.application.statusValue;
    this.application.ientLegalApplicationNotes.identificationNo = this.type.legalApplicationIdenityNo;
    this.application.ientLegalApplicationNotes.legalApplicationId = this.application.legalApplicationId
    this.application.ientLegalApplicationNotes.legalApplicationId  = this.application.legalApplicationId
    if (this.notiForm.valid) {
      this.apiService.saveLegalApplicationNoteWithOutParent(this.application).subscribe((success) => {
        this.application = success
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.applicationChange.emit(this.application)
      })
    }
    else {
      this.errorTrue = true
    }
  }
  completeApplicationStage() {
    this.application.isCompleted = 'Y';
    this.apiService.completeLegalApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }

}
