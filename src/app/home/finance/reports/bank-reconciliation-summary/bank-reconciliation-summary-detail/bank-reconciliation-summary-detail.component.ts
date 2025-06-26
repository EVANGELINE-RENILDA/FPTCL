import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../../../app.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { FormsModule, NgForm } from '@angular/forms';
import { entActBankReconciliationSummary } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { format } from 'date-fns/format';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import {
  InnerScroll,
  ViewLabel,
} from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppCurrencyPipe } from '../../../../../common/pipes/app-currency/app-currency.pipe';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';

export class TemporaryBankReconcil {
  tempBookBalance: any = 0;
  tempAddDeposits: any = 0;
  tempLessPayment: any = 0;
  openingBookBalance: any = 0;
  isAllCheckReconcil = '';
  isAllCheckReconsiled = '';
}

@Component({
  selector: 'app-bank-reconciliation-summary-detail',
  standalone: true,
  imports: [
    FormsModule,
    SearchComponent,
    IconButtonComponent,
    InnerScroll,
    ViewLabel,
    AppCurrencyPipe,
    AppDatePipe,
    InputControlComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './bank-reconciliation-summary-detail.component.html',
  styleUrl: './bank-reconciliation-summary-detail.component.scss',
})
export class BankReconciliationSummaryDetailComponent implements OnInit {
  searchParams = new entActBankReconciliationSummary();
  temproryBanckReconcil = new TemporaryBankReconcil();
  bottomCheckbox = 'single';
  allBottomCheckbox = 'all';
  allComplete: any;
  allCompleteRD: any;
  viewReconciledDetails: boolean = false;
  exportbtn: boolean = false;
  disablebtn: boolean = false;
  decimal = 2;
  errorTrue: boolean = false;
  openingBalanceType = 'OPNBB';
  checkboxType = 'CHECK';
  allCheck = 'ALCHK';
  isReconcilation = 'N';
  currentDate: any;
  listofReconcilation = 'LSTRN';
  listofReconciled = 'LSTRD';
  initialLoad = true;
  options = {
    type: 'accountsPath',
  };

  @ViewChild('l') lform!: NgForm;
  @ViewChild('a') aform!: NgForm;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  constructor(
    public appService: AppService,
    public appSettingService: AppSettingsService,
    public data: DataService,
    public initialData: InitialDataService,
    public apiAccountService: AccountsApiService,
    public urlService: UrlService,
    public router: Router,
    public route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.init();
  }

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.urlService.decode(id);
    console.log(`Decoded id: `, params);

    await this.data.checkToken();
    this.getCurrentDate();
    if (params.data === 0) {
      this.createNewBankReconciliationDetail();
    } else {
      await this.initialData.getAcccountsDDL(
        'getInitializeDataOfBankReconciliationSummaryReport'
      );
      this.getBankReconciliedStatementReportBySummaryId();
    }
    this.searchParams.currentReconciliationDate =
      this.appService.getCurrentDate();
  }

  getCurrentDate() {
    let currentDate: any = new Date();
    this.currentDate = format(
      currentDate,
      this.appSettingService.environment.dateViewFormatWithTime
    );
  }

  getBankReconciliedStatementReportBySummaryId() {
    this.apiAccountService
      .getBankReconciliedStatementReportBySummaryId(
        this.searchParams,
        this.options
      )
      .subscribe((success) => {
        this.searchParams = success;
        this.initialLoad = false;
        this.generateBankReconciliationStatementReport();
      });
  }

  viewReconciliedDetail() {
    this.allCompleteRD = false;
    this.searchParams.viewReconciledDetails =
      !this.searchParams.viewReconciledDetails;
    if (this.searchParams.viewReconciledDetails === true) {
      this.viewReconciledDetails = true;
    } else {
      this.viewReconciledDetails = false;
    }
    this.apiAccountService
      .getBankReconciliedStatementReport(this.searchParams, this.options)
      .subscribe((success) => {
        this.searchParams.plstentActBankReconciliedStatement =
          success.plstentActBankReconciliedStatement;
      });
  }

  bankLedgerChanged(bankLedgerId: any) {
    if (bankLedgerId !== 0) {
      this.searchParams.bankLedgerId = bankLedgerId;
      this.apiAccountService
        .getListOfBankAccountNumberByBankLedgerId(
          this.searchParams,
          this.options
        )
        .subscribe((success) => {
          this.searchParams = success;
          this.temproryBanckReconcil.tempBookBalance =
            this.searchParams.bookBalance;
          this.generateBankReconciliationStatementReport();
        });
    } else {
      this.searchParams.bankLedgerId = bankLedgerId;
      this.apiAccountService
        .getListOfBankAccountNumberByBankLedgerId(
          this.searchParams,
          this.options
        )
        .subscribe((success) => {
          this.searchParams = success;
        });
    }
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  generateBankReconciliationStatementReport() {
    this.viewReconciledDetails = false;
    if (this.searchParams) {
      this.apiAccountService
        .generateBankReconciliationSummaryReport(
          this.searchParams,
          this.options
        )
        .subscribe((success) => {
          this.searchParams = success;
          let xTempBookValue: any = this.searchParams.bookBalance;
          this.temproryBanckReconcil.tempBookBalance =
            parseFloat(xTempBookValue).toFixed(2);
          this.calculateAmount();
          this.exportbtn = true;
        });
    }
  }

  async createNewBankReconciliationDetail() {
    await this.initialData.getAcccountsDDL(
      'getInitializeDataOfBankReconciliationSummaryReport'
    );
    if (this.searchParams.bankLedgerId !== 0) {
      this.disablebtn = false;
      let bankLedgerid = (this.searchParams.bankLedgerId = 0);
      this.bankLedgerChanged(bankLedgerid);
    }

    this.temproryBanckReconcil = new TemporaryBankReconcil();
  }

  saveReconciliedStatementReport() {
    debugger;
    if (this.lform.valid) {
      let balCheckFirst = parseFloat(this.searchParams.totalPayment);
      let balCheckSecond = parseFloat(this.searchParams.totalDeposit);
      if (balCheckFirst !== 0 || balCheckSecond !== 0) {
        // this.bankReconciliationDetail.currentReconciliationDate =
        //   this.currentDate;
        this.apiAccountService
          .saveReconciliedStatementReport(this.searchParams, this.options)
          .subscribe((success) => {
            this.searchParams = success;
            // this.bankReconciliationDetail.currentReconciliationDate =
            //   this.currentDate;
            this.temproryBanckReconcil.tempBookBalance =
              this.searchParams.bookBalance;
            this.allComplete = false;
            this.allCompleteRD = false;
            this.viewReconciledDetails = false;
          });
        this.temproryBanckReconcil.tempAddDeposits = 0;
        this.temproryBanckReconcil.tempLessPayment = 0;
      } else {
        this.errorTrue = true;
        this.data.errorInfoMessage(
          'Please add any payment or deposit amount for reconciliation'
        );
      }
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }

  resetReconciliationDetail() {
    this.allComplete = false;
    this.resetValues();
    this.generateBankReconciliationStatementReport();
  }

  undoReconciliedStatement() {
    let balCheckFirst = parseInt(this.searchParams.totalReconciliedPayment);
    let balCheckSecond = parseInt(this.searchParams.totalReconciliedDeposit);
    if (balCheckFirst !== 0 || balCheckSecond !== 0) {
      this.apiAccountService
        .undoReconciliedStatement(this.searchParams, this.options)
        .subscribe((success) => {
          this.searchParams = success;
          // this.bankReconciliationDetail.currentReconciliationDate =
          //   this.currentDate;
          this.temproryBanckReconcil.tempBookBalance =
            this.searchParams.bookBalance;
          this.allComplete = false;
          this.allCompleteRD = false;
        });
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage(
        'Please add any payment or deposit amount for undo reconciliation'
      );
    }
  }

  resetValues() {
    this.temproryBanckReconcil = new TemporaryBankReconcil();
  }

  generateBankReconcilationDetailsReportExcel() {
    this.apiAccountService;
    this.data
      .postPDFData(
        'Report/GenerateBankReconcilationDetailsReportExcel',
        this.searchParams,
        this.options
      )
      .subscribe((success) => {
        const resp = new Blob([success], { type: 'application/text' });
        const fileURL = URL.createObjectURL(resp);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileURL;
        downloadLink.download = 'Bank Reconciliation Detail Report.xlsx';
        downloadLink.click();
        // downloadLink.href = success.data;
      });
  }

  print() {
    window.print();
  }

  assingnDecimal(value: any) {
    if (value) {
      let xvalue = parseFloat(value).toFixed(this.decimal);
      return xvalue;
    } else {
      return 0.0;
    }
  }

  calculateAmount(type?: any, items?: any) {
    if (type === this.openingBalanceType) {
      this.temproryBanckReconcil.tempBookBalance = this.assingnDecimal(
        this.temproryBanckReconcil.openingBookBalance
      );
      let xValue: any =
        parseFloat(this.temproryBanckReconcil.tempBookBalance) +
        parseFloat(this.temproryBanckReconcil.tempAddDeposits);
      let rValue: any =
        parseFloat(xValue) -
        parseFloat(this.temproryBanckReconcil.tempLessPayment);
      let xTotalValue: any = this.assingnDecimal(rValue);
      this.searchParams.bookBalance = xTotalValue;
    }
    if (type === this.checkboxType) {
      if (items.reconciliationStatus === 'Y') {
        let xPaymentDecimal: any = this.assingnDecimal(
          this.searchParams.totalPayment
        );
        let xTotalPayment: any =
          parseFloat(xPaymentDecimal) + parseFloat(items.paymentAmount);
        let totalPaymentValue: any = this.assingnDecimal(xTotalPayment);
        this.searchParams.totalPayment = totalPaymentValue;

        let xTotalDeposit: any =
          parseFloat(this.searchParams.totalDeposit) +
          parseFloat(items.depositAmount);
        let totalDepositValue: any = this.assingnDecimal(xTotalDeposit);
        this.searchParams.totalDeposit = totalDepositValue;
      } else {
        let xPaymentDecimal: any = this.assingnDecimal(
          this.searchParams.totalPayment
        );
        let xTotalPayment: any =
          parseFloat(xPaymentDecimal) - parseFloat(items.paymentAmount);
        let totalPaymentValue: any = this.assingnDecimal(xTotalPayment);
        this.searchParams.totalPayment = totalPaymentValue;

        let xTotalDeposit: any =
          parseFloat(this.searchParams.totalDeposit) -
          parseFloat(items.depositAmount);
        let totalDepositValue: any = this.assingnDecimal(xTotalDeposit);
        this.searchParams.totalDeposit = totalDepositValue;
      }

      this.temproryBanckReconcil.tempAddDeposits = this.assingnDecimal(
        this.searchParams.totalDeposit
      );
      this.temproryBanckReconcil.tempLessPayment = this.assingnDecimal(
        this.searchParams.totalPayment
      );

      this.calculateBookBalance();
    }
    if (type === this.allCheck) {
      this.searchParams.totalPayment = '0';
      this.searchParams.totalDeposit = '0';
      items.forEach((data: any) => {
        if (data.reconciliationStatus === 'Y') {
          let xPaymentDecimal: any = this.assingnDecimal(
            this.searchParams.totalPayment
          );
          let xTotalPayment: any =
            parseFloat(xPaymentDecimal) + parseFloat(data.paymentAmount);
          let totalPaymentValue: any = this.assingnDecimal(xTotalPayment);
          this.searchParams.totalPayment = totalPaymentValue;

          let xTotalDeposit: any =
            parseFloat(this.searchParams.totalDeposit) +
            parseFloat(data.depositAmount);
          let totalDepositValue: any = this.assingnDecimal(xTotalDeposit);
          this.searchParams.totalDeposit = totalDepositValue;
        }
        this.temproryBanckReconcil.tempAddDeposits = this.assingnDecimal(
          this.searchParams.totalDeposit
        );
        this.temproryBanckReconcil.tempLessPayment = this.assingnDecimal(
          this.searchParams.totalPayment
        );

        this.calculateBookBalance();
      });
    }
    let xDiffValue: any = this.assingnDecimal(this.searchParams.bankBalance);
    let yDiffValue: any = this.assingnDecimal(this.searchParams.bookBalance);

    let subDiffValue: any = parseFloat(xDiffValue) - parseFloat(yDiffValue);

    let totalDiffValue: any = this.assingnDecimal(subDiffValue);

    this.searchParams.differenceAmount = totalDiffValue;
  }

  setAll(event: any, items: any, listName: any) {
    if (listName === this.listofReconcilation) {
      if (event) {
        this.isReconcilation = 'Y';
      } else {
        this.isReconcilation = 'N';
      }
      this.allComplete = event;
      if (
        this.searchParams.plstentActBankReconciliationStatement.length === 0
      ) {
        return;
      }
      this.searchParams.plstentActBankReconciliationStatement.forEach(
        (t: any) => (t.reconciliationStatus = this.isReconcilation)
      );
      this.calculateAmount(this.allCheck, items);
    }

    if (listName === this.listofReconciled) {
      if (items.length !== 0) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].reconciliationStatus === 'N') {
            items[i].reconciliationStatus = '';
          }
        }
      }
      if (event) {
        this.isReconcilation = 'N';
      } else {
        this.isReconcilation = '';
      }
      this.allCompleteRD = event;
      if (this.searchParams.plstentActBankReconciliedStatement.length === 0) {
        return;
      }
      this.searchParams.plstentActBankReconciliedStatement.forEach(
        (t: any) => (t.reconciliationStatus = this.isReconcilation)
      );

      this.calculateBottomGrid(items, this.allBottomCheckbox);
    }
  }

  someComplete() {
    return false;
  }

  updateAllComplete(event: any, items: any, listName: any) {
    if (listName === this.listofReconcilation) {
      if (event.checked) {
        items.reconciliationStatus = 'Y';
      } else {
        items.reconciliationStatus = 'N';
      }
      this.allComplete =
        this.searchParams.plstentActBankReconciliationStatement.length !== 0 &&
        this.searchParams.plstentActBankReconciliationStatement.every(
          (t: any) => t.reconciliationStatus === 'Y'
        );
      this.calculateAmount(this.checkboxType, items);
    }

    if (listName === this.listofReconciled) {
      if (event.checked) {
        items.reconciliationStatus = 'N';
      } else {
        items.reconciliationStatus = '';
      }
      this.allCompleteRD =
        this.searchParams.plstentActBankReconciliedStatement.length !== 0 &&
        this.searchParams.plstentActBankReconciliedStatement.every(
          (t: any) => t.reconciliationStatus === 'N'
        );
      this.calculateBottomGrid(items, this.bottomCheckbox);
    }
  }

  calculateBookBalance() {
    // this.temproryBanckReconcil.tempBookBalance = this.assingnDecimal(
    //   this.temproryBanckReconcil.openingBookBalance
    // );
    let xValue: any =
      parseFloat(this.temproryBanckReconcil.tempBookBalance) +
      parseFloat(this.temproryBanckReconcil.tempAddDeposits);

    let rValue: any =
      parseFloat(xValue) -
      parseFloat(this.temproryBanckReconcil.tempLessPayment);

    let totalValue: any = this.assingnDecimal(rValue);

    this.searchParams.bookBalance = totalValue;
  }

  calculateBottomGrid(items: any, type: any) {
    if (type === this.bottomCheckbox) {
      if (items.reconciliationStatus === 'N') {
        let xPaymentValue =
          parseFloat(this.searchParams.totalReconciliedPayment) +
          parseFloat(items.paymentAmount);
        let xPaymentotalValue: any = this.assingnDecimal(xPaymentValue);
        this.searchParams.totalReconciliedPayment = xPaymentotalValue;

        let xDepositValue =
          parseFloat(this.searchParams.totalReconciliedDeposit) +
          parseFloat(items.depositAmount);
        let xDepositTotalvalue: any = this.assingnDecimal(xDepositValue);
        this.searchParams.totalReconciliedDeposit = xDepositTotalvalue;
      } else {
        let xPaymentValue =
          parseFloat(this.searchParams.totalReconciliedPayment) -
          parseFloat(items.paymentAmount);
        let xPaymentotalValue: any = this.assingnDecimal(xPaymentValue);
        this.searchParams.totalReconciliedPayment = xPaymentotalValue;

        let xDepositValue =
          parseFloat(this.searchParams.totalReconciliedDeposit) -
          parseFloat(items.depositAmount);
        let xDepositTotalvalue: any = this.assingnDecimal(xDepositValue);
        this.searchParams.totalReconciliedDeposit = xDepositTotalvalue;
      }
    }
    if (type === this.allBottomCheckbox) {
      this.searchParams.totalReconciliedDeposit = '0';
      this.searchParams.totalReconciliedPayment = '0';
      items.forEach((data: any) => {
        if (data.reconciliationStatus === 'N') {
          let xPaymentValue =
            parseFloat(this.searchParams.totalReconciliedPayment) +
            parseFloat(data.paymentAmount);
          let xPaymentotalValue: any = this.assingnDecimal(xPaymentValue);
          this.searchParams.totalReconciliedPayment = xPaymentotalValue;

          let xDepositValue =
            parseFloat(this.searchParams.totalReconciliedDeposit) +
            parseFloat(data.depositAmount);
          let xDepositTotalvalue: any = this.assingnDecimal(xDepositValue);
          this.searchParams.totalReconciliedDeposit = xDepositTotalvalue;
        }
        // else {
        //   let xPaymentValue =
        //     parseFloat(this.bankReconciliationDetail.totalReconciliedPayment) -
        //     parseFloat(data.paymentAmount);
        //   let xPaymentotalValue: any = this.assingnDecimal(xPaymentValue);
        //   this.bankReconciliationDetail.totalReconciliedPayment =
        //     xPaymentotalValue;

        //   let xDepositValue =
        //     parseFloat(this.bankReconciliationDetail.totalReconciliedDeposit) -
        //     parseFloat(data.depositAmount);
        //   let xDepositTotalvalue: any = this.assingnDecimal(xDepositValue);
        //   this.bankReconciliationDetail.totalReconciliedDeposit =
        //     xDepositTotalvalue;
        // }
      });
    }
  }

  unCheckBox(val: any) {
    val.forEach((data: any) => {
      if (this.allCompleteRD) {
        data.reconciliationStatus = '';
        for (let i = 0; i < val.length; i++) {
          val[i].reconciliationStatus = data.reconciliationStatus;
        }
        this.allCompleteRD = false;
        this.calculateBottomGrid(val, this.allBottomCheckbox);
      }
      if (data.reconciliationStatus === 'N') {
        data.reconciliationStatus = '';
        this.calculateBottomGrid(data, this.bottomCheckbox);
      }
    });
  }

  async openDocument(items: any) {
    const obj = {
      data: items.voucherid,
      data1: 0,
    };
    if (items.vouchertypevalue === 'ADVRN') {
      let urlJson = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/sales/advance-receipt-note/detail/' + urlJson
      );
    } else if (items.vouchertypevalue === 'APYNT') {
      let urlJson = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/purchase/advance-payment-note/detail/' + urlJson
      );
    } else if (items.vouchertypevalue === 'FTNTE') {
      let urlJson = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/finance/fund-transfer/detail/' + urlJson
      );
    } else if (items.vouchertypevalue === 'RTNTE') {
      let urlJson = await this.urlService.encode(obj);
      this.router.navigateByUrl('/home/sales/receipt-note/detail/' + urlJson);
    } else if (items.vouchertypevalue === 'JNLVC') {
      let urlJson = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/finance/journal-voucher/detail/' + urlJson
      );
    } else if (items.vouchertypevalue === 'REVJN') {
      let urlJson = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/finance/reversing-journal/detail/' + urlJson
      );
    } else if (items.vouchertypevalue === 'ADVRN') {
      let urlJson = await this.urlService.encode(obj);
      this.router.navigateByUrl(
        '/home/sales/advance-receipt-note/detail/' + urlJson
      );
    }
  }

  get() {
    let currentDate: any = new Date();
    this.currentDate = format(
      currentDate,
      this.appSettingService.environment.dateViewFormatWithTime
    );
  }
  navigateToAccount(){
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }
  navigateToList(){
    this.router.navigateByUrl('/home/finance/report/bank-reconciliation/search')
  }

  // screenDisabled() {
  //   let screenDisabled = false;
  //   if(
  //     this.searchParams
  //   )
  // }
}
