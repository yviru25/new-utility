import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-b',
  templateUrl: './feedback-b.component.html',
  styleUrls: ['./feedback-b.component.scss']
})
export class FeedbackBComponent implements OnInit {
  @Input() metaInfo: any;
  @Input() selectedDataList: any;
  date: any;
  constructor() {
   }

  ngOnInit() {
     this.date = new Date(this.selectedDataList[0].date_of_payment);
  }

}
