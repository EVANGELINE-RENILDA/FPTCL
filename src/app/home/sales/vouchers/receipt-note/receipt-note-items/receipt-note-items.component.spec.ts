import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptNoteItemsComponent } from './receipt-note-items.component';

describe('ReceiptNoteItemsComponent', () => {
  let component: ReceiptNoteItemsComponent;
  let fixture: ComponentFixture<ReceiptNoteItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptNoteItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptNoteItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
