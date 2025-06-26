import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredOrganizationSearchComponent } from './registered-organization-search.component';

describe('RegisteredOrganizationSearchComponent', () => {
  let component: RegisteredOrganizationSearchComponent;
  let fixture: ComponentFixture<RegisteredOrganizationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredOrganizationSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisteredOrganizationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
