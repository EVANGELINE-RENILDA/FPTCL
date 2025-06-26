import { Component, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, Self, TemplateRef, ViewChild } from '@angular/core';
import { AutoCompleteComponent } from '../../../app-core/form-input/auto-complete/auto-complete.component';
import { FormInputControl } from '../../../app-core/form-input/form-input-control';
import { FormsModule, NgControl } from '@angular/forms';
import { entActVendor, vendorSearch } from '../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../common/api-services/accounts-api/accounts-api.service';
import { CoreService } from '../../../app-core/service/core.service';
import { VendorSearchComponent } from "../../purchase/voucher/vendor/vendor-search/vendor-search.component";
import { NgClass } from '@angular/common';
import { AutoCompleteLatestComponent } from '../../../app-core/form-input/auto-complete-latest/auto-complete-latest.component';

@Component({
  selector: 'app-search-vendor',
  standalone: true,
  imports: [AutoCompleteComponent, VendorSearchComponent, FormsModule, NgClass, AutoCompleteLatestComponent],
  templateUrl: './search-vendor.component.html',
  styleUrl: './search-vendor.component.scss'
})
export class SearchVendorComponent extends FormInputControl implements OnInit, OnDestroy{
  // @Input('displayText') displayText = "";
  @Input('getValue') getValue = "";
  @Input('module') module = '';
  @Input('screenType') screenType = '';
  @Input('navigateUrl') navigateUrl = '';
  @Input('screenType1') screenType1 = '';

  __displayText = "";
  @Input() set displayText(displayText: string) { this.__displayText = displayText || ""; }
  get displayText() { return this.__displayText; }

  vendorName = ''
  @Input() public statusValue: any = '';

  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;

  @ViewChild('autoComplete') autoComplete!: AutoCompleteLatestComponent;

  searchParams = new vendorSearch();
  valueSubscriber: any;

  constructor(@Self() @Optional() public control: NgControl,
    private api: AccountsApiService,
    public dialog: CoreService) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
    this.__valueType = 'int';
    this.valueSubscriber = this.viewValueChange().subscribe(async (xValue: any) => {
      if (xValue && this.value) {
        let obj = new entActVendor();
        obj.vendorName = this.__displayText;
        obj.actVendorId = this.value;
        this.autoComplete.setValue(obj);
      }
    });
  }

  ngOnInit() {
    this.setValidate(this.control);
  }

  ngOnDestroy(): void {
    if (this.valueSubscriber) {
      this.valueSubscriber.unsubscribe();
    }
  }


  getSearchData(event: any) {
    // if (event.length > 3) {
    const options = {
      hideErrorMethod: true,
      hideFullSpinner: true,
      type: 'accountsPath'
    }
    this.searchParams.vendorName = event;
    this.api.autoSearchForVendors(this.searchParams, options).subscribe((result: any) => {
      this.__items = result.lstentActVendor;
    })
    // }
  }

  valueSelected(event: any) {
    this.value = event.actVendorId;
    this.onSelect.emit(event);
  }

  autoClear() {
    let newItem = new entActVendor();
    this.value = newItem.actVendorId;
    // this.__displayText = "";
    this.doSelect(newItem);
  }

  doSelect(event: any) {
    this.onSelect.next(event);
  }

  async openSearch() {
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: '500px',
      width: '1100px',
      maxWidth: '1170px',
    });
  }

  getVendorData(val: any) {
    this.searchParams.actVendorId = val.actVendorId;
    this.dialog.closeDialog();
    this.autoComplete.setValue(val);
    this.value = val.actVendorId;
    this.onSelect.emit(val);
  }
}
