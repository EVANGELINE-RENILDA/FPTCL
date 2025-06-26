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

@Component({
  selector: 'app-stock-register-report-search',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, IconButtonComponent, InnerScroll, InputControlComponent, SearchComponent, Row, FormsModule, CellHeaderDefDirective, AppDatePipe, AppAccessDirective, ButtonAccessDirective, MatTooltipModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './stock-register-report-search.component.html',
  styleUrl: './stock-register-report-search.component.scss'
})
export class StockRegisterReportSearchComponent {
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
    columns: any = ["leadRefNo", "serviceRefNo", "customerName", "leadTypeDescription", "productTypeDescription","Status","balance","Inwards","Outwards","Closing Balance","Opening"];
    columnsName: any = ["#", "	Type Name", "Sub-Type Name ", "Item Name	", "Item Code","Unit","Opening Balance","Inwards","Outwards	","Closing Balance","Open"];
    
   
    tableData: any = [
      {
        'leadRefNo':'test',
        'serviceRefNo':12345,
        'customerName':56778,
        'leadTypeDescription':890,
        'productTypeDescription':3456
      }
    ];
    pagination = {
      pageNumber: 1,
      pageSize: 25, 
      totalCount: 0
    }
  
    searchParams = new entCustomerServiceLeadSearch();
    searchParamsRAW = new entCustomerServiceLeadSearch();
   
  
    constructor(public router: Router,
      public apiService: ApplicationApiService,
      public data: DataService,
      public appStorage: AppStorageService,
      public appService: AppService,
      public route: ActivatedRoute,
      public dialog: CoreService,
      public url: UrlService,
      public initialData: InitialDataService
    ) {
  
    }
    ngOnInit(): void {
     
  
      this.init();
    }
  
    async init() {
      await this.data.checkToken();
      this.appService.setBreadCrumb(this.breadCrumb);
    
    }
    pageChanged(event: any) {
      this.searchParams.pageNumber = event.pageNumber;
      this.searchParams.pageSize = event.pageSize;

  
    }
  
           
    onSelect(event: any) {
      this.__selectedItems = event;
      console.log(this.__selectedItems);
    }
    
  
    
    
    async navigateToDetail(id?: any) {
      let obj = {
        currentIndex: 0,
        array: [id]
      }
      let encodeId = await this.url.encode(obj);
      this.router.navigateByUrl('/home/inventory/configuration/item/detail/' + encodeId);
    }
    
   
  }
