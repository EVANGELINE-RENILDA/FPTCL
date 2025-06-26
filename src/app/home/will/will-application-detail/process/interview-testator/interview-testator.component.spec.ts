import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewTestatorComponent } from './interview-testator.component';

describe('InterviewTestatorComponent', () => {
  let component: InterviewTestatorComponent;
  let fixture: ComponentFixture<InterviewTestatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewTestatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterviewTestatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
