import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Row, InnerScroll } from '../../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { entPurNotes } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';
import { AppSettingsService } from '../../../../../../common/services/app-settings/app-settings.service';
import { InitialDataService } from '../../../../../../common/services/initial-data/initial-data.service';

@Component({
  selector: 'app-sales-quotation-detail-notes',
  standalone: true,
  imports: [InputControlComponent, FormsModule, IconButtonComponent, Row, AppDatePipe, InnerScroll],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sales-quotation-detail-notes.component.html',
  styleUrl: './sales-quotation-detail-notes.component.scss'
})
export class SalesQuotationDetailNotesComponent {

  options = {
    type: 'accountsPath',
  };
  errorTrue = false;
  salesQuotationNotes = new entPurNotes();

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

  createNewSalesOrderNotes(){
    this.errorTrue = false;
    const obj = {
      data: this.parentData.appActVoucherConfigId,
      data1: this.parentData.statusValue,
    };
    this.accountsService
      .createNewSalesOrderNotes(obj, this.options)
      .subscribe((success) => {
        this.salesQuotationNotes = success;
        this.initialData.DDLValues.DDLFlowStatus =
          success.lstDDLClass;
      });
  }

  async openDialogNotes() {
    this.createNewSalesOrderNotes()
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: 'auto',
      width: '900px',
      maxWidth: '1170px',
    });
  }

  saveCustomerQuotationNote(l:any){
    if(l.valid){
      if (this.parentData.plistSalSalesQuotationItem.length > 0) {
        this.errorTrue = false;
        this.salesQuotationNotes.lstDDLClass = [];
        this.salesQuotationNotes.referenceId = this.parentData.salSalesQuotationId;
        this.parentData.pentSalNotes = this.salesQuotationNotes;
        this.accountsService.saveCustomerQuotationNote(this.parentData, this.options)
          .subscribe((success) => {
            this.parentData = success;
            this.notesValue.emit(success);
            this.dialog.closeDialog();
          });
      } else {
        this.errorTrue = true;
      }
    }
  }

  notesClear() {
    this.errorTrue = false;
    this.createNewSalesOrderNotes();
  }


}
