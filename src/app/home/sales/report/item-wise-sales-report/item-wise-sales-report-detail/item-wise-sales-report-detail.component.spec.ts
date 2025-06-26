import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWiseSalesReportDetailComponent } from './item-wise-sales-report-detail.component';

describe('ItemWiseSalesReportDetailComponent', () => {
  let component: ItemWiseSalesReportDetailComponent;
  let fixture: ComponentFixture<ItemWiseSalesReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemWiseSalesReportDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemWiseSalesReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
