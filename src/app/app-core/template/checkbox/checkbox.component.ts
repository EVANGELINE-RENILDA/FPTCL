import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  __checked = false;
  @Input() set checked(checked: boolean) { this.__checked = checked || false; }
  get checked() { 
    return this.__checked; 
   }
  

  __btnClicked = false;
  @Input() set btnClicked(btnClicked: boolean) { this.__btnClicked = btnClicked || false; }
  get btnClicked() { return this.__btnClicked; }

}
