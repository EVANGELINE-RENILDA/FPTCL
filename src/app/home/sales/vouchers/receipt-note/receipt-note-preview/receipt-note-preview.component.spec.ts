import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptNotePreviewComponent } from './receipt-note-preview.component';

describe('ReceiptNotePreviewComponent', () => {
  let component: ReceiptNotePreviewComponent;
  let fixture: ComponentFixture<ReceiptNotePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptNotePreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptNotePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
