import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderOutstandingDetailComponent } from './sales-order-outstanding-detail.component';

describe('SalesOrderOutstandingDetailComponent', () => {
  let component: SalesOrderOutstandingDetailComponent;
  let fixture: ComponentFixture<SalesOrderOutstandingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesOrderOutstandingDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesOrderOutstandingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
