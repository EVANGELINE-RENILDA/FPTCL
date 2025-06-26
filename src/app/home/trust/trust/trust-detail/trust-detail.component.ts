import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { entTrust, entTrustApplicant, entTrustApplication, entTrustBenificiary, entTrustSettlor } from '../../../../common/api-services/application-api/application-api.classes';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { FormsModule } from '@angular/forms';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { TabComponent, TabGroupComponent } from '../../../../app-core/template/tab/tab';
import { TabSubComponent, TabSubGroupComponent } from '../../../../app-core/template/tab/tab1';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { MenuAccessDirective } from '../../../../common/permission/menu-access.directive';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { FileSizePipe } from "../../../../app-core/template/drop-zone/file-size.pipe";
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { CoreService } from '../../../../app-core/service/core.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { AppService } from '../../../../app.service';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { ViewPdfComponent } from '../../../../app-core/template/view-pdf/view-pdf.component';

@Component({
  selector: 'app-trust-detail',
  standalone: true,
  imports: [ViewLabel, FormsModule, InputControlComponent, AppTableComponent, CellDefDirective,
    CellHeaderDefDirective, IconButtonComponent, TabGroupComponent, TabComponent, TabSubComponent,
    TabSubGroupComponent, Row, AppAccessDirective, MenuAccessDirective, AppDatePipe, AccordionModule, 
    FileSizePipe, InnerScroll],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trust-detail.component.html',
  styleUrl: './trust-detail.component.scss'
})
export class TrustDetailComponent {
   pageId = 'TAPSR';
  trustApplication = new entTrust();
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  //applicant
  applicantColumns: string[] = ['crm', 'bankName', 'bankCode', 'effectiveDate', 'contactNo', 'dateOfBrith', 'isPrimaryApplicant', '', 'action']
  applicantColumnsName: string[] = ['Client CRM No', 'Gender', 'Date of Birth', 'Email ID', 'Contact No', '', "Is Primary Applicant", "", "Action"]
  tableApplicantData = [];

  //beneficiary
  beneficiaryColumns: string[] = ['crm', 'bankName', 'bankCode', 'effectiveDate', 'contatc', 'dateOfBrith',  'action']
  beneficiaryColumnsName: string[] = ['Client CRM No', 'Gender', 'Date of Birth', 'Guardian Name', 'Contact No', 'father', "Action"]
  tableBenificiaryData = []

  //settlor
   settlorColumns: string[] = ['crm', 'bankName', 'bankCode', 'effectiveDate', 'contatc', 'isPrimaryClient', '', 'action'];
   settlorColumnsName: string[] = ['Client CRM No', 'Gender', 'Date Of Birth', 'Email ID', 'Contact No', "Is FPTCL", "", ""]
   tableSettlorData: any = []
     //clientDoc
  clientDocumentColumns: any = ['documentTypeDescription', 'fileName', 'fileSize', 'action'];
  clientDocumentColumnsName: any = ['Document Name', 'File Name', 'Size', 'Action'];
  documentTableData:any = []
  //Transactions
  transactionColumns:any = ['documemtDate','reference','source','transaction','narrative','moneyIn','moneyOut']
  transactionColumnName:any = ['Date','Reference','Source','Transaction','Narrative','Money In' ,'Money Out']
  //Withdrawal & Settlement
  withSettleColumn:any = ['accountNo','accountName','appliedDate','applicant','reason','dateProcessed','appliedAmount','approvedAmount'];
  withSettleColumsName:any = ['Account No', 'Account Name', 'Applied Date', 'Applicant', 'Reason', 'Date Processed', 'Applied Amount', 'Approved Amount']
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  dialogName = ''
  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public url: UrlService,
    public router: Router,
    public searchDialog: CoreService,
    private appService: AppService,
    public appSetting: AppSettingsService
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
      this.appService.helpFile ='Trust%20Application%20Detail.pdf'
    });
  }
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);

  }
  id = {
    currentIndex: 0,
    array: []
  };
  trustId:any 
  async init() {

    this.appService.setBreadCrumb(this.breadCrumb);
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    console.log(params);
    this.id = params;
    this.trustId = this.id.array[this.id.currentIndex];
    console.log(this.trustId);
    await this.data.checkToken();
   await this.openTrust();
    
  }
  @ViewChild('dialogDatas', { static: false })
  dialogDatas!: TemplateRef<any>;
  async dialogBoxData(val:any){
    this.dialogName = val
    let dialogResponse: any = await this.dialog.openDialog(this.dialogDatas, {
      height: '600px',
      width: '1200px',
      maxWidth: '1170px',
    });
  }
  openTrust(){
    const obj = {
      data:this.trustId
    }
    this.apiService.openTrust(obj).subscribe((success)=>{
      this.trustApplication = success;
      this.tableApplicantData = success.ilstentTrustApplicant;
      this.tableBenificiaryData = success.lstentTrustBenificiary;
      // this.tableSettlorData = success.
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }

  onTabChange(event:any){
    console.log(event.tabTitle);
    
    switch (event.tabTitle) {
      case 'Documents':this.getDocumentList(); break;
      case 'Transaction' : this.getTransactionList(); break; 
      case 'Withdrawals' : this.getWithDrawalList(); break;
      case 'Settlement' : this.getSettlementList(); break;
    }
  }
  //  --> member
  memberTabChange(event:any){
    switch (event.tabTitle) {
      case 'Beneficiary':this.getBeneficiaryList(); break;
      case 'Source of Income': this.getSettlorList(); break 
    }
  }   

  //Applicant
  trustApplicant = new entTrustApplicant()
  // getApplicantList(){
  //   const obj  = {
  //     data: this.trustId
  //   }
  //   this.apiService.getListofTrustApplicant(obj).subscribe((success)=>{
  //     this.tableApplicantData = success.lstentTrustApplicant
  //   })
  // }
  openTrustApplicant(val:any){
const obj = {
  data:val
}
this.apiService.openTrustApplicant(obj).subscribe((success)=>{
  this.trustApplicant = success;
  this.dialogBoxData('applicant')
  this.data.successMessage(success.msg?.infoMessage?.msgDescription);
})
  }

  //Beneficiary
  trustBeneficiary = new entTrustBenificiary();
  getBeneficiaryList(){
    const obj = {
      data: this.trustId
    }
    // this.apiService.getbene
  }
  openBeneficary(val:any){
    const obj ={
      data: val
    }
    this.apiService.openTrustBeneficiary(obj).subscribe((success)=>{
      this.trustBeneficiary = success;
      this.dialogBoxData('beneficiary')
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }
  trustSettlor = new entTrustSettlor()
  getSettlorList(){
    const obj = {
      data: this.trustId
    }
    this.apiService.getListofTrustSettlor(obj).subscribe((success)=>{
      this.tableSettlorData = success.lstentTrustApplicationSettlor
    })
  }
  opentrustSettlor(val:any){
    const obj  = {
      data: val
    }
    this.apiService.openTrustSettlor(obj).subscribe((success)=>{
      this.trustSettlor = success;
      this.dialogBoxData('settlor')
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }

  getDocumentList(){
    const obj ={
      data: this.trustId
    }
    this.apiService.getListOfDocumentByTrustId(obj).subscribe((success)=>{
      this.documentTableData = success.lstentTrustDocument
    })
  }
  navigateToList(){
    this.router.navigateByUrl('/home/trust/trust-search')
  }
  tableWithdrawal = []
  getWithDrawalList(){
    const obj ={
      data: this.trustId
    }
    this.apiService.getDataForWithdrawal(obj).subscribe((success)=>{
      this.tableWithdrawal = success.lstentWithdrawal
    })
  }

  tableSettlement = []
  getSettlementList(){
    const obj ={
      data: this.trustId
    }
    this.apiService.getDataForSettlement(obj).subscribe((success)=>{
      this.tableSettlement = success.lstentSettlement
    })
  }

  viewFile(element: any) {

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
      width: "100%",
      height: "85%",
      data: {
        url: xurl,
      },
    });
  }
  filePath: any;
  fileName = "";
  imageId: any;
  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;
  imageView(path: any, filename: any, val: any) {

    this.filePath = path;
    this.fileName = filename;
    this.imageId = val
    this.dialog.openDialog(this.Templates, {
      width: '600px',
      height: 'auto'
    })
  }
  downloadImageFile() {
    this.downloadFile(this.imageId)
    this.dialog.closeAll()
   
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
  tableTransactionData = []
  getTransactionList(){
    const obj = {
      data: this.trustApplication?.lstentFptclAccountNo[0]?.accountNo
    }
    this.apiService.getTransactionDetailsByAccountNo(obj).subscribe((success)=>{
        this.tableTransactionData = success.lstentTrasactionDetail
    })
  }
  //withdrawal
  columns: any = ['applicationRefNo', 'withdrawalTypeDescription', 'trustAccountNo','trustAccountNo1', 'enteredDate' ];
  columnsName: any = ['',  '', '', '', ''];
} 


