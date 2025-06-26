import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrusteeFinanceComponent } from './trustee-finance.component';

describe('TrusteeFinanceComponent', () => {
  let component: TrusteeFinanceComponent;
  let fixture: ComponentFixture<TrusteeFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrusteeFinanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrusteeFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
