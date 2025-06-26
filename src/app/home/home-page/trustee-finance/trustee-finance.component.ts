import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { MenuAccessDirective } from '../../../common/permission/menu-access.directive';
import { MenuAccessPipe } from '../../../common/permission/menu-access.pipe';
import { AppService } from '../../../app.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../../../common/services/url/url.service';
import { Row } from '../../../app-core/core-component/core-component.component';
import { AppAccessDirective } from '../../../common/permission/app-access.directive';

@Component({
  selector: 'app-trustee-finance',
  standalone: true,
  imports: [MenuAccessDirective, MenuAccessPipe, RouterModule, FormsModule, Row, AppAccessDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trustee-finance.component.html',
  styleUrl: './trustee-finance.component.scss'
})
export class TrusteeFinanceComponent {
  pageId = "PRTDV"
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  constructor(public appService: AppService, public url: UrlService, public router: Router) { }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  async submenuClickNavigate() {

    const obj = {
      data: 0,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl('/home/finance/ledger-summary/ledger-summary-detail/' + urlJson);
  }
  navigateToTrust() {
    this.router.navigateByUrl('home/finance/menus')
  }

  async navigateToDetail() {
    const obj = {
      data: 0
    }
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl('/home/finance/report/bank-reconciliation/detail/' + urlJson);
  }

  async getChangeDetailReceipt(){
    const obj = {
      type: 'change'
    }
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl('/home/finance/receipt-trust-and-estate/search/' + urlJson);
  }
  async getReceipt(){
    const obj = {
      type: 'new'
    }
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl('/home/finance/receipt-trust-and-estate/search/' + urlJson);
  }
  async getReversalReceipt(){
    const obj = {
      type: 'reversal'
    }
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl('/home/finance/receipt-trust-and-estate/search/' + urlJson);
  }
}
