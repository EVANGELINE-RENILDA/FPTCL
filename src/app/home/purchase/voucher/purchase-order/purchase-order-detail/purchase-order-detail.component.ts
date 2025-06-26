import { CommonModule, NgClass, SlicePipe } from '@angular/common';
import { AfterContentInit, CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef, ViewChild, computed, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { entGetMailInfo, entPurNotes, entPurPurchaseOrder } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { AppService } from '../../../../../app.service';
import { SearchVendorComponent } from '../../../../search/search-vendor/search-vendor.component';
import { GetDatePipe } from '../../../../../common/pipes/app-get-date/get-date.pipe';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { InnerScroll, LabelDash, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { ItemValueComponent } from '../../../../../app-core/app-template/item-value/item-value.component';
import { SearchItemComponent } from '../../../../search/search-item/search-item.component';
import { TotalValueComponent } from '../../../../../app-core/app-template/total-value/total-value.component';
import { AutoSearchQuotationComponent } from '../../../../search/auto-search-quotation/auto-search-quotation.component';
import { SplicePipe } from '../../../../../common/pipes/app-splice/splice.pipe';
import { PurchaseOrderNotesComponent } from './purchase-order-notes/purchase-order-notes.component';
import { PurchaseOrderAttachmentComponent } from './purchase-order-attachment/purchase-order-attachment.component';
import { PurchaseOrderPreviewComponent } from './purchase-order-preview/purchase-order-preview.component';
import { PurchaseOrderStatusComponent } from './purchase-order-status/purchase-order-status.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { autoSearchItems } from '../../../../home.component';
import { DialogAnimateService } from '../../../../../common/services/dialog-animated/dialog-animate.service';
import { AppSafePipe } from '../../../../../common/pipes/app-safe/app-safe.pipe';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';

@Component({
  selector: 'app-purchase-order-detail',
  standalone: true,
  imports: [
    NgClass,
    SlicePipe,
    FormsModule,
    SearchVendorComponent,
    SearchItemComponent,
    AppDatePipe,
    MatMenuModule,
    InnerScroll,
    FooterToggleDirective,
    Row,
    InputControlComponent,
    IconButtonComponent,
    ItemValueComponent,
    ViewLabel,
    TotalValueComponent,
    AutoSearchQuotationComponent,
    PurchaseOrderNotesComponent,
    PurchaseOrderAttachmentComponent,
    PurchaseOrderPreviewComponent,
    PurchaseOrderStatusComponent,
    CommonModule,
    AppSafePipe,
    MatTooltipModule,
    LabelDash
  ],
  providers: [GetDatePipe, SplicePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './purchase-order-detail.component.html',
  styleUrl: './purchase-order-detail.component.scss'
})
export class PurchaseOrderDetailComponent {

  // template requirements
  selectedTab = 0;
  fileLink = '';
  urlFileName = '';
  accountsOptions = {
    type: 'accountsPath',
  };
  blob = {};
  errorTrue = false;
  pageId = 'AJVSC';
  // statusLst:any = []
  internalUpdateSequence = 0;
  updateSequence = 0;
  // exchangeRateLst:any = [];

  purchaseQuotationId = 0;
  lstentPurPurchaseOrderItemQuantity: any = [];
  lstentPurPurchaseOrderItem: any = [];
  branchName = ''

  dateNotEffective = '';
  id: any = 0;
  voucherConfigId: any = 0;
  regionDetailValue: any = '';
  purchaseOrder = new entPurPurchaseOrder();
  autoSearchItems = new autoSearchItems();
  purchaseOrderNotes = new entPurNotes();
  purchaseOrderRAW: any;
  regionValueDDL: any = [];
  isCurrencyDisabled = false;
  vendorFlag = false;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  @ViewChild('l') lform!: NgForm;
  @ViewChild('a') a!: NgForm;
  @ViewChild('b') bform!: NgForm;
  @ViewChild('g') gform!: NgForm;
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
  @ViewChild('mailTemplate', { static: false })
  mailTemplate!: TemplateRef<any>;
  options = {
    type: 'accountsPath',
  };
  base64String: any = '';

  // __currentStatus = signal("");
  // __isDisabled = computed(() => this.__currentStatus() !== 'APROV' && this.__currentStatus() !== 'CANCL' && this.__currentStatus() !== 'PENAP');

  __isDisabled = signal(true);
  __isInputDisabled = signal(true);
  __hideBtn = signal(true);

  vendorIdRAW = 0;

  fileUrl = '';
  attachmentList: any = [];

  mailInfo = new entGetMailInfo();
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
    private getDate: GetDatePipe,
    public splicePipe: SplicePipe,
    public dialogService: DialogAnimateService,
    public appservice: AppService,
    public storage: AppStorageService




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

    this.id = params.data;
    this.voucherConfigId = params.data1;
    this.regionDetailValue = params.data2;
    this.errorTrue = false;

    await this.data.checkToken();
    this.appService.setBreadCrumb(this.breadCrumb);

    await this.initialData.getAcccountsDDL('getPurchaseOrderDetails');
    await this.storage.get('branchFinance').then((val) => {
      this.branchName = val;
    });


    if (this.id === 0) {
      this.createNewPurchaseOrder(this.voucherConfigId, this.regionDetailValue);
    } else {
      this.openPurchaseOrder(this.id);
    }
  }

  createNewPurchaseOrder(val: any, val1: any) {
    const obj = {
      data: val,
      data1: val1
    };
    this.accountsService.createNewPurchaseOrder(obj)
      .subscribe((success) => {
        this.purchaseOrder = success;
        this.errorTrue = false;
        this.updateStatus();
        this.hideBtnBasedonStatus();

        this.purchaseOrderRAW = JSON.stringify(this.purchaseOrder);
        this.createNewPurchaseOrderItem(0);
      });
  }

  openPurchaseOrder(val: any) {
    const obj = {
      data: val,
    };
    debugger
    this.accountsService
      .openPurchaseOrder(obj)
      .subscribe((success) => {
        this.purchaseOrder = success;
        this.updateStatus();
        this.hideBtnBasedonStatus();

        this.dateNotEffective = success.documentDate;
        this.voucherConfigId = success.voucherConfigId;
        this.updateSequence = success.updateSequence;

        // setTimeout(() => {
        //   this.totalService.setValue(true);
        // }, 100);
        this.lstentPurPurchaseOrderItemQuantity = JSON.parse(
          JSON.stringify(success.lstentPurPurchaseOrderItem)
        );
        this.lstentPurPurchaseOrderItem = JSON.parse(
          JSON.stringify(this.purchaseOrder.lstentPurPurchaseOrderItem)
        );
        this.getVendorAllDetails(success.sentActVendor);
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      });
  }

  savePurchaseOrder() {
    if (this.lform.valid && this.a.valid && this.gform.valid) {
      if (this.purchaseOrder.lstentPurPurchaseOrderItem.length !== 0) {
        this.accountsService
          .savePurchaseOrder(this.purchaseOrder)
          .subscribe(async (success) => {
            this.purchaseOrder = success;
            this.updateStatus();
            this.hideBtnBasedonStatus();
            this.updateSequence = success.updateSeq;
            this.data.successMessage(success.msg.infoMessage.msgDescription);
            // setTimeout(() => {
            //   this.totalService.setValue(true);
            // }, 100);
            if (this.id === 0) {
              const obj = {
                data: success.purPurchaseOrderId,
                data1: 0,
              };
              let urlJson = await this.url.encode(obj);
              this.router.navigateByUrl(
                '/home/purchase/purchase-order/detail/' + urlJson
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

  checkMinMax(event: any, item: any) {
    debugger
    if (item.purchaseQuotationId === 0 && (parseFloat(event) !== 0 && item.sentInvItem.inventoryGoods === 'Y')) {
      if (parseFloat(item.sentInvItem.maxQuantity) < parseFloat(event) && item.sentInvItem.maxQuantity !== parseFloat(event)) {
        let msg = 'Maximum Quantity ' + item.sentInvItem.maxQuantity + ' Is Reached';
        let dialog = this.dialog.notificationDialog(msg);
      } else if (parseFloat(item.sentInvItem.minQuantity) > parseFloat(event) && parseFloat(item.sentInvItem.minQuantity) !== parseFloat(event)) {
        let msg = 'Minimum Quantity ' + item.sentInvItem.minQuantity + ' Is Need';
        let dialog = this.dialog.notificationDialog(msg);
      }
    }
  }

  createNewPurchaseOrderItem(index: number) {
    this.accountsService.createNewPurchaseOrderItem().subscribe((success) => {
      const newItem = JSON.parse(JSON.stringify(success));
      this.lstentPurPurchaseOrderItemQuantity.push(newItem);
      this.purchaseOrder.lstentPurPurchaseOrderItem.splice(index, 0, newItem);

    });
  }

  async itemsDelete(val: any, index: any) {
    let msg = "Are You Sure, You Want to Delete this Item?"
    let response = await this.dialog.confirmDialog(msg)
    if (response) {
      if (val.purPurchaseOrderItemId !== 0) {
        this.deletePurchaseOrderItem(val, index);
      } else {
        this.purchaseOrder.lstentPurPurchaseOrderItem.splice(index, 1);
        this.lstentPurPurchaseOrderItemQuantity.splice(index, 1);
        this.lstentPurPurchaseOrderItemQuantity = this.splicePipe.transform(
          this.lstentPurPurchaseOrderItemQuantity,
          'sentInvItem'
        );
        // setTimeout(() => {
        //   this.totalService.setValue(true);
        // }, 100);
        this.data.successMessage('Item Removed Sucessfully');
      }
    }
  }

  deletePurchaseOrderItem(val: any, index: any) {
    this.purchaseOrder.lstentPurPurchaseOrderItem[index].strDeleteFlag = 'Y';
    this.accountsService
      .deletePurchaseOrderItem(this.purchaseOrder)
      .subscribe((success) => {
        this.purchaseOrder = success;
        this.lstentPurPurchaseOrderItemQuantity.splice(index, 1);
        this.lstentPurPurchaseOrderItemQuantity = this.splicePipe.transform(
          this.lstentPurPurchaseOrderItemQuantity,
          'sentInvItem'
        );
      });
  }

  onTotalValue(val: any) {

    this.purchaseOrder.totalAfterDiscount = val.totalAfterDiscount;
    this.purchaseOrder.totalTaxAmount = val.taxAmount;
    this.purchaseOrder.totalNetAmount = val.netAmount;
    // this.purchaseOrder.ilstActCurrencyExchangerate.forEach((element: any) => {
    //   switch (element.descriptionConst) {
    //     case "TLDIS":
    //       element.documentCurrencyAmount = val.totalAfterDiscount;
    //       element.reportingCurrencyAmount = val.totalAfterDiscountReportingCurrency;
    //       break;
    //     case "TAX":
    //       element.documentCurrencyAmount = val.taxAmount;
    //       element.reportingCurrencyAmount = val.taxAmountReportingCurrency;
    //       break;
    //     case "NETAM":
    //       element.documentCurrencyAmount = val.netAmount;
    //       element.reportingCurrencyAmount = val.netAmountReportingCurrency;
    //       break;
    //     default:
    //       break;
    //   }
    // });
  }

  // getExchangeRateLst(val:any){
  //   this.exchangeRateLst = val;
  // }

  async onVendorSelect(event: any) {
    debugger

    this.purchaseOrder.vendorId = event.actVendorId;
    this.purchaseOrder.sentActVendor.vendorName = event.vendorName;
    this.vendorFlag = true;
    if (
      this.vendorIdRAW !== 0 &&
      this.vendorIdRAW !== this.purchaseOrder.vendorId
    ) {
      let response = await this.dialog.confirmDialog('Do you want to change vendor, If you change customer then entire data will be clear');
      if (response) {
        // vendorId = event.actVendorId;
        this.purchaseOrder.sentActVendor.vendorName = event.vendorName;
        let currentDate: any = await this.appService.getCurrentDate();
        this.purchaseOrder.documentDate = currentDate;
        this.purchaseOrder.lstentPurPurchaseOrderItem = [];
        this.purchaseOrder.vendorId = event.actCustomerId;
      }
      else {
        this.purchaseOrder.vendorId = this.vendorIdRAW;
        event.actVendorId = this.vendorIdRAW;
      }
    }
    this.vendorIdRAW = this.purchaseOrder.vendorId;
    this.getVendorAllDetails(event);
  }

  getVendorAllDetails(val: any, isChanged?: boolean) {
    let obj = {
      data: val.actVendorId,
      data1: 'REGI1'
    };
    this.accountsService.getVendorForSearch(obj).subscribe((success) => {
      this.purchaseOrder.sentActVendor = success;
      this.purchaseOrder.docCurreny = success.currencyValue;
      if (this.purchaseOrder.currencyValue === success.currencyValue) {
        this.purchaseOrder.currencyRate = '1';
        this.isCurrencyDisabled = true;
      }
      if (isChanged) {
        this.documentDateConversionDate();
      }
    });
  }

  documentDateConversionDate() {
    if (this.purchaseOrder.documentDate === '' || this.purchaseOrder.sentActVendor.currencyValue === '') return;
    if (this.purchaseOrder.statusValue !== 'INPRO' && this.purchaseOrder.statusValue !== 'PENAP') return;
    this.checkDocumentDateList();
    this.documentDataChange();
  }

  checkDocumentDateList() {
    let voucherIds = this.purchaseOrder.lstentPurPurchaseOrderItem
      .filter((item: any) => item.invItemId !== 0 && item.purchaseQuotationId !== 0)
      .map((item: any) => item.purchaseQuotationId)
      .join(',');
    let checkDocumentDate = {
      documentDate: this.purchaseOrder.documentDate,
      voucherType: this.purchaseOrder.sentActVoucherConfig.voucherTypeValue,
      voucherIds: voucherIds,
      targetCurrencyValue: this.purchaseOrder.sentActVendor.currencyValue
    };
    this.accountsService.documentDateConversioDate(checkDocumentDate).subscribe((success) => {
      this.purchaseOrder.dueDate = this.getDate.transform(this.purchaseOrder.documentDate, this.purchaseOrder.sentActVendor.creditPeriod);
      const conversionRate = success.conversionRate;
      if (this.purchaseOrder.currencyValue === this.purchaseOrder.sentActVendor.currencyValue) {
        this.purchaseOrder.currencyRate = '1';
      } else if (conversionRate !== 0) {
        this.purchaseOrder.currencyRate = conversionRate;
      }
    });
  }

  onItemSelect(event: any, i: any) {

    console.log(event);


    let purchaseOrderRAW = JSON.parse(JSON.stringify(this.purchaseOrder));
    purchaseOrderRAW.sentPurPurchaseOrderItem.sentInvItem = event;
    let selectedItem = JSON.parse(JSON.stringify(this.purchaseOrder.lstentPurPurchaseOrderItem[i]));

    this.accountsService.setItemDetailsForPurchaseOrder(purchaseOrderRAW).subscribe((success: any) => {
      this.purchaseOrder.lstentPurPurchaseOrderItem[i] = success;
      this.purchaseOrder.lstentPurPurchaseOrderItem[i].purPurchaseOrderItemId = selectedItem.purPurchaseOrderItemId;
      this.purchaseOrder.lstentPurPurchaseOrderItem[i].updateSeq = selectedItem.updateSeq;
      this.purchaseOrder.lstentPurPurchaseOrderItem[i].idoObjState = selectedItem.idoObjState;
      this.purchaseOrder.lstentPurPurchaseOrderItem[i].purPurchaseOrderId = selectedItem.purPurchaseOrderId;
      if (this.purchaseOrder.lstentPurPurchaseOrderItem.length !== 0) {
        this.purchaseOrder.lstentPurPurchaseOrderItem.forEach(async (element: any, index: any) => {
          if (element.invItemId !== 0) {
            await this.getTaxPercentageByItemIdAndEffectiveDate(element.invItemId, index);
          }
        });
      }
    });
  }

  documentDataChange() {
    const items = this.purchaseOrder.lstentPurPurchaseOrderItem;
    if (items && items.length > 0) {
      items.forEach((item: any, index: any) => {
        if (item.sentInvItem.actTaxCodeValue !== 'VAT-C') {
          this.getTaxPercentageByItemIdAndEffectiveDate(item.invItemId, index);
        }
      });
    }
  }

  getTaxPercentageByItemIdAndEffectiveDate(itemId: any, index: any) {
    if (itemId === 0) return;
    const obj = {
      data: itemId,
      data1: this.purchaseOrder.documentDate,
    };
    this.accountsService.getTaxPercentageByItemIdAndEffectiveDate(obj)
      .subscribe((success) => {
        const taxPercentage = (success.data === 'VAT-A') ? success.data1 : 0;
        this.purchaseOrder.lstentPurPurchaseOrderItem[index].taxPercentage = taxPercentage;
      });
  }

  updateStatus() {
    this.__isDisabled.set(this.purchaseOrder.statusValue !== 'APROV' && this.purchaseOrder.statusValue !== 'CANCL' && this.purchaseOrder.statusValue !== 'PENAP');
  }

  hideBtnBasedonStatus() {
    this.__hideBtn.set(this.purchaseOrder.statusValue === 'APROV' || this.purchaseOrder.statusValue === 'CANCL')
  }

  // disableInput(){
  //   this.__isInputDisabled.set(this.purchaseOrder.vendorId !== 0 && this.purchaseOrder.documentDate !== '')
  // }

  // Required only when calculation should be taken from backend
  purchaseOrderItemCalculation() {
    const options = {
      hideErrorMethod: true,
      hideFullSpinner: true,
    };
    if (this.purchaseOrder.lstentPurPurchaseOrderItem.length === 0) return;
    this.accountsService.purchaseOrderItemCalculation(this.purchaseOrder, options)
      .subscribe((success) => {
        this.purchaseOrder = success;
        this.updateStatus();
        this.hideBtnBasedonStatus();
      });
  }


  onSelectTab(val: any) {
    this.selectedTab = val;
    if (val === 3) {

      this.viewPurchaseOrderReceipt()
    }
  }

  viewPurchaseOrderReceipt() {
    if (this.purchaseOrder.purPurchaseOrderId !== 0) {
      const obj = {
        data: this.purchaseOrder.purPurchaseOrderId,
        data1: this.purchaseOrder.sentActVoucherConfig.pdfOtherComments,
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

  closePdf() {
    this.fileUrl = ''
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
  addRow(index: any) {
    this.createNewPurchaseOrderItem(index);


  }

  // getVoucherDetail(element: any) {
  //   const obj = {
  //     data: element,
  //   };
  //   this.accountsService.getVoucherAccess(obj).subscribe((success) => {
  //     this.regionValueDDL = success.plstentDDLClass;
  //   });
  // }

  doClear() {
    debugger
    this.data.successMessage('Data Cleared Successfully');
    this.createNewPurchaseOrder(this.voucherConfigId, this.regionDetailValue);
  }

  getItemsByPurchaseQuotationIdForPurchaseOrder() {
    this.itemListCheck();
    if (this.purchaseQuotationId !== 0) {
      if (this.checkAlreadyExists(this.purchaseQuotationId)) {
        this.purchaseOrder.sPurQuotation.purQuotationId =
          this.purchaseQuotationId;
        this.purchaseOrder.voucherConfigId = this.voucherConfigId;
        this.accountsService
          .getItemsByPurchaseQuotationIdForPurchaseOrder(
            this.purchaseOrder,
          )
          .subscribe((success) => {
            this.purchaseOrder = success;
            this.updateStatus();
            this.lstentPurPurchaseOrderItemQuantity = JSON.parse(
              JSON.stringify(success.lstentPurPurchaseOrderItem)
            );
            this.purchaseOrder.lstentPurPurchaseOrderItem =
              this.splicePipe.transform(
                success.lstentPurPurchaseOrderItem,
                'sentInvItem'
              );
          });
      }
    } else {
      this.data.errorInfoMessage('Please Enter Purchase Order Ref No');
    }
  }

  getPurchaseQuotation(event: any) {
    console.log(event);
    this.purchaseOrder.purQuotationId = event.purQuotationId;
  }

  itemListCheck() {
    this.splicePipe.transform(
      this.purchaseOrder.lstentPurPurchaseOrderItem,
      'sentInvItem'
    );
  }

  checkAlreadyExists(val: any): boolean {
    for (const item of this.purchaseOrder.lstentPurPurchaseOrderItem) {
      if (item.purchaseQuotationId !== 0 && item.purchaseQuotationId === val) {
        this.data.errorInfoMessage('Selected purchase order already exists');
        return false;
      }
    }
    return true;
  }

  getNotesValue(val: any) {
    this.purchaseOrder = val;
    this.updateStatus();
    this.hideBtnBasedonStatus();

    if (val.statusValue === 'APROV') {
      this.onSelectTab(3);
    }
  }

  navBack() {
    this.router.navigateByUrl('/home/purchase/purchase-order/search')
  }


  screenDisabled() {
    let screenDisabled = false;
    if (
      this.purchaseOrder.statusValue === 'APROV' ||
      this.purchaseOrder.statusValue === 'CANCL' ||
      this.purchaseOrder.statusValue === 'PENAP'
    ) {
      screenDisabled = true;
    } else {
      screenDisabled = false;
    }

    return screenDisabled;
  }



  async directApproved() {
    debugger
    if (
      this.purchaseOrder.sentActVoucherConfig.isDirectApproval === 'Y' ||
      this.purchaseOrder.statusValue === 'PENAP'
    ) {
      this.purchaseOrderNotes.statusValue = 'APROV';
    } else {
      this.purchaseOrderNotes.statusValue = 'PENAP';
    }
    if (this.lform.valid && this.a.valid && this.gform.valid) {
      if (this.purchaseOrder.lstentPurPurchaseOrderItem.length !== 0) {
        // Set purchase order notes and reference
        this.purchaseOrderNotes.referenceId = this.id;
        this.purchaseOrderNotes.lstDDLClass = [];
        this.purchaseOrder.sentPurNotes = this.purchaseOrderNotes;

        // Save purchase order note
        await this.accountsService.savePurchaseOrderNote(this.purchaseOrder).subscribe((success) => {
          this.purchaseOrder = success;
          this.hideBtnBasedonStatus();
          if (this.purchaseOrder.statusValue === 'APROV') {
            this.onSelectTab(3);
          }
          // this.voucherId = success.sentActVoucherConfig.actVoucherConfigId;
        })
      }
      else {
        this.errorTrue = true;
        this.data.errorInfoMessage('Please add any items');
      }
    }
    else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory feilds');
    }
  }

  getVoucherDetail(element: any) {
    const obj = {
      data: element,
    };
    this.accountsService
      .getVoucherAccess(obj, this.accountsOptions)
      .subscribe((success) => {
        this.voucherConfigId = success.actVoucherConfigId;
        this.regionValueDDL = success.plstentDDLClass;
      });
  }

  async navigateDetail(f: any) {
    if (f.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: 'REGI1',
        };
        let urlJson = await this.url.encode(obj);
        this.router.navigateByUrl('/home/purchase/purchase-order/detail/' + urlJson);
      }
      else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    } else {
      this.errorTrue = true;
    }
  }
  navigateToList() {
    this.router.navigateByUrl('/home/purchase/purchase-order/search')
  }
  navigateToPurchase() {
    this.router.navigateByUrl('/home/corporate/purchase-menus')
  }
}
