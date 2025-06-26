import {
  AfterContentInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../../app-core/service/core.service';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppService } from '../../../../../app.service';
import { entCustomerServiceLeadSearch } from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { CategoryFormComponent } from '../../category/category-form/category-form.component';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  InnerScroll,
  Row,
} from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppAccessDirective } from '../../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entInvItemSearch } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccoutsStatusTableComponent } from '../../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-items-search',
  standalone: true,
  imports: [
    AppTableComponent,
    CellDefDirective,
    IconButtonComponent,
    InnerScroll,
    InputControlComponent,
    SearchComponent,
    Row,
    FormsModule,
    CellHeaderDefDirective,
    AppDatePipe,
    AppAccessDirective,
    ButtonAccessDirective,
    MatTooltipModule,
    TableStatusSortComponent,
    NgClass,
    AccoutsStatusTableComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './items-search.component.html',
  styleUrl: './items-search.component.scss',
})
export class ItemsSearchComponent implements AfterContentInit {
  @Input() isSelectOnly = false;
  pageId = 'ITMSC';
  itemTypeDDL = [];
  totalActiveCount: any = '';
  totalInactiveCount: any = '';
  errorTrue = false;
  initialLoad = true;
  dataSource: any = [];
  searchParams = new entInvItemSearch();
  searchParamsRAW = new entInvItemSearch();
  options = {
    type: 'accountsPath',
  };
  idList: any = [];
  __selectedItems: any = {
    currentIndex: 0,
    array: [],
  };
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @Input() public accessInBtns: any = '';
  @Input() public accessInApp: any = '';
  @Input() public type: any = '';
  @Input() public inventoryGoods: any = '';
  @Input() public hideStatus = false;
  columns: any = ['itemCode', 'effectiveDate', 'invItemTypeName', 'invItemSubtypeName', 'categoryName', 'status', 'action'];
  columnsName: any = ['Item Code', 'Created Date', 'Item Type ', 'Item Sub Type	', 'Category', 'Status', ''];
  tableData: any = [];
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
  };
  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter();
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
    public url: UrlService
  ) { }
  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    this.init();
  }

  async init() {
    if (this.isSelectOnly) {
      this.columns = ['itemCode', 'effectiveDate', 'invItemTypeName', 'invItemSubtypeName', 'categoryName', 'status'];
      this.columnsName = ['Item Code', 'Created Date', 'Item Type ', 'Item Sub Type	', 'Category', 'Status'];
    }
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getitemInitialData', this.options);
    this.totalInprogressandApprovedCounts();
    this.getItemSearchObject();
  }

  getItemSearchObject() {
    this.accountsService
      .getitemSearchObject(this.searchParams, this.options)
      .subscribe((success) => {
        this.searchParams = success;
        // if (this.searchParams.regionValue === '') {
        //   this.searchParams.regionValue = this.initialData.DDLValues.DDLRegion[0].constant;
        // }
        this.searchParams.pageNumber = this.pagination.pageNumber;
        this.searchParams.pageSize = this.pagination.pageSize;
        this.searchParamsRAW = JSON.parse(JSON.stringify(this.searchParams));
        if (this.inventoryGoods !== '') {
          this.searchParams.isInventoryGoods = this.inventoryGoods;
        }
        if (this.hideStatus) {
          this.searchParams.strStatusValue = 'ACTIV';
        }
        this.searchItem();
      });
  }

  totalInprogressandApprovedCounts() {
    this.totalInactiveCount = this.initialData.DDLValues.DDLItemInActiveCount.reduce(
      (acc: any, item: any) => item.constant, 0
    );
    this.totalActiveCount = this.initialData.DDLValues.DDLItemActiveCount.reduce(
      (acc: any, item: any) => item.constant, 0
    );
  }

  onSearch() {
    // this.data.successMessage('Search Executed Successfully');
    this.searchParams.pageNumber = 1;
    this.searchItem();
    this.appSearch.close();
  }
  clear() {
    this.getItemSearchObject();
    this.data.successMessage('Data Cleared Successfully');
  }
  valueSelected(event: any) {
    this.onSelect.emit(event);
    // this.__selectedItems = event;
  }

  pageChanged(event: any) {
    this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchItem();
  }

  ngAfterViewInit(): void {
    if (!this.isSelectOnly) {
      this.appService.setBreadCrumb(this.breadCrumb);
    }
  }

  searchItem() {
    this.searchParams.regionValue = '';
    this.accountsService
      .searchItem(this.searchParams, this.options)
      .subscribe((success: any) => {
        setTimeout(() => {
          this.initialLoad = false;
        }, 400);
        this.pagination = success;
        this.dataSource = success.searchResultInvItem;
      });
  }
  clearAllSearch() {
    this.data.successMessage('Data Cleared Successfully');
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    if (this.inventoryGoods !== '') {
      this.searchParams.isInventoryGoods = this.inventoryGoods;
    }
    if (this.hideStatus) {
      this.searchParams.strStatusValue = 'ACTIV';
    }
    this.searchItem();
  }
  async navigateToDetail(id: any) {
    let obj = { id: id };
    let encodeId = await this.url.encode(obj);
    this.router.navigateByUrl('/home/inventory/configuration/item/detail/' + encodeId);
  }

  getSubTypeBytype(typeId: any) {
    const obj = {
      data: typeId,
    };
    this.accountsService
      .getsubtypeBytype(obj, this.options)
      .subscribe((success) => {
        success.data.forEach((element: any) => {
          this.initialData.DDLValues[(element.key = 'SubTypeList')] =
            element.value;
        });
      });
  }

  statusSortSearch(val: any) {
    this.searchParams.strStatusValue = val;
    this.searchItem();
  }
  getTypeByGroupValue() {
    const obj = {
      data: this.searchParams.strInvCategoryId,
    };
    this.accountsService.gettypeByGroupValue(obj).subscribe((success) => {
      this.itemTypeDDL = success.data[0].value;
    });
  }

  navigateToList() {
    this.router.navigateByUrl('/home/purchase/purchase-order/search');
  }
  navigateToInventory() {
    this.router.navigateByUrl('/home/corporate/inventory-menus');
  }
  navBack() {
    this.router.navigateByUrl('/home/purchase/purchase-order/search');
  }
}
