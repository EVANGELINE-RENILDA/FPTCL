import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  TemplateRef,
  ViewChild,
  signal,
} from '@angular/core';
import {
  InnerScroll,
  Row,
  ViewLabel,
} from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppService } from '../../../../../app.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { CommonModule, NgClass } from '@angular/common';
import { FooterToggleDirective } from '../../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { MatMenuModule } from '@angular/material/menu';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { entPurQuotation, entPurNotes, entPurAttachments, entActVendor, entCheckLineItemBasedonDocumentDate } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../../../common/services/url/url.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { SearchVendorComponent } from '../../../../search/search-vendor/search-vendor.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AppSafePipe } from '../../../../../common/pipes/app-safe/app-safe.pipe';
import { SplicePipe } from '../../../../../common/pipes/app-splice/splice.pipe';
import { GetDatePipe } from '../../../../../common/pipes/app-get-date/get-date.pipe';
import { SearchItemComponent } from '../../../../search/search-item/search-item.component';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { TotalValueComponent } from '../../../../../app-core/app-template/total-value/total-value.component';
import { ItemValueComponent } from '../../../../../app-core/app-template/item-value/item-value.component';
import { PurchaseQuotationDetailAttachmentComponent } from './purchase-quotation-detail-attachment/purchase-quotation-detail-attachment.component';
import { PurchaseQuotationDetailNotesComponent } from './purchase-quotation-detail-notes/purchase-quotation-detail-notes.component';
import { PurchaseQuotationDetailPreviewComponent } from './purchase-quotation-detail-preview/purchase-quotation-detail-preview.component';

@Component({
  selector: 'app-sales-order-detail',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './purchase-quotation-detail.component.html',
  styleUrl: './purchase-quotation-detail.component.scss',
  imports: [
    ViewLabel,
    Row,
    InputControlComponent,
    AppDatePipe,
    AppTableComponent,
    SearchVendorComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    IconButtonComponent,
    NgClass,
    FooterToggleDirective,
    MatMenuModule,
    DropZoneComponent,
    FormsModule,
    AppSafePipe,
    CommonModule,
    InnerScroll,
    SearchItemComponent,
    TotalValueComponent,
    ItemValueComponent,
    PurchaseQuotationDetailPreviewComponent,
    PurchaseQuotationDetailNotesComponent,
    PurchaseQuotationDetailAttachmentComponent
  ],
  providers: [GetDatePipe, SplicePipe],
})
export class PurchaseQuotationDetailComponent {

  accountsOptions = {
    type: 'accountsPath',
  };

  __isDisabled = signal(true);
  __hideBtn = signal(true);
  errorTrue = false;
  pageId = 'AJVSC';
  showItemTable = true;
  purchaseQuotationRAW: any;
  purchaseQuotationId = 0;
  plistentPurQuotationItem: any = [];
  plistentPurQuotationItemRAW: any = [];
  exchangeRateLst: any = [];
  id: any = 0;

  statusddl = [];
  updateSequence = 0;
  selectedTab = 0;
  fileLink = '';
  urlFileName = '';
  blob = {};

  @ViewChild('l') lform!: NgForm;
  @ViewChild('a') aform!: NgForm;
  lstentPurQuotationItemQuantity: any = [];

  __isInputDisabled = signal(true);
  @ViewChild('notesDialog') notesDialog!: TemplateRef<any>;
  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;

  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword';

  items: any = [
    'item',
    'quantity',
    'unitPrice',
    'dis',
    'afterDiscount',
    'tax',
    'total',
    'add',
  ];

  itemsName: any = [
    'Item ',
    'Quantity',
    'Unit Price',
    'Dis',
    'After Discount',
    'Tax',
    'Total',
  ];

  qutationData = [];

  notes: any = ['notes', 'add'];
  notesName: any = ['Notes', ''];
  accordianOpen = true;
  accordianContent = true;
  tableItemData = [];
  tableNoteData = [];
  tableAttachmentData = [];
  attachment: any = [
    'attachmentFileName',
    'attachementType',
    'attachmentSize',
    'add',
  ];
  attachmentsName: any = ['', 'File Format', 'Size', 'add'];
  statusOnSo: any = ['', 'changeBy', 'date', 'status'];
  statusOnSoName: any = ['', 'Changed By', 'Changed Date', 'Status'];

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  purchaseQuotation = new entPurQuotation();
  vendor = new entActVendor();
  checkDocumentDate: any = new entCheckLineItemBasedonDocumentDate();

  vendorIdRAW = 0;
  voucherId: any = 0;
  voucherConfigId: any = 0;
  regionDetailValue: any = '';
  vendorFlag = false;
  currecyDisabled = false;
  voucherid: any = '';

  constructor(
    public apiService: ApplicationApiService,
    public appService: AppService,
    public data: DataService,
    public dialog: CoreService,
    public url: UrlService,
    public router: Router,
    public accountsService: AccountsApiService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public splicePipe: SplicePipe,
    public appSetting: AppSettingsService
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  async init() {
    await this.data.checkToken();
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);

    this.id = params.data;
    this.voucherConfigId = params.data1;
    this.regionDetailValue = params.data2;

    this.initialData.getAcccountsDDL('getQuotationInitialData');

    if (this.id > 0) {
      this.openPurchaseQuotation(this.id);
    } else {
      this.createNewPurchaseQuotation(
        this.voucherConfigId,
        this.regionDetailValue
      );
    }
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  createNewPurchaseQuotation(val: any, val1: any) {
    const obj = {
      data: val,
      data1: val1,
    }
    this.accountsService
      .createNewPurchaseQuotation(obj)
      .subscribe((success) => {
        this.purchaseQuotation = success;
        this.vendorIdRAW = 0;
        this.voucherId = success.ientActVoucherConfig.actVoucherConfigId;
        this.errorTrue = false;
        this.createNewPurchaseQuotationItem(0);
      });
  }

  addRow(index: any) {
    this.createNewPurchaseQuotationItem(index);
  }

  createNewPurchaseQuotationItem(index: number) {
    this.accountsService
      .createNewPurchaseQuotationItem()
      .subscribe((success) => {
        console.log(success);

        const newItem = JSON.parse(JSON.stringify(success));
        this.lstentPurQuotationItemQuantity.push(newItem);
        this.purchaseQuotation.plistentPurQuotationItem.splice(
          index,
          0,
          newItem
        );
        console.log(this.purchaseQuotation.plistentPurQuotationItem);
      });
  }

  openPurchaseQuotation(id?: any) {
    this.errorTrue = false;
    const obj = {
      data: this.id,
    };
    this.accountsService
      .openPurchaseQuotation(obj)
      .subscribe((success: any) => {
        this.purchaseQuotation = success;
        this.tableAttachmentData = success.ilstentPurAttachments;

        if (success.msg.infoMessage) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        }
      });
  }

  disableInput() {
    this.__isInputDisabled.set(
      this.purchaseQuotation.actVendorId !== 0 &&
      this.purchaseQuotation.documentDate !== ''
    );
  }

  savePurchaseQuotationDetail() {

    if (this.lform.valid && this.aform.valid) {
      this.accountsService
        .savePurchaseQuotationDetail(this.purchaseQuotation)
        .subscribe(async (success) => {
          this.purchaseQuotation = success;
          this.updateStatus();
          this.hideBtnBasedonStatus();
          this.data.successMessage(success.msg.infoMessage.msgDescription);

          if (this.id === 0) {
            const obj = {
              data: success.purQuotationId,
              data1: 0,
            };
            let urlJson = await this.url.encode(obj);
            this.router.navigateByUrl(
              '/home/purchase/purchase-quotation/detail/' + urlJson);
          }
        });
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please add any items');
    }
  }

  async onVendorSelect(event: any) {
    this.purchaseQuotation.actVendorId = event.actVendorId;
    this.purchaseQuotation.ientActVendor.vendorName = event.vendorName;
    this.vendorFlag = true;
    if (this.vendorIdRAW !== 0 && (this.vendorIdRAW !== this.purchaseQuotation.actVendorId)) {
      let isCustomerChange = await this.dialog.confirmDialog("Do you want to change vendor, If you change customer then entire data will be clear");
      if (isCustomerChange) {
        let currentDate: any = await this.appService.getCurrentDate();
        this.purchaseQuotation.documentDate = currentDate;
        this.purchaseQuotation.plistentPurQuotationItem = [];
        this.purchaseQuotation.actVendorId = event.actVendorId;
      }
      else {
        this.purchaseQuotation.actVendorId = this.vendorIdRAW;
      }
    }
    this.vendorIdRAW = this.purchaseQuotation.actVendorId;
    this.getVendorAllDetails(event);
  }

  getVendorAllDetails(val: any) {
    this.vendor.actVendorId = val.actVendorId;
    this.vendor.vendorName = val.vendorName;

    let obj = {
      data: val.actVendorId,
      data1: this.purchaseQuotation.regionValue
    }

    this.accountsService
      .getVendorForSearch(obj)
      .subscribe((success) => {
        this.purchaseQuotation.ientActVendor = success;
        this.purchaseQuotation.actVendorId = success.actVendorId;
        this.initialData.DDLValues.DDLAddress = success.lstAddress;
        this.purchaseQuotation.docCurreny = success.currencyValue;

        if (this.purchaseQuotation.currencyValue === success.currencyValue) {
          this.purchaseQuotation.currencyRate = '1';
          this.currecyDisabled = true;
        } else if (this.vendorFlag) {
          this.documentDateConversionDate();
        }
        this.vendorFlag = false;
      });
  }

  documentDateConversionDate() {
    if (this.purchaseQuotation.documentDate !== '' && this.purchaseQuotation.ientActVendor.currencyValue !== '') {
      if (this.purchaseQuotation.statusValue === 'INPRO' || this.purchaseQuotation.statusValue === 'PENAP') {
        this.checkDocumentDatelist();
        this.documentDataChange();
        this.accountsService
          .documentDateConversioDate(this.checkDocumentDate)
          .subscribe((success) => {
            this.purchaseQuotation.currencyRate = success.conversionRate;
            if (
              this.purchaseQuotation.currencyValue ===
              this.purchaseQuotation.ientActVendor.currencyValue
            ) {
              this.purchaseQuotation.currencyRate = '1.00000000';
            } else {
              if (success.conversionRate !== 0) {
                this.purchaseQuotation.currencyRate = success.conversionRate;

              }
            }
          });
      }
    }
  }

  documentDataChange() {
    if (this.purchaseQuotation.plistentPurQuotationItem.length !== 0) {
      for (let i = 0; i < this.purchaseQuotation.plistentPurQuotationItem.length; i++) {
        let item = this.purchaseQuotation.plistentPurQuotationItem[i];

        if (item.ientInvItem.actTaxCodeValue !== 'VAT-C') {
          this.getTaxPercentageByItemIdAndEffectiveDate(item.invItemId, i);
        }
      }
    }
  }

  checkDocumentDatelist() {
    let result = '';
    let j = 0;

    if (this.purchaseQuotation.plistentPurQuotationItem.length !== 0) {
      for (let i = 0; i < this.purchaseQuotation.plistentPurQuotationItem.length; i++) {
        let item = this.purchaseQuotation.plistentPurQuotationItem[i];

        if (item.invItemId !== 0 && item.purQuotationId !== 0) {
          if (j > 0) {
            result += ',';
          }
          result += item.purQuotationId;
          j++;
        }
      }
    }
    this.voucherid = result;
    this.checkDocumentDate.documentDate = this.purchaseQuotation.documentDate;
    this.checkDocumentDate.voucherType = this.purchaseQuotation.ientActVoucherConfig.voucherTypeValue;
    this.checkDocumentDate.voucherIds = this.voucherid;
    this.checkDocumentDate.targetCurrencyValue = this.purchaseQuotation.ientActVendor.currencyValue;
  }


  // documentDateConversionDate() {

  //   if (
  //     this.purchaseQuotation.documentDate === '' ||
  //     this.purchaseQuotation.ientActVendor.currencyValue === ''
  //   )
  //     return;
  //   if (
  //     this.purchaseQuotation.statusValue !== 'INPRO' &&
  //     this.purchaseQuotation.statusValue !== 'PENAP'
  //   )
  //     return;
  // }

  async onSelectTab(val: any) {
    this.selectedTab = val;
    if (val === 3) {
      await this.viewPurchaseQuotationReceipt();
    }
  }

  getNotesValue(val: any) {
    this.purchaseQuotation = val;
    this.updateStatus();
    this.hideBtnBasedonStatus();

    if (val.statusValue === 'APROV') {
      this.onSelectTab(3);
    }
  }

  viewPurchaseQuotationReceipt() {
    this.fileLink = '';
    if (this.id !== 0) {
      const obj = {
        data: this.id,
        data1: this.purchaseQuotation.ientActVoucherConfig.pdfOtherComments,
      };
      this.data
        .postPDFData2(
          'Purchase/ViewPurchaseQuotationReceipt',
          obj,
          this.accountsOptions
        )
        .subscribe((success: any) => {
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
          this.fileLink = fileURL;
        });
    }
  }

  hideBtnBasedonStatus() {
    this.__hideBtn.set(
      this.purchaseQuotation.statusValue === 'APROV' ||
      this.purchaseQuotation.statusValue === 'CANCL'
    );
  }

  updateStatus() {
    this.__isDisabled.set(
      this.purchaseQuotation.statusValue !== 'APROV' &&
      this.purchaseQuotation.statusValue !== 'CANCL' &&
      this.purchaseQuotation.statusValue !== 'PENAP'
    );
  }

  getPurchaseQuotation(event: any) {
    console.log(event);
    this.purchaseQuotation.purQuotationId = event.purQuotationId;
  }

  getExchangeRateLst(val: any) {
    this.exchangeRateLst = val;
  }

  getItemsByPurchaseQuotationIdForPurchaseOrder() {
    this.itemListCheck();
    if (this.purchaseQuotationId !== 0) {
      if (this.checkAlreadyExists(this.purchaseQuotationId)) {
        this.purchaseQuotation.purQuotationId = this.purchaseQuotationId;
        this.purchaseQuotation.voucherConfigId = this.voucherConfigId;
        this.accountsService
          .getItemsByPurchaseQuotationIdForPurchaseOrder(this.purchaseQuotation)
          .subscribe((success) => {
            this.purchaseQuotation = success;
            this.updateStatus();
            this.lstentPurQuotationItemQuantity = JSON.parse(
              JSON.stringify(success.lstentPurPurchaseOrderItem)
            );
            this.purchaseQuotation.plistentPurQuotationItem =
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

  itemListCheck() {
    this.splicePipe.transform(
      this.purchaseQuotation.plistentPurQuotationItem,
      'sentInvItem'
    );
  }

  checkAlreadyExists(val: any): boolean {
    for (const item of this.purchaseQuotation.plistentPurQuotationItem) {
      if (item.purchaseQuotationId !== 0 && item.purchaseQuotationId === val) {
        this.data.errorInfoMessage('Selected purchase order already exists');
        return false;
      }
    }
    return true;
  }

  doItemSelect(val: any, items: any, index: any) {
    items.ientInvItem.invItemId = val.invItemId;
    items.ientInvItem.itemName = val.itemName;
    items.ientInvItem.itemCode = val.itemCode;
    this.setItemDetailsForPurchaseQuotation(val, index);
  }

  setItemDetailsForPurchaseQuotation(val: any, index?: any) {
    if (val.invItemId !== 0) {
      let purchaseQuotationRawData = new entPurQuotation();
      purchaseQuotationRawData.penturQuotationItem.ientInvItem = val;
      purchaseQuotationRawData.voucherConfigId = this.voucherConfigId;
      let selectedItem = JSON.parse(
        JSON.stringify(this.purchaseQuotation.plistentPurQuotationItem[index])
      );
      this.accountsService
        .setItemDetailsForPurchaseQuotation(
          purchaseQuotationRawData
        )
        .subscribe((success) => {
          this.plistentPurQuotationItemRAW[index] = success;
          this.purchaseQuotation.plistentPurQuotationItem[index] = success;
          this.purchaseQuotation.plistentPurQuotationItem[
            index
          ].purQuotationItemId = selectedItem.purQuotationItemId;
          this.purchaseQuotation.plistentPurQuotationItem[index].updateSeq =
            selectedItem.updateSeq;
          this.purchaseQuotation.plistentPurQuotationItem[index].idoObjState =
            selectedItem.idoObjState;
          this.purchaseQuotation.plistentPurQuotationItem[
            index
          ].purQuotationId = selectedItem.purQuotationId;
          if (this.purchaseQuotation.plistentPurQuotationItem.length !== 0) {
            this.purchaseQuotation.plistentPurQuotationItem.forEach(
              async (element: any, index: any) => {
                if (element.invItemId !== 0) {
                  await this.getTaxPercentageByItemIdAndEffectiveDate(
                    element.invItemId,
                    index
                  );
                }
              }
            );
          }
        });
    }
  }

  getTaxPercentageByItemIdAndEffectiveDate(itemId: any, index: any) {
    if (itemId === 0) return;
    const obj = {
      data: itemId,
      data1: this.purchaseQuotation.documentDate,
    };
    this.accountsService
      .getTaxPercentageByItemIdAndEffectiveDate(obj)
      .subscribe((success) => {
        const taxPercentage = success.data === 'VAT-A' ? success.data1 : 0;
        this.purchaseQuotation.plistentPurQuotationItem[index].taxPercentage =
          taxPercentage;
      });
  }

  async itemsDelete(val: any, index: any) {
    let msg = 'Are You Sure, You Want to Delete this Item?';
    let response = await this.dialog.confirmDialog(msg);
    if (response) {
      if (val.purQuotationId !== 0) {
        this.deletePurchaseQuotationItem(val, index);
      } else {
        // this.purchaseQuotation.plistentPurQuotationItem.splice(index, 1);
        this.purchaseQuotation.plistentPurQuotationItem.splice(index, 1);
        this.lstentPurQuotationItemQuantity = this.splicePipe.transform(
          this.lstentPurQuotationItemQuantity,
          'ientInvItem'
        );
        // setTimeout(() => {
        //   this.totalService.setValue(true);
        // }, 100);
        this.data.successMessage('Item Removed Sucessfully');
      }
    }
  }

  deletePurchaseQuotationItem(val: any, index: any) {
    this.purchaseQuotation.plistentPurQuotationItem[index].strDeleteFlag = 'Y';
    this.accountsService
      .deletePurchaseQuotationItem(this.purchaseQuotation)
      .subscribe((success) => {
        // this.purchaseQuotation = success;
        this.lstentPurQuotationItemQuantity.splice(index, 1);
        this.lstentPurQuotationItemQuantity = this.splicePipe.transform(
          this.lstentPurQuotationItemQuantity,
          'ientInvItem'
        );
      });
  }

  onTotalValue(val: any) {
    this.purchaseQuotation.totalAfterDiscount = val.totalAfterDiscount;
    this.purchaseQuotation.totalTaxAmount = val.taxAmount;
    this.purchaseQuotation.totalNetAmount = val.netAmount;
  }

  checkMinMax(event: any, item: any) {
    if ((parseFloat(event) !== 0 && item.ientInvItem.inventoryGoods === 'Y')) {
      if (parseFloat(item.ientInvItem.maxQuantity) < parseFloat(event) && item.ientInvItem.maxQuantity !== parseFloat(event)) {
        let msg = 'Maximum Quantity ' + item.ientInvItem.maxQuantity + ' Is Reached';
        let dialog = this.dialog.notificationDialog(msg);
      } else if (parseFloat(item.ientInvItem.minQuantity) > parseFloat(event) && parseFloat(item.ientInvItem.minQuantity) !== parseFloat(event)) {
        let msg = 'Minimum Quantity ' + item.ientInvItem.minQuantity + ' Is Need';
        let dialog = this.dialog.notificationDialog(msg);
      }
    }
  }

  navigateToList() {
    this.router.navigateByUrl('/home/purchase/purchase-quotation/search');
  }
}

// async createNewNotes(val: any) {
//   if (val === 0) {
//     this.createNewPaymentNoteNotes();
//   }
//   let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
//     disableClose: true,
//     height: '400px',
//     width: '900px',
//     maxWidth: '1170px',
//   });
// }

// createNewPaymentNoteNotes() {
//   this.errorTrue = false;
//   const obj = {
//     data: this.purchaseQuotation.voucherConfigId,
//     data1: this.purchaseQuotation.statusValue,
//   };
//   this.accountsService
//     .createNewPaymentNoteNotes(obj)
//     .subscribe((success) => {
//       this.purchaseQuotationNotes = success;
//       this.statusddl = success.lstDDLClass;
//     });
// }
// savePurchaseQuotationNotes() {
//   this.purchaseQuotationNotes.referenceId =
//     this.purchaseQuotation.purQuotationId;
//   this.purchaseQuotationNotes.lstDDLClass = [];
//   this.purchaseQuotation.sentPurNotes = this.purchaseQuotationNotes;
//   this.accountsService
//     .savePurchaseQuotationNotes(this.purchaseQuotation)
//     .subscribe((success) => {
//       this.purchaseQuotation = success;
//       this.tableNoteData = success.plistentPurNotes;
//     });
// }

// uploadDocument() {
//   return new Promise((resolve: any) => {
//     this.accountsService
//       .uploadPurchaseQuotationAttachment(
//         this.purchaseQuotationAttachments,
//         this.options
//       )
//       .subscribe((success) => {
//         this.purchaseQuotation.ilstentPurAttachments =
//           success.plstentPurAttachments;
//         this.dialog.closeDialog();
//         resolve(true);
//       });
//   });
// }

// async uploadAttachemnt(event: any) {
//   this.purchaseQuotationAttachments.referenceId =
//     this.purchaseQuotation.purQuotationId;
//   let attachmentList: any = [];
//   attachmentList = event;
//   for (let i = 0; i < attachmentList.length; i++) {
//     if (attachmentList.length !== 0) {
//       this.purchaseQuotationAttachments.attachmentSize =
//         attachmentList[i].fileSize;
//       this.purchaseQuotationAttachments.attachmentFileName =
//         attachmentList[i].fileName;
//       this.purchaseQuotationAttachments.istringFileContent =
//         attachmentList[i].content;
//       this.purchaseQuotationAttachments.attachementType =
//         attachmentList[i].fileType;
//       let uploadDocument = await this.uploadDocument();
//     }
//   }
// }

// async createNewAttachment() {
//   let dialogResponse: any = await this.dialog.openDialog(
//     this.attachmentDialog,
//     {
//       disableClose: true,
//       height: '300px',
//       width: '100%',
//       maxWidth: '1170px',
//     }
//   );
// }
