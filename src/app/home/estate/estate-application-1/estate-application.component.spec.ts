import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateApplicationComponent } from './estate-application.component';

describe('EstateApplicationComponent', () => {
  let component: EstateApplicationComponent;
  let fixture: ComponentFixture<EstateApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstateApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstateApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
