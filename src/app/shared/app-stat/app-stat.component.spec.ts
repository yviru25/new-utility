import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStatComponent } from './app-stat.component';

describe('AppStatComponent', () => {
  let component: AppStatComponent;
  let fixture: ComponentFixture<AppStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
