import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifyValidateDebtStep9Component } from './identify-validate-debt-step9.component';

describe('IdentifyValidateDebtStep9Component', () => {
  let component: IdentifyValidateDebtStep9Component;
  let fixture: ComponentFixture<IdentifyValidateDebtStep9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentifyValidateDebtStep9Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdentifyValidateDebtStep9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
