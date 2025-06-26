import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, ViewLabel, InnerScroll } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { AppTableComponent, CellDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { entEstateApplication, entEstateApplicationAssignedOfficerHistory, entEstateApplicationNotes, entFptclAccountNo } from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';

@Component({
  selector: 'app-open-account-step6',
  standalone: true,
  imports: [Row, InputControlComponent, FormsModule, ViewLabel, IconButtonComponent, AccordionModule, AppDatePipe, AppTableComponent, InnerScroll, CellDefDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './open-account-step6.component.html',
  styleUrl: './open-account-step6.component.scss'
})
export class OpenAccountStep6Component {
  @Input() application = new entEstateApplication();
  @Output() applicationChange = new EventEmitter<any>();
  @Input() type = {
    isEditable : ''
  }
  estateApplicationAssignedOfficer = new entEstateApplicationAssignedOfficerHistory();
  estateApplicationNotes = new entEstateApplicationNotes();
  trustAccountColumn: any = ['customerName', 'accountNo', 'accountTypeDescription', 'bankDescription', 'branchDescription', 'statusDescription', 'action'];
  trustAccountColumnName: any = ['Beneficiary Name', 'Account No', 'Account Type', 'Bank', 'Branch', 'Status', 'Action'];
  trustAccountTableData: any = [];
  errorTrue = false
  trustAccount = new entFptclAccountNo()
  constructor(public apiService: ApplicationApiService, public data : DataService, public dialog : CoreService, public initialData: InitialDataService){}
  notesMessage = ''
  async init() {
    await this.data.checkToken();
    this.getCustomerDDL();
    this.getAssignOfficerDDL();
    if(this.trustAccount.bankValue!==''){
      this.getBranchDDL(this.trustAccount.bankValue)
    }
    // this.application.lstentTrustApplicationNotes.forEach((element: any) => {
    //   if (element.applicationStageValue === 'CTSTA' && element.identityNo === this.type.trustApplicationIdenityNo) {
    //     this.notesMessage = element.notes
    //   }
    // });
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
  customerDDL: any
  getCustomerDDL() {
    const obj = {
      data: this.application.estateApplicationId,
      data1: 'CTSTA'
    }
    this.apiService.getCustomerDDLBasedOnStage(obj).subscribe((success) => {

      this.customerDDL = success.value

    })
  }
   //assigned
   assignedOfficerDDL:any =[];
   getAssignOfficerDDL() {
    const obj = {
      data1: this.application.estateApplicationId,
      data2: this.application.actionStatusValue,
      data3: this.application.applicationStageValue
    }
    // this.apiService.getListOfOfficerTrustApplication(obj).subscribe((success: any) => {
    //   this.assignedOfficerDDL = success.value
    // })
  }
   reAssignEstate() {
     this.estateApplicationAssignedOfficer.estateApplicationId = this.application.estateApplicationId;
     this.application.ientEstateApplicationAssignedOfficerHistory = this.estateApplicationAssignedOfficer
     this.apiService.reAssignEstateApplicationAssignedHistory(this.application).subscribe((success: any) => {
       this.application = success;
       this.applicationChange.emit(this.application);
     })
   }
   selfAssignEstate() {
     this.estateApplicationAssignedOfficer.estateApplicationId = this.application.estateApplicationId
     this.application.ientEstateApplicationAssignedOfficerHistory = this.estateApplicationAssignedOfficer
     this.apiService.selfAssignEstateApplicationAssignedHistory(this.application).subscribe((success: any) => {
       this.application = success;
       this.applicationChange.emit(this.application);
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
  @ViewChild('bankDialog', { static: false })
  bankDialog!: TemplateRef<any>;
  async openDialog() {
    let response: any = await this.dialog.openDialog(this.bankDialog, {
      height: '300px',
      width: '100%',
      maxWidth: '1100px',

    });
  }
  async checkDelete(val: any) {
    let msg = `Are you sure, You want to delete ${val.accountNo} ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      const obj = {
        data: val.accountId
      }
      this.apiService.deleteFptclAccountNo(obj).subscribe((success) => {
        // this.application.lstentFptclAccountNo = success.lstentFptclAccountNo;
        this.applicationChange.emit(this.application);
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);

      })
    }
  }
  createTrustAccount() {
    this.apiService.createFptclAccountNo().subscribe((success) => {
      this.trustAccount = success;
      this.openDialog()
    })
  }


    @ViewChild('notiForm') notiForm!: NgForm;
    saveNotes() {
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
      this.apiService.completeEstateApplicationStage(this.application).subscribe((success) => {
        this.application = success;
        this.applicationChange.emit(this.application);
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    saveTrustAccount() {
      // this.trustAccount = this.application.ientFptclAccountNo;
      this.trustAccount.referenceNo = this.application.estateApplicationRefNo
      this.trustAccount.fileId = 15
      this.apiService.saveFptclAccountNo(this.trustAccount).subscribe((success) => {
        // this.application.lstentFptclAccountNo = success.lstentFptclAccountNo;
        this.dialog.closeAll();
        this.applicationChange.emit(this.application);
      })
    }
    clear() {
  
    }   
}
