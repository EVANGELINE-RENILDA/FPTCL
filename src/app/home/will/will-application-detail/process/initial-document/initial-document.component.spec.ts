import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialDocumentComponent } from './initial-document.component';

describe('InitialDocumentComponent', () => {
  let component: InitialDocumentComponent;
  let fixture: ComponentFixture<InitialDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitialDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
