import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormInputControl } from '../../../app-core/form-input/form-input-control';
import { entInputAutoCompVoucher } from '../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../common/api-services/accounts-api/accounts-api.service';
import { AutoCompleteComponent } from '../../../app-core/form-input/auto-complete/auto-complete.component';

@Component({
  selector: 'app-auto-get-item',
  standalone: true,
  imports: [AutoCompleteComponent],
  templateUrl: './auto-get-item.component.html',
  styleUrl: './auto-get-item.component.scss'
})
export class AutoGetItemComponent extends FormInputControl implements OnInit {

  searchParams = new entInputAutoCompVoucher();

  __displayText = "";
  @Input() set displayText(displayText: string) { this.__displayText = displayText || ""; }
  get displayText() { return this.__displayText; }

  _voucherConfigId = 0;
  @Input() set voucherConfigId(voucherConfigId: number) { this._voucherConfigId = voucherConfigId || 0; }
  get voucherConfigId() { return this._voucherConfigId; }

  _voucherType = "";
  @Input() set voucherType(voucherType: string) { this._voucherType = voucherType || ""; }
  get voucherType() { return this._voucherType; }

  _getRegionValue = "";
  @Input() set regionValue(regionValue: string) { this._getRegionValue = regionValue || ""; }
  get regionValue() { return this._getRegionValue; }

  _documentDate = "";
  @Input() set documentDate(documentDate: string) { this._documentDate = documentDate || ""; }
  get documentDate() { return this._documentDate; }

  _partyId = 0;
  @Input() set partyId(partyId: number) { this._partyId = partyId || 0; }
  get partyId() { return this._partyId; }

  constructor(@Self() @Optional() public control: NgControl, private api: AccountsApiService) {
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
      this.searchParams.voucherConfigId = this._voucherConfigId;
      this.searchParams.voucherType = this._voucherType;
      this.searchParams.documentDate = this._documentDate;
      this.searchParams.partyId = this._partyId;
      this.searchParams.refNo = event.toString();
      this.searchParams.regionValue = this._getRegionValue;
      this.api.autoCompleteForAllVouchers(this.searchParams, options).subscribe((result: any) => {
        this.__items = result.value;
        this.searchParams = new entInputAutoCompVoucher();
        // this.autoClear();
      });
    };
  }

  valueSelected(event: any) {
    this.value = event.vendorId;
    this.onSelect.emit(event);

  }
}
