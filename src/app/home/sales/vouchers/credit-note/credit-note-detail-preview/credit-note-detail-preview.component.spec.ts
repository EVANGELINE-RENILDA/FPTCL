import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditNoteDetailPreviewComponent } from './credit-note-detail-preview.component';

describe('CreditNoteDetailPreviewComponent', () => {
  let component: CreditNoteDetailPreviewComponent;
  let fixture: ComponentFixture<CreditNoteDetailPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditNoteDetailPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditNoteDetailPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
