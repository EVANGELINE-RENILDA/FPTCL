import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { FormsModule } from '@angular/forms';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';
import { entEstateApplication, entEstateApplicationAssignedOfficerHistory, entEstateApplicationNotes } from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';

@Component({
  selector: 'app-identify-validate-debt-step9',
  standalone: true,
  imports: [AccordionModule, FormsModule,AppTableComponent,CellDefDirective,CellHeaderDefDirective,
    IconButtonComponent, CheckboxComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './identify-validate-debt-step9.component.html',
  styleUrl: './identify-validate-debt-step9.component.scss'
})
export class IdentifyValidateDebtStep9Component {
  @Input() application = new entEstateApplication();
  @Output() applicationChange = new EventEmitter<any>();
  @Input() type = {
    isEditable : ''
  }
  estateApplicationAssignedOfficer = new entEstateApplicationAssignedOfficerHistory();
  estateApplicationNotes = new entEstateApplicationNotes();

  identityColumns: any = ['cred', 'contactNo', 'genderDescription', 'eved']
  identityColumnsName: any = ['Creditors', 'Contact No', 'Gender', 'Evidence Doc',];
  identityTableData: any = [{
    'cred': 'Jone', 'iden': 'Driving License', 'no': 'FJ4569201', 'eved': 'evidence.pdf'
  },
  {
    'cred': 'Azam Ali', 'iden': 'Driving License', 'no': 'FJ456213', 'eved': 'evidence1.pdf'
  }];
  constructor(public apiService: ApplicationApiService, public data: DataService){}
  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeEstateApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
}
