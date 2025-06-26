import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WillSearchComponent } from './will-search.component';

describe('WillSearchComponent', () => {
  let component: WillSearchComponent;
  let fixture: ComponentFixture<WillSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WillSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WillSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
