import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewLabel, Row } from '../../../../../app-core/core-component/core-component.component';
import { ErrorInfoComponent } from '../../../../../app-core/error-info/error-info.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { ErrorMessageComponent } from '../../../../../app-core/message/error-message/error-message.component';
import { CoreService } from '../../../../../app-core/service/core.service';
import { CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { StatusHistory1Component } from '../../../../../app-core/template/status-history1/status-history1.component';
import { AppService } from '../../../../../app.service';
import { AppDatePipe } from '../../../../../common/pipes/app-date/app-date.pipe';
import { AboveThresholdComponent } from '../../../../trust/trust-withdrawal/trust-withdrawal-detail/trust-withdrawal-process/above-threshold/above-threshold.component';
import { DetermineThresholdComponent } from '../../../../trust/trust-withdrawal/trust-withdrawal-detail/trust-withdrawal-process/determine-threshold/determine-threshold.component';
import { InspectionComponent } from '../../../../trust/trust-withdrawal/trust-withdrawal-detail/trust-withdrawal-process/inspection/inspection.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';

@Component({
  selector: 'app-budget-ceiling-detail',
  standalone: true,
  imports: [ViewLabel, FormsModule, InputControlComponent, AppDatePipe, StatusHistory1Component, CellDefDirective, CellHeaderDefDirective, ErrorInfoComponent, ErrorMessageComponent, AboveThresholdComponent, DetermineThresholdComponent, InspectionComponent, IconButtonComponent, Row],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './budget-ceiling-detail.component.html',
  styleUrl: './budget-ceiling-detail.component.scss'
})
export class BudgetCeilingDetailComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;

  year=[]

  editable: any = false;

  editBtn() {
    this.editable = true;
  }

  constructor(public dialog: CoreService,
    public router: Router,
    public appService: AppService) { }

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
}
