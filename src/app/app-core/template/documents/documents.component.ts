import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppToolTipComponent, Row } from '../../core-component/core-component.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { CoreService } from '../../service/core.service';
import { ViewPdfComponent } from '../view-pdf/view-pdf.component';
import { AppAccessDirective } from '../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../common/permission/button-access.directive';
import { AppDatePipe } from "../../../common/pipes/app-date/app-date.pipe";
@Component({
  selector: 'app-documents',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
  imports: [MatTooltipModule, Row, IconButtonComponent, AppAccessDirective, ButtonAccessDirective, AppToolTipComponent, AppDatePipe]
})
export class DocumentsComponent {

  type = '';
  fileName = "";
  fileSize = "";
  fileFormat = ""
  tempFile: any = {};

  @Input() public accept = "image/png, image/jpg, image/jpeg , image/webp, image/tiff, image/gif, image/tif, image/*,application/pdf";
  @ViewChild("fileInput", { static: false }) fileInput!: ElementRef;
  @ViewChild("nativeFileUpload", { static: false }) nativeFileUpload!: ElementRef;

  __document: any;
  @Input() set document(document: any) {
    this.__document = document; this.fileName = this.__document.ientFile.fileName; this.fileSize = this.__document.ientFile.fileSize; this.fileFormat = this.__document.ientFile.fileExtension;
  }
  get document() { return this.__document; }
  __documentList: any;
  @Input() set documentList(documentList: any) { this.__documentList = documentList }
  get documentList() { return this.__documentList; }

  __btnCondition: any = true;
  @Input() set btnCondition(btnCondition: any) { this.__btnCondition = btnCondition }
  get btnCondition() {


    return this.__btnCondition;
  }


  @Input() public deleteId = 0
  @Input() public pageAccess = ''
  @Input() public docViewAccess = ''
  @Input() public docDeleteAccess = ''
  @Input() public docDownloadAccess = ''
  @Input() public docUploadAccess = ''

  pageId = this.pageAccess

  filePath: any;

  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;


  @Output("onUpload") onUpload: EventEmitter<any> = new EventEmitter();
  @Output("onDelete") onDelete: EventEmitter<any> = new EventEmitter();

  uploadDisabled = false;

  constructor(
    public dialog: CoreService
  ) {

  }

  async loadImageFromDevice(event: any) {

    const files = event.target.files;
    if (files.length > 0) {
      this.uploadDisabled = true;
      let index = 0;
      // for (let index = 0; index < files.length; index++) {
      let fileNameArray = files[index].name.split('.');
      let fileExtension = files[index].type;
      if (fileNameArray.length > 0) {
        fileExtension = fileNameArray[fileNameArray.length - 1];
      }
      this.tempFile = {
        fileId: this.__document?.ientFile.fileId,
        fileName: files[index].name,
        fileSize: files[index].size,
        fileSizeKb: parseInt((files[index].size / 1024).toString()),
        fileType: files[index].type,
        fileExtension: fileExtension,
        content: "",
      };
      this.fileName = files[index].name;
      this.fileSize = files[index].size
      this.fileFormat = fileExtension
      const reader = new FileReader();
      reader.readAsDataURL(files[index]);
      reader.onload = () => {
        const img: any = reader.result;
        this.tempFile.content = img;
        this.uploadDisabled = false;

      };
      reader.onerror = (error) => {

        //  this.general.openMsg('Error has been occured,while selecting the file.', 'danger');
      };


      // }
      this.fileInput.nativeElement.value = "";
    }
  }



  deleteDocument() {
    this.onDelete.emit(this.deleteId);
    this.fileInput.nativeElement.value = '';
  }


  triggerClick() {

    this.nativeFileUpload.nativeElement.click();
  }

  doUpload() {
    if (this.tempFile.fileName && this.tempFile.fileName !== '') {
      this.onUpload.emit(this.tempFile);

    }
  }

  doClearUpload() {
    this.fileInput.nativeElement.value = '';
    this.tempFile = {};
    this.fileName = ''
    this.fileSize = ''
    this.fileFormat = ''
  }

  downloadFile() {
    if (this.type === 'nonTrans') {
      let base64Data = this.__document.ientFile.content.split(';base64,').pop();
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: this.__document.ientFile.fileType });

      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = this.__document.ientFile.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    else {
      const downloadLink = document.createElement('a');
      downloadLink.href = this.filePath;
      downloadLink.download = this.fileName;
      downloadLink.click();
    }
  }

  viewFile() {

    let base64Data = this.__document.ientFile.content.split(';base64,').pop();
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: this.__document.ientFile.fileType });

    const url = URL.createObjectURL(blob);
    if (this.__document.ientFile.fileType === 'application/pdf') {
      this.openPDFViewer(url, 'nonTrans');
    } else if (this.__document.ientFile.fileType.includes('image')) {
      this.imageView(url, this.__document.ientFile.fileName, 'nonTrans');
    }
  }

  openPDFViewer(xurl: any, type?: any) {
    const dialogRef = this.dialog.openDialog(ViewPdfComponent, {
      width: "100%",
      height: "85%",
      data: {
        url: xurl,
      },
    });
  }


  public imageView(path: any, filename: any, type?: any) {
    this.type = type;
    this.filePath = path;
    this.fileName = filename;
    this.dialog.openDialog(this.Templates, {
      width: '600px',
      height: 'auto'
    })
  }

  download(filePath: any) {
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.download = this.fileName;
    downloadLink.click();
  }


  close() {
    this.dialog.closeDialog();
  }

}
