import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductInitialInterviewComponent } from './conduct-initial-interview.component';

describe('ConductInitialInterviewComponent', () => {
  let component: ConductInitialInterviewComponent;
  let fixture: ComponentFixture<ConductInitialInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConductInitialInterviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConductInitialInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
