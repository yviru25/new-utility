import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackEComponent } from './feedback-e.component';

describe('FeedbackEComponent', () => {
  let component: FeedbackEComponent;
  let fixture: ComponentFixture<FeedbackEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
