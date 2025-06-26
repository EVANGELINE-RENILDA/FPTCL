import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { AccordionModule } from '../../../../../../app-core/template/accordion/accordion.module';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, ViewLabel } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { entTrustWithdrawalApplication, entTrustWithdrawalApplicationAssignedOfficerHistory, entTrustWithdrawalApplicationDocument, entTrustWithdrawalApplicationNotes } from '../../../../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../../../common/api-services/application-api/application-api.service';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { DataService } from '../../../../../../common/services/data/data.service';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../../app-core/template/app-table/app-table.component';
import { TrustWithdrawalPipePipe } from "../../trust-withdrawal-pipe.pipe";
import { TabSubComponent, TabSubGroupComponent } from '../../../../../../app-core/template/tab/tab1';
import { ViewPdfComponent } from '../../../../../../app-core/template/view-pdf/view-pdf.component';
import { DropZoneComponent } from '../../../../../../app-core/template/drop-zone/drop-zone.component';
import { DocumentsComponent } from '../../../../../../app-core/template/documents/documents.component';
import { ErrorInfoComponent } from '../../../../../../app-core/error-info/error-info.component';

@Component({
  selector: 'app-inspection',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './inspection.component.html',
  styleUrl: './inspection.component.scss',
  imports: [AccordionModule, FormsModule, Row, ViewLabel, InputControlComponent, 
    AppDatePipe, IconButtonComponent, AppTableComponent, CellDefDirective, CellHeaderDefDirective,ErrorInfoComponent, 
    TrustWithdrawalPipePipe, TabSubGroupComponent, TabSubComponent, DropZoneComponent, DocumentsComponent]
})
export class InspectionComponent {
  @Input() application = new entTrustWithdrawalApplication();
  @Output() applicationChange = new EventEmitter<any>();
  accept: any;
  fileExtension = "jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv";
  @Input() type = {
    trustWithdrawalApplicationId: 0,
    identificationNo: 0,
    trustWithdrawalApplicationProcessHistoryId: 0,
    trustWithdrawalApplicationStageValue: '',
    isEditable: '',
    trustWithdrawalStepNo: 0
  };
  trustWithdrawalNotes = new entTrustWithdrawalApplicationNotes();
  courtOrderColumns = ['designation', 'assignedToFullname', 'verificationDate', 'actionStatusDescription', 'action'];
  courtOrderColumnsName = ['Designation', 'User Name', 'Verified Date', 'Action Status', 'Action'];
  courtOrderTableData: any;

  @ViewChild('DocumentsComponent', { static: false })
  document!: DocumentsComponent;

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
      this.createNotes();
      this.getAssignOfficerDDL();
    }, 3000);
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
  errorTrue = false
  @ViewChild('notiForm') notiForm!: NgForm;
  notesMessage: any = ''
  saveWithdrawalNotes() {
    this.application.ientTrustWithdrawalApplicationNotes = this.trustWithdrawalNotes;
    this.application.ientTrustWithdrawalApplicationNotes.notes = this.notesMessage;
    this.application.ientTrustWithdrawalApplicationNotes.actionStatusValue = this.application.actionStatusValue
    this.application.ientTrustWithdrawalApplicationNotes.applicationStageValue = this.application.applicationStageValue
    this.application.ientTrustWithdrawalApplicationNotes.applicationStatusValue = this.application.applicationStatusValue
    this.application.ientTrustWithdrawalApplicationNotes.trustWithdrawalApplicationId = this.application.trustWithdrawalApplicationId;
    if (this.notiForm.valid) {
      this.apiService.saveTrustWithdrawalApplicationNotes(this.application).subscribe((success) => {
        this.applicationChange.emit(this.application);
        this.errorTrue = false
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeTrustWithdrawalApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
  actionStatusDDL = [];
  stageDDL = [];
  notesddl = [];
  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  async createTrustWithdrawalNotes(element: any, type?: any,) {
    console.log(element);

    const obj = {
      data1: this.application.applicationStatusValue,
      data2: this.application.actionStatusValue,
      data3: this.application.applicationStageValue,
    }
    this.apiService.createTrustWithdrawalApplicationNotes(obj).subscribe(async (success) => {
      debugger
      this.trustWithdrawalNotes = success;
      this.trustWithdrawalNotes.actionStatusValue = element.actionStatusValue;
      this.notesddl = success.iStatusDDL.value;
      this.actionStatusDDL = success.iActionStatusDDL.value;
      this.stageDDL = success.ientDDL.value
      if (type === 'clear') {
        this.data.successMessage('Data Cleared Successfully')
      }
      else {
        let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
          height: 'auto',
          width: '1200px',
          maxWidth: '1170px',
  
        });
      }
    })
  }
  @ViewChild('notesForm') notesForm!: NgForm;
  saveTrustWithdrawalNotes() {
    if(this.notesForm.valid){
     this.trustWithdrawalNotes.identificationNo = this.application.identifierCount;
     this.application.ientTrustWithdrawalApplicationNotes = this.trustWithdrawalNotes;
     this.application.ientTrustWithdrawalApplicationNotes.trustWithdrawalApplicationId = this.application.trustWithdrawalApplicationId;
     this.apiService.saveTrustWithdrawalApplicationNotes(this.application).subscribe((success) => {
       this.application = success
       this.data.successMessage(success.msg?.infoMessage?.msgDescription);
       this.application.lstentTrustWithdrawalApplicationAssignedOfficerHistory = success.lstentTrustWithdrawalApplicationAssignedOfficerHistory;
       this.applicationChange.emit(this.application);
       this.dialog.closeDialog();
     })
    }
    else{
     this.errorTrue = true
    }
   }
  downloadLinkedFile(val: any) {
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
  //linked Doc
  linkedColumns: any = ['description', 'action']
  linkedColumnsName: any = ['Document Name', ' Action']
  tableLinkedData: any = [];
  getListOfLinkedDocument() {
    const obj = {
      data1: this.application.trustId,
      data2: 'INSRV'
    }
    this.apiService.getLinkedWithDrawalDocuments(obj).subscribe((success) => {
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
  trustWithdrawalAssignedOfficer = new entTrustWithdrawalApplicationAssignedOfficerHistory()
  //assigned
  reAssignTrust() {
    this.trustWithdrawalAssignedOfficer.trustWithdrawalApplicationId = this.application.trustWithdrawalApplicationId;
    this.application.ientTrustWithdrawalApplicationAssignedOfficerHistory = this.trustWithdrawalAssignedOfficer
    this.apiService.reAssignTrustSettlementApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success;
      this.applicationChange.emit(this.application);
    })
  }
  selfAssignTrust() {
    this.trustWithdrawalAssignedOfficer.trustWithdrawalApplicationId = this.application.trustWithdrawalApplicationId;
    this.apiService.selfAssignTrustSettlementApplicationAssignedHistory(this.application).subscribe((success: any) => {
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
  @ViewChild('g') gForm!: NgForm;
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

  getInspectionReportDetails() {
    const obj = {
      data1: this.application.trustId,
      data2: this.application.trustWithdrawalApplicationId,
      data3: this.application.inspectionDate
    }

    const options = {
      responseType: 'blob',
    };


    this.apiService.getInspectionReport(obj, options).subscribe({
      next:(success) => {
        const resp = new Blob([success.body], { type: success.body.type });
        const fileURL = URL.createObjectURL(resp);
        console.log(fileURL);
        if (success.body.type === 'application/pdf') {
          this.document.openPDFViewer(fileURL);
        } else if (success.body.type.includes('image')) {
          this.document.imageView(
            fileURL,
            'Inspection Report'
          );
        } else {
          this.document.download(fileURL);
        }
      },
      error:(error)=>{
        this.data.showErrorMessage = false
        if(this.application.inspectionDate !=='' ){
          this.data.errorInfoMessage(" No Report in the last 3 months");
        }
        else{
          this.data.errorInfoMessage("Inspection Date is Mandatory");
        }
      }
    })
  }
  trustWithdrawalDocument = new entTrustWithdrawalApplicationDocument();

  uploadCourtDocumentAttachment(event: any) {

    this.trustWithdrawalDocument.trustWithdrawalApplicationId = this.application.trustWithdrawalApplicationId;
    this.trustWithdrawalDocument.identificationNo = this.application.identifierCount;
    this.trustWithdrawalDocument.ientFile.fileName = event[0].fileName
    this.trustWithdrawalDocument.ientFile.fileSize = event[0].fileSize
    this.trustWithdrawalDocument.ientFile.content = event[0].content;
    this.trustWithdrawalDocument.ientFile.fileType = event[0].fileType
    this.trustWithdrawalDocument.ientFile.content = event[0].content;
    this.trustWithdrawalDocument.documentTypeValue = 'INSRP';
    this.trustWithdrawalDocument.applicationStageValue = this.application.applicationStageValue;
    this.trustWithdrawalDocument.actionStatusValue = this.application.actionStatusValue;
    this, this.trustWithdrawalDocument.applicationStatusValue = this.application.applicationStatusValue
    if (this.trustWithdrawalDocument.documentTypeValue !== '') {

      // this.application.lstentTrustApplicationDocument = []
      this.apiService.saveTrustWithdrawalApplicationDocument(this.trustWithdrawalDocument).subscribe((success: any) => {
        this.application.lstentTrustWithdrawalApplicationDocument = success.lstentTrustWithdrawalApplicationDocument;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
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
        // this.clientDocumentTableData = [];
        // // this.clientDocumentTableData = success.lstentTrustApplicationDocument
        // success.lstentTrustApplicationDocument.forEach((element: any) => {
        //   if (element.ientFile.fileName !== '') {
        //     this.clientDocumentTableData.push(element)
        //   }
        // this.application.lstentTrustWithdrawalApplicationDocument = []
        // });
        // this.documentType()
        this.application.lstentTrustWithdrawalApplicationDocument = success.lstentTrustWithdrawalApplicationDocument;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
  }
}
