import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Row } from '../../../../app-core/core-component/core-component.component';
import { TreeRootComponent } from '../../../../app-core/template/tree-root.component';
import { Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { DataService } from '../../../../common/services/data/data.service';
import { InitialDataService } from '../../../../common/services/initial-data/initial-data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { AccountsApiService } from '../../../../common/api-services/accounts-api/accounts-api.service';
import { groupData } from '../../group/group-tree/group-tree.component';
import { CoreService } from '../../../../app-core/service/core.service';
import { InputControlComponent } from '../../../../app-core/form-input/input-control/input-control.component';
import { entLedger } from '../../../../common/api-services/accounts-api/accounts-api.classes';
import { FormsModule } from '@angular/forms';
import { AppAccessDirective } from '../../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../../common/permission/button-access.directive';
import { AppStorageService } from '../../../../common/services/app-storage/app-storage.service';


export class ledgerData {
  actLedgerId = 0;
  groupName = '';
  groupNatureDescription = '';
  groupNatureValue = '';
  tabIndex = 0;
  regionValue = '';
}

@Component({
  selector: 'app-ledger-tree',
  standalone: true,
  imports: [Row, TreeRootComponent,
    FormsModule,
    InputControlComponent, AppAccessDirective, ButtonAccessDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './ledger-tree.component.html',
  styleUrl: './ledger-tree.component.scss',
})

export class LedgerTreeComponent {
  pageId = 'ALGSC'
  regionTypeVal = '';
  profitandLoss = new entLedger();
  assetNode: any = [];
  incomeNode: any = [];
  expensiveNode: any = [];
  liablesNode: any = [];

  allLedgerList: any = []

  options = {
    type: 'accountsPath',
  };

  ledgerData = new ledgerData();
  groupData = new groupData();
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  constructor(
    public appService: AppService,
    public data: DataService,
    public urlService: UrlService,
    public router: Router,
    // public dialog: MatDialog,
    public dialog: CoreService,
    public accountsService: AccountsApiService,
    public initialData: InitialDataService,
    public storage: AppStorageService
  ) {
  }
  async ngOnInit(): Promise<void> {
    this.init();
  }

  async init() {
    await this.data.checkToken();
    await this.initialData.getAcccountsDDL('getLedgerInitialData', this.options);
    // this.regionTypeVal = this.initialData.DDLValues.DDLRegion[0].constant;
    // console.log(this.regionTypeVal);

    this.storage.get('Region').then((val: any) => {
      console.log(val);
      if (val !== null || val !== undefined || val !== '') {
        this.regionTypeVal = val;
        this.getAllLedger()
      }
    })
  }


  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }



  navigateDetail() { }

  // addLedger() {
  //   this.router.navigateByUrl('/home/finance/ledger/detail');
  // }

  getAllLedger() {

    const obj = {
      data: this.regionTypeVal
    }
    this.accountsService.getAllLedgerByRegion(obj, this.options).subscribe((success) => {
      this.allLedgerList = success.lstActLedger;
      this.loadListData()
    })
  }

  loadListData() {
   
    if (this.allLedgerList.length === 0) {
      this.assetNode = [];
      this.incomeNode = [];
      this.expensiveNode = [];
      this.liablesNode = [];
    }
    if (this.allLedgerList.length !== 0) {
      this.assetNode = [];
      this.incomeNode = [];
      this.expensiveNode = [];
      this.liablesNode = [];

      for (let i = 0; i < this.allLedgerList.length; i++) {
        if (this.allLedgerList[i].ledgerTypeValue === 'P&L') {
          this.profitandLoss = this.allLedgerList[i];
          console.log(this.profitandLoss);
        } else {
          if (this.allLedgerList[i]?.ientActGroup === null) {
            console.log(this.allLedgerList[i].actCompanyBranchId, 'null');

          }
          if (this.allLedgerList[i].ientActGroup?.groupNatureValue === 'ASSET') {
            this.assetNode.push(this.allLedgerList[i]);
            console.log(this.assetNode, 'assets');
          }
          if (this.allLedgerList[i].ientActGroup?.groupNatureValue === 'LIABT') {
            this.liablesNode.push(this.allLedgerList[i]);
            console.log(this.liablesNode, 'liable');
          }
          if (this.allLedgerList[i].ientActGroup?.groupNatureValue === 'INCME') {
            this.incomeNode.push(this.allLedgerList[i]);
            console.log(this.incomeNode, 'income');
          }
          if (this.allLedgerList[i].ientActGroup?.groupNatureValue === 'EXPNS') {
            this.expensiveNode.push(this.allLedgerList[i]);
            console.log(this.expensiveNode, 'expense');
          }
        }
      }
    }
  }

  async addLedger(val: any) {
    if (val === 'ASSET') {
      this.ledgerData.groupNatureDescription = 'Asset';
      this.ledgerData.groupNatureValue = 'ASSET';
      this.ledgerData.groupName = '';
      this.ledgerData.actLedgerId = 0;
      this.ledgerData.regionValue = this.regionTypeVal
    }
    else if (val === 'INCME') {
      this.ledgerData.groupNatureDescription = 'Income';
      this.ledgerData.groupNatureValue = 'INCME';
      this.ledgerData.groupName = '';
      this.ledgerData.actLedgerId = 0;
      this.ledgerData.regionValue = this.regionTypeVal
    }
    else if (val === 'EXPNS') {
      this.ledgerData.groupNatureDescription = 'Expense';
      this.ledgerData.groupNatureValue = 'EXPNS';
      this.ledgerData.groupName = '';
      this.ledgerData.actLedgerId = 0;
      this.ledgerData.regionValue = this.regionTypeVal
    }
    else if (val === 'LIABT') {
      this.ledgerData.groupNatureDescription = 'Liability';
      this.ledgerData.groupNatureValue = 'LIABT';
      this.ledgerData.groupName = '';
      this.ledgerData.actLedgerId = 0;
      this.ledgerData.regionValue = this.regionTypeVal
    }
    else {
      this.ledgerData = val;
    }

    let ledgerJson = await this.urlService.encode(this.ledgerData);
    let groupJson = await this.urlService.encode(this.groupData);
    this.router.navigateByUrl('/home/finance/ledger/detail/' + ledgerJson + '/' + groupJson)
  }

  async getLedgerDetails(val: any) {
    this.ledgerData.actLedgerId = val;
    let ledgerJson = await this.urlService.encode(this.ledgerData);
    let groupJson = await this.urlService.encode(this.groupData)
    this.router.navigateByUrl('/home/finance/ledger/detail/' + ledgerJson + '/' + groupJson)
  }

  async ledgerDelete(val: any) {
    let msg = `Are you sure, You want to delete this ledger ?`;
    let response = await this.dialog.checkDelete(msg);
    if (response) {
      this.deleteSelectedAccountsLedger(val);
    }
  }

  deleteSelectedAccountsLedger(val: any) {
    const obj = {
      data: val
    }
    this.accountsService.deleteSelectedRowInActLedger(obj, this.options).subscribe((success) => {
      this.allLedgerList = success.lstActLedger;
      this.getAllLedger();

    })
  }

  navigateToAccount() {
    this.router.navigateByUrl('/home/corporate/finance-menus')
  }

  navigateToTrust() {
    this.router.navigateByUrl('/home/trustee/finance-menus')
  }
}
