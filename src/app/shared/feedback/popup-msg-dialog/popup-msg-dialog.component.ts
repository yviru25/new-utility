import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-popup-msg-dialog',
  templateUrl: './popup-msg-dialog.component.html',
  styleUrls: ['./popup-msg-dialog.component.scss']
})
export class PopupMsgDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopupMsgDialogComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
