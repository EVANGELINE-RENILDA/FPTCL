import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { FormsModule, NgForm } from '@angular/forms';
import {
  entWillApplication,
  entWillApplicationAssignedOfficerHistory,
  entWillApplicationNotes,
} from '../../../../../common/api-services/application-api/application-api.classes';
import {
  Row,
  ViewLabel,
} from '../../../../../app-core/core-component/core-component.component';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';

@Component({
  selector: 'app-identify-testator',
  standalone: true,
  imports: [
    AccordionModule,
    FormsModule,
    Row,
    AppDatePipe,
    ViewLabel,
    InputControlComponent,
    IconButtonComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './identify-testator.component.html',
  styleUrl: './identify-testator.component.scss',
})
export class IdentifyTestatorComponent {
  @Input() application = new entWillApplication();
  @Output() applicationChange = new EventEmitter<any>();
  willApplicationAssignedOfficer =
    new entWillApplicationAssignedOfficerHistory();
  errorTrue = false;
  @Input() type = {
    identityNo: 0,
    stageValue: '',
    willApplicationId: '',
    willApplicationProcessHistoryId: '',
    isEditable: '',
  };

  constructor(
    public apiService: ApplicationApiService,
    public data: DataService,
    public dialog: CoreService
  ) {}
  //assigned Officer
  ngOnInit(): void {
    this.init();
  }
  init() {
    this.getAssignOfficerDDL();
    if (this.application.lstentWillApplicationNotes.length !== 0) {
      this.application.lstentWillApplicationNotes.forEach((element: any) => {
        if (
          element.applicationStageValue === 'SIGTS' &&
          element.identityNo === this.type.identityNo
        ) {
          this.notesMessage = element.notes;
        }
      });
    }
  }
  assignedOfficerDDL: any = [];
  getAssignOfficerDDL() {
    //  const obj = {
    //    data1: this.application.willApplicationId,
    //    data2: this.application.actionStatusValue,
    //    data3: this.application.applicationStageValue
    //  }
    //  this.apiService.getListOfOfficerForWillApplication(obj).subscribe((success: any) => {
    //    this.assignedOfficerDDL = success.value
    //  })
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

  //notes
  notesMessage = '';
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
  dialogClose() {
    this.data.showErrorMessage = false;
    this.dialog.closeAll();
    this.errorTrue = false;
  }
}
