import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationChangeDetailComponent } from './organization-change-detail.component';

describe('OrganizationChangeDetailComponent', () => {
  let component: OrganizationChangeDetailComponent;
  let fixture: ComponentFixture<OrganizationChangeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationChangeDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationChangeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
