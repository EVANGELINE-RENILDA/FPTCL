import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTransferNoteDetailComponent } from './stock-transfer-note-detail.component';

describe('StockTransferNoteDetailComponent', () => {
  let component: StockTransferNoteDetailComponent;
  let fixture: ComponentFixture<StockTransferNoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockTransferNoteDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockTransferNoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
