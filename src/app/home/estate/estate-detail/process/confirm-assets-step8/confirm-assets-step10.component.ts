import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { TabSubComponent, TabSubGroupComponent } from '../../../../../app-core/template/tab/tab1';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { entEstateApplication, entEstateApplicationAssignedOfficerHistory, entEstateApplicationDocument, entEstateApplicationNotes } from '../../../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { FileSizePipe } from "../../../../../app-core/template/drop-zone/file-size.pipe";
import { ViewPdfComponent } from '../../../../../app-core/template/view-pdf/view-pdf.component';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';

@Component({
  selector: 'app-confirm-assets-step10',
  standalone: true,
  imports: [FormsModule, AccordionModule, InputControlComponent, ViewLabel, 
    InnerScroll, Row, TabSubComponent, TabSubGroupComponent, FileSizePipe,CheckboxComponent,
     DropZoneComponent, CellDefDirective,CellHeaderDefDirective, AppTableComponent, IconButtonComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './confirm-assets-step10.component.html',
  styleUrl: './confirm-assets-step10.component.scss'
})
export class ConfirmAssetsStep10Component {
  @Input() application = new entEstateApplication();
  @Output() applicationChange = new EventEmitter<any>();
  @Input() type = {
    isEditable : ''
  }
  documentArray: any = [];
  tableLinkedData: any = [];
  estateApplicationDocument = new entEstateApplicationDocument()
  estateApplicationAssignedOfficer = new entEstateApplicationAssignedOfficerHistory()
  accept: any
  fileExtension = "jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv";
  loading = false;
  //dialogBox
  @ViewChild('realPropertyInfo', { static: false })
  realPropertyInfo!: TemplateRef<any>;
  //clientDoc
  clientDocumentColumns: any = ['documentTypeDescription', 'fileName', 'fileExtension', 'fileSize', 'action']
  clientDocumentColumnsName: any = ['Document Name', 'File Name', 'Format', 'Size', 'Action']
  docNameType: any

  //realProperties
  realPropertiesColumns: any = ['tit', 'name', 'date', 'file', 'loc', 'currOccu'];
  realPropertiesColumnsName: any = ['Title No', 'Name Of Estate', 'Inspection Date', 'File No', 'Location', 'Current Occupier']
  realPropertiesTableData: any = [{
    'tit': '23456', 'name': 'Shivan', 'date': '15 Aug 2023', 'file': '345/15', 'loc': 'Suva', 'currOccu': 'Methila'
  }]

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }

  constructor(
    public initialData: InitialDataService,
    public apiService: ApplicationApiService,
    public dialog: CoreService,
    public data: DataService) {

  }
  documentTypeDDLdata() {
    const obj = {
      // data: this.application.estatety,
      data1: this.application.applicationStageValue
    }
    this.apiService.getListofDocumentsByTrustType(obj).subscribe((success: any) => {
      this.documentArray = success.value;
    })
  }
  getListOfLinkedDocument() {
    const obj = {
      // data: this.application.trustTypeValue,
      data1: this.application.applicationStageValue
    }
    this.apiService.getLinkedDocuments(obj).subscribe((success) => {
      this.tableLinkedData = success.lstDDLClass
    })
  }
  documentTypeDatas(event: any) {
    const obj = {
      data: event
    }
    this.apiService.createTrustApplicationDocument(obj).subscribe((success: any) => {
      this.estateApplicationDocument = success
    })
  }
  uploadClientDocumentAttachment(event: any) {
    console.log(event[0]);
    this.estateApplicationDocument.estateApplicationId = this.application.estateApplicationId;
    this.estateApplicationDocument.ientFile.fileName = event[0].fileName
    this.estateApplicationDocument.ientFile.fileSize = event[0].fileSize
    this.estateApplicationDocument.ientFile.content = event[0].content;
    this.estateApplicationDocument.ientFile.fileExtension = event[0].fileType
    this.estateApplicationDocument.ientFile.content = event[0].content;
   
    this.estateApplicationDocument.applicationStageValue = this.application.applicationStageValue;
    this.estateApplicationDocument.identificationNo = this.application.identifierCount
    if (this.estateApplicationDocument.documentTypeValue !== '') {
      // this.application.lstentTrustApplicationDocument = []
      this.apiService.saveTrustApplicationDocument(this.estateApplicationDocument).subscribe((success: any) => {
        // this.application.ls = success.lstentTrustApplicationDocument;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.data.errorInfoMessage('Select Document Type')
    }
  }
  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeTrustApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      // this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }

  assignedOfficerDDL: any = []
  getAssignOfficerDDL() {
    const obj = {
      data1: this.application.estateApplicationId,
      data2: this.application.actionStatusValue,
      data3: this.application.applicationStageValue
    }
    this.apiService.getListOfOfficerTrustApplication(obj).subscribe((success: any) => {
      this.assignedOfficerDDL = success.value
    })
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
  imageId: any
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
  async checkDocumentDelete(docId: any) {
    let msg = `Are you sure, You want to delete : ${docId.documentTypeDescription} ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      const obj = {
        data: docId.trustApplicationDocumentId
      }
      this.apiService.deleteTrustApplicationDocument(obj).subscribe((success: any) => {
        // this.application.lstentTrustApplicationDocument = [];
        // this.application.lstentTrustApplicationDocument = success.lstentTrustApplicationDocument
        // success.lstentTrustApplicationDocument.forEach((element: any) => {
        //   if (element.ientFile.fileName !== '') {
        //     this.application.lstentTrustApplicationDocument.push(element)
        //   }
        //   console.log(this.application.lstentTrustApplicationDocument, 'check');

        // });
        // // this.documentType()
        // this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
  }

  async createAssetsDialog() {
    let dialogResponse: any = await this.dialog.openDialog(this.realPropertyInfo, {
      height: '400px',
      width: '100%',
      maxWidth: '1170px',

    });
  }
}
