import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditNoteDetailAttachmentComponent } from './credit-note-detail-attachment.component';

describe('CreditNoteDetailAttachmentComponent', () => {
  let component: CreditNoteDetailAttachmentComponent;
  let fixture: ComponentFixture<CreditNoteDetailAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditNoteDetailAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditNoteDetailAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
