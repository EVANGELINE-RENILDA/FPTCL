import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { Router } from '@angular/router';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { entOrganizationBankDetail, entTrustWithdrawalApplication, entTrustWithdrawalSearch } from '../../../../common/api-services/application-api/application-api.classes';
import { UrlService } from '../../../../common/services/url/url.service';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { ErrorInfoComponent } from '../../../../app-core/error-info/error-info.component';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';

@Component({
  selector: 'app-trust-withdrawal-search',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, CellHeaderDefDirective, IconButtonComponent, InnerScroll, InputControlComponent, SearchComponent, Row, FormsModule, AppDatePipe, ViewLabel, ErrorMessageComponent, ErrorInfoComponent, CheckboxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trust-withdrawal-search.component.html',
  styleUrl: './trust-withdrawal-search.component.scss'
})
export class TrustWithdrawalSearchComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('l') lForm!: NgForm;
  @ViewChild('x') xForm!: NgForm;
  searchParams = new entTrustWithdrawalSearch();
  searchParamsRAW = new entTrustWithdrawalSearch();
  trustWithdrawal = new entTrustWithdrawalApplication()
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  columns: any = ['applicationRefNo', 'beneficiaryCustomerName', 'withdrawalTypeDescription', 'trustAccountNo', 'enteredDate', 'assignedOfficer', 'action'];
  sortColumns: any = ['applicationRefNo', 'beneficiaryCustomerName', 'withdrawalTypeDescription', 'trustAccountNo', 'enteredDate', 'assignedOfficer'];
  columnsName: any = ['', '', '', '', '', '', ''];
  sourcePrimaryKey = 0;
  tableData: any = [];

  constructor(
    public dialog: CoreService,
    public appService: AppService,
    public router: Router,
    public data: DataService,
    public initialData: InitialDataService,
    public apiService: ApplicationApiService,
    public urlService: UrlService,
    public appStorage: AppStorageService
  ) {
    this.appService.helpFile ='Trust%20Withdrawal%20Search.pdf'

  }
  ngOnInit(): void {
    this.init();


  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  async init() {
    await this.data.checkToken();
    await this.initialData.getDDL('getInitialDataForTrustWithDrawal');
    await this.appStorage.get('sourcePrimaryKey').then((val: any) => {
      console.log(val);

      if (val !== null && val !== undefined && val !== 0) {
        this.sourcePrimaryKey = val;
        const obj = {
          data: val
        }
        this.apiService.createTrustWithdrawalApplication(obj).subscribe(async (success) => {
          let dialogResponse: any = await this.dialog.openDialog(this.willInfo, {
            disableClose: true,
            height: '450px',
          width: '100%',
          maxWidth: '1170px',

          });
          console.log(dialogResponse);
          if (dialogResponse) {
            this.navigateToDetail(dialogResponse.trustWithdrawalApplicationId);
          }
        })
      } else {
        this.sourcePrimaryKey = 0;
      }
    })
    this.createTrustWithdrawalSearch();
  }
  createTrustWithdrawalSearch() {
    this.apiService.createNewTrustWithdrawalSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.trustWithdrawalSearch()
    })
  }
  trustWithdrawalSearch() {
    this.apiService.searchTrustWithdrawal(this.searchParams).subscribe((success) => {
      this.tableData = success.result;
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
    })
  }
  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.trustWithdrawalSearch();
    // this.createTrustWithdrawalSearch();
    this.appSearch?.close()
  }
  clear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.accountNo = ''
    this.data.successMessage('Data Cleared Successfully');
    this.onSearch()
  }
  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.sortColumn = event.sortColumnName;
    this.searchParams.sortOrder = event.sortOrder;
    this.trustWithdrawalSearch();

  }

  onSelect(event: any) {
    this.__selectedItems = event;
  }
  errorTrue = false;
  trustLeadId: any;
  @ViewChild('willInfo', { static: false })
  willInfo!: ElementRef;
  accountsDDL: any
  async createNewWillApplication() {
    this.errorTrue = false
    const obj = {
      data: this.trustLeadId
    }
    if (this.lForm.valid) {
      this.apiService.createTrustWithdrawalApplication(obj).subscribe(async (success) => {
        this.trustWithdrawal = success;
        this.accountsDDL = success.ientDDL.value
        let dialogResponse: any = await this.dialog.openDialog(this.willInfo, {
          disableClose: true,
          height: '450px',
          width: '100%',
          maxWidth: '1170px',
          // data: {
          //   customer: success
          // }
        });
        // console.log(dialogResponse);
        // if (dialogResponse) {
        //   this.navigateToDetail(dialogResponse.customerId);
        // }
      })
    }
    else {
      this.data.errorInfoMessage('Select Any Lead Ref No')
    }
  }
  async navigateToDetail(id: any) {
    let obj = {
      currentIndex: 0,
      array: [id]
    }
    let encodeId = await this.urlService.encode(obj)
    this.router.navigateByUrl('/home/trust/trust-withdrawal/detail/' + encodeId);
  }
  async selectAllNavigate() {
    if (this.__selectedItems.array.length === 0) {
      return;
    }
    let encodeId = await this.urlService.encode(this.__selectedItems);
    this.router.navigateByUrl('home/trust/trust-withdrawal/detail/' + encodeId)
  }
  saveTrustWithdrawal() {
    // this.trustWithdrawal.appliedBranchValue = 'PVILA';
    this.trustWithdrawal.leadId = this.trustLeadId
    if (this.xForm.valid) {
      this.apiService.saveTrustWithdrawalApplication(this.trustWithdrawal).subscribe((success) => {
        this.dialog.closeAll()
        this.navigateToDetail(success.trustWithdrawalApplicationId)
      })
    }
    else {
      this.errorTrue = true
    }
  }
  organizationDDl = []
  getOrgByType(val: any) {
    // const obj = {
    //   data: val
    // }
    // this.apiService.getOrganizationBasedOnWithDrawTypes(obj).subscribe((success) => {
    //   this.organizationDDl = success.data[0].value
    // })
  }
  subTypeValue = []
  getSubTypeByType(val: any) {
    const obj = {
      data: val
    }
    this.apiService.getSubtypeBasedOnWithdrawalType(obj).subscribe((success) => {
      this.subTypeValue = success.data[0].value
      this.organizationDDl = success.data[1].value
    }) 
  }
  withdrawalByOrg(event: any) {
    if (event.target.checked === true) {
      // this.trustWithdrawal.withdrawlForOrganization = 'Y'
    }
    else {
      // this.trustWithdrawal.withdrawlForOrganization = 'N';
      // this.trustWithdrawal.organizationId = 0;
      // this.trustWithdrawal.organizationBankId = 0
      this.accountNo = ''
    }
  }
  getValuesOfAccNo(val: any) {
    const obj = {
      data: val
    }
    this.apiService.getBenificiaryBasedOnTrust(obj).subscribe((success) => {
      this.trustWithdrawal.beneficiaryCustomerId = success.customerId
      this.trustWithdrawal.beneficiaryCustomerName = success.customerName
      // this.trustWithdrawal.relationshipTypeValue = success.relationshipValue
    })
  }
  orgBankDDL:any
  getOrgDetails(val:any){
    const obj = {
      data: val
    }
    this.apiService.getOrganizationDeatilsByOrganization(obj).subscribe((success)=>{
      // console.log(success);
      this.orgBankDDL = success.data[0].value
      // this.trustWithdrawal.organizationAccountNo = ''

    })
  }
  accountNo = ''
  getAccountNoFromBank(event:any){
    this.orgBankDDL.forEach((element:any) => {
      if(element.id === event){
        console.log(element);
        // this.trustWithdrawal.acc
        this.accountNo = element.constant
      }
    });
  }
  clearWithdrawal(){
    const obj = {
      data: this.trustLeadId
    }
    this.apiService.createTrustWithdrawalApplication(obj).subscribe(async (success) => {
      this.trustWithdrawal = success;
      this.accountsDDL = success.ientDDL.value
    this.data.showErrorMessage = false;
    this.data.successMessage('Data Cleared Successfully')
  })
}
}
