import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { entCustomerUpdate } from '../../../../common/api-services/application-api/application-api.classes';
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from '../../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { AppService } from '../../../../app.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CoreService } from '../../../../app-core/service/core.service';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { InnerScroll, Row } from '../../../../app-core/core-component/core-component.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';

@Component({
  selector: 'app-customer-update-form',
  standalone: true,
  imports: [InputControlComponent, Row, FormsModule, IconButtonComponent, InnerScroll, AddressEditComponent, ErrorMessageComponent, AppAccessDirective, ButtonAccessDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './customer-update-form.component.html',
  styleUrl: './customer-update-form.component.scss'
})
export class CustomerUpdateFormComponent {
  pageId = "CUSUP"
  options = {
    hideFullSpinner: true
  }
  customerDetails = new entCustomerUpdate();
  islandDDL: any = [];
  villageDDL: any = []
  customerDetailsRaw!: any;
  updateOldValue: any;
  @ViewChild('l') lForm!: NgForm;
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;
  currentDate = '';
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
  }

  async init() {
    await this.data.checkToken();
    this.errorTrue = false
    await this.initialData.getDDL('getInitialDataForCustomerUpdate', this.options);
    await this.loadProvinceDDL();
    if (this.customerDetails.iEmployerAddress.provinceId !== 0) {
      await this.getIslandFromProvince();
      await this.getVillageFromIsland();
    }
    this.currentDate = this.appService.getCurrentDate();
    console.log(this.currentDate);
    let ExistingData1: any = JSON.parse(this.customerDetails.oldValue);
    this.updateOldValue = ExistingData1;
    console.log(this.updateOldValue);
    console.log(this.updateOldValue.FirstName)

  }
  ProvinceDDL:any
  loadProvinceDDL(){
    this.apiService.loadAllMProvince().subscribe((success)=>{
      this.initialData.DDLValues.DDLProvince = success.value
    })
  }
  clear() {
    this.customerDetails = JSON.parse(JSON.stringify(this.customerDetailsRaw));
  }

  openCustomerForm() {
    this.errorTrue = false
    const obj = {
      data: this.customerDetails.customerUpdateId
    }
    this.apiService.openCustomerUpdate(obj).subscribe(async (success) => {
      this.customerDetails = success;
      await this.getIslandFromProvince();
      await this.getVillageFromIsland();

    })
  }
  saveCustomerForm() {
    if (this.lForm.valid) {
      this.apiService.saveCustomerUpdate(this.customerDetails).subscribe((success) => {
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.dialogRef.close(success);
      });
    }
    else {
      this.errorTrue = true
    }
  }

  getIslandFromProvince() {
    const obj = {
      data: this.customerDetails.iResidentialaddress.provinceId
    }
    this.apiService.getProvinceBasedOnInslandDDL(obj).subscribe((success) => {
      this.islandDDL = success.value
    })
  }

  getVillageFromIsland() {
    const obj = {
      data: this.customerDetails.iResidentialaddress.islandId
    }
    this.apiService.getIslandBasedOnVillageDDL(obj).subscribe((success) => {
      this.villageDDL = success.value
    })
  }
  triggerClick() {
    this.fileInput.nativeElement.click();
  }
  loadImageFromDevice(event: any) {
    const files = event.target.files;
    if (files[0].type !== 'image/png') {
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
          this.customerDetails.ientCustomerUpdatePhoto.fileContent = img;
        };
        reader.onerror = (error) => {
          this.data.internalServerError('Error has been occured,while selecting the file.');
        };
        this.fileInput.nativeElement.value = '';
      }
    } else {
      this.data.successMessage('For enhanced security, we request that you convert the file into jpeg/jpg format.')
    }
  }
}
