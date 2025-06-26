import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../app-core/service/core.service';
import { AppStorageService } from '../common/services/app-storage/app-storage.service';

    
@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  constructor(public dialogRef: DialogRef<boolean>,
    public router: Router, public dialog: CoreService,
    public storage: AppStorageService,
    @Inject(DIALOG_DATA) public dialogData: any,) {
  }


  type = this.dialogData.type
  ngOnInit(): void {

  }

  close(): void {
    this.dialogRef.close(false);
  }

  yesDelete() {
    this.dialogRef.close(true);
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.dialog.closeDialog()
    this.storage.clear()
    this.router.navigateByUrl('/login');
  }
}

