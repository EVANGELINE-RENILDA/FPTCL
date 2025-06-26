import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentNoteNotesComponent } from './payment-note-notes.component';

describe('PaymentNoteNotesComponent', () => {
  let component: PaymentNoteNotesComponent;
  let fixture: ComponentFixture<PaymentNoteNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentNoteNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentNoteNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
