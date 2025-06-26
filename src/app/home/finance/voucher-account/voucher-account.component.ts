import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../app-core/service/core.service';
import { SearchComponent } from '../../../app-core/template/search/search.component';
import { AppService } from '../../../app.service';
import { AppStorageService } from '../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../common/services/data/data.service';
import { InitialDataService } from '../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../common/services/url/url.service';
import { FormsModule, NgForm } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InnerScroll, Row, ViewLabel } from '../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { AppAccessDirective } from '../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { AccountsApiService } from '../../../common/api-services/accounts-api/accounts-api.service';
import { entActVoucherAccountDetail, entActVoucherAccountDetailSearch, entVoucherAccountDetailSearchResult, entVoucherAccountDetailSearchSet } from '../../../common/api-services/accounts-api/accounts-api.classes';
import { CheckboxComponent } from '../../../app-core/template/checkbox/checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ErrorMessageComponent } from '../../../app-core/message/error-message/error-message.component';
import { SearchDebitComponent } from '../../search/search-debit/search-debit.component';

@Component({
  selector: 'app-voucher-account',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, IconButtonComponent, InnerScroll, InputControlComponent, SearchComponent, Row, FormsModule, CellHeaderDefDirective, AppDatePipe, AppAccessDirective, ButtonAccessDirective, MatTooltipModule, CheckboxComponent, MatCheckboxModule, ErrorMessageComponent, SearchDebitComponent, ViewLabel],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './voucher-account.component.html',
  styleUrl: './voucher-account.component.scss'
})
export class VoucherAccountComponent {
  @Input() public accessInBtns: any = '';
  @Input() public accessInApp: any = '';
  @Input() public type: any = '';
  btnAccessForAdd = '';


  currentDate = '';
  pageId = 'AVASC';
  options = {
    hideFullSpinner: true
  }
  idList: any = [];
  branchName=''
  __selectedItems: any = {
    currentIndex: 0,
    array: []
  };
  @ViewChild('appSearch') appSearch!: SearchComponent;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  columns: any = ["","voucherName", "voucherTypeDescription", "effectTypeDescription", "branchAccountTypeDescription",  "effectiveDate", "action"];
  columnsName: any = ["","Voucher Name", "Voucher Type", "Effect Type ", "Voucher Account Type",  "Created Date", "Action"];

  tableData: any = [{
    "leadRefNo": 'Net Out Voucher', "serviceRefNo": '	Net Out Voucher', "customerName": 'By Config Ledger', "leadTypeDescription": 'Exchange Loss', "productTypeDescription": '11 May 2023'
  }];
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  regionValue = '';

  searchParams = new entActVoucherAccountDetailSearch();
  searchParamsRAW = new entActVoucherAccountDetailSearch();
  voucherAccount = new entActVoucherAccountDetail();
  voucherAccountRAW = new entActVoucherAccountDetail();
  errorTrue = false
  @ViewChild('l') lForm!: NgForm;
  @ViewChild('accountDialog', { static: false })
  accountDialog!: ElementRef

  constructor(public router: Router,
    public accountsService: AccountsApiService,
    public data: DataService,
    public appStorage: AppStorageService,
    public appService: AppService,
    public route: ActivatedRoute,
    public dialog: CoreService,
    public url: UrlService,
    public initialData: InitialDataService,
    public storage: AppStorageService,

  ) {

  }
  ngOnInit(): void {


    this.init();
  }

  async init() {
    await this.data.checkToken();
    this.appService.setBreadCrumb(this.breadCrumb);
    this.initialData.getAcccountsDDL('getCompanyVoucherAccountInitialData', this.options);
    this.createVoucherAccountSearch();
    this.currentDate = this.appService.getCurrentDate();
    console.log(this.currentDate);
    await this.storage.get('branchFinance').then((val) => {
      this.branchName = val;
    });
  }

  createVoucherAccountSearch(type?: any) {
    this.accountsService.createNewCompanyVoucherAccountSearch().subscribe((success) => {
      this.searchParams = success;
      this.searchParams.pageNumber = this.pagination.pageNumber;
      this.searchParams.pageSize = this.pagination.pageSize;
      this.searchVoucherAccount();

      if (type === 'clear') {
        // this.searchParams = JSON.parse(JSON.stringify(this.searchParams));
        this.data.successMessage('Data Cleared Successfully');
        // this.searchVoucherAccount();
      }
      // else {
      // }
    })
  }
  searchVoucherAccount() {
    this.accountsService.searchVoucherAccountDetail(this.searchParams).subscribe((success) => {
      this.tableData = success.ilistentVoucherAccountDetailSearchSet;
      this.pagination.pageNumber = success.pageNumber;
      this.pagination.pageSize = success.pageSize;
      this.pagination.totalCount = success.totalCount;
    })
  }

  onSearch() {
    this.data.successMessage('Search Executed Successfully');
    this.searchParams.pageNumber = 1;
    this.searchVoucherAccount();
    this.appSearch.close();
  }

  pageChanged(event: any) {
       this.searchParams.pageNumber = event.pageNumber;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.istrSortColumn = event.sortColumnName;
    this.searchParams.iblSortOrder = event.sortOrder;
    this.searchVoucherAccount();

  }

  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }
  accountsData: any
  async createNewVoucher() {
    this.errorTrue = false
    this.accountsService.createNewCompanyVoucherAccountDetail().subscribe(async (success) => {
      this.voucherAccount = success;
      this.voucherAccount.regionValue='REGI1';
      // this.openDialogBox()

    })
  }


  openvoucherAccoutDetails(val: any) {
    const obj = {
      data: val
    }
    this.accountsService.openCompanyVoucherAccountDetail(obj).subscribe(async (success) => {
      this.voucherAccount = success;
      debugger
      console.log(this.voucherAccount.ientLedger.ledgerName , 'ledger name');
      
      await this.getVoucherTypeByVoucherCategory(success.voucherCategoryValue)
      await this.getVoucherNameByVoucherType(success.voucherTypeValue)
      await this.openVoucherConfig(success.actVoucherConfigId)
      await this.loadEntryType(success.effectTypeValue)
      // await this.clearSingleDouble()
      // await this.openDialogBox()
    })
  }

  async openDialogBox(val: any) {
    this.openvoucherAccoutDetails(val)
    let dialogResponse: any = await this.dialog.openDialog(this.accountDialog, {
      disableClose: true,
      height: '400px',
      width: '100%',
      maxWidth: '1170px',

    });
  }

  async createDialogBox() {
    this.createNewVoucher()
    let dialogResponse: any = await this.dialog.openDialog(this.accountDialog, {
      disableClose: true,
      height: '400px',
      width: '100%',
      maxWidth: '1170px',

    });
  }

  doClear() {
  
    this.searchParams = JSON.parse(JSON.stringify(this.searchParamsRAW));
    this.data.successMessage("Data Cleared Successfully");

    // this.dialog.closeDialog()
  }
  //
  saveVoucherAccount() {

    if (this.lForm.valid ) {
      if(this.voucherAccount.netAmountDebitLedgerId===this.voucherAccount.netAmountCreditLedgerId)
      {
        this.data.errorInfoMessage('Debit and credit ledger should be different. ')
      }
      else{
        this.accountsService.saveCompanyVoucherAccountDetail(this.voucherAccount).subscribe((success) => {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
          this.createVoucherAccountSearch()
          this.dialog.closeDialog()
        });
      }     
    }
    else {
      this.errorTrue = true
    }
  }
  doDetailClear() {
    this.ddlVoucherList=[];
    this.voucherNameDDL=[];
    this.voucherAccount = JSON.parse(JSON.stringify(this.voucherAccountRAW));
    this.data.successMessage("Data Cleared Successfully");
    this.createNewVoucher()
    // this.dialog.closeDialog()

  }
  voucherNameDDL: any = [];
  regionValueDDl: any = [];
  isEffective = false
  getVoucherNameByVoucherType(val: any) {
    const obj = {
      data: val
    }
    this.accountsService.getVoucherNameByVoucherType(obj, this.options).subscribe((success) => {
      success.data.forEach((element: any) => {
        this.voucherNameDDL = element.value;
      })
    })
  }
  ddlVoucherList: any = []
  getVoucherTypeByVoucherCategory(val: any) {
    const obj = {
      data: val
    }
    this.accountsService.getVoucherTypeByVoucherCategory(obj, this.options).subscribe((success) => {
      success.data.forEach((element: any) => {
        this.ddlVoucherList = element.value;
      })
    })
  }
  openVoucherConfig(val: any) {
    const obj = {
      data: val
    }
    this.accountsService.openVoucherConfignotchilds(obj, this.options).subscribe((success) => {
      this.voucherAccount.ientActVoucherConfig = success;
      this.regionValueDDl = success.plstentDDLClass;
      if (this.voucherAccount.ientActVoucherConfig.voucherNatureValue === 'NOIMP') {
        this.voucherAccount.effectTypeValue = this.voucherAccount.ientActVoucherConfig.voucherNatureValue;
        this.isEffective = true;
      }
      else if (this.voucherAccount.actVoucherAccountConfigId === 0) {
        this.isEffective = false;
        this.voucherAccount.effectTypeValue = '';
      }
    })
  }
  loadEntryType(effectType: any) {
    debugger
    if(effectType==='CNFLG' ){
      if( this.voucherAccount.actVoucherAccountConfigId ===0){

        this.voucherAccount.netAmountDebitLedgerId=0;
        this.voucherAccount.ientLedger.ledgerName='';
      }

    }else if(effectType==='BYSYM' || effectType==='OPSIT' || effectType==='SAME'){
      if( this.voucherAccount.actVoucherAccountConfigId ===0){
      this.voucherAccount.netAmountDebitLedgerId=0;
      this.voucherAccount.ientLedger.ledgerName=''
      this.voucherAccount.ientCreditLedger.ledgerName='';
      this.voucherAccount.netAmountCreditLedgerId=0
      }
    }
      else {
        if( this.voucherAccount.actVoucherAccountConfigId ===0){
        this.voucherAccount.netAmountDebitLedgerId=0;
        this.voucherAccount.ientLedger.ledgerName='';
        // this.voucherAccount.debitPartyAccountFlag='N'
        this.voucherAccount.netAmountDebitLedgerId=0;
        this.voucherAccount.ientLedger.ledgerName=''
        this.voucherAccount.ientCreditLedger.ledgerName='';
        this.voucherAccount.netAmountCreditLedgerId=0
        }
      }
    if (this.voucherAccount.effectTypeValue !== "NOIMP" && this.voucherAccount.effectTypeValue !== "CNFLG") {
      // this.disableEntryType = true;
      this.voucherAccount.entryTypeValue = 'SINGL';
    }
    else {
      this.voucherAccount.entryTypeValue = 'DBLE';
      this.getEntryTypeByEffectType(effectType);
      // this.disableEntryType = false;
    }
  }
  getEntryTypeByEffectType(val: any) {
    const obj = {
      data: val
    }
    this.accountsService.getEntryTypebyEffectType(obj, this.options).subscribe((success) => {
      success.data.forEach((element: any) => {
        // this.initialData.voucherAccountInitialData.ddlEntryTypeCVA = element.value;
      })
    })
  }
  clearSingleDouble() {
    this.errorTrue = false;
    this.voucherAccount.netAmountDebitLedgerId = 0;
    this.voucherAccount.netAmountCreditLedgerId = 0;
    this.voucherAccount.ientCreditLedger.ledgerName = '';
    this.voucherAccount.ientLedger.ledgerName = '';
  }
  debitPartyChange(event: any) {
    if (event.target.checked === true) {
      this.voucherAccount.debitPartyAccountFlag = 'Y'
      this.clearDebitData('3')
    }
    else {
      this.voucherAccount.debitPartyAccountFlag = 'N'
    }
  }

  creditPartyChange(event: any) {
    if (event.target.checked === true) {
      this.voucherAccount.creditPartyAccountFlag = 'Y';

    }
    else {
      this.voucherAccount.creditPartyAccountFlag = 'N'
    }
  }
  doSelectLedgerName(event: any) {
    console.log(event);
    
    this.voucherAccount.netAmountDebitLedgerId = event.actLedgerId;
    this.voucherAccount.ientLedger.ledgerName = event.ledgerName;
  }

  doSelectCreditLedgerName(event: any) {
    this.voucherAccount.netAmountCreditLedgerId = event.actLedgerId;
    this.voucherAccount.ientCreditLedger.ledgerName = event.ledgerName;
  }
  clearDebitData(val: any) {


  }
  navigateToAccount(){
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
}

