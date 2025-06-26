import { Component, Input } from '@angular/core';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../../common/services/app-settings/app-settings.service';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import {
  entPurPurchaseOrder,
  entPurchaseOrderVoucherStatusHistorySearch,
} from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { FormsModule } from '@angular/forms';
import { AppToolTipComponent } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';

@Component({
  selector: 'app-purchase-order-status',
  standalone: true,
  imports: [AppTableComponent, IconButtonComponent, AppDatePipe, CellDefDirective,
            CellHeaderDefDirective, FormsModule, AppToolTipComponent,
            InputControlComponent],
  templateUrl: './purchase-order-status.component.html',
  styleUrl: './purchase-order-status.component.scss',
})
export class PurchaseOrderStatusComponent {

  accountsOption = {
    type: 'accountsPath',
  };

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  totalCount = 0;

  searchParams = new entPurchaseOrderVoucherStatusHistorySearch();

  @Input() parentData = new entPurPurchaseOrder();

  columns = ['changedByFullName', 'changedDate', 'status'];
  columnsName = ['Changed By', 'Changed Date', 'Satus'];
  tableData = [];

  constructor(
    public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public appSetting: AppSettingsService
  ) {}

  pageChanged(event: any) {
    this.searchParams.pageNumber = event.pageIndex + 1;
    this.searchParams.pageSize = event.pageSize;
    this.searchParams.purPurchaseOrderId = this.parentData.purPurchaseOrderId;
    this.searchPurchaseOrderVoucherStatusHistory();
  }

  searchPurchaseOrderVoucherStatusHistory() {
    this.accountsService
      .searchPurchaseOrderVoucherStatusHistory(
        this.searchParams,
        this.accountsOption
      )
      .subscribe((success) => {
        this.parentData.pentPurchaseOrderVoucherStatusHistorySearchResult =
          success;
        this.totalCount = success.totalCount;
      });
  }

  savePurPurchaseOrderVoucherStatus() {
    debugger
    if (
      this.parentData.voucherStatusValue !== this.parentData.preVoucherStatus
    ) {
      this.accountsService
        .savePurPurchaseOrderVoucherStatus(this.parentData, this.accountsOption)
        .subscribe((success) => {
          this.parentData = success;
          this.totalCount =
            success.pentPurchaseOrderVoucherStatusHistorySearchResult.totalCount;
        });
    }
  }
}
