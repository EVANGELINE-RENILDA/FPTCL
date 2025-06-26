import { Component, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ItemsSearchComponent } from '../../inventory/configuration/items/items-search/items-search.component';
import { DirectivesModule } from '../../../app-core/directives/directives.module';
import { AutoCompleteLatestComponent } from '../../../app-core/form-input/auto-complete-latest/auto-complete-latest.component';
import { IconButtonComponent } from '../../../app-core/template/icon-button/icon-button.component';
import { FormInputControl } from '../../../app-core/form-input/form-input-control';
import { NgControl } from '@angular/forms';
import { AccountsApiService } from '../../../common/api-services/accounts-api/accounts-api.service';
import { CoreService } from '../../../app-core/service/core.service';
import { ItemsDetailComponent } from "../../inventory/configuration/items/items-detail/items-detail.component";
import { entInvItemSearch, entInvItemSearchResult } from '../../../common/api-services/accounts-api/accounts-api.classes';

@Component({
  selector: 'auto-search-items',
  standalone: true,
  imports: [AutoCompleteLatestComponent, ItemsSearchComponent, IconButtonComponent, DirectivesModule, ItemsDetailComponent],
  templateUrl: './auto-search-items.component.html',
  styleUrl: './auto-search-items.component.scss'
})
export class AutoSearchItemsComponent extends FormInputControl implements OnInit, OnDestroy {

  valueSubscriber: any;

  @ViewChild('searchPopupTemplate') searchPopupTemplate!: any;
  @ViewChild('autoComplete') autoComplete!: AutoCompleteLatestComponent;

  __displayText = "";
  __inventoryGoods = '';
  __regionValue = '';
  @Input() set displayText(displayText: string) { this.__displayText = displayText || ""; }
  get displayText() { return this.__displayText; }

  @Input() set inventoryGoods(inventoryGoods: string) { this.__inventoryGoods = inventoryGoods || ""; }
  get inventoryGoods() { return this.__inventoryGoods; }

  @Input() set regionValue(regionValue: string) { this.__regionValue = regionValue || ""; }
  get regionValue() { return this.__regionValue; }

  itemData = new entInvItemSearchResult();
  constructor(@Self() @Optional() public control: NgControl,
    private api: AccountsApiService,
    public dialog: CoreService) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
    this.__valueType = 'int';
    this.valueSubscriber = this.viewValueChange().subscribe(async (xValue: any) => {
      if (xValue && this.value) {
        this.itemData.itemName = this.__displayText
        this.itemData.invItemId = this.value
        this.autoComplete.setValue(this.itemData);
      }
    });
  }

  ngOnInit() {
    this.setValidate(this.control);
  }

  ngOnDestroy(): void {
    if (this.valueSubscriber) {
      this.valueSubscriber.unsubscribe();
    }
  }


  async openSearch() {
    let dialogRef: any = await this.dialog.openDialog(this.searchPopupTemplate, {
      disableClose: true,
      height: '95%',
      width: '95%',
      maxWidth: '1280px',
    }, 'itemAutoSearch');
  }

  doClose() {
    this.dialog.closeDialog('itemAutoSearch');
  }

  autoClear() {

  }

  valueSelected(event: any) {
    console.log(event);
    
    this.itemData.invItemId = event.invItemId;
    this.itemData.itemName = event.itemName;
    this.value  = this.itemData.invItemId ;
    this.onSelect.emit(event);
   
  }

  getSearchData(event: any) {
    const options = {
      hideErrorMethod: true,
      hideFullSpinner: true,
      type: 'applicationPath'
    }
    let obj = new entInvItemSearch();
    obj.strItemName = event;
    obj.isInventoryGoods = this.inventoryGoods;
    obj.regionValue = this.regionValue
    this.api.autoSearchForItemsFromVendor(obj, options).subscribe((response: any) => {
      this.__items = response.lstbusInvItem;
    })
  }

  itemSelected(event: any) {
    // console.log(event);
    this.itemData.invItemId = event.invItemId;
    this.itemData.itemName = event.itemName;
    this.autoComplete.setValue(this.itemData);
    this.value = this.itemData.invItemId;
    this.onSelect.emit(event);
    this.doClose();
  }

}
