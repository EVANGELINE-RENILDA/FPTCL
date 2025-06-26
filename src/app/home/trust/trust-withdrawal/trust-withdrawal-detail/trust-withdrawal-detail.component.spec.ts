import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustWithdrawalDetailComponent } from './trust-withdrawal-detail.component';

describe('TrustWithdrawalDetailComponent', () => {
  let component: TrustWithdrawalDetailComponent;
  let fixture: ComponentFixture<TrustWithdrawalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustWithdrawalDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrustWithdrawalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
