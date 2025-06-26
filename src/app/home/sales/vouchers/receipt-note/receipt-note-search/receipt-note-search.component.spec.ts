import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptNoteSearchComponent } from './receipt-note-search.component';

describe('ReceiptNoteSearchComponent', () => {
  let component: ReceiptNoteSearchComponent;
  let fixture: ComponentFixture<ReceiptNoteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptNoteSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptNoteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
