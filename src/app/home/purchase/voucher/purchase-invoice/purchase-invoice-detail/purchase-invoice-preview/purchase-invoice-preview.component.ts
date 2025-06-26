import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InnerScroll, Row } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { AppSettingsService } from '../../../../../../common/services/app-settings/app-settings.service';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import { entPurPurchaseOrder,entPurPurchaseInvoice, entGetMailInfo } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppSafePipe } from '../../../../../../common/pipes/app-safe/app-safe.pipe';
import { AppAccessDirective } from '../../../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../../../common/permission/button-access.directive';
import { DialogAnimateService } from '../../../../../../common/services/dialog-animated/dialog-animate.service';
import { DataService } from '../../../../../../common/services/data/data.service';
import { AppService } from '../../../../../../app.service';
import { CheckboxComponent } from '../../../../../../app-core/template/checkbox/checkbox.component';
import { DropZoneComponent } from '../../../../../../app-core/template/drop-zone/drop-zone.component';
@Component({
  selector: 'app-purchase-invoice-preview',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [InputControlComponent, FormsModule, IconButtonComponent, Row,AppSafePipe,AppAccessDirective, ButtonAccessDirective,InnerScroll,CheckboxComponent,DropZoneComponent],
  templateUrl: './purchase-invoice-preview.component.html',
  styleUrl: './purchase-invoice-preview.component.scss'
})
export class PurchaseInvoicePreviewComponent {
  @ViewChild('mailTemplate', { static: false })
  mailTemplate!: TemplateRef<any>;
  pageId = 'PUISC';
  blob = {};
  fileUrl = '';
  urlFileName = ''
errorTrue=false;
base64String: any = '';
attachmentList: any = [];
  @Input() parentData = new entPurPurchaseInvoice();
  @Input() public emailId: any = '';
  @Input() public refNumber: any = '';
  @Input() public documentDate: any = '';
  @Input() public netAmount: any = '';
  @Input() public voucherName: any = '';
  @Input() public pdfContent = 'Attachment of : ';
  @Input() public fullContent = '';
  @Input() public editEmail = false;
  fullSubject: any = '';
  downContent: any = '';

  options = {
    type: 'accountsPath',
  };
  mailInfo = new entGetMailInfo();
  constructor(public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public appSetting: AppSettingsService,
    public dialogService : DialogAnimateService,
    public data: DataService,
    public appService: AppService,



){
}

ngOnInit(): void {
  this.viewPurchaseInvoiceReceipt()
}
async openEmailHistory() {
  // this.employerEmailHistory = element;
  let dialogResponse: any = await this.dialogService.open(this.mailTemplate, {
    disableClose: true,
    height: '100%',
    width: '100%',
    maxWidth: '500px',
    position: { right: '0px', bottom: '15px' },
    direction: 'ltr',
    animation: { to: "left" },
  })
}

viewPurchaseInvoiceReceipt() {
    if (this.parentData.purPurchaseInvoiceId !== 0) {
      const obj = {
        data: this.parentData.purPurchaseInvoiceId,
        data1: this.parentData.pActVoucherConfig.pdfOtherComments,
      };
      const options = {
        responseType: 'blob'
      }
      this.accountsService.viewPurchaseInvoiceReceipt(obj, options).subscribe((success: any) => {
        let contentDisposition = success.headers.get('content-disposition');
        let filename = contentDisposition
          .split(';')[1]
          .split('filename')[1]
          .split('=')[1]
          .trim();
        // this.blob = success.body;
        const resp = new Blob([success.body], { type: 'application/pdf' });
        this.blob = resp;
        const fileURL = URL.createObjectURL(resp);

        this.urlFileName = filename;
        this.fileUrl = fileURL;
      })
    }
  }
  doPdfChange(event: any) {
    if (event.checked === true) {
      this.mailInfo.isIncludePdf = 'Y';
      this.mailInfo.lpdFentCMNAttachment.attachmentContent = this.base64String;
      this.mailInfo.lpdFentCMNAttachment.attachmentName =
        this.voucherName + '-' + this.refNumber;
    } else {
      this.mailInfo.isIncludePdf = 'N';
    }
  }
  doAttachment(event: any) {
    if (event.target.checked === true) {
      this.mailInfo.isIncludeAttachment = 'Y';
    } else {
      this.mailInfo.isIncludeAttachment = 'N';
    }
  }
  loadAttachment(event: any) {
    debugger
    this.attachmentList = event;
    if (this.attachmentList.length !== 0) {
      for (let i = 0; i < this.attachmentList.length; i++) {
        // this.attachment.attachmentName = this.attachmentList[i].fileName;
        // this.attachment.attachmentContent = this.attachmentList[i].content;
      }

      // this.mailInfo.lstentCMNAttachment.push(this.attachment);
    }
  }
  onNoClick() {
    // this.data.slideDialogRef?.close();
  }
  sendEmailforVoucher(l: any) {
    debugger
    this.mailInfo.subject = this.fullSubject;
    this.mailInfo.content = this.fullContent + this.downContent;
    if (l.valid) {
      this.accountsService
        .sendEmailforVoucher(this.mailInfo, this.options)
        .subscribe((success) => {
          if (
            success.msg &&
            success.msg.infoMessage &&
            success.msg.infoMessage.msgDescription
          ) {
            this.data.successMessage(success.msg.infoMessage.msgDescription);
            // this.data.slideDialogRef?.close();
          }

          if (success.msg.errorMessage.length !== 0) {
            this.data.errorInfoMessage(
              success.msg.errorMessage[0].msgDescription
            );
          }
        });
    } else {
      this.errorTrue = true;
      // this.data.errorMesaageOnly('Please fill all mandatory fields');
    }
  }
  closePdf(){
    this.fileUrl =''
  }
}
