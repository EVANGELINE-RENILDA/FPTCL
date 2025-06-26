import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MenuAccessDirective } from '../../../common/permission/menu-access.directive';
import { MenuAccessPipe } from '../../../common/permission/menu-access.pipe';
import { AppService } from '../../../app.service';
import { UrlService } from '../../../common/services/url/url.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [MenuAccessDirective, MenuAccessPipe, RouterModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  constructor(public appService: AppService,public url: UrlService, public router: Router) { }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  async submenuClickNavigate() {

    const obj = {
      data: 0,
    };
    let urlJson = await this.url.encode(obj);
    this.router.navigateByUrl('/home/sales/Debtors-summary/detail/' + urlJson);
  }
  navigateToCorporate(){
    this.router.navigateByUrl('/home/finance/menus')
  }
}
