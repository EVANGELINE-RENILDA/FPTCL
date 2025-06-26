import { Component, CUSTOM_ELEMENTS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
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
  selector: 'app-statement-of-account-soa',
  standalone: true,
  imports: [IconButtonComponent, AppTableComponent, SearchComponent, TableStatusSortComponent, InputControlComponent, InnerScroll, Row, CellDefDirective, CellHeaderDefDirective, ViewLabel],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './statement-of-account-soa.component.html',
  styleUrl: './statement-of-account-soa.component.scss'
})
export class StatementOfAccountSoaComponent {
  __selectedItems: any;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  columns: any = ["slno", "docNo", "docDate", "VoucName", "vendName", "invoiceValue", "balanceDue", "createdDate", "appDate", "postDate", "debit"];
  columnsName: any = ["Doc Date","Doc No", "Voucher Type", "Customer Ref Number", "Shipping Address", "Currency", "Sales Value","Receipt Value","Balance"];

  constructor(public dialog: CoreService,
    public router: Router,
    public appService: AppService) { }

    tableData: any = [
      {
        'slno': '1',
        'docNo': 'PI - 20240400003',
        'docDate':'04/02/2024',
        'VoucName': 'Purchase Invoice - Inventory N',
        'vendName': 'SRI CR',
        'invoiceValue': '50,000.50',
        'balanceDue': '50,000.50',
        'createdDate': '0.00',
        'appDate': '0.00',
        'postDate': '0.00',
        'debit': '50,000.50',

      }];

  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  navigateToSales(){
    this.router.navigateByUrl('/home/corporate/sales-menus')
  }
  navigateToList(){
    this.router.navigateByUrl('/home/sales/statement-of-account/search')
  }
}
