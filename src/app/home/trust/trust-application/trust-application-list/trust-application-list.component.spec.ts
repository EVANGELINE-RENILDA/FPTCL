import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustApplicationListComponent } from './trust-application-list.component';

describe('TrustApplicationListComponent', () => {
  let component: TrustApplicationListComponent;
  let fixture: ComponentFixture<TrustApplicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustApplicationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrustApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
