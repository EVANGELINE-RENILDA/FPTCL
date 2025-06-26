import {
  AfterContentInit,
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PaginationPipe } from './paginator/pagination.pipe';
import { PaginatorComponent } from './paginator/paginator.component';
import { CommonModule, NgClass, NgTemplateOutlet } from '@angular/common';
import { InnerScroll } from '../../core-component/core-component.component';
import { EmptyStateComponent } from '../empty-state';

@Directive({
  selector: '[cellDef]',
  standalone: true,
})
export class CellDefDirective {
  @Input() cellDef!: string;
  constructor(public template: TemplateRef<any>) { }
}

@Directive({
  selector: '[cellHeaderDef]',
  standalone: true,
})
export class CellHeaderDefDirective {
  @Input() cellHeaderDef!: string;
  constructor(public template: TemplateRef<any>) { }
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    PaginationPipe,
    CellDefDirective,
    PaginatorComponent,
    InnerScroll,
    NgClass, EmptyStateComponent
  ],
  templateUrl: './app-table.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './app-table.component.scss',
})
export class AppTableComponent
  implements OnInit, AfterViewInit, AfterContentInit {
  __columns: any = [];
  __columnsName: any = [];
  __columnID = '';
  __dataSource: any = [];
  __hidePaginator = false;
  __sortColumnsName: any = [];

  __pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
    sortColumnName: '',
    sortOrder: false
  };
  __hasPagination = false;
  __tableClass = '';
  __tableFlexClass = '';
  __selectedData: any = {
    currentIndex: 0,
    array: [],
  };
  __hideSelectAll = false;

  __cusClass = '';

  @Input() set cusClass(cusClass: string) {
    this.__cusClass = cusClass || '';
  }
  get cusClass(): any {
    return this.__cusClass;
  }

  @Input() set sortColumnsName(sortColumnsName: any) {
    this.__sortColumnsName = sortColumnsName || [];
  }
  get sortColumnsName(): any {
    return this.__sortColumnsName;
  }
  __hasHeader = true;
  @Input() set hasHeader(hasHeader: boolean) {
    this.__hasHeader = hasHeader || false;
  }
  get hasHeader(): any {
    return this.__hasHeader;
  }

  __showPaginator = true;
  @Input() set showPaginator(showPaginator: boolean) {
    this.__showPaginator = showPaginator || false;
  }
  get showPaginator(): any {
    return this.__showPaginator;
  }
  __tableHeader = '';
  @Input() set tableHeader(tableHeader: string) {
    this.__tableHeader = tableHeader || '';
  }
  get tableHeader(): any {
    return this.__tableHeader;
  }

  @Input() set tableClass(tableClass: string) {
    this.__tableClass = tableClass || '';
  }
  get tableClass(): any {
    return this.__tableClass;
  }

  @Input() set tableFlexClass(tableFlexClass: string) {
    this.__tableFlexClass = tableFlexClass || '';
  }
  get tableFlexClass(): any {
    return this.__tableFlexClass;
  }

  __panelClass = '';

  @Input() set panelClass(panelClass: string) {
    this.__panelClass = panelClass || '';
  }
  get panelClass(): any {
    return this.__panelClass;
  }

  @Input() set hasPagination(hasPagination: boolean) {
    this.__hasPagination = hasPagination || false;
  }
  get hasPagination(): any {
    return this.__hasPagination;
  }

  @Input() set pagination(pagination: any) {
    this.__pagination = pagination || {
      pageNumber: 1,
      pageSize: 25,
      totalCount: 0,
    };
  }
  get pagination(): any {
    return this.__pagination;
  }

  @Input() set columns(column: any) {
    this.__columns = column || [];
  }
  get columns(): any {
    return this.__columns;
  }

  @Input() set columnsName(columnsName: any) {
    this.__columnsName = columnsName || [];
  }
  get columnsName(): any {
    return this.__columnsName;
  }

  @Input() set columnID(columnID: any) {
    this.__columnID = columnID || '';
  }
  get columnID(): any {
    return this.__columnID;
  }

  @Input() set dataSource(dataSource: any) {
    this.__dataSource = dataSource || [];
    if (this.__hasPagination) {
      this.__pagination = {
        pageNumber: 1,
        pageSize: 10,
        totalCount: this.__dataSource.length,
        sortColumnName: '',
        sortOrder: false
      };
    }
  }
  get dataSource(): any {
    return this.__dataSource;
  }

  @Input() set hidePaginator(hidePaginator: boolean) {
    this.__hidePaginator = hidePaginator || false;
  }
  get hidePaginator(): boolean {
    return this.__hidePaginator;
  }

  @Input() set hideSelectAll(hideSelectAll: boolean) {
    this.__hideSelectAll = hideSelectAll || false;
  }
  get hideSelectAll(): boolean {
    return this.__hideSelectAll;
  }

  @ViewChild('tableData') tableData!: any;

  @ContentChildren(CellDefDirective)
  cellDefs!: QueryList<CellDefDirective>;

  @ContentChildren(CellHeaderDefDirective)
  cellHeaderDefs!: QueryList<CellHeaderDefDirective>;

  @ContentChildren('slotRight')
  slotRight!: QueryList<any>;

  @ContentChildren('slotLeft')
  slotLeft!: QueryList<any>;

  @ContentChildren('slotMiddle')
  slotMiddle!: QueryList<any>;

  cellTemplates: { [key: string]: TemplateRef<any> } = {};
  cellHeaderTemplates: { [key: string]: TemplateRef<any> } = {};

  slotRightTemplate!: TemplateRef<any>;
  slotLeftTemplate!: TemplateRef<any>;
  slotMiddleTemplate!: TemplateRef<any>;
  @Output('pageChanged') pageChanged: EventEmitter<any> = new EventEmitter();
  // @Output('sortChanged') sortChanged: EventEmitter<any> = new EventEmitter();
  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() { }

  ngAfterContentInit() {
    this.cellDefs.forEach((cellDef: CellDefDirective) => {
      this.cellTemplates[cellDef.cellDef] = cellDef.template;
    });
    this.cellHeaderDefs.forEach((cellHeaderDef: CellHeaderDefDirective) => {
      this.cellHeaderTemplates[cellHeaderDef.cellHeaderDef] =
        cellHeaderDef.template;
    });
    this.slotRight.forEach((slotRight: any) => {
      this.slotRightTemplate = slotRight;
    });
    this.slotLeft.forEach((slotLeft: any) => {
      this.slotLeftTemplate = slotLeft;
    });
    this.slotMiddle.forEach((slotMiddle: any) => {
      this.slotMiddleTemplate = slotMiddle;
    });
  }

  onPageChanged(event: any) {
    this.__pagination.pageNumber = event.pageNumber;
    this.__pagination.pageSize = event.pageSize;
    this.pageChanged.emit(event);
  }

  selectedAllClicked(event: any) {
    this.__selectedData.array = [];
    if (event.target.checked) {
      this.__dataSource.forEach((element: any) => {
        this.__selectedData.array.push(element[this.columnID]);
      });
    }
    this.__selectedData.currentIndex = 0;
    this.onSelect.emit(this.__selectedData);
  }

  selectedSingleClicked(event: any, data: any) {
    if (event.target.checked) {
      this.__selectedData.array.push(data[this.columnID]);
    } else {
      let index = this.__selectedData.array.indexOf(data[this.columnID]);
      if (index > -1) {
        this.__selectedData.array.splice(index, 1);
      }
    }
    this.__selectedData.currentIndex = 0;
    this.onSelect.emit(this.__selectedData);
  }

  hasSelected(data: any) {
    let index = this.__selectedData.array.indexOf(data[this.columnID]);
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }

  doSort(columnsName: any) {
    // 
    if (this.__sortColumnsName.includes(columnsName)) {
      if(this.__pagination.sortColumnName === columnsName){
        this.__pagination.sortOrder = !this.__pagination.sortOrder
      } else {
        this.__pagination.sortColumnName = columnsName;
        this.__pagination.sortOrder = true;
      }
      this.pageChanged.emit(this.__pagination);
    }
  }
}
