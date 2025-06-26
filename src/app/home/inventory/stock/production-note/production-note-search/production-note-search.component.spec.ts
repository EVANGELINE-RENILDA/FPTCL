import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionNoteSearchComponent } from './production-note-search.component';

describe('ProductionNoteSearchComponent', () => {
  let component: ProductionNoteSearchComponent;
  let fixture: ComponentFixture<ProductionNoteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionNoteSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductionNoteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
