import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositBookSearchComponent } from './deposit-book-search.component';

describe('DepositBookSearchComponent', () => {
  let component: DepositBookSearchComponent;
  let fixture: ComponentFixture<DepositBookSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositBookSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepositBookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
