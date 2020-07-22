import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDComponent } from './feedback-d.component';

describe('FeedbackDComponent', () => {
  let component: FeedbackDComponent;
  let fixture: ComponentFixture<FeedbackDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
