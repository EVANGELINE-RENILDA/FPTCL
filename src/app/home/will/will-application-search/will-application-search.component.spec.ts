import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WillApplicationSearchComponent } from './will-application-search.component';

describe('WillApplicationSearchComponent', () => {
  let component: WillApplicationSearchComponent;
  let fixture: ComponentFixture<WillApplicationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WillApplicationSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WillApplicationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
