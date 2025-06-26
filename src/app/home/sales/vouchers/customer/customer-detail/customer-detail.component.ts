import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ContentModule } from '../../../../../app-core/app-template/content/content.module';
import { TabContainerModule } from '../../../../../app-core/app-template/tab-container/tab-container.module';
import { TabItemModule } from '../../../../../app-core/app-template/tab-item/tab-item.module';
import { ViewLabel, Row } from '../../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppService } from '../../../../../app.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { ActivatedRoute, Router } from '@angular/router';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entActCustomerDetails, entActCustomerRegionAccess } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { CustomerDetailAddressComponent } from '../customer-detail-address/customer-detail-address.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CustomerDetailContactComponent } from '../customer-detail-contact/customer-detail-contact.component';
import { CustomerDetailNotesComponent } from '../customer-detail-notes/customer-detail-notes.component';
import { CustomerDetailAttachmentComponent } from '../customer-detail-attachment/customer-detail-attachment.component';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';
import { SearchDebitComponent } from '../../../../search/search-debit/search-debit.component';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [ViewLabel, Row, InputControlComponent, TabContainerModule, TabItemModule, ContentModule, AppDatePipe, AppTableComponent,
    CellDefDirective, CellHeaderDefDirective, SearchComponent, IconButtonComponent, NgClass, FooterToggleDirective, MatMenuModule, DropZoneComponent, CustomerDetailAddressComponent, CustomerDetailContactComponent, FormsModule, CustomerDetailNotesComponent, CustomerDetailAttachmentComponent,SearchDebitComponent],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerDetailComponent {
  errorTrue = false;
  customer = new entActCustomerDetails();
  regionAccess = new entActCustomerRegionAccess()
  newAddressEdit = false;

  @ViewChild('detailstab') detailstabform!: NgForm;
  @ViewChild('region') regionform!: NgForm;
  @Input() parentData: any;
  pageId = 'AJVSC';
  selectedTab = 0;
  region: any = ['index','regionDescription', 'enteredByFullName','date','modifiedByFullName','modifiedDate','ledgerName','add','matmenu'];
  regionName: any = ['#', 'Region', 'Entered By','Entered Date','Modified By','Modified Date','Ledger Name','',''];
  tableRegionData:any=[]
  id: any = 0;
  items: any = ['sNo', 'sqNo', 'item', 'ledger', 'quantity', 'unitPrice', 'dis', 'afterDiscount', 'tax', 'total', 'add'];
  options = {
    type: 'accountsPath',
  };
  itemsName: any = [
    ' ',
    'SI No ',
    'Item ',
    'Item Ledger',
    'Quantity',
    'Unit Price',
    'Dis',
    'After Discount',
    'Tax',
    'Total',
  ];
  qutationData = [];

  notes: any = ['sno', 'notes', 'createdBy', 'dateTime', 'add'];
  notesName: any = ['', 'Notes', 'Created By', 'Date | Time', ''];
  accordianOpen = true;
  accordianContent = true;
  tableItemData = [];
  tableNoteData = [];
  tableAttachmentData = [];
  DDLCurrencyValue: any = [];
  addressColumn: any = ['address', 'type', 'dateTime', 'status', 'add'];
  addressColumnName: any = ['Address', 'Type', 'Created Date', 'Status', 'Action'];
  tableAddressData: any = [
    // { 'sno': 1, 'address': 'line 1, line 2 line 3 Chennai, India', 'createdBy': '	HeadOffice', 'dateTime': '03 May 2024', 'status': 'Active' }
  ];
  attachment: any = ['sno', 'fileName', 'fileFormat', 'size', 'add'];
  attachmentsName: any = ['#', 'File Name', 'File Format', 'Size', 'add'];
  statusOnSo: any = ['', 'changeBy', 'date', 'status'];
  statusOnSoName: any = ['', 'Changed By', 'Changed Date', 'Status'];

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('notesDialog') notesDialog!: TemplateRef<any>;
  @ViewChild('regionDialog') regionDialog!: TemplateRef<any>;
  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;

  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword';


  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  currencyValue = ''

  constructor(
    public apiService: ApplicationApiService,
    public appService: AppService,
    public data: DataService,
    public dialog: CoreService,
    public initialData: InitialDataService,
    public route: ActivatedRoute,
    public url: UrlService,
    public accountsService: AccountsApiService,
    public router: Router,
    public storage: AppStorageService,
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
    this.storage.get('currencyValue').then((val) =>{
      this.currencyValue = val
    })
  }

  async init() {
    await this.data.checkToken();
    this.appService.setBreadCrumb(this.breadCrumb);
    let paramsId: any = this.route.snapshot.paramMap.get('id');
    this.id = await this.url.decode(paramsId);
    this.initialData.getAcccountsDDL('getCustomerInitialData');
    if (this.id > 0) {
      this.openSalesCustomer();
    } else {
      this.createNewSalesCustomer();
    }
  }
  openSalesCustomer(id?: any) {
    this.errorTrue = false;
    const obj = {
      data: this.id
    }
    this.accountsService.openCustomer(obj).subscribe((success: any) => {
      this.customer = success;
      this.ddlSetup(true);
      // if (success.msg.infoMessage) {
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      // }
    })
  }
  createNewSalesCustomer() {
    this.errorTrue = false;
    this.accountsService.createNewCustomer().subscribe(async (success) => {
      this.customer = success;
      // this.ddlSetup()
    })
  }
  getNotesValue(val: any) {
    this.customer = val;

  }
  saveSalesCustomer() {

    if (this.detailstabform.valid) {
      this.accountsService.savecustomer(this.customer).subscribe((success) => {
        this.customer = success;
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  navigateToList() {
    this.router.navigateByUrl('/home/sales/customer/search')
  }
  onSelectTab(val: any) {
    this.selectedTab = val;
  }

  async createNewNotes() {
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: '400px',
      width: '900px',
      maxWidth: '1170px',
    })
  }
  async ddlSetup(val?: any) {
    debugger
    this.DDLCurrencyValue = [];
    if (val) {
      this.customer.currencyCodeValue = "";
    }
    let currencyValue = await this.currencyValue;
    if (this.customer.customerSubTypeValue === 'LOCAL') {
      let index = this.initialData.DDLValues.configcustCurrencyCode.map((e: any) => e.constant).indexOf(currencyValue);
      if (index !== -1) {
        this.DDLCurrencyValue.push(this.initialData.DDLValues.configcustCurrencyCode[index]);
      }
    }
    else {
      this.initialData.DDLValues.configcustCurrencyCode.forEach((element: any) => {
        if (element.constant !== currencyValue) {
          this.DDLCurrencyValue.push(element)
        }
      });
    }
  }
  saveNotes() {

  }
  clearCustomer() {
    this.createNewSalesCustomer();
    this.data.successMessage('Data Cleared Successfully');
  }
  doSelectRegionLedger(event: any) {
    this.regionAccess.ledgerId = event.actLedgerId;
    this.regionAccess.ledgerName = event.ledgerName;
   
  }
  async createNewRegion(val: any) {
    if(val ===0){

      this.createRegionAccess();
    }
    else{
      this.openRegionStatus(val)
    }
    let dialogResponse: any = await this.dialog.openDialog(this.regionDialog, {
      disableClose: true,
      height: '300px',
      width: '500px',
      maxWidth: '1170px',
    })
  }
  createRegionAccess() {
    this.errorTrue = false;
   
    this.accountsService.createNewCustomerRegionAccess(this.options).subscribe((success) => {
      this.regionAccess = success;
    })
  }
  openRegionStatus(id: any,type?:any) {

    
    const obj = {
      data: id
    }
    this.accountsService.openCustomerRegionAccess(obj, this.options).subscribe((success) => {
      this.regionAccess = success;
      this.tableRegionData=success.plstentActCustomerRegionAccessHistory
      if(type==='refresh'){
        this.data.successMessage('Data Refreshed Successfully')
      }
    })
  }
  saveCustomerRegionAccess() {
    this.regionAccess.actCustomerId = this.id
    if (this.regionform.valid) {
      this.accountsService.saveCustomerRegionAccess(this.regionAccess, this.options).subscribe((success) => {
        this.customer.plstentActCustomerRegionAccess = success.plstentActCustomerRegionAccess;
        
        if (success.msg.infoMessage.msgDescription) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
          this.dialog.closeDialog();
        }
       
      })
      
    }
    else {
      this.errorTrue = true
    }
  }
  regionClear(){
    this.createRegionAccess();
    this.data.successMessage('Data Cleared Successfully');
  }
  //attachment
  async createNewAttachment() {

    let dialogResponse: any = await this.dialog.openDialog(this.attachmentDialog, {
      disableClose: true,
      height: '300px',
      width: '100%',
      maxWidth: '1170px',
    })

  }
  navigateToSales(){
    this.router.navigateByUrl('/home/corporate/sales-menus')
  }
}
