import { JsonPipe, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'tree-root',
  standalone: true,
  imports: [JsonPipe, NgTemplateOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<ng-container
      *ngTemplateOutlet="nodeParent; context: { $implicit: nodeData }"
    ></ng-container>
    <ng-template #nodeParent let-data>
      @for (node of data; track $index) {
      <ng-container
        *ngTemplateOutlet="nodeChild; context: { $implicit: node }"
      ></ng-container>
      }
    </ng-template>
    <ng-template #nodeChild let-node>
      <div class="group-items">
        <div class="group-parent">
          <div class="slot-start">
            @if(node.children){ 
              @if(node.children.length > 0){
            <button
              class="group-icon-button chevron"
              id="group{{ node[key] }}"
              (click)="doOpen(node.actGroupId)"
            >
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
            } 
          }
          </div>
          <ng-container
            *ngTemplateOutlet="
              nodeContentTemplate;
              context: { $implicit: node }
            "
          >
          </ng-container>
        </div>
        <div class="group-children" id="children{{ node[key] }}">
          <ng-container
            *ngTemplateOutlet="
              nodeParent;
              context: { $implicit: node.children }
            "
          ></ng-container>
        </div>
      </div>
    </ng-template>`,
})
export class TreeRootComponent implements OnInit, AfterContentInit {
  __nodeData: any = [];
  @Input('key') key = '';

  @Input()
  set nodeData(nodeData: any) {
    this.__nodeData = nodeData || [];
  }

  get nodeData() {
    return this.__nodeData;
  }
  nodeContentTemplate!: TemplateRef<any>;

  @ContentChildren('nodeContents')
  nodeContents!: QueryList<any>;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  ngAfterContentInit() {
    ;

    this.nodeContents.forEach((nodeContent: any) => {
      this.nodeContentTemplate = nodeContent;

    });
  }

  doOpen(id: any) {
    let element = document.getElementById('group' + id);
    let elementChild = document.getElementById('children' + id);

    if (!element) return;
    if (element.classList.contains('open')) {
      this.renderer.removeClass(element, 'open');
      this.renderer.removeClass(elementChild, 'show');
    } else {
      this.renderer.addClass(element, 'open');
      this.renderer.addClass(elementChild, 'show');
    }
  }
}
