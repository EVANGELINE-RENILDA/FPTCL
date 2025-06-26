import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceReceiptNoteNotesComponent } from './advance-receipt-note-notes.component';

describe('AdvanceReceiptNoteNotesComponent', () => {
  let component: AdvanceReceiptNoteNotesComponent;
  let fixture: ComponentFixture<AdvanceReceiptNoteNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvanceReceiptNoteNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvanceReceiptNoteNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
