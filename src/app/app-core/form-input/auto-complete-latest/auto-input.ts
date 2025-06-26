import { Directive, ElementRef, EventEmitter, Input, Output } from "@angular/core";

@Directive()

export class AutoInputControl {

  @Input() className = "default-input";

  __placeholder = "";
  @Input() set placeholder(placeholder: string) { this.__placeholder = placeholder || ""; }
  get placeholder() { return this.__placeholder; }

  __label = "";
  @Input() set label(label: string) { this.__label = label || ""; }
  get label() { return this.__label; }

  __designType = ""; // default - Empty, Options float, bordered, outline
  @Input() set designType(designType: string) { this.__designType = designType || ""; }
  get designType() { return this.__designType; }

  __tabIndex = "";
  @Input() set tabIndex(tabIndex: string) { this.__tabIndex = tabIndex || ""; }
  get tabIndex() { return this.__tabIndex; }

  __errorTrue = false;
  @Input() set errorTrue(errorTrue: any) { this.__errorTrue = errorTrue || false; }
  get errorTrue() { return this.__errorTrue; }

  __btnClicked = false;
  @Input() set btnClicked(btnClicked: boolean) { this.__btnClicked = btnClicked || false; }
  get btnClicked() { return this.__btnClicked; }

  __errorText = "Mandatory";
  @Input() set errorText(errorText: string) { this.__errorText = errorText || "Mandatory"; }
  get errorText() { return this.__errorText; }

  __autoFocus = false;
  @Input() set autoFocus(autoFocus: boolean) { this.__autoFocus = autoFocus || false; }
  get autoFocus() { return this.__autoFocus; }

  __search = true;
  @Input() set search(search: boolean) { this.__search = search || false; }
  get search() { return this.__search; }

  __required = false;
  @Input() set required(required: boolean) { this.__required = required || false; }
  get required() { return this.__required; }

  // Select Control Requirements
  __items: any = [];
  @Input()
  set items(items: any) {
    this.__items = items || [];
  }
  get items() {
    return this.__items;
  }

  __key = "";
  @Input() set key(key: string) { this.__key = key || ""; }
  get key() { return this.__key; }

  __keyName = "";
  @Input() set keyName(keyName: string) { this.__keyName = keyName || ""; }
  get keyName() { return this.__keyName; }

  __sort = true;
  @Input() set sort(sort: boolean) { this.__sort = sort; }
  get sort() { return this.__sort; }

  // Other Requirements
  __oldValue: any = null;
  @Input() set oldValue(oldValue: any) { this.__oldValue = oldValue || null; }
  get oldValue() { return this.__oldValue; }

  __oldValueDescription: any = null;
  @Input()
  set oldValueDescription(oldValueDescription: any) { this.__oldValueDescription = oldValueDescription || null; }
  get oldValueDescription() { return this.__oldValueDescription; }

  // Emitters Actions
  @Output('onClear') onClear: EventEmitter<any> = new EventEmitter();
  @Output('onBlur') onBlur: EventEmitter<any> = new EventEmitter();
  @Output('onFocus') onFocus: EventEmitter<any> = new EventEmitter();
  @Output('onEnter') onEnter: EventEmitter<any> = new EventEmitter();
  @Output('onTab') onTab: EventEmitter<any> = new EventEmitter();
  @Output('onSearch') onSearch: EventEmitter<any> = new EventEmitter();
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter();
  @Output('onApplyChange') onApplyChange: EventEmitter<any> = new EventEmitter();

}
