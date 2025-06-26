import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementOfAccountSoaComponent } from './statement-of-account-soa.component';

describe('StatementOfAccountSoaComponent', () => {
  let component: StatementOfAccountSoaComponent;
  let fixture: ComponentFixture<StatementOfAccountSoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementOfAccountSoaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatementOfAccountSoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
