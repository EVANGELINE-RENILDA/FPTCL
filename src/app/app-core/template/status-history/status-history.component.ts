import { Component, Input } from '@angular/core';
import { AppDatePipe } from "../../../common/pipes/app-date/app-date.pipe";

@Component({
  selector: 'app-status-history',
  standalone: true,
  templateUrl: './status-history.component.html',
  styleUrl: './status-history.component.scss',
  imports: [AppDatePipe]
})
export class StatusHistoryComponent {

  @Input('data') data: any = [];


}
