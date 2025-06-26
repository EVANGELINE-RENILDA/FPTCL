import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { ProgressBarComponent } from '../../../common/progress-bar/progress-bar.component';
import { InnerScroll, Row, ViewLabel } from '../../../app-core/core-component/core-component.component';
import { FormsModule } from '@angular/forms';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';

import { DataService } from '../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { LineChart2Component } from '../line-chart2/line-chart.component';
import { TabGroupComponent } from "../../../app-core/template/tab/tab";
import { TabSubComponent, TabSubGroupComponent } from '../../../app-core/template/tab/tab1';
import { AppService } from '../../../app.service';
import { entLeadbyProduct } from '../../../common/api-services/application-api/application-api.classes';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';

@Component({
  selector: 'app-lead-dashboard',
  standalone: true,
  imports: [ProgressBarComponent, ViewLabel, Row, InputControlComponent, FormsModule,
     LineChartComponent, LineChart2Component, TabSubComponent,TabSubGroupComponent, InnerScroll,PieChartComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lead-dashboard.component.html',
  styleUrl: './lead-dashboard.component.scss'
})
export class LeadDashboardComponent {
  constructor(public data: DataService, public api: ApplicationApiService, public appService: AppService, public initialData: InitialDataService){}
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  ngOnInit(): void {
    this.init();
  }
  leadProduct = new entLeadbyProduct();
  pieData:any
  showChart = false
   dataSet1:any
  dataSet2:any
  pieLabel:any
  showPie = false;
  yearData :any = 2024;
  yearVal = 2024
  async init(){
    await this.data.checkToken();
    await this.initialData.getDDL('getDashboardInitialData');
    this.openLeadDash()
  }


  openLeadDash(){
    const obj = {
      data: this.yearVal
    }
    this.api.getLeadsourcebyyear(obj).subscribe((success)=>{
      this.dataSet1 = success.datasets
      this.dataSet2 = success.datasets2;
      this.showChart = true
      
    })
    this.api.getLeadbyProduct(obj).subscribe((success)=>{
      this.leadProduct = success;
      this.pieData = success.datasets[0].data;
      this.pieLabel = success.datasets[0].label
      this.showPie = true
    })
  }

  yearChanged(val:any){
    this.showChart = false;
    this.showPie = false
    const obj = {
      data: val
    }
    this.api.getLeadsourcebyyear(obj).subscribe((success)=>{
      this.dataSet1 = success.datasets
      this.dataSet2 = success.datasets2;
      this.showChart = true
      
    })
    this.api.getLeadbyProduct(obj).subscribe((success)=>{
      this.leadProduct = success;
      this.pieData = success.datasets[0].data;
      this.pieLabel = success.datasets[0].label
      this.showPie = true
    })
  }
}
