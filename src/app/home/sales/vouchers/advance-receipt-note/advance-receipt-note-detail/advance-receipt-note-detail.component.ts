import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef, ViewChild, signal } from '@angular/core';
import { AppService } from '../../../../../app.service';
import { ApplicationApiService } from '../../../../../common/api-services/application-api/application-api.service';
import { NgClass } from '@angular/common';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { MultiPageUrlComponent } from '../../../../../app-core/template/multi-page-url/multi-page-url.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { CoreService } from '../../../../../app-core/service/core.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../../../common/services/url/url.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { entActVoucherConfig, entCheckLineItemBasedonDocumentDate, entGetMailInfo, entSalAdvanceReceiptNote, entSalNotes } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { FormsModule, NgForm } from '@angular/forms';
import { AdvanceReceiptNoteNotesComponent } from '../advance-receipt-note-notes/advance-receipt-note-notes/advance-receipt-note-notes.component';
import { SearchCustomerComponent } from "../../../../search/search-customer/search-customer.component";
import { AdvanceReceiptNoteAttachmentComponent } from '../advance-receipt-note-attachment/advance-receipt-note-attachment/advance-receipt-note-attachment.component';
import { AdvanceReceiptNotePreviewComponent } from '../advance-receipt-note-preview/advance-receipt-note-preview/advance-receipt-note-preview.component';
import { autoSearchItems } from '../../../../purchase/voucher/purchase-invoice/purchase-invoice-detail/purchase-invoice-detail.component';
import { AutoGetItemComponent } from '../../../../search/auto-get-item/auto-get-item.component';
import { GetDatePipe } from '../../../../../common/pipes/app-get-date/get-date.pipe';
import { SplicePipe } from '../../../../../common/pipes/app-splice/splice.pipe';
import { SearchDebitComponent } from '../../../../search/search-debit/search-debit.component';
import { DialogAnimateService } from '../../../../../common/services/dialog-animated/dialog-animate.service';
import { AppSafePipe } from '../../../../../common/pipes/app-safe/app-safe.pipe';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';

@Component({
  selector: 'app-advance-receipt-note-detail',
  standalone: true,
  imports: [MultiPageUrlComponent, Row, ViewLabel, InputControlComponent, IconButtonComponent, AppDatePipe, AppTableComponent, FooterToggleDirective, NgClass, CellDefDirective, CellHeaderDefDirective, CheckboxComponent, SearchComponent, MatMenuModule, DropZoneComponent, FormsModule, AdvanceReceiptNoteNotesComponent, SearchCustomerComponent,AdvanceReceiptNoteAttachmentComponent,AdvanceReceiptNotePreviewComponent, AutoGetItemComponent,InnerScroll, IconButtonComponent,SearchDebitComponent,AppSafePipe],
  templateUrl: './advance-receipt-note-detail.component.html',
  styleUrl: './advance-receipt-note-detail.component.scss',
  providers: [GetDatePipe, SplicePipe],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AdvanceReceiptNoteDetailComponent {
  @ViewChild('mailTemplate', { static: false })
  mailTemplate!: TemplateRef<any>;
  @ViewChild('customertab') customertabform!:NgForm;
  @ViewChild ('itemtab') itemtabform!:NgForm;
  @ViewChild('header') headerform!:NgForm;
  @Input() public name: any = '';
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
base64String: any = '';

  mailInfo = new entGetMailInfo();
  attachmentList: any = [];
  options = {
    type: 'accountsPath',
  };
  advanceReceiptNotes = new entSalAdvanceReceiptNote();
  checkDocumentDate: any = new entCheckLineItemBasedonDocumentDate();
  lstentSalAdvanceReceiptNoteDetailRaw: any = [];
  voucherConfig = new entActVoucherConfig();
  receiptNotes=new entSalNotes();
  autoSearchItems = new autoSearchItems();
  notesddl=[];
  clearVoucherNo = false;
  saleOrderId = 0;
  customerFlag = false;
  customerIdRAW = 0;
  __isDisabled = signal(true);
  voucherid: any = '';
  dateNotEffective = '';
  appActVoucherConfigId: any = 0;
  regionDetailValue: any = '';
  pageId = 'AJVSC';
  infoMore = false;
  selectedTab = 0;
  id: any = 0;
  finalNet: any
  bankAccountNo:any=''
  voucherConfigId: any = 0;
  errorTrue = false;
  errorTrueCus = false;
  regionValueDDL: any = [];
  initialRegionValue: any = '';
  blob = {};
  branchName = ''

  fileUrl = '';
  urlFileName = ''
  accountsoptions = {
    type: 'accountsPath',
  };
  items: any = ['sNo','sales', 'so','adavance', 'balance', 'current', 'delete'];
  branchBankName = '';
  itemsName: any = [
    ' ',
    'Sales',
    'SO Amount ',
    'Advance Received ',
    'Balance Amount To Be Received',
    'Current Receipt Amount',
    'Delete',
  ];
  qutationData =[];

  notes: any = ['sno', 'notes', 'createdBy', 'dateTime', 'add'];
  notesName: any = ['', 'Notes', 'Created By', 'Date | Time', ''];
  accordianOpen = true;
  accordianContent = true;
  tableItemData = [];
  tableNoteData = [];
  tableAttachmentData = [];
  attachment: any = ['sno', 'fileName', 'fileFormat', 'size', 'add'];
  attachmentsName: any = ['#', 'File Name', 'File Format', 'Size', 'add'];

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('notesDialog') notesDialog!: TemplateRef<any>;
  @ViewChild('attachmentDialog') attachmentDialog!: TemplateRef<any>;

  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/msword';

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

constructor(
  public apiService: ApplicationApiService,
  public appService: AppService,
  public data: DataService,
  public dialog: CoreService,
  public router: Router,
  public route: ActivatedRoute,
  public url: UrlService,
  public initialData: InitialDataService,
  public accountsService: AccountsApiService,
  public dialogService : DialogAnimateService,
  public storage:AppStorageService

){
  this.route.paramMap.subscribe((params: any) => {
    this.init();
  });
}
  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    this.appService.setBreadCrumb(this.breadCrumb);
    let params: any = await this.url.decode(id);
    this.id = params.data;
    this.appActVoucherConfigId = params.data1;
    this.regionDetailValue = params.data2;
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getSaleAdvanceReceiptNotesInitialData');
    await this.storage.get('branchFinance').then((val) => {
      this.branchName = val;
    });
     this.getListofBankBasedonBranch();


    if (this.id === 0) {
      this.createNewAdvanceReceiptNotes(this.appActVoucherConfigId, this.regionDetailValue);
    } else {
      this.openAdvanceReceiptNotes(this.id);
    }

  }
  createNewAdvanceReceiptNotes(val: any, val1: any,type?:any) {
    const obj = {
      data: val,
      data1: val1
    };
    this.accountsService.createNewSalesAdvanceReceiptNotes(obj)
      .subscribe((success) => {
        this.advanceReceiptNotes = success;
        this.screenDisabled();
        this.errorTrue = false;
       if(type==='clear'){
        this.data.successMessage('Data Cleared Successfully');
       }
      });
  }
  openAdvanceReceiptNotes(val: any) {
    const obj = {
      data: val,
    };
    this.accountsService
      .openSalesAdvanceReceiptNote(obj)
      .subscribe((success) => {
        this.advanceReceiptNotes = success;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
        this.screenDisabled();
        this.finalNet = Number(this.advanceReceiptNotes.lstentActCurrencyExchangerate[0].reportingCurrencyAmount) * Number(this.advanceReceiptNotes.currencyRate)
        this.updateStatus();
        this.hideBtnBasedonStatus();
        this.bankBranchAc(success.actCompanyBranchBankDetailId);
        this.tableNoteData=success.lstentSalNotes;
        this.tableAttachmentData = success.plstentSalAttachments;
        // this.dateNotEffective = success.documentDate;
        // this.appActVoucherConfigId = success.appActVoucherConfigId;
        // this.updateSequence = success.updateSequence;
        // this.openCustomer(success.ientActCustomerDetails);

      });
  }
  screenDisabled() {
    this.__isDisabled.set(
      this.advanceReceiptNotes.statusValue === 'APROV' ||
        this.advanceReceiptNotes.statusValue === 'CANCL' ||
        this.advanceReceiptNotes.statusValue === 'PENAP'
    );
  }

  async doCustomerSelect(event: any) {
    this.advanceReceiptNotes.actCustomerId = event.actCustomerId;
    this.advanceReceiptNotes.pActCustomerDetails.customerName = event.customerName;

    this.customerFlag = true;
    if (
      this.customerIdRAW !== 0 &&
      this.customerIdRAW !== this.advanceReceiptNotes.actCustomerId
    ) {
      let isCustomerChange = await this.dialog.confirmDialog(
        'Do you want to change vendor, If you change customer then entire data will be clear'
      );
      if (isCustomerChange) {
        let currentDate: any = await this.appService.getCurrentDate();
        this.advanceReceiptNotes.documentDate = currentDate;
        this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail = [];
        this.advanceReceiptNotes.modeValue = '';
        this.advanceReceiptNotes.actCompanyBranchBankDetailId = 0;
        this.branchBankName = '';
        this.advanceReceiptNotes.chequeDate = '';
        this.advanceReceiptNotes.chequeNumber = '';
        this.advanceReceiptNotes.actCustomerId = event.actCustomerId;
      } else {
        this.advanceReceiptNotes.actCustomerId = this.customerIdRAW;
        event.actCustomerId = this.customerIdRAW;
      }
    }
    this.customerIdRAW = this.advanceReceiptNotes.actCustomerId;
    this.openCustomer(event);
  }

  openCustomer(val: any) {
    const obj = {
      data: val.actCustomerId,
      data1: this.regionDetailValue
    };
    this.accountsService.getCustomerDetailsForSearch(obj, this.options)
      .subscribe((success) => {
        this.advanceReceiptNotes.pActCustomerDetails = success;
        this.advanceReceiptNotes.customerLedgerId = success.ientActLedger.actLedgerId;
        this.advanceReceiptNotes.iCustomerActLedger = success.ientActLedger;
        this.advanceReceiptNotes.docCurreny =
          success.currencyCodeValue;
        this.advanceReceiptNotes.reportingCurrencyValue =
          success.currencyCodeValue;
        if (
          this.advanceReceiptNotes.currencyValue === success.currencyCodeValue
        ) {
          this.advanceReceiptNotes.currencyRate = '1';
        }
        if (this.customerFlag) {
          this.documentDateConversioDate();
        }
        this.customerFlag = false;
      });
  }
  documentDateConversioDate() {

    if (
      this.advanceReceiptNotes.documentDate !== '' &&
      this.advanceReceiptNotes.currencyValue !== ''
    ) {
      if (
        this.advanceReceiptNotes.statusValue === 'INPRO' ||
        this.advanceReceiptNotes.statusValue === 'PENAP'
      ) {
        this.checkDocumentDatelist();
        this.accountsService
          .documentDateConversioDate(this.checkDocumentDate, this.options)
          .subscribe(
            (success) => {
              this.dateNotEffective = this.advanceReceiptNotes.documentDate;
              if (
                this.advanceReceiptNotes.currencyValue ===
                this.advanceReceiptNotes.currencyValue
              ) {
                this.advanceReceiptNotes.currencyRate = '1.00000000';
              } else {
                this.advanceReceiptNotes.currencyRate = success.conversionRate;
              }
            },
            (e) => {
              this.advanceReceiptNotes.documentDate = this.dateNotEffective;
            }
          );
      }
    }
  }
  checkDocumentDatelist() {

    let result = '';
    let j = 0;
    if (
      this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail.length !== 0
    ) {
      for (
        let i = 0;
        i < this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail.length;
        i++
      ) {
        if (
          this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail[i]
            .salSalesOrderId !== 0
        ) {
          if (j > 0) {
            result += ',';
          } else {
            j++;
          }
          result +=
            this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail[i]
              .salSalesOrderId;
          ;
          this.voucherid = result;
        }
      }
    }
    this.checkDocumentDate.documentDate = this.advanceReceiptNotes.documentDate;
    this.checkDocumentDate.voucherType =
      this.advanceReceiptNotes.iActVoucherConfig.voucherTypeValue;
    this.checkDocumentDate.voucherIds = this.voucherid;
    this.checkDocumentDate.targetCurrencyValue =
      this.advanceReceiptNotes.pActCustomerDetails.currencyCodeValue;
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
  getNotesValue(val: any) {
    this.advanceReceiptNotes = val;
    this.updateStatus();
    this.hideBtnBasedonStatus();

    // if (val.statusValue === 'APROV') {
    //   this.onSelectTab(3);
    // }
  }
  updateStatus() {
    this.__isDisabled.set(this.advanceReceiptNotes.statusValue !== 'APROV' && this.advanceReceiptNotes.statusValue !== 'CANCL' && this.advanceReceiptNotes.statusValue !== 'PENAP');
  }
  getListofBankBasedonBranch(): Promise<boolean> {
    return new Promise((resolve) => {
      this.accountsService
        .getListofBankBasedonBranch(this.options)
        .subscribe((success: any) => {
          this.initialData.DDLValues.DDLBankBranch =
            success.lstentActCompanyBranchBankDetail;
            this.bankAccountNo=success;
          resolve(true);
        });
    });
  }
  onLedgerSelect(event: any) {
    this.advanceReceiptNotes.cashbookLedgerId = event.actLedgerId;
    this.advanceReceiptNotes.iActLedger.ledgerName = event.ledgerName;
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
          this.advanceReceiptNotes.ientActCompanyBranchBankDetail = this.initialData.DDLValues.DDLBankBranch[i];
          this.branchBankName =
            this.initialData.DDLValues.DDLBankBranch[i]
              .bankName +
            '/' +
            this.initialData.DDLValues.DDLBankBranch[i]
              .bankAccountNo;
        }
      }
    }
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
          '/home/sales/advance-receipt-note/detail/' + urlJson
        );
      } else {
        this.data.errorInfoMessage('Please Select Document Name');
      }
    } else {
      this.errorTrue = true;
    }
  }
  hideBtnBasedonStatus() {
    let hideButton;
    if (
      this.advanceReceiptNotes.statusValue === 'APROV' ||
      this.advanceReceiptNotes.statusValue === 'CANCL'
    ) {
      hideButton = true;
    } else {
      hideButton = false;
    }

    return hideButton;
  }

  // async doCustomerSelect(event: any) {

  //   this.advanceReceiptNotes.pActCustomerDetails.customerName = event.customerName;
  //   this.advanceReceiptNotes.actCustomerId = event.actCustomerId;
  //   this.customerFlag = true;
  //   if (this.customerIdRAW !== 0 && (this.customerIdRAW !== this.advanceReceiptNotes.actCustomerId)) {
  //     let isCustomerChange = await this.alert.partyAlert("Do you want to change customer, If you change customer then entire data will be clear");
  //     if (isCustomerChange) {
  //       let currentDate: any = await this.appService.getCurrentDate();
  //       this.advanceReceiptNotes.documentDate = currentDate;
  //       this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail = [];
  //       this.advanceReceiptNotes.modeValue = '';
  //       this.advanceReceiptNotes.actCompanyBranchBankDetailId = 0;
  //       this.branchBankName = '';
  //       this.advanceReceiptNotes.chequeDate = '';
  //       this.advanceReceiptNotes.chequeNumber = '';
  //       this.advanceReceiptNotes.actCustomerId = event.actCustomerId;
  //       setTimeout(() => {
  //         this.totalService.setValue(true);
  //       }, 300);
  //     }
  //     else {
  //       this.advanceReceiptNotes.actCustomerId = this.customerIdRAW;
  //       event.actCustomerId = this.customerIdRAW;
  //     }
  //   }
  //   this.customerIdRAW = this.advanceReceiptNotes.actCustomerId;
  //   this.openCustomer(event);
  // }


  createNotesForAdvanceReceiptNote(type?:any){
    this.errorTrue=false;
    const obj={
      data: this.advanceReceiptNotes.actVoucherConfigId,
      data1:this.advanceReceiptNotes.statusValue
    }

    this.accountsService.createNewNotesForReceiptNote(obj).subscribe((success)=>{
      this.receiptNotes=success;
      this.notesddl=success.lstDDLClass;
      if(type === 'clear'){
        this.data.successMessage('Data Cleared Successfully');
      }

    })
  }

  saveNotesForAdvanceReceiptNote(){
    this.accountsService.saveNotesForSaleAdvanceReceiptNote(this.advanceReceiptNotes).subscribe((success)=>{
      // this.notelist=success
    })
  }
  onSelectTab(val: any) {
    this.selectedTab = val;
    if(val===4){
      this.viewSalAdvanceReceiptNoteReceipt();

    }
  }

  getMoreInfo(){
    this.infoMore = true
  }
  getlessInfo(){
    this.infoMore = false
  }

  async createNewNotes() {
    this.createNotesForAdvanceReceiptNote();
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: '400px',
      width: '900px',
      maxWidth: '1170px',
    })
  }
  saveNotes() {

  }


  //attachment
  async createNewAttachment() {

    let dialogResponse: any = await this.dialog.openDialog(this.attachmentDialog, {
      disableClose: true,
      height: '300px',
      width: '100%',
      maxWidth: '1170px',
    })

  }

  doGetItemSelect(event: any) {
    this.saleOrderId = event.id;
    this.autoSearchItems.autoSearchItemId = event.id;
    this.autoSearchItems.autoSearchText = event.name;
  }

  createNewAdvancePaymentNoteDetail() {

    if (this.saleOrderId !== 0) {
      if (this.checkExistsItem(this.saleOrderId)) {
        const obj = {
          data: this.saleOrderId,
          data1: this.advanceReceiptNotes.iActVoucherConfig.voucherTypeValue,
        };
        this.accountsService.createNewAdvancePaymentNoteDetail(obj).subscribe((success) => {
            this.lstentSalAdvanceReceiptNoteDetailRaw = JSON.parse(
              JSON.stringify(
                this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail
              )
            );
            success.plstentPurAdvancePaymentNoteDetail.forEach((e: any) => {
              this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail.push(
                JSON.parse(JSON.stringify(e))
              );
              this.lstentSalAdvanceReceiptNoteDetailRaw.push(
                JSON.parse(JSON.stringify(e))
              );
            });

            this.clearDisplayText();
          });
        this.clearVoucherNo = false;
      }
    } else {
      this.clearVoucherNo = false;
      this.data.errorInfoMessage('Please select purchase order reference no');
    }
  }
  addRow(index: any) {

      this.createNewSalesOrderItem(index);

  }

  createNewReceiptNoteDetailForSo() {


    if (this.saleOrderId !== 0) {
      if (this.checkAlreadyExists(this.saleOrderId)) {
        const obj = {
          data: this.saleOrderId,
          data1: this.advanceReceiptNotes.iActVoucherConfig.voucherTypeValue,
        };
        this.accountsService
          .createNewAdvanceReceiptNoteDetail(obj, this.options)
          .subscribe((success) => {
            this.clearDisplayText();
            success.plstentSalAdvanceReceiptNoteDetail.forEach((e: any) => {
              this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail.push(JSON.parse(JSON.stringify(e)));
              this.lstentSalAdvanceReceiptNoteDetailRaw.push(JSON.parse(JSON.stringify(e)));
            });
            // this.initialLoad = false;
          });
      }
    } else {
      this.data.errorInfoMessage(
        'Please select sales order reference number'
      );
    }

  }

  checkAlreadyExists(val: any) {
    if (
      this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail.length !== 0
    ) {
      for (
        let i = 0;
        i < this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail.length;
        i++
      ) {
        if (
          this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail[i]
            .salSalesOrderId !== 0
        ) {
          if (
            this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail[i]
              .salSalesOrderId === val
          ) {
            let refNumber = this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail[i].ibusSalesOrder.saleOrderReferenceNo;
            this.data.errorInfoMessage('The selected document no (' + refNumber + ') has been already added in list');
            return false;
          }
        }
      }
    }
    return true;
  }
  createNewSalesOrderItem(index: number) {

    // this.accountsService
    // .createNewAdvanceReceiptNoteWso(this.options)
    // .subscribe((success) => {
    //   this.lstentSalAdvanceReceiptNoteDetailRaw.push(
    //     JSON.parse(JSON.stringify(success))
    //   );
    //   this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail.push(
    //     JSON.parse(JSON.stringify(success))
    //   );

    // });

    this.accountsService.createNewAdvanceReceiptNoteWso().subscribe((success) => {
      // const newItem = JSON.parse(JSON.stringify(success));
      this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail.push(success);
    });
    console.log(this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail, 'true');

  }

  checkExistsItem(val: any) {
    if (
      this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail.length !== 0
    ) {
      for (
        let i = 0;
        i < this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail.length;
        i++
      ) {
        if (
          this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail[i]
            .saleOrderId === val
        ) {
          let refNumber =
            this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail[i]
              .ib.purchaseOrderNumber;
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

  saveAdvanceReceiptNotes() {
    if (
      this.customertabform.valid
      // this.itemtabform.valid &&
      // this.headerform.valid

    ) {
      this.errorTrue = false;
      // if (this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail.length !== 0) {
        this.errorTrue = false;
        this.accountsService
          .saveSalesAdvanceReceiptNotes(this.advanceReceiptNotes, this.options)
          .subscribe(async (success) => {
            this.advanceReceiptNotes = success;
            this.screenDisabled()
            this.clearDisplayText();
            // this.statusSource =
            //   success.ilistbusPurAdvancePaymentNoteStatusHistory
            // );
            // const obj = {
            //   data: success.salAdvanceReceiptNoteId,
            //   data1: 0,
            // };
            // let urlJson = await this.url.encode(obj);
            // this.router.navigateByUrl(
            //   '/home/sales/advance-receipt-note/detail/' + urlJson
            // );
            if (success.msg.infoMessage.msgDescription) {
              this.data.successMessage(success.msg.infoMessage.msgDescription);
            }
          });
      // } else {
      //   this.errorTrue = true;
      //   this.data.errorInfoMessage('Please add any items');
      // }
    }
    else {
      this.errorTrue = true;
      this.errorTrueCus = true
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }
  gainLossForPointZeroOneDifference(val: any, items: any, index: any) {
    if (
      this.advanceReceiptNotes.currencyValue !==
      this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail.currencyValue
    ) {
      const obj = {
        longData1: items.purPurchaseInvoiceId,
        longData2: this.advanceReceiptNotes.actVoucherConfigId,
        stringData1: this.advanceReceiptNotes.currencyRate,
        stringData2: val,
      };
      this.accountsService
        .getGainLossForPointZeroOneDifference(obj)
        .subscribe((success) => {
          this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail[
            index
          ].gain = success.data;
          this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail[
            index
          ].loss = success.data1;
        });
    }
  }

  async itemsDelete(val: any, index: any) {
    let msg = 'Are You Sure, You Want to Delete this Item?';
    let response = await this.dialog.confirmDialog(msg);
    if (response) {
      if (val.salAdvanceReceiptNoteDetailId !== 0) {
        this.deleteAdvancePaymentNoteItem(
          val.salAdvanceReceiptNoteDetailId,
          index
        );
      } else {
        // this.purchaseQuotation.plistentPurQuotationItem.splice(index, 1);
        this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail.splice(
          index,
          1
        );
        this.lstentSalAdvanceReceiptNoteDetailRaw.splice(index, 1);
        this.data.successMessage('Item Removed Successfully');
      }
    }
  }

  deleteAdvancePaymentNoteItem(val: any, index: any) {
    this.advanceReceiptNotes.lstentSalAdvanceReceiptNoteDetail[
      index
    ].strDeleteFlag = 'Y';
    this.accountsService
      .deleteAdvanceReceiptNoteDetail(this.advanceReceiptNotes)
      .subscribe((sucess) => {
        this.advanceReceiptNotes = sucess;
        this.lstentSalAdvanceReceiptNoteDetailRaw.splice(index, 1);
      });
  }
  navigateToList(){
    this.router.navigateByUrl('/home/sales/advance-receipt-note/search')
  }
 clear(){
  this.createNewAdvanceReceiptNotes(this.appActVoucherConfigId, this.regionDetailValue);
  this.data.successMessage('Data Cleared Successfully');

 }


 finalNetAmount(event: any) {
   this.finalNet = Number(this.advanceReceiptNotes.lstentActCurrencyExchangerate[0].reportingCurrencyAmount) * Number(this.advanceReceiptNotes.currencyRate)
 }

 viewSalAdvanceReceiptNoteReceipt() {
  if (this.advanceReceiptNotes.salAdvanceReceiptNoteId !== 0) {
    const obj = {
      data: this.advanceReceiptNotes.salAdvanceReceiptNoteId,
      data1: this.advanceReceiptNotes.iActVoucherConfig.pdfOtherComments,
    };
    const options = {
      responseType: 'blob'
    }
    this.accountsService.viewSalAdvanceReceiptNoteReceipt(obj, options).subscribe((success: any) => {
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
closePdf(){
  this.fileUrl =''
}
navigateToSales(){
  this.router.navigateByUrl('/home/corporate/sales-menus')
}
}
