import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WillApplicationComponent } from './will-application.component';

describe('WillApplicationComponent', () => {
  let component: WillApplicationComponent;
  let fixture: ComponentFixture<WillApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WillApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WillApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
