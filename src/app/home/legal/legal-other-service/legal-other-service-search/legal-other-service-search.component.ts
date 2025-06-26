import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { Router } from '@angular/router';
import { DataService } from '../../../../common/services/data/data.service';
import { entLegalApplication, entLegalApplicationSearch, entLegalApplicationSearchResultSet } from '../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';

@Component({
  selector: 'app-legal-other-service-search',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, CellHeaderDefDirective, IconButtonComponent, InnerScroll, InputControlComponent, SearchComponent, Row, FormsModule, AppDatePipe, AccoutsStatusTableComponent, ViewLabel],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './legal-other-service-search.component.html',
  styleUrl: './legal-other-service-search.component.scss'
})
export class LegalOtherServiceSearchComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  searchParams = new entLegalApplicationSearch()
  legalService = new entLegalApplication();
  errorTrue = false
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
  @ViewChild('appSearch') appSearch!: SearchComponent;
  columns: any = ['legalApplRefNo', 'dob', 'paper', 'date', 'actionStatusDescription', 'assignedOfficer', 'action'];
  columnsName: any = ["Legal App Ref No", "Applicant Name", "Applicant CRM No", "Applied Branch", "Action Status", "Assigned Officer", "Action"];

  tableData: any = [];
  @ViewChild('willInfo', { static: false })
  willInfo!: ElementRef;
  constructor(public router: Router,
    public apiService: ApplicationApiService,
    public data: DataService,
    public appService: AppService,
    public dialog: CoreService,
    public url: UrlService,
    public initialData: InitialDataService
  ) {
    this.appService.helpFile ='Legal%20&%20Other%20Service%20Search.pdf'
  }
  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  async init() {
    await this.data.checkToken();
    await this.initialData.getDDL('getInitialDataForLegalApplication');
    this.createLegalSearch();

  }
  searchLegalService() {
    this.apiService.searchLegalApplication(this.searchParams).subscribe((success) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.result;
      this.appSearch?.close()
    })
  }
  createLegalSearch(type?:any) {
    this.apiService.createNewLegalApplicationSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      if(type === 'clear'){
        this.apiService.searchLegalApplication(this.searchParams).subscribe((success) => {
          this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
          this.tableData = success.result;
        })
        this.data.successMessage('Data Cleared Successfully')
      }
      if(type !== 'clear'){
        
      this.searchLegalService();
      }
    })
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchLegalService();

  }

  onSelect(event: any) {
    this.__selectedItems = event;
  }

  async navigateToDetail(id: any) {
    let obj = {
      currentIndex: 0,
      array: [id]
    }
    let encodeId = await this.url.encode(obj)
    this.router.navigateByUrl('/home/legal/legal-other-service-detail/' + encodeId);
  }
  async selectAllNavigate() {
    if (this.__selectedItems.array.length === 0) {
      return;
    }
    let encodeId = await this.url.encode(this.__selectedItems);
    this.router.navigateByUrl('/home/legal/legal-other-service-detail/' + encodeId);

  }
  @ViewChild('x') xForm!: NgForm;
  saveLegalService() {
    if (this.xForm.valid) {

      this.apiService.saveLegalApplication(this.legalService).subscribe((success) => {
        this.legalService = success
        this.navigateToDetail(success.legalApplicationId);
        this.dialog.closeAll();
        this.data.showErrorMessage = false
      })
    }
    else {
      this.errorTrue = true
    }
  }
  clear() {
    const obj = {
      data: this.legalService.leadId
    }
    this.apiService.createLegalApplication(obj).subscribe(async (success) => {
      this.legalService = success;
      this.data.successMessage('Data Cleared Successfully')
    })
  }
  trustLeadId: any = '';
  @ViewChild('l') lForm!: NgForm;
  async createNewWillApplication() {
    const obj = {
      data: this.trustLeadId
    }
    if (this.lForm.valid) {
      this.apiService.createLegalApplication(obj).subscribe(async (success) => {
        this.legalService = success
        let dialogResponse: any = await this.dialog.openDialog(this.willInfo, {
          disableClose: true,
          height: '300px',
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

}
