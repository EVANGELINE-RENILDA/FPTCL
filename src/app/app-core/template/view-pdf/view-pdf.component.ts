import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject, Input } from '@angular/core';
import { AppSafePipe } from '../../../common/pipes/app-safe/app-safe.pipe';


@Component({
  selector: 'app-view-pdf',
  standalone: true,
  imports: [AppSafePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // providers: [DialogRef],
  template: `
    @if (url != '') {
      <div class="pdf-viewer">
            <div class="ab">
                <object [data]="url | appSafe: 'resourceUrl'" type='application/pdf'></object>
            </div>
        </div>
    }
  `,
  styles: `
  .pdf-viewer{
    width:100%;
    position: relative;
    height:100%;
    object, embed{
        width: 100%;
        height:100%;
    }
} `
})
export class ViewPdfComponent {

  @Input() url = '';


  constructor(
    // public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public xdata: any,
  ) {


    this.url = xdata.url;
  }

}
