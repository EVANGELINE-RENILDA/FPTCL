import { NgClass } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, ViewLabel } from '../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { AccordionModule } from '../../../app-core/template/accordion/accordion.module';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../app-core/template/app-table/app-table.component';
import { DropZoneComponent } from '../../../app-core/template/drop-zone/drop-zone.component';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { StatusHistoryComponent } from '../../../app-core/template/status-history/status-history.component';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { entCustomer, entDeceasedPerson, entDeceasedPersonMarriageDetail, entDeceasedPersonWill, entEstateApplication, entEstateApplicationBeneficiary, entEstateApplicationExecutor, entEstateApplicationFinanceDetails, entEstateApplicationInvestmentDetails, entEstateApplicationNotes, entEstateApplicationRealestate, entEstateApplicationVehicleDetails, entEstateCreditor } from '../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
import { AddressEditComponent } from '../../../app-core/template/address-edit/address-edit.component';
import { CoreService } from '../../../app-core/service/core.service';
import { EstateInfoComponent } from './estate-info/estate-info.component';
import { TabComponent, TabGroupComponent } from '../../../app-core/template/tab/tab';
import { TabSubComponent, TabSubGroupComponent } from '../../../app-core/template/tab/tab1';
import { NotifyDeceasedEstateComponent } from './estate-application-process/notify-deceased-estate/notify-deceased-estate.component';
import { ConductInitialInterviewComponent } from './estate-application-process/conduct-initial-interview/conduct-initial-interview.component';
import { ObtainDetailInsComponent } from './estate-application-process/obtain-detail-ins/obtain-detail-ins.component';
import { OpenFileComponent } from './estate-application-process/open-file/open-file.component';
import { EstateAccountComponent } from './estate-application-process/estate-account/estate-account.component';
import { ReceiptFundComponent } from './estate-application-process/receipt-fund/receipt-fund.component';
import { IdentityValidateDebitComponent } from './estate-application-process/identity-validate-debit/identity-validate-debit.component';
import { ConfirmAssetsComponent } from './estate-application-process/confirm-assets/confirm-assets.component';
import { ObtainGrantComponent } from './estate-application-process/obtain-grant/obtain-grant.component';
import { CollectAssetsComponent } from './estate-application-process/collect-assets/collect-assets.component';
import { ProvisionClaimsComponent } from './estate-application-process/provision-claims/provision-claims.component';
import { ObtainTaxClearanceComponent } from './estate-application-process/obtain-tax-clearance/obtain-tax-clearance.component';
import { ArrangePaymentComponent } from './estate-application-process/arrange-payment/arrange-payment.component';
import { AppService } from '../../../app.service';
import { MultiPageUrlComponent } from '../../../app-core/template/multi-page-url/multi-page-url.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../common/services/url/url.service';
import { DataService } from '../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { MatRadioModule } from '@angular/material/radio';
import { EmailHistoryFormComponent } from '../../crm/email-history-form/email-history-form.component';

@Component({
  selector: 'app-estate-application-detail',
  standalone: true,
  imports: [FormsModule, Row, ViewLabel, AccordionModule, IconButtonComponent, InputControlComponent, AppTableComponent, DropZoneComponent, NgClass, AppDatePipe, StatusHistoryComponent, CellDefDirective, CellHeaderDefDirective, AddressEditComponent, TabGroupComponent, TabSubGroupComponent, TabComponent, TabSubComponent, NotifyDeceasedEstateComponent, ConductInitialInterviewComponent, ObtainDetailInsComponent, OpenFileComponent, EstateAccountComponent, ReceiptFundComponent, IdentityValidateDebitComponent, ConfirmAssetsComponent, ObtainGrantComponent, CollectAssetsComponent, ProvisionClaimsComponent, ObtainTaxClearanceComponent, ArrangePaymentComponent, AppTableComponent, MultiPageUrlComponent, MatRadioModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './estate-application-detail.component.html',
  styleUrl: './estate-application-detail.component.scss'
})
export class EstateApplicationDetailComponent {
  @ViewChild('PersonDetails') PersonDetailsForm!: NgForm;
  @ViewChild('marraigeDetails') marraigeDetailsForm!: NgForm;
  @ViewChild('executor') executorform!: NgForm;
  errorTrue = false;
  leadId: any = 0
  estateApplicationDetail = new entEstateApplication();
  deceasedPerson = new entDeceasedPerson()
  deceasedPersonWill = new entDeceasedPersonWill()
  deceasedPersonMarriageDetail = new entDeceasedPersonMarriageDetail()
  estateApplicationBeneficiary = new entEstateApplicationBeneficiary()
  estateApplicationExecutor = new entEstateApplicationExecutor()
  estateCreditor = new entEstateCreditor()
  estateApplicationRealestate = new entEstateApplicationRealestate()
  estateApplicationFinanceDetails = new entEstateApplicationFinanceDetails()
  estateApplicationInvestmentDetails = new entEstateApplicationInvestmentDetails()
  estateApplicationVehicleDetails = new entEstateApplicationVehicleDetails()
  estateApplicationNotes = new entEstateApplicationNotes()
  id = {
    currentIndex: 0,
    array: []
  };
  accept: any;
  accordionOpen = true
  accordionOpen1 = true
  accordionOpen2 = true
  //
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  beneficiaryColumns: any = ["firstName", "relationshipDescription", "occupation", "dateOfDeath", "maritalStatusDescription", "action"];
  beneficiaryColumnsName: any = ["Benificiary Name", " Relationship to Deceased", "Occupation", "Date Of Death", "Marital Status", " Action"];
  beneficiaryTableData: any = [
    //   {
    //   "toEmailId": 'Sailosi', "sentDate": 'Spouse', "sentStatusDescription": 'Doctor', "occu": '15 Jun 2020', "dod": 'Married',
    // }, 
    // {
    //   "toEmailId": 'Veressa', "sentDate": 'Daughter', "sentStatusDescription": 'Doctor', "occu": '', "dod": 'Single',
    // },
  ];

  realEstateColumns: any = [
    'titleNo',
    'tenureDescription',
    'tenancyTypeDescription',
    'address',
    'action'];
  realEstateColumnsName: any = ['Title No', 'Tenure', 'Tenancy', 'Address', 'Action'];
  realEstateTableData: any = [
    //   {
    //   'titleNo': '456/012',
    //   'tenure': '1 Year',
    //   'tenancy': 'Free Hold',
    //   'address': '	83 Amy Street Toorak',

    // }
  ]

  creditorColumns: any = ['cred', 'identityDesccription', 'identityNo', 'contactNo'];
  creditorColumnsName: any = ['Creditior', 'Identity Type', 'Identity No', 'Contact No'];
  creditorTableData: any = [
    //   {
    //   'cred': 'Dhanra', 'type': 'Driving License', 'idNo': 'FIJ445014', 'evdDoc': '+679-5454542'
    // }
  ];

  bankColumns: any = ['acno', 'acType', 'insName', 'bsb', 'action'];
  bankColumnsName: any = ['AC No', 'AC Type', 'Instiution Name', 'BSB', 'Action'];
  bankTableData: any = [{
    'acno': '5565147', 'acType': 'Savings', 'insName': 'WBC', 'bsb': 'Nasinu'
  }];

  shareColumns: any = ['companyName', 'shareTypeDescription', 'certificate', 'acType', 'action'];
  shareColumnsName: any = ['Company', 'Share', 'Certificate', 'AC Type', 'Action']
  shareTableData: any = [{
    'company': 'Kontiki Finance', 'share': 'IO0495', 'certificate': 'Yes', 'acType': 'Sole'
  }]

  vehicleColumns: any = ['vehicleRegNo', 'vehicleTypeDescription', 'vehicleMake', 'model', 'action'];
  vehicleColumnsName: any = ['Reg No', 'Vehicle Type', 'Make', 'Model'];
  vehicleTableData: any = [
    //   {
    //   'regNo': 'FX-103', 'vehicleType': 'Ford Ranger', 'make': '2016', 'model': 'Kappa'
    // }
  ]

  //history
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
  estateApplicationId: any = 0
  notesList:any

  //edit-Conditions
  editDecesedEstate = false;
  editDecesedPersonWill = false;
  editDeceasedMarriage = false;
  editExecutor = false


  constructor(public initialData: InitialDataService, public dialog: CoreService, public appService: AppService, public route: ActivatedRoute, public url: UrlService, public data: DataService, public apiService: ApplicationApiService, public router: Router,) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);

  }
  async init() {
    this.appService.setBreadCrumb(this.breadCrumb);
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    console.log(params);
    this.id = params;
    this.estateApplicationId = this.id.array[this.id.currentIndex];
    await this.data.checkToken();
    this.initialData.getDDL('getInitialDataForEstateApplication');
    this.initialData.getDDL('getInitialDataForDeceasedPerson');
    this.initialData.getDDL('getInitialDataForEstateApplicationBeneficiary');
    this.initialData.getDDL('getInitialDataForEstateApplicationRealestate');
    this.openEstateApplicationDetail()
  }

  openEstateApplicationDetail() {
    const obj = {
      data: this.estateApplicationId
    }
    this.apiService.openEstateApplication(obj).subscribe((success) => {
      this.estateApplicationDetail = success;
      this.data.successMessage(success.msg.infoMessage.msgDescription)
      this.openDeceasedPerson(success.ientDeceasedPerson.deceasedPersonId)
      // this.openEstateApplicationBeneficiary(success.estateApplicationId)
      // this.openEstateApplicationRealestate(success.estateApplicationId)


      // this.createDeceasedPerson()


    })
  }
  getCreditorList(){
    const obj = {
      data:this.estateApplicationDetail.estateApplicationId
    }
    this.apiService.getEstateCreditorList(obj).subscribe((success)=>{
      this.creditorTableData = success.ilstentEstateCreditor
    })
  }
  openDeceasedPerson(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openDeceasedPerson(obj).subscribe((success) => {
      this.deceasedPerson = success;
    })
  }
  openDeceasedPersonWill(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openDeceasedPersonWill(obj).subscribe((success) => {
      this.deceasedPersonWill = success;
    })
  }
  openDeceasedPersonMarriageDetail(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openDeceasedPersonMarriageDetail(obj).subscribe((success) => {
      this.deceasedPersonMarriageDetail = success;
    })
  }
  openEstateApplicationBeneficiary(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openEstateApplicationBeneficiary(obj).subscribe((success) => {
      this.estateApplicationBeneficiary = success;
    })
  }
  openEstateApplicationExecutor(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openEstateApplicationExecutor(obj).subscribe((success) => {
      this.estateApplicationExecutor = success;
    })
  }
  openEstateCreditor(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openEstateCreditor(obj).subscribe((success) => {
      this.estateCreditor = success;
    })
  }
  openEstateApplicationRealestate(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openEstateApplicationRealestate(obj).subscribe((success) => {
      this.estateApplicationRealestate = success;
    })
  }
  getBankTableData(val: any){
    const obj = {
      data: val
    }
    // this.apiService.getEstate
  }
  openEstateApplicationFinanceDetails(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openEstateApplicationFinanceDetails(obj).subscribe((success) => {
      this.estateApplicationFinanceDetails = success;
    })
  }
  openEstateApplicationInvestmentDetails(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openEstateApplicationInvestmentDetails(obj).subscribe((success) => {
      this.estateApplicationInvestmentDetails = success;
    })
  }
  openEstateApplicationVehicleDetails(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openEstateApplicationVehicleDetails(obj).subscribe((success) => {
      this.estateApplicationVehicleDetails = success;
    })
  }
  openEstateApplicationNotes(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openEstateApplicationNotes(obj).subscribe((success) => {
      this.estateApplicationNotes = success;
    })
  }
  saveDeceasedPerson() {
    if (this.PersonDetailsForm.valid) {
      this.apiService.saveDeceasedPerson(this.deceasedPerson).subscribe((success) => {
        this.deceasedPerson = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.editDecesedEstate = false
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  saveDeceasedPersonWill() {
    this.apiService.saveDeceasedPersonWill(this.deceasedPersonWill).subscribe((success) => {
      this.deceasedPersonWill = success;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
  saveDeceasedPersonMarriageDetail() {
    if (this.marraigeDetailsForm.valid) {

      this.apiService.saveDeceasedPersonMarriageDetail(this.deceasedPersonMarriageDetail).subscribe((success) => {
        this.deceasedPersonWill = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  saveEstateApplicationExecutor() {
    if (this.executorform.valid) {

      this.apiService.saveEstateApplicationExecutor(this.estateApplicationExecutor).subscribe((success) => {
        this.estateApplicationExecutor = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  saveEstateApplicationBeneficiary() {
    this.apiService.saveEstateApplicationBeneficiary(this.estateApplicationBeneficiary).subscribe((success) => {
      this.beneficiaryTableData = success.ilstentEstateApplicationBeneficiary;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.dialog.closeDialog();

    })
  }
  saveEstateCreditor() {
    this.apiService.saveEstateCreditor(this.estateCreditor).subscribe((success) => {
      this.creditorTableData = success.ilstentEstateCreditor;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.dialog.closeDialog();
    })
  }
  saveEstateApplicationRealestate() {
    this.apiService.saveEstateApplicationRealestate(this.estateApplicationRealestate).subscribe((success) => {
      this.estateApplicationRealestate = success.ilstentEstateApplicationRealestate;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.dialog.closeDialog();
    })
  }
  saveEstateApplicationInvestmentDetails() {
    this.apiService.saveEstateApplicationInvestmentDetails(this.estateApplicationInvestmentDetails).subscribe((success) => {
      this.shareTableData = success.ilstentEstateApplicationInvestmentDetails;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.dialog.closeDialog();
    })
  }
  saveEstateApplicationVehicleDetails() {
    this.apiService.saveEstateApplicationVehicleDetails(this.estateApplicationVehicleDetails).subscribe((success) => {
      this.vehicleTableData = success.ilstentEstateApplicationInvestmentDetails;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.dialog.closeDialog();
    })
  }


  openAccordion() {
    this.accordionOpen = false
    this.cardAccordionContent = 0
  }
  closeAccordion() {
    this.accordionOpen = true
    this.cardAccordionContent = 1
  }
  openAccordion1() {
    this.accordionOpen1 = false
    this.cardAccordionContent1 = 0
  }
  closeAccordion1() {
    this.accordionOpen1 = true
    this.cardAccordionContent1 = 1
  }
  openAccordion2() {
    this.accordionOpen2 = false
    this.cardAccordionContent2 = 0
  }
  closeAccordion2() {
    this.accordionOpen2 = true
    this.cardAccordionContent2 = 1
  }
  cardAccordionContent = 1
  cardTabChange(val: any) {
    this.cardAccordionContent = val;
    this.accordionOpen = true
    if (val === 1) {
      this.openDeceasedPerson(this.estateApplicationId)
    }
    if (val === 2) {
      // this.initialData.getDDL('getInitialDataForDeceasedPersonWill');
      this.openDeceasedPersonWill(this.estateApplicationId)
    }
    if (val === 3) {
      // this.initialData.getDDL('getInitialDataForDeceasedPersonMarriageDetail');
      this.openDeceasedPersonMarriageDetail(this.estateApplicationId)

    }
  }
  cardAccordionContent1 = 1
  cardTabChange1(val: any) {
    this.cardAccordionContent1 = val;
    this.accordionOpen1 = true
    if (val === 1) {
      this.initialData.getDDL('getInitialDataForEstateApplicationBeneficiary');
      this.openEstateApplicationBeneficiary(this.estateApplicationId)
    }
    if (val === 2) {
      this.initialData.getDDL('getInitialDataForEstateApplicationExecutor');
      this.openEstateApplicationExecutor(this.estateApplicationId)
    }
    if (val === 3) {
      this.initialData.getDDL('getInitialDataForEstateCreditor');
      this.getCreditorList()
    }
  }
  cardAccordionContent2 = 1
  cardTabChange2(val: any) {
    this.cardAccordionContent2 = val;
    this.accordionOpen2 = true
    if (val === 1) {
      this.openEstateApplicationRealestate(this.estateApplicationId)
    }
    if (val === 2) {
      this.initialData.getDDL('getInitialDataForEstateApplicationFinanceDetails');
      this.openEstateApplicationFinanceDetails(this.estateApplicationId)
    }
    if (val == 3) {
      this.initialData.getDDL('getInitialDataForEstateApplicationInvestmentDetails');
      this.openEstateApplicationInvestmentDetails(this.estateApplicationId)

    }
    if (val === 4) {
      this.initialData.getDDL('getInitialDataForEstateApplicationVehicleDetails');
      this.openEstateApplicationVehicleDetails(this.estateApplicationId)

    }
  }

  //Deceased Person Details
  editDecesedEstateDetils() {
    this.editDecesedEstate = true
  }

  uploadDeceasedPersonAttachment(event: any) {

  }
  //Deceased Person Will
  editDecesedEstateWill() {
    this.editDecesedPersonWill = true
  }
  saveDecesedEstateWill() {
    this.editDecesedPersonWill = false
  }
  uploadDeceasedEstateAttachment(event: any) {

  }

  //Deceased Marriage
  editDecesedMarriageWill() {
    this.editDeceasedMarriage = true
  }
  saveDeceasedMarriageWill() {
    this.editDeceasedMarriage = false
  }

  //executor
  editExecutorData() {
    this.editExecutor = true
  }
  saveExecutorData() {
    this.editExecutor = false
  }

  //
  async editInfo(val: any, data: any) {
    let response: any = await this.dialog.openDialog(EstateInfoComponent, {
      height: 'auto',
      width: '100%',
      maxWidth: '1100px',
      data: {
        type: val,
        data: data
      }
    });
    // if(response){
    //   this.beneficiaryTableData = response;
    // }
  }

  onTabChange(event: any) {

  }

  createNotes() {

  }


  navigateToList() {
    this.router.navigateByUrl('/home/estate/estate-application/search')
  }
  createDeceasedPerson() {
    this.errorTrue = false;
    this.apiService.createDeceasedPerson().subscribe((success) => {
      this.deceasedPerson = success;

    })
  }
  createDeceasedPersonWill() {
    this.apiService.createDeceasedPersonWill().subscribe((success) => {
      this.deceasedPersonWill = success;

    })
  } 
  createDeceasedPersonMarriageDetail() {
    this.errorTrue = false;
    this.apiService.createDeceasedPersonMarriageDetail().subscribe((success) => {
      this.deceasedPersonMarriageDetail = success;

    })
  }
  createEstateApplicationBeneficiary() {
    this.apiService.createEstateApplicationBeneficiary().subscribe((success) => {
      this.estateApplicationBeneficiary = success;
      this.editInfo('benificiary', success)

    })
  }
  createEstateApplicationExecutor() {
    this.errorTrue = false;
    this.apiService.createEstateApplicationExecutor().subscribe((success) => {
      this.estateApplicationExecutor = success;


    })
  }
  createEstateCreditor() {
    this.apiService.createEstateCreditor().subscribe((success) => {
      this.estateCreditor = success;
      this.editInfo('creditor', success)
    })
  }
  createEstateApplicationRealestate() {
    this.apiService.createEstateApplicationRealestate().subscribe((success) => {
      this.estateApplicationRealestate = success;
      this.editInfo('realestate', success)
    })
  }
  createEstateApplicationFinanceDetails() {
    this.apiService.createEstateApplicationFinanceDetails().subscribe((success) => {
      this.estateApplicationFinanceDetails = success;
      this.editInfo('bank', success)
    })
  }
  createEstateApplicationInvestmentDetails() {
    this.apiService.createEstateApplicationInvestmentDetails().subscribe((success) => {
      this.estateApplicationInvestmentDetails = success;
      this.editInfo('share', success)
    })
  }
  createEstateApplicationVehicleDetails() {
    this.apiService.createEstateApplicationVehicleDetails().subscribe((success) => {
      this.estateApplicationVehicleDetails = success;
      this.editInfo('vehicle', success)
    })
  }
  clear() {

  }
  clearWill() {
    this.createDeceasedPersonWill();
    this.data.successMessage('Data Cleared SuccessFully')
  }
  clearDeceasedperson() {
    this.createDeceasedPerson();
    this.data.successMessage('Data Cleared SuccessFully')
  }
  async viewEmailDetail(val: any) {
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(EmailHistoryFormComponent, {
      height: '550px',
      width: '100%',
      maxWidth: '1170px',
      data: {
        email: val,
        title: 'Customer Service',
        icon: 'assets/icons/accordian/customer-service.svg'
      }
    });
  }
}
