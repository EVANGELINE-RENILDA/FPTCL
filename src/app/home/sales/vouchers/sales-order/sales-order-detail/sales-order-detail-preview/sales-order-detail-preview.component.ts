import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Row } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { entPurQuotation, entSalSalesOrder } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../../common/services/app-settings/app-settings.service';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import { AppAccessDirective } from '../../../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../../../common/permission/button-access.directive';
import { AppSafePipe } from '../../../../../../common/pipes/app-safe/app-safe.pipe';

@Component({
  selector: 'app-sales-order-detail-preview',
  standalone: true,
  imports: [InputControlComponent, FormsModule, IconButtonComponent, Row,AppSafePipe,AppAccessDirective, ButtonAccessDirective,],
  templateUrl: './sales-order-detail-preview.component.html',
  styleUrl: './sales-order-detail-preview.component.scss'
})
export class SalesOrderDetailPreviewComponent {
  blob = {};
  fileUrl = '';
  urlFileName = '';
  pageId = 'PUISC'
  @Input() parentData = new entSalSalesOrder();

  constructor(
    public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public appSetting: AppSettingsService
  ) {}

  ngOnInit(): void {
    this.viewPurchaseOrderReceipt();
  }

  viewPurchaseOrderReceipt() {
    if (this.parentData.salSalesOrderId !== 0) {
      const obj = {
        data: this.parentData.salSalesOrderId,
        data1: this.parentData.ientActVoucherConfig.pdfOtherComments,
      };
      const options = {
        responseType: 'blob',
      };
      this.accountsService
        .viewAdvancePurPaymentNoteReceipt(obj, options)
        .subscribe((success: any) => {
          let contentDisposition = success.headers.get('content-disposition');
          let filename = contentDisposition
            .split(';')[1]
            .split('filename')[1]
            .split('=')[1]
            .trim();
          // this.blob = success.body;
          const resp = new Blob([success.body], { type: 'application/pdf' });
          this.blob = resp;
          const fileURL = URL.createObjectURL(resp);

          this.urlFileName = filename;
          this.fileUrl = fileURL;
        });
    }
  }
}

