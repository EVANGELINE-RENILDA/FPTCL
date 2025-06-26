import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../../common/services/app-settings/app-settings.service';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import { entPurAttachments } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { FormsModule } from '@angular/forms';
import { Row, InnerScroll } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { DropZoneComponent } from '../../../../../../app-core/template/drop-zone/drop-zone.component';
import { FilterAndSortPipe } from '../../../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { DocumentsComponent } from '../../../../../../app-core/template/documents/documents.component';
import { AppAccessDirective } from '../../../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../../../common/permission/button-access.directive';

@Component({
  selector: 'app-purchase-invoice-attachment',
  standalone: true,
  imports: [InputControlComponent, FormsModule, IconButtonComponent, Row, AppDatePipe, InnerScroll, DropZoneComponent,FilterAndSortPipe, DocumentsComponent,AppAccessDirective, ButtonAccessDirective,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './purchase-invoice-attachment.component.html',
  styleUrl: './purchase-invoice-attachment.component.scss'
})
export class PurchaseInvoiceAttachmentComponent {
  pageId = 'PUISC';
  filterFileName = '';
  @Input() parentData: any;
  @Output() attachmentData = new EventEmitter();

  purchaseInvoiceAttachments = new entPurAttachments();

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
              ){}

  async createNewAttachment() {
    let dialogResponse: any = await this.dialog.openDialog(this.attachmentDialog, {
      disableClose: true,
      height: 'atuo',
      width: '100%',
      maxWidth: '1170px',
    })
  }

  async uploadAttachemnt(event: any) {
    this.purchaseInvoiceAttachments.referenceId = this.parentData.purPurchaseInvoiceId;
    let attachmentList: any = [];
    attachmentList = event;
    for (let i = 0; i < attachmentList.length; i++) {
      if (attachmentList.length !== 0) {
        this.purchaseInvoiceAttachments.attachmentSize =
          attachmentList[i].fileSize;
        this.purchaseInvoiceAttachments.attachmentFileName =
          attachmentList[i].fileName;
        this.purchaseInvoiceAttachments.istringFileContent =
          attachmentList[i].content;
        this.purchaseInvoiceAttachments.attachementType =
          attachmentList[i].fileType;
        let uploadDocument = await this.uploadDocument();
      }
    }
  }

  uploadDocument(){
    return new Promise((resolve: any) => {
      this.accountsService
        .uploadPurchaseInvoiceAttachmentFile(
          this.purchaseInvoiceAttachments,
          this.accountsOptions
        )
        .subscribe((success) => {
          this.parentData.plistentPurAttachments = success.plstentPurAttachments;
          this.dialog.closeDialog();
          resolve(true);
        });
    });
  }

  downloadAttachment(val:any, type:any){

    const obj = {
      data: val.purAttachmentsId,
      data1: "PUR"
    }

    const options = {
      responseType: 'blob'
    }

    this.accountsService.loadAttachmentsByteArray(obj, options).subscribe((success: any) => {

      const resp = new Blob([success.body], { type: success.body.type });
      const fileURL = URL.createObjectURL(resp);
      if(type !== 'down'){
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
      }else{
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
        data: element.purAttachmentsId
      }
      this.accountsService.deletePurAttachmentFile(obj).subscribe((success) => {
        // this.deleteDataList(success)
        this.parentData.plistentPurAttachments = success.plstentPurAttachments;
      })
    }
  }
}
