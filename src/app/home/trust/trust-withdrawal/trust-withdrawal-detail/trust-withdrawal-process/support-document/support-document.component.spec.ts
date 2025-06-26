import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportDocumentComponent } from './support-document.component';

describe('SupportDocumentComponent', () => {
  let component: SupportDocumentComponent;
  let fixture: ComponentFixture<SupportDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupportDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
