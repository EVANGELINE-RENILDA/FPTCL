import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferNoteSearchComponent } from './stock-transfer-note-search.component';

describe('StockTransferNoteSearchComponent', () => {
  let component: StockTransferNoteSearchComponent;
  let fixture: ComponentFixture<StockTransferNoteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockTransferNoteSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockTransferNoteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
