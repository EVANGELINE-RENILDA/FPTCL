import { CommonModule, NgClass } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
// import { FormDirectiveModule } from '../../form-input/form-directive/form-directive.module';
// import { FormDirectiveModule } from '../form-input/form-directive/form-directive.module';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    MatSelectModule,
  ]
})
export class PaginatorComponent implements OnInit {

  __pageSizeOptions = [10, 25, 50, 100]
  __pageSize = 10;
  __pageIndex = 0;
  __length = 0;
  totalPages = 0;
  pages: any = [];
  inputPageNumber = "";

  private holdTimeout: any;
  private isHoldEvent: boolean = false;
  private fakeIndex = 0;

  @Input()
  set pageSize(pageSize: any) {
    pageSize < 0 ? pageSize = 0 : pageSize;
    this.__pageSize = parseFloat(pageSize) || 0;
    this.init();
  }

  get pageSize(): any {
    return this.__pageSize;
  }

  @Input()
  set pageIndex(pageIndex: any) {
    pageIndex < 1 ? pageIndex = 0 : pageIndex = pageIndex - 1;
    this.__pageIndex = parseFloat(pageIndex) || 0;
    this.init();
  }

  get pageIndex(): any {
    return this.__pageIndex + 1;
  }

  @Input()
  set length(length: any) {
    length < 0 ? length = 0 : length;
    this.__length = parseFloat(length) || 0;


    this.init();
  }

  get length(): any {
    return this.__length;
  }

  @ViewChild('selectControl') selectControl!: any;
  @ViewChild('paginatorSlider') paginatorSlider!: any;

  @Output() page: EventEmitter<any> = new EventEmitter();

  constructor(
    public renderer: Renderer2,
    private el: ElementRef
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.totalPages = Math.ceil(this.__length / this.__pageSize);
    this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);


  }

  onSelectOption(event: any) {

    this.__pageSize = event.value;
    this.init();
    this.setPage(0, false);
  }

  navigatePage(val: any) {
    if (this.isHoldEvent) {
      return;
    }
    switch (val) {
      case "previous":
        this.__pageIndex > 0 ? this.__pageIndex = (this.__pageIndex - 1) : "";
        this.fakeIndex = parseFloat(this.__pageIndex.toString());
        this.getTranslateValue(this.__pageIndex);
        this.onPageChange();
        break;

      case "next":
        this.__pageIndex < (this.totalPages - 1) ? this.__pageIndex = (this.__pageIndex + 1) : "";
        this.getTranslateValue(this.__pageIndex);
        this.fakeIndex = parseFloat(this.__pageIndex.toString());
        this.onPageChange();
        break;

      default:
        break;
    }
  }
  getEndingItemNumber(): number {
    const endIndex = (this.__pageIndex + 1) * this.__pageSize;
    return Math.min(endIndex, this.__length);
  }

  setPage(val: any, isDot: any) {
    if (isDot) {
      return;
    }
    this.__pageIndex = val;
    this.fakeIndex = parseFloat(this.__pageIndex.toString());
    this.getTranslateValue(this.__pageIndex);
    this.onPageChange();
  }

  getTranslateValue(index: any) {
    return;
    if (this.totalPages < 6 || index < 2) {
      return;
    }
    const pageWidth = 24;
    const containerWidth = 120;
    const activePageIndex = index;
    const centerOffset = (containerWidth / 2) - (pageWidth / 2);
    const translateValue = -((activePageIndex * pageWidth) - centerOffset);
    this.renderer.setStyle(this.paginatorSlider.nativeElement, 'transform', `translateX(${translateValue}px)`);
  }

  onPageChange() {
    let obj = {
      length: this.__length,
      pageNumber: this.__pageIndex + 1,
      pageSize: this.__pageSize
    }
    this.page.emit(obj);
  }

  gotoPage(l: NgForm) {
    if (l.valid) {
      this.setPage(parseFloat(this.inputPageNumber) - 1, false);
      // this.inputPageNumber = "";
    }
  }
  clearValue() {
    setTimeout(() => {
      this.inputPageNumber = "";
    }, 1000);
  }

  onMouseDown(val: any) {
    return;
    this.isHoldEvent = false;
    this.holdTimeout = setInterval(() => {
      this.isHoldEvent = true;

      switch (val) {
        case 'previous':
          this.fakeIndex > 0 ? this.fakeIndex = (this.fakeIndex - 1) : "";
          this.getTranslateValue(this.fakeIndex);
          break;
        case 'next':
          this.fakeIndex < (this.totalPages - 1) ? this.fakeIndex = (this.fakeIndex + 1) : "";
          this.getTranslateValue(this.fakeIndex);
          break;
        default:
          break;
      }
    }, 200);
  }

  onMouseUp() {
    return;
    if (this.holdTimeout) {
      clearInterval(this.holdTimeout);
    }
    if (!this.isHoldEvent) {

    }
  }

}


