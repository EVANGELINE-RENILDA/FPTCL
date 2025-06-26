import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustApplicationFormComponent } from './trust-application-form.component';

describe('TrustApplicationFormComponent', () => {
  let component: TrustApplicationFormComponent;
  let fixture: ComponentFixture<TrustApplicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustApplicationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrustApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
