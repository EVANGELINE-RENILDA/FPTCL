import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { FormsModule, NgForm } from '@angular/forms';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { Router } from '@angular/router';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { entOrganizationApplication, entOrganizationApplicationSearch } from '../../../../common/api-services/application-api/application-api.classes';
import { UrlService } from '../../../../common/services/url/url.service';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { ErrorInfoComponent } from '../../../../app-core/error-info/error-info.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';

@Component({
  selector: 'app-organization-application-search',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, CellHeaderDefDirective, IconButtonComponent, InnerScroll, InputControlComponent, SearchComponent, Row, FormsModule, AppDatePipe, ViewLabel, AddressEditComponent, AccoutsStatusTableComponent, ErrorInfoComponent, ErrorMessageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './organization-application-search.component.html',
  styleUrl: './organization-application-search.component.scss'
})
export class OrganizationApplicationSearchComponent {
  errorTrue = false
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('organization') organizationform!: NgForm
  searchParams = new entOrganizationApplicationSearch()
  searchParamsRAW = new entOrganizationApplicationSearch()
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
  columns: any = ['applicationRefNo', 'organizationName', 'organizationTypeDescription', 'effectiveDate', 'statusDescription', 'action'];
 sortColumns: any = ['applicationRefNo', 'organizationName', 'organizationTypeDescription', 'effectiveDate', 'statusDescription'];
  columnsName: any = [" Organization App Ref No", "Organization Name", "Organization Type", "Effective Date", "Status", "Action"];

  tableData: any = [
    //   {
    //   'refNo': 'OA240500002', 'name': 'MMF Tech', 'type': 'Medical', 'date': '21 Jul 2024', 'status': 'Approved',
    // }, {
    //   'refNo': 'OA240400006', 'name': 'BMW Vehicle Insurance', 'type': '	Motor', 'date': '	04 Apr 2024', 'status': 'Cancel',
    // },
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
     this.appService.helpFile ='Organization%20Application.pdf'
    await this.initialData.getDDL('getOrganizationApplicationInitialData');
    this.createOrganizationSearch()
  }
  createOrganizationSearch(type?: any) {
    this.apiService.createNewOrganizationApplicationSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;

      if (type === 'clear') {
        this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW))
        this.data.successMessage('Data Cleared Succesfully')
      }
      this.searchOrganization()
    })
  }
  searchOrganization() {
    this.searchParams.applicationTypeValue = 'NEWOA'
    this.apiService.searchOrganizationApplication(this.searchParams).subscribe((success) => {
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
    this.searchOrganization();

  }
  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.searchOrganization();
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
    this.router.navigateByUrl('/home/organization/organization-application/detail/' + encodeId);
  }
  createNewOrganization(type?: any) {
    this.errorTrue = false;
    this.apiService.createOrganizationApplication().subscribe((success) => {
      this.organizationApplication = success;

      if (type === 'clear') {
        this.data.successMessage('Data Cleared Successfully')
      }
      else {
        this.orgInfo(success);
      }
    })

  }
  async orgInfo(success: any) {
    let dialogResponse: any = await this.dialog.openDialog(this.info, {
      height: '550px',
      width: '1000px',
      maxWidth: '1170px',
      data: {
        organization: success
      }
    });
    console.log(dialogResponse);
    if (dialogResponse) {
      this.navigateToDetail(dialogResponse.organizationApplicationId);
    }
  }
  saveOrganization() {

    if (this.organizationform.valid) {
      this.organizationApplication.branchId = this.appService.userData.branchId
      this.apiService.saveOrganizationApplication(this.organizationApplication).subscribe((success) => {
        this.navigateToDetail(success.organizationApplicationId);
        this.dialog.closeAll();
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  async selectAllNavigate() {

    console.log(this.__selectedItems);

    if (this.__selectedItems.array.length === 0) {
      return;
    }
    let encodeId = await this.urlService.encode(this.__selectedItems);
    this.router.navigateByUrl('/home/organization/organization-application/detail/' + encodeId);
  }

}

