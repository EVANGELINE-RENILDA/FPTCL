import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestDetailComponent } from './user-request-detail.component';

describe('UserRequestDetailComponent', () => {
  let component: UserRequestDetailComponent;
  let fixture: ComponentFixture<UserRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRequestDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
