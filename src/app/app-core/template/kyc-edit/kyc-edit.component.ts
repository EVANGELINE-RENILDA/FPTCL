import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { Row, ViewLabel } from '../../core-component/core-component.component';
import { InputControlComponent } from '../../form-input/input-control/input-control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kyc-edit',
  standalone: true,
  imports: [Row, InputControlComponent, FormsModule, ViewLabel],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './kyc-edit.component.html',
  styleUrl: './kyc-edit.component.scss'
})
export class KycEditComponent {
  __ientKyc: any
  errorTrue = false

  set ientKyc(ientKyc: any) {
    this.__ientKyc = ientKyc;
  }
  get ientKyc() {
    return this.__ientKyc;
  }


  __btnClicked = false;
  @Input() set btnClicked(btnClicked: boolean) { this.__btnClicked = btnClicked || false; }
  get btnClicked() { return this.__btnClicked; }

  __edit = false;
  @Input() set edit(edit: boolean) { this.__edit = edit || false; }
  get edit() { return this.__edit; }

}
