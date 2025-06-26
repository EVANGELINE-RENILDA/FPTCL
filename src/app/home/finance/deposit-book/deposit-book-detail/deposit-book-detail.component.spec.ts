import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositBookDetailComponent } from './deposit-book-detail.component';

describe('DepositBookDetailComponent', () => {
  let component: DepositBookDetailComponent;
  let fixture: ComponentFixture<DepositBookDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositBookDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepositBookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
