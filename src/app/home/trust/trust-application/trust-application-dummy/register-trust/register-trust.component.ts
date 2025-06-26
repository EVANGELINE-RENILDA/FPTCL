import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { entTrustApplication, entTrustApplicationAssignedOfficer, entTrustApplicationDocument, entTrustApplicationNotes, entTrustDocument, entTrustRegister } from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { ViewPdfComponent } from '../../../../../app-core/template/view-pdf/view-pdf.component';
import { CoreService } from '../../../../../app-core/service/core.service';

@Component({
  selector: 'app-register-trust',
  standalone: true,
  imports: [Row, InputControlComponent, FormsModule, ViewLabel, IconButtonComponent, AccordionModule, AppDatePipe, DropZoneComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './register-trust.component.html',
  styleUrl: './register-trust.component.scss'
})
export class RegisterTrustComponent {
  errorTrue = false;
  errorTrue1 = false;
  @Input() application: any = new entTrustApplication();
  @Output() applicationChange = new EventEmitter<any>();
  trustRegister = new entTrustRegister();
  trustApplicationAssignedOfficer = new entTrustApplicationAssignedOfficer();
  trustApplicationNotes = new entTrustApplicationNotes();
  trustApplicationDocument = new entTrustApplicationDocument();
  clientDocumentTableData: any = [];
  loading = false;
  refreshNotesData = this.application.ientTrustApplicationNotes.notes;
  @Input() type = {
    trustApplicationId: 0,
    trustApplicationIdenityNo: 0,
    trustApplicationRejectHistoryId: 0,
    trustApplicationStageValue: '',
    trustApplicationStepNo: 0,
    isEditable: ''
  };
  //courtOrder
  courtOrderColumns: any = ['desig', 'user', 'vericheck', 'action']
  courtOrderColumnsName: any = ['Designation', 'User Name', 'Verified Check', 'Action']
  courtOrderTableData: any = [];
  // errorTrue = false;
  accept: any;
  fileExtension = "jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv";

  constructor(public initialData: InitialDataService,
    public apiService: ApplicationApiService,
    public dialog: CoreService,
    public data: DataService) { }


  ngOnInit(): void {
    this.init()
  }
  notesMessage = ''
  ngAfterViewInit(): void { }
  async init() {
    await this.data.checkToken();
    this.getAssignOfficerDDL()
    this.application.lstentTrustApplicationNotes.forEach((element: any) => {
      if (element.applicationStageValue === 'RGTRS' && element.identityNo === this.type.trustApplicationIdenityNo) {
        this.notesMessage = element.notes
      }
    });
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
  @ViewChild('legalApproveForm') legalApproveForm!: NgForm;
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

  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeTrustApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }

  // async uploadCourtDocumentAttachment(event: any) {
  //   this.trustApplicationDocument.fileId = 0
  //   console.log(event[0]);
  //   this.trustApplicationDocument.trustApplicationId = this.application.trustApplicationId;
  //   this.trustApplicationDocument.ientFile.fileName = event[0].fileName
  //   this.trustApplicationDocument.ientFile.fileSize = event[0].fileSize
  //   this.trustApplicationDocument.ientFile.fileExtension = event[0].fileType
  //   this.trustApplicationDocument.ientFile.content = event[0].content
  //   this.trustApplicationDocument.documentTypeValue = 'RGTRS';
  //   this.trustApplicationDocument.identityNo = this.application.identifierCount
  //   this.trustApplicationDocument.trustTypeValue = this.application.trustTypeValue;
  //   this.trustApplicationDocument.applicationStageValue = this.application.applicationStageValue;
  //   // this.trustApplicationDocument.ientFile.fileExtension = this.fileExtension
  //   // this.trustApplicationDocument.idoObjState
  //   if (this.trustApplicationDocument.documentTypeValue !== '') {
  //     this.apiService.saveTrustApplicationDocument(this.trustApplicationDocument).subscribe((success: any) => {
  //       // this.clientDocumentTableData = success.lstentTrustApplicationDocument
  //       ;
  //       success.lstentTrustApplicationDocument.forEach((element: any) => {
  //         if (element.ientFile.fileName !== '') {
  //           this.clientDocumentTableData.push(element)
  //           this.loading = true
  //         }
  //         else {
  //         }
  //         console.log(this.clientDocumentTableData, 'check');

  //       });
  //       // this.openTrustApplicationDetails();
  //       this.data.successMessage(success.msg.infoMessage.msgDescription);
  //       // this.trustApplicationDocument.trustApplicationDocumentId = 0
  //       this.applicationChange.emit(this.application);


  //     })
  //   }
  //   else {
  //     this.data.errorInfoMessage('Select Document Type')
  //   }
  // }
  // viewFile(element: any) {
  //   let base64Data = element.ientFile.content.split(';base64,').pop();
  //   const byteCharacters = atob(base64Data);
  //   const byteNumbers = new Array(byteCharacters.length);
  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }
  //   const byteArray = new Uint8Array(byteNumbers);
  //   const blob = new Blob([byteArray], { type: element.ientFile.fileType });

  //   const url = URL.createObjectURL(blob);
  //   if (element.ientFile.fileType === 'application/pdf') {
  //     this.openPDFViewer(url);
  //   } else if (element.ientFile.fileType.includes('image')) {
  //     this.imageView(url, element.ientFile.fileName, element);
  //   }
  // }
  // openPDFViewer(xurl: any) {
  //   const dialogRef = this.dialog.openDialog(ViewPdfComponent, {
  //     width: "100%",
  //     height: "85%",
  //     data: {
  //       url: xurl,
  //     },
  //   });
  // }
  // filePath: any;
  // fileName = "";
  // imageId: any
  // @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;
  // imageView(path: any, filename: any, val: any) {
  //   
  //   this.filePath = path;
  //   this.fileName = filename;
  //   this.imageId = val
  //   this.dialog.openDialog(this.Templates, {
  //     width: '600px',
  //     height: 'auto'
  //   })
  // }
  // downloadImageFile() {
  //   this.downloadFile(this.imageId)
  //   this.dialog.closeAll()
  //   if (this.application.applicationStageValue === 'OBDOC') {
  //   }
  // }
  // downloadFile(element: any) {
  //   let base64Data: any = element.ientFile.content.split(';base64,').pop();
  //   const byteCharacters = atob(base64Data);
  //   const byteNumbers = new Array(byteCharacters.length);
  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }
  //   const byteArray = new Uint8Array(byteNumbers);
  //   const blob = new Blob([byteArray], { type: element.ientFile.fileType });

  //   const url = URL.createObjectURL(blob);

  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = element.ientFile.fileName;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   URL.revokeObjectURL(url);
  // }
  // async checkDocumentDelete(docId: any) {
  //   let msg = `Are you sure, You want to delete : ${docId.documentTypeDescription} ?`;
  //   let response = await this.dialog.checkDelete(msg);
  //   if (response) {
  //     const obj = {
  //       data: docId.trustApplicationDocumentId
  //     }
  //     this.apiService.deleteTrustApplicationDocument(obj).subscribe((success: any) => {
  //       this.clientDocumentTableData = [];
  //       // this.clientDocumentTableData = success.lstentTrustApplicationDocument
  //       success.lstentTrustApplicationDocument.forEach((element: any) => {
  //         if (element.ientFile.fileName !== '') {
  //           this.clientDocumentTableData.push(element)
  //         }
  //         console.log(this.clientDocumentTableData, 'check');

  //       });
  //       // this.documentType()
  //       this.data.successMessage(success.msg.infoMessage.msgDescription);
  //     })
  //   }
  // }
  saveTrustApplication(x: any) {
    this.trustRegister.trustApplicationId = this.application.trustApplicationId;
    this.application.ientTrustRegister = this.trustRegister
    if (x.valid) {
      this.apiService.saveTrustRegister(this.application).subscribe((success) => {
        this.application = success
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.errorTrue = false;
        this.errorTrue1 = false
      })
    }
    else {
      this.errorTrue = true
    }
  }
  saveTrustApplicationNotes(y: any) {
    if (y.valid) {
      this.application.ientTrustApplicationNotes = this.trustApplicationNotes;
      this.application.ientTrustApplicationNotes.notes = this.notesMessage;
      this.application.ientTrustApplicationNotes.actionStatusValue = this.application.actionStatusValue
      this.application.ientTrustApplicationNotes.applicationStageValue = this.application.applicationStageValue
      this.application.ientTrustApplicationNotes.statusValue = this.application.statusValue
      this.apiService.saveTrustApplicationNoteWithOutParent(this.application).subscribe((success) => {
        this.trustApplicationNotes = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.errorTrue = false;
        this.errorTrue1 = false;
      })
    }
    else {
      this.errorTrue1 = true
    }
  }
  saveTrustRegsiter() {
    this.apiService.saveTrustRegister(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
}
