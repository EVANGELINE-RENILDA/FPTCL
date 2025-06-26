
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./start/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./start/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },
  {
    path: 'verify-otp/:id',
    loadComponent: () =>
      import('./start/verify-otp/verify-otp.component').then(
        (m) => m.VerifyOtpComponent
      ),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./start/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    children: [
      //my-task
      {
        path: 'my-task/workflow',
        loadComponent: () =>
          import(
            './home/my-task/workflow/workflow-list/workflow-list.component'
          ).then((m) => m.WorkflowListComponent),
      },
      //my-task
      {
        path: 'test1',
        loadComponent: () =>
          import('./home/test1/test1.component').then((m) => m.Test1Component),
      },
      //dashboard
      {
        path: 'customer-dashboard',
        loadComponent: () =>
          import(
            './home/dashboard/customer-dashboard/customer-dashboard.component'
          ).then((m) => m.CustomerDashboardComponent),
      },
      {
        path: 'lead-dashboard',
        loadComponent: () =>
          import(
            './home/dashboard/lead-dashboard/lead-dashboard.component'
          ).then((m) => m.LeadDashboardComponent),
      }, 
      {
        path: 'trust-dashboard',
        loadComponent: () =>
          import(
            './home/dashboard/trust-dashboard/trust-dashboard.component'
          ).then((m) => m.TrustDashboardComponent),
      },
      {
        path: 'will-dashboard',
        loadComponent: () =>
          import(
            './home/dashboard/will-dashboard/will-dashboard.component'
          ).then((m) => m.WillDashboardComponent),
      },

      //user-request
      {
        path: 'admin/user-request',
        loadComponent: () =>
          import(
            './home/admin/user-request/user-request-search/user-request-search.component'
          ).then((m) => m.UserRequestSearchComponent),
      },
      {
        path: 'admin/user-request/detail/:id',
        loadComponent: () =>
          import(
            './home/admin/user-request/user-request-detail/user-request-detail.component'
          ).then((m) => m.UserRequestDetailComponent),
      },
      // my diary
      {
        path: 'my-diary/search',
        loadComponent: () =>
          import(
            './home/my-diary/my-diary/my-diary-search/my-diary-search.component'
          ).then((m) => m.MyDiarySearchComponent),
      },

      {
        path: 'crm/customer',
        loadComponent: () =>
          import(
            './home/crm/customer/customer-list/customer-list.component'
          ).then((m) => m.CustomerListComponent),
      },


      {
        path: 'crm/customer/detail/:id',
        loadComponent: () =>
          import(
            './home/crm/customer/customer-details/customer-details.component'
          ).then((m) => m.CustomerDetailsComponent),
      },
      {
        path: 'crm/customer-service',
        loadComponent: () =>
          import(
            './home/crm/customer-service/customer-service-list/customer-service-list.component'
          ).then((m) => m.CustomerServiceListComponent),
      },
      {
        path: 'crm/customer-service/detail/:id',
        loadComponent: () =>
          import(
            './home/crm/customer-service/customer-service-detail/customer-service-detail.component'
          ).then((m) => m.CustomerServiceDetailComponent),
      },
      {
        path: 'crm/lead',
        loadComponent: () =>
          import('./home/crm/lead/lead-list/lead-list.component').then(
            (m) => m.LeadListComponent
          ),
      },
      {
        path: 'crm/lead/detail/:id',
        loadComponent: () =>
          import('./home/crm/lead/lead-detail/lead-detail.component').then(
            (m) => m.LeadDetailComponent
          ),
      },
      {
        path: 'crm/customer-update',
        loadComponent: () =>
          import(
            './home/crm/customer-update/customer-update-list/customer-update-list.component'
          ).then((m) => m.CustomerUpdateListComponent),
      },
      {
        path: 'crm/customer-update/detail/:id',
        loadComponent: () =>
          import(
            './home/crm/customer-update/customer-update-detail/customer-update-detail.component'
          ).then((m) => m.CustomerUpdateDetailComponent),
      },
      {
        path: 'trust/trust-search',
        loadComponent: () =>
          import(
            './home/trust/trust/trust.component'
          ).then((m) => m.TrustComponent),
      },
      {
        path: 'trust/trust-detail/:id',
        loadComponent: () =>
          import(
            './home/trust/trust/trust-detail/trust-detail.component'
          ).then((m) => m.TrustDetailComponent),
      },
      {
        path: 'trust/trust-application',
        loadComponent: () =>
          import(
            './home/trust/trust-application/trust-application-list/trust-application-list.component'
          ).then((m) => m.TrustApplicationListComponent),
      },
      {
        path: 'trust/trust-application/detail/:id',
        loadComponent: () =>
          import(
            './home/trust/trust-application/trust-application-dummy/trust-application-dummy.component'
          ).then((m) => m.TrustApplicationDummyComponent),
      },
      {
        path: 'trust/trust-withdrawal',
        loadComponent: () =>
          import(
            './home/trust/trust-withdrawal/trust-withdrawal-search/trust-withdrawal-search.component'
          ).then((m) => m.TrustWithdrawalSearchComponent),
      },
      {
        path: 'trust/trust-withdrawal/detail/:id',
        loadComponent: () =>
          import(
            './home/trust/trust-withdrawal/trust-withdrawal-detail/trust-withdrawal-detail.component'
          ).then((m) => m.TrustWithdrawalDetailComponent),
      },
      {
        path: 'trust/trust-settlement',
        loadComponent: () =>
          import(
            './home/trust/trust-settlement/trust-settlement-search/trust-settlement-search.component'
          ).then((m) => m.TrustSettlementSearchComponent),
      },
      {
        path: 'trust/trust-settlement/detail/:id',
        loadComponent: () =>
          import(
            './home/trust/trust-settlement/trust-settlement-detail/trust-settlement-detail.component'
          ).then((m) => m.TrustSettlementDetailComponent),
      },

      //will
      {
        path: 'will/will-application/search',
        loadComponent: () =>
          import(
            './home/will/will-application-search/will-application-search.component'
          ).then((m) => m.WillApplicationSearchComponent),
      },
      {
        path: 'will/search',
        loadComponent: () =>
          import(
            './home/will/will-search/will-search.component'
          ).then((m) => m.WillSearchComponent),
      },
      {
        path: 'will/detail/:id',
        loadComponent: () =>
          import(
            './home/will/will-detail/will-detail.component'
          ).then((m) => m.WillDetailComponent),
      },
      {
        path: 'will/will-application/:id',
        loadComponent: () =>
          import(
            './home/will/will-application-detail/will-application-detail.component'
          ).then((m) => m.WillApplicationDetailComponent),
      }, {
        path: 'will/will-application1/:id',
        loadComponent: () =>
          import(
            './home/will/will-application1/will-application.component'
          ).then((m) => m.WillApplicationComponent),
      },
      //estate
      {
        path: 'estate/estate-application/search',
        loadComponent: () =>
          import(
            './home/estate/estate-application-search/estate-application-search.component'
          ).then((m) => m.EstateApplicationSearchComponent),
      },
      {
        path: 'estate/estate-application/duplicate',
        loadComponent: () =>
          import(
            './home/estate/estate-application-1/estate-application.component'
          ).then((m) => m.EstateApplicationComponent),
      },
      {
        path: 'estate/estate-application/detail1/:id',
        loadComponent: () =>
          import(
            './home/estate/estate-application-detail-1/estate-application-detail.component'
          ).then((m) => m.EstateApplicationDetailComponent),
      },
      {
        path: 'estate/estate-detail/:id',
        loadComponent: () =>
          import(
            './home/estate/estate-detail/estate-detail.component'
          ).then((m) => m.EstateDetailComponent),
      },
      {
        path: 'estate/death-notice-search',
        loadComponent: () =>
          import(
            './home/estate/death-notice/death-notice-search/death-notice-search.component'
          ).then((m) => m.DeathNoticeSearchComponent),
      },
      {
        path: 'estate/death-notice-detail/:id',
        loadComponent: () =>
          import(
            './home/estate/death-notice/death-notice-detail/death-notice-detail.component'
          ).then((m) => m.DeathNoticeDetailComponent),
      },
      //legal
      {
        path: 'legal/legal-other-service-search',
        loadComponent: () =>
          import(
            './home/legal/legal-other-service/legal-other-service-search/legal-other-service-search.component'
          ).then((m) => m.LegalOtherServiceSearchComponent),
      },
      {
        path: 'legal/legal-other-service-detail/:id',
        loadComponent: () =>
          import(
            './home/legal/legal-other-service/legal-other-service-detail/legal-other-service-detail.component'
          ).then((m) => m.LegalOtherServiceDetailComponent),
      },
      //finance

      {
        path: 'finance/journal-voucher/search',
        loadComponent: () =>
          import(
            './home/finance/journal-voucher/journal-voucher-search/journal-voucher-search.component'
          ).then((m) => m.JournalVoucherSearchComponent),
      },
      {
        path: 'finance/menus',
        loadComponent: () =>
          import(
            './home/home-page/finance-main-menu/finance-main-menu.component'
          ).then((m) => m.FinanceMainMenuComponent),
      },
      {
        path: 'finance/journal-voucher/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/journal-voucher/journal-voucher-detail/journal-voucher-detail.component'
          ).then((m) => m.JournalVoucherDetailComponent),
      },
      {
        path: 'finance/voucher-account/search',
        loadComponent: () =>
          import(
            './home/finance/voucher-account/voucher-account.component'
          ).then((m) => m.VoucherAccountComponent),
      },
      {
        path: 'finance/company/detail',
        loadComponent: () =>
          import(
            './home/finance/my-company/company-detail/company-detail.component'
          ).then((m) => m.CompanyDetailComponent),
      },
      {
        path: 'finance/group/list',
        loadComponent: () =>
          import('./home/finance/group/group-tree/group-tree.component').then(
            (m) => m.GroupTreeComponent
          ),
      },
      {
        path: 'finance/group/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/group/group-detail/group-detail.component'
          ).then((m) => m.GroupDetailComponent),
      },
      {
        path: 'finance/ledger/list',
        loadComponent: () =>
          import(
            './home/finance/ledger/ledger-tree/ledger-tree.component'
          ).then((m) => m.LedgerTreeComponent),
      },
      {
        path: 'finance/ledger/detail/:id/:id',
        loadComponent: () =>
          import(
            './home/finance/ledger/ledger-detail/ledger-detail.component'
          ).then((m) => m.LedgerDetailComponent),
      },
      {
        path: 'finance/ledger-summary/ledger-summary-report',
        loadComponent: () =>
          import(
            './home/finance/ledger-summary/ledger-summary-report/ledger-summary-report.component'
          ).then((m) => m.LedgerSummaryReportComponent),
      },
      {
        path: 'finance/trial-balance/trial-balance-report',
        loadComponent: () =>
          import(
            './home/finance/trial-balance-report/trial-balance-report/trial-balance-report.component'
          ).then((m) => m.TrialBalanceReportComponent),
      },
      {
        path: 'finance/trial-balance-monthly/trial-balance-monthly-report',
        loadComponent: () =>
          import(
            './home/finance/trial-balance-monthly-report/trial-balance-monthly-report/trial-balance-monthly-report.component'
          ).then((m) => m.TrialBalanceMonthlyReportComponent),
      },
      {
        path: 'finance/balance-sheet-monthly/balance-sheet-monthly-report',
        loadComponent: () =>
          import(
            './home/finance/balancesheet-monthly-report/balance-sheet-monthly-report/balance-sheet-monthly-report.component'
          ).then((m) => m.BalanceSheetMonthlyReportComponent),
      },
      {
        path: 'finance/balance-sheet/balance-sheet-report',
        loadComponent: () =>
          import(
            './home/finance/balance-sheet/balance-sheet-report/balance-sheet-report.component'
          ).then((m) => m.BalanceSheetReportComponent),
      },

      {
        path: 'finance/ledger-summary/ledger-summary-detail/:id',
        loadComponent: () =>
          import(
            './home/finance/ledger-summary/ledger-summary-detail/ledger-summary-detail.component'
          ).then((m) => m.LedgerSummaryDetailComponent),
      },
      {
        path: 'finance/profit-and-loss/profit-and-loss-report',
        loadComponent: () =>
          import(
            './home/finance/profit-and-loss/profit-and-loss/profit-and-loss.component'
          ).then((m) => m.ProfitAndLossComponent),
      },

      {
        path: 'finance/fund-transfer-note/search',
        loadComponent: () =>
          import(
            './home/finance/fund-transfer-note/fund-transfer-note-search/fund-transfer-note-search.component'
          ).then((m) => m.FundTransferNoteSearchComponent),
      },
      {
        path: 'finance/fund-transfer-note/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/fund-transfer-note/fund-transfer-note-detail/fund-transfer-note-detail.component'
          ).then((m) => m.FundTransferNoteDetailComponent),
      },
      {
        path: 'finance/reversing-journal/search',
        loadComponent: () =>
          import(
            './home/finance/reversing-journal/reversing-journal-search/reversing-journal-search.component'
          ).then((m) => m.ReversingJournalSearchComponent),
      },
      {
        path: 'finance/reversing-journal/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/reversing-journal/reversing-journal-detail/reversing-journal-detail.component'
          ).then((m) => m.ReversingJournalDetailComponent),
      },
      {
        path: 'finance/exchange-rate/search',
        loadComponent: () =>
          import(
            './home/finance/exchange-rate/exchange-rate-search/exchange-rate-search.component'
          ).then((m) => m.ExchangeRateSearchComponent),
      },
      {
        path: 'finance/exchange-rate/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/exchange-rate/exchange-rate-detail/exchange-rate-detail.component'
          ).then((m) => m.ExchangeRateDetailComponent),
      },
      {
        path: 'finance/ledger-transaction/search',
        loadComponent: () =>
          import(
            './home/finance/ledger-transactions/ledger-transaction-search/ledger-transaction-search.component'
          ).then((m) => m.LedgerTransactionSearchComponent),
      },
      {
        path: 'finance/ledger-transaction-for-trust/search',
        loadComponent: () =>
          import(
            './home/finance/ledger-transactions-for-trust/ledger-transactions-for-trust-search/ledger-transactions-for-trust-search.component'
          ).then((m) => m.LedgerTransactionsForTrustSearchComponent),
      },
      {
        path: 'finance/voucher/search',
        loadComponent: () =>
          import(
            './home/finance/vouchers/vouchers-search/vouchers-search.component'
          ).then((m) => m.VouchersSearchComponent),
      },
      {
        path: 'finance/voucher/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/vouchers/vouchers-detail/vouchers-detail.component'
          ).then((m) => m.VouchersDetailComponent),
      },
      {
        path: 'finance/tax/search',
        loadComponent: () =>
          import('./home/finance/tax/tax-search/tax-search.component').then(
            (m) => m.TaxSearchComponent
          ),
      },
      {
        path: 'finance/tax/detail/:id',
        loadComponent: () =>
          import('./home/finance/tax/tax-detail/tax-detail.component').then(
            (m) => m.TaxDetailComponent
          ),
      },
      {
        path: 'finance/net-out-voucher/search',
        loadComponent: () =>
          import(
            './home/finance/net-out-voucher/net-out-voucher-search/net-out-voucher-search.component'
          ).then((m) => m.NetOutVoucherSearchComponent),
      },
      {
        path: 'finance/net-out-voucher/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/net-out-voucher/net-out-voucher-detail/net-out-voucher-detail.component'
          ).then((m) => m.NetOutVoucherDetailComponent),
      },
      {
        path: 'finance/cost/cost-centre-allocation/search',
        loadComponent: () =>
          import(
            './home/finance/cost/cost-centre-allocation-search/cost-centre-allocation.component'
          ).then((m) => m.CostCentreAllocationComponent),
      },
      {
        path: 'finance/cost-centre-allocation/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/cost/cost-centre-allocation-detail/cost-centre-allocation-detail.component'
          ).then((m) => m.CostCentreAllocationDetailComponent),
      },
      {
        path: 'finance/cash-counter/search',
        loadComponent: () =>
          import(
            './home/finance/cash-counter/cash-counter-search/cash-counter-search.component'
          ).then((m) => m.CashCounterSearchComponent),
      },
      {
        path: 'finance/cash-counter/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/cash-counter/cash-counter-detail/cash-counter-detail.component'
          ).then((m) => m.CashCounterDetailComponent),
      },
      {
        path: 'finance/cash-counter/info/:id',
        loadComponent: () =>
          import(
            './home/finance/cash-counter/cash-counter-info/cash-counter-info.component'
          ).then((m) => m.CashCounterInfoComponent),
      },
      {
        path: 'finance/assigned-cashier/search',
        loadComponent: () =>
          import(
            './home/finance/assignedCashier/assigned-cashier-search/assigned-cashier-search.component'
          ).then((m) => m.AssignedCashierSearchComponent),
      },
      {
        path: 'finance/assigned-cashier/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/assignedCashier/assigned-cashier-detail/assigned-cashier-detail.component'
          ).then((m) => m.AssignedCashierDetailComponent),
      },
      {
        path: 'finance/deposit-book/search',
        loadComponent: () =>
          import(
            './home/finance/deposit-book/deposit-book-search/deposit-book-search.component'
          ).then((m) => m.DepositBookSearchComponent),
      },
      {
        path: 'finance/deposit-book/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/deposit-book/deposit-book-detail/deposit-book-detail.component'
          ).then((m) => m.DepositBookDetailComponent),
      },
      {
        path: 'finance/deposit-book/info/:id',
        loadComponent: () =>
          import(
            './home/finance/deposit-book/deposit-book-info/deposit-book-info.component'
          ).then((m) => m.DepositBookInfoComponent),
      },
      {
        path: 'finance/reconciliation/search',
        loadComponent: () =>
          import(
            './home/finance/reconciliation/reconciliation-search/reconciliation-search.component'
          ).then((m) => m.ReconciliationSearchComponent),
      },
      {
        path: 'finance/reconciliation/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/reconciliation/reconciliation-detail/reconciliation-detail.component'
          ).then((m) => m.ReconciliationDetailComponent),
      },
      {
        path: 'finance/reconciliation/info/:id',
        loadComponent: () =>
          import(
            './home/finance/reconciliation/reconciliation-info/reconciliation-info.component'
          ).then((m) => m.ReconciliationInfoComponent),
      },
      {
        path: 'finance/profit-and-loss-monthly-report',
        loadComponent: () =>
          import(
            './home/finance/monthly-report/montly-report/montly-report.component'
          ).then((m) => m.MontlyReportComponent),
      },
      {
        path: 'finance/payments-trust-and-estate/search',
        loadComponent: () =>
          import(
            './home/finance/payment-trust-estate/payment-trust-estate-search/payment-trust-estate-search.component'
          ).then((m) => m.PaymentTrustEstateSearchComponent),
      },
      {
        path: 'finance/payments-trust-and-estate/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/payment-trust-estate/payment-trust-estate-detail/payment-trust-estate-detail.component'
          ).then((m) => m.PaymentTrustEstateDetailComponent),
      },
      {
        path: 'finance/receipt-trust-and-estate/search/:id',
        loadComponent: () =>
          import(
            './home/finance/receipt-trust-estate/receipt-trust-estate-search/receipt-trust-estate-search.component'
          ).then((m) => m.ReceiptTrustEstateSearchComponent),
      },
      {
        path: 'finance/receipt-trust-and-estate/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/receipt-trust-estate/receipt-trust-estate-detail/receipt-trust-estate-detail.component'
          ).then((m) => m.ReceiptTrustEstateDetailComponent),
      },
      {
        path: 'finance/journal-trust-and-estate/search',
        loadComponent: () =>
          import(
            './home/finance/journal-trust-and-estate/journal-trust-estate-search/journal-trust-estate-search.component'
          ).then((m) => m.JournalTrustEstateSearchComponent),
      },
      {
        path: 'finance/journal-trust-and-estate/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/journal-trust-and-estate/journal-trust-estate-detail/journal-trust-estate-detail.component'
          ).then((m) => m.JournalTrustEstateDetailComponent),
      },



      //config
      {
        path: 'config/posting-matrix/search',
        loadComponent: () =>
          import(
            './home/config/posting-matrix/posting-matrix-search/posting-matrix-search.component'
          ).then((m) => m.PostingMatrixSearchComponent),
      },
      // {
      //   path: 'config/event-mapping-voucher/search',
      //   loadComponent: () =>
      //     import(
      //       './home/config/event/event-mapping-on-vouchers/event-mapping-on-vouchers.component'
      //     ).then((m) => m.EventMappingOnVouchersComponent),
      // },
      {
        path: 'config/event-mapping/search',
        loadComponent: () => import('./home/config/event-mapping-search/event-mapping-search.component').then((m) => m.EventMappingSearchComponent)
      },
      {
        path: 'config/event-mapping/detail/:id',
        loadComponent: () =>
          import(
            './home/config/event-mapping/event-mapping.component'
          ).then((m) => m.EventMappingComponent),
      },
      {
        path: 'config/payment-and-receipt',
        loadComponent: () =>
          import(
            './home/config/payment-and-receipt/payment-and-receipt.component'
          ).then((m) => m.PaymentAndReceiptComponent),
      },
      {
        path: 'config/journal-receipt',
        loadComponent: () =>
          import(
            './home/config/journal-receipt/journal-receipt.component'
          ).then((m) => m.JournalReceiptComponent),
      },
      {
        path: 'config/event-creation',
        loadComponent: () =>
          import(
            './home/config/event-sub-event-creation/event-sub-event-creation.component'
          ).then((m) => m.EventSubEventCreationComponent),
      },
      //inventory
      {
        path: 'inventory/configuration/category/search',
        loadComponent: () =>
          import(
            './home/inventory/configuration/category/category.component'
          ).then((m) => m.CategoryComponent),
      },
      {
        path: 'inventory/configuration/item/search',
        loadComponent: () =>
          import(
            './home/inventory/configuration/items/items-search/items-search.component'
          ).then((m) => m.ItemsSearchComponent),
      },
      {
        path: 'inventory/configuration/items/item-type-sub-type',
        loadComponent: () =>
          import(
            './home/inventory/configuration/items/item-type-sub-type/item-type-sub-type.component'
          ).then((m) => m.ItemTypeSubTypeComponent),
      },
      {
        path: 'inventory/configuration/item/detail/:id',
        loadComponent: () =>
          import(
            './home/inventory/configuration/items/items-detail/items-detail.component'
          ).then((m) => m.ItemsDetailComponent),
      },
      {
        path: 'inventory/stock/production-note/search',
        loadComponent: () =>
          import(
            './home/inventory/stock/production-note/production-note-search/production-note-search.component'
          ).then((m) => m.ProductionNoteSearchComponent),
      },
      {
        path: 'inventory/stock/production-note/detail/:id',
        loadComponent: () =>
          import(
            './home/inventory/stock/production-note/production-note-detail/producton-note-detail.component'
          ).then((m) => m.ProductonNoteDetailComponent),
      },
      {
        path: 'inventory/stock/stock-transfer-note/search',
        loadComponent: () =>
          import(
            './home/inventory/stock/stock-transfer-note/stock-transfer-note-search/stock-transfer-note-search.component'
          ).then((m) => m.StockTransferNoteSearchComponent),
      },
      {
        path: 'inventory/stock/stock-transfer-note/detail/:id',
        loadComponent: () =>
          import(
            './home/inventory/stock/stock-transfer-note/stock-transfer-note-detail/stock-transfer-note-detail.component'
          ).then((m) => m.StockTransferNoteDetailComponent),
      },
      {
        path: 'inventory/report/stock-register-report/search',
        loadComponent: () =>
          import(
            './home/inventory/report/stock-register-report/stock-register-report-search/stock-register-report-search.component'
          ).then((m) => m.StockRegisterReportSearchComponent),
      },

      //budget
      {
        path: 'budget/configuration/budget-configuration/search',
        loadComponent: () =>
          import(
            './home/budget/Configuration/budget-configuration/budget-configuration-search/budget-configuration-search.component'
          ).then((m) => m.BudgetConfigurationSearchComponent),
      },
      {
        path: 'budget/configuration/budget-configuration/detail/:id',
        loadComponent: () =>
          import(
            './home/budget/Configuration/budget-configuration/budget-configuration-detail/budget-configuration-detail.component'
          ).then((m) => m.BudgetConfigurationDetailComponent),
      },
      {
        path: 'budget/configuration/budget-request/search',
        loadComponent: () =>
          import(
            './home/budget/Configuration/budget-request/budget-request-search/budget-request-search.component'
          ).then((m) => m.BudgetRequestSearchComponent),
      },
      {
        path: 'budget/configuration/budget-request/detail/:id',
        loadComponent: () =>
          import(
            './home/budget/Configuration/budget-request/budget-request-detail/budget-request-detail.component'
          ).then((m) => m.BudgetRequestDetailComponent),
      },
      {
        path: 'budget/configuration/budget-review/search',
        loadComponent: () =>
          import(
            './home/budget/Configuration/budget-review/budget-review-search/budget-review-search.component'
          ).then((m) => m.BudgetReviewSearchComponent),
      },
      {
        path: 'budget/configuration/budget-review/detail/:id',
        loadComponent: () =>
          import(
            './home/budget/Configuration/budget-review/budget-review-detail/budget-review-detail.component'
          ).then((m) => m.BudgetReviewDetailComponent),
      },
      {
        path: 'budget/configuration/budget-ceiling/search',
        loadComponent: () =>
          import(
            './home/budget/Configuration/budget-ceiling/budget-ceiling-search/budget-ceiling-search.component'
          ).then((m) => m.BudgetCeilingSearchComponent),
      },
      {
        path: 'budget/configuration/budget-ceiling/detail/:id',
        loadComponent: () =>
          import(
            './home/budget/Configuration/budget-ceiling/budget-ceiling-detail/budget-ceiling-detail.component'
          ).then((m) => m.BudgetCeilingDetailComponent),
      },

      //sales
      {
        path: 'sales/sales-quotation/search',
        loadComponent: () =>
          import(
            './home/sales/vouchers/sales-quotation/sales-quotation-search/sales-quotation-search.component'
          ).then((m) => m.SalesQuotationSearchComponent),
      },
      {
        path: 'sales/sales-quotation/detail/:id',
        loadComponent: () =>
          import(
            './home/sales/vouchers/sales-quotation/sales-quotation-detail/sales-quotation-detail.component'
          ).then((m) => m.SalesQuotationDetailComponent),
      },

      {
        path: 'sales/sales-order/search',
        loadComponent: () =>
          import(
            './home/sales/vouchers/sales-order/sales-order-search/sales-order-search.component'
          ).then((m) => m.SalesOrderSearchComponent),
      },
      {
        path: 'sales/sales-order/detail/:id',
        loadComponent: () =>
          import(
            './home/sales/vouchers/sales-order/sales-order-detail/sales-order-detail.component'
          ).then((m) => m.SalesOrderDetailComponent),
      },
      {
        path: 'sales/sales-invoice/search',
        loadComponent: () =>
          import(
            './home/sales/vouchers/sales-invoice/sales-invoice-search/sales-invoice-search.component'
          ).then((m) => m.SalesInvoiceSearchComponent),
      },
      {
        path: 'sales/sales-invoice/detail/:id',
        loadComponent: () =>
          import(
            './home/sales/vouchers/sales-invoice/sales-invoice-detail/sales-invoice-detail.component'
          ).then((m) => m.SalesInvoiceDetailComponent),
      },
      {
        path: 'sales/advance-receipt-note/search',
        loadComponent: () =>
          import(
            './home/sales/vouchers/advance-receipt-note/advance-receipt-note-search/advance-receipt-note-search.component'
          ).then((m) => m.AdvanceReceiptNoteSearchComponent),
      },
      {
        path: 'sales/advance-receipt-note/detail/:id',
        loadComponent: () =>
          import(
            './home/sales/vouchers/advance-receipt-note/advance-receipt-note-detail/advance-receipt-note-detail.component'
          ).then((m) => m.AdvanceReceiptNoteDetailComponent),
      },
      {
        path: 'sales/receipt-note/search',
        loadComponent: () =>
          import(
            './home/sales/vouchers/receipt-note/receipt-note-search/receipt-note-search.component'
          ).then((m) => m.ReceiptNoteSearchComponent),
      },
      {
        path: 'sales/receipt-note/detail/:id',
        loadComponent: () =>
          import(
            './home/sales/vouchers/receipt-note/receipt-note-detail/receipt-note-detail.component'
          ).then((m) => m.ReceiptNoteDetailComponent),
      },
      {
        path: 'sales/credit-note/search',
        loadComponent: () =>
          import(
            './home/sales/vouchers/credit-note/credit-note-search/credit-note-search.component'
          ).then((m) => m.CreditNoteSearchComponent),
      },
      {
        path: 'sales/credit-note/detail/:id',
        loadComponent: () =>
          import(
            './home/sales/vouchers/credit-note/credit-note-detail/credit-note-detail.component'
          ).then((m) => m.CreditNoteDetailComponent),
      },
      {
        path: 'sales/customer/search',
        loadComponent: () =>
          import(
            './home/sales/vouchers/customer/customer-search/customer-search.component'
          ).then((m) => m.CustomerSearchComponent),
      },
      {
        path: 'sales/customer/detail/:id',
        loadComponent: () =>
          import(
            './home/sales/vouchers/customer/customer-detail/customer-detail.component'
          ).then((m) => m.CustomerDetailComponent),
      },
      //sales

      {
        path: 'sales/statement-of-account/search',
        loadComponent: () =>
          import(
            './home/sales/report/statement-of-account/statement-of-account-search/statement-of-account-search.component'
          ).then((m) => m.StatementOfAccountSearchComponent),
      },
      {
        path: 'sales/statement-of-account/detail/:id',
        loadComponent: () =>
          import(
            './home/sales/report/statement-of-account/statement-of-account-detail/statement-of-account-detail.component'
          ).then((m) => m.StatementOfAccountDetailComponent),
      }, {
        path: 'sales/statement-of-account/soa',
        loadComponent: () =>
          import(
            './home/sales/report/statement-of-account/statement-of-account-soa/statement-of-account-soa.component'
          ).then((m) => m.StatementOfAccountSoaComponent),
      },

      //finance

      {
        path: 'finance/soa-trust-and-estate/report',
        loadComponent: () =>
          import(
            './home/finance/soa-trust-and-estate/soa-trust-and-estate-report/soa-trust-and-estate-report.component'
          ).then((m) => m.SoaTrustAndEstateReportComponent),
      },
      {
        path: 'finance/cost-category-and-cost-centre',
        loadComponent: () =>
          import(
            './home/finance/cost-category-and-cost-center/cost-category-and-cost-center.component'
          ).then((m) => m.CostCategoryAndCostCenterComponent),
      },

      // purchase
      {
        path: 'purchase/purchase-quotation/search',
        loadComponent: () =>
          import(
            './home/purchase/voucher/purchase-quotation/purchase-quotation-search/purchase-quotation-search.component'
          ).then((m) => m.PurchaseQuotationSearchComponent),
      },
      {
        path: 'purchase/purchase-quotation/detail',
        loadComponent: () =>
          import(
            './home/purchase/voucher/purchase-quotation/purchase-quotation-detail/purchase-quotation-detail.component'
          ).then((m) => m.PurchaseQuotationDetailComponent),
      },
      {
        path: 'purchase/purchase-order/search',
        loadComponent: () =>
          import(
            './home/purchase/voucher/purchase-order/purchase-order-search/purchase-order-search.component'
          ).then((m) => m.PurchaseOrderSearchComponent),
      },
      {
        path: 'purchase/purchase-order/detail/:id',
        loadComponent: () =>
          import(
            './home/purchase/voucher/purchase-order/purchase-order-detail/purchase-order-detail.component'
          ).then((m) => m.PurchaseOrderDetailComponent),
      },
      {
        path: 'purchase/purchase-invoice/search',
        loadComponent: () =>
          import(
            './home/purchase/voucher/purchase-invoice/purchase-invoice-search/purchase-invoice-search.component'
          ).then((m) => m.PurchaseInvoiceSearchComponent),
      },
      {
        path: 'purchase/purchase-invoice/detail/:id',
        loadComponent: () =>
          import(
            './home/purchase/voucher/purchase-invoice/purchase-invoice-detail/purchase-invoice-detail.component'
          ).then((m) => m.PurchaseInvoiceDetailComponent),
      },
      {
        path: 'purchase/advance-payment-note/search',
        loadComponent: () =>
          import(
            './home/purchase/voucher/advance-payment-note/advance-payment-note-search/advance-payment-note-search.component'
          ).then((m) => m.AdvancePaymentNoteSearchComponent),
      },
      {
        path: 'purchase/advance-payment-note/detail/:id',
        loadComponent: () =>
          import(
            './home/purchase/voucher/advance-payment-note/advance-payment-note-detail/advance-payment-note-detail.component'
          ).then((m) => m.AdvancePaymentNoteDetailComponent),
      },
      {
        path: 'purchase/payment-note/search',
        loadComponent: () =>
          import(
            './home/purchase/voucher/payment-note/payment-note-search/payment-note-search.component'
          ).then((m) => m.PaymentNoteSearchComponent),
      },
      {
        path: 'purchase/payment-note/detail/:id',
        loadComponent: () =>
          import(
            './home/purchase/voucher/payment-note/payment-note-detail/payment-note-detail.component'
          ).then((m) => m.PaymentNoteDetailComponent),
      },
      {
        path: 'purchase/debit-note/search',
        loadComponent: () =>
          import(
            './home/purchase/voucher/debit-note/debit-note-search/debit-note-search.component'
          ).then((m) => m.DebitNoteSearchComponent),
      },
      {
        path: 'purchase/debit-note/detail/:id',
        loadComponent: () =>
          import(
            './home/purchase/voucher/debit-note/debit-note-detail/debit-note-detail.component'
          ).then((m) => m.DebitNoteDetailComponent),
      },
      {
        path: 'purchase/vendor/search',
        loadComponent: () =>
          import(
            './home/purchase/voucher/vendor/vendor-search/vendor-search.component'
          ).then((m) => m.VendorSearchComponent),
      },
      {
        path: 'purchase/vendor/detail/:id',
        loadComponent: () =>
          import(
            './home/purchase/voucher/vendor/vendor-detail/vendor-detail.component'
          ).then((m) => m.VendorDetailComponent),
      },
      {
        path: 'purchase/purchase-quotation/search',
        loadComponent: () =>
          import(
            './home/purchase/voucher/purchase-quotation/purchase-quotation-search/purchase-quotation-search.component'
          ).then((m) => m.PurchaseQuotationSearchComponent),
      },
      {
        path: 'purchase/purchase-quotation/detail/:id',
        loadComponent: () =>
          import(
            './home/purchase/voucher/purchase-quotation/purchase-quotation-detail/purchase-quotation-detail.component'
          ).then((m) => m.PurchaseQuotationDetailComponent),
      },
      {
        path: 'purchase/report/summary-of-account/detail/:id',
        loadComponent: () =>
          import(
            './home/purchase/report/summary-of-account/summary-of-account-detail/summary-of-account-detail.component'
          ).then((m) => m.SummaryOfAccountDetailComponent),
      },
      {
        path: 'purchase/report/summary-of-account/search',
        loadComponent: () =>
          import(
            './home/purchase/report/summary-of-account/summary-of-account-search/summary-of-account-search.component'
          ).then((m) => m.SummaryOfAccountSearchComponent),
      },
      {
        path: 'purchase/report/summary-of-account/soa/:id',
        loadComponent: () =>
          import(
            './home/purchase/report/summary-of-account/summary-of-account-soa/summary-of-account-soa.component'
          ).then((m) => m.SummaryOfAccountSoaComponent),
      },
      //sales-report

      {
        path: 'sales/sales-register/search',
        loadComponent: () =>
          import(
            './home/sales/report/sales-register/sales-register-search/sales-register-search.component'
          ).then((m) => m.SalesRegisterSearchComponent),
      },
      {
        path: 'sales/sales-register/detail',
        loadComponent: () =>
          import(
            './home/sales/report/sales-register/sales-register-detail/sales-register-detail.component'
          ).then((m) => m.SalesRegisterDetailComponent),
      },
      {
        path: 'sales/vat-detail/search',
        loadComponent: () =>
          import(
            './home/sales/report/vat-collected-detail/vat-collected-detail-search/vat-collected-detail-search.component'
          ).then((m) => m.VatCollectedDetailSearchComponent),
      },
      {
        path: 'corporate/finance-menus',
        loadComponent: () =>
          import(
            './home/home-page/finance/finance.component'
          ).then((m) => m.FinanceComponent),
      },

      {
        path: 'sales/customer-wise-sales/search',
        loadComponent: () =>
          import(
            './home/sales/report/customer-wise-sales-report/customer-wise-sales-report-search/customer-wise-sales-report-search.component'
          ).then((m) => m.CustomerWiseSalesReportSearchComponent),
      },
      {
        path: 'sales/customer-wise-sales/detail/:id',
        loadComponent: () =>
          import(
            './home/sales/report/customer-wise-sales-report/customer-wise-sales-report-detail/customer-wise-sales-report-detail.component'
          ).then((m) => m.CustomerWiseSalesReportDetailComponent),
      },
      {
        path: 'sales/item-wise-sales/search',
        loadComponent: () =>
          import(
            './home/sales/report/item-wise-sales-report/item-wise-sales-report-search/item-wise-sales-report-search.component'
          ).then((m) => m.ItemWiseSalesReportSearchComponent),
      },
      {
        path: 'sales/item-wise-sales/detail',
        loadComponent: () =>
          import(
            './home/sales/report/item-wise-sales-report/item-wise-sales-report-detail/item-wise-sales-report-detail.component'
          ).then((m) => m.ItemWiseSalesReportDetailComponent),
      },
      {
        path: 'sales/sales-order-outstanding/search',
        loadComponent: () =>
          import(
            './home/sales/report/sales-order-outstanding-report/sales-order-outstanding-search/sales-order-outstanding-search.component'
          ).then((m) => m.SalesOrderOutstandingSearchComponent),
      },
      {
        path: 'sales/sales-order-outstanding/detail',
        loadComponent: () =>
          import(
            './home/sales/report/sales-order-outstanding-report/sales-order-outstanding-detail/sales-order-outstanding-detail.component'
          ).then((m) => m.SalesOrderOutstandingDetailComponent),
      },
      {
        path: 'sales/Debtors-summary/search',
        loadComponent: () =>
          import(
            './home/sales/report/debtors-summary/debtors-summary-search/debtors-summary-search.component'
          ).then((m) => m.DebtorsSummarySearchComponent),
      },
      {
        path: 'sales/Debtors-summary/detail/:id',
        loadComponent: () =>
          import(
            './home/sales/report/debtors-summary/debtors-summary-detail/debtors-summary-detail.component'
          ).then((m) => m.DebtorsSummaryDetailComponent),
      },

      //purchase report
      {
        path: 'purchase/report/purchase-register/detail',
        loadComponent: () =>
          import(
            './home/purchase/report/purchase-register/purchase-register-detail/purchase-register-detail.component'
          ).then((m) => m.PurchaseRegisterDetailComponent),
      },
      {
        path: 'purchase/report/purchase-register',
        loadComponent: () =>
          import(
            './home/purchase/report/purchase-register/purchase-register-search/purchase-register-search.component'
          ).then((m) => m.PurchaseRegisterSearchComponent),
      },
      {
        path: 'purchase/report/purchase-order-outstanding',
        loadComponent: () =>
          import(
            './home/purchase/report/purchase-order-outstanding/purchase-order-outstanding-search/purchase-order-outstanding-search.component'
          ).then((m) => m.PurchaseOrderOutstandingSearchComponent),
      },
      {
        path: 'purchase/report/purchase-order-outstanding/detail',
        loadComponent: () =>
          import(
            './home/purchase/report/purchase-order-outstanding/purchase-order-outstanding-detail/purchase-order-outstanding-detail.component'
          ).then((m) => m.PurchaseOrderOutstandingDetailComponent),
      },
      {
        path: 'purchase/report/item-wise-purchase-report-search',
        loadComponent: () =>
          import(
            './home/purchase/report/item-wise-purchase-report/item-wise-purchase-report-search/item-wise-purchase-report-search.component'
          ).then((m) => m.ItemWisePurchaseReportSearchComponent),
      },
      {
        path: 'purchase/report/item-wise-purchase-report-detail',
        loadComponent: () =>
          import(
            './home/purchase/report/item-wise-purchase-report/item-wise-purchase-report-detail/item-wise-purchase-report-detail.component'
          ).then((m) => m.ItemWisePurchaseReportDetailComponent),
      },
      {
        path: 'purchase/report/vendor-wise-purchase-report-search',
        loadComponent: () =>
          import(
            './home/purchase/report/vendor-wise-purchase-report/vendor-wise-purchase-report-search/vendor-wise-purchase-report-search.component'
          ).then((m) => m.VendorWisePurchaseReportSearchComponent),
      },
      {
        path: 'purchase/report/vendor-wise-purchase-report-detail',
        loadComponent: () =>
          import(
            './home/purchase/report/vendor-wise-purchase-report/vendor-wise-purchase-report-detail/vendor-wise-purchase-report-detail.component'
          ).then((m) => m.VendorWisePurchaseReportDetailComponent),
      },
      {
        path: 'purchase/report/credit-summary-report/search',
        loadComponent: () =>
          import(
            './home/purchase/report/credits-summary-report/credit-summary-report-search/credit-summary-report-search.component'
          ).then((m) => m.CreditSummaryReportSearchComponent),
      },
      {
        path: 'purchase/report/credit-summary-report/detail',
        loadComponent: () =>
          import(
            './home/purchase/report/credits-summary-report/credit-summary-report-detail/credit-summary-report-detail.component'
          ).then((m) => m.CreditSummaryReportDetailComponent),
      },
      {
        path: 'purchase/report/creditors-detail-report/search',
        loadComponent: () =>
          import(
            './home/purchase/report/creditors-detail-report/creditors-detail-report-search/creditors-detail-report-search.component'
          ).then((m) => m.CreditorsDetailReportSearchComponent),
      },
      {
        path: 'purchase/report/creditors-detail-report/detail/:id',
        loadComponent: () =>
          import(
            './home/purchase/report/creditors-detail-report/creditors-detail-report-detail/creditors-detail-report-detail.component'
          ).then((m) => m.CreditorsDetailReportDetailComponent),
      },
      {
        path: 'purchase/report/summary-of-account/search',
        loadComponent: () =>
          import(
            './home/purchase/report/summary-of-account/summary-of-account-search/summary-of-account-search.component'
          ).then((m) => m.SummaryOfAccountSearchComponent),
      },
      //finance Report
      {
        path: 'finance/report/trail-balance-report',
        loadComponent: () =>
          import(
            './home/finance/reports/trial-balance-report/trial-balance-report.component'
          ).then((m) => m.TrialBalanceReportComponent),
      },

      {
        path: 'finance/report/bank-reconciliation/search',
        loadComponent: () =>
          import(
            './home/finance/reports/bank-reconciliation-summary/bank-reconciliation-summary-search/bank-reconciliation-summary-search.component'
          ).then((m) => m.BankReconciliationSummarySearchComponent),
      },
      {
        path: 'finance/report/bank-reconciliation/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/reports/bank-reconciliation-summary/bank-reconciliation-summary-detail/bank-reconciliation-summary-detail.component'
          ).then((m) => m.BankReconciliationSummaryDetailComponent),
      },
      {
        path: 'purchase/report/vat-paid-summary/detail/:id',
        loadComponent: () =>
          import(
            './home/purchase/report/vat-paid-summary/vat-paid-summary-detail/vat-paid-summary-detail.component'
          ).then((m) => m.VatPaidSummaryDetailComponent),
      },
      {
        path: 'purchase/report/vat-paid-summary/search',
        loadComponent: () =>
          import(
            './home/purchase/report/vat-paid-summary/vat-paid-summary-search/vat-paid-summary-search.component'
          ).then((m) => m.VatPaidSummaryComponent),
      },
      {
        path: 'accounts/bank-summary-report',
        loadComponent: () =>
          import(
            './home/finance/reports/bank-reconcillation-report/bank-reconcillation-report-search/bank-reconcillation-report-search.component'
          ).then((m) => m.BankReconcillationReportSearchComponent),
      },

      //organization
      {
        path: 'organization/organization-application/search',
        loadComponent: () =>
          import(
            './home/organization/organization-application/organization-application-search/organization-application-search.component'
          ).then((m) => m.OrganizationApplicationSearchComponent),
      },
      {
        path: 'organization/organization-application/detail/:id',
        loadComponent: () =>
          import(
            './home/organization/organization-application/organization-application-detail/organization-application-detail.component'
          ).then((m) => m.OrganizationApplicationDetailComponent),
      },
      {
        path: 'organization/organization-change/search',
        loadComponent: () =>
          import(
            './home/organization/organization-change/organization-change-search/organization-change-search.component'
          ).then((m) => m.OrganizationChangeSearchComponent),
      },
      {
        path: 'organization/organization-change/detail/:id',
        loadComponent: () =>
          import(
            './home/organization/organization-change/organization-change-detail/organization-change-detail.component'
          ).then((m) => m.OrganizationChangeDetailComponent),
      },
      {
        path: 'organization/registered-organization/search',
        loadComponent: () =>
          import(
            './home/organization/registered-organization/registered-organization-search/registered-organization-search.component'
          ).then((m) => m.RegisteredOrganizationSearchComponent),
      },
      {
        path: 'organization/registered-organization/detail/:id',
        loadComponent: () =>
          import(
            './home/organization/registered-organization/registered-organization-detail/registered-organization-detail.component'
          ).then((m) => m.RegisteredOrganizationDetailComponent),
      },

      {
        path: 'corporate/purchase-menus',
        loadComponent: () =>
          import(
            './home/home-page/purchase/purchase.component'
          ).then((m) => m.PurchaseComponent),
      },
      {
        path: 'finance/corporate',
        loadComponent: () =>
          import(
            './home/home-page/corporate/corporate.component'
          ).then((m) => m.CorporateComponent),
      },
      {
        path: 'corporate/sales-menus',
        loadComponent: () =>
          import(
            './home/home-page/sales/sales.component'
          ).then((m) => m.SalesComponent),
      },
      {
        path: 'corporate/inventory-menus',
        loadComponent: () =>
          import(
            './home/home-page/inventory/inventory.component'
          ).then((m) => m.InventoryComponent),
      },
      {
        path: 'corporate/budget-menus',
        loadComponent: () =>
          import(
            './home/home-page/budget/budget.component'
          ).then((m) => m.BudgetComponent),
      },
      {
        path: 'trustee/finance-menus',
        loadComponent: () =>
          import(
            './home/home-page/trustee-finance/trustee-finance.component'
          ).then((m) => m.TrusteeFinanceComponent),
      },
      {
        path: 'trustee/t_e',
        loadComponent: () =>
          import(
            './home/home-page/trustee-menu/trustee-menu.component'
          ).then((m) => m.TrusteeMenuComponent),
      },
      {
        path: 'finance/cost/cost-centre-allocation/search',
        loadComponent: () =>
          import(
            './home/finance/cost/cost-centre-allocation-search/cost-centre-allocation.component'
          ).then((m) => m.CostCentreAllocationComponent),
      },
      {
        path: 'finance/cost-centre-allocation/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/cost/cost-centre-allocation-detail/cost-centre-allocation-detail.component'
          ).then((m) => m.CostCentreAllocationDetailComponent),
      },
      {
        path: 'finance/cash-counter/search',
        loadComponent: () =>
          import(
            './home/finance/cash-counter/cash-counter-search/cash-counter-search.component'
          ).then((m) => m.CashCounterSearchComponent),
      },
      {
        path: 'finance/cash-counter/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/cash-counter/cash-counter-detail/cash-counter-detail.component'
          ).then((m) => m.CashCounterDetailComponent),
      },
      {
        path: 'finance/cash-counter/info/:id',
        loadComponent: () =>
          import(
            './home/finance/cash-counter/cash-counter-info/cash-counter-info.component'
          ).then((m) => m.CashCounterInfoComponent),
      },
      {
        path: 'finance/assigned-cashier/search',
        loadComponent: () =>
          import(
            './home/finance/assignedCashier/assigned-cashier-search/assigned-cashier-search.component'
          ).then((m) => m.AssignedCashierSearchComponent),
      },
      {
        path: 'finance/assigned-cashier/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/assignedCashier/assigned-cashier-detail/assigned-cashier-detail.component'
          ).then((m) => m.AssignedCashierDetailComponent),
      },
      {
        path: 'finance/assigned-cashier/info/:id',
        loadComponent: () =>
          import(
            './home/finance/assignedCashier/assigned-cashier-info/assigned-cashier-info.component'
          ).then((m) => m.AssignedCashierInfoComponent),
      },
      {
        path: 'finance/deposit-book/search',
        loadComponent: () =>
          import(
            './home/finance/deposit-book/deposit-book-search/deposit-book-search.component'
          ).then((m) => m.DepositBookSearchComponent),
      },
      {
        path: 'finance/deposit-book/detail/:id',
        loadComponent: () =>
          import(
            './home/finance/deposit-book/deposit-book-detail/deposit-book-detail.component'
          ).then((m) => m.DepositBookDetailComponent),
      },
      {
        path: 'finance/deposit-book/info/:id',
        loadComponent: () =>
          import(
            './home/finance/deposit-book/deposit-book-info/deposit-book-info.component'
          ).then((m) => m.DepositBookInfoComponent),
      },
      {
        path: 'file/account-search',
        loadComponent: () =>
          import(
            './home/file/account/account.component'
          ).then((m) => m.AccountComponent),
      },
      {
        path: 'file/file-search',
        loadComponent: () =>
          import(
            './home/file/file-search/file-search.component'
          ).then((m) => m.FileSearchComponent),
      },
    ],
  },
  {
    path: 'finance/menus',
    loadComponent: () =>
      import(
        './home/home-page/finance-main-menu/finance-main-menu.component'
      ).then((m) => m.FinanceMainMenuComponent),
  },

  //dashboard









  //inventory
];
