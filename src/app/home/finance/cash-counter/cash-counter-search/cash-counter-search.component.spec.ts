import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCounterSearchComponent } from './cash-counter-search.component';

describe('CashCounterSearchComponent', () => {
  let component: CashCounterSearchComponent;
  let fixture: ComponentFixture<CashCounterSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashCounterSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashCounterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
