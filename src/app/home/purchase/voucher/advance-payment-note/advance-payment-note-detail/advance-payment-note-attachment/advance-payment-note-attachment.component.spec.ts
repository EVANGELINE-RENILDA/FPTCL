import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancePaymentNoteAttachmentComponent } from './advance-payment-note-attachment.component';

describe('AdvancePaymentNoteAttachmentComponent', () => {
  let component: AdvancePaymentNoteAttachmentComponent;
  let fixture: ComponentFixture<AdvancePaymentNoteAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancePaymentNoteAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvancePaymentNoteAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
