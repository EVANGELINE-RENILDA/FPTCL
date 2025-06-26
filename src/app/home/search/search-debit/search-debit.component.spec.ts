import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDebitComponent } from './search-debit.component';

describe('SearchDebitComponent', () => {
  let component: SearchDebitComponent;
  let fixture: ComponentFixture<SearchDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDebitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
