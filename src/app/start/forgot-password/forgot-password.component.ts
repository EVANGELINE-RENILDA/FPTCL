import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { InputControlComponent } from '../../app-core/form-input/input-control/input-control.component';
import { entCredential, entUser } from '../../common/api-services/admin-api/admin-api.classes';
import { ApplicationApiService } from '../../common/api-services/application-api/application-api.service';
import { AppStorageService } from '../../common/services/app-storage/app-storage.service';
import { AppSettingsService } from '../../common/services/app-settings/app-settings.service';
import { AdminApiService } from '../../common/api-services/admin-api/admin-api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlService } from '../../common/services/url/url.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [InputControlComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  isCompleted = false;
  login = new entCredential();
  loginData = new entUser()
  loadingTrue = false;
  errorTrue = false;
  encodeData: any
  options = {
    type: 'adminPath',
  };
  constructor(
    public storage: AppStorageService,
    public apiService: ApplicationApiService,
    public appSetting: AppSettingsService,
    public router: Router,
    public urlService: UrlService,
    public adminService: AdminApiService,) { }

  getToken() {
    this.loadingTrue = true;
    this.adminService
      .gettoken(this.options)
      .subscribe(async (success: any) => {
        this.storage.set("encryptkey", success.data).then(() => { });
      });
  }

  async onSubmit(l: any) {

    this.login.clientcode = this.appSetting.environment.clientCode;
    if (l.valid) {
      this.adminService.forgotuserpassword(this.login, this.options).subscribe(async (success) => {
        this.loginData = success;

        this.storage.set('userLoginId', this.loginData.userLoginId);
        this.storage.set('useremailid', this.loginData.emailId);
        const obj = {
          data: this.loginData
        }
        this.encodeData = await this.urlService.encode(obj);
        this.router.navigateByUrl('/verify-otp/' + this.encodeData)
      })
    } else {
      this.errorTrue = true;
    }
  }

}
