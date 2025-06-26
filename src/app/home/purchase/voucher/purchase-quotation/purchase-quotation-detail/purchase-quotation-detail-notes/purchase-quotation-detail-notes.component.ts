import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { Row, InnerScroll } from '../../../../../../app-core/core-component/core-component.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { entPurNotes } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../../common/services/app-settings/app-settings.service';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';

@Component({
  selector: 'app-purchase-quotation-detail-notes',
  standalone: true,
  imports: [InputControlComponent, FormsModule, IconButtonComponent, Row, AppDatePipe, InnerScroll],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './purchase-quotation-detail-notes.component.html',
  styleUrl: './purchase-quotation-detail-notes.component.scss'
})
export class PurchaseQuotationDetailNotesComponent {

  accountsOptions = {
    type: 'accountsPath',
  };

  errorTrue = false;
  purchaseQuotationNotes = new entPurNotes();

  @Input() parentData: any;
  @Output() notesValue = new EventEmitter();

  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;

  constructor(public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public appSetting: AppSettingsService
  ) {
    console.log(this.parentData);

  }

  createNewPurchaseOrderNote() {
    this.errorTrue = false;
    const obj = {
      data: this.parentData.voucherConfigId,
      data1: this.parentData.statusValue,
    };
    this.accountsService
      .createNewPaymentNoteNotes(obj, this.accountsOptions)
      .subscribe((success) => {
        this.purchaseQuotationNotes = success;
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

  savePurchaseQuotationNote(l: any) {

    if (l.valid) {
      if (this.parentData.plistentPurQuotationItem.length > 0) {
        this.errorTrue = false;
        this.purchaseQuotationNotes.lstDDLClass = [];
        this.purchaseQuotationNotes.referenceId = this.parentData.purQuotationId;
        this.parentData.sentPurNotes = this.purchaseQuotationNotes;
        this.accountsService.savePurchaseQuotationNotes(this.parentData)
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
