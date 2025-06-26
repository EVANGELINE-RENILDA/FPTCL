import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AppService } from '../../../../../app.service';

@Component({
  selector: 'app-purchase-order-outstanding-detail',
  standalone: true,
  imports: [IconButtonComponent,AppTableComponent,SearchComponent,TableStatusSortComponent,InputControlComponent,InnerScroll,Row,CellDefDirective,CellHeaderDefDirective,ViewLabel],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './purchase-order-outstanding-detail.component.html',
  styleUrl: './purchase-order-outstanding-detail.component.scss'
}) 
export class PurchaseOrderOutstandingDetailComponent {
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  constructor(  public appService: AppService,){

  }
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  columns: any = ['header', 'docDate', 'voucherType', 'vendorName', 'supplierInvoiceNo', 'branch', 'vendorTin', 'grossAmt', ];
  columnsName: any = ["#", "Document Type", "Branch Name", "Document Name", "Document Number", "Document Date", "Qty	", "Unit", ];
  tableData: any = [{ 
    'header':'1',
    'docDate':'Purchase Order',
    'voucherType':'CHENNAI',
    'vendorName':'Purchase Order - Service',
     'supplierInvoiceNo':'20240002',
     'branch':'02/12/2023	',
     'vendorTin':'10.00',
     'grossAmt':'EACH'
   }]
  pageChanged(event: any) {
    // this.searchParams.pageNumber = event.pageNumber;
    // this.searchParams.pageSize = event.pageSize;
    // this.searchTrustApplication();

  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
}
