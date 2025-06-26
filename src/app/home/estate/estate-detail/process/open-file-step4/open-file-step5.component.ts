import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { FormsModule } from '@angular/forms';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { entEstateApplication } from '../../../../../common/api-services/application-api/application-api.classes';
import { AppDatePipe } from "../../../../../common/pipes/app-date/app-date.pipe";
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';

@Component({
  selector: 'app-open-file-step5',
  standalone: true,
  imports: [AccordionModule, FormsModule, InputControlComponent, ViewLabel, Row, InnerScroll, AppDatePipe],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './open-file-step5.component.html',
  styleUrl: './open-file-step5.component.scss'
})
export class OpenFileStep5Component {
  @Input() application = new entEstateApplication();
  @Output() applicationChange = new EventEmitter<any>();
  @Input() type = {
    isEditable : ''
  }
  constructor(public apiService: ApplicationApiService, public data: DataService){}
  editOpenFile = false;
  completeApplicationStage() {
    this.application.isCompleted = 'Y'
    this.apiService.completeEstateApplicationStage(this.application).subscribe((success) => {
      this.application = success;
      this.applicationChange.emit(this.application);
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
}
