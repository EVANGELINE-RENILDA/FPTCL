import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancePaymentNotePreviewComponent } from './advance-payment-note-preview.component';

describe('AdvancePaymentNotePreviewComponent', () => {
  let component: AdvancePaymentNotePreviewComponent;
  let fixture: ComponentFixture<AdvancePaymentNotePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancePaymentNotePreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvancePaymentNotePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
