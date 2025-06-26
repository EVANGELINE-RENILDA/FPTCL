import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { FormsModule, NgForm } from '@angular/forms';
import { InnerScroll, Row } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { entCustomerSearch, entDeathNotice, entDeathNoticeSearch } from '../../../../common/api-services/application-api/application-api.classes';
import { UrlService } from '../../../../common/services/url/url.service';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-death-notice-search',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, CellHeaderDefDirective, IconButtonComponent, InnerScroll, InputControlComponent, SearchComponent, Row, FormsModule, AppDatePipe, ErrorMessageComponent, AddressEditComponent, MatTooltipModule],
  templateUrl: './death-notice-search.component.html',
  styleUrl: './death-notice-search.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeathNoticeSearchComponent {
  editData = true
  errorTrue = false
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  columns: any = ['deathNoticeRefNo', 'personName', 'dateOfDeath', 'paperDescription', 'noticeDate','assignedOfficer', 'statusDescription', 'action'];
  columnsName: any = ["Notice Ref No", "Person Name", "Date Of Death", "Paper", "Notice Date",'Assigned Officer', "Status", "Action"];
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  tableData: any = [];
  @ViewChild('deathDialog', { static: false })
  deathDialog!: TemplateRef<any>;
  options = {
    hideFullSpinner: true
  }
  @ViewChild('x') xform!: NgForm
  @ViewChild('b') bform!: NgForm
  searchParams = new entDeathNoticeSearch();
  searchParamsRAW = new entDeathNoticeSearch();
  deathNoticeData = new entDeathNotice();
  deathNoticeDataRAW = new entDeathNotice();
  currentDate = '';
  constructor(
    public dialog: CoreService,
    public data: DataService,
    public appService: AppService,
    public initialData: InitialDataService,
    public apiService: ApplicationApiService,
    public url: UrlService,
    public router: Router
  ) {

  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  ngOnInit(): void {
    this.init()
  }
  async init() {
    await this.data.checkToken();
    this.currentDate = this.appService.getCurrentDate();
    this.initialData.getDDL('getInitialDataForDeathNotice', this.options);
    await this.loadProvinceDDL();
    await this.initialData.getDDL('getInitialDataForCustomer');
    this.createDeathNoticeSearch();
  }
  ProvinceDDL:any
  loadProvinceDDL(){
    this.apiService.loadAllMProvince().subscribe((success)=>{
      this.initialData.DDLValues.DDLProvince = success.value
    })
  }
  createDeathNoticeSearch(type?: any) {
    this.apiService.createNewDeathNoticeSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      if (type === 'clear') {
        this.data.successMessage('Data Cleared Successfuly');
        this.apiService.searchDeathNotice(this.searchParams).subscribe((success) => {
          this.pagination = success
          this.tableData = success.result;})
      }
      else {

        this.searchDeathNotice()
      }
    })
  }
  searchDeathNotice() {
    this.apiService.searchDeathNotice(this.searchParams).subscribe((success) => {
      this.pagination = success
      this.tableData = success.result;
      this.dialog.closeDialog();
    })
  }
  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.sortColumn = event.sortColumnName;
    this.searchParams.sortOrder = event.sortOrder;
    this.searchDeathNotice();

  }
  onSelect(event: any) {
    this.__selectedItems = event;
  }

  async selectAllNavigate() {

    if (this.__selectedItems.array.length === 0) {
      return;
    }
    let encodeId = await this.url.encode(this.__selectedItems);
    this.router.navigateByUrl('/home/estate/death-notice-detail/' + encodeId);
  }
  async navigateToDetail(id: any) {
    let obj = {
      currentIndex: 0,
      array: [id]
    }
    let encodeId = await this.url.encode(obj);
    this.router.navigateByUrl('/home/estate/death-notice-detail/' + encodeId);

  }

  closeDialog() {
    this.data.showErrorMessage = false;
    this.dialog.closeAll()
  }

  editValues() {
    this.editData = true;
    this.data.showErrorMessage = false
  }


  //customer
  customerColumns: any = ["customerRefNo", "customerName", "genderDescription", "dateOfBrith", "emailId", "contactNo", "statusdescription", "action"];
  customerColumnsName: any = ["Customer No", "Customer Name", "Gender", "Date Of Birth", "Email ID", "Contact Number", "Status", ""];
  customertableData: any = [];
  customer = new entCustomerSearch();
  // searchParams = new entWillApplicationSearch();
  // searchParamsRAW = new entWillApplicationSearch();

  createCustomerSearch() {
    this.apiService.createNewCustomerSearch().subscribe((success: any) => {
      this.customer = success;
      this.customer.pageNumber = this.pagination.pageNumber;
      this.customer.pageSize = this.pagination.pageSize;
      this.searchCustomer();
    })
  }
  searchCustomer() {
    this.apiService.searchCustomer(this.customer).subscribe((success: any) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.customertableData = success.result;

    })
  }

  pageChanged1(event: any) {
    this.customer.pageNumber = event.pageNumber;
    this.customer.pageSize = event.pageSize;
    this.searchCustomer();
  }
  openCustomer(val: any) {
    const obj = {
      data: val,
    };
    this.apiService.openCustomer(obj).subscribe((success) => {
this.deathNoticeData.ientCustomer = success
    })
  }
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('customerSearchDialog', { static: false })
  customerSearchDialog!: TemplateRef<any>;
  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.customer.pageNumber = 1;
    this.searchCustomer();
    this.appSearch?.close()
  }
  clear() {
    this.createCustomerSearch();
    this.data.successMessage('Data Cleared Successfully')
  }
  dialogName:any
  async customerSearch() {
   this.createCustomerSearch()
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.customerSearchDialog, {
      height: '500px',
      width: '1050px',
      maxWidth: '1170px',

    });
    // this.createClientCustomer = true
    if (dialogResponse) {

    }
  }
  closeAllDialogs(){
    this.dialog.closeAll();
    this.data.showErrorMessage = false
  }

  async editApplication() {
    // this.applicationEdit = true;
    this.createDeathNotice()
    let response: any = await this.dialog.openDialog(this.deathDialog, {
      height: '600px',
      width: '100%',
      maxWidth: '1100px',
    });
  }
  saveApplication() {
    if (this.bform.valid) {
      this.apiService.saveDeathNotice(this.deathNoticeData).subscribe((success) => {
        this.deathNoticeData = success;
        this.data.showErrorMessage = false;
        // this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.navigateToDetail(success.deathNoticeId);
        this.dialog.closeAll()
      })
    }
    else {
      this.errorTrue = true
      this.data.errorInfoMessage('Please Enter all the Mandatory Fields')
    }
  }
  clearDeathNotice(){
    this.deathNoticeData = JSON.parse(JSON.stringify(this.deathNoticeDataRAW));
    this.createDeathNotice()  
    this.data.successMessage('Data Cleared Successfully');

      }
      createDeathNotice(){
        this.apiService.createDeathNotice().subscribe((success)=>{
          this.deathNoticeData = success;
          this.errorTrue = false;
        })
      }
      onSearch1() {
        this.data.successMessage('Search Executed Successfully');
        this.customer.pageNumber = 1;
        this.searchCustomer();
        this.appSearch?.close()
      }
      dialogClose(){
        this.data.showErrorMessage = false;
        this.dialog.closeDialog()
      }
      openCustomerInSearch(val: any) {
        const obj = {
          data: val,
        };
        this.apiService.openCustomer(obj).subscribe((success) => {
          this.deathNoticeData.ientCustomer = success;
          this.deathNoticeData.personId = success.customerId;
          this.dialog.closeDialog()
        })}
}
