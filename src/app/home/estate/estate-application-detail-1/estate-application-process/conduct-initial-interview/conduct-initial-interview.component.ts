import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { entTrustApplication, entTrustApplicationAssignedOfficer, entTrustApplicationDocument } from '../../../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { ViewPdfComponent } from '../../../../../app-core/template/view-pdf/view-pdf.component';
import { EstateApplicationPipe } from '../../estate-application.pipe';
import { FileSizePipe } from '../../../../../app-core/template/drop-zone/file-size.pipe';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { TabSubComponent, TabSubGroupComponent } from '../../../../../app-core/template/tab/tab1';

@Component({
  selector: 'app-conduct-initial-interview',
  standalone: true,
  imports: [Row, InputControlComponent, FormsModule, ViewLabel, IconButtonComponent, AccordionModule, AppDatePipe, AppTableComponent, CellDefDirective, CellHeaderDefDirective, EstateApplicationPipe, FileSizePipe, DropZoneComponent, TabSubComponent, TabSubGroupComponent, IconButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './conduct-initial-interview.component.html',
  styleUrl: './conduct-initial-interview.component.scss'
})
export class ConductInitialInterviewComponent {
  // @Input() application: any = new entTrustApplication();
  application: any = {
    ientTrustApplicationAssignedOfficer: {
      assignedToFullname: 'Estate Officer ',
      assignedDate: '16-07-2024',
      tatDays: 5
    }
  }
  @Output() applicationChange = new EventEmitter<any>();
  documentArray: any = [];
  tableLinkedData: any = [];
  estateApplicationDocument = new entTrustApplicationDocument()
  estateApplicationAssignedOfficer = new entTrustApplicationAssignedOfficer()
  accept: any
  fileExtension = "jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv";
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
  clientDocumentColumns: any = ['documentTypeDescription', 'fileName', 'fileExtension', 'fileSize', 'action']
  clientDocumentColumnsName: any = ['Document Name', 'File Name', 'Format', 'Size', 'Action']
  docNameType: any

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }

  //linked Doc
  linkedColumns: any = ['description', 'action']
  linkedColumnsName: any = ['Document Name', ' Action']

  constructor(
    public initialData: InitialDataService,
    public apiService: ApplicationApiService,
    public dialog: CoreService,
    public data: DataService) {

  }
  ngOnInit(): void {
    this.init()
  }
  async init() {
    // this.getAssignOfficerDDL()
    // this.documentTypeDDLdata()
    // this.getListOfLinkedDocument()
  }
  onChange(event: any) {
    switch (event.tabTitle) {
      case 'Linked Document':
        this.getListOfLinkedDocument()
        break;
    }
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
  documentTypeDatas(event: any) {
    const obj = {
      data: event
    }
    this.apiService.createTrustApplicationDocument(obj).subscribe((success: any) => {
      this.estateApplicationDocument = success
    })
  }
  uploadClientDocumentAttachment(event: any) {
    console.log(event[0]);
    this.estateApplicationDocument.trustApplicationId = this.application.trustApplicationId;
    this.estateApplicationDocument.ientFile.fileName = event[0].fileName
    this.estateApplicationDocument.ientFile.fileSize = event[0].fileSize
    this.estateApplicationDocument.ientFile.content = event[0].content;
    this.estateApplicationDocument.ientFile.fileExtension = event[0].fileType
    this.estateApplicationDocument.ientFile.content = event[0].content;
    this.estateApplicationDocument.trustTypeValue = this.application.trustTypeValue;
    this.estateApplicationDocument.applicationStageValue = this.application.applicationStageValue;
    this.estateApplicationDocument.identityNo = this.application.identifierCount
    if (this.estateApplicationDocument.documentTypeValue !== '') {
      // this.application.lstentTrustApplicationDocument = []
      this.apiService.saveTrustApplicationDocument(this.estateApplicationDocument).subscribe((success: any) => {
        this.application.lstentTrustApplicationDocument = success.lstentTrustApplicationDocument;
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
  getListOfLinkedDocument() {
    const obj = {
      data: this.application.trustTypeValue,
      data1: this.application.applicationStageValue
    }
    this.apiService.getLinkedDocuments(obj).subscribe((success) => {
      this.tableLinkedData = success.lstDDLClass
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
    this.estateApplicationAssignedOfficer.trustApplicationId = this.application.trustApplicationId;
    this.application.ientTrustApplicationAssignedOfficer = this.estateApplicationAssignedOfficer
    this.apiService.reAssignTrustApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success
    })
  }
  selfAssignTrust() {
    this.estateApplicationAssignedOfficer.trustApplicationId = this.application.trustApplicationId
    this.apiService.selfAssignTrustApplicationAssignedHistory(this.estateApplicationAssignedOfficer).subscribe((success: any) => {
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
          console.log(this.application.lstentTrustApplicationDocument, 'check');

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
      const resp = new Blob([success.body], { type: success.body.type });
      const fileURL = URL.createObjectURL(resp);
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = success.fileName;
      downloadLink.click();
    })
  }

}
