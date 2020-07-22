import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  fileContent: string | ArrayBuffer;

  constructor(private dbService: NgxIndexedDBService, private route: Router) { }

  ngOnInit() {
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
      const fdbckJson = {
        ais_feedbck: {
          ais_id: 'RGBPD8448V.01',
          revsn_id: 1,
          cntrlNo: 1,
          feedback: []
        }
      };
      this.dbService.getAll('feedback_response').then( resp => {
        resp.forEach(element => {
          fdbckJson.ais_feedbck.feedback.push(JSON.stringify(element));
        });
      });
      const blob = new Blob([JSON.stringify(fdbckJson)], {type : 'application/json'});
      saveAs(blob, 'AIS_feedback_file.json');
    }

}

interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}
