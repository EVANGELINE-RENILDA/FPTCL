import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialPlatformEditComponent } from './social-platform-edit.component';

describe('SocialPlatformEditComponent', () => {
  let component: SocialPlatformEditComponent;
  let fixture: ComponentFixture<SocialPlatformEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialPlatformEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocialPlatformEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
