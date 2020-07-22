import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackBComponent } from './feedback-b.component';

describe('FeedbackBComponent', () => {
  let component: FeedbackBComponent;
  let fixture: ComponentFixture<FeedbackBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
