import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { InnerScroll, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { TabSubComponent, TabSubGroupComponent } from '../../../../app-core/template/tab/tab1';
import { TabComponent, TabGroupComponent } from '../../../../app-core/template/tab/tab';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { CoreService } from '../../../../app-core/service/core.service';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { DropZoneComponent } from '../../../../app-core/template/drop-zone/drop-zone.component';
import { NgClass } from '@angular/common';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { StatusHistoryComponent } from '../../../../app-core/template/status-history/status-history.component';
import { AppService } from '../../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { entOrganization, entOrganizationApplication, entOrganizationApplicationBankDetail, entOrganizationApplicationContactPerson, entOrganizationBankDetail, entOrganizationContactPerson, entOrganizationDocument } from '../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { ErrorInfoComponent } from '../../../../app-core/error-info/error-info.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { MultiPageUrlComponent } from '../../../../app-core/template/multi-page-url/multi-page-url.component';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { ViewPdfComponent } from '../../../../app-core/template/view-pdf/view-pdf.component';


@Component({
  selector: 'app-registered-organization-detail',
  standalone: true,
  imports: [Row, ViewLabel, FormsModule, InputControlComponent, AccordionModule, TabSubComponent, TabSubGroupComponent, TabGroupComponent, TabComponent, AppTableComponent, CellDefDirective, IconButtonComponent, InnerScroll, AddressEditComponent, DropZoneComponent, NgClass, AppDatePipe, StatusHistoryComponent, MultiPageUrlComponent, ErrorInfoComponent, ErrorMessageComponent, AccoutsStatusTableComponent, IconButtonComponent, CellHeaderDefDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './registered-organization-detail.component.html',
  styleUrl: './registered-organization-detail.component.scss'
})
export class RegisteredOrganizationDetailComponent {
  errorTrue = false;
  pageId=""
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('bank', { static: false })
  bank!: ElementRef;
  @ViewChild('contact', { static: false })
  contact!: ElementRef;
  @ViewChild('organizationApplicationInfo', { static: false })
  organizationApplicationInfo!: ElementRef;
  @ViewChild('organization') organizationform!: NgForm;
  @ViewChild('contactF') contactFform!: NgForm;
  @ViewChild('bankDetail') bankDetailform !: NgForm;
  registeredOrganization = new entOrganization()
  organizationContact = new entOrganizationApplicationContactPerson();
  organizationBank = new entOrganizationApplicationBankDetail();
  registeredContact = new entOrganizationContactPerson();
  registeredBank = new entOrganizationBankDetail();
  registeredDocument = new entOrganizationDocument()
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  };
  id = {
    currentIndex: 0,
    array: []
  };
  organizationRegisteredId: any = 0;
  currentDate: any = '';
  bankColumns: any = ['bname', 'bCode', 'brName', 'status', 'action'];
  bankColumnsName: any = ['Bank Name', 'Bank Code', 'IFSC NO', 'Status', 'Action'];
  tableBankData: any = [
    //   {
    //   'bname': 'kvb', 'bCode': 7221, 'brName': 'kvbn', 'status': 'Active'
    // }
  ];
  contactColumns: any = ['bname', 'bCode', 'brName', 'status', 'action'];
  contactColumnsName: any = ['Name', 'Designation', 'Email ID', 'Status', 'Action'];
  tableContactData: any = [
    //   {
    //   'bname': 'sameena', 'bCode': 'head', 'brName': 'sameena@gmail.com', 'status': 'Active'
    // }
  ];
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);

  }


  //clientDoc
  documentColumns: any = ['documentTypeDescription', 'fileName', 'fileSize', 'action']
  documentColumnsName: any = ['Document Name', 'File Name', 'Size', 'Action']
  tabledocumentData: any = []
  constructor(
    public dialog: CoreService,
    public appService: AppService,
    public route: ActivatedRoute,
    public data: DataService,
    public url: UrlService,
    public initialData: InitialDataService,
    public router: Router,
    public apiService: ApplicationApiService,
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }
  async init() {
    this.appService.setBreadCrumb(this.breadCrumb);
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    console.log(params);
    this.id = params;
    this.organizationRegisteredId = this.id.array[this.id.currentIndex];
    await this.data.checkToken();
    this.initialData.getDDL('getOrganizationApplicationInitialData');
    this.openRegisteredOrganization()
    this.currentDate = this.appService.getCurrentDate();
    // this.initialData.getDDL('getOrganizationContactPersonInitialData')
    // this.initialData.getDDL('getOrganizationApplicationBankDetailInitialData')

  }
  loading = false
  openRegisteredOrganization() {
    const obj = {
      data: this.organizationRegisteredId

    }
    this.apiService.openOrganization(obj).subscribe((success) => {
      this.registeredOrganization = success;
      this.tableContactData = success.lstentOrganizationContactPerson;
      this.tableBankData = success.lstentOrganizationBankDetail;
      this.tabledocumentData = success.lstentOrganizationDocument;
      this.loading = true
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);

    })
  }
  openRegisteredOrganizationContactPerson(id: any) {
    const obj = {
      data: id
    }
    this.apiService.openOrganizationContactPerson(obj).subscribe((success) => {
      this.registeredContact = success;
      this.contactDialog()
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);

    })
  }

  openRegisteredOrganizationBankDetail(id: any) {
    const obj = {
      data: id
    }
    this.apiService.openOrganizationBankDetail(obj).subscribe((success) => {
      this.registeredBank = success;
      this.bankDialog();
      this.data.successMessage(success.msg?.infoMessage?.msgDescription);
    })
  }

  onTabChange(event: any) {
    switch (event.tabTitle) {

    }
  }
  saveOrganization() {
    if (this.organizationform.valid) {
      // this.organizationApplication.branchId = this.appService.userData.branchId;
      // this.apiService.saveOrganizationApplication(this.organizationApplication).subscribe((success) => {
      //   this.organizationApplication=success;
      //   this.data.successMessage(success.msg?.infoMessage?.msgDescription)
      //   this.dialog.closeAll();

      // })
    }
    // else {
    //   this.errorTrue = true;
    // }
  }



  // saveOrganizationBank(){
  //   // this.organizationBank.organizationApplicationId=this.organizationApplicationId
  //   if(this.bankDetailform.valid){
  //     this.apiService.saveOrganizationApplicationBankDetail(this.organizationBank).subscribe((success)=>{
  //       this.tableBankData=success.lstentOrganizationApplicationBankDetail;
  //       this.data.successMessage(success.msg?.infoMessage?.msgDescription)
  //       this.dialog.closeDialog()
  //     })
  //   }
  //   else{
  //     this.errorTrue=true;
  //   }

  // }

  async bankDialog() {
    // this.dialogName = type
    let dialogResponse: any = await this.dialog.openDialog(this.bank, {
      height: '550px',
      width: '1000px',
      maxWidth: '1170px',

    });

  }
  async contactDialog() {
    // this.dialogName = type
    let dialogResponse: any = await this.dialog.openDialog(this.contact, {
      height: '550px',
      width: '1000px',
      maxWidth: '1170px',

    });
  }
  async orgAppInfo() {
    let dialogResponse: any = await this.dialog.openDialog(this.organizationApplicationInfo, {
      height: '550px',
      width: '1000px',
      maxWidth: '1170px',

    });

  }
  navigateToList() {
    this.router.navigateByUrl('/home/organization/registered-organization/search')
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
  imageId: any
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
}
