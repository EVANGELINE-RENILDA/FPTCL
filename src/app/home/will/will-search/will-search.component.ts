import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { InnerScroll, Row, ViewLabel } from '../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { SearchComponent } from '../../../app-core/template/search/search.component';
import { FormsModule } from '@angular/forms';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { AccoutsStatusTableComponent } from '../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { CheckboxComponent } from '../../../app-core/template/checkbox/checkbox.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../common/services/data/data.service';
import { AppStorageService } from '../../../common/services/app-storage/app-storage.service';
import { AppService } from '../../../app.service';
import { DialogAnimateService } from '../../../common/services/dialog-animated/dialog-animate.service';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
import { CoreService } from '../../../app-core/service/core.service';
import { UrlService } from '../../../common/services/url/url.service';
import { entWillApplication, entWillApplicationSearch, entWillSearch } from '../../../common/api-services/application-api/application-api.classes';

@Component({
  selector: 'app-will-search',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, CellHeaderDefDirective, IconButtonComponent, 
    InnerScroll, InputControlComponent, SearchComponent, Row, FormsModule, AppDatePipe, 
    AccoutsStatusTableComponent, ViewLabel, CheckboxComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './will-search.component.html',
  styleUrl: './will-search.component.scss'
})
export class WillSearchComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  searchParams = new entWillSearch();
  searchParamsRAW = new entWillSearch();
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
  columns: any = ['willApplRefNo', 'applicant', 'beneficiary','testator', 'fileNo','createdDate', 'action'];
  sortColumns: any = ['willApplRefNo', 'applicant', 'beneficiary','testator', 'fileNo','createdDate' ];
  columnsName: any = ["Will App Ref No", "Applicant Name", "Beneficiary Name",'Testator', "File No","Created Date", "Action"];

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
    await this.initialData.getDDL('getInitialDataForWill');
    this.createWillSearch();

  }

  createWillSearch(type?: any) {
    this.apiService.createNewWillSearch().subscribe((success) => {
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
    this.apiService.searchWill(this.searchParams).subscribe((success) => {
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

  
 
  async selectAllNavigate() {

    if (this.__selectedItems.array.length === 0) {
      return;
    }
    let encodeId = await this.urlService.encode(this.__selectedItems);
    this.router.navigateByUrl('/home/will/detail/' + encodeId);
  }
  async navigateToDetail(id: any) {
    let obj = {
      currentIndex: 0,
      array: [id]
    }
    let encodeId = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/will/detail/' + encodeId);

  }

}
