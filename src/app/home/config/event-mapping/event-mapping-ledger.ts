import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, Optional, Self } from "@angular/core";
import { FormInputControl } from "../../../app-core/form-input/form-input-control";
import { NgControl } from "@angular/forms";
import { ApplicationApiService } from "../../../common/api-services/application-api/application-api.service";
import { LeadgerAutoSearchComponent } from "../../search/leadger-auto-search/leadger-auto-search.component";
import { NgClass } from "@angular/common";

@Component({
    selector: 'event-mapping-ledger',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [LeadgerAutoSearchComponent, NgClass],
    template: `<app-leadger-auto-search [key]="__key" [ledgerItems]="ledgers" [(ngModel)]="value" name="{{name + 'in'}}"
    (onSelect)="setData($event)" (onClear)="onAction('clear')" [displayText]="displayText"
    [btnClicked]="__btnClicked" [required]="__required" [errorTrue]="control.control?.invalid && __errorTrue" [ngClass]="{'error-block': control.control?.invalid && __errorTrue}"></app-leadger-auto-search>
    @if(control.control?.invalid && __errorTrue){


        <div class="label-container bottom">
        <div class="label-container-right">
            @if(control.control?.invalid && __errorTrue){
            <div class="error-text end">
                <span class="error-text-icon">
                    <ion-icon name="alert-circle-outline"></ion-icon>
                </span>
                {{__errorText}}
            </div>
            }
        </div>
        </div>
        <!-- <div class="error-text end">
        <span class="error-text-icon">
          <ion-icon name="alert-circle-outline"></ion-icon>
        </span>
        Mandatory
        </div> -->
    }
    `,
    styles:`.error-text {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: #BE1622;
        font-size: 12px;
        font-weight: 400;
      
        .error-text-icon {
            height: 0.875rem;
            width: 0.875rem;
            display: flex;
            align-items: center;
      
            svg {
                height: 0.875rem;
                width: 0.875rem;
            }
        }
      }`
})

export class eventMappingLedgerComponent extends FormInputControl implements OnInit {
    __groupId = 0;
    @Input() displayText = '';

    @Input()
    set groupId(groupId: any) {
        this.__groupId = groupId || 0;
            if(this.__groupId !==0 ){
                this.getLedgerItems();
            }        
    }
    get groupId() {
        return this.__groupId;
    }

    // @Input()
    // set errorTrue(errorTrue: any) {
    //     this.__errorTrue = errorTrue || 0;                 
    // }
    // get errorTrue() {
    //     return this.__errorTrue;
    // }

    constructor(
        @Self() @Optional() public control: NgControl,
        public apiService: ApplicationApiService,
    ) {
        super();
        this.control && (this.control.valueAccessor = this);
        this.xControl = this.control;
    }
    ngOnInit(): void {
        this.setValidate(this.control);
    }

    ledgers: any = [];

    setData(event: any) {
        if (this.key !== '') {
            this.value = event[this.key];
        }
        this.displayText = event.description;
        this.onSelect.emit(event);
    }

    getLedgerItems() {        
        const obj = {
            data: this.__groupId
        }
        this.apiService.getLedgerBasedOnGroup(obj).subscribe((success: any) => {
            this.ledgers = success.data[0].value;
            const index = this.ledgers.map((e: any) => e.id).indexOf(this.value);
            if(index > -1){
                this.displayText = this.ledgers[index].description;
            }
        });
    }
}