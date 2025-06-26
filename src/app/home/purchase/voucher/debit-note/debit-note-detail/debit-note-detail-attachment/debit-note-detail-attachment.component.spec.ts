import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitNoteDetailAttachmentComponent } from './debit-note-detail-attachment.component';

describe('DebitNoteDetailAttachmentComponent', () => {
  let component: DebitNoteDetailAttachmentComponent;
  let fixture: ComponentFixture<DebitNoteDetailAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebitNoteDetailAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebitNoteDetailAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
