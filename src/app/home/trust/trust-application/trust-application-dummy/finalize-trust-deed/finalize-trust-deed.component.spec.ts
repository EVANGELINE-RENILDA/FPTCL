import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizeTrustDeedComponent } from './finalize-trust-deed.component';

describe('FinalizeTrustDeedComponent', () => {
  let component: FinalizeTrustDeedComponent;
  let fixture: ComponentFixture<FinalizeTrustDeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalizeTrustDeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalizeTrustDeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
