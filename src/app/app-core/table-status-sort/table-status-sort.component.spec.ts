import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStatusSortComponent } from './table-status-sort.component';

describe('TableStatusSortComponent', () => {
  let component: TableStatusSortComponent;
  let fixture: ComponentFixture<TableStatusSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableStatusSortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableStatusSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
