import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WillApplicationDetailComponent } from './will-application-detail.component';

describe('WillApplicationDetailComponent', () => {
  let component: WillApplicationDetailComponent;
  let fixture: ComponentFixture<WillApplicationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WillApplicationDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WillApplicationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
