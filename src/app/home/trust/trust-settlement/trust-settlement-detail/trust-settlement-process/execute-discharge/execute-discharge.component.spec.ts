import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteDischargeComponent } from './execute-discharge.component';

describe('ExecuteDischargeComponent', () => {
  let component: ExecuteDischargeComponent;
  let fixture: ComponentFixture<ExecuteDischargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecuteDischargeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExecuteDischargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
