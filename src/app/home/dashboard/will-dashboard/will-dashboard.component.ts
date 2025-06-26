import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from '../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { AppService } from '../../../app.service';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
import { InnerScroll, Row, ViewLabel } from '../../../app-core/core-component/core-component.component';
import { FormsModule } from '@angular/forms';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { LineChart2Component } from '../line-chart2/line-chart.component';
import { LineChart3Component } from '../line-chart3/line-chart3.component';

@Component({
  selector: 'app-will-dashboard',
  standalone: true,
  imports: [Row, ViewLabel, FormsModule,InnerScroll, FormsModule, InputControlComponent, 
    LineChartComponent,LineChart2Component,LineChart3Component],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './will-dashboard.component.html',
  styleUrl: './will-dashboard.component.scss'
})
export class WillDashboardComponent {
  constructor(public data: DataService, 
    public api: ApplicationApiService, public appService: AppService, 
    public initialData: InitialDataService){}
    
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  ngOnInit(): void {
    this.init();
  }
  // leadProduct = new entTrustRepo();
  pieData:any
  showChart = false
   dataSet1:any
  dataSet2:any
  dataSet3:any
  yearData :any = 2024;
  yearVal = 2024
  async init(){
    await this.data.checkToken();
    await this.initialData.getDDL('getDashboardInitialData');
    this.openTrustDash()
  }


  openTrustDash(){
    const obj = {
      data: this.yearVal
    }
    this.api.getWillDashBoard(obj).subscribe((success)=>{
      this.dataSet1 = success.datasets


      this.showChart = true
    })
  }

  yearChanged(val:any){
    this.showChart = false;
    const obj = {
      data: val
    }
    this.api.getWillDashBoard(obj).subscribe((success)=>{
      this.dataSet1 = success.datasets;
  
      this.showChart = true
      
    })

  }
}
