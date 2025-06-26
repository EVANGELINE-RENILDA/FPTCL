import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustDashboardComponent } from './trust-dashboard.component';

describe('TrustDashboardComponent', () => {
  let component: TrustDashboardComponent;
  let fixture: ComponentFixture<TrustDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrustDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
