import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { TabComponent, TabGroupComponent } from '../../../../../app-core/template/tab/tab';
import { TabSubComponent, TabSubGroupComponent } from '../../../../../app-core/template/tab/tab1';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { entEstateApplication, entEstateApplicationAssignedOfficerHistory, entEstateApplicationNotes } from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AppDatePipe } from "../../../../../common/pipes/app-date/app-date.pipe";
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';

@Component({
  selector: 'app-notify-deceased-estate-step1',
  standalone: true,
  imports: [AccordionModule, TabGroupComponent, TabSubGroupComponent, TabComponent, 
    TabSubComponent, FormsModule, InputControlComponent, ViewLabel, Row, InnerScroll,
     AppDatePipe, IconButtonComponent, AppTableComponent, CellDefDirective, CellHeaderDefDirective],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './notify-deceased-estate-step1.component.html',
  styleUrl: './notify-deceased-estate-step1.component.scss'
})
export class NotifyDeceasedEstateStep1Component {
  @Input() application = new entEstateApplication();
  @Output() applicationChange = new EventEmitter<any>();
  @Input() type = {
      isEditable: ''
  }
  estateApplicationAssignedOfficer = new entEstateApplicationAssignedOfficerHistory();
  estateApplicationNotes = new entEstateApplicationNotes();
  @ViewChild('x') xForm!: NgForm;
  
  //linked Doc

filePath: any;
fileName = "";
imageId: any
  linkedColumns: any = ['description', 'action']
  linkedColumnsName: any = ['Document Name', ' Action']
  tableLinkedData: any = [];
  notesList = []
  errorTrue  = false
  assignedOfficerDDL:any =[];
  courtOrderColumns = ['designation', 'assignedToFullname', 'verificationDate', 'action'];
  courtOrderColumnsName = ['Designation', 'User Name', 'Verified Date', 'Action'];
  courtOrderTableData: any;
  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  @ViewChild('notesCancelDialog', { static: false })
  notesCancelDialog!: TemplateRef<any>;
  constructor(public apiService: ApplicationApiService, public data: DataService, public dialog: CoreService, public initialData: InitialDataService,){}
  onChange(event:any){

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
  async createNotesDialog() {
    this.createNotes()
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      height: 'auto',
      width: '1200px',
      maxWidth: '1170px',

    });
  }

  saveNotes() {
    this.estateApplicationNotes.estateApplicationId = this.application.estateApplicationId;
    // this.application.notes = this.estateApplicationNotes;
    this.estateApplicationNotes.identificationNo = this.application.identifierCount;
    if (this.xForm.valid) {

      this.apiService.saveEstateApplicationNotes(this.application).subscribe((success: any) => {
        this.notesList = success.lstentEstateApplicationNotes;
        this.application = success
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
    this.data.successMessage('Data Cleared Successfully')
  }
  actionStatusDDL: any = [];
  appStatusDDL: any = []
  createNotes() {
    this.errorTrue = false
    const obj = {
      data1: this.application.statusValue,
      data2: this.application.actionStatusValue,
      data3: this.application.applicationStageValue,
    }
    this.apiService.createEstateApplicationNotes(obj).subscribe((success: any) => {
      this.estateApplicationNotes = success
      this.actionStatusDDL = success.iActionStatusDDL.value
      this.appStatusDDL = success.iStatusDDL.value
    })
  }
  downloadLinkedFile(val: any) {
    const obj = {
      data: this.application.estateApplicationId,
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
  @ViewChild('cancelAlert', { static: false })
  cancelAlert!: TemplateRef<any>;
  async cancelProcess() {
    let dialogResponse: any = await this.dialog.openDialog(this.cancelAlert, {
      height: '170px',
      width: '350px',
      maxWidth: '1170px',

    });
  }
    cancelNotesDescription = ''
  clearCancelNotes() {
    this.cancelNotesDescription = '';
    this.errorTrue = false
    this.data.successMessage('Data Cleared Successfully');
  }
  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeEstateApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
  downloadImageFile() {
    this.downloadFile(this.imageId)
    this.dialog.closeAll()
    if (this.application.applicationStageValue === 'OBDOC') {
    }
  }
  downloadFile(element: any) {
    let base64Data: any = element.ientFile.content.split(';base64,').pop();
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: element.ientFile.fileType });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = element.ientFile.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  dialogClose(){
    this.data.showErrorMessage = false;this.dialog.closeDialog()
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


  editNotify = false;

}
