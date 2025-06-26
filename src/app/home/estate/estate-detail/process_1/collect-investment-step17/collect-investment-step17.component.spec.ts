import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectInvestmentStep17Component } from './collect-investment-step17.component';

describe('CollectInvestmentStep17Component', () => {
  let component: CollectInvestmentStep17Component;
  let fixture: ComponentFixture<CollectInvestmentStep17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectInvestmentStep17Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectInvestmentStep17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
