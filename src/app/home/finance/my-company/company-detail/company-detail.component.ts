import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass, JsonPipe, SlicePipe } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TabContainerModule } from '../../../../app-core/app-template/tab-container/tab-container.module';
import { TabItemModule } from '../../../../app-core/app-template/tab-item/tab-item.module';
import {
  Row,
  ViewLabel,
  InnerScroll,
  AppToolTipComponent,
} from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { DocumentsComponent } from '../../../../app-core/template/documents/documents.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { MultiPageUrlComponent } from '../../../../app-core/template/multi-page-url/multi-page-url.component';
import { StatusHistoryComponent } from '../../../../app-core/template/status-history/status-history.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { CustomerServiceListComponent } from '../../../crm/customer-service/customer-service-list/customer-service-list.component';
import { CustomerUpdateListComponent } from '../../../crm/customer-update/customer-update-list/customer-update-list.component';
import { LeadListComponent } from '../../../crm/lead/lead-list/lead-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { entActCompany, entActCompanyBranch, entActCompanyFiscalTerm, entActCompanyFiscalYear } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';


@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [
    CdkAccordionModule,
    NgClass,
    AccordionModule,
    JsonPipe,
    Row,
    ViewLabel,
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    IconButtonComponent,
    CustomerServiceListComponent,
    LeadListComponent,
    MatProgressSpinnerModule,
    CustomerUpdateListComponent,
    InnerScroll,
    FormsModule,
    InputControlComponent,
    StatusHistoryComponent,
    AppDatePipe,
    MatSlideToggleModule,
    MultiPageUrlComponent,
    DocumentsComponent,
    ErrorMessageComponent,
    AppAccessDirective,
    ButtonAccessDirective,
    AppToolTipComponent,
    MatSlideToggleModule,
    TabContainerModule,
    TabItemModule,
    Row,
    CheckboxComponent,
    MatMenuModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTooltipModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.scss',
})
export class CompanyDetailComponent {
  pageId = 'CMPSC';
  errorTrue = false;
  fiscalYearTerm: any;
  fiscalYearEndMonth = '';
  fiscalYearStartMonth = 0;
  errorText = '';
  selectedTab = 0;
  closeBook = false
  companyBranch = new entActCompanyBranch()
  imageGallery = {
    iImage: {},
  };
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('branchDialog') branchDialog!: TemplateRef<any>;
  @ViewChild('fiscalDialog') fiscalDialog!: TemplateRef<any>;
  @ViewChild('termDialog') termDialog!: TemplateRef<any>;
  @ViewChild('l') lform!: NgForm
  @ViewChild('p') pForm!: NgForm
  @ViewChild('addresstab') addresstab!: NgForm
  @ViewChild('b') bform!: NgForm
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;
  highlightTable = false;
  branches: any = [
    'sno',
    'branchName',
    'phoneNo',
    'emailId',
    'createdDate',
    'endDate',
    'stateValue',
  ];
  branchName: any = [
    '',
    'Name',
    'Phone No',
    'Email Id',
    'Start Date',
    'End Date',
    'Status',
  ];

  branchTableData = [
    // {
    //   sno: '',
    //   name: 'Savusavu',
    //   emailId: 'ABC@gmail.com',
    //   startDate: '04 Aug 2023',
    //   endDate: '08 Feb 2024',
    //   status: 'Active',
    // },
    // {
    //   sno: '',
    //   name: 'Savusavu',
    //   emailId: 'ABC@gmail.com',
    //   startDate: '04 Aug 2023',
    //   endDate: '08 Feb 2024',
    //   status: 'Active',
    // },
  ];

  fiscalYrTableData = [
    {
      fiscalYr: '2022-2022',
      startDate: '01/01/2022',
      endDate: '31/12/2022',
      status: 'Reopen',
      calendarMth: 'Y',
      action: '',
    },
    {
      fiscalYr: '2023-2023',
      startDate: '01/01/2022',
      endDate: '31/12/2022',
      status: 'Open',
      calendarMth: 'Y',
      action: '',
    },
  ];

  fiscalYr: any = [
    'fiscalYear',
    'startDate',
    'endDate',
    'statusDescription',
    'calendarMonth',
    'action',
  ];
  fiscalYrName: any = [
    'Fiscal Year',
    'Start Date',
    'End Date',
    'Status',
    'Calendar Month',
    '',
  ];

  termTableData = [
    // {
    //   term: 'January',
    //   startDate: '01/01/2022',
    //   endDate: '31/01/2022',
    //   status: 'Closed',
    //   calendarMth: 'Y',
    //   action: '',
    // },
    // {
    //   term: 'February',
    //   startDate: '01/02/2022',
    //   endDate: '28/12/2022',
    //   status: 'ReOpen',
    //   calendarMth: 'Y',
    //   action: '',
    // },
    // {
    //   term: 'March',
    //   startDate: '01/03/2022',
    //   endDate: '31/03/2022',
    //   status: 'ReOpen',
    //   calendarMth: 'Y',
    //   action: '',
    // },
  ];

  term: any = ['termName', 'startDate', 'endDate', 'statusDescription', 'action'];
  termName: any = ['Term', 'Start Date', 'End Date', 'Status', ''];
  company = new entActCompany();
  companyFiscalYear = new entActCompanyFiscalYear();
  companyTerm = new entActCompanyFiscalTerm()
  province = []
  country = []
  island = []
  location = []
  branch = []
  options = {
    hideFullSpinner: true
  }
  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public apiService: ApplicationApiService,
    public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public url: UrlService,
    public router: Router,
    private appService: AppService
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  async init() {

    await this.data.checkToken();
    this.initialData.getAcccountsDDL('getCompanyInitialData', this.options);
    this.initialData.getAcccountsDDL('getCurrencyDetailsByCurrency', this.options);
    this.opeDetails();
    // this.initialData.getAcccountsDDL('openActCompany', this.options);
    this.appService.setBreadCrumb(this.breadCrumb);

  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  opeDetails() {
    const obj = {
      data: this.appService.companyId
    }
    this.accountsService.openActCompany(obj).subscribe((success) => {
      this.company = success;
      this.errorTrue = false
      this.branchTableData = success.lstActCompanyBranch
      this.fiscalYrTableData = success.lstActCompanyFiscalYear
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
  calenderMonthChange(event: any) {
    console.log(event);
    if (event.checked === true) {
      this.companyFiscalYear.calendarMonth = 'Y'
    }
    else {
      this.companyFiscalYear.calendarMonth = 'N'
    }

  }
  openActCompanyFiscalYear(val: any) {
    this.highlightTable = val;
    if (val !== 0) {

      this.closeBook = true

    }
    else {
      this.closeBook = false

    }
    const obj = {
      data: val
    }
    this.accountsService.openActCompanyFiscalYear(obj).subscribe((success) => {
      this.companyFiscalYear = success;
      this.termTableData = success.lstActCompanyFiscalTerm

    })
  }
  openActCompanyFiscalTerm(val: any) {
    const obj = {
      data: val
    }
    this.accountsService.openActCompanyFiscalTerm(obj).subscribe((success) => {
      this.companyTerm = success
      // this.termTableData = success.lstActCompanyFiscalTerm

    })
  }
  reopenActCompanyFiscalYear() {

    this.accountsService.reopenActCompanyFiscalYear(this.companyFiscalYear).subscribe((success) => {
      this.fiscalYrTableData = success.lstActCompanyFiscalYear
      this.dialog.closeDialog();
    })
  }
  closeActCompanyFiscalYear(val: any) {
    const obj = {
      data: val
    }
    this.accountsService.closeActCompanyFiscalYear(obj).subscribe((success) => {
      this.fiscalYrTableData = success.lstentActCompanyFiscalYear;
      this.dialog.closeDialog();
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
  closeActCompanyFiscalTerm() {
    const obj = {
      data: this.companyTerm.actCompanyFiscalTermId
    }
    this.accountsService.closeActCompanyFiscalTerm(this.companyTerm).subscribe((success) => {
      this.termTableData = success.lstActCompanyFiscalTerm
      this.dialog.closeDialog();
    })
  }
  reopenCompanyFiscalTerm(val: any) {
    this.accountsService.reopenCompanyFiscalTerm(val).subscribe((success) => {
      this.termTableData = success.lstActCompanyFiscalTerm
      this.dialog.closeDialog();
    })
  }
  saveActCompany() {
   
    if (this.lform.valid && this.pForm.valid && this.addresstab.valid) {
      this.accountsService.saveActCompany(this.company).subscribe((success) => {
        this.company = success;
        if (success.msg.infoMessage) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        }
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  saveActCompanyBranch() {
    if (this.bform.valid) {
      this.companyBranch.companyId = this.company.actCompanyId
      this.accountsService.saveActCompanyBranch(this.companyBranch).subscribe((success) => {
        this.branchTableData = success.lstActCompanyBranch;
        if (success.msg.infoMessage) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        }
        this.dialog.closeDialog();
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  isHeadOffice(event: any) {
    console.log(event);

    if (event.target.checked === true) {
      this.companyBranch.isHeadOffice = 'Y'
    }
    if (event.target.checked === false) {
      this.companyBranch.isHeadOffice = 'N'
    }

  }


  onSelectTab(val: any) {
    this.selectedTab = val;
    if (val === 2) {
      this.openActCompanyFiscalYear(0)
    }
  }

  async createOrOpenBranchDetail() {
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.branchDialog, {
      disableClose: true,
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',
    });
  }
  createBranchDetail() {
    this.errorTrue = false
    this.accountsService.createNewCompanyBranch().subscribe((success) => {
      this.companyBranch = success;
      this.country = [];
      this.province = [];
      this.location = [];
      this.branch = [];
      this.createOrOpenBranchDetail()
    })
  }
  clearBranchDetail() {
    this.errorTrue = false
    this.accountsService.createNewCompanyBranch().subscribe((success) => {
      this.companyBranch = success;
      this.country = [];
      this.province = [];
      this.location = [];
      this.branch = [];
    })
  }
  openBranchDetail(val: any) {
    const obj = {
      data: val
    }
    this.accountsService.openActCompanyBranch(obj).subscribe((success) => {
      this.companyBranch = success;
      this.countryBasedOnProvince(this.companyBranch.iAddress.countryValue);
      this.provinceBasedOnIsland(this.companyBranch.iAddress.stateValue);
      this.locationBasedOnIsland(this.companyBranch.iAddress.city);
      this.locationBasedonBranch(this.companyBranch.iAddress.districtValue);
      this.createOrOpenBranchDetail()
    })
  }
  refreshBrachDetail(val: any) {
    const obj = {
      data: val
    }
    this.accountsService.openActCompanyBranch(obj).subscribe((success) => {
      this.companyBranch = success;
      this.countryBasedOnProvince(this.companyBranch.iAddress.countryValue);
      this.provinceBasedOnIsland(this.companyBranch.iAddress.stateValue);
      this.locationBasedOnIsland(this.companyBranch.iAddress.city);
      this.locationBasedonBranch(this.companyBranch.iAddress.districtValue);

    })
  }
  getCurrencyDetailsByCurrency(value: any) {
    const obj = {
      data: value
    }
    this.accountsService.getCurrencyDetailsByCurrency(obj).subscribe((success) => {
      this.company.iActCompanyOtherDetails.currencyValueName = success.currencyValueName;
      this.company.iActCompanyOtherDetails.decimalValueName = success.decimalValueName;
      this.company.iActCompanyOtherDetails.symbolValue = success.symbolValue;

    })
  }
  provinceBasedOnIsland(value: any) {
    const obj = {
      data: value
    }
    this.accountsService.provinceBasedOnIsland(obj).subscribe((success) => {
      this.province = success.lstDDLClass
    })


  }
  countryBasedOnProvince(value: any) {
    const obj = {
      data: value
    }
    this.accountsService.countryBasedOnProvince(obj).subscribe((success) => {
      this.country = success.lstDDLClass
    })
  }
  countryBasedClear() {
    this.companyBranch.iAddress.stateValue = ''
    this.companyBranch.iAddress.city = ''
    this.companyBranch.iAddress.districtValue = ''
    this.companyBranch.branchCode = ''
  }
  locationBasedOnIsland(value: any) {
    const obj = {
      data: value
    }
    this.accountsService.islandBasedOnLocation(obj).subscribe((success) => {
      this.location = success.lstDDLClass
    })
  }
  provinceBasedClear() {
    this.companyBranch.iAddress.city = ''
    this.companyBranch.iAddress.districtValue = ''
    this.companyBranch.branchCode = ''
  }
  locationBasedClear() {
    this.companyBranch.iAddress.districtValue = ''
    this.companyBranch.branchCode = ''
  }
  branchBasedClear() {
    this.companyBranch.branchCode = ''
  }
  locationBasedonBranch(value: any) {
    const obj = {
      data: value
    }
    this.accountsService.locationBasedonBranch(obj).subscribe((success) => {
      this.branch = success.lstDDLClass
    })


  }



  async editFiscalYr(val: any) {
    this.openActCompanyFiscalYear(val)
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.fiscalDialog, {
      disableClose: true,
      height: 'auto',
      width: '500px',
      maxWidth: '1170px',
    });
  }

  async editTerm(val: any) {

    this.openActCompanyFiscalTerm(val)
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.termDialog, {
      disableClose: true,
      height: 'auto',
      width: '700px',
      maxWidth: '1170px',
    });
  }
  getEndMonth(fiscalYearTerm: any, fiscalYearStartMonth: any) {

    this.fiscalYearTerm = Number(fiscalYearTerm);
    this.fiscalYearStartMonth = Number(fiscalYearStartMonth);
    if (isNaN(fiscalYearStartMonth)) {
      this.company.iActCompanyOtherDetails.fiscalYearStartMonth = '';
      return
    }
    if (this.fiscalYearTerm !== 0) {
      let fiscalYearEndMonth = this.fiscalYearTerm + this.fiscalYearStartMonth;
      if (fiscalYearEndMonth > 12) {
        let totalMonth = 12;
        fiscalYearEndMonth = fiscalYearEndMonth - totalMonth;
      }
      if (fiscalYearEndMonth === 1) {
        fiscalYearEndMonth = 12;
      } else {
        fiscalYearEndMonth = fiscalYearEndMonth - 1;
      }
      this.fiscalYearEndMonth = fiscalYearEndMonth.toString();
      this.company.iActCompanyOtherDetails.fiscalYearEndMonth =
        this.fiscalYearEndMonth;
      this.errorText = '';
    } else {
      this.company.iActCompanyOtherDetails.fiscalYearEndMonth = '';
    }
    console.log(this.company.iActCompanyOtherDetails.fiscalYearEndMonth);

  }
  triggerClick() {
    this.fileInput.nativeElement.click();
  }
  loadImageFromDevice(event: any) {
    const files = event.target.files;
    // if (files[0].type !== 'image/png') {
    if (files.length > 0) {
      this.imageGallery.iImage = {
        content: '',
        relativePath: '',
        fileSizeKb: 0,
        fileTypeId: 0,
        fileTypeValue: '',
        idoObjState: '',
        imageId: 0,
        updateSeq: '',
        fileName: '',
      };
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        const img: any = reader.result;
        this.company.logo = img;
      };
      reader.onerror = (error) => {
        this.data.errorInfoMessage('Error has been occured,while selecting the file.');
      };
      this.fileInput.nativeElement.value = '';
    }
    // } else {
    //   this.data.successMessage('For enhanced security, we request that you convert the file into jpeg/jpg format.')
    // }
  }
  navigateToList() {
    // this.router.navigateByUrl('')
  }
  changeFiscalYear() {
    this.company.iActCompanyOtherDetails.fiscalYearStartMonth = '';
    this.company.iActCompanyOtherDetails.fiscalYearEndMonth = ''
  }
  navigateToAccount() {
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
}
