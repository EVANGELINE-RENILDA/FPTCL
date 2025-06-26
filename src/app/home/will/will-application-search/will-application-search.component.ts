import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InnerScroll, Row, ViewLabel } from '../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../app-core/template/search/search.component';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../app-core/service/core.service';
import { AppService } from '../../../app.service';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../common/services/data/data.service';
import { AppStorageService } from '../../../common/services/app-storage/app-storage.service';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../common/services/url/url.service';
import { entWillApplication, entWillApplicationSearch } from '../../../common/api-services/application-api/application-api.classes';
import { AccoutsStatusTableComponent } from '../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { DialogAnimateService } from '../../../common/services/dialog-animated/dialog-animate.service';
import { CheckboxComponent } from '../../../app-core/template/checkbox/checkbox.component';

@Component({
  selector: 'app-will-application-search',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, CellHeaderDefDirective, IconButtonComponent, 
    InnerScroll, InputControlComponent, SearchComponent, Row, FormsModule, AppDatePipe, 
    AccoutsStatusTableComponent, ViewLabel, CheckboxComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './will-application-search.component.html',
  styleUrl: './will-application-search.component.scss'
})
export class WillApplicationSearchComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  searchParams = new entWillApplicationSearch();
  searchParamsRAW = new entWillApplicationSearch();
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
    sortColumns:'',
    sortOrder: false
  };
  errorTrue = false;
  trustLeadId: any
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  columns: any = ['willApplRefNo', 'fileNo', 'applicantName', 'branchDescription', 'applicationStageDescription', 'actionStatusDescription', 'assignedOfficer', 'action'];
  sortColumns: any = ['willApplRefNo', 'fileNo', 'applicantName', 'branchDescription', 'applicationStageDescription', 'actionStatusDescription', 'assignedOfficer'];
  columnsName: any = ["Will App Ref No", "File No", "Applicant Name", "Applicant CRM No", "Applied Branch", "Action Status", "Assigned Officer", "Action"];

  tableData: any = [];

  constructor(
    public dialogService : DialogAnimateService,
    public router: Router,
    public apiService: ApplicationApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public searchDialog: CoreService,
    public urlService: UrlService,
  ) {
    this.appService.helpFile ='Will%20Application%20Search.pdf'

  }
  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  async init() {
    await this.data.checkToken();
    // await this.initialData.getAllInitialDataForCustomerService(this.options)
    await this.initialData.getDDL('getInitialDataForWillApplication');
    this.createWillSearch();

  }

  createWillSearch(type?: any) {
    this.apiService.createNewWillApplicationSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchWillApplication();
      if (type === 'clear') {
        this.data.successMessage('Data Cleared Successfully')
      }
    })
  }
  searchWillApplication() {
    this.apiService.searchWillApplication(this.searchParams).subscribe((success) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.result;

    })
  }
  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.searchWillApplication();
    this.dialog?.closeAll()
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchWillApplication();

  }

  onSelect(event: any) {
    this.__selectedItems = event;
  }
  willApplication = new entWillApplication();
  willApplicationRAW = new entWillApplication();
  
  @ViewChild('x') xForm!: NgForm;
  @ViewChild('l') lForm!: NgForm;
  @ViewChild('willInfo', { static: false })
  willInfo!: ElementRef;
  async createNewWillApplication() {
    const obj = {
      data: this.trustLeadId
    }
    if (this.lForm.valid) {
      this.apiService.createNewWillApplication(obj).subscribe(async (success) => {
        this.willApplication = success
        let dialogResponse: any = await this.dialog.openDialog(this.willInfo, {
          disableClose: true,
          height: '275px',
          width: '100%',
          maxWidth: '1170px',
          // data: {
          //   customer: success
          // }
        });
        // console.log(dialogResponse);
        // if (dialogResponse) {
        //   this.navigateToDetail(dialogResponse.customerId);
        // }
      })
    }
    else {
      this.data.errorInfoMessage('Select Any Lead Ref No')
    }
  }

  async selectAllNavigate() {

    if (this.__selectedItems.array.length === 0) {
      return;
    }
    let encodeId = await this.urlService.encode(this.__selectedItems);
    this.router.navigateByUrl('/home/will/will-application/' + encodeId);
  }
  async navigateToDetail(id: any) {
    let obj = {
      currentIndex: 0,
      array: [id]
    }
    let encodeId = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/will/will-application/' + encodeId);

  }
  saveWillApplication(){
    this.apiService.saveWillApplication(this.willApplication).subscribe((success)=>{
      this.willApplication = success;
      this.navigateToDetail(success.willApplicationId)
      this.dialog.closeAll()
    })
  }
  clearDetails(){
    this.willApplication = JSON.parse(JSON.stringify(this.willApplicationRAW));
    const obj ={
      data:this.trustLeadId
    }
    this.apiService.createNewWillApplication(obj).subscribe(async (success) => {
      this.willApplication = success
      this.data.successMessage('Data Cleared Successfully');
    })
  }
 checkIsFPTCL(event:any){
  if(event.target.checked ===true){
    this.willApplication.isFptclMaintainFile = 'Y'
  }
  else{
    this.willApplication.isFptclMaintainFile = 'N'
  }
 }
}
