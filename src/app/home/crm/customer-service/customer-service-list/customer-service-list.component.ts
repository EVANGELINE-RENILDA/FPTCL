import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { entCustomerServiceSearch } from '../../../../common/api-services/application-api/application-api.classes';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { AppService } from '../../../../app.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { FormsModule } from '@angular/forms';
import { InnerScroll, Row } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { CustomerServiceFormComponent } from '../customer-service-form/customer-service-form.component';
import { CoreService } from '../../../../app-core/service/core.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { AppDatePipe } from "../../../../common/pipes/app-date/app-date.pipe";
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-customer-service-list',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './customer-service-list.component.html',
  styleUrl: './customer-service-list.component.scss',
  imports: [AppTableComponent, CellDefDirective, IconButtonComponent, InnerScroll, InputControlComponent, SearchComponent, Row, FormsModule, CellHeaderDefDirective, AppDatePipe, AppAccessDirective, ButtonAccessDirective, MatTooltipModule]
})
export class CustomerServiceListComponent {
  btnAccess = ''
  appAccess = ''
  pageId = this.appAccess

  options = {
    hideFullSpinner: true
  }
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  columns: any = ["serviceRefNo", "customerName", "serviceTypeDescription", "branchDescription", "duration", "statusDescription", "leadCount", "action"];
  columnsName: any = ["Service No", "Service Date", "Service Type", "Service By", "Service Status", "Status", "No of Leads", ""];
  sortColumnName: any[] = ['serviceRefNo','customerName','serviceTypeDescription','branchDescription','duration','statusDescription','leadCount']
  customerColumns: any = ["serviceRefNo", "serviceDate", "serviceNote", "serviceBy", "statusDescription", "leadCount", "action"];
  customerColumnsName: any = ["Service No", "Serviced Date", "Short Description", "Serviced By", "Status", "No of Leads", ""];
  tableData: any = [];
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
    sortColumnName: '',
    sortOrder: false
  }
  @Input() isHideSelectedAll = false;
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };

  searchParams = new entCustomerServiceSearch();
  searchParamsRAW = new entCustomerServiceSearch();
  @Input() public customerId: any = 0;
  @Input() public buttonAccess: any = '';
  @Input() public accessApp: any = '';
  @Input() public type: any = '';
  // @Output('dataSelected') dataSelected: EventEmitter<any> = new EventEmitter();
  constructor(public router: Router,
    public apiService: ApplicationApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public searchDialog: CoreService,
    public urlService: UrlService
  ) {
    
  }
  ngOnInit(): void {
    if (this.buttonAccess !== '') {
      this.btnAccess = 'CrmCustAppCustServAddInfoBtn'
    }
    else {
      this.btnAccess = 'CrmCustServAppAddBtn'
    }
    if (this.accessApp !== '') {
      this.appAccess = 'CUSTR'
    }
    else {
      this.appAccess = 'CUSEV'
    }
    console.log(this.appAccess);
    console.log(this.btnAccess);
    this.init();

  }


  async init() {
    await this.data.checkToken();
 

    // await this.initialData.getAllInitialDataForCustomerService(this.options)
    this.initialData.getDDL('getInitialDataForCustomerService', this.options);
    this.createCustomerServiceSearch();
    if(this.appAccess === 'CUSTR'){
      this.appService.helpFile = 'Customer%20Detail.pdf'
    }
    if(this.appAccess === 'CUSEV'){
      this.appService.helpFile = 'Customer%20Service.docx.pdf'
    }
    if (this.customerId === 0) { this.appService.setBreadCrumb(this.breadCrumb); }



  }

  createCustomerServiceSearch() {
    this.apiService.createNewCustomerServiceSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchCustomerService();
    })
  }
  searchCustomerService() {
    if (this.customerId !== 0) {
      this.searchParams.customerId = this.customerId
    }
    this.apiService.searchCustomerService(this.searchParams).subscribe((success) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.result;
      this.dialog.closeDialog();
    })
  }

  doClear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.createCustomerServiceSearch()

    this.data.successMessage('Data Cleared Successfully')
  }
  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }
  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.searchParams.pageNumber = 1;
    this.searchCustomerService();

  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchCustomerService();

  }
  async createNewCustomerService() {
    const obj = {
      data: this.customerId
    }
    this.apiService.createCustomerService(obj).subscribe(async (success) => {
      if (this.customerId) {
        success.customerId = this.customerId
      }
      console.log(this.searchParams.customerId);
      this.data.showErrorMessage = false

      let dialogResponse: any = await this.searchDialog.openDialog(CustomerServiceFormComponent, {
        height: '550px',
        width: '100%',
        maxWidth: '1170px',
        data: {
          customer: success,
          customerServiceId: this.customerId
        }
      });

      if (dialogResponse) {
        this.navigateToDetail(dialogResponse.customerServiceId);

      }
    })
  }

  async selectAllNavigate() {

    if (this.__selectedItems.array.length === 0) {
      return;
    }
    let encodeId = await this.urlService.encode(this.__selectedItems);
    this.router.navigateByUrl('/home/crm/customer-service/detail/' + encodeId);
  }

  async navigateToDetail(id: any) {
    let obj = {
      currentIndex: 0,
      array: [id]
    }
    let encodeId = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/crm/customer-service/detail/' + encodeId);

  }




}