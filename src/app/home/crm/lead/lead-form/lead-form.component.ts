import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, ViewChild } from '@angular/core';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, InnerScroll, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { Router } from '@angular/router';
import { DataService } from '../../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { CoreService } from '../../../../app-core/service/core.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { entCustomerService, entLead } from '../../../../common/api-services/application-api/application-api.classes';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { AppDatePipe } from "../../../../common/pipes/app-date/app-date.pipe";

@Component({
  selector: 'app-lead-form',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lead-form.component.html',
  styleUrl: './lead-form.component.scss',
  imports: [InputControlComponent, SearchComponent, Row, FormsModule, IconButtonComponent, InnerScroll, ViewLabel, AppDatePipe, ErrorMessageComponent, AppAccessDirective, ButtonAccessDirective],

})
export class LeadFormComponent {
  pageId = 'CULED'
  options = {
    hideFullSpinner: true
  }
  customerLead = new entLead()
  customerLeadRaw = new entLead()
  customerService = new entCustomerService()
  serviceNoDDL: any = [];
  productSubTypeDDl = [];
  departmentDDL = []
  serviceId: any
  errorTrue = false
  @ViewChild('l') lform!: NgForm
  constructor(public router: Router,
    public data: DataService,
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public xData: any,
  ) {
    console.log(xData);
    this.customerLead = xData.customer;
    this.serviceId = xData.serviceId;
    this.departmentDDL = this.customerLead.iDepartmentDDL.value
    this.customerLeadRaw = JSON.parse(JSON.stringify(this.customerLead));
    this.serviceNoDDL = this.customerLead.ientDDL.value;
    // this.openCustomerServiceForServiceNo(this.customerLead.customerServiceId);
    this.initialData.getDDL('getInitialDataForLead', this.options);
    if (this.customerLead.productTypeValue !== '') {

      this.productSubTypeDDlList(this.customerLead.productTypeValue)
    }
    this.openCustomerServiceForServiceNo(xData.customer.customerServiceId)

  }
  saveLeadForm() {
    if (this.lform.valid) {
      this.customerLead.branchValue = this.customerService.branchValue
      this.apiService.saveLead(this.customerLead).subscribe((success) => {
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.dialogRef.close(success);
      });
    }
    else {
      this.errorTrue = true
    }
  }

  openCustomerServiceForServiceNo(id: any) {
    const obj = {
      data: id
    }
    this.apiService.openCustomerService(obj).subscribe((success) => {
      this.customerService = success
    })
  }
  clear() {
    this.errorTrue = false
    this.customerLead = JSON.parse(JSON.stringify(this.customerLeadRaw));

  }
  openLead() {
    const obj = {
      data: this.customerLead.leadId
    }
    this.apiService.openLead(obj).subscribe((success) => {
      this.customerLead = success
    })
  }
  productSubTypeDDlList(val: any) {
    const obj = {
      data: val
    }
    this.apiService.getProductSubTypeBasedonProductType(obj).subscribe((success) => {
      this.productSubTypeDDl = success.value
      if (success.value.length > 1) {
        // this.customerLead.productSubTypeValue = ''
      }

    })
  }
  getDepartmentDDL(val: any) {
    const obj = {
      data: val
    }
    this.apiService.getDepartmentBasedonProductType(val).subscribe((success) => {
      this.customerLead = success
    })
  }
}
