import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalReceiptComponent } from './journal-receipt.component';

describe('JournalReceiptComponent', () => {
  let component: JournalReceiptComponent;
  let fixture: ComponentFixture<JournalReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalReceiptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JournalReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
