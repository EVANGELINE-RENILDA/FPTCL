import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
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
  selector: 'app-purchase-order-outstanding-search',
  standalone: true,
  imports: [IconButtonComponent,AppTableComponent,SearchComponent,TableStatusSortComponent,InputControlComponent,InnerScroll,Row,CellDefDirective,CellHeaderDefDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './purchase-order-outstanding-search.component.html',
  styleUrl: './purchase-order-outstanding-search.component.scss'
})
export class PurchaseOrderOutstandingSearchComponent {
  __selectedItems: any;
  @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
  columns: any = ["name","docNo", "vendName", "date", "createdDate", "appDate", "postDate","debit","credit","status","narration","details","due","action"];
  columnsName: any = [ "","", "Ledger Name", "Ledger Type", "Document Date", "Posted Date","Debit(INR)","Credit(INR)","Status","Narration","","","",""];
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
    'appDate': '',
    'postDate': '',
    'debit': '',
    'credit':'	',
    'status':'',
    'narration':'',
    'details':'',
    'due':'',
    "action":''


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
    this.router.navigateByUrl('/home/purchase/report/purchase-order-outstanding/detail')
  }
  ngAfterViewInit(): void {
    this.appService.setBreadCrumb(this.breadCrumb);
  }
}
