import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusHistory1Component } from './status-history1.component';

describe('StatusHistory1Component', () => {
  let component: StatusHistory1Component;
  let fixture: ComponentFixture<StatusHistory1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusHistory1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusHistory1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
