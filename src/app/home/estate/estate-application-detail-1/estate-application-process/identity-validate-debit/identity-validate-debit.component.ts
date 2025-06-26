import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppTableComponent, CellDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';

@Component({
  selector: 'app-identity-validate-debit',
  standalone: true,
  imports: [AccordionModule, IconButtonComponent, AppTableComponent, Row, ViewLabel, CheckboxComponent, CellDefDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './identity-validate-debit.component.html',
  styleUrl: './identity-validate-debit.component.scss'
})
export class IdentityValidateDebitComponent {

  identityColumns: any = ['cred', 'iden', 'no', 'eved', 'dis']
  identityColumnsName: any = ['Creditors', 'Identity Type', 'Identity Number', 'Evidence Doc', 'Distribution Check'];
  identityTableData: any = [{
    'cred': 'Jone', 'iden': 'Driving License', 'no': 'FJ4569201', 'eved': 'evidence.pdf'
  },
  {
    'cred': 'Azam Ali', 'iden': 'Driving License', 'no': 'FJ456213', 'eved': 'evidence1.pdf'
  }]

}
