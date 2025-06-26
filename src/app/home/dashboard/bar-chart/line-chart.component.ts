import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';
// import { Chart } from 'chart.js';
// import { Chart } from 'chart.js/auto';
// import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart', 
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class BarChartComponent {
  public chart: Chart;
  @Input() xaisLabel:any;
  @Input() yaxisValue:any;

  ngOnInit() {
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: this.xaisLabel,

        datasets: [
          {
       
            data: this.yaxisValue,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
    plugins: {
      legend: {
        display: false, // Optional: Use this if you want to hide the legend entirely
      }
    }
  }
    });
  }

}
