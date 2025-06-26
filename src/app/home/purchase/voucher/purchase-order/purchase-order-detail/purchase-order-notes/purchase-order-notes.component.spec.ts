import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderNotesComponent } from './purchase-order-notes.component';

describe('PurchaseOrderNotesComponent', () => {
  let component: PurchaseOrderNotesComponent;
  let fixture: ComponentFixture<PurchaseOrderNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseOrderNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
