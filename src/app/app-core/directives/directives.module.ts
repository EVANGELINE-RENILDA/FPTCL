import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolTipDirective } from './tool-tip.directive';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [ToolTipDirective],
  imports: [
    MatTooltipModule
  ],
  providers: [MatTooltip],
  exports: [ToolTipDirective]
})
export class DirectivesModule { }
