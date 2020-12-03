import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { PopupMsgDialogComponent } from '../popup-msg-dialog/popup-msg-dialog.component';
@Component({
  selector: 'app-feedback-b',
  templateUrl: './feedback-b.component.html',
  styleUrls: ['./feedback-b.component.scss']
})
export class FeedbackBComponent implements OnInit {
  form: FormGroup;
  fieldName: any;
  fieldValue: any;
  @Input() metaInfo: any;
  @Input() selectedDataList: any;
  @Input() selectedParentMetaInfo;
  @Input() type;
  date: any;
  constructor(private dbService: NgxIndexedDBService, private dialog: MatDialog) {
   }

  ngOnInit() {
    console.log(this.metaInfo);
    this.formatDate(new Date());
     // tslint:disable-next-line:no-shadowed-variable
     const group = {};
     for (let mi = 0; mi < this.metaInfo.length; mi++) {
         for (let sld = 0; sld < this.selectedDataList.length; sld++) {
           // console.log(this.metaInfo[mi].label_id + ' :- ' + this.selectedDataList[sld][this.metaInfo[mi].label_id]);
            group[this.metaInfo[mi].field] = new FormControl(this.selectedDataList[sld][this.metaInfo[mi].field]);
         }
     }
     console.log(group);
     this.form = new FormGroup(group);
     /* console.log(this.selectedDataList[0].date_of_payment);
     this.date = new Date(this.selectedDataList[0].date_of_payment);
     console.log(this.date); */
  }

  submitData() {
    const jsonToBeUsed = [];
    const json = this.form.value;
    const firstKey = Object.keys(json)[0];
    const firstValue = Object.values(json)[0];
    console.log(firstKey + ' : ' + firstValue);
    const feedbackJson = {
        feedback: {
          optnChosen: 'B',
          responseData: {
              row: []
          }
        }
    };
    // tslint:disable-next-line:forin
    for (const keys in json) {
          const jsonKeyValue = {
            key: keys,
            value: json[keys]
        };
        jsonToBeUsed.push(jsonKeyValue);
    }
    const jsonCol = { col: jsonToBeUsed};
    feedbackJson.feedback.responseData.row.push(jsonCol);
    // console.log(JSON.stringify(feedbackJson));
    const pmeta = this.ConvertArrayToObjectKeyValue(this.selectedParentMetaInfo);
    let jsondb = {};
    jsondb = pmeta;
    jsondb['type'] = this.type;
    jsondb['createdDate'] = this.formatDate(new Date());
    jsondb['jsonResponse'] = feedbackJson;
    this.dbService.add('feedback_response', jsondb).then((resp) =>  {
         if (resp !== null) {
           console.log('inside success');
            const dialogRef = this.dialog.open(PopupMsgDialogComponent , {
              width: '300px',
              maxWidth: 'none !important',
              data: {
                type: 'msg',
                message: 'Success',
                subTitleMessage: 'Your data has been saved'
              }
            });
            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
            });
         } else {
           console.log('inside else');
         }
    });
  }

  ConvertArrayToObjectKeyValue(jsonArray: any): any {
    const jsonObject = {};
    for (let i = 0; i < jsonArray.length; i++) {
      const elem = jsonArray[i];
      jsonObject[elem.keyId] = elem.keyValue;
    }
    return jsonObject;
  }

  public formatDate(date) {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - (offset * 60 * 1000));
    const splitArray = date.toISOString().split('T');
    return splitArray[0] + ' ' + splitArray[1].split('.')[0];
  }
}
