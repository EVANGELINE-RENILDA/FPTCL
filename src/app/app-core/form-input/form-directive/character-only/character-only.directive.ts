import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: "[ngModel][appCharacterOnly]",
  standalone: true,
})
export class CharacterOnlyDirective implements AfterViewInit {
  regex = /^[a-zA-Z0-9 _.-]*$/g;
  constructor(private el: ElementRef) { }
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  ngAfterViewInit() {

  }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    let value = event.target.value;
    const match = value.match(this.regex);

    if (!match) {
      value = value.replace(/[^\d\w\s]/g, "");
    }

    event.target.value = value;
    this.ngModelChange.emit(value);
  }
}
