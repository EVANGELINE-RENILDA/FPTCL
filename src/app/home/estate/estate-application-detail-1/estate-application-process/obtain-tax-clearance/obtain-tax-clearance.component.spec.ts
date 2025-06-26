import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtainTaxClearanceComponent } from './obtain-tax-clearance.component';

describe('ObtainTaxClearanceComponent', () => {
  let component: ObtainTaxClearanceComponent;
  let fixture: ComponentFixture<ObtainTaxClearanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObtainTaxClearanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObtainTaxClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
