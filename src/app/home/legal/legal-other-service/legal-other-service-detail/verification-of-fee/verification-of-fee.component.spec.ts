import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationOfFeeComponent } from './verification-of-fee.component';

describe('VerificationOfFeeComponent', () => {
  let component: VerificationOfFeeComponent;
  let fixture: ComponentFixture<VerificationOfFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificationOfFeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerificationOfFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
