import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ExpandAllDirective } from '../../directives/exapandAll/expand-all.directive';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [MatTooltipModule,ExpandAllDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent {
  @Input('name') name = "";
  @Input('toolTip') toolTip = "";
  @Input('__disabled') __disabled: any;
}
