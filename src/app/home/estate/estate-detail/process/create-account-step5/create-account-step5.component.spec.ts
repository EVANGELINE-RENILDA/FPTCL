import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountStep5Component } from './create-account-step5.component';

describe('CreateAccountStep5Component', () => {
  let component: CreateAccountStep5Component;
  let fixture: ComponentFixture<CreateAccountStep5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccountStep5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAccountStep5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
