import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MenuAccessDirective } from '../../../common/permission/menu-access.directive';
import { MenuAccessPipe } from '../../../common/permission/menu-access.pipe';
import { AppService } from '../../../app.service';
import { UrlService } from '../../../common/services/url/url.service';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [MenuAccessDirective, MenuAccessPipe, RouterModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss'
})
export class PurchaseComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  constructor(public appService: AppService,
    public url : UrlService,
    public router : Router
  ) { }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }

  async navigatecreditorsdetail() {
    const obj = {
      data: 0,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl(
      '/home/purchase/report/creditors-detail-report/detail/' + urlJson
    );
  }
  navigateToCorporate(){
    this.router.navigateByUrl('/home/finance/menus')
  }
}
