import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BelowThresholdComponent } from './below-threshold.component';

describe('BelowThresholdComponent', () => {
  let component: BelowThresholdComponent;
  let fixture: ComponentFixture<BelowThresholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BelowThresholdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BelowThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
