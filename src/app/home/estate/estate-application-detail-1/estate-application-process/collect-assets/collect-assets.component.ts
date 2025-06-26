import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { entTrustApplication, entTrustApplicationAssignedOfficer, entTrustApplicationDocument } from '../../../../../common/api-services/application-api/application-api.classes';
import { ViewPdfComponent } from '../../../../../app-core/template/view-pdf/view-pdf.component';
import { FormsModule } from '@angular/forms';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { FileSizePipe } from '../../../../../app-core/template/drop-zone/file-size.pipe';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { TabSubComponent, TabSubGroupComponent } from '../../../../../app-core/template/tab/tab1';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { EstateApplicationPipe } from '../../estate-application.pipe';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';

@Component({
  selector: 'app-collect-assets',
  standalone: true,
  imports: [Row, InputControlComponent, FormsModule, ViewLabel, IconButtonComponent, AccordionModule, AppDatePipe, AppTableComponent, CellDefDirective, CellHeaderDefDirective, EstateApplicationPipe, FileSizePipe, DropZoneComponent, TabSubComponent, TabSubGroupComponent, CheckboxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './collect-assets.component.html',
  styleUrl: './collect-assets.component.scss'
})
export class CollectAssetsComponent {
  @Input() application: any = new entTrustApplication();
  @Output() applicationChange = new EventEmitter<any>();
  documentArray: any = [];
  tableLinkedData: any = [];
  estateApplicationDocument = new entTrustApplicationDocument()
  estateApplicationAssignedOfficer = new entTrustApplicationAssignedOfficer()
  accept: any
  fileExtension = "jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv";
  loading = false;
  @Input() type = {
    trustApplicationId: 0,
    trustApplicationIdenityNo: 0,
    trustApplicationRejectHistoryId: 0,
    trustApplicationStageValue: '',
    isEditable: '',
    trustApplicationStepNo: 0
  };
  //clientDoc
  clientDocumentColumns: any = ['documentTypeDescription', 'fileName', 'fileExtension', 'fileSize', 'action']
  clientDocumentColumnsName: any = ['Document Name', 'File Name', 'Format', 'Size', 'Action']
  docNameType: any

  //bank
  bankColumns: any = ['acNo', 'holder', 'isClose', 'closeDate'];
  bankColumnsName: any = ['Account No', 'Account Holder Name', 'Is Closed', 'Closed Date']
  bankTableData: any = [{
    'acNo': 23456775409, 'holder': 'Joe', 'isClose': 'Yes', 'closeDate': '15 Jul 2024'
  }]

  //investment
  investmentColumns: any = ['cmpy', 'share', 'sell', 'transfer', 'utof'];
  investmentColumnsName: any = ['Company Name', 'Share No', 'Is Sell', 'Is Transfer', 'Is UTOF'];
  investmentTableData: any = [{
    'cmpy': 'BSP', 'share': 45671 / 52,
  }];


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
  ngOnInit(): void {
    this.init()
  }
  async init() {
    // this.getAssignOfficerDDL()
    // this.documentTypeDDLdata()
    // this.getListOfLinkedDocument()
  }
  onChange(event: any) {
    switch (event.tabTitle) {

    }
  }
  documentTypeDDLdata() {
    const obj = {
      data: this.application.trustTypeValue,
      data1: this.application.applicationStageValue
    }
    this.apiService.getListofDocumentsByTrustType(obj).subscribe((success: any) => {
      this.documentArray = success.value;
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
    this.estateApplicationDocument.trustApplicationId = this.application.trustApplicationId;
    this.estateApplicationDocument.ientFile.fileName = event[0].fileName
    this.estateApplicationDocument.ientFile.fileSize = event[0].fileSize
    this.estateApplicationDocument.ientFile.content = event[0].content;
    this.estateApplicationDocument.ientFile.fileExtension = event[0].fileType
    this.estateApplicationDocument.ientFile.content = event[0].content;
    this.estateApplicationDocument.trustTypeValue = this.application.trustTypeValue;
    this.estateApplicationDocument.applicationStageValue = this.application.applicationStageValue;
    this.estateApplicationDocument.identityNo = this.application.identifierCount
    if (this.estateApplicationDocument.documentTypeValue !== '') {
      // this.application.lstentTrustApplicationDocument = []
      this.apiService.saveTrustApplicationDocument(this.estateApplicationDocument).subscribe((success: any) => {
        this.application.lstentTrustApplicationDocument = success.lstentTrustApplicationDocument;
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
  getListOfLinkedDocument() {
    const obj = {
      data: this.application.trustTypeValue,
      data1: this.application.applicationStageValue
    }
    this.apiService.getLinkedDocuments(obj).subscribe((success) => {
      this.tableLinkedData = success.lstDDLClass
    })
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
    this.estateApplicationAssignedOfficer.trustApplicationId = this.application.trustApplicationId;
    this.application.ientTrustApplicationAssignedOfficer = this.estateApplicationAssignedOfficer
    this.apiService.reAssignTrustApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success
    })
  }
  selfAssignTrust() {
    this.estateApplicationAssignedOfficer.trustApplicationId = this.application.trustApplicationId
    this.apiService.selfAssignTrustApplicationAssignedHistory(this.estateApplicationAssignedOfficer).subscribe((success: any) => {
      this.application = success
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
        this.application.lstentTrustApplicationDocument = [];
        // this.application.lstentTrustApplicationDocument = success.lstentTrustApplicationDocument
        success.lstentTrustApplicationDocument.forEach((element: any) => {
          if (element.ientFile.fileName !== '') {
            this.application.lstentTrustApplicationDocument.push(element)
          }
          console.log(this.application.lstentTrustApplicationDocument, 'check');

        });
        // this.documentType()
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
  }
}
