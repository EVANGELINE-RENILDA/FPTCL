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
import { Row, InnerScroll, AppToolTipComponent, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { entActCustomerDetails, entSaleReport, entSalSalesQuotation } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { SearchCustomerComponent } from '../../../../search/search-customer/search-customer.component';

@Component({
  selector: 'app-customer-wise-sales-report-search',
  standalone: true,
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective,CellHeaderDefDirective,SearchComponent,FormsModule,AppToolTipComponent,InputControlComponent,TableStatusSortComponent,ViewLabel,SearchCustomerComponent],
  templateUrl: './customer-wise-sales-report-search.component.html',
  styleUrl: './customer-wise-sales-report-search.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerWiseSalesReportSearchComponent {

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;

  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  salesReport = new entSaleReport();
  salesReportRAW = new entSaleReport();
  salesQuotation = new entSalSalesQuotation();
  customerDetails = new entActCustomerDetails();

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }

  tableData: any = [];
  reportResult: any = [];
  idList: any = [];
  currentDate ='';

  columns: any = ["ITEM_NAME", "PURCHASE_UNIT_VALUE", "PENDING_QUANTITY", "PENDING_VALUE", ""];
  columnsName: any = ["Name of the Item", "Unit Type", "QTY", "Value","Action"];
  constructor(public router: Router,
    public api: AccountsApiService,
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
    async init() {
      await this.data.checkToken();
      await this.initialData.getAcccountsDDL('getInitializeCustomerWisedSalesReport');
      this.currentDate = this.appService.getCurrentDate();
    }

    generateCustomerWisedSalesSummaryReport(l?: any) {
      if (this.salesReport.customerId !== 0) {
        // if (l.valid) {
          this.api
            .generateCustomerWisedSalesSummaryReport(
              this.salesReport
            )
            .subscribe((success: any) => {
              this.salesReport = success;
              this.reportResult = JSON.parse(success.reportResult);
              this.tableData = this.reportResult.Table;
              console.log(this.reportResult)
            });
        }
      // }
    }

    doCustomerSelect(event: any) {
      this.salesReport.customerId = event.actCustomerId;
      this.salesReport.customerName = event.customerName;
      this.salesQuotation.ientActCustomerDetails.customerName =
        event.customerName;
      this.openCustomer(this.salesReport.customerId);
    }

    openCustomer(val: any) {
      const obj = {
        data: val,
        // data1: this.regionDetailValue
      };
      this.api
        .getCustomerDetailsForSearch(obj).subscribe((success: any) => {
          this.customerDetails = success;
          this.salesReport.customerName = success.customerName;
        });
    }


  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  onsearch(){
    this.generateCustomerWisedSalesSummaryReport();
    this.dialog.closeDialog()
  }

  clear(){
    this.salesReport=JSON.parse(JSON.stringify(this.salesReportRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.generateCustomerWisedSalesSummaryReport();
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }



  async customerSalesDetail( tableData: any,
    customerId: any,
    salesSummaryData: any) {
      const obj = {
        data: tableData,
        customerId: customerId,
        salesSummaryData: salesSummaryData,
        regionValue : this.salesReport.regionValue,
      };
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/sales/customer-wise-sales/detail/' + urlJson);
  }
}
