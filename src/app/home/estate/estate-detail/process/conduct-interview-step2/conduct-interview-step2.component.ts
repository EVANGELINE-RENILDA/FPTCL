import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { TabSubComponent, TabSubGroupComponent } from '../../../../../app-core/template/tab/tab1';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { entEstateApplication, entEstateApplicationAssignedOfficerHistory, entEstateApplicationDocument, entEstateApplicationNotes } from '../../../../../common/api-services/application-api/application-api.classes';
import { FileSizePipe } from "../../../../../app-core/template/drop-zone/file-size.pipe";
import { ViewPdfComponent } from '../../../../../app-core/template/view-pdf/view-pdf.component';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';

@Component({
  selector: 'app-conduct-interview-step2',
  standalone: true,
  imports: [AccordionModule, FormsModule, InputControlComponent, ViewLabel, Row,
    IconButtonComponent, CellDefDirective, CellHeaderDefDirective, AppTableComponent, 
    InnerScroll, AppDatePipe, TabSubComponent, TabSubGroupComponent, FileSizePipe, 
    DropZoneComponent,CheckboxComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './conduct-interview-step2.component.html',
  styleUrl: './conduct-interview-step2.component.scss'
})
export class ConductInterviewStep2Component {
  @Input() application = new entEstateApplication();
  @Output() applicationChange = new EventEmitter<any>();
  estateApplicationAssignedOfficer = new entEstateApplicationAssignedOfficerHistory();
  estateApplicationNotes = new entEstateApplicationNotes();
  estateApplicationDocument = new entEstateApplicationDocument();
  @Input() type = {
    isEditable : ''
  }
  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;
  accept: any
  fileExtension = "jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv";
  @ViewChild('n') nForm!: NgForm;
  @ViewChild('g') gForm!: NgForm;
  errorTrue = false;
  docNameType: any
  supportDocumentColumns = ['documentTypeDescription', 'fileName', 'fileSize', 'action'];
  supportDocumentColumnsName = ['Document Name', 'File Name', 'Size', 'Action'];
  //linked Doc
  linkedColumns: any = ['description', 'action']
  linkedColumnsName: any = ['Document Name', ' Actions']
  tableLinkedData: any = []

constructor(public apiService: ApplicationApiService, public data: DataService, public dialog : CoreService){}
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
    // if (this.application.lstentTrustWithdrawalApplicationNotes.length !== 0) {
    //   this.application.lstentTrustWithdrawalApplicationNotes.forEach((element: any) => {
    //     if (element.statusValue === this.application.applicationStatusValue && element.identificationNo === this.type.identificationNo) {
    //       this.notesMessage = element.notes
    //     }
    //   });
    // }
  }, 3000);
}

getAssignOfficerDDL() {
  const obj = {
    data1: this.application.estateApplicationId,
    data2: this.application.actionStatusValue,
    data3: this.application.applicationStageValue
  }
  // this.apiService.getListOfOfficerForTrustWithdrawal(obj).subscribe((success: any) => {
  //   this.assignedOfficerDDL = success.value
  // })
}
createDoc() {

  this.apiService.createEstateApplicationDocument().subscribe((success: any) => {
    this.estateApplicationDocument = success
  })
}
  onChange(event: any) {
    switch (event.tabTitle) {
      case 'Linked Document':
        this.getListOfLinkedDocument()
        break;
    }
  }
  //assigned
  assignedOfficerDDL:any =[];

  reAssignEstate() {
    this.estateApplicationAssignedOfficer.estateApplicationId = this.application.estateApplicationId;
    this.application.ientEstateApplicationAssignedOfficerHistory = this.estateApplicationAssignedOfficer
    this.apiService.reAssignEstateApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success;
      this.applicationChange.emit(this.application);
    })
  }
  selfAssignEstate() {
    this.estateApplicationAssignedOfficer.estateApplicationId = this.application.estateApplicationId
    this.application.ientEstateApplicationAssignedOfficerHistory = this.estateApplicationAssignedOfficer
    this.apiService.selfAssignEstateApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success;
      this.applicationChange.emit(this.application);
    })
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
      // const obj = {
      //   data1: this.application.withdrawalSubTypeValue,
      //   data2: this.application.actionStatusValue,
      //   data3: this.application.applicationStageValue
      // }
      // this.apiService.getInitialDataForEst(obj).subscribe((success: any) => {
      //   this.documentArray = success.data[0].value;
      // })
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
          data: docId.estateApplicationDocumentId
        }
        this.apiService.deleteEstateApplicationDocument(obj).subscribe((success: any) => {
          // this.application.lstentestateApplicationDocument = success.lstentestateApplicationDocument;
          this.applicationChange.emit(this.application);
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        })
      }
    }
    
    uploadClientDocumentAttachment(event: any) {

      this.estateApplicationDocument.estateApplicationId = this.application.estateApplicationId;
      this.estateApplicationDocument.identificationNo = this.application.identifierCount;
      this.estateApplicationDocument.ientFile.fileName = event[0].fileName
      this.estateApplicationDocument.ientFile.fileSize = event[0].fileSize
      this.estateApplicationDocument.ientFile.content = event[0].content;
      this.estateApplicationDocument.ientFile.fileType = event[0].fileType
      this.estateApplicationDocument.ientFile.content = event[0].content;
      this.estateApplicationDocument.applicationStageValue = this.application.applicationStageValue;
      this.estateApplicationDocument.actionStatusValue = this.application.actionStatusValue;
      this, this.estateApplicationDocument.statusValue = this.application.statusValue
      if (this.estateApplicationDocument.documentTypeValue !== '') {
  
        // this.application.lstentEstateApplicationDocument = []
        this.apiService.saveEstateApplicationDocument(this.estateApplicationDocument).subscribe((success: any) => {
          // this.application.lstentEstateApplicationDocument = success.lstentEstateApplicationDocument;
          this.estateApplicationDocument.documentTypeValue = ''
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        })
      }
      else {
        this.data.errorInfoMessage('Select Document Type')
      }
    }

notesMessage = ''
    @ViewChild('notiForm') notiForm!: NgForm;
    saveWithdrawalNotes() {
      // this.application.ientEstateApplicationNotes = this.estateApplicationNotes;
      // this.application.ientEstateApplicationNotes.notes = this.notesMessage;
      // this.application.ientEstateApplicationNotes.actionStatusValue = this.application.actionStatusValue
      // this.application.ientEstateApplicationNotes.applicationStageValue = this.application.applicationStageValue
      // this.application.ientEstateApplicationNotes.applicationStatusValue = this.application.applicationStatusValue
      // this.application.ientEstateApplicationNotes.estateApplicationId = this.application.estateApplicationId;
      // if (this.notiForm.valid) {
      //   this.apiService.saveEstateApplicationNotes(this.application).subscribe((success) => {
      //     if (this.application.lstentEstateApplicationNotes.length !== 0) {
      //       this.application.lstentEstateApplicationNotes.forEach((element: any) => {
      //         if (element.statusValue === this.application.applicationStatusValue && element.identificationNo === this.type.identificationNo) {
      //           this.notesMessage = element.notes
      //         }
      //       });
      //     }
      //     this.applicationChange.emit(this.application);
      //     this.data.successMessage(success.msg.infoMessage.msgDescription);
      //     this.errorTrue = false
      //   })
      // }
      // else {
      //   this.errorTrue = true
      // }
    }
  
    @ViewChild('x') xForm!: NgForm;
    cancelNotesDescription = ''
    @ViewChild('notesCancelDialog', { static: false })
    notesCancelDialog!: TemplateRef<any>;
    @ViewChild('cancelAlert', { static: false })
    cancelAlert!: TemplateRef<any>;
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
        data3: this.application.statusValue
      }
      this.apiService.createTrustWithdrawalApplicationNotes(obj).subscribe((success) => {
        this.estateApplicationNotes = success
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
      this.errorTrue = false;
      this.data.successMessage('Data Cleared Successfully');
    }
    cancelApplicationStage() {
      // if (this.gForm.valid) {
  
      //   this.application.ientEstateApplicationNotes = this.estateApplicationNotes;
      //   this.application.ientEstateApplicationNotes.notes = this.cancelNotesDescription;
      //   this.application.ientEstateApplicationNotes.actionStatusValue = this.application.actionStatusValue
      //   this.application.ientEstateApplicationNotes.applicationStageValue = this.application.applicationStageValue
      //   this.application.ientEstateApplicationNotes.applicationStatusValue = 'APPRJ';
      //   this.application.ientEstateApplicationNotes.actionStatusValue = 'CANCD';
      //   this.application.ientEstateApplicationNotes.estateApplicationId = this.application.estateApplicationId;
  
      //   this.estateApplicationNotes.notes = this.cancelNotesDescription;
      //   this.apiService.saveEstateApplicationNotes(this.application).subscribe((success) => {
      //     this.application = success;
      //     this.applicationChange.emit(this.application);
      //     this.dialog.closeAll()
      //     this.data.successMessage(success.msg.infoMessage.msgDescription);
      //   })
      // }
      // else {
      //   this.errorTrue = true
      // }
    }
    dialogClose() {
      this.data.showErrorMessage = false;
      this.dialog.closeAll()
    }
    downloadLinkedFile(val: any) {
      
      const obj = {
        data: this.application.estateApplicationId,
        data1: val.constant
      }
      const options = {
        responseType: 'blob'
      }
  
      this.apiService.downLoadGeneratedDocuments(obj, options).subscribe((success) => {
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
}
