import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathNoticeDetailComponent } from './death-notice-detail.component';

describe('DeathNoticeDetailComponent', () => {
  let component: DeathNoticeDetailComponent;
  let fixture: ComponentFixture<DeathNoticeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeathNoticeDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeathNoticeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
