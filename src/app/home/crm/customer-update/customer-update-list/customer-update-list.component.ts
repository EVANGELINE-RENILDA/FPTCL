import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppToolTipComponent, InnerScroll, Row } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { entCustomerUpdate, entCustomerUpdateSearch } from '../../../../common/api-services/application-api/application-api.classes';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { CoreService } from '../../../../app-core/service/core.service';
import { CustomerUpdateFormComponent } from '../customer-update-form/customer-update-form.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';

@Component({
  selector: 'app-customer-update-list',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, IconButtonComponent, InnerScroll, InputControlComponent, SearchComponent, Row, FormsModule, CellHeaderDefDirective, AppDatePipe, AppAccessDirective, ButtonAccessDirective, AppToolTipComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './customer-update-list.component.html',
  styleUrl: './customer-update-list.component.scss'
})
export class CustomerUpdateListComponent {
  appAccess = '';
  btnAccess = '';
  @Input() public buttonAccess: any = '';
  @Input() public accessApp: any = '';
  pageId = this.appAccess;
  options = {
    hideFullSpinner: true
  }
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  idList: any = [];
  isSelectedAll = false;
  @Input() isHideSelectedAll = false;
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  @ViewChild('appSearch') appSearch!: SearchComponent;
  columns: any = ["customerUpdateRefno", "customerName", "genderDescription", "dateOfBrith", "createdDate", "statusdescription", "action"];
  sortColumnName: any = ["customerUpdateRefno", "customerName", "genderDescription", "dateOfBrith", "createdDate", "statusdescription"];
  columnsName: any = ["Customer Update No", "Customer Name", "Gender", "Date Of Birth", "createdDate", "Status", ""];
  customerColumns: any = ["customerUpdateRefno", "createdByFullname", "createdDate", "statusdescription", "action"];
  customerColumnsName: any = ["Customer Update No", "Created By", "Created Date", "Status", ""];
  tableData: any = [];
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }



  @Input() public customerId: any = 0;
  @Input() public customerUpdateBtn: any = '';
  @Input() public type: any = '';
  searchParams = new entCustomerUpdateSearch();
  searchParamsRAW = new entCustomerUpdateSearch();
  customerUpdate = new entCustomerUpdate()

  constructor(public router: Router,
    public apiService: ApplicationApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public dialog: CoreService,
    public initialData: InitialDataService,
    public url: UrlService
  ) {
 
   
  }
  ngOnInit(): void {
    if (this.buttonAccess !== '') {
      this.btnAccess = 'CrmCustAppUpdateInfoBtn'
    }
    else {
      this.btnAccess = 'CustUpAppAddBtn'
    }
    if (this.accessApp !== '') {
      this.appAccess = 'CUSTR'
    }
    else {
      this.appAccess = 'CUSUP'
    }

    console.log(this.btnAccess);
    console.log(this.appAccess);

    this.init();
  }

  async init() {
    await this.data.checkToken();
    console.log(this.appAccess);
    
    if(this.appAccess === 'CUSTR'){
      this.appService.helpFile = 'Customer%20Detail.pdf'
      
    }
    if(this.appAccess === 'CUSUP'){
      this.appService.helpFile = 'Customer%20Update.pdf';
    }
    this.initialData.getDDL('getInitialDataForCustomerUpdate', this.options);
    this.createCustomerUpdateSearch();
    if (this.customerId === 0) {
      this.appService.setBreadCrumb(this.breadCrumb);
    }
  }

  createCustomerUpdateSearch() {
    this.apiService.createNewCustomerServiceLeadSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchCustomerUpdate();
    })
  }
  searchCustomerUpdate() {
    if (this.customerId !== 0) {
      this.searchParams.customerRefNo = this.customerId
    }
    this.apiService.searchCustomerUpdate(this.searchParams).subscribe((success) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.result;
      this.appSearch?.close();

    })
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.searchCustomerUpdate();

  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchCustomerUpdate();

  }
  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }
  doClear() {
    this.createCustomerUpdateSearch()
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.dialog.closeDialog()
    this.data.successMessage('Data Cleared Successfully')
  }

  async selectAllNavigate() {

    if (this.__selectedItems.array.length === 0) {
      return;
    }
    let encodeId = await this.url.encode(this.__selectedItems);
    this.router.navigateByUrl('/home/crm/customer-update/detail/' + encodeId);
  }

  async navigateToDetail(id: any) {
    let obj = {
      currentIndex: 0,
      array: [id]
    }
    let encodeId = await this.url.encode(obj);
    console.log(obj);

    this.router.navigateByUrl('/home/crm/customer-update/detail/' + encodeId);
  }
  createCustomerUpdate() {
    const obj = {
      data: this.customerId
    }
    this.apiService.getCustomerDatailsbeasedOnCustomerNo(obj).subscribe(async (success) => {
      this.data.showErrorMessage = false

      let dialogResponse: any = await this.dialog.openDialog(CustomerUpdateFormComponent, {
        disableClose: true,
        height: '550px',
        width: '100%',
        maxWidth: '1170px',
        data: {
          customer: success
        }
      });
      console.log(dialogResponse);
      if (dialogResponse) {
        console.log(dialogResponse);
        this.navigateToDetail(dialogResponse.customerUpdateId);
      }
    })
  }
  clearSearch() {
    this.appSearch.close()
    this.data.successMessage('Data Cleared Successfully');
    this.appSearch.close()
  }
}