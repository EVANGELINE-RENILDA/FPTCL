import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentNotePreviewComponent } from './payment-note-preview.component';

describe('PaymentNotePreviewComponent', () => {
  let component: PaymentNotePreviewComponent;
  let fixture: ComponentFixture<PaymentNotePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentNotePreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentNotePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
