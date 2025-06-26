import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CdkMenuModule, CdkMenuTrigger } from '@angular/cdk/menu';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { AppSettingsService } from '../common/services/app-settings/app-settings.service';
import { AppService } from '../app.service';
import { AppStorageService } from '../common/services/app-storage/app-storage.service';
import { ErrorMessageComponent } from '../app-core/message/error-message/error-message.component';
import { DataService } from '../common/services/data/data.service';
import { NgTemplateOutlet } from '@angular/common';

import { NgClass } from '@angular/common';
import { CoreService } from '../app-core/service/core.service';
import { MenuAccessDirective } from '../common/permission/menu-access.directive';
import { AppAccessDirective } from '../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../common/permission/button-access.directive';
import { MenuAccessPipe } from '../common/permission/menu-access.pipe';
import { InnerScroll } from '../app-core/core-component/core-component.component';
import { UrlService } from '../common/services/url/url.service';
import { ApplicationApiService } from '../common/api-services/application-api/application-api.service';
import { entDiary } from '../common/api-services/application-api/application-api.classes';
import { AppSafePipe } from '../common/pipes/app-safe/app-safe.pipe';

export class autoSearchItems {
  autoSearchItemId = 0;
  autoSearchText = '';
}

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CdkMenuModule,
    RouterModule,
    MenuAccessPipe,
    ErrorMessageComponent,
    NgTemplateOutlet,
    NgClass,
    MenuAccessDirective,
    AppAccessDirective,
    ButtonAccessDirective,
    InnerScroll,
    AppSafePipe,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  pageId = 'PRTDV';
  @ViewChild('newDiaryDialog', { static: false })
  newDiaryDialog!: TemplateRef<any>;
  breadCrumbTemplate!: TemplateRef<any> | null;
  breadCrumbSubscribe: any;
  isNestedOpen = false;
  menuName = '';
  activeClass: any;
  sidePosition = [
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
    },
  ];
  menus: any = [
    {
      name: 'Admin',
      value: 'admin',
      icon: 'assets/icons/admin-icon.svg',
      menuAccess: 'AdminDiv',
      subMenus: [
        {
          name: 'User Request',
          url: '/home/admin/user-request',
          menuAccess: 'UserRequestSubDiv',
        },
      ],
    },
    {
      name: 'My Diary',
      value: 'diary',
      icon: 'assets/icons/my-diary.svg',
      menuAccess: 'MyDiaryDiv',
      subMenus: [
        {
          click: 'My Diary',
          menuAccess: 'MyDiarySubDiv',
          name: '',
        },
      ],
    },
    {
      name: 'My Task',
      value: 'task',
      icon: 'assets/icons/my-task.svg',
      menuAccess: 'MyTaskDiv',
      subMenus: [
        {
          name: 'Task List',
          url: '/home/my-task/workflow',
          menuAccess: 'WorkFlowSubDiv',
        },
      ],
    },
    {
      name: 'Files',
      value: 'files',
      icon: 'assets/icons/folder-icon.svg',
      menuAccess: 'MyFileAccDiv',
      subMenus: [
        {
          name: 'Account',
          url: '/home/file/account-search',
          menuAccess: 'MyFileSubDiv',
        },
        {
          name: 'File',
          url: '/home/file/file-search',
          menuAccess: 'MyFileAccountDiv',
        },
      ],
    },
    {
      name: 'Organization',
      value: 'organization',
      icon: 'assets/icons/organization.svg',
      menuAccess: 'OrganizationDiv',
      subMenus: [
        {
          name: 'New Organization Application',
          url: '/home/organization/organization-application/search',
          menuAccess: 'NewOrganizationSubDiv',
        },
        {
          name: 'Organization Change in Detail ',
          url: '/home/organization/organization-change/search',
          menuAccess: 'OrgChangeinDetailSubDiv',
        },
        {
          name: 'Registered Organization',
          url: '/home/organization/registered-organization/search',
          menuAccess: 'RegisteredOrgSubDiv',
        },
      ],
    },
    {
      name: 'CRM',
      value: 'crm',
      icon: 'assets/icons/crm.svg',
      menuAccess: 'CRMDiv',
      subMenus: [
        {
          name: 'Customer',
          url: '/home/crm/customer',
          menuAccess: 'CustAppSubDiv',
        },
        {
          name: 'Customer Service',
          url: '/home/crm/customer-service',
          menuAccess: 'CustServSubDiv',
        },
        {
          name: 'Lead',
          url: '/home/crm/lead',
          menuAccess: 'CustLeadSubDiv',
        },
        {
          name: 'Customer Update',
          url: '/home/crm/customer-update',
          menuAccess: 'CustUPAppSubDiv',
        },
        {
          name: 'Report',
          url: '',
          menuAccess: 'CustReportSubDiv',
        },
        {
          click: 'Dashboard',
          name: '',
          menuAccess: 'CustDashboardSubDiv',
        },
      ],
    },
    {
      name: 'Trust',
      value: 'trust',
      icon: 'assets/icons/trust.svg',
      menuAccess: 'TrustDiv',
      subMenus: [
        {
          name: 'Trust Search',
          url: '/home/trust/trust-search',
          menuAccess: 'TrustAppSubDiv',
        },
        {
          name: 'Trust Application',
          url: '/home/trust/trust-application',
          menuAccess: 'TrustAppSubDiv',
        },
        {
          name: 'Trust Account',
          url: '',
          menuAccess: 'TrustAccountSubDiv',
        },
        {
          name: 'Trust Withdrawal',
          url: '/home/trust/trust-withdrawal',
          menuAccess: 'TrustWithdrawalSubDiv',
        },

        {
          name: 'Trust Report',
          url: '',
          menuAccess: 'TrustReportSubDiv',
        },
        {
          name: 'Trust Settlement',
          url: '/home/trust/trust-settlement',
          menuAccess: 'TrustSettlementSubDiv',
        },
      ],
    },
    {
      name: 'Will',
      value: 'will',
      icon: 'assets/icons/will.svg',
      menuAccess: 'WillDiv',
      subMenus: [
        {
          name: 'Will Application',
          url: '/home/will/will-application/search',
          menuAccess: 'WillAppSubDiv',
        },
        {
          name: 'Will',
          url: '/home/will/search',
          menuAccess: 'WillAppSubDiv',
        },
        // {
        //   name: 'Will Account',
        //   url: '',
        //   menuAccess: '1'
        // },
        {
          name: 'Will Report',
          url: '',
          menuAccess: 'WillReportSubDiv',
        },
      ],
    },
    {
      name: 'Estate',
      value: 'estate',
      icon: 'assets/icons/trust.svg',
      menuAccess: 'EstateDiv',
      subMenus: [
        {
          name: 'Death Notice',
          url: '/home/estate/death-notice-search',
          menuAccess: 'DeathNoticeSubDiv',
        },

        {
          name: 'Estate Application',
          url: '/home/estate/estate-application/search',
          menuAccess: 'EstateAppSubDiv',
        },

        {
          name: 'Estate Account',
          url: '',
          menuAccess: 'EstateAccSubDiv',
        },
        {
          name: 'Estate Disbursement',
          url: '',
          menuAccess: 'EstateDisbursementSubDiv',
        },
        {
          name: 'Estate Report',
          url: '',
          menuAccess: 'EstateReportSubDiv',
        },
      ],
    },
    {
      name: 'Legal',
      value: 'legal',
      icon: 'assets/icons/legal.svg',
      menuAccess: 'LegalDiv',
      subMenus: [
        {
          name: 'Legal and Other Service ',
          url: 'legal/legal-other-service-search',
          menuAccess: 'LegalSubDiv',
        },
        // {
        //   name: 'Other Service',
        //   url: 'OtherSubDiv',
        //   menuAccess: '1'
        // },
        // {
        //   name: 'Case Management',
        //   url: '',
        //   menuAccess: '1'
        // }
      ],
    },
    {
      name: "Dashboard",
      value: 'dashboard',
      icon: 'assets/icons/line-chart.svg',
      menuAccess: 'CRMDiv', 
      subMenus: [
        {
          name: 'Customer',
          url: '/home/customer-dashboard',
          menuAccess: 'CustAppSubDiv'

        },
        {
          name: 'Lead',
          url: '/home/lead-dashboard',
          menuAccess: 'CustLeadSubDiv'

        },
        {
          name: 'Trust',
          url: '/home/trust-dashboard',
          menuAccess: 'CustLeadSubDiv'

        },
        {
          name: 'Will',
          url: '/home/will-dashboard',
          menuAccess: 'CustLeadSubDiv'

        }
      ]
    },
    // {
    //   name: "Sales",
    //   value: 'sales',
    //   icon: 'assets/icons/sales.svg',
    //   menuAccess: '1',
    //   subMenus: [

    //     {
    //       name: 'Sales Quotation',
    //       url: '/home/sales/sales-quotation/search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Sales Order',
    //       url: '/home/sales/sales-order/search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Sales Invoice',
    //       url: '/home/sales/sales-invoice/search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Advance Receipt Note',
    //       url: '/home/sales/advance-receipt-note/search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Receipt Note',
    //       url: '/home/sales/receipt-note/search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Credit Note',
    //       url: '/home/sales/credit-note/search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Customer',
    //       url: '/home/sales/customer/search',
    //       menuAccess: '1'
    //     }
    //   ]
    // },
    // {
    //   name: "Purchase",
    //   value: 'purchase',
    //   icon: 'assets/icons/purchase.svg',
    //   menuAccess: '1',
    //   subMenus: [

    //     // {
    //     //   name: 'Purchase Quotation',
    //     //   url: '/home/purchase/purchase-quotation/search',
    //     //   menuAccess: '1'
    //     // },
    //     {
    //       name: 'Purchase Order',
    //       url: '/home/purchase/purchase-order/search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Purchase Invoice',
    //       url: '/home/purchase/purchase-invoice/search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Advance Payment Note',
    //       url: '/home/purchase/advance-payment-note/search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Payment Note',
    //       url: '/home/purchase/payment-note/search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Debit Note',
    //       url: '/home/purchase/debit-note/search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Vendor',
    //       url: '/home/purchase/vendor/search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Purchase Order Outstanding',
    //       url: '/home/purchase/report/purchase-order-outstanding',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Item Wise Purchase Report',
    //       url: '/home/purchase/report/item-wise-purchase-report-search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Vendor Wise Purchase Report',
    //       url: '/home/purchase/report/vendor-wise-purchase-report-search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Credit Summary Report',
    //       url: '/home/purchase/report/credit-summary-report/search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Creditors Detail Report',
    //       url: '/home/purchase/report/creditors-detail-report/search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Purchase Quotation',
    //       url: '/home/purchase/purchase-quotation/search',
    //       menuAccess: '1'
    //     }
    //   ]
    // },
    // {
    //   name: "Inventory",
    //   value: 'inventory',
    //   icon: 'assets/icons/inventory.svg',
    //   menuAccess: '1',
    //   subMenus: [
    //     {
    //       name: 'Category',
    //       url: '/home/inventory/configuration/category/search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Item',
    //       url: '/home/inventory/configuration/item/search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Item Type & Sub Type',
    //       url: '/home/inventory/configuration/items/item-type-sub-type',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Production Note',
    //       url: '/home/inventory/stock/production-note/search',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Transfer Note',
    //       url: '/home/inventory/stock/stock-transfer-note/search',
    //       menuAccess: '1'
    //     }
    //     ,
    //     // {
    //     //   name: 'Stock-register-report',
    //     //   url: '/home/inventory/report/stock-register-report/search',
    //     //   menuAccess: '1'
    //     // }
    //   ]
    // },
    {
      value: 'finance',
      icon: 'assets/icons/finance.svg',
      menuAccess: 'FINDIV',
      click: 'Finance',

      //   {
      //     name: 'Ledger',
      //     url: '/home/finance/ledger/list',
      //     menuAccess: 'LEDGR'
      //   },
      //   {
      //     name: 'Voucher',
      //     url: '/home/finance/voucher/search',
      //     menuAccess: 'VOCHR'
      //   },
      //   {
      //     name: 'Voucher Account',
      //     url: '/home/finance/voucher-account/search',
      //     menuAccess: 'VOCAC'
      //   },
      //   // {
      //   //   name: 'Payment Note',
      //   //   url: '/home/finance/payment-note/search',
      //   //   menuAccess: '1'
      //   // },
      //   {
      //     name: 'Fund-transfer',
      //     url: '/home/finance/fund-transfer-note/search',
      //     menuAccess: 'FUDTN'
      //   },
      //   // {
      //   //   name: 'Advance Payment Note',
      //   //   url: '/home/finance/advance-payment-note/search',
      //   //   menuAccess: '1'
      //   // },
      //   {
      //     name: 'Journal Voucher',
      //     url: '/home/finance/journal-voucher/search',
      //     menuAccess: 'JUNVC'
      //   },
      //   {
      //     name: 'Reversing Journal',
      //     url: '/home/finance/reversing-journal/search',
      //     menuAccess: 'RJVUH'
      //   },
      //   {
      //     name: 'Tax',
      //     url: '/home/finance/tax/search',
      //     menuAccess: 'TAX'
      //   },
      //   {
      //     name: 'Exchange Rate',
      //     url: '/home/finance/exchange-rate/search',
      //     menuAccess: 'EXCRT'
      //   },
      //   {
      //     name: 'Net Out Voucher',
      //     url: '/home/finance/net-out-voucher/search',
      //     menuAccess: '1'
      //   },
      //   {
      //     name: 'P & L Statement',
      //     url: '/home/finance/profit-and-loss/profit-and-loss-report',
      //     menuAccess: '1'
      //   },
      //   {
      //     name: 'Ledger Transactions',
      //     url: '/home/finance/ledger-transaction/search',
      //     menuAccess: 'LDTRS'
      //   },
      //   {
      //     name: '',
      //     click: 'Ledger Detail Report',
      //     menuAccess: '1'
      //   },
      //   {
      //     name: 'Cash Counter',
      //     url: '/home/finance/cash-counter/search',
      //     menuAccess: 'LDTRS'
      //   },
      //   {
      //     name: 'Assigned Cashier',
      //     url: '/home/finance/assigned-cashier/search',
      //     menuAccess: 'LDTRS'
      //   },
      //   {
      //     name: 'Deposit Book',
      //     url: '/home/finance/deposit-book/search',
      //     menuAccess: 'LDTRS'
      //   },
      //   {
      //     name: 'Cash Counter',
      //     url: '/home/finance/cash-counter/search',
      //     menuAccess: 'LDTRS'
      //   },
      //   {
      //     name: 'Assigned Cashier',
      //     url: '/home/finance/assigned-cashier/search',
      //     menuAccess: 'LDTRS'
      //   },
      //   {
      //     name: 'Deposit Book',
      //     url: '/home/finance/deposit-book/search',
      //     menuAccess: 'LDTRS'
      //   }

      // ]
    },
    // {
    //   name: "Corporate",
    //   value: 'corporate',
    //   icon: 'assets/icons/finance.svg',
    //   menuAccess: '1',
    //   subMenus: [
    //     {
    //       name: 'Finance',
    //       url: 'corporate/finance-menus',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Purchase',
    //       url: 'corporate/purchase-menus',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Sales',
    //       url: 'corporate/sales-menus',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'Inventory',
    //       url: 'corporate/inventory-menus',
    //       menuAccess: '1'
    //     },

    //   ]

    // },
    // {
    //   name: "Trustee",
    //   value: 'trustee',
    //   icon: 'assets/icons/finance.svg',
    //   menuAccess: '1',
    //   subMenus: [
    //     {

    //       name: 'Finance',
    //       url: 'trustee/finance-menus',
    //       menuAccess: '1'
    //     },
    //     {
    //       name: 'T&E',
    //       url: 'trustee/t_e',
    //       menuAccess: '1'

    //     }
    //   ]
    // }
  ];
  constructor(
    public appSettings: AppSettingsService,
    public appService: AppService,
    public storage: AppStorageService,
    public data: DataService,
    public coreService: CoreService,
    private router: Router,
    public url: UrlService,
    public apiService: ApplicationApiService
  ) // private menuTrigger: CdkMenuTrigger
  {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.appService.setBreadCrumb(null);
      }
    });
    this.breadCrumbSubscribe = this.appService
      .watchBreadCrumbChanged()
      .subscribe((val) => {
        if (val) {
          setTimeout(() => {
            this.breadCrumbTemplate = this.appService.getBreadCrumb();
          }, 100);
        }
      });
  }
  loginID = '';
  ngOnInit(): void {
    this.storage.set('newRemainder', 66);
    this.storage.set('oldRemainder', 0);
    this.storage.get('userData').then((val) => {
      this.appService.userData = val;
    });
    this.storage.get('userLoginId').then((val) => {
      this.appService.userLoginId = val;
    });
    this.storage.get('companyCurrencyValue').then((val) => {
      this.appService.currencyValue = val;
    });
    this.storage.get('companyId').then((val) => {
      this.appService.companyId = val;
    });
    this.storage.get('branchDDL').then((val) => {
      this.appService.branchDDL = val;
      // console.log(val);
    });
    this.storage.get('fiscalYearList').then((val) => {
      this.appService.fiscalYearList = val;
      // console.log(val);
    });
    this.storage.get('branchValue').then((val) => {
      this.appService.branchId = val;
    });
    this.storage.get('branchId').then((val) => {
      this.appService.branchValue = val;
    });
    this.setActiveUrl(this.router.url);
  }

  ngOnDestroy() {
    if (this.breadCrumbSubscribe) {
      this.breadCrumbSubscribe.unsubscribe();
      // this.storage.set('sourcePrimaryKey', 0);
    }
  }

  async doLogout() {
    await this.coreService.logout();
    await this.coreService.closeDialog();
  }

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }
  financeCondn = false;
  inventoryCondn = false;
  salesCondn = false;
  purchaseCondn = false;
  menuValue(val: any) {
    this.storage.set('sourcePrimaryKey', 0);
    this.menuName = val;
  }

  setActiveUrl(val: any) {
    let urlParts = val.split('/');
    this.menuName = urlParts[2];
  }
  async submenuClickNavigate() {
    const obj = {
      data: 0,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl(
      '/home/finance/ledger-summary/ledger-summary-detail/' + urlJson
    );
  }
  navigatetoFianance() {
    this.router.navigateByUrl('/home/finance/menus');
  }
  navigateDiary() {
    ;
    const obj = {
      data: this.appService.userLoginId,
    };
    this.apiService.getStaffDiary(obj).subscribe((success) => {
      if (success.data === 0) {
        this.createNewDiary();
      } else {
        this.router.navigateByUrl('/home/my-diary/search');
        this.storage.set('myDiaryId', success.data);
      }
    });
  }
  async createNewDiary() {
    this.data.showErrorMessage = false;
    let dialogResponse: any = await this.coreService.openDialog(
      this.newDiaryDialog,
      {
        height: 'auto',
        width: '360px',
        maxWidth: '1170px',
      }
    );
  }
  diaryData = new entDiary();
  yesCreate() {
    this.apiService.createDiary().subscribe((success) => {
      this.diaryData = success;
      this.saveNewDiary();
    });
  }
  saveNewDiary() {
    this.diaryData.staffUserId = this.appService.userLoginId;
    this.apiService.saveDiary(this.diaryData).subscribe((success) => {
      this.diaryData = success;
      this.storage.set('myDiaryId', success.diaryId);
      this.coreService.closeAll();
      this.router.navigateByUrl('/home/my-diary/search');
    });
  }
  @ViewChild('viewUserManual') viewUserManual!: any;
  async openUserManual() {
    let dialogResponse: any = await this.coreService.openDialog(
      this.viewUserManual,
      {
        height: '90%',
        width: '85%',
      }
    );
    if (dialogResponse) {
    }
  }
  menuCheck() {
    // console.log('hello');
  }
  openSubmenu(val: any): void {
    // this.menuTrigger.open();
  }
}
