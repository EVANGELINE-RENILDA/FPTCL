import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRegisterSearchComponent } from './sales-register-search.component';

describe('SalesRegisterSearchComponent', () => {
  let component: SalesRegisterSearchComponent;
  let fixture: ComponentFixture<SalesRegisterSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesRegisterSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesRegisterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
