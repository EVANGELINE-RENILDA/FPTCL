import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { DataService } from '../../services/data/data.service';
import { ApiDataService } from "../../api-services/api-data.service";
import { AppSettingsService } from '../../services/app-settings/app-settings.service';

@Injectable({
  providedIn: "root",
})
export class AdminApiService {

  constructor(private data: DataService, private apiData: ApiDataService, private appSettings: AppSettingsService) { }
   
  getAuditSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'auditlog/search', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchAuditLog (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'auditlog/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAuditLogDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'auditlog/LoadAuditLogDetails', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getAuditLogInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'auditlog/initialize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  gettoken (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'authenticate/gettoken', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    authenticateuser (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'authenticate/authenticateuser', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    authenticateAdminUsers (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'authenticate/authenticateAdminUsers', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    changeLanguagePreference (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'authenticate/ChangeLanguagePreference', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    authenticateitguser (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'authenticate/authenticateitguser', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getJWT (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'authenticate/jwt/get', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    forgotuserpassword (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'authenticate/forgotuserpassword', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    validatetheOTP (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'authenticate/ValidatetheOTP', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    checkOTPexpiryandvalidate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'authenticate/CheckOTPexpiryandvalidate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    resendOTPForUser (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'authenticate/ResendOTPForUser', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getUserDetailsFromURlNewUser (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'authenticate/GetUserDetailsFromURlNewUser', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    forgotuserid (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'authenticate/forgotuserid', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    resetuserpassword (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'authenticate/resetuserpassword', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getuserdetailsfromurl (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'authenticate/getuserdetailsfromurl', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveuserpassword (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'authenticate/saveuserpassword', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    decryptuserdata (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'authenticate/decryptuserdata', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    changeuserpassword (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'authenticate/ChangeUserPassword', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewBranch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'Branch/Branch/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveAdminBranch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'Branch/Branch/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getBranchSearchObject (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'Branch/Branch/search', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    openBranchListDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'Branch/Branch/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteBranch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'Branch/Branch/delete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    searchBranch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'Branch/Branch/Search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getCommunicationTrackingInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'communicationtracking/initialize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getCommunicationTrackingSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'communicationtracking/search', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchCommunicationTracking (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'communicationtracking/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openCommunicationTracking (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'communicationtracking/Open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getConfigSearchObject (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'config/search', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchConfigs (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'config/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openSelectedConfig (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'config/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openConfigByConfigId (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'config/OpenConfigByConfigId', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openSelectedConfigValue (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'config/value/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openSelectedConfigData (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'config/meta-data/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewConfig (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'config/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewConfigValue (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'config/value/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewConfigMetaData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'config/meta-data/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveConfig (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'config/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveConfigValue (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'config/value/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveConfigMetaData (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'config/meta-data/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteConfigId (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'config/delete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteConfigValue (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'config/value/delete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteConfigMetaData (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'config/meta-data/delete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getCascadingDDLValueList (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'config/GetCascadingDDLValueList/GetCascadingDDLValueList', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveConfigMetaDataList (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'config/meta-data/saveList', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getAllConfigValueByConfigIDs (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'config/Load', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadConfigValueBasedonUserRole (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'config/LoadConfigValueBasedonUserRole', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getConfigValueListByConfigIdandMetaDataValue (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'config/GetConfigValueListByConfigIdandMetaDataValue', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getConfigMetaDataListByConfigID (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'config/GetConfigMetaDataListByConfigID', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getGroupSearchObject (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'group/search', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'group/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getGroupDetailsInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'group/initialize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewGroup (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'group/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'group/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openSelectedGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'group/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'group/delete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewRoleGroup (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'group/role-group/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveRoleGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'group/role-group/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openSelectedRoleGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'group/role-group/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteRoleGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'group/role-group/delete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getRolesbyModule (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'group/module/role/get', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAllRoleGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'group/LoadAllRoleGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveListORoleGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'group/SaveListORoleGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getUsersBasedOnConfiguredMetaData (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'group/GetUsersBasedOnConfiguredMetaData', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getMaasterConfigInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'MAsterConfig/Region/GetMaasterConfigInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewRegion (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'MAsterConfig/Region/CreateNewRegion', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveRegion (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Region/SaveRegion', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openRegion (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Region/OpenRegion', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewRegionSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'MAsterConfig/Region/CreateNewRegionSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchRegion (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Region/SearchRegion', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewLocation (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'MAsterConfig/Location/CreateNewLocation', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveLocation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Location/SaveLocation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openLocation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Location/OpenLocation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewLocationSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'MAsterConfig/Location/CreateNewLocationSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchLocation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Location/SearchLocation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    regionBasedLocation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Location/RegionBasedLocation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewProvince (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'MAsterConfig/Province/CreateNewProvince', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveProvince (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Province/SaveProvince', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openProvince (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Province/OpenProvince', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewProvinceSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'MAsterConfig/Province/CreateNewProvinceSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchProvince (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Province/SearchProvince', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    regionBasedProvince (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Province/RegionBasedProvince', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewIsland (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'MAsterConfig/Island/CreateNewIsland', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveIsland (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Island/SaveIsland', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openIsland (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Island/OpenIsland', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewIslandSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'MAsterConfig/Island/CreateNewIslandSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchIsland (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Island/SearchIsland', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    provincebasedIsland (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Island/ProvincebasedIsland', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewDepartment (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'MAsterConfig/Department/CreateNewDepartment', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveDepartment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Department/SaveDepartment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openDepartment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Department/OpenDepartment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewDepartmentSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'MAsterConfig/Department/CreateNewDepartmentSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchDepartment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Department/SearchDepartment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewTeam (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'MAsterConfig/Team/CreateNewTeam', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveTeam (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Team/SaveTeam', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openTeam (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Team/OpenTeam', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewTeamSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'MAsterConfig/Team/CreateNewTeamSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchTeam (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Team/SearchTeam', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    departmentBasedTeam (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/Team/DepartmentBasedTeam', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getMessageInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'MAsterConfig/entIEMessage/GetMessageInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewMessage (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'MAsterConfig/entIEMessage/CreateNewMessage', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveMessage (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/entIEMessage/SaveMessage', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openMessage (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/entIEMessage/OpenMessage', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewMessageSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'MAsterConfig/entIEMessage/CreateNewMessageSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchMessage (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/entIEMessage/SearchMessage', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAllMessageBasedOnModule (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/LoadAllMessageBasedOnModule', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadMessageBasedOnMessageNo (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'MAsterConfig/entIEMessage/LoadMessageBasedOnMessageNo', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getProcessLogSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'processlog/search', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchProcessLog (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'processlog/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  geResourceDetailsInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'resource/initialize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getResourceSearchObject (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'resource/search', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchResources (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'resource/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openSelectedResource (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'resource/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewResource (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'resource/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveResource (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'resource/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteResource (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'resource/delete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveResourceList (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'resource/SaveListResource', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadListOfResource (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'resource/LoadListOfResource', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getResourceNewSearchObject (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'resource/GetResourceNewSearchObject', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    loadNewResourceSearch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'resource/LoadNewResourceSearch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getRoleDetailsInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'role/initialize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getRoleSearchObject (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'role/search', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchRoles (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'role/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openSelectedRole (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'role/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewRole (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'role/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveRole (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'role/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadSelectedRoleResource (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'role/role-resource/load', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveRoleWithRoleResource (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'role/role-resource/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getScreensbyModule (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'role/module/screen-name/get', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteRole (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'role/delete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getUserInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'user/initialize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    openUser (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewUser (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'user/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveUser (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getUserSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'user/search', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchUser (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getUIRoles (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'user/role/get', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    getUsersByTeam (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/team/user/get', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getEmaillIDBySelectedUser (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/email-id/get', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadDefaultLandingPages (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/default-landing-pages/initialize', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewUserGroup (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'user/group/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveUserGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/group/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openUserGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/group/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteUserGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/group/delete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getLoginIntialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'user/getloginintialdata', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    getLoginIntialDataByApplicationCode (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/GetLoginIntialDataByApplicationCode', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    validateUserName (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/validateusername', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAllUserGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/UserRequest/LoadAllUserGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAllUserBranch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/User/LoadAllUserBranch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAllUserDepartmentTeam (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/User/LoadAllUserDepartmentTeam', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getCommonInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'user/GetCommonInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    loadAllUsersByBranchOrDepartmentOrTeamOrConfigGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/LoadAllUsersByBranchOrDepartmentOrTeamOrConfigGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    validateIfUserInBranchOrDepartmentOrTeam (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/ValidateIfUserInBranchOrDepartmentOrTeam', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadBranchDDLByUserLoginId (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/LoadBranchDDLByUserLoginId', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openUserbyLoginID (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/OpenUserbyLoginID', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getListofUsersbyListofUserSerialID (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/GetListofUsersbyListofUserSerialID', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getAllUsers (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/GetAllUsers', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openUserbyLoginIDWithoutChilds (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/OpenUserbyLoginIDWithoutChilds', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadListofUserBasedOnDepartment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'user/LoadListofUserBasedOnDepartment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getUserRequestInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'UserRequest/GetUserRequestInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    createNewUserRequest (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/CreateNewUserRequest', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getUserDetailsByEmployeeCode (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/GetUserDetailsByEmployeeCode', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveUserRequest (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/SaveUserRequest', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openUserRequest (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/OpenUserRequest', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewUserRequestSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'UserRequest/CreateNewUserRequestSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchUserRequest (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/SearchUserRequest', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewUserRequestAssignedOfficer (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/CreateNewUserRequestAssignedOfficer', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    userRequestSelfAssign (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/UserRequestSelfAssign', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    userRequestReAssign (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/UserRequestReAssign', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewUserRequestGroup (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'UserRequest/CreateNewUserRequestGroup', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveUserRequestGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/SaveUserRequestGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveUserRequestGroup1 (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/SaveUserRequestGroup1', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openUserRequestGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/OpenUserRequestGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteUserRequestGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/DeleteUserRequestGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewUserRequestNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/CreateNewUserRequestNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveUserRequestNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/SaveUserRequestNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewUserRequestTeamLink (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'UserRequest/CreateNewUserRequestTeamLink', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    openUserRequestTeamLink (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/OpenUserRequestTeamLink', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAllUserRequestGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/LoadAllUserRequestGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveListOfUserRequestGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/SaveListOfUserRequestGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAllUserRequestBranch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/LoadAllUserRequestBranch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveListOfUserRequestBranch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/SaveListOfUserRequestBranch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAllUserRequestDepartmentTeam (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/LoadAllUserRequestDepartmentTeam', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveListOfUserRequestDepartmentTeam (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/SaveListOfUserRequestDepartmentTeam', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadUserRequestDefaultPage (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/LoadUserRequestDefaultPage', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getUserRequestStatusFlow (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'UserRequest/GetUserRequestStatusFlow', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getWorkflowRuntimeInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'workflowRuntime/GetWorkflowRuntimeInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewWorkflowSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'workflowRuntime/CreateNewWorkflowSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchWorkflow (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'workflowRuntime/SearchWorkflow', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadWorkflowRuntimeDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'workflowRuntime/LoadWorkflowRuntimeDetails', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createnewworkflowtemplatesearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'workflowtemplate/createnewworkflowtemplatesearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchworkflowtemplate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'workflowtemplate/searchworkflowtemplate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  initializeworkflowtemplate (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'workflowtemplate/initializeworkflowtemplate', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveworkflowtemplate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'workflowtemplate/saveworkflowtemplate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadworkflowtemplateandallchildsbyworkflowtemplateid (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'workflowtemplate/loadworkflowtemplateandallchildsbyworkflowtemplateid', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteworkflowtemplatebyworkflowtemplateid (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'workflowtemplate/deleteworkflowtemplatebyworkflowtemplateid', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveworkflowset (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'workflowtemplate/workflowset/saveworkflowset', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteWorkflowTemplateElement (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'workflowtemplate/element/deleteWorkflowTemplateElement', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewHolidaySearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'workflowtemplate/holiday/CreateNewHolidaySearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchHoliday (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'workflowtemplate/holiday/SearchHoliday', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewHolidayList (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.adminPath + 'workflowtemplate/holiday/CreateNewHolidayList', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveHolidayList (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'workflowtemplate/holiday/SaveHolidayList', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openHolidayList (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'workflowtemplate/holiday/OpenHolidayList', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteHolidayList (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.adminPath + 'workflowtemplate/holiday/DeleteHolidayList', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
 
}
