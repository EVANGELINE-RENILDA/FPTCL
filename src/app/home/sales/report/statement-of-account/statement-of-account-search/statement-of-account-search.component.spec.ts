import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementOfAccountSearchComponent } from './statement-of-account-search.component';

describe('StatementOfAccountSearchComponent', () => {
  let component: StatementOfAccountSearchComponent;
  let fixture: ComponentFixture<StatementOfAccountSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementOfAccountSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatementOfAccountSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
