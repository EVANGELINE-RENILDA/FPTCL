import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalOpenFileComponent } from './approval-open-file.component';

describe('ApprovalOpenFileComponent', () => {
  let component: ApprovalOpenFileComponent;
  let fixture: ComponentFixture<ApprovalOpenFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalOpenFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovalOpenFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
