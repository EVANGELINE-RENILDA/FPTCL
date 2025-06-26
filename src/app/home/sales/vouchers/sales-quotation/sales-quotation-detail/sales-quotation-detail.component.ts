import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild, signal } from '@angular/core';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { FormsModule, NgForm } from '@angular/forms';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { AppDatePipe } from "../../../../../common/pipes/app-date/app-date.pipe";
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { AppService } from '../../../../../app.service';
import { FooterToggleDirective } from '../../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { CommonModule, NgClass } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { ItemValueComponent } from '../../../../../app-core/app-template/item-value/item-value.component';
import { TotalValueComponent } from '../../../../../app-core/app-template/total-value/total-value.component';
import { GetDatePipe } from '../../../../../common/pipes/app-get-date/get-date.pipe';
import { AppSafePipe } from '../../../../../common/pipes/app-safe/app-safe.pipe';
import { SplicePipe } from '../../../../../common/pipes/app-splice/splice.pipe';
import { PurchaseQuotationDetailAttachmentComponent } from '../../../../purchase/voucher/purchase-quotation/purchase-quotation-detail/purchase-quotation-detail-attachment/purchase-quotation-detail-attachment.component';
import { PurchaseQuotationDetailNotesComponent } from '../../../../purchase/voucher/purchase-quotation/purchase-quotation-detail/purchase-quotation-detail-notes/purchase-quotation-detail-notes.component';
import { PurchaseQuotationDetailPreviewComponent } from '../../../../purchase/voucher/purchase-quotation/purchase-quotation-detail/purchase-quotation-detail-preview/purchase-quotation-detail-preview.component';
import { SearchItemComponent } from '../../../../search/search-item/search-item.component';
import { SearchVendorComponent } from '../../../../search/search-vendor/search-vendor.component';
import { Router, ActivatedRoute } from '@angular/router';
import { entPurQuotation, entActVendor, entCheckLineItemBasedonDocumentDate, entSalSalesQuotation, entSalNotes } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { SalesQuotationDetailPreviewComponent } from './sales-quotation-detail-preview/sales-quotation-detail-preview.component';
import { SalesQuotationDetailNotesComponent } from './sales-quotation-detail-notes/sales-quotation-detail-notes.component';
import { SalesQuotationDetailAttachmentComponent } from './sales-quotation-detail-attachment/sales-quotation-detail-attachment.component';
import { SearchCustomerComponent } from '../../../../search/search-customer/search-customer.component';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-sales-quotation-detail',
    standalone: true,
    templateUrl: './sales-quotation-detail.component.html',
    styleUrl: './sales-quotation-detail.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
      SalesQuotationDetailPreviewComponent,
      SalesQuotationDetailNotesComponent,
      SalesQuotationDetailAttachmentComponent,
      SearchCustomerComponent
    ],
    providers: [GetDatePipe, SplicePipe],
})
export class SalesQuotationDetailComponent {

  accountsOptions = {
    type: 'accountsPath',
  };

  __isDisabled = signal(true);
  __hideBtn = signal(true);
  errorTrue = false;
  pageId = 'AJVSC';
  showItemTable = true;
  purchaseQuotationRAW: any;
  salSalesQuotationId = 0;
  plistSalSalesQuotationItem: any = [];
  plistentPurQuotationItemRAW: any = [];
  exchangeRateLst:any = [];
  id: any = 0;

  statusddl = [];
  updateSequence = 0;
  selectedTab = 0;
  fileLink = '';
  urlFileName = '';
  blob = {};
  options = {
    type: 'accountsPath',
  };
  @ViewChild('l') lform!: NgForm;
  @ViewChild('a') aform!: NgForm;

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

  salesQuotation = new entSalSalesQuotation();
  vendor = new entActVendor();
  checkDocumentDate: any = new entCheckLineItemBasedonDocumentDate();
  salesQuotationNotes = new entSalNotes();
  currencyRate: any = 0;
  customerFlag = false;
  initialLoad = true;
  vendorIdRAW = 0;
  voucherId: any = 0;
  voucherConfigId: any = 0;
  regionDetailValue: any = '';
  vendorFlag = false;
  currecyDisabled = false;
  voucherid: any = '';
  loadingTrue = false;
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
    await this.initialData.getAcccountsDDL('getQuotationInitialData',this.options);
    if (this.id > 0) {
      this.openSalesQuotationDetail(this.id);
    } else {
      this.createNewCustomerQuotation(
        this.voucherConfigId,
        this.regionDetailValue
      );
    }
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  createNewCustomerQuotation(val: any, val1: any) {
    const obj = {
      data: val,
      data1: val1,
    }
    this.accountsService
      .createNewCustomerQuotation(obj)
      .subscribe((success) => {
        this.salesQuotation = success;
        this.vendorIdRAW = 0;
        this.voucherId = success.iActVoucherConfig.actVoucherConfigId;
        this.errorTrue = false;
        this.createNewSalesQuotationItem(0);
      });
  }

  addRow(index: any) {
    this.createNewSalesQuotationItem(index);
  }

  createNewSalesQuotationItem(index: number) {
    this.accountsService
      .createNewSalesQuotationItem()
      .subscribe((success) => {
        console.log(success);

        const newItem = JSON.parse(JSON.stringify(success));
        this.salesQuotation.plistSalSalesQuotationItem.splice(
          index,
          0,
          newItem
        );
        console.log(this.salesQuotation.plistSalSalesQuotationItem);
      });
  }

  openSalesQuotationDetail(id?: any) {
    this.errorTrue = false;
    const obj = {
      data: this.id,
    };
    this.accountsService
      .openSalesQuotationDetail(obj)
      .subscribe((success: any) => {
        this.salesQuotation = success;
        this.tableAttachmentData = success.ilstentPurAttachments;

        if (success.msg.infoMessage) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        }
      });
  }

  disableInput() {
    this.__isInputDisabled.set(
      this.salesQuotation.actCustomerId !== 0 &&
        this.salesQuotation.documentDate !== ''
    );
  }

  saveSalesquotationDetails() {
    if (this.lform.valid && this.aform.valid) {
      this.accountsService
        .saveSalesquotationDetails(this.salesQuotation)
        .subscribe(async (success) => {
          this.salesQuotation = success;
          this.updateStatus();
          this.hideBtnBasedonStatus();
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        });
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please add any items');
    }
  }

  async doCustomerSelect(event: any) {
    this.salesQuotation.actCustomerId = event.actCustomerId;
    this.salesQuotation.ientActCustomerDetails.currencyCodeValue = event.currencyCodeValue;
    this.vendorFlag = true;
    if (this.vendorIdRAW !== 0 && (this.vendorIdRAW !== this.salesQuotation.actCustomerId)) {
      let isCustomerChange = await this.dialog.confirmDialog("Do you want to change customer, If you change customer then entire data will be clear");
      if (isCustomerChange) {
        let currentDate: any = await this.appService.getCurrentDate();
        this.salesQuotation.documentDate = currentDate;
        this.salesQuotation.plistSalSalesQuotationItem = [];
        this.salesQuotation.actCustomerId = event.actCustomerId;
      }
      else {
        this.salesQuotation.actCustomerId = this.vendorIdRAW;
      }
    }
    this.vendorIdRAW = this.salesQuotation.actCustomerId;
    this.openCustomer(event);
  }

  openCustomer(val: any) {

    const obj = {
      data: val.actCustomerId,
      data1: this.salesQuotation.regionValue
    };
    this.accountsService
      .getCustomerDetailsForSearch(obj, this.options)
      .subscribe((success) => {
        this.salesQuotation.ientActCustomerDetails = success;
        this.salesQuotation.docCurreny = success.currencyCodeValue;
        this.initialData.DDLValues.DDLAddress =
          success.lstAddress;
        this.currencyRate = parseFloat(this.salesQuotation.currencyRate);
        if (success.actCustomerId === 0) {
          this.salesQuotation.currencyRate = '0.00000000';
        }
        if (this.salesQuotation.currencyValue === success.currencyCodeValue) {
          this.salesQuotation.currencyRate = '1.00000000';
          this.currencyRate = parseFloat(this.salesQuotation.currencyRate);
          this.currecyDisabled = true;
        } else {
          if (this.customerFlag) {
            this.documentDateConversioDate();
          }
        }
        this.customerFlag = false;
        this.initialLoad = false;
      });
  }

  documentDateConversioDate() {
    if (this.salesQuotation.documentDate !== '') {
      if (
        this.salesQuotation.statusValue === 'INPRO' ||
        this.salesQuotation.statusValue === 'PENAP'
      ) {
        this.checkDocumentDatelist();
        this.documentDataChange();
        this.accountsService
          .documentDateConversioDate(this.checkDocumentDate, this.options)
          .subscribe((success) => {
            this.salesQuotation.currencyRate = success.conversionRate;
            if (
              this.salesQuotation.currencyValue ===
              this.salesQuotation.ientActCustomerDetails.currencyCodeValue
            ) {
              this.salesQuotation.currencyRate = '1';
              this.currencyRate = parseFloat(this.salesQuotation.currencyRate);
            } else {
              if (success.conversionRate !== 0) {
                this.salesQuotation.currencyRate = success.conversionRate;
                this.currencyRate = parseFloat(
                  this.salesQuotation.currencyRate
                );
              }
            }
            this.initialLoad = false;
          });
      } else {
      }
    } else {
    }
  }

  documentDataChange() {
    if (this.salesQuotation.plistSalSalesQuotationItem.length !== 0) {
      for (let i = 0; i < this.salesQuotation.plistSalSalesQuotationItem.length; i++) {
        let item = this.salesQuotation.plistSalSalesQuotationItem[i];

        if (item.pentInvItem.actTaxCodeValue !== 'VAT-C') {
          this.getTaxPercentageByItemIdAndEffectiveDate(item.invItemId, i);
        }
      }
    }
  }

  checkDocumentDatelist() {
    let result = '';
    let j = 0;

    if (this.salesQuotation.plistSalSalesQuotationItem.length !== 0) {
      for (let i = 0; i < this.salesQuotation.plistSalSalesQuotationItem.length; i++) {
        let item = this.salesQuotation.plistSalSalesQuotationItem[i];

        if (item.invItemId !== 0 && item.salSalesQuotationId !== 0) {
          if (j > 0) {
            result += ',';
          }
          result += item.salSalesQuotationId;
          j++;
        }
      }
    }
    this.voucherid = result;
    this.checkDocumentDate.documentDate = this.salesQuotation.documentDate;
    this.checkDocumentDate.voucherType = this.salesQuotation.iActVoucherConfig.voucherTypeValue;
    this.checkDocumentDate.voucherIds = this.voucherid;
    this.checkDocumentDate.targetCurrencyValue = this.salesQuotation.ientActCustomerDetails.currencyCodeValue;
  }


  async onSelectTab(val: any) {
    this.selectedTab = val;
  }

  getNotesValue(val: any) {
    this.salesQuotation = val;
    this.updateStatus();
    this.hideBtnBasedonStatus();

    if (val.statusValue === 'APROV') {
      this.onSelectTab(3);
    }
  }

  hideBtnBasedonStatus() {
    this.__hideBtn.set(
      this.salesQuotation.statusValue === 'APROV' ||
        this.salesQuotation.statusValue === 'CANCL'
    );
  }

  updateStatus() {
    this.__isDisabled.set(
      this.salesQuotation.statusValue !== 'APROV' &&
        this.salesQuotation.statusValue !== 'CANCL' &&
        this.salesQuotation.statusValue !== 'PENAP'
    );
  }

  getExchangeRateLst(val:any){
    this.exchangeRateLst = val;
  }

  itemListCheck() {
    this.splicePipe.transform(
      this.salesQuotation.plistSalSalesQuotationItem,
      'sentInvItem'
    );
  }

  checkAlreadyExists(val: any): boolean {
    for (const item of this.salesQuotation.plistSalSalesQuotationItem) {
      if (item.purchaseQuotationId !== 0 && item.purchaseQuotationId === val) {
        this.data.errorInfoMessage('Selected purchase order already exists');
        return false;
      }
    }
    return true;
  }

  doItemSelect(val: any, items: any, index: any) {
    items.pentInvItem.invItemId = val.invItemId;
    items.pentInvItem.itemName = val.itemName;
    items.pentInvItem.itemCode = val.itemCode;
    this.setItemDetailsForSalesQuotation(val, index);
  }

  setItemDetailsForSalesQuotation(val: any, index?: any) {
    if (val.invItemId !== 0) {
      let obj = {
        longData1: this.salesQuotation.appActVoucherConfigId,
        longData2: val.invItemId,
        strData3: this.regionDetailValue
      };
      let selectedItem = JSON.parse(
        JSON.stringify(this.salesQuotation.plistSalSalesQuotationItem[index])
      );
      this.accountsService
        .setItemDetailsForSalesQuotation(obj, this.options)
        .subscribe((success) => {
          // this.plistSalSalesQuotationItemRAW[index] = success;
          this.salesQuotation.plistSalSalesQuotationItem[index] = success;
          this.salesQuotation.plistSalSalesQuotationItem[
            index
          ].salSalesQuotationItemId = selectedItem.salSalesQuotationItemId;
          this.salesQuotation.plistSalSalesQuotationItem[index].updateSeq =
            selectedItem.updateSeq;
          this.salesQuotation.plistSalSalesQuotationItem[index].idoObjState =
            selectedItem.idoObjState;
          this.salesQuotation.plistSalSalesQuotationItem[
            index
          ].salSalesQuotationId = selectedItem.salSalesQuotationId;
          if (this.salesQuotation.plistSalSalesQuotationItem.length !== 0) {
            this.getTaxPercentageByItemIdAndEffectiveDate(
              this.salesQuotation.plistSalSalesQuotationItem[index].invItemId,
              index
            );
          }
          this.initialLoad = false;
        });
    }
  }
  getTaxPercentageByItemIdAndEffectiveDate(itemId: any, index: any) {
    if (itemId === 0) return;
    const obj = {
      data: itemId,
      data1: this.salesQuotation.documentDate,
    };
    this.accountsService
      .getTaxPercentageByItemIdAndEffectiveDate(obj)
      .subscribe((success) => {
        const taxPercentage = success.data === 'VAT-A' ? success.data1 : 0;
        this.salesQuotation.plistSalSalesQuotationItem[index].taxPercentage =
          taxPercentage;
      });
  }

  async itemsDelete(val: any, index: any) {
    let msg = 'Are You Sure, You Want to Delete this Item?';
    let response = await this.dialog.confirmDialog(msg);
    if (response) {
      if (val.salSalesQuotationId !== 0) {
        this.deleteSalesQuotationItem(val, index);
      } else {
        // this.salesQuotation.plistSalSalesQuotationItem.splice(index, 1);
        this.salesQuotation.plistSalSalesQuotationItem.splice(index, 1);
        this.data.successMessage('Item Removed Sucessfully');
      }
    }
  }

  deleteSalesQuotationItem(val: any, index: any) {
    this.salesQuotation.plistSalSalesQuotationItem[index].strDeleteFlag = 'Y';
    this.accountsService
      .deleteSalesQuotationItem(this.salesQuotation)
      .subscribe((success) => {
        this.salesQuotation = success;
      });
  }

  onTotalValue(val: any) {
    this.salesQuotation.totalAfterDiscount = val.totalAfterDiscount;
    this.salesQuotation.totalTaxAmount = val.taxAmount;
    this.salesQuotation.totalNetAmount = val.netAmount;
  }

  checkMinMax(event: any, item: any) {
    if ((parseFloat(event) !== 0 && item.pentInvItem.inventoryGoods === 'Y')) {
      if (parseFloat(item.pentInvItem.maxQuantity) < parseFloat(event) && item.pentInvItem.maxQuantity !== parseFloat(event)) {
        let msg = 'Maximum Quantity ' + item.pentInvItem.maxQuantity + ' Is Reached';
        let dialog  = this.dialog.notificationDialog(msg);
      } else if (parseFloat(item.pentInvItem.minQuantity) > parseFloat(event) && parseFloat(item.pentInvItem.minQuantity) !== parseFloat(event)) {
        let msg = 'Minimum Quantity ' + item.pentInvItem.minQuantity + ' Is Need';
        let dialog  = this.dialog.notificationDialog(msg);
      }
    }
  }

  navigateToList() {
    this.router.navigateByUrl('/home/sales/sales-quotation/search');
  }
  doClear() {
    this.errorTrue = false;
    this.createNewCustomerQuotation(this.voucherConfigId, this.regionDetailValue);
  }
   directApproved() {
    this.salesQuotation.iActVoucherConfig.isDirectApproval === 'Y'
      ? (this.salesQuotationNotes.statusValue = 'APROV')
      : this.salesQuotation.statusValue === 'PENAP'
        ? (this.salesQuotationNotes.statusValue = 'APROV')
        : (this.salesQuotationNotes.statusValue = 'PENAP');
    if (
      this.lform.valid &&
      this.salesQuotation.currencyRate !== '0' &&
      this.salesQuotation.currencyRate !== ''
    ) {
      if (
        this.aform.valid &&
        this.salesQuotation.plistSalSalesQuotationItem.length !== 0
      ) {
        this.salesQuotationNotes.referenceId = this.id;
        this.salesQuotationNotes.lstDDLClass = [];
        this.salesQuotation.pentSalNotes = this.salesQuotationNotes;
        this.loadingTrue = true;
        this.accountsService
          .saveCustomerQuotationNote(this.salesQuotation, this.options)
          .pipe(
            finalize(() => {
              this.loadingTrue = false;
            })
          )
          .subscribe((success) => {
            this.salesQuotation = success;
            this.voucherId = success.appActVoucherConfigId;
            if (this.salesQuotation.statusValue === "APROV") {
              this.onSelectTab(3);
            }
            this.initialLoad = false;
          });
      } else {
        this.data.errorInfoMessage('Please add any one items');
        this.errorTrue = true;
      }
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }
}
