import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSubEventCreationComponent } from './event-sub-event-creation.component';

describe('EventSubEventCreationComponent', () => {
  let component: EventSubEventCreationComponent;
  let fixture: ComponentFixture<EventSubEventCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSubEventCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventSubEventCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
