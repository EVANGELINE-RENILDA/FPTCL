import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptNoteNotesComponent } from './receipt-note-notes.component';

describe('ReceiptNoteNotesComponent', () => {
  let component: ReceiptNoteNotesComponent;
  let fixture: ComponentFixture<ReceiptNoteNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptNoteNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptNoteNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
