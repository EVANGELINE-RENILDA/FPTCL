import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditorsDetailReportDetailComponent } from './creditors-detail-report-detail.component';

describe('CreditorsDetailReportDetailComponent', () => {
  let component: CreditorsDetailReportDetailComponent;
  let fixture: ComponentFixture<CreditorsDetailReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditorsDetailReportDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditorsDetailReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
