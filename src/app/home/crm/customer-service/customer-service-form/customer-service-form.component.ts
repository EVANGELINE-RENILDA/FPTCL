import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, InnerScroll, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { entCustomer, entCustomerSearch, entCustomerService } from '../../../../common/api-services/application-api/application-api.classes';
import { Router } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { CustomerListComponent } from '../../customer/customer-list/customer-list.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';

@Component({
  selector: 'app-customer-service-form',
  standalone: true,
  imports: [InputControlComponent, SearchComponent, Row, FormsModule, IconButtonComponent, InnerScroll, ViewLabel, AppDatePipe, ErrorMessageComponent, AppAccessDirective, ButtonAccessDirective, MatTooltipModule, AppTableComponent, CellDefDirective, CellHeaderDefDirective, CustomerListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './customer-service-form.component.html',
  styleUrl: './customer-service-form.component.scss'
})
export class CustomerServiceFormComponent {
  pageId = 'CUSEV'
  customerService = new entCustomerService();
  customerServiceRaw = new entCustomerService();
  serviceId = 0;
  options = {
    hideFullSpinner: true
  }
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  columns: any = ["customerRefNo", "customerName", "genderDescription", "dateOfBrith", "emailId", "contactNo", "statusdescription", "action"];
  columnsName: any = ["Customer No", "Customer Name", "Gender", "Date Of Birth", "Email ID", "Contact Number", "Status", ""];
  tableData: any = [];
  searchParams = new entCustomerSearch()
  errorTrue = false
  branchDDL: any = [];
  @ViewChild('customerSearchDialog', { static: false })
  customerSearchDialog!: ElementRef;
  @ViewChild('l') lform!: NgForm
  constructor(public router: Router,
    public data: DataService,
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public searchDialog: CoreService,
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public xData: any,
  ) {
    console.log(xData);
    this.customerService = xData.customer;
    this.serviceId = xData.customerServiceId;
    this.branchDDL = this.customerService.ibranchddl.value

    console.log(this.branchDDL);
    this.initialData.getDDL('getInitialDataForCustomer', this.options);
    this.customerServiceRaw = JSON.parse(JSON.stringify(this.customerService));
  }
  clear() {
    this.errorTrue = false
    this.customerService = JSON.parse(JSON.stringify(this.customerServiceRaw));
    this.createCustomerService(this.customerService.customerId)
  }
  createCustomerService(event: any) {

    this.errorTrue = false
    const obj = {
      data: event
    }

    this.apiService.createCustomerService(obj).subscribe((success) => {
      this.customerService = success
    })
  }
  openCustomerForm() {
    const obj = {
      data: this.customerService.customerServiceId
    }
    this.apiService.openCustomerService(obj).subscribe((success) => {
      this.customerService = success
    })
  }
  saveCustomerForm() {
    if (this.lform.valid) {
      this.apiService.saveCustomerService(this.customerService).subscribe((success) => {
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.dialogRef.close(success);
      });
    }
    else {
      this.errorTrue = true
    }
  }
  createCustomerSearch() {
    this.apiService.createNewCustomerSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchCustomer();
    })
  }
  searchCustomer() {
    this.apiService.searchCustomer(this.searchParams).subscribe((success) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.result;


    })
  }


  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchCustomer();

  }

  async searchCustomerData() {
    this.createCustomerSearch()
    let dialogResponse: any = await this.dialog.openDialog(this.customerSearchDialog, {
      height: '500px',
      width: '1100px',
      maxWidth: '1170px',

    });
  }
  getRefNo(val: any) {
    this.createCustomerService(val);
    this.searchDialog.closeDialog()

  }
  onSearch() {
    this.data.successMessage('Search Executed Successfully');



  }
}
