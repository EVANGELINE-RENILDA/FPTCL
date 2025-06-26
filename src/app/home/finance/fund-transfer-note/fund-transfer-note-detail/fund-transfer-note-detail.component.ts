import { NgClass, CommonModule, DecimalPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { Row, ViewLabel, InnerScroll, AppToolTipComponent } from '../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AppTableComponent } from '../../../../app-core/template/app-table/app-table.component';
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
import { entActAttachments, entActFundTransferNote, entActNotes, entActVoucherConfig } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { ViewPdfComponent } from '../../../../app-core/template/view-pdf/view-pdf.component';
import { SearchDebitComponent } from '../../../search/search-debit/search-debit.component';
import { SearchCreditComponent } from '../../../search/search-credit/search-credit.component';
import { FilterAndSortPipe } from '../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { AppSafePipe } from '../../../../common/pipes/app-safe/app-safe.pipe';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';

@Component({
  selector: 'app-fund-transfer-note-detail',
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
    ViewPdfComponent,
    SearchDebitComponent,
    SearchCreditComponent,
    FilterAndSortPipe,
    ViewPdfComponent,
    AppSafePipe,
    DecimalPipe,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ViewPdfComponent],
  templateUrl: './fund-transfer-note-detail.component.html',
  styleUrl: './fund-transfer-note-detail.component.scss'
})

export class FundTransferNoteDetailComponent {
  errorTrue1 = false;
  errorTrue = false;
  selectedTab = 0;
  fundTransferId = 0;
  voucherConfigId = 0;
  regionValue = 0;
  regionValueDDL: any = [];
  statusLst: any = [];
  filterFileName = '';
  filter = true;
  urlFileName = '';
  blob: any = {};
  fileUrl = '';
  voucherId = 0;

  fundTransferNote = new entActFundTransferNote();
  fundTransferNoteforNotes = new entActNotes();
  voucherConfig = new entActVoucherConfig();
  fundTransferNoteAttachment = new entActAttachments();

  @ViewChild('a') aform!: NgForm;
  @ViewChild('l') lform!: NgForm;
  @ViewChild('b') bform!: NgForm;

  fileType = 'jpg, jpeg, png, tiff, gif, doc, pdf, DOCX, ppt, csv'

  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword, image/png, image/jpg, image/jpeg , image/webp, image/tiff, image/gif, image/tif, image/';

  accountsOptions = {
    type: 'accountsPath',
  };

  tableNoteData = [
  ];

  tableAttachmentData = [

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

  pageId = 'FTNSC';

  notes: any = ['notesDetail', 'add'];
  notesName: any = ['Notes', ''];

  attachment: any = ['attachmentFileName', 'attachmentType', 'attachmentSize', 'action'];
  attachmentsName: any = ['File Name', 'File Format', 'Size', ''];

  statusMenu: any = ['changedBy', 'status'];
  statusMenuName: any = ['Changed By', 'Status'];

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;

  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;

  @ViewChild('DocumentsComponent', { static: false }) document!: DocumentsComponent;
  currency: any;
  type: any;

  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public url: UrlService,
    public router: Router,
    public appService: AppService,
    public appSetting: AppSettingsService,
    public storage: AppStorageService
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  async init() {
    console.log(this.appSetting);

    await this.data.checkToken();
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);

    this.fundTransferId = params.data;
    this.voucherConfigId = params.data1;
    this.regionValue = params.data2;

    await this.initialData.getAcccountsDDL('getFundTransferNoteInitialData', this.accountsOptions);

    await this.storage.get('companyCurrencyValue').then((val) => {
      this.currency = val;
    });

    if (this.fundTransferId === 0) {
      this.createNewFundTransferNote(this.voucherConfigId, this.regionValue);
    } else {
      this.openFundTransferNote(this.fundTransferId);
    }
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  navigateToList() {
    this.router.navigateByUrl('/home/finance/fund-transfer-note/search');
  }

  async onSelectTab(val: any) {
    this.selectedTab = val;
    if (val === 3) {
      await this.viewfundTransferNoteReceipt();
    }
  }

  createNewFundTransferNote(confidId: any, regionValue?: any) {
    const obj = {
      data: confidId,
      data1: "REGI1"
    };
    this.accountsService
      .createNewFundTransferNote(obj, this.accountsOptions)
      .subscribe((success) => {
        this.fundTransferNote = success;
        this.voucherConfigId = success.actVoucherConfigId;
        this.errorTrue = false;
      });
  }

  doClear() {
    this.errorTrue = false;
    this.createNewFundTransferNote(this.voucherConfigId, this.regionValue);
  }

  redirectTo() { }

  saveFundTransferNote(type?: any) {
    if (this.lform.valid && this.aform.valid) {
      if (this.sameLedgerError()) {
        this.accountsService
          .saveFundTransferNote(this.fundTransferNote, this.accountsOptions)
          .subscribe(async (success) => {
            this.fundTransferNote = success;
            if (type === 'save') {
              const obj = {
                data: success.actFundTransferNoteId,
                data1: this.voucherConfigId,
              };
              let urlJson = await this.url.encode(obj);
              this.router.navigateByUrl('/home/finance/fund-transfer-note/detail/' + urlJson)
            }
            this.statusLst = success.ilistbusActFundTransferNoteStatusHistory
            this.data.successMessage(success.msg.infoMessage.msgDescription);
            this.appService.setBreadCrumb(this.breadCrumb);
          });
      } else {
        this.errorTrue = true;
        this.data.errorInfoMessage(
          'Debit Account and Credit Account should not be same'
        );
      }
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }

  sameLedgerError() {
    let sameLedger = false;
    if (
      this.fundTransferNote.companyCreditAccountId !==
      this.fundTransferNote.companyDebitAccountId
    ) {
      sameLedger = true;
    } else {
      sameLedger = false;
    }
    return sameLedger;
  }

  // sameLedgerTypeError() {
  //   let sameLedgerType = false;
  //   if (
  //     this.fundTransferNote.debitLedgerTypeValue !== this.fundTransferNote.creditLedgerTypeValue
  //   ) {
  //     sameLedgerType = true;
  //   } else {
  //     sameLedgerType = false;
  //   }
  //   return sameLedgerType;
  // }

  screenDisabled() {
    let screenDisabled = false;
    if (
      this.fundTransferNote.statusValue === 'APROV' ||
      this.fundTransferNote.statusValue === 'CANCL' ||
      this.fundTransferNote.statusValue === 'PENAP'
    ) {
      screenDisabled = true;
    } else {
      screenDisabled = false;
    }
    return screenDisabled;
  }

  openFundTransferNote(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .openFundTransferNote(obj, this.accountsOptions)
      .subscribe((success) => {
        this.fundTransferNote = success;
        console.log(this.fundTransferNote, 'open');

        this.getVoucherDetail(this.fundTransferNote.actVoucherConfigId);
        this.voucherConfigId = success.actVoucherConfigId;
        this.getVoucherDetail(this.fundTransferNote.actVoucherConfigId !== 0 ? this.fundTransferNote.actVoucherConfigId : this.voucherConfigId);
        // this.statusSource = new MatTableDataSource(
        //   success.ilistbusActFundTransferNoteStatusHistory
        // );
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        // this.initialLoad = false;
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
        this.regionValueDDL = success.plstentDDLClass
      });
  }

  doSelectCreditLedger(event: any) {
    this.fundTransferNote.companyCreditAccountId = event.actLedgerId;
    this.fundTransferNote.ibusCompanyCreditActLedger.ledgerName = event.ledgerName;
    this.fundTransferNote.ibusCompanyCreditActLedger.codeName = event.codeName;
  }

  doSelectDebitLedger(event: any) {
    this.fundTransferNote.companyDebitAccountId = event.actLedgerId;
    this.fundTransferNote.ibusCompanyDebitActLedger.ledgerName = event.ledgerName;
    this.fundTransferNote.ibusCompanyDebitActLedger.codeName = event.codeName;
  }

  ledgerClear(val: any) {
    this.fundTransferNote.companyCreditAccountId = 0;
    this.fundTransferNote.ibusCompanyCreditActLedger.ledgerName = '';
    this.fundTransferNote.ibusCompanyCreditActLedger.codeName = '';
  }

  ledgerDebitClear() {
    this.fundTransferNote.companyDebitAccountId = 0;
    this.fundTransferNote.ibusCompanyDebitActLedger.ledgerName = '';
    this.fundTransferNote.ibusCompanyDebitActLedger.codeName = '';
  }

  getDebitAmount(val: any) {

    let value: any;
    value = parseFloat(val);
    this.fundTransferNote.debitAmount = value.toFixed(2);
  }

  getCreditAmount(val: any) {

    let value: any;
    value = parseFloat(val);
    this.fundTransferNote.creditAmount = value.toFixed(2);

  }

  fixData(val: any) {
    let getAmt = Number(val).toFixed(2);
    this.fundTransferNote.creditAmount = getAmt.toString();
    this.fundTransferNote.debitAmount = getAmt.toString();
  }

  createNewNotesForFundTransferNote(type?: any) {
    this.errorTrue = false;
    const obj = {
      data: this.voucherConfigId,
      data1: this.fundTransferNote.statusValue,
    };
    this.accountsService
      .createNewAccountsNotes(obj, this.accountsOptions)
      .subscribe((success) => {
        this.fundTransferNoteforNotes = success;
        this.fundTransferNoteforNotes.temporaryDocumentDate = this.fundTransferNote.documentDate;
        this.initialData.DDLValues.DDLFlowStatus = success.lddlData;
        if (type === 'clear') {
          this.data.successMessage('Data Cleared SuccessFully');
        }
      });
  }

  async openDialogNotes() {
    this.createNewNotesForFundTransferNote()
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',
    });
  }

  async changeReversal() {
    if (this.fundTransferNoteforNotes.temporaryDocumentDate !== '') {
      let msg = "Do you want to cancel this " + this.fundTransferNote.statusDescription + "  transaction"
      let isReversal = await this.dialog.confirmDialog(msg);
      if (isReversal) {
        this.saveFundTransferNoteNotes()
      }
    }
  }

  saveFundTransferNoteNotes() {
    // if (l.valid) {
    if (this.bform.valid) {
      this.errorTrue = false;
      this.fundTransferNoteforNotes.referenceId = this.fundTransferId;
      this.fundTransferNoteforNotes.lddlData = [];
      this.fundTransferNote.pentActNotes = this.fundTransferNoteforNotes;
      this.accountsService.saveFundTransferNoteNotes(this.fundTransferNote, this.accountsOptions).subscribe((success) => {
        this.fundTransferNote = success;
        this.statusLst = success.ilistbusActFundTransferNoteStatusHistory
        this.dialog.closeDialog();
        if (this.fundTransferNote.statusValue === 'APROV') {
          this.onSelectTab(3);
        }
      });
    } else {
      this.errorTrue = true;
      this.dialog.closeAll()
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
    // }
  }

  notesClear() {
    this.errorTrue = false;
    this.createNewNotesForFundTransferNote('clear');
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
    this.fundTransferNoteAttachment.referenceId = this.fundTransferId;
    let attachmentList: any = [];
    attachmentList = event;
    for (let i = 0; i < attachmentList.length; i++) {
      if (attachmentList.length !== 0) {
        this.fundTransferNoteAttachment.attachmentSize =
          attachmentList[i].fileSize;
        this.fundTransferNoteAttachment.attachmentFileName =
          attachmentList[i].fileName;
        this.fundTransferNoteAttachment.istringFileContent =
          attachmentList[i].content;
        this.fundTransferNoteAttachment.attachmentType =
          attachmentList[i].fileType;
        let uploadDocument = await this.uploadDocument();
      }
    }
  }

  uploadDocument() {
    return new Promise((resolve: any) => {
      this.accountsService
        .uploadFundTransferNoteAttachment(
          this.fundTransferNoteAttachment,
          this.accountsOptions
        )
        .subscribe((success) => {
          this.fundTransferNote.ilistbusActAttachments = success.plstentActAttachments;
          this.dialog.closeDialog();
          resolve(true);
        });
    });
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
          this.openPDFViewer(fileURL);
        } else if (success.body.type.includes('image')) {
          this.imageView(fileURL, val.attachmentFileName);
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

  filePath = ''
  fileName = ''
  @ViewChild('Template', { static: false }) Templates!: TemplateRef<any>;
  imageView(path: any, filename: any, type?: any) {
    this.type = type;
    this.filePath = path;
    this.fileName = filename;
    this.dialog.openDialog(this.Templates, {
      width: '600px',
      height: 'auto'
    })
  }

  downloadImage() {
    const downloadLink = document.createElement('a');
    downloadLink.href = this.filePath;
    downloadLink.download = this.fileName;
    downloadLink.click();
  }

  private downloadFile(url: string, filename: string) {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = filename;
    downloadLink.click();
  }

  // viewfundTransferNoteReceipt() {
  //   this.url = '';
  //   this.loadingTrue = true;
  //   if (this.id !== 0) {
  //     this.loadingTrue = true;
  //     const obj = {
  //       data: this.id,
  //       data1: this.fundTransferNote.ibusActVoucherConfig.pdfOtherComments,
  //     };
  //     this.data
  //       .postPDFData2('accounts/fundtransfernote/view-receipt', obj, this.accountsOptions )
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

  dialogClose() {
    this.dialog.closeAll();
  }

  onLedgerSelect(event: any) {
    this.fundTransferNote.companyDebitAccountId = event.actLedgerId;
    this.fundTransferNote.ibusCompanyDebitActLedger.ledgerName =
      event.ledgerName;
    this.fundTransferNote.ibusCompanyDebitActLedger.codeName = event.codeName;
  }

  viewfundTransferNoteReceipt() {
    if (this.fundTransferId !== 0) {
      const obj = {
        data: this.fundTransferId,
        data1: this.fundTransferNote.ibusActVoucherConfig.pdfOtherComments,
      };
      this.data
        .postPDFData2('accounts/fundtransfernote/view-receipt', obj, this.accountsOptions)
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
        });
    }
  }

  async deleteActAttachmentFile(element: any) {
    let msg = "Are You Sure, Want to Delete " + element.attachmentFileName;
    let response = await this.dialog.confirmDialog(msg);
    if (response) {
      const obj = {
        data: element.actAttachmentsId
      }
      this.accountsService.deleteActAttachmentFile(obj, this.accountsOptions).subscribe((success) => {
        // this.deleteDataList(success)
        this.fundTransferNote.ilistbusActAttachments = success.plstentActAttachments
      })
    }
  }

  async navigateToDetail(l: any) {
    if (l.valid) {
      if (this.voucherConfigId !== 0) {
        const obj = {
          data: 0,
          data1: this.voucherConfigId,
          // data2: this.regionValue
        };
        let urlJson = await this.url.encode(obj);
        this.router.navigateByUrl(
          '/home/finance/fund-transfer-note/detail/' + urlJson
        );
      } else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    }
    else {
      this.errorTrue = true
    }
  }

  directApproved() {
    this.fundTransferNote.ibusActVoucherConfig.isDirectApproval === 'Y'
      ? (this.fundTransferNoteforNotes.statusValue = 'APROV')
      : this.fundTransferNote.statusValue === 'PENAP'
        ? (this.fundTransferNoteforNotes.statusValue = 'APROV')
        : (this.fundTransferNoteforNotes.statusValue = 'PENAP');
    if (this.lform.valid && this.aform.valid) {
      this.errorTrue = false;
      this.fundTransferNoteforNotes.referenceId = this.fundTransferId;
      this.fundTransferNoteforNotes.lddlData = [];
      this.fundTransferNote.pentActNotes = this.fundTransferNoteforNotes;
      this.accountsService
        .saveFundTransferNoteNotes(this.fundTransferNote)
        .subscribe((success) => {
          this.fundTransferNote = success;
          this.statusLst =
            success.ilistbusActFundTransferNoteStatusHistory
          // if (this.fundTransferNote.statusValue === 'APROV') {
          //   this.onTabChange(3)
          // }
        });
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }

  navigateToAccount() {
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
}
