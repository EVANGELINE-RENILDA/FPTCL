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
import { entTrustWithdrawalApplication, entTrustWithdrawalApplicationAssignedOfficerHistory, entTrustWithdrawalApplicationDocument, entTrustWithdrawalApplicationNotes } from '../../../../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../../../common/api-services/application-api/application-api.service';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { DataService } from '../../../../../../common/services/data/data.service';
import { ViewPdfComponent } from '../../../../../../app-core/template/view-pdf/view-pdf.component';
import { TrustWithdrawalPipePipe } from "../../trust-withdrawal-pipe.pipe";

@Component({
  selector: 'app-court-order',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './court-order.component.html',
  styleUrl: './court-order.component.scss',
  imports: [AccordionModule, Row, AppDatePipe, FormsModule, DropZoneComponent, AppTableComponent, CellDefDirective, CellHeaderDefDirective, ViewLabel, IconButtonComponent, InputControlComponent, CheckboxComponent, CommonModule, TrustApplicationPipePipe, TabSubGroupComponent, TabSubComponent, ErrorMessageComponent, TrustWithdrawalPipePipe]
})
export class CourtOrderComponent {
  // application = new entTrustApplication();
  @Input() application = new entTrustWithdrawalApplication();
  @Output() applicationChange = new EventEmitter<any>();
  @Input() type = {
    trustWithdrawalApplicationId: 0,
    identificationNo: 0,
    trustWithdrawalApplicationProcessHistoryId: 0,
    trustWithdrawalApplicationStageValue: '',
    isEditable: '',
    trustWithdrawalStepNo: 0
  };
  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  trustWithdrawalDocument = new entTrustWithdrawalApplicationDocument();
  trustApplicationNotes = new entTrustWithdrawalApplicationNotes()
  errorTrue = false;
  clientDocumentTableData: any = [];
  accept: any;
  loading = false
  @Input() trustApplicationId = 0;
  documentArray: any = [];
  trustApplicationAssignedOfficer = new entTrustWithdrawalApplicationAssignedOfficerHistory();
  @ViewChild('legalApproveForm') legalApproveForm!: NgForm;
  @ViewChild('notiForm') notiForm!: NgForm;
  @ViewChild('x') xForm!: NgForm;
  fileExtension = "jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv";

  //
  courtOrderColumns = ['designation', 'assignedToFullname', 'verificationDate', 'actionStatusDescription', 'action'];
  courtOrderColumnsName = ['Designation', 'User Name', 'Verified Date', 'Action Status', 'Action'];
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



  ngOnInit(): void {
    this.init()
  }
  ngAfterViewInit(): void { }
  notesMessage: any = ''
  async init() {
    await this.data.checkToken();
    // console.log(this.application.ientTrustWithdrawalApplicationProcessHistory.identificationNo);

    // this.getAssignOfficerDDL()
    // this.documentTypeDDLdata();

    if (this.application.lstentTrustWithdrawalApplicationNotes.length !== 0) {
      this.application.lstentTrustWithdrawalApplicationNotes.forEach((element: any) => {
        if (element.statusValue === this.application.applicationStatusValue && element.identificationNo === this.type.identificationNo) {
          this.notesMessage = element.notes
        }
      });
    }

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
      this.trustWithdrawalDocument = success
    })
  }
  dialogClose() {
    this.data.showErrorMessage = false;
    this.dialog.closeDialog()
  }

  saveTrustApplicationNotes() {
    this.application.ientTrustWithdrawalApplicationNotes = this.trustApplicationNotes;
    this.application.ientTrustWithdrawalApplicationNotes.notes = this.notesMessage;
    this.application.ientTrustWithdrawalApplicationNotes.applicationStageValue = this.application.applicationStageValue
    this.application.ientTrustWithdrawalApplicationNotes.applicationStatusValue = this.application.actionStatusValue
    this.application.ientTrustWithdrawalApplicationNotes.trustWithdrawalApplicationId = this.application.trustWithdrawalApplicationId;
    if (this.notiForm.valid) {

      this.apiService.saveTrustWithdrawalApplicationNotes(this.application).subscribe((success) => {
        this.trustApplicationNotes = success
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  // clearCourtOrderNotes() {
  //   this.errorTrue = false
  //   this.application.c.courtOrderNotes = ''
  //   this.data.successMessage('Data Cleared Successfully')
  // }
  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeTrustWithdrawalApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }

  courtOrderLegalApprove() {
    // 
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
    this.trustApplicationNotes.trustWithdrawalApplicationId = this.application.trustWithdrawalApplicationId;
    this.application.ientTrustWithdrawalApplicationNotes = this.trustApplicationNotes;
    // this.trustApplicationNotes.identityNo = this.application.identifierCount;
    if (this.xForm.valid) {

      this.apiService.saveTrustWithdrawalApplicationNotes(this.application).subscribe((success: any) => {
        this.notesList = success.lstentTrustApplicationNotes;
        this.application = success
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
      data1: this.application.applicationStatusValue,
      data2: this.application.actionStatusValue,
      data3: this.application.applicationStageValue,
    }
    this.apiService.createTrustWithdrawalApplicationNotes(obj).subscribe((success: any) => {
      this.trustApplicationNotes = success
      this.actionStatusDDL = success.iActionStatusDDL.value
      this.appStatusDDL = success.iStatusDDL.value
    })
  }

  assignedOfficerDDL: any = []
  // getAssignOfficerDDL() {
  //   const obj = {
  //     data1: this.application.trustApplicationId,
  //     data2: this.application.actionStatusValue,
  //     data3: this.application.applicationStageValue
  //   }
  //   this.apiService.withassi(obj).subscribe((success: any) => {
  //     this.assignedOfficerDDL = success.value
  //   })
  // }
  reAssignTrust() {
    this.trustApplicationAssignedOfficer.trustWithdrawalApplicationId = this.application.trustWithdrawalApplicationId;
    this.application.ientTrustWithdrawalApplicationAssignedOfficerHistory = this.trustApplicationAssignedOfficer
    this.apiService.reAssignTrustWithdrawalApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success
    })
  }
  selfAssignTrust() {
    this.trustApplicationAssignedOfficer.trustWithdrawalApplicationId = this.application.trustWithdrawalApplicationId
    this.apiService.selfAssignTrustWithdrawalApplicationAssignedHistory(this.trustApplicationAssignedOfficer).subscribe((success: any) => {
      this.application = success
    })
  }
  uploadCourtDocumentAttachment(event: any) {

    this.trustWithdrawalDocument.trustWithdrawalApplicationId = this.application.trustWithdrawalApplicationId;
    this.trustWithdrawalDocument.ientFile.fileName = event[0].fileName
    this.trustWithdrawalDocument.ientFile.fileSize = event[0].fileSize
    this.trustWithdrawalDocument.ientFile.content = event[0].content;
    this.trustWithdrawalDocument.ientFile.fileType = event[0].fileType
    this.trustWithdrawalDocument.ientFile.content = event[0].content;
    this.trustWithdrawalDocument.documentTypeValue = 'CLFNF';
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
        this.clientDocumentTableData = [];
        // this.clientDocumentTableData = success.lstentTrustApplicationDocument
        success.lstentTrustApplicationDocument.forEach((element: any) => {
          if (element.ientFile.fileName !== '') {
            this.clientDocumentTableData.push(element)
          }


        });
        // this.documentType()
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
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
      data: 0,
      data1: 'OBTCO'
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

}
