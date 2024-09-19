import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptEditOverlayComponent } from './prompt-edit-overlay.component';

describe('PromptEditOverlayComponent', () => {
  let component: PromptEditOverlayComponent;
  let fixture: ComponentFixture<PromptEditOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromptEditOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptEditOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
