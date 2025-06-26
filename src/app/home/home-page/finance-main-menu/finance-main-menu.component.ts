import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  Row,
  ViewLabel,
} from '../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { AppService } from '../../../app.service';
import { entUser } from '../../../common/api-services/admin-api/admin-api.classes';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { AppStorageService } from '../../../common/services/app-storage/app-storage.service';
import { CoreService } from '../../../app-core/service/core.service';
import { AlertComponent } from '../../../alert/alert.component';
import { AccountsApiService } from '../../../common/api-services/accounts-api/accounts-api.service';
import { DataService } from '../../../common/services/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppAccessDirective } from '../../../common/permission/app-access.directive';
import { MenuAccessDirective } from '../../../common/permission/menu-access.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-finance-main-menu',
  standalone: true,
  imports: [
    Row,
    ViewLabel,
    InputControlComponent,
    AppDatePipe,
    AppAccessDirective,
    MenuAccessDirective,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './finance-main-menu.component.html',
  styleUrl: './finance-main-menu.component.scss',
})
export class FinanceMainMenuComponent {
  pageId = 'PRTDV';
  previousValue = '';
  branchDDL: any = [];
  branchValue = '';

  userData = new entUser();
  constructor(
    public appService: AppService,
    public storage: AppStorageService,
    public dialog: CoreService,
    public apiAccountService: AccountsApiService,
    public data: DataService,
    public router: Router,
    public routes: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    await this.data.checkToken();

    await this.getUserData();
    this.appService.setBreadCrumb(this.breadCrumb);
    console.log(this.appService.userData.plstentDDLClass);
  }

  fiscalYear: any;

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  async getUserData() {
    const fisca = await this.storage.get('fisca');

    const fiscalParse = JSON.parse(fisca);
    this.fiscalYear = fiscalParse?.idoBase?.act_company_fiscal_year_id;
    console.log(this.fiscalYear);

    this.storage.get('userData').then(async (val) => {
      this.userData = JSON.parse(JSON.stringify(val));
      this.previousValue = this.userData.branchValue;
      this.branchValue = this.userData.branchValue;
      await this.storage.set('branchvalue', this.branchValue);
      console.log(this.previousValue);
      this.appService.setBreadCrumb(this.breadCrumb);
    });

    await this.storage.get('branchDDL').then((val) => {
      this.branchDDL = val;
    });

    if (this.branchValue !== '') {
      this.changeBranch(this.branchValue);
    }
  }
  async changeBranch(val: any, flag?: any) {
    if (val === '' || val === '--Select--') {
      return;
    }

    if (flag) {
      let msg = `Are you sure change the Branch `;
      let response = await this.dialog.alertPopup(msg);
      console.log(val);

      if (response) {
        this.changeTokenForSelectedBranch(val);
        this.previousValue = this.appService.userData.branchValue;

        this.branchDDL.forEach(async (ele: any) => {
          if (val === ele.constant) {
            await this.storage.set('branchFinance', ele.description);
            await this.storage.set('branchId', ele.id);
            await this.storage.set('branchValue', val);
          }
        });
      } else {
        this.appService.userData.branchValue = this.previousValue;
      }
    } else {
      this.branchDDL.forEach(async (ele: any) => {
        if (val === ele.constant) {
          await this.storage.set('branchFinance', ele.description);
          await this.storage.set('branchId', ele.id);
        }
      });
    }
  }
  async changeTokenForSelectedBranch(val: any) {
    await this.storage.set('branchvalue', val);
    const branck = await this.storage.get('branchvalue');
    console.log(branck);

    const obj = {
      data: val,
    };
    this.apiAccountService
      .changeTokenForSelectedBranch(obj)
      .subscribe((success) => {
        this.appService.userData = success.ientUser;
        this.appService.branchValue = success.ientUser.branchValue;
        this.storage.set('branchName', success.branchName);
        this.storage.set('userData', this.appService.userData);
        this.data.token = success.ientUser.keyToken;
      });
  }

  navigateToAccounts() {
    this.storage.set('Region', 'REGI1');
    this.router.navigateByUrl('/home/corporate/finance-menus');
  }
  navigateToSales() {
    this.router.navigateByUrl('/home/corporate/sales-menus');
  }
  navigateToPurchase() {
    this.router.navigateByUrl('/home/corporate/purchase-menus');
  }
  navigateToInventory() {
    this.router.navigateByUrl('/home/corporate/inventory-menus');
  }
  navigateToTrust() {
    this.storage.set('Region', 'REGIO');
    this.router.navigateByUrl('/home/trustee/finance-menus');
  }
}
