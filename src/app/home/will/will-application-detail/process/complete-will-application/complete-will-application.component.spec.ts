import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteWillApplicationComponent } from './complete-will-application.component';

describe('CompleteWillApplicationComponent', () => {
  let component: CompleteWillApplicationComponent;
  let fixture: ComponentFixture<CompleteWillApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteWillApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompleteWillApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
