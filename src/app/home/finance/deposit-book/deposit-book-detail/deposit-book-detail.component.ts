import { NgClass, CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import {
  Row,
  ViewLabel,
  InnerScroll,
  AppToolTipComponent,
  LabelDash,
} from '../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AppTableComponent } from '../../../../app-core/template/app-table/app-table.component';

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
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { ViewPdfComponent } from '../../../../app-core/template/view-pdf/view-pdf.component';
import { SearchDebitComponent } from '../../../search/search-debit/search-debit.component';
import { SearchCreditComponent } from '../../../search/search-credit/search-credit.component';
import { FilterAndSortPipe } from '../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { AppSafePipe } from '../../../../common/pipes/app-safe/app-safe.pipe';
import { TimeControlComponent } from '../../../../app-core/form-input/time-control/time-control.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  entCashCounterDepositBook,
  entCashCounterDepositBookNotes,
  entCashCounterDepositBookSummary,
} from '../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { AppCurrencyPipe } from '../../../../common/pipes/app-currency/app-currency.pipe';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
@Component({
  selector: 'app-deposit-book-detail',
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
    DropZoneComponent,
    ViewPdfComponent,
    SearchDebitComponent,
    SearchCreditComponent,
    FilterAndSortPipe,
    ViewPdfComponent,
    AppSafePipe,
    CommonModule,
    MatCheckboxModule,
    AppCurrencyPipe,
    AccoutsStatusTableComponent,
    LabelDash,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './deposit-book-detail.component.html',
  styleUrl: './deposit-book-detail.component.scss',
})
export class DepositBookDetailComponent {
  errorTrue = false;
  selectedTab = 0;
  selectedSubTab = 0;
  pageId = 'DBSCN';
  initialLoad = true;
  initialLoadOne = true;
  initialLoadTwo = true;
  initialLoadThree = true;
  initialLoadFour = true;
  arryOpening: any = [];
  arryClosing: any = [];
  notesDDL: any = [];
  type = '';

  branchName = '';
  misMatchAmount: any = '';
  edit = true;
  search = false;
  notes = new entCashCounterDepositBookNotes();
  cashCounterDepositBook = new entCashCounterDepositBook();
  depositDetailSummary = new entCashCounterDepositBookSummary();
  id = 0;
  cashCounterDepositBookSummaryId = 0;
  @ViewChild('b') bform!: NgForm;
  @ViewChild('a') aform!: NgForm;
  @ViewChild('c') cform!: NgForm;
  @ViewChild('content') content!: any;
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
  displayedColumns3: any = [
    'transNo',
    'receiptNo',
    'receiptAmount',
    'receiptStatus',
  ];
  currency = '';
  cashCheck: any = ['count', 'Denominations', 'amount'];
  displayedColumns4: any = ['note', 'enteredBy', 'enteredDate', 'status'];
  displayedColumns5: any = ['status', 'changedBy', 'changedDate'];
  depositDataSource: any = [];
  openingChequeDataSource: any = [];
  closingChequeDataSource: any = [];
  receiptDataSource: any = [];
  statusDataSource: any = [];
  closingAmountDataSoruce: any = [];
  @Input() public searchPanelClass = 'search-pane';
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  filePath = '';
  constructor(
    public appService: AppService,
    public appSettings: AppSettingsService,
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
      if (!!success.pentReceiptSearchResult) {
        this.receiptDataSource =
          success.pentReceiptSearchResult.pentReceiptSearchSet;
      } else {
        this.receiptDataSource = [];
      }
      this.statusDataSource = success.lstCashCounterDepositBookStatusHistory;
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
    this.router.navigateByUrl('/home/finance/deposit-book/info/' + urlJson);
  }
  async editDepositBook() {
    const obj = {
      id: this.id,
      clicked: true,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl('/home/finance/deposit-book/info/' + urlJson);
  }

  isChecked(val: any, element: any, index: any) {
    if (val.checked) {
      this.closingChequeDataSource.filteredData[index].collectedByFinance = 'Y';
      element.collectedByFinance = 'Y';
    } else {
      this.closingChequeDataSource.filteredData[index].collectedByFinance = 'N';
      element.collectedByFinance = 'N';
    }
  }
  setDefaultMismatchAmount() {
    console.log('woking');

    setTimeout(() => {
      this.apiDataService
        .setDefaultMismatchAmount(this.depositDetailSummary)
        .subscribe((success) => {
          this.misMatchAmount = success.mismatchAmount;
          this.depositDetailSummary.mismatchAmount = success.mismatchAmount;
        });
    }, 1000);
  }

  onCollectedByFinanceChange(val: any) {
    if (val !== 0) {
      this.setDefaultMismatchAmount();
    }
  }
  createNotes() {
    const obj = {
      data: this.cashCounterDepositBook.statusValue,
    };
    this.apiDataService
      .createDepositBookNotes(obj)
      .subscribe((success: any) => {
        this.notes = success;
        this.notesDDL = success.ientDDL?.value;
        if (!!success.msg?.infoMessage) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        }
      });
  }

  clearNotes() {
    this.errorTrue = false;
    const obj = {
      data: this.cashCounterDepositBook.statusValue,
    };
    this.apiDataService
      .createDepositBookNotes(obj)
      .subscribe((success: any) => {
        this.notes = success;
        this.notesDDL = success.ientDDL?.value;
        if (!!success.msg?.infoMessage) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        }
      });
  }

  saveNotes() {
    if (this.bform.valid) {
      this.notes.cashCounterDepositBookId = this.id;
      this.apiDataService
        .saveDepositBookNotes(this.notes)
        .subscribe((success: any) => {
          this.cashCounterDepositBook = success;
          this.notes.notes = '';
          this.notes.statusValue = '';
          this.depositDataSource = success.lstCashCounterDepositBookSummary;
          if (!!success.pentReceiptSearchResult) {
            this.receiptDataSource =
              success.pentReceiptSearchResult?.pentReceiptSearchSet;
          } else {
            this.receiptDataSource = [];
          }
          this.statusDataSource =
            success.lstCashCounterDepositBookStatusHistory;
          this.errorTrue = false;
          if (!!success.msg?.infoMessage) {
            this.data.successMessage(success.msg.infoMessage.msgDescription);
          }
        });
    } else {
      this.errorTrue = true;
    }
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
    this.edit = false;
  }
  saveReconclilation() {
    if (this.aform.valid) {
      this.apiDataService
        .saveDepositSummary(this.depositDetailSummary)
        .subscribe((success: any) => {
          this.cashCounterDepositBook = success;
          this.edit = true;
          this.openDepositSummary(
            this.cashCounterDepositBook.lstCashCounterDepositBookSummary[0]
              .cashCounterDepositBookSummaryId
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
          width: '450px',
          height: '500px',
        });
      });
  }

  async collectedFinanceAmount() {
    this.errorTrue = false;

    this.depositDetailSummary.isBoolClosingBalance = 'False';

    this.apiDataService
      .openDenomination(this.depositDetailSummary)
      .subscribe(async (success) => {
        this.depositDetailSummary = success;
        this.closingAmountDataSoruce = success.plstDepositSummaryDenomination;

        await this.dialog.openDialog(this.ClosingAmount, {
          width: '750px',
          height: '500px',
        });
      });
  }

  count(val: any) {
    // Ensure valid denomination count or set to 0 if not provided
    val.denominationCount = parseInt(val.denominationCount) || 0;

    // Calculate totalAmount dynamically based on denominationDescription
    if (val.denominationCount > 0 && val.denominationDescription) {
      val.totalAmount = (
        Number(val.denominationDescription) * Number(val.denominationCount)
      ).toFixed(2);
    } else {
      val.totalAmount = ''; // Set to empty string if count is 0 or invalid
    }
  }

  clearDenomination() {
    this.closingAmountDataSoruce.forEach((element: any) => {
      element.denominationCount = 0; // Reset count to 0
      element.totalAmount = ''; // Reset totalAmount to empty string
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
          if ((this.depositDetailSummary.isBoolClosingBalance = 'False')) {
            this.setDefaultMismatchAmount();
          }
        });
    } else {
      this.errorTrue = true;
    }
  }

  hideBtnBasedonStatus() {
    const status = this.cashCounterDepositBook.statusValue;
    return !(status === 'CREAT' || status === 'OPENS' || status === 'CLOSD');
  }

  successMessage(message: string) {
    console.log(message);
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async onSelectTab(val: any) {
    this.selectedTab = val;
    if (val === 3) {
      this.createNotes();
    }
  }

  async navigateToDetail() {
    const obj = {
      data: 0,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl('/home/finance/deposit-book/info/' + urlJson);
  }

  navigateToList() {
    this.router.navigateByUrl('/home/finance/deposit-book/search');
  }
  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus');
  }
}
