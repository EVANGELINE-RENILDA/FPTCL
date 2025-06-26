import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceViewBtnComponent } from './finance-view-btn.component';

describe('FinanceViewBtnComponent', () => {
  let component: FinanceViewBtnComponent;
  let fixture: ComponentFixture<FinanceViewBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceViewBtnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinanceViewBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
