import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass, JsonPipe, SlicePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TabContainerModule } from '../../../../../app-core/app-template/tab-container/tab-container.module';
import { TabItemModule } from '../../../../../app-core/app-template/tab-item/tab-item.module';
import { Row, ViewLabel, InnerScroll, AppToolTipComponent } from '../../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../../app-core/message/error-message/error-message.component';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { AddressEditComponent } from '../../../../../app-core/template/address-edit/address-edit.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';
import { DocumentsComponent } from '../../../../../app-core/template/documents/documents.component';
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
import { AppService } from '../../../../../app.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { entActVoucherConfig, entInvAttachments, entInvNotes, entInvProductionNote, entUnitPriceForItemParams } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { ItemValueComponent } from '../../../../../app-core/app-template/item-value/item-value.component';
import { SearchItemComponent } from '../../../../search/search-item/search-item.component';
import { ViewPdfComponent } from '../../../../../app-core/template/view-pdf/view-pdf.component';
import { FilterAndSortPipe } from '../../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { AccoutsStatusTableComponent } from '../../../../../app-core/template/accouts-status-table/accouts-status-table.component';

@Component({
  selector: 'app-producton-note-detail',
  standalone: true,
  imports: [
    NgClass,
    Row,
    ViewLabel,
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    IconButtonComponent,
    CustomerUpdateListComponent,
    InnerScroll,
    FormsModule,
    InputControlComponent,
    AppDatePipe,
    MatSlideToggleModule,
    DocumentsComponent,
    ErrorMessageComponent,
    AppAccessDirective,
    ButtonAccessDirective,
    AppToolTipComponent,
    CheckboxComponent,
    FooterToggleDirective,
    MatMenuModule,
    DropZoneComponent,
    ItemValueComponent,
    SearchItemComponent,
    FilterAndSortPipe,
    AccoutsStatusTableComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './producton-note-detail.component.html',
  styleUrl: './producton-note-detail.component.scss'
})
export class ProductonNoteDetailComponent {
  voucherId: any = 0;
  voucherConfigId: any = 0;
  regionInitialValue: any = '';
  id: any = 0;
  filterFileName = '';
  urlFileName = '';
  urlLink = '';
  blob: any = '';
  loadingTrue = false;
  selectedIndex = 0;
  productionNote = new entInvProductionNote();
  voucherConfig = new entActVoucherConfig();
  productionNoteRAW = new entInvProductionNote();
  productionNoteForNotes = new entInvNotes();
  productionAttachment = new entInvAttachments();
  unitPriceForItem = new entUnitPriceForItemParams();
  unitPriceValue = 0;
  oldDate: any = '';
  initialLoad = true;

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;
  @ViewChild('l') lform!: NgForm;
  @ViewChild('a') aform!: NgForm;
  @ViewChild('b') bform!: NgForm;
  @ViewChild('c') cform!: NgForm;
  @ViewChild('x') xform!: NgForm;
  @ViewChild('DocumentsComponent', { static: false }) document!: DocumentsComponent;
  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/   vnd.ms-excel, application/pdf, application/msword';
  fileType = 'jpg, jpeg, png, tiff, gif, tif ,pdf, xls, doc, pdf, DOCX, ppt, PPTX, sql, txt, csv'
  errorTrue = false;
  selectedTab = 0;
  items: any = ['', 'ledger', 'debitAmt', 'creditAmt', 'narration', 'unit', '', 'total', '', 'add',];
  pageId = 'AJVSC';
  notes: any = ['notesDetail', 'createdFullName', 'createdDate', 'add'];
  notesName: any = ['Notes', 'Created By', 'Date | Time', ''];
  attachment: any = ['sno', 'fileName', 'attachmentType', 'attachmentSize', 'action'];
  attachmentsName: any = ['', 'File Name', 'File Format', 'Size', ''];
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
  itemsName: any = [
    '#',
    '',
    'Unit Type',
    'Credit Amount',
    '',
    // 'Narration',
    'Consumption Qty',
    'Production Qty',
    '',
    '',
    ''
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
  options = {
    type: 'accountsPath',
  };
  constructor(public route: ActivatedRoute,
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
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  ngOnInit(): void {
    this.init();
  }

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params.data;
    this.voucherConfigId = params.data1;
    this.regionInitialValue = params.data2;
    await this.data.checkToken();
    if (this.id === 0) {
      this.createNewProdcutionNote(this.voucherConfigId);
    } else {
      this.openProductionNote(this.id);
    }
    await this.initialData.getAcccountsDDL('getProductionNoteIntilizseData', this.options);
  }

  createNewProdcutionNote(val: any) {
    const obj = {
      data: val,
      data1: this.regionInitialValue
    };
    this.accountsService
      .createNewProdcutionNote(obj, this.options)
      .subscribe((success) => {
        this.productionNote = success;
        this.voucherId = success.actVoucherConfigId;
        this.oldDate = success.documentDate;
        this.initialLoad = false;
        this.errorTrue = false;
      });
  }

  openProductionNote(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .openProductionNote(obj, this.options)
      .subscribe((success) => {
        this.productionNote = success;
        this.voucherId = success.actVoucherConfigId;
        this.getVoucherDetail(this.productionNote.actVoucherConfigId !== 0 ? this.productionNote.actVoucherConfigId : this.voucherConfigId);
        this.oldDate = success.documentDate;
        this.voucherConfigId = success.actVoucherConfigId;
        if (success.msg.infoMessage.msgDescription) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        }
        this.initialLoad = false;
      });
  }

  saveProductionNote() {
    if (this.aform.valid && this.cform.valid) {
      if (
        this.productionNote.ilistentInvProductionNoteItem.length !== 0
      ) {
        this.accountsService
          .saveProductionNote(this.productionNote, this.options)
          .subscribe(async (success) => {
            this.productionNote = success;
            if (success.msg.infoMessage.msgDescription) {
              this.data.successMessage(success.msg.infoMessage.msgDescription);
            }
            const obj = {
              data: success.appInvProductionNoteId,
              data1: 0,
            };
            let urlJson = await this.url.encode(obj);
            this.router.navigateByUrl(
              '/home/inventory/stock/production-note/detail/' + urlJson
            );
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
  directApproved() {
    this.productionNote.ientActVoucherConfig.isDirectApproval === 'Y'
      ? (this.productionNoteForNotes.statusValue = 'APROV')
      : this.productionNote.statusValue === 'PENAP'
        ? (this.productionNoteForNotes.statusValue = 'APROV')
        : (this.productionNoteForNotes.statusValue = 'PENAP');
    if (this.cform.valid) {
      if (
        this.aform.valid &&
        this.productionNote.ilistentInvProductionNoteItem.length !== 0
      ) {
        this.productionNoteForNotes.lstDDLClass = [];
        this.productionNoteForNotes.referenceId = this.id;
        this.productionNote.pentInvNotes = this.productionNoteForNotes;
        this.errorTrue = false;
        this.accountsService
          .saveProductionNoteNotes(this.productionNote, this.options)
          .subscribe((success) => {
            this.productionNote = success;
            this.voucherId = success.actVoucherConfigId;
            if (success.msg.infoMessage.msgDescription) {
              this.data.successMessage(success.msg.infoMessage.msgDescription);
            }
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

  addRow(index: any) {
    this.addItemForProductionNote(index);
  }
  async itemsDelete(val: any, index: any) {
    let response = await this.dialog.checkDelete('you want to delete this Itemsubtype');
    if (response) {
      if (val.appInvProductionNoteDetailId !== 0) {
        this.deleteProductionNote(val, index);
      } else {
        this.productionNote.ilistentInvProductionNoteItem.splice(index, 1);
        this.data.successMessage('Item Removed Sucessfully');
      }
    }
  }
  deleteProductionNote(val: any, i: any) {
    this.productionNote.ilistentInvProductionNoteItem[i].strDeleteFlag = 'Y';
    this.accountsService
      .deleteProductionNote(this.productionNote, this.options)
      .subscribe((success) => {
        this.productionNote = success;
        this.initialLoad = false;
      });
  }

  addItemForProductionNote(index: any) {
    this.accountsService
      .addItemForProductionNote(this.options)
      .subscribe((success) => {
        this.productionNote.ilistentInvProductionNoteItem.push(success);
        // this.showItemTable = false;
        // this.productionNote.ilistentInvProductionNoteItem.splice(
        //   index,
        //   0,
        //   JSON.parse(JSON.stringify(success))
        // );
        // setTimeout(() => {
        //   this.showItemTable = true;
        // }, 100);
        this.initialLoad = false;
      });
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
        // this.regionValueDDL = success.plstentDDLClass
      });
  }

  async documentDateChanged() {

    let isDateChange = await this.dialog.confirmDialog("The existing unit price will be changed! Are you sure to change the Document Date");
    if (isDateChange) {
      if (this.productionNote.ilistentInvProductionNoteItem.length !== 0 && this.productionNote.ilistentInvProductionNoteItem[0].ientInvItems.invItemId !== 0) {
        for (
          let i = 0;
          i < this.productionNote.ilistentInvProductionNoteItem.length;
          i++
        ) {
          let forBranch;
          if (
            this.productionNote.ilistentInvProductionNoteItem[i]
              .consumptionQuantiy !== 0
          ) {
            forBranch = 'Y';
            this.getUnitPriceForItem(
              forBranch,
              this.productionNote.ilistentInvProductionNoteItem[i]
                .appInvItemId,
              i
            );
          } else if (
            this.productionNote.ilistentInvProductionNoteItem[i]
              .productionQuantity !== 0
          ) {
            forBranch = 'N';
            this.getUnitPriceForItem(
              forBranch,
              this.productionNote.ilistentInvProductionNoteItem[i]
                .appInvItemId,
              i
            );
          }
        }
      } else {
        this.errorTrue = true;
        this.data.errorInfoMessage('Please add any items');
        this.productionNote.documentDate = this.oldDate;
      }
    } else {
      this.productionNote.documentDate = this.oldDate;
    }
  }
  consumptionQuantiyDisable(val: any) {
    if (!!parseFloat(val)) {
      return true
    } else {
      return false
    }
  }
  getUnitPriceForItem(val: any, id: any, index: any) {
    if (id !== 0) {
      this.unitPriceForItem.date = this.productionNote.documentDate;
      this.unitPriceForItem.forBranch = val;
      this.unitPriceForItem.itemId = id;
      this.accountsService
        .getUnitPriceForItem(this.unitPriceForItem, this.options)
        .subscribe((success) => {
          if (success.data !== 0) {
            this.unitPriceValue = success.data;
            this.productionNote.ilistentInvProductionNoteItem[index].unitPrice =
              this.setTwoNumberDecimal(this.unitPriceValue);
            let quantity = 0;
            if (
              this.productionNote.ilistentInvProductionNoteItem[index]
                .consumptionQuantiy !== 0
            ) {
              quantity =
                this.productionNote.ilistentInvProductionNoteItem[index]
                  .consumptionQuantiy;
            } else if (
              this.productionNote.ilistentInvProductionNoteItem[index]
                .productionQuantity !== 0
            ) {
              quantity =
                this.productionNote.ilistentInvProductionNoteItem[index]
                  .productionQuantity;
            }
            this.productionNote.ilistentInvProductionNoteItem[index].totalAmount =
              this.setTwoNumberDecimal(this.unitPriceValue * quantity);
          } else {
            this.productionNote.ilistentInvProductionNoteItem[
              index
            ].totalAmount = 0;
            this.productionNote.ilistentInvProductionNoteItem[
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
  async changeReversal() {
    if (this.productionNoteForNotes.temporaryDocumentDate !== '') {
      let isReversal = await this.dialog.confirmDialog("Do you want to cancel this " + this.productionNote.statusDescription + " transaction");
      if (isReversal) {
        this.saveProductionNoteNotes()
      }
    }
  }
  notesClear() {
    this.errorTrue = false;
    this.createNewNotes();
  }
  createNewNotes() {
    this.errorTrue = false;
    const obj = {
      data: this.voucherConfigId,
      data1: this.productionNote.statusValue,
    };
    this.accountsService
      .createNewInvNotes(obj, this.options)
      .subscribe((success) => {
        this.productionNoteForNotes = success;
        this.productionNoteForNotes.temporaryDocumentDate =
          this.productionNote.documentDate;
        this.initialData.DDLValues.DDLFlowStatus =
          success.lstDDLClass;
        this.initialLoad = false;
      });
  }

  saveProductionNoteNotes() {
    if (this.xform.valid) {
      if (this.cform.valid) {
        if (this.productionNote.ilistentInvProductionNoteItem.length !== 0) {
          this.productionNoteForNotes.lstDDLClass = [];
          this.productionNoteForNotes.referenceId = this.id;
          this.productionNote.pentInvNotes = this.productionNoteForNotes;
          this.errorTrue = false;
          this.accountsService
            .saveProductionNoteNotes(this.productionNote, this.options)
            .subscribe((success) => {
              this.productionNote = success;
              this.dialog.closeDialog();
              if (success.msg.infoMessage.msgDescription) {
                this.data.successMessage(
                  success.msg.infoMessage.msgDescription
                );
              }
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
    } else {
      this.errorTrue = true;
    }
  }

  async uploadAttachemnt(event: any) {
    this.productionAttachment.referenceId = this.productionNote.appInvProductionNoteId;
    let attachmentList: any = [];
    attachmentList = event;
    for (let i = 0; i < attachmentList.length; i++) {
      if (attachmentList.length !== 0) {
        this.productionAttachment.attachmentSize = attachmentList[i].fileSize;
        this.productionAttachment.attachmentFileName =
          attachmentList[i].fileName;
        this.productionAttachment.istringFileContent =
          attachmentList[i].content;
        this.productionAttachment.attachmentType = attachmentList[i].fileType;
        let uploadDocument = await this.uploadDocument();
      }
    }
  }

  uploadDocument() {
    return new Promise((resolve: any) => {
      this.accountsService
        .uploadProductioNote(this.productionAttachment, this.options)
        .subscribe((success) => {
          this.productionNote.ilistInvAttachments =
            success.plstentInvAttachments;
          this.initialLoad = false;
          // this.overlayService.detachSearchBox();
          resolve(true);
        });
    });
  }

  async openNotes() {
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',
    });
  }
  navigateToList() {
    this.router.navigateByUrl('/home/inventory/stock/production-note/search');
  }
  onSelectTab(val: any) {
    this.selectedTab = val;
  }
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
  async openDialogNotes() {
    this.createNewNotes();
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',
    });
  }

  async createNewAttachment() {
    let dialogResponse: any = await this.dialog.openDialog(this.attachmentDialog, {
      disableClose: true,
      height: 'atuo',
      width: '100%',
      maxWidth: '1170px',
    })

  }
  screenDisabled() {
    let screenDisabled = false;
    if (
      this.productionNote.statusValue === 'APROV' ||
      this.productionNote.statusValue === 'CANCL' ||
      this.productionNote.statusValue === 'PENAP'
    ) {
      screenDisabled = true;
    } else {
      screenDisabled = false;
    }

    return screenDisabled;
  }
  doClear() {
    this.errorTrue = false;
    this.createNewProdcutionNote(this.voucherConfigId);
  }
  viewproductionNoteReceipt() {
    this.loadingTrue = true;
    const obj = {
      data: this.id,
      data1: this.productionNote.ientActVoucherConfig.pdfOtherComments,
    };
    this.data
      .postPDFData2(
        'ITGAccounts/ViewInvProductionNoteReceipt',
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
        // this.blob = success.body;
        const resp = new Blob([success.body], { type: 'application/pdf' });
        this.blob = resp;
        const fileURL = URL.createObjectURL(resp);

        this.urlFileName = filename;
        this.urlLink = fileURL;
        this.loadingTrue = false;
      });
  }
  doItemSearch(event: any, items: any, index: any) {
    this.productionNote.ilistentInvProductionNoteItem[index].ientInvItems.invItemId = event.invItemId;
    this.productionNote.ilistentInvProductionNoteItem[index].ientInvItems.itemCode = event.itemCode;
    this.productionNote.ilistentInvProductionNoteItem[index].ientInvItems.itemName = event.itemName;

    this.getItemBasedValues(event, index);
  }

  getItemBasedValues(val: any, index: any) {
    const obj = {
      data1: this.productionNote.actVoucherConfigId,
      data2: val.invItemId,
    };
    let selectedItem = JSON.parse(
      JSON.stringify(this.productionNote.ilistentInvProductionNoteItem[index])
    );
    this.accountsService
      .getItemBasedValues(obj, this.options)
      .subscribe((success) => {
        this.productionNote.ilistentInvProductionNoteItem[index] = success;
        let forBranch = 'Y';
        this.getUnitPriceForItem(forBranch, this.productionNote.ilistentInvProductionNoteItem[index].appInvItemId, index);
        this.initialLoad = false;
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
}

