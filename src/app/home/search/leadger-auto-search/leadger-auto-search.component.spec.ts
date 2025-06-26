import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadgerAutoSearchComponent } from './leadger-auto-search.component';

describe('LeadgerAutoSearchComponent', () => {
  let component: LeadgerAutoSearchComponent;
  let fixture: ComponentFixture<LeadgerAutoSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadgerAutoSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadgerAutoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
