import { InitialDataService } from './../../../../../common/services/initial-data/initial-data.service';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { Router } from '@angular/router';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AppService } from '../../../../../app.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { CustomerSearchResultset } from '../../../../../common/api-services/accounts-api/accounts-api.classes';

@Component({
  selector: 'app-purchase-register-search',
  standalone: true,
  imports: [AppTableComponent,
    FormsModule,
    SearchComponent,
    IconButtonComponent,
    InnerScroll,
    Row,
    ViewLabel,
    InputControlComponent,
    CellDefDirective,
    CellHeaderDefDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './purchase-register-search.component.html',
  styleUrl: './purchase-register-search.component.scss'
})
export class PurchaseRegisterSearchComponent implements OnInit {

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  columns: any = ['transactionMonth', 'debitAmt', 'creditAmt', 'closingBalance', 'action'];
  columnsName: any = ["Month", "Debit Amount", "Credit Amount", "Closing Balance", ""];
  tableData: any = [];
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  searchParams = new CustomerSearchResultset();

  constructor(
    public dialog: CoreService,
    public data: DataService,
    public router: Router,
    public appService: AppService,
    public initialData: InitialDataService,
    public accountsService: AccountsApiService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL(
      'getInitializePurchaseRegisterSummaryReport'
    );
    this.onSearch();
  }


  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  pageChanged(event: any) {
    // this.searchParams.pageNumber = event.pageNumber;
    // this.searchParams.pageSize = event.pageSize;
    // this.searchTrustApplication();

  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.accountsService.generatePurchaseRegisterSummaryReport(this.searchParams).subscribe((success) => {
      let enerate = JSON.stringify(success.reportResult)
      this.tableData = enerate;
      console.log(`Table_Data = ` + this.tableData);
    })
  }

  createPurchaseRegisterSearch() {

  }
  searchPurchaseRegister() {

  }

  navigateToDetail() {
    this.router.navigateByUrl('/home/purchase/report/purchase-register/detail')
  }
}
