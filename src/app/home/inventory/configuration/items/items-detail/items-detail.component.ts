import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppToolTipComponent, InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppAccessDirective } from '../../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { AppService } from '../../../../../app.service';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass, JsonPipe, SlicePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TabContainerModule } from '../../../../../app-core/app-template/tab-container/tab-container.module';
import { TabItemModule } from '../../../../../app-core/app-template/tab-item/tab-item.module';
import { FooterToggleDirective } from '../../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { ErrorMessageComponent } from '../../../../../app-core/message/error-message/error-message.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { AddressEditComponent } from '../../../../../app-core/template/address-edit/address-edit.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';
import { DocumentsComponent } from '../../../../../app-core/template/documents/documents.component';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { MultiPageUrlComponent } from '../../../../../app-core/template/multi-page-url/multi-page-url.component';
import { StatusHistoryComponent } from '../../../../../app-core/template/status-history/status-history.component';
import { CustomerServiceListComponent } from '../../../../crm/customer-service/customer-service-list/customer-service-list.component';
import { CustomerUpdateListComponent } from '../../../../crm/customer-update/customer-update-list/customer-update-list.component';
import { LeadListComponent } from '../../../../crm/lead/lead-list/lead-list.component';
import { MatRadioModule } from '@angular/material/radio';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entInvAttachments, entInvItem, entInvNotes } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { ViewPdfComponent } from '../../../../../app-core/template/view-pdf/view-pdf.component';
import { SearchDebitComponent } from '../../../../search/search-debit/search-debit.component';
import { FilterAndSortPipe } from '../../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { AccoutsStatusTableComponent } from '../../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { ErrorInfoComponent } from '../../../../../app-core/error-info/error-info.component';

@Component({
  selector: 'app-items-detail',
  standalone: true,
  imports: [CdkAccordionModule,
    NgClass,
    AccordionModule,
    JsonPipe,
    Row,
    ViewLabel,
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    MatRadioModule,
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
    AddressEditComponent,
    ErrorMessageComponent,
    AppAccessDirective,
    ButtonAccessDirective,
    SlicePipe,
    AppToolTipComponent,
    CheckboxComponent,
    TabContainerModule,
    TabItemModule,
    FooterToggleDirective,
    MatMenuModule,
    SearchDebitComponent,
    FilterAndSortPipe,
    DropZoneComponent,ErrorInfoComponent,
    AccoutsStatusTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './items-detail.component.html',
  styleUrl: './items-detail.component.scss'
})
export class ItemsDetailComponent {
  typeddl=[]
  subtypeddl=[]
  pageId = "ITMSC";
  id = 0;
  regionFromSearch: any = 'REGI1';
  item = new entInvItem();
  itemNotes = new entInvNotes();
  itemAttachements = new entInvAttachments();
  isOpen = false;
  selectedTab = 0;
  taxName: any = '';
  filterFileName = '';
  ddlItem: any = [];
  
  tableItemData = [{
    'sNo': '', 'pqNo': '', 'ledger': 'High Wheels', 'qty': 10.00, 'unit': 'Each', 'inr': '', 'value': 'INR', 'cyy': '232.22', 'unitPrice': 10.00, 'dis': 11.00, 'afterDis': 97.90, 'tax': 14.00
    , 'total': 111.61
  }];
  tableNoteData = [{
    'notes': 'Notes Created', 'createdBy': 'Chief Finance Officer', 'dateTime': '04 May 2020 | 11:55 PM'
  },
  ];
  purchaseCons=''
  salesCons=''
  tableAttachmentData = [
    {
      'fileName': 'Birth Certificate',
      'createdBy': 'Purchase Officer',
      'createdDate': '10-05-2024 15:49',
      'fileFormat': 'pdf',
      'size': '2.35mb'
    }
  ];
  errorTrue = false;
  quantity=0
  options = {
    type: 'accountsPath',
  };
  items: any = ['sNo', 'pqNo', 'ledger', 'qty', 'unitPrice', 'dis', 'afterDis', 'tax', 'total'];

  itemsName: any = [
    '#',
    'PQ No',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ];

  notes: any = ['notesDetail', 'createdFullName', 'createdDate', 'add'];
  notesName: any = ['Notes', 'Created By', 'Date  Time', ''];
  accordianOpen = true;
  accordianContent = true;
  attachment: any = ['sno', 'fileName', 'attachmentType', 'attachmentSize', 'action'];
  attachmentsName: any = ['', 'File Name', 'File Format', 'Size', ''];
  otherDetail = true
  poData: any = ['changeBy', 'changedDate', 'status'];
  poDataName: any = ['Changed By', '	Changed Date', '	Status'];
  maxquantity=0
  minquantity=0
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('notesDialog') notesDialog!: TemplateRef<any>;
  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;
  @ViewChild('l') lform!: NgForm;
  @ViewChild('a') aform!: NgForm;
  @ViewChild('n') nform!: NgForm;
  @ViewChild('DocumentsComponent', { static: false }) document!: DocumentsComponent;
  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword';
  fileType = 'jpg, jpeg, png, tiff, gif, tif ,pdf, xls, doc, pdf, DOCX, ppt, PPTX, sql, txt, csv'
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
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params.id;
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getitemInitialData', this.options);
    await this.initialData.getAcccountsDDL('getVoucherConfigInitialData', this.options);
    this.appService.setBreadCrumb(this.breadCrumb);
    if (this.id === 0) {
      this.createNewItemDetails(this.regionFromSearch);
    } else {
      this.getItemDetails(this.id);
    }
    this.ddlSetup();
  }

  createNewItemDetails(val: any) {
    const obj = {
      data: val
    }
    this.accountsService
      .createNewItemDetails(obj, this.options)
      .subscribe((success) => {
        this.item = success;
  
        this.quantity=Number(success.minQuantity);
        console.log(this.quantity,'quan');
        

        if(success.inventoryGoods==='N'){
          this.otherDetail=false
        }
        else{
          this.otherDetail=true;
        }
        // setTimeout(() => {
        //   this.initialLoad = false;
        // }, 400);
      });
  }

  getItemDetails(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .getItemDetails(obj, this.options)
      .subscribe((success) => {

        this.item = success;
   

        if(success.inventoryGoods==='N'){
          this.otherDetail=false
        }
        else{
          this.otherDetail=true;
        }
        this.ddlSetup();
        this.showTaxName(this.item.actTaxCodeValue);
        this.categoryChange(true);
        setTimeout(() => {
          this.typeChange(true);
        }, 100);
        // setTimeout(() => {
        //   this.initialLoad = false;
        // }, 400);
      });
  }
  MinMaxQuantity(){
    debugger
    setTimeout(() => {
      this.minquantity=Number(this.item.minQuantity)
    this.maxquantity=Number(this.item.maxQuantity)
    if(this.minquantity > this.maxquantity){
      this.data.errorInfoMessage('Max Quantity is Greater than Min Quantity')
    }
    }, 2000);
  }
  doSelectItemLedger(event: any) {
    this.item.ledgerId = event.actLedgerId;
    this.item.ledgerName = event.ledgerName;
   
  }

  doSelectItemCreditLedger(event: any) {
    this.item.creditLedgerId = event.actLedgerId;
    this.item.creditLedgerName = event.ledgerName;
  }

  // isLoading = true;

  ledgerClear(){
    debugger
    // this.isLoading = false;
    this.item.ledgerId=0;
    this.item.creditLedgerId=0;
    this.item.ledgerName = '';
  }

  categoryChange(event: any) {
    new Promise((resolve) => {
      if (event.value !== 0 && event.value !== undefined) {
        this.item.typeId = 0;
        this.item.subTypeId = 0;
        this.item.invCategoryId = event.value;
        this.initialData.DDLValues.GettypeValueByGroup = [];
        this.initialData.DDLValues.GetsubtypeBytype = [];
      }
      this.gettypeByGroupValue();

      resolve(true);
    });
  }

  typeChange(event: any) {
    new Promise((resolve) => {
      if (event.value !== 0 && event.value !== undefined) {
        this.item.subTypeId = 0;
        this.item.typeId = event.value;
        this.initialData.DDLValues.GetsubtypeBytype = [];
      }
      this.getsubtypeBytype();

      resolve(true);
    });
  }

  gettypeByGroupValue() {
    const obj = {
      data: this.item.invCategoryId,
    };
    this.accountsService
      .gettypeByGroupValue(obj, this.options)
      .subscribe((success) => {
        this.typeddl=success.data[0].value
        // setTimeout(() => {
        //   this.initialLoad = false;
        // }, 400);
      });
  }

  getsubtypeBytype() {
    const obj = {
      data: this.item.typeId,
    };
    this.accountsService
      .getsubtypeBytype(obj, this.options)
      .subscribe((success) => {
        this.subtypeddl=success.data[0].value
        // setTimeout(() => {
        //   this.initialLoad = false;
        // }, 400);
      });
  }
  showTaxName(val: any) {
    const index = this.initialData.DDLValues.ddlTaxCodes
      .map((e: any) => e.constant)
      .indexOf(val);
    if (index !== -1) {
      this.taxName = this.initialData.DDLValues.ddlTaxCodes[index].name;
    }
  }
  ddlSetup() {
    this.ddlItem = [];
    this.initialData.DDLValues.ItemBelongsList.forEach((element: any) => {
      if (this.item.inventoryGoods === 'Y') {
        this.ddlItem.push(element);
        console.log(element,'1');
       if(element.constant==='PURCE') {
        this.purchaseCons=element.constant
       }
       if(element.constant==='SALES') {
        this.salesCons=element.constant
       }
        
      }
      else {
        if (element.constant !== 'TRADE') {
          this.ddlItem.push(element);
          console.log(element,'2');

          
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  navigateToList() {
    this.router.navigateByUrl('/home/inventory/configuration/item/search');
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
    if (val === 1) {
      this.createNewItemNotes();
    }
  }
  notesClear() {
    this.errorTrue = false;
    this.createNewItemNotes();
  }

  //notes
  async createNewNotes() {
    this.createNewItemNotes();
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: '400px',
      width: '900px',
      maxWidth: '1170px',
    })
  }
  saveNotes() {

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
  radioClick(event: any) {
    this.ddlSetup();
    this.clearInput();
    if (event.value === 'Y') {
      this.otherDetail = true
    }
    if (event.value === 'N') {
      this.otherDetail = false
    }

  }
  clearInput() {
    this.item.ledgerName = '';
    this.item.creditLedgerName = '';
    this.item.ledgerId = 0;
    this.item.creditLedgerId = 0;
  }
  saveItemDetail() {
    if (this.lform.valid) {
      this.accountsService
        .saveItemDetail(this.item, this.options)
        .subscribe(async (success) => {
          this.item = success;
          const obj = {
            id: success.invItemId,
          };
          let urlJson = await this.url.encode(obj);
          this.router.navigateByUrl(
            '/home/inventory/configuration/item/detail/' + urlJson
          );
          // setTimeout(() => {
          //   this.initialLoad = false;
          // }, 400);
        });
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }
  doClear() {
    this.errorTrue = false;
    this.createNewItemDetails(this.regionFromSearch);
  }

  createNewItemNotes() {
    this.accountsService
      .createNewItemNotes(this.options)
      .subscribe((success) => {
        this.itemNotes = success;
        this.regionFromSearch = success.regionValue;
        // setTimeout(() => {
        //   this.initialLoad = false;
        // }, 400);
      });
  }
  saveItemInNotes() {
    this.itemNotes.referenceId = this.id;
    if (this.nform.valid) {
      if (this.lform.valid) {
        this.accountsService
          .saveItemInNotes(this.itemNotes, this.options)
          .subscribe((success) => {
            this.item.ilistitementInvNotes = success.ilistitementInvNotes;
            // setTimeout(() => {
            //   this.initialLoad = false;
            // }, 400);
            // this.overlayService.detachSearchBox();
            this.dialog.closeDialog();
          });
      } else {
        this.errorTrue = true;
        this.data.errorInfoMessage('Please fill all mandatory fields');
      }
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill in text');
    }
  }
  async uploadAttachemnt(event: any) {

    this.itemAttachements.referenceId = this.id;
    let attachmentList: any = [];
    attachmentList = event;
    for (let i = 0; i < attachmentList.length; i++) {
      if (attachmentList.length !== 0) {
        this.itemAttachements.attachmentSize = attachmentList[i].fileSize;
        this.itemAttachements.attachmentFileName = attachmentList[i].fileName;
        this.itemAttachements.istringFileContent = attachmentList[i].content;
        this.itemAttachements.attachmentType = attachmentList[i].fileType;
        let uploadDocument = await this.uploadDocument();
      }
    }
  }

  uploadDocument() {
    return new Promise((resolve: any) => {
      this.accountsService
        .uploadInvItemAttachmentFile(this.itemAttachements, this.options)
        .subscribe((success) => {

          this.item.ilistitementInvAttachments = success.plstentInvAttachments;
          // setTimeout(() => {
          //   this.initialLoad = false;
          // }, 400);
          // this.overlayService.detachSearchBox();
          this.dialog.closeDialog();
          resolve(true);
        });
    });
  }
  downloadDocumentImage(val: any) {
    // const obj = {
    //   data: val.actAttachmentsId,
    //   data1: "INV"
    // }
    // this.data.postPDFData('Finance/LoadAttachmentsByteArray', obj,this.accountsOptions).subscribe((success)=>{

    //   const resp = new Blob([success], { type: success.type});
    //   const fileURL = URL.createObjectURL(resp);
    //   const downloadLink = document.createElement('a');
    //   downloadLink.href = fileURL;
    //   downloadLink.download = val.attachmentFileName;
    //   downloadLink.click();
    // })

    const obj = {
      data: val.actAttachmentsId,
      data1: "INV"
    }

    const options = {
      responseType: 'blob'
    }

    this.accountsService.loadAttachmentsByteArray(obj, options).subscribe((success: any) => {
      const resp = new Blob([success.body], { type: success.body.type });
      const fileURL = URL.createObjectURL(resp);
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
    })
  }
  async deleteActAttachmentFile(element: any) {
    let msg = "Are You Sure, Want to Delete " + element.attachmentFileName;
    let response = await this.dialog.confirmDialog(msg);
    if (response) {
      const obj = {
        data: element.actAttachmentsId
      }
      this.accountsService.deleteSalAttachmentFile(obj, this.options).subscribe((success) => {
        // this.deleteDataList(success)
      })
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
  navigateToInventory(){
    this.router.navigateByUrl('/home/corporate/inventory-menus')

  }
}
