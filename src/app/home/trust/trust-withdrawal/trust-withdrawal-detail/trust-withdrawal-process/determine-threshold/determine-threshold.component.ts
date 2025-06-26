import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { AccordionModule } from '../../../../../../app-core/template/accordion/accordion.module';
import { AppTableComponent } from '../../../../../../app-core/template/app-table/app-table.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, ViewLabel } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { entTrustWithdrawalApplication, entTrustWithdrawalApplicationAssignedOfficerHistory, entTrustWithdrawalApplicationNotes, entWithdrawalPaymentAssignedOfficerHistory } from '../../../../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../../../common/api-services/application-api/application-api.service';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { DataService } from '../../../../../../common/services/data/data.service';
import { CheckboxComponent } from '../../../../../../app-core/template/checkbox/checkbox.component';

@Component({
  selector: 'app-determine-threshold',
  standalone: true,
  imports: [AccordionModule, FormsModule, Row, ViewLabel, InputControlComponent, AppDatePipe, IconButtonComponent, CheckboxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './determine-threshold.component.html',
  styleUrl: './determine-threshold.component.scss'
})
export class DetermineThresholdComponent {
  @Input() application: any = new entTrustWithdrawalApplication();
  @Output() applicationChange = new EventEmitter<any>();
  trustWithdrawalNotes = new entTrustWithdrawalApplicationNotes();
  @Input() type = {
    trustApplicationId: 0,
    trustApplicationIdenityNo: 0,
    trustApplicationRejectHistoryId: 0,
    trustApplicationStageValue: '',
    isEditable: '',
    trustApplicationStepNo: 0
  };
  notesMessage: any = ''

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
      if (this.application.lstentTrustWithdrawalApplicationNotes.length !== 0) {
        this.application.lstentTrustWithdrawalApplicationNotes.forEach((element: any) => {
          if (element.statusValue === this.application.applicationStatusValue && element.identificationNo === this.type.trustApplicationIdenityNo) {
            this.notesMessage = element.notes
          }
        });
      }
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
  saveWithdrawalNotes() {
    this.application.ientTrustWithdrawalApplicationNotes = this.trustWithdrawalNotes;
    this.application.ientTrustWithdrawalApplicationNotes.notes = this.notesMessage;
    this.application.ientTrustWithdrawalApplicationNotes.actionStatusValue = this.application.actionStatusValue
    this.application.ientTrustWithdrawalApplicationNotes.applicationStageValue = this.application.applicationStageValue
    this.application.ientTrustWithdrawalApplicationNotes.applicationStatusValue = this.application.applicationStatusValue
    this.application.ientTrustWithdrawalApplicationNotes.trustWithdrawalApplicationId = this.application.trustWithdrawalApplicationId;
    if (this.notiForm.valid) {
      this.apiService.saveTrustWithdrawalApplicationNotes(this.application).subscribe((success) => {
        if (this.application.lstentTrustWithdrawalApplicationNotes.length !== 0) {
          this.application.lstentTrustWithdrawalApplicationNotes.forEach((element: any) => {
            if (element.statusValue === this.application.applicationStatusValue && element.identificationNo === this.type.trustApplicationIdenityNo) {
              this.notesMessage = element.notes
            }
          });
        }
        this.applicationChange.emit(this.application);
        this.errorTrue = false
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  withdrawalByOrg(event: any) {
    if (event.target.checked === true) {
      this.application.aboveThereshold = 'Y'
    }
    else {
      this.application.aboveThereshold = 'N'
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
  async cancelNotesDialog() {
    this.createNotes()
    // this.application.applicationStatusValue = 'CANCD';
    let dialogResponse: any = await this.dialog.openDialog(this.notesCancelDialog, {
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',

    });
  }
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

}
