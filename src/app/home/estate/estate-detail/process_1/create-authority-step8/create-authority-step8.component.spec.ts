import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAuthorityStep8Component } from './create-authority-step8.component';

describe('CreateAuthorityStep8Component', () => {
  let component: CreateAuthorityStep8Component;
  let fixture: ComponentFixture<CreateAuthorityStep8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAuthorityStep8Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAuthorityStep8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
