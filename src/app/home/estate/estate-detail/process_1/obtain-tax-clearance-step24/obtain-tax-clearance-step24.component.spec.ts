import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtainTaxClearanceStep24Component } from './obtain-tax-clearance-step24.component';

describe('ObtainTaxClearanceStep24Component', () => {
  let component: ObtainTaxClearanceStep24Component;
  let fixture: ComponentFixture<ObtainTaxClearanceStep24Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObtainTaxClearanceStep24Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObtainTaxClearanceStep24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
