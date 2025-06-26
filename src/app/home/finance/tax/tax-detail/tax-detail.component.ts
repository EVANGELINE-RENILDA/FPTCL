import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Row, ViewLabel, InnerScroll, AppToolTipComponent } from '../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { DocumentsComponent } from '../../../../app-core/template/documents/documents.component';
import { DropZoneComponent } from '../../../../app-core/template/drop-zone/drop-zone.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { StatusHistoryComponent } from '../../../../app-core/template/status-history/status-history.component';
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
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { entActAttachments, entCompanyTax } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { FileSizePipe } from '../../../../app-core/template/drop-zone/file-size.pipe';
import { FileTypePipe } from '../../../../app-core/template/drop-zone/file-type.pipe';
import { FilterAndSortPipe } from '../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { TaxAttachmentComponent } from './tax-attachment/tax-attachment.component';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';


@Component({
  selector: 'app-tax-detail',
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
    FormsModule,
    InputControlComponent,
    StatusHistoryComponent,
    AppDatePipe,
    AppToolTipComponent,
    CheckboxComponent,
    MatSlideToggleModule,
    FooterToggleDirective,
    MatMenuModule,
    DropZoneComponent,
    FileSizePipe,
    FileTypePipe,
    FilterAndSortPipe,
    DocumentsComponent,
    TaxAttachmentComponent,
    AppAccessDirective,
    ButtonAccessDirective,
    AccoutsStatusTableComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tax-detail.component.html',
  styleUrl: './tax-detail.component.scss'
})
export class TaxDetailComponent {
  taxAttachment = new entActAttachments()
  errorTrue = false;
  errorTrueNotes = false;
  selectedTab = 0;
  filterFileName = '';
  initialLoad = true;
  loadingTrue = false;
  accountsOptions = {
    type: 'accountsPath',
  };
  @ViewChild('DocumentsComponent', { static: false }) document!: DocumentsComponent;
  tableNoteData = [

  ];

  tableAttachmentData = [

  ];

  tableTaxData = [

  ];

  pageId = 'ATXSC';

  notes: any = ['notes', 'add'];
  notesName: any = ['Notes', '',];

  attachment: any = ['fileName', 'attachmentType', 'attachmentSize', 'download', 'view', 'delete', 'action'];
  attachmentsName: any = ['File Name', 'File Format', 'Size', '', '', '', ''];

  taxHistory: any = ['preparedDate', 'approvedDate', 'effectiveDate', 'taxPercentage'];
  taxHistoryName: any = ['Created Date', 'Approved Date', 'Effective Date', 'Percentage'];

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;

  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  id: any = 0;
  companyTax = new entCompanyTax();
  @ViewChild('x') xform!: NgForm
  @ViewChild('y') yform!: NgForm

  notesStatus = []
  options = {
    hideFullSpinner: true,
  };
  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/   vnd.ms-excel, application/pdf, application/msword';

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
    public appSetting: AppSettingsService
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
    this.initialData.getAcccountsDDL('getTaxInitialData', this.options);
    if (this.id > 0) {
      this.openTaxDetail();
    } else {
      this.createNewTax();
    }
  }

  openTaxDetail(id?: any) {
    this.errorTrue = false;
    const obj = {
      data: this.id
    }
    this.accountsService.openTaxDetail(obj).subscribe((success: any) => {
      this.companyTax = success;
      this.tableTaxData = success.ilistentCompanyTaxHistory;
      this.tableNoteData = success.ilstentActNotes;
      this.tableAttachmentData = success.plstentActAttachments;

      if (success.msg.infoMessage) {
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      }
    })
  }
  createNewTax() {
    this.errorTrue = false;
    this.accountsService.createNewTax().subscribe(async (success) => {
      this.companyTax = success;
    })
  }
  createNewTaxNote(val: any) {
    this.errorTrueNotes = false;
    const obj = {
      data: this.companyTax.statusValue
    }
    this.accountsService.createNewTaxNote(obj).subscribe((success) => {
      this.companyTax.pentActNotes = success;
      this.notesStatus = success.lddlData;
    })

  }
  saveAccountsTaxNotes() {
    debugger
    if (this.yform.valid) {
      this.companyTax.pentActNotes.lddlData = []
      this.accountsService.saveAccountsTaxNotes(this.companyTax).subscribe((success) => {
        this.companyTax = success;
        
      this.tableTaxData = success.ilistentCompanyTaxHistory;
      this.tableNoteData = success.ilstentActNotes;
      this.tableAttachmentData = success.plstentActAttachments;

        this.dialog.closeDialog();
      })
    }
    else {
      this.errorTrueNotes = true;
    }

  }
  saveTax() {
    if (this.xform.valid) {
      this.accountsService.saveTax(this.companyTax).subscribe((success) => {
        this.companyTax = success;
        
        this.tableTaxData = success.ilistentCompanyTaxHistory;
        this.tableNoteData = success.ilstentActNotes;
        this.tableAttachmentData = success.plstentActAttachments;
      })
    }
    else {
      this.errorTrue = true;
    }

  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  navigateToList() {
    this.router.navigateByUrl('/home/finance/tax/search');
  }


  onSelectTab(val: any) {
    this.selectedTab = val;
  }


  async openDialogNotes() {
    this.createNewTaxNote(0)
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

  async uploadTaxAttachment(event: any) {
    this.taxAttachment.referenceId = this.id;
    let attachmentList: any = [];
    attachmentList = event;
    for (let i = 0; i < attachmentList.length; i++) {
      if (attachmentList.length !== 0) {
        this.taxAttachment.attachmentSize = attachmentList[i].fileSize;
        this.taxAttachment.attachmentFileName = attachmentList[i].fileName;
        this.taxAttachment.istringFileContent = attachmentList[i].content;
        this.taxAttachment.attachmentType = attachmentList[i].fileType;
        let uploadDocument = await this.uploadDocument();
      }
    }
  }
  uploadDocument() {
    return new Promise((resolve: any) => {
      this.accountsService
        .uploadTaxAttachment(this.taxAttachment, this.options)
        .subscribe((success) => {
          this.tableAttachmentData = success.plstentActAttachments;
          this.initialLoad = false;
          // this.overlay.detachOverlay();
          resolve(true);
        });
    });
  }
  downloadTaxAttachment(val: any) {
    this.loadingTrue = true;
    const obj = {
      data: val.actAttachmentsId,
    };
    this.data
      .postPDFData('Finance/UploadTaxAttachment', obj, this.options)
      .subscribe((success) => {

        const resp = new Blob([success], { type: success.type });
        const fileUrl = URL.createObjectURL(resp);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileUrl;
        downloadLink.download = val.attachmentFileName;
        downloadLink.click();
      });
  }
  downloadDocumentImage(val: any) {
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
      this.accountsService.deleteAccountAttachmentFile(obj, this.accountsOptions).subscribe((success) => {
        this.tableAttachmentData = success.plstentActAttachments
      })
    }
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
  saveNotes() {

  }

  clearNotes() {

  }

  dialogClose() {
    this.dialog.closeAll();
  }

  getAttachementData(event: any) {
    this.companyTax.ilstentFinAttachments = event.ilstentFinAttachments
  }
  taxCodeChanged(val: any) {
    if (this.initialData.DDLValues.ddlTaxLabel.length !== 0) {
      for (
        let i = 0;
        i < this.initialData.DDLValues.ddlTaxLabel.length;
        i++
      ) {
        if (this.initialData.DDLValues.ddlTaxLabel[i].constant === val) {
          this.companyTax.taxName =
            this.initialData.DDLValues.ddlTaxLabel[i].name;
        }
      }
    }
  }
  navigateToAccount(){
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
}
