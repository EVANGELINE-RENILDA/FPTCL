import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectBeneficiaryDocComponent } from './collect-beneficiary-doc.component';

describe('CollectBeneficiaryDocComponent', () => {
  let component: CollectBeneficiaryDocComponent;
  let fixture: ComponentFixture<CollectBeneficiaryDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectBeneficiaryDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectBeneficiaryDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
