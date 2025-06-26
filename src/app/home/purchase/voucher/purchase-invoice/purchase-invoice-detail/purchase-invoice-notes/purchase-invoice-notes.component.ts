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
import { AppAccessDirective } from '../../../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../../../common/permission/button-access.directive';
@Component({
  selector: 'app-purchase-invoice-notes',
  standalone: true,
  imports: [InputControlComponent, FormsModule, IconButtonComponent, Row, AppDatePipe, InnerScroll,AppAccessDirective, ButtonAccessDirective,],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './purchase-invoice-notes.component.html',
  styleUrl: './purchase-invoice-notes.component.scss'
})
export class PurchaseInvoiceNotesComponent {
  pageId = 'PUISC';
  accountsOptions = {
    type: 'accountsPath',
  };

  errorTrue = false;
  purchaseInvoiceNotes = new entPurNotes();

  @Input() parentData: any;
  @Output() notesValue = new EventEmitter();

  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;

  constructor(public accountsService: AccountsApiService,
              public initialData: InitialDataService,
              public dialog: CoreService,
              public appSetting: AppSettingsService
  ){
         
  }

  createNewPaymentNoteNotes(){
    console.log(this.parentData);
    this.errorTrue = false;
    const obj = {
      data: this.parentData.voucherConfigId,
      data1: this.parentData.statusValue,
    };
    this.accountsService
      .createNewPaymentNoteNotes(obj, this.accountsOptions)
      .subscribe((success) => {
        this.purchaseInvoiceNotes = success;
        this.initialData.DDLValues.DDLFlowStatus =
          success.lstDDLClass;
      });
  }

  async openDialogNotes() {
    this.createNewPaymentNoteNotes();
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',
    });
  }

  savePurchaseInvoiceNote(l:any){
    if(l.valid){
      // if (this.parentData.plistentPurNotes.length > 0) {
        this.errorTrue = false;
        this.purchaseInvoiceNotes.lstDDLClass = [];
        this.purchaseInvoiceNotes.referenceId = this.parentData.purPurchaseInvoiceId;
        this.accountsService
        this.parentData.pentPurNotes = this.purchaseInvoiceNotes;
        this.accountsService.savePurchaseInvoiceNote(this.parentData, this.accountsOptions)
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
      // }
    }else {
      this.errorTrue = true;
    }
  }

  notesClear() {
    this.errorTrue = false;
    this.createNewPaymentNoteNotes();
  }

  closeDialog(){
    this.dialog.closeDialog();
    
  }

}
