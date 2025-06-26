import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenAccountStep6Component } from './open-account-step6.component';

describe('OpenAccountStep6Component', () => {
  let component: OpenAccountStep6Component;
  let fixture: ComponentFixture<OpenAccountStep6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenAccountStep6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenAccountStep6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
