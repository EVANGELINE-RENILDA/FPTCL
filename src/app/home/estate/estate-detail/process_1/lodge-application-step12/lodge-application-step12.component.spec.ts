import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgeApplicationStep12Component } from './lodge-application-step12.component';

describe('LodgeApplicationStep12Component', () => {
  let component: LodgeApplicationStep12Component;
  let fixture: ComponentFixture<LodgeApplicationStep12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LodgeApplicationStep12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LodgeApplicationStep12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
