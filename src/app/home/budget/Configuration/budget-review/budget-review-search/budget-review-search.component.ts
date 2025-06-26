import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { CoreService } from '../../../../../app-core/service/core.service';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { AppService } from '../../../../../app.service';

@Component({
  selector: 'app-budget-review-search',
  standalone: true,
  imports: [IconButtonComponent, AppTableComponent, SearchComponent, TableStatusSortComponent, InputControlComponent, InnerScroll, Row, FormsModule, CellDefDirective, CellHeaderDefDirective, ViewLabel],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './budget-review-search.component.html',
  styleUrl: './budget-review-search.component.scss'
})
export class BudgetReviewSearchComponent {
  pageId = 'FUDTN';

  @ViewChild('eventCreation') eventCreation!: TemplateRef<any>;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  columns: any = ["fiscalYear", "budgetName", "createdDate", "createdBy", "status","detail"];
  columnsName: any = ["fiscalYear", "budgetName", "createdDate", "createdBy", "status", ""];

  tableData: any = [
    {
      'fiscalYear': '12-09-2002',
      'budgetName': 'asas',
      'createdDate': '12-09-2002',
      'createdBy': 'asas',
      'status': 'ok',
      'detail': ''
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

  navigateToDetail() {
    this.router.navigateByUrl('home/budget/configuration/budget-review/detail/:id')
  }

  ngOnInit(): void {
    // this.init();
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
}