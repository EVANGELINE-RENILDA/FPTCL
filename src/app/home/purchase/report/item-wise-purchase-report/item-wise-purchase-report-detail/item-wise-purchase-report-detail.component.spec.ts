import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWisePurchaseReportDetailComponent } from './item-wise-purchase-report-detail.component';

describe('ItemWisePurchaseReportDetailComponent', () => {
  let component: ItemWisePurchaseReportDetailComponent;
  let fixture: ComponentFixture<ItemWisePurchaseReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemWisePurchaseReportDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemWisePurchaseReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
