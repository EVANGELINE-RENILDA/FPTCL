import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueRegisterWillCopyComponent } from './issue-register-will-copy.component';

describe('IssueRegisterWillCopyComponent', () => {
  let component: IssueRegisterWillCopyComponent;
  let fixture: ComponentFixture<IssueRegisterWillCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueRegisterWillCopyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IssueRegisterWillCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
