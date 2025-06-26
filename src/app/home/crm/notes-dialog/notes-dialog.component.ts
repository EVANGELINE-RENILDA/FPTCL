import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, Input, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Row, InnerScroll } from '../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { CoreService } from '../../../app-core/service/core.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-notes-dialog',
  standalone: true,
  imports: [InputControlComponent, Row, FormsModule, IconButtonComponent, InnerScroll],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './notes-dialog.component.html',
  styleUrl: './notes-dialog.component.scss'
})
export class NotesDialogComponent {
  notesTitle: any = '';
  notesDDl: any = [];
  errorTrue = false;
  clearTemp: any = {}
  notes: any = {}
  notesRAW: any = {}
  status = ''
  statusId = ''

  @Input() public notesPage: any = '';
  @ViewChild('x') xForm!: NgForm;
  constructor(public dialog: CoreService,
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public xData: any,
  ) {
    console.log(xData);
    this.clearTemp = xData.customerClear
    this.notes = xData.customer;
    this.status = xData.status;
    this.statusId = xData.statusId;
    this.notesTitle = xData.notesPage;
    if (this.notesTitle === 'Customer') {
      this.notes.statusValue = xData.customer.customerStatusValue
      this.notes.statusId = xData.customer.customerStatusId

    }
    this.notesDDl = xData.customer.ientDDL.value

  }
  closeNotesDialog() {

    this.dialog.closeDialog()
  }

  saveNotes() {
    if (this.xForm.valid) {
      if (this.dialogRef) {

        this.dialogRef.close(this.notes);
      }
    }
    else {
      this.errorTrue = true
    }
  }
  clear() {
    this.errorTrue = false
    this.notes = {}
    this.notes.statusValue = this.status
    this.notes.statusId = this.statusId





  }

}
