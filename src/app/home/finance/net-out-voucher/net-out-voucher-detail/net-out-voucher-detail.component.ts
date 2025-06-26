import { NetoutItemTableComponent } from './../../netout-item-table/netout-item-table.component';
import { NgClass } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import {
  Row,
  ViewLabel,
  InnerScroll,
  AppToolTipComponent,
} from '../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { DropZoneComponent } from '../../../../app-core/template/drop-zone/drop-zone.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { MatRadioModule } from '@angular/material/radio';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import {
  entActAttachments,
  entActNetoutVoucher,
  entActNotes,
  entActVoucherConfig,
} from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { ViewPdfComponent } from '../../../../app-core/template/view-pdf/view-pdf.component';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { ItemTableComponent } from '../../../../app-core/template/item-table/item-table.component';
import { ItemTbodyComponent } from '../../../../app-core/template/item-table/item-tbody/item-tbody.component';
import { SearchCustomerComponent } from '../../../search/search-customer/search-customer.component';
import { VendorSearchComponent } from '../../../purchase/voucher/vendor/vendor-search/vendor-search.component';
import { FilterAndSortPipe } from '../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { DocumentsComponent } from '../../../../app-core/template/documents/documents.component';
import { AppSafePipe } from '../../../../common/pipes/app-safe/app-safe.pipe';

@Component({
  selector: 'app-net-out-voucher-detail',
  standalone: true,
  imports: [
    NgClass,
    Row,
    ViewLabel,
    AppTableComponent,
    IconButtonComponent,
    InnerScroll,
    FormsModule,
    InputControlComponent,
    AppDatePipe,
    ErrorMessageComponent,
    AppAccessDirective,
    ButtonAccessDirective,
    AppToolTipComponent,
    FooterToggleDirective,
    MatMenuModule,
    DropZoneComponent,
    MatRadioModule,
    ViewPdfComponent,
    ItemTableComponent,
    ItemTbodyComponent,
    SearchCustomerComponent,
    VendorSearchComponent,
    FilterAndSortPipe,
    CellDefDirective,
    CellHeaderDefDirective,
    AppSafePipe,
    NetoutItemTableComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './net-out-voucher-detail.component.html',
  styleUrl: './net-out-voucher-detail.component.scss',
})
export class NetOutVoucherDetailComponent {
  accountsOptions = {
    type: 'accountsPath',
  };
  loadingTrue = false;
  moduleName: any = '';
  fileName: any = '';
  blob = {};

  fileUrl = '';

  errorTrue = false;
  selectedTab = 0;
  netOutVoucherId = 0;
  voucherConfigId = 0;
  regionValue = '';
  filterFileName = '';
  netOutVoucherOption = 'SALES';
  dateNotEffective = '';
  customerIdRAW = 0;
  voucherConfigIdN = 0;
  voucherId = 0;
  regionValueDDL = [];
  statusLst: any = [];
  totalCredit = 0;
  totalDebit = 0;
  totalDifference = 0;
  customerFlag = false;
  urlFileName = '';
  _totalAmount: any = 0;

  ilstentActNetoutVoucherDetailRAW: any = [];
  regionDetailValue: any = '';
  documentid: any = 0;

  @ViewChild('DocumentsComponent', { static: false })
  document!: DocumentsComponent;
  @ViewChild('netOutVoucherChild')
  netOutVoucherChild!: NetoutItemTableComponent;

  @ViewChild('l') lform!: NgForm;
  @ViewChild('a') aform!: NgForm;

  netOutVoucher = new entActNetoutVoucher();
  netOutVoucherforNotes = new entActNotes();
  netOutVoucherAttachment = new entActAttachments();
  voucherConfig = new entActVoucherConfig();
  @Output('getitems') getitems: EventEmitter<any> = new EventEmitter();
  @Output() datasetChange: EventEmitter<any> = new EventEmitter<any>
  _items: any = [];
  _voucher: string = '';
  _documentDateNow: any = '';
  parentDataStatus ='';
  totalRepCredit: any = 0;
  totalRepDebit: any = 0;
  tableNoteData = [
    {
      sNo: '',
      notes: 'Pending Submission',
      createdBy: 'Chief Finance Officer',
      dateTime: '10/07/2002 10:56 AM',
    },
    {
      sNo: '',
      notes: 'Pending Submission',
      createdBy: 'Chief Finance Officer',
      dateTime: '10/07/2002 10:56 AM',
    },
  ];

  tableAttachmentData = [
    // {
    //   sNo: '',
    //   fileName: 'image_2024_05_25T0_00_29Z',
    //   createdBy: 'Chief Finance Officer',
    //   date: '20/09/2022',
    //   time: '08:05 PM',
    //   fileFormat: 'img',
    //   size: '2.00kb',
    // },
    // {
    //   sNo: '',
    //   fileName: 'image_2024_05_25T0_00_29Z',
    //   createdBy: 'Chief Finance Officer',
    //   date: '19/09/2022',
    //   time: '08:05 PM',
    //   fileFormat: 'img',
    //   size: '3.00kb',
    // },
  ];

  tableItemData = [
    {
      docName: '',
      docNo: '',
      docCurrny: '',
      exRate: '1.00000000',
      repCurrny: '',
    },
    {
      docName: '',
      docNo: '',
      docCurrny: '',
      exRate: '1.00000000',
      repCurrny: '',
    },
  ];

  pageId = 'AJVSC';

  items: any = ['sno', 'docName', 'docNo', 'docCurrny', 'exRate', 'repCurrny'];
  itemsName: any = [
    '',
    'Document Name',
    'Document No',
    'Doc Currency',
    'Ex-Rate',
    'Rep-Currency',
  ];

  notes: any = ['sno', 'notes', 'createdBy', 'dateTime', 'add'];
  notesName: any = ['', 'Notes', 'Created By', 'Date | Time', ''];

  attachment: any = ['index', 'fileName', 'fileFormat', 'size', 'action'];
  attachmentsName: any = ['', 'File Name', 'File Format', 'Size', ''];

  id: any = 0;

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;

  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;

  fileType =
    'jpg, jpeg, png, tiff, gif, tif ,pdf, xls, doc, pdf, DOCX, ppt, PPTX, sql, txt, csv';

  accept =
    '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword, image/png, image/jpg, image/jpeg , image/webp, image/tiff, image/gif, image/tif, image/';

  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public url: UrlService,
    public router: Router,
    public appService: AppService,
    public appSetting: AppSettingsService
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params.data;
    this.voucherConfigId = params.data1;
    this.regionDetailValue = params.data2;
    this.appService.setBreadCrumb(this.breadCrumb);

    await this.data.checkToken();
    if (this.id === 0) {
      this.createNewnetOutVoucher(this.voucherConfigId, this.regionDetailValue);
    } else {
      this.openNetoutVoucher(this.id);
    }
    this.initialData.getAcccountsDDL('getNetoutVoucherInitialData');
  }

  createNewnetOutVoucher(voucherConfigId: any, regionValue: any) {
    const obj = {
      data: voucherConfigId,
      data1: regionValue,
    };
    this.accountsService
      .createNewNetoutVoucher(obj, this.accountsOptions)
      .subscribe((success) => {
        this.netOutVoucher = success;
        this.voucherId = success.actVoucherConfigId;
        this.customerIdRAW = success.pentActCustomerDetails.actCustomerId;
        this.dateNotEffective = success.documentDate;
        this.netOutVoucher.docCurrencyValue = success.strBaseCurrencyValue;
        this.netOutVoucher.netoutVoucherTypeValue = this.netOutVoucherOption;
        this.errorTrue = false;
      });
  }

  openNetoutVoucher(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .openNetoutVoucher(obj, this.accountsOptions)
      .subscribe((success) => {
        this.netOutVoucher = success;
        this.getVoucherDetail(
          this.netOutVoucher.actVoucherConfigId !== 0
            ? this.netOutVoucher.actVoucherConfigId
            : this.voucherConfigId
        );
        this.netOutVoucherOption = success.netoutVoucherTypeValue;
        this.customerIdRAW = success.pentActCustomerDetails.actCustomerId;
        this.dateNotEffective = success.documentDate;
        this.voucherId = success.actVoucherConfigId;
        this.statusLst = success.ilstentActNetoutVoucherStatusHistory;
        this.tableAttachmentData = success.plstentActAttachments;
      });
  }

  async savenetOutVoucher() {
   
    let netOutVoucherValid = await this.netOutVoucherChild.saveTable();
    if (this.lform.valid) {
      if (netOutVoucherValid) {
        this.accountsService
          .saveNetoutVoucher(this.netOutVoucher, this.accountsOptions)
          .subscribe(async (success) => {
            this.netOutVoucher = success;
            this.statusLst = success.ilstentActNetoutVoucherStatusHistory;
            const obj = {
              data: success.actNetoutVoucherId,
              data1: 0,
            };
            let urlJson = await this.url.encode(obj);
            this.router.navigateByUrl(
              '/home/finance/net-out-voucher/detail/' + urlJson
            );
            this.data.successMessage(success.msg.infoMessage.msgDescription);
          });
      }
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }

  doClear() {
    this.errorTrue = false;
    this.createNewnetOutVoucher(this.voucherConfigId, this.regionValue);
  }

  async openDialogNotes() {
    this.createNewNotesFornetOutVoucher();
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',
    });
  }

  createNewNotesFornetOutVoucher() {
    this.errorTrue = false;
    const obj = {
      data: this.voucherConfigId === 0 ? this.voucherId : this.voucherConfigId,
      data1: this.netOutVoucher.statusValue,
    };
    this.accountsService
      .createNewAccountsNotes(obj, this.accountsOptions)
      .subscribe((success) => {
        this.netOutVoucherforNotes = success;
        this.netOutVoucherforNotes.temporaryDocumentDate =
          this.netOutVoucher.documentDate;
        this.initialData.DDLValues.NoVoucherStatus = success.lddlData;
      });
  }

  async savenetOutVoucherNotes(n: any) {
    let netOutVoucherValid: any;
    // = await this.netOutVoucherChild.saveTable();
    if (this.lform.valid && n.valid) {
      if (netOutVoucherValid) {
        this.errorTrue = false;
        this.netOutVoucherforNotes.referenceId = this.netOutVoucherId;
        this.netOutVoucherforNotes.lddlData = [];
        this.netOutVoucher.ientActNotes = this.netOutVoucherforNotes;
        this.accountsService
          .saveNetoutVoucherNotes(this.netOutVoucher, this.accountsOptions)
          .subscribe((success) => {
            this.netOutVoucher = success;
            this.statusLst = success.ilstentActNetoutVoucherStatusHistory;
            // this.openLoadAllVoucherConfigId();
            if (success.msg.infoMessage.msgDescription) {
              this.data.successMessage(success.msg.infoMessage.msgDescription);
            }
            if (this.netOutVoucher.statusValue === 'APROV') {
              this.onSelectTab(3);
            }
            this.dialog.closeDialog();
          });
      }
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }

  doNotesClear() {
    this.createNewNotesFornetOutVoucher();
  }

  async createNewAttachment() {
    let dialogResponse: any = await this.dialog.openDialog(
      this.attachmentDialog,
      {
        disableClose: true,
        height: 'atuo',
        width: '100%',
        maxWidth: '1170px',
      }
    );
  }

  async uploadAttachemnt(event: any) {
   ;
    this.netOutVoucherAttachment.referenceId = this.id;
    let attachmentList: any = [];
    attachmentList = event;
    for (let i = 0; i < attachmentList.length; i++) {
      if (attachmentList.length !== 0) {
        this.netOutVoucherAttachment.attachmentSize =
          attachmentList[i].fileSize;
        this.netOutVoucherAttachment.attachmentFileName =
          attachmentList[i].fileName;
        this.netOutVoucherAttachment.istringFileContent =
          attachmentList[i].content;
        this.netOutVoucherAttachment.attachmentType =
          attachmentList[i].fileType;
        let uploadDocument = await this.uploadDocument();
      }
    }
  }

  uploadDocument() {
    return new Promise((resolve: any) => {
      this.accountsService
        .uploadNetoutVoucherAttachment(
          this.netOutVoucherAttachment,
          this.accountsOptions
        )
        .subscribe((success) => {
          this.tableAttachmentData = success.plstentActAttachments;
          this.dialog.closeDialog();
          resolve(true);
        });
    });
  }
  downloadDocumentImage() {
   ;
    this.loadingTrue = true;
    const obj = {
      data: this.documentid,
      data1: this.moduleName,
    };
    this.data
      .postPDFData(
        'Finance/LoadAttachmentsByteArray',
        obj,
        this.accountsOptions
      )
      .subscribe((success) => {
        const resp = new Blob([success], { type: success.type });
        const fileURL = URL.createObjectURL(resp);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = this.fileName;
        downloadLink.click();
      });
  }
  async deleteAttachment(val: any) {
    let msg = 'Are You Sure, Want to Delete this File';
    let response = await this.dialog.confirmDialog(msg);
    if (response) {
      const obj = {
        data: val.salAttachmentsId,
      };
      this.accountsService.deleteSalAttachmentFile(obj).subscribe((success) => {
        this.netOutVoucher.ilstActAttachments = success.plstentActAttachments;
      });
    }
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
      // this.imageView(url, element.ientFile.fileName);
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

  getVoucherDetail(element: any) {
    const obj = {
      data: element,
    };
    this.accountsService
      .getVoucherAccess(obj, this.accountsOptions)
      .subscribe((success) => {
        this.voucherConfigId = success.actVoucherConfigId;
        this.voucherConfig = success;
        this.regionValueDDL = success.plstentDDLClass;
      });
  }

  getAllItems(event: any) {
    setTimeout(() => {
      this.calculateAmount();
    }, 200);
  }

  validCheckbox(val: any) {
    // this.isZero = this.floatPipe.transform(val);
  }
  async calculateAmount() {
    this.totalCredit = 0;
    this.totalDebit = 0;
    this.totalRepDebit = 0;
    this.totalRepCredit = 0;
    this.totalDifference = 0;
    for (let i = 0; i < this._items.length; i++) {
      this.totalDebit =
        parseFloat(this._items[i].debitAmountDocCurrency) + this.totalDebit;
      this.totalCredit =
        parseFloat(this._items[i].creditAmountDocCurrency) + this.totalCredit;

      // reporting currency value calculate
      this._items[i].creditAmountRepCurrency = await this.reportCreditCurrency(
        this._items[i]
      );
      this._items[i].debitAmountRepCurrency = await this.reportDebitCurrency(
        this._items[i]
      );

      this.totalRepCredit = parseFloat(this._items[i].creditAmountRepCurrency) + this.totalRepCredit;
      this.totalRepDebit = parseFloat(this._items[i].debitAmountRepCurrency) + this.totalRepDebit;
    }
    this.totalDifference = this.totalDebit - this.totalCredit;
  }

  deleteItemsDetached(items: any) {
    this._items = items;
    this.calculateAmount();
    this.getitems.emit();
  }

  dataSetEmited(event: any){
    // this._netoutvoucher = event;
    this.datasetChange.emit(event);
    // this.dataset(event);
  }


  async reportCreditCurrency(item: any) {
    return new Promise((resolve) => {
     resolve(
       this.roundOff((parseFloat(item.creditAmountDocCurrency) * parseFloat(item.exchangeRate)))
       // parseFloat(item.creditAmountDocCurrency) * parseFloat(item.exchangeRate)
     );
   });
 }

 parentData(val:any){
  this.parentDataStatus = val;
}

 async reportDebitCurrency(item: any) {
   return new Promise((resolve) => {
     resolve(
       this.roundOff((parseFloat(item.debitAmountDocCurrency) * parseFloat(item.exchangeRate)))
       // parseFloat(item.debitAmountDocCurrency) * parseFloat(item.exchangeRate)
     );
   });
 }

 roundOff = (number: any) => {
  let precision = 2;
  let shift = (number: any, exponent: any) => {
    var numArray = ('' + number).split('e');
    return +(
      numArray[0] +
      'e' +
      (numArray[1] ? +numArray[1] + exponent : exponent)
    );
  };
  return shift(Math.round(shift(number, +precision)), -precision);
};

  async doSelectCustomer(event: any) {
    this.netOutVoucher.pentActCustomerDetails.customerName = event.customerName;
    this.netOutVoucher.partyId = event.actCustomerId;
    this.customerFlag = true;
    if (
      this.customerIdRAW !== 0 &&
      this.customerIdRAW !== this.netOutVoucher.partyId
    ) {
      let isCustomerChange = await this.dialog.confirmDialog(
        'Do you want to change customer, If you change customer then entire data will be clear'
      );
      if (isCustomerChange) {
        let currentDate: any = await this.appService.getCurrentDate();
        this.netOutVoucher.documentDate = currentDate;
        this.netOutVoucher.ilstentActNetoutVoucherDetail = [];
        this.netOutVoucher.partyId = event.actCustomerId;
      } else {
        this.netOutVoucher.partyId = this.customerIdRAW;
        event.actCustomerId = this.customerIdRAW;
      }
    }
    this.customerIdRAW = this.netOutVoucher.partyId;
    // this.openCustomer(event);
    this.loadAllVouchersByVoucherConfigAndId();
  }

  doSelectVendor(event: any) {
    this.netOutVoucher.pentActCustomerDetails.customerName = event.vendorName;
    this.netOutVoucher.partyId = event.actVendorId;
    this.loadAllVouchersByVoucherConfigAndId();
  }

  loadAllVouchersByVoucherConfigAndId() {
    this.ilstentActNetoutVoucherDetailRAW = [];
    this.accountsService
      .loadAllVouchersByVoucherConfigAndId(
        this.netOutVoucher,
        this.accountsOptions
      )
      .subscribe((success) => {
        this.netOutVoucher = success;
        if (this.netOutVoucher.netoutVoucherTypeValue === 'PUR') {
          this.netOutVoucher.docCurrencyValue =
            success.pentActVendor.currencyValue;
          this.netOutVoucher.docCurrencyDescription =
            success.pentActVendor.currencyDescription;
        } else {
          this.netOutVoucher.docCurrencyValue =
            success.pentActCustomerDetails.currencyCodeValue;
          this.netOutVoucher.docCurrencyDescription =
            success.pentActCustomerDetails.currencyCodeDescription;
        }
        let ientActNetoutVoucherDetail = JSON.parse(
          JSON.stringify(this.netOutVoucher.ientActNetoutVoucherDetail)
        );
        ientActNetoutVoucherDetail.actVoucherConfigId =
          this.netOutVoucher.ientAdvanceActVoucherConfig.actVoucherConfigId;
        if (this.netOutVoucher.partyId !== 0) {
          this.ilstentActNetoutVoucherDetailRAW.push(
            ientActNetoutVoucherDetail
          );
          this.netOutVoucher.ilstentActNetoutVoucherDetail =
            this.ilstentActNetoutVoucherDetailRAW;
        }
      });
  }
  async changeDetected(obj: any) {
    this._items[obj.index] = obj.item;
    setTimeout(() => {
      this.calculateAmount();
    }, 200);
    this.getitems.emit();
  }

  openLoadAllVoucherConfigId() {
    this.accountsService
      .loadAllVouchersByVoucherConfigAndId(
        this.netOutVoucher,
        this.accountsOptions
      )
      .subscribe((success) => {
        this.netOutVoucher = success;
      });
  }

  screenDisabled() {
    let screenDisabled = false;
    if (
      this.netOutVoucher.statusValue === 'APROV' ||
      this.netOutVoucher.statusValue === 'CANCL' ||
      this.netOutVoucher.statusValue === 'PENAP'
    ) {
      screenDisabled = true;
    } else {
      screenDisabled = false;
    }

    return screenDisabled;
  }

  async directApproved() {
    let netOutVoucherValid: any;
    // await this.netOutVoucherChild.saveTable();
    if (netOutVoucherValid) {
      this.netOutVoucher.ientActVoucherConfig.isDirectApproval === 'Y'
        ? (this.netOutVoucherforNotes.statusValue = 'APROV')
        : this.netOutVoucher.statusValue === 'PENAP'
        ? (this.netOutVoucherforNotes.statusValue = 'APROV')
        : (this.netOutVoucherforNotes.statusValue = 'PENAP');
      if (this.lform.valid) {
        if (this.netOutVoucher.ilstentActNetoutVoucherDetail.length !== 0) {
          this.netOutVoucherforNotes.referenceId = this.netOutVoucherId;
          this.netOutVoucherforNotes.lddlData = [];
          this.netOutVoucher.ientActNotes = this.netOutVoucherforNotes;
          this.accountsService
            .saveNetoutVoucherNotes(this.netOutVoucher, this.accountsOptions)
            .subscribe((success) => {
              this.netOutVoucher = success;
              this.statusLst = success.ilstentActNetoutVoucherStatusHistory;
              this.data.successMessage(success.msg.infoMessage.msgDescription);
              if (this.netOutVoucher.statusValue === 'APROV') {
                this.onSelectTab(3);
              }
            });
        } else {
          this.errorTrue = true;
          this.data.errorInfoMessage('Please add any items');
        }
      } else {
        this.errorTrue = true;
        this.data.errorInfoMessage('Please fill all mandatory fields');
      }
    }
  }

  hideBtnBasedonStatus() {
    let hideButton = false;
    if (
      this.netOutVoucher.statusValue === 'APROV' ||
      this.netOutVoucher.statusValue === 'CANCL' ||
      this.netOutVoucher.statusValue === 'PENAP'
    ) {
      hideButton = true;
    } else {
      hideButton = false;
    }

    return hideButton;
  }

  async changeReversal(valid: any) {
    if (this.netOutVoucherforNotes.temporaryDocumentDate !== '') {
      let isReversal = await this.dialog.confirmDialog(
        this.netOutVoucher.statusDescription
      );
      if (isReversal) {
        this.savenetOutVoucherNotes(valid);
      }
    }
  }

  async onSelectTab(val: any) {
    this.selectedTab = val;
    if (val === 3) {
      await this.viewNetOutVoucherReceipt();
    }
  }

  async doTypeChange(event: any) {
    let alert = await this.dialog.confirmDialog(
      'Changing this option will clear all the value enetered. Are you sure?'
    );
    if (alert) {
      this.netOutVoucherOption = event.value;
      this.createNewnetOutVoucher(this.voucherConfigId, this.regionValue);
    } else {
      this.netOutVoucherOption = this.netOutVoucher.netoutVoucherTypeValue;
    }
  }

  loadVoucherDetailForSales() {
    this.accountsService
      .loadVoucherDetailForSales(this.netOutVoucher, this.accountsOptions)
      .subscribe((success) => {
        this.netOutVoucher.ilstentActNetoutVoucherDetail.push(
          JSON.parse(JSON.stringify(success))
        );
        this.LoadVoucherDetailsForNetoutVoucher(
          this.netOutVoucher.netoutVoucherTypeValue
        );
      });
  }

  loadVoucherDetailForPurchase() {
    this.accountsService
      .loadVoucherDetailForPurchase(this.netOutVoucher, this.accountsOptions)
      .subscribe((success) => {
        this.netOutVoucher.ilstentActNetoutVoucherDetail.push(
          JSON.parse(JSON.stringify(success))
        );
        this.LoadVoucherDetailsForNetoutVoucher(
          this.netOutVoucher.netoutVoucherTypeValue
        );
      });
  }

  LoadVoucherDetailsForNetoutVoucher(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .loadVoucherDetailsForNetoutVoucher(obj, this.accountsOptions)
      .subscribe((success) => {
        this.initialData.DDLValues.DDLVouchers = success.data[0].value;
      });
  }

  async navigateDetail(l: any) {
    if (l.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: this.regionValue,
        };
        let urlJson = await this.url.encode(obj);
        this.router.navigateByUrl(
          '/home/finance/net-out-voucher/detail/' + urlJson
        );
      } else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    } else {
      this.errorTrue = true;
    }
  }
  downloadAttachment(val: any, type: any) {
    const obj = {
      data: val.actAttachmentsId,
      data1: 'ACT',
    };

    const options = {
      responseType: 'blob',
    };

    this.accountsService
      .loadAttachmentsByteArray(obj, options)
      .subscribe((success: any) => {
        const resp = new Blob([success.body], { type: success.body.type });
        const fileURL = URL.createObjectURL(resp);
        console.log(fileURL);

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
      });
  }
  async deleteActAttachmentFile(element: any) {
    let msg = 'Are You Sure, Want to Delete ' + element.attachmentFileName;
    let response = await this.dialog.confirmDialog(msg);
    if (response) {
      const obj = {
        data: element.actAttachmentsId,
      };
      this.accountsService
        .deleteActAttachmentFile(obj, this.accountsOptions)
        .subscribe((success) => {
          this.tableAttachmentData = success.plstentActAttachments;
        });
    }
  }
  viewNetOutVoucherReceipt() {
    this.urlFileName = '';
    this.loadingTrue = true;
    if (this.id !== 0) {
      this.loadingTrue = true;
      const obj = {
        data: this.id,
        data1: this.netOutVoucher.ientActVoucherConfig.pdfOtherComments,
      };
      this.data
        .postPDFData2(
          'accounts/ViewNetOutVoucherReceipt',
          obj,
          this.accountsOptions
        )
        .subscribe((success: any) => {
          let contentDisposition = success.headers.get('content-disposition');
          let filename = contentDisposition
            .split(';')[1]
            .split('filename')[1]
            .split('=')[1]
            .trim();
          // this.blob = success.body;
          const resp = new Blob([success.body], { type: 'application/pdf' });
          this.blob = resp;
          const fileURL = URL.createObjectURL(resp);
          this.urlFileName = filename;
          this.urlFileName = fileURL;
          this.loadingTrue = false;
        });
    }
  }
  saveTable() {
    return new Promise(async (resolve) => {
      let formValidation = false;
      if (this.lform.valid) {
        if (await this.calculateError()) {
          formValidation = this.lform.valid;
        }
      } else {
        this.errorTrue = true;
      }

      resolve(formValidation);
    });
  }
  calculateError() {
    let isError = false;
    return new Promise((resolve) => {
      if (this.totalDifference === 0) {
        isError = true;
        this._totalAmount = parseFloat(this._totalAmount);
        if (this.totalDebit === this._totalAmount) {
          isError = true;
        } else {
          isError = false;
          this.data.errorInfoMessage(
            'Total Netout Value not equal to sum of debit and credit'
          );
        }
      } else {
        isError = false;
        this.data.errorInfoMessage('Total sum of debit and credit not equal');
      }

      resolve(isError);
    });
  }
  async createNewNetoutVoucherDetail() {
    if (parseFloat(this.netOutVoucher.totalNetoutValue) === 0) {
      let alert = await this.dialog.notificationDialog(
        'Enter Total Net Value to Add Items'
      );
      if (alert) {
        return;
      }
    }

    if (this.netOutVoucher.partyId === 0) {
      let alert = await this.dialog.notificationDialog('Select Customer to Add Items');
      if (alert) {
        return;
      }
    }

    this.accountsService.createNewNetoutVoucherDetail()
      .subscribe((success) => {
        this._items.push(JSON.parse(JSON.stringify(success)));
        this.calculateAmount();
      });
  }

  navigateToList() {
    this.router.navigateByUrl('/home/finance/net-out-voucher/search');
  }

  dialogClose() {
    this.dialog.closeAll();
  }
  navigateToAccount(){
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
}
