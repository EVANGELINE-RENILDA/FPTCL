import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentNoteDetailComponent } from './payment-note-detail.component';

describe('PaymentNoteDetailComponent', () => {
  let component: PaymentNoteDetailComponent;
  let fixture: ComponentFixture<PaymentNoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentNoteDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentNoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
