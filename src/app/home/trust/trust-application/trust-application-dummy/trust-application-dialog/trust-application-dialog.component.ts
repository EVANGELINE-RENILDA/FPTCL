import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, Input } from '@angular/core';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { entTrustApplicationClient } from '../../../../../common/api-services/application-api/application-api.classes';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { NgClass } from '@angular/common';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { ErrorMessageComponent } from '../../../../../app-core/message/error-message/error-message.component';
import { DataService } from '../../../../../common/services/data/data.service';

@Component({
  selector: 'app-trust-application-dialog',
  standalone: true,
  imports: [InnerScroll, InputControlComponent, ViewLabel, Row, NgClass, IconButtonComponent, ErrorMessageComponent,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trust-application-dialog.component.html',
  styleUrl: './trust-application-dialog.component.scss'
})
export class TrustApplicationDialogComponent {
  // @Input() public appliaction: any = '';
  // @Input() public data: any;
  type = '';
  datas: any;
  method = ''
  //btns
  editBtn = false;
  createBtns = false;
  updateBtns = false;
  //
  showEditDatas = false;
  trustApplicationClient = new entTrustApplicationClient();
  trustApplicationClientRAW = new entTrustApplicationClient();

  constructor(public dialog: CoreService,
    public dialogRef: DialogRef<string>,
    public data: DataService,
    @Inject(DIALOG_DATA) public xData: any,
  ) {
    this.type = xData.type;
    this.method = xData.method;
    if (this.type === 'client') {
      this.trustApplicationClient = xData.val
    }
    console.log(this.type);
    console.log(this.trustApplicationClient);
  }
  editDatas() {
    this.showEditDatas = true
  }

  closeAllDialogs() {
    this.data.showErrorMessage = false;
    this.dialog.closeAll();
  }
  closeDialog() {
    this.data.showErrorMessage = false;
    this.dialog.closeDialog()
  }
  saveClient() {

  }
  clearData(val: any) {
    if (val === 'client') {
      this.trustApplicationClient = JSON.parse(JSON.stringify(this.trustApplicationClientRAW))
    }

    this.data.successMessage('Data Cleared Successfully')
  }


}
