import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingMatrixSearchComponent } from './posting-matrix-search.component';

describe('PostingMatrixSearchComponent', () => {
  let component: PostingMatrixSearchComponent;
  let fixture: ComponentFixture<PostingMatrixSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostingMatrixSearchComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PostingMatrixSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
