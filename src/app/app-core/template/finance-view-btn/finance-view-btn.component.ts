import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, output } from '@angular/core';
import { ViewPdfComponent } from '../view-pdf/view-pdf.component';
import { CoreService } from '../../service/core.service';
import { AccountsApiService } from '../../../common/api-services/accounts-api/accounts-api.service';
import { DataService } from '../../../common/services/data/data.service';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { AppSafePipe } from '../../../common/pipes/app-safe/app-safe.pipe';

@Component({
  selector: 'app-finance-view-btn',
  standalone: true,
  imports: [IconButtonComponent, AppSafePipe],
  templateUrl: './finance-view-btn.component.html',
  styleUrl: './finance-view-btn.component.scss'
})
export class FinanceViewBtnComponent {

  __document: any;
  fileName = "";
  fileSize = "";
  filePath: any = '';

  @Input() set document(document: any) {
    this.__document = document;
    this.fileName = this.__document.attachmentFileName;
    this.fileSize = this.__document.attachmentSize;
  }
  get document() {
    return this.__document;
  }

  @Output("deleteDataList") deleteDataList: EventEmitter<any> = new EventEmitter();



  accountsOptions = {
    type: 'accountsPath',
  };

  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;


  @Input() public module = '';
  @Input() public pageAccess = '';
  @Input() public docViewAccess = '';
  @Input() public docDeleteAccess = '';
  @Input() public docDownloadAccess = '';

  constructor(
    public dialog: CoreService,
    public accountsService: AccountsApiService,
    public data: DataService
  ) {

  }

  downloadFile() {
    const obj = {
      data: 50,
      data1: this.module
    }
    this.data.postPDFData('Finance/LoadAttachmentsByteArray', obj, this.accountsOptions).subscribe((success) => {

      const resp = new Blob([success], { type: success.type });
      const fileURL = URL.createObjectURL(resp);
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = this.fileName;
      downloadLink.click();
    })
  }

  viewFile() {
    const obj = {
      data: this.document.actAttachmentsId,
      data1: this.module
    }

    const options = {
      responseType: 'blob'
    }
    this.accountsService.loadAttachmentsByteArray(obj, options).subscribe((success: any) => {

      const resp = new Blob([success], { type: success.body.type });
      const fileURL = URL.createObjectURL(resp);
      window.open(fileURL)
      if (success.body.type === 'application/pdf') {
        this.openPDFViewer(fileURL);
      } else if (success.body.type.includes('image')) {
        this.imageView(fileURL, this.__document.attachmentFileName)
      } else {
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = this.fileName;
        downloadLink.click();
      }
    })
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


  public imageView(path: any, filename: any) {

    this.filePath = path;
    this.fileName = filename;
    this.dialog.openDialog(this.Templates, {
      width: '600px',
      height: 'auto'
    })
  }

  close() {
    this.dialog.closeDialog();
  }

  async deleteActAttachmentFile() {
    let msg = "Are You Sure, Want to Delete " + this.__document.attachmentFileName;
    let response = await this.dialog.confirmDialog(msg);
    if (response) {
      const obj = {
        data: this.__document.actAttachmentsId
      }
      this.accountsService.deleteActAttachmentFile(obj, this.accountsOptions).subscribe((success) => {
        this.deleteDataList.emit(success)
      })
    }
  }

}
