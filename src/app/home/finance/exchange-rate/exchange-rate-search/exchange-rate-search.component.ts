import { Component, TemplateRef, ViewChild } from '@angular/core';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { InnerScroll, Row } from '../../../../app-core/core-component/core-component.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { CoreService } from '../../../../app-core/service/core.service';
import { TableStatusSortComponent } from '../../../../app-core/table-status-sort/table-status-sort.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { Router } from '@angular/router';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppService } from '../../../../app.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { entExchangeRate, entExchangeRateSearch } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { UrlService } from '../../../../common/services/url/url.service';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';

@Component({
  selector: 'app-exchange-rate-search',
  standalone: true,
  imports: [InputControlComponent, Row, IconButtonComponent, InnerScroll, TableStatusSortComponent, AppDatePipe, AppTableComponent, FormsModule, SearchComponent, CellDefDirective, CellHeaderDefDirective, AccoutsStatusTableComponent, AppAccessDirective,
    ButtonAccessDirective,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './exchange-rate-search.component.html',
  styleUrl: './exchange-rate-search.component.scss'
})
export class ExchangeRateSearchComponent {
  pageId = 'EXRSC';
  columns: any = ["targetCurrencyValue","baseCurrencyValue" , "conversionRate", "enteredDate", "effectiveDate", "statusDescription", "action"];
  columnsName: any = [ "Document Currency","Reporting Currency", "Rate", "Created Date", "Effective Date", "Status", ""];
  __selectedItems: any;
  options = {
    hideFullSpinner: true,
  };
  activeCount = 0;
  inActiveCount = 0;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  searchParams = new entExchangeRateSearch()
  searchParamsRAW = new entExchangeRateSearch()
  exchangeRate = new entExchangeRate()
  tableData: any = [
    //   {
    //   'docNo': 'INR',
    //    'vendName': 'AUD',
    //   'date': '1.52250000',
    //    'createdDate': '26/06/2023 04:41 PM',
    //   'approveDate': '01-03-2008',
    //   'appDate': '26/06/2023',
    //   'status': 'Approved',
    // },
  ];
  constructor(public dialog: CoreService,
    public router: Router,
    public appService: AppService,
    public data: DataService,
    public initialData: InitialDataService,
    public accountsService: AccountsApiService,
    public url: UrlService,
  ) {

  }
  // navigateToDetail(){
  //   this.router.navigateByUrl('/home/finance/exchange-rate/detail')
  // }
  ngOnInit(): void {
    this.init();
  }
  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getExchangeRateInitialData', this.options);
    await this.totalInprogressandApprovedCounts()
    this.getExchangeRateSearch();
  }
  getExchangeRateSearch() {
    this.accountsService.getExchangeRateSearch().subscribe((succes) => {
      this.searchParams = succes;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchExchangeRate();
    })
  }
  searchExchangeRate() {
    this.accountsService.searchExchangeRate(this.searchParams).subscribe((success) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.ilstentExchangeRateSearchSet;
      this.dialog.closeDialog();
    })
  }

  async createNewExchangeRate(id: any) {
    const encode = await this.url.encode(id);
    this.router.navigateByUrl('/home/finance/exchange-rate/detail/' + encode);

  }
  async openExchangeRate(id: any) {

    if (id > 0) {
      const encode = await this.url.encode(id);
      this.router.navigateByUrl('/home/finance/exchange-rate/detail/' + encode);
    }
    else {
      this.data.errorInfoMessage('Please select any one record to open');
    }
  }
  pageChanged(event: any) {

  }
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }
  clear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.getExchangeRateSearch();
    this.data.successMessage('Data Cleared Successfully');
  }
  statusSortSearch(val: any) {
    this.searchParams.istrStatusValue = val;
    this.searchExchangeRate()
  }
  totalInprogressCount = ''
  totalApprovedCount = ''
  totalInprogressandApprovedCounts() {
    if (this.initialData.DDLValues.DDLInprogressList.length !== 0) {
      for (let i = 0; i < this.initialData.DDLValues.DDLInprogressList.length; i++) {
        this.totalInprogressCount = this.initialData.DDLValues.DDLInprogressList[0].constant;
      }
    }
    if (this.initialData.DDLValues.DDLApprovedList.length !== 0) {
      for (let i = 0; i < this.initialData.DDLValues.DDLApprovedList.length; i++) {
        this.totalApprovedCount = this.initialData.DDLValues.DDLApprovedList[0].constant;
      }
    }
    console.log(this.totalInprogressCount, this.totalApprovedCount);

  }
  navigateToAccount(){
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
}
