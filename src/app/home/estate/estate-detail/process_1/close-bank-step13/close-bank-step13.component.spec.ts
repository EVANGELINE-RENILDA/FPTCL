import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseBankStep13Component } from './close-bank-step13.component';

describe('CloseBankStep13Component', () => {
  let component: CloseBankStep13Component;
  let fixture: ComponentFixture<CloseBankStep13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseBankStep13Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloseBankStep13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
