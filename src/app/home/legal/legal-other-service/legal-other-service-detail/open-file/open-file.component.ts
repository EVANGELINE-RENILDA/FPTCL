import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { entLegalApplication, entLegalApplicationAssignedOfficerHistory, entLegalApplicationNotes } from '../../../../../common/api-services/application-api/application-api.classes';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { FormsModule, NgForm } from '@angular/forms';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';

@Component({
  selector: 'app-open-file',
  standalone: true,
  imports: [AccordionModule, ViewLabel, InputControlComponent, FormsModule, IconButtonComponent, Row, AppDatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './open-file.component.html',
  styleUrl: './open-file.component.scss'
})
export class OpenFileComponent {
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

  constructor(public data: DataService, public apiService: ApplicationApiService) { }

  ngOnInit(): void {
    this.init()
  }
  notesMessage = ''
  async init() {
    this.getAssignedOfficerList();
    this.application.lstentLegalApplicationNotes.forEach((element: any) => {
      if (element.statusValue === this.application.statusValue && element.identityNo === this.type.legalApplicationIdenityNo) {
        this.notesMessage = element.notes
      }
    }); this.application.lstentLegalApplicationNotes.forEach((element: any) => {
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
    this.application.ientLegalApplicationNotes.applicationStatusValue = this.application.statusValue
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
}
