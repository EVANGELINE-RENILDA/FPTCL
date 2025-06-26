import { Directive, ElementRef, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[appToolTip]',
})
export class ToolTipDirective {

  @Input('appToolTip') value: string = "";

  constructor(private el: ElementRef, private tooltip: MatTooltip) { }

  ngOnInit() {

    if (this.value && this.value.length > 8) {
      this.tooltip.message = this.value;
    } else {
      this.tooltip.message = '';
      // this.tooltip.disabled = true; // Disable tooltip for short values
    }
  }

  ngOnChanges() {
    if (this.value && this.value.length > 8) {
      this.tooltip.message = this.value;
      // this.tooltip.disabled = false;
    } else {
      this.tooltip.message = '';
      // this.tooltip.disabled = true;
    }
  }

}
