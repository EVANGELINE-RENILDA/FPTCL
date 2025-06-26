import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetoutItemTableComponent } from './netout-item-table.component';

describe('NetoutItemTableComponent', () => {
  let component: NetoutItemTableComponent;
  let fixture: ComponentFixture<NetoutItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetoutItemTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetoutItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
