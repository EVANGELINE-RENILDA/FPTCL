import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetermineThresholdComponent } from './determine-threshold.component';

describe('DetermineThresholdComponent', () => {
  let component: DetermineThresholdComponent;
  let fixture: ComponentFixture<DetermineThresholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetermineThresholdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetermineThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
