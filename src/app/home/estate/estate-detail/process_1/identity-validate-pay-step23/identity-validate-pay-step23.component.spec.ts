import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityValidatePayStep23Component } from './identity-validate-pay-step23.component';

describe('IdentityValidatePayStep23Component', () => {
  let component: IdentityValidatePayStep23Component;
  let fixture: ComponentFixture<IdentityValidatePayStep23Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentityValidatePayStep23Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdentityValidatePayStep23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
