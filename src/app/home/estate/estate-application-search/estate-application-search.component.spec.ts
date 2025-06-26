import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateApplicationSearchComponent } from './estate-application-search.component';

describe('EstateApplicationSearchComponent', () => {
  let component: EstateApplicationSearchComponent;
  let fixture: ComponentFixture<EstateApplicationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstateApplicationSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstateApplicationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
