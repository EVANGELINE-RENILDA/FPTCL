import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetotItemTableTrComponent } from './netot-item-table-tr.component';

describe('NetotItemTableTrComponent', () => {
  let component: NetotItemTableTrComponent;
  let fixture: ComponentFixture<NetotItemTableTrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetotItemTableTrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NetotItemTableTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
