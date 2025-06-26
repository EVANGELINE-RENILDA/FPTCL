
import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { entTransactionPostingSearch } from '../../../../common/api-services/application-api/application-api.classes';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { FormsModule, NgForm } from '@angular/forms';
import { StorageService } from '../../../../common/services/storage/storage.service';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';

@Component({
  selector: 'app-payments-trust-and-estate-search',
  standalone: true,
  imports: [IconButtonComponent, AppTableComponent, SearchComponent, TableStatusSortComponent, InputControlComponent, InnerScroll, Row, CellDefDirective, CellHeaderDefDirective, ViewLabel,AppDatePipe,FormsModule,AccoutsStatusTableComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
   templateUrl: './journal-trust-estate-search.component.html',
  styleUrl: './journal-trust-estate-search.component.scss'
})
export class JournalTrustEstateSearchComponent {
  @ViewChild('l') lform!: NgForm
  voucherConfigId: any = 0;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  errorTrue=false;
  pageId = 'FUDTN';
  searchParams=new entTransactionPostingSearch();
  searchParamsRAW=new entTransactionPostingSearch();
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  columns: any = ["document", "event", "type", "customeracc", "branch", "paid", "paidAmount", "created", "status","action"];
  columnsName: any = ["event", "customerAccountNo", "documentNumber", "paymentNo", "accountType", "postingMatrix", "", "", "status",""];
  eventddl:any;
  subeventddl:any;
  branchName = ''
  currency: any;

  postingMatrixddl:any;
  tableData: any = [];
  DDLBranch: any = [];
  documentddl: any;
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }

  constructor(
    public router: Router,
    public apiService: ApplicationApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public urlService: UrlService,
    public accountsService: AccountsApiService,
    public url: UrlService,
  public storage:AppStorageService) { }

  pageChanged(event: any) {
    this.createPostingSearch();
  }

  ngOnInit(): void {
    this.init();
  }
  async init() {
    await this.data.checkToken();
    await this.initialData.getDDL('getInitialDataForTranscationPosting');
    this.createPostingSearch();
    this.getListOfEventByEventId();

     this.getPaymentTrustAndEstateVouchersCommonDDL();
     await this.storage.get('branchFinance').then((val) => {
      this.branchName = val;
    });
    await this.storage.get('companyCurrencyValue').then((val) => {
      this.currency = val
    });

  }
  createPostingSearch(){
    const obj={
      data:this.searchParams.voucherConfigId
    }
    this.apiService.createNewTransactionPostingSearch(obj).subscribe((success)=>{
      this.searchParams=success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchPosting();
    })
  }
  searchPosting(type?:any){
    this.searchParams.voucherTypeValue='JURNL'

    this.apiService.searchTransactionPosting(this.searchParams).subscribe((success)=>{
      this.tableData=success.result;
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      if(type!=='clear'){
        this.dialog.closeDialog();

      }


    })
  }
  getListOfEventByEventId(){
    this.apiService.getListOfEventByEventId().subscribe((success)=>{
      this.eventddl=success.value;
    })
  }
  getListOfSubEventByEventId(val:any){

    const obj={
      data:val
    }
    this.apiService.getListOfSubEventByEventId(obj).subscribe((success)=>{
      this.subeventddl=success.value;
    })
  }
  getPostingMatrixByEventandSubEventId  (val:any){
    const obj={
      data1:this.searchParams.appEventId,
      data2:val
    }
  this.apiService.getPostingMatrixByEventandSubEventId (obj).subscribe((success)=>{
  this.postingMatrixddl=success.data;
})
  }
  // getTrustAndEstateVouchersCommonDDL(){
  //   this.apiService.getPaymentTrustAndEstateVouchersCommonDDL().subscribe((success)=>{
  //     this.documentddl=success;
  //   })
  // }
  clear(){
    this.subeventddl=[],
    // this.initialData.DDLValues.DDLAccountType=[]
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.searchPosting('clear');
    this.data.successMessage('Data Cleared Successfully')

  }
  async openTransactionPosting(id:any){
    if (id > 0) {
      const obj = {
        data: id,

      };
      const encode = await this.url.encode(obj);
      this.router.navigateByUrl('/home/finance/journal-trust-and-estate/detail/' + encode);
    }
    else {
      this.data.errorInfoMessage('Please select any one record to open');
    }
  }
  async navigateToDetail(id:any){
    const obj ={
      data:id
    }
    const encode = await this.url.encode(obj);
    this.router.navigateByUrl('/home/finance/journal-trust-and-estate/detail/' + encode);
  }
  getPaymentTrustAndEstateVouchersCommonDDL(){
    this.apiService.getJournalTrustAndEstateVouchersCommonDDL().subscribe((success)=>{
      this.documentddl=success.data[0].value;
    })
  }
  async createNewTransaction() {
    if (this.lform.valid) {
        const obj = {
          data: this.searchParams.voucherConfigId,
          type:'new'
        };
        let urlJson = await this.urlService.encode(obj);
        this.router.navigateByUrl(
          '/home/finance/journal-trust-and-estate/detail/' + urlJson
        );

    }
    else{
      this.data.errorInfoMessage('Please Select Document Name');
      this.errorTrue = true;
    }
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  navigateToTrust(){
    this.router.navigateByUrl('/home/trustee/finance-menus')
  }
}
