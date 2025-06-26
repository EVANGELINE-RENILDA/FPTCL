import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateApplicationFormComponent } from './estate-application-form.component';

describe('EstateApplicationFormComponent', () => {
  let component: EstateApplicationFormComponent;
  let fixture: ComponentFixture<EstateApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstateApplicationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstateApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
