import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { AccordionModule } from '../../../../../../app-core/template/accordion/accordion.module';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { Row, ViewLabel } from '../../../../../../app-core/core-component/core-component.component';
import { FormsModule, NgForm } from '@angular/forms';
import { DropZoneComponent } from '../../../../../../app-core/template/drop-zone/drop-zone.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { CheckboxComponent } from '../../../../../../app-core/template/checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { TrustApplicationPipePipe } from '../../../../trust-application/trust-application-pipe.pipe';
import { TabSubComponent, TabSubGroupComponent } from '../../../../../../app-core/template/tab/tab1';
import { ErrorMessageComponent } from '../../../../../../app-core/message/error-message/error-message.component';
import { entTrustSettlementApplication, entTrustSettlementApplicationDocument, entTrustSettlementApplicationNotes, entTrustSettlementAssignedOfficerHistory } from '../../../../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../../../common/api-services/application-api/application-api.service';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { DataService } from '../../../../../../common/services/data/data.service';
import { ViewPdfComponent } from '../../../../../../app-core/template/view-pdf/view-pdf.component';
import { TrustSettlementPipe } from '../../trust-settlement.pipe';
import { FileSizePipe } from "../../../../../../app-core/template/drop-zone/file-size.pipe";

@Component({
  selector: 'app-tax-clearance',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tax-clearance.component.html',
  styleUrl: './tax-clearance.component.scss',
  imports: [AccordionModule, Row, AppDatePipe, FormsModule, DropZoneComponent, AppTableComponent, CellDefDirective, CellHeaderDefDirective, ViewLabel, IconButtonComponent, InputControlComponent, CheckboxComponent, CommonModule, TrustApplicationPipePipe, TabSubGroupComponent, TabSubComponent, ErrorMessageComponent, TrustSettlementPipe, FileSizePipe]
})
export class TaxClearanceComponent {
  // application = new entTrustApplication();
  @Input() application = new entTrustSettlementApplication();
  @Output() applicationChange = new EventEmitter<any>();
  trustSettlementAssignedOfficer = new entTrustSettlementAssignedOfficerHistory()
  @Input() type = {
    trustSettlementApplicationId: 0,
    identificationNo: 0,
    trustSettlementApplicationProcessHistoryId: 0,
    trustSettlementApplicationStageValue: '',
    isEditable: '',
    trustSettlementStepNo: 0
  };
  trustSettlementNotes = new entTrustSettlementApplicationNotes();
  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  trustSettlementDocument = new entTrustSettlementApplicationDocument();

  errorTrue = false;
  clientDocumentTableData: any = [];
  accept: any;
  loading = false
  @Input() trustApplicationId = 0;
  documentArray: any = [];
  trustApplicationAssignedOfficer = new entTrustSettlementAssignedOfficerHistory();
  @ViewChild('legalApproveForm') legalApproveForm!: NgForm;
  @ViewChild('notiForm') notiForm!: NgForm;
  @ViewChild('x') xForm!: NgForm;
  fileExtension = "jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv";

  //
  courtOrderColumns = ['designation', 'assignedToFullname', 'verificationDate','actionStatusDescription', 'action'];
  courtOrderColumnsName = ['Designation', 'User Name', 'Verified Date','Action Status', 'Action'];
  courtOrderTableData: any;
  //linked Doc
  linkedColumns: any = ['description', 'action']
  linkedColumnsName: any = ['Document Name', ' Action']
  tableLinkedData: any = [];
  options = {
    hideFullSpinner: true
  }
  constructor(public initialData: InitialDataService,
    public apiService: ApplicationApiService,
    public dialog: CoreService,
    public data: DataService) { }

  singleDoc: any

  ngOnInit(): void {
    this.init()
  }
  ngAfterViewInit(): void { }
  notesMessage: any = ''
  async init() {
    this.getAssignOfficerDDL();
    this.documentTypeDDLdata();
    if (this.application.lstentTrustSettlementApplicationNotes.length !== 0) {
      this.application.lstentTrustSettlementApplicationNotes.forEach((element: any) => {
        if (element.statusValue === this.application.statusValue && element.identificationNo === this.type.identificationNo) {
          this.notesMessage = element.notes
        }
      });
    }

    console.log(this.application.applicationStageValue, this.application.ientTrustSettlementApplicationProcessHistory.identificationNo);


  }
  getListOfLinkedDocument() {
    const obj = {
      data: 'TCOPY'
    }
    this.apiService.getLinkedSettlementDocuments(obj).subscribe((success) => {
      this.tableLinkedData = success.lstDDLClass
    })
  }
  // documentArray: any
  singleDocType: any
  documentTypeDDLdata() {
    const obj = {
      data: this.application.applicationStageValue
    }
    this.apiService.getInitialDataForTrustSettlementDocument(obj).subscribe((success: any) => {
      debugger
      this.documentArray = success.data[0].value;
      this.singleDocType = this.documentArray[0].code;

    })
  }
  // documentTypeDDLdata() {
  //   const obj = {
  //     data: this.application.trustTypeValue,
  //     data1: this.application.applicationStageValue
  //   }
  //   this.apiService.getListofDocumentsByTrustType(obj).subscribe((success: any) => {
  //     this.documentArray = success.value;
  //   })
  // }
  documentTypeDatas(event: any) {
    const obj = {
      data: 'OBCRO'
    }
    this.apiService.createTrustApplicationDocument(obj).subscribe((success: any) => {
      this.trustSettlementDocument = success
    })
  }
  dialogClose() {
    this.data.showErrorMessage = false;
    this.dialog.closeDialog()
  }


  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeTrustSettlementApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }

  courtOrderLegalApprove() {
    // debugger
    // if (this.legalApproveForm.valid) {
    //   this.apiService.saveTrustApplicationNotes(this.application).subscribe((success) => {
    //     this.application = success;
    //     this.applicationChange.emit(this.application);
    //     this.data.successMessage(success.msg.infoMessage.msgDescription);
    //   })
    // }
    // else {
    //   this.errorTrue = true
    // }
  }
  notesList: any
  saveNotes() {
    this.application.ientTrustSettlementApplicationNotes = this.trustSettlementNotes;
    this.application.ientTrustSettlementApplicationNotes.notes = this.notesMessage;
    this.application.ientTrustSettlementApplicationNotes.trustSettlementApplicationId = this.application.trustSettlementApplicationId;
    if (this.xForm.valid) {

      this.apiService.saveTrustSettlementApplicationNotes(this.application).subscribe((success: any) => {
        this.application = success
        this.notesList = success.lstentTrustApplicationNotes;
        console.log(this.notesList);
        this.dialog.closeDialog();
        this.applicationChange.emit(this.application);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  clearNotes() {
    this.createNotes();
    this.data.successMessage('Data Cleared Successfully')
  }
  actionStatusDDL: any = [];
  appStatusDDL: any = []
  createNotes() {
    this.errorTrue = false
    const obj = {
      data1: this.application.statusValue,
      data2: this.application.actionStatusValue,
      data3: this.application.applicationStageValue,
    }
    this.apiService.createTrustSettlementApplicationNotes(obj).subscribe((success: any) => {
      this.trustSettlementNotes = success
      this.actionStatusDDL = success.iActionStatusDDL.value
      this.appStatusDDL = success.iStatusDDL.value
    })
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
    this.apiService.selfAssignTrustSettlementApplicationAssignedHistory(this.application).subscribe((success: any) => {
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
  uploadCourtDocumentAttachment(event: any) {
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
    this.trustSettlementDocument.statusValue = this.application.statusValue
    this.trustSettlementDocument.documentTypeValue = this.singleDocType;
    if (this.trustSettlementDocument.documentTypeValue !== '') {
      debugger
      // this.application.lstentTrustApplicationDocument = []
      this.apiService.saveTrustSettlementApplicationDocument(this.trustSettlementDocument).subscribe((success: any) => {
        this.application.lstentTrustSettlementApplicationDocument = success.lstentTrustSettlementApplicationDocument;
        this.applicationChange.emit(this.application);
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
  async createNotesDialog() {
    this.createNotes()
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      height: 'auto',
      width: '1200px',
      maxWidth: '1170px',

    });
  }
  filePath: any;
  fileName = "";
  imageId: any
  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;
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
        this.application.lstentTrustSettlementApplicationDocument = success.lstentTrustSettlementApplicationDocument;
        this.applicationChange.emit(this.application);
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


  onChange(event: any) {
    switch (event.tabTitle) {
      case 'Linked Document':
        this.getListOfLinkedDocument()
        break;
    }
  }

}
