import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../../common/services/app-settings/app-settings.service';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import { DocumentsComponent } from '../../../../../../app-core/template/documents/documents.component';
import { entPurAttachments } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { FormsModule } from '@angular/forms';
import { Row, InnerScroll } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { FilterAndSortPipe } from '../../../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { DropZoneComponent } from '../../../../../../app-core/template/drop-zone/drop-zone.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';

@Component({
  selector: 'app-debit-note-detail-attachment',
  standalone: true,
  imports: [InputControlComponent, FormsModule, IconButtonComponent, Row, AppDatePipe, InnerScroll, DropZoneComponent, FilterAndSortPipe, DocumentsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './debit-note-detail-attachment.component.html',
  styleUrl: './debit-note-detail-attachment.component.scss',
})
export class DebitNoteDetailAttachmentComponent {
  filterFileName = '';
  @Input() parentData: any;
  @Output() attachmentData = new EventEmitter();

  debitNoteAttachments = new entPurAttachments();

  accountsOptions = {
    type: 'accountsPath',
  };

  fileType =
    'jpg, jpeg, png, tiff, gif, tif ,pdf, xls, doc, pdf, DOCX, ppt, PPTX, sql, txt, csv';

  accept =
    '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword, image/png, image/jpg, image/jpeg , image/webp, image/tiff, image/gif, image/tif, image/';

  @ViewChild('attachmentDialog', { static: false })
  attachmentDialog!: TemplateRef<any>;

  @ViewChild('DocumentsComponent', { static: false })
  document!: DocumentsComponent;

  constructor(
    public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public appSetting: AppSettingsService
  ) { }

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

  async uploadAttachemnt(event: any) {
    this.debitNoteAttachments.referenceId =
      this.parentData.purPurchaseOrderId;
    let attachmentList: any = [];
    attachmentList = event;
    for (let i = 0; i < attachmentList.length; i++) {
      if (attachmentList.length !== 0) {
        this.debitNoteAttachments.attachmentSize =
          attachmentList[i].fileSize;
        this.debitNoteAttachments.attachmentFileName =
          attachmentList[i].fileName;
        this.debitNoteAttachments.istringFileContent =
          attachmentList[i].content;
        this.debitNoteAttachments.attachementType =
          attachmentList[i].fileType;
        let uploadDocument = await this.uploadDocument();
      }
    }
  }

  uploadDocument() {
    return new Promise((resolve: any) => {
      this.accountsService
        .uploadDebitNoteAttachment(this.debitNoteAttachments)
        .subscribe((success) => {
          this.parentData.ilistentPurAttachments = success.plstentPurAttachments;
          this.dialog.closeDialog();
          resolve(true);
        });
    });
  }

  downloadAttachment(val: any, type: any) {
    const obj = {
      data: val.purAttachmentsId,
      data1: 'PUR',
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
          ;
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
      });
  }
}
