import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InnerScroll, Row } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { entCustomerSearch, entTrustApplicationSearch } from '../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { AppDatePipe } from "../../../../common/pipes/app-date/app-date.pipe";
import { TrustApplicationFormComponent } from '../trust-application-form/trust-application-form.component';
import { StorageService } from '../../../../common/services/storage/storage.service';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';

@Component({
  selector: 'app-trust-application-list',
  standalone: true,
  templateUrl: './trust-application-list.component.html',
  styleUrl: './trust-application-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [AppTableComponent, CellDefDirective, CellHeaderDefDirective, IconButtonComponent, InnerScroll, InputControlComponent, SearchComponent, Row, FormsModule, AppDatePipe, AppAccessDirective, ButtonAccessDirective,]
})
export class TrustApplicationListComponent {

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  columns: any = ["trustApplRefNo", "fileNo", "applicantName", "branchDescription", "settledAmount", "stageDescription", "assignedOfficer", "action"];
  sortColumns: any = ["trustApplRefNo", "fileNo", "applicantName", "branchDescription", "settledAmount", "stageDescription", "assignedOfficer"];
  columnsName: any = ["Trust Application Ref No", "Trust Account No", "Applicant Name", "Applied Branch", "Settled Amount", "Application Status", "Action Status", ""];
  tableData: any = [];
  idList: any = [];
  isSelectedAll = false;
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  pageId = 'TAPSR'
  trustLeadId: any = ''
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
    sortColumns:'',
    sortOrder: false
  };
  errorTrue = false
  options = {
    hideFullSpinner: true
  }
  @ViewChild('l') lForm!: NgForm;
  searchParams = new entTrustApplicationSearch();

  sourcePrimaryKey = 0;

  constructor(public router: Router,
    public apiService: ApplicationApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public urlService: UrlService,
    public storage: StorageService
  ) {
    this.appService.helpFile ='Trust%20Application%20Search.pdf'

  }
  async ngOnInit(): Promise<void> {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {

    await this.data.checkToken();
    await this.appStorage.get('sourcePrimaryKey').then((val: any) => {
      if (val !== null && val !== undefined && val !== 0) {
        this.sourcePrimaryKey = val;
        const obj = {
          data: val
        }
        this.apiService.createTrustApplication(obj).subscribe(async (success) => {
          let dialogResponse: any = await this.dialog.openDialog(TrustApplicationFormComponent, {
            disableClose: true,
            height: '350px',
            width: '100%',
            maxWidth: '1170px',
            data: {
              trustApplication: success
            }
          });
          console.log(dialogResponse);
          if (dialogResponse) {
            this.navigateToDetail(dialogResponse.trustApplicationId);
          }
        })
      } else {
        this.sourcePrimaryKey = 0;
      }
    })
    await this.initialData.getDDL('getInitialDataForTrustApplication', this.options);
    this.createTrustApplicationSearch();

  }

  createTrustApplicationSearch() {
    this.apiService.createNewTrustApplicationSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchTrustApplication();
    })
  }
  searchTrustApplication() {
    this.apiService.searchTrustApplication(this.searchParams).subscribe((success) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.result;
    })
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');

    this.searchParams.pageNumber = 1;
    this.searchTrustApplication();
    this.appSearch.close();
  }
  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchTrustApplication();
  }



  async selectAllNavigate() {
    if (this.__selectedItems.array.length === 0) {
      return;
    }
    let encodeId = await this.urlService.encode(this.__selectedItems);
    this.router.navigateByUrl('/home/trust/trust-application/detail/' + encodeId);
  }

  async navigateToDetail(id: any) {
    let obj = {
      currentIndex: 0,
      array: [id]
    }
    let encodeId = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/trust/trust-application/detail/' + encodeId);
  }
  async createNewTrustApplication() {
    const obj = {
      data: this.trustLeadId
    }
    if (this.lForm.valid) {
      this.apiService.createTrustApplication(obj).subscribe(async (success) => {
        let dialogResponse: any = await this.dialog.openDialog(TrustApplicationFormComponent, {
          disableClose: true,
          height: '350px',
          width: '100%',
          maxWidth: '1170px',
          data: {
            trustApplication: success
          }
        });
        console.log(dialogResponse);
        if (dialogResponse) {
          this.navigateToDetail(dialogResponse.trustApplicationId);
        }
      })
    }
    else {
      this.data.errorInfoMessage('Select Any Lead Ref No')
    }
  }

}
