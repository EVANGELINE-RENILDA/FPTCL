import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WillDashboardComponent } from './will-dashboard.component';

describe('WillDashboardComponent', () => {
  let component: WillDashboardComponent;
  let fixture: ComponentFixture<WillDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WillDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WillDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
