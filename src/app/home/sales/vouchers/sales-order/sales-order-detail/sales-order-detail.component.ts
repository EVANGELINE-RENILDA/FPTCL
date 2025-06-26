import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild, signal } from '@angular/core';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AppDatePipe } from "../../../../../common/pipes/app-date/app-date.pipe";
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppService } from '../../../../../app.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { NgClass, SlicePipe } from '@angular/common';
import { FooterToggleDirective } from '../../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { MatMenuModule } from '@angular/material/menu';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ItemValueComponent } from '../../../../../app-core/app-template/item-value/item-value.component';
import { TotalValueComponent } from '../../../../../app-core/app-template/total-value/total-value.component';
import { GetDatePipe } from '../../../../../common/pipes/app-get-date/get-date.pipe';
import { SplicePipe } from '../../../../../common/pipes/app-splice/splice.pipe';
import { AutoSearchQuotationComponent } from '../../../../search/auto-search-quotation/auto-search-quotation.component';
import { SearchItemComponent } from '../../../../search/search-item/search-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import { entPurNotes, entSalSalesOrder } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { SalesOrderStatusComponent } from './sales-order-status/sales-order-status.component';
import { SalesOrderDetailPreviewComponent } from './sales-order-detail-preview/sales-order-detail-preview.component';
import { SalesOrderDetailNotesComponent } from './sales-order-detail-notes/sales-order-detail-notes.component';
import { SalesOrderDetailAttachmentComponent } from './sales-order-detail-attachment/sales-order-detail-attachment.component';
import { SearchCustomerComponent } from '../../../../search/search-customer/search-customer.component';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-sales-order-detail',
    standalone: true,
    templateUrl: './sales-order-detail.component.html',
    styleUrl: './sales-order-detail.component.scss',
    imports: [
      NgClass,
      SlicePipe,
      FormsModule,
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
      SalesOrderDetailNotesComponent,
      SalesOrderDetailAttachmentComponent,
      SalesOrderDetailPreviewComponent,
      SalesOrderStatusComponent,
      SearchCustomerComponent
    ],
    providers: [GetDatePipe, SplicePipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SalesOrderDetailComponent {
  selectedTab = 0;
  errorTrue = false;
  pageId = 'AJVSC';
  internalUpdateSequence = 0;
  updateSequence = 0;
  purchaseQuotationId = 0;
  lstentPurPurchaseOrderItemQuantity: any = [];
  ilstentSalSalesOrderItem: any = [];

  dateNotEffective = '';
  id: any = 0;
  appActVoucherConfigId: any = 0;
  regionDetailValue: any = '';
  salesOrder:any = new entSalSalesOrder();
  salesOrderNotes = new entPurNotes();
  purchaseOrderRAW: any;
  regionValueDDL: any = [];
  isCurrencyDisabled = false;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  @ViewChild('l') lform!: NgForm;
  @ViewChild('a') aform!: NgForm;
  @ViewChild('b') bform!: NgForm;
  __isDisabled = signal(true);
  __isInputDisabled = signal(true);
  __hideBtn = signal(true);

  options = {
    type: 'accountsPath',
  };
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
    public splicePipe: SplicePipe

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
    this.appActVoucherConfigId = params.data1;
    this.regionDetailValue = params.data2;
    this.errorTrue = false;

    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getSalesOrderInitialData',this.options);


    if (this.id === 0) {
      this.createNewSalesOrderDetail(this.appActVoucherConfigId, this.regionDetailValue);
    } else {
      this.openSalesOrderDetail(this.id);
    }
  }

  createNewSalesOrderDetail(val: any, val1: any) {
    const obj = {
      data: val,
      data1: val1
    };
    this.accountsService.createNewSalesOrderDetail(obj)
      .subscribe((success) => {
        this.salesOrder = success;
        this.errorTrue = false;
        this.updateStatus();
        this.hideBtnBasedonStatus();
        this.purchaseOrderRAW = JSON.stringify(this.salesOrder);
        this.createNewSalesOrderItem(0);
      });
  }

  openSalesOrderDetail(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .openSalesOrderDetail(obj)
      .subscribe((success) => {
        this.salesOrder = success;
        this.updateStatus();
        this.hideBtnBasedonStatus();
        this.dateNotEffective = success.documentDate;
        this.appActVoucherConfigId = success.appActVoucherConfigId;
        this.updateSequence = success.updateSequence;
        this.openCustomer(success.ientActCustomerDetails);
        this.screenDisabled();
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      });
  }

  saveSalesOrderDetail() {
    if (this.lform.valid && this.aform.valid) {
      if (this.salesOrder.ilstentSalSalesOrderItem.length !== 0) {
        this.accountsService
          .saveSalesOrderDetail(this.salesOrder)
          .subscribe(async (success) => {
            this.salesOrder = success;
            this.updateStatus();
            this.hideBtnBasedonStatus();
            this.updateSequence = success.updateSeq;
            this.data.successMessage(success.msg.infoMessage.msgDescription);
            if (this.id === 0) {
              const obj = {
                data: success.salSalesOrderId,
                data1: 0,
              };
              let urlJson = await this.url.encode(obj);
              this.router.navigateByUrl(
                '/home/sales/sales-order/detail/' + urlJson
              );
            }
          });
      } else {
        this.errorTrue = true;
        this.data.errorInfoMessage('Please add any items');
      }
    }else {
      this.errorTrue = true;
    }
  }
  directApproved() {
    this.salesOrder.ientActVoucherConfig.isDirectApproval === 'Y'
      ? (this.salesOrderNotes.statusValue = 'APROV')
      : this.salesOrder.statusValue === 'PENAP'
        ? (this.salesOrderNotes.statusValue = 'APROV')
        : (this.salesOrderNotes.statusValue = 'PENAP');
    if (this.lform.valid && this.aform.valid) {
      if (this.salesOrder.ilstentSalSalesOrderItem.length !== 0) {
        this.salesOrderNotes.referenceId = this.id;
        this.salesOrderNotes.lstDDLClass = [];
        this.salesOrder.pentSalNotes = this.salesOrderNotes;
        this.accountsService
          .saveSalesOrderNotes(this.salesOrder, this.options)
          .pipe(
            finalize(() => {
            })
          )
          .subscribe((success) => {
            this.salesOrder = success;
            if (this.salesOrder.statusValue === 'APROV') {
              this.onSelectTab(3);
            }
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
  checkMinMax(event: any, item: any) {
    if (item.purchaseQuotationId === 0 && (parseFloat(event) !== 0 && item.ientInvItem.inventoryGoods === 'Y')) {
      if (parseFloat(item.ientInvItem.maxQuantity) < parseFloat(event) && item.ientInvItem.maxQuantity !== parseFloat(event)) {
        let msg = 'Maximum Quantity ' + item.ientInvItem.maxQuantity + ' Is Reached';
        let dialog = this.dialog.notificationDialog(msg);
      } else if (parseFloat(item.ientInvItem.minQuantity) > parseFloat(event) && parseFloat(item.ientInvItem.minQuantity) !== parseFloat(event)) {
        let msg = 'Minimum Quantity ' + item.ientInvItem.minQuantity + ' Is Need';
        let dialog = this.dialog.notificationDialog(msg);
      }
    }
  }

  createNewSalesOrderItem(index: number) {
    this.accountsService.createNewSalesOrderItem().subscribe((success) => {
      const newItem = JSON.parse(JSON.stringify(success));
      this.salesOrder.ilstentSalSalesOrderItem.push(newItem);
    });
  }

  async itemsDelete(val: any, index: any) {
    let msg = "Are You Sure, You Want to Delete this Item?"
    let response = await this.dialog.confirmDialog(msg)
    if (response) {
      if (val.salSalesQuotationItemId !== 0) {
        this.deleteSalesOrderItem(val, index);
      } else {
        this.salesOrder.ilstentSalSalesOrderItem.splice(index, 1);
        this.lstentPurPurchaseOrderItemQuantity.splice(index, 1);
        this.lstentPurPurchaseOrderItemQuantity = this.splicePipe.transform(
          this.lstentPurPurchaseOrderItemQuantity,
          'ientInvItem'
        );
        this.data.successMessage('Item Removed Sucessfully');
      }
    }
  }

  deleteSalesOrderItem(val: any, index: any) {
    this.salesOrder.ilstentSalSalesOrderItem[index].strDeleteFlag = 'Y';
    this.accountsService
      .deleteSalesOrderItem(this.salesOrder)
      .subscribe((success) => {
        this.salesOrder = success;
        this.lstentPurPurchaseOrderItemQuantity.splice(index, 1);
        this.lstentPurPurchaseOrderItemQuantity = this.splicePipe.transform(
          this.lstentPurPurchaseOrderItemQuantity,
          'ientInvItem'
        );
      });
  }

  onTotalValue(val: any) {
    this.salesOrder.totalAfterDiscount = val.totalAfterDiscount;
    this.salesOrder.totalTaxAmount = val.taxAmount;
    this.salesOrder.totalNetAmount = val.netAmount;
  }
  async doCustomerSelect(event: any) {
    let actCustomerId = 0
    this.salesOrder.ientActCustomerDetails.customerName = event.customerName;
    this.salesOrder.actCustomerId = event.actCustomerId;
    if (actCustomerId > 0) {
      let response = await this.dialog.confirmDialog('Do you want to change vendor, If you change customer then entire data will be clear');
      if (response) {
        actCustomerId = event.actCustomerId;
        this.salesOrder.ientActCustomerDetails.customerName = event.customerName;
        let currentDate: any = await this.appService.getCurrentDate();
        this.salesOrder.documentDate = currentDate;
        this.salesOrder.ilstentSalSalesOrderItem = [];
      }
    } else {
      actCustomerId = event.actCustomerId
      this.openCustomer(event, true);
    }
  }

  openCustomer(val: any, isChanged?: boolean) {
    let obj = {
      data: val.actCustomerId,
      data1: 'REGI1'
    };
    this.accountsService.getCustomerDetailsForSearch(obj).subscribe((success) => {
      this.salesOrder.ientActCustomerDetails = success;
      this.salesOrder.docCurreny = success.currencyCodeValue;
      if (this.salesOrder.currencyValue === success.currencyCodeValue) {
        this.salesOrder.currencyRate = '1';
        this.isCurrencyDisabled = true;
      }
      if (isChanged) {
        this.documentDateConversionDate();
      }
    });
  }

  documentDateConversionDate() {
    if (this.salesOrder.documentDate === '' || this.salesOrder.ientActCustomerDetails.currencyCodeValue === '') return;
    if (this.salesOrder.statusValue !== 'INPRO' && this.salesOrder.statusValue !== 'PENAP') return;
    this.checkDocumentDateList();
    this.documentDataChange();
  }

  checkDocumentDateList() {
    let voucherIds = this.salesOrder.ilstentSalSalesOrderItem
      .filter((item: any) => item.invItemId !== 0 && item.purchaseQuotationId !== 0)
      .map((item: any) => item.purchaseQuotationId)
      .join(',');
    let checkDocumentDate = {
      documentDate: this.salesOrder.documentDate,
      voucherType: this.salesOrder.ientActVoucherConfig.voucherTypeValue,
      voucherIds: voucherIds,
      targetCurrencyValue: this.salesOrder.ientActCustomerDetails.currencyCodeValue
    };
    this.accountsService.documentDateConversioDate(checkDocumentDate).subscribe((success) => {
      this.salesOrder.dueDate = this.getDate.transform(this.salesOrder.documentDate, this.salesOrder.ientActCustomerDetails.creditPeriod);
      const conversionRate = success.conversionRate;
      if (this.salesOrder.currencyValue === this.salesOrder.ientActCustomerDetails.currencyCodeValue) {
        this.salesOrder.currencyRate = '1';
      } else if (conversionRate !== 0) {
        this.salesOrder.currencyRate = conversionRate;
      }
    });
  }


  doItemSelect(val: any, items: any, index: any) {
    items.ientInvItem.invItemId = val.invItemId;
    items.ientInvItem.itemName = val.itemName;
    items.ientInvItem.itemCode = val.itemCode;
    this.setItemDetailsForSalesQuotation(val, index);
  }

  setItemDetailsForSalesQuotation(val: any, index?: any) {
    if (val.invItemId !== 0) {
      let obj = {
        longData1: this.salesOrder.appActVoucherConfigId,
        longData2: val.invItemId,
        strData3: this.regionDetailValue
      };
      let selectedItem = JSON.parse(
        JSON.stringify(this.salesOrder.ilstentSalSalesOrderItem[index])
      );
      this.accountsService
        .setItemDetailsForSalesQuotation(obj, this.options)
        .subscribe((success) => {
          // this.plistSalSalesQuotationItemRAW[index] = success;
          this.salesOrder.ilstentSalSalesOrderItem[index] = success;
          this.salesOrder.ilstentSalSalesOrderItem[
            index
          ].salSalesQuotationItemId = selectedItem.salSalesQuotationItemId;
          this.salesOrder.ilstentSalSalesOrderItem[index].updateSeq =
            selectedItem.updateSeq;
          this.salesOrder.ilstentSalSalesOrderItem[index].idoObjState =
            selectedItem.idoObjState;
          this.salesOrder.ilstentSalSalesOrderItem[
            index
          ].salSalesQuotationId = selectedItem.salSalesQuotationId;
          if (this.salesOrder.ilstentSalSalesOrderItem.length !== 0) {
            this.getTaxPercentageByItemIdAndEffectiveDate(
              this.salesOrder.ilstentSalSalesOrderItem[index].invItemId,
              index
            );
          }
          // this.initialLoad = false;
        });
    }
  }

  documentDataChange() {
    const items = this.salesOrder.ilstentSalSalesOrderItem;
    if (items && items.length > 0) {
      items.forEach((item: any, index: any) => {
        if (item.ientInvItem.actTaxCodeValue !== 'VAT-C') {
          this.getTaxPercentageByItemIdAndEffectiveDate(item.invItemId, index);
        }
      });
    }
  }

  getTaxPercentageByItemIdAndEffectiveDate(itemId: any, index: any) {
    if (itemId === 0) return;
    const obj = {
      data: itemId,
      data1: this.salesOrder.documentDate,
    };
    this.accountsService.getTaxPercentageByItemIdAndEffectiveDate(obj)
      .subscribe((success) => {
        const taxPercentage = (success.data === 'VAT-A') ? success.data1 : 0;
        this.salesOrder.ilstentSalSalesOrderItem[index].taxPercentage = taxPercentage;
      });
  }

  updateStatus() {
    this.__isDisabled.set(this.salesOrder.statusValue !== 'APROV' && this.salesOrder.statusValue !== 'CANCL' && this.salesOrder.statusValue !== 'PENAP');
  }
  screenDisabled() {
    let screenDisabled = false;
    if (
      this.salesOrder.statusValue === 'APROV' ||
      this.salesOrder.statusValue === 'CANCL' ||
      this.salesOrder.statusValue === 'PENAP'
    ) {
      screenDisabled = true;
    } else {
      screenDisabled = false;
    }

    return screenDisabled;
  }

  hideBtnBasedonStatus() {
    let hideButton;
    if (
      this.salesOrder.statusValue === 'APROV' ||
      this.salesOrder.statusValue === 'CANCL'
    ) {
      hideButton = true;
    } else {
      hideButton = false;
    }
    return hideButton;
  }

  onSelectTab(val: any) {
    this.selectedTab = val;
  }


  addRow(index: any) {
    this.createNewSalesOrderItem(index);
  }

  doClear() {
    this.createNewSalesOrderDetail(this.appActVoucherConfigId, this.regionDetailValue);
  }

  getCustomerQuotationItemDetailByCustomerQuotaionIdForSalesOrder() {
    this.itemListCheck();
    if (this.purchaseQuotationId !== 0) {
      if (this.checkAlreadyExists(this.purchaseQuotationId)) {
        this.salesOrder.ientSalSalesQuotation.salSalesQuotationId =
          this.purchaseQuotationId;
        this.salesOrder.appActVoucherConfigId = this.appActVoucherConfigId;
        this.accountsService
          .getCustomerQuotationItemDetailByCustomerQuotaionIdForSalesOrder(
            this.salesOrder,
          )
          .subscribe((success) => {
            this.salesOrder = success;
            this.updateStatus();
            this.lstentPurPurchaseOrderItemQuantity = JSON.parse(
              JSON.stringify(success.ilstentSalSalesOrderItem)
            );
            this.salesOrder.ilstentSalSalesOrderItem =
              this.splicePipe.transform(
                success.ilstentSalSalesOrderItem,
                'ientInvItem'
              );
          });
      }
    } else {
      this.data.errorInfoMessage('Please Enter Purchase Order Ref No');
    }
  }

  getPurchaseQuotation(event: any) {
    console.log(event);
    this.salesOrder.salSalesOrderId = event.salSalesQuotationId;
  }

  itemListCheck() {
    this.splicePipe.transform(
      this.salesOrder.ilstentSalSalesOrderItem,
      'ientInvItem'
    );
  }

  checkAlreadyExists(val: any): boolean {
    for (const item of this.salesOrder.ilstentSalSalesOrderItem) {
      if (item.purchaseQuotationId !== 0 && item.purchaseQuotationId === val) {
        this.data.errorInfoMessage('Selected purchase order already exists');
        return false;
      }
    }
    return true;
  }

  getNotesValue(val: any) {
    this.salesOrder = val;
    this.updateStatus();
    this.hideBtnBasedonStatus();

    if (val.statusValue === 'APROV') {
      this.onSelectTab(3);
    }
  }

  navBack() {
    this.router.navigateByUrl('/home/sales/sales-order/search')
  }


}
