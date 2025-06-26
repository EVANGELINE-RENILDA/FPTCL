import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { FormsModule } from '@angular/forms';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { FileSizePipe } from '../../../../../app-core/template/drop-zone/file-size.pipe';
import { FileTypePipe } from '../../../../../app-core/template/drop-zone/file-type.pipe';
import { CoreService } from '../../../../../app-core/service/core.service';
import { entTrustApplication, entTrustApplicationDocument, entTrustApplicationAssignedOfficer } from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { EstateApplicationPipe } from '../../estate-application.pipe';
import { ViewPdfComponent } from '../../../../../app-core/template/view-pdf/view-pdf.component';
import { AppTableComponent } from '../../../../../app-core/template/app-table/app-table.component';

@Component({
  selector: 'app-provision-claims',
  standalone: true,
  imports: [Row, InputControlComponent, FormsModule, ViewLabel, IconButtonComponent, AccordionModule, DropZoneComponent, FileSizePipe, FileTypePipe, EstateApplicationPipe, AppTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './provision-claims.component.html',
  styleUrl: './provision-claims.component.scss'
})
export class ProvisionClaimsComponent {
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

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }

  constructor(public apiService: ApplicationApiService, public dialog: CoreService, public data: DataService) { }
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

}
