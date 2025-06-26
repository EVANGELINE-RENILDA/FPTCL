import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from '../../../../../../common/services/data/data.service';
import { CoreService } from '../../../../../../app-core/service/core.service';
import { AccountsApiService } from '../../../../../../common/api-services/accounts-api/accounts-api.service';
import { entSalNotes, entSalSalesInvoice } from '../../../../../../common/api-services/accounts-api/accounts-api.classes';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../../app-core/template/app-table/app-table.component';
import { FormsModule, NgForm } from '@angular/forms';
import { InputControlComponent } from '../../../../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../../../../app-core/template/icon-button/icon-button.component';
import { Row } from '../../../../../../app-core/core-component/core-component.component';
import { AppDatePipe } from '../../../../../../common/pipes/app-date/app-date.pipe';

@Component({
  selector: 'app-sales-invoice-notes',
  standalone: true,
  imports: [AppTableComponent, CellDefDirective, CellHeaderDefDirective, 
    FormsModule,InputControlComponent,IconButtonComponent,Row,AppDatePipe ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sales-invoice-notes.component.html',
  styleUrl: './sales-invoice-notes.component.scss'
})
export class SalesInvoiceNotesComponent {
  notes: any = ['sno', 'notes', 'createdBy', 'dateTime', 'add'];
  notesName: any = ['', 'Notes', 'Created By', 'Date | Time', ''];
  @ViewChild('notesDialog') notesDialog!: TemplateRef<any>;
  @Input() salesInvoice = new entSalSalesInvoice();
  salesInvoiceRAW = new entSalSalesInvoice();
  @Output() salesInvoiceChange = new EventEmitter();
  salesInvoiceNotes = new entSalNotes();
errorTrue = false;
  constructor(public data: DataService,
    public dialog : CoreService,
    public accountsService: AccountsApiService
  ){}

  async createNewNotes() {
    this.createNewSalesInvoiceNotes();
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: '400px',
      width: '900px',
      maxWidth: '1170px',
    })
  }
  createNewSalesInvoiceNotes() {
    this.errorTrue = false;
    const obj = {
      data: this.salesInvoice.appActVoucherConfigId,
      data1: this.salesInvoice.statusValue,
    }
    this.accountsService.createNewSalesOrderNotes(obj).subscribe((success) => {
      this.salesInvoiceNotes = success;
      this.statusddl = success.lstDDLClass
    })
  }
  statusddl = [];
  tableNoteData:any =[];
  @ViewChild('notestab') notestabform!: NgForm;
  saveNotes() {
    if (this.notestabform.valid) {
      // this.salesInvoiceNotes.referenceId = this.id;
      this.salesInvoiceNotes.lstDDLClass = [];

      this.salesInvoice.pentSalNotes = this.salesInvoiceNotes;
      this.accountsService.saveSalesInvoiceNote(this.salesInvoice).subscribe((success) => {
        this.salesInvoice = success;
        this.salesInvoiceRAW = success;
        this.salesInvoiceChange.emit(this.salesInvoice)
        this.dialog.closeDialog();
      })
    }
  }
  clear() {
    this.createNewSalesInvoiceNotes();
    this.data.successMessage('Data Cleared Successfully');
  }
}
