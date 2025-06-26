import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppService } from '../../../../../app.service';
import { CoreService } from '../../../../../app-core/service/core.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-budget-configuration-search',
  standalone: true,
  imports: [IconButtonComponent, AppTableComponent, SearchComponent, TableStatusSortComponent, InputControlComponent, InnerScroll, Row, FormsModule, CellDefDirective, CellHeaderDefDirective, ViewLabel],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './budget-configuration-search.component.html',
  styleUrl: './budget-configuration-search.component.scss'
})
export class BudgetConfigurationSearchComponent {
  pageId = 'FUDTN';


  @ViewChild('eventCreation') eventCreation!: TemplateRef<any>;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  columns: any = ["budgetName", "fiscalYear", "budgetType", "addedBy", "addedDate", "detail"];
  columnsName: any = ["budgetName", "fiscalYear", "budgetType", "addedBy", "addedDate", ''];

  tableData: any = [
    {
      'budgetName': 'asas',
      'fiscalYear': '12-09-2002',
      'budgetType': 'as',
      'addedBy': '12-09-2002',
      'addedDate': '12-09-2002',
      'action': ''
    }
  ];

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }

  element: any;

  constructor(public dialog: CoreService,
    public router: Router,
    public appService: AppService) { }

  pageChanged(event: any) {

  }

  async openDialog(element: any) {
    let dialogResponse: any = await this.dialog.openDialog(this.eventCreation, {
      disableClose: true,
      height: '510px',
      width: '900px',
      maxWidth: '1170px',
      data: {
        data: element,
        clicked: true,
      }
    });
  }

  navigateToDetail() {
    this.router.navigateByUrl('home/budget/configuration/budget-configuration/detail/')
  }

  ngOnInit(): void {
    // this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
}