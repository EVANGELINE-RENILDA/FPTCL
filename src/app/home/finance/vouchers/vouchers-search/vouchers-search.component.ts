import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  InnerScroll,
  Row,
  AppToolTipComponent,
} from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { entActVoucherConfig, entActVoucherConfigSearch } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppDatePipe } from "../../../../common/pipes/app-date/app-date.pipe";

@Component({
  selector: 'app-vouchers-search',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './vouchers-search.component.html',
  styleUrl: './vouchers-search.component.scss',
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
    AppDatePipe
  ]
})
export class VouchersSearchComponent {
  pageId = 'AVOSC';
  voucher = new entActVoucherConfigSearch()
  voucherRAW = new entActVoucherConfigSearch()
  voucherConfig = new entActVoucherConfig
  options = {
    hideFullSpinner: true,
  };
  subtype = [];
  

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  columns: any = [
    'vouchername',
    'voucherCategory',
    'voucherType',
    'voucherNature',
    'effectivedate',
    'action'
  ];

  columnsName: any = [
    'Voucher Name',
    'Voucher Category',
    'Voucher Type',
    'Voucher Nature',
    'Created Date',
    ''
  ];

  tableData: any = [
    {
      voucherName: 'Sales_invoice_24',
      voucherCate: 'Sales',
      voucherType: 'Sales Invoice',
      voucherNature: 'Credit',
      createdDate: '27 Feb 2024',
    },
  ];

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
  };
  errorTrue = false;

  constructor(
    public router: Router,
    public apiService: ApplicationApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public accountsService: AccountsApiService,
    public url: UrlService,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {

    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    await this.data.checkToken();
    this.currentDate = this.appService.getCurrentDate();
    this.initialData.getAcccountsDDL('getVoucherConfigInitialData', this.options);
    await this.createNewVoucherConfigSearch()

  }

  createNewVoucherConfigSearch(type?: any) {
    this.accountsService.createNewVoucherConfigSearch().subscribe((success) => {
      this.voucher = success;
      this.voucher.pageNumber = this.pagination.pageNumber;
      this.voucher.pageSize = this.pagination.pageSize;
      this.searchVoucherConfig('clear')

      if (type === 'clear') { 
        this.subtype=[];
        this.data.successMessage('Data Cleared Successfully');
        // this.searchVoucherConfig('clear');
      }
      
    })

  }
  getVoucherSubTypeByVoucherType(value: any) {
    // this.region=[]
    const obj = {
      data: value,
    };
    this.accountsService
      .getVoucherSubTypeByVoucherType(obj)
      .subscribe((success) => {
        this.subtype = success.data[0].value;
      });
     
      // this.initialData.DDLValues.DDLRegion.forEach((element:any) => {
      //   if(value==='TRUST' && element.constant==='REGIO'){
      //     this.regionData.regionValue ='REGIO';
      // // this.region.push(element)
      //   }

      //   else if(value!=='TRUST' && element.constant==='REGI1'){
      //     this.region.push(element)
      //   }
      
      //   console.log(element);
        
      // });
      // this.initialData.DDLValues.DDLRegion.forEach((val:any) => {
      //   if(value!=='TRUST' && val.constant!=='"REGIO"'){
      //     console.log(val, 'check');
          
      // this.region.push(val)
      //   }
      //   console.log(val);
        
      // });
  }
  searchVoucherConfig(type?:any) {
    debugger
    this.accountsService.searchVoucherConfig(this.voucher).subscribe((success) => {
      this.tableData = success.lstActVoucherConfigSearchresultSet;
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      debugger
      if(type !=='clear'){
        this.dialog.closeDialog();
      }
    })
  }
  onSearch(){
    this.data.successMessage('Search Executed Successfully');
    this.searchVoucherConfig()
  }
  async createNewVoucherConfig(id: any) {
    const encode = await this.url.encode(id);
    this.router.navigateByUrl('/home/finance/voucher/detail/' + encode);
  }
  async openVoucherConfig(id: any) {

    if (id > 0) {
      const encode = await this.url.encode(id);
      this.router.navigateByUrl('/home/finance/voucher/detail/' + encode);
    } else {
      this.data.errorInfoMessage('Please select any one record to open');
    }
  }

 
  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  pageChanged(event: any) {
    this.createNewVoucherConfigSearch();
  }

  async selectAllNavigate() {
    if (this.__selectedItems.array.length === 0) {
      return;
    }
    let encodeId = await this.url.encode(this.__selectedItems);
    // this.router.navigateByUrl('/home/crm/customer/detail/' + encodeId);
  }

  async navigateToDetail() {
    // let obj = {
    //   currentIndex: 0,
    //   array: [id]
    // }
    // let encodeId = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/finance/voucher/detail');
  }

  clear() {
    this.voucher = JSON.parse(JSON.stringify(this.voucherRAW));
    this.data.successMessage('Data Cleared Successfully');
  }
  navigateToAccount(){
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
}
