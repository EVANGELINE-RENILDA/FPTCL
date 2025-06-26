import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditorsDetailReportSearchComponent } from './creditors-detail-report-search.component';

describe('CreditorsDetailReportSearchComponent', () => {
  let component: CreditorsDetailReportSearchComponent;
  let fixture: ComponentFixture<CreditorsDetailReportSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditorsDetailReportSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditorsDetailReportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
