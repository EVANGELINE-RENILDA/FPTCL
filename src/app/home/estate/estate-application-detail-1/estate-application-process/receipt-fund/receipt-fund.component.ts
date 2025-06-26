import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';

@Component({
  selector: 'app-receipt-fund',
  standalone: true,
  imports: [Row, InputControlComponent, FormsModule, ViewLabel, IconButtonComponent, AccordionModule, AppDatePipe, AppTableComponent, CellDefDirective, CellHeaderDefDirective, CheckboxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './receipt-fund.component.html',
  styleUrl: './receipt-fund.component.scss'
})
export class ReceiptFundComponent {
  receiptFundColumns: any = ['1', '2', '3', '4', '5'];
  receiptFundColumnsName: any = ["Date", "Check No / Tr. No", "Organization", "Receipt No", "Amount"];
  receiptFundTableData: any = [];
}
