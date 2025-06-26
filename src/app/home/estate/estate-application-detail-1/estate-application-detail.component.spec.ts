import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateApplicationDetailComponent } from './estate-application-detail.component';

describe('EstateApplicationDetailComponent', () => {
  let component: EstateApplicationDetailComponent;
  let fixture: ComponentFixture<EstateApplicationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstateApplicationDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstateApplicationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
