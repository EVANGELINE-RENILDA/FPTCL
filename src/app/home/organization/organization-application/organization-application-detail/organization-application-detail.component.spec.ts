import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationApplicationDetailComponent } from './organization-application-detail.component';

describe('OrganizationApplicationDetailComponent', () => {
  let component: OrganizationApplicationDetailComponent;
  let fixture: ComponentFixture<OrganizationApplicationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationApplicationDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationApplicationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
