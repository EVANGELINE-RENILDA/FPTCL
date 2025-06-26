import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { entWillApplication, entWillApplicationNotes } from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { AppDatePipe } from "../../../../../common/pipes/app-date/app-date.pipe";
import { ViewPdfComponent } from '../../../../../app-core/template/view-pdf/view-pdf.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';

@Component({
  selector: 'app-open-file',
  standalone: true,
  imports: [AccordionModule, Row, ViewLabel, FormsModule, InputControlComponent, AppDatePipe, IconButtonComponent, CheckboxComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './open-file.component.html',
  styleUrl: './open-file.component.scss'
})
export class OpenFileComponent {
  @Input() application = new entWillApplication();
  @Output() applicationChange = new EventEmitter<any>();
  @Input() type = {
    identityNo: 0,
    stageValue: '',
    willApplicationId: '',
    willApplicationProcessHistoryId: '',
    isEditable: '',
  };
  constructor(public apiService: ApplicationApiService,
    public data: DataService,
    public initialData: InitialDataService, public dialog: CoreService
  ) { }
  notesMessage = ''
  async init() {
    await this.data.checkToken();
    // if (this.application.ientFptclFile.fileId === 0) {
    //   this.createOpenFile()
    // }
    this.getCustomerDDL();
    // this.getAssignOfficerDDL();
    this.application.lstentWillApplicationNotes.forEach((element: any) => {
      if (element.applicationStageValue === 'WONFL' && element.identityNo === this.type.identityNo) {
        this.notesMessage = element.notes
      }
    });
  }
  createOpenFile() {
    this.apiService.createFptclFile().subscribe((success) => {
      // this.application.ientFptclFile = success
    })
  }
  customerDDL: any
  getCustomerDDL() {
    const obj = {
      data: this.application.willApplicationId,
      data1: this.application.applicationStageValue
    }
    this.apiService.getCustomerDDLBasedOnStage(obj).subscribe((success) => {

      this.customerDDL = success.value

    })
  }
  editData = false
  errorTrue = false;
  saveOpenFile() {
    // this.application.ientFptclFile.referenceNo = this.application.leadRefNo;
    // this.application.ientFptclFile.screenName = 'Will Creation'
    this.application.ientFptclFile.customerId = this.application.ientWillApplicationTestator.customerId ;
    this.application.ientFptclFile.referenceNo = this.application.willApplRefNo;
    this.apiService.saveFileForWill(this.application).subscribe((success) => {
      this.application = success;
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      this.editData = false;
      this.applicationChange.emit(this.application);

    })
  }
  editOpenFile() {
    this.editData = true
    // if (this.application.ientFptclFile.fileId === 0) {
    //   this.createOpenFile()
    // }
  }
  refreshOpenFile() {
    const obj = {
      data: this.application.willApplicationId
    }
    this.apiService.openTrustApplicationWithChilds(obj).subscribe((success) => {
      // this.application.ientFptclFile = success.ientFptclFile;
      this.data.successMessage('Data Refeshed Successfully')
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
  clearData() {
    this.apiService.createFptclFile().subscribe((success) => {
      this.application.ientFptclFile = success;
      this.data.successMessage('Data Cleared Successfully')
    })
  }
  onChange(event: any) {
    switch (event.tabTitle) {
      case 'Linked Document':
        this.getListOfLinkedDocument()
        break;
    }
  }
 
  @ViewChild('notiForm') notiForm!: NgForm;
  willNotes = new entWillApplicationNotes()
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
  linkedColumns: any = ['description', 'action'];
  linkedColumnsName: any = ['Document Name', ' Action'];
  tableLinkedData: any = [];
  getListOfLinkedDocument(){
    const obj = {
      data: 'BNDOC'
    }
    this.apiService.getWillLinkedDocuments(obj).subscribe((success)=>{
      this.tableLinkedData = success.lstDDLClass
    })
  }

  viewFile(element: any) {

    let base64Data = element.ientFile.content.split(';base64,').pop();
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: element.ientFile.fileType });

    const url = URL.createObjectURL(blob);
    if (element.ientFile.fileType === 'application/pdf') {
      this.openPDFViewer(url);
    } else if (element.ientFile.fileType.includes('image')) {
      this.imageView(url, element.ientFile.fileName, element);
    }
  }
  openPDFViewer(xurl: any) {
    const dialogRef = this.dialog.openDialog(ViewPdfComponent, {
      width: "100%",
      height: "85%",
      data: {
        url: xurl,
      },
    });
  }
  filePath: any;
  fileName = "";
  imageId: any;
  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;
  imageView(path: any, filename: any, val: any) {

    this.filePath = path;
    this.fileName = filename;
    this.imageId = val
    this.dialog.openDialog(this.Templates, {
      width: '600px',
      height: 'auto'
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
  completeApplicationStage(){
    this.application.isCompleted = 'Y';
    this.application.lstentWillApplicationDocument = [];
    this.apiService.completeWillApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      // this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }

  @ViewChild('x') xForm!: NgForm;
  cancelNotesDescription = '';
  @ViewChild('notesCancelDialog', { static: false })
  notesCancelDialog!: TemplateRef<any>;

  @ViewChild('cancelAlert', { static: false })
  cancelAlert!: TemplateRef<any>;
  async cancelProcess() {
    let dialogResponse: any = await this.dialog.openDialog(this.cancelAlert, {
      height: '170px',
      width: '350px',
      maxWidth: '1170px',
    });
  }
  clearCancelNotes() {
    this.cancelNotesDescription = '';
    this.errorTrue = false;
    this.data.successMessage('Data Cleared Successfully');
  }
  async cancelNotesDialog() {
    // this.createNotes()
    // this.application.statusValue = 'CANCL';
    let dialogResponse: any = await this.dialog.openDialog(
      this.notesCancelDialog,
      {
        height: 'auto',
        width: '800px',
        maxWidth: '1170px',
      }
    );
  }

  cancelApplicationStage() {
    if (this.xForm.valid) {
      this.willNotes.actionStatusValue = this.application.actionStatusValue;
      this.willNotes.applicationStageValue =
        this.application.applicationStageValue;
      this.willNotes.applicationStatusValue = 'WCNLD';
      this.willNotes.willApplicationId = this.application.willApplicationId;
      this.willNotes.identityNo = this.type.identityNo;
      this.willNotes.notes = this.cancelNotesDescription;
      this.application.ientWillApplicationNotes = this.willNotes;
      this.apiService
        .saveWillApplicationNotes(this.application)
        .subscribe((success) => {
          this.application = success;
          this.cancelNotesDescription = success.ientWillApplicationNotes.notes;
          this.applicationChange.emit(this.application);
          this.dialog.closeAll();
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        });
    } else {
      this.errorTrue = true;
    }
  }
  dialogClose() {
    this.data.showErrorMessage = false;
    this.dialog.closeAll();
    this.errorTrue = false;
  }
  downloadLinkedFile(element: any) {
    const obj = {
      data: this.application.willApplicationId,
      data1: element.constant,
    };
    const options = {
      responseType: 'blob',
    };
    debugger;
    this.apiService
      .downLoadWillGeneratedDocuments(obj, options)
      .subscribe((success) => {
        let contentDisposition = success.headers.get('content-disposition');
        console.log(contentDisposition);

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
      });
  }
}
