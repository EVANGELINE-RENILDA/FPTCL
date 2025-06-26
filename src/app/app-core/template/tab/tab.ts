import { CommonModule } from "@angular/common";
import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from "@angular/core";
import { InnerScroll } from "../../core-component/core-component.component";

@Component({
    selector: 'app-tab',
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

export class TabComponent {

    @Input() content = '';
    @Input() tabTitle: string = '';
    isActive: boolean = false;
}


@Component({
    selector: 'app-tab-group',
    standalone: true,
    imports: [CommonModule, InnerScroll],
    template: `
            <div class="tab">
                @for(tab of tabs; track $index) {
                    <div class="tab-title" (click)="selectTab(tab)" [ngClass]="{'tabActive': tab.isActive}">
                        {{ tab.tabTitle }}
                    </div>
                }
            </div>
            <div class="v-flex  tab-content">

                            <div class="tab-padding">
                                <ng-content></ng-content>
                            </div>

            </div>

    `
})

export class TabGroupComponent implements AfterContentInit {
    @Input() isHorizontal = true;
    @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
    @Output() tabChange: EventEmitter<TabComponent> = new EventEmitter<TabComponent>();

    ngAfterContentInit() {
        const activeTabs = this.tabs.filter(tab => tab.isActive);
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }

    }

    selectTab(tab: TabComponent) {

        this.tabs.toArray().forEach(t => t.isActive = false);
        tab.isActive = true;
        this.tabChange.emit(tab);
    }
}
