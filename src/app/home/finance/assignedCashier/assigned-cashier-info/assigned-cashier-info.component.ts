import { NgClass, CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { ApplicationApiService } from '../../../../common/api-services/application-api/application-api.service';
import { entCashCounter } from '../../../../common/api-services/application-api/application-api.classes';
import { AccoutsStatusTableComponent } from '../../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { DIALOG_DATA } from '@angular/cdk/dialog';
@Component({
  selector: 'app-assigned-cashier-info',
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
  templateUrl: './assigned-cashier-info.component.html',
  styleUrl: './assigned-cashier-info.component.scss',
})
export class AssignedCashierInfoComponent {
  id = 0;
  pageId = 'ASCAS';
  cashCounter = new entCashCounter();
  errorTrue = false;

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
    @Inject(DIALOG_DATA) public dialogData: any
  ) {
    this.route.paramMap.subscribe((params) => {
      this.init();
    });
  }
  ngOnInit(): void {}

  async init() {
    await this.data.checkToken();
    this.id = this.dialogData.id;
    this.openAssignedofficer(this.id);
  }

  openAssignedofficer(val: any) {
    const obj = {
      data: val,
    };
    this.apiDataService
      .openCashCounterForAssignedCashier(obj)
      .subscribe((success) => {
        this.cashCounter = success;
        if (!!success.msg?.infoMessage) {
          this.data.successMessage(success.msg.infoMessage.msgDescription);
        }
      });
  }
  async navigateDetail() {
    if (Number(this.cashCounter.cashCounterId) > 0) {
      const obj = {
        id: this.cashCounter.cashCounterId,
      };
      let urlJson = await this.url.encode(obj);
      this.router.navigateByUrl(
        '/home/finance/assigned-cashier/detail/' + urlJson
      );
    } else {
      this.router.navigateByUrl('/home/finance/assigned-cashier/search');
    }
  }
}
