import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceReceiptNotePreviewComponent } from './advance-receipt-note-preview.component';

describe('AdvanceReceiptNotePreviewComponent', () => {
  let component: AdvanceReceiptNotePreviewComponent;
  let fixture: ComponentFixture<AdvanceReceiptNotePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvanceReceiptNotePreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvanceReceiptNotePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
