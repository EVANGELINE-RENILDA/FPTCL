import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrangePaymentComponent } from './arrange-payment.component';

describe('ArrangePaymentComponent', () => {
  let component: ArrangePaymentComponent;
  let fixture: ComponentFixture<ArrangePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrangePaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArrangePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
