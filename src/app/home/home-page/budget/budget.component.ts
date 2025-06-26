import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppService } from '../../../app.service';
import { MenuAccessDirective } from '../../../common/permission/menu-access.directive';
import { MenuAccessPipe } from '../../../common/permission/menu-access.pipe';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [MenuAccessDirective, MenuAccessPipe, RouterModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  constructor(public appService: AppService) { }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
}
