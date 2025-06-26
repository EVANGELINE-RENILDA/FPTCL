import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef, ViewChild, signal, } from '@angular/core';
import { AppService } from '../../../../../app.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { NgClass, SlicePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { ContentModule } from '../../../../../app-core/app-template/content/content.module';
import { TabContainerModule } from '../../../../../app-core/app-template/tab-container/tab-container.module';
import { TabItemModule } from '../../../../../app-core/app-template/tab-item/tab-item.module';
import { Row, InnerScroll, ViewLabel, } from '../../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective, } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../../../common/services/url/url.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entActCreditNote, entActVoucherConfig, entCheckLineItemBasedonDocumentDate, entGetMailInfo } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { SearchCustomerComponent } from '../../../../search/search-customer/search-customer.component';
import { autoSearchItems } from '../../../../home.component';
import { SplicePipe } from '../../../../../common/pipes/app-splice/splice.pipe';
import { AutoGetItemComponent } from '../../../../search/auto-get-item/auto-get-item.component';

import { CreditNoteDetailAttachmentComponent } from '../credit-note-detail-attachment/credit-note-detail-attachment.component';
import { CreditNoteDetailPreviewComponent } from '../credit-note-detail-preview/credit-note-detail-preview.component';
import { CreditNoteDetailNotesComponent } from './credit-note-detail-notes/credit-note-detail-notes.component';
import { DialogAnimateService } from '../../../../../common/services/dialog-animated/dialog-animate.service';
import { AppSafePipe } from '../../../../../common/pipes/app-safe/app-safe.pipe';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';


@Component({
  selector: 'app-credit-note-detail',
  standalone: true,
  imports: [
    Row,
    InnerScroll,
    InputControlComponent,
    FormsModule,
    ViewLabel,
    IconButtonComponent,
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    AppDatePipe,
    ContentModule,
    TabContainerModule,
    TabItemModule,
    SearchComponent,
    FooterToggleDirective,
    NgClass,
    MatMenuModule,
    DropZoneComponent,
    SearchCustomerComponent,
    SplicePipe,
    AutoGetItemComponent,
    InnerScroll,
    AppSafePipe,
    CreditNoteDetailAttachmentComponent,
    CreditNoteDetailPreviewComponent,
    CreditNoteDetailNotesComponent


  ],
  providers: [SplicePipe],
  templateUrl: './credit-note-detail.component.html',
  styleUrl: './credit-note-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreditNoteDetailComponent {
  @ViewChild('mailTemplate', { static: false })
  mailTemplate!: TemplateRef<any>;
  pageId = 'AJVSC';
  selectedTab = 0;
  fileUrl = '';
  branchName = ''

  items: any = [
    '',
    'sNo',
    'item',
    'ledger',
    'quantity',
    'unitPrice',
    'dis',
    'afterDiscount',
    'tax',
    'total',
    'add',
  ];

  itemsName: any = [
    ' ',
    'SI No',
    'Item ',
    'Item Ledger ',
    'Quantity',
    'Unit Price',
    'Dis',
    'After Discount',
    'Tax',
    'Total',
  ];
  qutationData = [];
  blob = {};
  urlFileName = ''

  notes: any = ['sno', 'notes', 'createdBy', 'dateTime', 'add'];
  notesName: any = ['', 'Notes', 'Created By', 'Date | Time', ''];
  accordianOpen = true;
  accordianContent = true;
  tableItemData: any = [];
  tableNoteData = [];
  tableAttachmentData = [];
  attachment: any = ['sno', 'fileName', 'fileFormat', 'size', 'add'];
  attachmentsName: any = ['#', 'File Name', 'File Format', 'Size', 'add'];

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('notesDialog') notesDialog!: TemplateRef<any>;
  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;

  accept =
    '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword';

  appActVoucherConfigId: any = 0;
  regionDetailValue: any = '';
  id: any = 0;
  voucherId: any = 0;
  customerIdRAW = 0;
  dateNotEffective = '';
  voucherConfigId: any = 0;
  regionValueDDL: any = [];
  plstentCreditNoteItemRaw: any = [];
  plstentCreditNoteItemQuantity: any = [];
  statusSource: any = [];
  customerFlag = false;
  voucherid: any = '';
  edit = false;
  errorTrue = false;
  salesInvoiceId: any = 0;
  salesInvoiceIdRaw: any = 0;
  clearVoucherNo = false;
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
base64String: any = '';

  mailInfo = new entGetMailInfo();
  attachmentList: any = [];
  options = {
    type: 'accountsPath',
  };

  @ViewChild('a') aform!: NgForm;
  @ViewChild('conversiontab') conversiontabform!: NgForm;
  @ViewChild('b') bform!: NgForm;
  @ViewChild('c') cform!: NgForm;

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  accountsoptions = {
    type: 'accountsPath',
  };

  creditNote = new entActCreditNote();
  voucherConfig = new entActVoucherConfig();
  checkDocumentDate: any = new entCheckLineItemBasedonDocumentDate();
  autoSearchItems = new autoSearchItems();
  __isDisabled = signal(true);

  constructor(
    public appService: AppService,
    public data: DataService,
    public dialog: CoreService,
    public route: ActivatedRoute,
    public url: UrlService,
    public initialData: InitialDataService,
    public api: AccountsApiService,
    public router: Router,
    public splicePipe: SplicePipe,
    public dialogService : DialogAnimateService,
    public accountsService: AccountsApiService,
    public storage:AppStorageService

  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);

    this.id = params.data;
    this.appActVoucherConfigId = params.data1;
    this.regionDetailValue = params.data2;

    await this.data.checkToken();
    this.viewSalCreditNote()

    await this.initialData.getAcccountsDDL(
      'getCreditNoteInitialData',
      this.options
    );
    await this.storage.get('branchFinance').then((val) => {
      this.branchName = val;
    });

    if (this.id === 0) {
      this.createNewSalesOrderDetail(
        this.appActVoucherConfigId,
        this.regionDetailValue
      );
    } else {
      this.openCreditNote(this.id);
    }
  }

  createNewSalesOrderDetail(val: any, val1: any) {
    this.errorTrue = false;
    const obj = {
      data: val,
      data1: val1,
    };
    this.api.createNewCreditNote(obj).subscribe((success) => {
      this.creditNote = success;
      this.updateStatus();
      this.customerIdRAW = 0;
      this.voucherId = success.actVoucherConfiId;
      this.dateNotEffective = success.documentDate;
      this.edit = true
    })
  }

  openCreditNote(val: any) {
    const obj = {
      data: val,
    };
    this.api.openCreditNote(obj, this.options).subscribe((success) => {
      this.creditNote = success;
      this.updateStatus()
      this.getVoucherDetail(this.creditNote.actVoucherConfiId !== 0 ? this.creditNote.actVoucherConfiId : this.voucherConfigId);
      this.customerIdRAW = success.actCustomerId;
      this.voucherConfigId = success.actVoucherConfiId;
      this.voucherId = success.actVoucherConfiId;
      this.dateNotEffective = success.documentDate;
      this.plstentCreditNoteItemQuantity = JSON.parse(JSON.stringify(success.plstentCreditNoteItem));
      this.plstentCreditNoteItemRaw = JSON.parse(JSON.stringify(success.plstentCreditNoteItem));
      this.openCustomer(success);
      this.hideBtnBasedonStatus();
      if (success.msg.infoMessage.msgDescription) {
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      }
    });
  }

  getVoucherDetail(element: any) {
    const obj = {
      data: element,
    };
    this.api.getVoucherAccess(obj, this.options)
      .subscribe((success) => {
        this.voucherConfigId = success.actVoucherConfigId;
        this.voucherConfig = success;
        this.regionValueDDL = success.plstentDDLClass
      });
  }

  openCustomer(val: any) {
    const obj = {
      data: val.actCustomerId,
      data1: this.creditNote.regionValue
    };
    this.api.getCustomerDetailsForSearch(obj, this.options)
      .subscribe((success) => {
        this.creditNote.iActCustomerDetails = success;
        this.creditNote.docCurrencyValue = success.currencyCodeValue;
        this.initialData.DDLValues.DDLAddress = success.lstAddress;
        if (success.actCustomerId === 0) {
          this.creditNote.currencyRate = '0.00000000';
        }
        if (this.creditNote.currencyValue === success.currencyCodeValue) {
          this.creditNote.currencyRate = '1.00000000';
        } else {
          if (this.customerFlag && success.actCustomerId !== 0) {
            this.documentDateConversioDate();
          }
        }
        this.customerFlag = false;
      });
  }

  documentDateConversioDate() {
    if (this.creditNote.documentDate !== '') {
      if (
        (this.creditNote.statusValue === 'INPRO' ||
          this.creditNote.statusValue === 'PENAP') &&
        this.creditNote.pientVoucherConfig.needCash === 'N'
      ) {
        this.checkDocumentDatelist();
        // const obj = {
        //   data: this.creditNote.documentDate,
        //   data1: this.creditNote.iActCustomerDetails.currencyCodeValue,
        // };
        this.api.documentDateConversioDate(this.checkDocumentDate, this.options).subscribe(
          (success) => {
            this.dateNotEffective = this.creditNote.documentDate;
            if (
              this.creditNote.currencyValue ===
              this.creditNote.iActCustomerDetails.currencyCodeValue
            ) {
              this.creditNote.currencyRate = '1.00000000';
            } else {
              if (success.conversionRate !== 0) {
                this.creditNote.currencyRate = success.conversionRate;
              }
            }
          },
          (e) => {
            this.creditNote.documentDate = this.dateNotEffective;
          }
        );
      } else {
      }
    } else {
    }
  }

  checkDocumentDatelist() {
    let result = '';
    let j = 0;
    if (this.creditNote.plstentCreditNoteItem.length !== 0) {
      for (let i = 0; i < this.creditNote.plstentCreditNoteItem.length; i++) {
        if (this.creditNote.plstentCreditNoteItem[i].invItemId !== 0) {
          if (
            this.creditNote.plstentCreditNoteItem[i].salSalesInvoiceId !== 0
          ) {
            if (j > 0) {
              result += ',';
            } else {
              j++;
            }
            result +=
              this.creditNote.plstentCreditNoteItem[i].salSalesInvoiceId;
            this.voucherid = result;
          }
        }
      }
    }
    this.checkDocumentDate.documentDate = this.creditNote.documentDate;
    this.checkDocumentDate.voucherType =
      this.creditNote.pientVoucherConfig.voucherTypeValue;
    this.checkDocumentDate.voucherIds = this.voucherid;
    this.checkDocumentDate.targetCurrencyValue =
      this.creditNote.iActCustomerDetails.currencyCodeValue;
  }

  hideBtnBasedonStatus() {
    let hideButton = false;
    if (
      this.creditNote.statusValue === 'APROV' ||
      this.creditNote.statusValue === 'CANCL' ||
      this.creditNote.statusValue === 'PENAP'
    ) {
      hideButton = true;
    } else {
      hideButton = false;
    }

    return hideButton;
  }

  async doCustomerSelect(event: any) {
    this.creditNote.actCustomerId = event.actCustomerId;
    this.creditNote.iActCustomerDetails.customerName = event.customerName;
    this.customerFlag = true;
    if (
      this.customerIdRAW !== 0 &&
      this.customerIdRAW !== this.creditNote.actCustomerId
    ) {
      // let isCustomerChange = await this.alert.partyAlert(
      //   'Do you want to change customer, If you change customer then entire data will be clear'
      // );
      // if (isCustomerChange) {
      //   ;
      //   let currentDate: any = await this.appService.getCurrentDate();
      //   this.creditNote.documentDate = currentDate;
      //   this.creditNote.plstentCreditNoteItem = [];
      //   this.creditNote.actCustomerId = event.actCustomerId;
      // } else {
      //   this.creditNote.actCustomerId = this.customerIdRAW;
      //   event.actCustomerId = this.customerIdRAW;
      // }
    }
    this.customerIdRAW = this.creditNote.actCustomerId;
    this.openCustomer(event);
  }

  saveCreditNote() {
    if (this.aform.valid && this.conversiontabform.valid) {
      if (this.creditNote.plstentCreditNoteItem.length !== 0) {
        this.errorTrue = false;
        this.api.saveCreditNote(this.creditNote, this.options)
          .subscribe(async (success) => {
            this.creditNote = success;
            this.updateStatus()
            this.plstentCreditNoteItemRaw = JSON.parse(
              JSON.stringify(success.plstentCreditNoteItem)
            );
            this.clearDisplayText();
            this.statusSource = success.plistentSalSalesInvoiceStatusHistory

            if (success.actCreditNoteId !== 0) {
              const obj = {
                data: success.actCreditNoteId,
                data1: 0,
              };
              let urlJson = await this.url.encode(obj);
              this.router.navigateByUrl(
                '/home/sales/credit-note/detail/' + urlJson
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

  doGetItemSelect(event: any) {
    this.salesInvoiceId = event.id;
    this.autoSearchItems.autoSearchItemId = event.id;
    this.autoSearchItems.autoSearchText = event.name;
  }
  clearDisplayText() {
    this.autoSearchItems = new autoSearchItems();
  }

  getItemCNFromSI(items?: any) {
    if (this.checkExistsItem(this.salesInvoiceId)) {
      if (this.salesInvoiceId !== 0) {
        if (
          this.creditNote.plstentCreditNoteItem.length === 0 ||
          this.salesInvoiceId === this.salesInvoiceIdRaw
        ) {
          const obj = {
            data: this.salesInvoiceId,
            data1: this.creditNote.pientVoucherConfig.voucherTypeValue,
          };
          this.api.getItemCNFromSI(obj, this.options)
            .subscribe((success) => {
              this.tableItemData = success.plstentActCreditNoteItem
              this.creditNote.currencyRate =
                success.plstentActCreditNoteItem[0].plentSalSalesInvoice.currencyRate;
              this.plstentCreditNoteItemQuantity = JSON.parse(
                JSON.stringify(success.plstentActCreditNoteItem)
              );
              this.plstentCreditNoteItemRaw = JSON.parse(
                JSON.stringify(success.plstentActCreditNoteItem)
              );
              this.creditNote.plstentCreditNoteItem = JSON.parse(
                JSON.stringify(success.plstentActCreditNoteItem)
              );
              this.clearDisplayText();
              setTimeout(() => {
                this.clearVoucherNo = false;
              }, 300);
              if (this.plstentCreditNoteItemRaw.length !== 0) {
                const index = this.plstentCreditNoteItemRaw
                  .map((e: any) => e.salSalesInvoiceId)
                  .indexOf(this.salesInvoiceId);
                if (index !== -1) {
                  this.salesInvoiceIdRaw =
                    this.plstentCreditNoteItemRaw[index].salSalesInvoiceId;
                }
              }
              this.deleteGetItems();
              if (this.creditNote.plstentCreditNoteItem.length !== 0) {
                for (
                  let i = 0;
                  i < this.creditNote.plstentCreditNoteItem.length;
                  i++
                ) {
                  if (
                    this.creditNote.plstentCreditNoteItem[i].invItemId !== 0
                  ) {
                    let tax =
                      this.creditNote.plstentCreditNoteItem[i].plentInvItem
                        .actTaxCodeValue;
                    if (tax === 'VAT-C') {
                      let val = 0;
                      this.creditNote.plstentCreditNoteItem[i].taxPercentage =
                        JSON.parse(JSON.stringify(val));
                    }
                  }
                }
              }
            });
        } else {
          this.data.errorInfoMessage('Only one sales invoice allowed');
        }
      } else {
        this.data.errorInfoMessage('Please select sales invoice reference no');
      }
    }
  }

  checkExistsItem(val: any) {
    if (this.creditNote.plstentCreditNoteItem.length !== 0) {
      for (let i = 0; i < this.creditNote.plstentCreditNoteItem.length; i++) {
        if (
          this.creditNote.plstentCreditNoteItem[i].salSalesInvoiceId === val
        ) {
          let refNumber =
            this.creditNote.plstentCreditNoteItem[i].plentSalSalesInvoice
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
    return true;
  }

  deleteGetItems() {
    this.creditNote.plstentCreditNoteItem = this.splicePipe.transform(
      this.creditNote.plstentCreditNoteItem,
      'plentInvItem'
    );
    this.plstentCreditNoteItemQuantity = this.splicePipe.transform(
      this.plstentCreditNoteItemQuantity,
      'plentInvItem'
    );
  }
  getNotesValue(val: any) {
    this.creditNote = val;
    this.updateStatus();
    this.hideBtnBasedonStatus();

    // if (val.statusValue === 'APROV') {
    //   this.onSelectTab(3);
    // }
  }

  updateStatus() {
    this.__isDisabled.set(this.creditNote.statusValue !== 'APROV' && this.creditNote.statusValue !== 'CANCL' && this.creditNote.statusValue !== 'PENAP');
  }

  async itemsDelete(val: any, index: any) {
    let msg = `you want to delete this Item ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      if (val.actCreditNoteItemId !== 0) {
        this.deleteCreditNoteItem(val, index);
      } else {

        this.creditNote.plstentCreditNoteItem.splice(index, 1);
        this.tableItemData = this.creditNote.plstentCreditNoteItem
        this.data.successMessage('Item removed successfully');
      }
    }
  }

  deleteCreditNoteItem(val: any, i: any) {
    this.creditNote.plstentCreditNoteItem[i].sreDeletedFlag = 'Y';
    this.api.deleteCreditNoteItem(this.creditNote, this.options)
      .subscribe((success) => {
        this.creditNote = success;
      });
  }

  navigateToList() {
    this.router.navigateByUrl('/home/sales/credit-note/search')
  }
  onSelectTab(val: any) {
    this.selectedTab = val;
    if(val===4){
      this.viewSalCreditNote();
    }
  }

  async createNewNotes() {
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: '400px',
      width: '900px',
      maxWidth: '1170px',
    });
  }
  saveNotes() { }
  clear() {
    this.createNewSalesOrderDetail(this.appActVoucherConfigId, this.regionDetailValue);
    this.data.successMessage('Data Cleared Successfully');
  }

  //attachment
  async createNewAttachment() {
    let dialogResponse: any = await this.dialog.openDialog(
      this.attachmentDialog,
      {
        disableClose: true,
        height: '300px',
        width: '100%',
        maxWidth: '1170px',
      }
    );
  }
  viewSalCreditNote() {
    debugger
      if (this.creditNote.actCreditNoteId !== 0) {
        const obj = {
          data: this.creditNote.actCreditNoteId,
          data1: this.creditNote.pientVoucherConfig.pdfOtherComments,
        };
        const options = {
          responseType: 'blob'
        }
        this.accountsService.viewCreditNoteReceipt(obj, options).subscribe((success: any) => {
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
