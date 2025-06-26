import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef } from '@angular/core';
import { CoreService } from '../../service/core.service';

@Component({
  selector: 'app-dialog-panel',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dialog-panel.component.html',
  styleUrl: './dialog-panel.component.scss'
})
export class DialogPanelComponent {

  @Input() dialogTemplate!: TemplateRef<any>;
  @Input() getWidth = '';

  constructor(
    private coreService: CoreService,
  ) {


  }

  openDialog(): void {

    if (!this.dialogTemplate) {
      return;
    }
    let options = {
      width: this.getWidth,
      maxWidth: '1248px',
      height: 'auto',
      maxHeight: '480px',
      panelClass: 'dialog-pane'
    }
    this.coreService.openDialog(this.dialogTemplate, options)
  }

  close() {
    this.coreService.closeDialog();
  }
}
