import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { MenuAccessDirective } from '../../../common/permission/menu-access.directive';
import { MenuAccessPipe } from '../../../common/permission/menu-access.pipe';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../app.service';
import { AppAccessDirective } from '../../../common/permission/app-access.directive';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [MenuAccessDirective, MenuAccessPipe, RouterModule, FormsModule, AppAccessDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {
  pageId = 'PRTDV'
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  constructor(public appService: AppService,
    public router : Router

  ) { }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  navigateToCorporate(){
    this.router.navigateByUrl('/home/finance/menus')
  }
}
