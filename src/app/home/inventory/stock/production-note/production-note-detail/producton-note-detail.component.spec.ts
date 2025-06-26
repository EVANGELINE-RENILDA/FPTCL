import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductonNoteDetailComponent } from './producton-note-detail.component';

describe('ProductonNoteDetailComponent', () => {
  let component: ProductonNoteDetailComponent;
  let fixture: ComponentFixture<ProductonNoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductonNoteDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductonNoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
