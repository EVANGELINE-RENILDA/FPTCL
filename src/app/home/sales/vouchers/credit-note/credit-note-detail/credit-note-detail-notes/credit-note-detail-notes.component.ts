import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, InnerScroll } from '../../../../../../app-core/core-component/core-component.component';
import { ErrorInfoComponent } from '../../../../../../app-core/error-info/error-info.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../../../app-core/message/error-message/error-message.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppSettingsService } from '../../../../../../common/services/app-settings/app-settings.service';
import { DataService } from '../../../../../../common/services/data/data.service';
import { entActCreditNote, entSalNotes } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';  

@Component({ 
  selector: 'app-credit-note-detail-notes',
  standalone: true,
  imports: [InputControlComponent, FormsModule, IconButtonComponent, Row, AppDatePipe, InnerScroll,ErrorInfoComponent,ErrorMessageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './credit-note-detail-notes.component.html',
  styleUrl: './credit-note-detail-notes.component.scss'
})
export class CreditNoteDetailNotesComponent {
  errorTrue = false;
  creditNotestab = new entSalNotes();
  creditNote = new entActCreditNote();
  @ViewChild('notesform') notesform!:NgForm;
  @Input() parentData: any;
  notesddl=[];
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
    this.createNotesForCreditNotetab()
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',
    });
  }
  createNotesForCreditNotetab(){
    this.errorTrue=false;
    const obj={
      data:this.parentData.actVoucherConfigId,
      data1:this.parentData.statusValue
    }
    this.accountsService.createNewAccountsNotes(obj).subscribe((success)=>{
      this.creditNotestab=success;
      this.creditNotestab.temporaryDocumentDate =
          this.creditNote.documentDate;
      this.notesddl=success.lddlData
      this.data.successMessage('Data Cleared Successfully')
    })
    }
  
    saveNotesForCreditNote(){
    
      if(this.notesform.valid){
      this.errorTrue=false;
      this.creditNotestab.lstDDLClass=[];
      this.creditNotestab.referenceId=this.parentData.actCreditNoteId;
      this.parentData.pentSalNotes=this.creditNotestab;
      this.accountsService.saveCreditNoteNotes(this.parentData).subscribe((success)=>{
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
      this.createNotesForCreditNotetab();
    }
    async changeReversal() {
      if (this.creditNotestab.temporaryDocumentDate !== '') {
        // let isReversal = await this.data.errorInfoMessage(this.advanceReceiptNotes.statusDescription);
        // if (isReversal) {
        //   this.saveNotesForSaleAdvanceReceiptNote()
        // }
      }
    }
}