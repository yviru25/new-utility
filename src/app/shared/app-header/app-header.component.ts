import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { ElectronService } from '../electron-service';
import { MatDialog } from '@angular/material';
import { PopupMsgDialogComponent } from '../feedback/popup-msg-dialog/popup-msg-dialog.component';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  plainText: any;
  encryptSecretKey = 'ais_file_encryption';
  conversionEncryptOutput: string;
  conversionDecryptOutput: string;
  public groupByType = {};
  public aisFeedbackResponse: any;
  jsonStr: any;
  constructor(private dbService: NgxIndexedDBService,
    private route: Router,
    private electronService: ElectronService,
    private dialog: MatDialog) {
   }
  fileContent: string | ArrayBuffer;

  ngOnInit() {
  }

  closeApp() {
    const dialogRef = this.dialog.open(PopupMsgDialogComponent , {
      width: 'auto',
      maxWidth: 'none !important',
      data: {
        type: 'confirm'
      }
    });
    // this.electronService.remote.app.quit();
  }

  AisfileImport(event) {
    const file = event.srcElement.files[0];
      if (file) {
          this.dbService.clear('file_import_data');
          const jsonData: any = [];
          const fileReader: any = new FileReader();
          fileReader.readAsText(file, 'UTF-8');
          fileReader.onload = (evt: Event) => {
               const data = JSON.parse(fileReader.result);
               this.dbService.add('file_import_data', {data}).then(
                (respText) => {
                    console.log(respText);
                },
                error => {
                    console.log(error);
                }
              );
          };
          this.route.navigate(['dashboard/ais']);
          fileReader.onerror = function (evt) {
              alert('error reading file');
          };
      }
    }

    exportFeedback() {
      const arr = [];
      this.dbService.getAll('feedback_response').then( resp => {
        this.aisFeedbackResponse = resp;
        this.aisFeedbackResponse.forEach(element => {
          this.groupByType [element.infoCode] = this.groupByType [element.infoCode] || [];
          this.groupByType [element.infoCode].push(
            {
                 type: element.type,
                 infoDtls: [
                   {
                    infoCode: element.infoCode,
                    infoCategory: element.infoCategory,
                    infoSource : element.infoSource,
                    feedback: element.jsonResponse
                   }
                 ]
            }
          );
        });
        // console.log(JSON.stringify(this.groupByType));
        const fdbckJson = {
          ais_feedbck: {
            aisId: 'RGBPD8448V.01',
            revsnId: 1,
            submittedBy: '',
            feedbackLvl: 'L1',
            aisFeedback: this.groupByType
          }
        };
        console.log(fdbckJson);
        this.jsonStr = fdbckJson;
        console.log(fdbckJson);
        this.convertText('encrypt');
    });
  }

    // method is used to encrypt and decrypt the text
    convertText(conversion: string) {
     // if (conversion === 'encrypt') {
        this.conversionEncryptOutput = CryptoJS.AES.encrypt(JSON.stringify(this.jsonStr), this.encryptSecretKey).toString();
        // tslint:disable-next-line:max-line-length
        const blob = new Blob([this.conversionEncryptOutput], {type : 'application/json'});
        saveAs(blob, 'AIS_feedback_file.json');
        // tslint:disable-next-line:max-line-length
        this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.conversionEncryptOutput, this.encryptSecretKey).toString(CryptoJS.enc.Utf8);
        console.log(this.conversionEncryptOutput);
        console.log(this.conversionDecryptOutput);
      /* } else {
        this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
      } */
}

}

interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}
