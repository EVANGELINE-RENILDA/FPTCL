import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
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
import { entActVendor, vendorSearch } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccoutsStatusTableComponent } from '../../../../../app-core/template/accouts-status-table/accouts-status-table.component';

@Component({
  selector: 'app-vendor-search',
  standalone: true,
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe,
    CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent,
    InputControlComponent, TableStatusSortComponent, AccoutsStatusTableComponent],
  templateUrl: './vendor-search.component.html',
  styleUrl: './vendor-search.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VendorSearchComponent {
  approvedcount = []
  inProgresscount = []
  options = {
    hideFullSpinner: true,
  };
  @Input() public hideStatus = false;
  @Input() public openStatus = true;
  @Input() public statusValue: any = '';
  @Input('module') module = 'Purchase';
  @Input('screenType') screenType = 'Vendor';
  @Input('screenType1') screenType1 = 'Detail';
  @Input('navigateUrl') navigateUrl = '';
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
    sortColumnName: '',
    sortOrder: false
  }
  idList: any = [];
  tableData: any = [];
  activeCount = 0
  inActiveCount = 0

  columns: any = ["vendorCode", "vendorName", "vendorId", "effectiveDate", "vendorTypeDescription", "emailid", "phoneNo", "statusDescription"];
  columnsName: any = ["Vendor ID", "Vendor Name", "Vendor Ref No", "Created Date", "Vendor Type", "Email ID", "Contact No", "Status"];
  sortColumnName: any = ["vendorCode", "vendorName", "vendorId", "effectiveDate", "vendorTypeDescription", "emailid", "phoneNo", "statusDescription"]

  searchParams = new vendorSearch();
  searchParamsRAW = new vendorSearch();
  vendor = new entActVendor();
  @Output('dataSelected') dataSelected: EventEmitter<any> = new EventEmitter();

  constructor(public router: Router,
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
  ) { }
  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    console.log(this.navigateUrl);
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getVendorInitialData', this.options);
    await this.getvendorSearch();
    this.totalActiveandInActiveCounts()
  }

  getvendorSearch() {
    this.accountsService.getvendorSearch().subscribe((succes) => {
      this.searchParams = succes;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchvendor();
    })
  }
  searchvendor(val?: any) {
    this.accountsService.searchvendor(this.searchParams).subscribe((success) => {
      this.tableData = success.ilstvendorSearchset;
      //   debugger
      //   this.approvedcount =  this.tableData.filter((e: any) => e.statusDescription === 'Active' ).length;
      //   console.log(this.approvedcount);
      //   this.inProgresscount =  this.tableData.filter((e: any) => e.statusDescription === 'InActive' ).length;
      //   console.log(this.inProgresscount);
      //   debugger
      //  this.totalActiveandInActiveCounts();

      this.pagination = success;
      if (val === true) {
        this.dialog.closeDialog();
      }
    })
  }
  async createNewVendor(id: any) {
    const encode = await this.url.encode(id);
    this.router.navigateByUrl('/home/purchase/vendor/detail/' + encode);
  }

  async openVendor(id: any) {
    if (id > 0) {
      const encode = await this.url.encode(id);
      this.router.navigateByUrl('/home/purchase/vendor/detail/' + encode);
    }
    else {
      this.data.errorInfoMessage('Please select any one record to open');
    }
  }
  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.iblSortOrder = event.sortOrder;
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.searchParams.pageNumber = 1;
    this.searchvendor();
    this.appSearch?.close();
  }

  pageChanged(event: any) {
    this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.iblSortOrder = event.sortOrder;
    this.searchvendor();
  }

  totalActiveandInActiveCounts() {
    if (
      this.initialData.DDLValues.ActiveCount
        .length !== 0
    ) {
      for (
        let i = 0;
        i <
        this.initialData.DDLValues.ActiveCount
          .length;
        i++
      ) {
        this.activeCount =
          this.initialData.DDLValues.ActiveCount[
            i
          ].constant;
        if (
          i++
        ) {
          this.inActiveCount =
            this.initialData.DDLValues.InActiveCount[
              i
            ].constant;
        }
      }

    }
  }
  statusShowHide() {
    if (this.hideStatus) {
      this.searchParams.statusvalue = this.statusValue;
    }
    else { }
  }

  clear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.searchvendor()
    this.data.successMessage('Data Cleared Successfully');
  }

  dataSelectedFn(val: any) {
    this.dataSelected.emit(val);
  }

  navigateToPurchase() {
    this.router.navigateByUrl('/home/corporate/purchase-menus')
  }

  searchStatus(val: any) {
    this.searchParams.statusvalue = val;
    this.searchvendor()
  }

}
