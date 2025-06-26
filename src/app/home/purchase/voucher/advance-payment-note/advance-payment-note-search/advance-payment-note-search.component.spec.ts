import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancePaymentNoteSearchComponent } from './advance-payment-note-search.component';

describe('AdvancePaymentNoteSearchComponent', () => {
  let component: AdvancePaymentNoteSearchComponent;
  let fixture: ComponentFixture<AdvancePaymentNoteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancePaymentNoteSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvancePaymentNoteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
