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
import { LineChart4Component } from '../line-chart4/line-chart4.component';
import { LineChart5Component } from '../line-chart5/line-chart5.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-trust-dashboard',
  standalone: true,
  imports: [Row, ViewLabel, FormsModule,InnerScroll, FormsModule, InputControlComponent, 
    LineChartComponent,LineChart2Component,LineChart3Component,LineChart4Component,LineChart5Component, NgClass],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trust-dashboard.component.html',
  styleUrl: './trust-dashboard.component.scss'
})
export class TrustDashboardComponent {
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
  dataSet4:any
  dataSet5:any
  yearData :any = 2024;
  yearVal = 2024
  async init(){
    await this.data.checkToken();
    await this.initialData.getDDL('getDashboardInitialData');
    this.openTrustDash()
  }
  dashboardDatas:any

  openTrustDash(){
    const obj = {
      data: this.yearVal
    }
    this.api.getTrustdashboard(obj).subscribe((success)=>{
      this.dataSet1 = success.datasets1
      this.dataSet2 = success.datasets2;
      this.dataSet3 = success.dataset3;
      this.dataSet4 = success.dataset4;
      this.dataSet5 = success.dataset5;
      this.dashboardDatas = success
      this.showChart = true
    })
  }

  yearChanged(val:any){
    this.showChart = false;
    const obj = {
      data: val
    }
    this.api.getTrustdashboard(obj).subscribe((success)=>{
      this.dataSet1 = success.datasets1;
      this.dataSet2 = success.datasets2;
      this.dataSet3 = success.dataset3;
      this.dataSet4 = success.dataset4;
      this.dataSet5 = success.dataset5;
      this.showChart = true
      
    })

  }
   showApp = true
   showWith = false
   showSett = false
   activeNew = 'app'
  changeTrust(val:any){
    if(val==='app'){
      this.showApp = true
      this.showWith = false
      this.showSett = false
      this.activeNew = 'app'
    }
    if(val === 'with'){
      this.showWith = true
      this.showApp = false
      this.showSett = false
       this.activeNew = 'with'
    }
    if(val === 'sett'){
      this.showSett = true;
      this.showWith = false
      this.showApp = false
       this.activeNew = 'sett'
    }
  }
}
