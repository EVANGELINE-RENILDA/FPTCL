import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalCreationApplicationComponent } from './legal-creation-application.component';

describe('LegalCreationApplicationComponent', () => {
  let component: LegalCreationApplicationComponent;
  let fixture: ComponentFixture<LegalCreationApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalCreationApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalCreationApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
