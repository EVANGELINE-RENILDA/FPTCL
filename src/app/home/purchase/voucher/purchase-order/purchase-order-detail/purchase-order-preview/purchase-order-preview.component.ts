import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InnerScroll, Row } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { AppSettingsService } from '../../../../../../common/services/app-settings/app-settings.service';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import { entGetMailInfo, entPurPurchaseOrder } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppSafePipe } from '../../../../../../common/pipes/app-safe/app-safe.pipe';
import { DialogAnimateService } from '../../../../../../common/services/dialog-animated/dialog-animate.service';
import { AppService } from '../../../../../../app.service';
import { CheckboxComponent } from '../../../../../../app-core/template/checkbox/checkbox.component';
import { DropZoneComponent } from '../../../../../../app-core/template/drop-zone/drop-zone.component';
import { DataService } from '../../../../../../common/services/data/data.service';

@Component({
  selector: 'app-purchase-order-preview',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [InputControlComponent, FormsModule, IconButtonComponent, Row, AppSafePipe, InnerScroll,CheckboxComponent,DropZoneComponent],
  templateUrl: './purchase-order-preview.component.html',
  styleUrl: './purchase-order-preview.component.scss'
})
export class PurchaseOrderPreviewComponent implements OnInit {
  @ViewChild('mailTemplate', { static: false })
  mailTemplate!: TemplateRef<any>;
  blob = {};
  fileUrl = '';
  attachmentList: any = [];

  urlFileName = ''
  mailInfo = new entGetMailInfo();
errorTrue=false;
base64String: any = '';
pageId = 'PUISC';

  @Input() parentData = new entPurPurchaseOrder();
  @Input() public name: any = '';
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
  constructor(public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public appSetting: AppSettingsService,
    public dialogService : DialogAnimateService,
    public appService: AppService,
    public data: DataService,



){
}

ngOnInit(): void {
  this.viewPurchaseOrderReceipt()
}


  viewPurchaseOrderReceipt() {
    if (this.parentData.purPurchaseOrderId !== 0) {
      const obj = {
        data: this.parentData.purPurchaseOrderId,
        data1: this.parentData.sentActVoucherConfig.pdfOtherComments,
      };
      const options = {
        responseType: 'blob'
      }
      this.accountsService.viewPurchaseOrderReceipt(obj, options).subscribe((success: any) => {
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

  sendEmail() {

  }
  closePdf(){
    this.fileUrl =''
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

}
