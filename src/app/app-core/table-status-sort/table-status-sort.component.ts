import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { Row } from '../core-component/core-component.component';

@Component({
  selector: 'table-status-sort',
  standalone: true,
  imports: [Row],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './table-status-sort.component.html',
  styleUrl: './table-status-sort.component.scss'
})
export class TableStatusSortComponent {
  @Input() public type: any = '';
  @Input() public processingCount: any = '';
  @Input() public processingCount1: any = '';
  @Input() public approvedCount: any = '';
  @Input() public approvedCount1: any = '';
  @Input() public processingTitle: any = '';
  @Input() public approvedTitle: any = '';
  @Input() public activeCount: any = '';
  @Input() public activeCount1: any = '';
  @Input() public inActiveCount: any = '';
  @Input() public inActiveCount1: any = '';
}
