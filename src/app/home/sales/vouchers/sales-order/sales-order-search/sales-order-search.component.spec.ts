import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderSearchComponent } from './sales-order-search.component';

describe('SalesOrderSearchComponent', () => {
  let component: SalesOrderSearchComponent;
  let fixture: ComponentFixture<SalesOrderSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesOrderSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesOrderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
