import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptNoteAttachmentComponent } from './receipt-note-attachment.component';

describe('ReceiptNoteAttachmentComponent', () => {
  let component: ReceiptNoteAttachmentComponent;
  let fixture: ComponentFixture<ReceiptNoteAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptNoteAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptNoteAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
