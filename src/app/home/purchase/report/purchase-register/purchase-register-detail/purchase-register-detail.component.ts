import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InnerScroll, Row, ViewLabel } from '../../../../../app-core/core-component/core-component.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { Router } from '@angular/router';
import { AppService } from '../../../../../app.service';
import { DataService } from '../../../../../common/services/data/data.service';

@Component({
  selector: 'app-purchase-register-detail',
  standalone: true,
  imports: [AppTableComponent,
    FormsModule,
    SearchComponent,
    IconButtonComponent,
    InnerScroll,
    Row,
    ViewLabel,
    CellDefDirective,
    CellHeaderDefDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './purchase-register-detail.component.html',
  styleUrl: './purchase-register-detail.component.scss'
})
export class PurchaseRegisterDetailComponent {
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  columns: any = ['', 'docDate', 'voucherType', 'vendorName', 'supplierInvoiceNo', 'branch', 'vendorTin', 'grossAmt', 'vatAmt', 'roundOffAmt', 'netAmt'];
  columnsName: any = ["#", "", "", "", "Supplier Invoice No", "Branch", "Vendor TIN No", "Gross Amt", "Vat Amt", "Round off Amt", "Net Amt"];
  tableData: any = [{ 'docDate': '06 Jan 2024', 'docNo': 'PIS_CHE20240501', 'voucherType': 'Purchase Invoice', 'voucherName': 'Purchase Invoice - Service', 'vendorName': 'joe1', 'vendorLedger': 'Vendor Payable Account', 'supplierInvoiceNo': 'PIS_CHE20240501', 'branch': 'CHENNAI', 'vendorTin': '', 'grossAmt': '21.78', 'vatAmt': '3.04	', 'roundOffAmt': '0.00', 'netAmt': '24.82' }];
  @ViewChild('appSearch') appSearch!: SearchComponent;

  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  constructor(public router: Router, public appService: AppService, public data: DataService) { }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
  pageChanged(event: any) {
    // this.searchParams.pageNumber = event.pageNumber;
    // this.searchParams.pageSize = event.pageSize;
    // this.searchTrustApplication();

  }
  onSearch() {
    this.data.successMessage('Search Executed Successfully');


  }
  createPurchaseRegisterSearch() {

  }
  searchPurchaseRegister() {

  }
  navigateToList() {
    this.router.navigateByUrl('/home/purchase/report/purchase-register')
  }
}
