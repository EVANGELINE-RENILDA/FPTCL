import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationApplicationInfoComponent } from './organization-application-info.component';

describe('OrganizationApplicationInfoComponent', () => {
  let component: OrganizationApplicationInfoComponent;
  let fixture: ComponentFixture<OrganizationApplicationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationApplicationInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationApplicationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
