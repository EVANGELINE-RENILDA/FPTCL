import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { FormsModule, NgForm } from '@angular/forms';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { entTrustSettlementApplication, entTrustSettlementSearch } from '../../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { DataService } from '../../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { ErrorInfoComponent } from '../../../../app-core/error-info/error-info.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';

@Component({
  selector: 'app-trust-settlement-search',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, CellHeaderDefDirective, IconButtonComponent, InnerScroll, InputControlComponent, SearchComponent, Row, FormsModule, AppDatePipe, ViewLabel, ErrorInfoComponent, ErrorMessageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trust-settlement-search.component.html',
  styleUrl: './trust-settlement-search.component.scss'
})

export class TrustSettlementSearchComponent {
  searchParams = new entTrustSettlementSearch();
  searchParamsRAW = new entTrustSettlementSearch();
  trustSettlement = new entTrustSettlementApplication()
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
    sortColumns:'',
    sortOrder: false
  };
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  columns: any = ['applicationRefNo', 'beneficiaryCustomerName', 'trustAccountNo', 'enteredByFullname', 'applicationStageDescription', 'action'];
  sortColumns: any = ['applicationRefNo', 'beneficiaryCustomerName', 'trustAccountNo', 'enteredByFullname', 'applicationStageDescription'];
  columnsName: any = ['', '', '', '', '', ''];
  @ViewChild('willInfo', { static: false })
  willInfo!: ElementRef;
  tableData: any = [];
  trustLeadId: any = '';
  errorTrue = false;
  sourcePrimaryKey = 0
  @ViewChild('x') xForm!: NgForm;
  @ViewChild('l') lForm!: NgForm;
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
    this.appService.helpFile ='Trust%20Settlement%20Search.pdf'

  } 
  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  async init() {
    await this.data.checkToken();
    await this.initialData.getDDL('getInitialDataForTrustSettlement');
    await this.appStorage.get('sourcePrimaryKey').then((val: any) => {
      console.log(val);
      
      if (val !== null && val !== undefined && val !== 0) {
        this.sourcePrimaryKey = val;
        const obj = {
          data: val
        }
        this.apiService.createTrustSettlementApplication(obj).subscribe(async (success) => {
          let dialogResponse: any = await this.dialog.openDialog(this.willInfo, {
            disableClose: true,
            height: '350px',
            width: '100%',
            maxWidth: '1170px',
           
          });
          console.log(dialogResponse);
          if (dialogResponse) {
            this.navigateToDetail(dialogResponse.trustSettlementApplicationId);
          }
        })
      } else {
        this.sourcePrimaryKey = 0;
      }
    })
    this.createTrustSettlementSearch();
  }

  createTrustSettlementSearch() {
    this.apiService.createNewTrustSettlementSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.trustSettlementSearch()
    })
  }
  trustSettlementSearch() {
    this.apiService.searchTrustSettlement(this.searchParams).subscribe((success) => {
      this.tableData = success.result;
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
    })
  }
  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.trustSettlementSearch();
    // this.createTrustSettlementSesarch();
    this.appSearch?.close()
  }
  clear() {
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.trustSettlementSearch();
  }
  clearDetail() {
    const obj = {
      data: this.trustSettlement.leadId
    }
    this.apiService.createTrustSettlementApplication(obj).subscribe(async (success) => {
      this.trustSettlement = success
      this.errorTrue = false
      this.data.successMessage('Data Cleared Successfully');
    })
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.sortColumn = event.sortColumnName;
    this.searchParams.sortOrder = event.sortOrder;
    this.trustSettlementSearch();

  }

  onSelect(event: any) {
    this.__selectedItems = event;
  }
  accountsDDL: any
  async createNewWillApplication() {
    const obj = {
      data: this.trustLeadId
    }
    if (this.lForm.valid) {
      this.apiService.createTrustSettlementApplication(obj).subscribe(async (success) => {
        this.trustSettlement = success;
        this.accountsDDL = success.ientDDL.value
        this.errorTrue = false
        this.data.showErrorMessage = false
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
    this.router.navigateByUrl('/home/trust/trust-settlement/detail/' + encodeId);
  }
  saveTrustSettlement() {
    // this.trustSettlement.appliedBranchValue = 'PVILA';
    this.trustSettlement.leadId = this.trustLeadId;
    if (this.xForm.valid) {
      this.apiService.saveTrustSettlementApplication(this.trustSettlement).subscribe((success: any) => {
        this.dialog.closeAll()
        this.navigateToDetail(success.trustSettlementApplicationId)
      })
    }
    else {
      this.errorTrue = true
    }
  }
  async selectAllNavigate() {
    if (this.__selectedItems.array.length === 0) {
      return;
    }
    let encodeId = await this.urlService.encode(this.__selectedItems);
    this.router.navigateByUrl('/home/trust/trust-settlement/detail/' + encodeId);
  }
  getValuesOfAccNo(val: any) {
    const obj = {
      data: val
    }
    this.apiService.getBenificiaryBasedOnTrust(obj).subscribe((success) => {
      this.trustSettlement.guardianName = success.gurdianName
      this.trustSettlement.relationshipTypeValue = success.relationshipValue
    })
  }
}