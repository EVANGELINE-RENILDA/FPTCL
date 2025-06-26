import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef, ViewChild, computed, signal } from '@angular/core';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from "../../../../../common/pipes/app-date/app-date.pipe";
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { AppService } from '../../../../../app.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { NgClass } from '@angular/common';
import { FooterToggleDirective } from '../../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { MatMenuModule } from '@angular/material/menu';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entActVoucherConfig, entGetMailInfo, entSalAttachments, entSalNotes, entSalSalesInvoice } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { autoSearchItems } from '../../../../home.component';
import { FormsModule, NgForm } from '@angular/forms';
import { SplicePipe } from '../../../../../common/pipes/app-splice/splice.pipe';
import { FilterAndSortPipe } from '../../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { DocumentsComponent } from '../../../../../app-core/template/documents/documents.component';
import { AppSafePipe } from '../../../../../common/pipes/app-safe/app-safe.pipe';
import { DialogAnimateService } from '../../../../../common/services/dialog-animated/dialog-animate.service';
import { ViewPdfComponent } from '../../../../../app-core/template/view-pdf/view-pdf.component';
import { AutoSearchCustomerComponent } from '../../../../search/auto-search-customer/auto-search-customer.component';
import { AutoSearchItemsComponent } from '../../../../search/auto-search-items/auto-search-items.component';
import { SearchDebitComponent } from '../../../../search/search-debit/search-debit.component';
import { SalesItemComponent } from './sales-item/sales-item.component';
import { SalesInvoiceNotesComponent } from './sales-invoice-notes/sales-invoice-notes.component';
import { SalesInvoiceAttachmentComponent } from './sales-invoice-attachment/sales-invoice-attachment.component';

@Component({
  selector: 'app-sales-invoice-detail',
  standalone: true,
  templateUrl: './sales-invoice-detail.component.html',
  styleUrl: './sales-invoice-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [SplicePipe],
  imports: [Row, InnerScroll, ViewLabel, InputControlComponent, IconButtonComponent, 
    AppDatePipe, AppTableComponent, FooterToggleDirective, NgClass, CellDefDirective,
     CellHeaderDefDirective, CheckboxComponent, SearchComponent, MatMenuModule, 
     DropZoneComponent, FormsModule, FilterAndSortPipe, AppSafePipe, 
     AutoSearchCustomerComponent, AutoSearchItemsComponent, SearchDebitComponent, 
     SalesItemComponent, SalesInvoiceNotesComponent,SalesInvoiceAttachmentComponent]
})
export class SalesInvoiceDetailComponent {
  pageId = "PUISC";
  status = signal("");
  isEditAllowed = computed(() => {
    return ["APROV", "CANCL"].includes(this.status());
  });

  salesInvoice = new entSalSalesInvoice();
  salesInvoiceRAW: any;

  @ViewChild('mailTemplate', { static: false })
  mailTemplate!: TemplateRef<any>;
  @ViewChild('headerTab') headertabform!: NgForm;

  salesAttachments = new entSalAttachments();
  filterFileName = '';
  blob = {};
  fileUrl = '';
  applicationrefNo=[]
  urlFileName = ''

  // edit = false;

  infoMore = false;
  selectedTab = 0;
  id: any = 0;
  customerIdRAW = 0;
  updateSequence = 0;
  // dateNotEffective = '';
  salesInvoiceNotes = new entSalNotes();
  autoSearchItems = new autoSearchItems();
  statusddl = [];
  regionValueDDL: any = [];
  voucherConfig = new entActVoucherConfig();
  voucherConfigId: any = 0;
  initialRegionValue: any = '';
  items: any = ['sNo', 'Sqno', 'item', 'ledger', 'quantity', 'unitPrice', 'dis', 'afterDiscount', 'tax', 'total', 'add'];
  options = {
    type: 'accountsPath',
  };
  itemsName: any = [
    ' ',
    'S-Order No',
    'Item ',
    'Ledger ',
    'Quantity',
    'Unit Price',
    'Dis',
    'After Discount',
    'Tax',
    'Total',
  ];
  voucherid: any = '';
  // checkDocumentDate: any = new entCheckLineItemBasedonDocumentDate();
  @ViewChild('DocumentsComponent', { static: false }) document!: DocumentsComponent;
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
  acoptions = {
    type: 'accountsPath',
  };
  fileType =
    'jpg, jpeg, png, tiff, gif, tif ,pdf, xls, doc, pdf, DOCX, ppt, PPTX, sql, txt, csv';
  qutationData = [];
  errorTrue = false;
  // __isDisabled = signal(true);
  appActVoucherConfigId: any = 0;
  regionDetailValue: any = '';

  accordianOpen = true;
  accordianContent = true;
  // tableItemData = [];
  tableNoteData = [];
  tableAttachmentData = [];
  // customerFlag = false;
  // plistentSalSalesInvoiceItemQuantity: any = [];
  voucherId: any = 0;

  attachment: any = ['sno', 'fileName', 'fileFormat', 'size', 'add'];
  attachmentsName: any = ['#', 'File Name', 'File Format', 'Size', 'add'];

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;
  // __isDisabledInput = signal(true);
  toggleArrow = true;

  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword';
  type: any;

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  constructor(
    public apiService: ApplicationApiService,
    public appService: AppService,
    public data: DataService,
    public dialog: CoreService,
    public router: Router,
    public accountsService: AccountsApiService,
    public route: ActivatedRoute,
    public url: UrlService,
    public initialData: InitialDataService,
    public splicePipe: SplicePipe,
    public appSetting: AppSettingsService,
    public dialogService: DialogAnimateService,



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
    await this.initialData.getAcccountsDDL('getSalesInvoiceInitialData');


    if (this.id === 0) {
      this.createNewSalesInvoice(this.appActVoucherConfigId, this.regionDetailValue);
    } else {
      this.openSalesInvoice(this.id);
    }

  }

  createNewSalesInvoice(val: any, val1: any) {
    this.errorTrue = false;
    const obj = {
      data: val,
      data1: val1
    };
    this.accountsService.createNewSalesInvoice(obj)
      .subscribe((success) => {
        this.salesInvoice = success;
        this.status.set(this.salesInvoice.statusValue);
        this.salesInvoiceRAW = success;
      });
  }

  openSalesInvoice(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .openSalesInvoice(obj)
      .subscribe((success) => {
        this.salesInvoice = success;
        this.salesInvoiceRAW = success;
        this.status.set(this.salesInvoice.statusValue);

        this.tableNoteData = success.plistSalNotes
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        // this.screenDisabled();
        // this.updateStatus();
        // this.hideBtnBasedonStatus();

        // this.tableNoteData=success.lstentSalNotes;
        this.salesInvoice.plistSalAttachments = success.plistSalAttachments;
        this.salesInvoice.plistSalNotes = success.plistSalNotes
        // this.dateNotEffective = success.documentDate;
        // this.appActVoucherConfigId = success.appActVoucherConfigId;
        // this.updateSequence = success.updateSequence;
        // this.openCustomer(success.ientActCustomerDetails);

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

    })
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

  async deleteActAttachmentFile(element: any) {
    let msg = "Are You Sure, Want to Delete " + element.attachmentFileName;
    let response = await this.dialog.confirmDialog(msg);
    if (response) {
      const obj = {
        data: element.salAttachmentsId
      }
      this.accountsService.deleteSalAttachmentFile(obj).subscribe((success) => {
        this.salesInvoice.plistSalAttachments = success.plstentSalAttachments;
      })
    }
  }
  // updateStatus() {
  //   this.__isDisabledInput.set(
  //     this.salesInvoice.statusValue !== 'APROV' &&
  //     this.salesInvoice.statusValue !== 'CANCL' &&
  //     this.salesInvoice.statusValue !== 'PENAP'
  //   );
  // }


  // hideBtnBasedonStatus() {
  //   let hideButton;
  //   if (
  //     this.salesInvoice.statusValue === 'APROV' ||
  //     this.salesInvoice.statusValue === 'CANCL'
  //   ) {
  //     hideButton = true;
  //   } else {
  //     hideButton = false;
  //   }

  //   return hideButton;
  // }
  doGetItemSelect(event: any) {
    this.salesInvoice.saleOrderId = event.id;
    this.autoSearchItems.autoSearchItemId = event.id;
    this.autoSearchItems.autoSearchText = event.name;
  }
  addressChange(val: any) {
    this.salesInvoice.customerShippingAddressId = val;
  }

  // screenDisabled() {
  //   let screenDisabled = false;
  //   if (
  //     this.salesInvoice.statusValue === 'APROV' ||
  //     this.salesInvoice.statusValue === 'CANCL' ||
  //     this.salesInvoice.statusValue === 'PENAP'
  //   ) {
  //     screenDisabled = true;
  //   } else {
  //     screenDisabled = false;
  //   }

  //   return screenDisabled;
  // }

  viewSalesInvoiceReceipt() {
    if (this.salesInvoice.salSalesInvoiceId !== 0) {
      const obj = {
        data: this.salesInvoice.salSalesInvoiceId,
        data1: this.salesInvoice.pActVoucherConfig.pdfOtherComments,
      };
      const options = {
        responseType: 'blob'
      }
      this.accountsService.viewSalesInvoiceReceipt(obj, options).subscribe((success: any) => {
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
    // debugger
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
    // debugger
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
  closePdf() {
    this.fileUrl = ''
  }
  toggle() {
    this.toggleArrow = !this.toggleArrow;
  }
  async doCustomerSelect(event: any) {
    if (this.salesInvoice.crmCustomerId !== 0 && this.salesInvoice.crmCustomerId !== this.salesInvoiceRAW?.crmCustomerId) {
      let isCustomerChange = await this.dialog.confirmDialog(
        'Do you want to change customer, If you change customer then entire data will be cleared'
      );
      if (isCustomerChange) {
        this.getCustomerOnSelect();
      }
    } else {
      this.getCustomerOnSelect();
    }
  }
  getCustomerDDLCustomerId(val:any){
    const obj={
      data:this.salesInvoice.crmCustomerId,
      data1:val

    }

this.apiService.getCustomerDDLCustomerId(obj).subscribe((success)=>{
  this.applicationrefNo=success
})
  }
  clearDisplayText() {
    this.autoSearchItems = new autoSearchItems();
  }
  getCustomerOnSelect() {
    const obj = {
      data: this.salesInvoice.crmCustomerId
    };
    this.accountsService.getActCustomerInfoByCrmCustomer(obj, this.options)
      .subscribe((success) => {
        this.salesInvoice.pActCustomerDetails = success;
        this.salesInvoice.actCustomerId = success.actCustomerId;
        this.salesInvoice.docCurrencyValue = success.currencyCodeValue;
        this.initialData.DDLValues.DDLAddress = success.lstAddress;
        if (success.actCustomerId === 0) {
          this.salesInvoice.currencyRate = '0.00000000';
        } else if (this.salesInvoice.currencyValue === success.currencyCodeValue) {
          this.salesInvoice.currencyRate = '1.00000000';
        } else {
          this.documentDateConversionDate();
        }
      });
  }
  documentDateConversionDate() {
    if (!this.salesInvoice || !this.salesInvoice.plistentSalSalesInvoiceItem?.length || this.salesInvoice.documentDate === '') {
      return; // Exit early if no items to process
    }
    if (this.salesInvoice.currencyValue === this.salesInvoice.pActCustomerDetails.currencyCodeValue
    ) {
      this.salesInvoice.currencyRate = '1.00000000';
      return;
    }
    if (['INPRO', 'PENAP'].includes(this.salesInvoice.statusValue) &&
      this.salesInvoice.pActVoucherConfig.needCash === 'N'
    ) {
      const voucherIds = this.salesInvoice.plistentSalSalesInvoiceItem
        .filter((item: any) => item.invItemId !== 0 && item.salSalesInvoiceId !== 0) // Filter valid items
        .map((item: any) => item.salSalesInvoiceId); // Map to their `salSalesInvoiceId`

      this.voucherid = voucherIds.join(',');
      let checkDocumentDate = {
        documentDate: this.salesInvoice.documentDate,
        voucherType: this.salesInvoice.pActVoucherConfig?.voucherTypeValue,
        voucherIds: this.voucherid,
        targetCurrencyValue: this.salesInvoice.pActCustomerDetails?.currencyCodeValue,
      }
      this.accountsService.documentDateConversioDate(checkDocumentDate, this.options).subscribe({
        next: (response) => {
          this.salesInvoice.currencyRate = response.conversionRate;
        },
        error: (error: any) => {
          this.salesInvoice.documentDate = "";
        }
      });


    }




    // debugger
    // if (this.salesInvoice.documentDate !== '') {
    //   if (
    //     (this.salesInvoice.statusValue === 'INPRO' ||
    //       this.salesInvoice.statusValue === 'PENAP') &&
    //     this.salesInvoice.pActVoucherConfig.needCash === 'N'
    //   ) {
    //     this.checkDocumentDatelist();
    //     // const obj = {
    //     //   data: this.creditNote.documentDate,
    //     //   data1: this.creditNote.iActCustomerDetails.currencyCodeValue,
    //     // };
    //     this.accountsService.documentDateConversioDate(this.checkDocumentDate, this.options).subscribe(
    //       (success) => {
    //         this.dateNotEffective = this.salesInvoice.documentDate;
    //         if (
    //           this.salesInvoice.currencyValue ===
    //           this.salesInvoice.pActCustomerDetails.currencyCodeValue
    //         ) {
    //           this.salesInvoice.currencyRate = '1.00000000';
    //         } else {
    //           if (success.conversionRate !== 0) {
    //             this.salesInvoice.currencyRate = success.conversionRate;
    //           }
    //         }
    //       },
    //       (e) => {
    //         this.salesInvoice.documentDate = this.dateNotEffective;
    //       }
    //     );
    //   } else {
    //   }
    // } else {
    // }
  }

  // checkDocumentDatelist() {
  //   // debugger
  //   let result = '';
  //   let j = 0;
  //   if (this.salesInvoice.plistentSalSalesInvoiceItem.length !== 0) {
  //     for (let i = 0; i < this.salesInvoice.plistentSalSalesInvoiceItem.length; i++) {
  //       if (this.salesInvoice.plistentSalSalesInvoiceItem[i].invItemId !== 0) {
  //         if (
  //           this.salesInvoice.plistentSalSalesInvoiceItem[i].salSalesInvoiceId !== 0
  //         ) {
  //           if (j > 0) {
  //             result += ',';
  //           } else {
  //             j++;
  //           }
  //           result +=
  //             this.salesInvoice.plistentSalSalesInvoiceItem[i].salSalesInvoiceId;
  //           this.voucherid = result;
  //         }
  //       }
  //     }
  //   }
  //   this.checkDocumentDate.documentDate = this.salesInvoice.documentDate;
  //   this.checkDocumentDate.voucherType =
  //     this.salesInvoice.pActVoucherConfig.voucherTypeValue;
  //   this.checkDocumentDate.voucherIds = this.voucherid;
  //   this.checkDocumentDate.targetCurrencyValue =
  //     this.salesInvoice.pActCustomerDetails.currencyCodeValue;
  // }
  saveSalesInvoiceDetail(val:any) {
    debugger
    if (this.headertabform.valid) {
      this.accountsService.saveSalesInvoice(this.salesInvoice).subscribe((success) => {
        this.salesInvoice = success;
        this.status.set(this.salesInvoice.statusValue);
        this.salesInvoiceRAW = success;
        if(val==='save'){
           this.reDirectTo(success.salSalesInvoiceId);
        }
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  async reDirectTo(id: any) {
    const obj = {
      data: id,
        data1: 0,
        data2: ''
    };
    const encode = await this.url.encode(obj);
    this.router.navigateByUrl(
      '/home/sales/sales-invoice/detail/' + encode
    );
  }
  async onSelectTab(val: any) {
    this.selectedTab = val;
    if (val === 3) {
      await this.viewSalesInvoiceReceipt();
    }
  }
  navigateToList() {
    this.router.navigateByUrl('/home/sales/sales-invoice/search')
  }
  getMoreInfo() {
    this.infoMore = true
  }
  getlessInfo() {
    this.infoMore = false
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

  // getSalesOrderItemsByOrderIdAndSetAsInvoiceItem() {
  //   this.itemListCheck();
  //   if (this.salesInvoice.saleOrderId !== 0) {
  //     if (this.checkAlreadyExists(this.salesInvoice.saleOrderId)) {
  //       const obj = {
  //         data: this.salesInvoice.saleOrderId,
  //         data1: this.salesInvoice.pActVoucherConfig.voucherTypeValue,
  //       };
  //       this.accountsService
  //         .getSalesOrderItemsByOrderIdAndSetAsInvoiceItem(obj, this.options)
  //         .subscribe((success) => {
  //           success.plstentSalSalesInvoiceItem.forEach((e: any) => {
  //             this.salesInvoice.plistentSalSalesInvoiceItem.push(
  //               JSON.parse(JSON.stringify(e))
  //             );
  //             this.plistentSalSalesInvoiceItemQuantity.push(
  //               JSON.parse(JSON.stringify(e))
  //             );
  //           });
  //           this.plistentSalSalesInvoiceItemQuantity =
  //             this.splicePipe.transform(
  //               this.plistentSalSalesInvoiceItemQuantity,
  //               'pentInvItem'
  //             );
  //           this.salesInvoice.plistentSalSalesInvoiceItem =
  //             this.splicePipe.transform(
  //               this.salesInvoice.plistentSalSalesInvoiceItem,
  //               'pentInvItem'
  //             );
  //           this.clearDisplayText();
  //         });
  //     } else {
  //       // this.data.errorMesaageOnly('Search Sales Order Ref No')
  //     }
  //   } else {
  //     this.data.errorInfoMessage('Please select sales order reference no');
  //   }
  // }

  itemListCheck() {
    this.splicePipe.transform(
      this.salesInvoice.plistentSalSalesInvoiceItem,
      'pentInvItem'
    );
  }

  checkAlreadyExists(val: any) {
    if (this.salesInvoice.plistentSalSalesInvoiceItem.length !== 0) {
      for (
        let i = 0;
        i < this.salesInvoice.plistentSalSalesInvoiceItem.length;
        i++
      ) {
        if (
          this.salesInvoice.plistentSalSalesInvoiceItem[i]
            .appSalSalesOrderId !== 0
        ) {
          if (
            this.salesInvoice.plistentSalSalesInvoiceItem[i]
              .appSalSalesOrderId === val
          ) {
            let refNumber =
              this.salesInvoice.plistentSalSalesInvoiceItem[i].ientSalSalesOrder
                .saleOrderReferenceNo;
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

  addRow(index: any) {
    this.createNewSalesInvoiceItem();
  }

  createNewSalesInvoiceItem() {
    this.accountsService.createNewSalesInvoiceItem(this.options).subscribe((success) => {
      console.log(success);
      if (this.salesInvoice.isExport === 'Y') {
        success.taxPercentage = 0;
        success.taxCodeValue = 'VAT-B';
      }
      this.salesInvoice.plistentSalSalesInvoiceItem.push(success);
      return;
      // this.plistentSalSalesInvoiceItemQuantity.splice(
      //   xindex,
      //   0,
      //   JSON.parse(JSON.stringify(success))
      // );
      // this.salesInvoice.plistentSalSalesInvoiceItem.splice(
      //   xindex,
      //   0,
      //   JSON.parse(JSON.stringify(success))
      // );
      if (this.salesInvoice.isExport === 'Y') {
        success.taxPercentage = 0;
        success.taxCodeValue = 'VAT-B';
      } else {
        let index =
          this.salesInvoice.plistentSalSalesInvoiceItem.indexOf(success);
        this.getTaxPercentageByItemIdAndEffectiveDate(
          this.salesInvoice.pentInvItem.invItemId,
          index
        );
      }
    });
  }

  getTaxPercentageByItemIdAndEffectiveDate(itemId: any, index: any) {
    if (itemId !== 0) {
      const obj = {
        data: itemId,
        data1: this.salesInvoice.documentDate,
      };
      this.accountsService
        .getTaxPercentageByItemIdAndEffectiveDate(obj, this.options)
        .subscribe((success) => {
          if (success.data === 'VAT-A') {
            this.salesInvoice.plistentSalSalesInvoiceItem[index].taxPercentage =
              success.data1;
          } else {
            let val = 0;
            this.salesInvoice.plistentSalSalesInvoiceItem[index].taxPercentage =
              JSON.parse(JSON.stringify(val));
          }
        });
    } else {
    }
  }

  async itemsDelete(val: any, index: any) {
    let msg = 'Are You Sure, You Want to Delete this Item?';
    let response = await this.dialog.confirmDialog(msg);
    if (response) {
      if (val.purPurchaseInvoiceItemId !== 0) {
        this.deleteSalesInvoiceItem(val, index);
      } else {
        this.salesInvoice.plistentSalSalesInvoiceItem.splice(index, 1);
        // this.plistentSalSalesInvoiceItemQuantity.splice(index, 1);
        // this.plistentSalSalesInvoiceItemQuantity = this.splicePipe.transform(
        //   this.plistentSalSalesInvoiceItemQuantity,
        //   'ientInvItem'
        // );
        // setTimeout(() => {
        //   this.totalService.setValue(true);
        // }, 100);
        this.data.successMessage('Item Removed Sucessfully');
      }
    }
  }

  deleteSalesInvoiceItem(val: any, index: any) {
    this.salesInvoice.plistentSalSalesInvoiceItem[index].strDeleteFlag =
      'Y';
    this.accountsService
      .deleteSalesInvoiceItem(this.salesInvoice)
      .subscribe((success) => {
        this.salesInvoice = success;
        this.status.set(this.salesInvoice.statusValue);
        this.salesInvoiceRAW = success;
        // this.plistentSalSalesInvoiceItemQuantity.splice(index, 1);
        // this.plistentSalSalesInvoiceItemQuantity = this.splicePipe.transform(
        //   this.plistentSalSalesInvoiceItemQuantity,
        //   'ientInvItem'
        // );
      });
  }

  doSelectLedgerName(event: any, element: any) {
    element.itemLedgerId = event.actLedgerId;
    element.strItemLedgerCode = event.codeName;
    element.strItemLedgerName = event.ledgerName;
  }

  async uploadAttachemnt(event: any) {

    this.salesAttachments.referenceId = this.id;
    let attachmentList: any = [];
    attachmentList = event;
    for (let i = 0; i < attachmentList.length; i++) {
      if (attachmentList.length !== 0) {
        this.salesAttachments.attachmentSize = attachmentList[i].fileSize;
        this.salesAttachments.attachmentFileName = attachmentList[i].fileName;
        this.salesAttachments.istringFileContent = attachmentList[i].content;
        this.salesAttachments.attachementType = attachmentList[i].fileType;
        let uploadDocument = await this.uploadDocument();
      }
    }
  }
  uploadDocument() {
    return new Promise((resolve: any) => {
      this.accountsService
        .uploadSalesInvoiceAttachmentFile(this.salesAttachments, this.options)
        .subscribe((success) => {

          this.salesInvoice.plistSalAttachments = success.plstentSalAttachments;
          // this.overlayService.detachSearchBox();
          // this.initialLoad = false;
          this.dialog.closeDialog();
          resolve(true);
        });
    });
  }
  getVoucherDetail(element: any) {
    const obj = {
      data: element,
    };
    this.accountsService
      .getVoucherAccess(obj, this.options)
      .subscribe((success) => {
        this.voucherConfigId = success.actVoucherConfigId;
        this.voucherConfig = success;
        this.regionValueDDL = success.plstentDDLClass
      });
  }

  async navigateDetail(l: any) {
    if (l.valid) {
      if (this.voucherId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherId,
          data2: this.initialRegionValue
        };
        let urlJson = await this.url.encode(obj);
        this.router.navigateByUrl('/home/sales/sales-invoice/detail/' + urlJson);

      } else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    } else {
      this.errorTrue = true;
    }
  }
  navigateToSales() {
    this.router.navigateByUrl('/home/corporate/sales-menus')
  }
  completeStage(){
    this.salesInvoice.pentSalNotes.statusValue = 'APROV';
    this.accountsService.saveSalesInvoiceNote(this.salesInvoice).subscribe((success) => {
      this.salesInvoice = success;
      this.salesInvoiceRAW = success;
    })
  }
}
