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
  entWillApplication,
  entWillApplicationAssignedOfficerHistory,
  entWillApplicationDocument,
  entWillApplicationNotes,
} from '../../../../../common/api-services/application-api/application-api.classes';
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
import { CoreService } from '../../../../../app-core/service/core.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { ViewPdfComponent } from '../../../../../app-core/template/view-pdf/view-pdf.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../../app-core/template/app-table/app-table.component';

@Component({
  selector: 'app-issue-register-will-copy',
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
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './issue-register-will-copy.component.html',
  styleUrl: './issue-register-will-copy.component.scss',
})
export class IssueRegisterWillCopyComponent {
  @Input() application = new entWillApplication();
  @Output() applicationChange = new EventEmitter<any>();
  @Input() type = {
    identityNo: 0,
    stageValue: '',
    willApplicationId: '',
    willApplicationProcessHistoryId: '',
    isEditable: '',
  };
  willApplicationAssignedOfficer =
    new entWillApplicationAssignedOfficerHistory();
  linkedColumns: any = ['description', 'action'];
  linkedColumnsName: any = ['Document Name', ' Action'];
  requireTableData: any = [];
  imageId: any = '';
  errorTrue = false;
  constructor(
    public dialog: CoreService,
    public apiService: ApplicationApiService,
    public data: DataService
  ) {}
  ngOnInit(): void {
    this.init();
  }
  notesMessage = '';
  async init() {
    this.getAssignOfficerDDL();
    this.getLinkedDocument();
    console.log(this.type);
    this.application.lstentWillApplicationNotes.forEach((element: any) => {
      if (element.applicationStageValue === 'ISREG' && element.identityNo === this.type.identityNo) {
        this.notesMessage = element.notes
      }
    });
  }
  downloadImageFile() {
    this.downloadFile(this.imageId);
    this.dialog.closeAll();
    if (this.application.applicationStageValue === 'ISREG') {
    }
  }
  downloadFile(element: any) {
    const obj = {
      data: this.application.willApplicationId,
      data1: element.constant,
    };
    const options = {
      responseType: 'blob',
    };
    debugger;
    this.apiService
      .downLoadWillGeneratedDocuments(obj, options)
      .subscribe((success) => {
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
      });
  }

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
  getLinkedDocument() {
    const obj = {
      data: 'ISREG',
    };
    this.apiService.getWillLinkedDocuments(obj).subscribe((success) => {
      this.requireTableData = success.lstDDLClass;
    });
  }
  @ViewChild('notiForm') notiForm!: NgForm;
  willNotes = new entWillApplicationNotes();
  createNotes() {}

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
  dialogClose() {
    this.data.showErrorMessage = false;
    this.dialog.closeAll();
    this.errorTrue = false;
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
  filePath = '';
}
