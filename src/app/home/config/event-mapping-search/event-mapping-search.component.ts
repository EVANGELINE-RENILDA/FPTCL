import { NgClass } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  InnerScroll,
  Row,
  AppToolTipComponent,
  ViewLabel,
} from '../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../app-core/table-status-sort/table-status-sort.component';
import { AccoutsStatusTableComponent } from '../../../app-core/template/accouts-status-table/accouts-status-table.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../app-core/template/app-table/app-table.component';
import { PaginatorComponent } from '../../../app-core/template/app-table/paginator/paginator.component';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../app-core/template/search/search.component';
import { StatusHistoryComponent } from '../../../app-core/template/status-history/status-history.component';
import { AppAccessDirective } from '../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../app-core/service/core.service';
import { AppService } from '../../../app.service';
import { AccountsApiService } from '../../../common/api-services/accounts-api/accounts-api.service';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { AppSettingsService } from '../../../common/services/app-settings/app-settings.service';
import { AppStorageService } from '../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../common/services/data/data.service';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../common/services/url/url.service';
import {
  entEventMapping,
  entEventMappingSearch,
} from '../../../common/api-services/application-api/application-api.classes';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxComponent } from '../../../app-core/template/checkbox/checkbox.component';

@Component({
  selector: 'app-event-mapping-search',
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
    AppAccessDirective,
    ButtonAccessDirective,
    AppToolTipComponent,
    MatTooltipModule,
    TableStatusSortComponent,
    AppDatePipe,
    AccoutsStatusTableComponent,
    PaginatorComponent,
    StatusHistoryComponent,
    NgClass,
    CheckboxComponent,
    ViewLabel,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './event-mapping-search.component.html',
  styleUrl: './event-mapping-search.component.scss',
})
export class EventMappingSearchComponent {

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
  };

  __selectedItems: any = {
    currentIndex: 0,
    array: [],
  };

  pageId = 'FUDTN';
  errorTrue = false;

  tableData = [];
  subEventDDL = [];
  DDLEvent = [];
  postMatrixDDl = [];
  casAccountType:any = [];
  companySymbolValue = ''

  searchParams = new entEventMappingSearch();
  searchParamsRAW = new entEventMappingSearch();
  eventMapping = new entEventMapping();

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('openEventMapping') openEventMapping!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('p') pform!: NgForm;

  columns = [
    'vouchertypedescription',
    'eventName',
    'createdDate',
    'postingMatrix',
    'filetypedescription',
    'action',
  ];
  columnsName = [
    'Voucher Type',
    'EventName',
    'Created Date',
    'Posting Matrix Description',
    'File Type',
    'Action',
  ];

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
    public appSettings: AppSettingsService,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    await this.data.checkToken();
    this.initialData.getDDL('getInitialDataForEventMapping');
    // this.getAccountType()
    this.companySymbolValue  = await this.appStorage.get('companySymbolValue');
    this.createNewEventMapping();
    this.getListOfEventByEventId();
    this.createNewEventMappingSearch();
  }

  createNewEventMappingSearch() {
    this.apiService.createNewEventMappingSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchEventMapping();
    });
  }
  searchEventMapping() {
    this.apiService
      .searchEventMapping(this.searchParams)
      .subscribe((success) => {
        this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
        this.tableData = success.result;
      });
  }

  onSearch() {
    if(Number(this.searchParams.bankFeeValueFrom) <= Number(this.searchParams.bankFeeValueTo)){
      this.searchParams.pageNumber = 1;
      this.searchEventMapping();
      this.appSearch?.close();
    } else{
      this.data.errorInfoMessage('Please Check Bank Fee Value From Greater than Bank Fee Value to')
      console.log('working Fine');
      
    }
  }

  clear() {
    this.errorTrue = false;
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.createNewEventMappingSearch();
    this.subEventDDL = [];
    this.postMatrixDDl = [];
    this.data.successMessage('Data Cleared Successfully');
  }

  saveEventMapping() {
    debugger
    if (this.pform.valid) {
      this.errorTrue = false;
      this.apiService
        .saveEventMapping(this.eventMapping)
        .subscribe((success) => {
          this.eventMapping = success;
          if(this.eventMapping.eventMappingId !== 0){
            this.navigateToDetail(this.eventMapping.eventMappingId)
          }
          this.dialog.closeAll();        
        });
    } else {
      this.errorTrue = true;
    }
  }

  createNewEventMapping() {
    this.apiService.createNewEventMapping().subscribe((success) => {
      this.eventMapping = success;
      this.errorTrue = false
    });
  }

  getListOfEventByEventId() {
    this.apiService.getListOfEventByEventId().subscribe((success) => {
      this.DDLEvent = success.value;
    });
  }
  getListOfSubEventByEventId(eventID: any,flag:any) {
    debugger
    if(eventID !==''){
      const obj = {
        data: eventID,
      }
      if(flag ){
        this.searchParams.subEventId =0 
      }
      // this.searchParams.subEventId = 0
      this.apiService.getListOfSubEventByEventId(obj).subscribe((success) => {
        this.subEventDDL = success.value;
      });
    }
   
  }

  getListOfSubEventByEventIdNew(eventID: any) {
    const obj = {
      data: eventID,
    }
    this.eventMapping.subEventId = 0;
    this.apiService.getListOfSubEventByEventId(obj).subscribe((success) => {
      this.subEventDDL = success.value;
    });
  }

  getListOfPostingMatrixByVoucherType(val:any,flag:any) {
    const obj = {
      data: val,
    };
    if(flag){
      this.eventMapping.postingMatrixConfigurationId = 0
    }
    this.apiService.getListOfPostingMatrixByVoucherType(obj).subscribe((success) => {       
        this.postMatrixDDl = success.value;
      });
  }

  getListOfPostingMatrixByVoucherTypeNew(voucherType = '') {
    const obj = {
      data: voucherType,
    };
    this.eventMapping.voucherTypeValue = '';
    this.apiService
      .getListOfPostingMatrixByVoucherType(obj)
      .subscribe((success) => {
        console.log(success);
        success.data.forEach((element: any) => {
          this.postMatrixDDl = element.value;
        });
        // console.log(this.postMatrixDDl,'postmatrix');
      });
  }

  openEventMappingDialog() {
    this.createNewEventMapping();
    this.dialog.openDialog(this.openEventMapping, {
      width: '1200px',
      height: '480px',
      // position: 'static'
    });
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchEventMapping();
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  isChecked(val: any) {
    debugger
    // this.errorTrue = false;
    if (val.target.checked === true) {
      this.eventMapping.isBankFee = 'Y';
    } else {
      this.eventMapping.isBankFee = 'N';
      this.eventMapping.bankFeeValue  = ''
    }
  }

  async navigateToDetail(id: any) {
    let urlJson = await this.urlService.encode(id);
    this.router.navigateByUrl('/home/config/event-mapping/detail/' + urlJson);
  }
  navigateToTrust(){
    this.router.navigateByUrl('/home/trustee/finance-menus')
  }
  async getAccountType(event :any,flag:any){
    debugger
    this.casAccountType = [];
    this.searchParams.accountTypeValue = ''
    if(flag){
      this.eventMapping.accountTypeValue = ''
    }
    await this.initialData.DDLValues.DDLAccountType.forEach((element:any)=>{
      if(event ==='TRUST' && element.constant ==='CASH'){
        this.casAccountType.push(element);
  
      }
      if(event ==='COMON' && element.constant ==='CASH'){
        this.casAccountType.push(element);
  
      }
      else if(event ==='ESTAT' && (element.constant ==='CASH' || element.constant==='NONCS' || element.constant==='COMON')){
        this.casAccountType.push(element);
  
      }
     });
  }


}


