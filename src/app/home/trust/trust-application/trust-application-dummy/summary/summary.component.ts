import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { entTrustApplication, entTrustApplicationAssignedOfficer } from '../../../../../common/api-services/application-api/application-api.classes';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [IconButtonComponent, ViewLabel, Row, InputControlComponent, AppDatePipe, AccordionModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {
  summaryEdit = false
  // trustAccount:any 
  @Input() application: any = new entTrustApplication();
  @Output() applicationChange = new EventEmitter<any>();
  trustApplicationAssignedOfficer = new entTrustApplicationAssignedOfficer();
  constructor(public apiService: ApplicationApiService){}
  ngOnInit(): void {
    this.init()
  }
  trustAccNo = '';
  beneName = '';
  async init() {

    this.application.lstentFptclAccountNo.forEach((element: any) => {
      this.trustAccNo = this.trustAccNo + element.accountNo + ' , ';
      this.beneName = this.beneName + element.customerName + ' , ';


    });
    console.log(this.trustAccNo + 'wqeqw');

  }



  //Summary
  saveSummary() {
    this.summaryEdit = false
  }

  editSummaryDetails() {
    this.summaryEdit = true
  }
  generatedStatementForTrustApplication() {
    debugger
    const obj = {
      data: this.application.trustApplicationId
    }

    const options = {
      responseType: 'blob',
    };

    this.apiService.generatedStatementForTrustApplication(obj, options)
      .subscribe((success: any) => {
        const resp = new Blob([success.body], { type: success.body.type });
        const fileURL = URL.createObjectURL(resp);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = 'Trust Application';
        downloadLink.click();
      });
  }
}
