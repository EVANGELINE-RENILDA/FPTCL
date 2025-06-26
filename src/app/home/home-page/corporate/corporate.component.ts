import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../../app.service';
import { UrlService } from '../../../common/services/url/url.service';
import { AppAccessDirective } from '../../../common/permission/app-access.directive';
import { MenuAccessDirective } from '../../../common/permission/menu-access.directive';

@Component({
  selector: 'app-corporate',
  standalone: true,
  imports: [RouterModule, FormsModule, AppAccessDirective, MenuAccessDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './corporate.component.html',
  styleUrl: './corporate.component.scss'
})
export class CorporateComponent {
  pageId = 'PRTDV'
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  constructor(public appService: AppService, public url: UrlService, public router: Router) { }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
}
