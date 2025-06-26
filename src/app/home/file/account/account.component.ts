import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { AppTableComponent, CellDefDirective } from '../../../app-core/template/app-table/app-table.component';
import { entAccountSearch } from '../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../common/services/data/data.service';
import { CoreService } from '../../../app-core/service/core.service';
import { AppDatePipe } from "../../../common/pipes/app-date/app-date.pipe";
import { SearchComponent } from '../../../app-core/template/search/search.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { Row } from '../../../app-core/core-component/core-component.component';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
import { AppService } from '../../../app.service';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { AccoutsStatusTableComponent } from '../../../app-core/template/accouts-status-table/accouts-status-table.component';

@Component({
  selector: 'app-account',
  standalone: true,
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  imports: [AppTableComponent, AppDatePipe, CellDefDirective, SearchComponent, InputControlComponent, FormsModule, Row, IconButtonComponent, AccoutsStatusTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountComponent {
  pageId: any = '';
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  };
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  columns: any = ['accountNo', 'fullname', 'fileNo', 'accountTypeDescription', 'date', 'statusDescription'];
  columnsName: any = ['Account No', 'Customer', 'File No', 'AccountType', 'Created Date', 'Status'];
  tableData: any = [];
  searchParams = new entAccountSearch();
  searchParamsRAW = new entAccountSearch();
  constructor(public apiService: ApplicationApiService,
    public data: DataService,
    public dialog: CoreService,
    public initialData: InitialDataService,
    public appService: AppService
  ) { }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  ngOnInit(): void {
    this.init()
  }
  async init() {
    await this.data.checkToken();
     this.appService.helpFile ='Account.pdf'
    await this.initialData.getDDL('getInitialDataForAccount');
    this.createAccountSearch()
  }

  createAccountSearch(type?: any) {
    this.apiService.createAccountSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;

      if (type !== 'clear') {
      }
      else {
        this.data.successMessage('Data Cleared Successfully')
      }
      this.searchAccount()
    })
  }
  searchAccount() {

    this.apiService.searchAccount(this.searchParams).subscribe((success) => {
      this.tableData = success.searchResult;
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;

    })
  }
  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchAccount();
  }
  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchAccount();
    this.dialog.closeAll();
  }
}
