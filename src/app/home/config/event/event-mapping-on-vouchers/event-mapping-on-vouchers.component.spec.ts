import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMappingOnVouchersComponent } from './event-mapping-on-vouchers.component';

describe('EventMappingOnVouchersComponent', () => {
  let component: EventMappingOnVouchersComponent;
  let fixture: ComponentFixture<EventMappingOnVouchersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventMappingOnVouchersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventMappingOnVouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
