import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AppToolTipComponent, InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FooterToggleDirective } from '../../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass, JsonPipe, SlicePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TabContainerModule } from '../../../../../app-core/app-template/tab-container/tab-container.module';
import { TabItemModule } from '../../../../../app-core/app-template/tab-item/tab-item.module';
import { ErrorMessageComponent } from '../../../../../app-core/message/error-message/error-message.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { AddressEditComponent } from '../../../../../app-core/template/address-edit/address-edit.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';
import { DocumentsComponent } from '../../../../../app-core/template/documents/documents.component';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { MultiPageUrlComponent } from '../../../../../app-core/template/multi-page-url/multi-page-url.component';
import { StatusHistoryComponent } from '../../../../../app-core/template/status-history/status-history.component';
import { AppAccessDirective } from '../../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { CustomerServiceListComponent } from '../../../../crm/customer-service/customer-service-list/customer-service-list.component';
import { CustomerUpdateListComponent } from '../../../../crm/customer-update/customer-update-list/customer-update-list.component';
import { LeadListComponent } from '../../../../crm/lead/lead-list/lead-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../../../app.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { entActVoucherConfig, entInvAttachments, entInvNotes, entInvStockTransferNote, entUnitPriceForItemParams } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { ItemValueComponent } from '../../../../../app-core/app-template/item-value/item-value.component';
import { SearchItemComponent } from '../../../../search/search-item/search-item.component';
import { ViewPdfComponent } from '../../../../../app-core/template/view-pdf/view-pdf.component';
import { FilterAndSortPipe } from '../../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { AccoutsStatusTableComponent } from '../../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-stock-transfer-note-detail',
  standalone: true,
  imports: [
    CdkAccordionModule,
    NgClass,
    AccordionModule,
    JsonPipe,
    Row,
    ViewLabel,
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
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
    DropZoneComponent,
    ItemValueComponent,
    SearchItemComponent,
    FilterAndSortPipe,
    AccoutsStatusTableComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './stock-transfer-note-detail.component.html',
  styleUrl: './stock-transfer-note-detail.component.scss'
})
export class StockTransferNoteDetailComponent {

  otherComments: any = '';
  blob: any = [];
  urlLink: any = '';
  id: any = 0;
  urlFileName = '';
  voucherId: any = 0;
  oldDate: any = '';
  mailAmount: any = 0;
  voucherConfigId: any = 0;
  unitPriceValue = 0;
  initialLoad = true;
  isSameBranch = true;
  filterFileName: any;
  stockTransferNote = new entInvStockTransferNote();
  stockTransferNoteRaw = new entInvStockTransferNote();
  stockTransferForNotes = new entInvNotes();
  stockTransferAttachment = new entInvAttachments();
  voucherConfig = new entActVoucherConfig();
  unitPriceForItem = new entUnitPriceForItemParams();
  regionInitialValue: any = '';
  fileType = 'jpg, jpeg, png, tiff, gif, tif ,pdf, xls, doc, pdf, DOCX, ppt, PPTX, sql, txt, csv'

  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('l') lform!: NgForm;
  @ViewChild('a') aform!: NgForm;
  @ViewChild('b') bform!: NgForm;
  @ViewChild('c') cform!: NgForm;
  @ViewChild('x') xform!: NgForm;
  @ViewChild('DocumentsComponent', { static: false }) document!: DocumentsComponent;
  options = {
    type: 'accountsPath',
  };
  errorTrue = false;
  loadingTrue = false;
  selectedTab = 0;
  pageId = 'AJVSC';
  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/   vnd.ms-excel, application/pdf, application/msword';
  items: any = ['head', 'ledger', 'debitAmt', 'narration', 'unit', 'total', 'add',];
  notes: any = ['notesDetail', 'createdFullName', 'createdDate', 'add'];
  notesName: any = ['Notes', 'Created By', 'Date | Time', ''];
  attachment: any = ['sno', 'fileName', 'attachmentType', 'attachmentSize', 'action'];
  attachmentsName: any = ['', 'File Name', 'File Format', 'Size', ''];
  itemsName: any = [
    '#',
    '',
    'Unit Type',

    'Narration',
    '',
    '',
    ''
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
  tableItemData = [
    {
      'sno': '',
      'ledger': '',
      'debitAmt': '',
      'creditAmt': '',
      'narration': '',
      'unit': '',
      'total': '',
      'add': '',
    },

  ];
  addNewItemLst() {
    const obj = {
      sno: '',
      ledger: '',
      debitAmt: '',
      creditAmt: '',
      narration: '',
      unit: '',
      total: '',
      add: '',
    }

    this.tableItemData.push(obj)
  }
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

  }


  ngOnInit(): void {
    this.init();
  }

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params.data;
    this.voucherConfigId = params.data1;
    this.regionInitialValue = 'REGI1';
    await this.data.checkToken();
    if (this.id === 0) {
      this.createNewStockTransferNote(this.voucherConfigId);
    } else {
      this.openStockTransferNote(this.id);
    }
    await this.initialData.getAcccountsDDL('getStockTransferNoteInitialData', this.options);
  }

  createNewStockTransferNote(val: any) {
    const obj = {
      data: val,
      data1: this.regionInitialValue
    };
    this.accountsService
      .createNewStockTransferNote(obj, this.options)
      .subscribe((success) => {
        this.stockTransferNote = success;
        this.oldDate = success.documentDate;
        this.voucherId = success.actVoucherConfigId;
        this.initialLoad = false;
        this.errorTrue = false;
      });
  }
  openStockTransferNote(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .openStockTransferNote(obj, this.options)
      .subscribe((success) => {
        this.stockTransferNote = success;
        this.getVoucherDetail(this.stockTransferNote.actVoucherConfigId !== 0 ? this.stockTransferNote.actVoucherConfigId : this.voucherConfigId);
        this.oldDate = success.documentDate;
        this.voucherId = success.actVoucherConfigId;
        if (success.msg.infoMessage.msgDescription) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        }
        this.initialLoad = false;
      });
  }
  notesClear() {
    this.errorTrue = false;
    this.createNewNotes();
  }
  saveStockTransferNoteNotess() {
    if (this.xform.valid) {
      if (this.lform.valid) {
        if (
          this.stockTransferNote.lstentInvStockTransferNoteItem.length !== 0
        ) {
          this.stockTransferForNotes.lstDDLClass = [];
          this.stockTransferForNotes.referenceId = this.id;
          this.stockTransferNote.ientInvNotes = this.stockTransferForNotes;
          this.errorTrue = false;
          this.accountsService
            .saveStockTransferNoteNotess(
              this.stockTransferNote,
              this.options
            )
            .subscribe((success) => {
              this.stockTransferNote = success;
              this.initialLoad = false;
              this.dialog.closeDialog();
            });
        } else {
          this.errorTrue = true;
          this.data.errorInfoMessage('Please add any items');
        }
      } else {
        this.errorTrue = true;
        this.data.errorInfoMessage('Please fill all mandatory fields');
      }
    } else {
      this.errorTrue = true;
    }
  }
  directApproved() {
    this.stockTransferNote.ientActVoucherConfig.isDirectApproval === 'Y'
      ? (this.stockTransferForNotes.statusValue = 'APROV')
      : this.stockTransferNote.statusValue === 'PENAP'
        ? (this.stockTransferForNotes.statusValue = 'APROV')
        : (this.stockTransferForNotes.statusValue = 'PENAP');
    if (this.lform.valid) {
      if (
        this.aform.valid &&
        this.stockTransferNote.lstentInvStockTransferNoteItem.length !== 0
      ) {
        this.stockTransferForNotes.referenceId = this.id;
        this.stockTransferForNotes.lstDDLClass = [];
        this.stockTransferNote.ientInvNotes = this.stockTransferForNotes;
        this.loadingTrue = true;
        this.accountsService
          .saveStockTransferNoteNotess(this.stockTransferNote, this.options)
          .pipe(
            finalize(() => {
              this.loadingTrue = false;
            })
          )
          .subscribe((success) => {
            this.stockTransferNote = success;
            this.voucherId = success.actVoucherConfigId;
            this.initialLoad = false;
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

  saveStockTransferNote() {
    if (this.aform.valid && this.lform.valid) {
      if (this.stockTransferNote.lstentInvStockTransferNoteItem.length !== 0) {
        if (this.isSameBranch) {
          this.accountsService
            .saveStockTransferNote(this.stockTransferNote, this.options)
            .subscribe(async (success) => {
              this.stockTransferNote = success;
              if (success.msg.infoMessage.msgDescription) {
                this.data.successMessage(
                  success.msg.infoMessage.msgDescription
                );
              }
              const obj = {
                data: success.invStockTransferNoteId,
                data1: 0,
              };
              let urlJson = await this.url.encode(obj);
              this.router.navigateByUrl(
                '/home/inventory/stock/stock-transfer-note/detail/' + urlJson
              );
              this.initialLoad = false;
            });
        } else {
          this.data.errorInfoMessage('Same branch not allowed');
        }
      } else {
        this.errorTrue = true;
        this.data.errorInfoMessage('Please add any items');
      }
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }
  doClear() {
    this.errorTrue = false;
    this.createNewStockTransferNote(this.voucherConfigId);
  }

  getVoucherDetail(element: any) {
    const obj = {
      data: element,
    };
    this.accountsService
      .getVoucherAccess(obj, this.options)
      .subscribe((success) => {
        this.voucherConfigId = success.actVoucherConfigId;
        this.voucherConfig = success;
      });
  }
  createNewStockTransferNoteItem() {
    this.accountsService
      .createNewStockTransferNoteItem(this.options)
      .subscribe((success) => {
        this.stockTransferNote.lstentInvStockTransferNoteItem.push(
          JSON.parse(JSON.stringify(success))
        );
        this.initialLoad = false;
      });
  }


  async openDialogNotes() {
    this.createNewNotes();
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',
    });
  }
  createNewNotes() {
    this.errorTrue = false;
    const obj = {
      data: this.stockTransferNote.actVoucherConfigId,
      data1: this.stockTransferNote.statusValue,
    };
    this.accountsService
      .createNewInvNotes(obj, this.options)
      .subscribe((success) => {
        this.stockTransferForNotes = success;
        this.stockTransferForNotes.temporaryDocumentDate =
          this.stockTransferNote.documentDate;
        this.initialData.DDLValues.DDLFlowStatus =
          success.lstDDLClass;
        this.initialLoad = false;
      });
  }
  async createNewAttachment() {

    let dialogResponse: any = await this.dialog.openDialog(this.attachmentDialog, {
      disableClose: true,
      height: 'auto',
      width: '100%',
      maxWidth: '1170px',
    })

  }
  hideBtnBasedonStatus() {
    let hideButton = false;
    if (
      this.stockTransferNote.statusValue === 'APROV' ||
      this.stockTransferNote.statusValue === 'CANCL' ||
      this.stockTransferNote.statusValue === 'PENAP'
    ) {
      hideButton = true;
    } else {
      hideButton = false;
    }

    return hideButton;
  }
  toCompanyValidate(val: any) {
    const index = this.initialData.DDLValues.DDLBranch.map(
      (e: any) => e.id
    ).indexOf(val);

    if (index !== -1) {
      if (
        this.stockTransferNote.ientActCompanyBranch.branchName ===
        this.initialData.DDLValues.DDLBranch[index].name
      ) {
        this.isSameBranch = false;
      } else {
        this.isSameBranch = true;
      }
    }
  }
  async documentDateChanged() {
    let isDateChange = await this.dialog.confirmDialog("The existing unit price will be changed! Are you sure to change the Document Date");
    if (isDateChange) {
      if (this.stockTransferNote.lstentInvStockTransferNoteItem.length !== 0 && this.stockTransferNote.lstentInvStockTransferNoteItem[0].ientInvItems.invItemId !== 0) {
        for (
          let i = 0;
          i < this.stockTransferNote.lstentInvStockTransferNoteItem.length;
          i++
        ) {
          let forBranch;
          forBranch = 'Y';
          this.getUnitPriceForItem(
            forBranch,
            this.stockTransferNote.lstentInvStockTransferNoteItem[i].itemId,
            i
          );
        }
      } else {
        this.errorTrue = true;
        this.data.errorInfoMessage('Please add any items');
        this.stockTransferNote.documentDate = this.oldDate;
      }
    } else {
      this.stockTransferNote.documentDate = this.oldDate;
    }

  }
  addRow() {
    this.createNewStockTransferNoteItem();
  }
  doItemSearch(event: any, items: any, index: any) {
    this.stockTransferNote.lstentInvStockTransferNoteItem[index].ientInvItems.invItemId = event.invItemId;
    this.stockTransferNote.lstentInvStockTransferNoteItem[index].ientInvItems.itemCode = event.itemCode;
    this.stockTransferNote.lstentInvStockTransferNoteItem[index].ientInvItems.itemName = event.itemName;
    this.getItemBasedValues(event, index);
  }
  getItemBasedValues(event: any, index: any) {
    const obj = {
      data1: this.stockTransferNote.actVoucherConfigId,
      data2: event.invItemId,
    };
    this.accountsService
      .getItemBasedValuesForStockTransferNoteItem(obj, this.options)
      .subscribe((success) => {
        this.stockTransferNote.lstentInvStockTransferNoteItem[index] = success;
        let forBranch = 'Y';
        this.getUnitPriceForItem(forBranch, this.stockTransferNote.lstentInvStockTransferNoteItem[index].itemId, index);
        this.initialLoad = false;
      });
  }
  getUnitPriceForItem(val: any, id: any, index: any) {
    if (id !== 0) {
      this.unitPriceForItem.date = this.stockTransferNote.documentDate;
      this.unitPriceForItem.forBranch = val;
      this.unitPriceForItem.itemId = id;
      this.accountsService
        .getUnitPriceForItem(this.unitPriceForItem, this.options)
        .subscribe((success) => {
          if (success.data !== 0) {
            this.unitPriceValue = success.data;
            this.stockTransferNote.lstentInvStockTransferNoteItem[
              index
            ].unitPrice = this.setTwoNumberDecimal(this.unitPriceValue);
            let quantity = 0;
            this.stockTransferNote.lstentInvStockTransferNoteItem[
              index
            ].totalAmount = this.setTwoNumberDecimal(
              this.unitPriceValue * quantity
            );
          } else {
            this.stockTransferNote.lstentInvStockTransferNoteItem[
              index
            ].totalAmount = 0;
            this.stockTransferNote.lstentInvStockTransferNoteItem[
              index
            ].unitPrice = 0;
          }
          this.initialLoad = false;
        });
    }
  }
  setTwoNumberDecimal(value: any) {
    value = parseFloat(value).toFixed(2);
    return value;
  }
  async itemsDelete(val: any, index: any) {
    let response = await this.dialog.checkDelete('you want to delete this Item');
    if (response) {
      if (val.invStockTransferNoteItemId !== 0) {
        this.deleteStockTranferNoteItem(val.invStockTransferNoteItemId, index);
      } else {
        this.stockTransferNote.lstentInvStockTransferNoteItem.splice(
          index,
          1
        );
        this.data.successMessage('Item removed successfully');
      }
    }
  }
  deleteStockTranferNoteItem(val: any, i: any) {
    ;
    this.stockTransferNote.lstentInvStockTransferNoteItem[i].deletedFlag = 'Y';
    this.accountsService
      .deleteStockTranferNoteItem(this.stockTransferNote, this.options)
      .subscribe((success) => {
        this.stockTransferNote = success;
        this.initialLoad = false;
      });
  }

  viewInvStockTransferNoteReceipt() {
    this.urlLink = '';
    this.sendMailTotalAmount();
    if (this.id !== 0) {
      const obj = {
        data: this.id,
        data1: this.stockTransferNote.ientActVoucherConfig.pdfOtherComments,
      };
      this.data
        .postPDFData2(
          'ITGAccounts/ViewInvStockTransferNoteReceipt',
          obj,
          this.options
        )
        .subscribe((success: any) => {
          let contentDisposition = success.headers.get('content-disposition');
          let filename = contentDisposition
            .split(';')[1]
            .split('filename')[1]
            .split('=')[1]
            .trim();
          const resp = new Blob([success.body], { type: 'application/pdf' });
          this.blob = resp;
          const fileURL = URL.createObjectURL(resp);

          this.urlFileName = filename;
          this.urlLink = fileURL;
        });
    }
  }
  sendMailTotalAmount() {
    this.mailAmount = 0;
    return new Promise((resolve) => {
      if (this.stockTransferNote.lstentInvStockTransferNoteItem.length !== 0) {
        for (
          let i = 0;
          i < this.stockTransferNote.lstentInvStockTransferNoteItem.length;
          i++
        ) {
          this.mailAmount = this.setTwoNumberDecimal(
            parseFloat(
              this.stockTransferNote.lstentInvStockTransferNoteItem[i]
                .totalPrice
            ) + parseFloat(this.mailAmount)
          );
        }
        return;
      }
    });
  }
  async uploadAttachemnt(event: any) {

    this.stockTransferAttachment.referenceId = this.id;
    let attachmentList: any = [];
    attachmentList = event;
    for (let i = 0; i < attachmentList.length; i++) {
      if (attachmentList.length !== 0) {
        this.stockTransferAttachment.attachmentSize =
          attachmentList[i].fileSize;
        this.stockTransferAttachment.attachmentFileName =
          attachmentList[i].fileName;
        this.stockTransferAttachment.istringFileContent =
          attachmentList[i].content;
        this.stockTransferAttachment.attachmentType =
          attachmentList[i].fileType;
        let uploadDocument = await this.uploadDocument();
      }
    }
  }
  uploadDocument() {
    return new Promise((resolve: any) => {
      this.accountsService
        .uploadStockTraansferNote(this.stockTransferAttachment, this.options)
        .subscribe((success) => {

          this.stockTransferNote.lstentInvAttachments =
            success.plstentInvAttachments;
          this.initialLoad = false;
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

  onSelectTab(val: any) {
    this.selectedTab = val;
    if (val === 3) {
      this.viewInvStockTransferNoteReceipt();
    }
  }
  navigateToList() {
    this.router.navigateByUrl('/home/inventory/stock/stock-transfer-note/search');
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  async changeReversal() {
    if (this.stockTransferForNotes.temporaryDocumentDate !== '') {
      let isReversal = await this.dialog.confirmDialog("Do you want to cancel this " + this.stockTransferNote.statusDescription + " transaction");
      if (isReversal) {
        this.saveStockTransferNoteNotess();
      }
    }
  }
  saveNotes() {

  }

  clearNotes() {

  }

}
