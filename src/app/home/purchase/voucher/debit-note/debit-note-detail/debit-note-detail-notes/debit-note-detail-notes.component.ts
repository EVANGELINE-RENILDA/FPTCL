import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Row,
  InnerScroll,
} from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { CoreService } from '../../../../../../app-core/service/core.service';
import {
  entPurNotes,
  entPurAdvancePaymentNote,
  entActDebitNote,
} from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../../common/services/app-settings/app-settings.service';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';
import { DataService } from '../../../../../../common/services/data/data.service';

@Component({
  selector: 'app-debit-note-detail-notes',
  standalone: true,
  imports: [
    InputControlComponent,
    FormsModule,
    IconButtonComponent,
    Row,
    AppDatePipe,
    InnerScroll,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './debit-note-detail-notes.component.html',
  styleUrl: './debit-note-detail-notes.component.scss',
})
export class DebitNoteDetailNotesComponent {
  
  errorTrue = false;
  id: any = 0;

  debitNoteNotes = new entPurNotes();

  @Input() parentData = new entActDebitNote();
  @Output() notesValue = new EventEmitter();

  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;

  constructor(
    public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public dialog: CoreService,
    public appSetting: AppSettingsService,
    public data : DataService
  ) {}

  async openDialogNotes() {
    this.createNotesParams();
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',
    });
  }

  createNotesParams() {
    this.errorTrue = false;
    const obj = {
      data: this.parentData.actVoucherConfigId,
      data1: this.parentData.statusValue,
    };
    this.accountsService.createNewAccountsNotes(obj).subscribe((success) => {
      this.debitNoteNotes = success;
      this.debitNoteNotes.temporaryDocumentDate = this.parentData.documentDate;
      this.initialData.DDLValues.DDLFlowStatus = success.lddlData;
    });
  }

  saveNotesForDebitNote(n: any) {
    if (n.valid) {
          this.debitNoteNotes.referenceId = this.id;
          this.debitNoteNotes.lstDDLClass = [];
          this.parentData.pentPurNotes = this.debitNoteNotes;
          this.accountsService
            .saveNotesForDebitNote(this.parentData)

            .subscribe((success) => {
              this.parentData = success;
              this.data.successMessage(
                success.msg.infoMessage.msgDescription
              );
              this.notesValue.emit(success);
              this.dialog.closeDialog();
              // this.ilistentActDebitNoteItemRAW = JSON.parse(
              //   JSON.stringify(success.ilistentActDebitNoteItem)
              // );
              // this.statusSource = new MatTableDataSource(
              //   success.ilistentActDebitNoteStatusHistory
              // );
            });
    } else {
      this.errorTrue = true;
    }
  }

  notesClear() {
    this.errorTrue = false;
    this.createNotesParams();
  }

  async changeReversal(valid: any) {
    if (this.debitNoteNotes.temporaryDocumentDate !== '') {
      let isReversal = await this.dialog.confirmDialog(this.parentData.statusDescription);
      if (isReversal) {
        this.saveNotesForDebitNote(valid)
      }
    }
  }

}
