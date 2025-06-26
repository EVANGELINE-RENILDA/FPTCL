import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppTableComponent } from '../../../../../app-core/template/app-table/app-table.component';

@Component({
  selector: 'app-make-payment',
  standalone: true,
  imports: [FormsModule, InputControlComponent, FormsModule, ViewLabel, AccordionModule, Row, IconButtonComponent, AppTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './make-payment.component.html',
  styleUrl: './make-payment.component.scss'
})
export class MakePaymentComponent {
  //receipt
  receiptFundColumns: any = ['1', '2', '3', '4', '5'];
  receiptFundColumnsName: any = ["Date", "Check No / Tr. No", "Organization", "Receipt No", "Amount"];
  receiptFundTableData: any = [];
}
