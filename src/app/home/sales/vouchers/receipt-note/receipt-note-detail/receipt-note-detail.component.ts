import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef, ViewChild, signal } from '@angular/core';
import { AppService } from '../../../../../app.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { NgClass } from '@angular/common';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { MultiPageUrlComponent } from '../../../../../app-core/template/multi-page-url/multi-page-url.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../../../common/services/url/url.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entActVoucherConfig, entCheckLineItemBasedonDocumentDate, entGetMailInfo, entSalReceiptNote } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { FormsModule, NgForm } from '@angular/forms';
import { ReceiptNoteNotesComponent } from '../receipt-note-notes/receipt-note-notes.component';
import { ReceiptNotePreviewComponent } from '../receipt-note-preview/receipt-note-preview.component';
import { ReceiptNoteAttachmentComponent } from '../receipt-note-attachment/receipt-note-attachment.component';
import { SearchCustomerComponent } from '../../../../search/search-customer/search-customer.component';
import { SearchDebitComponent } from '../../../../search/search-debit/search-debit.component';
import { autoSearchItems } from '../../../../purchase/voucher/purchase-invoice/purchase-invoice-detail/purchase-invoice-detail.component';
import { AutoGetItemComponent } from '../../../../search/auto-get-item/auto-get-item.component';
import { DialogAnimateService } from '../../../../../common/services/dialog-animated/dialog-animate.service';
import { AppSafePipe } from '../../../../../common/pipes/app-safe/app-safe.pipe';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';
import { ReceiptNoteItemsComponent } from '../receipt-note-items/receipt-note-items.component';

@Component({
  selector: 'app-receipt-note-detail',
  standalone: true,
  imports: [MultiPageUrlComponent, Row, ViewLabel, InputControlComponent,
     IconButtonComponent, AppDatePipe, AppTableComponent, FooterToggleDirective,
      NgClass, CellDefDirective, CellHeaderDefDirective, CheckboxComponent, SearchComponent,
       MatMenuModule, DropZoneComponent, FormsModule, AppDatePipe, ReceiptNoteNotesComponent,
        ReceiptNotePreviewComponent, ReceiptNoteAttachmentComponent, SearchCustomerComponent,
         SearchDebitComponent, InnerScroll, AutoGetItemComponent,AppSafePipe, ReceiptNoteItemsComponent],
  templateUrl: './receipt-note-detail.component.html',
  styleUrl: './receipt-note-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReceiptNoteDetailComponent {
  @ViewChild('mailTemplate', { static: false })
  mailTemplate!: TemplateRef<any>;
  @ViewChild('date') dateform!: NgForm;
  @ViewChild('customertab') customertabform!: NgForm;
  @ViewChild('conversionrate') conversionrateform!: NgForm;
  // @Input() parentData = new entSalReceiptNote();
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
base64String: any = '';
branchName = ''

 mailInfo = new entGetMailInfo();
 attachmentList: any = [];
 options = {
   type: 'accountsPath',
 };
  errorTrue = false;
  __isDisabled = signal(true);
  branchBankName = '';
  receiptNote = new entSalReceiptNote();
  voucherConfig = new entActVoucherConfig();
  checkDocumentDate: any = new entCheckLineItemBasedonDocumentDate();
  autoSearchItems = new autoSearchItems();
  appActVoucherConfigId: any = 0;
  regionDetailValue: any = '';
  saleOrderId = 0;
  dateNotEffective = '';
  bankAccountNo: any = ''
  pageId = 'AJVSC';
  infoMore = false;
  selectedTab = 0;
  customerIdRAW = 0;
  id: any = 0;
  voucherId: any = 0;
  voucherConfigId: any = 0;
  regionValueDDL: any = [];
  initialRegionValue: any = '';
  voucherid: any = '';
  customerFlag = false;
  finalNet: any
  accountsoptions = {
    type: 'accountsPath',
  };
  items: any = ['sNo', 'sales', 'si', 'adavance', 'balance', 'current', 'delete'];

  itemsName: any = [
    ' ',
    'Sales',
    'SO Amount ',
    'Credit Note ',
    'Received Till Date',
    'Total Balance Amount',
    'Receipt Amount',
  ];
  qutationData = [];
  blob = {};
  fileUrl = '';
  urlFileName = ''
  notes: any = ['sno', 'notes', 'createdBy', 'dateTime', 'add'];
  notesName: any = ['', 'Notes', 'Created By', 'Date | Time', ''];
  accordianOpen = true;
  accordianContent = true;
  tableItemData = [];
  tableNoteData = [];
  tableAttachmentData = [];
  clearVoucherNo = false;
  lstentSalReceiptNoteDetailRaw: any = [];
  attachment: any = ['sno', 'fileName', 'fileFormat', 'size', 'add'];
  attachmentsName: any = ['#', 'File Name', 'File Format', 'Size', 'add'];

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('notesDialog') notesDialog!: TemplateRef<any>;
  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;

  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword';

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  constructor(
    public apiService: ApplicationApiService,
    public appService: AppService,
    public data: DataService,
    public dialog: CoreService,
    public route: ActivatedRoute,
    public url: UrlService,
    public initialData: InitialDataService,
    public accountsService: AccountsApiService,
    public router: Router,
    public dialogService : DialogAnimateService,
    public storage:AppStorageService
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }
  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    this.appService.setBreadCrumb(this.breadCrumb);
    let params: any = await this.url.decode(id);
    this.id = params.data;
    this.appActVoucherConfigId = params.data1;
    this.regionDetailValue = params.data2;
    await this.data.checkToken();
    this.getListofBankBasedonBranch();

    await this.initialData.getAcccountsDDL('getSaleReceiptNotesInitialData');
this.viewSalReceiptNote();
await this.storage.get('branchFinance').then((val) => {
  this.branchName = val;
});
    if (this.id === 0) {
      this.createNewReceiptNotes(this.appActVoucherConfigId, this.regionDetailValue);

    } else {
      this.openReceiptNote(this.id);
    }

  }
  createNewReceiptNotes(val: any, val1: any, type?: any) {
    const obj = {
      longData1: val,
      longData2: 0,
      strData1:val1
    };
    this.accountsService.createNewSalesReceiptNotes(obj)
      .subscribe((success) => {
        this.receiptNote = success;
        this.errorTrue = false;

        this.screenDisabled();
        this.voucherId = success.actVoucherConfigId;
        this.dateNotEffective = success.documentDate;
        if (type === 'clear') {
          this.data.successMessage('Data Cleared Successfully');
        }
      });
  }


  openReceiptNote(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .openSalesReceiptNote(obj)
      .subscribe((success) => {
        this.receiptNote = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.finalNet = Number(this.receiptNote.lstentActCurrencyExchangerate[0].reportingCurrencyAmount) * Number(this.receiptNote.currencyRate)
        this.screenDisabled();
        // this.finalNet = Number(this.advanceReceiptNotes.lstentActCurrencyExchangerate[0].reportingCurrencyAmount) * Number(this.advanceReceiptNotes.currencyRate)
        // this.updateStatus();
        this.hideBtnBasedonStatus();
        this.bankBranchAc(success.actCompanyBranchBankDetailId);
        this.tableNoteData = success.lstentSalNotes;
        this.tableAttachmentData = success.plstentSalAttachments;

        // this.dateNotEffective = success.documentDate;
        // this.appActVoucherConfigId = success.appActVoucherConfigId;
        // this.updateSequence = success.updateSequence;
        // this.openCustomer(success.ientActCustomerDetails);
      });
  }
  screenDisabled() {
    this.__isDisabled.set(
      this.receiptNote.statusValue === 'APROV' ||
      this.receiptNote.statusValue === 'CANCL' ||
      this.receiptNote.statusValue === 'PENAP'
    );
  }
  onLedgerSelect(event: any) {
    this.receiptNote.cashbookLedgerId = event.actLedgerId;
    this.receiptNote.iActLedger.ledgerName = event.ledgerName;
  }
  hideBtnBasedonStatus() {
    let hideButton;
    if (
      this.receiptNote.statusValue === 'APROV' ||
      this.receiptNote.statusValue === 'CANCL'
    ) {
      hideButton = true;
    } else {
      hideButton = false;
    }
    return hideButton;
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
          this.receiptNote.pentActCompanyBranchBankDetail = this.initialData.DDLValues.DDLBankBranch[i];
          this.branchBankName =
            this.initialData.DDLValues.DDLBankBranch[i]
              .bankName +
            '/' +
            this.initialData.DDLValues.DDLBankBranch[i]
              .bankAccountNo;
        }
      }
    }
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
        this.regionValueDDL = success.plstentDDLClass;
      });
  }

  async navigateDetail(z: any) {
    if (z.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: this.initialRegionValue,
        };
        let urlJson = await this.url.encode(obj);
        this.router.navigateByUrl(
          '/home/sales/receipt-note/detail/' + urlJson
        );
      } else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    } else {
      this.errorTrue = true;
    }
  }

  documentDateConversioDate() {

    if (
      this.receiptNote.documentDate !== '' &&
      this.receiptNote.currencyValue !== ''
    ) {
      if (
        this.receiptNote.statusValue === 'INPRO' ||
        this.receiptNote.statusValue === 'PENAP'
      ) {
        this.checkDocumentDatelist();
        this.accountsService
          .documentDateConversioDate(this.checkDocumentDate, this.options)
          .subscribe(
            (success) => {
              this.errorTrue = false;
              this.dateNotEffective = this.receiptNote.documentDate;
              if (
                this.receiptNote.currencyValue ===
                this.receiptNote.currencyValue
              ) {
                this.receiptNote.currencyRate = '1.00000000';
              } else {
                this.receiptNote.currencyRate = success.conversionRate;
              }
            },
            (e) => {
              this.receiptNote.documentDate = this.dateNotEffective;
            }
          );
      }
    }
  }

  checkDocumentDatelist() {

    let result = '';
    let j = 0;
    if (
      this.receiptNote.lstentSalReceiptNoteDetail.length !== 0
    ) {
      for (
        let i = 0;
        i < this.receiptNote.lstentSalReceiptNoteDetail.length;
        i++
      ) {
        if (
          this.receiptNote.lstentSalReceiptNoteDetail[i]
            .salSalesOrderId !== 0
        ) {
          if (j > 0) {
            result += ',';
          } else {
            j++;
          }
          result +=
            this.receiptNote.lstentSalReceiptNoteDetail[i]
              .salSalesOrderId;
          ;
          this.voucherid = result;
        }
      }
    }
    this.checkDocumentDate.documentDate = this.receiptNote.documentDate;
    this.checkDocumentDate.voucherType =
      this.receiptNote.iActVoucherConfig.voucherTypeValue;
    this.checkDocumentDate.voucherIds = this.voucherid;
    this.checkDocumentDate.targetCurrencyValue =
      this.receiptNote.iActCustomerDetails.currencyCodeValue;
  }

  getNotesValue(val: any) {
    this.receiptNote = val;
    this.updateStatus();
    this.hideBtnBasedonStatus();

    // if (val.statusValue === 'APROV') {
    //   this.onSelectTab(3);
    // }
  }
  updateStatus() {
    this.__isDisabled.set(this.receiptNote.statusValue !== 'APROV' && this.receiptNote.statusValue !== 'CANCL' && this.receiptNote.statusValue !== 'PENAP');
  }
  finalNetAmount(event: any) {
    this.finalNet = Number(this.receiptNote.lstentActCurrencyExchangerate[0].reportingCurrencyAmount) * Number(this.receiptNote.currencyRate)
  }
  async doCustomerSelect(event: any) {
    this.receiptNote.actCustomerId = event.actCustomerId;
    this.receiptNote.iActCustomerDetails.customerName = event.customerName;

    this.customerFlag = true;
    if (
      this.customerIdRAW !== 0 &&
      this.customerIdRAW !== this.receiptNote.actCustomerId
    ) {
      let isCustomerChange = await this.dialog.confirmDialog(
        'Do you want to change vendor, If you change customer then entire data will be clear'
      );
      if (isCustomerChange) {
        let currentDate: any = await this.appService.getCurrentDate();
        this.receiptNote.documentDate = currentDate;
        this.receiptNote.lstentSalReceiptNoteDetail = [];
        this.receiptNote.modeValue = '';
        this.receiptNote.actCompanyBranchBankDetailId = 0;
        this.branchBankName = '';
        this.receiptNote.chequeDate = '';
        this.receiptNote.chequeNumber = '';
        this.receiptNote.actCustomerId = event.actCustomerId;
      } else {
        this.receiptNote.actCustomerId = this.customerIdRAW;
        event.actCustomerId = this.customerIdRAW;
      }
    }
    this.customerIdRAW = this.receiptNote.actCustomerId;
    this.openCustomer(event);
  }

  openCustomer(val: any) {
    const obj = {
      data: val.actCustomerId,
      data1: this.regionDetailValue
    };
    this.accountsService.getCustomerDetailsForSearch(obj, this.options)
      .subscribe((success) => {
        this.receiptNote.iActCustomerDetails = success;
        this.receiptNote.reportingCurrencyValue = success.currencyCodeValue;
        if (this.receiptNote.currencyValue === success.currencyCodeValue) {
          this.receiptNote.currencyRate = '1';
        }
        if (this.customerFlag) {
          this.documentDateConversioDate();
        }
        this.customerFlag = false;
      });
  }


  getListofBankBasedonBranch(): Promise<boolean> {
    return new Promise((resolve) => {
      this.accountsService
        .getListofBankBasedonBranch(this.options)
        .subscribe((success: any) => {
          this.initialData.DDLValues.DDLBankBranch =
            success.lstentActCompanyBranchBankDetail;
          this.bankAccountNo = success;
          resolve(true);
        });
    });
  }
  doGetItemSelect(event: any) {
    this.saleOrderId = event.id;
    this.autoSearchItems.autoSearchItemId = event.id;
    this.autoSearchItems.autoSearchText = event.name;
  }


  clearDisplayText() {
    this.autoSearchItems = new autoSearchItems();
  }

  checkAlreadyExists(val: any) {
    if (this.receiptNote.lstentSalReceiptNoteDetail.length !== 0) {
      for (
        let i = 0;
        i < this.receiptNote.lstentSalReceiptNoteDetail.length;
        i++
      ) {
        if (
          this.receiptNote.lstentSalReceiptNoteDetail[i].salSalesInvoiceId !== 0
        ) {
          if (
            this.receiptNote.lstentSalReceiptNoteDetail[i].salSalesInvoiceId ===
            val
          ) {
            let refNumber =
              this.receiptNote.lstentSalReceiptNoteDetail[i].ibusSalesInvoice
                .saleInvoiceReferenceNo;
            this.data.errorInfoMessage(
              'The selected document no (' +
              refNumber +
              ') has been already added in list'
            );
            return false;
          }
        }
      }
    }
    return true;
  }

  saveSalesReceipt() {
    if (this.dateform.valid &&
      this.customertabform.valid &&
      this.conversionrateform.valid

    ) {
      if (this.receiptNote.lstentSalReceiptNoteDetail.length !== 0) {
        this.errorTrue = false;
        this.accountsService.saveSalesReceiptNotes(this.receiptNote).subscribe(async (success) => {
          this.receiptNote = success;
          this.screenDisabled()
          this.clearDisplayText();
          const obj = {
            data: success.salReceiptNoteId,
            data1: 0,
          };
          let urlJson = await this.url.encode(obj);
          this.router.navigateByUrl(
            '/home/sales/receipt-note/detail/' + urlJson
          );
          if (success.msg.infoMessage.msgDescription) {
            this.data.successMessage(success.msg.infoMessage.msgDescription);
          }
        });
      } else {
        this.errorTrue = true;
        this.data.errorInfoMessage('Please add any items');
      }
    } else {
      this.errorTrue = true;
    }

  }
  navigateToList() {
    this.router.navigateByUrl('/home/sales/receipt-note/search')
  }
  onSelectTab(val: any) {
    this.selectedTab = val;
    if(val===4){
      this.viewSalReceiptNote();
    }
  }

  getMoreInfo() {
    this.infoMore = true
  }
  getlessInfo() {
    this.infoMore = false
  }

  async createNewNotes() {
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: '400px',
      width: '900px',
      maxWidth: '1170px',
    })
  }
  saveNotes() {

  }
  clear() {
    this.createNewReceiptNotes(this.appActVoucherConfigId, this.regionDetailValue);
    this.data.successMessage('Data Cleared Successfully');
  }

  //attachment
  async createNewAttachment() {

    let dialogResponse: any = await this.dialog.openDialog(this.attachmentDialog, {
      disableClose: true,
      height: '300px',
      width: '100%',
      maxWidth: '1170px',
    })

  }
  async itemsDelete(val: any, index: any) {
    let msg = `you want to delete this Item ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      if (val.actCreditNoteItemId !== 0) {
        this.deleteReceiptNoteDetail(val, index);
      } else {

        this.receiptNote.lstentSalReceiptNoteDetail.splice(index, 1);
        this.tableItemData = this.receiptNote.lstentSalReceiptNoteDetail
        this.data.successMessage('Item removed successfully');
      }
    }
  }

  deleteReceiptNoteDetail(val: any, i: any) {
    this.receiptNote.lstentSalReceiptNoteDetail[i].sreDeletedFlag = 'Y';
    this.accountsService.deleteCreditNoteItem(this.receiptNote, this.options)
      .subscribe((success) => {
        this.receiptNote = success;
      });
  }

  viewSalReceiptNote() {
    debugger
    if (this.receiptNote.salReceiptNoteId !== 0) {
      const obj = {
        data: this.receiptNote.salReceiptNoteId,
        data1: this.receiptNote.iActVoucherConfig.pdfOtherComments,
      };
      const options = {
        responseType: 'blob'
      }
      this.accountsService.viewSalReceiptNoteReceipt(obj, options).subscribe((success: any) => {
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
  closePdf(){
    this.fileUrl =''
  }

  navigateToSales(){
    this.router.navigateByUrl('/home/corporate/sales-menus')
  }
}
