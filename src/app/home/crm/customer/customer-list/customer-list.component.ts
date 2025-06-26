import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  AppToolTipComponent,
  InnerScroll,
  Row,
} from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { entCustomerSearch } from '../../../../common/api-services/application-api/application-api.classes';
import { FormsModule, NgForm } from '@angular/forms';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { AppService } from '../../../../app.service';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CoreService } from '../../../../app-core/service/core.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { EncodeUrlPipe } from '../../../../common/pipes/encode-url/encode-url.pipe';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
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
    AppAccessDirective,
    ButtonAccessDirective,
    AppToolTipComponent,
    MatTooltipModule,
    AppDatePipe,
    NgClass
  ],
})
export class CustomerListComponent implements AfterContentInit {
  @Input() isSelectOnly = false;
  @Output() onSelect = new EventEmitter();
  options = {
    hideFullSpinner: true,
  };
  pageId = 'CUSTR';
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  columns: any = [
    'customerRefNo',
    'customerName',
    'genderDescription',
    'dateOfBrith',
    'contactNo',
    'statusdescription',
    'action',
  ];
  columnsName: any = [
    'Customer Ref No',
    'Customer Name',
    'Gender',
    'Date Of Birth',
    'Contact Number',
    'Status',
    '',
  ];
  sortColumnName: any[] = [
    'customerRefNo',
    'customerName',
    'genderDescription',
    'dateOfBrith',
    'contactNo',
    'statusdescription',
    '',
  ];
  tableData: any = [];
  idList: any = [];
  currentDate = '';
  isSelectedAll = false;
  @Input() public type: any = '';
  __selectedItems: any = {
    currentIndex: 0,
    array: [],
  };

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
    sortColumnName: '',
    sortOrder: false
  };
  errorTrue = false;

  searchParams = new entCustomerSearch();
  @Output('dataSelected') dataSelected: EventEmitter<any> = new EventEmitter();
  // @Input() public openStatus = true;

  constructor(
    public router: Router,
    public apiService: ApplicationApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public urlService: UrlService
  ) {

  }
  ngOnInit(): void {
    this.init();
  }

  ngAfterContentInit(): void {
    if (!this.isSelectOnly) {
      this.appService.helpFile = 'Customer.pdf';
      this.appService.setBreadCrumb(this.breadCrumb);
    }
    if (this.isSelectOnly) {
      this.columns = [
        'customerRefNo',
        'customerName',
        'genderDescription',
        'dateOfBrith',
        'contactNo',
        'statusdescription',
      ];
      this.columnsName = [
        'Customer Ref No',
        'Customer Name',
        'Gender',
        'Date Of Birth',
        'Contact Number',
        'Status'
      ];
    }
  }

  async init() {
    await this.data.checkToken();
    this.currentDate = this.appService.getCurrentDate();
    await this.initialData.getDDL('getInitialDataForCustomer', this.options);
    this.createCustomerSearch();
  }

  createCustomerSearch() {
    this.apiService.createNewCustomerSearch().subscribe((success) => {
      console.log(success);
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchCustomer();
    });
  }
  searchCustomer() {
    this.apiService.searchCustomer(this.searchParams).subscribe((success) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.result;
    });
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.searchParams.pageNumber = 1;
    this.searchCustomer();
    this.appSearch?.close();
  }

  doSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
  }

  pageChanged(event: any) {
    this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchCustomer();
  }

  async createNewCustomer() {
    this.apiService.createCustomer().subscribe(async (success) => {
      let dialogResponse: any = await this.dialog.openDialog(
        CustomerFormComponent,
        {
          disableClose: true,
          height: '550px',
          width: '100%',
          maxWidth: '1170px',
          data: {
            customer: success,
          },
        }
      );
      console.log(dialogResponse);
      if (dialogResponse) {
        this.navigateToDetail(dialogResponse.customerId);
      }
    });
  }

  async selectAllNavigate() {
    if (this.__selectedItems.array.length === 0) {
      return;
    }
    let encodeId = await this.urlService.encode(this.__selectedItems);
    this.router.navigateByUrl('/home/crm/customer/detail/' + encodeId);
  }

  async navigateToDetail(id: any) {
    let obj = {
      currentIndex: 0,
      array: [id],
    };
    let encodeId = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/crm/customer/detail/' + encodeId);
  }

  clear() {
    this.createCustomerSearch();
    this.data.successMessage('Data Cleared Successfully');
  }

  selectCustomer(event: any) {
    if (this.isSelectOnly) {
      this.onSelect.emit(event);
    }
  }

}
