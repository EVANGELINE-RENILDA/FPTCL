import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentNoteSearchComponent } from './payment-note-search.component';

describe('PaymentNoteSearchComponent', () => {
  let component: PaymentNoteSearchComponent;
  let fixture: ComponentFixture<PaymentNoteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentNoteSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentNoteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
