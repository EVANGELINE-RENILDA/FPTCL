import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { FormInputControl } from '../../../app-core/form-input/form-input-control';
import { NgControl } from '@angular/forms';
import { entPurQuotationSearch } from '../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../common/api-services/accounts-api/accounts-api.service';
import { AutoCompleteComponent } from '../../../app-core/form-input/auto-complete/auto-complete.component';

@Component({
  selector: 'app-auto-search-quotation',
  standalone: true,
  imports: [AutoCompleteComponent],
  templateUrl: './auto-search-quotation.component.html',
  styleUrl: './auto-search-quotation.component.scss'
})
export class AutoSearchQuotationComponent extends FormInputControl implements OnInit{

  @Input('displayText') displayText = "";
  @Input('parentData') parentData:any = '';

  searchParams = new entPurQuotationSearch();

  constructor(@Self() @Optional() public control: NgControl, private api: AccountsApiService) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  ngOnInit() {
    this.setValidate(this.control);
  }


  getSearchData(event: any) {
    // if (event.length > 3) {
      const options = {
        hideErrorMethod: true,
        hideFullSpinner: true,
        type: 'accountsPath'
      }
      this.searchParams.lngActVendorId =
      this.parentData.sentActVendor.actVendorId;
    this.searchParams.documentDateTo = this.parentData.documentDate;
    this.searchParams.inputVoucherConfigId = this.parentData.voucherConfigId;
    // this.searchParams.strPurchaseQuotationRefNo = this.searchText.toString();
      this.api.autoCompletePQReferenceNo(this.searchParams, options).subscribe((result: any) => {
        this.items = result.lstentPurQuotation;
      })
    // }
  }

  valueSelected(event: any) {
    console.log(event);
    
    // this.value = event.;
    this.onSelect.emit(event);
  }

}
