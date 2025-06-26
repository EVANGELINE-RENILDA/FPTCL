import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Inject, Output, ViewChild, viewChild } from '@angular/core';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, ViewLabel, InnerScroll } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { DropZoneComponent } from '../../../../app-core/template/drop-zone/drop-zone.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CoreService } from '../../../../app-core/service/core.service';
import { DataService } from '../../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { entEstateApplicationBeneficiary, entEstateCreditor } from '../../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-estate-info',
  standalone: true,
  imports: [Row, FormsModule, InputControlComponent, IconButtonComponent, ViewLabel, InnerScroll, DropZoneComponent, CheckboxComponent, AddressEditComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './estate-info.component.html',
  styleUrl: './estate-info.component.scss'
})
export class EstateInfoComponent {
  @ViewChild('vehicle') vehicleform!: NgForm;
  @ViewChild('share') shareform!: NgForm;
  @ViewChild('bank') bankform!: NgForm;
  @ViewChild('realEstate') realEstateform!: NgForm;
  @ViewChild('creditor') creditorform!: NgForm;
  @ViewChild('benificiary') benificiaryform!: NgForm
  estateApplicationBeneficiary = new entEstateApplicationBeneficiary();
  estateCreditor = new entEstateCreditor()
  @Output() estateDataChange = new EventEmitter<any>();
  type = '';
  estateData: any = []
  errorTrue = false
  constructor(public dialog: CoreService,
    public data: DataService,
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public xData: any) {

  }

  ngOnInit(): void {
    console.log(this.xData)
    this.type = this.xData.type
    this.estateData = this.xData.data
    console.log(this.estateData);
  }

  createEstateApplicationBeneficiary() {
    this.errorTrue = false;
    this.apiService.createEstateApplicationBeneficiary().subscribe((success) => {
      this.estateData = success;
      // this.editInfo('benificiary')

    })
  }
  createEstateCreditor() {
    this.errorTrue = false;
    this.apiService.createEstateCreditor().subscribe((success) => {
      this.estateData = success;
      // this.editInfo('creditor')
    })
  }
  createEstateApplicationRealestate() {
    this.errorTrue = false;
    this.apiService.createEstateApplicationRealestate().subscribe((success) => {
      this.estateData = success;
      // this.editInfo('creditor')
    })
  }
  createEstateApplicationFinanceDetails() {
    this.errorTrue = false;
    this.apiService.createEstateApplicationFinanceDetails().subscribe((success) => {
      this.estateData = success;
      // this.editInfo('creditor')
    })
  }
  createEstateApplicationInvestmentDetails() {
    this.apiService.createEstateApplicationInvestmentDetails().subscribe((success) => {
      this.estateData = success;
      // this.editInfo('creditor')
    })
  }
  createEstateApplicationVehicleDetails() {

    this.errorTrue = false;
    this.apiService.createEstateApplicationVehicleDetails().subscribe((success) => {
      this.estateData = success;
      // this.editInfo('creditor')
    })
  }
  saveEstateApplicationBeneficiary() {
    
    if (this.benificiaryform.valid) {
      this.apiService.saveEstateApplicationBeneficiary(this.estateData).subscribe((success) => {
        this.estateData = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.dialog.closeDialog();
        this.estateDataChange.emit(this.estateData);
        // this.dialogRef.close(success);
      })
    }
    else {
      this.errorTrue = true;
    }
  }

  saveEstateCreditor() {
    if (this.creditorform.valid) {
      this.apiService.saveEstateCreditor(this.estateData).subscribe((success) => {
        this.estateData = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.dialog.closeDialog();
        this.estateDataChange.emit(this.estateData);
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  saveEstateApplicationRealestate() {
    if (this.realEstateform.valid) {

      this.apiService.saveEstateApplicationRealestate(this.estateData).subscribe((success) => {
        this.estateData = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.dialog.closeDialog();
        this.estateDataChange.emit(this.estateData);
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  saveEstateApplicationFinanceDetails() {
    if (this.bankform.valid) {

      this.apiService.saveEstateApplicationFinanceDetails(this.estateData).subscribe((success) => {
        this.estateData = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.dialog.closeDialog();
        this.estateDataChange.emit(this.estateData);
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  saveEstateApplicationInvestmentDetails() {
    if (this.shareform.valid) {
      this.apiService.saveEstateApplicationInvestmentDetails(this.estateData).subscribe((success) => {
        this.estateData = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.dialog.closeDialog();
        this.estateDataChange.emit(this.estateData);
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  saveEstateApplicationVehicleDetails() {
    if (this.vehicleform.valid) {

      this.apiService.saveEstateApplicationVehicleDetails(this.estateData).subscribe((success) => {
        this.estateData = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.dialog.closeDialog();
        this.estateDataChange.emit(this.estateData);
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  clearBeneficiary() {
    this.createEstateApplicationBeneficiary();
    this.data.successMessage('Data Cleared Successfully');
  }
  clearCreditor() {
    this.createEstateCreditor();
    this.data.successMessage('Data Cleared Successfully');
  }
  clearRealEstate() {
    this.createEstateApplicationRealestate();
    this.data.successMessage('Data Cleared Successfully');
  }
  clearBank() {
    this.createEstateApplicationFinanceDetails();
    this.data.successMessage('Data Cleared Successfully');
  }
  clearShare() {
    this.createEstateApplicationInvestmentDetails();
    this.data.successMessage('Data Cleared Successfully');
  }
  clearVehicle() {
    this.createEstateApplicationVehicleDetails();
    this.data.successMessage('Data Cleared Successfully');
  }
}
