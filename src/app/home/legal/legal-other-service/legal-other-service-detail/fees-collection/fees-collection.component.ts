import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { FormsModule } from '@angular/forms';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { entLegalApplication, entLegalApplicationAssignedOfficerHistory } from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { AppTableComponent } from '../../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';

@Component({
  selector: 'app-fees-collection',
  standalone: true,
  imports: [AccordionModule, ViewLabel, InputControlComponent, FormsModule, IconButtonComponent, Row, AppDatePipe, AppTableComponent, CheckboxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './fees-collection.component.html',
  styleUrl: './fees-collection.component.scss'
})
export class FeesCollectionComponent {
  @Input() application = new entLegalApplication();
  @Output() applicationChange = new EventEmitter<any>();
  legalAssignedOfficer = new entLegalApplicationAssignedOfficerHistory();
  assignedOfficerDDL = [];
  @Input() type = {
    isEditable: "",
    legalApplicationIdenityNo: 0,
    legalApplicationRejectHistoryId: 0,
    legalApplicationStageValue: "",
    legalApplicationId: 0
  };
  constructor(public apiService: ApplicationApiService, public data: DataService){}
  
  //receipt
  receiptFundColumns: any = ['1', '2', '3', '4', '5'];
  receiptFundColumnsName: any = ["Date", "Check No / Tr. No", "Organization", "Receipt No", "Amount"];
  receiptFundTableData: any = [];

  completeApplicationStage() {
    this.application.isCompleted = 'Y';
    this.apiService.completeLegalApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }
}
