import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewByMetComponent } from './review-by-met.component';

describe('ReviewByMetComponent', () => {
  let component: ReviewByMetComponent;
  let fixture: ComponentFixture<ReviewByMetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewByMetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewByMetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
