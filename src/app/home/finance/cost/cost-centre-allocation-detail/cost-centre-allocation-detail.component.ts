import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass, JsonPipe, SlicePipe } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TabContainerModule } from '../../../../app-core/app-template/tab-container/tab-container.module';
import { TabItemModule } from '../../../../app-core/app-template/tab-item/tab-item.module';
import { Row, ViewLabel, InnerScroll, AppToolTipComponent } from '../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { AddressEditComponent } from '../../../../app-core/template/address-edit/address-edit.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { DocumentsComponent } from '../../../../app-core/template/documents/documents.component';
import { DropZoneComponent } from '../../../../app-core/template/drop-zone/drop-zone.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { MultiPageUrlComponent } from '../../../../app-core/template/multi-page-url/multi-page-url.component';
import { StatusHistoryComponent } from '../../../../app-core/template/status-history/status-history.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { CustomerServiceListComponent } from '../../../crm/customer-service/customer-service-list/customer-service-list.component';
import { CustomerUpdateListComponent } from '../../../crm/customer-update/customer-update-list/customer-update-list.component';
import { LeadListComponent } from '../../../crm/lead/lead-list/lead-list.component';
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
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
@Component({
  selector: 'app-cost-centre-allocation-detail',
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
    AppAccessDirective,
    ButtonAccessDirective,
    AccoutsStatusTableComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './cost-centre-allocation-detail.component.html',
  styleUrl: './cost-centre-allocation-detail.component.scss'
})
export class CostCentreAllocationDetailComponent implements OnInit, AfterViewInit {
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

  pageId = 'TAX';

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
      // this.init();
    });
  }
  ngOnInit() {
    this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  async init() {
    await this.data.checkToken();
    this.appService.setBreadCrumb(this.breadCrumb);
    let paramsId: any = this.route.snapshot.paramMap.get('id');
    this.id = await this.url.decode(paramsId);
    this.initialData.getAcccountsDDL('getTaxInitialData', this.options);
    if (this.id > 0) {
      // this.openTaxDetail();
    } else {
      // this.createNewTax();
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
      this.tableAttachmentData = success.ilstentFinAttachments;

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
  async openDialogNotes() {
    // this.createNewTaxNote(0);
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: 'auto',
      width: '470px',
      maxWidth: '1170px',
    });
  }
  onSelectTab(val: any) {
    this.selectedTab = val;
  }
  navigateToList() {
    this.router.navigateByUrl('/home/finance/cost/cost-centre-allocation/search');
  }
  saveTax() {

  }
  saveAccountsTaxNotes() {

  }
  createNewTaxNote(val: any) {

  }
  createNewAllocation() {

  }
}
