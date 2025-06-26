import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionClaimsComponent } from './provision-claims.component';

describe('ProvisionClaimsComponent', () => {
  let component: ProvisionClaimsComponent;
  let fixture: ComponentFixture<ProvisionClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvisionClaimsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProvisionClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
