import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentNoteAttachmentComponent } from './payment-note-attachment.component';

describe('PaymentNoteAttachmentComponent', () => {
  let component: PaymentNoteAttachmentComponent;
  let fixture: ComponentFixture<PaymentNoteAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentNoteAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentNoteAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
