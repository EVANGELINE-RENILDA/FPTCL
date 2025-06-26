import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass, JsonPipe, SlicePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { TabContainerModule } from '../../../../../app-core/app-template/tab-container/tab-container.module';
import { TabItemModule } from '../../../../../app-core/app-template/tab-item/tab-item.module';
import { Row, ViewLabel, InnerScroll, AppToolTipComponent } from '../../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../../app-core/message/error-message/error-message.component';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { AddressEditComponent } from '../../../../../app-core/template/address-edit/address-edit.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';
import { DocumentsComponent } from '../../../../../app-core/template/documents/documents.component';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { MultiPageUrlComponent } from '../../../../../app-core/template/multi-page-url/multi-page-url.component';
import { StatusHistoryComponent } from '../../../../../app-core/template/status-history/status-history.component';
import { AppService } from '../../../../../app.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { AppAccessDirective } from '../../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { CustomerServiceListComponent } from '../../../../crm/customer-service/customer-service-list/customer-service-list.component';
import { CustomerUpdateListComponent } from '../../../../crm/customer-update/customer-update-list/customer-update-list.component';
import { LeadListComponent } from '../../../../crm/lead/lead-list/lead-list.component';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { VendorBankDetails, VendorContact, entActAddress, entActAttachments, entActNotes, entActVendor, entActVendorRegionAccess } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { Overlay } from '@angular/cdk/overlay';
import { SearchDebitComponent } from '../../../../search/search-debit/search-debit.component';

@Component({
  selector: 'app-vendor-detail',
  standalone: true,
  imports: [
    NgClass,
    Row,
    ViewLabel,
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    IconButtonComponent,
    InnerScroll,
    DropZoneComponent,
    FormsModule,
    InputControlComponent,
    AppDatePipe,
    ErrorMessageComponent,
    AppToolTipComponent,
    CheckboxComponent,
    TabItemModule,
    FooterToggleDirective,
    MatMenuModule,
    SearchDebitComponent, DocumentsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './vendor-detail.component.html',
  styleUrl: './vendor-detail.component.scss'
})
export class VendorDetailComponent {
  // color = 'green';
  id: any = 0;

  isOpen = false;
  selectedTab = 0;

  tableNoteData = [
    {
      // 'notes': 'This is a notes Description', 'createdBy': 'Admin Officer', 'dateTime': '04 May 2020 | 11:55 PM'
    },
    {
      // 'notes': 'This is a another Description', 'createdBy': 'Trust Officer', 'dateTime': '06 May 2020 | 12:55 PM'
    },
  ];
  tableAttachmentData = [
    {
      // 'fileName': 'Aadhaar Seeding in AAA+ Mobile App (1) (1) (1)(3)_03062024082803.pdf',
      // 'createdBy': 'Cheif Finance Officer',
      // 'createdDate': '10-05-2024 15:49',
      // 'fileFormat': 'pdf',
      // 'size': '2.35mb'
    }
  ];
  regionData = [
    {
      // 'fileName': 'Aadhaar Seeding in AAA+ Mobile App (1) (1) (1)(3)_03062024082803.pdf',
      // 'createdBy': 'Cheif Finance Officer',
      // 'createdDate': '10-05-2024 15:49',
      // 'fileFormat': 'pdf',
      // 'size': '2.35mb'
    }
  ];
  errorTrue = false;
  pageId = 'AJVSC';

  items: any = ['sNo', 'pqNo', 'poAmt', 'advancePaid', 'balanceAmt', 'totalAmt', 'delete'];

  itemsName: any = [
    '#',
    'PO No',
    'PO Amount',
    'Advance Paid	',
    'Balance Amount To Be Paid',
    '',
    'Delete',

  ];
  tableItemData = [{
    'sNo': '', 'pqNo': '', 'ledger': 'High Wheels', 'qty': 10.00, 'unit': 'Each', 'inr': '', 'value': 'INR', 'cyy': '232.22', 'unitPrice': 10.00, 'dis': 11.00, 'afterDis': 97.90, 'tax': 14.00
    , 'total': 111.61, 'nameDes': 'WH-HW-MG-0001'
  }];
  notes: any = ['notes', 'add'];
  notesName: any = ['Notes', '', ''];
  addressColumn: any = ['address', 'type', 'dateTime', 'status', 'add'];
  addressColumnName: any = ['Address', 'Type', 'Created Date', 'Status', 'Action'];
  tableAddressData: any = [
    { 'sno': 1, 'address': 'line 1, line 2 line 3 Chennai, India', 'createdBy': '	HeadOffice', 'dateTime': '03 May 2024', 'status': 'Active' }
  ];

  contactColumn: any = ['bankName', 'contactNo', 'email', 'beginDate', 'status', 'add'];
  contactColumnName: any = ['Contact Name', 'Contact Number', 'Email ID', 'Effective Date', 'Status', 'Action'];
  tableContactData: any = [];

  bankColumn: any = ['bankName', 'bankCode', 'beginDate', 'status', 'add'];
  bankColumnName: any = ['Bank Name', 'Bank Code', 'Begin Date', 'Status', 'Action'];
  tableBankData: any = [{ 'sno': 1, 'bankName': 'Bank Of India', 'bankCode': '	BOI4567', 'beginDate': '03 May 2024', 'status': 'Active' }];
  @ViewChild('DocumentsComponent', { static: false }) document!: DocumentsComponent;
  @ViewChild('a') aform!: NgForm
  @ViewChild('b') bform!: NgForm
  @ViewChild('n') nform!: NgForm
  @ViewChild('d') dform!: NgForm
  @ViewChild('r') rform!: NgForm
  @ViewChild('c') cform!: NgForm
  accordianOpen = true;
  accordianContent = true;
  attachment: any = ['fileName', 'fileFormat', 'size', 'download', 'action'];
  attachmentsName: any = ['File Name', 'File Format', 'Size', '', ''];
  region: any = ['regionDescription', 'enteredByFullName', 'createdDate', 'modifiedByFullName', 'modifiedDate', 'action'];
  regionName: any = ['Region', 'Entered By	', 'Entered Date', 'Modified By', 'Modified Date', ''];

  poData: any = ['changeBy', 'changedDate', 'status'];
  poDataName: any = ['Changed By', '	Changed Date', '	Status'];
  newAddressEdit = false
  newContactEdit = false
  newBankEdit = false
  newRegionEdit = false;
  statusLst: any = []
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('notesDialog') notesDialog!: TemplateRef<any>;
  @ViewChild('regionDialog') regionDialog!: TemplateRef<any>;
  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;
  @ViewChild('addressDialog') addressDialog!: TemplateRef<any>;
  @ViewChild('contactDialog') contactDialog!: TemplateRef<any>;
  @ViewChild('bankDialog') bankDialog!: TemplateRef<any>;

  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword';
  vendor = new entActVendor();
  vendorAddress = new entActAddress()
  vendorContact = new VendorContact()
  vendorBankDetails = new VendorBankDetails()
  vendorNotes = new entActNotes();
  vendorAttachments = new entActAttachments();
  vendorRegion = new entActVendorRegionAccess()
  DDLCurrencyValue: any = [];
  initialLoad = true;
  loadingTrue = false;
  options = {
    hideFullSpinner: true,
  };
  accountsOptions = {
    type: 'accountsPath',
  };
  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public url: UrlService,
    public router: Router,
    private appService: AppService,
    public accountsService: AccountsApiService,
    public overlay: Overlay,
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  async init() {
    await this.data.checkToken();
    this.appService.setBreadCrumb(this.breadCrumb);
    let paramsId: any = this.route.snapshot.paramMap.get('id');
    this.id = await this.url.decode(paramsId);
    await this.initialData.getAcccountsDDL('getVendorInitialData', this.options);
    if (this.id > 0) {
      this.openVendor();
    } else {
      this.createNewVendor();
    }
  }


  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  openVendor(id?: any, type?: any) {
    const obj = {
      data: this.id
    }
    this.accountsService.openVendor(obj).subscribe((success: any) => {
      this.vendor = success;
      this.ddlSetup();
      this.tableAddressData = success.lstAddress;
      this.tableContactData = success.lstVendorContact;
      this.tableBankData = success.lstVendorBankDetails;
      this.tableNoteData = success.lstActNotes;
      this.tableAttachmentData = success.lstentActAttachments;
      this.regionData = success.plstentActVendorRegionAccess;
      this.errorTrue = false;

    })
    if (type != 'refresh') { }
    else {
      this.data.successMessage('Data Refreshed Successfully')
    }
  }
  createNewVendor() {
    this.errorTrue = false;
    this.accountsService.createNewVendor().subscribe(async (success) => {
      this.vendor = success;
    })
  }
  createNewVendorAddress() {
    this.errorTrue = false;
    this.accountsService.createNewVendorAddress().subscribe((success) => {
      this.vendorAddress = success;
    })
  }
  clearVendorAddress() {
    this.createNewVendorAddress();
    this.data.successMessage('Data Refreshed Successfully')
  }
  clearVendorContact() {
    this.createNewVendorContact();
    this.data.successMessage('Data Refreshed Successfully')
  }
  clearVendorBankDetail() {
    this.createNewVendorBankDetail();
    this.data.successMessage('Data Refreshed Successfully')
  }
  clearVendorNotes() {
    this.createNewVendorNotes();
    this.data.successMessage('Data Refreshed Successfully')
  }
  clearRegion() {
    this.createNewVendorRegionAccess();
    this.data.successMessage('Data Refreshed Successfully')
  }



  //address
  async createNewAddress(val: any) {
    if (val === 0) {
      this.newAddressEdit = true;
      this.createNewVendorAddress()
    }
    else {
      this.newAddressEdit = false;
      this.openAddress(val);
    }
    let dialogResponse: any = await this.dialog.openDialog(this.addressDialog, {
      disableClose: true,
      height: '400px',
      width: '80%',
      maxWidth: '1170px',
    })

  }

  openAddress(val: any, type?: any) {
    const obj = {
      data: val
    }
    this.errorTrue = false;
    this.accountsService.openVendorAddress(obj).subscribe((success) => {
      this.vendorAddress = success;
    })
    if (type != 'refresh') { }
    else {
      this.data.successMessage('Data Refreshed Successfully')
    }
  }
  openVendorContact(val: any, type?: any) {
    const obj = {
      data: val
    }
    this.errorTrue = false;
    this.accountsService.openVendorContact(obj).subscribe((success) => {
      this.vendorContact = success;
    })
    if (type != 'refresh') { }
    else {
      this.data.successMessage('Data Refreshed Successfully')
    }
  }
  openVendorRegionAccess(val: any, type?: any) {
    const obj = {
      data: val
    }
    this.errorTrue = false;
    this.accountsService.openVendorRegionAccess(obj).subscribe((success) => {
      this.vendorRegion = success;
    })
    if (type != 'refresh') { }
    else {
      this.data.successMessage('Data Refreshed Successfully')
    }

  }
  openVendorBankDetails(val: any, type?: any) {
    const obj = {
      data: val
    }
    this.errorTrue = false;
    this.accountsService.openVendorBankDetails(obj).subscribe((success) => {
      this.vendorBankDetails = success;
    })
    if (type != 'refresh') { }
    else {
      this.data.successMessage('Data Refreshed Successfully')
    }
  }
  createNewVendorContact() {
    this.errorTrue = false;
    this.accountsService.createNewVendorContact().subscribe((success) => {
      this.vendorContact = success;
    })
  }
  createNewVendorNotes() {
    this.errorTrue = false;
    this.accountsService.createNewVendorNotes().subscribe((success) => {
      this.vendorNotes = success;
    })
  }
  createNewVendorBankDetail() {
    this.errorTrue = false;
    this.accountsService.createNewVendorBankDetail().subscribe((success) => {
      this.vendorBankDetails = success;
    })
  }
  createNewVendorRegionAccess() {
    this.errorTrue = false;
    this.accountsService.createNewVendorRegionAccess().subscribe((success) => {
      this.vendorRegion = success;
    })
  }
  saveVendorAddress() {
    if (this.aform.valid) {
      this.vendorAddress.referenceId = this.vendor.actVendorId;
      this.accountsService.saveVendorAddress(this.vendorAddress).subscribe((success) => {
        this.tableAddressData = success.lstAddress;
        this.data.successMessage(success?.msg?.infoMessage?.msgDescription);
        this.openVendor()
        this.dialogClose();
      })
    }
    else {
      this.errorTrue = true;
    }

  }
  saveVendorContact() {
    if (this.cform.valid) {
      this.vendorContact.actVendorId = this.vendor.actVendorId;
      this.accountsService.saveVendorContact(this.vendorContact).subscribe((success) => {
        this.tableContactData = success.plstVendorContact;
        this.data.successMessage(success?.msg?.infoMessage?.msgDescription);
        this.dialogClose();
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  saveVendorBankDetails() {
    if (this.bform.valid) {
      this.vendorBankDetails.actVendorId = this.vendor.actVendorId;
      this.accountsService.saveVendorBankDetails(this.vendorBankDetails).subscribe((success) => {
        this.tableBankData = success.plstVendorBankDetails;
        this.data.successMessage(success?.msg?.infoMessage?.msgDescription);
        this.dialogClose();
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  saveVendorNotes() {
    if (this.nform.valid) {
      this.vendorNotes.referenceId = this.vendor.actVendorId;
      this.accountsService.saveVendorNotes(this.vendorNotes).subscribe((success) => {
        this.tableNoteData = success.plstentActNotes;
        this.data.successMessage(success?.msg?.infoMessage?.msgDescription);
        this.dialogClose();
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  saveVendorRegionAccess() {

    if (this.rform.valid) {
      this.vendorRegion.actVendorId = this.vendor.actVendorId;
      this.accountsService.saveVendorRegionAccess(this.vendorRegion).subscribe((success) => {
        this.regionData = success.plstentActVendorRegionAccess;
        this.data.successMessage(success?.msg?.infoMessage?.msgDescription);
        this.dialogClose();
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  navigateToList() {
    this.router.navigateByUrl('/home/purchase/vendor/search');
  }

  openAccordian(dujuk: any) {
    console.log(dujuk);
    if (dujuk === false) {
      this.accordianOpen = true;
      this.accordianContent = true;
    } else {
      this.accordianOpen = false;
      this.accordianContent = false;
    }
  }

  onSelectTab(val: any) {
    this.selectedTab = val;
  }

  //notes
  async createNewNotes(val: any) {
    this.createNotes()
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: '400px',
      width: '900px',
      maxWidth: '1170px',
    })
  }

  createNotes() {
    this.accountsService.createNewVendorNotes().subscribe((success) => {
      this.vendorNotes = success
    })
  }
  async createNewRegion(val?: any) {
    if (val === 0) {
      this.newRegionEdit = true
      this.createNewVendorRegionAccess()
    }
    else {
      this.newRegionEdit = false
      this.openVendorRegionAccess(val)
    }
    let dialogResponse: any = await this.dialog.openDialog(this.regionDialog, {
      disableClose: true,
      height: '300px',
      width: '700px',
      maxWidth: '1170px',
    })
  }
  saveNotes() {
    this.vendorNotes.actCompanyId = this.vendor.actCompanyId
    if (this.nform.valid) {
      this.accountsService.saveVendorNotes(this.vendorNotes).subscribe((success) => {
        this.tableNoteData = success.plstentActNotes;
        this.data.successMessage(success?.msg?.infoMessage?.msgDescription);
      })
    }
    else {
      this.errorTrue = true
    }
  }
  clear() {

  }

  //attachment
  async createNewAttachment() {

    let dialogResponse: any = await this.dialog.openDialog(this.attachmentDialog, {
      disableClose: true,
      height: '300px',
      width: '100%',
      maxWidth: '1170px',
    })

  }


  //contact
  async createNewContact(val: any) {
    if (val === 0) {
      this.newContactEdit = true
      this.createNewVendorContact()
    }
    else {
      this.newContactEdit = false
      this.openVendorContact(val)
    }
    let dialogResponse: any = await this.dialog.openDialog(this.contactDialog, {
      disableClose: true,
      height: '400px',
      width: '80%',
      maxWidth: '1170px',
    })
  }
  async createRegion(val: any) {
    if (val === 0) {
      this.newContactEdit = true
      this.createNewVendorRegionAccess()
    }
    else {
      this.newContactEdit = false
      this.openVendorRegionAccess(val)
    }
    let dialogResponse: any = await this.dialog.openDialog(this.regionDialog, {
      disableClose: true,
      height: '400px',
      width: '80%',
      maxWidth: '1170px',
    })
  }

  async createNewBank(val: any) {
    if (val === 0) {
      this.newContactEdit = true
    }
    else {
      this.newContactEdit = false
    }

    let dialogResponse: any = await this.dialog.openDialog(this.contactDialog, {
      disableClose: true,
      height: '400px',
      width: '80%',
      maxWidth: '1170px',
    })

  }



  //bank
  async createNewBankDetails(val: any) {
    if (val === 0) {
      this.newBankEdit = true
      this.createNewVendorBankDetail()
    }
    else {
      this.newBankEdit = false
      this.openVendorBankDetails(val)
    }

    let dialogResponse: any = await this.dialog.openDialog(this.bankDialog, {
      disableClose: true,
      height: '400px',
      width: '80%',
      maxWidth: '1170px',
    })

  }

  saveVendor() {
    debugger
    if (this.dform.valid) {
      this.accountsService.saveVendor(this.vendor).subscribe((success) => {
        this.vendor = success;
        this.data.showErrorMessage = false;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    } else {
      this.errorTrue = true;
    }
  }
  async ddlSetup(val?: any) {
    debugger
    this.DDLCurrencyValue = [];
    if (val) {
      this.vendor.currencyValue = "";
    }
    let currencyValue = await this.appService.currencyValue;
    if (this.vendor.vendorSubTypeValue === 'LOCAL') {
      let index = this.initialData.DDLValues.configCurrency.map((e: any) => e.constant).indexOf(currencyValue);
      if (index !== -1) {
        this.DDLCurrencyValue.push(this.initialData.DDLValues.configCurrency[index]);
      }
    }
    else {
      this.initialData.DDLValues.configCurrency.forEach((element: any) => {
        if (element.constant !== currencyValue) {
          this.DDLCurrencyValue.push(element)
        }
      });
    }
  }
  getVendorAttachment() {
    const obj = {
      data: this.id
    }
    this.accountsService.getVendorAttachment(obj).subscribe((success) => {
      this.vendorAttachments = success;
    })
  }
  async uploadVendorAttachmentFile(event: any) {

    this.vendorAttachments.referenceId = this.id;
    let attachmentList: any = [];
    attachmentList = event;
    for (let i = 0; i < attachmentList.length; i++) {
      if (attachmentList.length !== 0) {
        this.vendorAttachments.attachmentSize = attachmentList[i].fileSize;
        this.vendorAttachments.attachmentFileName = attachmentList[i].fileName;
        this.vendorAttachments.istringFileContent = attachmentList[i].content;
        this.vendorAttachments.attachmentType = attachmentList[i].fileType;
        let uploadDocument = await this.uploadDocument();
      }
    }
  }
  uploadDocument() {
    return new Promise((resolve: any) => {
      this.accountsService
        .uploadVendorAttachmentFile(this.vendorAttachments, this.options)
        .subscribe((success) => {
          this.tableAttachmentData = success.plstentActAttachments;
          this.dialog.closeDialog()
          // this.overlay.detachOverlay();
          resolve(true);
        });
    });
  }
  downloadVendorAttachment(val: any) {
    this.loadingTrue = true;
    const obj = {
      data: val.actAttachmentsId,
    };
    this.data
      .postPDFData('Purchase/VendorDownloadFile', obj, this.options)
      .subscribe((success) => {

        const resp = new Blob([success], { type: success.type });
        const fileUrl = URL.createObjectURL(resp);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileUrl;
        downloadLink.download = val.attachmentFileName;
        downloadLink.click();
      });
  }
  doSelectRegionLedger(val: any) {
    this.vendorRegion.ledgerId = val.actLedgerId;
    this.vendorRegion.ledgerName = val.ledgerName;

  }
  dialogClose() {
    this.dialog.closeDialog();
    this.data.showErrorMessage = false
  }
  onLedgerSelect(event: any) {
    this.vendorRegion.ledgerId = event.actLedgerId;
    this.vendorRegion.ledgerName = event.ledgerName;
  }
  openRegionStatus(id: any) {
    const obj = {
      id: id
    }
    this.accountsService.openVoucherRegionAccess(obj, this.options).subscribe((success) => {
      this.statusLst = success.plstentActVoucherRegionAccessHistory
    })
  }
  downloadAttachment(val: any, type: any) {
    const obj = {
      data: val.actAttachmentsId,
      data1: "ACT"
    }

    const options = {
      responseType: 'blob'
    }

    this.accountsService.loadAttachmentsByteArray(obj, options).subscribe((success: any) => {

      const resp = new Blob([success.body], { type: success.body.type });
      const fileURL = URL.createObjectURL(resp);
      if (type !== 'down') {

        if (success.body.type === 'application/pdf') {
          this.document.openPDFViewer(fileURL, 'trans');
        } else if (success.body.type.includes('image')) {
          this.document.imageView(fileURL, val.attachmentFileName, 'trans');
        } else {
          const downloadLink = document.createElement('a');
          downloadLink.href = fileURL;
          downloadLink.download = val.attachmentFileName;
          downloadLink.click();
        }
      } else {
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = val.attachmentFileName;
        downloadLink.click();
      }

    })
  }
  async deleteActAttachmentFile(element: any) {
    let msg = "Are You Sure, Want to Delete " + element.attachmentFileName;
    let response = await this.dialog.confirmDialog(msg);
    if (response) {
      const obj = {
        data: element.actAttachmentsId
      }
      this.accountsService.deleteActAttachmentFile(obj, this.accountsOptions).subscribe((success) => {
        this.tableAttachmentData = success.plstentActAttachments;
      })
    }
  }
  navigateToPurchase(){
    this.router.navigateByUrl('/home/corporate/purchase-menus')
  }
}
