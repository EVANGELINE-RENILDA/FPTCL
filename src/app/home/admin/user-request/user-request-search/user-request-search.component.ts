import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  InnerScroll,
  Row,
  ViewLabel,
} from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { Router } from '@angular/router';
import {
  entOrganizationApplication,
  entOrganizationApplicationSearch,
} from '../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { ErrorInfoComponent } from '../../../../app-core/error-info/error-info.component';
import { entUserRequestSearch } from '../../../../common/api-services/admin-api/admin-api.classes';
import { AdminApiService } from '../../../../common/api-services/admin-api/admin-api.service';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { RoleAccessDirective } from '../../../../common/permission/role-access.directive';

@Component({
  selector: 'app-user-request-search',
  standalone: true,
  imports: [
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    IconButtonComponent,
    InnerScroll,
    InputControlComponent,
    SearchComponent,
    Row,
    FormsModule,
    AppDatePipe,
    ViewLabel,
    AddressEditComponent,
    AccoutsStatusTableComponent,
    AccoutsStatusTableComponent,
    AppAccessDirective,
    ButtonAccessDirective,
    RoleAccessDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-request-search.component.html',
  styleUrl: './user-request-search.component.scss',
})
export class UserRequestSearchComponent {
  pageId = 'URRSH';
  errorTrue = false;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('organization') organizationform!: NgForm;
  searchParams = new entUserRequestSearch();
  searchParamsRAW = new entUserRequestSearch();
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
    sortColumnName: '',
    sortOrder: false
  };
  organizationApplication = new entOrganizationApplication();
  organizationApplicationRAW = new entOrganizationApplication();
  @ViewChild('info', { static: false })
  info!: ElementRef;
  @ViewChild('l') lForm!: NgForm;
  __selectedItems: any = {
    currentIndex: 0,
    array: [],
  };

  orgRefNo: any;
  columns: any = [
    'requestRefNo',
    'fullName',
    'employeeCode',
    'requestedBy',
    'requestedDate',
    'requestStatusDescription',
    'action',
  ];
  sortColumns: any = [
    'requestRefNo',
    'fullName',
    'employeeCode',
    'requestedBy',
    'requestedDate',
    'requestStatusDescription',

  ];
  columnsName: any = [
    'Request Ref No',
    'Name',
    '	Employee Code',
    '	Requested By',
    'Requested Date',
    'Status',
    'Action',
  ];

  sortColumnName: any = [
    'Request Ref No',
    'Name',
    '	Employee Code',
    '	Requested By',
    'Requested Date',
    'Status',
  ];
  tableData: any = [];

  constructor(
    public dialog: CoreService,
    public appService: AppService,
    public router: Router,
    public data: DataService,
    public initialData: InitialDataService,
    public apiService: ApplicationApiService,
    public adminService: AdminApiService,
    public urlService: UrlService
  ) {
    this.appService.helpFile = 'User%20Request%20Search.docx.pdf';
  }
  ngOnInit(): void {
    this.init();
  }
  async init() {
    await this.data.checkToken();
    await this.initialData.getAdminDDL('getUserRequestInitialData');
    this.createOrganizationSearch();
  }
  createOrganizationSearch() {
    this.adminService.createNewUserRequestSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchOrganization();
    });
  }
  searchOrganization() {
    this.adminService
      .searchUserRequest(this.searchParams)
      .subscribe((success) => {
        this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
        this.tableData = success.searchResult;
      });
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.iblSortOrder = event.sortOrder;
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

  async navigateToDetail(id: any) {
    let obj = {
      currentIndex: 0,
      array: [id],
    };
    let encodeId = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/admin/user-request/detail/' + encodeId);
  }

  clear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.data.successMessage('Data Cleared Succesfully');
    this.searchOrganization();
  }
  closeAllDialog() {
    this.dialog.closeAll();
    this.data.showErrorMessage = false;
  }
  closeDialog() {
    this.dialog.closeDialog();
    this.data.showErrorMessage = false;
  }
}
