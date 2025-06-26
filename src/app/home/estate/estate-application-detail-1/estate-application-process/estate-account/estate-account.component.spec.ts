import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateAccountComponent } from './estate-account.component';

describe('EstateAccountComponent', () => {
  let component: EstateAccountComponent;
  let fixture: ComponentFixture<EstateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstateAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
