import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { Row } from '../../core-component/core-component.component';

@Component({
  selector: 'app-multi-tab-accordion',
  standalone: true,
  imports: [Row],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './multi-tab-accordion.component.html',
  styleUrl: './multi-tab-accordion.component.scss'
})
export class MultiTabAccordionComponent {
  @Input() totalCount = 5;

}
