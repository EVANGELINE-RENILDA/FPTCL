import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../../app-core/service/core.service';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppService } from '../../../../../app.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { FormsModule } from '@angular/forms';
import { Row, InnerScroll, AppToolTipComponent } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entPurPurchaseOrderSearch } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { SearchVendorComponent } from '../../../../search/search-vendor/search-vendor.component';
import { AccoutsStatusTableComponent } from '../../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { DialogAnimateService } from '../../../../../common/services/dialog-animated/dialog-animate.service';

@Component({
  selector: 'app-purchase-order-search',
  standalone: true,
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, TableStatusSortComponent, SearchVendorComponent, AccoutsStatusTableComponent],
  templateUrl: './purchase-order-search.component.html',
  styleUrl: './purchase-order-search.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PurchaseOrderSearchComponent {

  searchParams = new entPurPurchaseOrderSearch();
  totalInprogressCount: any = 0;
  totalApprovedCount: any = 0;
  voucherConfigId: any = 0;
  initialRegionValue: any = '';
  errorTrue = false;
  regionValueDDL: any = []
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  approvedcount=[]
  inProgresscount=[]

  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }

  accountsOptions = {
    type: 'accountsPath',
  };

  tableData: any = [];
  idList: any = [];

  columns: any = ["documentno", "vendorname", "documentdate", "createddate", "approveddate", "documentamount", "reportingamount", "status", "action"];
  columnsName: any = ["Document No", "Vender Name", "Document Date", "Created Date", "Approved Date", "Document Amount", "Reporting Amount", "Status", "Action", ""];
  vendorName: any = ''
  constructor(
    public router: Router,
    public apiService: ApplicationApiService,
    public accountsService: AccountsApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public urlService: UrlService,
    public dialogService : DialogAnimateService,

  ) {

  }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getPurchaseOrderDetails', this.accountsOptions);
    this.getNewPurchaseOrderSearch();
    this.totalInprogressandApprovedCounts();
  }

  getNewPurchaseOrderSearch() {
    this.accountsService.getNewPurchaseOrderSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.regionValue = "REGI1";
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchPurchaseOrder();
    })
  }

  searchPurchaseOrder(val?:any) {
    this.accountsService.searchPurchaseOrder(this.searchParams).subscribe((success) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.ilstentPurchaseOrderSearchResultSet;
      // this.count=this.tableData.filter(x => x=== 'Approved').length  ;

      this.approvedcount = success.ilstentPurchaseOrderSearchResultSet.filter((e: any) => e.status === 'Approved' ).length;
      console.log(this.approvedcount);
      this.inProgresscount = success.ilstentPurchaseOrderSearchResultSet.filter((e: any) => e.status === 'In Progress' ).length;
      console.log(this.inProgresscount);
      this.totalInprogressandApprovedCounts()


      // this.initialData.DDLValues.PurchaseOrderStatus.forEach((element:any) => {
      //   console.log(element);

      // });
      if(val === true){
        this.dialog.closeDialog();
      }
    })
  }

  totalInprogressandApprovedCounts() {
    debugger

    if (this.initialData.DDLValues.DDLInprogressList.length !== 0) {
      for (let i = 0; i < this.initialData.DDLValues.DDLInprogressList.length; i++) {
        this.totalInprogressCount = this.initialData.DDLValues.DDLInprogressList[i].constant;
        // this.totalInprogressCount = this.inProgresscount;
      }
    }
    if (this.initialData.DDLValues.DDLApprovedList.length !== 0) {
      for (let i = 0; i < this.initialData.DDLValues.DDLApprovedList.length; i++) {
        this.totalApprovedCount = this.initialData.DDLValues.DDLApprovedList[i].constant;
        // this.totalApprovedCount = this.approvedcount;
      }
    }
  }

  onSearch() {
    this.dialog.closeAll();
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.searchPurchaseOrder(true);
  }

  clear() {
   console.log(this.vendorName);
   this.vendorName=''

    this.getNewPurchaseOrderSearch();
    this.data.successMessage("Data Cleared Successfully");
  }

  doVendorSelect(event: any) {
    this.vendorName = event.vendorName;
    this.searchParams.vendorId = event.actVendorId;
  }
  onSelect(event: any) {
    this.__selectedItems = event;
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchPurchaseOrder();
  }

  async navigateToDetail(element: any) {
    const obj = {
      data: element.purchaseOrderId,
      data1: 0,
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/purchase/purchase-order/detail/' + urlJson);
  }

  async navigateDetail(l: any) {
    if (l.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: 'REGI1',
        };
        let urlJson = await this.urlService.encode(obj);
        this.router.navigateByUrl('/home/purchase/purchase-order/detail/' + urlJson);
      }
      else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    } else {
      this.errorTrue = true;
    }
  }

  getVoucherDetail(element: any) {
    const obj = {
      data: element,
    };
    this.accountsService
      .getVoucherAccess(obj, this.accountsOptions)
      .subscribe((success) => {
        this.voucherConfigId = success.actVoucherConfigId;
        this.regionValueDDL = success.plstentDDLClass;
      });
  }
  searchStatus(val: any) {
    this.searchParams.statusValue = val;
    this.searchPurchaseOrder()
  }
  navigateToPurchase(){
    this.router.navigateByUrl('/home/corporate/purchase-menus')
  }
}
