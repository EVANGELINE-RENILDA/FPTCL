import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCompletionComponent } from './application-completion.component';

describe('ApplicationCompletionComponent', () => {
  let component: ApplicationCompletionComponent;
  let fixture: ComponentFixture<ApplicationCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationCompletionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
