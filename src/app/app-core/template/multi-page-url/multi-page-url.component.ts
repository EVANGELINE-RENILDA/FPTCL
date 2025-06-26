import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UrlService } from '../../../common/services/url/url.service';

@Component({
  selector: 'app-multi-page-url',
  standalone: true,
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './multi-page-url.component.html',
  styleUrl: './multi-page-url.component.scss'
})
export class MultiPageUrlComponent {
  previousUrl: any = "";
  nextUrl: any = "";
  // @Input('id') id = {
  //   currentIndex: 0,
  //   array: []
  // }

  __id = {
    currentIndex: 0,
    array: []
  };
  @Input() set id(id: any) { this.__id = id; this.init(); }
  get id() { return this.__id; }


  @Input('url') url = "";
  constructor(
    private urlCoder: UrlService
  ) {

  }

  async init() {


    if (this.__id.currentIndex < this.__id.array.length - 1) {
      this.nextUrl = await this.urlCoder.encode({
        currentIndex: this.__id.currentIndex + 1,
        array: this.__id.array,
      });
    }
    if (this.__id.currentIndex > 0) {
      this.previousUrl = await this.urlCoder.encode({
        currentIndex: this.__id.currentIndex - 1,
        array: this.__id.array,
      });
    }
  }
}
