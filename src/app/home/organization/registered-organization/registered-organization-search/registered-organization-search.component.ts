import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { Router } from '@angular/router';
import { entOrganizationApplication, entOrganizationApplicationSearch, entOrganizationSearch } from '../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';

@Component({
  selector: 'app-registered-organization-search',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, CellHeaderDefDirective, IconButtonComponent, InnerScroll, InputControlComponent, SearchComponent, Row, FormsModule, AppDatePipe, ViewLabel, AddressEditComponent, AccoutsStatusTableComponent, AccoutsStatusTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './registered-organization-search.component.html',
  styleUrl: './registered-organization-search.component.scss'
})
export class RegisteredOrganizationSearchComponent {
  errorTrue = false
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('organization') organizationform!: NgForm
  searchParams = new entOrganizationSearch()
  searchParamsRAW = new entOrganizationSearch()
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
    sortColumns:'',
    sortOrder: false
  };
  organizationApplication = new entOrganizationApplication()
  organizationApplicationRAW = new entOrganizationApplication()
  @ViewChild('info', { static: false })
  info!: ElementRef;
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  columns: any = ['orgRefNo', 'organizationName', 'organizationTypeDescription', 'effectiveDate', 'statusDescription','action'];
  sortColumns: any = ['orgRefNo', 'organizationName', 'organizationTypeDescription', 'effectiveDate', 'statusDescription'];
  columnsName: any = [" Organization  Ref No", "Organization Name", "Organization Type", "Effective Date", "Status", "Action"];

  tableData: any = [
   
  ];

  constructor(
    public dialog: CoreService,
    public appService: AppService,
    public router: Router,
    public data: DataService,
    public initialData: InitialDataService,
    public apiService: ApplicationApiService,
    public urlService: UrlService,
  ) {

  }
  ngOnInit(): void {
    this.init();
  }
  async init() {
    await this.data.checkToken();
    this.appService.helpFile ='Registered%20Organization.pdf' 

    await this.initialData.getDDL('getOrganizationInitialData');
    this.createRegisteredOrganizationSearch()
  }
  createRegisteredOrganizationSearch(type?: any) {
    this.apiService.createNewOrganizationSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchRegisteredOrganization()

    })
  }
  searchRegisteredOrganization() {

    this.apiService.searchOrganization(this.searchParams).subscribe((success) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.result;
    })
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchRegisteredOrganization();

  }
  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.searchRegisteredOrganization();
    this.appSearch.close();

  }
  onSelect(event: any) {
    this.__selectedItems = event;
  }
  async createNewWillApplication() {
    // createEstateApplication
    // this.apiService.createEstateApplication().subscribe(async (success) => {
    // let dialogResponse: any = await this.dialog.openDialog(EstateApplicationFormComponent, {
    //   disableClose: true,
    //   height: '550px',
    //   width: '100%',
    //   maxWidth: '1170px',
    //   // data: {
    //   //   customer: success
    //   // }
    //   // });
    //   // console.log(dialogResponse);
    //   // if (dialogResponse) {
    //   //   this.navigateToDetail(dialogResponse.customerId);
    //   // }
    // })
  }
  async navigateToDetail(id: any) {
    let obj = {
      currentIndex: 0,
      array: [id]
    }
    let encodeId = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/organization/registered-organization/detail/' + encodeId);
  }



  async selectAllNavigate() {

    console.log(this.__selectedItems);

    if (this.__selectedItems.array.length === 0) {
      return;
    }
    let encodeId = await this.urlService.encode(this.__selectedItems);
    this.router.navigateByUrl('/home/organization/registered-organization/detail/' + encodeId);
  }
  clear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW))
    this.data.successMessage('Data Cleared Succesfully');
    this.searchParams.pageNumber = this.pagination.pageNumber;
    this.searchParams.pageSize = this.pagination.pageSize;
    this.searchRegisteredOrganization();
  }
}
