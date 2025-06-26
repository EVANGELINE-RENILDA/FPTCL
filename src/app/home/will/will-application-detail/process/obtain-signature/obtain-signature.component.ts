import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  viewChild,
  ViewChild,
} from '@angular/core';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { FormsModule, NgForm } from '@angular/forms';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import {
  Row,
  ViewLabel,
} from '../../../../../app-core/core-component/core-component.component';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { FileSizePipe } from '../../../../../app-core/template/drop-zone/file-size.pipe';
import { WillApplicationPipe } from '../will-application.pipe';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import {
  entWillApplication,
  entWillApplicationAssignedOfficerHistory,
  entWillApplicationDocument,
  entWillApplicationNotes,
  entWillApplicationWitness,
} from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { ViewPdfComponent } from '../../../../../app-core/template/view-pdf/view-pdf.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';
import { AddressEditComponent } from '../../../../../app-core/template/address-edit/address-edit.component';
import { AppService } from '../../../../../app.service';

@Component({
  selector: 'app-obtain-signature',
  standalone: true,
  imports: [
    AccordionModule,
    FormsModule,
    IconButtonComponent,
    InputControlComponent,
    ViewLabel,
    DropZoneComponent,
    Row,
    FileSizePipe,
    WillApplicationPipe,
    AppDatePipe,
    CellDefDirective,
    CellHeaderDefDirective,
    AppTableComponent,
    CheckboxComponent,
    AddressEditComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './obtain-signature.component.html',
  styleUrl: './obtain-signature.component.scss',
})
export class ObtainSignatureComponent {
  @Input() application = new entWillApplication();
  @Output() applicationChange = new EventEmitter<any>();
  @Input() type = {
    identityNo: 0,
    stageValue: '',
    willApplicationId: '',
    willApplicationProcessHistoryId: '',
    isEditable: '',
  };
  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;
  accept: any;
  notesMessage = '';
  errorTrue = false;

  fileExtension = 'jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv';
  willApplicationAssignedOfficer =
    new entWillApplicationAssignedOfficerHistory();
  willApplicationDocument = new entWillApplicationDocument();
  @ViewChild('notiForm') notiForm!: NgForm;
  willNotes = new entWillApplicationNotes();
  currentDate: any;
  constructor(
    public apiService: ApplicationApiService,
    public data: DataService,
    public dialog: CoreService,
    public appService: AppService
  ) {}
  witnessColumns: any = ['name', 'dob', 'occupation', 'action'];
  witnessColumnsName: any = ['Name', 'DOB', 'Occupation', 'Action'];
  witnessTableData: any = [];
  ngOnInit(): void {
    this.init();
  }
  init() {
    this.getWitnessList();
    const obj = {
      data: this.application.willApplicationId,
    };
    this.currentDate = this.appService.getCurrentDate();
    this.application.lstentWillApplicationNotes.forEach((element: any) => {
      if (element.applicationStageValue === 'SIGTS' && element.identityNo === this.type.identityNo) {
        this.notesMessage = element.notes
      }
    });
    // this.witnessData = this.application.lstentWillApplicationSignature;

    // this.apiService.getListofWitnessByWillApplicationID(obj).subscribe((success)=>{
    //   this.witnessTableData = success
    // })
  }

  saveNotes() {
    if (this.notiForm.valid) {
      this.willNotes.notes = this.notesMessage;
      this.willNotes.actionStatusValue = this.application.actionStatusValue;
      this.willNotes.applicationStatusValue = this.application.statusValue;
      this.willNotes.applicationStageValue =
        this.application.applicationStageValue;
      this.willNotes.identityNo = this.type.identityNo;
      this.willNotes.willApplicationId = this.application.willApplicationId;
      this.apiService
        .saveWillApplicationNotesWithoutParent(this.willNotes)
        .subscribe((success) => {
          this.willNotes = success;
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        });
    } else {
      this.errorTrue = true;
    }
  }
  completeApplicationStage() {
    this.application.isCompleted = 'Y';
    this.application.lstentWillApplicationDocument = [];
    this.apiService
      .completeWillApplicationStage(this.application)
      .subscribe((success) => {
        this.application = success;
        this.applicationChange.emit(this.application);
        // this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      });
  }

  @ViewChild('x') xForm!: NgForm;
  cancelNotesDescription = '';
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
    // this.createNotes()
    // this.application.statusValue = 'CANCL';
    let dialogResponse: any = await this.dialog.openDialog(
      this.notesCancelDialog,
      {
        height: 'auto',
        width: '800px',
        maxWidth: '1170px',
      }
    );
  }

  cancelApplicationStage() {
    if (this.xForm.valid) {
      this.willNotes.actionStatusValue = this.application.actionStatusValue;
      this.willNotes.applicationStageValue =
        this.application.applicationStageValue;
      this.willNotes.applicationStatusValue = 'WCNLD';
      this.willNotes.willApplicationId = this.application.willApplicationId;
      this.willNotes.identityNo = this.type.identityNo;
      this.willNotes.notes = this.cancelNotesDescription;
      this.application.ientWillApplicationNotes = this.willNotes;
      this.apiService
        .saveWillApplicationNotes(this.application)
        .subscribe((success) => {
          this.application = success;
          this.cancelNotesDescription = success.ientWillApplicationNotes.notes;
          this.applicationChange.emit(this.application);
          this.dialog.closeAll();
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        });
    } else {
      this.errorTrue = true;
    }
  }
  //assigned Officer
  assignedOfficerDDL: any = [];
  getAssignOfficerDDL() {
    // const obj = {
    //   data1: this.application.willApplicationId,
    //   data2: this.application.actionStatusValue,
    //   data3: this.application.applicationStageValue
    // }
    // this.apiService.willAssignOff(obj).subscribe((success: any) => {
    //   this.assignedOfficerDDL = success.value
    // })
  }
  reAssignWill() {
    this.willApplicationAssignedOfficer.willApplicationId =
      this.application.willApplicationId;
    this.application.ientWillApplicationAssignedOfficerHistory =
      this.willApplicationAssignedOfficer;
    this.apiService
      .reAssignWillApplicationAssignedHistory(this.application)
      .subscribe((success: any) => {
        this.application = success;
        this.applicationChange.emit(this.application);
      });
  }
  selfAssignWill() {
    this.willApplicationAssignedOfficer.willApplicationId =
      this.application.willApplicationId;
    this.apiService
      .selfAssignWillApplicationAssignedHistory(this.application)
      .subscribe((success: any) => {
        this.application = success;
        this.applicationChange.emit(this.application);
      });
  }
  // singleDocType: any
  uploadCourtDocumentAttachment(event: any) {
    console.log(event[0]);
    this.willApplicationDocument.willApplicationId =
      this.application.willApplicationId;
      this.willApplicationDocument.willApplRefNo = this.application.willApplRefNo
    this.willApplicationDocument.ientFile.fileType = event[0].fileType;
    this.willApplicationDocument.identityNo = this.application.identifierCount;
    this.willApplicationDocument.ientFile.fileName = event[0].fileName;
    this.willApplicationDocument.ientFile.fileSize = event[0].fileSize;
    this.willApplicationDocument.ientFile.content = event[0].content;
    this.willApplicationDocument.ientFile.fileExtension = event[0].fileType;
    this.willApplicationDocument.ientFile.content = event[0].content;
    this.willApplicationDocument.applicationStageValue =
      this.application.applicationStageValue;
    this.willApplicationDocument.actionStatusValue =
      this.application.actionStatusValue;
    this.willApplicationDocument.applicationStatusValue =
      this.application.statusValue;
    this.willApplicationDocument.documentTypeValue = 'SNWCP';
    // this.willApplicationDocument.documentTypeValue = this.singleDocType;
    // if (this.willApplicationDocument.documentTypeValue !== '') {
    // debugger
    // this.application.lstentTrustApplicationDocument = []
    this.apiService
      .saveWillApplicationDocument(this.willApplicationDocument)
      .subscribe((success: any) => {
        this.application.lstentWillApplicationDocument =
          success.lstentWillApplicationDocument;
        this.applicationChange.emit(this.application);
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      });
    // }
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
      width: '100%',
      height: '85%',
      data: {
        url: xurl,
      },
    });
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
        data: docId.willApplicationDocumentId,
      };
      this.apiService
        .deleteWillApplicationDocument(obj)
        .subscribe((success: any) => {
          // this.application.lstentTrustApplicationDocument = [];
          // this.application.lstentTrustApplicationDocument = success.lstentTrustApplicationDocument
          this.application.lstentWillApplicationDocument =
            success.lstentWillApplicationDocument;
          // this.documentType()
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        });
    }
  }
  filePath: any;
  fileName = '';
  imageId: any;

  imageView(path: any, filename: any, val: any) {
    debugger;
    this.filePath = path;
    this.fileName = filename;
    this.imageId = val;
    this.dialog.openDialog(this.Templates, {
      width: '600px',
      height: 'auto',
    });
  }
  downloadImageFile() {
    this.downloadFile(this.imageId);
    this.dialog.closeAll();
  }
  dialogClose() {
    this.data.showErrorMessage = false;
    this.errorTrue = false;
    this.dialog.closeDialog();
  }
  witnessData = new entWillApplicationWitness();
  witnessDataRAW = new entWillApplicationWitness();
  createWitness() {
    this.apiService.createWillApplicationWitness().subscribe((success) => {
      console.log(success);
      this.witnessData = success;
      // this.witnessData = success.ientWillApplicationWitness;
      
      this.witnessDialog();
    });
  }
  @ViewChild('witnessBox', { static: false })
  witnessBox!: TemplateRef<any>;
  async witnessDialog() {
    let dialogResponse: any = await this.dialog.openDialog(this.witnessBox, {
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',
    });
  }
  openWitness(val: any) {
    const obj = {
      data: val,
    };
    this.apiService.openWillApplicationWitness(obj).subscribe((success) => {
      this.witnessData = success;
      this.witnessDialog();
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    });
  }
  refreshWitness() {
    const obj = {
      data: this.witnessData.willApplicationWitnessId,
    };
    this.apiService.openWillApplicationWitness(obj).subscribe((success) => {
      this.witnessData = success;
      this.data.successMessage('Data Refreshed Successfully');
    });
  }
  clearWitness() {
    this.witnessData = JSON.parse(JSON.stringify(this.witnessDataRAW))
    this.apiService.createWillApplicationWitness().subscribe((success) => {
      this.witnessData = success;
      this.data.successMessage('Data Cleared Successfully');
    });
  }
  @ViewChild('p') pForm!: NgForm;
  saveWitness() {
    // this.witnessData.
    if (this.pForm.valid) {
      // this.witnessData.identityNo = this.type.identityNo;
      this.witnessData.identityNo =
        this.type.identityNo;
      this.witnessData.willApplicationId =
        this.application.willApplicationId;
      this.apiService
        .saveWillApplicationWitness(
          this.witnessData
        )
        .subscribe((success) => {
          this.application.lstentWillApplicationWitness =
            success.lstentWillApplicationWitness;
          this.dialog.closeAll();
          this.data.showErrorMessage = false;
        });
    } else {
      this.errorTrue = true;
    }
  }
  getWitnessList() {
    const obj = {
      data: this.application.willApplicationId,
    };
    this.apiService
      .getListofWitnessByWillApplicationID(obj)
      .subscribe((success) => {
        this.witnessTableData = success.lstentWillApplicationWitness;
      });
  }
  isBeneficiarySpouseCheck(event: any) {
    if (event.target.checked === true) {
      this.witnessData.isBeneficiarySpouse = 'Y';
    } else {
      this.witnessData.isBeneficiarySpouse = 'N';
    }
  }
  isFptclCheck(event: any) {
    if (event.target.checked === true) {
      this.witnessData.isFptcl = 'Y';
    } else {
      this.witnessData.isFptcl = 'N';
    }
  }
}
