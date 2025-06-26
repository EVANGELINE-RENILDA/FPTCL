import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceReceiptNoteDetailComponent } from './advance-receipt-note-detail.component';

describe('AdvanceReceiptNoteDetailComponent', () => {
  let component: AdvanceReceiptNoteDetailComponent;
  let fixture: ComponentFixture<AdvanceReceiptNoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvanceReceiptNoteDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvanceReceiptNoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
