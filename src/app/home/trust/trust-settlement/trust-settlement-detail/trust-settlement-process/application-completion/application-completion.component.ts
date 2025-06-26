import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AccordionModule } from '../../../../../../app-core/template/accordion/accordion.module';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { Row, ViewLabel } from '../../../../../../app-core/core-component/core-component.component';
import { entTrustSettlementApplication, entTrustSettlementApplicationNotes, entTrustWithdrawalApplication, entTrustWithdrawalApplicationNotes } from '../../../../../../common/api-services/application-api/application-api.classes';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { ApplicationApiService } from '../../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../../common/services/data/data.service';
@Component({
  selector: 'app-application-completion',
  standalone: true,
  imports: [AccordionModule, FormsModule,InputControlComponent, IconButtonComponent,ViewLabel, Row, AppDatePipe],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
   templateUrl: './application-completion.component.html',
  styleUrl: './application-completion.component.scss'
})
export class ApplicationCompletionComponent {
  @Input() application = new entTrustSettlementApplication();
  @Output() applicationChange = new EventEmitter<any>();
  trustWithdrawalNotes = new entTrustSettlementApplicationNotes();
  
  @Input() type = {
    trustSettlementApplicationId: 0,
    identificationNo: 0,
    trustSettlementApplicationProcessHistoryId: 0,
    applicationStageValue: '',
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

    if (this.application.lstentTrustSettlementApplicationNotes.length !== 0) {
      this.application.lstentTrustSettlementApplicationNotes.forEach((element: any) => {
        if (element.applicationStageValue === 'APPCM' && element.identificationNo === this.type.identificationNo) {
          this.notesMessage = element.notes
        }
      });
    }

  }
  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeTrustSettlementApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
  @ViewChild('notiForm') notiForm!: NgForm;
  saveWithdrawalNotes() {
    this.application.ientTrustSettlementApplicationNotes = this.trustWithdrawalNotes;
    this.application.ientTrustSettlementApplicationNotes.notes = this.notesMessage;
    this.application.ientTrustSettlementApplicationNotes.actionStatusValue = this.application.actionStatusValue
    this.application.ientTrustSettlementApplicationNotes.applicationStageValue = this.application.applicationStageValue
    this.application.ientTrustSettlementApplicationNotes.statusValue = this.application.statusValue
    this.application.ientTrustSettlementApplicationNotes.trustSettlementApplicationId = this.application.trustSettlementApplicationId;
    if (this.notiForm.valid) {
      this.apiService.saveTrustWithdrawalApplicationNotes(this.application).subscribe((success) => {
        if (this.application.lstentTrustSettlementApplicationNotes.length !== 0) {
          this.application.lstentTrustSettlementApplicationNotes.forEach((element: any) => {
            if (element.statusValue === this.application.statusValue && element.identificationNo === this.type.identificationNo) {
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
