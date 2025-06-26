import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancePaymentNoteDetailComponent } from './advance-payment-note-detail.component';

describe('AdvancePaymentNoteDetailComponent', () => {
  let component: AdvancePaymentNoteDetailComponent;
  let fixture: ComponentFixture<AdvancePaymentNoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancePaymentNoteDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvancePaymentNoteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
