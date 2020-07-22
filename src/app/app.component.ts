import { Component, OnInit, Inject } from '@angular/core';
import { NgxIndexedDBService, ObjectStoreMeta } from 'ngx-indexed-db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private dbService: NgxIndexedDBService) {
  }
  ngOnInit(): void {
    const storeSchema: ObjectStoreMeta  = {
      store: 'feedback_response',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'smmry_id', keypath: 'smmry_id', options: { unique: true } },
        { name: 'tsn_id', keypath: 'tsn_id', options: { unique: true } },
        { name: 'feedback_lvl', keypath: 'feedback_lvl', options: { unique: false } },
        { name: 'response', keypath: 'response', options: { unique: false } }
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
    this.dbService.createObjectStore(storeSchema);
    this.dbService.createObjectStore(responseDataSchema);
    this.dbService.createObjectStore(fileDataSchema);
    /* this.dbService.deleteDatabase(); */
  }
}



