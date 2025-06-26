import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { FormsModule } from '@angular/forms';
import { Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AppService } from '../../../../app.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { Router } from '@angular/router';
import { DataService } from '../../../../common/services/data/data.service';
import { AdminApiService } from '../../../../common/api-services/admin-api/admin-api.service';
import { CoreService } from '../../../../app-core/service/core.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { StorageService } from '../../../../common/services/storage/storage.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';

@Component({
  selector: 'app-workflow-list',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, CellHeaderDefDirective, IconButtonComponent, SearchComponent, FormsModule, ViewLabel, InputControlComponent, Row, AppDatePipe, AppAccessDirective, ButtonAccessDirective,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './workflow-list.component.html',
  styleUrl: './workflow-list.component.scss'
})
export class WorkflowListComponent {
  columns = ['workRef', 'sourRef', 'currTask', 'assignDate', 'compleDate', 'action'];
  columnsName = ['', '', '', '', '', 'Action'];
  tableData: any = [];
  errorTrue = false;
  // searchParams = new entWorkflowSearch();
  // searchParamsRAW = new entWorkflowSearch();
  searchParams: any
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  pageId = 'MYTAS'
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  currentDate = '';
  options = {
    type: 'adminPath',
  };
  constructor(
    public appService: AppService,
    public apiService: ApplicationApiService,
    public url: UrlService,
    public router: Router,
    public data: DataService,
    public adminService: AdminApiService,
    public dialog: CoreService,
    public initialData: InitialDataService,
    public storage: AppStorageService
  ) {

  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  ngOnInit(): void {
    this.init()
  }
  async init() {
    await this.data.checkToken();
   
    await this.initialData.getDDL('getWorkflowRuntimeInitialData', this.options);
    this.currentDate = this.appService.getCurrentDate();
    this.createWorkFlowSearch()
  }
  createWorkFlowSearch(type?: any) {

    this.apiService.createNewWorkflowSearch(this.options).subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchParams.assignedTo = this.appService.userData.userLoginId
      if (type !== 'clear') {
      }
      else {
        this.data.successMessage('Data Cleared Successfully')
      }
      this.searchWorkFlow()
    })
  }
  searchWorkFlow() {
    this.apiService.searchWorkflow(this.searchParams, this.options).subscribe((success) => {
      this.tableData = success.searchResult;
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;

    })
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.searchWorkFlow();
    this.appSearch?.close();

  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchWorkFlow();
  }
  async navigateToDetail(element: any) {

    let obj = {
      currentIndex: 0,
      array: [element.sourcePrimaryKey]
    }
    if (element.sourceRefValue === 'CUSUP') {
      let encodeId = await this.url.encode(obj);
      this.router.navigateByUrl('/home/crm/customer-update/detail/' + encodeId)
    }
    if (element.sourceRefValue === 'CUSEV') {
      let encodeId = await this.url.encode(obj);

      this.router.navigateByUrl('/home/crm/customer-service/detail/' + encodeId)
    }
    if (element.sourceRefValue === 'CUSTR') {
      let encodeId = await this.url.encode(obj);
      this.router.navigateByUrl('/home/crm/customer/detail/' + encodeId)
    }
    if (element.sourceRefValue === 'CULED') {
      let encodeId = await this.url.encode(obj);
      this.router.navigateByUrl('/home/crm/lead/detail/' + encodeId)
    }
    if (element.sourceRefValue === 'TAPSR') {
      let encodeId = await this.url.encode(obj);
      this.router.navigateByUrl('/home/trust/trust-application/dummy/' + encodeId);
    }
    if (element.sourceRefValue === 'TRSET') {
      this.storage.set('sourcePrimaryKey', element.sourcePrimaryKey);
      this.router.navigateByUrl('/home/trust/trust-settlement');
    }
    if (element.sourceRefValue === 'TRSWD') {
      this.storage.set('sourcePrimaryKey', element.sourcePrimaryKey);
      this.router.navigateByUrl('/home/trust/trust-withdrawal');
    }
    if (element.sourceRefValue === 'TRUST') {
      this.storage.set('sourcePrimaryKey', element.sourcePrimaryKey);
      this.router.navigateByUrl('/home/trust/trust-application')
    }

    if (element.sourceRefValue === 'ORGSC') {
      let encodeId = await this.url.encode(obj);
      this.router.navigateByUrl('/home/organization/organization-application/detail/' + encodeId)
    }
    if (element.sourceRefValue === 'LEASR') {
      let encodeId = await this.url.encode(obj);
      this.router.navigateByUrl('/home/legal/legal-other-service-detail/' + encodeId)
    }
    if (element.sourceRefValue === 'WILL') {
      let encodeId = await this.url.encode(obj);
      this.router.navigateByUrl('/home/will/will-application/' + encodeId)
    }
    if (element.sourceRefValue === 'WILL') {
      let encodeId = await this.url.encode(obj);
      this.router.navigateByUrl('/home/will/will-application/' + encodeId)
    }
  }
}