import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailHistoryFormComponent } from './email-history-form.component';

describe('EmailHistoryFormComponent', () => {
  let component: EmailHistoryFormComponent;
  let fixture: ComponentFixture<EmailHistoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailHistoryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
