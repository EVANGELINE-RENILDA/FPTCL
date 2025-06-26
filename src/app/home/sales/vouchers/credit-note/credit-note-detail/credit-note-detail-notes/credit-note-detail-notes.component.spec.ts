import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditNoteDetailNotesComponent } from './credit-note-detail-notes.component';

describe('CreditNoteDetailNotesComponent', () => {
  let component: CreditNoteDetailNotesComponent;
  let fixture: ComponentFixture<CreditNoteDetailNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditNoteDetailNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditNoteDetailNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
