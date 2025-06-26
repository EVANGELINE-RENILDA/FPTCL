import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entActAddress, entActCustomerDetails } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { ErrorMessageComponent } from '../../../../../app-core/message/error-message/error-message.component';
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass } from '@angular/common';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { Row } from '../../../../../app-core/core-component/core-component.component';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';

@Component({
  selector: 'app-customer-detail-address',
  standalone: true,
  imports: [IconButtonComponent,AppTableComponent,AppDatePipe,ErrorMessageComponent,NgClass,InputControlComponent,Row,FormsModule,CellDefDirective,CellHeaderDefDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './customer-detail-address.component.html',
  styleUrl: './customer-detail-address.component.scss'
})
export class CustomerDetailAddressComponent {
  @Input() parentData = new entActCustomerDetails();
  @Output() attachmentData = new EventEmitter();
  @ViewChild('a') aform!: NgForm
  @ViewChild('addressDialog') addressDialog!: TemplateRef<any>;
  customer=new entActCustomerDetails()
  newAddressEdit = false;
  errorTrue=false;
  customerAddress = new entActAddress();
  @Output() notesValue = new EventEmitter();
  addressColumn: any = ['address', 'type', 'dateTime', 'status', 'add'];
  addressColumnName: any = ['Address', 'Type', 'Created Date', 'Status', 'Action'];
  tableAddressData: any = [
    // { 'sno': 1, 'address': 'line 1, line 2 line 3 Chennai, India', 'createdBy': '	HeadOffice', 'dateTime': '03 May 2024', 'status': 'Active' }
  ];
  constructor(
    public accountsService: AccountsApiService,
    public dialog: CoreService,
    public data: DataService,
    public initialData: InitialDataService,
  ){
  }


  async createNewAddress(val: any) {
    if (val === 0) {
      this.newAddressEdit = true;
      this.createNewCustomerAddress()
    }
    else {
      this.newAddressEdit = false;
      this.openAddress(val);
    }
    let dialogResponse: any = await this.dialog.openDialog(this.addressDialog, {
      disableClose: true,
      height: '400px',
      width: '80%',
      maxWidth: '1170px',
    })

  }
  createNewCustomerAddress() {
    this.errorTrue = false;
    this.accountsService.createNewAddress().subscribe((success) => {
      this.customerAddress = success;
    })
  }
  openAddress(val: any,type?: any) {
    const obj = {
      data: val
    }
    this.errorTrue = false;
    this.accountsService.openCustomerAddress(obj).subscribe((success) => {
      this.customerAddress = success;

    })
    if (type != 'refresh') { }
    else {
      this.data.successMessage('Data Refreshed Successfully')
    }
  }
  saveSalesCustomerAddress() {
    if (this.aform.valid) {
      this.customerAddress.referenceId = this.customer.actCustomerId;
      this.accountsService.saveCustomerAddress(this.customerAddress).subscribe((success) => {

        // this.parentData=success;
        // this.parentData.lstAddress = success.plstentActAddress;
        this.parentData.lstAddress = success.plstentActAddress
        this.data.successMessage(success?.msg?.infoMessage?.msgDescription);
        // this.openVendor()
        this.attachmentData.emit(this.parentData);
        this.dialog.closeDialog();
      })
    }
    else {
      this.errorTrue = true;
    }

  }
  clearSalesCustomerAddress(){
    this.createNewCustomerAddress();
    // this.dialogClose()
    this.data.successMessage('Data Refreshed Successfully')
  }
}
