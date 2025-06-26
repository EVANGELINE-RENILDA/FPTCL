import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { AppStorageService } from '../../common/services/app-storage/app-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../common/services/url/url.service';
import { PinControlComponent } from '../../app-core/form-input/pin-control/pin-control.component';
import { FormsModule } from '@angular/forms';
import { entCredential } from '../../common/api-services/admin-api/admin-api.classes';
import { AppSettingsService } from '../../common/services/app-settings/app-settings.service';
import { AdminApiService } from '../../common/api-services/admin-api/admin-api.service';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [PinControlComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.scss'
})
export class VerifyOtpComponent {
  emailId: any
  otpPage = false;
  loginValue: any;
  errorTrue = false;
  login = new entCredential()
  constructor(public storage: AppStorageService, public route: ActivatedRoute, public url: UrlService, public appSettings: AppSettingsService, public adminService: AdminApiService, public router: Router) {
    this.route.paramMap.subscribe((params: any) => {
      this.init();

    });
  }
  ngOnInit(): void {
    // this.init()
  }

  async init() {
    
    setTimeout(() => {
      this.otpPage = true
    }, 500)
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.loginValue = params.data
    console.log(this.loginValue);

  }

  mailMask() {
    let mailId = this.loginValue.emailId;
    let splits = mailId.indexOf('@');
    var mailMasked = mailId.replace(mailId.slice(5, splits), "*".repeat(5));
    return mailMasked;
  }
  async onSubmit(l: any) {
    this.login.clientcode = this.appSettings.environment.clientCode;
    this.login.emailId = this.appSettings.environment.emailId;
    this.login.userLoginId = this.loginValue.userLoginId;
    if (l.valid) {
      this.adminService.checkOTPexpiryandvalidate(this.login).subscribe((success) => {
        this.login = success;
        this.router.navigateByUrl('/reset-password')

      })
    } else {
      this.errorTrue = true;
    }
  }



}
