import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCounterInfoComponent } from './cash-counter-info.component';

describe('CashCounterInfoComponent', () => {
  let component: CashCounterInfoComponent;
  let fixture: ComponentFixture<CashCounterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashCounterInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashCounterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
