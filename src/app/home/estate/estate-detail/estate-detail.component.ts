import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
import { CoreService } from '../../../app-core/service/core.service';
import { AppService } from '../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../common/services/url/url.service';
import { DataService } from '../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { entDeceasedPerson, entEstateApplication } from '../../../common/api-services/application-api/application-api.classes';
import { Row, ViewLabel } from '../../../app-core/core-component/core-component.component';
import { AccordionModule } from '../../../app-core/template/accordion/accordion.module';
import { FormsModule } from '@angular/forms';
import { TabComponent, TabGroupComponent } from '../../../app-core/template/tab/tab';
import { TabSubComponent, TabSubGroupComponent } from '../../../app-core/template/tab/tab1';
import { AppDatePipe } from "../../../common/pipes/app-date/app-date.pipe";
// import { ApplicationComponent } from '../../will/will-application-detail/application/application.component';
import { ApplicationComponent1 } from './application/application.component';
import { MultiPageUrlComponent } from '../../../app-core/template/multi-page-url/multi-page-url.component';
import { NotifyDeceasedEstateStep1Component } from './process/notify-deceased-estate-step1/notify-deceased-estate-step1.component';
import { ConductInterviewStep2Component } from './process/conduct-interview-step2/conduct-interview-step2.component';
import { ObtainDetailInsStep3Component } from './process/obtain-detail-ins-step3/obtain-detail-ins-step3.component';
import { OpenFileStep5Component } from './process/open-file-step4/open-file-step5.component';
import { IdentifyValidateDebtStep9Component } from './process/identify-validate-debt-step7/identify-validate-debt-step9.component';
import { ConfirmAssetsStep10Component } from './process/confirm-assets-step8/confirm-assets-step10.component';
import { ObtainGrantStep11Component } from './process/obtain-grant-step9/obtain-grant-step11.component';


@Component({
  selector: 'app-estate-detail',
  standalone: true,
  imports: [Row, ViewLabel, AccordionModule, FormsModule, TabComponent, TabGroupComponent,
    TabSubComponent, TabSubGroupComponent, AppDatePipe, ApplicationComponent1, MultiPageUrlComponent, 
    NotifyDeceasedEstateStep1Component, ConductInterviewStep2Component,ObtainDetailInsStep3Component,OpenFileStep5Component,IdentifyValidateDebtStep9Component,ConfirmAssetsStep10Component,ObtainGrantStep11Component],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './estate-detail.component.html',
  styleUrl: './estate-detail.component.scss'
})
export class EstateDetailComponent {
  estateApplicationDetail = new entEstateApplication();
  deceasedPerson = new entDeceasedPerson()
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  constructor(public initialData: InitialDataService, public dialog: CoreService, public appService: AppService, public route: ActivatedRoute, public url: UrlService, public data: DataService, public apiService: ApplicationApiService, public router: Router,) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);

  }
  id:any;
  estateApplicationId = 0
  async init() {
    this.appService.setBreadCrumb(this.breadCrumb);
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    console.log(params);
    this.id = params;
    this.estateApplicationId = this.id.array[this.id.currentIndex];
    await this.data.checkToken();
    await this.loadProvinceDDL()
    await this.initialData.getDDL('getInitialDataForCustomer');
    await  this.initialData.getDDL('getInitialDataForEstateApplication');
    // await  this.initialData.getDDL('getInitialDataForDeceasedPerson');
    // await this.initialData.getDDL('getInitialDataForEstateApplicationBeneficiary');
    // await  this.initialData.getDDL('getInitialDataForEstateApplicationRealestate');
    this.openEstateApplicationDetail()
  }
  ProvinceDDL:any
  loadProvinceDDL(){
    this.apiService.loadAllMProvince().subscribe((success)=>{
      this.initialData.DDLValues.DDLProvince = success.value
    })
  }
  navigateToList() {
    this.router.navigateByUrl('/home/estate/estate-application/search')
  }
showApplication  = false
showProcess = false
  openEstateApplicationDetail() {
    const obj = {
      data: this.estateApplicationId
    }
    this.apiService.openEstateApplication(obj).subscribe((success) => {
      this.estateApplicationDetail = success;
      this.showApplication = true
      this.data.successMessage(success.msg.infoMessage.msgDescription)
      // this.openDeceasedPerson(success.ientDeceasedPerson.deceasedPersonId)
      // this.openEstateApplicationBeneficiary(success.estateApplicationId)
      // this.openEstateApplicationRealestate(success.estateApplicationId)


      // this.createDeceasedPerson()


    })
  }

  onTabChange(event:any){
    switch (event.tabTitle) {
      case 'Process': this.showProcess = true
        break;
    }
  }
}
