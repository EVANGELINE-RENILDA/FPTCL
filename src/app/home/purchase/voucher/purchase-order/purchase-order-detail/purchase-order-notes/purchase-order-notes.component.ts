import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import { entPurNotes } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { InnerScroll, Row } from '../../../../../../app-core/core-component/core-component.component';
import { AppSettingsService } from '../../../../../../common/services/app-settings/app-settings.service';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';


@Component({
  selector: 'app-purchase-order-notes',
  standalone: true,
  imports: [InputControlComponent, FormsModule, IconButtonComponent, Row, AppDatePipe, InnerScroll],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './purchase-order-notes.component.html',
  styleUrl: './purchase-order-notes.component.scss'
})
export class PurchaseOrderNotesComponent {

  accountsOptions = {
    type: 'accountsPath',
  };
  
  errorTrue = false;
  purchaseOrderNotes = new entPurNotes();

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
      data: this.parentData.voucherConfigId,
      data1: this.parentData.statusValue,
    };
    this.accountsService
      .createNewPaymentNoteNotes(obj, this.accountsOptions)
      .subscribe((success) => {
        this.purchaseOrderNotes = success;
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

  savePurchaseOrderNote(l:any){
    if(l.valid){
      if (this.parentData.lstentPurPurchaseOrderItem.length > 0) {
        this.errorTrue = false;
        this.purchaseOrderNotes.lstDDLClass = [];
        this.purchaseOrderNotes.referenceId = this.parentData.purPurchaseOrderId;
        this.parentData.sentPurNotes = this.purchaseOrderNotes;
        this.accountsService.savePurchaseOrderNote(this.parentData, this.accountsOptions)
          .subscribe((success) => {
            this.parentData = success;
            // setTimeout(() => {
            //   this.totalService.setValue(true);
            // }, 100);
            this.notesValue.emit(success);
            // this.statusLst = success.lstentPurPurchaseOrderStatusHistory
            this.dialog.closeDialog();
            // if (this.parentData.statusValue === 'APROV') {
            //   this.onTabChange(3);
            // }
          });
      } else {
        this.errorTrue = true;
      }
    }
  }

  notesClear() {
    this.errorTrue = false;
    this.createNewPurchaseOrderNote();
  }


}
