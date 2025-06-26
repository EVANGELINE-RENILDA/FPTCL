import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementAccountVendorSummaryComponent } from './statement-account-vendor-summary.component';

describe('StatementAccountVendorSummaryComponent', () => {
  let component: StatementAccountVendorSummaryComponent;
  let fixture: ComponentFixture<StatementAccountVendorSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementAccountVendorSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatementAccountVendorSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
