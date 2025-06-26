import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceReceiptNoteAttachmentComponent } from './advance-receipt-note-attachment.component';

describe('AdvanceReceiptNoteAttachmentComponent', () => {
  let component: AdvanceReceiptNoteAttachmentComponent;
  let fixture: ComponentFixture<AdvanceReceiptNoteAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvanceReceiptNoteAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvanceReceiptNoteAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
