import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { AccordionModule } from '../../../../../../app-core/template/accordion/accordion.module';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, ViewLabel } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../../../app-core/template/checkbox/checkbox.component';
import { AppDatePipe } from "../../../../../../common/pipes/app-date/app-date.pipe";

import { entListTrustSettlementApplicationChecklist, entTrustSettlementApplication, entTrustSettlementApplicationNotes, entTrustSettlementAssignedOfficerHistory } from '../../../../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../../../common/api-services/application-api/application-api.service';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { DataService } from '../../../../../../common/services/data/data.service';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { TrustSettlementPipe } from '../../trust-settlement.pipe';

@Component({
  selector: 'app-approval-of-statement',
  standalone: true,
  imports: [AccordionModule, FormsModule, ViewLabel, InputControlComponent, Row, AppTableComponent, CellDefDirective, CellHeaderDefDirective, CheckboxComponent, AppDatePipe, TrustSettlementPipe, IconButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './approval-of-statement.component.html',
  styleUrl: './approval-of-statement.component.scss'
})
export class ApprovalOfStatementComponent {
  //

  courtOrderColumns = ['designation', 'assignedToFullname', 'verificationDate','actionStatusDescription', 'action'];
  courtOrderColumnsName = ['Designation', 'User Name', 'Verified Date','Action Status', 'Action'];
  courtOrderTableData: any;
  @ViewChild('notiForm') notiForm!: NgForm;
  @ViewChild('x') xForm!: NgForm;
  @Input() application = new entTrustSettlementApplication();
  @Output() applicationChange = new EventEmitter<any>();
  trustSettlementAssignedOfficer = new entTrustSettlementAssignedOfficerHistory()
  @Input() type = {
    trustSettlementApplicationId: 0,
    identificationNo: 0,
    trustSettlementApplicationProcessHistoryId: 0,
    trustSettlementApplicationStageValue: '',
    isEditable: '',
    trustSettlementStepNo: 0
  };
  async createNotesDialog() {
    this.createNotes()
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      height: 'auto',
      width: '1200px',
      maxWidth: '1170px',

    });
  }
  actionStatusDDL: any = [];
  errorTrue = false
  appStatusDDL: any = []
  constructor(public initialData: InitialDataService,
    public apiService: ApplicationApiService,
    public dialog: CoreService,
    public data: DataService) { }
  createNotes() {
    this.errorTrue = false
    const obj = {
      data1: this.application.statusValue,
      data2: this.application.actionStatusValue,
      data3: this.application.applicationStageValue,
    }
    this.apiService.createTrustSettlementApplicationNotes(obj).subscribe((success: any) => {
      this.trustSettlementNotes = success
      this.actionStatusDDL = success.iActionStatusDDL.value
      this.appStatusDDL = success.iStatusDDL.value
    })
  }
  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;


  dialogClose() {
    this.dialog.closeAll();
  }
  notesMessage = ''


  checkListChange(event: any, val: any) {
    debugger
    if (event.target.checked === true) {
      val.isChecked = 'Y'
    }
    else {
      val.isChecked = 'N'
    }
  }
  checkLists = new entListTrustSettlementApplicationChecklist()
  saveCheckList() {
    this.checkLists.lstentTrustSettlementApplicationChecklist = this.application.lstentTrustSettlementApplicationChecklist;
    this.checkLists.ientTrustSettlementApplicationChecklist.trustSettlementApplicationId = this.application.trustSettlementApplicationId
    this.apiService.saveTrustSettlementApplicationChecklist(this.checkLists).subscribe((success) => {
      this.application.lstentTrustSettlementApplicationChecklist = success.lstentTrustSettlementApplicationChecklist
    })
  }
  trustSettlementNotes = new entTrustSettlementApplicationNotes()
  notesList: any
  saveNotes() {
    this.application.ientTrustSettlementApplicationNotes = this.trustSettlementNotes;
    this.application.ientTrustSettlementApplicationNotes.notes = this.notesMessage;
    this.application.ientTrustSettlementApplicationNotes.trustSettlementApplicationId = this.application.trustSettlementApplicationId;
    if (this.xForm.valid) {

      this.apiService.saveTrustSettlementApplicationNotes(this.application).subscribe((success: any) => {
        this.application = success
        this.notesList = success.lstentTrustApplicationNotes;
        console.log(this.notesList);
        this.dialog.closeDialog();
        this.applicationChange.emit(this.application);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  clearNotes() {
    this.createNotes();
    this.notesMessage = '';
    this.data.successMessage('Data Cleared Successfully')
  }
  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeTrustSettlementApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
}
