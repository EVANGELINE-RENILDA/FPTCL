import { CdkAccordionModule } from "@angular/cdk/accordion";
import { JsonPipe, NgClass } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, TemplateRef, ViewChild } from "@angular/core";
import { AccordionModule } from "../../../../app-core/template/accordion/accordion.module";
import { AppToolTipComponent, InnerScroll, Row, ViewLabel } from "../../../../app-core/core-component/core-component.component";
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from "../../../../app-core/template/app-table/app-table.component";
import { FormsModule, NgForm } from "@angular/forms";
import { InputControlComponent } from "../../../../app-core/form-input/input-control/input-control.component";
import { IconButtonComponent } from "../../../../app-core/template/icon-button/icon-button.component";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { StatusHistoryComponent } from "../../../../app-core/template/status-history/status-history.component";
import { AppDatePipe } from "../../../../common/pipes/app-date/app-date.pipe";
import { DocumentsComponent } from "../../../../app-core/template/documents/documents.component";
import { MultiPageUrlComponent } from "../../../../app-core/template/multi-page-url/multi-page-url.component";
import { entCustomerUpdate, entCustomerUpdateAssignedOfficerHistory, entCustomerUpdateBank, entCustomerUpdateNotes, entCustomerUpdateNotesList, entCustomerUpdateType, entCustomerUpdateTypeList } from "../../../../common/api-services/application-api/application-api.classes";
import { ActivatedRoute, Router } from "@angular/router";
import { ApplicationApiService } from "../../../../common/api-services/application-api/application-api.service";
import { DataService } from "../../../../common/services/data/data.service";
import { InitialDataService } from "../../../../common/services/initial-data/initial-data.service";
import { UrlService } from "../../../../common/services/url/url.service";
import { AppService } from "../../../../app.service";
import { CoreService } from "../../../../app-core/service/core.service";
import { CustomerUpdateFormComponent } from "../customer-update-form/customer-update-form.component";
import { NotesDialogComponent } from "../../notes-dialog/notes-dialog.component";
import { AddressEditComponent } from "../../../../app-core/template/address-edit/address-edit.component";
import { EmailHistoryFormComponent } from "../../email-history-form/email-history-form.component";
import { ErrorMessageComponent } from "../../../../app-core/message/error-message/error-message.component";
import { AppAccessDirective } from "../../../../common/permission/app-access.directive";
import { ButtonAccessDirective } from "../../../../common/permission/button-access.directive";
import { CheckboxComponent } from "../../../../app-core/template/checkbox/checkbox.component";


@Component({
  selector: 'app-customer-update-detail',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './customer-update-detail.component.html',
  styleUrl: './customer-update-detail.component.scss',
  imports: [CdkAccordionModule, NgClass, AccordionModule, JsonPipe, Row, ViewLabel, AppTableComponent, CellDefDirective, CellHeaderDefDirective, InnerScroll, FormsModule, InputControlComponent, IconButtonComponent, MatSlideToggle, StatusHistoryComponent, AppDatePipe, DocumentsComponent, MultiPageUrlComponent, AddressEditComponent, ErrorMessageComponent, AppAccessDirective, ButtonAccessDirective, AppToolTipComponent, CheckboxComponent]
})
export class CustomerUpdateDetailComponent {
  options = {
    hideFullSpinner: true
  }
  pageId = 'CUSUP'
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  id = {
    currentIndex: 0,
    array: []
  };
  customerUpdateId = 0;
  customerUpdate = new entCustomerUpdate();
  customerUpdateRAW: any;
  customerUpdateEditRAW: any;
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
  //
  showNotesDatas = false
  showStatusHistory = false
  accordianOpen = false
  notesList = new entCustomerUpdateNotesList();
  customerBank = new entCustomerUpdateBank();
  customerBankRAW = new entCustomerUpdateBank();
  notesData = new entCustomerUpdateNotes();
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
  //
  customerInfoEdit = false
  infoEditBtn = true
  employerEditBtn = true
  bankCodeValue = '';
  statusHistoryDataSource: any = [];
  assignedOfficerDDL: any = []
  customerDocumentList: any = [];
  customerType = new entCustomerUpdateType();
  benifitTypeData = new entCustomerUpdateTypeList();
  customerUpdateAssignOfficer = new entCustomerUpdateAssignedOfficerHistory
  sameAsResidential = false;
  imageGallery = {
    iImage: {},
  };
  employerInfoEdit = false
  btnConditions = true
  updateOldValue: any
  bankOldValue: any
  islandDDL: any
  currentDate = ''
  villageDDL: any
  @ViewChild('i') iForm!: NgForm;
  @ViewChild('y') yForm!: NgForm;
  @ViewChild('q') qForm!: NgForm;
  @ViewChild('x') xForm!: NgForm;
  @ViewChild('p') pform!: NgForm;
  @ViewChild('g') gForm!: NgForm;
  @ViewChild('b') bForm!: NgForm;

  assignOfficerColumns: any = ["assignedToFullname", "assignedDate", "assignedByFullname", "statusDescription"];
  assignOfficerColumnsName: any = ["Assigned Officer", "Assigned Date", "Assigned By", "Status",];
  tableAssignOffice = [];
  updtePageChanged(event: any) { }
  permanentAddressRAW: any
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
    this.route.paramMap.subscribe((params: any) => {
      this.appService.helpFile = 'Customer%20Update%20Detail.pdf'
      this.init();
    });
  }

  ngOnInit(): void { }
  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params;
    this.customerUpdateId = this.id.array[this.id.currentIndex];
    await this.data.checkToken();
    this.appService.setBreadCrumb(this.breadCrumb);
    await this.openCustomerUpdateDetails();
    this.currentDate = this.appService.getCurrentDate();
    await this.initialData.getDDL('getInitialDataForCustomerUpdate', this.options);
    await this.loadProvinceDDL();
    await this.initialData.getAllInitialHeadofficeBankValueDetails(this.options);
  }
  ProvinceDDL:any
  loadProvinceDDL(){
    this.apiService.loadAllMProvince().subscribe((success)=>{
      this.initialData.DDLValues.DDLProvince = success.value
    })
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }

  //detail
  openCustomerUpdateDetails() {
    this.errorTrue = false
    const obj = {
      data: this.customerUpdateId
    }
    this.apiService.openCustomerUpdate(obj).subscribe(async (success) => {
      this.customerUpdate = success;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.getBankTypeList();
      this.getBankList();
      this.getEmailList(success.customerUpdateId)
      this.getListOfNotes();
      this.getAssignOfficerList(success.customerUpdateId)
      this.getDocumentList();
      this.getStatusHistoryList(success.customerUpdateId);
      this.permanentAddressRAW = success.iPermanentaddress
      this.customerUpdateRAW = JSON.parse(JSON.stringify(this.customerUpdate));
      this.infoEditBtn = true
      this.employerEditBtn = true
      if (this.customerUpdate.isResidential === "Y") {
        this.doSameAsResidential(true)
      }
      if (success.oldValue !== null && success.oldValue !== '') {
        let ExistingData1: any = JSON.parse(success.oldValue);
        this.updateOldValue = ExistingData1;
      }
      if (success.statusValue !== 'CNCLD' &&
        success.statusValue !== 'APRVD' &&
        success.statusValue !== 'PNDAP' &&
        success.assignedOfficerFlag === 'True') {
        this.btnConditions = false
      }




    })
  }

  async refreshAddInfo() {
    this.createNewCustomerType();
    await this.openCustomerUpdateDetails();
  }


  saveCustomerUpdate() {
    if (this.bForm.valid) {
      this.apiService.saveCustomerUpdate(this.customerUpdate).subscribe((success) => {
        this.customerUpdate = success;
        this.customerUpdateRAW = JSON.parse(JSON.stringify(this.customerUpdate))
        this.dialog.closeDialog();
        this.customerInfoEdit = false;
        this.employerEditBtn = true;
        this.data.showErrorMessage = false;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        if (this.customerUpdate.statusValue !== 'CNCLD' &&
          this.customerUpdate.statusValue !== 'APRVD' &&
          this.customerUpdate.statusValue !== 'PNDAP' &&
          this.customerUpdate.assignedOfficerFlag === 'True') {
          this.btnConditions = false
        }

      })
    }
    else {
      this.errorTrue = true
    }
  }

  saveCustomerInfo() {
    if (this.iForm.valid) {
      this.apiService.saveCustomerUpdate(this.customerUpdate).subscribe((success) => {
        this.customerUpdate = success;
        this.customerUpdateRAW = JSON.parse(JSON.stringify(this.customerUpdate))
        this.dialog.closeDialog();
        this.customerInfoEdit = false;
        this.employerEditBtn = true;
        this.data.showErrorMessage = false;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        if (this.customerUpdate.statusValue !== 'CNCLD' &&
          this.customerUpdate.statusValue !== 'APRVD' &&
          this.customerUpdate.statusValue !== 'PNDAP' &&
          this.customerUpdate.assignedOfficerFlag === 'True') {
          this.btnConditions = false
        }
      })
    }
    else {
      this.errorTrue = true
    }
  }

  refreshCustomer() {
    this.errorTrue = false
    const obj = {
      data: this.customerUpdateId
    }
    this.apiService.openCustomerUpdate(obj).subscribe(async (success) => {
      this.customerUpdate = success;

      this.data.showErrorMessage = false;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.getBankTypeList();
      this.getBankList();
      this.getEmailList(success.customerUpdateId)
      this.getListOfNotes();
      this.getAssignOfficerList(success.customerUpdateId)
      this.getDocumentList();
      this.getStatusHistoryList(success.customerUpdateId);
      this.customerUpdateRAW = JSON.parse(JSON.stringify(this.customerUpdate));

      if (this.customerUpdate.isResidential === "Y") {
        this.doSameAsResidential(true)
      }
      if (success.oldValue !== null && success.oldValue !== '') {
        let ExistingData1: any = JSON.parse(success.oldValue);
        this.updateOldValue = ExistingData1;
      }
      if (success.statusValue !== 'CNCLD' &&
        success.statusValue !== 'APRVD' &&
        success.statusValue !== 'PNDAP' &&
        success.assignedOfficerFlag === 'True') {
        this.btnConditions = false
      }




    })
  }

  async editCustomer() {
    this.customerInfoEdit = true
    this.employerEditBtn = false
    // const obj = {
    //   data: this.customerUpdateId
    // }
    // this.apiService.openCustomerUpdate(obj).subscribe(async (success) => {
    //   this.data.showErrorMessage = false

    //   let dialogResponse: any = await this.dialog.openDialog(CustomerUpdateFormComponent, {
    //     disableClose: true,
    //     height: '550px',
    //     width: '100%',
    //     maxWidth: '1170px',
    //     data: {
    //       customer: success
    //     }
    //   });
    //   console.log(dialogResponse);
    //   if (dialogResponse) {
    //     this.openCustomerUpdateDetails()
    //   }
    // })

  }

  customerEmployerEdit() {
    this.employerInfoEdit = true
    this.infoEditBtn = false;
    this.getIslandFromProvince(this.customerUpdate.iEmployerAddress.provinceId);
    this.getVillageFromIsland(this.customerUpdate.iEmployerAddress.islandId);
    this.getTikinaDDLFromIslandandProvince(this.customerUpdate.iEmployerAddress.provinceId,this.customerUpdate.iEmployerAddress.islandId);
  }

  saveCustomerEmployer() {
    if (this.gForm.valid) {
      this.apiService.saveCustomerUpdate(this.customerUpdate).subscribe((success) => {
        this.customerUpdate = success;
        this.customerUpdateRAW = JSON.parse(JSON.stringify(this.customerUpdate))
        this.dialog.closeDialog();
        this.employerInfoEdit = false;
        this.infoEditBtn = true
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        if (this.customerUpdate.statusValue !== 'CNCLD' &&
          this.customerUpdate.statusValue !== 'APRVD' &&
          this.customerUpdate.statusValue !== 'PNDAP' &&
          this.customerUpdate.assignedOfficerFlag === 'True') {
          this.btnConditions = false
        }
      })
    }
    else {
      this.errorTrue = true
    }
  }

  //ddl cascading
  getIslandFromProvince(val: any, type?: any) {
    const obj = {
      data: val
    }
    this.apiService.getProvinceBasedOnInslandDDL(obj, this.options).subscribe((success) => {
      this.initialDDL[type] = success.value;
      this.islandDDL = success.value
      // if (this.resProvinceVal !== val) {
      //   this.customerDetails.iResidentialaddress.islandId = '';
      //   this.customerDetails.iResidentialaddress.village = '';
      //   this.residentialCheck = false
      //   this.sameAsResidential(false)
      // }
    })
  }

  getVillageFromIsland(val: any, type?: any) {
    const obj = {
      data: val
    }
    this.apiService.getIslandBasedOnVillageDDL(obj).subscribe((success) => {
      this.initialDDL[type] = success.value;
      this.villageDDL = success.value
    })
  }

  doSameAsResidential(event: any) {
    event ? this.customerUpdate.isResidential = 'Y' : this.customerUpdate.isResidential = 'N'
    if (this.customerUpdate.isResidential === 'Y') {
      let iPermanentAddress = JSON.parse(JSON.stringify(this.customerUpdate.iPermanentaddress));
      this.customerUpdate.iPermanentaddress = JSON.parse(JSON.stringify(this.customerUpdate.iResidentialaddress));
      this.customerUpdate.iPermanentaddress.addressId = iPermanentAddress.addressId;
      this.customerUpdate.iPermanentaddress.updateSeq = iPermanentAddress.updateSeq;
      this.customerUpdate.isResidential = 'Y';
    }
    if (this.customerUpdate.isResidential === 'N') {
      this.customerUpdate.iPermanentaddress = JSON.parse(JSON.stringify(this.permanentAddressRAW))
    }
  }

  checkAddressUpdate(event: any) {
    if (this.customerUpdate.isResidential === 'Y') {
      let iPermanentAddress = JSON.parse(JSON.stringify(this.customerUpdate.iPermanentaddress));
      this.customerUpdate.iPermanentaddress = JSON.parse(JSON.stringify(this.customerUpdate.iResidentialaddress));
      this.customerUpdate.iPermanentaddress.addressId = iPermanentAddress.addressId;
      this.customerUpdate.iPermanentaddress.updateSeq = iPermanentAddress.updateSeq;
      this.customerUpdate.isResidential = 'Y';
    }
  }
  //bank
  bankColums: any = ["bankName", "bankCode", "accountNo",  "effectiveDate", "statusDescription", "action"]
  bankColumnsName: any = ["Bank Name", "Bank Code", "Account Number",  "Effective Date", "Status", ""];
  tableBankData: any = []
  bankPageChanged(event: any) {
    this.customerBank.lstentBank.length = event.pageSize;
  }

  headOfficeBankId(val: any) {
    this.initialData.DDLValues.DDLBank.forEach((element: any) => {
      if (val === element.id) {
        this.headOffice = element.code;
      }
    });
  }

  getBankTypeList() {
    const obj = {
      data: this.customerUpdateId
    }
    this.apiService.getListofCustomerUpdateTypeByCustomerUpdateId(obj, this.options).subscribe((success) => {
      this.benifitTypeData = success;
    })
  }

  detailsFetched(event: any) {
    console.log('fetched');
    this.loader = false;
  }

  getBankList() {
    const obj = {
      data: this.customerUpdateId
    }
    this.apiService.getListofCustomerUpdateBankByCustomerUpdateId(obj, this.options).subscribe((success) => {
      this.tableBankData = success.entCustomerUpdateBankList
    })
  }
  onSelect(event: any) {
    this.__selectedItems = event;
  }

  getListOfNotes() {
    const obj = {
      data: this.customerUpdateId
    }
    this.apiService.getListOfNotesByCustomerUpdateId(obj, this.options).subscribe((success) => {
      this.notesList = success;
    })
  }

  createNotes() {
    const obj = {
      data: this.customerUpdate.statusValue,
    }
    this.apiService.createCustomerUpdateNotes(obj).subscribe(async (success) => {
      this.data.showErrorMessage = false

      let dialogResponse: any = await this.dialog.openDialog(NotesDialogComponent, {
        disableClose: true,
        height: '550px',
        width: '100%',
        maxWidth: '1170px',
        data: {
          customer: success,
          notesPage: 'Customer Update',
          status: success.statusValue,
          statusId: success.statusId,
        }
      });

      if (dialogResponse) {
        this.notesData.statusValue = dialogResponse.statusValue
        this.notesData.statusId = dialogResponse.statusId
        this.notesData.notes = dialogResponse.notes;
        this.customerUpdate.ientCustomerUpdateNotes = this.notesData;
        this.customerUpdate.ientCustomerUpdateNotes.customerUpdateId = this.customerUpdateId;
        this.apiService.saveCustomerUpdateNotes(this.customerUpdate).subscribe((success) => {
          this.customerUpdate = success;
          this.notesList.lstentCustomerUpdateNotes = success.lstentCustomerUpdateNotes;
          this.data.successMessage(success.msg.infoMessage.msgDescription);
          this.getEmailList(success.customerUpdateId)
          this.getStatusHistoryList(success.customerUpdateId);
          this.getAssignOfficerList(success.customerUpdateId);
          if (success.statusValue !== 'CNCLD' &&
            success.statusValue !== 'APRVD' &&
            success.statusValue !== 'PNDAP' &&
            success.assignedOfficerFlag === 'True') {
            this.btnConditions = false
          }

          this.dialog.closeDialog()
        })

        // this.opencustomerUpdate();
      }
    })
  }

  async bankDialogBox() {
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
    this.apiService.createNewCustomerUpdateBank().subscribe((success) => {
      this.createBank = true;
      this.viewBank = false;
      this.editBank = false
      this.bankDialogBox();
      this.customerBank = success
    })
  }

  viewBankDetail(val: any) {
    const obj = {
      data: val
    }
    this.apiService.openCustomerUpdateBankByCustomerUpdateBankId(obj).subscribe(async (success) => {
      this.viewBank = true;
      this.createBank = false;
      this.editBank = false
      this.bankDialogBox();
      this.customerBank = success;
      let bankData1: any = JSON.parse(success?.oldValue);
      this.bankOldValue = bankData1;
      this.customerBankRAW = JSON.parse(JSON.stringify(this.customerBank))
      if (this.customerBank.ientBank.ientAddress.provinceId !== 0) {
        this.getIslandFromProvince(this.customerBank.ientBank.ientAddress.provinceId, 'bankIslandDDL');
        this.getVillageFromIsland(this.customerBank.ientBank.ientAddress.islandId, 'bankVillageDDL');
        this.getTikinaDDLFromIslandandProvince(this.customerBank.ientBank.ientAddress.provinceId,this.customerBank.ientBank.ientAddress.islandId, 'bankVillageDDL');
      }
    })
  }

  openBankDetails() {
    const obj = {
      data: this.customerBank.customerUpdateBankId
    }
    this.apiService.openCustomerUpdateBankByCustomerUpdateBankId(obj).subscribe((success) => {
      this.customerBank = success;
      this.customerBankRAW = JSON.parse(JSON.stringify(this.customerBank))
      this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.getIslandFromProvince(this.customerBank.ientBank.ientAddress.provinceId, 'bankIslandDDL');
      this.getVillageFromIsland(this.customerBank.ientBank.ientAddress.islandId, 'bankVillageDDL');
      this.getTikinaDDLFromIslandandProvince(this.customerBank.ientBank.ientAddress.provinceId,this.customerBank.ientBank.ientAddress.islandId, 'bankVillageDDL');
    })
  }

  clearBankDetails() {
    this.errorTrue = false
    this.customerBank = JSON.parse(JSON.stringify(this.customerBankRAW));
    this.bankCodeValue = ''
    this.apiService.createNewCustomerUpdateBank().subscribe((success) => {
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
    if (this.customerBank.ientBank.ientAddress.tikinaId !== 0) {
      this.getTikinaDDLFromIslandandProvince(this.customerBank.ientBank.ientAddress.provinceId,this.customerBank.ientBank.ientAddress.islandId, 'bankVillageDDL')
    }
  }

  //bank Address Cascading
  viewBankDetailsBasedOnBankCode(x: any) {
    if (x.valid) {
      const obj = {
        data: this.bankCodeValue
      }
      this.apiService.getCustomerUpdateBankDetailsBasedOnBranchCode(obj).subscribe((success) => {
        this.customerBank = success;
        this.createNewBankInfoValues = true
        this.errorTrue = false;
      })
    }
    else {
      this.errorTrue = true
    }
  }

  saveBankDetails() {
    if (this.qForm.valid && this.xForm.valid) {
      this.customerBank.customerUpdateId = this.customerUpdateId
      this.apiService.saveCustomerUpdateBank(this.customerBank).subscribe((success) => {
        this.customerBank = success
        this.tableBankData = success.entCustomerUpdateBankList;
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
      this.customerBank.customerUpdateId = this.customerUpdateId
      this.apiService.saveCustomerUpdateBank(this.customerBank).subscribe((success) => {
        this.customerBank = success
        this.tableBankData = success.entCustomerUpdateBankList;
        this.dialog.closeDialog()
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }

  getStatusHistoryList(val: any) {
    const obj = {
      data: val
    }
    this.apiService.getListOfStatusHistoryByCustomerUpdateId(obj, this.options).subscribe((success) => {
      this.statusHistoryDataSource = success.listentCustomerUpdateStatusHistory
      // this.tab = success.listentCustomerStatusHistory;
    })
  }

  //document
  getDocumentList() {
    const obj = {
      data: this.customerUpdateId
    }
    this.apiService.getListOfDocumentByCustomerUpdateId(obj, this.options).subscribe((success) => {
      this.customerDocumentList = success.lstentCustomerUpdateDocument;
      if (this.customerUpdate.statusValue !== 'CNCLD' &&
        this.customerUpdate.statusValue !== 'APRVD' &&
        this.customerUpdate.statusValue !== 'PNDAP' &&
        this.customerUpdate.assignedOfficerFlag === 'True') {
        this.btnConditions = true
      }
      else {
        this.btnConditions = false
      }


    })
  }

  async addInfoDialog() {
    this.createNewCustomerType()
    this.errorTrue = false;
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(this.addnInfo, {
      disableClose: true,
      height: '550px',
      width: '100%',
      maxWidth: '1170px',
    });
  }

  onUpload(file: any, document: any) {
    document.ientFile = file;
    this.apiService.saveCustomerUpdateDocument(document).subscribe((success: any) => {
      this.customerDocumentList = success.lstentCustomerUpdateDocument;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }


  async checkDocumentDelete(docId: any) {
    let msg = `Are you sure, You want to delete this Attachments: ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      const obj = {
        data: docId.customerUpdateDocumentId
      }
      this.apiService.deleteCustomerUpdateDocument(obj).subscribe((success) => {
        this.customerDocumentList = success.lstentCustomerUpdateDocument;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
  }

  async checkCustomerTypeDelete(val: any) {
    let msg = `Are you sure, You want to delete this Customer Type:` + val.customerTypeDescription + `?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      const obj = {
        data: val.crmCustomerUpdateId
      }
      this.apiService.deleteCustomerUpdateType(obj).subscribe((success) => {
        this.benifitTypeData = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
  }

  deleteCustomerTypeValue(val: any) {
    const obj = {
      data: val
    }
    this.apiService.deleteCustomerUpdateType(obj).subscribe((success) => {
      this.benifitTypeData = success;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }

  saveCustomerTypeValue() {
    this.customerType.crmCustomerUpdateId = this.customerUpdateId
    this.apiService.saveCustomerUpdateType(this.customerType).subscribe((success) => {
      this.benifitTypeData = success;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }

  createNewCustomerType() {
    this.apiService.createCustomerUpdateType().subscribe((success) => {
      this.customerType = success
    })
  }

  navigateToList() {
    this.router.navigateByUrl('/home/crm/customer-update')
  }

  doAddInfoClose() {
    this.openCustomerUpdateDetails()
    this.customerUpdate = JSON.parse(JSON.stringify(this.customerUpdateRAW))
    this.dialog.closeDialog();
  }

  doBankClose() {
    this.customerBank = JSON.parse(JSON.stringify(this.customerBankRAW))
  }

  getAssignOfficerList(val: any) {
    const obj = {
      data: val,
      // data2: this.customerUpdate.statusValue
    }
    this.apiService.getListOfAssignedOfficerByCustomerUpdateId(obj).subscribe((success) => {
      this.tableAssignOffice = success.entCustomerUpdateAssignedOfficerList;

      this.getAssignOfficerDDL()
    })
  }

  getAssignOfficerDDL() {
    const obj = {
      data1: this.customerUpdateId,
      data2: this.customerUpdate.statusValue
    }
    this.apiService.getListOfOfficerForCustomerUpdate(obj).subscribe((success) => {
      this.assignedOfficerDDL = success.value
    })
  }

  reAssigned() {
    if (this.pform.valid) {
      this.customerUpdateAssignOfficer.customerUpdateId = this.customerUpdateId;
      this.customerUpdateAssignOfficer.statusValue = this.customerUpdate.statusValue;
      this.apiService.reAssignCustomerUpdateAssignedHistory(this.customerUpdateAssignOfficer).subscribe((success: any) => {
        this.customerUpdate = success;
        if (success.statusValue !== 'CNCLD' &&
          success.statusValue !== 'APRVD' &&
          success.statusValue !== 'PNDAP' &&
          success.assignedOfficerFlag === 'True') {
          this.btnConditions = false
        }
        this.tableAssignOffice = success.lstentCustomerUpdateAssignedOfficerHistory
        this.data.successMessage(success?.msg?.infoMessage?.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }

  selfAssigned() {
    this.customerUpdateAssignOfficer.customerUpdateId = this.customerUpdateId;
    this.customerUpdateAssignOfficer.statusValue = this.customerUpdate.statusValue;
    this.apiService.selfAssignCustomerUpdateAssignedHistory(this.customerUpdateAssignOfficer).subscribe((success: any) => {
      this.customerUpdate = success;
      if (success.statusValue !== 'CNCLD' &&
        success.statusValue !== 'APRVD' &&
        success.statusValue !== 'PNDAP' &&
        success.assignedOfficerFlag === 'True') {
        this.btnConditions = false
      }
      this.tableAssignOffice = success.lstentCustomerUpdateAssignedOfficerHistory
      this.data.successMessage(success?.msg?.infoMessage?.msgDescription);
    })
  }


  //Email history
  emailColumns: any = ["toEmailId", "sentDate", "sentStatusDescription", "action"];
  emailColumnsName: any = ["To", " Date", "Status", "Action"];
  emailHistoryTableData: any = []
  getEmailList(val: any) {
    const obj = {
      data: val
    }
    this.apiService.getListOfEmailHistoryByCustomerUpdateId(obj).subscribe((success) => {
      this.emailHistoryTableData = success.entCustomerUpdateEmailHistoryList
    })
  }

  async viewEmailDetail(val: any) {
    this.data.showErrorMessage = false;
    let dialogResponse: any = await this.dialog.openDialog(EmailHistoryFormComponent, {
      height: '550px',
      width: '100%',
      maxWidth: '1170px',
      data: {
        email: val,
        title: 'Customer Update',
        icon: 'assets/icons/accordian/customer-update.svg'
      }
    });
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
        this.customerUpdate.ientCustomerUpdatePhoto.fileContent = img;
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

  openAccordian(dujuk: any) {
    if (dujuk === false) {
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
  TikinaDDL:any
  getTikinaDDLFromIslandandProvince(provId: any,islid:any, type?: any) {
    const obj = {
      data1: provId,
      data2: islid
    }
    this.apiService.loadTikinaDetailsbasedonProvinceIsland(obj).subscribe((success) => {
      this.TikinaDDL = success.plistentTikinadetails
    })
  }
}

