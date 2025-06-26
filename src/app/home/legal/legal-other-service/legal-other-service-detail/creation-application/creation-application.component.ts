import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { FormsModule, NgForm } from '@angular/forms';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { DataService } from '../../../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { ActivatedRoute } from '@angular/router';
import { entLegalApplication, entLegalApplicationAssignedOfficerHistory, entLegalApplicationNotes, entLegalApplicationNotesList } from '../../../../../common/api-services/application-api/application-api.classes';
import { AppDatePipe } from "../../../../../common/pipes/app-date/app-date.pipe";
import { CoreService } from '../../../../../app-core/service/core.service';

@Component({
  selector: 'app-creation-application',
  standalone: true,
  templateUrl: './creation-application.component.html',
  styleUrl: './creation-application.component.scss',
  imports: [AccordionModule, ViewLabel, InputControlComponent, FormsModule, IconButtonComponent, Row, AppDatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreationApplicationComponent {
  @Input() application = new entLegalApplication();
  legalAssignedOfficer = new entLegalApplicationAssignedOfficerHistory();
  assignedOfficerDDL = [];
  @Input() type = {
    isEditable: "",
    legalApplicationIdenityNo: 0,
    legalApplicationRejectHistoryId: 0,
    legalApplicationStageValue: "",
    legalApplicationId: 0
  };
  errorTrue = false;
  @ViewChild('notiForm') notiForm!: NgForm;
  @ViewChild('p') pForm!: NgForm;
  @Output() applicationChange = new EventEmitter<any>();
  legalApplicationNotes = new entLegalApplicationNotes();

  constructor(public data: DataService, public apiService: ApplicationApiService, public dialog: CoreService) { }

  ngOnInit(): void {
    this.init()
  }
  notesMessage = ''
  async init() {
    this.getAssignedOfficerList();
    this.documentTypeDDLdata();
    this.application.lstentLegalApplicationNotes.forEach((element: any) => {
      if (element.applicationStageValue === this.application.applicationStageValue && element.identityNo === this.type.legalApplicationIdenityNo) {
        this.notesMessage = element.notes
      }
    });

  }


  getAssignedOfficerList() {
    const obj = {
      data: this.application.legalApplicationId,
      data1: this.application.applicationStageValue
    }
    this.apiService.getListOfAssignedOfficerHistoryByLegalApplicationId(obj).subscribe((success) => {
      this.assignedOfficerDDL = success.lstentLegalApplicationAssignedOfficerHistory
    })
  }
  reAssignTrust() {
    this.legalAssignedOfficer.legalApplicationId = this.application.legalApplicationId;
    this.application.ientLegalApplicationAssignedOfficerHistory = this.legalAssignedOfficer
    if (this.pForm.valid) {

      this.apiService.reAssignLegalApplicationAssignedHistory(this.application).subscribe((success: any) => {
        this.application = success;
        this.applicationChange.emit(this.application);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  selfAssignTrust() {
    this.legalAssignedOfficer.legalApplicationId = this.application.legalApplicationId
    this.application.ientLegalApplicationAssignedOfficerHistory = this.legalAssignedOfficer
    this.apiService.selfAssignLegalApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success;
      this.applicationChange.emit(this.application);
    })
  }
  completeApplicationStage() {
    this.application.isCompleted = 'Y';
    this.apiService.completeLegalApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }

  saveLegalNotes() {
    this.legalApplicationNotes.notes = this.notesMessage
    this.application.ientLegalApplicationNotes = this.legalApplicationNotes;
    this.application.ientLegalApplicationNotes.actionStatusValue = this.application.actionStatusValue
    this.application.ientLegalApplicationNotes.applicationStageValue = this.application.applicationStageValue
    this.application.ientLegalApplicationNotes.applicationStatusValue = this.application.statusValue;
    this.application.ientLegalApplicationNotes.legalApplicationId  = this.application.legalApplicationId
    if (this.notiForm.valid) {
      this.apiService.saveLegalApplicationNoteWithOutParent(this.application).subscribe((success) => {
        this.application = success
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.applicationChange.emit(this.application)
      })
    }
    else {
      this.errorTrue = true
    }
  }
  documentArray: any
  documentTypeDDLdata() {
    const obj = {
      data: this.application.serviceTypeValue,
      data1: this.application.applicationStageValue
    }
    this.apiService.getListofDocumentsByServiceType(obj).subscribe((success: any) => {
      this.documentArray = success.value;
    })
  }

  @ViewChild('x') xForm!: NgForm;
  cancelNotesDescription = '';
  @ViewChild('notesCancelDialog', { static: false })
  notesCancelDialog!: TemplateRef<any>;
  @ViewChild('cancelAlert', { static: false })
  cancelAlert!: TemplateRef<any>;
  dialogCloseAll(){
    this.data.showErrorMessage = false;
    this.dialog.closeAll()
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
  legalNotes = new entLegalApplicationNotes
  cancelApplicationStage() {
    if (this.xForm.valid) {
      this.legalNotes.actionStatusValue = this.application.actionStatusValue;
      this.legalNotes.applicationStageValue =
        this.application.applicationStageValue;
      this.legalNotes.applicationStatusValue = 'CNCLD';
      this.legalNotes.legalApplicationId = this.application.legalApplicationId;
      this.legalNotes.identificationNo = this.type.legalApplicationIdenityNo;
      this.legalNotes.notes = this.cancelNotesDescription;
      this.application.ientLegalApplicationNotes = this.legalNotes;
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
  dialogClose(){
    this.dialog.closeDialog();
  }

}
