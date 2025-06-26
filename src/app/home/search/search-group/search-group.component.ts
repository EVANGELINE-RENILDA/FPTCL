import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Optional, output, Output, Self, TemplateRef, ViewChild } from '@angular/core';
import { AutoCompleteComponent } from '../../../app-core/form-input/auto-complete/auto-complete.component';
import { FormInputControl } from '../../../app-core/form-input/form-input-control';
import { FormsModule, NgControl } from '@angular/forms';
import { AccountsApiService } from '../../../common/api-services/accounts-api/accounts-api.service';
import { LedgerSearchComponent } from '../../finance/ledger/ledger-search/ledger-search.component';
import { AppTableComponent, CellDefDirective, CellHeaderDefDirective } from '../../../app-core/template/app-table/app-table.component';
import { entActFundTransferNote } from '../../../common/api-services/accounts-api/accounts-api.classes';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationApiService } from '../../../common/api-services/application-api/application-api.service';
import { NgClass } from '@angular/common';
import { InnerScroll, Row } from '../../../app-core/core-component/core-component.component';
import { InputControlComponent } from '../../../app-core/form-input/input-control/input-control.component';
import { AccoutsStatusTableComponent } from '../../../app-core/template/accouts-status-table/accouts-status-table.component';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { SearchComponent } from '../../../app-core/template/search/search.component';
import { AppDatePipe } from '../../../common/pipes/app-date/app-date.pipe';
import { AutoCompleteLatestComponent } from '../../../app-core/form-input/auto-complete-latest/auto-complete-latest.component';
import { AppFilterPipe } from '../../../common/pipes/app-filter/app-filter.pipe';

@Component({
  selector: 'app-search-group',
  standalone: true,
  imports: [AutoCompleteComponent, LedgerSearchComponent, AppTableComponent,
    NgClass, InputControlComponent,
    CellDefDirective,
    CellHeaderDefDirective,
    IconButtonComponent,
    InnerScroll,
    SearchComponent,
    Row,
    AccoutsStatusTableComponent,
    AppDatePipe,
    AppFilterPipe,
    AutoCompleteLatestComponent,
    FormsModule],
  templateUrl: './search-group.component.html',
  styleUrl: './search-group.component.scss',
  providers: [AppFilterPipe],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SearchGroupComponent extends FormInputControl implements OnInit, AfterContentInit {
  isCheckedValue = "";
  typeCheckedValue = "";
  _getRegionValue = "";
  _getTypeValue = '';
  disableTextNow = false;
  searchText = "";
  noCashorBankValue = "";
  _ledgerRegionSearch = "";
  groupItemList: any = [];
  groupItemListRAW: any = [];
  searchItems = [];
  allGroup = '';
  @ViewChild('groupSearchPopupDialog') groupSearchPopupDialog!: TemplateRef<any>;
  @Input() __fundTrnsferNote = new entActFundTransferNote();


  columns: any = ['name', 'date', 'type', 'status', 'action', 'type'];
  columnsName: any = ["Group Name", "Effective Date", "Nature of Group", "Parent Group Name", "Code Name", "Ledger Type"];

  pagination = {
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0
  };

  @Input('dataValue') dataValue = ''
  @Input('data1Value') data1Value = ''
  @Input()
  set displayText(__displayText: any) {
    console.log(__displayText);
    this.__displayText = __displayText || "";
  }
  get displayText() {
    return this.__displayText;
  }
  public __displayText: any = '';
  @Input()
  set noCashorBank(noCashorBankValue: any) {
    this.noCashorBankValue = noCashorBankValue || "";
  }
  get noCashorBank() {
    return this.noCashorBankValue;
  }

  _isNoCashorBankVal: any = false;
  tableData = []
  groupData: any = []
  ledgers: any = []

  ledger = {
    description: ''
  };

  @Output() getGroupId = new EventEmitter();

  @Input() set groupItems(value: any[]) {
    this._groupItems = value;
    this.processGroupItems();
  }
  get groupItems(): any[] {
    return this._groupItems;
  }
  private _groupItems: any[] = [];

  @Input()
  set getRegionValue(_getRegionValue: any) {
    this._isNoCashorBankVal = _getRegionValue || "";
  }
  get getRegionValue() {
    return this._isNoCashorBankVal;
  }
  @Input()
  set getTypeValue(_getTypeValue: any) {
    this._getTypeValue = _getTypeValue || "";
  }
  get getTypeValue() {
    return this._getRegionValue;
  }
  @Input()
  set regionValue(regionValue: string) {
    this._getRegionValue = regionValue || "";
  }
  get regionValue() {
    return this._getRegionValue;
  }
  @Input()
  set isNoCashorBank(_isNoCashorBankVal: any) {
    this._isNoCashorBankVal = _isNoCashorBankVal || "";
  }
  get isNoCashorBank() {
    return this._isNoCashorBankVal;
  }

  @Input() set isChecked(isChecked: string) {
    this.isCheckedValue = isChecked || "";
  }

  get isChecked() {
    return this.isCheckedValue;
  }

  @Input()
  set disabled(disabled: boolean) {
    this.disableTextNow = disabled || false;
  }
  get disabled() {
    return this.disableTextNow;
  }

  __modeTypeValue: any;

  @Input()
  set modeType(modeTypeValue: any) {
    this.__modeTypeValue = modeTypeValue || "";
  }
  get modeType() {
    return this.__modeTypeValue;
  }

  isItemSearchValue: any = '';
  @Input()
  set isItemSearch(isItemSearchValue: any) {
    this.isItemSearchValue = isItemSearchValue || "";
  }
  get isItemSearch() {
    return this.isItemSearchValue;
  }

  isItemSearchDebitValue: any = '';
  @Input()
  set isItemSearchDebit(isItemSearchDebitValue: any) {
    this.isItemSearchDebitValue = isItemSearchDebitValue || "";
  }
  get isItemSearchDebit() {
    return this.isItemSearchDebitValue;
  }

  isModeTypeValue: any = false;

  @Input()
  set isModeType(isModeTypeValue: any) {
    this.isModeTypeValue = isModeTypeValue || false;
  }
  get isModeType() {
    return this.isModeTypeValue;
  }

  @ViewChild('autoComplete') autoComplete!: AutoCompleteLatestComponent;
  valueSubscriber: any;
  constructor(@Self() @Optional() public control: NgControl,
    private api: ApplicationApiService, public dialog: MatDialog,
    private cd: ChangeDetectorRef, private filter: AppFilterPipe) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
    this.valueSubscriber = this.viewValueChange().subscribe(async (xValue: any) => {
      if (xValue) {
        let obj: any = {};
        obj.name = this.value === 0 ? "" : this.__displayText;
        obj[this.__key] = this.value ? this.value : 0;
        this.autoComplete.setValue(obj);
      }
    });


  }


  async ngOnInit() {
    this.setValidate(this.control);
  }

  async ngAfterContentInit() {
    this.getGroupBasedOnRegion(null);
  }

  ngOnDestroy(): void {
    if (this.valueSubscriber) {
      this.valueSubscriber.unsubscribe();
    }
  }

  // getGroupBasedOnRegion(event: any) {
  //   const obj = {
  //     data:'REGIO'
  //   }
  //   this.api.getGroupBasedOnRegion(obj).pipe(
  //   ).subscribe((result: any) => {
  //     this.items = result.data[0].value.filter((x: any) =>
  //       x.name.toLowerCase().includes(event.toLowerCase()));
  //     this.searchItems = this.items;
  //   })
  // }

  processGroupItems() {
    this.groupItemList = this.groupItems;
  }

  getGroupBasedOnRegion(event: any) {
    const obj = {
      data: this.dataValue,
      data1: this.data1Value
    }
    this.api.getGroupBasedOnRegion(obj).subscribe((success) => {
      console.log(success);
      this.groupItemList = success.data[0]?.value;
      this.groupItemListRAW = success.data[0]?.value;
      console.log(this.groupItemList);
    })
  }

  getLedgerBasedOnGroup(data: any) {
    this.getGroupId.emit(data);
    // const obj = {
    //   data: id
    // }

    // this.api.getLedgerBasedOnGroup(obj).subscribe((success) => {
    //     this.ledgers = [...success.data[0].value];
    //     console.log(this.ledgers, 'ledgers');
    //     this.ledger.description = '';
    //     this.dialog.closeAll();
    // })
  }


  getSearchData(event: any) {
    this.items = this.searchItems;
    this.items = this.items.filter((x: any) =>
      x.name.toLowerCase().includes(event.toLowerCase()));
  }

  valueSelected(event: any) {
    console.log(event, 'test')
    if (this.__key !== '') {
      this.value = event[this.__key];
    }
    this.onSelect.emit(event);
  }
  searchData(event: any) {
    console.log(event);
  }

  async openSearch(event: any) {
    this.getSearchDataNew(event);
  }

  onSelectedValue(element: any) {
    this.valueSelected(element);
  }
  pageChanged(event: any) {
    this.pagination.pageNumber = event.pageNumber;
    this.pagination.pageSize = event.pageSize;
    this.pagination.totalCount = this.items.length;
  }


  getSearchDataNew(event: any) {
    this.groupData = this.groupItems;
    this.pagination.pageNumber = 1,
      this.pagination.pageSize = 25,
      this.pagination.totalCount = this.groupItems.length;
    const dialogRef = this.dialog.open(this.groupSearchPopupDialog, {
      width: '1200px',
      height: '80%',
      data: {
        regionSearch: this.regionValue
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      debugger
      if (result) {
        // this.doSelect(result);
        this.valueSelected(result);
      }
    });
  }

  autoClear() {
    this.onAction('clear');
    // this.getGroupBasedOnRegion(allGroup);
  }

  dataChanged(event: any) {
    let filteredValue = this.filter.transform(this.groupItemListRAW, { name: event });
    this.groupItemList = filteredValue;
  }



}
