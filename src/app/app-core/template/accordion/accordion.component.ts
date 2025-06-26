import { Component, ElementRef, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'accordion',
  template: '<div class="app-accordion"><ng-content></ng-content></div>',
})
export class AccordionComponent {

}

@Component({
  selector: 'accordion-item',
  template: '<div class="app-accordion-item" [class.open]="isOpen"><ng-content></ng-content></div>',
})
export class AccordionItemComponent {
  @Input('isOpen') isOpen = false;
}

@Component({
  selector: 'accordion-header',
  template: '<div class="app-accordion-header" (click)="toggleAccordion($event)"><ng-content></ng-content><div class="slot-right"><button class="btn-accordion"><ion-icon class="reverse" src="assets/icons/down.svg"></ion-icon></button></div></div>',
})
export class AccordionHeaderComponent {

  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter();
  constructor(private elementRef: ElementRef) { }

  toggleAccordion(event: any) {

    const accordion = this.elementRef.nativeElement.closest('.app-accordion');


    const accordionItems = accordion.querySelectorAll('.app-accordion-item');
    const accordionItem = this.elementRef.nativeElement.closest('.app-accordion-item');
    accordionItems.forEach((accordionItemElement: any) => {
      if (accordionItem !== accordionItemElement) {
        // accordionItemElement.classList.remove('open');
      }
    });
    if (accordionItem) {
      accordionItem.classList.toggle('open');
    }

  }
}

@Component({
  selector: 'accordion-body',
  template: '<div class="app-accordion-body"><ng-content></ng-content></div>',
})
export class AccordionBodyComponent {

}
