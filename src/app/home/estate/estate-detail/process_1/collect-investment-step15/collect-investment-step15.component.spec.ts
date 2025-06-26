import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectInvestmentStep15Component } from './collect-investment-step15.component';

describe('CollectInvestmentStep15Component', () => {
  let component: CollectInvestmentStep15Component;
  let fixture: ComponentFixture<CollectInvestmentStep15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectInvestmentStep15Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectInvestmentStep15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
