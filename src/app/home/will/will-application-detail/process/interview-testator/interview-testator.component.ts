import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../../app-core/template/app-table/app-table.component';
import {
  Row,
  ViewLabel,
} from '../../../../../app-core/core-component/core-component.component';
import { FormsModule, NgForm } from '@angular/forms';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { FileSizePipe } from '../../../../../app-core/template/drop-zone/file-size.pipe';
import {
  entWillApplication,
  entWillApplicationAssignedOfficerHistory,
  entWillApplicationDocument,
  entWillApplicationNotes,
} from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { ViewPdfComponent } from '../../../../../app-core/template/view-pdf/view-pdf.component';
import { WillApplicationPipe } from '../will-application.pipe';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import {
  TabSubComponent,
  TabSubGroupComponent,
} from '../../../../../app-core/template/tab/tab1';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';

@Component({
  selector: 'app-interview-testator',
  standalone: true,
  imports: [
    FormsModule,
    InputControlComponent,
    ViewLabel,
    DropZoneComponent,
    AccordionModule,
    Row,
    AppDatePipe,
    WillApplicationPipe,
    FileSizePipe,
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    TabSubComponent,
    TabSubGroupComponent,
    IconButtonComponent,
    CheckboxComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './interview-testator.component.html',
  styleUrl: './interview-testator.component.scss',
})
export class InterviewTestatorComponent {
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
  supportDocumentColumns = [
    'documentTypeDescription',
    'fileName',
    'fileSize',
    'action',
  ];
  supportDocumentColumnsName = ['Document Name', 'File Name', 'Size', 'Action'];
  initialSuccessDoc: any;
  constructor(
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public data: DataService
  ) {}
  ngOnInit(): void {
    this.init();
  }
  init() {
    this.documentTypeDDLdata();
    this.loading = true;
    if (this.application.lstentWillApplicationNotes.length !== 0) {
      this.application.lstentWillApplicationNotes.forEach((element: any) => {
        if (
          element.applicationStageValue === 'INTST' &&
          element.identityNo === this.type.identityNo
        ) {
          this.notesMessage = element.notes;
        }
      });
    }
  }
  documentArray: any;
  documentTypeDDLdata() {
    const obj = {
      data: 'INTST',
    };
    this.apiService
      .getListofWillDocumentsByStage(obj)
      .subscribe((success: any) => {
        debugger;
        this.documentArray = success.value;
        console.log(this.documentArray);
      });
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
  createDoc() {
    this.apiService
      .createTrustSettlementApplicationDocument()
      .subscribe((success: any) => {
        this.willApplicationDocument = success;
      });
  }
  loading = false;
  uploadClientDocumentAttachment(event: any) {
    this.loading = false;
    console.log(event[0]);
    this.willApplicationDocument.willApplRefNo = this.application.willApplRefNo
    this.willApplicationDocument.willApplicationId =
      this.application.willApplicationId;
    this.willApplicationDocument.ientFile.fileType = event[0].fileType;
    this.willApplicationDocument.identityNo = this.application.identifierCount;
    this.willApplicationDocument.ientFile.fileName = event[0].fileName;
    this.willApplicationDocument.ientFile.fileSize = event[0].fileSize;
    this.willApplicationDocument.ientFile.content = event[0].content;
    this.willApplicationDocument.ientFile.fileType = event[0].fileType;
    this.willApplicationDocument.ientFile.content = event[0].content;
    this.willApplicationDocument.applicationStageValue =
      this.application.applicationStageValue;
    this.willApplicationDocument.actionStatusValue =
      this.application.actionStatusValue;
    this.willApplicationDocument.applicationStatusValue =
      this.application.statusValue;
    if (this.willApplicationDocument.documentTypeValue !== '') {
      debugger;
      // this.application.lstentTrustApplicationDocument = []
      this.apiService
        .saveWillApplicationDocument(this.willApplicationDocument)
        .subscribe((success: any) => {
          // success.lstentWillApplicationDocument.forEach((element: any) => {
          //   if (element.ientFile.fileName !== '') {
          this.application.lstentWillApplicationDocument =
            success.lstentWillApplicationDocument;
          this.loading = true;
          //   }
          // })
          this.willApplicationDocument.documentTypeValue = '';
          this.data.successMessage(success.msg.infoMessage.msgDescription);
          this.data.showErrorMessage = false;
        });
    } else {
      this.data.errorInfoMessage('Select Document Type');
      this.loading = true;
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
  viewFile(element: any) {
    debugger;
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
    if (this.application.applicationStageValue === 'OBDOC') {
    }
  }
  @ViewChild('notiForm') notiForm!: NgForm;
  willNotes = new entWillApplicationNotes();
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
  isDeathBedCheck(event: any) {
    debugger;
    if (event.target.checked === true) {
      this.application.ientWillApplicationTestatorStatus.isDeathBed = 'Y';
    } else {
      this.application.ientWillApplicationTestatorStatus.isDeathBed = 'N';
    }
  }
  isUnderstandableCheck(event: any) {
    if (event.target.checked === true) {
      this.application.ientWillApplicationTestatorStatus.isUnderstandable = 'Y';
    } else {
      this.application.ientWillApplicationTestatorStatus.isUnderstandable = 'N';
    }
  }
  isMentalAbilityCheck(event: any) {
    if (event.target.checked === true) {
      this.application.ientWillApplicationTestatorStatus.isMentalAbility = 'Y';
    } else {
      this.application.ientWillApplicationTestatorStatus.isMentalAbility = 'N';
    }
  }
  isOldAgeCheck(event: any) {
    if (event.target.checked === true) {
      this.application.ientWillApplicationTestatorStatus.isOldAge = 'Y';
    } else {
      this.application.ientWillApplicationTestatorStatus.isOldAge = 'N';
    }
  }
  isIllnessCheck(event: any) {
    if (event.target.checked === true) {
      this.application.ientWillApplicationTestatorStatus.isIllness = 'Y';
    } else {
      this.application.ientWillApplicationTestatorStatus.isIllness = 'N';
    }
  }
  isDifficultyInCommunicationCheck(event: any) {
    if (event.target.checked === true) {
      this.application.ientWillApplicationTestatorStatus.isDifficultyInCommunication =
        'Y';
    } else {
      this.application.ientWillApplicationTestatorStatus.isDifficultyInCommunication =
        'N';
    }
  }
  isDoctorOpenionRequiredCheck(event: any) {
    if (event.target.checked === true) {
      this.application.ientWillApplicationTestatorStatus.isDoctorOpenionRequired =
        'Y';
    } else {
      this.application.ientWillApplicationTestatorStatus.isDoctorOpenionRequired =
        'N';
    }
  }
  isInfluencedByOthersCheck(event: any) {
    if (event.target.checked === true) {
      this.application.ientWillApplicationTestatorStatus.isInfluencedByOthers =
        'Y';
    } else {
      this.application.ientWillApplicationTestatorStatus.isInfluencedByOthers =
        'N';
    }
  }
  isRequireAssistanceCheck(event: any) {
    if (event.target.checked === true) {
      this.application.ientWillApplicationTestatorStatus.isRequireAssistance =
        'Y';
    } else {
      this.application.ientWillApplicationTestatorStatus.isRequireAssistance =
        'N';
    }
  }
  isAssistanceFromFamilyCheck(event: any) {
    if (event.target.checked === true) {
      this.application.ientWillApplicationTestatorStatus.isAssistanceFromFamily =
        'Y';
    } else {
      this.application.ientWillApplicationTestatorStatus.isAssistanceFromFamily =
        'N';
    }
  }

  saveWillInterviewCheckbox() {
    if (this.pForm.valid) {
      this.application.ientWillApplicationTestatorStatus.willApplicationId =
        this.application.willApplicationId;
      this.apiService
        .saveWillApplicationTestatorStatus(
          this.application.ientWillApplicationTestatorStatus
        )
        .subscribe((success) => {
          this.application.ientWillApplicationTestatorStatus = success;
        });
    } else {
      this.errorTrue = true;
    }
  }

  @ViewChild('p') pForm!: NgForm;

  dialogClose() {
    this.data.showErrorMessage = false;
    this.dialog.closeAll();
    this.errorTrue = false;
  }
}
