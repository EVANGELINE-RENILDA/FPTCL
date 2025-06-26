import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Row, InnerScroll } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { FilterAndSortPipe } from '../../../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { DropZoneComponent } from '../../../../../../app-core/template/drop-zone/drop-zone.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../../common/services/app-settings/app-settings.service';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import { DocumentsComponent } from '../../../../../../app-core/template/documents/documents.component';
import { entSalAttachments } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { ViewPdfComponent } from '../../../../../../app-core/template/view-pdf/view-pdf.component';
import { AppSafePipe } from "../../../../../../common/pipes/app-safe/app-safe.pipe";

@Component({
  selector: 'app-advance-receipt-note-attachment',
  standalone: true,
  imports: [InputControlComponent, FormsModule, IconButtonComponent, Row, AppDatePipe, InnerScroll, FilterAndSortPipe, DropZoneComponent, AppSafePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './advance-receipt-note-attachment.component.html',
  styleUrl: './advance-receipt-note-attachment.component.scss'
})
export class AdvanceReceiptNoteAttachmentComponent {
  document!: DocumentsComponent;

  @ViewChild('attachmentDialog', { static: false })
  attachmentDialog!: TemplateRef<any>;

  filterFileName = '';
  @Input() parentData: any;
  @Output() attachmentData = new EventEmitter();
  advanceReceiptNoteAttachments = new entSalAttachments();
  fileType =
    'jpg, jpeg, png, tiff, gif, tif ,pdf, xls, doc, pdf, DOCX, ppt, PPTX, sql, txt, csv';

  options = {
    type: 'accountsPath',
  };

  accept =
    '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword, image/png, image/jpg, image/jpeg , image/webp, image/tiff, image/gif, image/tif, image/';
  type: any;
  constructor(
    public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public appSetting: AppSettingsService,
  ) {

  }
  async createNewAttachment() {
    let dialogResponse: any = await this.dialog.openDialog(
      this.attachmentDialog,
      {
        disableClose: true,
        height: 'atuo',
        width: '100%',
        maxWidth: '1170px',
      }
    );
  }
  downloadAttachment(val: any, type: any) {
    const obj = {
      data: val.salAttachmentsId,
      data1: 'SAL',
    };

    const options = {
      responseType: 'blob',
    };

    this.accountsService
      .loadAttachmentsByteArray(obj, options)
      .subscribe((success: any) => {
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
      });
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

  async uploadAttachemnt(event: any) {
    this.advanceReceiptNoteAttachments.referenceId = this.parentData.salAdvanceReceiptNoteId;
    let attachmentList: any = [];
    attachmentList = event;
    for (let i = 0; i < attachmentList.length; i++) {
      if (attachmentList.length !== 0) {
        this.advanceReceiptNoteAttachments.attachmentSize = attachmentList[i].fileSize;
        this.advanceReceiptNoteAttachments.attachmentFileName =
          attachmentList[i].fileName;
        this.advanceReceiptNoteAttachments.istringFileContent =
          attachmentList[i].content;
        this.advanceReceiptNoteAttachments.attachementType = attachmentList[i].fileType;
        let uploadDocument = await this.uploadDocument();
      }
    }
  }

  uploadDocument() {
    return new Promise((resolve: any) => {
      this.accountsService
        .uploadSalesAdvanceReceiptAttachment(this.advanceReceiptNoteAttachments, this.options)
        .subscribe((success) => {
          this.parentData.lstentSalAttachments =
            success.plstentSalAttachments;

          this.dialog.closeDialog();
          resolve(true);
        });
    });
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
          this.parentData.lstentSalAttachments = success.plstentSalAttachments;
        });
    }
  }
}
