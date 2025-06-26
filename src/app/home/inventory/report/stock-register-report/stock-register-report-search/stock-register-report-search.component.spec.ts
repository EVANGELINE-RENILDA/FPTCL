import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRegisterReportSearchComponent } from './stock-register-report-search.component';

describe('StockRegisterReportSearchComponent', () => {
  let component: StockRegisterReportSearchComponent;
  let fixture: ComponentFixture<StockRegisterReportSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockRegisterReportSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockRegisterReportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
