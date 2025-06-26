import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { FormsModule } from '@angular/forms';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { entEstateApplication, entEstateApplicationAssignedOfficerHistory, entEstateApplicationNotes } from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { AppDatePipe } from "../../../../../common/pipes/app-date/app-date.pipe";
import { DataService } from '../../../../../common/services/data/data.service';

@Component({
  selector: 'app-create-account-step5',
  standalone: true,
  imports: [AccordionModule, FormsModule, ViewLabel, InputControlComponent, IconButtonComponent,
    AppTableComponent, CellDefDirective, CellHeaderDefDirective, Row, AppDatePipe],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './create-account-step5.component.html',
  styleUrl: './create-account-step5.component.scss'
})
export class CreateAccountStep5Component {
  @Input() application = new entEstateApplication();
  @Output() applicationChange = new EventEmitter<any>();
  @Input() type = {
      isEditable: ''
  }
  estateApplicationAssignedOfficer = new entEstateApplicationAssignedOfficerHistory();
  estateApplicationNotes = new entEstateApplicationNotes();
  assignedOfficerDDL:any =[];
  constructor(public apiService: ApplicationApiService,public data: DataService){}
  reAssignEstate() {
    this.estateApplicationAssignedOfficer.estateApplicationId = this.application.estateApplicationId;
    this.application.ientEstateApplicationAssignedOfficerHistory = this.estateApplicationAssignedOfficer
    this.apiService.reAssignEstateApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success;
      this.applicationChange.emit(this.application);
    })
  }
  selfAssignEstate() {
    this.estateApplicationAssignedOfficer.estateApplicationId = this.application.estateApplicationId
    this.application.ientEstateApplicationAssignedOfficerHistory = this.estateApplicationAssignedOfficer
    this.apiService.selfAssignEstateApplicationAssignedHistory(this.application).subscribe((success: any) => {
      this.application = success;
      this.applicationChange.emit(this.application);
    })
  }
  column:any = [];
  columnName = ['Beneficiary Name','Account Name','Account Type','Bank','Branch', 'Status','Action']
}
