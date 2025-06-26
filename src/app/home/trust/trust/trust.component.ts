import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../app-core/template/app-table/app-table.component';
import { FormsModule } from '@angular/forms';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { SearchComponent } from '../../../app-core/template/search/search.component';
import { MenuAccessDirective } from '../../../common/permission/menu-access.directive';
import { AppAccessDirective } from '../../../common/permission/app-access.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../common/services/data/data.service';
import { AppStorageService } from '../../../common/services/app-storage/app-storage.service';
import { AppService } from '../../../app.service';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
import { CoreService } from '../../../app-core/service/core.service';
import { UrlService } from '../../../common/services/url/url.service';
import { StorageService } from '../../../common/services/storage/storage.service';
import { entTrust, entTrustSearch } from '../../../common/api-services/application-api/application-api.classes';
import { InnerScroll, Row } from '../../../app-core/core-component/core-component.component';
import { AccoutsStatusTableComponent } from '../../../app-core/template/accouts-status-table/accouts-status-table.component';

@Component({
  selector: 'app-trust',
  standalone: true,
  imports: [IconButtonComponent, AppTableComponent, CellDefDirective, CellHeaderDefDirective,FormsModule, InputControlComponent,AppDatePipe, MenuAccessDirective, AppAccessDirective,SearchComponent,InnerScroll, Row,AccoutsStatusTableComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trust.component.html',
  styleUrl: './trust.component.scss'
})
export class TrustComponent {
  @ViewChild('appSearch') appSearch!: SearchComponent;
  pageId= 'TAPSR'
  columns: any = ["trustApplRefNo",'applicant',"fileNo" ,'trustAccountNo',"startDate",'status', "action"];
  sortColumns: any = ["trustApplRefNo",'applicant',"fileNo" ,'trustAccountNo',"startDate"];
  columnsName: any = ['Trust Name','applicant','File No','Trust Account No','Start Date','Status','Action'];
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
    sortColumns:'',
    sortOrder: false
  };
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  errorTrue = false;
  searchParams = new entTrustSearch()
  searchParamsRAW = new entTrustSearch()
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  tableData: any = [];
  constructor(public router: Router,
    public apiService: ApplicationApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public urlService: UrlService,
    public storage: AppStorageService
  ) {

  }
  async ngOnInit(): Promise<void> {
    this.init();
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    await this.data.checkToken();
   await this.createTrustApplicationSearch();
   await this.initialData.getDDL('getInitialDataForTrust');
  }
  createTrustApplicationSearch(type?:any) {
    this.apiService.createNewTrustSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchTrustApplication();
      if(type === 'clear'){
        this.data.successMessage('Data Cleared Successfully')
      }
    })
  }
  searchTrustApplication() {
    this.apiService.searchTrust(this.searchParams).subscribe((success) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.result;
    })
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.searchTrustApplication();
    this.appSearch.close();
  }
  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchTrustApplication();
  }
  async selectAllNavigate() {
    if (this.__selectedItems.array.length === 0) {
      return; 
    }
    let encodeId = await this.urlService.encode(this.__selectedItems);
    this.router.navigateByUrl('/home/trust/trust-detail/' + encodeId);
  }

  async navigateToDetail(id: any) {
    let obj = {
      currentIndex: 0,
      array: [id]
    }
    let encodeId = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/trust/trust-detail/' + encodeId);
  }



}
