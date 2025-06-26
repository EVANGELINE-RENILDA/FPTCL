import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustApplicationDummyComponent } from './trust-application-dummy.component';

describe('TrustApplicationDummyComponent', () => {
  let component: TrustApplicationDummyComponent;
  let fixture: ComponentFixture<TrustApplicationDummyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustApplicationDummyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrustApplicationDummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
