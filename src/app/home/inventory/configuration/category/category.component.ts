import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppService } from '../../../../app.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  InnerScroll,
  Row,
} from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { CategoryFormComponent } from './category-form/category-form.component';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import {
  entInvCategory,
  entInvCategorySearch,
} from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';

@Component({
  selector: 'app-category',
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
    AccoutsStatusTableComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  pageId = 'ITCSC';
  totalActiveCount: any = '';
  totalInactiveCount: any = '';
  searchParams = new entInvCategorySearch();
  searchParamsRAW = new entInvCategorySearch();
  ItemCategory = new entInvCategory();
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
  columns: any = [
    'categoryCode',
    'categoryName',
    'effectiveDate',
    'shortDescription',
    'status',
    'action',
  ];
  columnsName: any = [
    '',
    'Category Name',
    'Created Date ',
    'Short Description',
    'Status',
    'Action',
  ];

  sortColumnName: any = [
    'categoryCode',
    'categoryName',
    'effectiveDate',
    'shortDescription',
  ];

  tableData: any = [
    {
      leadRefNo: 'CAT0013',
      serviceRefNo: 'asdadf',
      customerName: '06/05/2024',
      leadTypeDescription: 'dsdf',
      productTypeDescription: 'Active',
    },
  ];
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
  };

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
    public urlService: UrlService
  ) {}
  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL(
      'getInvCategoryInitialData',
      this.options
    );
    this.totalActiveandInactiveCounts();
    this.getInvCategorySearchObject();
  }
  getInvCategorySearchObject() {
    this.accountsService.getInvCategorySearchObject().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.invCategorySearchDetail();
    });
  }
  invCategorySearchDetail() {
    this.accountsService
      .invCategorySearchDetail(this.searchParams)
      .subscribe((success) => {
        this.pagination = success;
        this.tableData = success.ilstentInvCategorySearchSet;
      });
  }
  totalActiveandInactiveCounts() {
    if (this.initialData.DDLValues.DDLCategoryActiveCount.length !== 0) {
      for (
        let i = 0;
        i < this.initialData.DDLValues.DDLCategoryActiveCount.length;
        i++
      ) {
        this.totalActiveCount =
          this.initialData.DDLValues.DDLCategoryActiveCount[i].constant;
      }
    }
    if (this.initialData.DDLValues.DDLCategoryInActiveCount.length !== 0) {
      for (
        let i = 0;
        i < this.initialData.DDLValues.DDLCategoryInActiveCount.length;
        i++
      ) {
        this.totalInactiveCount =
          this.initialData.DDLValues.DDLCategoryInActiveCount[i].constant;
      }
    }
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.invCategorySearchDetail();
    this.appSearch.close();
  }
  clear() {
    this.getInvCategorySearchObject();
    this.data.successMessage('Data Cleared Successfully');
  }
  onSelect(event: any) {
    this.__selectedItems = event;
    this.searchParams.isortcolumn = event.sortColumnName;
    this.searchParams.isortorder = event.sortOrder;
  }

  pageChanged(event: any) {
    this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.isortcolumn = event.sortColumnName;
    this.searchParams.isortorder = event.sortOrder;
    this.invCategorySearchDetail();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async createCategory(val: any) {
    await this.dialog.openDialog(CategoryFormComponent, {
      disableClose: true,
      height: '350px',
      width: '750px',
      maxWidth: '1170px',
      data: {
        val: val,
      },
    });
    this.invCategorySearchDetail();
  }

  clearAllSearch() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.invCategorySearchDetail();
    this.data.successMessage('Data Cleared Successfully');
  }
  statusSortSearch(val: any) {
    this.searchParams.strStatusValue = val;
    this.invCategorySearchDetail();
  }
  navigateToInventory() {
    this.router.navigateByUrl('/home/corporate/inventory-menus');
  }
}
