import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductInterviewStep2Component } from './conduct-interview-step2.component';

describe('ConductInterviewStep2Component', () => {
  let component: ConductInterviewStep2Component;
  let fixture: ComponentFixture<ConductInterviewStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConductInterviewStep2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConductInterviewStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
