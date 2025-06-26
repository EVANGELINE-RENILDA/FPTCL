import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationApplicationComponent } from './creation-application.component';

describe('CreationApplicationComponent', () => {
  let component: CreationApplicationComponent;
  let fixture: ComponentFixture<CreationApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreationApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
