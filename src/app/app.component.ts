import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { NgxIndexedDBService, ObjectStoreMeta } from 'ngx-indexed-db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient, private dbService: NgxIndexedDBService) {

  }

  ngOnInit() {
    const storeSchema: ObjectStoreMeta  = {
      store: 'feedback_response',
      storeConfig: { keyPath: 'feedbackId', autoIncrement: true },
      storeSchema: [
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'infoCode', keypath: 'infoCode', options: { unique: false } },
        { name: 'infoCategory', keypath: 'infoCategory', options: { unique: false } },
        { name: 'infoSource', keypath: 'infoSource', options: { unique: false } },
        { name: 'createdDate', keypath: 'createdDate', options: { unique: false } },
        { name: 'jsonResponse', keypath: 'jsonResponse', options: { unique: false } }
      ]
    };
    const responseDataSchema: ObjectStoreMeta  = {
      store: 'response_data',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'ais_id', keypath: 'ais_id', options: { unique: true }},
        { name: 'pan', keypath: 'pan', options: { unique: true }},
        { name: 'pan_name', keypath: 'pan_name', options: { unique: false }}
      ]
    };
    const fileDataSchema: ObjectStoreMeta  = {
      store: 'file_import_data',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
      ]
    };
    // this.dbService.deleteDatabase();
    this.dbService.createObjectStore(storeSchema);
    this.dbService.createObjectStore(responseDataSchema);
    this.dbService.createObjectStore(fileDataSchema);
  }


}



