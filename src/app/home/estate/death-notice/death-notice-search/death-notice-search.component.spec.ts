import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathNoticeSearchComponent } from './death-notice-search.component';

describe('DeathNoticeSearchComponent', () => {
  let component: DeathNoticeSearchComponent;
  let fixture: ComponentFixture<DeathNoticeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeathNoticeSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeathNoticeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
