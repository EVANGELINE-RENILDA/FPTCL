import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { entTrustApplication, entTrustApplicationAssignedOfficer, entTrustApplicationDocument, entTrustApplicationNotes } from '../../../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from '../../../../../common/services/data/data.service';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { ViewPdfComponent } from '../../../../../app-core/template/view-pdf/view-pdf.component';
import { CoreService } from '../../../../../app-core/service/core.service';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { TrustApplicationPipePipe } from '../../trust-application-pipe.pipe';
import { TabSubGroupComponent, TabSubComponent } from '../../../../../app-core/template/tab/tab1';
import { ErrorInfoComponent } from '../../../../../app-core/error-info/error-info.component';
import { ErrorMessageComponent } from '../../../../../app-core/message/error-message/error-message.component';


@Component({
  selector: 'app-court-order',
  standalone: true,
  imports: [AccordionModule, Row, AppDatePipe, FormsModule, DropZoneComponent, AppTableComponent, CellDefDirective, CellHeaderDefDirective, ViewLabel, IconButtonComponent, InputControlComponent, CheckboxComponent, CommonModule, TrustApplicationPipePipe, TabSubGroupComponent, TabSubComponent, ErrorMessageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './court-order.component.html',
  styleUrl: './court-order.component.scss'
})
export class CourtOrderComponent {
  // application = new entTrustApplication();
  @Input() application: any = new entTrustApplication();
  @Output() applicationChange = new EventEmitter<any>();
  @Input() type = {
    trustApplicationId: 0,
    trustApplicationIdenityNo: 0,
    trustApplicationRejectHistoryId: 0,
    trustApplicationStageValue: '',
    trustApplicationStepNo: 0,
    isEditable: ''
  };
  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  trustApplicationNotes = new entTrustApplicationNotes()
  trustApplicationDocument = new entTrustApplicationDocument();
  errorTrue = false;
  clientDocumentTableData: any = [];
  accept: any;
  loading = false
  @Input() trustApplicationId = 0;
  documentArray: any = [];
  trustApplicationAssignedOfficer = new entTrustApplicationAssignedOfficer();
  @ViewChild('legalApproveForm') legalApproveForm!: NgForm;
  @ViewChild('notiForm') notiForm!: NgForm;
  @ViewChild('x') xForm!: NgForm;


  //
  courtOrderColumns = ['designation', 'assignedToFullname', 'verificationDate', 'action'];
  courtOrderColumnsName = ['Designation', 'User Name', 'Verified Date', 'Action'];
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
    this.getAssignOfficerDDL()
    this.documentTypeDDLdata();

    if (this.application.lstentTrustApplicationNotes.length !== 0) {
      this.application.lstentTrustApplicationNotes.forEach((element: any) => {
        if (element.applicationStageValue === 'OBCRO' && element.identityNo === this.type.trustApplicationIdenityNo) {
          this.notesMessage = element.notes
        }
      });
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
      data: 'OBCRO'
    }
    this.apiService.createTrustApplicationDocument(obj).subscribe((success: any) => {
      this.trustApplicationDocument = success
    })
  }
  dialogClose() {
    this.data.showErrorMessage = false;
    this.dialog.closeDialog()
  }

  saveTrustApplicationNotes() {
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
  clearCourtOrderNotes() {
    this.errorTrue = false
    this.application.ientTrustApplicationCourtOrder.courtOrderNotes = ''
    this.data.successMessage('Data Cleared Successfully')
  }
  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeTrustApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }

  courtOrderLegalApprove() {

    if (this.legalApproveForm.valid) {
      this.apiService.saveTrustApplicationNotes(this.application).subscribe((success) => {
        this.application = success;
        this.applicationChange.emit(this.application);
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  notesList: any
  saveNotes() {
    this.trustApplicationNotes.trustApplicationId = this.application.trustApplicationId;
    this.application.ientTrustApplicationNotes = this.trustApplicationNotes;
    this.trustApplicationNotes.identityNo = this.application.identifierCount;
    if (this.xForm.valid) {

      this.apiService.saveTrustApplicationNotes(this.application).subscribe((success: any) => {
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
      data1: this.application.statusValue,
      data2: this.application.actionStatusValue,
      data3: this.application.applicationStageValue,
    }
    this.apiService.createTrustApplicationNotes(obj).subscribe((success: any) => {
      this.trustApplicationNotes = success
      this.actionStatusDDL = success.iActionStatusDDL.value
      this.appStatusDDL = success.iStatusDDL.value
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
  async uploadCourtDocumentAttachment(event: any) {
    this.trustApplicationDocument.fileId = 0
    console.log(event[0]);
    this.trustApplicationDocument.trustApplicationRefNo = this.application.trustApplRefNo;
    this.trustApplicationDocument.trustApplicationId = this.application.trustApplicationId;
    this.trustApplicationDocument.ientFile.fileName = event[0].fileName
    this.trustApplicationDocument.ientFile.fileSize = event[0].fileSize
    this.trustApplicationDocument.ientFile.fileExtension = event[0].fileType
    this.trustApplicationDocument.ientFile.content = event[0].content
    this.trustApplicationDocument.documentTypeValue = 'CLFNF';
    this.trustApplicationDocument.identityNo = this.application.identifierCount
    this.trustApplicationDocument.trustTypeValue = this.application.trustTypeValue;
    this.trustApplicationDocument.applicationStageValue = this.application.applicationStageValue;
    // this.trustApplicationDocument.ientFile.fileExtension = this.fileExtension
    // this.trustApplicationDocument.idoObjState
    if (this.trustApplicationDocument.documentTypeValue !== '') {
      this.apiService.saveTrustApplicationDocument(this.trustApplicationDocument).subscribe((success: any) => {
        // this.clientDocumentTableData = success.lstentTrustApplicationDocument
        ;
        success.lstentTrustApplicationDocument.forEach((element: any) => {
          if (element.ientFile.fileName !== '') {
            this.clientDocumentTableData.push(element)
            this.loading = true
          }
          else {
          }
          console.log(this.clientDocumentTableData, 'check');

        });
        // this.openTrustApplicationDetails();
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        // this.trustApplicationDocument.trustApplicationDocumentId = 0
        this.applicationChange.emit(this.application);


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
          console.log(this.clientDocumentTableData, 'check');

        });
        // this.documentType()
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
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

  // createNotes() {
  //   const obj = {
  //     data1: this.application.statusValue,
  //     data2: this.application.actionStatusValue,
  //     data3: this.application.applicationStageValue,
  //   }
  //   this.apiService.createTrustApplicationNotes(obj).subscribe((success) => {
  //     this.trustApplicationNotes = success;
  //   })
  // }
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

