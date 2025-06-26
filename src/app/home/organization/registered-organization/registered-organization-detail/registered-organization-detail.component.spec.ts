import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredOrganizationDetailComponent } from './registered-organization-detail.component';

describe('RegisteredOrganizationDetailComponent', () => {
  let component: RegisteredOrganizationDetailComponent;
  let fixture: ComponentFixture<RegisteredOrganizationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredOrganizationDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisteredOrganizationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
