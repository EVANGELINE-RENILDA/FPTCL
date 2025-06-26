import { Component, Input } from '@angular/core';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';

@Component({
  selector: 'app-status-history-will',
  standalone: true,
  imports: [AppDatePipe],
  templateUrl: './status-history-will.component.html',
  styleUrl: './status-history-will.component.scss'
})
export class StatusHistoryWillComponent {
  @Input('data') data: any = [];
}
