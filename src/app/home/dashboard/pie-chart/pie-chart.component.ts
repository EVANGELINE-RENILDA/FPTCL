import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  chart: any;
  @Input() pieData:any;
  @Input() pieLabel:any;



  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: this.pieLabel,
        datasets: [
          {
            data: this.pieData,
            
          
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false, // Set to true if you want to display the legend
          }
        }
      },
    });
    console.log(this.pieData);
    console.log(this.pieLabel);
    
  }

}
