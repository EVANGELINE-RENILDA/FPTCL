import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PdfViewerComponent implements OnInit {
  @Input()  url = "";
  @Input() fileName = "";
  constructor() { }

  ngOnInit(): void {
  }

}
