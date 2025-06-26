import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceReceiptNoteSearchComponent } from './advance-receipt-note-search.component';

describe('AdvanceReceiptNoteSearchComponent', () => {
  let component: AdvanceReceiptNoteSearchComponent;
  let fixture: ComponentFixture<AdvanceReceiptNoteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvanceReceiptNoteSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvanceReceiptNoteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
