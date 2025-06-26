import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoaTrustAndEstateReportComponent } from './soa-trust-and-estate-report.component';

describe('SoaTrustAndEstateReportComponent', () => {
  let component: SoaTrustAndEstateReportComponent;
  let fixture: ComponentFixture<SoaTrustAndEstateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoaTrustAndEstateReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoaTrustAndEstateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
