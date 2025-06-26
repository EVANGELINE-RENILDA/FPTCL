import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef, ViewChild } from '@angular/core';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { InnerScroll, Row } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppAccessDirective } from '../../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entInvProductionNoteSearch } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccoutsStatusTableComponent } from '../../../../../app-core/template/accouts-status-table/accouts-status-table.component';

@Component({
  selector: 'app-production-note-search',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, IconButtonComponent, InnerScroll, InputControlComponent, SearchComponent, Row, FormsModule, CellHeaderDefDirective, AppDatePipe, AppAccessDirective, ButtonAccessDirective, MatTooltipModule, TableStatusSortComponent, AccoutsStatusTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './production-note-search.component.html',
  styleUrl: './production-note-search.component.scss'
})
export class ProductionNoteSearchComponent {


  searchParams = new entInvProductionNoteSearch();
  searchParamsRAW = new entInvProductionNoteSearch();
  totalInprogressCount: any = 0;
  totalApprovedCount: any = 0;
  voucherConfigId: any = 0;
  initialRegionValue: any = '';
  errorTrue = false;

  @Input() public accessInBtns: any = '';
  @Input() public accessInApp: any = '';
  @Input() public type: any = '';
  appAccessForLead = '';
  btnAccessForAdd = '';



  pageId = this.appAccessForLead
  options = {
    hideFullSpinner: true
  }
  idList: any = [];

  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  columns: any = ["productionNoteRefNo", "branchName", "documentDate", "enteredDate", "approvedDate", "status", "action"];
  columnsName: any = ["", "Branch Name", "Document Date ", "Created Date	", "Approved Date", "Status", ''];

  tableData: any = [
  ];
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  accountsOptions = {
    type: 'accountsPath',
  };

  constructor(public router: Router,
    public apiService: ApplicationApiService,
    public accountsService: AccountsApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public urlService: UrlService
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
    await this.initialData.getAcccountsDDL('getProductionNoteIntilizseData', this.accountsOptions);
    this.totalInprogressandApprovedCounts();
    this.getProductionNoteSearchObject();
  }
  getProductionNoteSearchObject() {
    this.accountsService.getProductionNoteSearchObject().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchProductionNote();
    })
  }
  searchProductionNote() {
    this.searchParams.regionValue = '';
    this.accountsService.searchProductionNote(this.searchParams).subscribe((success) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.ilstentInvProductionNoteSearchResult;
    })
  }
  totalInprogressandApprovedCounts() {
    if (
      this.initialData.DDLValues.DDLInprogressList.length !== 0
    ) {
      for (
        let i = 0;
        i < this.initialData.DDLValues.DDLInprogressList.length;
        i++
      ) {
        this.totalInprogressCount =
          this.initialData.DDLValues.DDLInprogressList[
            i
          ].constant;
      }
    }
    if (
      this.initialData.DDLValues.DDLApprovedList.length !== 0
    ) {
      for (
        let i = 0;
        i < this.initialData.DDLValues.DDLApprovedList.length;
        i++
      ) {
        this.totalApprovedCount =
          this.initialData.DDLValues.DDLApprovedList[i].constant;
      }
    }
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.searchProductionNote();
    this.appSearch.close();
  }
  clear() {
    this.getProductionNoteSearchObject();
    this.data.successMessage("Data Cleared Successfully");
  }
  onSelect(event: any) {
    this.__selectedItems = event;
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.ascending = event.sortOrder;
    this.searchProductionNote();

  }
  async navigateToDetail(element: any) {
    const obj = {
      data: element.appInvProductionNoteId,
      data1: 0,
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/inventory/stock/production-note/detail/' + urlJson);
  }
  async navigateDetail(l: any) {
    if (l.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: this.initialRegionValue
        };
        let urlJson = await this.urlService.encode(obj);
        this.router.navigateByUrl('/home/inventory/stock/production-note/detail/' + urlJson);
      } else {
        this.data.successMessage('Please Select Document Name');
      }
    } else {
      this.errorTrue = true;
    }
  }

  statusSortSearch(val: any) {
    this.searchParams.statusValue = val;
    this.searchProductionNote()
  }

}

