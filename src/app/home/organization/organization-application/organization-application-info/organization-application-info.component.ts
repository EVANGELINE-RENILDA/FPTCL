import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InnerScroll, Row } from '../../../../app-core/core-component/core-component.component';
import { FormsModule } from '@angular/forms';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { CoreService } from '../../../../app-core/service/core.service';

@Component({
  selector: 'app-organization-application-info',
  standalone: true,
  imports: [InnerScroll, Row, FormsModule, InputControlComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './organization-application-info.component.html',
  styleUrl: './organization-application-info.component.scss'
})
export class OrganizationApplicationInfoComponent {
  constructor(public dialog: CoreService) { }

}
