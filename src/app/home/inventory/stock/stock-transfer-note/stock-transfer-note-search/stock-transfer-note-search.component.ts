import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, ActivatedRoute } from '@angular/router';
import { InnerScroll, Row } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppService } from '../../../../../app.service';
import { entCustomerServiceLeadSearch } from '../../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { AppAccessDirective } from '../../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entInvStockTransferNoteSearch } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccoutsStatusTableComponent } from '../../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';

@Component({
  selector: 'app-stock-transfer-note-search',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, IconButtonComponent, InnerScroll, InputControlComponent, SearchComponent, Row, FormsModule, CellHeaderDefDirective, AppDatePipe, AppAccessDirective, ButtonAccessDirective, MatTooltipModule, AccoutsStatusTableComponent, TableStatusSortComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './stock-transfer-note-search.component.html',
  styleUrl: './stock-transfer-note-search.component.scss'
})
export class StockTransferNoteSearchComponent {


  searchParams = new entInvStockTransferNoteSearch();
  searchParamsRAW = new entInvStockTransferNoteSearch();
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
  columns: any = ["referenceNo", "fromBranchName", "toBranchName", "documentDate", "enteredDate", "approvedDate", "status", "action"];
  columnsName: any = ["", "Branch Name", "Document Date ", "Created Date	", "Approved Date", "Status", '', ''];

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
    await this.initialData.getAcccountsDDL('getStockTransferNoteInitialData', this.accountsOptions);
    this.totalInprogressandApprovedCounts();
    this.getNewStockTransferNoteSearch();
  }
  getNewStockTransferNoteSearch() {
    this.accountsService.getNewStockTransferNoteSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchStockTransferNote();
    })
  }
  searchStockTransferNote() {
    this.searchParams.regionValue = '';
    this.accountsService.searchStockTransferNote(this.searchParams).subscribe((success) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.ilstentInvStockTransferNoteSearchSet;
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
    this.searchStockTransferNote();
    this.appSearch.close();
  }
  clear() {
    this.getNewStockTransferNoteSearch();
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
    this.searchStockTransferNote();

  }
  async navigateToDetail(element: any) {
    const obj = {
      data: element.invStockTransferNoteId,
      data1: 0,
    };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/inventory/stock/stock-transfer-note/detail/' + urlJson);
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
        this.router.navigateByUrl('/home/inventory/stock/stock-transfer-note/detail/' + urlJson);
      } else {
        this.data.successMessage('Please Select Document Name');
      }
    } else {
      this.errorTrue = true;
    }
  }
  statusSortSearch(val: any) {
    this.searchParams.statusValue = val;
    this.searchStockTransferNote();
  }
}
