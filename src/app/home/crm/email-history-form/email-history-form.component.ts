import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { CoreService } from '../../../app-core/service/core.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormsModule } from '@angular/forms';
import { Row, InnerScroll, ViewLabel } from '../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from "../../../common/pipes/app-date/app-date.pipe";

@Component({
  selector: 'app-email-history-form',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './email-history-form.component.html',
  styleUrl: './email-history-form.component.scss',
  imports: [ViewLabel, Row, IconButtonComponent, InnerScroll, AppDatePipe]
})
export class EmailHistoryFormComponent {

  emailData: any
  title = ''
  icon = ''

  constructor(public dialog: CoreService,
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public xData: any,
  ) {
    console.log(xData.email);
    this.title = xData.title;
    this.icon = xData.icon



  }

  closeNotesDialog() {

    this.dialog.closeDialog()
  }

}
