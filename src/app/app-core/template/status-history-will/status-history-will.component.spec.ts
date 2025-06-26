import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusHistoryWillComponent } from './status-history-will.component';

describe('StatusHistoryWillComponent', () => {
  let component: StatusHistoryWillComponent;
  let fixture: ComponentFixture<StatusHistoryWillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusHistoryWillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusHistoryWillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
