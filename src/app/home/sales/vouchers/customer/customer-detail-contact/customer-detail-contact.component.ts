import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { Row } from '../../../../../app-core/core-component/core-component.component';
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from '../../../../../common/services/data/data.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entActCustomerDetails, entCustomerContact } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';

@Component({
  selector: 'app-customer-detail-contact',
  standalone: true,
  imports: [AppTableComponent,IconButtonComponent,AppDatePipe,Row,FormsModule,InputControlComponent,CellHeaderDefDirective,CellDefDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './customer-detail-contact.component.html',
  styleUrl: './customer-detail-contact.component.scss'
})
export class CustomerDetailContactComponent {
  customerContact = new entCustomerContact();
  @ViewChild('c') cform!: NgForm;
  customer=new entActCustomerDetails();
  @ViewChild('contactDialog') contactDialog!: TemplateRef<any>;
  @Input() parentData = new entActCustomerDetails();
  @Output() attachmentData = new EventEmitter();
  contactColumn: any = [ 'ContactName', 'contactNo', 'email', 'beginDate', 'status', 'add'];
  contactColumnName: any = ['Contact Name', 'Contact Number', 'Email ID', 'Effective Date', 'Status', 'Action'];
  tableContactData: any = [];
  errorTrue=false;
  newContactEdit= false;
  constructor(
    public data: DataService,
    public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
  ){

  }
  async createNewContact(val: any) {
    if (val === 0) {
      this.newContactEdit = true
      this.createNewSalesCustomerContact()
    }
    else {
      this.newContactEdit = false
      this.openSalesCustomerContact(val)
    }
    let dialogResponse: any = await this.dialog.openDialog(this.contactDialog, {
      disableClose: true,
      height: '400px',
      width: '80%',
      maxWidth: '1170px',
    })
  }
  createNewSalesCustomerContact() {
    this.errorTrue = false;
    this.accountsService
      .createNewCustomerContact()
      .subscribe((success) => {
        this.customerContact = success;
        // this.initialLoad = false;
      });
  }
  saveCustomerContact() {
    if (this.cform.valid) {
      this.customerContact.actcustomercontactId = this.customer.actCustomerId;
      this.accountsService.saveCustomerContactDetails(this.customerContact).subscribe((success) => {
        // this.tableContactData = success.plstentCustomerContact;?
        this.parentData.lstCustomerContact=success.plstentCustomerContact;
        this.attachmentData.emit(this.parentData);

        this.data.successMessage(success?.msg?.infoMessage?.msgDescription);
        this.dialog.closeDialog();;
      })
    }
    else {
      this.errorTrue = true;
    }
  }

  openSalesCustomerContact(val: any,type?:any) {
    const obj = {
      data: val
    }
    this.errorTrue = false;
    this.accountsService.openCustomerContact(obj).subscribe((success) => {
      this.customerContact = success;
    })
    if (type != 'refresh') { }
    else {
      this.data.successMessage('Data Refreshed Successfully')
    }
  }
  clearSalesCustomerContact(){
    this.createNewSalesCustomerContact();
    // this.dialogClose()
    this.data.successMessage('Data Refreshed Successfully')
  }
}
