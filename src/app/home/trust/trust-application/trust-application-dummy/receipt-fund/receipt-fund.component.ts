import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { entTrustApplication, entTrustApplicationAssignedOfficer, entTrustApplicationNotes } from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DataService } from '../../../../../common/services/data/data.service';

@Component({
  selector: 'app-receipt-fund',
  standalone: true,
  imports: [Row, InputControlComponent, FormsModule, ViewLabel, IconButtonComponent,
     AccordionModule, AppDatePipe, AppTableComponent, CellDefDirective, CellHeaderDefDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './receipt-fund.component.html',
  styleUrl: './receipt-fund.component.scss'
})
export class ReceiptFundComponent {
  @Input() application: any = new entTrustApplication();
  @Output() applicationChange = new EventEmitter<any>();
  trustApplicationAssignedOfficer = new entTrustApplicationAssignedOfficer();
  trustApplicationNotes = new entTrustApplicationNotes();
  refreshNotesData = this.application.ientTrustApplicationNotes.notes;
  @Input() type = {
    trustApplicationId: 0,
    trustApplicationIdenityNo: 0,
    trustApplicationRejectHistoryId: 0,
    trustApplicationStageValue: '',
    trustApplicationStepNo: 0,
    isEditable: ''
  };
  @ViewChild('cancelAlert', { static: false })
  cancelAlert!: TemplateRef<any>;
  receiptFundColumns: any = ['documemtDate', 'reference', 'source', 'transaction', 'narrative','moneyIn','moneyOut'];
  receiptFundColumnsName: any = ["Date", "Refrence", "Source", "Transaction","Narration", "Money In", "Money Out"];
  receiptFundTableData: any = [];

  assignedOfficerDDL: any = []
  ngOnInit(): void {
    this.init()
  }
  notesMessage = ''
  async init() {
    debugger
    this.getAssignOfficerDDL();

    this.application.lstentTrustApplicationNotes.forEach((element: any) => {
      if (element.applicationStageValue === 'RPTFN' && element.identityNo === this.type.trustApplicationIdenityNo) {
        this.notesMessage = element.notes
      }
    });
  }
  accountNo = ''
  getAccNo(val:any){
    const obj = {
      data: val
    }
    this.apiService.getTransactionDetailsByAccountNo(obj).subscribe((success)=>{
     this.receiptFundTableData = success.lstentTrasactionDetail
      
    })
  }

  constructor(public apiService: ApplicationApiService, public dialog : CoreService, public data: DataService) { }
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
    this.trustApplicationAssignedOfficer.trustApplicationId = this.application.trustApplicationId;
    this.application.ientTrustApplicationAssignedOfficer = this.trustApplicationAssignedOfficer
    this.apiService.reAssignTrustApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success
    })
  }
  selfAssignTrust() {
    this.trustApplicationAssignedOfficer.trustApplicationId = this.application.trustApplicationId
    this.application.ientTrustApplicationAssignedOfficer = this.trustApplicationAssignedOfficer
    this.apiService.selfAssignTrustApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success
    })
  }
  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeTrustApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      // this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }
  async cancelProcess() {
    let dialogResponse: any = await this.dialog.openDialog(this.cancelAlert, {
      height: '170px',
      width: '350px',
      maxWidth: '1170px',

    });
  }
  createNotes() {
    const obj = {
      data1: this.application.statusValue,
      data2: this.application.actionStatusValue,
      data3: this.application.applicationStageValue,
    }
    this.apiService.createTrustApplicationNotes(obj).subscribe((success) => {
      this.trustApplicationNotes = success;
    })
  }
  async cancelNotesDialog() {
    this.createNotes()
    // this.application.applicationStatusValue = 'CANCD';
    let dialogResponse: any = await this.dialog.openDialog(this.notesCancelDialog, {
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',

    });
  }
  errorTrue = false;
  @ViewChild('notesCancelDialog', { static: false })
  notesCancelDialog!: TemplateRef<any>;

  cancelNotesDescription = ''
  clearCancelNotes() {
    this.cancelNotesDescription = '';
    this.errorTrue = false
    this.data.successMessage('Data Cleared Successfully');
  }
  @ViewChild('g') gForm!: NgForm;
  cancelApplicationStage() {
    this.application.statusValue = 'CNCLD'
    if (this.gForm.valid) {
      this.apiService.saveTrustApplicationNotes(this.application).subscribe((success) => {
        this.application = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }

}
