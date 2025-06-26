import { NgClass, CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import {
  Row,
  ViewLabel,
  InnerScroll,
  AppToolTipComponent,
  LabelDash,
} from '../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { TimeControlComponent } from '../../../../app-core/form-input/time-control/time-control.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { CoreService } from '../../../../app-core/service/core.service';
import { AppTableComponent } from '../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../app-core/template/icon-button/icon-button.component';
import { AppService } from '../../../../app.service';
import {
  entCashCounterDepositBookNotes,
  entCashCounterDepositBook,
  entCashCounterDepositBookSummary,
  entCashCounterDepositBookChequeDetail,
} from '../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { AppCurrencyPipe } from '../../../../common/pipes/app-currency/app-currency.pipe';
import { AppDatePipe } from '../../../../common/pipes/app-date/app-date.pipe';
import { AppSafePipe } from '../../../../common/pipes/app-safe/app-safe.pipe';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';

@Component({
  selector: 'app-reconciliation-detail',
  standalone: true,
  imports: [
    NgClass,
    Row,
    ViewLabel,
    TimeControlComponent,
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
    AppSafePipe,
    CommonModule,
    MatCheckboxModule,
    AppCurrencyPipe,
    LabelDash,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './reconciliation-detail.component.html',
  styleUrl: './reconciliation-detail.component.scss',
})
export class ReconciliationDetailComponent {
  errorTrue = false;
  selectedTab = 0;
  pageId = '';
  initialLoad = true;
  initialLoadOne = true;
  initialLoadTwo = true;
  initialLoadThree = true;
  initialLoadFour = true;
  arryOpening: any = [];
  arryClosing: any = [];
  currency: any;
  branchName = '';
  misMatchAmount: any = '';
  edit = false;
  search = false;
  cashCounterDepositBook = new entCashCounterDepositBook();
  cashCounterDepositBookChequeDetail =
    new entCashCounterDepositBookChequeDetail();
  depositDetailSummary = new entCashCounterDepositBookSummary();
  id = 0;
  cashCounterDepositBookSummaryId = 0;
  @ViewChild('a') aform!: NgForm;
  @ViewChild('c') cform!: NgForm;
  @ViewChild('ClosingAmount') ClosingAmount!: any;

  displayedColumns: any = [
    'depositDate',
    'openAmount',
    'closeAmount',
    'computedAmount',
    'mismatchAmount',
  ];
  displayedColumns1: any = [
    'chequeNo',
    'bank',
    'branchCode',
    'issueCode',
    'amount',
    'collectedFinance',
  ];
  displayedColumns2: any = [
    'chequeNo',
    'bank',
    'branchCode',
    'issueCode',
    'amount',
    'collectedFinance',
  ];
  depositDataSource: any = [];
  openingChequeDataSource: any = [];
  closingChequeDataSource: any = [];
  closingAmountDataSoruce: any = [];
  @Input() public searchPanelClass = 'search-pane';
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  constructor(
    public appService: AppService,
    public data: DataService,
    public initialData: InitialDataService,
    public apiDataService: ApplicationApiService,
    public url: UrlService,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: CoreService,
    public storage: AppStorageService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.init();
    });
  }

  ngOnInit(): void {}

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params.id;
    await this.data.checkToken();
    await this.initialData.getDDL('getDepositBookInitialData');
    this.openDepositBook(this.id);
    await this.storage.get('companyCurrencyValue').then((val) => {
      this.currency = val;
    });

    await this.storage.get('branchFinance').then((val) => {
      this.branchName = val;
      this.cashCounterDepositBook.branchName = val;
    });
  }

  openDepositBook(val: any) {
    const obj = {
      data: val,
    };
    this.cashCounterDepositBookSummaryId = val;
    this.apiDataService.openCashCounterDepositBook(obj).subscribe((success) => {
      this.cashCounterDepositBook = success;
      this.initialLoad = false;
      this.initialLoadOne = false;
      this.initialLoadTwo = false;
      this.initialLoadThree = false;
      this.initialLoadFour = false;
      this.depositDataSource =
        success.ilstDepositSearchResult.ilstentDepositSearchSet;
      success.lstCashCounterDepositBookChequeDetail.forEach((data: any) => {
        if (data.isOpeningCheque === 'Y') {
          this.arryOpening.push(data);
        } else {
          this.arryClosing.push(data);
        }
      });

      if (
        this.cashCounterDepositBook.lstCashCounterDepositBookSummary.length !==
        0
      ) {
        this.openDepositSummary(
          this.cashCounterDepositBook.lstCashCounterDepositBookSummary[0]
            .cashCounterDepositBookSummaryId
        );
        if (
          this.cashCounterDepositBook.lstCashCounterDepositBookSummary[0]
            .receiptModeValue === 'CASHH'
        ) {
          this.search = !this.search;
        }
      }
      this.openingChequeDataSource = this.arryOpening;
      this.closingChequeDataSource = this.arryClosing;
      if (!!success.msg?.infoMessage) {
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      }
    });
  }

  async showDepositBook() {
    const obj = {
      id: this.id,
      clicked: false,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl('/home/finance/reconciliation/info/' + urlJson);
  }

  isChecked(val: any, element: any, index: any) {
    if (val.checked) {
      element.collectedByFinance = 'Y';
    } else {
      element.collectedByFinance = 'N';
    }
    this.apiDataService
      .saveDepositBookChequeDetail(element)
      .subscribe((success) => {
        this.openingChequeDataSource = [];
        this.closingChequeDataSource =[];
        success.lstCashCounterDepositBookChequeDetail.forEach((data: any) => {
          if (data.isOpeningCheque === 'Y') {
            this.openingChequeDataSource.push(data);
          } else {
            this.closingChequeDataSource.push(data);
          }
        });
        setTimeout(() => {
          this.apiDataService
            .setDefaultMismatchAmount(this.depositDetailSummary)
            .subscribe((success) => {
              this.depositDetailSummary.mismatchAmount = success.mismatchAmount;
              this.misMatchAmount = success.mismatchAmount;

              this.apiDataService
                .saveDepositSummary(success)
                .subscribe((success: any) => {
                  this.cashCounterDepositBook = success;
                });
            });
        }, 1000);
      });
  }

  setDefaultMismatchAmount() {
    setTimeout(() => {
      this.apiDataService
        .setDefaultMismatchAmount(this.depositDetailSummary)
        .subscribe((success) => {
          this.depositDetailSummary.mismatchAmount = success.mismatchAmount;
          this.misMatchAmount = success.mismatchAmount;
        });
    }, 1000);
  }

  openDepositSummary(val: any) {
    this.cashCounterDepositBookSummaryId = val;
    const obj = {
      data: val,
    };
    this.apiDataService.openDepositBookSummary(obj).subscribe((success) => {
      this.depositDetailSummary = success;
      this.closingAmountDataSoruce = success.plstDepositSummaryDenomination;
      if (this.depositDetailSummary.receiptModeValue === 'CASHH') {
        this.search = true;
      } else {
        this.search = false;
      }
      if (!!success.msg?.infoMessage) {
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      }
    });
  }

  doEdit() {
    this.edit = !this.edit;
  }

  reconsileDepositBook() {
    this.cashCounterDepositBook.lstCashCounterDepositBookChequeDetail =
      this.arryOpening.concat(this.arryClosing);
    this.apiDataService
      .reconsileDepositBook(this.cashCounterDepositBook)
      .subscribe((success) => {
        this.cashCounterDepositBook = success;
      });
  }

  saveReconclilation() {
    if (this.aform.valid) {
      this.depositDetailSummary.mismatchAmount = this.misMatchAmount;
      this.apiDataService
        .saveDepositSummary(this.depositDetailSummary)
        .subscribe((success: any) => {
          this.cashCounterDepositBook = success;

          this.edit = !this.edit;
          this.openDepositSummary(
            this.cashCounterDepositBook.cashCounterDepositBookSummaryId
          );
          if (!!success.msg?.infoMessage) {
            this.data.successMessage(success.msg.infoMessage.msgDescription);
          }
        });
    } else {
      this.errorTrue = true;
    }
  }

  async closingAmount() {
    this.errorTrue = false;

    this.depositDetailSummary.isBoolClosingBalance = 'True';

    this.apiDataService
      .openDenomination(this.depositDetailSummary)
      .subscribe(async (success) => {
        this.depositDetailSummary = success;
        this.closingAmountDataSoruce = success.plstDepositSummaryDenomination;

        await this.dialog.openDialog(this.ClosingAmount, {
          width: '650px',
          height: '500px',
        });
      });
  }

  count(val: any) {
    val.denominationCount = parseInt(val.denominationCount) || 0;

    if (val.denominationCount > 0 && val.denominationDescription) {
      val.totalAmount = (
        Number(val.denominationDescription) * Number(val.denominationCount)
      ).toFixed(2);
    } else {
      val.totalAmount = '';
    }
  }

  clearDenomination() {
    this.closingAmountDataSoruce.forEach((element: any) => {
      element.denominationCount = 0;
      element.totalAmount = '';
      this.data.successMessage('Data Cleared Successfully');
    });
  }

  saveDenomination() {
    let value = 0;
    this.closingAmountDataSoruce.forEach((element: any) => {
      if (element.totalAmount && parseFloat(element.totalAmount) > 0) {
        value += parseFloat(element.totalAmount);
      }
    });

    this.depositDetailSummary.closingAmount = value.toFixed(2).toString();

    if (this.cform.valid) {
      this.apiDataService
        .saveDenominations(this.depositDetailSummary)
        .subscribe((success) => {
          this.depositDetailSummary = success;
          this.dialog.closeAll();
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        });
    } else {
      this.errorTrue = true;
    }
  }

  hideBtnBasedonStatus() {
    const status = this.cashCounterDepositBook.statusValue;
    return !(status === 'CREAT' || status === 'OPENS' || status === 'CLOSD');
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async onSelectTab(val: any) {
    this.selectedTab = val;
  }

  navigateToList() {
    this.router.navigateByUrl('/home/finance/reconciliation/search');
  }
}
