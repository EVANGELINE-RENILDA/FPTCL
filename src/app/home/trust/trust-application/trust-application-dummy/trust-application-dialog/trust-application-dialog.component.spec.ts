import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustApplicationDialogComponent } from './trust-application-dialog.component';

describe('TrustApplicationDialogComponent', () => {
  let component: TrustApplicationDialogComponent;
  let fixture: ComponentFixture<TrustApplicationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustApplicationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrustApplicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
