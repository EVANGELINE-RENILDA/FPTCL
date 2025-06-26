import { Component } from '@angular/core';
import { InputControlComponent } from '../../app-core/form-input/input-control/input-control.component';
import { entCredential } from '../../common/api-services/application-api/application-api.classes';
import { entUser } from '../../common/api-services/admin-api/admin-api.classes';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../common/services/data/data.service';
import { UrlService } from '../../common/services/url/url.service';
import { AppSettingsService } from '../../common/services/app-settings/app-settings.service';
import { AppStorageService } from '../../common/services/app-storage/app-storage.service';
import { AdminApiService } from '../../common/api-services/admin-api/admin-api.service';
import { AesService } from '../../app-core/service/encrypt/aes.service';
import { finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [InputControlComponent, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  login = new entCredential();
  user = new entUser()
  isCompleted = false;
  obj: any = [];
  loginHeader = '';
  errorTrue = false;
  btnClicked = false

  constructor(public router: Router,
    public data: DataService,
    public aes: AesService,
    public route: ActivatedRoute,
    public urlService: UrlService,
    public appSettings: AppSettingsService,
    public storage: AppStorageService,
    public adminService: AdminApiService) { }
  ngOnInit(): void {
    this.init();
  }

  async init() {
    if (this.user && this.user.userSerialId > 0) {
      this.login.clientcode = this.user.clientCode;
      this.login.userLoginId = this.user.userLoginId;
      this.login.emailId = this.user.emailId;
    } else {
      let obj = this.route.snapshot.paramMap.get("id");
      this.obj = await this.urlService.decode(obj);
      this.loginHeader = this.obj.loginHeader;
      this.login.emailId = this.obj.username;
      this.login.userLoginId = this.obj.userLoginId;
      this.login.clientcode = this.obj.clientcode;
      this.login.screenName = this.obj.screenName;
    }
  }


  async resetUserPassword(l: any) {
    this.login.clientcode = this.appSettings.environment.clientCode;
    if (l.valid) {
      if (this.login.newPassword === this.login.confirmPassword) {
        this.errorTrue = false;
        await this.aes.encrypt(this.login.newPassword).then((val: any) => {
          this.login.newPassword = val;
        });
        await this.aes.encrypt(this.login.confirmPassword).then((val: any) => {
          this.login.confirmPassword = val;
        });
        await this.storage.get("encryptkey").then((val) => {
          if (val) {
            this.login.token = val;
          } else {
            this.login.token = [];
          }
        });
        this.adminService.resetuserpassword(this.login).pipe(finalize(() => {

          this.btnClicked = false;
          this.router.navigateByUrl("/reset-password-success-message");
        })
        ).subscribe((success) => {
          this.user = success;

          if (success.msg.infoMessage.msgDescription) {
            this.data.successMessage(success.msg.infoMessage.msgDescription);
          }

        });
      }
    } else {
      this.errorTrue = true;
    }
  }
}
