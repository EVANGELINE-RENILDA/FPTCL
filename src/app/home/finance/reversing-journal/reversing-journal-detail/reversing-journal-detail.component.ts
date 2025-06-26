import { NgClass, CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
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
import { AppTableComponent } from '../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { DocumentsComponent } from '../../../../app-core/template/documents/documents.component';
import { DropZoneComponent } from '../../../../app-core/template/drop-zone/drop-zone.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppService } from '../../../../app.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import {
  entActAttachments,
  entActNotes,
  entActReversingJournal,
} from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { ViewPdfComponent } from '../../../../app-core/template/view-pdf/view-pdf.component';
import { FinanceViewBtnComponent } from '../../../../app-core/template/finance-view-btn/finance-view-btn.component';
import { FilterAndSortPipe } from '../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { AppSafePipe } from '../../../../common/pipes/app-safe/app-safe.pipe';
import { PdfViewerComponent } from '../../../../common/pdf-viewer/pdf-viewer.component';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';

@Component({
  selector: 'app-reversing-journal-detail',
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
    FooterToggleDirective,
    MatMenuModule,
    DropZoneComponent,
    ViewPdfComponent, CommonModule,
    PdfViewerComponent,
    AppSafePipe,
    FinanceViewBtnComponent,
    FilterAndSortPipe, DocumentsComponent, AppSafePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './reversing-journal-detail.component.html',
  styleUrl: './reversing-journal-detail.component.scss',
})
export class ReversingJournalDetailComponent {
  reversingJournalVoucher = new entActReversingJournal();
  reversingJournalVoucherAttachment = new entActAttachments();
  reversingJournalVoucherNotes = new entActNotes();
  branchName = ''
  urlFileName = '';
  loadingTrue = false;
  isUpdateClicked: boolean = false;
  blob: any;
  voucherId = 0;
  id: any = 0;
  reversalJrnlId = 0;
  journalVoucherId = 0;
  errorTrue = false;
  selectedTab = 0;
  statusLst: any = [];
  filterFileName = '';
  options = {
    hideFullSpinner: true
  }
  totalDebit = 0;
  totalCredit = 0;
  differeceValue: any = 0;

  fileType = 'jpg, jpeg, png, tiff, gif, tif ,pdf, xls, doc, pdf, DOCX, ppt, PPTX, sql, txt, csv'

  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword, image/png, image/jpg, image/jpeg , image/webp, image/tiff, image/gif, image/tif, image/';

  @ViewChild('DocumentsComponent', { static: false }) document!: DocumentsComponent;
  @ViewChild('l') lform!: NgForm;
  @ViewChild('a') aform!: NgForm;
  @ViewChild('b') bform!: NgForm;

  accountsOptions = {
    type: 'accountsPath',
  };

  tableItemData: any = [];
  tableNoteData = [];
  tableAttachmentData = [];
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

  pageId = 'ARJSC';

  items: any = ['codeName', 'debitAmount', 'creditAmount', 'narration'];
  itemsName: any = [
    'Ledger Code',
    'Debit Amount',
    'Credit Amount',
    'Narration',
  ];

  notes: any = ['sno', 'notes', 'createdBy', 'dateTime', 'add'];
  notesName: any = ['', 'Notes', 'Created By', 'Date | Time', ''];

  attachment: any = ['sno', 'fileName', 'fileFormat', 'size', 'action'];
  attachmentsName: any = ['', 'File Name', 'File Format', 'Size', ''];

  statusMenu: any = ['changedBy', 'status'];
  statusMenuName: any = ['Changed By', 'Status'];

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;

  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
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
    await this.appService.setBreadCrumb(this.breadCrumb);

    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.reversalJrnlId = params.data;
    this.journalVoucherId = params.data1;
    console.log(params);

    await this.storage.get('companyCurrencyValue').then((val) => {
      this.currency = val
    });

    if (this.reversalJrnlId === 0) {
      this.createNewReversingJournal(this.journalVoucherId);
    } else {
      this.openReversingJournalVoucher(this.reversalJrnlId);
    }
    this.initialData.getAcccountsDDL('getReverseJournalInitialData', this.accountsOptions);
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  createNewReversingJournal(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .createNewReversingJournal(obj, this.accountsOptions)
      .subscribe((success) => {
        this.reversingJournalVoucher = success;
      });
  }

  openReversingJournalVoucher(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .openReversingJournalVoucher(obj, this.accountsOptions)
      .subscribe((success) => {
        this.reversingJournalVoucher = success;
        this.differenceDebitandCredit();
        this.statusLst = success.ilistbusActReversingJournalStatusHistory;
        this.tableItemData = this.reversingJournalVoucher.ilistbusActReversingJournalDetail;
        // this.ilistbusActReversingJournalDetail =
        // JSON.parse(JSON.stringify(this.reversingJournalVoucher.ilistbusActReversingJournalDetail));
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      });
  }

  differenceDebitandCredit() {
    this.totalDebit = 0;
    this.totalCredit = 0;

    for (
      let i = 0;
      i < this.reversingJournalVoucher.ilistbusActReversingJournalDetail.length;
      i++
    ) {
      this.totalDebit =
        this.totalDebit +
        parseFloat(
          this.reversingJournalVoucher.ilistbusActReversingJournalDetail[i]
            .debitAmount
        );

      this.totalCredit =
        this.totalCredit +
        parseFloat(
          this.reversingJournalVoucher.ilistbusActReversingJournalDetail[i]
            .creditAmount
        );

      this.differeceValue = this.totalDebit - this.totalCredit;
    }
    if (this.differeceValue < 0) {
      this.differeceValue = -1 * this.differeceValue;
      this.differeceValue = 'Cr.' + this.differeceValue;
    } else if (this.differeceValue > 0) {
      this.differeceValue = 'Dr.' + this.differeceValue;
    }
  }

  saveReversingJournal(val: any) {

    if (this.bform.valid) {
      this.isUpdateClicked = true;
      this.accountsService
        .saveReversingJournal(
          this.reversingJournalVoucher,
          this.accountsOptions
        )
        .subscribe(async (success) => {
          this.reversingJournalVoucher = success;
          this.tableItemData = this.reversingJournalVoucher.ilistbusActReversingJournalDetail;
          this.differenceDebitandCredit();
          const obj = {
            data: success.actReversingJournalId,
            data1: 0,
          };
          this.statusLst = success.ilistbusActReversingJournalStatusHistory;
          if (val === 'create') {
            let urlJson = await this.url.encode(obj);
            this.router.navigateByUrl(
              '/home/finance/reversing-journal/detail/' + urlJson
            );
          }
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        });
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }

  doClear() {
    this.createNewReversingJournal(this.journalVoucherId);
  }

  async naviagteJournalVoucherOpen() {
    const obj = {
      data: this.reversingJournalVoucher.ibusActJournalVoucher
        .actJournalVoucherId,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl(
      '/home/finance/reversing-journal/detail/' + urlJson
    );
  }
  createNewAccountsNotes() {
    const obj = {
      data: this.reversingJournalVoucher.actVoucherConfigId,
      data1: this.reversingJournalVoucher.statusValue,
    };
    this.accountsService
      .createNewAccountsNotes(obj, this.accountsOptions)
      .subscribe((success) => {
        this.reversingJournalVoucherNotes = success;
        this.reversingJournalVoucherNotes.temporaryDocumentDate =
          this.reversingJournalVoucher.documentDate;
        this.initialData.DDLValues.DDLFlowStatus = success.lddlData;
      });
  }

  saveReversingJournalNotes(l: any) {
    if (l.valid) {
      this.reversingJournalVoucherNotes.lddlData = [];
      this.reversingJournalVoucherNotes.referenceId = this.journalVoucherId;

      this.reversingJournalVoucher.pentActNotes = this.reversingJournalVoucherNotes;
      this.accountsService
        .saveReversingJournalNotes(
          this.reversingJournalVoucher,
          this.accountsOptions
        )
        .subscribe((success) => {
          this.reversingJournalVoucher = success;
          this.differenceDebitandCredit();
          this.statusLst = success.ilistbusActReversingJournalStatusHistory;
          this.dialog.closeDialog();
          this.data.successMessage(success.msg.infoMessage.msgDescription);
          if (this.reversingJournalVoucher.statusValue === 'APROV') {
            this.onSelectTab(3);
          }
        });
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }

  cancelReversingJournal() {
    this.reversingJournalVoucherNotes.statusValue = 'CANCL';
    this.saveReversingJournalNotes({ valid: true });
  }

  clearNotes() {
    this.errorTrue = false;
    this.createNewAccountsNotes();
  }

  commonNarrationFill(val: any) {
    if (this.reversingJournalVoucher.ilistbusActReversingJournalDetail.length !== 0) {
      for (let i = 0; i < this.reversingJournalVoucher.ilistbusActReversingJournalDetail.length; i++) {
        this.reversingJournalVoucher.ilistbusActReversingJournalDetail[i].narration = val.toString();
      }
    }
  }

  getLedgerType() {
    this.accountsService
      .getLedgerType(this.reversingJournalVoucher, this.accountsOptions)
      .subscribe((success) => {
        this.reversingJournalVoucher = success;
      });
  }

  deleteRowReversingJournalDetails(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .deleteRowReversingJournalDetails(obj, this.accountsOptions)
      .subscribe((success) => {
        this.reversingJournalVoucher = success;
      });
  }


  addNewItemLst() {
    const obj = {
      sNo: '',
      name: '',
      ledgerCode: '',
      debitAmt: '',
      creditAmt: '',
      narration: '',
    };

    this.tableItemData.push(obj);
  }

  createReversingJournalNotes() {
    const obj = {
      data: this.reversingJournalVoucher.actVoucherConfigId,
      data1: this.reversingJournalVoucher.statusValue,
    };
    this.accountsService
      .createNewAccountsNotes(obj, this.accountsOptions)
      .subscribe((success) => {
        this.reversingJournalVoucherNotes = success;
        this.reversingJournalVoucherNotes.temporaryDocumentDate =
          this.reversingJournalVoucher.documentDate;
        this.initialData.DDLValues.DDLFlowStatus = success.lddlData;
      });
  }

  async openDialogNotes() {
    this.createReversingJournalNotes();
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',
    });
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
    this.reversingJournalVoucherAttachment.referenceId = this.reversalJrnlId;
    let attachmentList: any = [];
    attachmentList = event;
    for (let i = 0; i < attachmentList.length; i++) {
      if (attachmentList.length !== 0) {
        this.reversingJournalVoucherAttachment.attachmentSize =
          attachmentList[i].fileSize;
        this.reversingJournalVoucherAttachment.attachmentFileName =
          attachmentList[i].fileName;
        this.reversingJournalVoucherAttachment.istringFileContent =
          attachmentList[i].content;
        this.reversingJournalVoucherAttachment.attachmentType =
          attachmentList[i].fileType;
        let uploadDocument = await this.uploadDocument();
      }
    }
  }

  uploadDocument() {
    return new Promise((resolve: any) => {
      this.accountsService
        .uploadReversingJournalAttachment(
          this.reversingJournalVoucherAttachment,
          this.accountsOptions
        )
        .subscribe((success) => {
          this.reversingJournalVoucher.ilistbusActAttachments = success.plstentActAttachments;
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

  openPDFViewer(xurl: any) {
    const dialogRef = this.dialog.openDialog(ViewPdfComponent, {
      width: "100%",
      height: "85%",
      data: {
        url: xurl,
      },
    });
  }

  // imageView(path: any, filename: any) {
  //   this.filePath = path;
  //   this.fileName = filename;
  //   this.dialog.openDialog(this.Templates, {
  //     width: '600px',
  //     height: 'auto'
  //   })
  // }

  // viewReversingJournalReceipt() {
  //
  //   this.url='';
  //   this.loadingTrue = true;
  //   if (this.id !== 0) {
  //     this.loadingTrue = true;
  //     const obj = {
  //       data: this.id,
  //       data1: this.reversingJournalVoucher.ibusActVoucherConfig.pdfOtherComments,
  //     };
  //     this.data
  //       .postPDFData2('accounts/reversingjournal/view', obj, this.options)
  //       .subscribe((success: any) => {
  //         let contentDisposition = success.headers.get('content-disposition');
  //         let filename = contentDisposition
  //           .split(';')[1]
  //           .split('filename')[1]
  //           .split('=')[1]
  //           .trim();
  //         // this.blob = success.body;
  //         const resp = new Blob([success.body], { type: 'application/pdf' });
  //         this.blob = resp;
  //         const fileURL = URL.createObjectURL(resp);

  //         this.urlFileName = filename;
  //         this.url = fileURL;
  //         this.loadingTrue = false;
  //       });
  //   }
  // }

  notesDisabled() {
    let notesDisabled = false;
    if (this.reversingJournalVoucher.ibusActVoucherConfig.isDirectApproval === 'N' ||
      (this.reversingJournalVoucher.ibusActVoucherConfig.isDirectApproval === 'Y' &&
        this.reversingJournalVoucher.statusValue === 'APROV')
    ) {
      notesDisabled = false;
    } else {
      notesDisabled = true;
    }
    return notesDisabled;
  }

  screenDisabled() {
    let screenDisabled = false;
    if (this.reversingJournalVoucher.statusValue === 'APROV' ||
      this.reversingJournalVoucher.statusValue === 'CANCL' ||
      this.reversingJournalVoucher.statusValue === 'PENAP') {
      screenDisabled = true;
    } else {
      screenDisabled = false;
    }
    return screenDisabled;
  }

  hideBtnBasedonStatus() {
    let hideBtn = false;
    if (
      this.reversingJournalVoucher.statusValue === 'PENAP' ||
      this.reversingJournalVoucher.statusValue === 'APROV' ||
      this.reversingJournalVoucher.statusValue === 'CANCL'
    ) {
      hideBtn = true;
    } else {
      hideBtn = false;
    }
    return hideBtn;
  }

  async changeReversal(valid: any) {
    if (this.reversingJournalVoucherNotes.temporaryDocumentDate !== '') {
      let isReversal = await this.dialog.notificationDialog(this.reversingJournalVoucher.statusDescription);
      if (isReversal) {
        this.saveReversingJournalNotes(valid)
      }
    }
  }

  dialogClose() {
    this.dialog.closeAll();
  }

  navigateToList() {
    this.router.navigateByUrl('/home/finance/reversing-journal/search');
  }

  async onSelectTab(val: any) {
    this.selectedTab = val;
    if (val === 3) {

      await this.viewReversingJournalReceipt();
    }
  }

  getDeletedAttachLst(event: any) {
    this.reversingJournalVoucher.ilistbusActAttachments = event.plstentActAttachments;
    this.data.successMessage(event.msg.infoMessage.msgDescription)
  }
  directApproved() {
    this.reversingJournalVoucher.ibusActVoucherConfig.isDirectApproval === 'Y'
      ? (this.reversingJournalVoucherNotes.statusValue = 'APROV')
      : this.reversingJournalVoucher.statusValue === 'PENAP'
        ? (this.reversingJournalVoucherNotes.statusValue = 'APROV')
        : (this.reversingJournalVoucherNotes.statusValue = 'PENAP');

    if (this.bform.valid) {
      this.reversingJournalVoucherNotes.referenceId = this.journalVoucherId;
      this.reversingJournalVoucherNotes.lddlData = [];
      this.reversingJournalVoucher.pentActNotes = this.reversingJournalVoucherNotes;
      this.accountsService
        .saveReversingJournalNotes(this.reversingJournalVoucher, this.accountsOptions)
        .subscribe((success) => {
          this.reversingJournalVoucher = success;
          this.voucherId = success.actVoucherConfigId;
          this.statusLst =
            success.ilistbusPurPaymentNoteStatusHistory
          if (this.reversingJournalVoucher.statusValue === 'APROV') {
            this.onSelectTab(3);
          }
        });
    } else {
      this.data.errorInfoMessage('Please add any items');
      this.errorTrue = true;
    }

    // } else {
    //   this.errorTrue = true;
    //   this.data.errorInfoMessage('Please fill all mandatory fields');
    // }
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

  fileUrl = '';
  viewReversingJournalReceipt() {

    this.fileUrl = '';
    this.loadingTrue = true;
    debugger
    if (this.reversingJournalVoucher.actReversingJournalId !== 0) {
      this.loadingTrue = true;
      const obj = {
        data: this.reversingJournalVoucher.actReversingJournalId,
        data1: this.reversingJournalVoucher.ibusActVoucherConfig.pdfOtherComments,
      };
      const options = {
        responseType: 'blob'
      };
      this.accountsService.viewReversingJournalVoucherReceipt(obj, options).subscribe((success: any) => {
        let contentDisposition = success.headers.get('content-disposition');
        let filename = contentDisposition
          .split(';')[1]
          .split('filename')[1]
          .split('=')[1]
          .trim();
        // this.blob = success.body;
        const resp = new Blob([success.body], { type: success.body.type });
        this.blob = resp;
        const fileURL = URL.createObjectURL(resp);

        this.urlFileName = filename;
        this.fileUrl = fileURL;
        this.loadingTrue = false;
      })
      // this.data
      //   .postPDFData2('accounts/reversingjournal/view', obj, this.options)
      //   .subscribe((success: any) => {
      //     let contentDisposition = success.headers.get('content-disposition');
      //     let filename = contentDisposition
      //       .split(';')[1]
      //       .split('filename')[1]
      //       .split('=')[1]
      //       .trim();
      //     // this.blob = success.body;
      //     const resp = new Blob([success.body], { type: 'application/pdf' });
      //     this.blob = resp;
      //     const fileURL = URL.createObjectURL(resp);

      //     this.urlFileName = filename;
      //     this.fileUrl = fileURL;
      //     this.loadingTrue = false;
      //   });
    }
  }
  navigateToAccount() {
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }

  async cancelOrComplete(val: any) {

    const obj = {
      data: this.reversingJournalVoucher.actVoucherConfigId,
      data1: this.reversingJournalVoucher.statusValue,
    };
    this.accountsService
      .createNewAccountsNotes(obj, this.accountsOptions)
      .subscribe((success) => {
        this.reversingJournalVoucherNotes = success;
        this.reversingJournalVoucherNotes.temporaryDocumentDate =
          this.reversingJournalVoucher.documentDate;
        // this.initialData.DDLValues.DDLFlowStatus = success.lddlData;
        this.canComplete(val)
      });
  }

  canComplete(val: any) {
    this.reversingJournalVoucherNotes.referenceId = this.reversingJournalVoucher.actReversingJournalId;
    this.reversingJournalVoucherNotes.referenceTypeId = 204
    this.reversingJournalVoucher.pentActNotes = this.reversingJournalVoucherNotes;
    this.reversingJournalVoucherNotes.statusValue = val;
    this.accountsService
      .saveReversingJournalNotes(
        this.reversingJournalVoucher,
        this.accountsOptions
      )
      .subscribe((success) => {
        this.reversingJournalVoucher = success;
        this.differenceDebitandCredit();
        this.statusLst = success.ilistbusActReversingJournalStatusHistory;
        this.dialog.closeDialog();
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        if (this.reversingJournalVoucher.statusValue === 'APROV') {
          this.onSelectTab(3);
        }
      });
  }
}

