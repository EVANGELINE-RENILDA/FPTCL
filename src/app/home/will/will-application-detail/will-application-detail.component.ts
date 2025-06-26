import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { entWillApplication } from '../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
import { CoreService } from '../../../app-core/service/core.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../common/services/url/url.service';
import { AppService } from '../../../app.service';
import { DataService } from '../../../common/services/data/data.service';
import { Row, ViewLabel } from '../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { AppDatePipe } from "../../../common/pipes/app-date/app-date.pipe";
import { TabComponent, TabGroupComponent } from '../../../app-core/template/tab/tab';
import { ApplicationComponent } from './application/application.component';
import { RequirmentListComponent } from './process/requirment-list/requirment-list.component';
import { AccordionModule } from '../../../app-core/template/accordion/accordion.module';
import { InitialDocumentComponent } from './process/initial-document/initial-document.component';
import { CollectBeneficiaryDocComponent } from './process/collect-beneficiary-doc/collect-beneficiary-doc.component';
import { IdentifyTestatorComponent } from './process/identify-testator/identify-testator.component';
import { InterviewTestatorComponent } from './process/interview-testator/interview-testator.component';
import { PrepareWillDraftComponent } from './process/prepare-will-draft/prepare-will-draft.component';
import { ReviewDraftComponent } from './process/review-draft/review-draft.component';
import { ObtainSignatureComponent } from "./process/obtain-signature/obtain-signature.component";
import { IssuedSignedCopyComponent } from './process/issued-signed-copy/issued-signed-copy.component';
import { ReceiptWillFeeComponent } from './process/receipt-will-fee/receipt-will-fee.component';
import { RegisterWillHighCourtComponent } from "./process/register-will-high-court/register-will-high-court.component";
import { CollectWillRegisterComponent } from './process/collect-will-register/collect-will-register.component';
import { IssueRegisterWillCopyComponent } from './process/issue-register-will-copy/issue-register-will-copy.component';
import { UpdateRegisteredWillComponent } from './process/update-registered-will/update-registered-will.component';
import { EmailHistoryFormComponent } from '../../crm/email-history-form/email-history-form.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../app-core/template/app-table/app-table.component';
import { StatusHistory1Component } from '../../../app-core/template/status-history1/status-history1.component';
import { TabSubComponent, TabSubGroupComponent } from '../../../app-core/template/tab/tab1';
import { CompleteWillApplicationComponent } from './process/complete-will-application/complete-will-application.component';
import { MultiPageUrlComponent } from '../../../app-core/template/multi-page-url/multi-page-url.component';
import { OpenFileComponent } from './process/open-file/open-file.component';
import { StatusHistoryWillComponent } from '../../../app-core/template/status-history-will/status-history-will.component';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../app-core/template/search/search.component';
import { WillSummaryComponent } from './process/will-summary/will-summary.component';


@Component({
  selector: 'app-will-application-detail',
  standalone: true,
  templateUrl: './will-application-detail.component.html',
  styleUrl: './will-application-detail.component.scss',
  imports: [Row, InputControlComponent, ViewLabel, AccordionModule, FormsModule, AppDatePipe,
    TabGroupComponent, TabComponent, ApplicationComponent,RequirmentListComponent, InitialDocumentComponent,
     CollectBeneficiaryDocComponent, IdentifyTestatorComponent, InterviewTestatorComponent,
      PrepareWillDraftComponent, ReviewDraftComponent, ObtainSignatureComponent, IssuedSignedCopyComponent,
       ReceiptWillFeeComponent, RegisterWillHighCourtComponent, CollectWillRegisterComponent,
        IssueRegisterWillCopyComponent, UpdateRegisteredWillComponent, AppTableComponent, CellDefDirective,
         CellHeaderDefDirective ,StatusHistoryWillComponent, TabSubComponent,TabSubGroupComponent,SearchComponent,
         CompleteWillApplicationComponent, MultiPageUrlComponent,OpenFileComponent, IconButtonComponent, WillSummaryComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WillApplicationDetailComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  willApplicationId = 0
  willApplication = new entWillApplication();
  showData = false;
  showProcessAccordion = false;
  showHistoryAccordion = false;
  assignOfficerData:any;
  assignOfficerColumns: any = ["assignedToFullname", "assignedDate", "assignedByFullname", "statusDescription"];
  assignOfficerColumnsName: any = ["Assigned Officer", "Assigned Date", "Assigned By", "Status",];
  statusHistoryDataSource = [];
  emailColumns: any = ["toEmailId", "sentDate", "sentStatusDescription", "action"];
  emailColumnsName: any = ["To", " Date | Time", "Status", "Action"];
  emailHistoryTableData: any = [];
notesLength = 0
notesList:any;
@ViewChild('appSearch') appSearch!: SearchComponent;
  constructor(public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public router: Router,
    public route: ActivatedRoute,
    public data: DataService,
    public url: UrlService,

    public appService: AppService) {
    this.appService.helpFile ='Will%20Application%20Detail.pdf'

    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  id = {
    currentIndex: 0,
    array: []
  };
  navigateToList() {
    this.router.navigateByUrl('/home/will/will-application/search')
  }
  async init() {
    this.appService.setBreadCrumb(this.breadCrumb);
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params;
    this.willApplicationId = this.id.array[this.id.currentIndex];
    await this.data.checkToken();
    await this.initialData.getDDL('getInitialDataForWillApplication');
    await this.loadProvinceDDL();
    await this.initialData.getDDL('getInitialDataForCustomer');
    this.openWilApplication()
  }
  ProvinceDDL:any
  loadProvinceDDL(){
    this.apiService.loadAllMProvince().subscribe((success)=>{
      this.initialData.DDLValues.DDLProvince = success.value
    })
  }
  onTabChange(event: any) {
    switch (event.tabTitle) {
      case 'Process': this.showProcessAccordion = true;
        break;
      case 'History': this.showHistoryAccordion = true;
        this.getNotesList();
        this.getAssignedOfficerList();
        this.getCommunicationHistory();
        this.getStatusHistoryList();

        break;
    }}
    getNotesList(){
      const obj = {
        data: this.willApplicationId
      }
      this.apiService.getListofWillApplicationNotes(obj).subscribe((success)=>{
        this.notesList = success.lstentWillApplicationNotes
      })
    }
    getStatusHistoryList(){
      const obj = {
        data: this.willApplicationId
      }
      this.apiService.getListWillApplicationStatusHistory(obj).subscribe((success)=>{
        this.statusHistoryDataSource = success.lstentWillApplicationStatusHistory
      })
    }
    getCommunicationHistory(){
      const obj = {
        data: this.willApplicationId
      }
      this.apiService.getListWillApplicationEmailHistory(obj).subscribe((success)=>{
        this.emailHistoryTableData = success.lstentWillApplicationEmailHistory
      })
    }
maintainFile = ''
  openWilApplication() {
    debugger
    const obj = {
      data: this.willApplicationId
    }
    this.apiService.openWillApplicationWithChilds(obj).subscribe((success) => {
      this.willApplication = success;
      if(this.willApplication.isFptclMaintainFile === 'Y'){
        this.maintainFile = 'Yes'
      }
      if(this.willApplication.isFptclMaintainFile === 'N'){
        this.maintainFile = 'No'
      }
      this.notesList = success.lstentWillApplicationNotes;
      this.assignOfficerData =success.lstentWillApplicationAssignedOfficerHistory
      this.statusHistoryDataSource = success.lstentWillApplicationStatusHistory
      this.emailHistoryTableData = success.lstentWillApplicationEmailHistory
      this.showData = true
      this.data.successMessage(success.msg?.infoMessage?.msgDescription)
    })
  }
  getAssignedOfficerList(){
    const obj = {
      data: this.willApplicationId
    }
    this.apiService.getListWillApplicationAssignedOfficerHistory(obj).subscribe((success)=>{
      this.assignOfficerData =success.ientWillApplicationAssignedOfficerHistory
      this.willApplication.lstentWillApplicationAssignedOfficerHistory =success.ientWillApplicationAssignedOfficerHistory
    })
  }
  // getStatusHistory(){
  //   const obj = {
  //     data: this.willApplicationId
  //   }
  //   this.apiServChildce.getwills
  // }
  async viewEmailDetail(val: any) {
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(EmailHistoryFormComponent, {
      height: '550px',
      width: '100%',
      maxWidth: '1170px',
      data: {
        email: val,
        title: 'Will Application',
        icon: 'assets/icons/accordian/will.svg'
      }
    });
  }



}
