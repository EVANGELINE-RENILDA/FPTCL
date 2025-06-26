import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { JsonPipe, NgClass, SlicePipe } from '@angular/common';
import { AppToolTipComponent, InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { DataService } from '../../../../common/services/data/data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { entAddress, entCrmCustomerBank, entCustomer, entCustomerNotes, entCustomerNotesList, entCustomerType, entCustomerTypeList } from '../../../../common/api-services/application-api/application-api.classes';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CoreService } from '../../../../app-core/service/core.service';
import { CustomerServiceListComponent } from '../../customer-service/customer-service-list/customer-service-list.component';
import { LeadListComponent } from '../../lead/lead-list/lead-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomerUpdateListComponent } from '../../customer-update/customer-update-list/customer-update-list.component';
import { NotesDialogComponent } from '../../notes-dialog/notes-dialog.component';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { StatusHistoryComponent } from '../../../../app-core/template/status-history/status-history.component';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MultiPageUrlComponent } from '../../../../app-core/template/multi-page-url/multi-page-url.component';
import { DocumentsComponent } from '../../../../app-core/template/documents/documents.component';
import { AppService } from '../../../../app.service';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { ToolTipDirective } from '../../../../app-core/directives/tool-tip.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DirectivesModule } from '../../../../app-core/directives/directives.module';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';



@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CdkAccordionModule, NgClass, AccordionModule, JsonPipe, Row, ViewLabel, AppTableComponent, CellDefDirective, CellHeaderDefDirective, IconButtonComponent, CustomerServiceListComponent, LeadListComponent, MatProgressSpinnerModule, CustomerUpdateListComponent, InnerScroll, FormsModule, InputControlComponent, StatusHistoryComponent, AppDatePipe, MatSlideToggleModule, MultiPageUrlComponent, DocumentsComponent, AddressEditComponent, ErrorMessageComponent, AppAccessDirective, ButtonAccessDirective, SlicePipe, AppToolTipComponent, CheckboxComponent, CheckboxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent {
  pageId = 'CUSTR';
  //toggle
  addInfoAccordian = false
  options = {
    hideFullSpinner: true
  }
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  id = {
    currentIndex: 0,
    array: []
  };
  customerId = 0;
  customerDetails = new entCustomer();
  customerDetailsRAW: any;
  customerDetailsEditRAW: any;
  permanentAddressRAW = this.customerDetails.iPermanentaddress
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  loader = true;
  @ViewChild('bankDialog', { static: false })
  bankDialog!: TemplateRef<any>;
  @ViewChild('addnInfo', { static: false })
  addnInfo!: TemplateRef<any>;
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;

  notesList = new entCustomerNotesList();
  customerBank = new entCrmCustomerBank();
  customerBankRAW = new entCrmCustomerBank();
  notesData = new entCustomerNotes();
  initialDDL: any = {
    resIslandDDL: [],
    resVillageDDL: [],
    perIslandDDL: [],
    perVillageDDL: [],
    bankIslandDDL: [],
    bankVillageDDL: []
  }
  editBank = false;
  createBank = false;
  viewBank = false;
  createNewBankInfoValues = false
  headOffice: any = ''
  customerInfoEdit = false;
  employerInfoEdit = false;
  employerEditBtn = true;
  infoEditBtn = true
  currentDate = '';
  bankCodeValue = '';
  statusHistoryDataSource: any = [];
  //
  showNotesDatas = false
  showStatusHistory = false
  accordianOpen = false

  islandDDL: any = [];
  villageDDL: any = []

  customerDocumentList: any = [];

  customerType = new entCustomerType();
  benifitTypeData = new entCustomerTypeList();
  // sameAsResidential = false;
  imageGallery = {
    iImage: {},
  };
  @ViewChild('b') bForm!: NgForm;
  @ViewChild('i') iForm!: NgForm;
  @ViewChild('y') yForm!: NgForm;
  @ViewChild('q') qForm!: NgForm;
  @ViewChild('x') xForm!: NgForm;
  @ViewChild('g') gForm!: NgForm;
  errorTrue = false

  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public url: UrlService,
    public router: Router,
    private appService: AppService
  ) {
        this.appService.helpFile = 'Customer%20Detail.pdf'
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  ngOnInit(): void {

  }


  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params;
    this.customerId = this.id.array[this.id.currentIndex];
    await this.data.checkToken();
    this.appService.setBreadCrumb(this.breadCrumb);
    await this.openCustomerDetails();
    this.loadProvinceDDL();
    this.currentDate = this.appService.getCurrentDate();
    // await this.initialData.getAllInitialDataForCustomer(this.options);
    await this.initialData.getDDL('getInitialDataForCustomer', this.options);
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
ProvinceDDL:any
  loadProvinceDDL(){
    this.apiService.loadAllMProvince().subscribe((success)=>{
      this.initialData.DDLValues.DDLProvince = success.value
    })
  }

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }

  //detail
  openCustomerDetails() {
    //contents
    this.customerInfoEdit = false
    this.employerInfoEdit = false
    this.infoEditBtn = true
    this.employerEditBtn = true

    this.errorTrue = false
    const obj = {
      data: this.customerId
    }
    this.apiService.openCustomer(obj).subscribe(async (success) => {
      this.customerDetails = success;
    await  this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.getBankTypeList();
      this.getBankList();
      this.getListOfNotes();
      this.getStatusHistoryList();
      this.getDocumentList();
      this.permanentAddressRAW = success.iPermanentaddress
      // this.initialData.DDLValues(this.options);
      this.getIslandFromProvince(success.iEmployerAddress.provinceId)
      this.getVillageDDLFromIsland(success.iEmployerAddress.islandId)
      this.getTikinaDDLFromIslandandProvince(success.iEmployerAddress.provinceId,success.iEmployerAddress.islandId)
      this.customerDetailsRAW = JSON.parse(JSON.stringify(this.customerDetails));
      if (this.customerDetails.isResidential === "Y") {
        this.doSameAsResidential(true)
      }
    })

  }

  refreshCustomer() {
    this.errorTrue = false
    const obj = {
      data: this.customerId
    }
    this.apiService.openCustomer(obj).subscribe(async (success) => {
      this.customerDetails = success;
      this.customerDetails.iPermanentaddress.provinceId = success.iPermanentaddress.provinceId
      this.customerDetails.iPermanentaddress.islandId = success.iPermanentaddress.islandId
      this.customerDetails.iPermanentaddress.village = success.iPermanentaddress.provinceId
      this.data.successMessage('Data Refreshed SuccessFully');
      this.getBankTypeList();
      this.getBankList();
      this.getListOfNotes();
      this.getStatusHistoryList();
      this.getDocumentList();

      this.getIslandFromProvince(success.iEmployerAddress.provinceId)
      this.getVillageDDLFromIsland(success.iEmployerAddress.islandId)
      this.getTikinaDDLFromIslandandProvince(success.iEmployerAddress.provinceId, success.iEmployerAddress.islandId)
      this.customerDetailsRAW = JSON.parse(JSON.stringify(this.customerDetails));
      if (this.customerDetails.isResidential === "Y") {
        this.doSameAsResidential(true)
      }
      else {
        this.doSameAsResidential(false)
      }

    })
  }

  async refreshAddInfo() {
    this.createNewCustomerType()
    this.openCustomerDetails()

  }

  clearCustomer() {
    this.errorTrue = false
    this.customerDetails = JSON.parse(JSON.stringify(this.customerDetailsRAW))
    this.data.successMessage('Data Cleared SuccessFully');

  }

  saveCustomer() {
console.log(this.bForm)
    if (this.bForm.valid) {

      this.apiService.saveCustomer(this.customerDetails).subscribe((success) => {
        this.customerDetails = success;
        this.customerDetailsRAW = JSON.parse(JSON.stringify(this.customerDetails))
        this.dialog.closeDialog();
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.data.showErrorMessage = false
      })
    }
    else {
      this.errorTrue = true
    }
  }

  saveCustomerInfo() {
    if (this.iForm.valid) {
      this.apiService.saveCustomer(this.customerDetails).subscribe((success) => {
        this.customerDetails = success;
        this.customerDetailsRAW = JSON.parse(JSON.stringify(this.customerDetails))
        this.dialog.closeDialog();
        this.data.showErrorMessage = false
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.customerInfoEdit = false
        this.employerEditBtn = true
        this.infoEditBtn = true
      })
    }
    else {
      this.errorTrue = true
    }
  }

  saveCustomerEmployer() {

    console.log(this.customerDetails.iEmployerAddress);

    if (this.gForm.valid) {

      this.apiService.saveCustomer(this.customerDetails).subscribe((success) => {
        this.customerDetails = success;

        // this.customerDetailsRAW = JSON.parse(JSON.stringify(this.customerDetails))
        this.dialog.closeDialog();
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.employerInfoEdit = false
        this.employerEditBtn = true
        this.infoEditBtn = true
      })
    }
    else {
      this.errorTrue = true
    }
  }

  async editCustomer() {
    this.customerInfoEdit = true
    this.employerEditBtn = false
    // this.data.showErrorMessage = false
    // const obj = {
    //   data: this.customerId
    // }
    // this.apiService.openCustomer(obj).subscribe(async (success) => {
    //   this.data.showErrorMessage = false

    //   let dialogResponse: any = await this.dialog.openDialog(CustomerFormComponent, {
    //     disableClose: true,
    //     height: '550px',
    //     width: '100%',
    //     maxWidth: '1170px',
    //     data: {
    //       customer: success
    //     }
    //   });
    //   if (dialogResponse) {
    //     this.customerDetails = dialogResponse
    //     this.apiService.saveCustomer(this.customerDetails).subscribe((success) => {
    //       this.customerDetails = success;
    //       this.data.successMessage(success.msg.infoMessage.msgDescription);
    //     })
    //   }
    // })

  }

  customerEmployerEdit() {
    this.employerInfoEdit = true
    this.infoEditBtn = false
  }

  //ddl cascading
  getIslandFromProvince(val: any, type?: any) {
    const obj = {
      data: val
    }
    this.apiService.loadAllMIslandswithProvince(obj, this.options).subscribe((success) => {
      this.initialDDL[type] = success.value;
      this.islandDDL = success.plistentIslanddetails
    })
  }

  getVillageFromIsland(val: any, type: any) {
    const obj = {
      data: val
    }
    this.apiService.getIslandBasedOnVillageDDL(obj).subscribe((success) => {
      this.initialDDL[type] = success.value
    })
  }

  getVillageDDLFromIsland(val: any) {
    const obj = {
      data: val
    }
    this.apiService.getIslandBasedOnVillageDDL(obj).subscribe((success) => {
      this.villageDDL = success.value
    })
  }
  TikinaDDL:any
  getTikinaDDLFromIslandandProvince(provId: any,islid:any) {
    const obj = {
      data1: provId,
      data2: islid
    }
    this.apiService.loadTikinaDetailsbasedonProvinceIsland(obj).subscribe((success) => {
      this.TikinaDDL = success.plistentTikinadetails
    })
  }

  doSameAsResidential(event: any) {
    event ? this.customerDetails.isResidential = 'Y' : this.customerDetails.isResidential = 'N'
    if (this.customerDetails.isResidential === 'Y') {
      let iPermanentAddress = JSON.parse(JSON.stringify(this.customerDetails.iPermanentaddress));
      this.customerDetails.iPermanentaddress = JSON.parse(JSON.stringify(this.customerDetails.iResidentialaddress));
      console.log(this.customerDetails.iPermanentaddress);
      
      this.customerDetails.iPermanentaddress.addressId = iPermanentAddress.addressId;
      this.customerDetails.iPermanentaddress.updateSeq = iPermanentAddress.updateSeq;
      this.customerDetails.isResidential = 'Y';
    }
    if (this.customerDetails.isResidential === 'N') {
      this.customerDetails.iPermanentaddress = JSON.parse(JSON.stringify(this.permanentAddressRAW))
    }
  }

  checkAddressUpdate(event: any) {
    if (this.customerDetails.isResidential === 'Y') {
      let iPermanentAddress = JSON.parse(JSON.stringify(this.customerDetails.iPermanentaddress));
      this.customerDetails.iPermanentaddress = JSON.parse(JSON.stringify(this.customerDetails.iResidentialaddress));
      this.customerDetails.iPermanentaddress.addressId = iPermanentAddress.addressId;
      this.customerDetails.iPermanentaddress.updateSeq = iPermanentAddress.updateSeq;
      this.customerDetails.isResidential = 'Y';
    }
  }

  //bank
  bankColums: any = ["bankName", "bankCode", "accountNo",  "effectiveDate", "statusDescription", "action"]
  bankColumnsName: any = ["Bank Name", "Bank Code", "Account Number",  "Effective Date", "Status", ""];
  tableBankData: any = []

  bankPageChanged(event: any) {
    // this.customerBank.pageNumber = event.pageNumber;
    this.customerBank.lstentBank.length = event.pageSize;
  }

  //customer Service
  serviceColumns: any = ["serviceRefNo", "customerName", "serviceTypeDescription", "branchDescription", "statusDescription", "action"];
  serviceColumnsName: any = ["Service No", "Customer Name", "Service Type", "Branch", "Status", "Action"];
  tableData: any = [];
  servicePageChanged(event: any) { }

  //lead
  leadColumns: any = ["leadRefNo", "serviceRefNo", "customerName", "leadTypeDescription", "productTypeDescription", "createdDate", "statusDescription", "action"];
  leadColumnsName: any = ["Lead No", "Service No", "Customer Name", "Lead Type", "Product Type", "createdDate", "Status", "Action"];
  tableLeadData: any = [];
  leadPageChanged(event: any) { }

  updateColumns: any = ["customerUpdateRefno", "customerName", "genderDescription", "dateOfBrith", "createdDate", "statusdescription", "action"];
  updateColumnsName: any = ["Customer Update No", "Customer Name", "Gender", "Date Of Birth", "createdDate", "Status", "Action"];
  tableUpdateData: any = [];
  updatePageChanged(event: any) { }


  getBankTypeList() {
    const obj = {
      data: this.customerId
    }
    this.apiService.getListofCustomerTypeByCustomerId(obj, this.options).subscribe((success) => {
      this.benifitTypeData = success;
    })
  }

  getBankList() {
    const obj = {
      data: this.customerId
    }
    this.apiService.getListofCustomerBankByCustomerId(obj, this.options).subscribe((success) => {
      this.tableBankData = success.entCrmCustomerBankList
    })
  }

  onSelect(event: any) {
    this.__selectedItems = event;
  }

  getListOfNotes() {
    const obj = {
      data: this.customerId
    }
    this.apiService.getListOfNotesByCustomerId(obj, this.options).subscribe((success) => {
      this.notesList = success;
    })
  }

  createNotes() {
    const obj = {
      data1: this.customerId,
      data2: this.customerDetails.customerStatusValue,
      data3: ''
    }
    this.apiService.createCustomerNotes(obj).subscribe(async (success) => {
      this.data.showErrorMessage = false
      let dialogResponse: any = await this.dialog.openDialog(NotesDialogComponent, {
        disableClose: true,
        height: '550px',
        width: '100%',
        maxWidth: '1170px',
        data: {
          customer: success,
          notesPage: 'Customer',
          status: success.customerStatusValue,
          statusId: success.customerStatusId,

        }
      });

      if (dialogResponse) {
        this.notesData.customerStatusValue = dialogResponse.statusValue
        this.notesData.customerStatusId = dialogResponse.statusId
        this.notesData.notes = dialogResponse.notes;
        this.customerDetails.ientCustomerNotes = this.notesData;
        this.customerDetails.ientCustomerNotes.customerId = this.customerId;
        this.apiService.saveCustomerNotes(this.customerDetails).subscribe((success) => {
          this.customerDetails = success;
          this.notesList.lstentCustomerNotes = success.lstentCustomerNotes;
          this.data.successMessage(success.msg.infoMessage.msgDescription);

          this.dialog.closeDialog()
          this.getStatusHistoryList()
        })
        // this.openCustomerDetails();
      }
    })
  }

  async bankDialogBox() {
    await this.initialData.getAllInitialHeadofficeBankValueDetails(this.options);
    this.data.showErrorMessage = false

    let dialogResponse: any = await this.dialog.openDialog(this.bankDialog, {
      disableClose: true,
      height: '550px',
      width: '100%',
      maxWidth: '1170px',

    });
    if (dialogResponse) {
      this.getBankList()
    }
  }

  createBankDetail() {
    this.bankCodeValue = '';
    this.errorTrue = false
    this.createNewBankInfoValues = false
    this.apiService.createNewCustomerBank().subscribe((success) => {
      this.createBank = true;
      this.viewBank = false;
      this.editBank = false
      this.bankDialogBox();
      this.customerBank = success
    })
  }
  detailsFetched(event: any) {
    console.log('fetched');
    this.loader = false;
  }

  headOfficeBankId(val: any) {
    this.initialData.DDLValues.DDLBank.forEach((element: any) => {
      if (val === element.id) {
        this.headOffice = element.code;
      }
    });
  }

  viewBankDetail(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openCustomerBankByCustomerBankId(obj).subscribe(async (success) => {
      this.viewBank = true;
      this.createBank = false;
      this.editBank = false
      this.bankDialogBox();
      this.customerBank = success
      this.customerBankRAW = JSON.parse(JSON.stringify(this.customerBank))
      this.headOfficeBankId(success.bankId)
      // this.bankProvinceVal = this.customerBank.ientBank.ientAddress.provinceId
      if (this.customerBank.ientBank.ientAddress.provinceId !== 0) {
        this.getIslandFromProvince(this.customerBank.ientBank.ientAddress.provinceId, 'bankIslandDDL');
        this.getVillageFromIsland(this.customerBank.ientBank.ientAddress.islandId, 'bankVillageDDL');

      }

    })
  }

  openBankDetails() {
    const obj = {
      data: this.customerBank.customerBankId
    }
    this.apiService.openCustomerBankByCustomerBankId(obj).subscribe((success) => {
      this.headOfficeBankId(success.bankId)
      this.customerBank = success;
      this.customerBankRAW = JSON.parse(JSON.stringify(this.customerBank))
      this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.getIslandFromProvince(this.customerBank.ientBank.ientAddress.provinceId, 'bankIslandDDL');
      this.getVillageFromIsland(this.customerBank.ientBank.ientAddress.islandId, 'bankVillageDDL');
    })
  }

  clearBankDetails() {
    this.errorTrue = false
    this.customerBank = JSON.parse(JSON.stringify(this.customerBankRAW));
    this.bankCodeValue = ''
    this.apiService.createNewCustomerBank().subscribe((success) => {
      this.customerBank = success;
    })
  }

  editBankDetails() {
    this.editBank = true;
    this.createBank = false;
    this.viewBank = false;
    if (this.customerBank.ientBank.ientAddress.provinceId !== 0) {
      this.getIslandFromProvince(this.customerBank.ientBank.ientAddress.provinceId, 'bankIslandDDL')
    }
    if (this.customerBank.ientBank.ientAddress.islandId !== 0) {
      this.getVillageFromIsland(this.customerBank.ientBank.ientAddress.islandId, 'bankVillageDDL')
    }
  }

  //bank Address Cascading
  viewBankDetailsBasedOnBankCode(x: any) {
    if (x.valid) {
      const obj = {
        data: this.bankCodeValue
      }
      this.apiService.getBankDetailsBasedOnBranchCode(obj).subscribe((success) => {
        this.customerBank = success;
        this.createNewBankInfoValues = true
        this.errorTrue = false;
        this.headOfficeBankId(success.bankId)
        // if (success.ientBank.ientAddress.provinceId !== '') {
        //   this.getBankIslandFromProvince(this.customerBank.ientBank.ientAddress.provinceId)
        // }
        // if (success.ientBank.ientAddress.islandId !== '') {
        //   this.getBankVillageFromIsland(this.customerBank.ientBank.ientAddress.islandId)
        // }
      })
    }
    else {
      this.errorTrue = true
    }
  }

  saveBankDetails() {
    if (this.qForm.valid && this.xForm.valid) {
      this.customerBank.customerId = this.customerId
      this.apiService.saveCustomerBank(this.customerBank).subscribe((success) => {
        this.customerBank = success
        this.tableBankData = success.entCrmCustomerBankList;
        this.dialog.closeDialog()
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }

  saveEditBankDetails() {
    if (this.qForm.valid) {
      this.customerBank.customerId = this.customerId
      this.apiService.saveCustomerBank(this.customerBank).subscribe((success) => {
        this.customerBank = success
        this.tableBankData = success.entCrmCustomerBankList;
        this.dialog.closeDialog()
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }

  getStatusHistoryList() {
    const obj = {
      data: this.customerId
    }
    this.apiService.getListOfStatusHistoryByCustomerId(obj, this.options).subscribe((success) => {
      this.statusHistoryDataSource = success.listentCustomerStatusHistory
    })
  }

  //document
  getDocumentList() {
    const obj = {
      data: this.customerId
    }
    this.apiService.getListOfDocumentByCustomerId(obj, this.options).subscribe((success) => {
      this.customerDocumentList = success.lstentCustomerDocument;
    })
  }

  async addInfoDialog() {
    this.createNewCustomerType()
    this.errorTrue = false
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.addnInfo, {
      disableClose: true,
      height: '600px',
      width: '100%',
      maxWidth: '1170px',

    });
  }

  onUpload(file: any, document: any) {
    document.ientFile = file;
    this.apiService.saveCustomerDocument(document).subscribe((success: any) => {
      this.customerDocumentList = success.lstentCustomerDocument;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }


  async checkDocumentDelete(docId: any) {
    let msg = `Are you sure, You want to delete : ${docId.docTypeDescription} ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {

      const obj = {
        data: docId.customerDocumentId
      }
      this.apiService.deleteCustomerDocument(obj).subscribe((success) => {
        this.customerDocumentList = success.lstentCustomerDocument;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
  }



  async checkCustomerTypeDelete(val: any) {
    let msg = `Are you sure, You want to delete this Customer Type:` + val.customerTypeDescription + `?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      const obj = {
        data: val.crmCustomerTypeId
      }
      this.apiService.deleteCustomerType(obj).subscribe((success) => {
        this.benifitTypeData = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }


  }

  deleteCustomerTypeValue(val: any) {
    const obj = {
      data: val
    }
    this.apiService.deleteCustomerType(obj).subscribe((success) => {
      this.benifitTypeData = success;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }

  saveCustomerTypeValue() {
    this.customerType.crmCustomerId = this.customerId
    this.apiService.saveCustomerType(this.customerType).subscribe((success) => {
      this.benifitTypeData = success;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
  createNewCustomerType() {
    this.apiService.createCustomerType().subscribe((success) => {
      this.customerType = success
    })
  }


  navigateToList() {
    this.router.navigateByUrl('/home/crm/customer')
  }
  doAddInfoClose() {
    // this.customerDetails = JSON.parse(JSON.stringify(this.customerDetailsRAW))
    this.dialog.closeDialog();
    this.openCustomerDetails()

  }
  doBankClose() {


    this.customerBank = JSON.parse(JSON.stringify(this.customerBankRAW))
  }
  clearHeadOffice() {
    this.customerBank.ientBank.headOfficeBankId = 0
  }


  //single

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
        this.customerDetails.ientCustomerPhoto.fileContent = img;
      };
      reader.onerror = (error) => {
        this.data.internalServerError('Error has been occured,while selecting the file.');
      };
      this.fileInput.nativeElement.value = '';
    }
    // } else {
    //   this.data.successMessage('For enhanced security, we request that you convert the file into jpeg/jpg format.')
    // }
  }


  openStatusValue(val: any) {
    if (val === 1) {
      this.showNotesDatas = true;
      this.showStatusHistory = false;
      this.accordianOpen = true;
    }
    else if (val === 2) {
      this.showStatusHistory = true;
      this.showNotesDatas = false;
      this.accordianOpen = true
    }

  }
  openAccordian(val: any) {

    if (val === false) {
      this.accordianOpen = true
      this.showNotesDatas = true;
      this.showStatusHistory = false
    }
    else {
      this.accordianOpen = false;
      this.showNotesDatas = false;
      this.showStatusHistory = false

    }
  }

}
