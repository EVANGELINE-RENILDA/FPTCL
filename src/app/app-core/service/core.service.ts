import { Dialog } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import {
  ConfirmationAlertComponent,
  NotificationAlertComponent,
} from '../core-component/dialog-component.component';
import { AlertComponent } from '../../alert/alert.component';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CoreService {
  dialogRef!: any;
  multiDialogRef: any = {};
  onDialogClosed = new BehaviorSubject<boolean>(false);
  constructor(private dialog: Dialog) {}

  watchOnDialogClosed(): Observable<boolean> {
    return this.onDialogClosed.asObservable();
  }

  openDialog(template: any, option: any, id?: any) {
    return new Promise((resolve: any) => {
      if (!id) {
        this.dialogRef = this.dialog.open<string>(template, option);
        this.dialogRef.closed.subscribe((result: any) => {
          resolve(result);
        });
      } else {
        this.multiDialogRef[id] = this.dialog.open<string>(template, option);
        this.multiDialogRef[id].closed.subscribe((result: any) => {
          resolve(result);
        });
      }
    });
  }
  closeDialog(id?: any) {
    
    if (this.dialogRef && !id) {
      this.dialogRef.close();
    }
    if (id && this.multiDialogRef[id]) {
      this.multiDialogRef[id].close();
    }
    this.onDialogClosed.next(true);
  }
  closeAll() {
    this.dialog.closeAll();
  }

  notificationDialog(message: any) {
    return new Promise(async (resolve: any) => {
      let options = {
        minWidth: '360px',
        maxWidth: '600px',
        disableClose: true,
        panelClass: 'notification-pane',
        data: {
          msg: message,
        },
      };
      let response = await this.openDialog(NotificationAlertComponent, options);
      resolve(response);
    });
  }
  confirmDialog(message: any) {
    return new Promise(async (resolve: any) => {
      let options = {
        width: '360px',
        disableClose: true,
        panelClass: 'notification-pane',
        data: {
          msg: message,
        },
      };
      let response = await this.openDialog(ConfirmationAlertComponent, options);
      resolve(response);
    });
  }

  logout() {
    return new Promise(async (resolve: any) => {
      let options = {
        width: '360px',
        data: {
          type: 'logout',
        },
      };
      let response = await this.openDialog(AlertComponent, options);
      resolve(response);
    });
  }

  checkDelete(message: any) {
    return new Promise(async (resolve: any) => {
      let options = {
        width: '360px',
        data: {
          msg: message,
          type: 'delete',
        },
      };
      let response = await this.openDialog(AlertComponent, options);
      resolve(response);
    });
  }
  alertPopup(message: any) {
    return new Promise(async (resolve: any) => {
      let options = {
        width: '360px',
        data: {
          msg: message,
          type: 'alert',
        },
      };
      let response = await this.openDialog(AlertComponent, options);
      resolve(response);
    });
  }
}
