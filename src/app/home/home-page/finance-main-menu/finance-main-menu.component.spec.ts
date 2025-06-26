import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceMainMenuComponent } from './finance-main-menu.component';

describe('FinanceMainMenuComponent', () => {
  let component: FinanceMainMenuComponent;
  let fixture: ComponentFixture<FinanceMainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceMainMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinanceMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
