import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderDetailNotesComponent } from './sales-order-detail-notes.component';

describe('SalesOrderDetailNotesComponent', () => {
  let component: SalesOrderDetailNotesComponent;
  let fixture: ComponentFixture<SalesOrderDetailNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesOrderDetailNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesOrderDetailNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
