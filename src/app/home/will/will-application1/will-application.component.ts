import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InnerScroll, Row, ViewLabel } from '../../../app-core/core-component/core-component.component';
import { AccordionModule } from '../../../app-core/template/accordion/accordion.module';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { entCustomer, entWillApplication, entWillApplicationApplicant, entWillApplicationChildren, entWillApplicationSpouse, entWillApplicationTestator } from '../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../app-core/template/app-table/app-table.component';
import { CoreService } from '../../../app-core/service/core.service';
import { NgClass } from '@angular/common';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { ApplicantEditComponent } from './applicant-edit/applicant-edit.component';
import { DropZoneComponent } from '../../../app-core/template/drop-zone/drop-zone.component';
import { FileSizePipe } from '../../../app-core/template/drop-zone/file-size.pipe';
import { TabSubComponent, TabSubGroupComponent } from '../../../app-core/template/tab/tab1';
import { CheckboxComponent } from '../../../app-core/template/checkbox/checkbox.component';
import { AppService } from '../../../app.service';
import { StatusHistoryComponent } from '../../../app-core/template/status-history/status-history.component';
import { DataService } from '../../../common/services/data/data.service';
import { UrlService } from '../../../common/services/url/url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';

@Component({
  selector: 'app-will-application',
  standalone: true,
  imports: [FormsModule, Row, ViewLabel, NgClass, AccordionModule, IconButtonComponent, InputControlComponent, AppTableComponent, AppDatePipe, DropZoneComponent, FileSizePipe, TabSubGroupComponent, TabSubComponent, CheckboxComponent, StatusHistoryComponent, CellDefDirective, CellHeaderDefDirective, InnerScroll],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './will-application.component.html',
  styleUrl: './will-application.component.scss'
})
export class WillApplicationComponent {
  editApplicantData = false;
  customerDetails = new entCustomer();
  errorTrue = false;
  islandDDL: any = [];
  villageDDL: any = [];
  currentDate: any
  //tabs
  activeValue1 = true
  activeValue2 = false
  activeValue3 = false
  selectedTabValue = '1';
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('dialogDatas', { static: false })
  dialogDatas!: ElementRef;
  willApplication = new entWillApplication();
  willApplicant = new entWillApplicationApplicant();
  willApplicantRAW = new entWillApplicationApplicant();
  willSpouse = new entWillApplicationSpouse();
  willTestator = new entWillApplicationTestator()
  // willChildre
  willApplicationId = 0

  accept: any;
  accordionOpen = true
  accordionOpen1 = true
  accordionOpen2 = true

  //linked Doc
  linkedColumns: any = ['description', 'action']
  linkedColumnsName: any = ['Document Name', ' Action']
  columnsSpouse: any = ['chName', 'dob', 'address', 'relation', "gender", 'action'];
  columnsSpouseName: any = ["Spouse Name", "DOB", "Contact", "Email", "Gender", "Action"];
  columnSpouseData: any = []
  columnsChildren: any = ['chName', 'dob', 'address', 'relation', "gender", 'action'];
  columnsChildrenName: any = ["Children Name", "DOB", "Contact", "Email", "Gender", "Action"];
  columnChildrenData: any = []

  columnsRealEstate: any = ['titleNo',
    'tenureValue',
    'tenancyValueDescription',
    'tenancyTypeDescription', 'action'];
  columnsRealEstateName: any = ["Title No", "Tenure", "Tenancy", "Type", "Action"];
  realEstateTableData: any = []

  //clientDoc
  clientDocumentColumns: any = ['documentTypeDescription', 'fileName', 'fileSize', 'action']
  clientDocumentColumnsName: any = ['Document Name', 'File Name', 'Size', 'Action']
  docNameType: any
  requireColumns: any = ['documentTypeDescription', 'fileSize', 'action']
  requireColumnsName: any = ['Document Name', 'Size', 'Action']
  requireTableData: any = [{
    documentTypeDescription: 'Will Requirements List',
    ientFile: {
      fileSize: '1.2 MB'
    },

  }]
  requireTableData1: any = [{
    documentTypeDescription: 'Will_Draft',
    ientFile: {
      fileSize: '1.2 MB'
    },

  }]

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  cardAccordionContent = 1
  cardTabChange(val: any) {
    this.cardAccordionContent = val;
    const obj = {
      data: this.willApplication.willApplicationId
    }
    if (val === 1) {
      if (this.willApplicant.appWillApplicationApplicantId === 0) {
        this.createWillApplicant()
      }
      else {
        this.openWillApplicant(this.willApplication.ientWillApplicationApplicant.appWillApplicationApplicantId);
      }
    }
    if (val === 2) {
      this.apiService.getListofSpouseByWillApplicationID(obj).subscribe((success) => {
        this.columnSpouseData = success.lstentWillApplicationSpouse
      })
    }
    if (val === 3) {

      this.apiService.getListofChildrenByWillApplicationID(obj).subscribe((success) => {
        this.columnChildrenData = success.ientWillApplicationChildren
      })
    }
    this.accordionOpen = true
  }
  openAccordion() {
    this.accordionOpen = false
    this.cardAccordionContent = 0
  }
  closeAccordion() {
    this.accordionOpen = true
    this.cardAccordionContent = 1
  }
  cardAccordionContent1 = 1
  cardTabChange1(val: any) {
    this.cardAccordionContent1 = val;
    this.accordionOpen1 = true
  }
  openAccordion1() {
    this.accordionOpen1 = false
    this.cardAccordionContent1 = 0
  }
  closeAccordion1() {
    this.accordionOpen1 = true
    this.cardAccordionContent1 = 1
  }
  columnsBank: any = ['acno', 'acType', 'insName', 'bsb', 'action'];
  columnsBankName: any = ["Account No", "Account Type", "Institution Name", "BSB", "Action"];
  bankTableData: any = [{
    'acno': '5565147', 'acType': 'Savings', 'insName': 'WBC', 'bsb': 'Nasinu'
  }]

  columnsShares: any = ['company', 'share', 'certificate', 'acType', 'action'];
  columnsShareName: any = ["Company", "Share / Unit No", "Certificate", "Account Type", "Action"];
  columnShareTabledata: any = []

  columnInsurance: any = ['policyNo', 'companyName', 'insuredAmount', 'lastPaid', 'action'];
  columnsInsuranceName: any = ["Policy No", "Company Name", "Insured Amount", "Last Premium Paid", "Action"];
  insuranceTableData: any = []

  columnVehicle: any = ['regNo', 'vehicleType', 'make', 'model', 'action'];
  columnsVehicleName: any = ["Reg No", "Vehicle Type", "Make", "Model", 'Action'];
  vehicleTableData: any = []

  testatorColumns: any = ['custRef', 'name', 'gender', 'contactNo'];
  testatorColumnsName: any = ['Customer Ref No', 'Name', 'Gender', 'Contact No'];
  testatorTabelData: any = [{
    'custRef': 'CUST04780001', 'name': 'Veli Naukata', 'gender': 'Male', 'contactNo': '+639-789456'
  }]
  beneficiaryTabelData: any = [{
    'custRef': 'CUST04797002', 'name': 'Lenora', 'gender': 'Female', 'contactNo': '+639-8754610'
  }]

  courtOrderColumns = ['designation', 'assignedToFullname', 'verificationDate', 'action'];
  courtOrderColumnsName = ['Designation', 'User Name', 'Verified Date', 'Action'];
  courtOrderTableData: any = [{
    'designation': 'Estate Officer', 'assignedToFullname': 'Estate Officer 1', 'verificationDate': '17 Jul 2024',
  }, {
    'designation': 'Manager Legal and Estate', 'assignedToFullname': 'Manager Legal and Estate', 'verificationDate': '15 Jul 2024',
  }];

  witnessColumns: any = ['name', 'dob', 'occupation', 'address'];
  witnessColumnsName: any = ['Name', 'DOB', 'Occupation', 'Address'];
  witnessTableData: any = [{ 'name': 'Veli Natuku', 'dob': '05 Jun 2001', 'occupation': 'Retiree', 'address': ' 03 Garden City, Vatuwaqa' }, { 'name': 'Heida', 'dob': '05 May 2005', 'occupation': 'Agriculture', 'address': ' 03 Garden City, Vatuwaqa' },]

  receiptFundColumns: any = ['1', '2', '3', '4', '5'];
  receiptFundColumnsName: any = ["Date", "Check No / Tr. No", "Organization", "Receipt No", "Amount"];
  receiptFundTableData: any = [];

  updatebeneficiaryColumns: any = ['custRef', 'name', 'gender', 'contact', 'email'];
  updatebeneficiaryColumnsName: any = ['Customer Ref No', 'Name', 'Gender', 'Contact No', 'Email'];
  updateBeneficarytableData: any = [{
    'custRef': 'CUST1200007', 'name': 'Ratu Neta', 'gender': 'Male', 'contact': '+679-4561780', 'email': 'contact@gmail.com'
  }]


  constructor(public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public router: Router,
    public route: ActivatedRoute,
    public data: DataService,
    public url: UrlService,
    public appService: AppService) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  id = {
    currentIndex: 0,
    array: []
  };
  navigateToList() {
    this.router.navigateByUrl('/home/will/will-application/search')
  }
  async init() {
    this.appService.setBreadCrumb(this.breadCrumb);
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params;
    this.willApplicationId = this.id.array[this.id.currentIndex];
    await this.data.checkToken();
    await this.initialData.getDDL('getInitialDataForWillApplication');
    await this.loadProvinceDDL();
    await this.initialData.getDDL('getInitialDataForCustomer');
    this.openWilApplication()
  }
  ProvinceDDL:any
  loadProvinceDDL(){
    this.apiService.loadAllMProvince().subscribe((success)=>{
      this.initialData.DDLValues.DDLProvince = success.value
    })
  }
  openWilApplication() {
    debugger
    const obj = {
      data: this.willApplicationId
    }
    this.apiService.openWillApplicationWithChilds(obj).subscribe((success) => {
      this.willApplication = success;
      this.realEstateTableData = success.lstentWillApplicationRealestateDetails;
      if (success.ientWillApplicationApplicant.appWillApplicationApplicantId === 0) {
        this.createWillApplicant()
      }
      else if (success.ientWillApplicationApplicant.appWillApplicationApplicantId !== 0) {
        this.openWillApplicant(success.ientWillApplicationApplicant.appWillApplicationApplicantId);
      }
      if (success.ientWillApplicationTestator.willApplicationTestatorId === 0) {
        this.createWillTestator()
      }
      // else if (success.ientWillApplicationTestator.willApplicationTestatorId !== 0) {
      //   this.openWillTestator(success.ientWillApplicationApplicant.appWillApplicationApplicantId);
      // }
      this.data.successMessage(success.msg?.infoMessage?.msgDescription)
    })
  }
  openWillApplicant(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openWillApplicationApplicant(obj).subscribe((success) => {
      this.willApplicant = success
    })
  }
  createWillApplicant() {
    this.apiService.createNewWillApplicationApplicant().subscribe((success) => {
      this.willApplicant = success
    })
  }
  openWillTestator(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openWillApplicationTestator(obj).subscribe((success) => {
      this.willTestator = success
    })
  }
  createWillTestator() {
    this.apiService.createWillApplicationTestator().subscribe((success) => {
      this.willTestator = success
    })
  }








  downloadFile(val: any) { }
  checkDocumentDelete(val: any) { }
  viewFile(val: any) { }

  selectedTabChange(val: any) {
    if (val === 1) {
      this.selectedTabValue = '1'
      this.activeValue1 = true
      this.activeValue2 = false
      this.activeValue3 = false

    }
    if (val === 2) {
      this.selectedTabValue = '2';
      this.activeValue2 = true
      this.activeValue1 = false
      this.activeValue3 = false

    }
    if (val === 3) {
      this.selectedTabValue = '3';
      this.activeValue2 = false
      this.activeValue1 = false;
      this.activeValue3 = true;
      this.getListOfNotes();
      this.getStatusHistoryList();
      this.getAssignedOfficerList();
      this.getlistOfCommunicationHistory();
    }
  }




  async editApplicant(val: any, data?: any) {
    let response: any = await this.dialog.openDialog(this.dialogDatas, {
      height: '600px',
      width: '100%',
      maxWidth: '1100px',
      data: {
        type: this.name,
        subId: data,
        willId: this.willApplication.willApplicationId
      }
    });
    debugger
    if (response) {
      if (val === 'applicant') {
        this.willApplicant = response
      }
      if (val === 'spouse') {
        this.columnSpouseData = response
      }

    };

  }
  async editApplicant1(val: any) {
    let response: any = await this.dialog.openDialog(ApplicantEditComponent, {
      height: '400px',
      width: '600px',
      maxWidth: '1100px',
      data: {
        type: val,
      }
    });
  }

  onChange(event: any) {

  }

  addChildrenDetails() {

  }

  //history
  showStatusHistory = true
  showEmailHistory = false
  accordianOpen = true
  accordianOpen1 = true

  assignOfficerColumns: any = ["assignedToFullname", "assignedDate", "assignedByFullname", "statusDescription"];
  assignOfficerColumnsName: any = ["Assigned Officer", "Assigned Date", "Assigned By", "Status",];
  tableAssignOffice = [];
  statusHistoryDataSource: any = [
    {
      "statusValue": "REPET",
      "statusDescription": "Repeat",
      "changedBy": "CCO",
      "changedByFullname": "Customer Creation Officer",
      "changedDate": "24-05-2024 10:23",
      "idoObjState": "Selected",
      "updateSeq": 0,
      "msg": {
        "infoMessage": null,
        "errorMessage": [],
        "hasError": false
      }
    },
    {

      "statusValue": "CUSTR",
      "statusDescription": "Customer",
      "changedBy": "TO2",
      "changedByFullname": "Trust Officer 2",
      "changedDate": "24-05-2024 10:20",
      "idoObjState": "Selected",
      "updateSeq": 0,
      "msg": {
        "infoMessage": null,
        "errorMessage": [],
        "hasError": false
      }
    },

  ];
  emailColumns: any = ["toEmailId", "sentDate", "sentStatusDescription", "action"];
  emailColumnsName: any = ["To", " Date | Time", "Status", "Action"];
  emailHistoryTableData: any = [];


  openStatusValueProcess(val: any) {


    // if (this.accordianOpen === false) {
    if (val === 1) {
      this.showStatusHistory = true;
      this.showEmailHistory = false;
      this.accordianOpen = true;
    }
    else if (val === 2) {
      this.showEmailHistory = true;
      this.showStatusHistory = false;
      this.accordianOpen = true
    }
  }
  openAccordianProcess(dujuk: any) {

    if (dujuk === false) {
      this.accordianOpen = true
      this.showStatusHistory = true;
      this.showEmailHistory = false
    }
    else {
      this.accordianOpen = false;
      this.showStatusHistory = false;
      this.showEmailHistory = false

    }
  }
  getListOfNotes() { }
  getStatusHistoryList() { }
  getAssignedOfficerList() { }
  getlistOfCommunicationHistory() { }

  createNotes() {

  }
  //
  editData = false
  name: any
  willChildren = new entWillApplicationChildren();
  editValues() {
    this.editData = true
  }
  saveValue() {

    this.editData = false
  }
  openCustomer(val: any, type: any) {
    const obj = {
      data: val
    }
    this.apiService.openCustomer(obj).subscribe((success) => {
      if (this.name === 'applicant') {
        this.willApplicant.ientCustomer = success;
      }
      if (this.name === 'spouse') {
        this.willSpouse.ientCustomer = success;
      }
      if (this.name === 'children') {
        this.willChildren.ientCustomer = success;
      }
      this.errorTrue = false
    })
  }
  //applicant
  @ViewChild('a') aForm !: NgForm
  saveApplicant() {

    if (this.aForm.valid) {
      this.willApplicant.appWillApplicationId = this.willApplication.willApplicationId
      this.apiService.saveWillApplicationApplicant(this.willApplicant).subscribe((success) => {
        this.willApplicant = success;
        this.dialog.closeAll();
        this.data.successMessage(success.msg?.infoMessage?.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  clearApplicant() {
    this.willApplicant = JSON.parse(JSON.stringify(this.willApplicantRAW));
    this.data.successMessage('Data Cleared Successfully');
    this.errorTrue = false
  }
  refreshApplicant() {
    const obj = {
      data: this.willApplicant.appWillApplicationApplicantId
    }
    this.apiService.openWillApplicationApplicant(obj).subscribe((success) => {
      this.willApplicant = success;
      this.data.successMessage('Data Refreshed Successfully');
      this.errorTrue = false
    })
  }

}
