import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteLatestComponent } from './auto-complete-latest.component';

describe('AutoCompleteLatestComponent', () => {
  let component: AutoCompleteLatestComponent;
  let fixture: ComponentFixture<AutoCompleteLatestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoCompleteLatestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoCompleteLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
