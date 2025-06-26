import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';

@Component({
  selector: 'app-notify-deceased-estate',
  standalone: true,
  imports: [FormsModule, Row, ViewLabel, AccordionModule, IconButtonComponent, InputControlComponent, AppDatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './notify-deceased-estate.component.html',
  styleUrl: './notify-deceased-estate.component.scss'
})
export class NotifyDeceasedEstateComponent {
  editData = false
  application: any = {
    ientTrustApplicationAssignedOfficer: {
      assignedToFullname: 'Estate Officer ',
      assignedDate: '16-07-2024',
      tatDays: 5
    }
  }

  editNotify() {
    this.editData = true
  }

  saveNotify() {
    this.editData = false
  }
}
