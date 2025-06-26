import { Component, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { AutoCompleteLatestComponent } from '../../../app-core/form-input/auto-complete-latest/auto-complete-latest.component';
import { FormInputControl } from '../../../app-core/form-input/form-input-control';
import { NgControl } from '@angular/forms';
import { CoreService } from '../../../app-core/service/core.service';
import { CustomerListComponent } from '../../crm/customer/customer-list/customer-list.component';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { DirectivesModule } from '../../../app-core/directives/directives.module';
import { entActCustomerDetails, entActCustomerSearch } from '../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';

@Component({
  selector: 'auto-search-customer',
  standalone: true,
  imports: [AutoCompleteLatestComponent, CustomerListComponent, IconButtonComponent, DirectivesModule],
  templateUrl: './auto-search-customer.component.html',
  styleUrl: './auto-search-customer.component.scss'
})
export class AutoSearchCustomerComponent extends FormInputControl implements OnInit, OnDestroy {
  @Input() isCRMCustomer = false;
  valueSubscriber: any;
  customerDetails = new entActCustomerDetails();
  @ViewChild('customerSearchTemplate') customerSearchTemplate!: any;
  @ViewChild('autoComplete') autoComplete!: AutoCompleteLatestComponent;

  __displayText = "";
  @Input() set displayText(displayText: string) { this.__displayText = displayText || ""; }
  get displayText() { return this.__displayText; }

  constructor(@Self() @Optional() public control: NgControl,
    private api: ApplicationApiService,
    public dialog: CoreService) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
    this.__valueType = 'int';
    this.valueSubscriber = this.viewValueChange().subscribe(async (xValue: any) => {
      if (xValue && this.value) {
        let obj = new entActCustomerDetails();
        obj.customerName = this.__displayText;
        obj.actCustomerId = this.value;
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


  async openSearch() {
    let dialogRef: any = await this.dialog.openDialog(this.customerSearchTemplate, {
      disableClose: true,
      height: '95%',
      width: '95%',
      maxWidth: '1280px',
    }, 'customerAutoSearch');
  }

  doClose() {
    this.dialog.closeDialog('customerAutoSearch');
  }

  autoClear() { 

  }

  valueSelected(event: any) {
    this.customerDetails.actCustomerId = event.actCustomerId;
    this.customerDetails.customerName = event.customerName;
    this.value = this.customerDetails.actCustomerId;
    this.onSelect.emit(event);
  }

  getSearchData(event: any) {
    const options = {
      hideErrorMethod: true,
      hideFullSpinner: true,
      type: 'applicationPath'
    }
    let obj = new entActCustomerSearch();
    obj.customerName = event;
    this.api.customerAutoSearchForAccounts(obj, options).subscribe((response: any) => {
      this.__items = response.lstentActCustomerDetails;
    })
  }

  crmCustomerSelected(event: any) {
    this.customerDetails.actCustomerId = event.customerId;
    this.customerDetails.customerName = event.customerName;
    this.autoComplete.setValue(this.customerDetails);
    this.value = this.customerDetails.actCustomerId;
    this.onSelect.emit(event);
    this.doClose();
  }

}
