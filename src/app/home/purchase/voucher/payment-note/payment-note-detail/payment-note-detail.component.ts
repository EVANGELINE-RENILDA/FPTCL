import { Component, Input, TemplateRef, ViewChild, signal } from '@angular/core';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { MatMenuModule } from '@angular/material/menu';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgClass, SlicePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  Row,
  ViewLabel,
  InnerScroll,
  AppToolTipComponent,
} from '../../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { ErrorMessageComponent } from '../../../../../app-core/message/error-message/error-message.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { AppAccessDirective } from '../../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../../../app.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { GetDatePipe } from '../../../../../common/pipes/app-get-date/get-date.pipe';
import { SplicePipe } from '../../../../../common/pipes/app-splice/splice.pipe';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import {
  entActVendor,
  entActVoucherConfig,
  entCheckLineItemBasedonDocumentDate,
  entGetMailInfo,
  entPurNotes,
  entPurPaymentNote,
} from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { autoSearchItems } from '../../purchase-invoice/purchase-invoice-detail/purchase-invoice-detail.component';
import { SearchVendorComponent } from '../../../../search/search-vendor/search-vendor.component';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { PaymentNoteNotesComponent } from './payment-note-notes/payment-note-notes.component';
import { PaymentNoteAttachmentComponent } from './payment-note-attachment/payment-note-attachment.component';
import { PaymentNotePreviewComponent } from './payment-note-preview/payment-note-preview.component';
import { AutoGetItemComponent } from '../../../../search/auto-get-item/auto-get-item.component';
import { SearchDebitComponent } from '../../../../search/search-debit/search-debit.component';
import { finalize } from 'rxjs';
import { TotalPaymentNoteComponent } from '../../../../../app-core/app-template/total-payment-note/total-payment-note.component';
import { DialogAnimateService } from '../../../../../common/services/dialog-animated/dialog-animate.service';
import { AppSafePipe } from '../../../../../common/pipes/app-safe/app-safe.pipe';

@Component({
  selector: 'app-payment-note-detail',
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
    PaymentNoteNotesComponent,
    PaymentNoteAttachmentComponent,
    PaymentNotePreviewComponent,
    AutoGetItemComponent,
    SearchDebitComponent,
    TotalPaymentNoteComponent,
    AppSafePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [GetDatePipe, SplicePipe],
  templateUrl: './payment-note-detail.component.html',
  styleUrl: './payment-note-detail.component.scss',
})
export class PaymentNoteDetailComponent {
  @ViewChild('mailTemplate', { static: false })
  mailTemplate!: TemplateRef<any>;
  tabIndex = 0;
  base64String: any = '';
  attachmentList: any = [];
  selectedTab = 0;
  pageId = '';
  errorTrue = false;
  regionDetailValue = '';
  dateNotEffective = '';
  voucherConfigId = 0;
  paymentNoteId = 0;
  vendorIdRAW = 0;
  branchBankName = '';
  branchBankAccountNo = '';
  vendorFlag = false;
  bankAccountNo = '';
  bankName = '';
  voucherid = '';
  isBasedonDataPI = false;
  paymentBasedPurchaseId = 0;
  purchaseInvoiceId = 0;
  voucherId = 0;
  selectedIndex = 0;
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
  branchName=''

  options = {
    type: 'accountsPath',
  };
  mailInfo = new entGetMailInfo();
  statusLst = [];
  // exchangeRateLst: any = [];

  paymentNote = new entPurPaymentNote();
  paymentNoteNotes = new entPurNotes();
  vendor = new entActVendor();
  voucherConfig = new entActVoucherConfig();
  autoSearchItems = new autoSearchItems();
  checkDocumentDate: any = new entCheckLineItemBasedonDocumentDate();
  internalUpdateSequence = 0;
  items: any = [
    'sno',
    'items',
    'createdBy',
    'dateTime',
    'paidDate',
    'total',
    'paidAmt',
  ];
  itemsName: any = ['#', 'Notes', 'Created By', 'Debit Note', '', '', '', ''];

  notes: any = ['sno', 'notes', 'add'];
  notesName: any = ['', 'Notes', 'add'];

  attachment: any = ['', 'sno', 'fileName', 'fileFormat', 'size', 'action'];
  attachmentsName: any = ['S No', '', 'File Name', 'File Format', 'Size', ''];
  accept =
    '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/   vnd.ms-excel, application/pdf, application/msword';

  tableAttachmentData = [];
  tableItemData = [];
  tableNoteData = [];

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;

  @ViewChild('l') lform!: NgForm;
  @ViewChild('a') aform!: NgForm;
  @ViewChild('b') bform!: NgForm;
  @ViewChild('c') cform!: NgForm;

  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;

  __isDisabled = signal(true);
  __isInputDisabled = signal(true);
  __hideBtn = signal(true);
  id: any = 0;


  accountsOptions = {
    type: 'accountsPath',
  };
  blob = {};
  fileLink = '';
  urlFileName = '';
  fileUrl = '';
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
    this.appService.setBreadCrumb(this.breadCrumb);

    this.isBasedonDataPI = params.data2;
    this.regionDetailValue = params.data3;
    // await this.storage.get('branchFinance').then((val) => {
    //   this.branchName = val;
    // });

    if (!this.isBasedonDataPI) {
      this.paymentNoteId = params.data;
      this.voucherConfigId = params.data1;
    } else {
      this.paymentNoteId = 0;
      this.voucherConfigId = params.data;
      this.paymentBasedPurchaseId = params.data1;
    }
    if (this.paymentNoteId === 0) {
      this.createNewPaymentNote(this.voucherConfigId, this.regionDetailValue);
    } else {
      this.openPaymentNote(this.paymentNoteId);
    }
    await this.initialData.getAcccountsDDL('getPaymentNoteInitialData');
    await this.getListofBankBasedonBranch();
  }

  getListofBankBasedonBranch(): Promise<boolean> {
    return new Promise((resolve) => {
      this.accountsService
        .getListofBankBasedonBranch(this.options)
        .subscribe((success: any) => {
          this.initialData.DDLValues.DDLBankBranch =
            success.lstentActCompanyBranchBankDetail;
          resolve(true);
        });
    });
  }

  createNewPaymentNote(val: any, val1: any) {
    this.selectedTab = 0;
    const obj = {
      longData1: val,
      longData2: this.paymentBasedPurchaseId,
      strData1: val1,
    };
    this.accountsService.createNewPaymentNote(obj).subscribe((success) => {
      this.paymentNote = success;
      this. screenDisabled()
      // this.updateStatus();
      this.voucherConfigId = success.actVoucherConfigId;
      this.dateNotEffective = success.documentDate;
      if (this.isBasedonDataPI) {
        this.paymentNote.ilistbusPurPaymentNoteDetail.push(
          JSON.parse(JSON.stringify(success.ibusPurPaymentNoteDetail))
        );
        this.getVendorAllDetails(this.paymentNote.ibusActVendorDetails);
      }
      this.errorTrue = false;
    });
  }

  openPaymentNote(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService.openPaymentNote(obj).subscribe((success) => {
      this.paymentNote = success;
      this.screenDisabled()
      this.internalUpdateSequence = +1;
      // this.updateStatus();
      this.vendorIdRAW = success.actVendorId;
      this.getVoucherDetail(
        this.paymentNote.actVoucherConfigId !== 0
          ? this.paymentNote.actVoucherConfigId
          : this.voucherConfigId
      );
      this.voucherConfigId = success.actVoucherConfigId;
      this.dateNotEffective = success.documentDate;
      this.hideBtnBasedonStatus();
      this.statusLst = success.ilistbusPurPaymentNoteStatusHistory;
      this.bankBranchAc(success.actCompanyBranchBankDetailId);
      this.getVendorAllDetails(this.paymentNote.ibusActVendorDetails);
      if (success.msg.infoMessage.msgDescription) {
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      }
    });
  }

  async itemsDelete(val: any, index: any) {
    let msg = 'Are You Sure, Want to Delete?'
    let response = await this.dialog.confirmDialog(msg)
    if (val.appPurPaymentNoteDetailId !== 0) {
      this.deletePaymentNoteDetail(val.appPurPaymentNoteDetailId, index);
    } else {
      this.paymentNote.ilistbusPurPaymentNoteDetail.splice(index, 1);
    }
  }

  deletePaymentNoteDetail(id: any, index: any) {
    this.paymentNote.ilistbusPurPaymentNoteDetail[index].strDeleteFlag = 'Y';
    this.accountsService
      .deletePaymentNoteDetail(this.paymentNote, this.options)
      .subscribe((sucess) => {
        this.paymentNote = sucess;
        // this.updateStatus();
      });
  }

  getVoucherDetail(element: any) {
    const obj = {
      data: element,
    };
    this.accountsService.getVoucherAccess(obj).subscribe((success) => {
      this.voucherConfig = success;
      this.voucherConfigId = success.actVoucherConfigId;
      // this.regionValueDDL = success.plstentDDLClass
    });
  }

  hideBtnBasedonStatus() {
    this.__hideBtn.set(
      this.paymentNote.statusValue === 'APROV' ||
      this.paymentNote.statusValue === 'CANCL'
    );
  }

  bankBranchAc(val: any) {
    if (this.initialData.DDLValues.DDLBankBranch.length !== 0) {
      for (
        let i = 0;
        i < this.initialData.DDLValues.DDLBankBranch.length;
        i++
      ) {
        if (
          this.initialData.DDLValues.DDLBankBranch[i]
            .actCompanyBranchBankDetailId === val
        ) {
          this.paymentNote.ibusActCompanyBranchBankDetail =
            this.initialData.DDLValues.DDLBankBranch[i];
          this.branchBankName =
            this.initialData.DDLValues.DDLBankBranch[i].bankName;
          this.branchBankAccountNo =
            this.initialData.DDLValues.DDLBankBranch[i].bankAccountNo;
        }
      }
    }
  }

  savePaymentNote(l:any) {
    debugger;
    console.log(l);
    if(!l.valid) {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
      return;
    }


      this.errorTrue = false;
      if (this.paymentNote.ilistbusPurPaymentNoteDetail.length !== 0) {
        this.errorTrue = false;
        this.accountsService
          .savePaymentNote(this.paymentNote, this.options)
          .subscribe(async (success) => {
            this.paymentNote = success;
            this.screenDisabled()
            this.clearDisplayText();
            // this.statusSource =
            //   success.ilistbusPurAdvancePaymentNoteStatusHistory
            // );
            const obj = {
              data: success.purPaymentNoteId
              // data1: 0,
            };
            let urlJson = await this.url.encode(obj);
            this.router.navigateByUrl(
               '/home/purchase/payment-note/detail/' + urlJson
            );
            if (success.msg.infoMessage.msgDescription) {
              this.data.successMessage(success.msg.infoMessage.msgDescription);
            }
          });
      }
       else {
        this.onSelectTab(1);
        this.errorTrue = true;
        this.data.errorInfoMessage('Please add any items');
      }

  }

  clearDisplayText() {
    this.autoSearchItems = new autoSearchItems();
  }

  getVendorAllDetails(val: any) {
    if (val.actVendorId !== 0) {
      this.vendor.actVendorId = val.actVendorId;
      this.vendor.vendorName = val.vendorName;
      let obj = {
        data: val.actVendorId,
        data1: this.paymentNote.regionValue,
      };
      this.accountsService.getVendorForSearch(obj).subscribe((success) => {
        this.paymentNote.ibusActVendorDetails = success;
        this.paymentNote.actVendorId = success.actVendorId;
        this.paymentNote.reportingCurrencyValue = success.currencyValue;
        this.initialData.DDLValues.DDLVendorBank = success.lstVendorBankDetails;
        if (success.lstVendorBankDetails.length !== 0) {
          this.paymentNote.actVendorBankDetailId =
            success.lstVendorBankDetails[0].actVendorBankDetailId;
        }
        this.getBankNameBasedOnBankId();
        if (this.paymentNote.currencyValue === success.currencyValue) {
          this.paymentNote.currencyRate = '1.00000000';
        } else {
          this.paymentNote.currencyRate;
        }
        if (this.vendorFlag) {
          this.documentDateConversioDate();
        }
        this.vendorFlag = false;
      });
    } else {
      this.paymentNote.ibusActVendorDetails.vendorName = '';
      this.paymentNote.currencyRate = '';
      this.paymentNote.ibusActVendorDetails.ientActLedger.ledgerName = '';
      this.paymentNote.ibusActVendorDetails.chequePaymentName = '';
      this.paymentNote.actVendorBankDetailId = 0;
      this.bankAccountNo = '';
    }
  }

  getBankNameBasedOnBankId() {
    let val = this.paymentNote.actVendorBankDetailId;
    this.bankName = '';
    for (var i = 0; i < this.initialData.DDLValues.DDLVendorBank.length; i++) {
      if (
        this.initialData.DDLValues.DDLVendorBank[i].actVendorBankDetailId ===
        val
      ) {
        this.bankName = this.initialData.DDLValues.DDLVendorBank[i].bankName;
        this.bankAccountNo = this.initialData.DDLValues.DDLVendorBank[i].bankAccountNo;
      }
    }
  }
  documentDateConversioDate() {

    if (
      this.paymentNote.documentDate !== '' &&
      this.paymentNote.currencyValue !== ''
    ) {
      if (
        this.paymentNote.statusValue === 'INPRO' ||
        this.paymentNote.statusValue === 'PENAP'
      ) {
        this.checkDocumentDatelist();
        this.accountsService
          .documentDateConversioDate(this.checkDocumentDate, this.options)
          .subscribe(
            (success) => {
              this.dateNotEffective = this.paymentNote.documentDate;
              if (
                this.paymentNote.currencyValue ===
                this.paymentNote.currencyValue
              ) {
                this.paymentNote.currencyRate = '1.00000000';
              } else {
                this.paymentNote.currencyRate = success.conversionRate;
              }
            },
            (e) => {
              this.paymentNote.documentDate = this.dateNotEffective;
            }
          );
      }
    }
  }
  checkDocumentDatelist() {
    const validItems =
      this.paymentNote.ilistbusPurPaymentNoteDetail.filter(
        (item: any) => item.purPurchaseOrderId !== 0
      );
    const voucherIds = validItems
      .map((item: any) => item.purPurchaseOrderId)
      .join(',');

    this.voucherid = voucherIds;

    this.checkDocumentDate.documentDate = this.paymentNote.documentDate;
    this.checkDocumentDate.voucherType =
      this.paymentNote.ibusActVoucherConfig.voucherTypeValue;
    this.checkDocumentDate.voucherIds = this.voucherid;
    this.checkDocumentDate.targetCurrencyValue =
      this.paymentNote.currencyValue;
  }

  async doVendorSelect(event: any) {
    this.paymentNote.vendorLedgerId = event.actVendorId;
    this.paymentNote.ibusActVendorDetails.vendorName = event.vendorName;
    this.paymentNote.ibusActVendorDetails.vendorCode = event.vendorCode;
    this.paymentNote.ibusActVendorDetails.vendorLegacyCode = event.vendorCode;
    this.paymentNote.actVendorBankDetailId = 0;
    this.vendorFlag = true;
    if (
      this.vendorIdRAW !== 0 &&
      this.vendorIdRAW !== this.paymentNote.actVendorId
    ) {
      let isCustomerChange = await this.dialog.confirmDialog(
        'Do you want to change vendor, If you change customer then entire data will be clear'
      );
      if (isCustomerChange) {
        let currentDate: any = await this.appService.getCurrentDate();
        this.paymentNote.documentDate = currentDate;
        this.paymentNote.ilistbusPurPaymentNoteDetail = [];
        this.paymentNote.modeValue = '';
        this.bankName = '';
        this.branchBankName = '';
        this.branchBankAccountNo = '';
        this.bankAccountNo = '';
        this.paymentNote.chequeNumber = '';
        this.paymentNote.chequeDate = '';
        this.paymentNote.actCompanyBranchBankDetailId = 0;
        this.paymentNote.cashbookLedgerId = 0;
        this.paymentNote.ibusActLedger.ledgerName = '';
        this.paymentNote.actVendorBankDetailId = 0;
        this.paymentNote.actVendorId = event.actVendorId;
        this.paymentNote.vendorLedgerId = event.actVendorId;
      } else {
        this.paymentNote.actVendorId = this.vendorIdRAW;
        event.actVendorId = this.vendorIdRAW;
      }
    }
    this.vendorIdRAW = this.paymentNote.actVendorId;
    this.getVendorAllDetails(event);
  }
  // checkDocumentDatelist() {
  //   let result = '';
  //   if (this.paymentNote.ilistbusPurPaymentNoteDetail.length !== 0) {
  //     for (
  //       let i = 0;
  //       i < this.paymentNote.ilistbusPurPaymentNoteDetail.length;
  //       i++
  //     ) {
  //       if (
  //         this.paymentNote.ilistbusPurPaymentNoteDetail[i]
  //           .purPurchaseInvoiceId !== 0
  //       ) {
  //         if (result) {
  //           result += ',';
  //         }
  //         result +=
  //           this.paymentNote.ilistbusPurPaymentNoteDetail[i]
  //             .purPurchaseInvoiceId;
  //       }
  //     }
  //     this.voucherid = result;
  //   }
  //   this.checkDocumentDate.documentDate = this.paymentNote.documentDate;
  //   this.checkDocumentDate.voucherType =
  //     this.paymentNote.ibusActVoucherConfig.voucherTypeValue;
  //   this.checkDocumentDate.voucherIds = this.voucherid;
  //   this.checkDocumentDate.targetCurrencyValue =
  //     this.paymentNote.ibusActVendorDetails.currencyValue;
  // }

  async onVendorSelect(event: any) {
    this.paymentNote.actVendorId = event.actVendorId;
    this.paymentNote.ibusActVendorDetails.vendorName = event.vendorName;
    this.vendorFlag = true;
    if (
      this.vendorIdRAW !== 0 &&
      this.vendorIdRAW !== this.paymentNote.actVendorId
    ) {
      let isCustomerChange = await this.dialog.confirmDialog(
        'Do you want to change vendor, If you change customer then entire data will be clear'
      );
      if (isCustomerChange) {
        let currentDate: any = await this.appService.getCurrentDate();
        this.paymentNote.documentDate = currentDate;
        this.paymentNote.ilistbusPurPaymentNoteDetail = [];
        this.paymentNote.modeValue = '';
        this.bankName = '';
        this.branchBankName = '';
        this.branchBankAccountNo = '';
        this.bankAccountNo = '';
        this.paymentNote.chequeNumber = '';
        this.paymentNote.chequeDate = '';
        this.paymentNote.actCompanyBranchBankDetailId = 0;
        this.paymentNote.cashbookLedgerId = 0;
        this.paymentNote.ibusActLedger.ledgerName = '';
        this.paymentNote.actVendorBankDetailId = 0;
        this.paymentNote.actVendorId = event.actVendorId;
      } else {
        this.paymentNote.actVendorId = this.vendorIdRAW;
        event.actVendorId = this.vendorIdRAW;
      }
    }
    this.vendorIdRAW = this.paymentNote.actVendorId;
    this.getVendorAllDetails(event);
  }

  onLedgerSelect(event: any) {
    this.paymentNote.cashbookLedgerId = event.actLedgerId;
    this.paymentNote.ibusActLedger.ledgerName = event.ledgerName;
  }

  navigateToList() {
    this.router.navigateByUrl('/home/purchase/payment-note/search');
  }
  navigateToPurchase(){
    this.router.navigateByUrl('/home/corporate/purchase-menus')
  }

   onSelectTab(val: any) {
    debugger
    this.selectedTab = val;

    // this.selectedIndex = this.tabIndex;
    if (val===4) {
       this.viewPurPaymentNoteReceipt();
    }
    // this.viewPurchaseQuotationReceipt()
  }
  viewPurPaymentNoteReceipt() {
    if (this.paymentNote.purPaymentNoteId !== 0) {
      const obj = {
        data: this.paymentNote.purPaymentNoteId,
        data1: this.paymentNote.ibusActVoucherConfig.pdfOtherComments,
      };
      const options = {
        responseType: 'blob'
      }
      this.accountsService.viewPurPaymentNoteReceipt(obj, options).subscribe((success: any) => {
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
  getNotesValue(val: any) {
    this.paymentNote = val;
    // this.updateStatus();
    // this.hideBtnBasedonStatus();

    if (val.statusValue === 'APROV') {
      this.onSelectTab(3);
    }
  }

  async createNewAttachment() {
    let dialogResponse: any = await this.dialog.openDialog(
      this.attachmentDialog,
      {
        disableClose: true,
        height: 'auto',
        width: '100%',
        maxWidth: '1170px',
      }
    );
  }

  async navigateDetail(z: any) {
    if (z.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: false,
          data3: 'REGI1',
        };
        let urlJson = await this.url.encode(obj);
        this.router.navigateByUrl(
          '/home/purchase/payment-note/detail/' + urlJson
        );
      } else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    } else {
      this.errorTrue = true;
    }
  }

  doGetItemSelect(event: any) {
    this.purchaseInvoiceId = event.id;
    this.autoSearchItems.autoSearchItemId = event.id;
    this.autoSearchItems.autoSearchText = event.name;
  }

  createNewPaymentNoteDetail() {
    if (this.purchaseInvoiceId !== 0) {
      if (this.checkAlreadyExists(this.purchaseInvoiceId)) {
        const obj = {
          data: this.purchaseInvoiceId,
          data1: this.paymentNote.ibusActVoucherConfig.voucherTypeValue,
        };
        this.accountsService
          .createNewPaymentNoteDetail(obj)
          .subscribe((success) => {
            success.plstentPurPaymentNoteDetail.forEach((e: any) => {
              this.paymentNote.ilistbusPurPaymentNoteDetail.push(
                JSON.parse(JSON.stringify(e))
              );
            });
            this.clearDisplayText();
          });
      }
    } else {
      this.data.errorInfoMessage(
        'Please select purchase invoice  reference no'
      );
    }
  }

  checkAlreadyExists(val: any) {
    const details = this.paymentNote.ilistbusPurPaymentNoteDetail;
    if (details.length === 0) {
      return true;
    }
    for (const detail of details) {
      const invoiceId = detail.purPurchaseInvoiceId;
      if (invoiceId !== 0 && invoiceId === val) {
        const refNumber = detail.ibusPurPurchaseInvoice.invoiceReferenceNo;
        this.data.errorInfoMessage(
          `The selected document no (${refNumber}) has been already added in list`
        );
        return false;
      }
    }
    return true;
  }

  gainLossForPointZeroOneDifference(val: any, items: any, index: any) {
    if (this.paymentNote.currencyValue !== this.paymentNote.ibusActVendorDetails.currencyValue) {
      const obj = {
        longData1: items.purPurchaseInvoiceId,
        longData2: this.paymentNote.actVoucherConfigId,
        stringData1: this.paymentNote.currencyRate,
        stringData2: val,
      };
      this.accountsService
        .getGainLossForPointZeroOneDifference(obj)
        .subscribe((success) => {
          this.paymentNote.ilistbusPurPaymentNoteDetail[index].gain =
            success.data;
          this.paymentNote.ilistbusPurPaymentNoteDetail[index].loss =
            success.data1;
        });
    }
  }

  screenDisabled() {
    this.__isDisabled.set(
      this.paymentNote.statusValue === 'APROV' ||
      this.paymentNote.statusValue === 'CANCL' ||
      this.paymentNote.statusValue === 'PENAP'
    );
  }


  directApproved() {
    debugger
    this.paymentNote.ibusActVoucherConfig.isDirectApproval === 'Y'
      ? (this.paymentNoteNotes.statusValue = 'APROV')
      : this.paymentNote.statusValue === 'PENAP'
        ? (this.paymentNoteNotes.statusValue = 'APROV')
        : (this.paymentNoteNotes.statusValue = 'PENAP');
    if (this.lform.valid ) {
      this.errorTrue = false;
      if (

        this.paymentNote.ilistbusPurPaymentNoteDetail.length !== 0
      ) {
        this.paymentNoteNotes.referenceId = this.paymentNote.purPaymentNoteId;
        this.paymentNoteNotes.lstDDLClass = [];
        this.paymentNote.sentPurNotes = this.paymentNoteNotes;
        this.accountsService
          .saveNotesForPaymentNote(this.paymentNote, this.options)
          .pipe(
            finalize(() => {
            })
          )
          .subscribe((success) => {
            this.paymentNote = success;
            this.screenDisabled();
            // this.updateStatus();

            this.voucherId = success.actVoucherConfigId;
            this.clearDisplayText();
          });
      } else {
        this.errorTrue = true;
        this.data.errorInfoMessage('Please add any items');
      }
    }
     else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }

  doClear() {
    this.data.successMessage('Data Cleared Successfully');

    this.errorTrue = false;
    this.bankAccountNo = '';
    this.createNewPaymentNote(this.voucherConfigId, this.regionDetailValue);
    this.clearDisplayText();
  }
  // async onTabChange(event: any) {
  //   this.tabIndex = event;
  //   this.selectedIndex = this.tabIndex;
  //   if (event === 4) {
  //     await this.viewPurPaymentNoteReceipt();
  //   }
  // }

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

}
