import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceNotesComponent } from './sales-invoice-notes.component';

describe('SalesInvoiceNotesComponent', () => {
  let component: SalesInvoiceNotesComponent;
  let fixture: ComponentFixture<SalesInvoiceNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesInvoiceNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesInvoiceNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
