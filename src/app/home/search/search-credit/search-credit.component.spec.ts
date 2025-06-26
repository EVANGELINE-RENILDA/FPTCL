import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCreditComponent } from './search-credit.component';

describe('SearchCreditComponent', () => {
  let component: SearchCreditComponent;
  let fixture: ComponentFixture<SearchCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCreditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
