import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRegisteredWillComponent } from './update-registered-will.component';

describe('UpdateRegisteredWillComponent', () => {
  let component: UpdateRegisteredWillComponent;
  let fixture: ComponentFixture<UpdateRegisteredWillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRegisteredWillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateRegisteredWillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
