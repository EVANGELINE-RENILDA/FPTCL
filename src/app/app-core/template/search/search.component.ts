import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, TemplateRef } from '@angular/core';
import { CoreService } from '../../service/core.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Input() searchTemplate!: TemplateRef<any>;
  @Input() maxHeight = '480px';
  @Input() maxWidth = '1248px';
  id = "";
  constructor(
    private coreService: CoreService,
  ) {
    this.id = this.generatePNR();
  }

  generatePNR() {
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pnr = '';
    const timestamp = Date.now().toString();

    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumeric.length);
      pnr += alphanumeric.charAt(randomIndex);
    }

    return pnr;
  }

  openDialog(): void {
    if (!this.searchTemplate) {
      return;
    }
    let options = {
      width: 'calc(100% - 118px)',
      maxWidth: this.maxWidth,
      height: 'calc(100% - 90px)',
      maxHeight: this.maxHeight,
      minHeight: '200px',
      panelClass: 'search-pane'
    }
    this.coreService.openDialog(this.searchTemplate, options, this.id)
  }

  close() {
    this.coreService.closeDialog(this.id);
  }
}
