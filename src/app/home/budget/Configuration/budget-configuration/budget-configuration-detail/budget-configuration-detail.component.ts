import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewLabel, Row } from '../../../../../app-core/core-component/core-component.component';
import { ErrorInfoComponent } from '../../../../../app-core/error-info/error-info.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../../app-core/message/error-message/error-message.component';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AccordionModule } from '../../../../../app-core/template/accordion/accordion.module';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { CheckboxComponent } from '../../../../../app-core/template/checkbox/checkbox.component';
import { DropZoneComponent } from '../../../../../app-core/template/drop-zone/drop-zone.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { StatusHistory1Component } from '../../../../../app-core/template/status-history1/status-history1.component';
import { TabGroupComponent, TabComponent } from '../../../../../app-core/template/tab/tab';
import { TabSubComponent, TabSubGroupComponent } from '../../../../../app-core/template/tab/tab1';
import { AppService } from '../../../../../app.service';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { CourtOrderComponent } from '../../../../trust/trust-application/trust-application-dummy/court-order/court-order.component';
import { AboveThresholdComponent } from '../../../../trust/trust-withdrawal/trust-withdrawal-detail/trust-withdrawal-process/above-threshold/above-threshold.component';
import { BelowThresholdComponent } from '../../../../trust/trust-withdrawal/trust-withdrawal-detail/trust-withdrawal-process/below-threshold/below-threshold.component';
import { DetermineThresholdComponent } from '../../../../trust/trust-withdrawal/trust-withdrawal-detail/trust-withdrawal-process/determine-threshold/determine-threshold.component';
import { InspectionComponent } from '../../../../trust/trust-withdrawal/trust-withdrawal-detail/trust-withdrawal-process/inspection/inspection.component';

@Component({
  selector: 'app-budget-configuration-detail',
  standalone: true,
  imports: [ViewLabel, Row, FormsModule, TabGroupComponent, TabComponent, AccordionModule, IconButtonComponent, InputControlComponent, AppDatePipe, StatusHistory1Component, CheckboxComponent, TabSubComponent, TabSubGroupComponent, AppTableComponent, DropZoneComponent, CellDefDirective, CellHeaderDefDirective, ErrorInfoComponent, ErrorMessageComponent, AboveThresholdComponent, BelowThresholdComponent, CourtOrderComponent, DetermineThresholdComponent, InspectionComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './budget-configuration-detail.component.html',
  styleUrl: './budget-configuration-detail.component.scss'
})
export class BudgetConfigurationDetailComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  // @ViewChild('notesDialog', { static: false })

  columns: any = [
    'department',
    'userName',
    'addedTime',
    'changedTime',
    'edit',
    'delete'
  ]
  columnsName: any =
    [
      'Department',
      'User Name',
      'Added by/Added date',
      'Changed by/Changed date',
      'Edit', 'Delete'
    ]
  tableData = [
    {
      'department': 'as',
      'userName': 'as',
      'addedTime': 'as',
      'changedTime': 'as',
      'edit': 'edit',
      'delete': 'delete'
    }
  ]

  columns1: any = [
    'ledgerInfo',
    'ledgerType',
    'addedTime',
    'changedTime',
    'edit',
    'delete'
  ]
  columnsName1: any =
    [
      'Ledger Info',
      'Ledger Type',
      'Added by/Added date',
      'Changed by/Changed date',
      'Edit', 'Delete'
  ]
  tableData1 = [
    {
      'ledgerInfo': 'as',
      'ledgerType': 'as',
      'addedTime': 'as',
      'changedTime': 'as',
      'edit': 'edit',
      'delete': 'delete'
    }
  ]

  constructor(public dialog: CoreService,
    public router: Router,
    public appService: AppService) { }

  onTabChange(event: any) {
    switch (event.tabTitle) {
    }
  }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
}