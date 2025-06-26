import { Component, Input, OnInit, Optional, Self, TemplateRef, ViewChild } from '@angular/core';
import { AutoCompleteComponent } from '../../../app-core/form-input/auto-complete/auto-complete.component';
import { FormInputControl } from '../../../app-core/form-input/form-input-control';
import { NgControl } from '@angular/forms';
import { AccountsApiService } from '../../../common/api-services/accounts-api/accounts-api.service';
import { entActCustomerSearch, entActCustomerDetails } from '../../../common/api-services/accounts-api/accounts-api.classes';
import { CustomerSearchComponent } from '../../sales/vouchers/customer/customer-search/customer-search.component';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../../../app-core/service/core.service';

@Component({
  selector: 'app-search-customer',
  standalone: true,
  imports: [AutoCompleteComponent, CustomerSearchComponent],
  templateUrl: './search-customer.component.html',
  styleUrl: './search-customer.component.scss'
})
export class SearchCustomerComponent extends FormInputControl implements OnInit {

  disableTextNow = false;
  netOutVoucher = false;

  // netOutVoucher receive voucher type request for backend only rendering netout voucher screen
  parentNetOutVoucherType = "";
  subNetOutVoucherType = "";
  isSearchNetOutVoucher = "";
  //

  @ViewChild('getCustomer')
  getCustomer!: TemplateRef<any>;

  @Input() public screenname: any = '';
  @Input() public breadcrumb: any = [];
  @Input() public searchPanelClass: any = '';
  @Input() public hideNewBtn = false;
  @Input() public hideStatus = false;
  @Input() public statusValue: any = '';
  @Input() public closeOverLay = true;

  @ViewChild('autoComplete') autoComplete!: AutoCompleteComponent;

  _getRegionValue = ''; 
  
  @Input()
  set regionValue(regionValue: string) {
    this._getRegionValue = regionValue || '';
  }
  get regionValue() {
    return this._getRegionValue;
  }

  @Input()
  set displayText(displayText: string) {
    this.searchText = displayText || "";
  }
  get displayText() {
    return this.searchText;
  }

  @Input()
  set isNetOutVoucher(netOutVoucher: boolean) {
    this.netOutVoucher = netOutVoucher || false;
  }
  get isNetOutVoucher() {
    return this.netOutVoucher;
  }

  @Input()
  set parentNetOutVoucher(parentNetOutVoucherType: string) {
    this.parentNetOutVoucherType = parentNetOutVoucherType || '';
  }
  get parentNetOutVoucher() {
    return this.parentNetOutVoucherType;
  }

  @Input()
  set subNetOutVoucher(subNetOutVoucherType: string) {
    this.subNetOutVoucherType = subNetOutVoucherType || '';
  }
  get subNetOutVoucher() {
    return this.subNetOutVoucherType;
  }

  @Input()
  set isSearchNetOut(isSearchNetOut: string) {
    this.isSearchNetOutVoucher = isSearchNetOut || "";
  }
  get isSearchNetOut() {
    return this.isSearchNetOutVoucher;
  }

  @Input()
  set disabled(disabled: boolean) {
    this.disableTextNow = disabled || false;
  }
  get disabled() {
    return this.disableTextNow;
  }

  searchParams = new entActCustomerSearch();
  loadingTrue = false;
  searchText = "";
  salesCustomer = new entActCustomerDetails();

  constructor(@Self() @Optional() public control: NgControl,
    private api: AccountsApiService,
    public dialog: CoreService,) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  ngOnInit() {
    this.setValidate(this.control);
  }

  getSearchData(event: any) {

    if (event.length > 0) {
      const options = {
        hideErrorMethod: true,
        hideFullSpinner: true,
        type: 'accountsPath'
      }

      this.searchParams.isNetoutVoucherSearch = this.isSearchNetOutVoucher;
      this.searchParams.voucherType = this.subNetOutVoucherType;
      this.searchParams.customerName = event;

      this.api.autoSearchForCustomers(this.searchParams, options).pipe(
      ).subscribe((result: any) => {
        this.items = result.lstentActCustomerDetails
      })
    }
  }

  valueSelected(event: any) {
    this.value = event.vendorId;
    this.onSelect.emit(event);
  }

  getCustomerName() {
    const dialogRef = this.dialog.openDialog(this.getCustomer, {
      width: '1200px',
      height: '80%',
      data: {
        regionSearch: this.regionValue,
      },
    });

  }

  getVendorData(val: any) {
    this.searchParams.customerid = val.customerid;
    this.dialog.closeDialog();
    // this.autoComplete.setValue(val);
    this.value = val.actVendorId;
    this.onSelect.emit(val);
  }

}
