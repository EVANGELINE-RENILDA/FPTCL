import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { entCustomerSearch, entDeceasedPerson, entDeceasedPersonMarriageDetail, entDeceasedPersonWill, entEstateApplication, entEstateApplicationApplicant, entEstateApplicationBeneficiary, entEstateApplicationExecutor, entEstateApplicationFinanceDetails, entEstateApplicationInvestmentDetails, entEstateApplicationRealestate, entEstateApplicationVehicleDetails, entEstateCreditor } from '../../../../common/api-services/application-api/application-api.classes';
import { FormsModule, NgForm } from '@angular/forms';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { TabSubComponent, TabSubGroupComponent } from '../../../../app-core/template/tab/tab1';
import { NgClass } from '@angular/common';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { FileSizePipe } from '../../../../app-core/template/drop-zone/file-size.pipe';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../app-core/template/search/search.component';
import { AppService } from '../../../../app.service';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { MatTooltip } from '@angular/material/tooltip';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { TabAccordionComponent, TabAccordionGroupComponent } from '../../../../app-core/template/tab/tab-accordian';
import { ViewPdfComponent } from '../../../../app-core/template/view-pdf/view-pdf.component';
import { TabComponent, TabGroupComponent } from '../../../../app-core/template/tab/tab';
import { DropZoneComponent } from '../../../../app-core/template/drop-zone/drop-zone.component';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { DropZoneService } from '../../../../app-core/template/drop-zone/drop-zone.service';
import { ErrorInfoComponent } from '../../../../app-core/error-info/error-info.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [FormsModule, AccordionModule, InputControlComponent, ViewLabel,
     FormsModule,TabSubComponent, TabSubGroupComponent, Row, NgClass, FileSizePipe, InnerScroll,
     AppDatePipe, IconButtonComponent,SearchComponent, AddressEditComponent, MatTooltip,
      AppTableComponent, CellDefDirective, CellHeaderDefDirective, TabAccordionGroupComponent,
      TabAccordionComponent,TabGroupComponent,TabComponent, DropZoneComponent, CheckboxComponent,
      ErrorInfoComponent, ErrorMessageComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent1 {
  @Input() application = new entEstateApplication();
  @Output() applicationChange = new EventEmitter<any>();
  @ViewChild('appSearch') appSearch!: SearchComponent;
  editDecesedPersonWill = false
  estateApplicant = new entEstateApplicationApplicant();
  estateApplicantRAW = new entEstateApplicationApplicant();
  deceasedPersonData  = new entDeceasedPerson();
  deceasedPersonDataRAW  = new entDeceasedPerson();
  deceasedPersonWill = new entDeceasedPersonWill()
  deceasedWillDataRAW = new entDeceasedPersonWill()
  @ViewChild('dialogDatas') dialogDatas!: TemplateRef<any>;
  @ViewChild('dialogDatas1') dialogDatas1!: TemplateRef<any>;
  currentDate = ''
  @ViewChild('customerSearchDialog', { static: false })
  customerSearchDialog!: TemplateRef<any>;
  @ViewChild('marriageDialog', { static: false })
  marriageDialog!: TemplateRef<any>;
  userLoginId:any
  constructor(public dialog: CoreService, public apiService: ApplicationApiService,     public storage: AppStorageService,
    public data: DataService, public initialData: InitialDataService, public appService: AppService, public dropZoneService: DropZoneService ){}
  editData = false
  dialogName = '';
  fileExtension = 'jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv';
  accept:any;
  ngOnInit(): void {
    this.init();
  }
  async init() {
    await this.data.checkToken();
   this.userLoginId =await this.storage.get('userLoginId');
    console.log(this.userLoginId);
    this.currentDate = this.appService.getCurrentDate();
    await this.initialData.getDDL('getInitialDataForEstateApplicationRealestate');
    await this.initialData.getDDL('getInitialDataForEstateApplicationBeneficiary');
    // await this.initialData.getDDL('getInitialDataForDeceasedPerson');

    if(this.application.ientEstateApplicationApplicant.estateApplicationApplicantId !== 0 ){
      this.openApplicant(this.application.ientEstateApplicationApplicant.estateApplicationApplicantId)
    }
    if(this.application.ientDeceasedPerson.deceasedPersonId !== 0 ){
      this.openDeceasedPerson(this.application.ientDeceasedPerson.deceasedPersonId)
    }
    // this.openMarriageDetail()
  }
  async onBeneficiaryTab(event:any){
    switch (event.tabTitle) {
      case 'Executor':
        await this.initialData.getDDL('getInitialDataForEstateApplicationExecutor');
        if(this.application.ientEstateApplicationExecutor.estateApplicationExecutorId === 0){
          this.createExecutor()
        }
        else{
          this.openExecutor(this.application.ientEstateApplicationExecutor.estateApplicationExecutorId)
        }
        break;
        case 'Creditor':
          this.getCreditorList()
          break;
    }}
  onDeceasedTab(event:any){
    switch (event.tabTitle) {
      case 'Deceased Person Will Details':
        if(this.deceasedPersonWill.deceasedPersonWillId ===0){
          this.createDeceasedWill()
        }
        else{
          // this.opende
        }
        break;
    }
  }

  dialogClose(){
    this.data.showErrorMessage = false;
    this.dialog.closeDialog()
  }
  async editDialog(val:any, id?:any){
    console.log(val);
    this.editData = false
    this.dialogName = val
    if(this.dialogName === 'applicant'){
      if(this.application.ientEstateApplicationApplicant.estateApplicationApplicantId === 0){
        this.createApplicant()
      }
    }
    if(this.dialogName === 'deceasedPerson'){
      if(this.application.ientDeceasedPerson.deceasedPersonId === 0){
        this.createDeceasedPerson()
      }
      else{
        this.openDeceasedPerson(this.application.ientDeceasedPerson.deceasedPersonId)
      }
    }
    if(this.dialogName === 'beneficiary'){
      if(id === 0){
        this.createBeneficiary()
      }
      else{
        this.openBeneficiary(id)
      }
    }
    if(this.dialogName === 'creditor'){
      if(id === 0){
        this.createCreditor()
      }
      else{
        this.openCreditor(id)
      }
    }
    if(this.dialogName === 'executor'){
      if(this.application.ientEstateApplicationExecutor.estateApplicationExecutorId === 0){
        this.createExecutor()
      }
      else{
        this.openExecutor(this.application.ientEstateApplicationExecutor.estateApplicationExecutorId)
      }
    }
    let response: any = await this.dialog.openDialog(this.dialogDatas, {
      height: '600px',
      width: '100%',
      maxWidth: '1100px',
    });
  }
  errorTrue = false;
  editValues(){
    this.editData = true;
    this.errorTrue = false
  }
  //COMMON DOCS
  viewFile(element: any) {
    ;
    let base64Data = element.content.split(';base64,').pop();
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: element.fileType });

    const url = URL.createObjectURL(blob);
    if (element.fileType === 'application/pdf') {
      this.openPDFViewer(url);
    } else if (element.fileType.includes('image')) {
      this.imageView(url, element.fileName, element);
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
  downloadFile(element: any) {
    let base64Data: any = element.content.split(';base64,').pop();
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: element.fileType });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = element.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  uploadDeceasedDoc(event:any){
    this.deceasedPersonData.ientFile.fileType = event[0].fileType;
    this.deceasedPersonData.ientFile.fileName = event[0].fileName;
    this.deceasedPersonData.ientFile.fileSize = event[0].fileSize;
    this.deceasedPersonData.ientFile.content = event[0].content;
    this.deceasedPersonData.ientFile.fileExtension = event[0].fileType;
    this.deceasedPersonData.ientFile.content = event[0].content;
  }
  uploadCreditor(event:any){
    this.estateCreditor.ientFile.fileType = event[0].fileType;
    this.estateCreditor.ientFile.fileName = event[0].fileName;
    this.estateCreditor.ientFile.fileSize = event[0].fileSize;
    this.estateCreditor.ientFile.content = event[0].content;
    this.estateCreditor.ientFile.fileExtension = event[0].fileType;
    this.estateCreditor.ientFile.content = event[0].content;
  }
  uploadRealDoc(event:any){
    this.estateRealEstate.ientFile.fileType = event[0].fileType;
    this.estateRealEstate.ientFile.fileName = event[0].fileName;
    this.estateRealEstate.ientFile.fileSize = event[0].fileSize;
    this.estateRealEstate.ientFile.content = event[0].content;
    this.estateRealEstate.ientFile.fileExtension = event[0].fileType;
    this.estateRealEstate.ientFile.content = event[0].content;
  }
  uploadPermitDoc(event:any){
    this.estateVehicle.ipermitFile.fileType = event[0].fileType;
    this.estateVehicle.ipermitFile.fileName = event[0].fileName;
    this.estateVehicle.ipermitFile.fileSize = event[0].fileSize;
    this.estateVehicle.ipermitFile.content = event[0].content;
    this.estateVehicle.ipermitFile.fileExtension = event[0].fileType;
    this.estateVehicle.ipermitFile.content = event[0].content;
  }
  uploaInsuranecDoc(event:any){
    this.estateVehicle.iinsuranceFile.fileType = event[0].fileType;
    this.estateVehicle.iinsuranceFile.fileName = event[0].fileName;
    this.estateVehicle.iinsuranceFile.fileSize = event[0].fileSize;
    this.estateVehicle.iinsuranceFile.content = event[0].content;
    this.estateVehicle.iinsuranceFile.fileExtension = event[0].fileType;
    this.estateVehicle.iinsuranceFile.content = event[0].content;
  }

  filePath: any;
  fileName = '';
  imageId: any;
  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;
  imageView(path: any, filename: any, val: any) {
    ;
    this.filePath = path;
    this.fileName = filename;
    this.imageId = val;
    this.dialog.openDialog(this.Templates, {
      width: '600px',
      height: 'auto',
    });
  }



    //applicant
    @ViewChild('a') aForm!: NgForm;
    saveApplicant(){
      if(this.aForm.valid){
        this.estateApplicant.estateApplicationId = this.application.estateApplicationId;
        this.apiService.saveEstateApplicationApplicant(this.estateApplicant).subscribe((success)=>{
          this.estateApplicant = success;
          this.application.ientEstateApplicationApplicant = success;
          this.applicationChange.emit(this.application);
          this.data.successMessage(success.msg.infoMessage.msgDescription);
          this.dialog.closeAll();
          this.data.showErrorMessage = false;


        })
      }
      else{
        this.errorTrue = true
      }
    }
    createApplicant(){
      this.editData = true
      this.apiService.createNewEstateApplicationApplicant().subscribe((success)=>{
        this.estateApplicant = success;
        this.errorTrue = false;
      })
    }
    clearApplicant(){
      this.estateApplicant = JSON.parse(JSON.stringify(this.estateApplicantRAW));
      this.createApplicant();

      this.data.successMessage('Data Cleared Successfully')
    }
    refreshApplicant(){
      const obj = {
        data: this.estateApplicant.estateApplicationApplicantId
      }
      this.apiService.openEstateApplicationApplicant(obj).subscribe((success)=>{
        this.estateApplicant = success;
        this.errorTrue = false;
        this.data.successMessage('Data Refreshed Successfully')
      })

    }
    openApplicant(val:any){
      const obj = {
        data: val
      }
      this.apiService.openEstateApplicationApplicant(obj).subscribe((success)=>{
        this.estateApplicant = success;
        this.errorTrue = false;
      })

    }
    closeAllDialogs(){
      this.dialog.closeAll();
      this.data.showErrorMessage = false;
      this.errorTrue = false;
    }


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
          this.estateApplicant.ientCustomer = success;
          this.estateApplicant.customerId = success.customerId;
        }
        if (type === 'deceasedPerson') {
          this.deceasedPersonData.ientCustomer = success;
          this.deceasedPersonData.customerId = success.customerId;

        }
        if (type === 'beneficiary') {
          this.estateBeneficiary.ientCustomer = success;
          this.estateBeneficiary.customerId = success.customerId;

        }
        if (type === 'executor') {
          this.estateExecutor.ientCustomer = success;
          this.estateExecutor.customerId = success.customerId;

        }
        if (type === 'creditor') {
          this.estateCreditor.ientCustomer = success;
          this.estateCreditor.customerId = success.customerId;

        }
      })

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
    openCustomerInSearch(val: any, type: any) {
      const obj = {
        data: val,
      };
      this.apiService.openCustomer(obj).subscribe((success) => {
        if (type === 'applicant') {
          this.estateApplicant.ientCustomer = success;
          this.estateApplicant.customerId = success.customerId
        }
        if (type === 'beneficiary') {
          this.estateBeneficiary.ientCustomer = success;
          this.estateBeneficiary.customerId = success.customerId
        }
        if (type === 'executor') {
          this.estateExecutor.ientCustomer = success;
          this.estateExecutor.customerId = success.customerId
        }
        if (type === 'creditor') {
          this.estateCreditor.ientCustomer = success;
          this.estateCreditor.customerId = success.customerId
        }
        if (type === 'deceasedPerson') {
          this.deceasedPersonData.ientCustomer = success;
          this.deceasedPersonData.customerId = success.customerId
        }
        this.dialog.closeDialog()
        this.errorTrue = false;
      });
}
closeAllDialogApplicant(){
 if( this.estateApplicant.estateApplicationApplicantId === 0){
  this.estateApplicant = JSON.parse(JSON.stringify(this.estateApplicantRAW))
 }
 this.dialog.closeAll()
}


willDDl:any
getWillDDL(){
  const obj = {
    data: this.deceasedPersonData.customerId
  }
  this.apiService.getWillCustomerbasedonCustomerId(obj).subscribe((success)=>{
    console.log(success);
      this.willDDl = success.data[0].value
  })
}
getwillDetails(val:any){
const obj ={
  data:val
}
this.apiService.getDetailsBasedonWillRefNo(obj).subscribe((success)=>{
  this.deceasedPersonWill.willFileNo = success.fileNo
  this.deceasedPersonWill.testatorName=success.testatorName;
  this.deceasedPersonWill.testatorId = success.testatorId;
  this.deceasedPersonWill.willId = success.willApplicationId
  this.deceasedPersonWill.willHeldBy = success.enteredByFullname;
  this.deceasedPersonWill.deceasedPersonId = success.enteredByFullname;

})
}
 //deceased Person
 supportDocumentColumns = [
  'fileName','fileExtension',
  'fileSize',
  'action',
];
supportDocumentColumnsName = [ 'File Name','Extension', 'Size', 'Action'];
 @ViewChild('b') bForm!: NgForm;
 saveDeceasedPerson(){
   if(this.bForm.valid){

     this.deceasedPersonData.estateApplicationId = this.application.estateApplicationId;
     if(this.deceasedPersonData.deathNoticeId !== 0){
      this.deceasedPersonData.notifiedBy = this.userLoginId;
     }
     this.apiService.saveDeceasedPerson(this.deceasedPersonData).subscribe((success)=>{
       this.deceasedPersonData = success;
       this.data.successMessage(success.msg.infoMessage.msgDescription);
       this.dialog.closeAll();
       this.data.showErrorMessage = false;


     })
   }
   else{
     this.errorTrue = true
   }
 }
 createDeceasedPerson(){
   this.editData = true
   this.apiService.createDeceasedPerson().subscribe((success)=>{
     this.deceasedPersonData = success;
     this.errorTrue = false;
     this.editData = true;
   })
 }
 clearDeceasedPerson(){
   this.deceasedPersonData = JSON.parse(JSON.stringify(this.deceasedPersonDataRAW));
   this.createDeceasedPerson();

   this.data.successMessage('Data Cleared Successfully')
 }
 refreshDeceasedPerson(){
   const obj = {
     data: this.deceasedPersonData.deceasedPersonId
   }
   this.apiService.openDeceasedPerson(obj).subscribe((success)=>{
     this.deceasedPersonData = success;
     this.errorTrue = false;
     this.data.successMessage('Data Refreshed Successfully')
   })

 }
 closeAllDialogDeceasedPerson(){
  if(this.deceasedPersonData.deceasedPersonId === 0){
   this.deceasedPersonData = JSON.parse(JSON.stringify(this.deceasedPersonDataRAW))
  }
  this.dialog.closeAll();
  this.data.showErrorMessage = false
 }
 openDeceasedPerson(val: any) {
  const obj = {
    data: val
  }
  this.apiService.openDeceasedPerson(obj).subscribe((success) => {
    this.deceasedPersonData = success;
    this.marriageTableData = success.ilstentDeceasedPersonMarriageDetail;
    this.getWillDDL()
  })
}
//will

editDecesedEstateWill(){
  this.editDecesedPersonWill = true
}
createDeceasedWill(){
  this.apiService.createDeceasedPersonWill().subscribe((success)=>{
    this.deceasedPersonWill = success;

  })
}
uploadDeceasedPersonAttachment(event:any){
  this.deceasedPersonWill.ientFile.fileType = event[0].fileType;
  this.deceasedPersonWill.ientFile.fileName = event[0].fileName;
  this.deceasedPersonWill.ientFile.fileSize = event[0].fileSize;
  this.deceasedPersonWill.ientFile.content = event[0].content;
  this.deceasedPersonWill.ientFile.fileExtension = event[0].fileType;
  this.deceasedPersonWill.ientFile.content = event[0].content;
}
clearWill(){
  this.deceasedPersonWill = JSON.parse(JSON.stringify(this.deceasedPersonWill));
  this.data.showErrorMessage = false;
  this.createDeceasedWill();
  this.data.successMessage('Data Cleared Successfully');

}
saveDeceasedPersonWill(){
  this.deceasedPersonWill.deceasedPersonId = this.deceasedPersonData.deceasedPersonId
  this.deceasedPersonWill.estateApplicationId = this.application.estateApplicationId
  this.apiService.saveDeceasedPersonWill(this.deceasedPersonWill).subscribe((success)=>{
    this.deceasedPersonWill = success;
    this.application.ientDeceasedPerson =success;
    this.editDecesedPersonWill = false;
    this.dialog.closeAll();
    this.data.showErrorMessage = false
  })
}
refreshDeceasedWill(){
  const obj = {
    data: this.deceasedPersonWill.deceasedPersonId
  }
  this.apiService.openDeceasedPersonWill(obj).subscribe((success)=>{
    this.deceasedPersonWill = success;
    this.data.successMessage('Data Refreshed Successfully');
  })
}
openDeceasedPersonWill(){
  const obj = {
    // data: this.deceasedPersonData.i
  }
}

//marriage detail
marriageColumns = ['placeOfMarriage','marriedTo','placeOfDeath','isSpouseLiving','action'];
marriageTableData : any = [];
marriageColumnName = ['Place Of Marriage','Married to','Place Of Death','Is spouse still living','Action']
editDeceasedMarriage = false;
@ViewChild('marraigeDetails') marraigeDetailsForm!: NgForm;
deceasedPersonMarriageDetail = new entDeceasedPersonMarriageDetail();
deceasedPersonMarriageDetailRAW = new entDeceasedPersonMarriageDetail();
checkMarriageCreditor(event:any){
  if(event.target.checked === true){
    this.deceasedPersonMarriageDetail.isSpouseLiving = 'Y'
  }
  else{
    this.deceasedPersonMarriageDetail.isSpouseLiving = 'N'
  }
}
editDecesedMarriageWill(){
  this.editDeceasedMarriage = true;
}
createDeceasedMarriage(){
  this.apiService.createDeceasedPersonMarriageDetail().subscribe(async (success)=>{
    this.deceasedPersonMarriageDetail = success;
    let dialogResponse: any = await this.dialog.openDialog(this.marriageDialog, {
      height: '300px',
      width: '700px',
      maxWidth: '1170px',

    });
  })
}
openMarriageDetail(val:any){
  const obj ={
    data: val

  }
  this.apiService.openDeceasedPersonMarriageDetail(obj).subscribe(async (succes)=>{
    this.deceasedPersonMarriageDetail = succes;
    let dialogResponse: any = await this.dialog.openDialog(this.marriageDialog, {
      height: '450px',
      width: '700px',
      maxWidth: '1170px',

    });
    this.data.successMessage(succes.msg.infoMessage.msgDescription);
  })
}
clearMarriage(){
  this.deceasedPersonMarriageDetail = JSON.parse(JSON.stringify(this.deceasedPersonMarriageDetailRAW))
  this.createDeceasedMarriage();
  this.data.successMessage("Data Cleared Successfully");
}
refreshMarriage(){
  const obj ={
    data: this.application.estateApplicationId

  }
  this.apiService.openDeceasedPersonMarriageDetail(obj).subscribe((succes)=>{
    this.deceasedPersonMarriageDetail = succes;
    this.data.successMessage("Data Refreshed Successfully");
  })
}
saveDeceasedPersonMarriageDetail(){
  if(this.marraigeDetailsForm.valid){
    this.deceasedPersonMarriageDetail.estateApplicationId = this.application.estateApplicationId;
    this.deceasedPersonMarriageDetail.deceasedPersonId = this.deceasedPersonData.deceasedPersonId
    this.apiService.saveDeceasedPersonMarriageDetail(this.deceasedPersonMarriageDetail).subscribe((success)=>{
      this.marriageTableData = success.ilstentDeceasedPersonMarriageDetail;
      this.dialog.closeAll()
      this.editDeceasedMarriage = false
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }
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

realEstateDialogData = false;
financialDialogData = false;
investmentDialogData = false;
insuranceDialogData = false;
vehicleDialogData = false;
falseAllDialogData() {

  this.realEstateDialogData = false;
  this.financialDialogData = false;
  this.investmentDialogData = false;
  this.insuranceDialogData = false;
  this.vehicleDialogData = false;
}

async editRealestate(val: any, id?: any) {
  console.log(val,id);


  this.data.showErrorMessage = false
  this.dialogName = val
  this.errorTrue = false;
  if (id === 0) {
    this.editData = true;
  }
  if (id !== 0) {
    this.editData = false;
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
  if (val === 'vehicle') {
    if (id === 0) {
      this.createWillVehicle();
    } else {
      this.openWillVehicle(id);
    }
    this.falseAllDialogData();
    this.vehicleDialogData = true;
  }

  let response: any = await this.dialog.openDialog(this.dialogDatas1, {
    height: '600px',
    width: '100%',
    maxWidth: '1100px',
  });
}

//get list
getFinanceList(){
   this.initialData.getDDL('getInitialDataForEstateApplicationFinanceDetails');

  const obj = {
    data: this.application.estateApplicationId
  }
  this.apiService.getEstateApplicationFinanceDetailsList(obj).subscribe((success)=>{
      this.bankTableData = success.ilstentEstateApplicationFinanceDetails;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
  })
}
getInvestmentList(){
  this.initialData.getDDL('getInitialDataForEstateApplicationInvestmentDetails');

  const obj = {
    data: this.application.estateApplicationId
  }
  this.apiService.getEstateApplicationInvestmentDetailsList(obj).subscribe((success)=>{
      this.columnShareTabledata = success.ilstentEstateApplicationInvestmentDetails;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
  })
}
getVehicleList(){
  this.initialData.getDDL('getInitialDataForEstateApplicationVehicleDetails');

  const obj = {
    data: this.application.estateApplicationId
  }
  this.apiService.getEstateApplicationVehicleDetailsList(obj).subscribe((success)=>{
      this.vehicleTableData = success.ilstentEstateApplicationVehicleDetails;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
  })
}

//real Estate
@ViewChild('e') eForm!: NgForm;
estateRealEstate = new entEstateApplicationRealestate();
estateRealEstateRAW = new entEstateApplicationRealestate();
createWillRealEstate() {
  this.apiService
    .createEstateApplicationRealestate()
    .subscribe((success) => {
      this.estateRealEstate = success;
      this.dropZoneService.files = [];
    });
}
openWillRealEstate(val: any) {
  const obj = {
    data: val,
  };
  this.apiService
    .openEstateApplicationRealestate(obj)
    .subscribe((success) => {
      this.estateRealEstate = success;
      this.dropZoneService.files = [];
    });
}
saveRealEstate() {
  if (this.eForm.valid) {
    this.estateRealEstate.estateApplicationId =
      this.application.estateApplicationId;
    this.apiService
      .saveEstateApplicationRealestate(this.estateRealEstate)
      .subscribe((success) => {
        this.application.lstentEstateApplicationRealestate =
          success.ilstentEstateApplicationRealestate;
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
  this.estateRealEstate = JSON.parse(JSON.stringify(this.estateRealEstateRAW));
  this.data.successMessage('Data Cleared Successfully');
  this.errorTrue = false;
  this.dropZoneService.files = [];
  this.data.showErrorMessage = false;
}
refreshRealEstate() {
  const obj = {
    data: this.estateRealEstate.estateApplicationRealestateId,
  };
  this.apiService
    .openWillApplictionRealestateDetails(obj)
    .subscribe((success) => {
      this.estateRealEstate = success;
      this.data.successMessage('Data Refreshed Successfully');
      this.errorTrue = false;
    });
}
 //bank-finance
 willBankFinance = new entEstateApplicationFinanceDetails()
 willBankFinanceRAW =  new entEstateApplicationFinanceDetails()
 @ViewChild('f') fForm!: NgForm;
 createWillFinance() {
   this.willBankFinance.ientestateApplicationFinanceDetailsAddress.provinceId =0;
   this.willBankFinance.ientestateApplicationFinanceDetailsAddress.islandId = 0;
   this.willBankFinance.ientestateApplicationFinanceDetailsAddress.village = '';

   this.apiService
     .createEstateApplicationFinanceDetails()
     .subscribe((success) => {
       this.willBankFinance = success;
     });
 }
 openWillFinance(val: any) {
   const obj = {
     data: val,
   };
   this.apiService
     .openEstateApplicationFinanceDetails(obj)
     .subscribe((success) => {
       this.willBankFinance = success;
     });
 }

 saveFinance() {
   if (this.fForm.valid) {
     this.willBankFinance.estateApplicationId =
       this.application.estateApplicationId;
     this.apiService
       .saveEstateApplicationFinanceDetails(this.willBankFinance)
       .subscribe((success) => {
         this.bankTableData =
           success.ilstentEstateApplicationFinanceDetails;
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
     data: this.willBankFinance.estateApplicationFinanceDetailId,
   };
   this.apiService
     .openEstateApplicationFinanceDetails(obj)
     .subscribe((success) => {
       this.willBankFinance = success;
       this.data.successMessage('Data Refreshed Successfully');
       this.errorTrue = false;
     });
 }

 @ViewChild('g') gForm!: NgForm;
 willInvestment = new entEstateApplicationInvestmentDetails()
 willInvestmentRAW = new entEstateApplicationInvestmentDetails()
 isCerficateCheck(event: any) {
   ;
   if (event.target.checked === true) {
     this.willInvestment.isCertificateAvailable = 'Y';
   } else {
     this.willInvestment.isCertificateAvailable = 'N';
   }
 }
 createWillInvestment() {
   this.apiService
     .createEstateApplicationInvestmentDetails()
     .subscribe((success) => {
       this.willInvestment = success;
     });
 }
 openWillInvestment(val: any) {
   const obj = {
     data: val,
   };
   this.apiService
     .openEstateApplicationInvestmentDetails(obj)
     .subscribe((success) => {
       this.willInvestment = success;
     });
 }

 saveInvestment() {
   if (this.gForm.valid) {
     this.willInvestment.estateApplicationId =
       this.application.estateApplicationId;
     this.apiService
       .saveEstateApplicationInvestmentDetails(this.willInvestment)
       .subscribe((success) => {
         this.columnShareTabledata =
           success.ilstentEstateApplicationInvestmentDetails;
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
     data: this.willInvestment.estateApplicationInvestmentDetailId,
   };
   this.apiService
     .openEstateApplicationInvestmentDetails(obj)
     .subscribe((success) => {
       this.willInvestment = success;
       this.data.successMessage('Data Refreshed Successfully');
       this.errorTrue = false;
     });
 }

 //vehicle
 estateVehicle = new entEstateApplicationVehicleDetails()
 estateVehicleRAW = new entEstateApplicationVehicleDetails()

 @ViewChild('i') iForm!: NgForm;
 createWillVehicle() {
   this.apiService
     .createEstateApplicationVehicleDetails()
     .subscribe((success) => {
       this.estateVehicle = success;
     });
 }
 openWillVehicle(val: any) {
   const obj = {
     data: val,
   };
   this.apiService
     .openEstateApplicationVehicleDetails(obj)
     .subscribe((success) => {
       this.estateVehicle = success;
     });
 }

 saveVehicle() {
   if (this.iForm.valid) {
     this.estateVehicle.estateApplicationId = this.application.estateApplicationId;
  if(this.estateVehicle.insuranceAvailable === 'Y'){
   if(this.estateVehicle.iinsuranceFile.fileName !==''){
     this.apiService
    .saveEstateApplicationVehicleDetails(this.estateVehicle)
    .subscribe((success) => {
      this.vehicleTableData =
        success.ilstentEstateApplicationVehicleDetails;
      this.applicationChange.emit(this.application);
      this.data.showErrorMessage = false;
      this.dialog.closeAll();
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    });
   }
   else{
    this.data.errorInfoMessage('Upload the Insurance Document')
   }
  }
  if(this.estateVehicle.insuranceAvailable === 'N'){
    this.apiService
    .saveEstateApplicationVehicleDetails(this.estateVehicle)
    .subscribe((success) => {
      this.vehicleTableData =
        success.ilstentEstateApplicationVehicleDetails;
      this.applicationChange.emit(this.application);
      this.data.showErrorMessage = false;
      this.dialog.closeAll();
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    });
  }


   }
   else {
     this.errorTrue = true;
   }
 }
 clearVehicle() {
   this.estateVehicle = JSON.parse(JSON.stringify(this.estateVehicleRAW));
   this.data.successMessage('Data Cleared Successfully');
   this.errorTrue = false;
   this.data.showErrorMessage = false;
 }
 refreshVehicle() {
   const obj = {
     data: this.estateVehicle.estateApplicationVehicleDetailId,
   };
   this.apiService
     .openWillApplictionVehicleDetails(obj)
     .subscribe((success) => {
       this.estateVehicle = success;
       this.data.successMessage('Data Refreshed Successfully');
       this.errorTrue = false;
     });
 }





// beneficiary
beneficiaryColumns: any = ["firstName","crmNo" ,"isDeceased","relationshipDescription", "occupation", "contactNo", "maritalStatusDescription", "action"];
beneficiaryColumnsName: any = ["Beneficiary Name","Beneficiary CRM No",'Is Deceased', " Relationship to Deceased", "Occupation", "Contact No", "Marital Status", " Action"];
estateBeneficiary = new entEstateApplicationBeneficiary();
estateBeneficiaryRAW = new entEstateApplicationBeneficiary();
createBeneficiary(){
  this.apiService.createEstateApplicationBeneficiary().subscribe((success)=>{
    this.estateBeneficiary = success;
    this.editData = true;
  })
}
closeAllDialogBeneficiary(){
  this.dialog.closeAll();
  this.data.showErrorMessage = false;
  this.errorTrue = false;
}

@ViewChild('x') xForm!: NgForm;
saveBeneficiary(){
  
if(this.xForm.valid){
  this.estateBeneficiary.estateApplicationId = this.application.estateApplicationId
  this.apiService.saveEstateApplicationBeneficiary(this.estateBeneficiary).subscribe((success)=>{
    this.application.lstentEstateApplicationBeneficiary = success.ilstentEstateApplicationBeneficiary
    this.applicationChange.emit(this.application);
    this.data.showErrorMessage = false;
    this.dialog.closeAll();
    this.data.successMessage(success.msg?.infoMessage?.msgDescription);
  });
}
 else {
this.errorTrue = true;
 }
}
clearBeneficiary(){
  this.errorTrue = false;
  this.data.showErrorMessage = false;
  this.estateBeneficiary = JSON.parse(JSON.stringify(this.estateBeneficiaryRAW));
  this.data.successMessage('Data Cleared Successfully')
}
openBeneficiary(val:any){
  const obj ={
    data:val
  }
  this.apiService.openEstateApplicationBeneficiary(obj).subscribe((success)=>{
    this.estateBeneficiary = success;
    this.editData = false
  })
}
refreshBeneficiary(){
  const obj = {
    data: this.estateBeneficiary.estateApplicationBeneficiaryId
  }
  this.apiService.openEstateApplicationBeneficiary(obj).subscribe((success)=>{
    this.estateBeneficiary= success;
    this.errorTrue = false;
    this.data.showErrorMessage = false;
    this.data.successMessage('Data Refreshed Successfully')
  })
}
beneMinorCheck(event:any){
  if(event.target.checked === true){
    this.estateBeneficiary.isMinor = 'Y'
  }
  else{
    this.estateBeneficiary.isMinor = 'N'
  }
}
beneMenWillCheck(event:any){
  if(event.target.checked === true){
    this.estateBeneficiary.isMentionedInWill = 'Y'
  }
  else{
    this.estateBeneficiary.isMentionedInWill = 'N'
  }
}
beneDeceCheck(event:any){
  if(event.target.checked === true){
    this.estateBeneficiary.isDeceased = 'Y'
  }
  else{
    this.estateBeneficiary.isDeceased = 'N'
  }
}
isSpouseMarriageCheck(event:any){
  if(event.target.checked === true){
    this.deceasedPersonMarriageDetail.isSpouseLiving = 'Y'
  }
  else{
    this.deceasedPersonMarriageDetail.isSpouseLiving    = 'N'
  }
}
estateExecutor = new entEstateApplicationExecutor()
estateExecutorRAW = new entEstateApplicationExecutor()
@ViewChild('y') yForm!: NgForm;
createExecutor(){
  this.apiService.createEstateApplicationExecutor().subscribe((success)=>{
    this.estateExecutor = success;
     this.editData = true;
  })
}
saveExecutor(){
if(this.yForm.valid){
  this.estateExecutor.estateApplicationId = this.application.estateApplicationId
  this.apiService.saveEstateApplicationExecutor(this.estateExecutor).subscribe((success)=>{
    // this.application.lstentEstateApplicationExecutor = success.lstentEstateApplicationExecutor;
    this.estateExecutor = success;
    this.application.ientEstateApplicationExecutor = success;
    this.applicationChange.emit(this.application);
    this.data.showErrorMessage = false;
    this.dialog.closeAll();
    this.data.successMessage(success.msg?.infoMessage?.msgDescription);
  });
}
 else {
this.errorTrue = true;
 }
}
clearExecutor(){
  this.errorTrue = false;
  this.data.showErrorMessage = false;
  this.estateExecutor = JSON.parse(JSON.stringify(this.estateExecutorRAW));
  this.data.successMessage('Data Cleared Successfully')
}
openExecutor(val:any){
  const obj ={
    data:val
  }
  this.apiService.openEstateApplicationExecutor(obj).subscribe((success)=>{
    this.estateExecutor = success;
    this.editData = false
  })
}
refreshExecutor(){
  const obj = {
    data: this.estateExecutor.estateApplicationExecutorId
  }
  this.apiService.openEstateApplicationExecutor(obj).subscribe((success)=>{
    this.estateExecutor= success;
    this.errorTrue = false;
    this.data.showErrorMessage = false;
    this.data.successMessage('Data Refreshed Successfully')
  })
}
closeAllDialogExecutor(){
  this.dialog.closeAll();
  this.data.showErrorMessage = false;
  this.errorTrue = false;
}
exeDeceCheck(event:any){
  if(event.target.checked === true){
    this.estateExecutor.isDeceased = 'Y'
  }
  else{
    this.estateExecutor.isDeceased = 'N'
  }
}
estateCreditor = new entEstateCreditor()
estateCreditorRAW = new entEstateCreditor()
@ViewChild('z')zForm!: NgForm;
createCreditor(){
  this.apiService.createEstateCreditor().subscribe((success)=>{
    this.estateCreditor = success;
     this.editData = true;
  })
}
saveCreditor(){
if(this.zForm.valid){
 if(this.estateCreditor.ientFile.fileName !==''){
  this.estateCreditor.estateApplicationId = this.application.estateApplicationId
  this.apiService.saveEstateCreditor(this.estateCreditor).subscribe((success)=>{
    this.creditorTableData= success.ilstentEstateCreditor
    this.applicationChange.emit(this.application);
    this.data.showErrorMessage = false;
    this.dialog.closeAll();
    this.data.successMessage(success.msg?.infoMessage?.msgDescription);
  });
 }
 else{
  this.data.errorInfoMessage('Upload the Creditor Document')
 }
}
 else {
this.errorTrue = true;
 }
}
clearCreditor(){
  this.errorTrue = false;
  this.data.showErrorMessage = false;
  this.estateCreditor = JSON.parse(JSON.stringify(this.estateCreditorRAW));
  this.data.successMessage('Data Cleared Successfully')
}
openCreditor(val:any){
  const obj ={
    data:val
  }
  this.apiService.openEstateCreditor(obj).subscribe((success)=>{
    this.estateCreditor = success;
    this.editData = false
  })
}
refreshCreditor(){
  const obj = {
    data: this.estateCreditor.estateCreditorId
  }
  this.apiService.openEstateCreditor(obj).subscribe((success)=>{
    this.estateCreditor= success;
    this.errorTrue = false;
    this.data.showErrorMessage = false;
    this.data.successMessage('Data Refreshed Successfully')
  })
}
closeAllDialogCreditor(){
  this.dialog.closeAll();
  this.data.showErrorMessage = false;
  this.errorTrue = false;
}
columnsCreditor: any = [
  'chName',
  'dob',
  'address',
  'relation',
  'gender',
  'action',
];
columnsCreditorName: any = [
  'Creditor Name',
  'DOB',
  'Contact',
  'Email',
  'Gender',
  'Action',
];
creditorTableData = [];

getCreditorList(){
  const obj = {
    data: this.application.estateApplicationId
  }
  this.apiService.getEstateCreditorList(obj).subscribe((success)=>{
    this.creditorTableData = success.ilstentEstateCreditor;

  })
}
insureAvailCheck(eve:any){
  if(eve.target.checked === true){
    this.estateVehicle.insuranceAvailable = 'Y';
  }
  else{
    this.estateVehicle.insuranceAvailable = 'N';

  }
}


//delete
checkMarriageDelete(val:any){

}
  async checkDelete(type:any,val:any){
 if(type===''){}
}


}
