import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityValidateDebitComponent } from './identity-validate-debit.component';

describe('IdentityValidateDebitComponent', () => {
  let component: IdentityValidateDebitComponent;
  let fixture: ComponentFixture<IdentityValidateDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentityValidateDebitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdentityValidateDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
