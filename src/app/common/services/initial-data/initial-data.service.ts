import { Injectable } from '@angular/core';
import { ApplicationApiService } from '../../api-services/application-api/application-api.service';
import { DataService } from '../data/data.service';
import { AdminApiService } from '../../api-services/admin-api/admin-api.service';
import { AccountsApiService } from '../../api-services/accounts-api/accounts-api.service';

@Injectable({
  providedIn: 'root'
})
export class InitialDataService {
  constructor(
    public data: DataService,
    public apiService: ApplicationApiService,
    public adminService: AdminApiService,
    public accountsService: AccountsApiService,
  ) {
    this.data.getToken();
  }
  ledgerInitialData: any = {
    configLedgerLedgerType: []
  }
  documentArray: any = [];
  DDLValues: any = {};
  getDDL(methodName: keyof ApplicationApiService, options?: any): Promise<boolean> {
    return new Promise((resolve) => {
      const method = this.apiService[methodName];
      if (typeof method !== 'function') {
        console.error('Method not found on apiService', methodName);
        resolve(false);
      }
      this.apiService[methodName](options).subscribe((success: any) => {
        success.data.forEach((element: any) => {
          this.DDLValues[element.key] = element.value;
        });
        console.log(this.DDLValues);

        // console.log(this.DDL);
        resolve(true);
      });
    });
  }
  getAdminDDL(methodName: keyof AdminApiService, options?: any): Promise<boolean> {
    return new Promise((resolve) => {
      const method = this.adminService[methodName];
      if (typeof method !== 'function') {
        console.error('Method not found on apiService', methodName);
        resolve(false);
      }
      this.adminService[methodName](options)
        .subscribe((success: any) => {
          success.data.forEach((element: any) => {
            this.DDLValues[element.key] = element.value;
          });
          console.log(this.DDLValues);

          // console.log(this.DDL);
          resolve(true);
        });
    });
  }
  // getAccountsDDL
  getAcccountsDDL(methodName: keyof AccountsApiService, options?: any): Promise<boolean> {
    return new Promise((resolve) => {
      const method = this.accountsService[methodName];
      if (typeof method !== 'function') {
        console.error('Method not found on apiService', methodName);
        resolve(false);
      }
      this.accountsService[methodName](options)
        .subscribe((success: any) => {
          success.data.forEach((element: any) => {
            this.DDLValues[element.key] = element.value;
          });
          console.log(this.DDLValues, 'gottttttttttttt');
          resolve(true);
        });
    });
  }
  //bank
  getHeadOfficeBankDDL: any = {
    DDLBank: []
  }
  getAllInitialHeadofficeBankValueDetails(options: any): Promise<boolean> {
    return new Promise((resolve) => {
      this.apiService
        .getAllHeadofficeBankDetails(options)
        .subscribe((success: any) => {
          console.log(success);
          this.getHeadOfficeBankDDL.DDLBank = success.value;
          resolve(true);
        });
    });
  }

  getDocumentTypeDDL: any = {
    DDLDocumentType: []
  }
  getAllDocumentList(val: any) {

    return new Promise((resolve) => {
      const obj = {
        data: val
      }
      this.apiService
        .getListOfDocumentByTrustApplicationId(obj)
        .subscribe((success: any) => {
          success.lstentTrustApplicationDocument.forEach((ele: any) => {
            this.getDocumentTypeDDL = this.documentArray.push(ele);
            console.log(this.getDocumentTypeDDL);

          })

          resolve(true);
        });
    });
  }



}
