import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRegisterDetailComponent } from './sales-register-detail.component';

describe('SalesRegisterDetailComponent', () => {
  let component: SalesRegisterDetailComponent;
  let fixture: ComponentFixture<SalesRegisterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesRegisterDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesRegisterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
