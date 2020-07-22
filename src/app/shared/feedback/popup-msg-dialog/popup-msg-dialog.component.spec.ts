import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMsgDialogComponent } from './popup-msg-dialog.component';

describe('PopupMsgDialogComponent', () => {
  let component: PopupMsgDialogComponent;
  let fixture: ComponentFixture<PopupMsgDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupMsgDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupMsgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
