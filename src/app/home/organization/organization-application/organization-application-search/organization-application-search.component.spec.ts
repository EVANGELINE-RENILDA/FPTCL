import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationApplicationSearchComponent } from './organization-application-search.component';

describe('OrganizationApplicationSearchComponent', () => {
  let component: OrganizationApplicationSearchComponent;
  let fixture: ComponentFixture<OrganizationApplicationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationApplicationSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationApplicationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
