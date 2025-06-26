import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild, computed, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../../app-core/service/core.service';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppService } from '../../../../../app.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, InnerScroll, AppToolTipComponent } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entActVoucherConfig, entSalReceiptNoteSearch } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { SearchCustomerComponent } from '../../../../search/search-customer/search-customer.component';
import { AccoutsStatusTableComponent } from '../../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { AutoSearchCustomerComponent } from '../../../../search/auto-search-customer/auto-search-customer.component';

@Component({
  selector: 'app-receipt-note-search',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [Row, InnerScroll, AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective, CellHeaderDefDirective, SearchComponent, FormsModule, AppToolTipComponent, InputControlComponent, TableStatusSortComponent, SearchCustomerComponent, AccoutsStatusTableComponent,AutoSearchCustomerComponent],
  templateUrl: './receipt-note-search.component.html',
  styleUrl: './receipt-note-search.component.scss'
})
export class ReceiptNoteSearchComponent {
  searchParams = new entSalReceiptNoteSearch();
  searchParamsRAW = new entSalReceiptNoteSearch();
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  voucherConfig = new entActVoucherConfig();
  @ViewChild('l') lform!: NgForm
  customerName: any;
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  voucherId: any = 0;
  voucherConfigId: any = 0;
  regionValueDDL: any = []
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  errorTrue = false;
  idList: any = [];
    status = signal("");
  
  totalInprogressCount: any = 0;
  totalApprovedCount: any = 0;
  columns: any = ["docNo", "cusName", "date", "createdDate", "appDate", "docAmount", "repotingAmount", "statusDescription", "action"];
  columnsName: any = ["Document No", "Customer Name", "Document Date", "Created Date", "Approved Date", "Document Amount", "Reporting Amount", "Status", "Action"];

  tableData: any = [
    //   {
    //   'docNo': 'DOC12345',
    //   'docName': 'Other Document',
    //   'cusName': 'Vendor1',
    //   'date': '28 Feb 2024',
    //   'createdByFullname': 'CCO',
    //   'createdDate': '01-02-2006',
    //   'approveDate': '01-03-2008',
    //   'approveByFullName': 'Purchase officer',
    //   'docsName': 'Other Document',
    //   'currName': 'INR',
    //   'repAmt': '45.00',
    //   'loyal': '125.00',
    //   'status': 'SUSPD',
    //   'statusDescription': 'Suspended',
    // },
    // {
    //   'docNo': 'DOC987456',
    //   'docName': 'Birth Document',
    //   'cusName': 'Vendor2',
    //   'date': '28 Feb 2024',
    //   'createdByFullname': 'CCO',
    //   'createdDate': '29-05-2021',
    //   'approveDate': '01-03-2023',
    //   'approveByFullName': 'Purchase officer1',
    //   'docsName': 'Document',
    //   'currName': 'INR',
    //   'repAmt': '45.00',
    //   'loyal': '125.00',
    //   'status': 'PEVRI',
    //   'statusDescription': 'Pending Verification',
    // },
    // {
    //   'docNo': 'DOC12345',
    //   'docName': 'Other Document',
    //   'cusName': 'Vendor1',
    //   'date': '28 Feb 2024',
    //   'createdByFullname': 'CCO',
    //   'createdDate': '01-02-2006',
    //   'approveDate': '01-03-2008',
    //   'approveByFullName': 'Purchase officer',
    //   'docsName': 'Other Document',
    //   'currName': 'INR',
    //   'repAmt': '45.00',
    //   'loyal': '125.00',
    //   'status': 'SUSPD',
    //   'statusDescription': 'Suspended',
    // },
  ];

  constructor(
    public router: Router,
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

  ) {

  }
  ngOnInit(): void {
    this.init();
  }
  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getSaleReceiptNotesInitialData');
    this.createSalesReceiptNoteSearch();
    this.totalInprogressandApprovedCounts();

  }
  createSalesReceiptNoteSearch() {
    this.accountsService.getNewSaleReceiptNoteSearch().subscribe((success) => {
      this.searchParams = success;

      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.salesReceiptNoteSearch();

    })
  }
  salesReceiptNoteSearch() {
    this.searchParams.regionValue = '';
    this.accountsService.searchSalesReceiptNote(this.searchParams).subscribe((success) => {
      this.tableData = success.lstSalReceiptNoteSearchresultSet;
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
    })
  }
  doSearchCustomer(event: any) {
    this.customerName = event.customerName;
    this.searchParams.lngActcustomerId = event.actCustomerId;
  }
  async createNewReceiptNotes() {
    if (this.lform.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: 'REGI1'
        };
        let urlJson = await this.urlService.encode(obj);
        this.router.navigateByUrl(
          '/home/sales/receipt-note/detail/' + urlJson
        );
      } else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    }
    else {
      this.errorTrue = true;
    }
  }

  async openReceiptNote(id: any) {
    if (id > 0) {
      const obj = {
        data: id,
        data1: 0,
        data2: ''
      };
      const encode = await this.url.encode(obj);
      this.router.navigateByUrl('/home/sales/receipt-note/detail/' + encode);
    }
    else {
      this.data.errorInfoMessage('Please select any one record to open');
    }
  }
  getVoucherDetail(element: any) {
    const obj = {
      data: element,
    };
    this.accountsService
      .getVoucherAccess(obj)
      .subscribe((success) => {
        this.voucherConfigId = success.actVoucherConfigId;
        this.voucherConfig = success;
        this.regionValueDDL = success.plstentDDLClass;
      });
  }
  clear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.customerName='';

    this.data.successMessage('Data Cleared Successfully');
    this.salesReceiptNoteSearch();
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  onSearch() {   
 
    this.salesReceiptNoteSearch();
    this.data.successMessage('Search Executed Successfully');
    this.appSearch.close();
  }
  closeSearch(){
    this.appSearch.close();
    this.appService.setBreadCrumb(this.breadCrumb);

  }
 isEditAllowed = computed(() => {
    return ["APROV", "CANCL"].includes(this.status());
  });
  statusSortSearch(val: any) {
    this.searchParams.strstatusValue = val;
    this.salesReceiptNoteSearch()
  }
  async totalInprogressandApprovedCounts() {
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
    console.log(this.totalInprogressCount, this.totalApprovedCount, 'hi');
  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  pageChanged(event: any) {

  }

  navigateDetail() {
    this.router.navigateByUrl('/home/sales/receipt-note/detail')
  }
  navigateToSales(){
    this.router.navigateByUrl('/home/corporate/sales-menus')
  }
}
