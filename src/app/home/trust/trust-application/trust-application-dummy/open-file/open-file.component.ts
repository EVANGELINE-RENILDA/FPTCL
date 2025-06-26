import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { entTrustApplication, entTrustApplicationAssignedOfficer, entTrustApplicationNotes } from '../../../../../common/api-services/application-api/application-api.classes';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { CoreService } from '../../../../../app-core/service/core.service';

@Component({
  selector: 'app-open-file',
  standalone: true,
  imports: [Row, InputControlComponent, Row, ViewLabel, IconButtonComponent, FormsModule, AccordionModule, AppDatePipe, CheckboxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './open-file.component.html',
  styleUrl: './open-file.component.scss'
})
export class OpenFileComponent {
  // trustApplication = new entTrustApplication();
  //linked Doc
  linkedColumns: any = ['description', 'action']
  linkedColumnsName: any = ['Document Name', ' Action']
  tableLinkedData: any = []
  editData = false
  errorTrue = false;
  @Input() application = new entTrustApplication();
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

  @ViewChild('notiForm') notiForm!: NgForm;
  constructor(public apiService: ApplicationApiService,
    public data: DataService,
    public initialData: InitialDataService, public dialog: CoreService
  ) { }
  ngOnInit(): void {
    this.init()
  }
  notesMessage: any
  async init() {
    await this.data.checkToken();
    if (this.application.ientFptclFile.fileId === 0) {
      this.createOpenFile()
    }
 
    this.getAssignOfficerDDL();
    this.application.lstentTrustApplicationNotes.forEach((element: any) => {
      if (element.applicationStageValue === 'OPNFL' && element.identityNo === this.type.trustApplicationIdenityNo) {
        this.notesMessage = element.notes
      }
    });
  }
  customerDDL: any
  getCustomerDDL() {
    const obj = {
      data: this.application.trustApplicationId,
      data1: 'OPNFL'
    }
    this.apiService.getCustomerDDLBasedOnStage(obj).subscribe((success) => {

      this.customerDDL = success.value

    })
  }
  createOpenFile() {
    this.apiService.createFptclFile().subscribe((success) => {
      this.application.ientFptclFile = success
    })
  }
  clearData() {
    this.apiService.createFptclFile().subscribe((success) => {
      this.application.ientFptclFile = success;
      this.data.successMessage('Data Cleared Successfully')
    })
  }

  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeTrustApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }
  saveTrustApplication() {
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
  clearCourtOrderNotes() {
    this.errorTrue = false
    this.trustApplicationNotes.notes = ''
    this.data.successMessage('Data Cleared Successfully')
  }

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
  refeshData() {

    this.trustApplicationNotes.notes = this.refreshNotesData
  }
  getListOfLinkedDocument() {
    const obj = {
      data: this.application.trustTypeValue,
      data1: this.application.applicationStageValue
    }
    this.apiService.getLinkedDocuments(obj).subscribe((success) => {
      this.tableLinkedData = success.lstDDLClass
    })
  }
  onChange(event: any) {
    switch (event.tabTitle) {
      case 'Linked Document':
        this.getListOfLinkedDocument()
        break;
    }
  }
  downloadLinkedFile(val: any) {
    const obj = {
      data: this.application.trustApplicationId,
      data1: val.constant
    }
    const options = {
      responseType: 'blob'
    }

    this.apiService.downLoadGeneratedDocuments(obj, options).subscribe((success) => {
      const resp = new Blob([success.body], { type: success.body.type });
      const fileURL = URL.createObjectURL(resp);
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = success.fileName;
      downloadLink.click();
    })
  }
  isPhysical(event: any) {

    if (event.target.checked === true) {
      this.application.ientFptclFile.isPhysicalFile = 'Y'
    }
    else {
      this.application.ientFptclFile.isPhysicalFile = 'N'
    }
  }
  saveOpenFile() {
    this.application.ientFptclFile.referenceNo = this.application.trustApplRefNo;
    this.application.ientFptclFile.screenName = 'Trust Creation'
    this.apiService.saveFile(this.application).subscribe((success) => {
      this.application = success;
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      this.editData = false;
      this.applicationChange.emit(this.application);

    })
  }
  editOpenFile() {
    this.editData = true
    this.getCustomerDDL();
    if (this.application.ientFptclFile.fileId === 0) {
      this.createOpenFile()
    }
  }
  refreshOpenFile() {
    const obj = {
      data: this.application.trustApplicationId
    }
    this.apiService.openTrustApplicationWithChilds(obj).subscribe((success) => {
      this.application.ientFptclFile = success.ientFptclFile;
      this.data.successMessage('Data Refeshed Successfully')
    })
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
  @ViewChild('notesCancelDialog', { static: false })
  notesCancelDialog!: TemplateRef<any>;
  @ViewChild('cancelAlert', { static: false })
  cancelAlert!: TemplateRef<any>;
  cancelNotesDescription = ''

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
  async cancelProcess() {
    let dialogResponse: any = await this.dialog.openDialog(this.cancelAlert, {
      height: '170px',
      width: '350px',
      maxWidth: '1170px',

    });
  }
  clearCancelNotes() {
    this.cancelNotesDescription = '';
    this.errorTrue = false
    this.data.successMessage('Data Cleared Successfully');
  }
}
