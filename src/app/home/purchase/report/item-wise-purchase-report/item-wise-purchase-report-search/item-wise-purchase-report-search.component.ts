import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { InnerScroll, Row } from '../../../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../../../app-core/form-input/input-control/input-control.component';
import { TableStatusSortComponent } from '../../../../../app-core/table-status-sort/table-status-sort.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../../../app-core/template/app-table/app-table.component';
import { IconButtonComponent } from '../../../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../../../app-core/template/search/search.component';
import { Router } from '@angular/router';
import { CoreService } from '../../../../../app-core/service/core.service';
import { AppService } from '../../../../../app.service';

@Component({
  selector: 'app-item-wise-purchase-report-search',
  standalone: true,
  imports: [IconButtonComponent,AppTableComponent,SearchComponent,TableStatusSortComponent,InputControlComponent,InnerScroll,Row,CellDefDirective,CellHeaderDefDirective,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './item-wise-purchase-report-search.component.html',
  styleUrl: './item-wise-purchase-report-search.component.scss'
})
export class ItemWisePurchaseReportSearchComponent {
  @Input() public defaultOption: string = '';
  columns: any = ["name","docNo", "vendName", "date", "action"];
  columnsName: any = [ "Name of the Vendor","QTY	", "Value", "Open",""];
  __selectedItems: any;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  constructor(public dialog: CoreService,
    public router: Router,
    public appService: AppService,
    
  ){
  
  }
  tableData: any = [
    {
    'docNo': '',
     'vendName': '',
    'date': '',
     'createdDate': '',
   


  },
  ];
  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  }
  pageChanged(event: any) {
  
  }
  onSelect(event: any) {
    this.__selectedItems = event;
    console.log(this.__selectedItems);
  }
  navigateToDetail(){
    this.router.navigateByUrl('/home/purchase/report/item-wise-purchase-report-detail')
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
}
