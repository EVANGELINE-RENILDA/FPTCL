import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input() progress = 0;
  @Input() totalProgress = 0;
  @Input() label = '';

  getGradient() {
    const progressDegree = (this.progress / this.totalProgress) * 360;
    return `conic-gradient(#0079C4 ${progressDegree}deg, #BAE5FF ${progressDegree}deg)`;
  }
}
