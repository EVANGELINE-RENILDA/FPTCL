import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancePaymentNoteNotesComponent } from './advance-payment-note-notes.component';

describe('AdvancePaymentNoteNotesComponent', () => {
  let component: AdvancePaymentNoteNotesComponent;
  let fixture: ComponentFixture<AdvancePaymentNoteNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancePaymentNoteNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvancePaymentNoteNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
