import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { AppService } from '../../../../../app.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import {
  entInvItemSubtype,
  entInvItemSubtypeList,
  entInvItemType,
  entInvItemTypeSearch,
  entInvItemTypeSearchResultSet,
} from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { finalize } from 'rxjs';
import { AccoutsStatusTableComponent } from '../../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AppAccessDirective } from '../../../../../common/permission/app-access.directive';

@Component({
  selector: 'app-item-type-sub-type',
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
    AppDatePipe,
    AccoutsStatusTableComponent,
    TableStatusSortComponent,
    AppAccessDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './item-type-sub-type.component.html',
  styleUrl: './item-type-sub-type.component.scss',
})
export class ItemTypeSubTypeComponent {
  pageId = 'ITYSC';

  totalActiveCount: any = '';
  totalInactiveCount: any = '';
  itemType: any = '';
  itemInvTypeId: any = 0;
  itemSubtype: any = '';
  itemSubtypeName: any = '';
  errorTrue = false;
  searchParams = new entInvItemTypeSearch();
  searchParamsRAW = new entInvItemTypeSearch();
  searchResult = new entInvItemTypeSearchResultSet();
  itemInvType = new entInvItemType();
  itemInvTypeRAW = new entInvItemType();
  itemInvSubtype = new entInvItemSubtype();
  itemInvSubtypeRAW = new entInvItemSubtype();
  itemSubTypeList = new entInvItemSubtypeList();
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
  };
  __selectedItems: any = {
    currentIndex: 0,
    array: [],
  };
  expand = false;
  columns1: any = ['typeName', 'status', 'action'];
  columnsName1: any = ['Type Name', 'Status', 'Action'];

  subColumns1: any = [
    'sidebtn',
    'invItemSubtypeName',
    'itemSubtypeCodePrefix',
    'itemSubtypeCodeSuffix',
    'action',
  ];
  subColumnsName1: any = ['', 'Sub Type Name', 'Prefix', 'Suffix', ''];

  columns: any = [
    'typeName',
    'prefix',
    'suffix',
    'categoryName',
    'effectiveDatetime',
    'status',
    'action',
  ];
  columnsName: any = [
    'Type Name',
    'Prefix',
    'Suffix',
    'Category',
    'Created Date',
    'Status',
    'Action',
  ];
  sortColumnName: any = [
    'typeName',
    'prefix',
    'suffix',
    'categoryName',
    'effectiveDatetime',
  ];

  subColumns: any = ['sidebtn', 'invItemSubtypeName', 'action'];
  subColumnsName: any = ['', 'Sub Type Name', ''];

  tableData: any = [
    {
      no: 1,
      refNo: 'gh',
      name: 'd',
      dob: 'd',
      paper: 'Service Item',
      date: '06/05/2024 10:45 AM',
      status: 'Active',
    },
    {
      no: 2,
      refNo: 'High Wheels',
      name: 'HW',
      dob: 'LS',
      paper: 'Wheels',
      date: '06/05/2024 10:45 AM',
      status: 'Active',
    },
  ];
  tableSubData: any = [
    {
      subTypeName: 'Magnetic',
      prefix: 'Mg',
      suffix: 'He',
    },
  ];
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('itemDialog', { static: false })
  itemDialog!: TemplateRef<any>;
  @ViewChild('subItemDialog', { static: false })
  subItemDialog!: TemplateRef<any>;
  options = {
    type: 'accountsPath',
  };
  @ViewChild('l') lfrom!: NgForm;
  @ViewChild('a') afrom!: NgForm;
  @ViewChild('b') bfrom!: NgForm;
  constructor(
    public apiService: ApplicationApiService,
    public accountsService: AccountsApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public urlService: UrlService,
    public router: Router
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
    await this.initialData.getAcccountsDDL(
      'getInvItemTypeInitialData',
      this.options
    );
    this.getItemTypeSearchObject();
    this.totalActiveandInactiveCounts();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  totalActiveandInactiveCounts() {
    if (this.initialData.DDLValues.DDLItemTypeActive.length !== 0) {
      for (
        let i = 0;
        i < this.initialData.DDLValues.DDLItemTypeActive.length;
        i++
      ) {
        this.totalActiveCount =
          this.initialData.DDLValues.DDLItemTypeActive[i].constant;
      }
    }
    if (this.initialData.DDLValues.DDLItemTypeInActive.length !== 0) {
      for (
        let i = 0;
        i < this.initialData.DDLValues.DDLItemTypeInActive.length;
        i++
      ) {
        this.totalInactiveCount =
          this.initialData.DDLValues.DDLItemTypeInActive[i].constant;
      }
    }
  }
  getItemTypeSearchObject() {
    this.accountsService.getItemTypeSearchObject().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchItemType();
    });
  }
  searchItemType() {
    this.accountsService
      .searchItemType(this.searchParams)
      .subscribe((success) => {
        this.pagination = success;
        this.searchResult = success;
      });
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.searchItemType();
  }
  clear() {
    this.getItemTypeSearchObject();
    this.data.successMessage('Data Cleared Successfully');
  }
  onSelect(event: any) {
    this.__selectedItems = event;
  }

  pageChanged(event: any) {
    this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    // this.searchParams.isortcolumn = event.sortColumnName;
    this.searchParams.isortorder = event.sortOrder;
    this.searchItemType();
  }

  clearAllSearch() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.searchItemType();
  }

  tableToggle() {
    if (this.expand === true) {
      this.expand = false;
    } else {
      this.expand = true;
    }
  }
  doClear() {
    this.errorTrue = false;
    this.createNewInvItemType();
  }
  async createTypeDialog() {
    await this.dialog.openDialog(this.itemDialog, {
      disableClose: true,
      height: '300px',
      width: '750px',
      maxWidth: '1170px',
    });
  }
  createItemtype(): void {
    this.itemType = 'new';
    this.createNewInvItemType();
    this.createTypeDialog();
  }
  createNewInvItemType() {
    this.errorTrue = false;
    this.accountsService
      .createNewInvItemType(this.options)
      .subscribe((success) => {
        this.itemInvType = success;
      });
  }
  async deleteItemType(val: any) {
    let response = await this.dialog.checkDelete(
      'you want to delete this Itemtype'
    );
    if (response) {
      this.deleteInvItemType(val.invItemTypeId);
    }
  }

  deleteInvItemType(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .deleteInvItemType(obj, this.options)
      .subscribe((success) => {
        this.searchResult =
          success.pentInvItemTypeSearchResultSet.ilstentInvItemTypeSearchSet;
        this.searchItemType();
      });
  }

  openItemtype(val: any): void {
    this.itemType = 'edit';
    this.openInvItemType(val.invItemTypeId, false);
    this.createTypeDialog();
  }

  openInvItemType(val: any, ref: boolean) {
    const obj = {
      data: val,
    };
    this.accountsService
      .openInvItemType(obj, this.options)
      .subscribe((success) => {
        this.itemInvType = success;
        this.itemInvTypeRAW = JSON.parse(JSON.stringify(success));
        if (ref) {
          this.data.successMessage('Data Refreshed');
        }
      });
  }

  async createSubTypeDialog() {
    let dialogResponse: any = await this.dialog.openDialog(this.subItemDialog, {
      disableClose: true,
      height: '300px',
      width: '750px',
      maxWidth: '1170px',
      // data: {
      //   customer: success,
      //   val:val
      // }
    });
  }

  openItemSubtype(val: any) {
    this.itemSubtype = 'edit';
    this.getselectedItemSubType(val.invItemSubtypeId);
    this.createSubTypeDialog();
  }
  getselectedItemSubType(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .getselectedItemSubType(obj, this.options)
      .subscribe((success) => {
        this.itemInvSubtype = success;
      });
  }
  saveInvItemType() {
    if (this.lfrom.valid) {
      this.accountsService
        .saveInvItemType(this.itemInvType, this.options)
        .pipe(finalize(() => {}))
        .subscribe((success) => {
          this.searchResult =
            success.pentInvItemTypeSearchResultSet.ilstentInvItemTypeSearchSet;
          // this.itemInvType = success;
          this.searchItemType();
          this.getItemTypeActiveInActiveList();
          this.dialog.closeDialog();
        });
    } else {
      this.errorTrue = true;
    }
  }
  getItemTypeActiveInActiveList() {
    this.accountsService
      .getItemTypeActiveInActiveList(this.options)
      .subscribe((success) => {
        this.initialData.DDLValues.DDLItemTypeActive = success.data[0].value;
        this.initialData.DDLValues.DDLItemTypeInActive = success.data[1].value;
        if (this.initialData.DDLValues.DDLItemTypeActive.length !== 0) {
          for (
            let i = 0;
            i < this.initialData.DDLValues.DDLItemTypeActive.length;
            i++
          ) {
            this.totalActiveCount =
              this.initialData.DDLValues.DDLItemTypeActive[i].constant;
          }
        }
        if (this.initialData.DDLValues.DDLItemTypeInActive.length !== 0) {
          for (
            let i = 0;
            i < this.initialData.DDLValues.DDLItemTypeInActive.length;
            i++
          ) {
            this.totalInactiveCount =
              this.initialData.DDLValues.DDLItemTypeInActive[i].constant;
          }
        }
      });
  }
  getItemSubTypeListByTypeId(val: any) {
    this.itemSubtypeName = val.typeName;
    this.itemInvTypeId = val.invItemTypeId;
    const obj = {
      data: val.invItemTypeId,
    };
    this.accountsService
      .getItemSubTypeListByTypeId(obj, this.options)
      .subscribe((success) => {
        this.itemSubTypeList.plstitemSubtype = success.plstitemSubtype;
      });
  }
  createSubtype(): void {
    this.itemSubtype = 'new';
    this.createItemSubtype();
    this.createSubTypeDialog();
  }
  deleteSubtype(val: any) {
    const obj = {
      data: val.invItemSubtypeId,
    };
    this.accountsService
      .deleteSubType(obj, this.options)
      .subscribe((success) => {
        this.itemSubTypeList.plstitemSubtype = success.plstitemSubtype;
      });
  }

  createItemSubtype() {
    this.errorTrue = false;
    this.accountsService
      .createItemSubType(this.options)
      .subscribe((success) => {
        this.itemInvSubtype = success;
      });
  }

  saveItemSubType() {
    this.itemInvSubtype.invItemTypeId = this.itemInvTypeId;
    if (this.bfrom.valid) {
      this.accountsService
        .saveItemSubType(this.itemInvSubtype, this.options)
        .subscribe((success) => {
          this.itemInvSubtype = success;
          this.itemSubTypeList.plstitemSubtype = success.plstitemSubtype;
          this.dialog.closeDialog();
        });
    } else {
      this.errorTrue = true;
    }
  }
  async deleteItemSubType(val: any) {
    let response = await this.dialog.checkDelete(
      'you want to delete this Itemsubtype'
    );
    if (response) {
      this.deleteInvItemType(val.invItemTypeId);
    }
  }
  doSubTypeClear() {
    this.errorTrue = false;
    this.createItemSubtype();
  }
  navigateToInventory() {
    this.router.navigateByUrl('/home/corporate/inventory-menus');
  }
}
