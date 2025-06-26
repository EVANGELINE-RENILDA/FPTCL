import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTheDocumentComponent } from './review-the-document.component';

describe('ReviewTheDocumentComponent', () => {
  let component: ReviewTheDocumentComponent;
  let fixture: ComponentFixture<ReviewTheDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewTheDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewTheDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
