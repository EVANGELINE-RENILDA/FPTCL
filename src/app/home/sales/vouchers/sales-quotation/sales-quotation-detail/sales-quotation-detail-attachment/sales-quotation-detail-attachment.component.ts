import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Row, InnerScroll } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { FilterAndSortPipe } from '../../../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { DocumentsComponent } from '../../../../../../app-core/template/documents/documents.component';
import { DropZoneComponent } from '../../../../../../app-core/template/drop-zone/drop-zone.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { entPurAttachments, entSalAttachments } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { AppSettingsService } from '../../../../../../common/services/app-settings/app-settings.service';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';

@Component({
  selector: 'app-sales-quotation-detail-attachment',
  standalone: true,
  imports: [InputControlComponent, FormsModule, IconButtonComponent, Row, AppDatePipe, InnerScroll,
    DropZoneComponent, FilterAndSortPipe, DocumentsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sales-quotation-detail-attachment.component.html',
  styleUrl: './sales-quotation-detail-attachment.component.scss'
})
export class SalesQuotationDetailAttachmentComponent {

  filterFileName = '';
  @Input() parentData: any;
  @Output() attachmentData = new EventEmitter();

  salesAttachments = new entSalAttachments();

  accountsOptions = {
    type: 'accountsPath',
  };

  fileType = 'jpg, jpeg, png, tiff, gif, tif ,pdf, xls, doc, pdf, DOCX, ppt, PPTX, sql, txt, csv'

  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword, image/png, image/jpg, image/jpeg , image/webp, image/tiff, image/gif, image/tif, image/';


  @ViewChild('attachmentDialog', { static: false })
  attachmentDialog!: TemplateRef<any>;

  @ViewChild('DocumentsComponent', { static: false }) document!: DocumentsComponent;


  constructor(public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public appSetting: AppSettingsService,
  ) { }

  async createNewAttachment() {
    let dialogResponse: any = await this.dialog.openDialog(this.attachmentDialog, {
      disableClose: true,
      height: 'atuo',
      width: '100%',
      maxWidth: '1170px',
    })
  }

  async uploadAttachemnt(event: any) {
    this.salesAttachments.referenceId = this.parentData.salSalesQuotationId;
    let attachmentList: any = [];
    attachmentList = event;
    for (let i = 0; i < attachmentList.length; i++) {
      if (attachmentList.length !== 0) {
        this.salesAttachments.attachmentSize =
          attachmentList[i].fileSize;
        this.salesAttachments.attachmentFileName =
          attachmentList[i].fileName;
        this.salesAttachments.istringFileContent =
          attachmentList[i].content;
        this.salesAttachments.attachementType =
          attachmentList[i].fileType;
        let uploadDocument = await this.uploadDocument();
      }
    }
  }

  uploadDocument() {
    return new Promise((resolve: any) => {
      this.accountsService
        .uploadSalesQuationAttachmentFile(
          this.salesAttachments,
          this.accountsOptions
        )
        .subscribe((success) => {
          this.parentData.plistSalAttachments = success.plstentSalAttachments;
          this.dialog.closeDialog();
          resolve(true);
        });
    });
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

  async deleteAttachment(val: any) {
    let msg = 'Are You Sure, Want to Delete this File';
    let response = await this.dialog.confirmDialog(msg)
    if (response) {
      const obj = {
        data: val.salAttachmentsId
      }
      this.accountsService
        .deleteSalAttachmentFile(obj)
        .subscribe((success) => {
          this.parentData.plistSalAttachments = success.plstentSalAttachments;
        });
    }
  }
}
