import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { entWillApplication, entWillApplicationAssignedOfficerHistory, entWillApplicationNotes } from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { DataService } from '../../../../../common/services/data/data.service';

@Component({
  selector: 'app-complete-will-application',
  standalone: true,
  imports: [InputControlComponent,FormsModule,ViewLabel, AccordionModule, IconButtonComponent,Row, AppDatePipe],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './complete-will-application.component.html',
  styleUrl: './complete-will-application.component.scss'
})
export class CompleteWillApplicationComponent {
  @Input() application = new entWillApplication();
  errorTrue = false
  @Output() applicationChange = new EventEmitter<any>();
  @Input() type = {
    identityNo:0,
    stageValue:'',
    willApplicationId:'',
    willApplicationProcessHistoryId:'',
    isEditable:''
  }
  willApplicationAssignedOfficer = new entWillApplicationAssignedOfficerHistory();
  constructor(public apiService: ApplicationApiService, public data: DataService){}
  assignedOfficerDDL: any = [];
  ngOnInit(): void {
    this.init()
  }
  init(){
    this.application.lstentWillApplicationNotes.forEach((element: any) => {
      if (element.applicationStageValue === 'UPREG' && element.identityNo === this.type.identityNo) {
        this.notesMessage = element.notes
      }
    });
  }
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
    this.willApplicationAssignedOfficer.willApplicationId = this.application.willApplicationId;
    this.application.ientWillApplicationAssignedOfficerHistory = this.willApplicationAssignedOfficer
    this.apiService.reAssignWillApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success;
      this.applicationChange.emit(this.application);
    })
  }
  selfAssignWill() {
    this.willApplicationAssignedOfficer.willApplicationId = this.application.willApplicationId;
    this.apiService.selfAssignWillApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success;
      this.applicationChange.emit(this.application);
    })
  }
  notesMessage = ''
  @ViewChild('notiForm') notiForm!: NgForm;
  willNotes = new entWillApplicationNotes()
  createNotes(){
    
  }

  saveNotes(){
    if(this.notiForm.valid){
      this.willNotes.notes= this.notesMessage;
      this.willNotes.actionStatusValue = this.application.actionStatusValue;
      this.willNotes.applicationStatusValue = this.application.statusValue;
      this.willNotes.applicationStageValue = this.application.applicationStageValue;
      this.willNotes.identityNo = this.type.identityNo;
      this.willNotes.willApplicationId = this.application.willApplicationId
      this.apiService.saveWillApplicationNotesWithoutParent(this.willNotes).subscribe((success)=>{
        this.willNotes = success;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription)
      })
    }
    else{
      this.errorTrue = true
    }
  }
  completeApplicationStage(){
    this.application.isCompleted = 'Y';
    this.application.lstentWillApplicationDocument = [];
    this.apiService.completeWillApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      // this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }
}
