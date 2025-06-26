import { CommonModule } from "@angular/common";
import { AfterContentInit, CUSTOM_ELEMENTS_SCHEMA, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from "@angular/core";
import { InnerScroll } from "../../core-component/core-component.component";

@Component({
    selector: 'app-accordion-tab',
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

export class TabAccordionComponent {
    @Input() content = '';
    @Input() tabTitle: string = '';
    isActive: boolean = false;
    @Input() primaryTab: string = '';

}




@Component({
    selector: 'app-tab-accordion-group',
    standalone: true,
    imports: [CommonModule, InnerScroll],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    template: `
            <div class="tab-2 d-flex justify-content-between">
                <div class="new-tab">
                @for(tab of tabs; track $index) {
                    <div class="tab-title" (click)="selectTab(tab)" [ngClass]="{'tabAccordionActive': tab.isActive}">
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
@if(chevRotate === false){
    <div class="chev-arrow" (click)="tabIsFalse()"><button class="btn-accordion"><ion-icon class="reverse" src="assets/icons/down.svg"></ion-icon></button></div>
}
@if(chevRotate === true){
    <div class="chev-arrow chev-rotate" (click)="selectTab(this.tabs.first)"><button class="btn-accordion"><ion-icon class="reverse" src="assets/icons/down.svg"></ion-icon></button></div>
}
            </div>
            <div class="v-flex  tab-content">
                
                            <div class="tab-padding-1 ">
                                <ng-content></ng-content>
                            </div>
                       
            </div>

    `
})

export class TabAccordionGroupComponent implements AfterContentInit {
    @Input() isHorizontal = true;
    @ContentChildren(TabAccordionComponent) tabs!: QueryList<TabAccordionComponent>;
    @Output() tabChange: EventEmitter<TabAccordionComponent> = new EventEmitter<TabAccordionComponent>();
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

    selectTab(tab: TabAccordionComponent) {
console.log(tab);
        this.chevRotate = false
        this.tabs.toArray().forEach(t => t.isActive = false);
        tab.isActive = true;
        this.tabChange.emit(tab);
    }
    chevRotate = false    
       tabIsFalse(tab?: any){
        this.tabs.toArray().forEach(t => t.isActive = false);
        // tab.isActive = true;
        this.tabChange.emit(tab);
        this.chevRotate = true
   }

}
