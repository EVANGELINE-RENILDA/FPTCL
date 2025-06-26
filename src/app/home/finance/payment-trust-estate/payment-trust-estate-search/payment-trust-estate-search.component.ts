import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppService } from '../../../../app.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { entTransactionPostingSearch } from '../../../../common/api-services/application-api/application-api.classes';
import { async } from 'rxjs';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { DatePipe } from '@angular/common';
import { CoreService } from '../../../../app-core/service/core.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';

@Component({
  selector: 'app-receipt-trust-and-estate-search',
  standalone: true,
  imports: [IconButtonComponent, AppTableComponent, SearchComponent, TableStatusSortComponent, InputControlComponent, InnerScroll, Row, CellDefDirective, CellHeaderDefDirective, ViewLabel,DatePipe,AccoutsStatusTableComponent,FormsModule,AppDatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './payment-trust-estate-search.component.html',
  styleUrl: './payment-trust-estate-search.component.scss'
})
export class PaymentTrustEstateSearchComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('l') lform!: NgForm;
  voucherConfigId: any = 0;
  branchName = ''
  currency: any;
  @ViewChild('appSearch') appSearch!: SearchComponent;


  columns: any = ["document", "event", "type", "customeracc", "branch", "paid", "paidAmount", "created", "status","action"];
  columnsName: any = ["event", "customerAccountNo", "documentNumber", "paymentNo", "accountType", "postingMatrix", "", "", "status",""];
  searchParams=new entTransactionPostingSearch();
  searchParamsRAW=new entTransactionPostingSearch();
  tableData: any = [];
  DDLBranch=[];
  errorTrue=false;
  eventddl:any;
  subeventddl:any;
  postingMatrixddl:any;
  documentddl=[];
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }

  constructor(
    public router: Router,
    public appService: AppService,
    public data: DataService,
    public initialData: InitialDataService,
    public apiService: ApplicationApiService,
    public dialog: CoreService,
    public storage:AppStorageService,
    public url: UrlService,

  ) {

  }

    ngOnInit(): void{
    this.init()
    }
    async init(){
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
    getPaymentTrustAndEstateVouchersCommonDDL(){
      this.apiService.getPaymentTrustAndEstateVouchersCommonDDL().subscribe((success)=>{
        this.documentddl=success.data[0].value;
      })
    }
    createPostingSearch(){
      this.apiService.createNewTransactionPostingSearch().subscribe((success)=>{
        this.searchParams=success;
        this.pagination.pageNumber=this.searchParams.pageNumber;
        this.pagination.pageSize=this.searchParams.pageSize;
        this.searchPosting();
      })
    }
    searchPosting(type?:any){
      this.searchParams.voucherTypeValue='PYMNT'

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
  pageChanged(event: any) {
    this.createPostingSearch();
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
  this.postingMatrixddl=success.data[0].value;
})
  }
  async openTransactionPosting(id:any){
    if (id > 0) {
      const obj = {
        data: id,

      };
      const encode = await this.url.encode(obj);
      this.router.navigateByUrl('/home/finance/payments-trust-and-estate/detail/'+ encode);
    }
    else {
      this.data.errorInfoMessage('Please select any one record to open');
    }
  }
  async createNewTransaction() {
    if (this.lform.valid) {
        const obj = {
          data: this.searchParams.voucherConfigId,
          type:'new'
        };
        let urlJson = await this.url.encode(obj);
        this.router.navigateByUrl
        ('/home/finance/payments-trust-and-estate/detail/'+ urlJson);

    }
    else{
      this.data.errorInfoMessage('Please Select Document Name');
      this.errorTrue = true;
    }
  }
  clear(){
    this.subeventddl=[],
     this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.searchPosting('clear');
    this.data.successMessage('Data Cleared Successfully')

  }

  navigateToTrust(){
    this.router.navigateByUrl('/home/trustee/finance-menus')
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
}
