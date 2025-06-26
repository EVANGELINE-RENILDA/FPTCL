import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { Row } from '../../../../../app-core/core-component/core-component.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AccountsApiService } from '../../../../../common/api-services/accounts-api/accounts-api.service';
import { InitialDataService } from '../../../../../common/services/initial-data/initial-data.service';
import { entActCustomerDetails, entActNotes } from '../../../../../common/api-services/accounts-api/accounts-api.classes';
import { DataService } from '../../../../../common/services/data/data.service';

@Component({
  selector: 'app-customer-detail-notes',
  standalone: true,
  imports: [AppTableComponent,IconButtonComponent,AppDatePipe,InputControlComponent,Row,FormsModule,CellDefDirective,CellHeaderDefDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './customer-detail-notes.component.html',
  styleUrl: './customer-detail-notes.component.scss'
})
export class CustomerDetailNotesComponent {
  @ViewChild('notesDialog') notesDialog!: TemplateRef<any>;
  @ViewChild('n')nform!:NgForm;
  customer=new entActCustomerDetails();
  @Input() parentData = new entActCustomerDetails();

  @Output() attachmentData = new EventEmitter();


  errorTrue=false;
  customerNotes = new entActNotes();
  notes: any = ['notes', 'add'];
  notesName: any = ['Notes', '', ''];
  tableNoteData = [];
  constructor(
    public dialog: CoreService,
    public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public data: DataService,
  ){

  }
  async createNewNotes(val: any) {
    this.createSalesCustomerNotes()
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: '400px',
      width: '900px',
      maxWidth: '1170px',
    })
  }
  createSalesCustomerNotes() {
    this.accountsService.createNewNotes().subscribe((success) => {
      this.customerNotes = success
    })
  }
  saveSalesCustomerNotes() {
    if (this.nform.valid) {
      this.customerNotes.referenceId = this.customer.actCustomerId;
      this.accountsService.saveCustomerNotes(this.customerNotes).subscribe((success) => {
        this.tableNoteData = success.plstentActNotes;
        this.attachmentData.emit(this.parentData);

        this.data.successMessage(success?.msg?.infoMessage?.msgDescription);
        this.dialog.closeDialog();
      })
    }
    else {
      this.errorTrue = true;
    }
  }
  clearSalesCustomerNotes(){
    this.createSalesCustomerNotes();
    // this.dialogClose()
    this.data.successMessage('Data Refreshed Successfully')
  }
}
