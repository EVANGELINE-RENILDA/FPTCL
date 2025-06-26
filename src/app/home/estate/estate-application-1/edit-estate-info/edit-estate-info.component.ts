import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Row, ViewLabel, InnerScroll } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { DropZoneComponent } from '../../../../app-core/template/drop-zone/drop-zone.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { CoreService } from '../../../../app-core/service/core.service';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { DataService } from '../../../../common/services/data/data.service';


@Component({
  selector: 'app-edit-estate-info',
  standalone: true,
  imports: [Row, FormsModule, InputControlComponent, IconButtonComponent, ViewLabel, InnerScroll, DropZoneComponent, CheckboxComponent, AddressEditComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './edit-estate-info.component.html',
  styleUrl: './edit-estate-info.component.scss'
})
export class EditEstateInfoComponent {

  type = '';
  errorTrue = false
  constructor(public dialog: CoreService,
    public data: DataService,
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public xData: any) {

  }

  ngOnInit(): void {
    console.log(this.xData)
    this.type = this.xData.type
    console.log(this.type);

  }

  uploadDeliveryAttachment(event: any) {

  }
}
