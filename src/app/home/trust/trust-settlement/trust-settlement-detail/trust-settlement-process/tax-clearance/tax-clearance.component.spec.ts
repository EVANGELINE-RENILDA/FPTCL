import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxClearanceComponent } from './tax-clearance.component';

describe('TaxClearanceComponent', () => {
  let component: TaxClearanceComponent;
  let fixture: ComponentFixture<TaxClearanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxClearanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaxClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
