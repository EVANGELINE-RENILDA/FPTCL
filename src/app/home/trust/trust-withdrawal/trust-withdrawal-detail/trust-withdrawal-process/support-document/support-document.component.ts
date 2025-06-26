import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { AccordionModule } from '../../../../../../app-core/template/accordion/accordion.module';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, ViewLabel } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { FileSizePipe } from '../../../../../../app-core/template/drop-zone/file-size.pipe';
import { DropZoneComponent } from '../../../../../../app-core/template/drop-zone/drop-zone.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { TabSubComponent, TabSubGroupComponent } from '../../../../../../app-core/template/tab/tab1';
import { entTrustWithdrawalApplication, entTrustWithdrawalApplicationAssignedOfficerHistory, entTrustWithdrawalApplicationDocument, entTrustWithdrawalApplicationNotes } from '../../../../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../../../common/api-services/application-api/application-api.service';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { DataService } from '../../../../../../common/services/data/data.service';
import { ViewPdfComponent } from '../../../../../../app-core/template/view-pdf/view-pdf.component';
import { TrustWithdrawalPipePipe } from '../../trust-withdrawal-pipe.pipe';

@Component({
  selector: 'app-support-document',
  standalone: true,
  imports: [AccordionModule, FormsModule, Row, ViewLabel, InputControlComponent, AppDatePipe, FileSizePipe, DropZoneComponent, AppTableComponent, CellDefDirective, CellHeaderDefDirective, IconButtonComponent, TabSubGroupComponent, TabSubComponent, TrustWithdrawalPipePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './support-document.component.html',
  styleUrl: './support-document.component.scss'
})
export class SupportDocumentComponent {
  @Input() application = new entTrustWithdrawalApplication();
  @Output() applicationChange = new EventEmitter<any>();
  trustWithdrawalAssignedOfficer = new entTrustWithdrawalApplicationAssignedOfficerHistory();
  trustWithdrawalDocument = new entTrustWithdrawalApplicationDocument();
  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;
  accept: any
  fileExtension = "jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv";
  @ViewChild('n') nForm!: NgForm;
  @ViewChild('g') gForm!: NgForm;
  @Input() type = {
    trustWithdrawalApplicationId: 0,
    identificationNo: 0,
    trustWithdrawalApplicationProcessHistoryId: 0,
    trustWithdrawalApplicationStageValue: '',
    isEditable: '',
    trustWithdrawalStepNo: 0
  };
  trustWithdrawalNotes = new entTrustWithdrawalApplicationNotes();
  errorTrue = false;
  docNameType: any
  supportDocumentColumns = ['documentTypeDescription', 'fileName', 'fileSize', 'action'];
  supportDocumentColumnsName = ['Document Name', 'File Name', 'Size', 'Action'];
  //linked Doc
  linkedColumns: any = ['description', 'action']
  linkedColumnsName: any = ['Document Name', ' Actions']
  tableLinkedData: any = []

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  constructor(
    public initialData: InitialDataService,
    public apiService: ApplicationApiService,
    public dialog: CoreService,
    public data: DataService) { }
  ngOnInit(): void {
    this.init()
  }
  async init() {
    await this.data.checkToken()
    setTimeout(() => {
      this.documentTypeDDLdata();
      this.getAssignOfficerDDL()
      this.createDoc();
      this.createNotes();
      if (this.application.lstentTrustWithdrawalApplicationNotes.length !== 0) {
        this.application.lstentTrustWithdrawalApplicationNotes.forEach((element: any) => {
          if (element.statusValue === this.application.applicationStatusValue && element.identificationNo === this.type.identificationNo) {
            this.notesMessage = element.notes
          }
        });
      }
    }, 3000);
  }
  notesMessage = ''

  onChange(event: any) {
    switch (event.tabTitle) {
      case 'Linked Document':
        this.getListOfLinkedDocument()
        break;
    }
  }

  getListOfLinkedDocument() {
    const obj = {
      data: 0,
      data1: 'RECSD'
    }
    this.apiService.getLinkedWithDrawalDocuments(obj).subscribe((success) => {
      this.tableLinkedData = success.lstDDLClass
    })
  }


  //document
  documentArray: any
  documentTypeDDLdata() {
    const obj = {
      data1: this.application.withdrawalSubTypeValue,
      data2: this.application.actionStatusValue,
      data3: this.application.applicationStageValue
    }
    this.apiService.getInitialDataForTrustWithDrawalDocument(obj).subscribe((success: any) => {
      this.documentArray = success.data[0].value;
    })
  }
  createDoc() {

    this.apiService.createTrustWithdrawalApplicationDocument().subscribe((success: any) => {
      this.trustWithdrawalDocument = success
    })
  }
  uploadClientDocumentAttachment(event: any) {

    this.trustWithdrawalDocument.trustWithdrawalApplicationId = this.application.trustWithdrawalApplicationId;
    this.trustWithdrawalDocument.identificationNo = this.application.identifierCount;
    this.trustWithdrawalDocument.ientFile.fileName = event[0].fileName
    this.trustWithdrawalDocument.ientFile.fileSize = event[0].fileSize
    this.trustWithdrawalDocument.ientFile.content = event[0].content;
    this.trustWithdrawalDocument.ientFile.fileType = event[0].fileType
    this.trustWithdrawalDocument.ientFile.content = event[0].content;
    this.trustWithdrawalDocument.applicationStageValue = this.application.applicationStageValue;
    this.trustWithdrawalDocument.actionStatusValue = this.application.actionStatusValue;
    this, this.trustWithdrawalDocument.applicationStatusValue = this.application.applicationStatusValue
    if (this.trustWithdrawalDocument.documentTypeValue !== '') {

      // this.application.lstentTrustWithdrawalDocument = []
      this.apiService.saveTrustWithdrawalApplicationDocument(this.trustWithdrawalDocument).subscribe((success: any) => {
        this.application.lstentTrustWithdrawalApplicationDocument = success.lstentTrustWithdrawalApplicationDocument;
        this.trustWithdrawalDocument.documentTypeValue = ''
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.data.errorInfoMessage('Select Document Type')
    }
  }

  //assigned
  reAssignTrust() {
    this.trustWithdrawalAssignedOfficer.trustWithdrawalApplicationId = this.application.trustWithdrawalApplicationId;
    this.application.ientTrustWithdrawalApplicationAssignedOfficerHistory = this.trustWithdrawalAssignedOfficer
    this.apiService.reAssignTrustWithdrawalApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success;
      this.applicationChange.emit(this.application);
    })
  }
  selfAssignTrust() {
    this.trustWithdrawalAssignedOfficer.trustWithdrawalApplicationId = this.application.trustWithdrawalApplicationId;
    this.apiService.selfAssignTrustWithdrawalApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success;
      this.applicationChange.emit(this.application);
    })
  }
  assignedOfficerDDL: any = []
  getAssignOfficerDDL() {
    const obj = {
      data1: this.application.trustWithdrawalApplicationId,
      data2: this.application.actionStatusValue,
      data3: this.application.applicationStageValue
    }
    this.apiService.getListOfOfficerForTrustWithdrawal(obj).subscribe((success: any) => {
      this.assignedOfficerDDL = success.value
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
        data: docId.trustWithdrawalApplicationDocumentId
      }
      this.apiService.deleteTrustWithdrawalApplicationDocument(obj).subscribe((success: any) => {
        // this.application.lstentTrustApplicationDocument = [];
        // this.application.lstentTrustApplicationDocument = success.lstentTrustApplicationDocument
        this.application.lstentTrustWithdrawalApplicationDocument = success.lstentTrustWithdrawalApplicationDocument;
        // this.documentType()
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
  }

  downloadLinkedFile(val: any) {
    debugger
    const obj = {
      data: this.application.trustWithdrawalApplicationId,
      data1: val.constant
    }
    const options = {
      responseType: 'blob'
    }

    this.apiService.downLoadWithDrawalGeneratedDocuments(obj, options).subscribe((success) => {
      let contentDisposition = success.headers.get('content-disposition');

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

  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeTrustWithdrawalApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
  createNotes() {
    const obj = {
      data1: this.application.actionStatusValue,
      data2: this.application.applicationStageValue,
      data3: this.application.applicationStatusValue
    }
    this.apiService.createTrustWithdrawalApplicationNotes(obj).subscribe((success) => {
      this.trustWithdrawalNotes = success
    })
  }
  @ViewChild('notiForm') notiForm!: NgForm;
  saveWithdrawalNotes() {
    this.application.ientTrustWithdrawalApplicationNotes = this.trustWithdrawalNotes;
    this.application.ientTrustWithdrawalApplicationNotes.notes = this.notesMessage;
    this.application.ientTrustWithdrawalApplicationNotes.actionStatusValue = this.application.actionStatusValue
    this.application.ientTrustWithdrawalApplicationNotes.applicationStageValue = this.application.applicationStageValue
    this.application.ientTrustWithdrawalApplicationNotes.applicationStatusValue = this.application.applicationStatusValue
    this.application.ientTrustWithdrawalApplicationNotes.trustWithdrawalApplicationId = this.application.trustWithdrawalApplicationId;
    if (this.notiForm.valid) {
      this.apiService.saveTrustWithdrawalApplicationNotes(this.application).subscribe((success) => {
        if (this.application.lstentTrustWithdrawalApplicationNotes.length !== 0) {
          this.application.lstentTrustWithdrawalApplicationNotes.forEach((element: any) => {
            if (element.statusValue === this.application.applicationStatusValue && element.identificationNo === this.type.identificationNo) {
              this.notesMessage = element.notes
            }
          });
        }
        this.applicationChange.emit(this.application);
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.errorTrue = false
      })
    }
    else {
      this.errorTrue = true
    }
  }

  @ViewChild('x') xForm!: NgForm;
  cancelNotesDescription = ''
  @ViewChild('notesCancelDialog', { static: false })
  notesCancelDialog!: TemplateRef<any>;
  @ViewChild('cancelAlert', { static: false })
  cancelAlert!: TemplateRef<any>;
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
    this.errorTrue = false;
    this.data.successMessage('Data Cleared Successfully');
  }
  cancelApplicationStage() {
    if (this.gForm.valid) {

      this.application.ientTrustWithdrawalApplicationNotes = this.trustWithdrawalNotes;
      this.application.ientTrustWithdrawalApplicationNotes.notes = this.cancelNotesDescription;
      this.application.ientTrustWithdrawalApplicationNotes.actionStatusValue = this.application.actionStatusValue
      this.application.ientTrustWithdrawalApplicationNotes.applicationStageValue = this.application.applicationStageValue
      this.application.ientTrustWithdrawalApplicationNotes.applicationStatusValue = 'APPRJ';
      this.application.ientTrustWithdrawalApplicationNotes.actionStatusValue = 'CANCD';
      this.application.ientTrustWithdrawalApplicationNotes.trustWithdrawalApplicationId = this.application.trustWithdrawalApplicationId;

      this.trustWithdrawalNotes.notes = this.cancelNotesDescription;
      this.apiService.saveTrustWithdrawalApplicationNotes(this.application).subscribe((success) => {
        this.application = success;
        this.applicationChange.emit(this.application);
        this.dialog.closeAll()
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  dialogClose() {
    this.data.showErrorMessage = false;
    this.dialog.closeAll()
  }


}
