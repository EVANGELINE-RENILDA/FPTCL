import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { Row } from '../../../../app-core/core-component/core-component.component';
import { TreeRootComponent } from '../../../../app-core/template/tree-root.component';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { CoreService } from '../../../../app-core/service/core.service';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';

export class groupData {
  groupNatureDescription = '';
  groupNatureValue = '';
  groupName = '';
  actGroupId = 0;
  parentGroupId = 0;
  tabIndex = 0;
  impactProfitLoss = '';
  regionValue = '';
}

@Component({
  selector: 'app-group-tree',
  standalone: true,
  imports: [Row, TreeRootComponent, InputControlComponent, FormsModule, AppAccessDirective, ButtonAccessDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './group-tree.component.html',
  styleUrl: './group-tree.component.scss',
})
export class GroupTreeComponent {
  pageId = 'AGRPS';
  regionValueGroup = '';

  assetNode: any = [];
  liablesNode: any = [];
  incomeNode: any = [];
  expensiveNode: any = [];
  groupViewList: any = [];

  groupData = new groupData();


  options = {
    type: 'accountsPath',
  };

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  groupRegion: any;

  constructor(
    public appService: AppService,
    public accountsService: AccountsApiService,
    public data: DataService,
    public router: Router,
    public url: UrlService,
    public dialog: CoreService,
    public initialData: InitialDataService,
    public storage: AppStorageService,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getLedgerInitialData');
    // this.regionValueGroup = this.initialData.DDLValues.DDLRegion[0].constant;
    // this.getRegion();

    this.storage.get('Region').then((val: any) => {
      console.log(val);
      if (val !== null || val !== undefined || val !== '') {
        this.regionValueGroup = val;
        this.getGroupListBasedOnRegion()
      }
    })
  }

  getGroupListBasedOnRegion() {
    const obj = {
      data: this.regionValueGroup
    }
    this.accountsService.getAllGroupsAndSubGroupByRegion(obj, this.options).subscribe((success) => {
      this.groupViewList = success.lstentActGroup;
      this.loadAllData();
    })
  }

  getRegion() {
    this.initialData.DDLValues.DDLRegion.forEach((elem: any) => {
      if (elem.constant === 'REGI1') {
        this.regionValueGroup = elem.constant
      }
    });

  }


  loadAllData() {
    this.assetNode = [];
    this.liablesNode = [];
    this.incomeNode = [];
    this.expensiveNode = [];
    if (this.groupViewList.length !== 0) {
      this.assetNode = [];
      this.liablesNode = [];
      this.incomeNode = [];
      this.expensiveNode = [];
      for (let i = 0; i < this.groupViewList.length; i++) {
        if (this.groupViewList[i].groupNatureValue === 'ASSET') {
          this.assetNode.push(this.groupViewList[i]);
          console.log(this.assetNode);
        }
        if (this.groupViewList[i].groupNatureValue === 'LIABT') {
          this.liablesNode.push(this.groupViewList[i]);
        }
        if (this.groupViewList[i].groupNatureValue === 'INCME') {
          this.incomeNode.push(this.groupViewList[i]);
        }
        if (this.groupViewList[i].groupNatureValue === 'EXPNS') {
          this.expensiveNode.push(this.groupViewList[i]);
        }
      }
    }
  }

  async addGroup(val: any) {
    if (val.actGroupId === 0 || val.actGroupId === undefined) {
      if (val === 'ASSET') {
        this.groupData.groupNatureDescription = 'Asset';
        this.groupData.groupNatureValue = 'ASSET';
        this.groupData.groupName = '';
        this.groupData.actGroupId = 0;
        this.groupData.parentGroupId = 0;
        this.groupData.regionValue = this.regionValueGroup

      } else if (val === 'INCME') {
        this.groupData.groupNatureDescription = 'Income';
        this.groupData.groupNatureValue = 'INCME';
        this.groupData.groupName = '';
        this.groupData.actGroupId = 0;
        this.groupData.parentGroupId = 0;
        this.groupData.regionValue = this.regionValueGroup;

      } else if (val === 'EXPNS') {
        this.groupData.groupNatureDescription = 'Expense';
        this.groupData.groupNatureValue = 'EXPNS';
        this.groupData.groupName = '';
        this.groupData.actGroupId = 0;
        this.groupData.parentGroupId = 0;
        this.groupData.regionValue = this.regionValueGroup;

      } else if (val === 'LIABT') {
        this.groupData.groupNatureDescription = 'Liability';
        this.groupData.groupNatureValue = 'LIABT';
        this.groupData.groupName = '';
        this.groupData.actGroupId = 0;
        this.groupData.parentGroupId = 0;
        this.groupData.regionValue = this.regionValueGroup;

      } else {
        this.groupData = val;
      }
    } else {
      this.groupData.actGroupId = 0;
      this.groupData.parentGroupId = val.actGroupId;
      this.groupData.groupName = val.groupName;
      this.groupData.groupNatureValue = val.groupNatureValue;
      this.groupData.regionValue = this.regionValueGroup;
      (this.groupData.groupNatureDescription = val.groupNatureDescription),
        (this.groupData.impactProfitLoss = val.impactProfitLoss);
    }
    let urlJson = await this.url.encode(this.groupData);
    this.router.navigateByUrl('/home/finance/group/detail/' + urlJson);
  }

  async navigateGroupDetail(val: any) {
    this.groupData.actGroupId = val.actGroupId;
    this.groupData.groupName = val.groupName;
    this.groupData.groupNatureValue = val.groupNatureValue;
    this.groupData.groupNatureDescription = val.groupNatureDescription;
    let urlJson = await this.url.encode(this.groupData);
    this.router.navigateByUrl('/home/finance/group/detail/' + urlJson);
  }

  async groupDelete(val: any) {

    let msg = `Are you sure, You want to delete this group ?`;
    let response = await this.dialog.checkDelete(msg);

    if (response) {
      this.deleteRowInActGroup(val);
    }
  }

  deleteRowInActGroup(val: any) {
    const obj = {
      data: val.actGroupId,
    };
    this.accountsService
      .deleteRowInActGroup(obj, this.options)
      .subscribe((success) => {
        this.groupViewList = success.lstentActGroup;
        this.loadAllData();
      });
  }

  async accountLockAlert() {
    let msg = `You cannot delete this company group`;
    let response = await this.dialog.notificationDialog(msg);
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  navigateDetail() { }

  // addGroup() {
  //   this.router.navigateByUrl('/home/finance/group/detail');
  // }
  navigateToAccount() {
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }

  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus')
  }
}
