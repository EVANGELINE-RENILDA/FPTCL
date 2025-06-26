import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  entCustomer,
  entCustomerSearch,
  entWillApplication,
  entWillApplicationApplicant,
  entWillApplicationChildren,
  entWillApplicationFinanceDetails,
  entWillApplicationInsuranceDetails,
  entWillApplicationInvestmentDetails,
  entWillApplicationRealestateDetails,
  entWillApplicationSpouse,
  entWillApplicationTestator,
  entWillApplicationVehicleDetails,
} from '../../../../common/api-services/application-api/application-api.classes';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { NgClass } from '@angular/common';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { CoreService } from '../../../../app-core/service/core.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import {
  InnerScroll,
  Row,
  ViewLabel,
} from '../../../../app-core/core-component/core-component.component';
import {
  TabSubComponent,
  TabSubGroupComponent,
} from '../../../../app-core/template/tab/tab1';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { DataService } from '../../../../common/services/data/data.service';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { DropZoneComponent } from '../../../../app-core/template/drop-zone/drop-zone.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { ErrorInfoComponent } from '../../../../app-core/error-info/error-info.component';
import { ViewPdfComponent } from '../../../../app-core/template/view-pdf/view-pdf.component';
import { FileSizePipe } from '../../../../app-core/template/drop-zone/file-size.pipe';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { MatTooltip } from '@angular/material/tooltip';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { DropZoneService } from '../../../../app-core/template/drop-zone/drop-zone.service';

@Component({
  selector: 'app-will-application',
  standalone: true,
  imports: [
    AccordionModule,
    FormsModule,
    InputControlComponent,
    IconButtonComponent,
    NgClass,
    AppDatePipe,
    Row,
    TabSubComponent,
    TabSubGroupComponent,
    ViewLabel,
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    InnerScroll,
    AddressEditComponent,
    DropZoneComponent,
    ErrorMessageComponent,
    ErrorInfoComponent,
    FileSizePipe,
    CheckboxComponent,
    MatTooltip,
    SearchComponent
  ],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ApplicationComponent {
  @Input() application = new entWillApplication();
  @Output() applicationChange = new EventEmitter<any>();
  cardAccordionContent = 1;
  accordionOpen = true;
  currentDate: any;
  errorTrue = false;
  willApplicant = new entWillApplicationApplicant();
  willApplicantRAW = new entWillApplicationApplicant();
  willSpouse = new entWillApplicationSpouse();
  willSpouseRAW = new entWillApplicationSpouse();
  willChildren = new entWillApplicationChildren();
  willChildrenRAW = new entWillApplicationChildren();
  willTestator = new entWillApplicationTestator();
  willTestatorRAW = new entWillApplicationTestator();
  willRealEstate = new entWillApplicationRealestateDetails();
  willRealEstateRAW = new entWillApplicationRealestateDetails();
  willBankFinance = new entWillApplicationFinanceDetails();
  willBankFinanceRAW = new entWillApplicationFinanceDetails();
  willInvestment = new entWillApplicationInvestmentDetails();
  willInvestmentRAW = new entWillApplicationInvestmentDetails();
  willInsurance = new entWillApplicationInsuranceDetails();
  willInsuranceRAW = new entWillApplicationInsuranceDetails();
  willVehicle = new entWillApplicationVehicleDetails();
  willVehicleRAW = new entWillApplicationVehicleDetails();
  @ViewChild('dialogDatas') dialogDatas!: TemplateRef<any>;
  customerDialogDatas: any;
  @ViewChild('customerSearchDialog', { static: false })
  customerSearchDialog!: TemplateRef<any>;
  @ViewChild('appSearch') appSearch!: SearchComponent;


  columnsSpouse: any = [
    'chName',
    'dob',
    'address',
    'relation',
    'gender',
    'action',
  ];
  columnsSpouseName: any = [
    'Spouse Name',
    'DOB',
    'Contact',
    'Email',
    'Gender',
    'Action',
  ];
  columnSpouseData: any = [];
  columnsChildren: any = [
    'chName',
    'dob',
    'address',
    'relation',
    'gender',
    'action',
  ];
  columnsChildrenName: any = [
    'Children Name',
    'DOB',
    'Contact',
    'Email',
    'Gender',
    'Action',
  ];
  columnChildrenData: any = [];
  accept: any;

  constructor(
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public data: DataService, public dropZoneService: DropZoneService
  ) {}
  ngOnInit(): void {
    this.init();
  }
  async init() {
    this.data.checkToken();
    console.log(this.application.statusDescription + 'adgjjkkljsaj');

    if (
      this.application.ientWillApplicationApplicant
        .appWillApplicationApplicantId === 0
    ) {
      this.createWillApplicant();
    }
    if (
      this.application.ientWillApplicationApplicant
        .appWillApplicationApplicantId !== 0
    ) {
      this.openWillApplicant(
        this.application.ientWillApplicationApplicant
          .appWillApplicationApplicantId
      );
    }
    if (
      this.application.ientWillApplicationTestator.willApplicationTestatorId ===
      0
    ) {
      this.createWillTestator();
    }
    if (
      this.application.ientWillApplicationTestator.willApplicationTestatorId !==
      0
    ) {
      this.openWillTestator(
        this.application.ientWillApplicationTestator.willApplicationTestatorId
      );
    }
  }
  editValues() {
    this.editData = true;
    this.data.showErrorMessage = false
  }
  cardTabChange(val: any) {
    this.cardAccordionContent = val;
    const obj = {
      data: this.application.willApplicationId,
    };
    if (val === 1) {
      if (this.willApplicant.appWillApplicationApplicantId === 0) {
        this.createWillApplicant();
      } else {
        this.openWillApplicant(
          this.application.ientWillApplicationApplicant
            .appWillApplicationApplicantId
        );
      }
    }
    if (val === 2) {
      this.apiService
        .getListofSpouseByWillApplicationID(obj)
        .subscribe((success) => {
          this.columnSpouseData = success.lstentWillApplicationSpouse;
        });
    }
    if (val === 3) {
      this.apiService
        .getListofChildrenByWillApplicationID(obj)
        .subscribe((success) => {
          this.columnChildrenData = success.lstentWillApplicationChildren;
        });
    }
    this.accordionOpen = true;
  }

  openWilApplication() {
    debugger
    const obj = {
      data: this.application.willApplicationId
    }
    this.apiService.openWillApplicationWithChilds(obj).subscribe((success) => {
      this.application = success;
      // this.notesList = success.lstentWillApplicationNotes;
      // this.assignOfficerData =success.lstentWillApplicationAssignedOfficerHistory
      // this.statusHistoryDataSource = success.lstentWillApplicationStatusHistory
      // this.emailHistoryTableData = success.lstentWillApplicationEmailHistory
      // this.showData = true
      // this.data.successMessage(success.msg?.infoMessage?.msgDescription)
    })
  }

  openAccordion() {
    this.accordionOpen = false;
    this.cardAccordionContent = 0;
  }

  editData = false;
  applicantDialogData = false;
  spouseDialogData = false;
  childrenDialogData = false;
  testatorDialogData = false;
  realEstateDialogData = false;
  financialDialogData = false;
  investmentDialogData = false;
  insuranceDialogData = false;
  vehicleDialogData = false;

  dialogHideContent() {
    this.applicantDialogData = false;
    this.spouseDialogData = false;
    this.childrenDialogData = false;
    this.testatorDialogData = false;
    this.realEstateDialogData = false;
    this.financialDialogData = false;
    this.investmentDialogData = false;
    this.insuranceDialogData = false;
    this.vehicleDialogData = false;
  }

  async editApplicant(val: any, id?: any) {
    console.log(val);

    this.data.showErrorMessage = false
    this.dialogName = val
    this.errorTrue = false;
    if (id === 0) {
      this.editData = true;
    }
    if (id !== 0) {
      this.editData = false;
    }
    if (val === 'applicant') {
      if (id === 0) {
        this.createWillApplicant();
      } else {
        this.openWillApplicant(id);
      }
      this.falseAllDialogData();
      this.applicantDialogData = true;
    }
    if (val === 'spouse') {
      if (id === 0) {
        this.createWillSpouse();
      } else {
        this.openWillSpouse(id);
      }
      this.falseAllDialogData();
      this.spouseDialogData = true;
    }
    if (val === 'children') {
      if (id === 0) {
        this.createWillChildren();
      } else {
        this.openWillChildren(id);
      }
      this.falseAllDialogData();
      this.childrenDialogData = true;
    }
    if (val === 'testator') {
      if (id === 0) {
        this.createWillTestator();
      } else {
        this.openWillTestator(id);
      }
      this.falseAllDialogData();
      this.testatorDialogData = true;
    }
    if (val === 'realestate') {
      if (id === 0) {
        this.createWillRealEstate();
      } else {
        this.openWillRealEstate(id);
      }
      this.falseAllDialogData();
      this.realEstateDialogData = true;
    }
    if (val === 'bankFinance') {
      if (id === 0) {
        this.createWillFinance();
      } else {
        this.openWillFinance(id);
      }
      this.falseAllDialogData();
      this.financialDialogData = true;
    }
    if (val === 'share') {
      if (id === 0) {
        this.createWillInvestment();
      } else {
        this.openWillInvestment(id);
      }
      this.falseAllDialogData();
      this.investmentDialogData = true;
    }
    if (val === 'insurance') {
      if (id === 0) {
        this.createWillInsurance();
      } else {
        this.openWillInsurance(id);
      }
      this.falseAllDialogData();
      this.insuranceDialogData = true;
    }
    if (val === 'vehicle') {
      if (id === 0) {
        this.createWillVehicle();
      } else {
        this.openWillVehicle(id);
      }
      this.falseAllDialogData();
      this.vehicleDialogData = true;
    }

    let response: any = await this.dialog.openDialog(this.dialogDatas, {
      height: '600px',
      width: '100%',
      maxWidth: '1100px',
    });
  }

  falseAllDialogData() {
    this.applicantDialogData = false;
    this.spouseDialogData = false;
    this.childrenDialogData = false;
    this.testatorDialogData = false;
    this.realEstateDialogData = false;
    this.financialDialogData = false;
    this.investmentDialogData = false;
    this.insuranceDialogData = false;
    this.vehicleDialogData = false;
  }
  closeAccordion() {
    this.accordionOpen = true;
    this.cardAccordionContent = 1;
  }
  //customer
  customerColumns: any = ["customerRefNo", "customerName", "genderDescription", "dateOfBrith", "emailId", "contactNo", "statusdescription", "action"];
  customerColumnsName: any = ["Customer No", "Customer Name", "Gender", "Date Of Birth", "Email ID", "Contact Number", "Status", ""];
  customertableData: any = [];
  customer = new entCustomerSearch();
  // searchParams = new entWillApplicationSearch();
  // searchParamsRAW = new entWillApplicationSearch();
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  createCustomerSearch() {
    this.apiService.createNewCustomerSearch().subscribe((success: any) => {
      this.customer = success;
      this.customer.pageNumber = this.pagination.pageNumber;
      this.customer.pageSize = this.pagination.pageSize;
      this.searchCustomer();
    })
  }
  searchCustomer() {
    this.apiService.searchCustomer(this.customer).subscribe((success: any) => {
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
      this.customertableData = success.result;
      this.appSearch?.close()
    })
  }

  pageChanged(event: any) {
    this.customer.pageNumber = event.pageNumber;
    this.customer.pageSize = event.pageSize;
    this.searchCustomer();
  }
  openCustomer(val: any, type: any) {
    const obj = {
      data: val,
    };
    this.apiService.openCustomer(obj).subscribe((success) => {
      if (type === 'applicant') {
        this.willApplicant.ientCustomer = success;
      }
      if (type === 'spouse') {
        this.willSpouse.ientCustomer = success;
      }
      if (type === 'children') {
        this.willChildren.ientCustomer = success;
      }
      if (type === 'testator') {
        this.willTestator.ientCustomer = success;
      }
      // if (this.type === 'spouse') {
      //   this.willSpouse.ientCustomer = success;
      // }

      this.errorTrue = false;
    });
  }
  openCustomerInSearch(val: any, type: any) {
    const obj = {
      data: val,
    };
    this.apiService.openCustomer(obj).subscribe((success) => {
      if (type === 'applicant') {
        this.willApplicant.ientCustomer = success;
        this.willApplicant.customerId = success.customerId
      }
      if (type === 'spouse') {
        this.willSpouse.ientCustomer = success;
        this.willSpouse.customerId = success.customerId
      }
      if (type === 'children') {
        this.willChildren.ientCustomer = success;
        this.willChildren.customerId = success.customerId
      }
      if (type === 'testator') {
        this.willTestator.ientCustomer = success;
        this.willTestator.customerId = success.customerId
      }
      // if (this.type === 'spouse') {
      //   this.willSpouse.ientCustomer = success;
      // }
      this.dialog.closeDialog('customerList')
      this.errorTrue = false;
    });

  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.customer.pageNumber = 1;
    this.searchCustomer();

  }
  clear() {
    this.createCustomerSearch();
    this.data.successMessage('Data Cleared Successfully')
  }
  dialogName:any
  async customerSearch() {
   this.createCustomerSearch()
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.customerSearchDialog, {
      height: '500px',
      width: '1050px',
      maxWidth: '1170px',

    },'customerList');
    // this.createClientCustomer = true
    if (dialogResponse) {

    }
  }
  //other Assets

  //applicant
  @ViewChild('a') aForm!: NgForm;
  createWillApplicant() {
    this.apiService.createNewWillApplicationApplicant().subscribe((success) => {
      this.willApplicant = success;
    });
  }
  openWillApplicant(val: any) {
    const obj = {
      data: val,
    };
    this.apiService.openWillApplicationApplicant(obj).subscribe((success) => {
      this.willApplicant = success;
    });
  }
  saveApplicant() {
    if (this.aForm.valid) {
      this.willApplicant.appWillApplicationId =
        this.application.willApplicationId;
      this.apiService
        .saveWillApplicationApplicant(this.willApplicant)
        .subscribe((success) => {
          this.willApplicant = success;
          this.dialog.closeAll();
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
          this.data.showErrorMessage = false;
          this.openWilApplication()
        });
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Enter the Required Data');
    }
  }
  updateApplicant() {
    if (this.aForm.valid) {
      this.willApplicant.appWillApplicationId =
        this.application.willApplicationId;
      this.apiService
        .saveWillApplicationApplicant(this.willApplicant)
        .subscribe((success) => {
          this.willApplicant = success;
          this.dialog.closeAll();
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
          this.data.showErrorMessage = false;
        });
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Enter the Required Data');
    }
  }
  clearApplicant() {
    this.willApplicant = JSON.parse(JSON.stringify(this.willApplicantRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.data.showErrorMessage = false;
    this.errorTrue = false;
  }
  refreshApplicant() {
    const obj = {
      data: this.willApplicant.appWillApplicationApplicantId,
    };
    this.apiService.openWillApplicationApplicant(obj).subscribe((success) => {
      this.willApplicant = success;
      this.data.successMessage('Data Refreshed Successfully');
      this.errorTrue = false;
    });
  }

  //spouse

  @ViewChild('b') bForm!: NgForm;
  // @ViewChild('e') eForm !: NgForm

  createWillSpouse() {
    this.apiService.createWillApplictionSpouse().subscribe((success) => {
      this.willSpouse = success;
    });
  }
  openWillSpouse(val: any) {
    const obj = {
      data: val,
    };
    this.apiService.openWillApplictionSpouse(obj).subscribe((success) => {
      this.willSpouse = success;
    });
  }
  saveSpouse() {
    if (this.bForm.valid) {
      this.willSpouse.willApplicationId = this.application.willApplicationId;
      this.apiService
        .saveWillApplicationSpouse(this.willSpouse)
        .subscribe((success) => {
          this.columnSpouseData = success.lstentWillApplicationSpouse;
          this.dialog.closeAll();
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
          this.data.showErrorMessage = false;
        });
    } else {
      this.errorTrue = true;
    }
  }
  clearSpouse() {
    this.willSpouse = JSON.parse(JSON.stringify(this.willSpouseRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.errorTrue = false;
    this.data.showErrorMessage = false;
  }
  refreshSpouse() {
    const obj = {
      data: this.willSpouse.willApplicationSpouseId,
    };
    this.apiService.openWillApplictionSpouse(obj).subscribe((success) => {
      this.willSpouse = success;
      this.data.successMessage('Data Refreshed Successfully');
      this.errorTrue = false;
    });
  }
  //children
  @ViewChild('c') cForm!: NgForm;

  createWillChildren() {
    this.apiService.createWillApplicationChildren().subscribe((success) => {
      this.willChildren = success;
    });
  }
  openWillChildren(val: any) {
    const obj = {
      data: val,
    };
    this.apiService.openWillApplicationChildren(obj).subscribe((success) => {
      this.willChildren = success;
    });
  }
  saveChildren() {
    if (this.cForm.valid) {
      this.willChildren.willApplicationId = this.application.willApplicationId;
      this.apiService
        .saveWillApplicationChildren(this.willChildren)
        .subscribe((success) => {
          this.columnChildrenData = success.lstentWillApplicationChildren;
          this.dialog.closeAll();
          this.data.showErrorMessage = false;
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        });
    } else {
      this.errorTrue = true;
    }
  }
  clearChildren() {
    this.willChildren = JSON.parse(JSON.stringify(this.willChildrenRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.errorTrue = false;
    this.data.showErrorMessage = false;
  }
  refreshChildren() {
    const obj = {
      data: this.willChildren.willApplicationChildId,
    };
    this.apiService.openWillApplicationChildren(obj).subscribe((success) => {
      this.willChildren = success;
      this.data.successMessage('Data Refreshed Successfully');
      this.errorTrue = false;
    });
  }

  //testator
  @ViewChild('d') dForm!: NgForm;
  createWillTestator() {
    this.apiService.createWillApplicationTestator().subscribe((success) => {
      this.willTestator = success;
    });
  }
  openWillTestator(val: any) {
    const obj = {
      data: val,
    };
    this.apiService.openWillApplicationTestator(obj).subscribe((success) => {
      this.willTestator = success;
    });
  }
  saveTestator() {
    if (this.dForm.valid) {
      this.willTestator.willApplicationId = this.application.willApplicationId;
      this.apiService
        .saveWillApplicationTestator(this.willTestator)
        .subscribe((success) => {
          this.willTestator = success;
          this.data.showErrorMessage = false;
          this.dialog.closeAll();
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        });
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Enter the Required Data');
    }
  }
  clearTestator() {
    this.willTestator = JSON.parse(JSON.stringify(this.willTestatorRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.errorTrue = false;
    this.data.showErrorMessage = false;
  }
  refreshTestator() {
    const obj = {
      data: this.willTestator.willApplicationTestatorId,
    };
    this.apiService.openWillApplicationTestator(obj).subscribe((success) => {
      this.willTestator = success;
      this.data.successMessage('Data Refreshed Successfully');
      this.errorTrue = false;
    });
  }
  //realEstate
  uploadRealDoc(event: any) {
    this.willRealEstate.ientFile.fileName = event[0].fileName;
    this.willRealEstate.ientFile.fileSize = event[0].fileSize;
    this.willRealEstate.ientFile.fileExtension = event[0].fileType;
    this.willRealEstate.ientFile.fileType = event[0].fileType;
    this.willRealEstate.ientFile.content = event[0].content;
    console.log(this.willRealEstate.ientFile);
  }
  closeDialogbox(){
    this.data.showErrorMessage = false;
    this.dropZoneService.files = [];
    this.dialog.closeDialog();
  }
  @ViewChild('e') eForm!: NgForm;
  createWillRealEstate() {
    this.apiService
      .createWillApplictionRealestateDetails()
      .subscribe((success) => {
        this.willRealEstate = success;
        this.dropZoneService.files = [];
      });
  }
  openWillRealEstate(val: any) {
    const obj = {
      data: val,
    };
    this.apiService
      .openWillApplictionRealestateDetails(obj)
      .subscribe((success) => {
        this.willRealEstate = success;
        this.dropZoneService.files = [];
      });
  }
  saveRealEstate() {
    if (this.eForm.valid) {
      this.willRealEstate.willApplicationId =
        this.application.willApplicationId;
      this.apiService
        .saveWillApplicationRealestateDetails(this.willRealEstate)
        .subscribe((success) => {
          this.application.lstentWillApplicationRealestateDetails =
            success.lstentWillApplicationRealestateDetails;
          this.applicationChange.emit(this.application);
          this.data.showErrorMessage = false;
          this.dropZoneService.files = [];
          // this.fileinput.nativeElement.value = "";
          this.dialog.closeAll();
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        });
    } else {
      this.errorTrue = true;
    }
  }
  clearRealEstate() {
    this.willRealEstate = JSON.parse(JSON.stringify(this.willRealEstateRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.errorTrue = false;
    this.dropZoneService.files = [];
    this.data.showErrorMessage = false;
  }
  refreshRealEstate() {
    const obj = {
      data: this.willRealEstate.willApplicationRealestateDetailId,
    };
    this.apiService
      .openWillApplictionRealestateDetails(obj)
      .subscribe((success) => {
        this.willRealEstate = success;
        this.data.successMessage('Data Refreshed Successfully');
        this.errorTrue = false;
      });
  }
  //bank-finance
  @ViewChild('f') fForm!: NgForm;
  createWillFinance() {
    this.willBankFinance.ientAddress.provinceId =0;
    this.willBankFinance.ientAddress.islandId = 0;
    this.willBankFinance.ientAddress.village = '';

    this.apiService
      .createWillApplictionFinanceDetails()
      .subscribe((success) => {
        this.willBankFinance = success;
      });
  }
  openWillFinance(val: any) {
    const obj = {
      data: val,
    };
    this.apiService
      .openWillApplictionFinanceDetails(obj)
      .subscribe((success) => {
        this.willBankFinance = success;
      });
  }

  saveFinance() {
    if (this.fForm.valid) {
      this.willBankFinance.willApplicationId =
        this.application.willApplicationId;
      this.apiService
        .saveWillApplicationFinanceDetails(this.willBankFinance)
        .subscribe((success) => {
          this.application.lstentWillApplicationFinanceDetails =
            success.lstentWillApplicationFinanceDetails;
          this.applicationChange.emit(this.application);
          this.data.showErrorMessage = false;
          this.dialog.closeAll();
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        });
    } else {
      this.errorTrue = true;
    }
  }
  clearFinance() {
    this.willBankFinance = JSON.parse(JSON.stringify(this.willBankFinanceRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.errorTrue = false;
    this.data.showErrorMessage = false;
  }
  refreshFinance() {
    const obj = {
      data: this.willBankFinance.willApplicationFinanceDetailId,
    };
    this.apiService
      .openWillApplictionFinanceDetails(obj)
      .subscribe((success) => {
        this.willBankFinance = success;
        this.data.successMessage('Data Refreshed Successfully');
        this.errorTrue = false;
      });
  }
  getFinanceList() {
    const obj = {
      data: this.application.willApplicationId,
    };
    this.apiService
      .getListofFinanceByWillApplicationID(obj)
      .subscribe((success) => {
        this.application.lstentWillApplicationFinanceDetails =
          success.lstentWillApplicationFinanceDetails;
      });
  }

  //investment
  @ViewChild('g') gForm!: NgForm;
  isCerficateCheck(event: any) {
    debugger;
    if (event.target.checked === true) {
      this.willInvestment.isCertificateAvailable = 'Y';
    } else {
      this.willInvestment.isCertificateAvailable = 'N';
    }
  }
  createWillInvestment() {
    this.apiService
      .createWillApplicationInvestmentDetails()
      .subscribe((success) => {
        this.willInvestment = success;
      });
  }
  openWillInvestment(val: any) {
    const obj = {
      data: val,
    };
    this.apiService
      .openWillApplicationInvestmentDetails(obj)
      .subscribe((success) => {
        this.willInvestment = success;
      });
  }

  saveInvestment() {
    if (this.gForm.valid) {
      this.willInvestment.willApplicationId =
        this.application.willApplicationId;
      this.apiService
        .saveWillApplicationInvestmentDetails(this.willInvestment)
        .subscribe((success) => {
          this.application.lstentWillApplicationInvestmentDetails =
            success.lstentWillApplicationInvestmentDetails;
          this.applicationChange.emit(this.application);
          this.data.showErrorMessage = false;
          this.dialog.closeAll();
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        });
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Enter the Required Data');
    }
  }
  clearInvestment() {
    this.willInvestment = JSON.parse(JSON.stringify(this.willInvestmentRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.errorTrue = false;
    this.data.showErrorMessage = false;
  }
  refreshInvestment() {
    const obj = {
      data: this.willInvestment.willApplicationInvestmentDetailId,
    };
    this.apiService
      .openWillApplicationInvestmentDetails(obj)
      .subscribe((success) => {
        this.willInvestment = success;
        this.data.successMessage('Data Refreshed Successfully');
        this.errorTrue = false;
      });
  }
  getInvestmentList() {
    const obj = {
      data: this.application.willApplicationId,
    };
    this.apiService
      .getListofInvestmentByWillApplicationID(obj)
      .subscribe((success) => {
        this.application.lstentWillApplicationInvestmentDetails =
          success.lstentWillApplicationInvestmentDetails;
      });
  }
  //Insurance
  getInsuranceList() {
    const obj = {
      data: this.application.willApplicationId,
    };
    this.apiService
      .getListofInsuranceByWillApplicationID(obj)
      .subscribe((success) => {
        this.application.lstentWillApplicationInsuranceDetails =
          success.lstentWillApplicationInsuranceDetails;
      });
  }
  @ViewChild('h') hForm!: NgForm;
  createWillInsurance() {
    this.apiService
      .createWillApplicationInsuranceDetails()
      .subscribe((success) => {
        this.willInsurance = success;
      });
  }
  openWillInsurance(val: any) {
    const obj = {
      data: val,
    };
    this.apiService
      .openWillApplicationInsuranceDetails(obj)
      .subscribe((success) => {
        this.willInsurance = success;
      });
  }

  saveInsurance() {
    if (this.hForm.valid) {
      this.willInsurance.willApplicationId = this.application.willApplicationId;
      this.apiService
        .saveWillApplicationInsuranceDetails(this.willInsurance)
        .subscribe((success) => {
          this.application.lstentWillApplicationInsuranceDetails =
            success.lstentWillApplicationInsuranceDetails;
          this.applicationChange.emit(this.application);
          this.data.showErrorMessage = false;
          this.dialog.closeAll();
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        });
    } else {
      this.errorTrue = true;
    }
  }
  clearInsurance() {
    this.willInsurance = JSON.parse(JSON.stringify(this.willInsuranceRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.errorTrue = false;
    this.data.showErrorMessage = false;
  }
  refreshInsurance() {
    const obj = {
      data: this.willInsurance.willApplicationInsuranceDetailId,
    };
    this.apiService
      .openWillApplicationInsuranceDetails(obj)
      .subscribe((success) => {
        this.willInsurance = success;
        this.data.successMessage('Data Refreshed Successfully');
        this.errorTrue = false;
      });
  }

  //Vehicle
  getVehicleList() {
    const obj = {
      data: this.application.willApplicationId,
    };
    this.apiService
      .getListofVehicleByWillApplicationID(obj)
      .subscribe((success) => {
        this.application.lstentWillApplicationVehicleDetails =
          success.lstentWillApplicationVehicleDetails;
      });
  }
  @ViewChild('i') iForm!: NgForm;
  createWillVehicle() {
    this.apiService
      .createWillApplictionVehicleDetails()
      .subscribe((success) => {
        this.willVehicle = success;
      });
  }
  openWillVehicle(val: any) {
    const obj = {
      data: val,
    };
    this.apiService
      .openWillApplictionVehicleDetails(obj)
      .subscribe((success) => {
        this.willVehicle = success;
      });
  }

  saveVehicle() {
    if (this.iForm.valid) {
      this.willVehicle.willApplicationId = this.application.willApplicationId;
      this.apiService
        .saveWillApplicationVehicleDetails(this.willVehicle)
        .subscribe((success) => {
          this.application.lstentWillApplicationVehicleDetails =
            success.lstentWillApplicationVehicleDetails;
          this.applicationChange.emit(this.application);
          this.data.showErrorMessage = false;
          this.dialog.closeAll();
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        });
    } else {
      this.errorTrue = true;
    }
  }
  clearVehicle() {
    this.willVehicle = JSON.parse(JSON.stringify(this.willVehicleRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.errorTrue = false;
    this.data.showErrorMessage = false;
  }
  refreshVehicle() {
    const obj = {
      data: this.willVehicle.willApplicationVehicleDetailId,
    };
    this.apiService
      .openWillApplictionVehicleDetails(obj)
      .subscribe((success) => {
        this.willVehicle = success;
        this.data.successMessage('Data Refreshed Successfully');
        this.errorTrue = false;
      });
  }

  viewFile(element: any) {
    debugger
    let base64Data = element.ientFile.content.split(';base64,').pop();
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: element.ientFile.fileType });

    const url = URL.createObjectURL(blob);
    if (element.ientFile.fileType === 'application/pdf') {
      this.openPDFViewer(url);
    } else if (element.ientFile.fileType.includes('image')) {
      this.imageView(url, element.ientFile.fileName, element);
    }
  }
  openPDFViewer(xurl: any) {
    const dialogRef = this.dialog.openDialog(ViewPdfComponent, {
      width: '100%',
      height: '85%',
      data: {
        url: xurl,
      },
    });
  }
  filePath: any;
  fileName = '';
  imageId: any;
  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;
  imageView(path: any, filename: any, val: any) {
    debugger;
    this.filePath = path;
    this.fileName = filename;
    this.imageId = val;
    this.dialog.openDialog(this.Templates, {
      width: '600px',
      height: 'auto',
    });
  }
  downloadFile(element: any) {
    let base64Data: any = element.ientFile.content.split(';base64,').pop();
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: element.ientFile.fileType });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = element.ientFile.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  downloadImageFile() {
    this.downloadFile(this.imageId);
    this.dialog.closeAll();
  }
  //
  cardAccordionContent1 = 1;
  accordionOpen1 = true;
  cardTabChange1(val: any) {
    this.cardAccordionContent1 = val;
    this.accordionOpen1 = true;
  }
  openAccordion1() {
    this.accordionOpen1 = false;
    this.cardAccordionContent1 = 0;
  }
  closeAccordion1() {
    this.accordionOpen1 = true;
    this.cardAccordionContent1 = 1;
  }
  columnsRealEstate: any = [
    'titleNo',
    'tenureValue',
    'tenancyDescription',
    'tenancyTypeDescription',
    'action',
  ];
  columnsRealEstateName: any = [
    'Title No',
    'Tenure',
    'Tenancy',
    'Type',
    'Action',
  ];
  realEstateTableData: any = [];

  columnsBank: any = [
    'accountNo',
    'accountTypeDescription',
    'institutionName',
    'bsb',
    'action',
  ];
  columnsBankName: any = [
    'Account No',
    'Account Type',
    'Institution Name',
    'BSB',
    'Action',
  ];
  bankTableData: any = [];

  columnInsurance: any = [
    'policyNo',
    'companyName',
    'insuredAmount',
    'lastPremiumPaidDate',
    'action',
  ];
  columnsInsuranceName: any = [
    'Policy No',
    'Company Name',
    'Insured Amount',
    'Last Premium Date',
    'Action',
  ];
  insuranceTableData: any = [];

  columnVehicle: any = [
    'vehicleRegNo',
    'vehicleTypeDescription',
    'vehicleMake',
    'model',
    'action',
  ];
  columnsVehicleName: any = [
    'Reg No',
    'Vehicle Type',
    'Make',
    'Model',
    'Action',
  ];
  vehicleTableData: any = [];

  columnsShares: any = [
    'companyName',
    'shareTypeDescription',
    'shareNo',
    'isCertificateAvailable',
    'action',
  ];
  columnsShareName: any = [
    'Company',
    'Share Type',
    'Share / Unit No',
    'Certificate',
    'Action',
  ];
  columnShareTabledata: any = [];

  closeAllDialogs() {
    this.data.showErrorMessage = false;
    this.dialog.closeAll();
    this.dropZoneService.files = [];
    this.errorTrue = false;
  }
  saveOtherAssets() {
    this.application.ientWillApplicationOtherAssetDetails.willApplicationId =
      this.application.willApplicationId;
    if (this.zForm.valid) {
      this.apiService
        .saveWillApplicationOtherAssetDetails(
          this.application.ientWillApplicationOtherAssetDetails
        )
        .subscribe((success) => {
          this.application.lstentWillApplicationOtherAssetDetails =
            success.lstentWillApplicationOtherAssetDetails;
          this.data.showErrorMessage = false;
          this.dialog.closeAll();
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
        });
    } else {
      this.errorTrue = true;
    }
  }
  @ViewChild('z') zForm!: NgForm;
  otherAssetColumn = ['value', 'description', 'action'];
  otherAssetColumnName = ['Value', 'Description', 'Action'];
  @ViewChild('otherAssetDialog') otherAssetDialog!: TemplateRef<any>;
  async otherAssetDialogBox() {
    let response: any = await this.dialog.openDialog(this.otherAssetDialog, {
      height: 'auto',
      width: '600px',
      maxWidth: '1100px',
    });
  }
  createNewOtherAssets() {
    this.apiService
      .createWillApplictionOtherAssetDetails()
      .subscribe((success) => {
        this.application.ientWillApplicationOtherAssetDetails = success;
        this.otherAssetDialogBox();
        this.errorTrue = false;
      });
  }
  refreshOtherAssets() {
    const obj = {
      data: this.application.ientWillApplicationOtherAssetDetails
        .willApplicationAssetDetailId,
    };
    this.apiService
      .openWillApplictionOtherAssetDetails(obj)
      .subscribe((success) => {
        this.application.ientWillApplicationOtherAssetDetails = success;
        this.errorTrue = false;
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      });
  }
  clearOtherAssets() {
    this.apiService
      .createWillApplictionOtherAssetDetails()
      .subscribe((success) => {
        this.application.ientWillApplicationOtherAssetDetails = success;
        this.errorTrue = false;
    this.data.successMessage('Data Cleared Successfully');
      })
  }

  dialogClose(val?:any) {
    this.data.showErrorMessage = false;
    this.dialog.closeDialog(val);
  }
  openOtherAssets(val: any) {
    const obj = {
      data: val,
    };
    this.apiService
      .openWillApplictionOtherAssetDetails(obj)
      .subscribe((success) => {
        this.application.ientWillApplicationOtherAssetDetails = success;
        this.otherAssetDialogBox();
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      });
  }

  async checkEstateDocumentDelete(val:any){
    let msg = `Are you sure, You want to delete ${val.fileName} ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      // val.fileName = ''
      // val.fileId = 0
      // val.fileExtension = ''
      // val.fileSize = ''
      // val.fileType = ''
      // val.content = ''
      // val.relativePath = ''
    }
  }

}
