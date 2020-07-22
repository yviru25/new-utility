import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-d',
  templateUrl: './feedback-d.component.html',
  styleUrls: ['./feedback-d.component.scss']
})
export class FeedbackDComponent implements OnInit {

  @Input() l1header: any;
  @Input() selectedDataList: any;
  @Input() activeTrans = [];
  duplicateDataList = [];
  constructor() { }

  ngOnInit() {
     console.log(this.l1header);
     console.log(this.selectedDataList);
     this.activeTrans.forEach(el => {
         if (this.selectedDataList[0].tsn_id !== el.tsn_id) {
              this.duplicateDataList.push(el);
         }
     });
    // console.log(this.activeTrans);
  }

}
