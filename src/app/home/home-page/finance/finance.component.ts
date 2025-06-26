import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { MenuAccessDirective } from '../../../common/permission/menu-access.directive';
import { MenuAccessPipe } from '../../../common/permission/menu-access.pipe';
import { AppService } from '../../../app.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../../../common/services/url/url.service';
import { AppAccessDirective } from '../../../common/permission/app-access.directive';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [MenuAccessDirective, MenuAccessPipe, RouterModule, FormsModule, AppAccessDirective, JsonPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.scss'
})
export class FinanceComponent {
  pageId = 'PRTDV';
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  constructor(public appService: AppService,
    public urlService: UrlService,
    public url: UrlService, public router: Router) { }
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
  navigateToCorporate() {
    this.router.navigateByUrl('/home/finance/menus')
  }
  async navigateToDetail() {
    const obj = {
      data: 0
    }
    let urlJson = await this.urlService.encode(obj);
    this.router.navigateByUrl('/home/finance/report/bank-reconciliation/detail/' + urlJson);
  }
}
