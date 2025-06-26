import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppTableComponent } from '../../../../../app-core/template/app-table/app-table.component';
import { entLegalApplication, entLegalApplicationAssignedOfficerHistory, entLegalApplicationDocument } from '../../../../../common/api-services/application-api/application-api.classes';
import { DataService } from '../../../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { AppDatePipe } from "../../../../../common/pipes/app-date/app-date.pipe";

@Component({
  selector: 'app-verification-of-fee',
  standalone: true,
  imports: [FormsModule, InputControlComponent, ViewLabel, AccordionModule, Row, IconButtonComponent, AppTableComponent, AppDatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './verification-of-fee.component.html',
  styleUrl: './verification-of-fee.component.scss'
})
export class VerificationOfFeeComponent {
  //receipt
  @Input() application = new entLegalApplication();
  @Output() applicationChange = new EventEmitter<any>();
  legalAssignedOfficer = new entLegalApplicationAssignedOfficerHistory();
  legalDocument = new entLegalApplicationDocument()
  assignedOfficerDDL = [];
  @ViewChild('notiForm') notiForm!: NgForm;
  @ViewChild('p') pForm!: NgForm;
  @Input() type = {
    isEditable: "",
    legalApplicationIdenityNo: 0,
    legalApplicationRejectHistoryId: 0,
    legalApplicationStageValue: "",
    legalApplicationId: 0
  };
  receiptFundColumns: any = ['1', '2', '3', '4', '5'];
  receiptFundColumnsName: any = ["Date", "Check No / Tr. No", "Organization", "Receipt No", "Amount"];
  receiptFundTableData: any = [];
constructor(public data : DataService, public apiService: ApplicationApiService){}

 completeApplicationStage() {
    this.application.isCompleted = 'Y';
    this.apiService.completeLegalApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }
}

