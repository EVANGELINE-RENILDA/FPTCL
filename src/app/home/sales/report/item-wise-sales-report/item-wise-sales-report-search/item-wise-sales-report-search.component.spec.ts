import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWiseSalesReportSearchComponent } from './item-wise-sales-report-search.component';

describe('ItemWiseSalesReportSearchComponent', () => {
  let component: ItemWiseSalesReportSearchComponent;
  let fixture: ComponentFixture<ItemWiseSalesReportSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemWiseSalesReportSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemWiseSalesReportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
