import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InnerScroll, Row, AppToolTipComponent, ViewLabel } from '../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../app-core/table-status-sort/table-status-sort.component';
import { AccoutsStatusTableComponent } from '../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../app-core/template/search/search.component';
import { AppService } from '../../../app.service';
import { AppAccessDirective } from '../../../common/permission/app-access.directive';
import { ButtonAccessDirective } from '../../../common/permission/button-access.directive';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { CashCounterInfoComponent } from '../cash-counter/cash-counter-info/cash-counter-info.component';
import { Router } from '@angular/router';
import { CoreService } from '../../../app-core/service/core.service';
import { StatusHistoryComponent } from '../../../app-core/template/status-history/status-history.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cost-category-and-cost-center',
  standalone: true,
  imports: [CommonModule,
    AppTableComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    IconButtonComponent,
    InnerScroll,
    InputControlComponent,
    SearchComponent,
    Row,
    FormsModule,
    AppAccessDirective,
    ButtonAccessDirective,
    AppToolTipComponent,
    MatTooltipModule,
    StatusHistoryComponent,
    TableStatusSortComponent,
    AppDatePipe,
    AccoutsStatusTableComponent,
    CashCounterInfoComponent,
    ViewLabel
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './cost-category-and-cost-center.component.html',
  styleUrl: './cost-category-and-cost-center.component.scss'
})
export class CostCategoryAndCostCenterComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  @ViewChild('eventCreation') eventCreation!: TemplateRef<any>;
  @ViewChild('subEventCreation') subEventCreation!: TemplateRef<any>;
  pageId = 'FUDTN';
  element: any;
  tab = 0;

  constructor(
    public router: Router,
    public appService: AppService,
    public dialog: CoreService) { }

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
  };

  columns: any = [
    'slNo',
    'categoryName',
    'createdBy',
    'status',
  ];
  columnsName: any = [
    'slNo',
    'categoryName',
    'createdBy',
    'Status',
  ];
  subColumns: any = [
    'centreName',
    'status',
  ];
  subColumnsName: any = [
    'centreName',
    'status',
  ];

  // columnsAddCategory: any = [
  //   'slNo',
  //   'status',
  //   'createdBy',
  //   'createdDate',
  // ];

  // columnsAddCategoryName: any = [
  //   'slNo',
  //   'status',
  //   'createdBy',
  //   'createdDate',
  // ];

  // columnsAddCentre: any = [
  //   'slNo',
  //   'status',
  //   'createdBy',
  //   'createdDate',
  // ];

  // columnsAddCentreName: any = [
  //   'slNo',
  //   'status',
  //   'createdBy',
  //   'createdDate',
  // ];

  tableData: any = [];
  tableAddCategoryData: any = [];

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

  async openSubEventDialog(element: any) {
    let dialogResponse: any = await this.dialog.openDialog(this.subEventCreation, {
      disableClose: true,
      height: '510px',
      width: '900px',
      maxWidth: '1170px',
      data: {
        data: element,
        clicked: true,
      }
    })
  }

  openStatusValue(val: any) {
    this.tab = val;
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  navigateToTrust(){
    this.router.navigateByUrl('/home/trustee/finance-menus')
  }
}
