import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInvoiceNotesComponent } from './purchase-invoice-notes.component';

describe('PurchaseInvoiceNotesComponent', () => {
  let component: PurchaseInvoiceNotesComponent;
  let fixture: ComponentFixture<PurchaseInvoiceNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseInvoiceNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseInvoiceNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
