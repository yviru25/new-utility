import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FileSaver, saveAs } from 'file-saver';
import { SharedServices } from '../shared-service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-bulk-dialog',
  templateUrl: './bulk-dialog.component.html',
  styleUrls: ['./bulk-dialog.component.scss'],
  providers: [SharedServices]
})
export class BulkDialogComponent implements OnInit {
  optionChoosen: string;
  dataList = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: SharedServices, private dbService: NgxIndexedDBService) {
    this.dataList = data.checkedInfoList;
    console.log(this.dataList);
  }

  ngOnInit() {
  }

  submitBulkResponse() {
        for (let i = 0; i < this.dataList.length; i++) {
           this.dbService.getByIndex('feedback_response', 'tsn_id' , this.dataList[i].tsn_id).then( resp => {
            if (resp !== undefined) {
              this.dbService.delete('feedback_response', resp.id).then( r => {
                this.dbService.add('feedback_response', {smmry_id: Math.random(), tsn_id: this.dataList[i].tsn_id,
                  feedback_lvl: 'L1', response: {
                  optn_chosen: this.optionChoosen }}).then(
                  (respText) => {
                      console.log(respText);
                  },
                  error => {
                      console.log(error);
                  }
                );
              });
            } else {
              this.dbService.add('feedback_response', {smmry_id: Math.random(), tsn_id: this.dataList[i].tsn_id,
                feedback_lvl: 'L1', response: {
                optn_chosen: this.optionChoosen }}).then(
                (respText) => {
                    console.log(respText);
                },
                error => {
                    console.log(error);
                }
              );
            }
           });
        }
     }

}
