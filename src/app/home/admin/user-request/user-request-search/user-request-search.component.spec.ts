import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestSearchComponent } from './user-request-search.component';

describe('UserRequestSearchComponent', () => {
  let component: UserRequestSearchComponent;
  let fixture: ComponentFixture<UserRequestSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRequestSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRequestSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
