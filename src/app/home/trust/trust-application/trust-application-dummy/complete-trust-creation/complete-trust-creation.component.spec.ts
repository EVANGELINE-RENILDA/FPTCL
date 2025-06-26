import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTrustCreationComponent } from './complete-trust-creation.component';

describe('CompleteTrustCreationComponent', () => {
  let component: CompleteTrustCreationComponent;
  let fixture: ComponentFixture<CompleteTrustCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteTrustCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompleteTrustCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
