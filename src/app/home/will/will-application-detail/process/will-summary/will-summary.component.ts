import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { entWillApplication, entWillApplicationAssignedOfficerHistory } from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { ViewLabel, Row } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';

@Component({
  selector: 'app-will-summary',
  standalone: true,
  imports: [IconButtonComponent, ViewLabel, Row, InputControlComponent, AppDatePipe, AccordionModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './will-summary.component.html',
  styleUrl: './will-summary.component.scss'
})
export class WillSummaryComponent {
  summaryEdit = false
  // trustAccount:any 
  @Input() application = new entWillApplication();
  @Output() applicationChange = new EventEmitter<any>();
  trustApplicationAssignedOfficer = new entWillApplicationAssignedOfficerHistory();
  constructor(public apiService: ApplicationApiService){}
  ngOnInit(): void {
    this.init()
  }
  trustAccNo = '';
  beneName = '';
  async init() {

    // this.application.lstacc.forEach((element: any) => {
    //   this.trustAccNo = this.trustAccNo + element.accountNo + ' , ';
    //   this.beneName = this.beneName + element.customerName + ' , ';


    // });
    // console.log(this.trustAccNo + 'wqeqw');

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
      data: this.application.willApplicationId
    }

    const options = {
      responseType: 'blob',
    };

    this.apiService.generatedStatementForWillApplication(obj, options)
      .subscribe((success: any) => {
        const resp = new Blob([success.body], { type: success.body.type });
        const fileURL = URL.createObjectURL(resp);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = 'Will Application';
        downloadLink.click();
      });
  }
}
