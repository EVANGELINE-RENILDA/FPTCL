import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { entPurNotes } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../../common/services/app-settings/app-settings.service';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import { FormsModule } from '@angular/forms';
import { Row, InnerScroll } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';

@Component({
  selector: 'app-payment-note-notes',
  standalone: true,
  imports: [InputControlComponent, FormsModule, IconButtonComponent, Row, AppDatePipe, InnerScroll],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './payment-note-notes.component.html',
  styleUrl: './payment-note-notes.component.scss'
})
export class PaymentNoteNotesComponent {

  errorTrue = false;
  paymentNoteNotes = new entPurNotes();

  @Input() parentData: any;
  @Output() notesValue = new EventEmitter();

  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;

  constructor(
    public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public appSetting: AppSettingsService
){}

async openDialogNotes() {
  this.createNotesParams()
  let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
    disableClose: true,
    height: 'auto',
    width: '900px',
    maxWidth: '1170px',
  });
}

createNotesParams(){
  this.errorTrue = false;
  const obj = {
    data: this.parentData.actVoucherConfigId,
    data1: this.parentData.statusValue,
  };
  this.accountsService
    .createNewNotesForPaymentNote(obj)
    .subscribe((success) => {
      this.paymentNoteNotes = success;
      this.paymentNoteNotes.temporaryDocumentDate =
        this.parentData.documentDate;
      this.initialData.DDLValues.DDLFlowStatus =
        success.lstDDLClass;
    });
}

savenotesfrPaymentNote(l:any){
  if (l.valid) {
      this.errorTrue = false;
        this.paymentNoteNotes.lstDDLClass = [];
        this.paymentNoteNotes.referenceId = this.parentData.purPaymentNoteId;
        this.parentData.sentPurNotes = this.paymentNoteNotes;
        this.accountsService
          .saveNotesForPaymentNote(this.parentData)
          .subscribe((success) => {
            this.notesValue.emit(success);
            this.dialog.closeDialog();
          });
      }
     else {
         this.errorTrue = true;
  }
}

  async changeReversal(l:any){
  if (this.paymentNoteNotes.temporaryDocumentDate !== '') {
    let msg = "Do you want to cancel this " + this.parentData.statusDescription +"  transaction"
    let isReversal = await this.dialog.confirmDialog(msg);
    if (isReversal) {
      this.savenotesfrPaymentNote(l);
    }
  }
}


notesClear() {
  this.errorTrue = false;
  this.createNotesParams();
}

}
