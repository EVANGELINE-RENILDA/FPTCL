import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, ViewChild } from '@angular/core';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { entTrustApplication } from '../../../../common/api-services/application-api/application-api.classes';
import { CoreService } from '../../../../app-core/service/core.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { AppDatePipe } from "../../../../common/pipes/app-date/app-date.pipe";

@Component({
  selector: 'app-trust-application-form',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trust-application-form.component.html',
  styleUrl: './trust-application-form.component.scss',
  imports: [IconButtonComponent, Row, InnerScroll, FormsModule, InputControlComponent, MatSlideToggle, ViewLabel, AppDatePipe]
})
export class TrustApplicationFormComponent {
  trustDetails = new entTrustApplication();
  trustDetailsNew = new entTrustApplication();
  trustDetailsRAW = new entTrustApplication();
  toggleState = ''
  toggleCheck = 'Y';
  errorTrue = false;
  @ViewChild('l') lForm!: NgForm;
  options = {
    hideFullSpinner: true
  }
  constructor(public dialog: CoreService,
    public data: DataService,
    public dialogRef: DialogRef<string>,
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    @Inject(DIALOG_DATA) public xData: any,
  ) {
    console.log(xData);
    this.trustDetails = xData.trustApplication
    this.trustDetailsNew = xData.trustApplication

  }
  ngOnInit() {
    this.init()
  }

  async init() {
    this.initialData.getDDL('getInitialDataForTrustApplication', this.options);
    if (this.toggleCheck = 'Y') {
      this.toggleState = 'Yes'
    }
    else {
      this.toggleState = 'No'
    }
  }

  nominationToggle(event: any) {
    event ? this.toggleState = 'Yes' : this.toggleState = 'No'

  }

  saveTrustForm() {
    if (this.lForm.valid) {

      this.apiService.saveTrustApplication(this.trustDetails).subscribe((success) => {

        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.dialogRef.close(success);
      });
    }

    else {
      this.errorTrue = true
    }
  }
  openTrustForm() {

  }

  clear() {
    debugger
    this.trustDetails = JSON.parse(JSON.stringify(this.trustDetailsRAW));
    this.trustDetails = this.trustDetailsNew;
    this.data.successMessage('Data CLeared Successfully')
  }
  getTrustApplicationBasedOnTrustType(val: any) {

    this.apiService.getApplicationStatgeByTrustType(val).subscribe((success) => {
      this.trustDetails = success
    })
  }

}
