import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppTableComponent } from '../../../../../app-core/template/app-table/app-table.component';
import { entWillApplication } from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { AppDatePipe } from "../../../../../common/pipes/app-date/app-date.pipe";
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';

@Component({
  selector: 'app-receipt-will-fee',
  standalone: true,
   imports: [FormsModule, InputControlComponent, ViewLabel, AccordionModule, Row, IconButtonComponent,
     AppTableComponent, AppDatePipe, CheckboxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  templateUrl: './receipt-will-fee.component.html',
  styleUrl: './receipt-will-fee.component.scss'
})
export class ReceiptWillFeeComponent {
  @Input() application = new entWillApplication();
  @Output() applicationChange = new EventEmitter<any>();
  @Input() type = {
    identityNo:0,
    stageValue:'',
    willApplicationId:'',
    willApplicationProcessHistoryId:'',
    isEditable:''
  }
  //receipt
  receiptFundColumns: any = ['1', '2', '3', '4', '5'];
  receiptFundColumnsName: any = ["Date", "Check No / Tr. No", "Organization", "Receipt No", "Amount"];
  receiptFundTableData: any = [];
  constructor(public apiService: ApplicationApiService){}
  completeApplicationStage(){
    this.application.isCompleted = 'Y';
    this.application.lstentWillApplicationDocument = [];
    this.apiService.completeWillApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      // this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }
}
