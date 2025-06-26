import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustSettlementDetailComponent } from './trust-settlement-detail.component';

describe('TrustSettlementDetailComponent', () => {
  let component: TrustSettlementDetailComponent;
  let fixture: ComponentFixture<TrustSettlementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustSettlementDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrustSettlementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
