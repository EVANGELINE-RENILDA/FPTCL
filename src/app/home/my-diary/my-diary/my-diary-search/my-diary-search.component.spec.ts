import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDiarySearchComponent } from './my-diary-search.component';

describe('MyDiarySearchComponent', () => {
  let component: MyDiarySearchComponent;
  let fixture: ComponentFixture<MyDiarySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDiarySearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyDiarySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
