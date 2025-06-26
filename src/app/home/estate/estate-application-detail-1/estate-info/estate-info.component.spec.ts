import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateInfoComponent } from './estate-info.component';

describe('EstateInfoComponent', () => {
  let component: EstateInfoComponent;
  let fixture: ComponentFixture<EstateInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstateInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
