import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass, JsonPipe, SlicePipe } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  ViewChild,
  signal,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TabContainerModule } from '../../../../../app-core/app-template/tab-container/tab-container.module';
import { TabItemModule } from '../../../../../app-core/app-template/tab-item/tab-item.module';
import {
  Row,
  ViewLabel,
  InnerScroll,
  AppToolTipComponent,
} from '../../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../../app-core/message/error-message/error-message.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { AddressEditComponent } from '../../../../../app-core/template/address-edit/address-edit.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';
import { DocumentsComponent } from '../../../../../app-core/template/documents/documents.component';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { MultiPageUrlComponent } from '../../../../../app-core/template/multi-page-url/multi-page-url.component';
import { StatusHistoryComponent } from '../../../../../app-core/template/status-history/status-history.component';
import { AppAccessDirective } from '../../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { CustomerServiceListComponent } from '../../../../crm/customer-service/customer-service-list/customer-service-list.component';
import { CustomerUpdateListComponent } from '../../../../crm/customer-update/customer-update-list/customer-update-list.component';
import { LeadListComponent } from '../../../../crm/lead/lead-list/lead-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AppService } from '../../../../../app.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import {
  entActVendor,
  entActVoucherConfig,
  entCheckLineItemBasedonDocumentDate,
  entGetMailInfo,
  entPurAdvancePaymentNote,
  entPurAttachments,
  entPurNotes,
} from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { SearchVendorComponent } from '../../../../search/search-vendor/search-vendor.component';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { SearchDebitComponent } from '../../../../search/search-debit/search-debit.component';
import { autoSearchItems } from '../../purchase-invoice/purchase-invoice-detail/purchase-invoice-detail.component';
import { GetDatePipe } from '../../../../../common/pipes/app-get-date/get-date.pipe';
import { PaymentNotePreviewComponent } from '../../payment-note/payment-note-detail/payment-note-preview/payment-note-preview.component';
import { SplicePipe } from '../../../../../common/pipes/app-splice/splice.pipe';
import { AdvancePaymentNoteNotesComponent } from './advance-payment-note-notes/advance-payment-note-notes.component';
import { AdvancePaymentNoteAttachmentComponent } from './advance-payment-note-attachment/advance-payment-note-attachment.component';
import { AdvancePaymentNotePreviewComponent } from './advance-payment-note-preview/advance-payment-note-preview.component';
import { AutoGetItemComponent } from '../../../../search/auto-get-item/auto-get-item.component';
import { DialogAnimateService } from '../../../../../common/services/dialog-animated/dialog-animate.service';
import { AppSafePipe } from '../../../../../common/pipes/app-safe/app-safe.pipe';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';

@Component({
  selector: 'app-advance-payment-note-detail',
  standalone: true,
  imports: [
    NgClass,
    Row,
    ViewLabel,
    AppTableComponent,
    IconButtonComponent,
    InnerScroll,
    DropZoneComponent,
    FormsModule,
    InputControlComponent,
    AppDatePipe,
    DocumentsComponent,
    ErrorMessageComponent,
    AppAccessDirective,
    ButtonAccessDirective,
    SlicePipe,
    AppToolTipComponent,
    CheckboxComponent,
    TabItemModule,
    FooterToggleDirective,
    MatMenuModule,
    SearchVendorComponent,
    SearchDebitComponent,

    AdvancePaymentNoteNotesComponent,
    AdvancePaymentNoteAttachmentComponent,
    AdvancePaymentNotePreviewComponent,
    AutoGetItemComponent,
    AppSafePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [GetDatePipe, SplicePipe],
  templateUrl: './advance-payment-note-detail.component.html',
  styleUrl: './advance-payment-note-detail.component.scss',
})
export class AdvancePaymentNoteDetailComponent {
  // color = 'green';
  @ViewChild('mailTemplate', { static: false })
  mailTemplate!: TemplateRef<any>;
  blob = {};
  urlFileName = '';
  id: any = 0;
  vendorIdRAW = 0;
  voucherId: any = 0;
  dateNotEffective = '';
  voucherConfigId: any = 0;
  regionDetailValue: any = '';
  advancePaymentNote = new entPurAdvancePaymentNote();
  advancePaymentNoteNotes = new entPurNotes();
  advancePaymentNoteAttachments = new entPurAttachments();
  vendor = new entActVendor();
  checkDocumentDate: any = new entCheckLineItemBasedonDocumentDate();
  autoSearchItems = new autoSearchItems();
  isOpen = false;
  branchName=''
  __hideBtn = signal(true);
  clearVoucherNo = false;
  bankName: any;
  selectedTab = 0;
  branchBankName: any;
  branchBankAccountNo: any;
  statusddl = [];
  attachment: any = [
    'attachmentFileName',
    'attachementType',
    'attachmentSize',
    'add',
  ];
  attachmentsName: any = ['', 'File Format', 'Size', 'add'];
  tableNoteData = [];
  tableAttachmentData = [];
  errorTrue = false;
  pageId = 'AJVSC';
  voucherid: any = '';
  purchaseOrderId: any = 0;
  internalUpdateSequence = 0;
  initialRegionValue: any = '';
  voucherConfig = new entActVoucherConfig();
  ilistbusPurAdvancePaymentNoteDetailRAW: any = [];
  regionValueDDL: any = [];

  fileUrl = '';

    attachmentList: any = [];

  mailInfo = new entGetMailInfo();
  accountsOptions = {
    type: 'accountsPath',
  };
  items: any = [
    'sNo',
    'pqNo',
    'poAmt',
    'advancePaid',
    'balanceAmt',
    'totalAmt',
    'delete',
  ];
  itemsName: any = [
    '#',
    'PO No',
    'PO Amount',
    'Advance Paid	',
    'Balance Amount To Be Paid',
    '',
    'Delete',
  ];
  tableItemData = [
    {
      sNo: '',
      pqNo: '',
      ledger: 'High Wheels',
      qty: 10.0,
      unit: 'Each',
      inr: '',
      value: 'INR',
      cyy: '232.22',
      unitPrice: 10.0,
      dis: 11.0,
      afterDis: 97.9,
      tax: 14.0,
      total: 111.61,
      nameDes: 'WH-HW-MG-0001',
    },
  ];

  notes: any = ['notes', 'add'];
  notesName: any = ['Notes', ''];

  accordianOpen = true;
  accordianContent = true;
  vendorFlag = false;
  bankAccountNo: any;
  loadingTrue = false;

  __isDisabled = signal(true);
  fileLink = '';

  @ViewChild('l') lform!: NgForm;
  @ViewChild('a') aform!: NgForm;
  @ViewChild('b') bform!: NgForm;
  @ViewChild('c') cform!: NgForm;
  @ViewChild('d') dform!: NgForm;

  poData: any = ['changeBy', 'changedDate', 'status'];
  poDataName: any = ['Changed By', '	Changed Date', '	Status'];
  base64String: any = '';

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('notesDialog') notesDialog!: TemplateRef<any>;
  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;
  @Input() public emailId: any = '';
  @Input() public refNumber: any = '';
  @Input() public documentDate: any = '';
  @Input() public netAmount: any = '';
  @Input() public voucherName: any = '';
  @Input() public pdfContent = 'Attachment of : ';
  @Input() public fullContent = '';
  @Input() public editEmail = false;
  fullSubject: any = '';
  downContent: any = '';

  options = {
    type: 'accountsPath',
  };
  accept =
    '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword';
  element: any;
  $index: any;
  accountsoptions = {
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
    public appService: AppService,
    public accountsService: AccountsApiService,
    public appSetting: AppSettingsService,
    public splicePipe: SplicePipe,
    public storage: AppStorageService,

    public dialogService : DialogAnimateService,


  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  async init() {
    await this.data.checkToken();
    this.appService.setBreadCrumb(this.breadCrumb);
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);

    this.id = params.data;
    this.voucherConfigId = params.data1;
    this.regionDetailValue = params.data2;

    await this.initialData.getAcccountsDDL('getAdvancePaymentNotesInitialData');
    await this.getListofBankBasedonBranch();
    await this.storage.get('branchFinance').then((val) => {
      this.branchName = val;
    });
    if (this.id > 0) {
      this.openAdvancePaymentNotes(this.id);
    } else {
      this.createNewAdvancePaymentNotes(
        this.voucherConfigId,
        this.regionDetailValue
      );
    }
  }

  createNewAdvancePaymentNotes(val: any, val1: any) {
    const obj = {
      data: val,
      data1: val1,
    };
    this.accountsService
      .createNewAdvancePaymentNotes(obj)
      .subscribe((success) => {
        this.advancePaymentNote = success;
        this.screenDisabled();
        this.vendorIdRAW = 0;
        this.voucherId = success.actVoucherConfigId;
        this.dateNotEffective = success.documentDate;

        this.errorTrue = false;
      });
  }

  openAdvancePaymentNotes(id?: any) {
    this.errorTrue = false;
    const obj = {
      data: this.id,
    };
    this.accountsService
      .openAdvancePaymentNotes(obj)
      .subscribe((success: any) => {
        this.advancePaymentNote = success;
        this.screenDisabled();
        this.tableAttachmentData = success.ilistbusPurAttachments;
        if (success.msg.infoMessage) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        }
      });
  }

  saveAdvancePaymentNotes(l:any) {
    debugger;
    console.log(l);
    if(!l.valid) {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
      return;
    }


      this.errorTrue = false;
      if (this.advancePaymentNote.ilistbusPurAdvancePaymentNoteDetail.length !== 0) {
        this.errorTrue = false;
        this.accountsService
          .saveAdvancePaymentNotes(this.advancePaymentNote, this.options)
          .subscribe(async (success) => {
            this.advancePaymentNote = success;
            this.screenDisabled()
            this.clearDisplayText();
            // this.statusSource =
            //   success.ilistbusPurAdvancePaymentNoteStatusHistory
            // );
            const obj = {
              data: success.purAdvancePaymentNoteId,
              data1: 0,
            };
            let urlJson = await this.url.encode(obj);
            this.router.navigateByUrl(
              '/home/purchase/advance-payment-note/detail/' + urlJson
            );
            if (success.msg.infoMessage.msgDescription) {
              this.data.successMessage(success.msg.infoMessage.msgDescription);
            }
          });
      }
       else {
        this.onSelectTab(1);
        this.errorTrue = true;
        this.data.errorInfoMessage('Please add any items');
      }

  }

  doGetItemSelect(event: any) {
    this.purchaseOrderId = event.id;
    this.autoSearchItems.autoSearchItemId = event.id;
    this.autoSearchItems.autoSearchText = event.name;
  }

  screenDisabled() {
    this.__isDisabled.set(
      this.advancePaymentNote.statusValue === 'APROV' ||
      this.advancePaymentNote.statusValue === 'CANCL' ||
      this.advancePaymentNote.statusValue === 'PENAP'
    );
  }

  async doVendorSelect(event: any) {
    this.advancePaymentNote.vendorLedgerId = event.actVendorId;
    this.advancePaymentNote.pentActVendor.vendorName = event.vendorName;
    this.advancePaymentNote.pentActVendor.vendorCode = event.vendorCode;
    this.advancePaymentNote.pentActVendor.vendorLegacyCode = event.vendorCode;
    this.advancePaymentNote.actVendorBankDetailId = 0;
    this.vendorFlag = true;
    if (
      this.vendorIdRAW !== 0 &&
      this.vendorIdRAW !== this.advancePaymentNote.actVendorId
    ) {
      let isCustomerChange = await this.dialog.confirmDialog(
        'Do you want to change vendor, If you change customer then entire data will be clear'
      );
      if (isCustomerChange) {
        let currentDate: any = await this.appService.getCurrentDate();
        this.advancePaymentNote.documentDate = currentDate;
        this.advancePaymentNote.ilistbusPurAdvancePaymentNoteDetail = [];
        this.advancePaymentNote.modeValue = '';
        this.bankName = '';
        this.branchBankName = '';
        this.branchBankAccountNo = '';
        this.bankAccountNo = '';
        this.advancePaymentNote.chequeNumber = '';
        this.advancePaymentNote.chequeDate = '';
        this.advancePaymentNote.actCompanyBranchBankDetailId = 0;
        this.advancePaymentNote.cashbookLedgerId = 0;
        this.advancePaymentNote.ibusActLedger.ledgerName = '';
        this.advancePaymentNote.actVendorBankDetailId = 0;
        this.advancePaymentNote.actVendorId = event.actVendorId;
        this.advancePaymentNote.vendorLedgerId = event.actVendorId;
      } else {
        this.advancePaymentNote.actVendorId = this.vendorIdRAW;
        event.actVendorId = this.vendorIdRAW;
      }
    }
    this.vendorIdRAW = this.advancePaymentNote.actVendorId;
    this.getVendorAllDetails(event);
  }

  getVendorAllDetails(val: any) {
    this.vendor.actVendorId = val.actVendorId;
    this.vendor.vendorName = val.vendorName;

    let obj = {
      data: val.actVendorId,
      data1: this.advancePaymentNote.regionValue,
    };
    this.accountsService
      .getVendorForSearch(obj, this.options)
      .subscribe((success) => {
        this.advancePaymentNote.pentActVendor = success;
        this.advancePaymentNote.docCurreny = success.currencyValue;
        this.advancePaymentNote.actVendorId = success.actVendorId;
        this.advancePaymentNote.vendorLedgerId =
          success.ientActLedger.actLedgerId;
        this.advancePaymentNote.iVendorActLedger = success.ientActLedger;
        this.initialData.DDLValues.DDLVendorBank = success.lstVendorBankDetails;

        if (success.lstVendorBankDetails.length !== 0) {
          this.advancePaymentNote.actVendorBankDetailId =
            success.lstVendorBankDetails[0].actVendorBankDetailId;
        }

        this.getBankNameBasedOnBankId();

        if (this.advancePaymentNote.currencyValue === success.currencyValue) {
          this.advancePaymentNote.currencyRate = '1';
        }

        if (this.vendorFlag) {
          this.documentDateConversioDate();
        }

        this.vendorFlag = false;
      });
  }

  getBankNameBasedOnBankId() {
    const val = this.advancePaymentNote.actVendorBankDetailId;
    const { DDLVendorBank } = this.initialData.DDLValues;
    this.bankName = '';
    if (!DDLVendorBank || DDLVendorBank.length === 0) {
      return;
    }
    const bankDetail = DDLVendorBank.find(
      (bank: any) => bank.actVendorBankDetailId === val
    );
    if (bankDetail) {
      this.bankName = bankDetail.bankName;
      this.bankAccountNo = bankDetail.bankAccountNo;
    }
  }

  documentDateConversioDate() {
    if (
      this.advancePaymentNote.documentDate !== '' &&
      this.advancePaymentNote.pentActVendor.currencyValue !== ''
    ) {
      if (
        this.advancePaymentNote.statusValue === 'INPRO' ||
        this.advancePaymentNote.statusValue === 'PENAP'
      ) {
        this.checkDocumentDatelist();
        this.accountsService.documentDateConversioDate(this.checkDocumentDate, this.options)
          .subscribe(
            (success) => {
              this.dateNotEffective = this.advancePaymentNote.documentDate;
              if (
                this.advancePaymentNote.currencyValue ===
                this.advancePaymentNote.pentActVendor.currencyValue
              ) {
                this.advancePaymentNote.currencyRate = '1.00000000';
              } else {
                this.advancePaymentNote.currencyRate = success.conversionRate;
              }
            },
            (e) => {
              this.advancePaymentNote.documentDate = this.dateNotEffective;
            }
          );
      }
    }
  }


  getListofBankBasedonBranch(): Promise<boolean> {
    return new Promise((resolve) => {
      this.accountsService
        .getListofBankBasedonBranch(this.options)
        .subscribe((success: any) => {
          this.initialData.DDLValues.DDLBankBranch =
            success.lstentActCompanyBranchBankDetail;
          resolve(true);
        });
    });
  }

  saveNotesForAdvancePaymentNote() {
    this.advancePaymentNoteNotes.lstDDLClass = [];
    this.advancePaymentNoteNotes.referenceId = this.id;
    this.advancePaymentNote.pentPurNotes = this.advancePaymentNoteNotes;
    this.accountsService
      .saveNotesForAdvancePaymentNote(this.advancePaymentNote)

      .subscribe((success) => {
        this.advancePaymentNote = success;
        this.screenDisabled()
        this.tableNoteData = success.ilistbusPurAdvancePaymentNoteStatusHistory;
      });
  }

  async onVendorSelect(event: any) {
    let vendorId = 0;
    if (vendorId > 0) {
      let response = await this.dialog.confirmDialog(
        'Do you want to change vendor, If you change customer then entire data will be clear'
      );
      if (response) {
        vendorId = event.actVendorId;
        this.advancePaymentNote.pentActVendor.vendorName = event.vendorName;
        let currentDate: any = await this.appService.getCurrentDate();
        this.advancePaymentNote.documentDate = currentDate;
        // this.purchaseQuotation.plistentPurQuotationItem = [];
      }
    } else {
      vendorId = event.actVendorId;
      // this.getVendorAllDetails(event, true);
    }
  }

  getVoucherDetail(element: any) {
    const obj = {
      data: element,
    };
    this.accountsService.getVoucherAccess(obj).subscribe((success) => {
      this.voucherConfigId = success.actVoucherConfigId;
      this.voucherConfig = success;
      this.regionValueDDL = success.plstentDDLClass;
    });
  }

  // async doVendorSelect(event: any) {

  //   this.advancePaymentNote.vendorLedgerId = event.actVendorId;
  //   this.advancePaymentNote.pentActVendor.vendorName = event.vendorName;
  //   this.advancePaymentNote.pentActVendor.vendorCode = event.vendorCode;
  //   this.advancePaymentNote.pentActVendor.vendorLegacyCode = event.vendorCode;
  //   this.advancePaymentNote.actVendorBankDetailId = 0;
  //   this.vendorFlag = true;
  //   if (
  //     this.vendorIdRAW !== 0 &&
  //     this.vendorIdRAW !== this.advancePaymentNote.actVendorId
  //   ) {
  //     let isCustomerChange = await this.alert.partyAlert(
  //       'Do you want to change vendor, If you change customer then entire data will be clear'
  //     );
  //     if (isCustomerChange) {
  //       let currentDate: any = await this.appService.getCurrentDate();
  //       this.advancePaymentNote.documentDate = currentDate;
  //       this.advancePaymentNote.ilistbusPurAdvancePaymentNoteDetail = [];
  //       this.advancePaymentNote.modeValue = '';
  //       this.bankName = '';
  //       this.branchBankName = '';
  //       this.branchBankAccountNo = '';
  //       this.bankAccountNo = '';
  //       this.advancePaymentNote.chequeNumber = '';
  //       this.advancePaymentNote.chequeDate = '';
  //       this.advancePaymentNote.actCompanyBranchBankDetailId = 0;
  //       this.advancePaymentNote.cashbookLedgerId = 0;
  //       this.advancePaymentNote.ibusActLedger.ledgerName = '';
  //       this.advancePaymentNote.actVendorBankDetailId = 0;
  //       this.advancePaymentNote.actVendorId = event.actVendorId;
  //       this.advancePaymentNote.vendorLedgerId = event.actVendorId;
  //       setTimeout(() => {
  //         this.totalService.setValue(true);
  //       }, 300);
  //     } else {
  //       this.advancePaymentNote.actVendorId = this.vendorIdRAW;
  //       event.actVendorId = this.vendorIdRAW;
  //     }
  //   }
  //   this.vendorIdRAW = this.advancePaymentNote.actVendorId;
  //   this.getVendorAllDetails(event);
  // }

  checkDocumentDatelist() {
    const validItems =
      this.advancePaymentNote.ilistbusPurAdvancePaymentNoteDetail.filter(
        (item: any) => item.purPurchaseOrderId !== 0
      );
    const voucherIds = validItems
      .map((item: any) => item.purPurchaseOrderId)
      .join(',');

    this.voucherid = voucherIds;

    this.checkDocumentDate.documentDate = this.advancePaymentNote.documentDate;
    this.checkDocumentDate.voucherType =
      this.advancePaymentNote.ibusActVoucherConfig.voucherTypeValue;
    this.checkDocumentDate.voucherIds = this.voucherid;
    this.checkDocumentDate.targetCurrencyValue =
      this.advancePaymentNote.pentActVendor.currencyValue;
  }

  bankBranchAc(val: any) {
    if (this.initialData.DDLValues.DDLBankBranch.length !== 0) {
      for (
        let i = 0;
        i < this.initialData.DDLValues.DDLBankBranch.length;
        i++
      ) {
        if (
          this.initialData.DDLValues.DDLBankBranch[i]
            .actCompanyBranchBankDetailId === val
        ) {
          this.advancePaymentNote.ibusActCompanyBranchBankDetail =
            this.initialData.DDLValues.DDLBankBranch[i];
          this.branchBankName =
            this.initialData.DDLValues.DDLBankBranch[i].bankName;
          this.branchBankAccountNo =
            this.initialData.DDLValues.DDLBankBranch[i].bankAccountNo;
        }
      }
    }
  }

  doSelectCashbookLedger(val: any) {
    this.advancePaymentNote.cashbookLedgerId = val.actLedgerId;
    this.advancePaymentNote.ibusActLedger.ledgerName = val.ledgerName;
  }

  gainLossForPointZeroOneDifference(val: any, items: any, index: any) {
    if (
      this.advancePaymentNote.currencyValue !==
      this.advancePaymentNote.ilistbusPurAdvancePaymentNoteDetail.currencyValue
    ) {
      const obj = {
        longData1: items.purPurchaseInvoiceId,
        longData2: this.advancePaymentNote.actVoucherConfigId,
        stringData1: this.advancePaymentNote.currencyRate,
        stringData2: val,
      };
      this.accountsService
        .getGainLossForPointZeroOneDifference(obj)
        .subscribe((success) => {
          this.advancePaymentNote.ilistbusPurAdvancePaymentNoteDetail[
            index
          ].gain = success.data;
          this.advancePaymentNote.ilistbusPurAdvancePaymentNoteDetail[
            index
          ].loss = success.data1;
        });
    }
  }

  onLedgerSelect(event: any) {
    this.advancePaymentNote.cashbookLedgerId = event.actLedgerId;
    this.advancePaymentNote.ibusActLedger.ledgerName = event.ledgerName;
  }

  async itemsDelete(val: any, index: any) {
    let msg = 'Are You Sure, You Want to Delete this Item?';
    let response = await this.dialog.confirmDialog(msg);
    if (response) {
      if (val.purAdvancePaymentNoteDetailId !== 0) {
        this.deleteAdvancePaymentNoteItem(
          val.purAdvancePaymentNoteDetailId,
          index
        );
      } else {
        // this.purchaseQuotation.plistentPurQuotationItem.splice(index, 1);
        this.advancePaymentNote.ilistbusPurAdvancePaymentNoteDetail.splice(
          index,
          1
        );
        this.ilistbusPurAdvancePaymentNoteDetailRAW.splice(index, 1);
        this.data.successMessage('Item Removed Successfully');
      }
    }
  }

  deleteAdvancePaymentNoteItem(val: any, index: any) {
    this.advancePaymentNote.ilistbusPurAdvancePaymentNoteDetail[
      index
    ].strDeleteFlag = 'Y';
    this.accountsService
      .deleteAdvancePaymentNoteItem(this.advancePaymentNote)
      .subscribe((sucess) => {
        this.advancePaymentNote = sucess;
        this.ilistbusPurAdvancePaymentNoteDetailRAW.splice(index, 1);
      });
  }

  async navigateDetail(z: any) {
    if (z.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: this.initialRegionValue,
        };
        let urlJson = await this.url.encode(obj);
        this.router.navigateByUrl(
          '/home/purchase/advance-payment-note/detail/' + urlJson
        );
      } else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    } else {
      this.errorTrue = true;
    }
  }

  // async doVendorSelect(event: any) {

  //   this.advancePaymentNote.vendorLedgerId = event.actVendorId;
  //   this.advancePaymentNote.pentActVendor.vendorName = event.vendorName;
  //   this.advancePaymentNote.pentActVendor.vendorCode = event.vendorCode;
  //   this.advancePaymentNote.pentActVendor.vendorLegacyCode = event.vendorCode;
  //   this.advancePaymentNote.actVendorBankDetailId = 0;
  //   this.vendorFlag = true;
  //   if (
  //     this.vendorIdRAW !== 0 &&
  //     this.vendorIdRAW !== this.advancePaymentNote.actVendorId
  //   ) {
  //     let isCustomerChange = await this.alert.partyAlert(
  //       'Do you want to change vendor, If you change customer then entire data will be clear'
  //     );
  //     if (isCustomerChange) {
  //       let currentDate: any = await this.appService.getCurrentDate();
  //       this.advancePaymentNote.documentDate = currentDate;
  //       this.advancePaymentNote.ilistbusPurAdvancePaymentNoteDetail = [];
  //       this.advancePaymentNote.modeValue = '';
  //       this.bankName = '';
  //       this.branchBankName = '';
  //       this.branchBankAccountNo = '';
  //       this.bankAccountNo = '';
  //       this.advancePaymentNote.chequeNumber = '';
  //       this.advancePaymentNote.chequeDate = '';
  //       this.advancePaymentNote.actCompanyBranchBankDetailId = 0;
  //       this.advancePaymentNote.cashbookLedgerId = 0;
  //       this.advancePaymentNote.ibusActLedger.ledgerName = '';
  //       this.advancePaymentNote.actVendorBankDetailId = 0;
  //       this.advancePaymentNote.actVendorId = event.actVendorId;
  //       this.advancePaymentNote.vendorLedgerId = event.actVendorId;

  //     } else {
  //       this.advancePaymentNote.actVendorId = this.vendorIdRAW;
  //       event.actVendorId = this.vendorIdRAW;
  //     }
  //   }
  //   this.vendorIdRAW = this.advancePaymentNote.actVendorId;
  //   this.getVendorAllDetails(event);
  // }

  createNewAdvancePaymentNoteDetail() {

    if (this.purchaseOrderId !== 0) {
      if (this.checkExistsItem(this.purchaseOrderId)) {
        const obj = {
          data: this.purchaseOrderId,
          data1: this.advancePaymentNote.ibusActVoucherConfig.voucherTypeValue,
        };
        this.accountsService
          .createNewAdvancePaymentNoteDetail(obj)
          .subscribe((success) => {
            this.ilistbusPurAdvancePaymentNoteDetailRAW = JSON.parse(
              JSON.stringify(
                this.advancePaymentNote.ilistbusPurAdvancePaymentNoteDetail
              )
            );
            success.plstentPurAdvancePaymentNoteDetail.forEach((e: any) => {
              this.advancePaymentNote.ilistbusPurAdvancePaymentNoteDetail.push(
                JSON.parse(JSON.stringify(e))
              );
              this.ilistbusPurAdvancePaymentNoteDetailRAW.push(
                JSON.parse(JSON.stringify(e))
              );
            });

            this.clearDisplayText();
          });
        this.clearVoucherNo = false;
      }
    } else {
      this.clearVoucherNo = false;
      this.data.errorMessage('Please select purchase order reference no');
    }
  }
  createNewAdvancePaymentNoteDetailWpo() {
    this.accountsService
      .createNewAdvancePaymentNoteDetailWpo()
      .subscribe((success) => {
        this.ilistbusPurAdvancePaymentNoteDetailRAW = [];
        this.ilistbusPurAdvancePaymentNoteDetailRAW.push(
          JSON.parse(JSON.stringify(success))
        );
        this.advancePaymentNote.ilistbusPurAdvancePaymentNoteDetail.push(
          JSON.parse(JSON.stringify(success))
        );
      });
  }
  checkExistsItem(val: any) {
    if (
      this.advancePaymentNote.ilistbusPurAdvancePaymentNoteDetail.length !== 0
    ) {
      for (
        let i = 0;
        i < this.advancePaymentNote.ilistbusPurAdvancePaymentNoteDetail.length;
        i++
      ) {
        if (
          this.advancePaymentNote.ilistbusPurAdvancePaymentNoteDetail[i]
            .purPurchaseOrderId === val
        ) {
          let refNumber =
            this.advancePaymentNote.ilistbusPurAdvancePaymentNoteDetail[i]
              .ibusPurPurchaseOrder.purchaseOrderNumber;
          this.data.errorMessage(
            'The selected document no (' +
            refNumber +
            ') has been already added in list'
          );
          return false;
        }
      }
    }
    return true;
  }
  clearDisplayText() {
    this.autoSearchItems = new autoSearchItems();
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  navigateToList() {
    this.router.navigateByUrl('/home/purchase/advance-payment-note/search');
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
  getNotesValue(val: any) {
    this.advancePaymentNote = val;
    // this.updateStatus();
    // this.hideBtnBasedonStatus();

    if (val.statusValue === 'APROV') {
      this.onSelectTab(3);
    }
  }
  onSelectTab(val: any) {
    this.selectedTab = val;
    if(val===4){

      this.viewAdvancePurPaymentNoteReceipt()
    }
  }

  closePdf(){
    this.fileUrl =''
  }
  viewAdvancePurPaymentNoteReceipt() {
    if (this.advancePaymentNote.purAdvancePaymentNoteId !== 0) {
      const obj = {
        data: this.advancePaymentNote.purAdvancePaymentNoteId,
        data1: this.advancePaymentNote.ibusActVoucherConfig.pdfOtherComments,
      };
      const options = {
        responseType: 'blob'
      }
      this.accountsService.viewAdvancePurPaymentNoteReceipt(obj, options).subscribe((success: any) => {
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
        this.fileUrl = fileURL;
      })
    }
  }
  async openEmailHistory() {
    // this.employerEmailHistory = element;
    let dialogResponse: any = await this.dialogService.open(this.mailTemplate, {
      disableClose: true,
      height: '100%',
      width: '100%',
      maxWidth: '500px',
      position: { right: '0px', bottom: '15px' },
      direction: 'ltr',
      animation: { to: "left" },
    })
  }
  doPdfChange(event: any) {
    if (event.checked === true) {
      this.mailInfo.isIncludePdf = 'Y';
      this.mailInfo.lpdFentCMNAttachment.attachmentContent = this.base64String;
      this.mailInfo.lpdFentCMNAttachment.attachmentName =
        this.voucherName + '-' + this.refNumber;
    } else {
      this.mailInfo.isIncludePdf = 'N';
    }
  }
  doAttachment(event: any) {
    if (event.target.checked === true) {
      this.mailInfo.isIncludeAttachment = 'Y';
    } else {
      this.mailInfo.isIncludeAttachment = 'N';
    }
  }
  loadAttachment(event: any) {
    debugger
    this.attachmentList = event;
    if (this.attachmentList.length !== 0) {
      for (let i = 0; i < this.attachmentList.length; i++) {
        // this.attachment.attachmentName = this.attachmentList[i].fileName;
        // this.attachment.attachmentContent = this.attachmentList[i].content;
      }

      // this.mailInfo.lstentCMNAttachment.push(this.attachment);
    }
  }
  onNoClick() {
    // this.data.slideDialogRef?.close();
  }
  sendEmailforVoucher(l: any) {
    debugger
    this.mailInfo.subject = this.fullSubject;
    this.mailInfo.content = this.fullContent + this.downContent;
    if (l.valid) {
      this.accountsService
        .sendEmailforVoucher(this.mailInfo, this.options)
        .subscribe((success) => {
          if (
            success.msg &&
            success.msg.infoMessage &&
            success.msg.infoMessage.msgDescription
          ) {
            this.data.successMessage(success.msg.infoMessage.msgDescription);
            // this.data.slideDialogRef?.close();
          }

          if (success.msg.errorMessage.length !== 0) {
            this.data.errorInfoMessage(
              success.msg.errorMessage[0].msgDescription
            );
          }
        });
    } else {
      this.errorTrue = true;
      // this.data.errorMesaageOnly('Please fill all mandatory fields');
    }
  }
  navigateToPurchase(){
    this.router.navigateByUrl('/home/corporate/purchase-menus')
  }
}
