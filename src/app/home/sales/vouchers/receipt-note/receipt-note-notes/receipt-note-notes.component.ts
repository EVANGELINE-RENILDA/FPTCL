import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, InnerScroll } from '../../../../../app-core/core-component/core-component.component';
import { ErrorInfoComponent } from '../../../../../app-core/error-info/error-info.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../../app-core/message/error-message/error-message.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { entSalNotes, entSalReceiptNote } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../common/services/app-settings/app-settings.service';
import { DataService } from '../../../../../common/services/data/data.service';

@Component({
  selector: 'app-receipt-note-notes',
  standalone: true,
  imports: [InputControlComponent, FormsModule, IconButtonComponent, Row, AppDatePipe, InnerScroll,ErrorInfoComponent,ErrorMessageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './receipt-note-notes.component.html',
  styleUrl: './receipt-note-notes.component.scss'
})
export class ReceiptNoteNotesComponent {
  errorTrue = false;
  receiptNote = new entSalReceiptNote();
  receiptNotestab = new entSalNotes();
  notesddl=[];
  @ViewChild('notesform') notesform!:NgForm
  @Input() parentData: any;
  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  @Output() notesValue = new EventEmitter();
  constructor( public dialog: CoreService,
    public data:DataService,
    public accountsService: AccountsApiService,
    public appSetting: AppSettingsService
  ){
  
 
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
  createNotesForReceiptNotetab(){
    this.errorTrue=false;
    const obj={
      data:this.parentData.actVoucherConfigId,
      data1:this.parentData.statusValue
    }
    this.accountsService.createNewNotesForReceiptNote(obj).subscribe((success)=>{
      this.receiptNotestab=success;
      this.notesddl=success.lstDDLClass
      this.data.successMessage('Data Cleared Successfully')
    })
    }

    saveNotesForSaleReceiptNote(){
    
      if(this.notesform.valid){
      this.errorTrue=false;
      this.receiptNotestab.lstDDLClass=[];
      this.receiptNotestab.referenceId=this.parentData.salAdvanceReceiptNoteId;
      this.parentData.pentSalNotes=this.receiptNotestab;
      this.accountsService.saveNotesForSaleReceiptNote(this.parentData).subscribe((success)=>{
        this.parentData=success;
        this.notesValue.emit(success);
        this.dialog.closeDialog();
      })
    
      }else{
        this.errorTrue=true;
      }
    }
    notesClear(){
      this.errorTrue=false;
      this.createNotesForReceiptNotetab();
    }
    async changeReversal() {
      if (this.receiptNotestab.temporaryDocumentDate !== '') {
        // let isReversal = await this.data.errorInfoMessage(this.advanceReceiptNotes.statusDescription);
        // if (isReversal) {
        //   this.saveNotesForSaleAdvanceReceiptNote()
        // }
      }
    }
}
