import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass, JsonPipe, DecimalPipe } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TabContainerModule } from '../../../../app-core/app-template/tab-container/tab-container.module';
import { TabItemModule } from '../../../../app-core/app-template/tab-item/tab-item.module';
import {
  Row,
  ViewLabel,
  InnerScroll,
  AppToolTipComponent,
} from '../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../app-core/message/error-message/error-message.component';
import { AccordionModule } from '../../../../app-core/template/accordion/accordion.module';
import {
  AppTableComponent,
  CellDefDirective,
  CellHeaderDefDirective,
} from '../../../../app-core/template/app-table/app-table.component';
import { DocumentsComponent } from '../../../../app-core/template/documents/documents.component';
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
import { entActGroup } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppCurrencyPipe } from '../../../../common/pipes/app-currency/app-currency.pipe';
import { CheckboxComponent } from '../../../../app-core/template/checkbox/checkbox.component';
import { ledgerData } from '../../ledger/ledger-tree/ledger-tree.component';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';


// export class ledgerData {
//   actLedgerId = 0;
//   groupName = '';
//   groupNatureDescription = '';
//   groupNatureValue = '';
//   tabIndex = 0;
// }

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [
    CdkAccordionModule,
    NgClass,
    AccordionModule,
    JsonPipe,
    Row,
    ViewLabel,
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    IconButtonComponent,
    CustomerServiceListComponent,
    LeadListComponent,
    MatProgressSpinnerModule,
    CustomerUpdateListComponent,
    InnerScroll,
    FormsModule,
    InputControlComponent,
    StatusHistoryComponent,
    AppDatePipe,
    MatSlideToggleModule,
    MultiPageUrlComponent,
    DocumentsComponent,
    ErrorMessageComponent,
    AppAccessDirective,
    ButtonAccessDirective,
    AppToolTipComponent,
    MatSlideToggleModule,
    TabContainerModule,
    TabItemModule,
    Row,
    MatMenuModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTooltipModule,
    AppCurrencyPipe,
    CheckboxComponent,
    DecimalPipe
  ],
  providers: [AppCurrencyPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.scss',
})
export class GroupDetailComponent {
  pageId = 'AGRPS';

  errorTrue = false;
  showSubLedger = false;
  selectedTab = 0;
  groupData: any = {};
  // type = '';

  group = new entActGroup();
  ledgerData = new ledgerData();

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  subGroup: any = [
    'subGroup',
    'debitAmt',
    'creditAmt',
    'createdDate',
    'add',
  ];
  subGroupName: any = [
    'Sub Group Name',
    'Debit Amount (INR)',
    'Credit Amount (INR)',
    'Created Date',
    '',
  ];
  subGroupTableData = [];

  ledger: any = [
    'ledgerName',
    'debitAmt',
    'creditAmt',
    'createdDate',
    'add',
  ];
  ledgerName: any = [
    'Ledger Name',
    'Debit Amount (INR)',
    'Credit Amount (INR)',
    'Created Date',
    '',
  ];
  ledgerTableData = [];

  options = {
    type: 'accountsPath',
  };
  breadCrumbTrust: any;
  currencyValue: any;

  constructor(
    public route: ActivatedRoute,
    public data: DataService,
    public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public url: UrlService,
    public router: Router,
    private appService: AppService,
    public storage: AppStorageService,
  ) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();
    });
  }

  async init() {
    await this.data.checkToken();
    let groupData = this.route.snapshot.paramMap.get('id');
    this.groupData = await this.url.decode(groupData);
    console.log(this.groupData);
    this.initialData.getAcccountsDDL('getIntGroupInitialData', this.options);
    this.appService.setBreadCrumb(this.breadCrumb);

    console.log(this.initialData.DDLValues.DDLLedgerGroupNature);

    await this.storage.get('currencyValue').then((val) => {
      this.currencyValue = val;
      console.log(this.currencyValue);
    });

    if (this.groupData.actGroupId === 0) {
      this.createNewAccountGroup();
    } else {
      this.openAccountsGroup(this.groupData.actGroupId);
    }

    this.storage.get('Region').then((val: any) => {
      console.log(val);
      if (val !== null || val !== undefined || val !== '') {
        this.breadCrumbTrust = val;
      }
    })
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  onSelectTab(val: any) {
    this.selectedTab = val;
    if (this.selectedTab === 0) {
      this.showSubLedger = false;
    } else if (this.selectedTab === 1) {
      this.showSubLedger = true;
    }
  }


  createNewAccountGroup() {
    // this.type = 'new';
    const obj = {
      data: this.groupData.regionValue,
    };
    this.accountsService
      .createNewAccountGroup(obj, this.options)
      .subscribe((success) => {
        this.group = success;
        console.log(this.groupData);

        this.group.parentGroupId = this.groupData.parentGroupId;
        this.group.parentGroupName = this.groupData.groupName;
        this.group.groupNatureDescription = this.groupData.groupNatureDescription;
        this.group.regionValue = this.groupData.regionValue;
        this.group.groupNatureValue = this.groupData.groupNatureValue;
        this.group.impactProfitLoss = this.groupData.impactProfitLoss;
      });
  }

  saveAccountsGroup(l: any, type?: any) {
    if (l.valid) {
      this.accountsService
        .saveAccountGroup(this.group, this.options)
        .subscribe(async (success) => {
          this.group = success;
          this.appService.setBreadCrumb(this.breadCrumb);
          if (type === 'save') {
            let urlJson = await this.url.encode(success);
            this.router.navigateByUrl('/home/finance/group/detail/' + urlJson);
          }
          this.subGroupTableData = this.group.ilistOfGroup;
          this.errorTrue = false;
          this.data.successMessage(success.msg.infoMessage.msgDescription);
          // if (this.group.actGroupId > 0) {
          //   this.type = 'edit';
          // }
        });
    } else {
      this.errorTrue = true;
      this.data.errorInfoMessage('Please fill all mandatory fields');
    }
  }
  openAccountsGroup(val: any) {

    const obj = {
      data: val,
    };
    this.accountsService
      .openAccountsGroup(obj, this.options)
      .subscribe((success) => {
        this.group = success;
        this.subGroupTableData = this.group.ilistOfGroup;
        this.ledgerTableData = this.group.ilistentLedger;
        this.data.successMessage(success.msg.infoMessage.msgDescription);
      });
  }

  createNewSubgroup() {
    this.group.parentGroupId = this.group.actGroupId;
    this.groupData = this.group;
    this.createNewAccountGroup();
  }

  async subGroupDelete(val: any) {
    let msg = `Are you sure, You want to delete : ${val.groupName} ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      this.deleteSubGroup(val);
    }
  }

  deleteSubGroup(val: any) {
    const obj = {
      data: val.actGroupId,
    };
    this.accountsService
      .deleteSelectedAccountsGroup(obj, this.options)
      .subscribe((success) => {
        this.subGroupTableData = success.ilistOfGroup;

      });
  }

  async createNewLedger() {

    this.ledgerData.regionValue = this.group.regionValue;
    this.groupData.groupNatureDescription = this.group.groupNatureDescription;
    this.groupData.groupNatureValue = this.group.groupNatureValue;
    let ledgerJson = await this.url.encode(this.ledgerData);
    let groupJson = await this.url.encode(this.groupData);
    this.router.navigateByUrl(
      '/home/finance/ledger/detail/' + ledgerJson + '/' + groupJson
    );
  }

  async navigateLedger(ledger: any) {
    this.ledgerData.actLedgerId = ledger.actLedgerId;
    let ledgerJson = await this.url.encode(this.ledgerData);
    let groupJson = await this.url.encode(this.groupData);
    this.router.navigateByUrl(
      '/home/finance/ledger/detail/' + ledgerJson + '/' + groupJson
    );
  }

  async ledgerDelete(val: any) {

    let msg = `Are you sure, You want to delete : ${val.ledgerName} ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      this.deleteSelectedRowInActLedger(val);
    }
  }

  deleteSelectedRowInActLedger(val: any) {
    const obj = {
      data: val.actLedgerId,
    };
    this.accountsService
      .deleteSelectedRowInActLedger(obj, this.options)
      .subscribe((success) => {
        this.ledgerTableData = success.ilistentLedger;
      });
  }

  profitChange(event: any) {
    if (event.checked) {
      this.group.impactProfitLoss = 'Y';
    } else {
      this.group.impactProfitLoss = 'N';
    }
  }

  doClear() {
    this.errorTrue = false;
    this.createNewAccountGroup();
  }

  doRefresh() {
    this.openAccountsGroup(this.groupData.actGroupId);
  }

  navBack() {
    this.router.navigateByUrl('/home/finance/group/list')
  }

  navigateToAccount() {
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }

  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus')
  }
}
