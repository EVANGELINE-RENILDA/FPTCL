import { Injectable, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { entIEMessage } from '../../api-services/application-api/application-api.classes';
import { CoreService } from '../../../app-core/service/core.service';
import { AppStorageService } from '../app-storage/app-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessInfoComponent } from '../../../app-core/success-info/success-info.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettingsService } from '../app-settings/app-settings.service';
import { ErrorInfoComponent } from '../../../app-core/error-info/error-info.component';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
  token = '';
  message = new entIEMessage();
  showErrorMessage = false;
  basePath = '';
  onDialogClosedSubscriber: any;
  constructor(
    private router: Router,
    private coreService: CoreService,
    public storage: AppStorageService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    public appSetting: AppSettingsService,
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.clearMessageBox();
      }
    });
    this.onDialogClosedSubscriber = this.coreService.watchOnDialogClosed().subscribe((response: any) => {
      if (response) {
        this.clearMessageBox();
      }
    })
  }

  ngOnDestroy(): void {
    if (this.onDialogClosedSubscriber) {
      this.onDialogClosedSubscriber.unsubscribe();
    }
  }

  serviceStarted() {

  }
  serviceCompleted() { }

  // Error Methods
  errorMethod(err: any) {

    switch (err.status) {
      case 0:
        if (err.statusText === 'Unknown Error') {
          this.internalServerError('');
        }
        break;
      case 400:
        // debugger;
        this.message = err.error;
        this.showErrorMessage = true;
        break;
      case 404:
        this.internalServerError('Unable to reach Server Error code: 404');
        break;
      case 401:
        this.confirmSessionOut();
        break;
      case 500:
        this.internalServerError(err.error);
        break;
      case 501:
        this.internalServerError(err.error);
        break;
      case 503:
        this.internalServerError(err.error);
        break;
      default:
        break;
    }
  }


  async internalServerError(msg: any) {
    let xMsg = '';
    msg !== '' && msg != null
      ? (xMsg = msg)
      : (xMsg =
        'We are currently facing some technical issues right now. Please try again after some time.');
    this.coreService.notificationDialog(xMsg);
  }
  async confirmSessionOut() {
    let xMsg = 'Your session expired. Please login again to continue.';
    await this.coreService.notificationDialog(xMsg);
    this.router.navigateByUrl('/home');
  }

  clearMessageBox() {
    this.message = new entIEMessage();
    this.showErrorMessage = false;
  }

  postPDFData(path: any, body: any, options?: any) {
    let header = {};
    let basePath = this.basePath;
    if (options) {
      if (options.hidejwt) {
        header = new HttpHeaders({
          Spinner: options.hideFullSpinner ? '' : 'true',
        });
      } else {
        header = new HttpHeaders({
          Authorization: 'Bearer ' + this.token,
          Spinner: options.hideFullSpinner ? '' : 'true',
        });
      }
      basePath = options.type !== '' ? this.appSetting.environment[options.type] : this.basePath;
    }
    header = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
      Spinner: options?.hideFullSpinner ? '' : 'true',
    });
    return this.http.post(basePath + path, body, {
      headers: header,
      responseType: 'blob',
    });
  }

  async getToken() {
    await this.storage.get('userData').then((val) => {

      if (val) {
        this.token = val.keyToken;
      }
    });
  }

  checkToken(): Promise<boolean> {

    return new Promise(async (resolve, reject) => {
      if (this.token !== '') {
        resolve(true);
      } else {
        await this.storage.get('userData').then(async (val) => {

          if (val) {
            this.token = val.keyToken;
            resolve(true);
          }
        });
      }
    });
  }

  errorMessage(msg: any) {
    console.log('Error Message: ' + msg);
  }

  successMessage(msg: any) {
    this.snackBar.openFromComponent(SuccessInfoComponent, {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right', // Horizontal position of the snackbar
      verticalPosition: 'bottom', // Vertical position of the snackbar
      data: {
        msg: msg
      },
      panelClass: ['custom-snackbar'] // Custom CSS class for styling
    });
  }
  errorInfoMessage(msg: any) {
    this.snackBar.openFromComponent(ErrorInfoComponent, {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right', // Horizontal position of the snackbar
      verticalPosition: 'bottom', // Vertical position of the snackbar
      data: {
        msg: msg
      },
      panelClass: ['custom-snackbar'] // Custom CSS class for styling
    });
    // this.snackBar.open(msg, 'Close', {
    //   horizontalPosition: 'center',
    //   verticalPosition: 'top',
    //   panelClass: ['bg-success'],
    //   duration: 3000,
    // });

    // this.snackBar.openFromComponent(error, {
    //   duration: 3000, // Duration in milliseconds
    //   horizontalPosition: 'right', // Horizontal position of the snackbar
    //   verticalPosition: 'bottom', // Vertical position of the snackbar
    //   data: {
    //     msg: msg
    //   },
    //   panelClass: ['custom-snackbar'] // Custom CSS class for styling
    // });
  }
  postPDFData2(path: any, body: any, options?: any) {
    let header = {};
    let basePath = this.basePath;
    if (options) {
      if (options.hidejwt) {
        header = new HttpHeaders({
          Spinner: options.hideFullSpinner ? '' : 'true',
        });
      } else {
        header = new HttpHeaders({
          Authorization: 'Bearer ' + this.token,
          Spinner: options.hideFullSpinner ? '' : 'true',
        });
      }
      basePath = options.type !== '' ? this.appSetting.environment[options.type] : this.basePath;
    }
    header = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
      Spinner: options.hideFullSpinner ? '' : 'true',
    });
    return this.http.post(basePath + path, body, {
      headers: header,
      observe: 'response',
      responseType: 'blob',
    });
  }
}
