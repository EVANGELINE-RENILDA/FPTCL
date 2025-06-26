import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustWithdrawalSearchComponent } from './trust-withdrawal-search.component';

describe('TrustWithdrawalSearchComponent', () => {
  let component: TrustWithdrawalSearchComponent;
  let fixture: ComponentFixture<TrustWithdrawalSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustWithdrawalSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrustWithdrawalSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
