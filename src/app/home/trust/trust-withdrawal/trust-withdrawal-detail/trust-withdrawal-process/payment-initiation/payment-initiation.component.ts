import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AccordionModule } from '../../../../../../app-core/template/accordion/accordion.module';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { Row, ViewLabel } from '../../../../../../app-core/core-component/core-component.component';
import { entTrustWithdrawalApplication, entTrustWithdrawalApplicationNotes } from '../../../../../../common/api-services/application-api/application-api.classes';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { ApplicationApiService } from '../../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../../common/services/data/data.service';
@Component({
  selector: 'app-payment-initiation',
  standalone: true,
  imports: [AccordionModule, FormsModule,InputControlComponent, IconButtonComponent,ViewLabel, Row, AppDatePipe],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './payment-initiation.component.html',
  styleUrl: './payment-initiation.component.scss'
})
export class PaymentInitiationComponent {
  @Input() application = new entTrustWithdrawalApplication();
  @Output() applicationChange = new EventEmitter<any>();
  trustWithdrawalNotes = new entTrustWithdrawalApplicationNotes();
  
  @Input() type = {
    trustWithdrawalApplicationId: 0,
    identificationNo: 0,
    trustWithdrawalApplicationProcessHistoryId: 0,
    trustWithdrawalApplicationStageValue: '',
    isEditable: '',
    trustWithdrawalStepNo: 0
  };
  errorTrue = false
  notesMessage = ''
  constructor(public apiService: ApplicationApiService,public data: DataService){}
  ngOnInit(): void {
    this.init()
  }
  ngAfterViewInit(): void { }
  async init() {
    await this.data.checkToken();
    // console.log(this.application.ientTrustWithdrawalApplicationProcessHistory.identificationNo);

    // this.getAssignOfficerDDL()
    // this.documentTypeDDLdata();

    if (this.application.lstentTrustWithdrawalApplicationNotes.length !== 0) {
      this.application.lstentTrustWithdrawalApplicationNotes.forEach((element: any) => {
        if (element.applicationStageValue === 'PAYIN' && element.identificationNo === this.type.identificationNo) {
          this.notesMessage = element.notes
        }
      });
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
            if (element.statusValue === this.application.applicationStatusValue && element.identificationNo === this.type.identificationNo) {
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
}
