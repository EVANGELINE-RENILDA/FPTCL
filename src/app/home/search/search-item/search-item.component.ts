import { Component, Input, OnInit, Optional, Self, TemplateRef, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormInputControl } from '../../../app-core/form-input/form-input-control';
import { entInvItemSearch } from '../../../common/api-services/accounts-api/accounts-api.classes';
import { AccountsApiService } from '../../../common/api-services/accounts-api/accounts-api.service';
import { AutoCompleteComponent } from '../../../app-core/form-input/auto-complete/auto-complete.component';
import { CoreService } from '../../../app-core/service/core.service';
import { ItemsSearchComponent } from '../../inventory/configuration/items/items-search/items-search.component';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [AutoCompleteComponent, ItemsSearchComponent],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss'
})
export class SearchItemComponent extends FormInputControl implements OnInit {
  @ViewChild('notesDialog', { static: false })
  notesDialog!: TemplateRef<any>;
  @Input() public statusValue: any = '';
  @Input('displayText') displayText = "";

  searchParams = new entInvItemSearch();

  __inventoryGoods = "";
  @Input() set isInventory(isInventory: string) { this.__inventoryGoods = isInventory || ''; }
  get isInventory() { return this.__inventoryGoods; };

  __regionSearch = "";
  @Input()
  set regionSearch(regionSearch: string) { this.__regionSearch = regionSearch || ''; }
  get regionSearch() { return this.__regionSearch; }

  constructor(@Self() @Optional() public control: NgControl, private api: AccountsApiService,
  public dialog : CoreService) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  ngOnInit() {
    this.setValidate(this.control);
  }


  getSearchData(event: any) {
    if (event.length > 0) {
      const options = {
        hideErrorMethod: true,
        hideFullSpinner: true,
        type: 'accountsPath',
      };
      this.searchParams.strItemName = event;
      this.searchParams.isInventoryGoods = this.__inventoryGoods;
      this.searchParams.regionValue = this.__regionSearch
      this.api.autoSearchForItemsFromVendor(this.searchParams, options).subscribe((result: any) => {
        this.__items = result.lstbusInvItem;
      });
    }
  }

  valueSelected(event: any) {
    this.value = event.vendorId;
    this.onSelect.emit(event);
  }
  async openSearch() {
    let dialogResponse: any = await this.dialog.openDialog(this.notesDialog, {
      disableClose: true,
      height: '500px',
      width: '1100px',
      maxWidth: '1170px',
    });
}
getVednorData(val: any) {
  console.log(val)
this.onSelect.emit(val);
this.searchParams.strVendorId = val.strVendorId ;

  this.dialog.closeDialog()
}

}
