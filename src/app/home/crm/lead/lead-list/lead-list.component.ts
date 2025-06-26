import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { entCustomerServiceLeadSearch, entCustomerServiceLeadSearchResult } from '../../../../common/api-services/application-api/application-api.classes';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../../../app.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { FormsModule } from '@angular/forms';
import { InnerScroll, Row } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { CoreService } from '../../../../app-core/service/core.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { LeadFormComponent } from '../lead-form/lead-form.component';

import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-lead-list',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, IconButtonComponent, InnerScroll, InputControlComponent, SearchComponent, Row, FormsModule, CellHeaderDefDirective, AppDatePipe, AppAccessDirective, ButtonAccessDirective, MatTooltipModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lead-list.component.html',
  styleUrl: './lead-list.component.scss'
})
export class LeadListComponent {
  @Input() public accessInBtns: any = '';
  @Input() public accessInApp: any = '';
  @Input() public type: any = '';
  appAccessForLead = '';
  btnAccessForAdd = '';



  pageId = this.appAccessForLead
  options = {
    hideFullSpinner: true
  }
  idList: any = [];
  @Input() isHideSelectedAll = false;
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  columns: any = ["leadRefNo", "serviceRefNo", "customerName", "leadTypeDescription", "productTypeDescription", "createdDate", "statusDescription", "action"];
  columnsName: any = ["Lead No", "Service No", "Customer Name", "Lead Type", "Product Type", "Created Date", "Status", ""];
  sortColumnName: any[] = ["leadRefNo", "serviceRefNo", "customerName", "leadTypeDescription", "productTypeDescription", "createdDate", "statusDescription"]
  serviceColumns: any = ["leadRefNo", "productTypeDescription", "description", "statusDescription", "action"];
  serviceColumnsName: any = ["Lead No", "Product Type", "Lead Description", "Lead Status", ""];
  tableData: any = [];
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,  sortColumnName: '',
    sortOrder: false
  }

  searchParams = new entCustomerServiceLeadSearch();
  searchParamsRAW = new entCustomerServiceLeadSearch();
  @Input() public customerId: any = 0;
  @Input() public customerRef: any = 0;
  @Input() public serviceRef: any = 0;
  @Input() public serviceId: any = 0;
  @Input() public serviceFlag: any = '';
  @Input() public serviceStatus: any = '';

  constructor(public router: Router,
    public apiService: ApplicationApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public dialog: CoreService,
    public url: UrlService,
    public initialData: InitialDataService
  ) {
  
  }
  ngOnInit(): void {
    if (this.accessInApp !== '') {
      this.appAccessForLead = this.accessInApp
    }
    else {
      this.appAccessForLead = 'CULED'
    }
    if (this.accessInBtns !== '') {
      this.btnAccessForAdd = this.accessInBtns
    }
    else {
      this.btnAccessForAdd = 'CrmCustAppCustLeadAddInfoBtn'
    }

    this.init();
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getDDL('getInitialDataForLead', this.options);
    this.createLeadSearch();
    if(this.appAccessForLead === 'CULED'){
      this.appService.helpFile = 'Lead.pdf'
    }
    else{
      this.appService.helpFile = "Customer%20Service%20Detail.docx.pdf"
    }
    if (this.customerId === 0 && this.serviceId === 0) {
      this.appService.setBreadCrumb(this.breadCrumb);
    }

    console.log(this.serviceFlag);


  }

  createLeadSearch() {
    this.apiService.createNewCustomerServiceLeadSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchLead();
    })
  }
  searchLead() {

    if (this.customerRef !== 0) {
      this.searchParams.customerRefNo = this.customerRef
    }

    if (this.serviceRef !== 0) {
      this.searchParams.serviceRefNo = this.serviceRef
    }

    this.apiService.searchCustomerServiceLead(this.searchParams).subscribe((success) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.result;
    })
  }
  
  onSearch() {
    
    this.searchParams.pageNumber = 1;
    this.searchLead();
    this.data.successMessage('Search Executed Successfully');
    this.appSearch?.close();
    this.dialog.closeAll()
    // this.appSearch.close();
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchLead();
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }
  async createNewLead() {
    const obj = {
      data1: this.customerId,
      data2: this.serviceId,
      data3: 0,
      data4: ''
    }
    this.apiService.createLead(obj).subscribe(async (success) => {

      if (this.customerRef) {
        success.customerRefNo = this.customerRef
      }

      if (this.serviceRef) {
        success.serviceRefNo = this.serviceRef
      }
      console.log(this.searchParams.customerRefNo);
      this.data.showErrorMessage = false
      let dialogResponse: any = await this.dialog.openDialog(LeadFormComponent, {
        height: '550px',
        width: '100%',
        maxWidth: '1170px',
        data: {
          customer: success,
          customerId: this.customerId,
          serviceId: this.serviceId
          // serviceNoDDL: success.ientDDL.value
        }
      });
      // console.log(dialogResponse);
      if (dialogResponse) {
        this.navigateToDetail(dialogResponse.leadId);
      }
    })
  }

  async selectAllNavigate() {
    if (this.__selectedItems.array.length === 0) {
      return;
    }
    let encodeId = await this.url.encode(this.__selectedItems);
    this.router.navigateByUrl('/home/crm/lead/detail/' + encodeId);
  }

  async navigateToDetail(id: any) {
    let obj = {
      currentIndex: 0,
      array: [id]
    }
    let encodeId = await this.url.encode(obj);
    this.router.navigateByUrl('/home/crm/lead/detail/' + encodeId);
  }
  doClear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.data.successMessage("Data Cleared Successfully");
    // this.dialog.closeDialog()
    this.searchLead()
  }

}
