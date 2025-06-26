import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Inject, Input, Output, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { CoreService } from '../../../../app-core/service/core.service';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { LoginComponent } from '../../../../start/login/login.component';
import { DropZoneComponent } from '../../../../app-core/template/drop-zone/drop-zone.component';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { DataService } from '../../../../common/services/data/data.service';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { KycEditComponent } from '../../../../app-core/template/kyc-edit/kyc-edit.component';
import { SocialPlatformEditComponent } from '../../../../app-core/template/social-platform-edit/social-platform-edit.component';
import { entTrustApplicant, entTrustApplication, entTrustApplicationClient, entWillApplicationApplicant, entWillApplicationChildren, entWillApplicationRealestateDetails, entWillApplicationSpouse, entWillApplicationTestator } from '../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { AppDatePipe } from "../../../../common/pipes/app-date/app-date.pipe";

@Component({
  selector: 'app-applicant-edit',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './applicant-edit.component.html',
  styleUrl: './applicant-edit.component.scss',
  imports: [Row, FormsModule, InputControlComponent, IconButtonComponent, ViewLabel, InnerScroll, DropZoneComponent, AddressEditComponent, KycEditComponent, SocialPlatformEditComponent, AppDatePipe]
})
export class ApplicantEditComponent {

  name = '';
  willId = 0;
  subId: any = '';
  @Input() item: any;
  willApplicant: any = new entWillApplicationApplicant();
  willApplicantRAW = new entWillApplicationApplicant();
  willSpouse: any = new entWillApplicationSpouse();
  willSpouseRAW = new entWillApplicationSpouse();
  willChildren: any = new entWillApplicationChildren();
  willChildrenRAW = new entWillApplicationChildren();
  willTestator: any = new entWillApplicationTestator();
  willTestatorRAW = new entWillApplicationTestator();
  willRealEstate = new entWillApplicationRealestateDetails()
  @ViewChild('a') aForm!: NgForm;
  @ViewChild('b') bForm!: NgForm;
  @ViewChild('d') dForm!: NgForm;
  @ViewChild('c') cForm!: NgForm;
  fileTypePattern = /(\.xlx|\.xlsx|\.DOC|\.pdf|\.PDF)$/i;
  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword';
  uploadError = "File size exceeds the limit of 10mb and will not be uploaded";
  uploadLimit = 10;
  options = {
    hideFullSpinner: true
  }
  editData = false;
  errorTrue = false;
  currentDate = '';
  willApplication = new entTrustApplicationClient();

  @Output() application = new EventEmitter<any>();


  constructor(
    public dialog: CoreService,
    public dialogRef: DialogRef<string>,
    public initialData: InitialDataService,
    public data: DataService,
    public apiService: ApplicationApiService,
    @Inject(DIALOG_DATA) public xData: any
  ) {
    console.log(xData);
  }

  ngOnInit(): void {

    this.name = this.xData.type;
    this.subId = this.xData.subId
    this.willId = this.xData.willId
    console.log(this.xData);
    if (this.name === 'applicant') {
      this.willApplicant = this.subId
    }
    if (this.name === 'spouse') {
      this.willSpouse = this.subId
      if (this.subId === 0) {
        this.willSpouse = new entWillApplicationSpouse()
        this.createSpouse()
      }
      else {
        this.editData = false
        console.log(this.editData);

        this.openSpouse()
      }

    }


    this.init()
  }
  init() {
    if (this.willApplicant.appWillApplicationApplicantId === 0) {
      this.editData = true

    }
    // if (this.name === 'spouse') {

    //   if (this.subId !== 0) {
    //     this.editData = false
    //     this.openSpouse();
    //   }
    //   if (this.subId === 0) {
    //     this.editData = true
    //     this.createSpouse();
    //   }
    // }
    // if (this.name === 'children') {

    //   if (this.subId === 0) {
    //     this.editData = true;
    //     this.createChildren()
    //   }
    //   if (this.subId !== 0) {
    //     this.editData = false;
    //     this.openChildren()
    //   }
    // }
  }

  uploadDeliveryAttachment(event: any) {

  }
  editValues() {
    this.editData = true
  }
  saveValue() {

    this.editData = false
  }
  openCustomer(val: any, type: any) {
    const obj = {
      data: val
    }
    this.apiService.openCustomer(obj).subscribe((success) => {
      if (this.name === 'applicant') {
        this.willApplicant.ientCustomer = success;
      }
      if (this.name === 'spouse') {
        this.willSpouse.ientCustomer = success;
      }
      if (this.name === 'children') {
        this.willChildren.ientCustomer = success;
      }
      this.errorTrue = false
    })
  }

  //applicant
  saveApplicant() {

    if (this.aForm.valid) {
      this.willApplicant.appWillApplicationId = this.willId
      this.apiService.saveWillApplicationApplicant(this.willApplicant).subscribe((success) => {
        this.willApplicant = success;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        this.dialogRef.close(this.willApplicant);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  clearApplicant() {
    this.willApplicant = JSON.parse(JSON.stringify(this.willApplicantRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.errorTrue = false
  }
  refreshApplicant() {
    const obj = {
      data: this.willApplicant.appWillApplicationApplicantId
    }
    this.apiService.openWillApplicationApplicant(obj).subscribe((success) => {
      this.willApplicant = success;
      this.data.successMessage('Data Refreshed Successfully');
      this.errorTrue = false
    })
  }


  //spouse
  createSpouse() {
    this.apiService.createWillApplictionSpouse().subscribe((success) => {
      this.willSpouse = success
    })
  }
  openSpouse() {
    debugger
    this.editData = false
    const obj = {
      data: this.subId.willApplicationSpouseId
    }
    this.apiService.openWillApplictionSpouse(obj).subscribe((success) => {
      this.willSpouse = success;
      this.data.successMessage('Data Opened Successfully')
    })
  }
  saveSpouse() {
    if (this.bForm.valid) {
      this.willSpouse.willApplicationId = this.willId
      this.apiService.saveWillApplicationSpouse(this.willSpouse).subscribe((success) => {
        this.willSpouse = success;
        this.application.emit(this.willSpouse)
        this.dialogRef.close();
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  clearSpouse() {
    this.willSpouse = JSON.parse(JSON.stringify(this.willSpouseRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.errorTrue = false
  }
  refreshSpouse() {
    const obj = {
      data: this.willSpouse.willApplicationSpouseId
    }
    this.apiService.openWillApplictionSpouse(obj).subscribe((success) => {
      this.willSpouse = success;
      this.data.successMessage('Data Refreshed Successfully');
      this.errorTrue = false
    })
  }
  //children
  saveChildren() {
    if (this.cForm.valid) {
      this.willChildren.willApplicationId = this.willId
      this.apiService.saveWillApplicationChildren(this.willChildren).subscribe((success) => {
        this.willChildren = success;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        this.dialogRef.close(this.willChildren);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  clearChildren() {
    this.willChildren = JSON.parse(JSON.stringify(this.willChildrenRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.errorTrue = false
  }
  refreshChildren() {
    const obj = {
      data: this.willChildren.willApplicationSpouseId
    }
    this.apiService.openWillApplicationChildren(obj).subscribe((success) => {
      this.willChildren = success;
      this.data.successMessage('Data Refreshed Successfully');
      this.errorTrue = false
    })
  }
  openChildren() {
    const obj = {
      data: this.subId
    }
    this.apiService.openWillApplicationChildren(obj).subscribe((success) => {
      this.willChildren = success;
      this.data.successMessage('Data Opened Successfully');
      this.errorTrue = false
    })
  }
  createChildren() {
    this.apiService.createWillApplicationChildren().subscribe((success) => {
      this.willChildren = success
    })
  }
  //applicant
  saveTestator() {
    if (this.dForm.valid) {
      this.willTestator.appWillApplicationId = this.willId
      this.apiService.saveWillApplicationTestator(this.willTestator).subscribe((success) => {
        this.willTestator = success;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        this.dialogRef.close(this.willTestator);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  clearTestator() {
    this.willTestator = JSON.parse(JSON.stringify(this.willTestatorRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.errorTrue = false
  }
  refreshTestator() {
    const obj = {
      data: this.willTestator.appWillApplicationTestatorId
    }
    this.apiService.openWillApplicationTestator(obj).subscribe((success) => {
      this.willTestator = success;
      this.data.successMessage('Data Refreshed Successfully');
      this.errorTrue = false
    })
  }


}
