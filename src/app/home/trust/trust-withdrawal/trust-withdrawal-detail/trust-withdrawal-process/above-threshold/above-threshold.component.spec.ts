import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboveThresholdComponent } from './above-threshold.component';

describe('AboveThresholdComponent', () => {
  let component: AboveThresholdComponent;
  let fixture: ComponentFixture<AboveThresholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboveThresholdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboveThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
