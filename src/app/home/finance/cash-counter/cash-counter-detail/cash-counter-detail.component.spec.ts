import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCounterDetailComponent } from './cash-counter-detail.component';

describe('CashCounterDetailComponent', () => {
  let component: CashCounterDetailComponent;
  let fixture: ComponentFixture<CashCounterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashCounterDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashCounterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
