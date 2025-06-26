import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, InnerScroll } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { entSalAdvanceReceiptNote, entSalNotes } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { DataService } from '../../../../../../common/services/data/data.service';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../../common/services/app-settings/app-settings.service';
import { ErrorInfoComponent } from '../../../../../../app-core/error-info/error-info.component';
import { ErrorMessageComponent } from '../../../../../../app-core/message/error-message/error-message.component';

@Component({
  selector: 'app-advance-receipt-note-notes',
  standalone: true,
  imports: [InputControlComponent, FormsModule, IconButtonComponent, Row, AppDatePipe, InnerScroll, ErrorInfoComponent, ErrorMessageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './advance-receipt-note-notes.component.html',
  styleUrl: './advance-receipt-note-notes.component.scss'
})
export class AdvanceReceiptNoteNotesComponent {
  accountsOptions = {
    type: 'accountsPath',
  };
  notesddl = []
  errorTrue = false;
  advancereceiptNotestab = new entSalNotes();
  advanceReceiptNotes = new entSalAdvanceReceiptNote();

  @Input() parentData: any;
  @Output() notesValue = new EventEmitter();

  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  @ViewChild('notesform') notesform!: NgForm

  constructor(public dialog: CoreService,
    public data: DataService,
    public accountsService: AccountsApiService,
    public appSetting: AppSettingsService
  ) {

  }

  createNotesForReceiptNotetab() {
    this.errorTrue = false;
    const obj = {
      data: this.parentData.actVoucherConfigId,
      data1: this.parentData.statusValue
    }
    this.accountsService.createNewNotesForReceiptNote(obj).subscribe((success) => {
      this.advancereceiptNotestab = success;
      this.notesddl = success.lstDDLClass
      this.data.successMessage('Data Cleared Successfully')
    })
  }
  saveNotesForSaleAdvanceReceiptNote() {

    if (this.notesform.valid) {
      this.errorTrue = false;
      this.advancereceiptNotestab.lstDDLClass = [];
      this.advancereceiptNotestab.referenceId = this.parentData.salAdvanceReceiptNoteId;
      this.parentData.pentSalNotes = this.advancereceiptNotestab;
      this.accountsService.saveNotesForSaleAdvanceReceiptNote(this.parentData).subscribe((success) => {
        this.parentData = success;
        this.notesValue.emit(success);
        this.dialog.closeDialog();
      })

    } else {
      this.errorTrue = true;
    }
  }
  async openDialogNotes() {
    this.createNotesForReceiptNotetab()
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',
    });
  }
  async changeReversal() {
    if (this.advancereceiptNotestab.temporaryDocumentDate !== '') {
      // let isReversal = await this.data.errorInfoMessage(this.advanceReceiptNotes.statusDescription);
      // if (isReversal) {
      //   this.saveNotesForSaleAdvanceReceiptNote()
      // }
    }
  }
  notesClear() {
    this.errorTrue = false;
    this.createNotesForReceiptNotetab();
  }
}
