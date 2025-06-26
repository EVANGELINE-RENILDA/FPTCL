import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { InnerScroll, Row } from '../../../../app-core/core-component/core-component.component';
import { DataService } from '../../../../common/services/data/data.service';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { CoreService } from '../../../../app-core/service/core.service';
import { entAddress, entCustomer } from '../../../../common/api-services/application-api/application-api.classes';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { AppService } from '../../../../app.service';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import {  MatRadioModule } from '@angular/material/radio';

@Component({

  selector: 'app-customer-form',
  standalone: true,
  imports: [InputControlComponent, Row, FormsModule, IconButtonComponent, InnerScroll, AddressEditComponent, ErrorMessageComponent, AppAccessDirective, ButtonAccessDirective, CheckboxComponent, MatRadioModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent {

  pageId = 'CUSTR';
  options = {
    hideFullSpinner: true
  }
  customerDetails = new entCustomer();
  islandDDL: any = [];
  villageDDL: any = []
  customerDetailsRaw!: any;
  @ViewChild('l') lForm!: NgForm;
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;
  currentDate = '';
  provinceVal = 0;
  imageGallery = {
    iImage: {},
  };
  errorTrue = false
  constructor(
    public data: DataService,
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public appService: AppService,
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public xData: any,
  ) {
    console.log(xData);
    this.customerDetails = xData.customer;

    this.customerDetailsRaw = JSON.parse(JSON.stringify(this.customerDetails));
  }
  ngOnInit(): void {
    this.init();
    this.errorTrue = false
  }

  async init() {
    this.provinceVal = this.customerDetails.iEmployerAddress.provinceId;
    this.initialData.getDDL('getInitialDataForCustomer', this.options);
    // this.initialData.getAllInitialDataForCustomer(this.options);
    await this.loadProvinceDDL();


    this.currentDate = this.appService.getCurrentDate();
    console.log(this.currentDate);

  }
  ProvinceDDL:any
  loadProvinceDDL(){
    this.apiService.loadAllMProvince().subscribe((success)=>{
      this.initialData.DDLValues.DDLProvince = success.value
    })
  }

  clear() {
    this.customerDetails = JSON.parse(JSON.stringify(this.customerDetailsRaw));
    this.errorTrue = false
    this.data.successMessage('Data Cleared SuccessFully');
  }

  openCustomerForm() {

    this.errorTrue = false

    const obj = {
      data: this.customerDetails.customerId
    }
    this.apiService.openCustomer(obj).subscribe(async (success) => {
      this.customerDetails = success;

    })
  }
  saveCustomerForm() {

    if (this.lForm.valid) {
      this.apiService.saveCustomer(this.customerDetails).subscribe((success) => {
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.dialogRef.close(success);
      });
    }
    else {
      this.errorTrue = true
    }
  }

  triggerClick() {
    this.fileInput.nativeElement.click();
  }
  loadImageFromDevice(event: any) {
    const files = event.target.files;
    // if (files[0].type !== 'image/png') {
    if (files.length > 0) {
      this.imageGallery.iImage = {
        content: '',
        relativePath: '',
        fileSizeKb: 0,
        fileTypeId: 0,
        fileTypeValue: '',
        idoObjState: '',
        imageId: 0,
        updateSeq: '',
        fileName: '',
      };
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        const img: any = reader.result;
        this.customerDetails.ientCustomerPhoto.fileContent = img;
      };
      reader.onerror = (error) => {
        this.data.internalServerError('Error has been occured,while selecting the file.');
      };
      this.fileInput.nativeElement.value = '';
    }
    // } else {
    //   this.data.successMessage('For enhanced security, we request that you convert the file into jpeg/jpg format.')
    // }
  }

isStudent:any

employeeChange(event:any){
this.customerDetails.studentId = '';
this.customerDetails.schoolName = '';
this.customerDetails.employerName = '';
this.customerDetails.netSalary = '';
this.customerDetails.occupation = '';
this.customerDetails.iEmployerAddress = new entAddress();


}


}
