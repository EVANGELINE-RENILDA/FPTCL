import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Row, ViewLabel } from '../../core-component/core-component.component';
import { InputControlComponent } from '../../form-input/input-control/input-control.component';

@Component({
  selector: 'app-social-platform-edit',
  standalone: true,
  imports: [Row, InputControlComponent, FormsModule, ViewLabel],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './social-platform-edit.component.html',
  styleUrl: './social-platform-edit.component.scss'
})
export class SocialPlatformEditComponent {
  __ientSocialPlatform: any

  set ientSocialPlatform(ientSocialPlatform: any) {
    this.__ientSocialPlatform = ientSocialPlatform;
  }
  get ientSocialPlatform() {
    return this.__ientSocialPlatform;
  }


  __btnClicked = false;
  @Input() set btnClicked(btnClicked: boolean) { this.__btnClicked = btnClicked || false; }
  get btnClicked() { return this.__btnClicked; }

  __edit = false;
  @Input() set edit(edit: boolean) { this.__edit = edit || false; }
  get edit() { return this.__edit; }
}
