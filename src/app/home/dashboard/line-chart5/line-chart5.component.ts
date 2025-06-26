import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-line-chart5',
  standalone: true,
  imports: [],
  templateUrl: './line-chart5.component.html',
  styleUrl: './line-chart5.component.scss'
})
export class LineChart5Component {
  @Input() dataset: any[] = []; // Expecting an array of objects with properties like `legand` and `data`
  public chart: any;
  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    if (!this.dataset || this.dataset.length === 0) {
      console.warn('Dataset is empty or not provided.');
      return;
    }

    // Dynamically create datasets
    const dynamicDatasets = this.dataset.map((item: any, index: number) => ({
      label: item.legand,
      data: item.data,
      backgroundColor: item.backgroundColor || this.getDefaultBackgroundColor(index),
      borderColor: item.borderColor || item.backgroundColor || this.getDefaultBackgroundColor(index),
    }));

    // Initialize Chart.js
    this.chart = new Chart("MyChart4", {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: dynamicDatasets
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            offset: true, // Adds space before the first label
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              padding: 10,
            }
          },
          y: {
            beginAtZero: true,
          }
        }
      }
    });

    console.log('Dataset:', this.dataset);
  }

  // Fallback method to get default colors if not provided
  private getDefaultBackgroundColor(index: number): string {
    const colors = ['#d44d30', '#f2e955', '#87c83e', '#42c44c', '#2186a4'];
    return colors[index % colors.length];
  }
}
