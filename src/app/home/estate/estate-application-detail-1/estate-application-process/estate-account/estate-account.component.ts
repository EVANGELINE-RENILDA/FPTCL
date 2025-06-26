import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { entTrustApplication, entTrustApplicationAssignedOfficer, entTrustApplicationNotes } from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';

@Component({
  selector: 'app-estate-account',
  standalone: true,
  imports: [IconButtonComponent, InputControlComponent, Row, ViewLabel, FormsModule, AccordionModule, AppDatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './estate-account.component.html',
  styleUrl: './estate-account.component.scss'
})
export class EstateAccountComponent {
  errorTrue = false;
  @Input() application: any = new entTrustApplication();
  @Output() applicationChange = new EventEmitter<any>();
  estateApplicationAssignedOfficer = new entTrustApplicationAssignedOfficer();
  estateApplicationNotes = new entTrustApplicationNotes();
  refreshNotesData = this.application.ientTrustApplicationNotes.notes;
  @Input() type = {
    trustApplicationId: 0,
    trustApplicationIdenityNo: 0,
    trustApplicationRejectHistoryId: 0,
    trustApplicationStageValue: '',
    trustApplicationStepNo: 0,
    isEditable: ''
  };

  @ViewChild('notiForm') notiForm!: NgForm;
  constructor(public apiService: ApplicationApiService,
    public data: DataService
  ) { }

  saveEstateApplication() { }

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
    this.estateApplicationAssignedOfficer.trustApplicationId = this.application.trustApplicationId;
    this.application.ientTrustApplicationAssignedOfficer = this.estateApplicationAssignedOfficer
    this.apiService.reAssignTrustApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success
    })
  }
  selfAssignTrust() {
    this.estateApplicationAssignedOfficer.trustApplicationId = this.application.trustApplicationId
    this.apiService.selfAssignTrustApplicationAssignedHistory(this.estateApplicationAssignedOfficer).subscribe((success: any) => {
      this.application = success
    })
  }

}
