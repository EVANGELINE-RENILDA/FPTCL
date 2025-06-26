import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { FilterAndSortPipe } from '../../../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { entSalAttachments, entSalSalesInvoice } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { ViewPdfComponent } from '../../../../../../app-core/template/view-pdf/view-pdf.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { AppSafePipe } from '../../../../../../common/pipes/app-safe/app-safe.pipe';
import { InnerScroll, Row } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { DropZoneComponent } from '../../../../../../app-core/template/drop-zone/drop-zone.component';

@Component({
  selector: 'app-sales-invoice-attachment',
  standalone: true,
  imports: [FilterAndSortPipe, AppDatePipe,IconButtonComponent,FilterAndSortPipe
    ,AppSafePipe, Row,InnerScroll,InputControlComponent,FormsModule, DropZoneComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sales-invoice-attachment.component.html',
  styleUrl: './sales-invoice-attachment.component.scss'
})
export class SalesInvoiceAttachmentComponent {
//attachment
filterFileName = '';
@Input() salesInvoice = new entSalSalesInvoice();
salesInvoiceRAW = new entSalSalesInvoice();
@Output() salesInvoiceChange = new EventEmitter();
salesAttachments = new entSalAttachments();
@ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;
items: any = ['sNo', 'Sqno', 'item', 'ledger', 'quantity', 'unitPrice', 'dis', 'afterDiscount', 'tax', 'total', 'add'];
fileType ='jpg, jpeg, png, tiff, gif, tif ,pdf, xls, doc, pdf, DOCX, ppt, PPTX, sql, txt, csv';
accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword';

constructor(public dialog: CoreService, public accountsService: AccountsApiService){}
async createNewAttachment() {

  let dialogResponse: any = await this.dialog.openDialog(this.attachmentDialog, {
    disableClose: true,
    height: '300px',
    width: '100%',
    maxWidth: '1170px',
  })
}

downloadAttachment(val: any, type: any) {
  const obj = {
    data: val.salAttachmentsId,
    data1: "SAL"
  }

  const options = {
    responseType: 'blob'
  }

  this.accountsService.loadAttachmentsByteArray(obj, options).subscribe((success: any) => {

    const resp = new Blob([success.body], { type: success.body.type });
    const fileURL = URL.createObjectURL(resp);
    if (type !== 'down') {

      if (success.body.type === 'application/pdf') {
        this.openPDFViewer(fileURL);
      } else if (success.body.type.includes('image')) {
        this.imageView(fileURL, val.attachmentFileName, 'trans');
      } else {
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = val.attachmentFileName;
        downloadLink.click();
      }
    } else {
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = val.attachmentFileName;
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

filePath = ''
fileName = ''
type: any;
@ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;
imageView(path: any, filename: any, type?: any) {
  this.type = type;
  this.filePath = path;
  this.fileName = filename;
  this.dialog.openDialog(this.Templates, {
    width: '600px',
    height: 'auto'
  })
}

downloadImage() {
  const downloadLink = document.createElement('a');
  downloadLink.href = this.filePath;
  downloadLink.download = this.fileName;
  downloadLink.click();
}

private downloadFile(url: string, filename: string) {
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = filename;
  downloadLink.click();
}

async deleteActAttachmentFile(element: any) {
  let msg = "Are You Sure, Want to Delete " + element.attachmentFileName;
  let response = await this.dialog.confirmDialog(msg);
  if (response) {
    const obj = {
      data: element.salAttachmentsId
    }
    this.accountsService.deleteSalAttachmentFile(obj).subscribe((success) => {
      this.salesInvoice.plistSalAttachments = success.plstentSalAttachments;
    })
  }
}
async uploadAttachemnt(event: any) {
  this.salesAttachments.referenceId = this.salesInvoice.salSalesInvoiceId;
  let attachmentList: any = [];
  attachmentList = event;
  for (let i = 0; i < attachmentList.length; i++) {
    if (attachmentList.length !== 0) {
      this.salesAttachments.attachmentSize = attachmentList[i].fileSize;
      this.salesAttachments.attachmentFileName = attachmentList[i].fileName;
      this.salesAttachments.istringFileContent = attachmentList[i].content;
      this.salesAttachments.attachementType = attachmentList[i].fileType;
      let uploadDocument = await this.uploadDocument();
    }
  }
}
uploadDocument() {
  return new Promise((resolve: any) => {
    this.accountsService
      .uploadSalesInvoiceAttachmentFile(this.salesAttachments)
      .subscribe((success) => {

        this.salesInvoice.plistSalAttachments = success.plstentSalAttachments;
        // this.overlayService.detachSearchBox();
        // this.initialLoad = false;
        this.dialog.closeDialog();
        resolve(true);
      });
  });
}
}
