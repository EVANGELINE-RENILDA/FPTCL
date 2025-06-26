import { Component, Input } from '@angular/core';

@Component({
  selector: 'accouts-status-table',
  standalone: true,
  imports: [],
  templateUrl: './accouts-status-table.component.html',
  styleUrl: './accouts-status-table.component.scss'
})
export class AccoutsStatusTableComponent {

  __statusDescription: any = ''
  @Input() set statusDescription(statusDescription: string) { this.__statusDescription = statusDescription || ''; }
  get statusDescription() { return this.__statusDescription; }
}
