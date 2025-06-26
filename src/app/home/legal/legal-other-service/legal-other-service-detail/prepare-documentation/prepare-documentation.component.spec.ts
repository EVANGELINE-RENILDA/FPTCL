import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareDocumentationComponent } from './prepare-documentation.component';

describe('PrepareDocumentationComponent', () => {
  let component: PrepareDocumentationComponent;
  let fixture: ComponentFixture<PrepareDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrepareDocumentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrepareDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
