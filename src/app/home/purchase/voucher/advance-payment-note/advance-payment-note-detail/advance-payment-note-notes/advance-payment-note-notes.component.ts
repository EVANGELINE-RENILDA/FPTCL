import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Row, InnerScroll } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { entPurAdvancePaymentNote, entPurNotes } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../../common/services/app-settings/app-settings.service';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';

@Component({
  selector: 'app-advance-payment-note-notes',
  standalone: true,
  imports: [InputControlComponent, FormsModule, IconButtonComponent, Row, AppDatePipe, InnerScroll],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './advance-payment-note-notes.component.html',
  styleUrl: './advance-payment-note-notes.component.scss'
})
export class AdvancePaymentNoteNotesComponent {
  errorTrue = false;
  id: any = 0;
  advancePaymentNoteNotes = new entPurNotes();

  @Input() parentData: any;
  @Output() notesValue = new EventEmitter();

  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  statusddl=[];
  advancePaymentNote = new entPurAdvancePaymentNote();
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
      this.advancePaymentNoteNotes = success;
      this.advancePaymentNoteNotes.temporaryDocumentDate =
        this.parentData.documentDate;
      this.statusddl =
        success.lstDDLClass;
    });
}
saveNotesForAdvancePaymentNote(l:any){
  if (l.valid) {
      this.errorTrue = false;
        this.advancePaymentNoteNotes.lstDDLClass = [];
        this.advancePaymentNoteNotes.referenceId = this.id;
        this.parentData.pentPurNotes = this.advancePaymentNoteNotes;
        this.accountsService
          .saveNotesForAdvancePaymentNote(this.parentData)
          .subscribe((success) => {
            this.notesValue.emit(success)
          });
      }
     else {
         this.errorTrue = true;
  }
}
async changeReversal(l:any){
  if (this.advancePaymentNoteNotes.temporaryDocumentDate !== '') {
    let msg = "Do you want to cancel this " + this.parentData.statusDescription +"  transaction"
    let isReversal = await this.dialog.confirmDialog(msg);
    if (isReversal) {
      this.saveNotesForAdvancePaymentNote(l);
    }
  }
}
notesClear() {
  this.errorTrue = false;
  this.createNotesParams();
}
}
