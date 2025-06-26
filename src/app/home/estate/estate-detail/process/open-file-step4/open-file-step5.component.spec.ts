import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenFileStep5Component } from './open-file-step5.component';

describe('OpenFileStep5Component', () => {
  let component: OpenFileStep5Component;
  let fixture: ComponentFixture<OpenFileStep5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenFileStep5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenFileStep5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
