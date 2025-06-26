import { CUSTOM_ELEMENTS_SCHEMA, Component, TemplateRef, ViewChild } from '@angular/core';
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
  selector: 'app-credit-summary-report-detail',
  standalone: true,
  imports: [IconButtonComponent,AppTableComponent,SearchComponent,TableStatusSortComponent,InputControlComponent,InnerScroll,Row,CellDefDirective,CellHeaderDefDirective,ViewLabel],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './credit-summary-report-detail.component.html',
  styleUrl: './credit-summary-report-detail.component.scss'
})
export class CreditSummaryReportDetailComponent {
 
    __selectedItems: any;
    @ViewChild('breadCrumb') breadCrumb!: TemplateRef<any>;
    columns: any = ["name","docNo", "vendName", "date", "createdDate", "appDate", "postDate","debit","credit","status","narration","details",];
    columnsName: any = [ "#","", "Doc Number", "Doc Date", "Voucher Name", "Vendor Name	","Invoice Value","Balance Due","0 - 30 Days Due	","31 - 60 Days Due","61 - 90 Days Due	","90 Days Due",,];
  constructor(public dialog: CoreService,
    public router: Router,
    public appService: AppService,
    
  ){
  
  }
    tableData: any = [
      {
        'name':'1',
      'docNo': '',
       'vendName': 'PIS_CHE20240501',
      'date': '12/06/2023',
       'createdDate': 'Purchase Invoice - Service',
      'appDate': 'joe1',
      'postDate': '24.82',
      'debit': '4.82',
      'credit':'	0.00	',
      'status':'0.00	',
      'narration':'0.00	',
      'details':'4.82',
      'due':'',
      // "action":''
  
  
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

