import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOpenFileComponent } from './review-open-file.component';

describe('ReviewOpenFileComponent', () => {
  let component: ReviewOpenFileComponent;
  let fixture: ComponentFixture<ReviewOpenFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewOpenFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewOpenFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
