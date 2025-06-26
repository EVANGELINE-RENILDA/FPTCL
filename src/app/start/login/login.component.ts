import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { InputControlComponent } from '../../app-core/form-input/input-control/input-control.component';
import { DataService } from '../../common/services/data/data.service';
import { entCredential } from '../../common/api-services/admin-api/admin-api.classes';
import { AppStorageService } from '../../common/services/app-storage/app-storage.service';
import { ApplicationApiService } from '../../common/api-services/application-api/application-api.service';
import { AdminApiService } from '../../common/api-services/admin-api/admin-api.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AesService } from '../../app-core/service/encrypt/aes.service';
import { AppService } from '../../app.service';
import { PinControlComponent } from '../../app-core/form-input/pin-control/pin-control.component';
import { IpService } from '../../test/ip.service';
import { AppSettingsService } from '../../common/services/app-settings/app-settings.service';
import { CoreService } from '../../app-core/service/core.service';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../app-core/template/icon-button/icon-button.component';
import { AppDatePipe } from "../../common/pipes/app-date/app-date.pipe";
import { InnerScroll, Row, ViewLabel } from '../../app-core/core-component/core-component.component';
import { entDiaryEntry } from '../../common/api-services/application-api/application-api.classes';
import { InitialDataService } from '../../common/services/initial-data/initial-data.service';
import { ErrorMessageComponent } from '../../app-core/message/error-message/error-message.component';

@Component({
  selector: 'app-login',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [InputControlComponent, FormsModule, PinControlComponent, AppTableComponent, CellDefDirective, CellHeaderDefDirective, IconButtonComponent, AppDatePipe, InnerScroll, Row, ErrorMessageComponent, ViewLabel]
})
export class LoginComponent {
  login = new entCredential();
  loadingTrue = false;
  errorTextOnlyShow = false;
  errorTextOnly = false
  errorTrue = false
  ipAddress: any;
  options = {
    type: 'adminPath',
  };

  constructor(
    public router: Router,
    public storage: AppStorageService,
    public apiService: ApplicationApiService,
    public adminService: AdminApiService,
    public data: DataService,
    public aes: AesService,
    public appSettings: AppSettingsService,
    public appService: AppService,
    public core: CoreService,
    private ip: IpService,
    public initialData: InitialDataService
  ) { }
  currentDate = ''
  async ngOnInit() {
    // await this.getToken();
    this.getIP()
    this.storage.get('loginData').then(val => {
      val ? this.login.userLoginId = val : '';
      this.currentDate = this.appService.getCurrentDate();
    })
  }
  getIP() {
    // this.ip.getIPAddress().subscribe((res: any) => {
    //   this.ipAddress = res.ip;
    // });
  }

  getToken() {
    this.adminService.gettoken().subscribe(async (success: any) => {
      await this.storage.set("encryptkey", success.data);
    });
  }

  async onSubmit(l: any) {
    if (l.valid) {
      this.errorTrue = false;
      const obj = {
        password: '',
        token: [],
        clientcode: '',
        mPin: '',
        emailId: '',
        newPassword: '',
        confirmPassword: '',
        urlDate: '',
        confirmMPin: 0,
        userLoginId: '',
        userSerialId: 0,
        pin: '',
        isPinValidation: '',
        isPasswordValidation: '',
        languagePreference: '',
        screenName: ''
      }

      await this.aes
        .encrypt(this.login.userLoginId)
        .then((val: any) => {
          obj.userLoginId = val;
        });
      await this.aes.encrypt(this.login.password).then((val: any) => {
        obj.password = val;
      });
      await this.storage.get("encryptkey").then((val) => {
        if (val) {
          obj.token = val;
        } else {
          obj.token = [];
        }
      });
      obj.isPasswordValidation = 'Y';
      obj.clientcode = this.appSettings.environment.clientCode;
      this.adminService.authenticateuser(obj, this.options).subscribe((success: any) => {


        this.appService.userData = success;
        this.login.userLoginId = success.userLoginId;
        this.appService.userLoginId = success.userLoginId;
        this.storage.set('userData', success);
        this.data.token = success.keyToken;
        this.appLogin(l)
        // if (this.appService.userData.userDefaultLandingPage === 'A') {
        //   this.router.navigateByUrl('/home/crm/customer');
        // }
        // else if (this.appService.userData.userDefaultLandingPage !== '') {
        //   this.router.navigateByUrl(this.appService.userData.userDefaultLandingPage);
        // } else {
        //   this.router.navigateByUrl('/home');
        // }
      },
        (error: any) => {
          if (error.status === 400) {
            //  this.openErrorMessage(error);
          } else {
            this.data.errorMethod(error);
          }
        }
      )
    } else {
      this.errorTrue = true;
    }
  }


  async appLogin(l: NgForm) {
    if (l.valid) {
      this.errorTrue = false;
      let obj = JSON.parse(JSON.stringify(this.login));
      obj.userLoginId = await this.aes.encrypt(this.login.userLoginId);
      obj.password = await this.aes.encrypt(this.login.password);
      await this.storage.get("encryptkey").then((val) => {
        val ? obj.token = val : obj.token = [];
      })
      obj.isPasswordValidation = 'Y';
      this.apiService.authenticateUserbyCompany(obj).subscribe(async (success) => {
        this.appService.userData = success.ientUser;
        this.appService.companyName = success.companyName;
        console.log(this.appService.companyName);

        this.data.token = success.ientUser.keyToken;
        await this.storage.set('loginData', success.ientUser.userLoginId);
        await this.storage.set('userData', success.ientUser);
        await this.storage.set('companyCurrencyValue', success.companyCurrencyValue);
        await this.storage.set('companyName', success.companyName);
        await this.storage.set('sourcePrimaryKey', 0);
        await this.storage.set('companyId', success.companyId);
        await this.storage.set('userLoginId', success.ientUser.userLoginId);
        await this.storage.set('branchDDL', success.ientUser.plstentDDLClass);
        await this.storage.set('branchId', success.ientUser.branchId);
        await this.storage.set('currencyValue', success.companyCurrencyValue);
        await this.storage.set('companySymbolValue', success.companySymbolValue);
        await this.storage.set('branchValue', success.ientUser.branchValue);
        await this.storage.set('region', success.corporateAccount);
        await this.storage.set('fiscalyear', success.fiscalYearList);
        await this.storage.set('fisca', success.fiscalYear);


        if (this.appService.userData.userDefaultLandingPage === 'A') {
          await this.router.navigateByUrl('/home/crm/customer');
        }
        else if (this.appService.userData.userDefaultLandingPage !== '') {
          await this.router.navigateByUrl(this.appService.userData.userDefaultLandingPage);
        } else {
          await this.router.navigateByUrl('/home');
        }
        this.getRemainderList(success.ientUser.userLoginId)

      });
    } else {
      this.errorTrue = true;
    }
  }

  //reminder
  @ViewChild('reminderDialog', { static: false })
  reminderDialog!: TemplateRef<any>;
  @ViewChild('reminderDetailDialog', { static: false })
  reminderDetailDialog!: TemplateRef<any>;
  reminderColumns = ['title', 'reminderDatetime'];
  reminderColumnsName = ['Title', 'Reminder Date '];
  reminderTableData: any = []
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  };
  dialogClose() {
    this.core.closeAll()
  }
  getRemainderList(val: any) {
    const obj = {
      data: val
    }
    this.apiService.getReminderForStaff(obj).subscribe(async (success) => {
      this.reminderTableData = success.lstentDiaryEntry
      if (this.reminderTableData.length > 0) {
        this.data.showErrorMessage = false;
        let dialogResponse: any = await this.core.openDialog(this.reminderDialog, {
          height: '500px',
          width: '900px',
          maxWidth: '1170px',
        });
        if (dialogResponse) {
        }
      }
      else {

      }
    })
  }
  async addNewRemainder() {
    this.core.closeAll()
    await this.storage.set('newRemainder', 0);
    this.router.navigateByUrl('/home/my-diary/search')
  }
  async openRemainder(val: any) {
    this.core.closeAll()
    await this.storage.set('oldRemainder', val);
    this.router.navigateByUrl('/home/my-diary/search')
  }



}
