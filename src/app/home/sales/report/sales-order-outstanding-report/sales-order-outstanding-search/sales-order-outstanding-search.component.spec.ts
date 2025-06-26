import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderOutstandingSearchComponent } from './sales-order-outstanding-search.component';

describe('SalesOrderOutstandingSearchComponent', () => {
  let component: SalesOrderOutstandingSearchComponent;
  let fixture: ComponentFixture<SalesOrderOutstandingSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesOrderOutstandingSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesOrderOutstandingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
