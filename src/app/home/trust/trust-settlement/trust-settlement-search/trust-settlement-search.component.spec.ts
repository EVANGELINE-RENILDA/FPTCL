import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustSettlementSearchComponent } from './trust-settlement-search.component';

describe('TrustSettlementSearchComponent', () => {
  let component: TrustSettlementSearchComponent;
  let fixture: ComponentFixture<TrustSettlementSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustSettlementSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrustSettlementSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
