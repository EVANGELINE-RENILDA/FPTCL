import { CommonModule, DecimalPipe, NgClass } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  Row,
  ViewLabel,
  InnerScroll,
  AppToolTipComponent,
  LabelDash,
} from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
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
import { TabItemModule } from '../../../../app-core/app-template/tab-item/tab-item.module';
import { FooterToggleDirective } from '../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { MatMenuModule } from '@angular/material/menu';
import { DropZoneComponent } from '../../../../app-core/template/drop-zone/drop-zone.component';
import { entActAttachments, entActJournalVoucher, entActNotes, entActVoucherConfig } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { ViewPdfComponent } from '../../../../app-core/template/view-pdf/view-pdf.component';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { SearchDebitComponent } from '../../../search/search-debit/search-debit.component';
import { AppCurrencyPipe } from '../../../../common/pipes/app-currency/app-currency.pipe';
import { IszeroPipe } from '../../../../common/pipes/iszero/iszero.pipe';
import { DocumentsComponent } from '../../../../app-core/template/documents/documents.component';
import { FilterAndSortPipe } from '../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { PdfViewerComponent } from '../../../../common/pdf-viewer/pdf-viewer.component';
import { AppSafePipe } from '../../../../common/pipes/app-safe/app-safe.pipe';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';

@Component({
  selector: 'app-journal-voucher-detail',
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
    CheckboxComponent,
    MatSlideToggleModule,
    FooterToggleDirective,
    MatMenuModule,
    DropZoneComponent,
    ViewPdfComponent,
    SearchDebitComponent,
    AppCurrencyPipe,
    IszeroPipe,
    DocumentsComponent,
    FilterAndSortPipe,
    CommonModule,
    PdfViewerComponent,
    AppSafePipe, DecimalPipe, LabelDash
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ViewPdfComponent],
  templateUrl: './journal-voucher-detail.component.html',
  styleUrl: './journal-voucher-detail.component.scss',
})
export class JournalVoucherDetailComponent {
  journalVoucherId = 0;
  voucherConfigId = 0;
  regionValue = '';
  voucherId = 0;
  totalDebit = 0;
  totalCredit = 0;
  differeceValue: any = 0;
  differeceValueString: any;
  statusLst: any = [];
  errorTrue = false;
  selectedTab = 0;
  isReversalManual: any = '';
  regionValueDDL = [];
  showItemTable = true;
  sendMailAmount: any = 0;
  filterFileName = '';
  urlFileName = '';
  blob: any = {};
  fileUrl = '';
  branchName = ''
  journalVoucher = new entActJournalVoucher();
  journalVoucherNotes = new entActNotes();
  journalVoucherAttachment = new entActAttachments();
  voucherConfig = new entActVoucherConfig();

  @ViewChild('l') lform!: NgForm;
  @ViewChild('a') aform!: NgForm;
  @ViewChild('b') bform!: NgForm;
  options = {
    type: 'accountsPath',
  };
  tableItemData = [
    {
      sNo: '',
      name: 'Company Share Capital',
      ledgerCode: '9004',
      debitAmt: '0.00',
      creditAmt: '1000.00',
      narration: 'Being investment received',
    },
    {
      sNo: '',
      name: 'Company Share Capital',
      ledgerCode: '9005',
      debitAmt: '1000.00',
      creditAmt: '0.00',
      narration: 'Being investment received',
    },
  ];
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
    {
      sNo: '',
      fileName: 'image_2024_05_25T0_00_29Z',
      createdBy: 'Chief Finance Officer',
      date: '20/09/2022',
      time: '08:05 PM',
      fileFormat: 'img',
      size: '2.00kb',
    },
    {
      sNo: '',
      fileName: 'image_2024_05_25T0_00_29Z',
      createdBy: 'Chief Finance Officer',
      date: '19/09/2022',
      time: '08:05 PM',
      fileFormat: 'img',
      size: '3.00kb',
    },
  ];
  tableStatusMenuData = [
    {
      changedBy: 'Chief Finance Officer',
      effectiveDate: '29/09/2023 10:57 AM',
      status: 'In Progress',
    },
    {
      changedBy: 'Chief Finance Officer',
      effectiveDate: '29/09/2023 10:57 AM',
      status: 'Approved',
    },
  ];

  pageId = 'AJVSC';

  items: any = ['sNo', 'ledger', 'debitAmt', 'creditAmt', 'narration', 'add'];
  itemsName: any = [
    '',
    'Ledger Code',
    'Debit Amount',
    'Credit Amount',
    'Narration',
    '',
  ];

  notes: any = ['sno', 'notes', 'createdBy', 'dateTime', 'add'];
  notesName: any = ['', 'Notes', 'Created By', 'Date | Time', ''];

  attachment: any = ['sno', 'fileName', 'fileFormat', 'size', 'action'];
  attachmentsName: any = ['', 'File Name', 'File Format', 'Size', 'Action'];

  statusMenu: any = ['changedBy', 'status'];
  statusMenuName: any = ['Changed By', 'Status'];

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;

  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;

  fileType = 'jpg, jpeg, png, tiff, gif, tif ,pdf, xls, doc, pdf, DOCX, ppt, PPTX, sql, txt, csv'

  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword, image/png, image/jpg, image/jpeg , image/webp, image/tiff, image/gif, image/tif, image/';

  @ViewChild('DocumentsComponent', { static: false }) document!: DocumentsComponent;
  currency: any;


  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public url: UrlService,
    public router: Router,
    public appSetting: AppSettingsService,
    public appService: AppService,
    public storage: AppStorageService
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  async init() {
    await this.data.checkToken();
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.journalVoucherId = params.data;
    this.voucherConfigId = params.data1;
    this.regionValue = params.data2;

    await this.storage.get('companyCurrencyValue').then((val) => {
      this.currency = val
    });

    await this.initialData.getAcccountsDDL('getJournalVoucherInitialData');
    this.appService.setBreadCrumb(this.breadCrumb);
    if (this.journalVoucherId === 0) {
      this.createNewJournalVoucher(this.voucherConfigId, this.regionValue);
    } else {
      this.openJournalVoucher(this.journalVoucherId);
    }
    this.appService.setBreadCrumb(this.breadCrumb);

  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  createNewJournalVoucher(val: any, val1: any) {
    const obj = {
      data: val,
      data1: val1
    };
    this.accountsService
      .createNewJournalVoucher(obj)
      .subscribe((success) => {
        this.journalVoucher = success;
        this.voucherId = success.actVoucherConfigId;
        this.errorTrue = false;
        this.createJournalVoucherDetail(0);
      });
  }

  openJournalVoucher(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .openJournalVoucher(obj)
      .subscribe((success) => {
        this.journalVoucher = success;
        this.voucherId = success.actVoucherConfigId;
        this.getVoucherDetail(this.journalVoucher.actVoucherConfigId !== 0 ? this.journalVoucher.actVoucherConfigId : this.voucherConfigId);
        this.statusLst = success.ilistbusActJournalVoucherStatusHistory;
        this.notesDisabled();
        this.differenceDebitandCredit();
        this.errorTrue = false;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      });
  }

  saveJournalVoucher(type?: any) {
    if (this.aform.valid && this.lform.valid) {
      if (this.journalVoucher.ilistbusActJournalVoucherDetail.length !== 0) {
        this.accountsService
          .saveJournalVoucher(this.journalVoucher)
          .subscribe(async (success) => {
            this.journalVoucher = success;
            this.differenceDebitandCredit();
            if (type === 'save') {

              const obj = {
                data: success.actJournalVoucherId,
                data1: 0,
              };
              let urlJson = await this.url.encode(obj);
              this.router.navigateByUrl(
                '/home/finance/journal-voucher/detail/' + urlJson
              );
            }
            this.data.successMessage(success.msg.infoMessage.msgDescription);

          });
      } else {
        this.data.errorInfoMessage('Please add any items');
        this.errorTrue = true;
      }
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }

  clearJournalVoucher() {
    this.errorTrue = false;
    this.createNewJournalVoucher(this.voucherConfigId, this.regionValue);
  }

  refreshJournalVoucher() {
    this.openJournalVoucher(this.journalVoucherId);
  }

  isDirectApproval() {
    let directApproval = false;
    if (
      this.journalVoucher.statusValue !== 'APROV' &&
      this.journalVoucher.statusValue !== 'CANCL' &&
      this.journalVoucher.ibusActVoucherConfig.isDirectApproval === 'Y'
    ) {
      directApproval = true;
    } else {
      directApproval = false;
    }

    return directApproval;
  }

  directApproved() {
    if (this.journalVoucher.ilistbusActJournalVoucherDetail.length === 0) {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please add atleast one item before completing');
      return;
    }

    if (this.differeceValue !== 0) {
      this.data.errorInfoMessage('The Difference Value must be zero');
      this.errorTrue = true;
      return;
    }

    this.journalVoucher.ibusActVoucherConfig.isDirectApproval === 'Y'
      ? (this.journalVoucherNotes.statusValue = 'APROV')
      : this.journalVoucher.statusValue === 'PENAP'
        ? (this.journalVoucherNotes.statusValue = 'APROV')
        : (this.journalVoucherNotes.statusValue = 'PENAP');
    if (this.lform.valid && this.lform.valid) {
      if (this.aform.valid) {
        this.journalVoucherNotes.referenceId = this.journalVoucherId;
        this.journalVoucherNotes.lddlData = [];
        this.journalVoucher.ibusActnotes = this.journalVoucherNotes;
        this.accountsService
          .saveJournalVoucherNotes(this.journalVoucher,)
          .subscribe((success) => {
            this.journalVoucher = success;
            this.voucherId = success.actVoucherConfigId;
            this.statusLst =
              success.ilistbusPurPaymentNoteStatusHistory
            if (this.journalVoucher.statusValue === 'APROV') {
              this.onSelectTab(3);
            }
          });
      } else {
        this.data.errorInfoMessage('Please add any items');
        this.errorTrue = true;
      }
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }

  getVoucherDetail(element: any) {
    const obj = {
      data: element,
    };
    this.accountsService
      .getVoucherAccess(obj)
      .subscribe((success) => {
        this.voucherConfigId = success.actVoucherConfigId;
        this.voucherConfig = success;
        this.regionValueDDL = success.plstentDDLClass
      });
  }

  async navigateDetail(l: any) {
    if (l.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          data2: this.regionValue
        };
        let urlJson = await this.url.encode(obj);
        this.router.navigateByUrl(
          '/home/finance/journal-voucher/detail/' + urlJson
        );
      } else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    }
    else {
      this.errorTrue = true
    }
  }

  createJournalVoucherDetail(index: any) {
    this.accountsService
      .createJournalVoucherDetail()
      .subscribe((success) => {
        this.showItemTable = false;
        this.journalVoucher.ilistbusActJournalVoucherDetail.splice(
          index,
          0,
          JSON.parse(JSON.stringify(success))
        );
        setTimeout(() => {
          this.showItemTable = true;
        }, 100);
      });
  }

  async openDialogNotes() {
    this.createJournalVoucherNotes();
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',
    });
  }

  createJournalVoucherNotes() {
    this.errorTrue = false;
    const obj = {
      data: this.journalVoucher.actVoucherConfigId,
      data1: this.journalVoucher.statusValue,
    };
    this.accountsService
      .createNewAccountsNotes(obj)
      .subscribe((success) => {
        this.journalVoucherNotes = success;
        this.journalVoucherNotes.temporaryDocumentDate = this.journalVoucher.documentDate;
        this.initialData.DDLValues.DDLFlowStatus = success.lddlData;
      });
  }

  saveJournalVoucherNotes() {
    if (!this.bform.valid) {
      this.data.errorInfoMessage('Please fill all mandatory fields');
      this.errorTrue = true;
      return;
    }

    const isApprovedOrPending =
      this.journalVoucherNotes.statusValue === 'APROV' ||
      this.journalVoucherNotes.statusValue === 'PENAP';

    if (isApprovedOrPending) {
      if (this.journalVoucher.ilistbusActJournalVoucherDetail.length === 0) {
        this.data.errorInfoMessage('Please add at least one item.');
        this.errorTrue = true;
        return;
      }
      if (this.differeceValue !== 0) {
        this.data.errorInfoMessage('The Difference Value must be zero');
        this.errorTrue = true;
        return;
      }
    }

    if (this.journalVoucher.ilistbusActJournalVoucherDetail.length !== 0) {
      this.journalVoucherNotes.lddlData = [];
      this.journalVoucherNotes.referenceId = this.journalVoucherId;
      this.journalVoucher.ibusActnotes = this.journalVoucherNotes;

      this.accountsService.saveJournalVoucherNotes(this.journalVoucher)
        .subscribe((success) => {
          this.journalVoucher = success;
          this.data.successMessage(success.msg.infoMessage.msgDescription);
          this.statusLst = success.ilistbusActJournalVoucherStatusHistory;
          if (this.journalVoucher.statusValue === 'APROV') {
            this.onSelectTab(3);
          }
          this.dialog.closeDialog();
        });
    } else {
      this.data.errorInfoMessage('Please add any items');
      this.errorTrue = true;
    }
  }

  clearNotes() {
    this.createJournalVoucherNotes();
  }

  async createNewAttachment() {
    let dialogResponse: any = await this.dialog.openDialog(this.attachmentDialog, {
      disableClose: true,
      height: 'atuo',
      width: '100%',
      maxWidth: '1170px',
    })
  }

  async uploadAttachemnt(event: any) {
    this.journalVoucherAttachment.referenceId = this.journalVoucherId;
    let attachmentList: any = [];
    attachmentList = event;
    for (let i = 0; i < attachmentList.length; i++) {
      if (attachmentList.length !== 0) {
        this.journalVoucherAttachment.attachmentSize =
          attachmentList[i].fileSize;
        this.journalVoucherAttachment.attachmentFileName =
          attachmentList[i].fileName;
        this.journalVoucherAttachment.istringFileContent =
          attachmentList[i].content;
        this.journalVoucherAttachment.attachmentType =
          attachmentList[i].fileType;
        let uploadDocument = await this.uploadDocument();
      }
    }
  }

  uploadDocument() {
    return new Promise((resolve: any) => {
      this.accountsService
        .uploadJournalVoucherAttachment(
          this.journalVoucherAttachment,

        )
        .subscribe((success) => {
          this.journalVoucher.ilistbusActAttachments = success.plstentActAttachments;
          this.dialog.closeDialog();
          resolve(true);
        });
    });
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
  resetDebitandCreditAmount(i: any) {
    
    if (this.journalVoucher.ilistbusActJournalVoucherDetail[i].creditAmount === "") {
      this.journalVoucher.ilistbusActJournalVoucherDetail[i].creditAmount = "0.00";
    }
    if (this.journalVoucher.ilistbusActJournalVoucherDetail[i].debitAmount === "") {
      this.journalVoucher.ilistbusActJournalVoucherDetail[i].debitAmount = "0.00";
    }

  }


  differenceDebitandCredit() {
    let totalDifference: any;
    this.totalDebit = 0;
    this.totalCredit = 0;
    this.differeceValue = 0;
    for (
      let i = 0;
      i < this.journalVoucher.ilistbusActJournalVoucherDetail.length;
      i++
    ) {
      this.totalDebit =
        this.totalDebit +
        Number(
          this.journalVoucher.ilistbusActJournalVoucherDetail[i].debitAmount
        );
      this.totalCredit =
        this.totalCredit +
        Number(
          this.journalVoucher.ilistbusActJournalVoucherDetail[i].creditAmount
        );
      this.totalCredit
      this.differeceValue = this.totalDebit - this.totalCredit;
    }
    if (this.differeceValue < 0) {
      this.differeceValue = -1 * this.differeceValue;
      // let differenceDecimal = this.appCurrency.transform(this.differeceValue);
      this.differeceValueString = 'Cr.';
    } else if (this.differeceValue > 0) {
      // let differenceDecimal = this.appCurrency.transform(this.differeceValue);
      this.differeceValueString = 'Dr.';
    }
  }

  doManualChecked(event: any) {
    if (event.checked === true) {
      this.isReversalManual = 'Y';
    } else {
      this.isReversalManual = 'N';
    }
  }

  doAutoChecked(event: any) {
    if (event.checked === true) {
      this.isReversalManual = 'N';
    } else {
      this.isReversalManual = 'Y';
    }
  }

  notesDisabled() {
    let notesDisabled = false;
    if (
      this.journalVoucher.ibusActVoucherConfig.isDirectApproval === 'N' ||
      (this.journalVoucher.ibusActVoucherConfig.isDirectApproval === 'Y' &&
        this.journalVoucher.statusValue === 'APROV')
    ) {
      notesDisabled = false;
    } else {
      notesDisabled = true;
    }
    return notesDisabled;
  }

  doCollectedData(event: any) {
    this.journalVoucher.ilistbusActAttachments = event.plstentActAttachments;
    if (event.msg.infoMessage.msgDescription) {
      this.data.successMessage(event.msg.infoMessage.msgDescription);
    }
  }

  async naviagteReversingJournal() {
    const obj = {
      data: 0,
      data1: this.journalVoucherId,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl(
      '/home/finance/reversing-journal/detail/' + urlJson
    );
  }
  async naviagteReversingJournalOpen() {
    if (!!this.journalVoucher.reversingJournalId) {
      const obj = {
        data: this.journalVoucher.reversingJournalId,
      };
      let urlJson = await this.url.encode(obj);
      this.router.navigateByUrl(
        '/home/finance/reversing-journal/detail/' + urlJson
      );
    }
  }

  screenDisabled() {
    let screenDisabled = false;
    if (
      this.journalVoucher.statusValue === 'APROV' ||
      this.journalVoucher.statusValue === 'CANCL' ||
      this.journalVoucher.statusValue === 'PENAP'
    ) {
      screenDisabled = true;
    } else {
      screenDisabled = false;
    }
    return screenDisabled;
  }

  async changeReversal(valid: any) {
    if (this.journalVoucherNotes.temporaryDocumentDate !== '') {
      let isReversal = await this.dialog.notificationDialog(
        this.journalVoucher.statusDescription
      );
      if (isReversal) {
        this.saveJournalVoucherNotes();
      }
    }
  }

  setTwoNumberDecimal(value: any) {
    value = parseFloat(value).toFixed(2);
    return value;
  }

  sendMailNetAmount() {
    this.sendMailAmount = 0;
    return new Promise((resolve) => {
      if (this.journalVoucher.ilistbusActJournalVoucherDetail.length !== 0) {
        for (
          let i = 0;
          i < this.journalVoucher.ilistbusActJournalVoucherDetail.length;
          i++
        ) {
          this.sendMailAmount = this.setTwoNumberDecimal(
            parseFloat(
              this.journalVoucher.ilistbusActJournalVoucherDetail[i]
                .creditAmount
            ) + parseFloat(this.sendMailAmount)
          );
        }
        return;
      }
    });
  }

  commonNarrationFill(val: any) {
    if (this.journalVoucher.ilistbusActJournalVoucherDetail.length !== 0) {
      for (
        let i = 0;
        i < this.journalVoucher.ilistbusActJournalVoucherDetail.length;
        i++
      ) {
        this.journalVoucher.ilistbusActJournalVoucherDetail[i].narration =
          val.toString();
      }
    }
  }

  navigateToList() {
    this.router.navigateByUrl('/home/finance/journal-voucher/search');
  }


  async onSelectTab(val: any) {
    this.selectedTab = val;
    if (val === 3) {
      await this.viewJournalVoucherReceipt();
    }
  }

  viewJournalVoucherReceipt() {
    this.fileUrl = '';
    if (this.journalVoucherId !== 0) {
      const obj = {
        data: this.journalVoucherId,
        data1: this.journalVoucher.ibusActVoucherConfig.pdfOtherComments,
      };
      this.data
        .postPDFData2('accounts/journalvoucher/view', obj, this.options)
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
          this.fileUrl = fileURL;
          console.log(this.fileUrl)
        });
    }
  }
  toggleIncludeBank(val: any) {
    if (val === true) {
      this.journalVoucher.isIncludeBankLedger = 'Y';
    } else {
      this.journalVoucher.isIncludeBankLedger = 'N';
    }
  }

  addNewItemLst(index: any) {
    // const obj = {
    //     sNo: '',
    //     name: '',
    //     ledgerCode: '',
    //     debitAmt: '',
    //     creditAmt: '',
    //     narration: '',
    // }
    // this.tableItemData.push(obj)
    this.createJournalVoucherDetail(index);

  }

  dialogClose() {
    this.dialog.closeAll();
  }

  onLedgerSelect(event: any, val: any) {
    
    val.ientLedger.codeName = event.codeName;
    val.ientLedger.ledgerName = event.ledgerName;
    val.ledgerAccountId = event.actLedgerId;
  }

  closeDialog() {
    this.data.showErrorMessage = false;
    this.dialog.closeDialog()
  }

  async deleteActAttachmentFile(element: any) {
    let msg = "Are You Sure, Want to Delete " + element.attachmentFileName;
    let response = await this.dialog.confirmDialog(msg);
    if (response) {
      const obj = {
        data: element.actAttachmentsId
      }
      this.accountsService.deleteAccountAttachmentFile(obj).subscribe((success) => {
        // this.deleteDataList(success)
        this.journalVoucher.ilistbusActAttachments = success.plstentActAttachments
      })
    }
  }

  downloadDocumentImage(val: any) {
    const obj = {
      data: val.actAttachmentsId,
      data1: 'ACT'
    }
    this.data.postPDFData('Finance/LoadAttachmentsByteArray', obj, this.options).subscribe((success) => {
      const resp = new Blob([success], { type: success.type });
      const fileURL = URL.createObjectURL(resp);
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = val.attachmentFileName;
      downloadLink.click();
    })
  }
  openDocumentImage(val: any) {
    const obj = {
      data: val.actAttachmentsId,
      data1: 'ACT'
    }
    this.data.postPDFData('Finance/LoadAttachmentsByteArray', obj, this.options).subscribe((success) => {

      const resp = new Blob([success], { type: success.type });
      const fileURL = URL.createObjectURL(resp);
      if (success.type === 'application/pdf') {
        this.openPDFViewer(fileURL);
      } else if (success.type.includes('image')) {
        this.document.imageView(fileURL, val.attachmentFileName, 'trans');
      } else {
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = val.attachmentFileName;
        downloadLink.click();
      }
    })
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
  async checkDeleteItem(data: any, index: any) {
    let response = await this.dialog.checkDelete('Are you sure, You want to delete item ?');
    if (response) {
      if (data.actJournalVoucherDetailId !== 0) {
        this.deleteRowJournalVoucherDetails(index);
      } else {
        this.journalVoucher.ilistbusActJournalVoucherDetail.splice(index, 1);
        this.data.successMessage('Item Removed Sucessfully');
      }
      this.differenceDebitandCredit();
    }
  }
  deleteRowJournalVoucherDetails(i: any) {
    this.journalVoucher.ilistbusActJournalVoucherDetail[i].strDeleteFlag = 'Y';
    this.accountsService
      .deleteRowJournalVoucherDetails(this.journalVoucher, this.options)
      .subscribe((success) => {
        this.journalVoucher = success;
        this.differenceDebitandCredit();
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      });
  }
  navigateToAccount() {
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
}
