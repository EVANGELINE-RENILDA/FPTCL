import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { entEstateApplication, entEstateApplicationAssignedOfficerHistory, entEstateApplicationNotes } from '../../../../../common/api-services/application-api/application-api.classes';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { AppDatePipe } from "../../../../../common/pipes/app-date/app-date.pipe";

@Component({
  selector: 'app-approval-by-met',
  standalone: true,
  imports: [InputControlComponent, FormsModule, ViewLabel, InputControlComponent, Row,
    IconButtonComponent, AccordionModule, AppDatePipe],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './approval-by-met.component.html',
  styleUrl: './approval-by-met.component.scss'
})
export class ApprovalByMetComponent {
  @Input() application = new entEstateApplication();
  @Output() applicationChange = new EventEmitter<any>();
  @Input() type = {
      isEditable: ''
  }
  estateApplicationAssignedOfficer = new entEstateApplicationAssignedOfficerHistory();
  estateApplicationNotes = new entEstateApplicationNotes();
  errorTrue = false;
  notesMessage = ''
    @ViewChild('notiForm') notiForm!: NgForm;

    constructor(public apiService: ApplicationApiService, public data: DataService){

    }
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
    completeApplicationStage() {
      this.application.isCompleted = 'Y'
      this.apiService.completeTrustWithdrawalApplicationStage(this.application).subscribe((success) => {
        this.application = success;
        this.applicationChange.emit(this.application);
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
}
