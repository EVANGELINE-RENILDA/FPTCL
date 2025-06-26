import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { FormsModule, NgForm } from '@angular/forms';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppService } from '../../../../app.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { Router } from '@angular/router';
import { DataService } from '../../../../common/services/data/data.service';
import { AdminApiService } from '../../../../common/api-services/admin-api/admin-api.service';
import { CoreService } from '../../../../app-core/service/core.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { AppDatePipe } from "../../../../common/pipes/app-date/app-date.pipe";
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { ErrorInfoComponent } from '../../../../app-core/error-info/error-info.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { entDiary, entDiaryEntry, entDiaryEntrySearch } from '../../../../common/api-services/application-api/application-api.classes';

@Component({
  selector: 'app-my-diary-search',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './my-diary-search.component.html',
  styleUrl: './my-diary-search.component.scss',
  imports: [AppTableComponent, FormsModule, ViewLabel, InputControlComponent, CellDefDirective, CellHeaderDefDirective, AppAccessDirective, AppDatePipe, Row, SearchComponent, IconButtonComponent, InnerScroll, ErrorInfoComponent, ErrorMessageComponent]
})
export class MyDiarySearchComponent {
  pageId: any = 'MYDRY';
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  };
  searchParams = new entDiaryEntrySearch()
  searchParamsRAW = new entDiaryEntrySearch()
  columns: any = ['date','time', 'eventTypeDescription', 'title', 'priorityDescription', 'corresDescription', 'reminderDatetime', 'status', 'action'];
  sortColumns: any = ['date','time', 'eventTypeDescription', 'title', 'priorityDescription', 'corresDescription', 'reminderDatetime', 'status'];
  columnsName: any = ['Date','Time', 'Event', 'Title', 'Priority', 'Correspondence', 'Start Reminder On', 'Status', 'Action'];
  tableData: any = [];

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;
  currentDate = '';
  options = {
    type: 'adminPath',
  };
  diaryData = new entDiaryEntry();
  diaryDataRAW = new entDiaryEntry();
  @ViewChild('detailDialog', { static: false })
  detailDialog!: TemplateRef<any>;
  @ViewChild('reminderDialog', { static: false })
  reminderDialog!: TemplateRef<any>;
  constructor(
    public appService: AppService,
    public apiService: ApplicationApiService,
    public url: UrlService,
    public router: Router,
    public data: DataService,
    public adminService: AdminApiService,
    public dialog: CoreService,
    public initialData: InitialDataService,
    public storage: AppStorageService
  ) {

  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  ngOnInit(): void {
    this.init()
  }
  async init() {
    await this.data.checkToken();
     this.appService.helpFile ='My%20Diary.pdf'
    await this.initialData.getDDL('getInitialDataForDiaryEntry', this.options);
    this.currentDate = this.appService.getCurrentDate();
    this.storage.get('newRemainder').then(async (val) => {
      await  this.createDiarySearch()
      if (val === 0) {
        this.createNewDiary()
      }
    });
    this.storage.get('oldRemainder').then((val) => {
      if (val !== 0) {
        this.openDiaryData(val)
      }
    });
  }
  createDiarySearch(type?: any) {

    this.apiService.createDiaryEntrySearch(this.options).subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchDiary()

      if (type !== 'clear') {
      }
      else {
        this.data.successMessage('Data Cleared Successfully')
      }
    })
  }
  searchDiary() {
    this.searchParams.staffUserId = this.appService.userLoginId
    this.apiService.searchDiaryEntry(this.searchParams, this.options).subscribe((success) => {
      this.tableData = success.searchResult;
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;

    })
  }
  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.istrSortOrder = event.sortOrder;
    this.searchDiary();
  }
  onSearch() {
    this.searchDiary();
    this.dialog.closeAll();
    this.data.successMessage('Search Executed Successfully');

  }
  async deatilDialogBox() {
    this.data.showErrorMessage = false;
    this.errorTrue = false
    let dialogResponse: any = await this.dialog.openDialog(this.detailDialog, {
      height: '500px',
      width: '900px',
      maxWidth: '1170px',
    });
    if (dialogResponse) {
    }
  }

  dialogClose() {
    this.dialog.closeAll();
    this.data.showErrorMessage = false
  }

  // createNewdiary() {
  //   this.apiService.createDiary().subscribe((success) => {
  //     this.diaryData = success;
  //     this.deatilDialogBox()
  //   })
  // }
  // saveNewDiary() {
  //   this.diaryData.
  // }
  newDataData = false
  createNewDiary() {
    this.apiService.createDiaryEntry().subscribe((success) => {
      this.diaryData = success;
      this.errorTrue = false;
      this.newDataData = true;
      this.deatilDialogBox()
    })
  }
  errorTrue = false;

  @ViewChild('x') x!: NgForm;
  async saveDiaryData() {
    debugger
    if (this.x.valid) {
      if(this.tableData.length !==0){

        this.diaryData.diaryId =  this.tableData[0].diaryId
      }
      // this.diaryData.diaryId = this.appService.myDiaryId;
      console.log(this.diaryData.diaryEntryId);

      this.apiService.saveDiaryEntry(this.diaryData).subscribe((success) => {
        this.tableData = success.lstentDiaryEntry;
        this.dialog.closeDialog();
        // this.searchDiary()
        this.data.showErrorMessage = false;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);

      })
    }
    else {
      this.errorTrue = true
    }


  }
  clearDiary() {
    this.diaryData = JSON.parse(JSON.stringify(this.diaryDataRAW));
    this.errorTrue = false;
    this.data.successMessage('Data Cleared Successfully')
  }
  openDiaryData(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openDiaryEntry(obj).subscribe((success) => {
      this.diaryData = success;
      this.newDataData = true;
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      this.deatilDialogBox()
    })
  }
  refreshDiary() {
    const obj = {
      data: this.diaryData.diaryEntryId
    }
    this.apiService.openDiaryEntry(obj).subscribe((success) => {
      this.diaryData = success;
      this.data.successMessage('Data Refreshed Successfully')
    })
  }

}
