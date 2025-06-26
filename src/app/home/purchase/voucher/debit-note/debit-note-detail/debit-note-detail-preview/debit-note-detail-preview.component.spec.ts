import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitNoteDetailPreviewComponent } from './debit-note-detail-preview.component';

describe('DebitNoteDetailPreviewComponent', () => {
  let component: DebitNoteDetailPreviewComponent;
  let fixture: ComponentFixture<DebitNoteDetailPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebitNoteDetailPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebitNoteDetailPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
