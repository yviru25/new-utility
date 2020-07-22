import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AisL1Component } from './ais-l1.component';

describe('AisL1Component', () => {
  let component: AisL1Component;
  let fixture: ComponentFixture<AisL1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AisL1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AisL1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
