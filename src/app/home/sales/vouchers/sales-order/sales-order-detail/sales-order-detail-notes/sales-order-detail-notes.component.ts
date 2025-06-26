import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Row, InnerScroll } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { entPurNotes, entSalSalesOrder } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { AppSettingsService } from '../../../../../../common/services/app-settings/app-settings.service';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';

@Component({
  selector: 'app-sales-order-detail-notes',
  standalone: true,
  imports: [InputControlComponent, FormsModule, IconButtonComponent, Row, AppDatePipe, InnerScroll],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sales-order-detail-notes.component.html',
  styleUrl: './sales-order-detail-notes.component.scss'
})
export class SalesOrderDetailNotesComponent {

  accountsOptions = {
    type: 'accountsPath',
  };

  errorTrue = false;
  salesOrderNotes = new entPurNotes();

  @Input() parentData: any;
  @Output() notesValue = new EventEmitter();

  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;

  constructor(public accountsService: AccountsApiService,
              public initialData: InitialDataService,
              public dialog: CoreService,
              public appSetting: AppSettingsService
  ){
   console.log(this.parentData);

  }

  createNewPurchaseOrderNote(){
    this.errorTrue = false;
    const obj = {
      data: this.parentData.appActVoucherConfigId,
      data1: this.parentData.statusValue,
    };
    this.accountsService
      .createNewPaymentNoteNotes(obj, this.accountsOptions)
      .subscribe((success) => {
        this.salesOrderNotes = success;
        this.initialData.DDLValues.DDLFlowStatus =
          success.lstDDLClass;
      });
  }

  async openDialogNotes() {
    this.createNewPurchaseOrderNote()
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',
    });
  }

  saveSalesOrderNotes(l:any){
    if(l.valid){
      if (this.parentData.ilstentSalSalesOrderItem.length > 0) {
        this.errorTrue = false;
        this.salesOrderNotes.lstDDLClass = [];
        this.salesOrderNotes.referenceId = this.parentData.salSalesOrderId;
        this.parentData.pentSalNotes = this.salesOrderNotes;
        this.accountsService.saveSalesOrderNotes(this.parentData)
          .subscribe((success) => {
            this.parentData = success;
            this.notesValue.emit(success);
            this.dialog.closeDialog();
          });
      } else {
        this.errorTrue = true;
      }
    }else {
      this.errorTrue = true;
    }
  }

  notesClear() {
    this.errorTrue = false;
    this.createNewPurchaseOrderNote();
  }


}
