import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoutsStatusTableComponent } from './accouts-status-table.component';

describe('AccoutsStatusTableComponent', () => {
  let component: AccoutsStatusTableComponent;
  let fixture: ComponentFixture<AccoutsStatusTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccoutsStatusTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccoutsStatusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
