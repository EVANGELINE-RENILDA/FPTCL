import { CommonModule, NgClass } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { AppToolTipComponent, InnerScroll, Row, ViewLabel } from "../../../app-core/core-component/core-component.component";
import { TimeControlComponent } from "../../../app-core/form-input/time-control/time-control.component";
import { AppTableComponent } from "../../../app-core/template/app-table/app-table.component";
import { IconButtonComponent } from "../../../app-core/template/icon-button/icon-button.component";
import { FormsModule } from "@angular/forms";
import { InputControlComponent } from "../../../app-core/form-input/input-control/input-control.component";
import { AppDatePipe } from "../../../common/pipes/app-date/app-date.pipe";
import { ErrorMessageComponent } from "../../../app-core/message/error-message/error-message.component";
import { AppAccessDirective } from "../../../common/permission/app-access.directive";
import { ButtonAccessDirective } from "../../../common/permission/button-access.directive";
import { FooterToggleDirective } from "../../../app-core/directives/toggle-directive/footer-toggle.directive";
import { MatMenuModule } from "@angular/material/menu";
import { DropZoneComponent } from "../../../app-core/template/drop-zone/drop-zone.component";
import { ViewPdfComponent } from "../../../app-core/template/view-pdf/view-pdf.component";
import { SearchDebitComponent } from "../../search/search-debit/search-debit.component";
import { SearchCreditComponent } from "../../search/search-credit/search-credit.component";
import { FilterAndSortPipe } from "../../../app-core/form-input/pipes/filter-and-sort/filter-and-sort.pipe";
import { AppSafePipe } from "../../../common/pipes/app-safe/app-safe.pipe";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CashCounterInfoComponent } from "../../finance/cash-counter/cash-counter-info/cash-counter-info.component";
import { entCashCounter } from "../../../common/api-services/application-api/application-api.classes";
import { CoreService } from "../../../app-core/service/core.service";
import { Router } from "@angular/router";
import { AppService } from "../../../app.service";
@Component({
  selector: 'app-journal-receipt',
  standalone: true,
  imports: [
    NgClass,
    Row,
    ViewLabel,
    TimeControlComponent,
    AppTableComponent,
    IconButtonComponent,
    InnerScroll,
    FormsModule,
    InputControlComponent,
    AppDatePipe,
    ErrorMessageComponent,
    AppAccessDirective,
    ButtonAccessDirective,
    AppToolTipComponent,
    FooterToggleDirective,
    MatMenuModule,
    DropZoneComponent,
    ViewPdfComponent,
    SearchDebitComponent,
    SearchCreditComponent,
    FilterAndSortPipe,
    ViewPdfComponent,
    AppSafePipe,
    CommonModule,
    MatCheckboxModule,
    CashCounterInfoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './journal-receipt.component.html',
  styleUrl: './journal-receipt.component.scss'
})
export class JournalReceiptComponent implements OnInit {
  cashCounter = new entCashCounter();
  pageId = '';
  event = '';
  edit = false;
  tableData = [];
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  constructor(
    public dialog: CoreService,
    public router: Router,
    public appService: AppService
  ) {

  }
  ngOnInit() {

  }

  editCashCounter() {

  }
  showCashCounter() {

  }
  navigateToList() {
    // this.router.navigateByUrl('/home/config//search');
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
}
