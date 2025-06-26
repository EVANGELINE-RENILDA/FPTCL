import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareWillDraftComponent } from './prepare-will-draft.component';

describe('PrepareWillDraftComponent', () => {
  let component: PrepareWillDraftComponent;
  let fixture: ComponentFixture<PrepareWillDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrepareWillDraftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrepareWillDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
