import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMappingSearchComponent } from './event-mapping-search.component';

describe('EventMappingSearchComponent', () => {
  let component: EventMappingSearchComponent;
  let fixture: ComponentFixture<EventMappingSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventMappingSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventMappingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
