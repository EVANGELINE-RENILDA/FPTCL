import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { FormsModule, NgForm } from '@angular/forms';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { entFptclAccountNo, entTrustApplication, entTrustApplicationAssignedOfficer, entTrustApplicationNotes } from '../../../../../common/api-services/application-api/application-api.classes';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { AppTableComponent, CellDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { CoreService } from '../../../../../app-core/service/core.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';

@Component({
  selector: 'app-trust-account',
  standalone: true,
  imports: [Row, InputControlComponent, FormsModule, ViewLabel, IconButtonComponent, AccordionModule, AppDatePipe, AppTableComponent, InnerScroll, CellDefDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trust-account.component.html',
  styleUrl: './trust-account.component.scss'
})
export class TrustAccountComponent {
  trustAccountColumn: any = ['customerName', 'accountNo', 'accountTypeDescription', 'bankDescription', 'branchDescription', 'statusDescription', 'action'];
  trustAccountColumnName: any = ['Beneficiary Name', 'Account No', 'Account Type', 'Bank', 'Branch', 'Status', 'Action'];
  trustAccountTableData: any = [];

  @ViewChild('notiForm') notiForm!: NgForm;
  trustApplicationAssignedOfficer = new entTrustApplicationAssignedOfficer()
  trustAccount = new entFptclAccountNo()
  trustApplicationNotes = new entTrustApplicationNotes();
  errorTrue = false
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

  assignedOfficerDDL: any = []
  @ViewChild('l') lForm!: NgForm;
  constructor(public apiService: ApplicationApiService, public data: DataService, public dialog: CoreService, public initialData: InitialDataService) { }
  ngOnInit(): void {
    this.init()
  }
  notesMessage = ''
  async init() {
    await this.data.checkToken();
    this.getCustomerDDL();
    this.getAssignOfficerDDL();
    if(this.trustAccount.bankValue!==''){
      this.getBranchDDL(this.trustAccount.bankValue)
    }
    this.application.lstentTrustApplicationNotes.forEach((element: any) => {
      if (element.applicationStageValue === 'CTSTA' && element.identityNo === this.type.trustApplicationIdenityNo) {
        this.notesMessage = element.notes
      }
    });
  }

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
  saveTrustApplication() {
    this.application.ientTrustApplicationNotes = this.trustApplicationNotes;
    this.application.ientTrustApplicationNotes.notes = this.notesMessage;
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
  saveTrustAccount() {
    // this.trustAccount = this.application.ientFptclAccountNo;
    this.trustAccount.referenceNo = this.application.trustApplRefNo
    this.trustAccount.fileId = 15
    this.apiService.saveFptclAccountNo(this.trustAccount).subscribe((success) => {
      this.application.lstentFptclAccountNo = success.lstentFptclAccountNo;
      this.dialog.closeAll();
      this.applicationChange.emit(this.application);
    })
  }
  clear() {
    this.apiService.createFptclAccountNo().subscribe((success) => {
      this.trustAccount = success;
      this.errorTrue = false;
      this.data.showErrorMessage = false;
      this.data.successMessage('Data Cleared Successfully')
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
  @ViewChild('bankDialog', { static: false })
  bankDialog!: TemplateRef<any>;
  async openDialog() {
    let response: any = await this.dialog.openDialog(this.bankDialog, {
      height: '300px',
      width: '100%',
      maxWidth: '1100px',

    });
  }

  refresh(val:any){
    const obj = {
      data: val
    }
    this.apiService.openFptclAccountNo(obj).subscribe((success) => {
      this.trustAccount = success;
      this.errorTrue = false;
      this.data.showErrorMessage = false;
      this.data.successMessage('Data Refeshed Successfully');
    })
  }

  openTrustAccount(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openFptclAccountNo(obj).subscribe((success) => {
      this.trustAccount = success;
      this.openDialog();
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }
  refreshTrustAccount() {
    this.apiService.openFptclAccountNo(this.trustAccount.accountId).subscribe((success) => {
      this.trustAccount = success;

      this.data.successMessage('Data Refreshed Successfully');
    })
  }
  branchDDL:any 
getBranchDDL(event:any){
  const obj = {
    data:event
  }
  this.apiService.getBranchBasedOnBankDDL(obj).subscribe((success)=>{
    this.branchDDL  = success.value;
  })

}

  createTrustAccount() {
    this.apiService.createFptclAccountNo().subscribe((success) => {
      this.trustAccount = success;
      this.openDialog()
    })
  }
  async checkDelete(val: any) {
    let msg = `Are you sure, You want to delete ${val.accountNo} ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      const obj = {
        data: val.accountId
      }
      this.apiService.deleteFptclAccountNo(obj).subscribe((success) => {
        this.application.lstentFptclAccountNo = success.lstentFptclAccountNo;
        this.applicationChange.emit(this.application);
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);

      })
    }
  }
  customerDDL: any
  getCustomerDDL() {
    const obj = {
      data: this.application.trustApplicationId,
      data1: 'CTSTA'
    }
    this.apiService.getCustomerDDLBasedOnStage(obj).subscribe((success) => {

      this.customerDDL = success.value

    })
  }
}
