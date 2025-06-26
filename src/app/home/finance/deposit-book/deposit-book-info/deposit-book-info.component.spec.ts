import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositBookInfoComponent } from './deposit-book-info.component';

describe('DepositBookInfoComponent', () => {
  let component: DepositBookInfoComponent;
  let fixture: ComponentFixture<DepositBookInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositBookInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepositBookInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
