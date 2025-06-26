import { Component, Input } from '@angular/core';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';

@Component({
  selector: 'app-status-history1',
  standalone: true,
  imports: [AppDatePipe],
  templateUrl: './status-history1.component.html',
  styleUrl: './status-history1.component.scss'
})
export class StatusHistory1Component {
  @Input('data') data: any = [];
}
