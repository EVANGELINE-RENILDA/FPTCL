import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementAccountVendorDetailComponent } from './statement-account-vendor-detail.component';

describe('StatementAccountVendorDetailComponent', () => {
  let component: StatementAccountVendorDetailComponent;
  let fixture: ComponentFixture<StatementAccountVendorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementAccountVendorDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatementAccountVendorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
