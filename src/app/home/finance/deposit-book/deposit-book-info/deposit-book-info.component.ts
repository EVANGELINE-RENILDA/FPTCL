import { NgClass, CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
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
} from '../../../../app-core/core-component/core-component.component';
import { FooterToggleDirective } from '../../../../app-core/directives/toggle-directive/footer-toggle.directive';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AppTableComponent } from '../../../../app-core/template/app-table/app-table.component';
import { DocumentsComponent } from '../../../../app-core/template/documents/documents.component';
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
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import {
  entActAttachments,
  entActFundTransferNote,
  entActNotes,
  entActVoucherConfig,
} from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppSettingsService } from '../../../../common/services/app-settings/app-settings.service';
import { ViewPdfComponent } from '../../../../app-core/template/view-pdf/view-pdf.component';
import { SearchDebitComponent } from '../../../search/search-debit/search-debit.component';
import { SearchCreditComponent } from '../../../search/search-credit/search-credit.component';
import { FilterAndSortPipe } from '../../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe';
import { AppSafePipe } from '../../../../common/pipes/app-safe/app-safe.pipe';
import { TimeControlComponent } from '../../../../app-core/form-input/time-control/time-control.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { entCashCounterDepositBook } from '../../../../common/api-services/application-api/application-api.classes';
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';
@Component({
  selector: 'app-deposit-book-info',
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
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './deposit-book-info.component.html',
  styleUrl: './deposit-book-info.component.scss',
})
export class DepositBookInfoComponent implements OnInit {
  pageId = 'DBSCN';
  id: any = 0;
  branchName = '';
  cashCounterDepositBook = new entCashCounterDepositBook();
  editbtn = false;
  errorTrue = false;
  cashCounterDDL: any = [];
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('b') bform!: NgForm;
  branchValue: any;
  branchvalue: any;
  constructor(
    public route: ActivatedRoute,
    public url: UrlService,
    public data: DataService,
    public apiDataService: ApplicationApiService,
    public appSettings: AppSettingsService,
    public appService: AppService,
    public router: Router,
    public storage: AppStorageService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.init();
    });
  }
  ngOnInit(): void {}

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    await this.data.checkToken();
    let params: any = await this.url.decode(id);
    await this.data.checkToken();
    this.id = params.id;
    await this.storage.get('branchFinance').then((val) => {
      this.branchName = val;
    });
    await this.storage.get('branchvalue').then((val) => {
      this.branchValue = val;
    });

    this.editbtn = params.clicked;

    if (this.id !== 0) {
      this.openDepositBook(this.id);
    } else {
      this.createNewDepositBook();
    }
  }

  openDepositBook(val: any) {
    const obj = {
      data: val,
    };
    const obj2 = {
      data: this.branchValue,
    };
    this.apiDataService
      .openCashCounterDepositBook(obj)
      .subscribe((success: any) => {
        this.cashCounterDepositBook = success;

        if (!!success.msg?.infoMessage) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
          this.apiDataService.getCashCounterBasedOnBranch(obj2).subscribe({
            next: (success) => {
              this.cashCounterDDL = success.data[0]?.value;
            },
          });
        }
      });
  }
  createNewDepositBook() {
    const obj2 = {
      data: this.branchValue,
    };
    this.apiDataService.createNewDepositBook().subscribe((success: any) => {
      this.cashCounterDepositBook = success;
      if (!!success.msg?.infoMessage) {
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      }
      this.apiDataService.getCashCounterBasedOnBranch(obj2).subscribe({
        next: (success) => {
          this.cashCounterDDL = success.data[0]?.value;
        },
      });
    });
  }

  setBranchValue(val: any) {
    // this.appService.branchDDL.forEach((element:any) => {
    //   if(val === element.id){
    //     this.cashCounterDepositBook.ientAppCompanyBranch.branchValue = element.constant;
    //     this.cashCounterDepositBook.ientAppCompanyBranch.branchName = element.description;
    //   }
    // });
    if (val) {
      this.getCashCounterBasedOnBranch(val);
    }
  }
  getCashCounterBasedOnBranch(val: any) {
    const obj = {
      data: val,
    };
    this.apiDataService
      .getCashCounterBasedOnBranch(obj)
      .subscribe((success: any) => {
        this.cashCounterDDL = success.data[0]?.value;
        if (!!success.msg?.infoMessage) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        }
      });
  }
  hideBtnBasedonStatus() {
    let hideButton = false;
    if (
      this.cashCounterDepositBook.statusValue === 'CREAT' ||
      this.cashCounterDepositBook.statusValue === 'OPENS' ||
      this.cashCounterDepositBook.statusValue === 'CLOSD'
    ) {
      hideButton = false;
    } else {
      hideButton = true;
    }
    return hideButton;
  }
  clearDepositeBook() {
    this.apiDataService.createNewDepositBook().subscribe((success: any) => {
      this.cashCounterDepositBook = success;
      this.errorTrue = false;
      this.data.successMessage('Data Cleared Successfully');
    });
  }
  depositeBookSave() {
    if (this.bform.valid) {
      // this.editbtn = false;
      this.apiDataService
        .saveCashCounterDepositBook(this.cashCounterDepositBook)
        .subscribe((success: any) => {
          this.cashCounterDepositBook = success;
          this.id = success.cashCounterDepositBookId;
          if (!!success.msg?.infoMessage) {
            this.data.successMessage(success.msg.infoMessage.msgDescription);
          }
          this.navigateDetail();
        });
    } else {
      this.errorTrue = true;
    }
  }
  async navigateDetail() {
    const obj = {
      id: this.id,
    };

    let urlJson = await this.url.encode(obj);
 
    if (Number(this.id) > 0) {
      this.router.navigateByUrl('/home/finance/deposit-book/detail/' + urlJson);
    } else {
      this.router.navigateByUrl('/home/finance/deposit-book/search');
    }
  }
  depositeBookSaveRefresh() {
    this.openDepositBook(this.id);
  }

  depositeBookEdit() {
    this.editbtn = true;
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  async navigateToList() {
    const obj = {
      data: 0,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl('/home/finance/deposit-book/detail/' + urlJson);
  }
}
