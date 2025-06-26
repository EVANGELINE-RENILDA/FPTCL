import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { DataService } from '../../services/data/data.service';
import { ApiDataService } from "../../api-services/api-data.service";
import { AppSettingsService } from '../../services/app-settings/app-settings.service';

@Injectable({
  providedIn: "root",
})
export class AccountsApiService {

  constructor(private data: DataService, private apiData: ApiDataService, private appSettings: AppSettingsService) { }
   
  getCustomerInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/GetCustomerInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getcustomerSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/GetcustomerSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchCustomer (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/SearchCustomer', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewCustomer (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/CreateNewCustomer', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    savecustomer (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/Savecustomer', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openCustomer (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/OpenCustomer', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getCustomerDetailsForSearch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/GetCustomerDetailsForSearch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewAddress (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/CreateNewAddress', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveCustomerAddress (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/SaveCustomerAddress', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openCustomerAddress (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/OpenCustomerAddress', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadCustomerAttachmentFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/UploadCustomerAttachmentFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadCustomerAttachmentFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/DownloadCustomerAttachmentFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteCustomerRefNo (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/AutoCompleteCustomerRefNo', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteCustomerForNetoutVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/AutoCompleteCustomerForNetoutVoucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewNotes (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/CreateNewNotes', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveCustomerNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/SaveCustomerNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewCustomerContact (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/CreateNewCustomerContact', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveCustomerContactDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/SaveCustomerContactDetails', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openCustomerContact (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/OpenCustomerContact', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadCustomerDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/LoadCustomerDetails', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoSearchForCustomers (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/AutoSearchForCustomers', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getUsersFromSalesRepresentativeRole (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/GetUsersFromSalesRepresentativeRole', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewCustomerRegionAccess (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/CreateNewCustomerRegionAccess', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveCustomerRegionAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/SaveCustomerRegionAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openCustomerRegionAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/OpenCustomerRegionAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteCustomerRegionAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/DeleteCustomerRegionAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    compareGivenQtyWithItemMinandMaxQuantity (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/CompareGivenQtyWithItemMinandMaxQuantity', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    countryBasedOnProvince (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/CountryBasedOnProvince', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    provinceBasedOnIsland (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/ProvinceBasedOnIsland', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    islandBasedOnLocation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/IslandBasedOnLocation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    locationBasedonBranch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/LocationBasedonBranch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    updateActCustomerDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/UpdateActCustomerDetails', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getFundTransferNoteInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/fundtransfernote/initialize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    createNewFundTransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/fundtransfernote/new', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveFundTransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/fundtransfernote/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openFundTransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/fundtransfernote/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitFundTransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/fundtransfernote/notes/submit', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveFundTransferNoteNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/fundtransfernote/notes/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveFundTransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/fundtransfernote/notes/approve', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectFundTransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/fundtransfernote/notes/reject', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelFundTransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/fundtransfernote/notes/cancel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadFundTransferNoteAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/fundtransfernote/upload', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadFundTransferNoteAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/fundtransfernote/download', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteForFundTransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/fundtransfernote/auto-complete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getFundTransferNoteSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/fundtransfernote/search', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchFundTransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/fundtransfernote/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadLedgerBasedonType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/fundtransfernote/leger-load', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewFundTransferNoteNoteReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/fundtransfernote/view-receipt', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelShownFundTransferNoteforVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/fundtransfernote/cancel-voucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelShownJournalVoucherforVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/cancel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getJournalVoucherSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/search', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchJournalVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openJournalVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewJournalVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/CreateNew', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getJournalVoucherInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/initialize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    getLedgerType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/ledger-type/get', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveJournalVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createJournalVoucherDetail (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/detail/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    getAllLedgernatureandtype (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/all-ledger/get', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveJournalVoucherDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/save-detail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteRowJournalVoucherDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/delete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewAccountsNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/CreateNewAccountsNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveJournalVoucherNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/notes/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitJournalVoucherNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/notes/submit', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveJournalVoucherNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/approve', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectJournalVoucherNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/reject', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelJournalVoucherNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/notes/cancel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadJournalVoucherAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/uploadapplicationdocument', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadJournalVoucherAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/download', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewJournalVoucherReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/journalvoucher/view', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteAccountAttachmentFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/DeleteAccountAttachmentFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openAccountAttachementImage (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/OpenAccountAttachementImage', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getNetoutVoucherInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/netoutvoucher/initialize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    cancelShownNetoutVoucherforVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/CancelShownNetoutVoucherforVoucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openNetoutVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/OpenNetoutVoucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewNetoutVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/CreateNewNetoutVoucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveNetoutVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/SaveNetoutVoucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewNetoutVoucherDetail (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/CreateNewNetoutVoucherDetail', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    deleteNetoutVoucherDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/DeleteNetoutVoucherDetails', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewNetoutVoucherNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/CreateNewNetoutVoucherNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveNetoutVoucherNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/SaveNetoutVoucherNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitNetoutVoucherNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/SubmitNetoutVoucherNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveNetoutVoucherNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/ApproveNetoutVoucherNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectNetoutVoucherNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/RejectNetoutVoucherNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelNetoutVoucherNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/CancelNetoutVoucherNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadNetoutVoucherAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/UploadNetoutVoucherAttachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadNetoutVoucherAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/DownloadNetoutVoucherAttachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getNetoutVoucherSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/GetNetoutVoucherSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchNetoutVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/SearchNetoutVoucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadVoucherDetailForPurchase (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/LoadVoucherDetailForPurchase', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadVoucherDetailForSalesAndPurchase (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/LoadVoucherDetailForSalesAndPurchase', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadVoucherDetailForSales (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/LoadVoucherDetailForSales', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadVoucherDetailsForNetoutVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/LoadVoucherDetailsForNetoutVoucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAllVouchersByVoucherConfigAndVendor (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/LoadAllVouchersByVoucherConfigAndVendor', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAllVouchersByVoucherConfigAndCustomer (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/LoadAllVouchersByVoucherConfigAndCustomer', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    calculateNetoutVoucherSummary (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/CalculateNetoutVoucherSummary', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAllVouchersByVoucherConfigAndId (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/LoadAllVouchersByVoucherConfigAndId', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewNetOutVoucherReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/ViewNetOutVoucherReceipt', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getReverseJournalInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/initialize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    createNewReversingJournal (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/new', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveReversingJournal (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openReversingJournalVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getReversingJournalVoucherSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/newsearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchReversingJournalVouchers (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelShownReversingJournalforVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/cancel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createReversingJournalVoucherDetail (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/detail/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    deleteRowReversingJournalDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/delete-row', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewReversingJournalNotes (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/notes/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveReversingJournalNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/notes/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitReversingJournalNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/notes/submit', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveReversingJournalNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/notes/approve', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectReversingJournalNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/notes/reject', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelReversingJournalNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/notes/cancel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadReversingJournalAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/upload', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadReversingJournalAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/download', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewReversingJournalVoucherReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/reversingjournal/view', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getAdvancePaymentNotesInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'purchase/purchase/initialize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    createNewAdvancePaymentNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/new', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveAdvancePaymentNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getNewAdvancePaymentNoteSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'purchase/purchase/search/get', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchAdvancePaymentNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openAdvancePaymentNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewAdvancePaymentNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/detail/new', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewAdvancePaymentNoteDetailWpo (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'purchase/purchase/detail-wpo/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveNotesForAdvancePaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/notes/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitAdvancePaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/notes/submit', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelAdvancePaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/notes/cancel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectAdvancePaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/notes/reject', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveAdvancePaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/notes/approve', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    payAdvancePaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/pay', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    sendAdvancePaymentNoteEmailWithAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/email-attachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadAdvancePaymentNotesAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/upload', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadAdvancePaymentNotesAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/download', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteGetAdvancePaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/auto-complete/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    calculateTotalPaidAmount (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/paid-amount/calculation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    setAdvancePaymentNoteTotalAmountAndTaxAmountByPurchaseInvoice (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/tax-amount/set', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    calculateAdvancePaymentNoteBalanceAmountOnReceivedAmountChange (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/balance/calculation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelShownAdvancePaymentNoteforVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/voucher/cancel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteAdvancePaymentNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/purchase/Note-Item/delete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewAdvancePurPaymentNoteReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/Advpaymentnote/view', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getCreditNoteInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/creditnote/initialize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    createNewCreditNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/new', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getItemCNFromSI (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/item-cnf/get', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveCreditNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitCreditNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/submit', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveCreditNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/approve', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectCreditNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/reject', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelCreditNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/cancel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getCreditNoteSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/creditnote/search', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchCreditNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openCreditNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewCreditNoteNotes (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'accounts/creditnote/notes/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveCreditNoteNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/notes/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadCreditNoteAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/upload', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadCreditNoteAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/download', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteForCreditNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/auto-complete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    creditNoteReportingCurrencyValuePosting (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/reporting-currency-value', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteCreditNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/item/delete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    calculateCreditNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/item/calculate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelVoucherCreditNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/cancel-voucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewCreditNoteReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'accounts/creditnote/view-receipt', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInitializeCustomerWisedSalesReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'GetInitializeCustomerWisedSalesReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateCustomerWisedSalesSummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'GenerateCustomerWisedSalesSummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateCustomerWisedSalesDetailsReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'GenerateCustomerWisedSalesDetailsReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getCustomerwisedsummaryReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'GetCustomerwisedsummaryReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFCustomerwisedsummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'GeneratePDFCustomerwisedsummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getCustomerwiseddetailsReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'GetCustomerwiseddetailsReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFCustomerwiseddetailsReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'GeneratePDFCustomerwiseddetailsReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getDebitNoteInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'purchase/debitnote/initialize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    createNewDebitNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/new', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveDebitNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitDebitNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/submit', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openDebitNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveNotesForDebitNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/notes/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectDebitNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/reject', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelDebitNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/cancel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveDebitNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/approve', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewDebitNoteReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/view-receipt', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadDebitNoteAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/upload', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadDebitNoteAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/download', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteForDebitNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/auto-complete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getDebitNoteSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'purchase/debitnote/search', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchDebitNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    debitNoteItemCalculation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/item/calculation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getItemFromDebitNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/item/get', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    reportingCurrencyValuePostingForDebitNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/ReportingCurrency/Posting', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteDebitNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/item/delete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelVoucherDebitNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/cancel-voucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getDebitAccountName (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/debitnote/account-name/get', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    authenticateUserbyCompanyandBranch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/AuthenticateUserbyCompanyandBranch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    changeTokenForSelectedBranch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/ChangeTokenForSelectedBranch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    checkLineItemBasedonDocumentDate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CheckLineItemBasedonDocumentDate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteActAttachmentFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/DeleteActAttachmentFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    sendEmailforVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SendEmailforVoucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getGainLossForPointZeroOneDifference (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/GetGainLossForPointZeroOneDifference', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteForAllVouchers (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/AutoCompleteForAllVouchers', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAttachmentsByteArray (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/LoadAttachmentsByteArray', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getCompanyInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/Company/GetCompanyInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewCompany (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/Company/CreateNewCompany', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveActCompany (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Company/SaveActCompany', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openActCompany (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Company/OpenActCompany', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewActCompanySearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/Company/CreateNewActCompanySearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchActCompany (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Company/SearchActCompany', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getCurrencyDetailsByCurrency (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Company/GetCurrencyDetailsByCurrency', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewCompanyBranch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CompanyBranch/CreateNewCompanyBranch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveActCompanyBranch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CompanyBranch/SaveActCompanyBranch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openActCompanyBranch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CompanyBranch/OpenActCompanyBranch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewCompanyFiscalYear (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CompanyFiscalYear/CreateNewCompanyFiscalYear', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveActCompanyFiscalYear (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CompanyFiscalYear/SaveActCompanyFiscalYear', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openActCompanyFiscalYear (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CompanyFiscalYear/OpenActCompanyFiscalYear', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveActCompanyFiscalYear (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CompanyFiscalYear/ApproveActCompanyFiscalYear', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    reopenActCompanyFiscalYear (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CompanyFiscalYear/ReopenActCompanyFiscalYear', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    closeActCompanyFiscalYear (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CompanyFiscalYear/CloseActCompanyFiscalYear', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewCompanyFiscalTerm (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CompanyFiscalTerm/CreateNewCompanyFiscalTerm', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveActCompanyFiscalTerm (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CompanyFiscalTerm/SaveActCompanyFiscalTerm', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openActCompanyFiscalTerm (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CompanyFiscalTerm/OpenActCompanyFiscalTerm', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    closeActCompanyFiscalTerm (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CompanyFiscalTerm/CloseActCompanyFiscalTerm', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    reopenCompanyFiscalTerm (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CompanyFiscalTerm/ReopenCompanyFiscalTerm', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getCompanyBranchBankInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CompanyBranchBank/GetCompanyBranchBankInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewCompanyBranchBank (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CompanyBranchBank/CreateNewCompanyBranchBank', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getListofBankBasedonBranch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CompanyBranchBank/GetListofBankBasedonBranch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveActCompanyBranchBank (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CompanyBranchBank/SaveActCompanyBranchBank', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openActCompanyBranchBank (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CompanyBranchBank/OpenActCompanyBranchBank', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewActCompanyBranchBankSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CompanyBranchBank/CreateNewActCompanyBranchBankSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchActCompanyBranchBank (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CompanyBranchBank/SearchActCompanyBranchBank', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getTaxInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/GetTaxInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewTaxSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CreateNewTaxSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchTax (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SearchTax', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewTax (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CreateNewTax', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveTax (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SaveTax', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openTaxDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/OpenTaxDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveAccountsTaxNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SaveAccountsTaxNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewTaxNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CreateNewTaxNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadTaxAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/UploadTaxAttachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadTaxAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/DownloadTaxAttachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getCompanyVoucherAccountInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/GetCompanyVoucherAccountInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewCompanyVoucherAccountDetail (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CreateNewCompanyVoucherAccountDetail', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveCompanyVoucherAccountDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SaveCompanyVoucherAccountDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewCompanyVoucherAccountSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CreateNewCompanyVoucherAccountSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchVoucherAccountDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SearchVoucherAccountDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openCompanyVoucherAccountDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/OpenCompanyVoucherAccountDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getVoucherTypeByVoucherCategory (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/GetVoucherTypeByVoucherCategory', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getEntryTypebyEffectType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/GetEntryTypebyEffectType', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getExchangeRateInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/GetExchangeRateInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getExchangeRateSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/GetExchangeRateSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchExchangeRate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SearchExchangeRate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openExchangeRate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/OpenExchangeRate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewExchangeRate (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CreateNewExchangeRate', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveExchangeRate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SaveExchangeRate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveNotesForExchangeRate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SaveNotesForExchangeRate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitExchangeRate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SubmitExchangeRate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelExchangeRate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CancelExchangeRate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveExchangeRate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/ApproveExchangeRate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectExchangeRate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/RejectExchangeRate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    documentDateConversioDate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/DocumentDateConversioDate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getActExchangeRates (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/GetActExchangeRates', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  userBasedOnCompanyAndBranchId (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/User/UserBasedOnCompanyAndBranchId', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    groupInitialData (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/GroupInitialData', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getAllGroupsByNature (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/GetAllGroupsByNature', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewAccountGroupSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CreateNewAccountGroupSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    accountsGroupSearch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/AccountsGroupSearch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewAccountGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CreateNewAccountGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveAccountGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SaveAccountGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openAccountsGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/OpenAccountsGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteSelectedAccountsGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/DeleteSelectedAccountsGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getAllGroupsAndSubGroup (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/GetAllGroupsAndSubGroup', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    getAllGroupsAndSubGroupByRegion (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/GetAllGroupsAndSubGroupByRegion', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteRowInActGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/DeleteRowInActGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadSubGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/LoadSubGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadSubLedger (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/LoadSubLedger', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteSelectedSubGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/DeleteSelectedSubGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewLedger (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/CreateNewLedger', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getLedgerTypeBasedOnNtureofGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/GetLedgerTypeBasedOnNtureofGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveActLedger (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/SaveActLedger', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadLedger (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/LoadLedger', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openLedger (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/OpenLedger', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openLedgerForExportExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/OpenLedgerForExportExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getLedgerforSearch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/GetLedgerforSearch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getAllBranchesByCompanyId (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/GetAllBranchesByCompanyId', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteSelectedAccountsLedger (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/DeleteSelectedAccountsLedger', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getLedgerInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/Ledger/GetLedgerInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewAccountLedgerSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/Ledger/CreateNewAccountLedgerSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    ledgerSearch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/LedgerSearch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getAllLedger (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/Ledger/GetAllLedger', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    getAllLedgerByRegion (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/GetAllLedgerByRegion', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getLastLedgerTranctionDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/GetLastLedgerTranctionDetails', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getLedgerTranctionHistoryBasedOnvalues (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/GetLedgerTranctionHistoryBasedOnvalues', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getLedgerTranctionDetailsBasedOnAttribute (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/GetLedgerTranctionDetailsBasedOnAttribute', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getLedgerTranctionDetailsAnnalStatement (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/GetLedgerTranctionDetailsAnnalStatement', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteSelectedRowInActLedger (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/DeleteSelectedRowInActLedger', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    changeLedgerEntryByOpeningBalance (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/ChangeLedgerEntryByOpeningBalance', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getLedgerTransactionInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/Ledger/GetLedgerTransactionInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getCompanyCurrencyDetails (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/Ledger/GetCompanyCurrencyDetails', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewLedgerTransactionSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/Ledger/CreateNewLedgerTransactionSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchLedgerTransaction (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/SearchLedgerTransaction', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewLedgerBranchAccess (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/Ledger/CreateNewLedgerBranchAccess', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveLedgerBranchAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/SaveLedgerBranchAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openLedgerBranchAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/OpenLedgerBranchAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteLedgerBranchAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/DeleteLedgerBranchAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getLedgerLockInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/GetLedgerLockInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewLedgerLock (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/Ledger/CreateNewLedgerLock', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveLedgerLock (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/SaveLedgerLock', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openLedgerLock (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/OpenLedgerLock', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteLedgerLock (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/DeleteLedgerLock', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitLedgerLock (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/SubmitLedgerLock', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveLedgerLock (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/ApproveLedgerLock', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectLedgerLock (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/RejectLedgerLock', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    searchLedgerEntry (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SearchLedgerEntry', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getVoucherNameBasedonBranch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Common/GetVoucherNameBasedonBranch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  loadAllCustomerByCompanyId (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/Common/LoadAllCustomerByCompanyId', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  loadAllItemByCompanyId (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/Common/LoadAllItemByCompanyId', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    loadAllLedgerByLedgerName (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Common/LoadAllLedgerByLedgerName', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAllLedgerByLedgerCode (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Common/LoadAllLedgerByLedgerCode', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAllLedgerByLedgerCodeandType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Common/LoadAllLedgerByLedgerCodeandType', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAllLedgerListByLedgerCodeandType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Common/LoadAllLedgerListByLedgerCodeandType', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  loadAllLedgerByCompanyId (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/Common/LoadAllLedgerByCompanyId', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  loadAllVendorByCompanyId (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/Common/LoadAllVendorByCompanyId', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getVoucherConfigInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/GetVoucherConfigInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewVoucherConfigSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CreateNewVoucherConfigSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchVoucherConfig (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SearchVoucherConfig', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getVoucherSubTypeByVoucherType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/GetVoucherSubTypeByVoucherType', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getVoucherType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/GetVoucherType', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getPostingVoucherDDL (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/GetPostingVoucherDDL', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getVoucherNatureByEntryType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/GetVoucherNatureByEntryType', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewVoucherConfig (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CreateNewVoucherConfig', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    openVoucherConfig (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/OpenVoucherConfig', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openVoucherConfignotchilds (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/OpenVoucherConfignotchilds', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveVoucherConfig (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SaveVoucherConfig', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveVoucherNumber (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SaveVoucherNumber', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewVoucherNumberPrefix (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CreateNewVoucherNumberPrefix', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveVoucherNumberPrefix (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SaveVoucherNumberPrefix', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openVoucherNumberPrefix (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/OpenVoucherNumberPrefix', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewVoucherNumberSuffix (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CreateNewVoucherNumberSuffix', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveVoucherNumberSuffixDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SaveVoucherNumberSuffixDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openVoucherNumberSuffix (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/OpenVoucherNumberSuffix', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewVoucherBranchAccess (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CreateNewVoucherBranchAccess', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveVoucherBranchAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SaveVoucherBranchAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitVoucherBranchAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SubmitVoucherBranchAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveVoucherBranchAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/ApproveVoucherBranchAccesse', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectVoucherBranchAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/RejectVoucherBranchAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getVoucherAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/GetVoucherAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getVoucherNameByVoucherType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/GetVoucherNameByVoucherType', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openVoucherBranchAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/OpenVoucherBranchAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewVoucherRegionAccess (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CreateNewVoucherRegionAccess', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveVoucherRegionAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SaveVoucherRegionAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openVoucherRegionAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/OpenVoucherRegionAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteVoucherRegionAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/DeleteVoucherRegionAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getIntGroupInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/GetIntGroupInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewIntGroupSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CreateNewIntGroupSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchIntGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SearchIntGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewIntGroup (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CreateNewIntGroup', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveIntGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SaveIntGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openIntGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/OpenIntGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteIntGroup (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/DeleteIntGroup', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getIntLedgerInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/GetIntLedgerInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewIntLedgerSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CreateNewIntLedgerSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchIntLedger (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SearchIntLedger', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewIntLedger (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/CreateNewIntLedger', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveIntLedger (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SaveIntLedger', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openIntLedger (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/OpenIntLedger', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    searchIntLedgerEntry (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/SearchIntLedgerEntry', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteIntLedger (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/DeleteIntLedger', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    closeFiscalYearForIntegration (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/CloseFiscalYearForIntegration', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewIntLedgerTransactionSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Finance/Ledger/CreateNewIntLedgerTransactionSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchIntLedgerTransaction (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Finance/Ledger/SearchIntLedgerTransaction', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteInvAttachmentFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/DeleteInvAttachmentFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewInvProductionNoteReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/ViewInvProductionNoteReceipt', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getProductionNoteIntilizseData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetProductionNoteIntilizseData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getProductionNoteSearchObject (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetProductionNoteSearchObject', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchProductionNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SearchProductionNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewProdcutionNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateNewProdcutionNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  addItemForProductionNote (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/AddItemForProductionNote', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    calculateProductionNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CalculateProductionNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getUnitPriceForItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetUnitPriceForItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openProductionNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/OpenProductionNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveProductionNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SaveProductionNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitProductionNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SubmitProductionNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveProductionNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/ApproveProductionNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelProductionNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CancelProductionNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectProductionNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/RejectProductionNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CancelVoucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteProductionNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/DeleteProductionNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveProductionNoteNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SaveProductionNoteNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getItemBasedValues (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetItemBasedValues', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadProductioNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/UploadProductioNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getProductionNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetProductionNoteItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getStockTransferNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetStockTransferNoteItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getStockTransferNoteInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetStockTransferNoteInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getNewStockTransferNoteSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetNewStockTransferNoteSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchStockTransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SearchStockTransferNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelVoucherForStocktransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CancelVoucherForStocktransferNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewStockTransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateNewStockTransferNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getItemBasedValuesForStockTransferNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetItemBasedValuesForStockTransferNoteItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    calculateStockTransferNoteitem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CalculateStockTransferNoteitem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveStockTransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SaveStockTransferNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveStockTransferNoteNotess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SaveStockTransferNoteNotess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openStockTransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/OpenStockTransferNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitStockTransferNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SubmitStockTransferNoteDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveStockTransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/ApproveStockTransferNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    packStockTransferNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/PackStockTransferNoteDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    dispatchStockTransferNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/DispatchStockTransferNoteDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectStockTransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/RejectStockTransferNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelStockTransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CancelStockTransferNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewStockTransferNoteItem (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateNewStockTransferNoteItem', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveStockTransferNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SaveStockTransferNoteItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadStockTraansferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/UploadStockTraansferNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewInvStockTransferNoteReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/ViewInvStockTransferNoteReceipt', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getStockTransferNoteAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetStockTransferNoteAttachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewInvNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateNewInvNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteStockTrasferNoteReferenceNo (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/AutoCompleteStockTrasferNoteReferenceNo', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openStockTranferNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/OpenStockTranferNoteItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteStockTranferNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/DeleteStockTranferNoteItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteGetStockRequestItemForStockTransferNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/AutoCompleteGetStockRequestItemForStockTransferNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getTotalPriceValueForStockTransferNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetTotalPriceValueForStockTransferNoteItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getGoodsDeliveryNoteInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/initialize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getNewGoodsDeliveryNoteSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/search', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchGoodsDeliveryNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openGoodsDeliveryNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewGoodsDeliveryNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/new', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getGDNSalesOrderItemsByOrderId (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/saleorder/get', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    goodsDeliveryNoteReportingCurrencyValuePosting (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/reporting-currency-value', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    calculateGoodsDeliveryNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/calculate-item', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewGoodsDeliveryNoteItem (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/item/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    setItemDetailsForGoodsDeliveryNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/item-details/set', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteGoodsDeliveryNoteAttachmentFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/DeleteGoodsDeliveryNoteAttachmentFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteGoodsDeliveryNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/item/delete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveGoodsDeliveryNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadGoodsDeliveryNoteAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/upload', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadGoodsDeliveryNoteAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/download', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewGoodsDeliveryNoteNotes (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/notes/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveGoodsDeliveryNoteNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/notes/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getSalesOrderItemsByOrderIdAndSetAsGdnItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/gdn-item/set', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitGoodsDeliveryNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/submit', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveGoodsDeliveryNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/approve', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectGoodsDeliveryNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/reject', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelGoodsDeliveryNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/cancel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoSearchForGDNNO (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/auto-search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelShownGoodsDeliveryNoteforVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsdeliverynote/cancel-voucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelShownGoodsReceivedNoteforVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CancelShownGoodsReceivedNoteforVoucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getGoodsReceivedNoteInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/goodsreceivednote/initilaize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getNewGoodsReceivedNoteSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetNewGoodsReceivedNoteSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchGoodsReceivedNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SearchGoodsReceivedNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewGoodsReceivedNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateNewGoodsReceivedNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewGoodsReceivedNoteItem (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateNewGoodsReceivedNoteItem', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    setItemDetailsForgoodsReceiveNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SetItemDetailsForgoodsReceiveNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    reportingCurrencyValuePostingOnGoodsReceivedNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/ReportingCurrencyValuePostingOnGoodsReceivedNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    goodsReceivedNoteItemCalculation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GoodsReceivedNoteItemCalculation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getPurchaseOrderItemDetailByPurchaseOrderIdForGoodsReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetPurchaseOrderItemDetailByPurchaseOrderIdForGoodsReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteGoodsReceivedNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/DeleteGoodsReceivedNoteItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveGoodsReceivedNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SaveGoodsReceivedNoteDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadGoodsReceivedNoteAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/UploadGoodsReceivedNoteAttachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadGoodsReceivedNoteAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/DownloadGoodsReceivedNoteAttachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewGoodsReceivedNoteNotes (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateNewGoodsReceivedNoteNotes', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveGoodsReceivedNoteNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SaveGoodsReceivedNoteNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitGoodsReceivedNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SubmitGoodsReceivedNoteDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveGoodsReceivedNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/ApproveGoodsReceivedNoteDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectGoodsReceivedNoteNotesDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/RejectGoodsReceivedNoteNotesDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelGoodsReceivedNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CancelGoodsReceivedNoteDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openGoodsRecievedNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/OpenGoodsRecievedNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoSearchForGRNNO (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/AutoSearchForGRNNO', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewGRNStockIn (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateNewGRNStockIn', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveGRNStockIn (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SaveGRNStockIn', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getPurchaseOrderItemByPurchaseOrderIdForGRNStockIn (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetPurchaseOrderItemByPurchaseOrderIdForGRNStockIn', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewGRNStockInItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateNewGRNStockInItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveSelectedGRNStockInItemDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SaveSelectedGRNStockInItemDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openStockInAndStockInItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/OpenStockInAndStockInItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteinventoryAttachmentFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/DeleteinventoryAttachmentFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openInventoryAttachementImage (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/OpenInventoryAttachementImage', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInvCategoryInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetInvCategoryInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getInvCategoryActiveInActiveList (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetInvCategoryActiveInActiveList', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewInvCategory (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateNewInvCategory', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveInvCategoryDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SaveInvCategoryDetails', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInvCategorySearchObject (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetInvCategorySearchObject', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    invCategorySearchDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/InvCategorySearchDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openSelectedCategoryDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/OpenSelectedCategoryDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteInvCategory (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/DeleteInvCategory', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInvItemTypeInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/Inventory/GetInvItemTypeInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getItemTypeActiveInActiveList (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/Inventory/GetItemTypeActiveInActiveList', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    loadItemType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/Inventory/LoadItemType', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewInvItemType (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/Inventory/CreateNewInvItemType', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveInvItemType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/Inventory/SaveInvItemType', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openInvItemType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/Inventory/OpenInvItemType', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteInvItemType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/Inventory/DeleteInvItemType', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getItemType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/Inventory/GetItemType', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getItemTypeSearchObject (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/Inventory/GetItemTypeSearchObject', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchItemType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/Inventory/SearchItemType', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createItemSubType (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateItemSubType', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveItemSubType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SaveItemSubType', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getItemSubTypeListByTypeId (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetItemSubTypeListByTypeId', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getItemSubtype (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetItemSubtype', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getselectedItemSubType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetselectedItemSubType', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteSubType (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/DeleteSubType', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewItemDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateNewItemDetails', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getItemDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetItemDetails', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getItemDetailsForSearch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetItemDetailsForSearch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    searchItemsForReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SearchItemsForReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getitemInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetitemInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    getTaxCodeByIsTaxableItemFlag (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetTaxCodeByIsTaxableItemFlag', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveItemDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SaveItemDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewItemNotes (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateNewItemNotes', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveItemInNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SaveItemInNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getBranchNamebyCompanyId (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetBranchNamebyCompanyId', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    uploadInvItemAttachmentFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/UploadInvItemAttachmentFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadInvItemFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/DownloadInvItemFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getPriceDetailsAndStockDetailForAnItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetPriceDetailsAndStockDetailForAnItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    searchItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SearchItems', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getitemSearchObject (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetitemSearchObject', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    gettypeByGroupValue (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GettypeByGroupValue', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getsubtypeBytype (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetsubtypeBytype', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createSearchItemsForReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateSearchItemsForReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    autoSearchForItemsFromVendor (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/AutoSearchForItemsFromVendor', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewItemRegionAccess (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateNewItemRegionAccess', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveItemRegionAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SaveItemRegionAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openItemRegionAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/OpenItemRegionAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteItemRegionAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/DeleteItemRegionAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getStockWrittenOffNoteInitialData (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetStockWrittenOffNoteInitialData', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getNewStockWrittenOffNoteSearch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetNewStockWrittenOffNoteSearch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    searchStockWrittenOffNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SearchStockWrittenOffNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelVoucherForStockWrittenOffNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CancelVoucherForStockWrittenOffNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewStockWrittenOffNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateNewStockWrittenOffNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getItemBasedValuesForStockWrittenOffItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetItemBasedValuesForStockWrittenOffItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    calculateStockWrittenOffitem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CalculateStockWrittenOffitem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveStockWrittenOffNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SaveStockWrittenOffNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteStockWrittenOffNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/DeleteStockWrittenOffNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveStockWrittenOffNoteNotess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SaveStockWrittenOffNoteNotess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openStockWrittenOffNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/OpenStockWrittenOffNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitStockWrittenOffNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SubmitStockWrittenOffNoteDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveStockWrittenOffNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/ApproveStockWrittenOffNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    packStockTransferWrittenOffDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/PackStockTransferWrittenOffDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    dispatchStockWrittenOffNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/DispatchStockWrittenOffNoteDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectStockWrittenOffNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/RejectStockWrittenOffNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelStockWrittenOffNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CancelStockWrittenOffNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewStockWrittenOffNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateNewStockWrittenOffNoteItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveStockWrittenOffNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/SaveStockWrittenOffNoteItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadStockWrittenOffNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/UploadStockWrittenOffNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewInvStockWrittenOffReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/ViewInvStockWrittenOffReceipt', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getStockWrittenOffAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetStockWrittenOffAttachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewInvNotesForWrittenOff (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/CreateNewInvNotesForWrittenOff', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteWrittenOffNoteReferenceNo (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/AutoCompleteWrittenOffNoteReferenceNo', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openStockWrittenOffNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/OpenStockWrittenOffNoteItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteStockWrittenOffItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/DeleteStockWrittenOffItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getTotalPriceValueForWrittenOffNoteItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'ITGAccounts/GetTotalPriceValueForWrittenOffNoteItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getStockRegisterReportInitialdata (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetStockRegisterReportInitialdata', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getAllItemsByCatTypeSubTypeRegion (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetAllItemsByCatTypeSubTypeRegion', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getVocuherStockItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetVocuherStockItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getStockRegisterReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetStockRegisterReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateItemsDetailsReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateItemsDetailsReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFStockRegisterReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFStockRegisterReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getStockRegisterReportforallItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetStockRegisterReportforallItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateStockRegisterReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateStockRegisterReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFStockRegisterDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFStockRegisterDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getStockRegisterDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetStockRegisterDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getPaymentNoteInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/initialize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    createNewPaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/new', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    savePaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getNewPaymentNoteSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/search', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchPaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openPaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitPaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/notes/submit', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approvePaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/notes/approve', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectPaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/notes/reject', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelPaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/notes/cancel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deletePaymentNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/detail/delete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    payPaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/pay', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadPaymentNoteAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/upload', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadPaymentNoteAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/download', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    setPaymentNoteTotalAmountAndTaxAmountByPurchaseInvoice (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/tax-amount/set', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    calculateBalanceAmountForPaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/balance/calculation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewPaymentNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/detail/new', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveNotesForPaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/notes/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    sendPaymentNoteEmailWithAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/email-attachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteGetPaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/auto-complete/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    totalPriceCalculation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/price/calculation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewPurPaymentNoteReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/view', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelPaymentNoteforVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'purchase/paymentnote/voucher/cancel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deletePurAttachmentFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/DeletePurAttachmentFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelPurchaseQuotationforVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/CancelPurchaseQuotationforVoucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewPurchaseQuotationReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/ViewPurchaseQuotationReceipt', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getQuotationInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/initialize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewPurchaseQuotationItem (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/CreateNewPurchaseQuotationItem', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    createNewPurchaseQuotation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/CreateNewPurchaseQuotation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    savepurchaseQuotation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SavepurchaseQuotation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    purchaseQuotationItemCalculation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/PurchaseQuotationItemCalculation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    purchaseQuotationReportingCurrencyValuePosting (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/PurchaseQuotationReportingCurrencyValuePosting', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    savePurchaseQuotationDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SavePurchaseQuotationDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openPurchaseQuotation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/openPurchaseQuotation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewPurchaseQuotationNotes (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/CreateNewPurchaseQuotationNotes', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    savePurchaseQuotationNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SavePurchaseQuotationNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelPurchaseQuotation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/CancelPurchaseQuotation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitPurchaseQuotation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SubmitPurchaseQuotation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectPurchaseQuotation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/RejectPurchaseQuotation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approvedPurchaseQuotation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/ApprovedPurchaseQuotation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openPurchaseQuotationDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/OpenPurchaseQuotationDetails', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    savePurchaseQuotationItemList (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SavePurchaseQuotationItemList', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getTotalPriceValueForPurchaseQuotationItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/GetTotalPriceValueForPurchaseQuotationItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    savePurchaseQuotationItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SavePurchaseQuotationItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deletePurchaseQuotationItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/DeletePurchaseQuotationItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openPurchaseQuotationItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/openPurchaseQuotationItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getNewPurchaseQuotationSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/GetNewPurchaseQuotationSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchPurchaseQuotation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchasequotation/search', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadPurchaseQuotationAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchasequotation/upload', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadPurchaseQuotationAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchasequotation/download', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    setItemDetailsForPurchaseQuotation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchasequotation/SetItemDetailsForPurchaseQuotation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelShownPurchaseOrderforVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/voucher/cancel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    savePurchaseOrderVoucherStatus (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/voucherstatus/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewPurchaseOrder (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/new', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    savePurchaseOrder (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    savePurchaseOrderNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/Notes/save', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    purchaseOrderItemCalculation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/item/calculation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openPurchaseOrder (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewPurchaseOrderNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/notes/new', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadPurchaseOrderAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/upload', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getPurchaseOrderAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/attachment/get', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getItemsByPurchaseQuotationIdForPurchaseOrder (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/item/get', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    setItemDetailsForPurchaseOrder (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/item/SetItemDetailsForPurchaseOrder', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewPurchaseOrderItem (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/item/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    purchaseOrderReportingCurrencyValuePosting (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/report-currency/posting', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    documentCurrencyCalcutionOnPurchaseOrderItems (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/documentcurrency/calculation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitPurchaseOrder (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/notes/submit', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approvePurchaseOrder (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/notes/approve', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelPurchaseOrder (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/notes/cancel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectPurchaseOrder (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/notes/reject', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deletePurchaseOrderItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/item/delete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    calculateLedgerAndNetAmountForPurchaseOrderItems (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/ledgernetamount/calculate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openPurchaseOrderItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/item/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getNewPurchaseOrderSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/search/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    getPurchaseRequestItemDetailsByPurchaseRequestId (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/item/getpurchaseRequest', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getPurchaseOrderDetails (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/GetPurchaseOrderDetails', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchPurchaseOrder (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SearchPurchaseOrder', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    searchPurchaseOrderVoucherStatusHistory (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SearchPurchaseOrderVoucherStatusHistory', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompletePQReferenceNo (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/AutoCompletePQReferenceNo', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompletePurchaseOrder (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/AutoCompletePurchaseOrder', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewPurchaseOrderReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/ViewPurchaseOrderReceipt', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getReportFileOfPurchaseOrder (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/GetReportFileOfPurchaseOrder', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getPdfContentFromFilePathForPurchaseOrder (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/GetPdfContentFromFilePathForPurchaseOrder', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompletePurchaseOrderReferenceNoDocumentDate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/AutoCompletePurchaseOrderReferenceNoDocumentDate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    savePurPurchaseOrderVoucherStatus (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseorder/SavePurPurchaseOrderVoucherStatus', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    savePurchaseInvoiceNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SavePurchaseInvoiceNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getPurchaseInvoiceInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/GetPurchaseInvoiceInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getNewPurchaseInvoiceSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/GetNewPurchaseInvoiceSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchPurchaseInvoice (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SearchPurchaseInvoice', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewPurchaseInvoice (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/CreateNewPurchaseInvoice', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewPaymentNoteNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/CreateNewPaymentNoteNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewNotesForPaymentNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/CreateNewNotesForPaymentNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    savePurchaseInvoiceDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SavePurchaseInvoiceDetails', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openPurchaseInvoice (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/OpenPurchaseInvoice', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deletePurchaseAttachmentFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/DeletePurchaseAttachmentFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openPurchaseDocumentImage (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchase/viewImage', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitPurchaseInvoiceDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SubmitPurchaseInvoiceDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approvePurchaseInvoiceDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/ApprovePurchaseInvoiceDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectPurchaseInvoiceDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/RejectPurchaseInvoiceDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelPurchaseInvoiceDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/CancelPurchaseInvoiceDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    paidPurchaseInvoiceDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/details/paid', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    purchaseInvoicedocumentdateconversionrate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/documentdate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadPurchaseInvoiceAttachmentFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/upload', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadPurchaseInvoiceAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/Purchaseinvoice/DownloadPurchaseInvoiceAttachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadPurchaseInvoiceFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/download', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelPurchaseInvoiceVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/voucher/cancel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewPurchaseInvoiceItem (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/item/new', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    openPurchaseInvoiceItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/item/open', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deletePurchaseInvoiceItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/item/delete', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getTotalPriceValueForPurchaseInvoiceItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/total-price/get', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    purchaseInvoiceItemCalculation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/item/calculation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    documentCurrencyCalcutionOnPurchaseInvoiceItems (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/document-currency/calculation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    reportingCurrencyValuePostingOnPurchaseInvoice (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/report-currency/posting', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getPurchaseOrderItemDetailByPurchaseOrderIdForPurchaseInvoice (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/order-item-details/get', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    sendPurchaseInvoiceEmailWithAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/email-attachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    setItemDetailsForPurchaseInvoice (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/item-details/set', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getItemBasedonGRN (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/item/get-grn', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompletePurchaseInvoiceBasedonDocumentDate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/autocomplete/documentdate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompletePurchaseInvoiceBasedonDocumentDateAndBranchId (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/purchaseinvoice/auto-complete/documentdate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    savePurchaseInvoiceItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SavePurchaseInvoiceItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewPurchaseInvoiceReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/ViewPurchaseInvoiceReceipt', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getAllVendorEmailIds (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/GetAllVendorEmailIds', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getPaymentNoteDetailsByPurchaseInvoiceId (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/GetPaymentNoteDetailsByPurchaseInvoiceId', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getVendorInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/GetVendorInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getvendorSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/GetvendorSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchvendor (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/Searchvendor', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewVendor (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/CreateNewVendor', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveVendor (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SaveVendor', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openVendor (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/OpenVendor', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getVendorForSearch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/GetVendorForSearch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadVendor (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/LoadVendor', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewVendorContact (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/CreateNewVendorContact', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveVendorContact (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SaveVendorContact', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openVendorContact (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/OpenVendorContact', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewVendorAddress (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/CreateNewVendorAddress', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveVendorAddress (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SaveVendorAddress', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openVendorAddress (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/OpenVendorAddress', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewVendorBankDetail (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/CreateNewVendorBankDetail', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveVendorBankDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SaveVendorBankDetails', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openVendorBankDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/OpenVendorBankDetails', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewVendorNotes (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/CreateNewVendorNotes', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveVendorNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SaveVendorNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadVendorAttachmentFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/UploadVendorAttachmentFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    vendorDownloadFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/VendorDownloadFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getVendorAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/GetVendorAttachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewVendorItems (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/CreateNewVendorItems', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveInvIteminVendor (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SaveInvIteminVendor', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getVendorAllDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/GetVendorAllDetails', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openSelectedItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/OpenSelectedItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoSearchForVendors (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/AutoSearchForVendors', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteSearchForVendorCode (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/AutoCompleteSearchForVendorCode', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteSelectedIteminVendorLink (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/DeleteSelectedIteminVendorLink', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteVendorForNetoutVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/AutoCompleteVendorForNetoutVoucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewVendorRegionAccess (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Purchase/CreateNewVendorRegionAccess', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveVendorRegionAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/SaveVendorRegionAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openVendorRegionAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/OpenVendorRegionAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteVendorRegionAccess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Purchase/DeleteVendorRegionAccess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInitializePurchaseCreditorsSummaryReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/GetInitializePurchaseCreditorsSummaryReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateCreditorsSummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateCreditorsSummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateCreditorsSummaryReportExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateCreditorsSummaryReportExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFCreditorsSummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFCreditorsSummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateCreditorsDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateCreditorsDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getCreditorsDetailsReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetCreditorsDetailsReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFCreditorsDetailsReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFCreditorsDetailsReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateVendorAccountCreditorsReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateVendorAccountCreditorsReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateSOAVendorReportExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateSOAVendorReportExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFSOAVendorReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFSOAVendorReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateSummaryStatementAccountVendorReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateSummaryStatementAccountVendorReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateSummaryStatementAccountVendorReportExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateSummaryStatementAccountVendorReportExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFSummaryStatementAccountVendorReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFSummaryStatementAccountVendorReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInitializePurchaseDetailStaementAccountVendorReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/GetInitializePurchaseDetailStaementAccountVendorReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateDetailStaementAccountVendorReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateDetailStaementAccountVendorReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getDetailStaementAccountVendorReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetDetailStaementAccountVendorReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFDetailStatementAccountVendorReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFDetailStatementAccountVendorReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInitializeProcedureandPurchaseOrderOutstandingReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/GetInitializeProcedureandPurchaseOrderOutstandingReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generatePurchaseOrderOutstandingReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePurchaseOrderOutstandingReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePurchaseOrderOutstandingDetailsReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePurchaseOrderOutstandingDetailsReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePurchaseOrderOutstandingReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePurchaseOrderOutstandingReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFPurchaseOrderOutstandingReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFPurchaseOrderOutstandingReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePurchaseOrderDetailOutstandingReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePurchaseOrderDetailOutstandingReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFPurchaseOrderDetailOutstandingReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFPurchaseOrderDetailOutstandingReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInitializePurchaseRegisterSummaryReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/GetInitializePurchaseRegisterSummaryReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getInitializePurchaseRegisterDetailReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/GetInitializePurchaseRegisterDetailReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generatePurchaseRegisterSummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePurchaseRegisterSummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePurchaseRegisterDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePurchaseRegisterDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePurchaseRegisterSummaryReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePurchaseRegisterSummaryReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFPurchaseRegisterSummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFPurchaseRegisterSummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePurchaseRegisterDetailReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePurchaseRegisterDetailReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFPurchaseRegisterDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFPurchaseRegisterDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInitializeVendorBasedPurchaseReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/GetInitializeVendorBasedPurchaseReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateVendorBasedPurchaseSummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateVendorBasedPurchaseSummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getvendorwisedsummaryReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetvendorwisedsummaryReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFvendorwisedsummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFvendorwisedsummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateVendorBasedPurchaseDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateVendorBasedPurchaseDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getvendorwisedDetailsReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetvendorwisedDetailsReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFvendorwisedDetailsReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFvendorwisedDetailsReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInitializeDataForVatPaidSummary (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/GetInitializeDataForVatPaidSummary', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateVatPaidSummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateVatPaidSummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInitializeDataForVatPaidSummaryDetail (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/GetInitializeDataForVatPaidSummaryDetail', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateVatPaidDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateVatPaidDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateExcelForaVatpaidReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateExcelForaVatpaidReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFaVatpaidReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFaVatpaidReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateExcelForaVatpaidDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateExcelForaVatpaidDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFaVatpaidDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFaVatpaidDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewItemBasedPurchaseReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/CreateNewItemBasedPurchaseReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateItemBasedPurchaseReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateItemBasedPurchaseReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getItemwisedPurchaseSummaryReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetItemwisedPurchaseSummaryReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFItemwisedPurchaseSummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFItemwisedPurchaseSummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateItemBasedPurchaseDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateItemBasedPurchaseDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getItemwisedPurchaseDetailsReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetItemwisedPurchaseDetailsReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFItemwisedPurchaseDetailsReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFItemwisedPurchaseDetailsReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInitializeProfitAndLoss (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/GetInitializeProfitAndLoss', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewProfitAndLossReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/CreateNewProfitAndLossReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateProfitAndLossReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateProfitAndLossReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAndGenerateExcelFileForProfitAndLossReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/LoadAndGenerateExcelFileForProfitAndLossReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFProfitAndLossReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFProfitAndLossReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getBalanceSheetReportInitialdata (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/GetBalanceSheetReportInitialdata', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewBalanceSheetReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/CreateNewBalanceSheetReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateBalanceSheetReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateBalanceSheetReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAndGenerateExcelFileForBalanceSheetReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/LoadAndGenerateExcelFileForBalanceSheetReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFBalanceSheetReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFBalanceSheetReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getTrialBalanceReportInitialdata (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/GetTrialBalanceReportInitialdata', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  createNewTrialBalanceReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/CreateNewTrialBalanceReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateTrialBalanceReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateTrialBalanceReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    loadAndGenerateExcelFileForTrialBalanceReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/LoadAndGenerateExcelFileForTrialBalanceReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFTrialBalanceReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFTrialBalanceReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInitializeLedgerSummaryReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/GetInitializeLedgerSummaryReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateLedgerSummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateLedgerSummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateLedgerSummaryReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateLedgerSummaryReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFLedgerSummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFLedgerSummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInitializeLedgerDetailReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/GetInitializeLedgerDetailReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateLedgerDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateLedgerDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getAllLedgersByCodeAndGroupId (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetAllLedgersByCodeAndGroupId', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getAllParentGroupsByRegionValue (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetAllParentGroupsByRegionValue', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getLedgerDetailsReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetLedgerDetailsReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFLedgerDetailsReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFLedgerDetailsReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateBankReconciliationSummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateBankReconciliationSummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getBankReconciliationReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetBankReconciliationReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateBankReconcilationReportExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateBankReconcilationReportExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFBankReconcilationReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFBankReconcilationReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    undoReconciliedStatement (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/UndoReconciliedStatement', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInitializeDataOfBankReconciliationSummaryReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/GetInitializeDataOfBankReconciliationSummaryReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    getAllBankLedgersByRegionValue (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetAllBankLedgersByRegionValue', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  generateBankReconcilationSummaryReportExcel (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Report/GenerateBankReconcilationSummaryReportExcel', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateBankReconciliationStatementReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateBankReconciliationStatementReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveReconciliedStatementReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/SaveReconciliedStatementReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getBankReconciliedStatementReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetBankReconciliedStatementReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getBankReconciliedStatementReportBySummaryId (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetBankReconciliedStatementReportBySummaryId', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getListOfBankAccountNumberByBankLedgerId (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GetListOfBankAccountNumberByBankLedgerId', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateBankReconcilationDetailsReportExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateBankReconcilationDetailsReportExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateTrialBalanceMonthlyReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateTrialBalanceMonthlyReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateTrialBalanceMonthlyReportExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateTrialBalanceMonthlyReportExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFTrialBalanceMonthlyReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFTrialBalanceMonthlyReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateBalanceSheetMonthlyReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateBalanceSheetMonthlyReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateBalanceSheetMonthlyReportExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateBalanceSheetMonthlyReportExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFBalanceSheetMonthlyReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFBalanceSheetMonthlyReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateProfitAndLossMonthlyReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateProfitAndLossMonthlyReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateProfitAndLossMonthlyReportExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GenerateProfitAndLossMonthlyReportExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFProfitAndLossMonthlyReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Report/GeneratePDFProfitAndLossMonthlyReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteSalAttachmentFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/DeleteSalAttachmentFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getSalesQuotationInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/GetSalesQuotationInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getNewSalesQuotationSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/GetNewSalesQuotationSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchSalesQuotation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/SearchSalesQuotation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteCustomerQuotationSearch (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/AutoCompleteCustomerQuotationSearch', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewCustomerQuotation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/CreateNewCustomerQuotation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveSalesquotationDetails (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/SaveSalesquotationDetails', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openSalesQuotationDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/OpenSalesQuotationDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitSalesQuotationDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/SubmitSalesQuotationDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveSaleSQuotationDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/ApproveSaleSQuotationDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectSalesQuotationDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/RejectSalesQuotationDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelSalesQuotationDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/CancelSalesQuotationDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelSalesQuotationforVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/CancelSalesQuotationforVoucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewCustomerQuotationNotes (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/CreateNewCustomerQuotationNotes', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveCustomerQuotationNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/SaveCustomerQuotationNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    salesQuotationItemCalculation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/SalesQuotationItemCalculation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewSalesQuotationItem (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/CreateNewSalesQuotationItem', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    deleteSalesQuotationItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/DeleteSalesQuotationItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    salesQuotationReportingCurrencyValuePosting (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/SalesQuotationReportingCurrencyValuePosting', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    setItemDetailsForSalesQuotation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/SetItemDetailsForSalesQuotation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getTotalPriceValueForSalesQuotationItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/GetTotalPriceValueForSalesQuotationItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewSalesQuotationReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/ViewSalesQuotationReceipt', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadSalesQuationAttachmentFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/UploadSalesQuationAttachmentFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadSalesQuationAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/DownloadSalesQuationAttachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getSalesOrderInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/salesorder/initialize', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getNewSalesOrderSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/salesorder/GetNewSalesOrderSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchSalesOrder (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/SearchSalesOrder', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewSalesOrderDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/CreateNewSalesOrderDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getCustomerQuotationItemDetailByCustomerQuotaionIdForSalesOrder (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/GetCustomerQuotationItemDetailByCustomerQuotaionIdForSalesOrder', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewSalesOrderItem (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/salesorder/CreateNewSalesOrderItem', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    setItemDetailsForSalesOrder (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/SetItemDetailsForSalesOrder', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    salesOrderReportingCurrencyValuePosting (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/SalesOrderReportingCurrencyValuePosting', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    salesOrderItemCalculation (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/SalesOrderItemCalculation', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteSalesOrderItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/DeleteSalesOrderItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveSalesOrderDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/SaveSalesOrderDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openSalesOrderDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/OpenSalesOrderDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewSalesOrderNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/CreateNewSalesOrderNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewNotesForReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/CreateNewNotesForReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveSalesOrderNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/SaveSalesOrderNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitSalesOrderDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/SubmitSalesOrderDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveSalesOrderDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/ApproveSalesOrderDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectSalesOrderDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/RejectSalesOrderDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelSalesOrderDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/CancelSalesOrderDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelSalesOredrforVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/CancelSalesOredrforVoucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewSalesOrderReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/ViewSalesOrderReceipt', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadSalesOrderAttachmentFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/UploadSalesOrderAttachmentFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    salesOrderDownloadFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/SalesOrderDownloadFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteForSalesOrder (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/Salesorder/AutoCompleteForSalesOrder', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteForSalesOrderDocumentDate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/Salesorder/AutoCompleteForSalesOrderDocumentDate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteForSalesOrderAdvanceReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/Salesorder/AutoCompleteForSalesOrderAdvanceReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    searchSalesOrderVoucherStatusHistory (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/SearchSalesOrderVoucherStatusHistory', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveSalesOrderVoucherStatus (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesorder/SaveSalesOrderVoucherStatus', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getSalesInvoiceInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/GetSalesInvoiceInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getNewSalesInvoiceSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/GetNewSalesInvoiceSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchSalesInvoice (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/SearchSalesInvoice', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewSalesInvoice (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/CreateNewSalesInvoice', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveSalesInvoice (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/SaveSalesInvoice', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openSalesInvoice (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/OpenSalesInvoice', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getTaxPercentageByItemIdAndEffectiveDate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/GetTaxPercentageByItemIdAndEffectiveDate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitSalesInvoice (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/SubmitSalesInvoice', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    setSalesInvoiceForNeedExport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/SetSalesInvoiceForNeedExport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelSalesInvoice (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/CancelSalesInvoice', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectSalesInvoice (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/RejectSalesInvoice', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveSalesInvoiceNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/SaveSalesInvoiceNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveSalesInvoice (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/ApproveSalesInvoice', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewSalesInvoiceItem (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/CreateNewSalesInvoiceItem', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    calculateSalesInvoiceItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/CalculateSalesInvoiceItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getItemBasedonGDN (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/GetItemBasedonGDN', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteSalesInvoiceItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/DeleteSalesInvoiceItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    salesInvoiceReportingCurrencyValuePosting (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/SalesInvoiceReportingCurrencyValuePosting', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    setItemDetailsForSalesInvoice (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/SetItemDetailsForSalesInvoice', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getSalesOrderItemsByOrderIdAndSetAsInvoiceItem (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/GetSalesOrderItemsByOrderIdAndSetAsInvoiceItem', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteGetSalesInvoiceRefNo (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/sales/AutoCompleteGetSalesInvoiceRefNo', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  loadBranchDetailsFromUserTeamLink (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/sales/LoadBranchDetailsFromUserTeamLink', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    getVoucherAcess (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/sales/GetVoucherAcess', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteGetSalesInvoiceRefNoDocumentDate (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/sales/AutoCompleteGetSalesInvoiceRefNoDocumentDate', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewSalesInvoiceReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/ViewSalesInvoiceReceipt', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelSalesInvoiceforVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/CancelSalesInvoiceforVoucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadSalesInvoiceAttachmentFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/UploadSalesInvoiceAttachmentFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadSalesInvoiceAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/DownloadSalesInvoiceAttachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteSalesAttachmentFile (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/DeleteSalesAttachmentFile', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openSalesDocumentImage (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/sales/viewImage', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getReciptNoteDetailsBySalesInvoiceId (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/GetReciptNoteDetailsBySalesInvoiceId', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getSaleReceiptNotesInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/GetSaleReceiptNotesInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getNewSaleReceiptNoteSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/GetNewSaleReceiptNoteSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchSalesReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/SearchSalesReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openSalesReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/OpenSalesReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewSalesReceiptNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/CreateNewSalesReceiptNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveSalesReceiptNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/SaveSalesReceiptNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewReceiptNoteDetailForSI (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/CreateNewReceiptNoteDetailForSI', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewNoteReceiptNote (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/CreateNewNoteReceiptNote', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    saveNotesForSaleReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/SaveNotesForSaleReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/RejectReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/ApproveReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelSalesReceiptNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/CancelSalesReceiptNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/SubmitReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadSalesReceiptNoteAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/UploadSalesReceiptNoteAttachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadSalesReceiptNoteAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/DownloadSalesReceiptNoteAttachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewSalReceiptNoteReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/ViewSalReceiptNoteReceipt', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    totalPriceCalculationReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/TotalPriceCalculationReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    calculateBalanceAmountOnReceivedAmountChange (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/CalculateBalanceAmountOnReceivedAmountChange', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteReceiptNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/DeleteReceiptNoteDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelReceiptNoteforVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salereceiptnote/CancelReceiptNoteforVoucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getSaleAdvanceReceiptNotesInitialData (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/GetSaleAdvanceReceiptNotesInitialData', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getNewSaleAdvanceReceiptNoteSearch (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/GetNewSaleAdvanceReceiptNoteSearch', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    searchSalesAdvanceReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/SearchSalesAdvanceReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    openSalesAdvanceReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/OpenSalesAdvanceReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewSalesAdvanceReceiptNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/CreateNewSalesAdvanceReceiptNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveSalesAdvanceReceiptNotes (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/SaveSalesAdvanceReceiptNotes', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    saveNotesForSaleAdvanceReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/SaveNotesForSaleAdvanceReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    rejectAdvanceReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/RejectAdvanceReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    approveAdvanceReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/ApproveAdvanceReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    cancelAdvanceReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/CancelAdvanceReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    submitAdvanceReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/SubmitAdvanceReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    uploadSalesAdvanceReceiptAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/UploadSalesAdvanceReceiptAttachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    downloadSalesAdvanceReceiptNoteAttachment (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/DownloadSalesAdvanceReceiptNoteAttachment', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    autoCompleteGetSaleAdvanceReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/AutoCompleteGetSaleAdvanceReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  calculateAdvanceReceiptNoteBalanceAmount (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/CalculateAdvanceReceiptNoteBalanceAmount', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    totalPriceCalculationForAdvanceReceiptNote (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/TotalPriceCalculationForAdvanceReceiptNote', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    deleteAdvanceReceiptNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/DeleteAdvanceReceiptNoteDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    createNewAdvanceReceiptNoteDetail (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/CreateNewAdvanceReceiptNoteDetail', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewAdvanceReceiptNoteWso (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/CreateNewAdvanceReceiptNoteWso', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    cancelAdvanceReceiptNoteVoucher (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/CancelAdvanceReceiptNoteVoucher', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    viewSalAdvanceReceiptNoteReceipt (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/salesadvancereceiptnotes/ViewSalAdvanceReceiptNoteReceipt', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getActCustomerInfoByCrmCustomer (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'Sales/GetActCustomerInfoByCrmCustomer', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInitializeSalesRegisterSummaryReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'SalesReport/GetInitializeSalesRegisterSummaryReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateSalesRegisterSummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateSalesRegisterSummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateSalesRegisterSummaryDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateSalesRegisterSummaryDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateSalesRegisterSummaryReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateSalesRegisterSummaryReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFSalesRegisterSummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GeneratePDFSalesRegisterSummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInitializeSalesRegisterDetailReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'SalesReport/GetInitializeSalesRegisterDetailReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateSalesRegisterDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateSalesRegisterDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateSalesRegisterDetailReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateSalesRegisterDetailReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFSalesRegisterDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GeneratePDFSalesRegisterDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInitializeSalesDebtorsSummaryReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'SalesReport/GetInitializeSalesDebtorsSummaryReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
  getCompanyAddresDetails (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'SalesReport/GetCompanyAddresDetails', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateDebtorsSummaryReportExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateDebtorsSummaryReportExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFDebtorsSummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GeneratePDFDebtorsSummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFDebtorsDetailsReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GeneratePDFDebtorsDetailsReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateDebtorsSummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateDebtorsSummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    salesOfCustomerAccountDebtors (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/SalesOfCustomerAccountDebtors', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateSOAcustomerReportExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateSOAcustomerReportExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFSOAcustomerReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GeneratePDFSOAcustomerReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateDebtorsDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateDebtorsDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getDebtorsDetailsReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GetDebtorsDetailsReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateDebtorsSummarystatementaccountcustomerReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateDebtorsSummarystatementaccountcustomerReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateSalesRegisterSummarystatementaccountcustomerReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateSalesRegisterSummarystatementaccountcustomerReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFSalesRegisterSummarystatementaccountcustomerReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GeneratePDFSalesRegisterSummarystatementaccountcustomerReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFDebtorsDetailsStatementAccountCustomer (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GeneratePDFDebtorsDetailsStatementAccountCustomer', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateDetailsStatementAccountCustomerReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateDetailsStatementAccountCustomerReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getDebtorsDetailsStatementAccountCustomerAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GetDebtorsDetailsStatementAccountCustomerAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInitializeProcedureandSalesOrderOutstandingReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'SalesReport/GetInitializeProcedureandSalesOrderOutstandingReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateSalesOrderOutstandingReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateSalesOrderOutstandingReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateSalesOrderOutstandingDetailsReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateSalesOrderOutstandingDetailsReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFSalesOrderOutstandingReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GeneratePDFSalesOrderOutstandingReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateExcelForSalesOrderOutstandingReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateExcelForSalesOrderOutstandingReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFSalesOrderDetailsOutstandingReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GeneratePDFSalesOrderDetailsOutstandingReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateExcelForSalesOrderDetailsOutstandingReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateExcelForSalesOrderDetailsOutstandingReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  getInitializeDataForVatCollectedSummary (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'SalesReport/GetInitializeDataForVatCollectedSummary', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateVatCollectedSummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateVatCollectedSummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateVatCollectedDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateVatCollectedDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateExcelForaVatCollectedReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateExcelForaVatCollectedReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFaVatCollectedReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GeneratePDFaVatCollectedReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateExcelForaVatCollectedDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateExcelForaVatCollectedDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFaVatCollectedDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GeneratePDFaVatCollectedDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
  createNewItemBasedSalesReport (options ?: any): Observable < any > {
    this.data.serviceStarted();
    options === undefined
    ? (options = this.apiData.defaultOptions)
    : (options = this.apiData.setOptions(options));
  return this.apiData.getData(this.appSettings.environment.accountsPath + 'SalesReport/CreateNewItemBasedSalesReport', options).pipe(
    finalize(() => this.data.serviceCompleted()),
    catchError((err) => {
      options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
      return throwError(() => new Error(err));
    })
  );
}
    
    generateItemBasedSalesReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateItemBasedSalesReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getItemwisedsummaryReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GetItemwisedsummaryReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFItemwisedsummaryReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GeneratePDFItemwisedsummaryReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateItemBasedSalesDetailReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateItemBasedSalesDetailReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getItemwisedetailsReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GetItemwisedetailsReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generatePDFItemwisedetailsReport (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GeneratePDFItemwisedetailsReport', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    generateStatementOfAccountSummaryReportExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GenerateStatementOfAccountSummaryReportExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
  
    getStatementOfAccountDetailsReportAsExcel (body: any, options ?: any): Observable < any > {
      this.data.serviceStarted();
      options === undefined
      ? (options = this.apiData.defaultOptions)
      : (options = this.apiData.setOptions(options));
  return this.apiData
    .postData(this.appSettings.environment.accountsPath + 'SalesReport/GetStatementOfAccountDetailsReportAsExcel', body, options)
    .pipe(
      finalize(() => this.data.serviceCompleted()),
      catchError((err) => {
        options ? options.hideErrorMethod ? '' : this.data.errorMethod(err) : '';
        return throwError(() => new Error(err));
      })
    );
}
 
}
