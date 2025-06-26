import { NgClass, SlicePipe } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  ViewChild,
  signal,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Row,
  ViewLabel,
  InnerScroll,
  AppToolTipComponent,
} from '../../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../../app-core/message/error-message/error-message.component';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AppTableComponent } from '../../../../../app-core/template/app-table/app-table.component';
import { DocumentsComponent } from '../../../../../app-core/template/documents/documents.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppService } from '../../../../../app.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { AppAccessDirective } from '../../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { MatMenuModule } from '@angular/material/menu';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { AutoGetItemComponent } from '../../../../search/auto-get-item/auto-get-item.component';
import { SearchItemComponent } from '../../../../search/search-item/search-item.component';
import { SearchVendorComponent } from '../../../../search/search-vendor/search-vendor.component';
import {
  entActVendor,
  entActVoucherConfig,
  entCheckLineItemBasedonDocumentDate,
  entGetMailInfo,
  entPurPurchaseInvoice,
} from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { GetDatePipe } from '../../../../../common/pipes/app-get-date/get-date.pipe';
import { PurchaseInvoiceStatusComponent } from './purchase-invoice-status/purchase-invoice-status.component';
import { PurchaseInvoicePreviewComponent } from './purchase-invoice-preview/purchase-invoice-preview.component';
import { PurchaseInvoiceNotesComponent } from './purchase-invoice-notes/purchase-invoice-notes.component';
import { PurchaseInvoiceAttachmentComponent } from './purchase-invoice-attachment/purchase-invoice-attachment.component';
import { SplicePipe } from '../../../../../common/pipes/app-splice/splice.pipe';
import { ItemValueComponent } from '../../../../../app-core/app-template/item-value/item-value.component';
import { TotalValueComponent } from '../../../../../app-core/app-template/total-value/total-value.component';
import { AutoSearchQuotationComponent } from '../../../../search/auto-search-quotation/auto-search-quotation.component';
import { SearchDebitComponent } from '../../../../search/search-debit/search-debit.component';
import { finalize } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAnimateService } from '../../../../../common/services/dialog-animated/dialog-animate.service';
import { AppSafePipe } from '../../../../../common/pipes/app-safe/app-safe.pipe';

export class autoSearchItems {
  autoSearchItemId = 0;
  autoSearchText = '';
}

@Component({
  selector: 'app-purchase-invoice-detail',
  standalone: true,
  imports: [
    NgClass,
    Row,
    ViewLabel,
    AppTableComponent,
    IconButtonComponent,
    InnerScroll,
    DropZoneComponent,
    FormsModule,
    InputControlComponent,
    AppDatePipe,
    DocumentsComponent,
    ErrorMessageComponent,
    AppAccessDirective,
    ButtonAccessDirective,
    SlicePipe,
    AppToolTipComponent,
    FooterToggleDirective,
    MatMenuModule,
    SearchVendorComponent,
    AutoGetItemComponent,
    ItemValueComponent,
    ViewLabel,
    TotalValueComponent,
    AutoSearchQuotationComponent,
    SearchItemComponent,
    PurchaseInvoiceStatusComponent,
    PurchaseInvoicePreviewComponent,
    PurchaseInvoiceNotesComponent,
    PurchaseInvoiceAttachmentComponent,
    SearchDebitComponent,
    MatTooltipModule,
    AppSafePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [GetDatePipe, SplicePipe],
  templateUrl: './purchase-invoice-detail.component.html',
  styleUrl: './purchase-invoice-detail.component.scss',
})
export class PurchaseInvoiceDetailComponent {
  @ViewChild('mailTemplate', { static: false })
  mailTemplate!: TemplateRef<any>;
  pageId = 'PUISC';
  id: any = 0;
    fileUrl = '';
  urlFileName = ''
  initialRegionValue: any = '';
  isReceipt = true;
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
  attachmentList: any = [];
  options = {
    type: 'accountsPath',
  };
  blob = {};

  mailInfo = new entGetMailInfo();
  voucherConfigId: any = 0;
  vendorFlag = false;
  toggleArrow = true;
  infoMore = false;
  regionDetailValue: any = '';
  errorTrue = false;
  selectedTab = 0;
  voucherid: any = '';
  dateNotEffective = '';
  vendorIdRAW = 0;
  voucherId: any = 0;
  currencyRate: any = 0;
  updateSequence = 0;
  purchaseOrderId = 0;
  currecyDisabled = false;
  regionValueDDL: any = [];
  plistentPurPurchaseInvoiceItemQuantity: any = [];
  exchangeRateLst: any = [];

  purchaseInvoice = new entPurPurchaseInvoice();
  purchaseInvoiceRAW = new entPurPurchaseInvoice();
  voucherConfig = new entActVoucherConfig();
  checkDocumentDate: any = new entCheckLineItemBasedonDocumentDate();
  vendor = new entActVendor();
  autoSearchItems = new autoSearchItems();

  @ViewChild('l') lfrom!: NgForm;
  @ViewChild('a') afrom!: NgForm;
  @ViewChild('b') bfrom!: NgForm;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  accountsoptions = {
    type: 'accountsPath',
  };

  __hideBtn = signal(true);
  __isDisabledInput = signal(true);

  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public apiService: ApplicationApiService,
    public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public url: UrlService,
    public router: Router,
    private appService: AppService,
    public getDate: GetDatePipe,
    public splicePipe: SplicePipe,
    public dialogService : DialogAnimateService,
    public appservice: AppService,


  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  ngAfterViewInit() {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.appService.setBreadCrumb(this.breadCrumb);

    this.id = params.data;
    this.voucherConfigId = params.data1;
    this.regionDetailValue = params.data2;

    await this.data.checkToken();

    if (this.id === 0) {
      this.createNewPurchaseInvoice(
        this.voucherConfigId,
        this.regionDetailValue
      );
    } else {
      this.openPurchaseInvoice(this.id);
    }
    await this.initialData.getAcccountsDDL('getPurchaseInvoiceInitialData');
  }

  navigateToList() {
    debugger
    this.router.navigateByUrl('/home/purchase/purchase-invoice/search');
  }

  createNewPurchaseInvoice(val: any, val1: any) {
    const obj = {
      data: val,
      data1: val1,
    };
    this.accountsService.createNewPurchaseInvoice(obj).subscribe((success) => {
      this.purchaseInvoice = success;
      console.log(success);

      this.hideBtnBasedonStatus()
      this.voucherId = success.voucherConfigId;
      this.vendorIdRAW = 0;
      this.dateNotEffective = success.documentDate;
      this.createNewPurchaseInvoiceItem(0);
      if (this.purchaseInvoice.purchaseCash === 'Y') {
        this.purchaseInvoice.currencyRate = '1.00000000';
      }
      this.errorTrue = false;
    });
  }

  openPurchaseInvoice(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService.openPurchaseInvoice(obj).subscribe((success) => {
      this.purchaseInvoice = success;
      this.hideBtnBasedonStatus();
      this.errorTrue = false;
      this.updateSequence = success.updateSequence;
      this.vendorIdRAW = success.actVendorId;
      this.getVoucherDetail(
        this.purchaseInvoice.voucherConfigId !== 0
          ? this.purchaseInvoice.voucherConfigId
          : this.voucherConfigId
      );
      this.dateNotEffective = success.documentDate;
      this.voucherConfigId = success.voucherConfigId;
      this.voucherId = success.voucherConfigId;
      if (this.purchaseInvoice.pActVoucherConfig.needCash === 'N') {
        this.getVendorAllDetails(success.pentActVendor);
      }
      if (success.msg.infoMessage.msgDescription) {
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      }
    });
  }

  async navigateDetail(z: any) {

    if (z.valid) {
      // if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: this.initialRegionValue,
        };
        let urlJson = await this.url.encode(obj);
        this.router.navigateByUrl(
          '/home/purchase/purchase-invoice/detail/' + urlJson
        );
      } else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    // }
    // else {
    //   this.errorTrue = true;
    // }
  }

  // savePurchaseInvoiceDetails() {
  //   if (this.lfrom.valid && this.afrom.valid && this.bfrom.valid) {
  //     if (this.purchaseInvoice.plistentPurPurchaseInvoiceItem.length !== 0) {
  //       this.accountsService
  //         .savePurchaseInvoiceDetails(this.purchaseInvoice)
  //         .subscribe(async (success) => {
  //           this.purchaseInvoice = success;
  //           this.hideBtnBasedonStatus();
  //           this.updateSequence = success.updateSequence;
  //           if (success.msg.infoMessage.msgDescription) {
  //             this.data.successMessage(success.msg.infoMessage.msgDescription);
  //           }
  //         });
  //     } else {
  //       this.errorTrue = true;
  //       this.data.errorInfoMessage('Please add any items');
  //     }
  //   } else {
  //     this.errorTrue = true;
  //     this.data.errorInfoMessage('Please fill all mandatory fields');
  //   }
  // }


  savePurchaseInvoiceDetails() {
    debugger
    console.log(this.lfrom);
    if (this.lfrom.valid && this.afrom.valid && this.bfrom.valid) {
      if (this.purchaseInvoice.plistentPurPurchaseInvoiceItem.length !== 0) {
        this.accountsService
          .savePurchaseInvoiceDetails(this.purchaseInvoice)
          .subscribe(async (success) => {
            this.purchaseInvoice = success;
            this.updateStatus();
            this.hideBtnBasedonStatus();
            this.updateSequence = success.updateSeq;
            this.data.successMessage(success.msg.infoMessage.msgDescription);
            // setTimeout(() => {
            //   this.totalService.setValue(true);
            // }, 100);
            if (this.id === 0) {
              const obj = {
                data: success.purchaseInvoiceId,
                data1: 0,
              };
              let urlJson = await this.url.encode(obj);
              this.router.navigateByUrl(
                '/home/purchase/purchase-invoice/detail/' + urlJson
              );
            }
          });
      } else {
        this.errorTrue = true;
        this.data.errorInfoMessage('Please add any items');
      }
    }
    else {
      this.errorTrue = true;
    }
  }
  directApproved() {
    this.purchaseInvoice.pActVoucherConfig.isDirectApproval === 'Y'
      ? (this.purchaseInvoice.pentPurNotes.statusValue = 'APROV')
      : this.purchaseInvoice.statusValue === 'PENAP'
        ? (this.purchaseInvoice.pentPurNotes.statusValue = 'APROV')
        : (this.purchaseInvoice.pentPurNotes.statusValue = 'PENAP');
    this.purchaseInvoice.pentPurNotes.referenceId = this.id;
    this.purchaseInvoice.pentPurNotes.lstDDLClass = [];
    this.purchaseInvoice.pentPurNotes = this.purchaseInvoice.pentPurNotes;
    ;
    if (this.lfrom.valid && this.bfrom.valid) {
      if (
        this.afrom.valid &&
        this.purchaseInvoice.plistentPurPurchaseInvoiceItem.length !== 0
      ) {
        this.accountsService
          .savePurchaseInvoiceNote(this.purchaseInvoice)
          .subscribe((success) => {
            this.purchaseInvoice = success;
            this.voucherId = success.pActVoucherConfig.actVoucherConfigId;
          });
      } else {
        this.errorTrue = true;
        this.data.errorInfoMessage('Please add any items');
      }
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }

  createNewPurchaseInvoiceItem(index: any) {
    this.accountsService
      .createNewPurchaseInvoiceItem(this.options)
      .subscribe((success) => {
        const newItem = JSON.parse(JSON.stringify(success));
        this.plistentPurPurchaseInvoiceItemQuantity.push(newItem);
        this.purchaseInvoice.plistentPurPurchaseInvoiceItem.splice(
          index,
          0,
          newItem
        );
      });
  }

  getVendorAllDetails(val: any) {
    this.vendor.actVendorId = val.actVendorId;
    this.vendor.vendorName = val.vendorName;
    let obj = {
      data: val.actVendorId,
      data1: this.purchaseInvoice.regionValue,
    };
    this.accountsService.getVendorForSearch(obj).subscribe((success) => {
      this.purchaseInvoice.pentActVendor = success;
      this.purchaseInvoice.actVendorId = success.actVendorId;
      this.initialData.DDLValues.DDLAddress = success.lstAddress;
      this.purchaseInvoice.docCurrencyValue = success.currencyValue;
      this.currencyRate = parseFloat(this.purchaseInvoice.currencyRate);
      if (this.purchaseInvoice.currencyValue === success.currencyValue) {
        this.purchaseInvoice.currencyRate = '1';
        this.currencyRate = parseFloat(this.purchaseInvoice.currencyRate);
        this.currecyDisabled = true;
      }
      if (this.vendorFlag) {
        this.documentDateConversioDate();
      }
      this.vendorFlag = false;
    });
  }

  getVoucherDetail(element: any) {
    const obj = {
      data: element,
    };
    this.accountsService.getVoucherAccess(obj).subscribe((success) => {
      this.voucherConfigId = success.actVoucherConfigId;
      this.voucherConfig = success;
      this.regionValueDDL = success.plstentDDLClass;
    });
  }

  documentDateConversioDate() {
    if (
      this.purchaseInvoice.documentDate !== '' &&
      this.purchaseInvoice.docCurrencyValue !== ''
    ) {
      if (
        (this.purchaseInvoice.statusValue === 'INPRO' ||
          this.purchaseInvoice.statusValue === 'PENAP') &&
        this.purchaseInvoice.pActVoucherConfig.needCash === 'N'
      ) {
        this.checkDocumentDatelist();
        this.documentDataChange();
        this.accountsService
          .documentDateConversioDate(this.checkDocumentDate)
          .subscribe(
            (success) => {
              this.dateNotEffective = this.purchaseInvoice.documentDate;
              debugger
              this.purchaseInvoice.paymentDueDate = this.getDate.transform(
                this.purchaseInvoice.documentDate,
                this.purchaseInvoice.pentActVendor.creditPeriod
              );

              this.purchaseInvoice.currencyRate = success.conversionRate;
              if (
                this.purchaseInvoice.currencyValue ===
                this.purchaseInvoice.docCurrencyValue
              ) {
                this.purchaseInvoice.currencyRate = '1.00000000';
                this.currencyRate = parseFloat(
                  this.purchaseInvoice.currencyRate
                );
              } else {
                if (success.conversionRate !== 0) {
                  this.purchaseInvoice.currencyRate = success.conversionRate;
                  this.currencyRate = parseFloat(
                    this.purchaseInvoice.currencyRate
                  );
                }
              }
              this.reportingCurrencyValuePostingOnPurchaseInvoice();
            },
            (e) => {
              this.purchaseInvoice.documentDate = this.dateNotEffective;
            }
          );
      } else {
      }
    } else {
    }
  }

  doGetItemSelect(event: any) {
    this.purchaseOrderId = event.id;
    this.autoSearchItems.autoSearchItemId = event.id;
    this.autoSearchItems.autoSearchText = event.name;
  }

  getExchangeRateLst(val: any) {
    this.exchangeRateLst = val;
  }

  reportingCurrencyValuePostingOnPurchaseInvoice(id?: any) {
    debugger
    const options = {
      hideErrorMethod: true,
      hideFullSpinner: true,
      type: 'accountsPath',
    };
    if (this.purchaseInvoice.plistentPurPurchaseInvoiceItem.length !== 0) {
      this.accountsService
        .reportingCurrencyValuePostingOnPurchaseInvoice(
          this.purchaseInvoice,
          options
        )
        .subscribe((success) => {
          debugger
          this.purchaseInvoice = success;
          this.purchaseInvoice.ilstActCurrencyExchangerate =
            success.ilstActCurrencyExchangerate;
          this.purchaseInvoice.plistentPurPurchaseInvoiceLedgerItems =
            success.plistentPurPurchaseInvoiceLedgerItems;
          this.currencyRate = parseFloat(this.purchaseInvoice.currencyRate);
          this.dialog.closeAll();
          if (id) {
            setTimeout(() => {
              document.getElementById(id)?.focus();
            }, 200);
          }
        });
    } else {
    }
  }

  checkDocumentDatelist() {
    let result = [];
    for (const item of this.purchaseInvoice.plistentPurPurchaseInvoiceItem) {
      if (item.invItemId !== 0 && item.purPurchaseOrderId !== 0) {
        result.push(item.purPurchaseOrderId);
      }
    }
    this.voucherid = result.join(',');

    this.checkDocumentDate.documentDate = this.purchaseInvoice.documentDate;
    this.checkDocumentDate.voucherType =
      this.purchaseInvoice.pActVoucherConfig.voucherTypeValue;
    this.checkDocumentDate.voucherIds = this.voucherid;
    this.checkDocumentDate.targetCurrencyValue =
      this.purchaseInvoice.pentActVendor.currencyValue;
  }

  documentDataChange() {
    if (this.purchaseInvoice.plistentPurPurchaseInvoiceItem !== 0) {
      for (
        let i = 0;
        i < this.purchaseInvoice.plistentPurPurchaseInvoiceItem.length;
        i++
      ) {
        if (
          this.purchaseInvoice.plistentPurPurchaseInvoiceItem[i].ientInvItem
            .actTaxCodeValue !== 'VAT-C'
        ) {
          this.getTaxPercentageByItemIdAndEffectiveDate(
            this.purchaseInvoice.plistentPurPurchaseInvoiceItem[i].invItemId,
            i
          );
        }
      }
    }
  }

  getTaxPercentageByItemIdAndEffectiveDate(itemId: any, index: any) {
    if (itemId !== 0) {
      const obj = {
        data: itemId,
        data1: this.purchaseInvoice.documentDate,
      };
      this.accountsService
        .getTaxPercentageByItemIdAndEffectiveDate(obj)
        .subscribe((success) => {
          if (success.data === 'VAT-A') {
            this.purchaseInvoice.plistentPurPurchaseInvoiceItem[
              index
            ].taxPercentage = success.data1;
          } else {
            let val = 0;
            this.purchaseInvoice.plistentPurPurchaseInvoiceItem[
              index
            ].taxPercentage = JSON.parse(JSON.stringify(val));
          }
        });
    }
  }
  async checkVendorName(event:any){
    this.purchaseInvoice.actVendorId = event;
    this.purchaseInvoice.pentActVendor.vendorName = '';
    let isCustomerChange = await this.dialog.confirmDialog(
      'Do you want to change vendor, If you change customer then entire data will be clear'
    );
    if (isCustomerChange) {
      let currentDate: any = await this.appService.getCurrentDate();
      this.purchaseInvoice.documentDate = currentDate;
      this.purchaseInvoice.plistentPurPurchaseInvoiceItem = [];
      this.purchaseInvoice.companyShippingAddressId = 0;
      this.purchaseInvoice.paymentTerm = '';
      this.purchaseInvoice.vendorInvoiceNumber = '';
      this.purchaseInvoice.transportationMode = '';
      this.purchaseInvoice.vendorReferenceNumber = '';
      this.purchaseInvoice.actVendorId = event.actVendorId;
    }
  }

  // async doVenorSelect(event: any) {

  //   this.purchaseInvoice.actVendorId = event.actVendorId;
  //   this.purchaseInvoice.pentActVendor.vendorName = event.vendorName;
  //   this.vendorFlag = true;
  //   if (
  //     this.vendorIdRAW !== 0 &&
  //     this.vendorIdRAW !== this.purchaseInvoice.actVendorId
  //   ) {
  //     let isCustomerChange = await this.dialog.confirmDialog(
  //       'Do you want to change vendor, If you change customer then entire data will be clear'
  //     );
  //     if (isCustomerChange) {
  //       let currentDate: any = await this.appService.getCurrentDate();
  //       this.purchaseInvoice.documentDate = currentDate;
  //       this.purchaseInvoice.plistentPurPurchaseInvoiceItem = [];
  //       this.purchaseInvoice.companyShippingAddressId = 0;
  //       this.purchaseInvoice.paymentTerm = '';
  //       this.purchaseInvoice.vendorInvoiceNumber = '';
  //       this.purchaseInvoice.transportationMode = '';
  //       this.purchaseInvoice.vendorReferenceNumber = '';
  //       this.purchaseInvoice.actVendorId = event.actVendorId;
  //     } else {
  //       this.purchaseInvoice.actVendorId = this.vendorIdRAW;
  //       event.actVendorId = this.vendorIdRAW;
  //     }
  //   }
  //   this.vendorIdRAW = this.purchaseInvoice.actVendorId;
  //   this.getVendorAllDetails(event);
  // }
  async onVendorSelect(event: any) {
    console.log(event.actVendorId, this.vendorIdRAW);
    if(event.actVendorId !== this.vendorIdRAW ){
      let response = await this.dialog.confirmDialog('Do you want to change vendor, If you change customer then entire data will be clear');
      if(response){
        this.purchaseInvoice.pentActVendor.vendorName = event.vendorName;
        let currentDate: any = await this.appService.getCurrentDate();
        this.purchaseInvoice.documentDate = currentDate;
        this.purchaseInvoice.plistentPurPurchaseInvoiceItem = [];
        this.vendorIdRAW = event.actVendorId;
        this.getVendorAllDetails(event);
      } else {
        // setTimeout(() => {
          let actVendorId = this.vendorIdRAW;
          this.purchaseInvoice.actVendorId = actVendorId;
          // this.purchaseInvoice.
        // }, 400);

      }

    }
    // this.purchaseInvoice.actVendorId = event.actVendorId;
    // this.purchaseInvoice.pentActVendor.vendorName = event.vendorName;
    // console.log(this.purchaseInvoice);
    // this.vendorFlag = true;
    // if (
    //   this.vendorIdRAW !== 0 &&
    //   this.vendorIdRAW !== this.purchaseInvoice.actVendorId
    // ) {

    //   if (response) {
    //     // vendorId = event.actVendorId;
    //     this.purchaseInvoice.pentActVendor.vendorName = event.vendorName;
    //     let currentDate: any = await this.appService.getCurrentDate();
    //     this.purchaseInvoice.documentDate = currentDate;
    //     this.purchaseInvoice.plistentPurPurchaseInvoiceItem = [];
    //     this.purchaseInvoice.actVendorId = event.actCustomerId;
    //   }
    //   else {
    //     this.purchaseInvoice.actVendorId = this.vendorIdRAW;
    //     event.actVendorId = this.vendorIdRAW;
    //   }
    // }


  }

  addressChange(val: any) {
    this.purchaseInvoice.companyShippingAddressId = val;
  }

  doClear() {
    this.data.successMessage('Data Cleared Successfully');
    this.errorTrue = false;
    this.createNewPurchaseInvoice(this.voucherConfigId, this.regionDetailValue);
  }

  onSelectTab(val: any) {
    this.selectedTab = val;
    if(val===3){
      this.viewPurchaseInvoiceReceipt();
    }
  }

  purchaseInvoiceItemCalculation(id?: any) {
    const options = {
      hideErrorMethod: true,
      hideFullSpinner: true,
      type: 'accountsPath',
    };
    if (this.purchaseInvoice.plistentPurPurchaseInvoiceItem.length !== 0) {
      this.accountsService
        .purchaseInvoiceItemCalculation(this.purchaseInvoice, options)
        .subscribe((success) => {
          this.purchaseInvoice = success;
        });
    } else {
    }
  }

  hideBtnBasedonStatus() {
    this.__hideBtn.set(
      this.purchaseInvoice.statusValue === 'APROV' ||
      this.purchaseInvoice.statusValue === 'CANCL' ||
      this.purchaseInvoice.statusValue === 'PENAP'
    );

    console.log(this.__hideBtn);

  }

  updateStatus() {
    this.__isDisabledInput.set(
      this.purchaseInvoice.statusValue !== 'APROV' &&
      this.purchaseInvoice.statusValue !== 'CANCL' &&
      this.purchaseInvoice.statusValue !== 'PENAP'
    );
  }

  addRow(index: any) {
    this.createNewPurchaseInvoiceItem(index);
  }

  getNotesValue(val: any) {
    this.purchaseInvoice = val;
    this.updateStatus();
    this.hideBtnBasedonStatus();

    if (val.statusValue === 'APROV') {
      this.onSelectTab(3);
    }
  }

  onTotalValue(val: any) {
    this.purchaseInvoice.totalAfterDiscount = val.totalAfterDiscount;
    this.purchaseInvoice.totalTaxAmount = val.taxAmount;
    this.purchaseInvoice.totalNetAmount = val.netAmount;
    // this.purchaseInvoice.ilstActCurrencyExchangerate.forEach((element: any) => {
    //   switch (element.descriptionConst) {
    //     case 'TLDIS':
    //       element.documentCurrencyAmount = val.totalAfterDiscount;
    //       element.reportingCurrencyAmount =
    //         val.totalAfterDiscountReportingCurrency;
    //       break;
    //     case 'TAX':
    //       element.documentCurrencyAmount = val.taxAmount;
    //       element.reportingCurrencyAmount = val.taxAmountReportingCurrency;
    //       break;
    //     case 'NETAM':
    //       element.documentCurrencyAmount = val.netAmount;
    //       element.reportingCurrencyAmount = val.netAmountReportingCurrency;
    //       break;
    //     default:
    //       break;
    //   }
    // });
  }

  async itemsDelete(val: any, index: any) {
    let msg = 'Are You Sure, You Want to Delete this Item?';
    let response = await this.dialog.confirmDialog(msg);
    if (response) {
      if (val.purPurchaseInvoiceItemId !== 0) {
        this.deletePurchaseInvoiceItem(val, index);
      } else {
        this.purchaseInvoice.plistentPurPurchaseInvoiceItem.splice(index, 1);
        this.plistentPurPurchaseInvoiceItemQuantity.splice(index, 1);
        this.plistentPurPurchaseInvoiceItemQuantity = this.splicePipe.transform(
          this.plistentPurPurchaseInvoiceItemQuantity,
          'ientInvItem'
        );
        // setTimeout(() => {
        //   this.totalService.setValue(true);
        // }, 100);
        this.data.successMessage('Item Removed Sucessfully');
      }
    }
  }

  deletePurchaseInvoiceItem(val: any, index: any) {
    this.purchaseInvoice.plistentPurPurchaseInvoiceItem[index].strDeleteFlag =
      'Y';
    this.accountsService
      .deletePurchaseInvoiceItem(this.purchaseInvoice)
      .subscribe((success) => {
        this.purchaseInvoice = success;
        this.plistentPurPurchaseInvoiceItemQuantity.splice(index, 1);
        this.plistentPurPurchaseInvoiceItemQuantity = this.splicePipe.transform(
          this.plistentPurPurchaseInvoiceItemQuantity,
          'ientInvItem'
        );
      });
  }

  doItemSelect(event: any, val: any, index: any) {
    const { actVendorId, documentDate, pActVoucherConfig } =
      this.purchaseInvoice;
    if (
      actVendorId !== 0 &&
      documentDate !== '' &&
      pActVoucherConfig.needCash === 'N'
    ) {
      val.ientInvItem.itemCode = event.itemCode;
      val.ientInvItem.invItemId = event.invItemId;

      this.checkExistsItem(event);
      this.setItemDetailsForPurchaseInvoice(event, val, index);
    } else if (actVendorId === 0 && pActVoucherConfig.needCash === 'N') {
      this.data.errorInfoMessage('Please select vendor name');
    } else if (documentDate === '') {
      this.data.errorInfoMessage('Please select document date');
    } else if (documentDate !== '' && pActVoucherConfig.needCash === 'Y') {
      val.ientInvItem.itemCode = event.itemCode;
      val.ientInvItem.invItemId = event.invItemId;
      this.setItemDetailsForPurchaseInvoice(event, val, index);
    }
  }

  doSelectLedgerName(event: any, element: any) {
    element.itemLedgerId = event.actLedgerId;
    element.strItemLedgerCode = event.codeName;
    element.strItemLedgerName = event.ledgerName;
  }

  checkExistsItem(val: any) {
    const items = this.purchaseInvoice.plistentPurPurchaseInvoiceItem;
    if (items.length !== 0) {
      for (const item of items) {
        if (item.invItemId === val.invItemId) {
          this.data.errorInfoMessage('Selected Item Is Already Exists');
          return false;
        }
      }
    }
    return true;
  }

  getPurchaseInvoice(event: any) {
    this.purchaseInvoice.purPurchaseInvoiceId = event.purPurchaseInvoiceId;
  }

  itemListCheck() {
    this.splicePipe.transform(
      this.purchaseInvoice.plistentPurPurchaseInvoiceItem,
      'ientInvItem'
    );
  }

  getPurchaseOrderItemDetailByPurchaseOrderIdForPurchaseInvoice() {
    this.itemListCheck();
    if (this.purchaseInvoice.purPurchaseInvoiceId !== 0) {
      if (this.checkExistsItem(this.purchaseInvoice.purPurchaseInvoiceId)) {
        this.purchaseInvoice.pentPurPurchaseOrder.purPurchaseOrderId =
          this.purchaseInvoice.purPurchaseInvoiceId;
        this.purchaseInvoice.voucherConfigId = this.voucherConfigId;
        this.accountsService
          .getPurchaseOrderItemDetailByPurchaseOrderIdForPurchaseInvoice(
            this.purchaseInvoice
          )
          .subscribe((success) => {
            this.purchaseInvoice = success;
            this.updateStatus();
            this.plistentPurPurchaseInvoiceItemQuantity = JSON.parse(
              JSON.stringify(success.plistentPurPurchaseInvoiceItem)
            );
            this.purchaseInvoice.plistentPurPurchaseInvoiceItem =
              this.splicePipe.transform(
                success.plistentPurPurchaseInvoiceItem,
                'ientInvItem'
              );
          });
      }
    } else {
      this.data.errorInfoMessage('Please Enter Purchase Order Ref No');
    }
  }

  setItemDetailsForPurchaseInvoice(val: any, data: any, index: any) {
    if (val.invItemId !== 0) {
      const purchaseInvoiceRAW = new entPurPurchaseInvoice();
      purchaseInvoiceRAW.ientInvItem = val;
      purchaseInvoiceRAW.voucherConfigId = this.voucherConfigId;
      this.purchaseInvoiceRAW = JSON.parse(JSON.stringify(purchaseInvoiceRAW));

      const selectedItem = JSON.parse(
        JSON.stringify(
          this.purchaseInvoice.plistentPurPurchaseInvoiceItem[index]
        )
      );

      this.accountsService
        .setItemDetailsForPurchaseInvoice(this.purchaseInvoiceRAW)
        .subscribe(async (success) => {
          this.plistentPurPurchaseInvoiceItemQuantity[index] = success;
          this.purchaseInvoice.plistentPurPurchaseInvoiceItem[index] = success;
          this.purchaseInvoice.plistentPurPurchaseInvoiceItem[index].purPurchaseInvoiceItemId = selectedItem.purPurchaseInvoiceItemId;
          this.purchaseInvoice.plistentPurPurchaseInvoiceItem[index].updateSeq =
            selectedItem.updateSeq;
          this.purchaseInvoice.plistentPurPurchaseInvoiceItem[index].idoObjState =
            selectedItem.idoObjState;
          this.purchaseInvoice.plistentPurPurchaseInvoiceItem[index].purPurchaseInvoiceId =
            selectedItem.purPurchaseInvoiceId;

          if (
            this.purchaseInvoice.plistentPurPurchaseInvoiceItem.length !== 0
          ) {
            for (const [
              idx,
              element,
            ] of this.purchaseInvoice.plistentPurPurchaseInvoiceItem.entries()) {
              if (element.invItemId !== 0) {
                await this.getTaxPercentageByItemIdAndEffectiveDate(
                  element.invItemId,
                  idx
                );
              }
            }
          }
        });
    }
  }

  toggle() {
    this.toggleArrow = !this.toggleArrow;
  }

  getMoreInfo() {
    this.infoMore = !this.infoMore;
  }
  async navigatePayment() {
    const obj = {
      data: this.purchaseInvoice.pActVoucherConfig.postingVoucherConfigId,
      data1: this.id,
      data2: this.isReceipt,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl('/home/purchase/payment-note/detail/' + urlJson);
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
    debugger
    if (this.purchaseInvoice.purPurchaseInvoiceId !== 0) {
      const obj = {
        data: this.purchaseInvoice.purPurchaseInvoiceId,
        data1: this.purchaseInvoice.pActVoucherConfig.pdfOtherComments,
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
    navigateToPurchase(){
      debugger
      this.router.navigateByUrl('/home/corporate/purchase-menus')
    }
}
