import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';

import { DataService } from '../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { ProgressBarComponent } from '../../../common/progress-bar/progress-bar.component';
import { Row, ViewLabel } from '../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { BarChartComponent } from '../bar-chart/line-chart.component';
import { entCustomerDashboard } from '../../../common/api-services/application-api/application-api.classes';
import { AppService } from '../../../app.service';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [ ProgressBarComponent, ViewLabel, Row, InputControlComponent,FormsModule,BarChartComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  dashboardDatas = new entCustomerDashboard();
  constructor(public data: DataService, public api: ApplicationApiService,public appService: AppService,public initialData: InitialDataService){}
  ngAfterViewInit(): void {
   
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  ngOnInit(): void {
    this.init();
  }
  showChart = false
  xAxisData:any
  yAxisData:any
  async init(){
    await this.data.checkToken();
    this.initialData.getDDL('getDashboardInitialData');
    this.getDataBasedOnYear(2024)
  }
  year:any = 2024
  getDataBasedOnYear(event:any){
    this.showChart = false
    const obj = {
      data: event
    }
    this.api.getCustomerdashboard(obj).subscribe((success)=>{
      this.dashboardDatas = success;
      this.xAxisData = success.datasets[0].label;
     this.yAxisData = success.datasets[0].data;
      this.showChart = true
    })
  }
}
