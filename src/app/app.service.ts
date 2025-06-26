import { Injectable, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { entUser } from './common/api-services/admin-api/admin-api.classes';
import { format } from 'date-fns';
import { AppSettingsService } from './common/services/app-settings/app-settings.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  userData = new entUser();
  year: any;
  userLoginId: any = '';
  companyId: any = '';
  showDetails = true;
  companyName = '';
  menuName = '';
  branchId = 0;
  branchDDL: any = [];
  fiscalYearList: any = [];
  branchValue: any = '';
  currencyValue: any;
  myDiaryId: any
  newRemainder: any
  helpFile = '';
  screenName = ''
  oldRemainder: any
  breadCrumbTemplate!: TemplateRef<any>;
  breadCrumbChanged = new BehaviorSubject<boolean>(false);

  constructor(public router: Router, public appSetting: AppSettingsService) {
    const date = new Date();
    this.year = date.getFullYear();
  }

  setBreadCrumb(templateRef: any) {
    this.breadCrumbTemplate = templateRef;
    this.breadCrumbChanged.next(true);
  }

  getBreadCrumb(): TemplateRef<any> | null {
    return this.breadCrumbTemplate;
  }

  watchBreadCrumbChanged(): Observable<boolean> {
    return this.breadCrumbChanged.asObservable();
  }

  getCurrentDate() {
    let currentDate: any = new Date();
    currentDate = format(
      currentDate,
      this.appSetting.environment.serverDateFormatWithTime
    );
    return currentDate;
  }
}
