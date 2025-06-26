import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectAssetsComponent } from './collect-assets.component';

describe('CollectAssetsComponent', () => {
  let component: CollectAssetsComponent;
  let fixture: ComponentFixture<CollectAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectAssetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
