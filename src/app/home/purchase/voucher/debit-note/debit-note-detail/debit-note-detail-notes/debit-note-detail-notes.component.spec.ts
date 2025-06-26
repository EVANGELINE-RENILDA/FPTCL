import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitNoteDetailNotesComponent } from './debit-note-detail-notes.component';

describe('DebitNoteDetailNotesComponent', () => {
  let component: DebitNoteDetailNotesComponent;
  let fixture: ComponentFixture<DebitNoteDetailNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebitNoteDetailNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebitNoteDetailNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
