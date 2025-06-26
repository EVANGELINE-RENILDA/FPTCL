import { NgClass, CommonModule, Location } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Inject,
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
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { entCashCounter } from '../../../../common/api-services/application-api/application-api.classes';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { FormInputControl } from '../../../../app-core/form-input/form-input-control';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';

@Component({
  selector: 'app-cash-counter-info',
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
    AccoutsStatusTableComponent,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './cash-counter-info.component.html',
  styleUrl: './cash-counter-info.component.scss',
})
export class CashCounterInfoComponent implements OnInit {
  pageId = 'CCDSC';
  id = 0;
  editBtn = false;
  errorTrue = false;
  cashCounter = new entCashCounter();
  cashCounterRAW = new entCashCounter();
  options = {
    type: 'applicationPath',
  };
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('a') aform!: NgForm;

  branchvalue = '';
  branchId = 0;

  constructor(
    public appService: AppService,
    public appSettings: AppSettingsService,
    public data: DataService,
    public initialData: InitialDataService,
    public apiDataService: ApplicationApiService,
    public url: UrlService,
    public router: Router,
    public dialog: CoreService,
    public route: ActivatedRoute,
    public storage: AppStorageService,
    public urlService: UrlService,
    @Inject(DIALOG_DATA) public dialogData: any
  ) {
    this.route.paramMap.subscribe((params) => {});
  }

  ngOnInit() {
    console.log(this.dialogData, 'dialogData');

    this.init();
  }

  async init() {
    console.log(this.appService.branchDDL);
    // let id = this.route.snapshot.paramMap.get('id');
    // let params: any = await this.url.decode(id);
    await this.data.checkToken();
    this.editBtn = this.dialogData.clicked;
    this.id = this.dialogData.data;
    await this.storage.get('branchvalue').then((val) => {
      this.branchvalue = val;
    });
    await this.storage.get('branchId').then((val) => {
      this.branchId = val;
    });
    if (this.id === 0) {
      this.createCashCounter();
    } else {
      this.openCashCounter(this.id);
    }
  }

  createCashCounter() {
    this.apiDataService.createCashCounter().subscribe((success) => {
      this.cashCounter = success;
      if (!!success.msg?.infoMessage) {
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      }
    });
  }
  openCashCounter(val: any) {
    const obj = {
      data: val,
    };
    this.apiDataService.openCashCounter(obj).subscribe((success) => {
      this.cashCounter = success;
      console.log(this.cashCounter);

      if (!!success.msg?.infoMessage) {
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      }
    });
  }
  doClear() {
    this.cashCounter = JSON.parse(JSON.stringify(this.cashCounterRAW));
    this.createCashCounter();
  }
  async saveCashCounter(val:any) {
    if (this.aform.valid) {
      this.cashCounter.branchId = this.branchId;
      this.cashCounter.branchValue = this.branchvalue;
      this.apiDataService
        .saveCashCounter(this.cashCounter)
        .subscribe(async (success) => {
          this.cashCounter = success;

          await this.dialog.closeAll();
        if(val==='save'){
          const obj={
            data:this.cashCounter.cashCounterId
          }
          let urlJson = await this.urlService.encode(obj);
          this.router.navigateByUrl('/home/finance/cash-counter/detail/'+ urlJson)
        }
          // if (!!success.msg?.infoMessage) {
          // await this.openCashCounter(success.cashCounterId);
          this.data.successMessage(success.msg?.infoMessage?.msgDescription);
          // }
        });
    } else {
      this.errorTrue = true;
    }
  }
  async navigateDetail(id: number) {
    if (id !== 0) {
      const obj = {
        data: id,
      };
      let urlJson = await this.url.encode(obj);
      this.router.navigateByUrl('/home/finance/cash-counter/detail/' + urlJson);
    } else {
      this.router.navigateByUrl('/home/finance/cash-counter/search');
    }
  }
  setBranchValue(val: any) {
    if (val) {
      this.appService.branchDDL.forEach((element: any) => {
        if (val === element.branchId) {
          this.cashCounter.branchValue = element.branchValue;
          // this.cashCounter.branchValue = element.branchValue;
          this.cashCounter.branchDescription = element.branchDescription;
        }
      });
    }
  }

  hideBtnBasedonStatus() {
    let hideButton = false;
    if (
      this.cashCounter.statusValue === 'PNDSU' ||
      (this.cashCounter.statusValue === 'PEVRI' &&
        this.cashCounter.assignedOfficerFlag === true)
    ) {
      hideButton = false;
    } else {
      hideButton = true;
    }
    return hideButton;
  }
  refreshCashCounter() {
    this.openCashCounter(this.id);
  }
  cashCounterEdit() {
    this.editBtn = true;
  }
}
