import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { DocumentsComponent } from '../../../../../app-core/template/documents/documents.component';
import { ErrorMessageComponent } from '../../../../../app-core/message/error-message/error-message.component';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { DataService } from '../../../../../common/services/data/data.service';
import { entActAttachments, entActCustomerDetails } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { FormsModule } from '@angular/forms';
import { FilterAndSortPipe } from '../../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';


@Component({
  selector: 'app-customer-detail-attachment',
  standalone: true,
  imports: [InputControlComponent, AppTableComponent, AppDatePipe, IconButtonComponent, ErrorMessageComponent, DropZoneComponent, CellDefDirective, CellHeaderDefDirective,FormsModule,FilterAndSortPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './customer-detail-attachment.component.html',
  styleUrl: './customer-detail-attachment.component.scss'
})
export class CustomerDetailAttachmentComponent {
  @Input() parentData = new entActCustomerDetails();
  filterFileName = '';
  @Output() attachmentData = new EventEmitter();
  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;
  customer = new entActCustomerDetails();
  @ViewChild('DocumentsComponent', { static: false }) document!: DocumentsComponent;
  attachment: any = ['fileName', 'fileFormat', 'size', 'download', 'action'];
  attachmentsName: any = ['File Name', 'File Format', 'Size', '', ''];
  tableAttachmentData = [];
  loadingTrue = false;
  customerAttachments = new entActAttachments();
  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword';
  constructor(public dialog: CoreService,
    public accountsService: AccountsApiService,
    public data: DataService,
  ) {

  }
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
      data: val.actAttachmentsId,
      data1: "ACT"
    }

    const options = {
      responseType: 'blob'
    }

    this.accountsService.loadAttachmentsByteArray(obj, options).subscribe((success: any) => {

      const resp = new Blob([success.body], { type: success.body.type });
      const fileURL = URL.createObjectURL(resp);
      if (type !== 'down') {

        if (success.body.type === 'application/pdf') {
          this.document.openPDFViewer(fileURL, 'trans');
        } else if (success.body.type.includes('image')) {
          this.document.imageView(fileURL, val.attachmentFileName, 'trans');
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
  async deleteActAttachmentFile(element: any) {
    let msg = "Are You Sure, Want to Delete " + element.attachmentFileName;
    let response = await this.dialog.confirmDialog(msg);
    if (response) {
      const obj = {
        data: element.actAttachmentsId
      }
      this.accountsService.deleteActAttachmentFile(obj).subscribe((success) => {
        this.tableAttachmentData = success.plstentActAttachments;
      })
    }
  }
  async uploadVendorAttachmentFile(event: any) {

    this.customerAttachments.referenceId = this.customer.actCustomerId;
    let attachmentList: any = [];
    attachmentList = event;
    for (let i = 0; i < attachmentList.length; i++) {
      if (attachmentList.length !== 0) {
        this.customerAttachments.attachmentSize = attachmentList[i].fileSize;
        this.customerAttachments.attachmentFileName = attachmentList[i].fileName;
        this.customerAttachments.istringFileContent = attachmentList[i].content;
        this.customerAttachments.attachmentType = attachmentList[i].fileType;
        let uploadDocument = await this.uploadDocument();
      }
    }
  }
  uploadDocument() {
    return new Promise((resolve: any) => {
      this.accountsService
        .uploadCustomerAttachmentFile(this.customerAttachments)
        .subscribe((success) => {
          this.parentData.lstentActAttachments = success.plstentActAttachments;

          // this.initialLoad = false;
          // this.overlay.detachOverlay();
          resolve(true);
        });
    });
  }
  downloadCustomerAttachmentFile(val: any) {
    this.loadingTrue = true;
    const obj = {
      data: val.actAttachmentsId,
    };
    this.data
      .postPDFData('accounts/DownloadCustomerAttachmentFile', obj)
      .subscribe((success) => {

        const resp = new Blob([success], { type: success.type });
        const fileUrl = URL.createObjectURL(resp);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileUrl;
        downloadLink.download = val.attachmentFileName;
        downloadLink.click();
      });
  }
}
