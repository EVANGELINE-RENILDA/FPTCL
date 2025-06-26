import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealPropertyStep21Component } from './real-property-step21.component';

describe('RealPropertyStep21Component', () => {
  let component: RealPropertyStep21Component;
  let fixture: ComponentFixture<RealPropertyStep21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealPropertyStep21Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealPropertyStep21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
