import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiPageUrlComponent } from './multi-page-url.component';

describe('MultiPageUrlComponent', () => {
  let component: MultiPageUrlComponent;
  let fixture: ComponentFixture<MultiPageUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiPageUrlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiPageUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
