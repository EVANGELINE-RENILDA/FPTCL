import {CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild ,} from '@angular/core';
import { entTrustApplication, entTrustApplicationNotes } from '../../../../../common/api-services/application-api/application-api.classes';
import { FormsModule, NgForm } from '@angular/forms';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';

@Component({
  selector: 'app-approval-of-document',
  standalone: true,
  imports: [FormsModule, InputControlComponent,ViewLabel, AppDatePipe,Row, AccordionModule,IconButtonComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,],
  templateUrl: './approval-of-document.component.html',
  styleUrl: './approval-of-document.component.scss'
})
export class ApprovalOfDocumentComponent {
  @Input() application: any = new entTrustApplication();
  @Output() applicationChange = new EventEmitter<any>();
  @Input() type = {
    trustApplicationId: 0,
    trustApplicationIdenityNo: 0,
    trustApplicationRejectHistoryId: 0,
    trustApplicationStageValue: '',
    trustApplicationStepNo: 0,
    isEditable: ''
  };
  @ViewChild('notiForm') notiForm!: NgForm;
  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  
  trustApplicationNotes = new entTrustApplicationNotes();
   notesMessage: any = '';
   errorTrue = false
   ngOnInit(): void {
    this.init()
  }
  constructor(public initialData: InitialDataService,
    public apiService: ApplicationApiService,
    public dialog: CoreService,
    public data: DataService){

  }
  async init(){
    
    if (this.application.lstentTrustApplicationNotes.length !== 0) {
      this.application.lstentTrustApplicationNotes.forEach((element: any) => {
        if (element.applicationStageValue === 'APDTS' && element.identityNo === this.type.trustApplicationIdenityNo) {
          this.notesMessage = element.notes
        }
      });
    }
  }
  saveTrustApplicationNotes() {
    this.trustApplicationNotes.notes = this.notesMessage
    this.application.ientTrustApplicationNotes = this.trustApplicationNotes;
    this.application.ientTrustApplicationNotes.actionStatusValue = this.application.actionStatusValue
    this.application.ientTrustApplicationNotes.applicationStageValue = this.application.applicationStageValue
    this.application.ientTrustApplicationNotes.statusValue = this.application.statusValue
    if (this.notiForm.valid) {

      this.apiService.saveTrustApplicationNoteWithOutParent(this.application).subscribe((success) => {
        this.trustApplicationNotes = success
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeTrustApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
}
