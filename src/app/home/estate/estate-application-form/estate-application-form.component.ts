import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { Row, InnerScroll, ViewLabel } from '../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
import { CoreService } from '../../../app-core/service/core.service';
import { DataService } from '../../../common/services/data/data.service';
import { entEstateApplication, entTrustApplication } from '../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';

@Component({
  selector: 'app-estate-application-form',
  standalone: true,
  imports: [IconButtonComponent, Row, InnerScroll, FormsModule, InputControlComponent, MatSlideToggle, AppDatePipe, ViewLabel],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './estate-application-form.component.html',
  styleUrl: './estate-application-form.component.scss'
})
export class EstateApplicationFormComponent {
  trustDetails = new entEstateApplication();
  toggleState = ''
  toggleCheck = 'Y';
  errorTrue = false
  @ViewChild('l') lForm!: NgForm;

  options = {
    hideFullSpinner: true
  }
  constructor(public dialog: CoreService,
    public data: DataService,
    public initialData: InitialDataService, public apiService: ApplicationApiService
  ) {

  }
  ngOnInit() {
    this.init()
  }

  async init() {
    // this.initialData.getDDL('getInitialDataForTrustApplication', this.options);
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

  }
  openTrustForm() {

  }

  clear() {

  }
  getTrustApplicationBasedOnTrustType(val: any) {

    this.apiService.getApplicationStatgeByTrustType(val).subscribe((success) => {
      this.trustDetails = success
    })
  }

}
