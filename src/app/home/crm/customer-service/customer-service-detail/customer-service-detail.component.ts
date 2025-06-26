import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass, JsonPipe } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { AppToolTipComponent, Row, ViewLabel } from '../../../../app-core/core-component/core-component.component';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../app-core/template/app-table/app-table.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { FormsModule, NgForm } from '@angular/forms';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { entCustomer, entCustomerService, entCustomerServiceStatusHistoryList } from '../../../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../../common/services/data/data.service';
import { CoreService } from '../../../../app-core/service/core.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { LeadListComponent } from '../../lead/lead-list/lead-list.component';
import { CustomerServiceFormComponent } from '../customer-service-form/customer-service-form.component';
import { StatusHistoryComponent } from '../../../../app-core/template/status-history/status-history.component';
import { AppDatePipe } from "../../../../common/pipes/app-date/app-date.pipe";
import { MultiPageUrlComponent } from '../../../../app-core/template/multi-page-url/multi-page-url.component';
import { AppService } from '../../../../app.service';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { EmailHistoryFormComponent } from '../../email-history-form/email-history-form.component';
import { DocumentsComponent } from '../../../../app-core/template/documents/documents.component';


@Component({
  selector: 'app-customer-service-detail',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './customer-service-detail.component.html',
  styleUrl: './customer-service-detail.component.scss',
  imports: [CdkAccordionModule, NgClass, AccordionModule, JsonPipe, Row, ViewLabel, AppTableComponent, CellDefDirective, CellHeaderDefDirective, FormsModule, InputControlComponent, IconButtonComponent, LeadListComponent, StatusHistoryComponent, AppDatePipe, MultiPageUrlComponent, ErrorMessageComponent, AppAccessDirective, ButtonAccessDirective, AppToolTipComponent, DocumentsComponent]
})
export class CustomerServiceDetailComponent implements AfterViewInit {
  pageId = 'CUSEV'
  options = {
    hideFullSpinner: true
  }
  id = {
    currentIndex: 0,
    array: []
  };
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  customerServiceId = 0;
  customerDetails = new entCustomer()
  customerService = new entCustomerService();
  customerServiceNotes = new entCustomerService();
  statusHistoryDataSource: any = [];

  saveServiceInfoBtn = false;
  loader = false;
  // openAccordian = true
  showStatusHistory = false
  showEmailHistory = false
  accordianOpen = false
  serviceNotes = '';
  errorTrue = false
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  };
  customerServiceDocumentList: any = []
  serviceInfoEdit = false

  emailColumns: any = ["toEmailId", "sentDate", "sentStatusDescription", "action"];
  emailColumnsName: any = ["To", " Date | Time", "Status", "Action"];
  emailHistoryTableData: any = [];
  @ViewChild('x') xform!: NgForm

  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public apiService: ApplicationApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public url: UrlService,
    public router: Router,
    public appService: AppService
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
      this.appService.helpFile = "Customer%20Service%20Detail.docx.pdf"
    });
  }

  ngOnInit(): void {
    // this.init()
  }

  async init() {

    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params;
    this.customerServiceId = this.id.array[this.id.currentIndex];
    console.log(this.id);
    await this.data.checkToken();
    this.appService.setBreadCrumb(this.breadCrumb);
    this.openCustomerService();
    await this.initialData.getDDL('getInitialDataForCustomerService', this.options);
    await this.getStatusHistoryList()
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  openCustomerService() {
    const obj = {
      data: this.customerServiceId
    }
    this.apiService.openCustomerService(obj).subscribe((success) => {
      this.serviceInfoEdit = false
      this.customerService = success;
      this.customerServiceNotes = success;
      this.serviceNotes = success.serviceNote;

      this.data.successMessage(success.msg.infoMessage.msgDescription);
      this.getStatusHistoryList();

      this.getCustomerServiceHistoryList();
      this.getDocumentList();
      this.getEmailHistory();
      // this.openCustomerBasedOnRefNo(success.customerServiceId)
      if (success.customerId) {
        this.openCustomerBasedOnRefNo(success.customerId)
      }
    })
  }


  getStatusHistoryList() {
    const obj = {
      data: this.customerServiceId
    }
    this.apiService.getListOfStatusHistoryByCustomerServiceId(obj).subscribe((success => {
      this.statusHistoryDataSource = success.listentCustomerServiceStatusHistory
    }))
  }
  openCustomerBasedOnRefNo(id: any) {
    const obj = {
      data: id
    }
    this.apiService.openCustomer(obj).subscribe((success) => {
      this.customerDetails = success
    })
  }

  clearNotes() {
    this.data.successMessage('Data Cleared Successfully')
    this.serviceNotes = ''
    this.errorTrue = false;
  }

  saveNotes(n: any) {
    this.customerServiceNotes.serviceNote = this.serviceNotes
    if (n.valid) {
      this.apiService.saveCustomerService(this.customerServiceNotes).subscribe((success) => {
        this.customerServiceNotes = success;
        this.customerService = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
      // this.editInfo = false;
      this.saveServiceInfoBtn = false
      this.customerService.notesFlag = 'true';
      this.getStatusHistoryList()
    }
    else {
      this.errorTrue = true;
    }
  }
  refreshServiceNotes() {
    this.serviceNotes = this.customerServiceNotes.serviceNote
    this.errorTrue = false
    const obj = {
      data: this.customerServiceId
    }
    this.apiService.openCustomerService(obj).subscribe((success) => {
      this.serviceNotes = success.serviceNote;
      this.data.successMessage(success.msg.infoMessage.msgDescription);

    })
  }
  async editDetails() {
    this.serviceInfoEdit = true

    // })
  }

  saveServiceInfoDetails() {
    if (this.xform.valid) {
      this.apiService.saveCustomerService(this.customerService).subscribe((success) => {
        this.serviceInfoEdit = false;
        this.customerService = success;
        this.openCustomerBasedOnRefNo(success.customerId)
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
  }

  //lead
  detailsFetched(event: any) {
    console.log('fetched');
    this.loader = false;
  }

  navigateToList() {
    this.router.navigateByUrl('/home/crm/customer-service')
  }


  async navigateToCustomer() {
    const obj = {
      currentIndex: 0,
      array: [this.customerDetails.customerId]
    }
    let encodeId = await this.url.encode(obj);
    this.router.navigateByUrl('/home/crm/customer/detail/' + encodeId)
  }


  serviceHistoryColumns: any = ["serviceRefNo", "serviceNote", "branchDescription", "servicedByFullname", "statusDescription", "leadCount", "action"]
  serviceHistoryColumnsName: any = ["Customer Service No", "Description", "Branch", "Service By", "Status", "Lead Count", ""];
  tableServiceHistory: any = []
  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }
  bankPageChanged(event: any) {

    // this.customerBank.pageNumber = event.pageNumber;
    // this.customerBank.lstentBank.length = event.pageSize;
  }

  //

  openStatusValue(val: any) {
    console.log(val);

    // if (this.accordianOpen === false) {
    if (val === 1) {
      this.showStatusHistory = true;
      this.showEmailHistory = false;
      this.accordianOpen = true;
    }
    else if (val === 2) {
      this.showEmailHistory = true;
      this.showStatusHistory = false;
      this.accordianOpen = true
    }
    // }
    // else {
    //   this.accordianOpen = false;
    //   this.showEmailHistory = false;
    //   this.showStatusHistory = false;


    // }

  }
  openAccordian(dujuk: any) {
    console.log(dujuk);
    if (dujuk === false) {
      this.accordianOpen = true
      this.showStatusHistory = true;
      this.showEmailHistory = false
    }
    else {
      this.accordianOpen = false;
      this.showStatusHistory = false;
      this.showEmailHistory = false

    }
  }
  getCustomerServiceHistoryList() {
    const obj = {
      data1: this.customerService.customerId,
      data2: this.customerServiceId
    }
    this.apiService.getCustomerServiceHistory(obj).subscribe((success) => {
      this.tableServiceHistory = success.entCustomerServiceList
    })
  }

  async getChildCustomerServiceHistory(id: any) {
    let obj = {
      currentIndex: 0,
      array: [id]
    }
    let encodeId = await this.url.encode(obj);
    this.router.navigateByUrl('/home/crm/customer-service/detail/' + encodeId);
  }

  getDocumentList() {
    const obj = {
      data: this.customerServiceId
    }
    this.apiService.getListOfDocumentByCustomerServiceId(obj).subscribe((success) => {
      this.customerServiceDocumentList = success.lstentCustomerServiceDocument
    })
  }

  onUpload(file: any, document: any) {
    document.ientFile = file;
    this.apiService.saveCustomerServiceDocument(document).subscribe((success: any) => {
      this.customerServiceDocumentList = success.lstentCustomerServiceDocument;
      this.data.successMessage(success.msg.infoMessage.msgDescription);
    })
  }


  async checkDocumentDelete(docId: any) {

    console.log(docId);

    let msg = `Are you sure, You want to delete this Attachments: ${docId.docTypeDescription}  ?`;
    let response = await this.dialog.checkDelete(msg);
    console.log(response);
    if (response) {

      const obj = {
        data: docId.customerServiceDocumentId
      }
      this.apiService.deleteCustomerServiceDocument(obj).subscribe((success) => {
        this.customerServiceDocumentList = success.lstentCustomerServiceDocument;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      })
    }
  }

  getEmailHistory() {
    const obj = {
      data: this.customerServiceId
    }
    this.apiService.getListOfCommunicationHistoryByCustomerServiceId(obj).subscribe((success) => {
      this.emailHistoryTableData = success.entCustomerServiceCommunicationHistoryList
    })
  }
  async viewEmailDetail(val: any) {
    this.data.showErrorMessage = false
    let dialogResponse: any = await this.dialog.openDialog(EmailHistoryFormComponent, {
      height: '550px',
      width: '100%',
      maxWidth: '1170px',
      data: {
        email: val,
        title: 'Customer Service',
        icon: 'assets/icons/accordian/customer-service.svg'
      }
    });
  }




}
