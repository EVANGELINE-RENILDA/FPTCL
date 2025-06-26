import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustDetailComponent } from './trust-detail.component';

describe('TrustDetailComponent', () => {
  let component: TrustDetailComponent;
  let fixture: ComponentFixture<TrustDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrustDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
