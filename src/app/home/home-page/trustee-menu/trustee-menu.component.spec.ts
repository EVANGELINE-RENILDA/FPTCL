import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrusteeMenuComponent } from './trustee-menu.component';

describe('TrusteeMenuComponent', () => {
  let component: TrusteeMenuComponent;
  let fixture: ComponentFixture<TrusteeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrusteeMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrusteeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
