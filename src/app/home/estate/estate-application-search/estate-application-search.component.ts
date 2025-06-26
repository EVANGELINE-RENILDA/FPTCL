import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InnerScroll, Row, ViewLabel } from '../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../app-core/template/search/search.component';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { CoreService } from '../../../app-core/service/core.service';
import { EstateApplicationFormComponent } from '../estate-application-form/estate-application-form.component';
import { AppService } from '../../../app.service';
import { Router } from '@angular/router';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
import { DataService } from '../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { entEstateApplication, entEstateApplicationSearch } from '../../../common/api-services/application-api/application-api.classes';
import { UrlService } from '../../../common/services/url/url.service';

@Component({
  selector: 'app-estate-application-search',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, CellHeaderDefDirective, IconButtonComponent,
    InnerScroll, InputControlComponent, SearchComponent, Row, FormsModule, AppDatePipe, ViewLabel],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './estate-application-search.component.html',
  styleUrl: './estate-application-search.component.scss'
})
export class EstateApplicationSearchComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }

  searchParams = new entEstateApplicationSearch();
  searchParamsRAW = new entEstateApplicationSearch();
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  columns: any = ['estateApplicationRefNo', 'fileNo',  'appliedBranchDescription', 'statusDescription','applicationStageDescription', 'actionStatusDescription',  'action'];
  columnsName: any = ["Estate App Ref No", "File No", "Applied Branch", "Application Status", 'Application Stage',"Action Status", "Action"];

  tableData: any = [];

  errorTrue = false

  constructor(
    public dialog: CoreService,
    public appService: AppService,
    public router: Router,
    public initialData: InitialDataService,
    public data: DataService,
    public apiService: ApplicationApiService,
    public url: UrlService
  ) {

  }
  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  async init() {
    await this.data.checkToken();
    await this.initialData.getDDL('getInitialDataForEstateApplication');
    this.createEstateApplicationSearch();
    // this.initialData = this.getInitialDataForEstateApplication()
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.sortColumn = event.sortColumnName;
    this.searchParams.sortOrder = event.sortOrder;
    this.searchEstateAppication();
  }
  createEstateApplicationSearch(type?:any){
    this.apiService.createNewEstateApplicationSearch().subscribe((success)=>{
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      if(type === 'clear'){
        this.apiService.searchEstateApplication(this.searchParams).subscribe((success)=>{
          this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
          this.tableData = success.result;
        })
        this.data.successMessage('Data Cleared Successfully')
      }
      if(type !== 'clear'){
        this.searchEstateAppication()

      }
    })
  }
  searchEstateAppication(){
    this.apiService.searchEstateApplication(this.searchParams).subscribe((success)=>{
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.tableData = success.result;
      this.dialog.closeDialog();
    })
  }
  async navigateToDetail(id: any) {
    let obj = {
      currentIndex: 0,
      array: [id]
    }
    let encodeId = await this.url.encode(obj)
    this.router.navigateByUrl('/home/estate/estate-detail/' + encodeId);
  }
  async selectAllNavigate() {
    if (this.__selectedItems.array.length === 0) {
      return;
    }
    let encodeId = await this.url.encode(this.__selectedItems);
    this.router.navigateByUrl('/home/estate/estate-detail/' + encodeId);


  }

  estateApplication = new entEstateApplication();
  trustLeadId = 0;
  @ViewChild('l') lForm!: NgForm;
  @ViewChild('addDialog', { static: false })
  addDialog!: ElementRef;
createEstateApplication(){


  const obj = {
    data: this.trustLeadId
  }
  if (this.lForm.valid) {
    this.apiService.createEstateApplication(obj).subscribe(async (success)=>{
      this.estateApplication = success
      let dialogResponse: any = await this.dialog.openDialog(this.addDialog, {
        disableClose: true,
        height: '255px',
        width: '97%',
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
saveestateApplication(){

  this.apiService.saveEstateApplication(this.estateApplication).subscribe((success)=>{
    this.estateApplication = success;
    this.dialog.closeAll();
    this.data.showErrorMessage = false;
    this.navigateToDetail(success.estateApplicationId)

  })
}
}
