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
import { TrustApplicationPipePipe } from '../../../../trust-application/trust-application-pipe.pipe';
import { TabSubComponent, TabSubGroupComponent } from '../../../../../../app-core/template/tab/tab1';
import { entTrustSettlementApplication, entTrustSettlementApplicationDocument, entTrustSettlementApplicationNotes, entTrustSettlementAssignedOfficerHistory } from '../../../../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../../../common/api-services/application-api/application-api.service';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { DataService } from '../../../../../../common/services/data/data.service';
import { ViewPdfComponent } from '../../../../../../app-core/template/view-pdf/view-pdf.component';
import { TrustSettlementPipe } from '../../trust-settlement.pipe';
@Component({
  selector: 'app-require-soa',
  standalone: true,
  imports: [AccordionModule, FormsModule, Row, ViewLabel, InputControlComponent, AppDatePipe, FileSizePipe, DropZoneComponent, AppTableComponent, CellDefDirective, CellHeaderDefDirective, IconButtonComponent, TrustApplicationPipePipe, TabSubGroupComponent, TabSubComponent, TrustSettlementPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './require-soa.component.html',
  styleUrl: './require-soa.component.scss'
})
export class RequireSoaComponent {
  @Input() application = new entTrustSettlementApplication();
  @Output() applicationChange = new EventEmitter<any>();
  trustSettlementAssignedOfficer = new entTrustSettlementAssignedOfficerHistory();
  trustSettlementDocument = new entTrustSettlementApplicationDocument();
  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;
  accept: any
  fileExtension = "jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv";
  @ViewChild('n') nForm!: NgForm;
  @Input() type = {
    trustSettlementApplicationId: 0,
    identificationNo: 0,
    trustSettlementApplicationProcessHistoryId: 0,
    trustSettlementApplicationStageValue: '',
    isEditable: '',
    trustSettlementStepNo: 0
  };
  trustSettlementNotes = new entTrustSettlementApplicationNotes();
  errorTrue = false;
  docNameType: any
  supportDocumentColumns = ['documentTypeDescription', 'fileName', 'fileSize', 'action'];
  supportDocumentColumnsName = ['Document Name', 'File Name', 'Size', 'Action'];
  //linked Doc
  linkedColumns: any = ['description', 'action']
  linkedColumnsName: any = ['Document Name', ' Action']
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
      this.createDoc();
      this.createNotes();
      this.getAssignOfficerDDL()
      if (this.application.lstentTrustSettlementApplicationNotes.length !== 0) {
        this.application.lstentTrustSettlementApplicationNotes.forEach((element: any) => {
          if (element.applicationStageValue === 'FCMRC' && element.identificationNo === this.type.identificationNo) {
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
      data: 'FCMRC'
    }
    this.apiService.getLinkedSettlementDocuments(obj).subscribe((success) => {
      this.tableLinkedData = success.lstDDLClass
    })
  }


  //document
  documentArray: any
  documentTypeDDLdata() {
    const obj = {
      data: this.application.applicationStageValue
    }
    this.apiService.getInitialDataForTrustSettlementDocument(obj).subscribe((success: any) => {
      debugger
      this.documentArray = success.data[0].value;
      console.log(this.documentArray);

    })
  }
  createDoc() {

    this.apiService.createTrustSettlementApplicationDocument().subscribe((success: any) => {
      this.trustSettlementDocument = success
    })
  }
  uploadClientDocumentAttachment(event: any) {
    console.log(event[0]);
    this.trustSettlementDocument.trustSettlementApplicationId = this.application.trustSettlementApplicationId;
    this.trustSettlementDocument.identificationNo = this.application.identifierCount;
    this.trustSettlementDocument.ientFile.fileName = event[0].fileName
    this.trustSettlementDocument.ientFile.fileSize = event[0].fileSize
    this.trustSettlementDocument.ientFile.content = event[0].content;
    this.trustSettlementDocument.ientFile.fileType = event[0].fileType
    this.trustSettlementDocument.ientFile.content = event[0].content;
    this.trustSettlementDocument.applicationStageValue = this.application.applicationStageValue;
    this.trustSettlementDocument.actionStatusValue = this.application.actionStatusValue;
    this, this.trustSettlementDocument.statusValue = this.application.statusValue
    if (this.trustSettlementDocument.documentTypeValue !== '') {
      debugger
      // this.application.lstentTrustApplicationDocument = []
      this.apiService.saveTrustSettlementApplicationDocument(this.trustSettlementDocument).subscribe((success: any) => {
        this.application.lstentTrustSettlementApplicationDocument = success.lstentTrustSettlementApplicationDocument;
        this.applicationChange.emit(this.application);
        this.trustSettlementDocument.documentTypeValue = ''
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.data.errorInfoMessage('Select Document Type')
    }
  }

  //assigned
  reAssignTrust() {
    this.trustSettlementAssignedOfficer.trustSettlementApplicationId = this.application.trustSettlementApplicationId;
    this.application.ientTrustSettlementAssignedOfficerHistory = this.trustSettlementAssignedOfficer
    this.apiService.reAssignTrustSettlementApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success;
      this.applicationChange.emit(this.application);
    })
  }
  selfAssignTrust() {
    this.trustSettlementAssignedOfficer.trustSettlementApplicationId = this.application.trustSettlementApplicationId;
    this.apiService.selfAssignTrustSettlementApplicationAssignedHistory(this.trustSettlementAssignedOfficer).subscribe((success: any) => {
      this.application = success;
      this.applicationChange.emit(this.application);
    })
  }
  assignedOfficerDDL: any = []
  getAssignOfficerDDL() {
    const obj = {
      data1: this.application.trustSettlementApplicationId,
      data2: this.application.actionStatusValue,
      data3: this.application.applicationStageValue
    }
    this.apiService.getListOfOfficerForTrustSettlement(obj).subscribe((success: any) => {
      this.assignedOfficerDDL = success.value
    })
  }
  viewFile(element: any) {
    debugger
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
    debugger
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
        data: docId.trustSettlementApplicationDocumentId
      }
      this.apiService.deleteTrustSettlementApplicationDocument(obj).subscribe((success: any) => {
        // this.application.lstentTrustApplicationDocument = [];
        // this.application.lstentTrustApplicationDocument = success.lstentTrustApplicationDocument
        this.application.lstentTrustSettlementApplicationDocument = success.lstentTrustSettlementApplicationDocument;
        this.applicationChange.emit(this.application);
        // this.documentType()
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
  }

  downloadLinkedFile(val: any) {
    const obj = {
      data: this.application.trustSettlementApplicationId,
      data1: val.constant
    }
    const options = {
      responseType: 'blob'
    }
    debugger
    this.apiService.downLoadSettlementGeneratedDocuments(obj, options).subscribe((success) => {
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

  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeTrustSettlementApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
  createNotes() {
    const obj = {
      data1: this.application.actionStatusValue,
      data2: this.application.applicationStageValue,
      data3: this.application.statusValue
    }
    this.apiService.createTrustSettlementApplicationNotes(obj).subscribe((success) => {
      this.trustSettlementNotes = success;
    })
  }
  @ViewChild('notiForm') notiForm!: NgForm;
  saveSettlementNotes() {
    this.application.ientTrustSettlementApplicationNotes = this.trustSettlementNotes;
    this.application.ientTrustSettlementApplicationNotes.notes = this.notesMessage;
    this.application.ientTrustSettlementApplicationNotes.actionStatusValue = this.application.actionStatusValue
    this.application.ientTrustSettlementApplicationNotes.applicationStageValue = this.application.applicationStageValue
    this.application.ientTrustSettlementApplicationNotes.statusValue = this.application.statusValue
    this.application.ientTrustSettlementApplicationNotes.trustSettlementApplicationId = this.application.trustSettlementApplicationId;
    if (this.notiForm.valid) {
      this.apiService.saveTrustSettlementApplicationNotes(this.application).subscribe((success) => {
        if (this.application.lstentTrustSettlementApplicationNotes.length !== 0) {
          this.application.lstentTrustSettlementApplicationNotes.forEach((element: any) => {
            if (element.statusValue === this.application.statusValue && element.identificationNo === this.type.identificationNo) {
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

  async cancelNotesDialog() {
    this.createNotes()
    // this.application.statusValue = 'CANCL';
    let dialogResponse: any = await this.dialog.openDialog(this.notesCancelDialog, {
      height: 'auto',
      width: '800px',
      maxWidth: '1170px',

    });
  }
  @ViewChild('g') gForm!: NgForm;
  cancelApplicationStage() {
    if (this.gForm.valid) {
      this.application.ientTrustSettlementApplicationNotes = this.trustSettlementNotes;
      this.application.ientTrustSettlementApplicationNotes.notes = this.cancelNotesDescription;
      this.application.ientTrustSettlementApplicationNotes.actionStatusValue = this.application.actionStatusValue
      this.application.ientTrustSettlementApplicationNotes.applicationStageValue = this.application.applicationStageValue
      this.application.ientTrustSettlementApplicationNotes.statusValue = 'APPRJ'
      this.application.ientTrustSettlementApplicationNotes.actionStatusValue = 'CANCL'
      this.application.ientTrustSettlementApplicationNotes.trustSettlementApplicationId = this.application.trustSettlementApplicationId;

      this.trustSettlementNotes.notes = this.cancelNotesDescription;
      this.apiService.saveTrustSettlementApplicationNotes(this.application).subscribe((success) => {
        this.application = success;
        this.cancelNotesDescription = success.ientTrustSettlementApplicationNotes.notes;
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
