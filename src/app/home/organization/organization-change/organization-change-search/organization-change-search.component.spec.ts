import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationChangeSearchComponent } from './organization-change-search.component';

describe('OrganizationChangeSearchComponent', () => {
  let component: OrganizationChangeSearchComponent;
  let fixture: ComponentFixture<OrganizationChangeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationChangeSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationChangeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
