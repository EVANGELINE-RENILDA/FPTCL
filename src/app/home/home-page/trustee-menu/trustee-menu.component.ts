import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { MenuAccessDirective } from '../../../common/permission/menu-access.directive';
import { MenuAccessPipe } from '../../../common/permission/menu-access.pipe';
import { AppService } from '../../../app.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../../../common/services/url/url.service';
import { AppAccessDirective } from '../../../common/permission/app-access.directive';

@Component({
  selector: 'app-trustee-menu',
  standalone: true,
  imports: [MenuAccessDirective, MenuAccessPipe, RouterModule, FormsModule, AppAccessDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trustee-menu.component.html',
  styleUrl: './trustee-menu.component.scss'
})
export class TrusteeMenuComponent {
  pageId = 'PRTDV';
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  constructor(public appService: AppService, public url: UrlService, public router: Router) { }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
}
