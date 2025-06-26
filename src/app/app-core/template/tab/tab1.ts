import { CommonModule } from "@angular/common";
import { AfterContentInit, CUSTOM_ELEMENTS_SCHEMA, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from "@angular/core";
import { InnerScroll } from "../../core-component/core-component.component";

@Component({
    selector: 'app-sub-tab',
    standalone: true,
    imports: [CommonModule],
    template: `
      @if(isActive) {
        <div>
            <ng-content></ng-content>
       </div>
      }
    `
})

export class TabSubComponent {

    @Input() content = '';
    @Input() tabTitle: string = '';
    isActive: boolean = false;


}


@Component({
    selector: 'app-tab-sub-group',
    standalone: true,
    imports: [CommonModule, InnerScroll],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    template: `
            <div class="tab-1">
                @for(tab of tabs; track $index) {
                    <div class="tab-title" (click)="selectTab(tab)" [ngClass]="{'tabSubActive': tab.isActive}">
                        <div class="d-flex">
    @if(src !==''){
        <ion-icon [src]="src"></ion-icon>
    }
    @if(name!==''){
        <ion-icon [name]="__name"></ion-icon>
    }
                
    {{ tab.tabTitle }}
</div>
                    </div>
                }
            </div>
            <div class="v-flex h100 tab-content">
                
                            <div class="tab-padding-1 ">
                                <ng-content></ng-content>
                            </div>
                       
            </div>

    `
})

export class TabSubGroupComponent implements AfterContentInit {
    @Input() isHorizontal = true;
    @ContentChildren(TabSubComponent) tabs!: QueryList<TabSubComponent>;
    @Output() tabChange: EventEmitter<TabSubComponent> = new EventEmitter<TabSubComponent>();
    @Input() src: any = ''

    __name: any = '';
    @Input() set name(name: string) { this.__name = name || ''; }
    get name() { return this.__name; }

    constructor() {



    }
    ngAfterContentInit() {
        const activeTabs = this.tabs.filter(tab => tab.isActive);
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }

    }

    selectTab(tab: TabSubComponent) {
       
        this.tabs.toArray().forEach(t => t.isActive = false);
        tab.isActive = true;
        this.tabChange.emit(tab);
    }
}
