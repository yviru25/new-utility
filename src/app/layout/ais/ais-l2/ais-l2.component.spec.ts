import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AisL2Component } from './ais-l2.component';

describe('AisL2Component', () => {
  let component: AisL2Component;
  let fixture: ComponentFixture<AisL2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AisL2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AisL2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
