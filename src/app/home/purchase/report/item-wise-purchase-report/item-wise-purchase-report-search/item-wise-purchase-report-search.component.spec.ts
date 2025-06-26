import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWisePurchaseReportSearchComponent } from './item-wise-purchase-report-search.component';

describe('ItemWisePurchaseReportSearchComponent', () => {
  let component: ItemWisePurchaseReportSearchComponent;
  let fixture: ComponentFixture<ItemWisePurchaseReportSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemWisePurchaseReportSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemWisePurchaseReportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
