import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { NgClass, SlicePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Row, ViewLabel, InnerScroll, AppToolTipComponent } from '../../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../../app-core/message/error-message/error-message.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppAccessDirective } from '../../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { AutoGetItemComponent } from '../../../../search/auto-get-item/auto-get-item.component';
import { SearchVendorComponent } from '../../../../search/search-vendor/search-vendor.component';
import { PaymentNoteAttachmentComponent } from '../../payment-note/payment-note-detail/payment-note-attachment/payment-note-attachment.component';
import { PaymentNoteNotesComponent } from '../../payment-note/payment-note-detail/payment-note-notes/payment-note-notes.component';
import { PaymentNotePreviewComponent } from '../../payment-note/payment-note-detail/payment-note-preview/payment-note-preview.component';
import { GetDatePipe } from '../../../../../common/pipes/app-get-date/get-date.pipe';
import { SplicePipe } from '../../../../../common/pipes/app-splice/splice.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AppService } from '../../../../../app.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { entActDebitNote, entActVendor, entActVoucherConfig, entCheckLineItemBasedonDocumentDate, entGetMailInfo, entPurNotes } from '../../../../../common/api-services/accounts-api/accounts-api.classes';

import { DebitNoteDetailNotesComponent } from './debit-note-detail-notes/debit-note-detail-notes.component';
import { DebitNoteDetailAttachmentComponent } from './debit-note-detail-attachment/debit-note-detail-attachment.component';
import { DebitNoteDetailPreviewComponent } from './debit-note-detail-preview/debit-note-detail-preview.component';
import { TotalValueComponent } from '../../../../../app-core/app-template/total-value/total-value.component';
import { ItemValueComponent } from '../../../../../app-core/app-template/item-value/item-value.component';
import { DialogAnimateService } from '../../../../../common/services/dialog-animated/dialog-animate.service';
import { AppSafePipe } from '../../../../../common/pipes/app-safe/app-safe.pipe';
import { finalize } from 'rxjs';


export class autoSearchItems {
  autoSearchItemId = 0;
  autoSearchText = '';
}

@Component({
  selector: 'app-debit-note-detail',
  standalone: true,
  imports: [
    NgClass,
    Row,
    ViewLabel,
    IconButtonComponent,
    InnerScroll,
    FormsModule,
    InputControlComponent,
    AppDatePipe,
    ErrorMessageComponent,
    AppAccessDirective,
    ButtonAccessDirective,
    SlicePipe,
    AppToolTipComponent,
    CheckboxComponent,
    MatSlideToggleModule,
    FooterToggleDirective,
    MatMenuModule,
    DropZoneComponent,
    SearchVendorComponent,
    DebitNoteDetailNotesComponent,
    DebitNoteDetailAttachmentComponent,
    DebitNoteDetailPreviewComponent,
    AutoGetItemComponent,
    TotalValueComponent,
    ItemValueComponent,
    AppSafePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [GetDatePipe, SplicePipe],
  templateUrl: './debit-note-detail.component.html',
  styleUrl: './debit-note-detail.component.scss'
})
export class DebitNoteDetailComponent {
  tabIndex = 0;
  selectedIndex = 0;
  @ViewChild('mailTemplate', { static: false })
  mailTemplate!: TemplateRef<any>;
  id: any = 0;
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
  voucherId: any = 0;

  options = {
    type: 'accountsPath',
  };
  mailInfo = new entGetMailInfo();
  debitNoteId = 0;
  regionDetailValue = 0;
  voucherConfigId = 0;
  vendorIdRAW = 0;
  selectedTab = 0;
  currecyDisabled = false;
  vendorFlag = false;
  errorTrue = false;
  toggleArrow = true;
  purchaseInvoiceId = 0;
  updateSequence = 0;
  pageId = 'AJVSC';
  voucherid = '';
  ilistentActDebitNoteItemRAW = [];
  ilistentActDebitNoteItemQuantity = [];
  exchangeRateLst: any = [];
  autoSearchItemId = 0;
  autoSearchText = '';
  debitNoteNotes = new entPurNotes();
  statusSource=[]
  blob = {};
  fileLink = '';
  urlFileName = '';
  fileUrl = '';
  __isDisabled = signal(true);
  __isInputDisabled = signal(true);
  __hideBtn = signal(true);
  accountsOptions = {
    type: 'accountsPath',
  };
  debitNote = new entActDebitNote();
  vendor = new entActVendor();
  checkDocumentDate: any = new entCheckLineItemBasedonDocumentDate();
  voucherConfig = new entActVoucherConfig();
  autoSearchItems = new autoSearchItems();

  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;

  @ViewChild(DropZoneComponent) dropZoneComponent!: DropZoneComponent;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  base64String: any = '';
  attachmentList: any = [];
  @ViewChild('a') aform!: NgForm;
  @ViewChild('b') bform!: NgForm;
  @ViewChild('c') cform!: NgForm;

  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public url: UrlService,
    public router: Router,
    public appService: AppService,
    private getDate: GetDatePipe,
    public splicePipe: SplicePipe,
    public appSetting: AppSettingsService,
    public dialogService : DialogAnimateService,


  ) {
    this.route.paramMap.subscribe((params) => {
      this.init();
    });
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    await this.data.checkToken();
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.debitNoteId = params.data;
    this.voucherConfigId = params.data1;
    this.regionDetailValue = params.data2
    if (this.debitNoteId === 0) {
      this.createNewDebitNote(this.voucherConfigId, this.regionDetailValue);
    } else {
      this.openDebitNote(this.debitNoteId);
    }
    await this.initialData.getAcccountsDDL('getDebitNoteInitialData');
  }

  createNewDebitNote(val: any, val1: any) {

    this.errorTrue = false;
    const obj = {
      data: val,
      data1: val1
    };
    this.accountsService
      .createNewDebitNote(obj)
      .subscribe((success) => {
        this.debitNote = success;
        console.log(this.debitNote.plstentCurrencyExchangeRate);

        this.updateStatus();
        this.voucherConfigId = success.actVoucherConfigId;
        this.vendorIdRAW = 0;
        // this.dateNotEffective = success.documentDate;
        // this.debitNote.actVoucherConfigId = this.voucherConfigId;
      });
  }

  openDebitNote(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .openDebitNote(obj)
      .subscribe((success) => {
        this.debitNote = success;
        this.updateStatus();
        this.vendorIdRAW = success.actVendorId;
        this.getVoucherDetail(this.debitNote.actVoucherConfigId !== 0 ? this.debitNote.actVoucherConfigId : this.voucherConfigId);
        this.voucherConfigId = success.actVoucherConfigId;
        // this.voucherId = success.actVoucherConfigId;
        // this.dateNotEffective = success.documentDate;
        this.ilistentActDebitNoteItemQuantity = JSON.parse(
          JSON.stringify(success.ilistentActDebitNoteItem)
        );
        this.ilistentActDebitNoteItemRAW = JSON.parse(
          JSON.stringify(success.ilistentActDebitNoteItem)
        );
        this.getVendorAllDetails(success.ibusActVendorDetails);
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      });
  }

  async doVendorSelect(event: any) {
    debugger;
    this.debitNote.actVendorId = event.actVendorId;
    this.debitNote.ibusActVendorDetails.vendorName = event.vendorName;
    this.vendorFlag = true;
    if ((this.vendorIdRAW !== 0) && (this.vendorIdRAW !== this.debitNote.actVendorId)) {
      let isCustomerChange = await this.dialog.confirmDialog("Do you want to change vendor, If you change customer then entire data will be clear");
      if (isCustomerChange) {
        let currentDate: any = await this.appService.getCurrentDate();
        this.debitNote.documentDate = currentDate;
        this.debitNote.ilistentActDebitNoteItem = [];
        this.debitNote.actVendorId = event.actVendorId;
        // setTimeout(() => {
        //   this.totalService.setValue(true);
        // }, 300);
      }
      else {
        this.debitNote.actVendorId = this.vendorIdRAW;
        event.actVendorId = this.vendorIdRAW;
      }
    }
    this.vendorIdRAW = this.debitNote.actVendorId;
    this.getVendorAllDetails(event);
  }

  getVendorAllDetails(val: any) {
    debugger
    this.vendor.actVendorId = val.actVendorId;
    this.vendor.vendorName = val.vendorName;
    let obj = {
      data: val.actVendorId,
      data1: this.debitNote.regionValue
    }
    this.accountsService
      .getVendorForSearch(obj)
      .subscribe((success) => {
        this.debitNote.ibusActVendorDetails = success;
        this.debitNote.actVendorId = success.actVendorId;
        this.initialData.DDLValues.DDLAddress = success.lstAddress;
        this.debitNote.docCurrencyValue = success.currencyValue;
        if (success.actVendorId === 0) {
          this.debitNote.currencyRate = '0.00000000';
        }
        if (this.debitNote.currencyValue === success.currencyValue) {
          this.debitNote.currencyRate = '1.00000000';
          this.currecyDisabled = true;
        } else if (this.vendorFlag) {
          this.documentDateConversioDate();
        }
        this.vendorFlag = false;
      });
  }

  documentDateConversioDate() {
    if (
      this.debitNote.documentDate !== '' &&
      this.debitNote.ibusActVendorDetails.currencyValue !== ''
    ) {
      if (
        (this.debitNote.statusValue === 'INPRO' ||
          this.debitNote.statusValue === 'PENAP') &&
        this.debitNote.ibusActVoucherConfig.needCash === 'N'
      ) {
        this.checkDocumentDatelist();
        this.accountsService
          .documentDateConversioDate(this.checkDocumentDate)
          .subscribe(
            (success) => {
              // this.dateNotEffective = this.debitNote.documentDate;
              if (
                this.debitNote.currencyValue ===
                this.debitNote.ibusActVendorDetails.currencyValue
              ) {
                this.debitNote.currencyRate = '1.00000000';
              } else {
                if (success.conversionRate !== 0) {
                  this.debitNote.currencyRate = success.conversionRate;
                }
              }
            },
            (e) => {
              // this.debitNote.documentDate = this.dateNotEffective;
            }
          );
      } else {
      }
    } else {
    }
  }

  checkDocumentDatelist() {
    const validItems = this.debitNote.ilistentActDebitNoteItem.filter((item: any) => item.invItemId !== 0 && item.purPurchaseInvoiceId !== 0);
    const voucherIds = validItems.map((item: any) => item.purPurchaseInvoiceId).join(',');

    this.voucherid = voucherIds;

    this.checkDocumentDate.documentDate = this.debitNote.documentDate;
    this.checkDocumentDate.voucherType = this.debitNote.ibusActVoucherConfig.voucherTypeValue;
    this.checkDocumentDate.voucherIds = this.voucherid;
    this.checkDocumentDate.targetCurrencyValue = this.debitNote.ibusActVendorDetails.currencyValue;
  }

  getVoucherDetail(element: any) {
    const obj = {
      data: element,
    };
    this.accountsService
      .getVoucherAccess(obj)
      .subscribe((success) => {
        this.voucherConfigId = success.actVoucherConfigId;
        this.voucherConfig = success;
        // this.regionValueDDL = success.plstentDDLClass
      });
  }

  doGetItemSelect(event: any) {

    this.purchaseInvoiceId = event.id;
    this.autoSearchItemId = event.id;
    this.autoSearchText = event.name;
  }

  getItemFromDebitNoteItem() {
    this.itemListCheck();
    if (this.purchaseInvoiceId !== 0) {
      if (this.checkExistsItem(this.purchaseInvoiceId)) {
        if (
          this.debitNote.ilistentActDebitNoteItem.length === 0 ||
          this.purchaseInvoiceId === 0
        ) {
          const obj = {
            data: this.purchaseInvoiceId,
            data1: this.debitNote.ibusActVoucherConfig.voucherTypeValue,
          };
          this.accountsService
            .getItemFromDebitNoteItem(obj)
            .subscribe((success) => {

              this.debitNote.currencyRate = success.plstentActDebitNoteItem[0].pentPurPurchaseInvoice.currencyRate;
              this.ilistentActDebitNoteItemQuantity = JSON.parse(
                JSON.stringify(success.plstentActDebitNoteItem)
              );
              this.ilistentActDebitNoteItemRAW = JSON.parse(
                JSON.stringify(success.plstentActDebitNoteItem)
              );
              this.debitNote.ilistentActDebitNoteItem = success.plstentActDebitNoteItem
              this.clearDisplayText();
              this.debitNote.ilistentActDebitNoteItem = this.splicePipe.transform(
                success.plstentActDebitNoteItem,
                'ientInvItem'
              );
              this.ilistentActDebitNoteItemQuantity = this.splicePipe.transform(
                this.ilistentActDebitNoteItemQuantity,
                'ientInvItem'
              );
              if (this.debitNote.ilistentActDebitNoteItem.length !== 0) {
                for (
                  let i = 0;
                  i < this.debitNote.ilistentActDebitNoteItem.length;
                  i++
                ) {
                  if (
                    this.debitNote.ilistentActDebitNoteItem[i].invItemId !== 0
                  ) {
                    if (
                      this.debitNote.ilistentActDebitNoteItem[i].invItemId !== 0
                    ) {
                      let tax =
                        this.debitNote.ilistentActDebitNoteItem[i].ientInvItem
                          .actTaxCodeValue;
                      if (tax === 'VAT-C') {
                        let val = 0;
                        this.debitNote.ilistentActDebitNoteItem[i].taxPercentage =
                          JSON.parse(JSON.stringify(val));
                      }
                    }
                  }
                }
              }
            });
        } else {
          this.data.errorInfoMessage('Only one purchase invoice allowed');
        }
      } else {
      }
    } else {
      this.data.errorInfoMessage('Please select purchase invoice reference no');
    }
  }

  checkExistsItem(val: any) {
    if (this.debitNote.ilistentActDebitNoteItem.length !== 0) {
      for (let i = 0; i < this.debitNote.ilistentActDebitNoteItem.length; i++) {
        if (this.debitNote.ilistentActDebitNoteItem[i].purPurchaseInvoiceId === val) {
          let refNumber = this.debitNote.ilistentActDebitNoteItem[i].pentPurPurchaseInvoice.invoiceReferenceNo;
          this.data.errorInfoMessage('The selected document no (' + refNumber + ') has been already added in list');
          return false;
        }
      }
    }
    return true;
  }

  getExchangeRateLst(val: any) {
    this.exchangeRateLst = val;
  }

  onTotalValue(val: any) {
    this.debitNote.totalAfterDiscount = val.totalAfterDiscount;
    this.debitNote.totalTaxAmount = val.taxAmount;
    this.debitNote.totalNetAmount = val.netAmount;
  }

  itemListCheck() {
    this.splicePipe.transform(
      this.debitNote.ilistentActDebitNoteItem,
      'ientInvItem'
    );
  }

  async navigateDetail(l: any) {
    if (l.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: 'REGI1'
        };
        let urlJson = await this.url.encode(obj);
        this.router.navigateByUrl('/home/purchase/debit-note/detail/' + urlJson);
      } else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    } else {
      this.errorTrue = true;
    }
  }

  saveDebitNote() {
    debugger
    if (this.aform.valid && this.bform.valid) {
      if (this.debitNote.ilistentActDebitNoteItem.length !== 0) {
        this.errorTrue = false;
        this.accountsService
          .saveDebitNote(this.debitNote)
          .subscribe(async (success) => {
            this.debitNote = success;
            this.updateStatus();
            this.ilistentActDebitNoteItemRAW = JSON.parse(
              JSON.stringify(success.ilistentActDebitNoteItem)
            );
            this.clearDisplayText();
            if (success.actDebitNoteId !== 0) {
              const obj = {
                data: success.actDebitNoteId,
                data1: 0,
              };
              let urlJson = await this.url.encode(obj);
              this.router.navigateByUrl(
                '/home/purchase/debit-note/detail/' + urlJson
              );
            }
          });
      } else {
        this.data.errorInfoMessage('Please add any items');
        this.errorTrue = true;
      }
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }

  clearDisplayText() {
    this.autoSearchItems = new autoSearchItems();
  }

  itemsDelete(val: any, index: any) {
    let msg = 'Are you Sure, Want to Delete this Item'
    let response: any = this.dialog.confirmDialog(msg)
    if (response) {
      if (val.actDebitNoteItemId !== 0) {
        this.deleteDebitNoteItem(val, index);
      } else {
        this.debitNote.ilistentActDebitNoteItem.splice(index, 1);
        this.data.successMessage('Item removed successfully');
      }
    }
  }

  deleteDebitNoteItem(val: any, i: any) {
    this.debitNote.ilistentActDebitNoteItem[i].strDeleteFlag = 'Y';
    this.accountsService
      .deleteDebitNoteItem(this.debitNote)
      .subscribe((success) => {
        this.debitNote = success;
        this.updateStatus();
      });
  }

  doReferesh() {
    this.openDebitNote(this.debitNoteId);
    this.clearDisplayText();
  }

  doClear() {
    this.createNewDebitNote(this.voucherConfigId, this.regionDetailValue);
    this.clearDisplayText();
  }

  isDirectApproval() {
    let directApproval = false;
    if (
      this.debitNote.statusValue !== 'APROV' &&
      this.debitNote.statusValue !== 'CANCL' &&
      this.debitNote.ibusActVoucherConfig.isDirectApproval === 'Y'
    ) {
      directApproval = true;
    } else {
      directApproval = false;
    }
    return directApproval;
  }

  updateStatus() {
    this.__isDisabled.set(this.debitNote.statusValue !== 'APROV' && this.debitNote.statusValue !== 'CANCL' && this.debitNote.statusValue !== 'PENAP');
  }


  navigateToList() {
    this.router.navigateByUrl('/home/purchase/debit-note/search');
  }
  onSelectTab(val: any) {
    debugger
    this.selectedTab = val;


    if (val === 3) {
       this.viewPurchaseOrderReceipt();
    }
    // this.viewPurchaseQuotationReceipt()
  }

  toggle() {
    this.toggleArrow = !this.toggleArrow;
  }

  onItemSelect(event: any, items: any) {
    items.plentLedger.codeName = event.codeName;
    items.plentLedger.ledgerName = event.ledgerName;
    items.itemLedgerId = event.actLedgerId;
  }

  viewPurchaseOrderReceipt() {
    if (this.debitNote.actDebitNoteId !== 0) {
      const obj = {
        data: this.debitNote.actDebitNoteId,
        data1: this.debitNote.ibusActVoucherConfig.pdfOtherComments,
      };
      const options = {
        responseType: 'blob'
      }
      this.accountsService.viewDebitNoteReceipt(obj, options).subscribe((success: any) => {
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
  navigateToPurchase(){
    this.router.navigateByUrl('/home/corporate/purchase-menus')
  }
  // directApproved() {
  //   this.itemListCheck();
  //   this.debitNote.ibusActVoucherConfig.isDirectApproval === 'Y'
  //     ? (this.debitNoteNotes.statusValue = 'APROV')
  //     : this.debitNote.statusValue === 'PENAP'
  //       ? (this.debitNoteNotes.statusValue = 'APROV')
  //       : (this.debitNoteNotes.statusValue = 'PENAP');
  //   if (this.bform.valid && this.aform.valid && this.cform.valid) {
  //     if (
  //       this.debitNote.ilistentActDebitNoteItem.length !== 0
  //     ) {
  //       this.debitNoteNotes.referenceId = this.id;
  //       this.debitNoteNotes.lstDDLClass = [];
  //       this.debitNote.pentPurNotes = this.debitNoteNotes;
  //       this.loadingTrue = true;
  //       this.apiAccountService
  //         .saveNotesForDebitNote(this.debitNote, this.options)
  //         .pipe(
  //           finalize(() => {
  //             this.loadingTrue = false;
  //           })
  //         )
  //         .subscribe((success) => {
  //           this.debitNote = success;
  //           this.voucherId = success.actVoucherConfigId;
  //           this.statusSource = new MatTableDataSource(
  //             success.ilistentActDebitNoteStatusHistory
  //           );
  //           this.clearDisplayText();
  //           setTimeout(() => {
  //             this.totalService.setValue(true);
  //           }, 100);
  //           if (this.debitNote.statusValue === 'APROV') {
  //             this.onTabChange(3)
  //           }
  //           this.initialLoad = false;
  //         });
  //     } else {
  //       this.data.errorMesaageOnly('Please add any items');
  //       this.errorTrue = true;
  //     }
  //   } else {
  //     this.errorTrue = true;
  //     this.data.errorMesaageOnly('Please fill all mandatory fields');
  //   }
  // }
  directApproved() {
    this.itemListCheck();
    this.debitNote.ibusActVoucherConfig.isDirectApproval === 'Y'
      ? (this.debitNoteNotes.statusValue = 'APROV')
      : this.debitNote.statusValue === 'PENAP'
        ? (this.debitNoteNotes.statusValue = 'APROV')
        : (this.debitNoteNotes.statusValue = 'PENAP');
    if (this.bform.valid && this.aform.valid && this.cform.valid) {
      if (
        this.debitNote.ilistentActDebitNoteItem.length !== 0
      ) {
        this.debitNoteNotes.referenceId = this.id;
        this.debitNoteNotes.lstDDLClass = [];
        this.debitNote.pentPurNotes = this.debitNoteNotes;

        this.accountsService
          .saveNotesForDebitNote(this.debitNote, this.options)
          .pipe(
            finalize(() => {

            })
          )
          .subscribe((success) => {
            this.debitNote = success;
            this.voucherId = success.actVoucherConfigId;
            this.statusSource =success.ilistentActDebitNoteStatusHistory

            this.clearDisplayText();

            if (this.debitNote.statusValue === 'APROV') {
              this.onSelectTab(3)
            }

          });
      } else {
        this.data.errorInfoMessage('Please add any items');
        this.errorTrue = true;
      }
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }
  hideBtnBasedonStatus() {
    this.__hideBtn.set(this.debitNote.statusValue === 'APROV' || this.debitNote.statusValue === 'CANCL')
  }
}
