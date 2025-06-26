;
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { AccordionModule } from '../../../../../../app-core/template/accordion/accordion.module';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, ViewLabel } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { DataService } from '../../../../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../../../../common/api-services/application-api/application-api.service';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { entTrustWithdrawalApplication, entTrustWithdrawalApplicationNotes } from '../../../../../../common/api-services/application-api/application-api.classes';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../../app-core/template/app-table/app-table.component';
import { TrustWithdrawalPipePipe } from "../../trust-withdrawal-pipe.pipe";
import { TabSubComponent, TabSubGroupComponent } from '../../../../../../app-core/template/tab/tab1';
@Component({
  selector: 'app-above-threshold',
  standalone: true,
  imports: [AccordionModule, FormsModule, Row, ViewLabel, InputControlComponent, AppDatePipe, IconButtonComponent, AppTableComponent, CellDefDirective, CellHeaderDefDirective, TrustWithdrawalPipePipe, TabSubComponent,TabSubGroupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './above-threshold.component.html',
  styleUrl: './above-threshold.component.scss'
})
export class AboveThresholdComponent {
  @Input() application: any = new entTrustWithdrawalApplication();
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
  constructor(
    public initialData: InitialDataService,
    public apiService: ApplicationApiService,
    public dialog: CoreService,
    public data: DataService) { }

  createNotes() {
    const obj = {
      data1: this.application.actionStatusValue,
      data2: this.application.applicationStageValue,
      data3: this.application.applicationStatusValue
    }
    this.apiService.createTrustWithdrawalApplicationNotes(obj).subscribe((success) => {
      this.trustWithdrawalNotes = success
    })
  }
  errorTrue = false

  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeTrustWithdrawalApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
  actionStatusDDL = [];
  stageDDL = [];
  notesddl = [];
  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  async createTrustWithdrawalNotes(type?: any) {
    const obj = {
      data1: this.application.applicationStatusValue,
      data2: this.application.actionStatusValue,
      data3: this.application.applicationStageValue,
    }
    this.apiService.createTrustWithdrawalApplicationNotes(obj).subscribe(async (success) => {
      this.trustWithdrawalNotes = success;
      this.notesddl = success.iStatusDDL.value;
      this.actionStatusDDL = success.iActionStatusDDL.value;
      this.stageDDL = success.ientDDL.value
      if (type === 'clear') {
        this.data.successMessage('Data Cleared Successfully')
      }
      else {
        let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
          height: 'auto',
          width: '1200px',
          maxWidth: '1170px',
  
        });
      }
    })
  }
  @ViewChild('notesForm') notesForm!: NgForm;
 saveTrustWithdrawalNotes() {
   if(this.notesForm.valid){
    this.trustWithdrawalNotes.identificationNo = this.application.identifierCount;
    this.application.ientTrustWithdrawalApplicationNotes = this.trustWithdrawalNotes;
    this.application.ientTrustWithdrawalApplicationNotes.trustWithdrawalApplicationId = this.application.trustWithdrawalApplicationId;
    this.apiService.saveTrustWithdrawalApplicationNotes(this.application).subscribe((success) => {
      this.application = success
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      this.application.lstentTrustWithdrawalApplicationAssignedOfficerHistory = success.lstentTrustWithdrawalApplicationAssignedOfficerHistory;
      this.applicationChange.emit(this.application);
      this.dialog.closeDialog();
    })
   }
   else{
    this.errorTrue = true
   }
  }
  courtOrderColumns = ['designation', 'assignedToFullname', 'verificationDate', 'actionStatusDescription', 'action'];
  courtOrderColumnsName = ['Designation', 'User Name', 'Verified Date', 'Action Status', 'Action'];
  courtOrderTableData: any;

  onChange(event: any) {
    switch (event.tabTitle) {
      case 'Linked Document':
        this.getListOfLinkedDocument()
        break;
    }
  }

  getListOfLinkedDocument() {
    const obj = {
      data: 0,
      data1: 'APWDA'
    }
    this.apiService.getLinkedWithDrawalDocuments(obj).subscribe((success) => {
      this.tableLinkedData = success.lstDDLClass
    })
  }
    //linked Doc
    linkedColumns: any = ['description', 'action']
    linkedColumnsName: any = ['Document Name', ' Action']
    tableLinkedData: any = []
    downloadLinkedFile(val: any) {
      debugger
      const obj = {
        data: this.application.trustWithdrawalApplicationId,
        data1: val.constant
      }
      const options = {
        responseType: 'blob'
      }
  
      this.apiService.downLoadWithDrawalGeneratedDocuments(obj, options).subscribe((success) => {
        let contentDisposition = success.headers.get('content-disposition');
  
        let filename = contentDisposition
          .split(';')[1]
          .split('filename')[1]
          .split('=')[1]
          .trim();
        const resp = new Blob([success.body], { type: success.body.type });
        const fileURL = URL.createObjectURL(resp);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = filename;
        downloadLink.click();
      })
    }
}
